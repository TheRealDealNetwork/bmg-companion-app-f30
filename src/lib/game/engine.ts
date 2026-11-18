// @ts-nocheck
import {
  ALL_DEPTS,
  BOARD_CUE,
  BOARD_DEPTS,
  DEPT_SHORT,
  SEAT_DEPTS,
  SURVEY,
  principleOf,
  type Answer,
  type DeptId,
  type GameState,
  type Player,
} from "./types";
import { normalizePhone } from "./format";
import { cardEffect, DEPT_ICON, extraSlot, plainCardText, stageReady } from "./icons";
import { deptSnap, refillDept, shuffle } from "./cards.server";

type Step = { ok: false; error: string } | { ok: true; state: GameState };
type Answered = Step | { ok: true; state: GameState; answer: Answer; duplicate: boolean };
type Joined = Step | { ok: true; state: GameState; player: Player };

export const HAND_SIZE = 3;
export const PLAY_COUNT = 2;


export const DEFAULT_SETTINGS = {
	rounds: 8,
	roundSec: 480,
	gameSec: 5400,
	marginBps: 3e3,
	winCents: 1e7,
	mlCents: 25e6
};
export function uid() {
	return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
}
var INVITE = "abcdefghijkmnopqrstuvwxyz23456789";
function inviteCode() {
	let s = "";
	for (let i = 0; i < 12; i++) s += INVITE[Math.floor(Math.random() * 33)];
	return s;
}
function freshInvite(state) {
	const used = new Set(state.players.map((p) => p.invite).filter((v) => Boolean(v)));
	let code = inviteCode();
	while (used.has(code)) code = inviteCode();
	return code;
}
function clone(value) {
	return JSON.parse(JSON.stringify(value));
}
function blankScores() {
	return Array.from({ length: 8 }, () => ({
		revenue: {},
		payroll: {}
	}));
}
export function blankState(company, rehearsal, bags): GameState {
	const settings = { ...DEFAULT_SETTINGS };
	return {
		company: company || "The Company",
		rehearsal,
		status: "lobby",
		round: 1,
		phase: 1,
		settings,
		timers: {
			running: false,
			paused: false,
			roundDeadline: null,
			gameDeadline: null,
			roundLeft: settings.roundSec,
			gameLeft: settings.gameSec
		},
		rosterLocked: false,
		players: [],
		headOverride: {},
		scores: blankScores(),
		adjustments: [],
		pending: [],
		answers: [],
		plays: [],
		events: [],
		customers: [],
		houses: [],
		hands: {},
		projects: [],
		help: [],
		log: [],
		shoutouts: [],
		surveys: {},
		feedback: {},
		announcement: "",
		showBeat: 0,
		bags,
		shield: {},
		boardStep: 0,
		waves: [],
		redeals: {},
		createdAt: Date.now()
	};
}
export function hydrate(state): GameState {
	if (!state.hands) state.hands = {};
	if (!state.projects) state.projects = [];
	if (!state.waves) state.waves = [];
	if (!state.redeals) state.redeals = {};
	if (typeof state.boardStep !== "number") state.boardStep = 0;
	if (!state.payAnnual) state.payAnnual = {};
	if (!state.focus) state.focus = {};
	if (!state.notes) state.notes = {};
	if (!state.offPp) state.offPp = {};
	if (!state.skipped) state.skipped = {};
	if (!state.decisions) state.decisions = [];
	ensureSlots(state);
	return state;
}
function returnHands(state) {
	hydrate(state);
	for (const dept of BOARD_DEPTS) {
		const hand = state.hands?.[dept] ?? [];
		if (!hand.length) continue;
		const bag = state.bags.dept[dept] ?? [];
		for (const card of hand) bag.unshift(card.index);
		state.bags.dept[dept] = bag;
		state.hands[dept] = [];
	}
}
function pushLog(state, text, scope = "public", table = "") {
	state.log.push({
		id: uid(),
		at: Date.now(),
		scope,
		table,
		text
	});
	if (state.log.length > 300) state.log.splice(0, state.log.length - 300);
}
function snapshotTimers(state, now) {
	const t = state.timers;
	if (t.running && !t.paused) {
		if (t.roundDeadline) t.roundLeft = Math.max(0, Math.ceil((t.roundDeadline - now) / 1e3));
		if (t.gameDeadline) t.gameLeft = Math.max(0, Math.ceil((t.gameDeadline - now) / 1e3));
	}
}
function arm(state, now, which) {
	const t = state.timers;
	if (which === "round" || which === "both") t.roundDeadline = now + t.roundLeft * 1e3;
	if (which === "game" || which === "both") t.gameDeadline = now + t.gameLeft * 1e3;
	t.running = true;
	t.paused = false;
}
function seatName(raw) {
	return raw.replace(/\s+/g, " ").trim().slice(0, 48);
}
function sameName(a, b) {
	return seatName(a).toLowerCase() === seatName(b).toLowerCase();
}
function claimProfile(state, player, profileId) {
	if (!profileId) return null;
	const other = state.players.find((p) => p.profileId && p.profileId === profileId && p.id !== player.id);
	if (other) return "That player is already seated in this game.";
	if (player.profileId && player.profileId !== profileId) return "This seat was saved for someone else.";
	player.profileId = profileId;
	return null;
}
function fullName(name) {
	const parts = name.split(" ").filter(Boolean);
	return parts.length >= 2 && parts[parts.length - 1].length >= 2;
}
function isClaimed(player) {
	return player.claimed !== false && player.secret.length > 0;
}
function activePlayers(state, dept) {
	return state.players.filter((p) => p.active && (dept ? p.dept === dept : true)).sort((a, b) => a.joinOrder - b.joinOrder);
}
export function headsFor(state) {
	const tables = /* @__PURE__ */ new Map();
	for (const p of activePlayers(state)) {
		const list = tables.get(p.table) ?? [];
		list.push(p);
		tables.set(p.table, list);
	}
	const heads = [];
	for (const [table, members] of tables) {
		const override = state.headOverride[`${state.round}:${table}`];
		const picked = override ? members.find((p) => p.id === override) : members[(state.round - 1) % members.length];
		if (!picked) continue;
		heads.push({
			table,
			playerId: picked.id,
			name: picked.name,
			dept: picked.dept
		});
	}
	return heads;
}
export function isHead(state, playerId) {
	return headsFor(state).some((h) => h.playerId === playerId);
}
function roundKey(state, dept) {
	return `${state.round}:${dept}`;
}
export function annualOf(state, dept) {
	const book = state.payAnnual ?? {};
	if (typeof book[dept] === "number") return book[dept];
	let found = null;
	let best = Infinity;
	for (const [key, value] of Object.entries(book)) {
		if (typeof value !== "number") continue;
		const cut = key.lastIndexOf(":");
		if (cut < 0 || key.slice(cut + 1) !== dept) continue;
		const round = Number(key.slice(0, cut));
		if (Number.isFinite(round) && round < best) {
			best = round;
			found = value;
		}
	}
	return found;
}
export function missingPayroll(state) {
	return BOARD_CUE.filter((dept) => annualOf(state, dept) == null);
}
function chargeWeeks(state) {
	while (state.scores.length < state.round) state.scores.push({ revenue: {}, payroll: {} });
	const row = state.scores[state.round - 1];
	if (!row) return;
	for (const dept of BOARD_CUE) {
		const annual = annualOf(state, dept);
		if (annual == null) continue;
		row.payroll[dept] = Math.round(annual * 100 / 52);
	}
}
function noteDecision(state, actor, kind, detail) {
	if (!actor?.id) return;
	if (!state.decisions) state.decisions = [];
	const seated = state.players.find((p) => p.id === actor.id);
	state.decisions.push({
		id: uid(),
		round: state.round,
		dept: actor.dept,
		playerId: actor.id,
		playerName: actor.name,
		profileId: seated?.profileId || actor.profileId || "",
		kind,
		detail
	});
}
export function setAnnualPay(prev, dept, dollars, now, actor) {
	const state = clone(prev);
	hydrate(state);
	if (state.status !== "live") return fail("Start the game first.");
	if (annualOf(state, dept) != null) return fail("Payroll is locked. It was set at the start and cannot be changed.");
	const gm = actor?.dept === "General Manager";
	const current = BOARD_CUE[state.boardStep ?? 0];
	if (gm) {
		if (current !== "General Manager") return fail("The GM sets payroll at the start, before the first event.");
	} else if (actor?.dept !== dept || dept !== current) return fail("The GM sets each department's payroll once.");
	if (typeof dollars !== "number" || !Number.isFinite(dollars) || dollars < 1000 || dollars > 5e6) return fail("Enter an annual payroll from $1,000 to $5,000,000.");
	const annual = Math.round(dollars);
	const weekly = Math.round(annual * 100 / 52);
	state.payAnnual[dept] = annual;
	for (let r = 0; r < state.round; r++) {
		const row = state.scores[r];
		if (row) row.payroll[dept] = weekly;
	}
	const who = actor?.name ?? "GM";
	pushLog(state, `${who} locked ${dept} annual payroll at $${annual.toLocaleString("en-US")}. Charged every round: $${Math.round(weekly / 100).toLocaleString("en-US")}.`);
	noteDecision(state, actor, "payroll", `${dept} · $${annual.toLocaleString("en-US")} a year`);
	return { ok: true, state };
}
export function setFocusProjects(prev, dept, ids, now, actor) {
	const state = clone(prev);
	hydrate(state);
	if (state.status !== "live") return fail("Start the game first.");
	const current = BOARD_CUE[state.boardStep ?? 0];
	if (dept !== current) return fail("It is not this department's turn.");
	if (!Array.isArray(ids) || ids.length !== 2 || ids[0] === ids[1]) return fail("Choose two different open projects.");
	const picked = ids.map((id) => state.projects.find((project) => project.id === id && project.status !== "closed"));
	if (picked.some((project) => !project)) return fail("Both projects have to be open.");
	state.focus[roundKey(state, dept)] = ids;
	const detail = `Project ${picked[0].n} and Project ${picked[1].n}`;
	pushLog(state, `${actor?.name ?? dept} locked ${detail} for ${dept} this round.`);
	noteDecision(state, actor, "focus", detail);
	return { ok: true, state };
}
export function saveNote(prev, playerId, text) {
	const state = clone(prev);
	hydrate(state);
	state.notes[playerId] = String(text ?? "").slice(0, 2000);
	return { ok: true, state };
}
export function skipCards(prev, dept, actor) {
	const state = clone(prev);
	hydrate(state);
	if (state.status !== "live") return fail("Start the game first.");
	const current = BOARD_CUE[state.boardStep ?? 0];
	if (dept !== current) return fail("It is not this department's turn.");
	state.skipped[roundKey(state, dept)] = true;
	state.hands[dept] = (state.hands[dept] ?? []).filter((card) => card.round !== state.round);
	pushLog(state, `${actor?.name ?? dept} has no legal play on the two projects. The turn moves on.`, "table", dept);
	noteDecision(state, actor, "pass", "No legal play");
	return { ok: true, state };
}
export function scenarioCap(state, dept) {
	return activePlayers(state, dept).length <= 3 ? 3 : 5;
}
export function answersThisRound(state, dept) {
	return state.answers.filter((a) => a.round === state.round && a.dept === dept);
}
export function latestValue(state, dept) {
	const list = answersThisRound(state, dept);
	if (!list.length) return null;
	return list[list.length - 1].valueCents;
}
function deptsInPlay(state) {
	const set = new Set(BOARD_DEPTS);
	for (const p of state.players) set.add(p.dept);
	for (const a of state.answers) set.add(a.dept);
	return ALL_DEPTS.filter((d) => set.has(d));
}
function marginOk(profit, revenue, bps) {
	if (revenue <= 0) return false;
	return profit * 1e4 >= revenue * bps;
}
export function computeBoard(state) {
	const depts = deptsInPlay(state).map((dept) => {
		let revenue = 0;
		let payroll = 0;
		let payrollMissing = false;
		for (let r = 0; r < state.scores.length; r++) {
			const row = state.scores[r];
			const rev = row?.revenue[dept];
			const pay = row?.payroll[dept];
			if (typeof rev === "number") revenue += rev;
			if (typeof pay === "number") payroll += pay;
		}
		const pp = state.answers.filter((a) => a.dept === dept).reduce((s, a) => s + a.valueCents, 0);
		const netPay = Math.max(0, payroll - pp);
		const profit = revenue - netPay;
		const margin = revenue > 0 ? profit / revenue : null;
		return {
			dept,
			revenue,
			payroll,
			netPay,
			pp,
			profit,
			margin,
			payrollMissing
		};
	});
	const adj = state.adjustments.reduce((s, a) => s + a.cents, 0);
	const revenue = depts.reduce((s, d) => s + d.revenue, 0) + adj;
	const netPay = depts.reduce((s, d) => s + d.netPay, 0);
	const pp = depts.reduce((s, d) => s + d.pp, 0);
	const profit = revenue - netPay;
	const margin = revenue > 0 ? profit / revenue : null;
	const valuation = profit * 3;
	const ok = marginOk(profit, revenue, state.settings.marginBps);
	const through = state.status === "live" || state.status === "lobby" ? state.round : state.settings.rounds;
	const rounds = [];
	for (let r = 1; r <= through; r++) {
		let rev = 0;
		let pay = 0;
		let ppR = 0;
		for (const dept of deptsInPlay(state)) {
			const row = state.scores[r - 1];
			const rv = row?.revenue[dept];
			const py = row?.payroll[dept];
			if (typeof rv === "number") rev += rv;
			if (typeof py === "number") pay += py;
			ppR += state.answers.filter((a) => a.dept === dept && a.round === r).reduce((s, a) => s + a.valueCents, 0);
		}
		rev += state.adjustments.filter((a) => a.round === r).reduce((s, a) => s + a.cents, 0);
		const net = Math.max(0, pay - ppR);
		rounds.push({
			round: r,
			revenue: rev,
			payroll: net,
			pp: ppR,
			profit: rev - net
		});
	}
	return {
		depts,
		rounds,
		revenue,
		netPay,
		pp,
		profit,
		margin,
		valuation,
		win: valuation >= state.settings.winCents && ok,
		marketLeader: valuation >= state.settings.mlCents && ok,
		adj,
		marginOk: ok
	};
}
export function honorsOf(state) {
	const honors = [];
	const correct = /* @__PURE__ */ new Map();
	for (const a of state.answers) {
		if (!a.playerId || a.valueCents !== 5e4) continue;
		const row = correct.get(a.playerId) ?? {
			name: a.playerName,
			n: 0
		};
		row.n += 1;
		correct.set(a.playerId, row);
	}
	const best = Math.max(0, ...[...correct.values()].map((r) => r.n));
	if (best > 0) honors.push({
		id: "judgment",
		title: "Best Judgment",
		detail: `${best} strong answer${best === 1 ? "" : "s"} at +$500`,
		names: [...correct.values()].filter((r) => r.n === best).map((r) => r.name)
	});
	const received = /* @__PURE__ */ new Map();
	for (const s of state.shoutouts) {
		const row = received.get(s.toId) ?? {
			name: s.toName,
			n: 0
		};
		row.n += 1;
		received.set(s.toId, row);
	}
	const iron = Math.max(0, ...[...received.values()].map((r) => r.n));
	if (iron > 0) honors.push({
		id: "iron",
		title: "Iron Sharpens Iron",
		detail: `${iron} shout-out${iron === 1 ? "" : "s"} from the table`,
		names: [...received.values()].filter((r) => r.n === iron).map((r) => r.name)
	});
	const climbs = [];
	for (const p of state.players) {
		const pre = state.surveys[p.id]?.pre;
		const post = state.surveys[p.id]?.post;
		if (!pre || !post || pre.length < 3 || post.length < 3) continue;
		const delta = post.reduce((s, n, i) => s + n - (pre[i] ?? n), 0);
		climbs.push({
			name: p.name,
			delta
		});
	}
	if (climbs.length) {
		const max = Math.max(...climbs.map((c) => c.delta));
		if (max > 0) honors.push({
			id: "climb",
			title: "Biggest Climb",
			detail: `+${max} across the three matched questions`,
			names: climbs.filter((c) => c.delta === max).map((c) => c.name)
		});
	}
	return honors;
}
export function principleCounts(state) {
	const map = /* @__PURE__ */ new Map();
	for (const a of state.answers) {
		if (a.valueCents !== 5e4) continue;
		map.set(a.principle, (map.get(a.principle) ?? 0) + 1);
	}
	return [...map.entries()].map(([name, count]) => ({
		name,
		count
	})).sort((a, b) => b.count - a.count);
}
function fail(error): Step {
	return {
		ok: false,
		error
	};
}
function live(state) {
	if (state.status !== "live") return "The game is not in progress.";
	return null;
}
export function seatCast(prev, now) {
	const state = clone(prev);
	if (!state.rehearsal) return fail("Stand-in seats are only for a rehearsal.");
	const cast = [
		["Quinn Rehearsal", "General Manager"],
		["Morgan Rehearsal", "Marketing"],
		["Casey Rehearsal", "Appointment Center"],
		["Riley Rehearsal", "Sales"],
		["Jordan Rehearsal", "Production"],
		["Avery Rehearsal", "Accounting"]
	];
	let added = 0;
	for (const [name, dept] of cast) {
		if (state.players.some((p) => p.active && p.dept === dept)) continue;
		if (state.players.some((p) => sameName(p.name, name))) continue;
		const order = state.players.reduce((m, p) => Math.max(m, p.joinOrder), 0) + 1;
		state.players.push({
			id: uid(),
			name,
			dept,
			table: dept,
			joinOrder: order,
			joinedAt: now,
			active: true,
			claimed: false,
			standIn: true,
			phone: "",
			invite: freshInvite(state),
			secret: ""
		});
		added += 1;
	}
	if (added) pushLog(state, "Rehearsal seats filled with stand-in players.", "host");
	return { ok: true, state };
}
export function reduceHost(prev, type, payload, now): Step {
	const state = clone(prev);
	snapshotTimers(state, now);
	const str = (k) => typeof payload[k] === "string" ? payload[k].trim() : "";
	const num = (k) => typeof payload[k] === "number" && Number.isFinite(payload[k]) ? payload[k] : null;
	switch (type) {
		case "rename": {
			const company = str("company").slice(0, 48);
			if (!company) return fail("Give the company a name.");
			state.company = company;
			return {
				ok: true,
				state
			};
		}
		case "lock":
			state.rosterLocked = Boolean(payload.locked);
			pushLog(state, state.rosterLocked ? "Roster locked." : "Roster reopened.");
			return {
				ok: true,
				state
			};
		case "fillCast":
			return seatCast(state, now);
		case "start":
			if (state.status !== "lobby" && state.status !== "audit") return fail("Start is only available from the lobby.");
			const open = SEAT_DEPTS.filter((dept) => !state.players.some((p) => p.active && p.dept === dept));
			if (open.length) return fail(`Fill every seat first: ${open.join(", ")}.`);
			state.status = "live";
			state.round = 1;
			state.phase = 1;
			state.rosterLocked = true;
			state.timers.roundLeft = state.settings.roundSec;
			state.timers.gameLeft = state.settings.gameSec;
			arm(state, now, "both");
			state.showBeat = 0;
			state.boardStep = 0;
			state.bags.event = shuffle(state.bags.event ?? []);
			pushLog(state, "Game started. Round 1. At the board: GM.");
			return {
				ok: true,
				state
			};
		case "phase": {
			const blocked = live(state);
			if (blocked) return fail(blocked);
			const phase = num("phase");
			if (phase === null || phase < 1 || phase > 5) return fail("Unknown phase.");
			state.phase = phase;
			pushLog(state, `Phase ${phase}: ${[
				"",
				"Event",
				"Board & P&P",
				"Projects",
				"Draw & play",
				"Payroll"
			][phase]}.`);
			return {
				ok: true,
				state
			};
		}
		case "nextRound": {
			const blocked = live(state);
			if (blocked) return fail(blocked);
			if (state.round >= state.settings.rounds) return fail(`This game is ${state.settings.rounds} rounds. Add a round, or end it from payroll.`);
			if (state.round === 6) chargeLateProjects(state, now);
			returnHands(state);
			state.round += 1;
			state.phase = 1;
			state.shield = {};
			state.boardStep = 0;
			state.bags.event = shuffle(state.bags.event ?? []);
			state.offPp = {};
			state.dutyCode = "";
			state.dutyFor = "";
			chargeWeeks(state);
			state.timers.roundLeft = state.settings.roundSec;
			if (state.timers.running && !state.timers.paused) state.timers.roundDeadline = now + state.timers.roundLeft * 1000;
			pushLog(state, `Round ${state.round} started. At the board: GM.`);
			return {
				ok: true,
				state
			};
		}
		case "addRound": {
			if (state.status !== "live" && state.status !== "lobby") return fail("Add rounds during the game.");
			if (state.settings.rounds >= 16) return fail("Sixteen rounds is the limit.");
			state.settings.rounds += 1;
			state.scores.push({ revenue: {}, payroll: {} });
			pushLog(state, `Added round ${state.settings.rounds}.`);
			return {
				ok: true,
				state
			};
		}
		case "boardBack": {
			if (state.status !== "live") return fail("The board order starts when the game does.");
			if ((state.boardStep ?? 0) <= 0) return fail("The GM is already up.");
			state.boardStep = (state.boardStep ?? 1) - 1;
			const dept = BOARD_CUE[state.boardStep] ?? "General Manager";
			if (BOARD_DEPTS.includes(dept)) recallPlay(state, dept);
			pushLog(state, `Back to ${DEPT_SHORT[dept]}. Their cards are back in hand.`);
			return {
				ok: true,
				state
			};
		}
		case "boardNext": {
			if (state.status !== "live") return fail("The board order starts when the game does.");
			const count = BOARD_CUE.length;
			state.boardStep = ((state.boardStep ?? 0) + 1) % count;
			const dept = BOARD_CUE[state.boardStep] ?? "General Manager";
			pushLog(state, `At the board: ${DEPT_SHORT[dept]}.`);
			return {
				ok: true,
				state
			};
		}
		case "endGame":
			if (state.status !== "live") return fail("The game is not in progress.");
			snapshotTimers(state, now);
			state.timers.running = false;
			state.timers.paused = false;
			state.timers.roundDeadline = null;
			state.timers.gameDeadline = null;
			state.status = "audit";
			state.showBeat = 1;
			pushLog(state, "Game moved to final audit. Result is on the room display.");
			return {
				ok: true,
				state
			};
		case "openPost":
			if (state.status !== "audit" && state.status !== "post") return fail("Finish the audit first.");
			state.status = "post";
			pushLog(state, "Post-game questions are open on player phones.");
			return {
				ok: true,
				state
			};
		case "finish":
			if (state.status !== "post" && state.status !== "audit") return fail("Close out from the post-game step.");
			state.status = "done";
			pushLog(state, "Game closed.");
			return {
				ok: true,
				state
			};
		case "reopen":
			if (state.status === "lobby") return fail("The game has not started.");
			state.status = "audit";
			pushLog(state, "Audit reopened for a correction.", "host");
			return {
				ok: true,
				state
			};
		case "pause":
			if (!state.timers.running) return fail("The clocks are not running.");
			snapshotTimers(state, now);
			state.timers.paused = true;
			state.timers.roundDeadline = null;
			state.timers.gameDeadline = null;
			pushLog(state, "Clocks paused.");
			return {
				ok: true,
				state
			};
		case "resume":
			if (!state.timers.running || !state.timers.paused) return fail("The clocks are not paused.");
			arm(state, now, "both");
			pushLog(state, "Clocks resumed.");
			return {
				ok: true,
				state
			};
		case "extend": {
			const target = str("target");
			const seconds = num("seconds");
			if (target !== "round" && target !== "game" || seconds === null || seconds < 30 || seconds > 3600) return fail("Add between 30 seconds and 60 minutes.");
			if (target === "round") {
				state.timers.roundLeft += seconds;
				if (state.timers.roundDeadline) state.timers.roundDeadline += seconds * 1e3;
			} else {
				state.timers.gameLeft += seconds;
				if (state.timers.gameDeadline) state.timers.gameDeadline += seconds * 1e3;
			}
			pushLog(state, `Added ${Math.round(seconds / 60)} min to the ${target} clock.`);
			return {
				ok: true,
				state
			};
		}
		case "resetRound":
			state.timers.roundLeft = state.settings.roundSec;
			if (state.timers.running && !state.timers.paused) state.timers.roundDeadline = now + state.settings.roundSec * 1e3;
			pushLog(state, "Round clock reset to 8:00.");
			return {
				ok: true,
				state
			};
		case "scores": {
			if (state.status === "done" || state.status === "lobby") return fail("Enter scores while the game is live or in audit.");
			const round = num("round");
			if (round === null || round < 1 || round > state.settings.rounds) return fail("That round is not in this game.");
			while (state.scores.length < round) state.scores.push({ revenue: {}, payroll: {} });
			const rows = Array.isArray(payload.rows) ? payload.rows : [];
			const slot = state.scores[round - 1];
			for (const row of rows) {
				if (!row || typeof row !== "object") continue;
				const rec = row;
				const dept = typeof rec.dept === "string" ? rec.dept : "";
				if (!ALL_DEPTS.includes(dept)) continue;
				const d = dept;
				const beforeR = slot.revenue[d];
				const beforeP = slot.payroll[d];
				slot.revenue[d] = centsField(rec.revenue);
				slot.payroll[d] = centsField(rec.payroll);
				if (slot.revenue[d] !== beforeR || slot.payroll[d] !== beforeP) pushLog(state, `Round ${round} ${dept}: revenue ${show(slot.revenue[d])}, base payroll ${show(slot.payroll[d])}.`, "host");
			}
			return {
				ok: true,
				state
			};
		}
		case "adjust": {
			if (state.status === "lobby" || state.status === "done") return fail("Adjustments are closed.");
			const label = str("label").slice(0, 80);
			const dollars = num("dollars");
			if (!label || dollars === null || Math.abs(dollars) > 1e6) return fail("Enter a label and an amount.");
			state.adjustments.push({
				id: uid(),
				round: state.round,
				label,
				cents: Math.round(dollars * 100),
				at: now
			});
			pushLog(state, `${label}: ${dollars < 0 ? "-" : "+"}$${Math.abs(dollars).toLocaleString("en-US")} revenue.`);
			return {
				ok: true,
				state
			};
		}
		case "applyPending": {
			const id = str("id");
			const item = state.pending.find((p) => p.id === id);
			if (!item) return fail("That bonus is already posted.");
			state.pending = state.pending.filter((p) => p.id !== id);
			state.adjustments.push({
				id: uid(),
				round: state.round,
				label: item.label,
				cents: item.cents,
				at: now
			});
			pushLog(state, `${item.label} posted to revenue.`);
			return {
				ok: true,
				state
			};
		}
		case "dropPending": {
			const id = str("id");
			state.pending = state.pending.filter((p) => p.id !== id);
			return {
				ok: true,
				state
			};
		}
		case "reassign": {
			const playerId = str("playerId");
			const player = activePlayers(state).find((p) => p.id === playerId);
			if (!player) return fail("That player is not active.");
			state.headOverride[`${state.round}:${player.table}`] = player.id;
			pushLog(state, `Round ${state.round} department head: ${player.name}.`);
			return {
				ok: true,
				state
			};
		}
		case "announce":
			state.announcement = str("text").slice(0, 180);
			if (state.announcement) pushLog(state, `Announcement: ${state.announcement}`);
			return {
				ok: true,
				state
			};
		case "help": {
			const id = str("id");
			const status = str("status");
			const item = state.help.find((h) => h.id === id);
			if (!item) return fail("Request not found.");
			if (status !== "ack" && status !== "done" && status !== "open") return fail("Unknown status.");
			item.status = status;
			return {
				ok: true,
				state
			};
		}
		case "show": {
			const beat = num("beat");
			if (beat === null || beat < 0 || beat > 7) return fail("Unknown show beat.");
			state.showBeat = beat;
			return {
				ok: true,
				state
			};
		}
		case "move": {
			const playerId = str("playerId");
			const dept = str("dept");
			if (!ALL_DEPTS.includes(dept)) return fail("Unknown department.");
			const player = state.players.find((p) => p.id === playerId);
			if (!player) return fail("Player not found.");
			player.dept = dept;
			player.table = dept;
			pushLog(state, `${player.name} moved to ${dept}.`);
			return {
				ok: true,
				state
			};
		}
		case "excuse": {
			const playerId = str("playerId");
			const player = state.players.find((p) => p.id === playerId);
			if (!player) return fail("Player not found.");
			player.active = !player.active;
			pushLog(state, `${player.name} marked ${player.active ? "active" : "excused"}.`, "host");
			return {
				ok: true,
				state
			};
		}
		case "seat": {
			if (state.status === "done") return fail("This game is closed.");
			const dept = str("dept");
			if (!ALL_DEPTS.includes(dept)) return fail("Choose a role.");
			const name = seatName(str("name"));
			if (!fullName(name)) return fail("Enter a first name and full last name.");
			if (state.players.some((p) => sameName(p.name, name))) return fail("That name is already on the roster.");
			const profileId = str("profileId");
			if (profileId && state.players.some((p) => p.profileId === profileId)) return fail("That player is already seated in this game.");
			if (state.players.filter((p) => p.active).length >= 40) return fail("This game is full.");
			const rawPhone = str("phone");
			let phone = "";
			if (rawPhone) {
				const parsed = normalizePhone(rawPhone);
				if (!parsed) return fail("Enter a 10-digit mobile number.");
				phone = parsed;
			}
			const order = state.players.reduce((m, p) => Math.max(m, p.joinOrder), 0) + 1;
			state.players.push({
				id: uid(),
				name,
				dept,
				table: dept,
				joinOrder: order,
				joinedAt: now,
				active: true,
				claimed: false,
				phone,
				invite: freshInvite(state),
				secret: "",
				profileId: profileId || undefined
			});
			pushLog(state, `${name} joined ${dept}.`);
			return {
				ok: true,
				state
			};
		}
		case "invites":
			for (const player of state.players) if (!player.invite) player.invite = freshInvite(state);
			return {
				ok: true,
				state
			};
		case "reach": {
			const player = state.players.find((p) => p.id === str("playerId"));
			if (!player) return fail("Player not found.");
			if ("phone" in payload) {
				const raw = str("phone");
				if (!raw) player.phone = "";
				else {
					const parsed = normalizePhone(raw);
					if (!parsed) return fail("Enter a 10-digit mobile number.");
					player.phone = parsed;
				}
			}
			if (!player.invite) player.invite = freshInvite(state);
			if (payload.mark === true && player.phone) {
				player.textedAt = now;
				pushLog(state, `Seat text opened for ${player.name}.`, "host");
			}
			return {
				ok: true,
				state
			};
		}
		case "texted": {
			const player = state.players.find((p) => p.id === str("playerId"));
			if (!player) return fail("Player not found.");
			player.textedAt = now;
			pushLog(state, `Seat link texted to ${player.name}.`, "host");
			return {
				ok: true,
				state
			};
		}
		case "release": {
			const player = state.players.find((p) => p.id === str("playerId"));
			if (!player) return fail("Player not found.");
			player.secret = "";
			player.claimed = false;
			pushLog(state, `${player.name} can rejoin from a phone.`, "host");
			return {
				ok: true,
				state
			};
		}
		case "drop": {
			const playerId = str("playerId");
			const player = state.players.find((p) => p.id === playerId);
			if (!player) return fail("Player not found.");
			state.players = state.players.filter((p) => p.id !== playerId);
			for (const key of Object.keys(state.headOverride)) if (state.headOverride[key] === playerId) delete state.headOverride[key];
			pushLog(state, `${player.name} removed from the roster.`, "host");
			return {
				ok: true,
				state
			};
		}
		default: return fail("Unknown host action.");
	}
}
function show(cents) {
	if (cents === null || cents === void 0) return "—";
	return `${cents < 0 ? "-" : ""}$${Math.round(Math.abs(cents) / 100).toLocaleString("en-US")}`;
}
function centsField(value) {
	if (value === null || value === "") return null;
	if (typeof value !== "number" || !Number.isFinite(value)) return null;
	if (Math.abs(value) > 1e6) return null;
	return Math.round(value * 100);
}
export function recordAnswer(prev, input): Answered {
	const state = clone(prev);
	const { card } = input;
	if (!input.asGm) {
		const blocked = live(state);
		if (blocked) return fail(blocked);
		if (!input.player) return fail("Join the table before answering.");
		if (input.player.dept !== card.dept) return fail("This card is for another department.");
		if (!isHead(state, input.player.id)) return fail("Only the person up this round can submit the answer.");
	} else if (state.status !== "live" && state.status !== "audit") return fail("Open the game before recording an answer.");
	const used = answersThisRound(state, card.dept);
	const existing = used.find((a) => a.cardCode === card.code);
	if (existing) return {
		ok: true,
		state,
		answer: existing,
		duplicate: true
	};
	const onTurn = (BOARD_CUE[state.boardStep ?? 0] ?? "General Manager") === card.dept;
	const hasDuty = used.some((a) => a.duty);
	if (!onTurn && (state.offPp?.[card.dept] ?? 0) >= 5) return fail("Five People & Principles cards is the limit until this department's next turn.");
	if (onTurn && hasDuty) return fail("This department already answered its card. More People & Principles cards open after this turn.");
	if (!onTurn) state.offPp[card.dept] = (state.offPp?.[card.dept] ?? 0) + 1;
	const answer = {
		id: uid(),
		round: state.round,
		dept: card.dept,
		playerId: input.player?.id ?? null,
		playerName: input.player?.name ?? "GM",
		cardCode: card.code,
		title: card.title,
		choice: card.choice,
		choiceText: card.choiceText,
		valueCents: card.valueCents,
		correct: card.correct,
		principle: principleOf(card.hostNote),
		hostNote: card.hostNote,
		at: input.now,
		duty: onTurn
	};
	state.answers.push(answer);
	noteDecision(state, input.player, "pp", `${card.code} · ${card.choice}`);
	const who = answer.playerName || card.dept;
	const strong = card.valueCents === 5e4;
	pushLog(state, strong ? `${who} · ${card.code} · strong answer · +$500 payroll savings · ${answer.principle}.` : `${who} · ${card.code} · ${card.valueCents === 0 ? "$0" : "+$150"} · ${answer.principle}.`, "table", card.dept);
	if (strong) {
		pushLog(state, `${card.dept} banked $500 in payroll savings.`, "public");
		if (onTurn) clearNegatives(state, card.dept);
	}
	return {
		ok: true,
		state,
		answer,
		duplicate: false
	};
}
export function recordFace(prev, deck, card, bag, now, moneyCents: number | null = null): Step {
	const state = clone(prev);
	if (state.status === "lobby") return fail("Start the game before drawing.");
	const draw = {
		id: uid(),
		round: state.round,
		name: card.name,
		text: card.text,
		type: card.type,
		at: now
	};
	if (deck === "event") {
		state.events.unshift(draw);
		state.bags.event = bag;
		pushLog(state, `Event: ${card.name}.`);
		if (moneyCents) {
			state.adjustments.push({
				id: uid(),
				round: state.round,
				label: card.name,
				cents: moneyCents,
				at: now
			});
			pushLog(state, `${card.name}: ${moneyCents < 0 ? "-" : "+"}$${Math.abs(moneyCents) / 100} company revenue.`);
		}
	} else if (deck === "customer") {
		state.customers.unshift(draw);
		state.bags.customer = bag;
		pushLog(state, `Customer: ${card.name}.`);
	} else {
		state.houses.unshift(draw);
		state.bags.house = bag;
		pushLog(state, `House: ${card.name}.`);
	}
	return {
		ok: true,
		state
	};
}
export function recordDeptPlay(prev, input): Step {
	const state = clone(prev);
	if (!input.asGm) {
		const blocked = live(state);
		if (blocked) return fail(blocked);
		if (state.phase !== 4) return fail("Department cards are drawn in Draw & play.");
		if (!input.player || input.player.dept !== input.dept) return fail("Draw from your own department.");
		if (!isHead(state, input.player.id)) return fail("The department head draws for the table.");
	}
	if (!BOARD_DEPTS.includes(input.dept)) return fail("That seat uses a P&P deck, not a department action deck.");
	state.bags.dept[input.dept] = input.bag;
	const shielded = (state.shield[input.dept] ?? 0) > 0;
	if (shielded) state.shield[input.dept] = (state.shield[input.dept] ?? 1) - 1;
	const recent = latestValue(state, input.dept);
	const negative = input.card.type === "NEGATIVE";
	const forced = !shielded && negative && recent === 0;
	const exempt = shielded && negative;
	if (input.card.name === "CAMPAIGN REFRESH") state.shield[input.dept] = (state.shield[input.dept] ?? 0) + 2;
	const play = {
		id: uid(),
		round: state.round,
		dept: input.dept,
		name: input.card.name,
		type: input.card.type,
		text: input.card.text,
		forced,
		exempt,
		at: input.now
	};
	state.plays.unshift(play);
	if (input.reshuffled) pushLog(state, `${input.dept} action deck reshuffled.`, "table", input.dept);
	if (exempt) pushLog(state, `${input.dept} drew ${input.card.name}. Campaign Refresh: negatives don't play.`, "table", input.dept);
	else if (forced) pushLog(state, `${input.dept} must play ${input.card.name} immediately. It replaces the normal card play.`, "table", input.dept);
	else pushLog(state, `${input.dept} played ${input.card.name}.`, "table", input.dept);
	if (!exempt && input.moneyCents) {
		state.adjustments.push({
			id: uid(),
			round: state.round,
			label: `${input.dept}: ${input.card.name}`,
			cents: input.moneyCents,
			at: input.now
		});
		pushLog(state, `${input.card.name}: ${input.moneyCents < 0 ? "-" : "+"}$${Math.abs(input.moneyCents) / 100} revenue.`);
	}
	if (!exempt && input.pendingCents) {
		state.pending.push({
			id: uid(),
			round: state.round,
			dept: input.dept,
			label: `${input.dept}: ${input.card.name} on project completion`,
			cents: input.pendingCents
		});
		pushLog(state, `${input.card.name} waits for project completion (+$${input.pendingCents / 100}).`, "host");
	}
	return {
		ok: true,
		state
	};
}
export function giveHand(prev, input): Step {
	const state = clone(prev);
	hydrate(state);
	if (!BOARD_DEPTS.includes(input.dept)) return fail("That seat uses a P&P deck, not a department action deck.");
	if (!input.asGm) {
		const blocked = live(state);
		if (blocked) return fail(blocked);
		if (!input.player || input.player.dept !== input.dept) return fail("Deal your own department.");
		if (!isHead(state, input.player.id)) return fail("The department head deals for the table.");
	} else if (state.status === "lobby") return fail("Start the game before dealing.");
	if ((state.hands[input.dept] ?? []).filter((card) => card.round === state.round).length) return fail(`${input.dept} already has a hand this round.`);
	if (input.cards.length < PLAY_COUNT) return fail("Not enough cards left to deal a hand.");
	state.bags.dept[input.dept] = input.bag;
	state.hands[input.dept] = input.cards;
	if (input.reshuffled) pushLog(state, `${input.dept} action deck reshuffled.`, "table", input.dept);
	pushLog(state, `${input.dept} was dealt ${input.cards.length} cards. Choose ${PLAY_COUNT} to play.`, "table", input.dept);
	return {
		ok: true,
		state
	};
}
export function playHand(prev, input): Step {
	const state = clone(prev);
	hydrate(state);
	if (!input.asGm) {
		const blocked = live(state);
		if (blocked) return fail(blocked);
		if (!input.player || input.player.dept !== input.dept) return fail("Play your own department.");
		if (!isHead(state, input.player.id)) return fail("Only the person up this round plays the cards.");
	}
	if (input.ids.length < 1 || input.ids.length > PLAY_COUNT || new Set(input.ids).size !== input.ids.length) return fail("Choose the cards that can actually be played.");
	if (state.plays.filter((play) => play.dept === input.dept && play.round === state.round).length >= PLAY_COUNT) return fail("This department already played its cards this round.");
	const focus = state.focus?.[`${state.round}:${input.dept}`] ?? [];
	if (BOARD_DEPTS.includes(input.dept) && focus.length < 2) return fail("Choose the two projects this department will focus on first.");
	const hand = state.hands[input.dept] ?? [];
	const picked = input.ids.map((id) => hand.find((card) => card.id === id));
	if (picked.some((card) => !card)) return fail("Those cards are not in this hand.");
	const shielded = (state.shield[input.dept] ?? 0) > 0;
	const negatives = hand.filter((card) => card.type === "NEGATIVE" && card.round === state.round);
	const cleared = latestValue(state, input.dept) === 50000;
	const stuck = negatives.filter((card) => !cleared && negativePlayable(state, input.dept, card));
	if (stuck.length && !picked.some((card) => stuck.includes(card))) {
		return fail("That negative can be played on one of your two projects, so it stays mandatory. The best People & Principles answer clears it.");
	}
	const targets = picked.map((card) => {
		const fromPlacement = input.placements?.find((item) => item.id === card.id);
		const exempt = shielded && card.type === "NEGATIVE";
		const projectIds = exempt ? [] : fromPlacement ? fromPlacement.projectIds.filter(Boolean) : (input.projectIds ?? []).filter(Boolean);
		if (projectIds.some((id) => !focus.includes(id))) return "That project is not one of the two this department chose.";
		const placed = exempt ? true : applyIcons(state, input.dept, card, projectIds);
		if (typeof placed === "string") return placed;
		return { card, projectIds };
	});
	const problem = targets.find((item) => typeof item === "string");
	if (typeof problem === "string") return fail(problem);
	state.hands[input.dept] = hand.filter((card) => !input.ids.includes(card.id));
	targets.forEach((item, i) => {
		if (!item || typeof item === "string") return;
		const projects = item.projectIds.map((id) => state.projects.find((project) => project.id === id)).filter(Boolean);
		commitPlayed(state, {
			dept: input.dept,
			name: item.card.name,
			type: item.card.type,
			text: item.card.text,
			shielded: (state.shield[input.dept] ?? 0) > 0,
			moneyCents: input.money[i] ?? null,
			pendingCents: input.pending[i] ?? null,
			projectId: projects[0]?.id,
			projectIds: projects.map((project) => project.id),
			projectLabel: projects.map((project) => projectTitle(project)).join(" · "),
			playerId: input.player?.id,
			playerName: input.player?.name,
			now: input.now
		});
		for (const id of item.projectIds) {
			const project = state.projects.find((row) => row.id === id);
			if (project) settleProject(state, project, input.now);
		}
	});
	return {
		ok: true,
		state
	};
}
function projectTitle(project) {
	const who = project.customer?.name ?? "No customer";
	const where = project.house?.name ?? "No house";
	return `Project ${project.n}: ${who} · ${where}`;
}
function commitPlayed(state, input) {
	if (input.shielded) state.shield[input.dept] = (state.shield[input.dept] ?? 1) - 1;
	const recent = latestValue(state, input.dept);
	const negative = input.type === "NEGATIVE";
	const forced = !input.shielded && negative && recent === 0;
	const exempt = input.shielded && negative;
	if (input.name === "CAMPAIGN REFRESH") state.shield[input.dept] = (state.shield[input.dept] ?? 0) + 2;
	const play = {
		id: uid(),
		round: state.round,
		dept: input.dept,
		name: input.name,
		type: input.type,
		text: input.text,
		forced,
		exempt,
		at: input.now,
		projectId: input.projectId,
		projectIds: input.projectIds,
		projectLabel: input.projectLabel,
		playerId: input.playerId,
		playerName: input.playerName
	};
	state.plays.unshift(play);
	const on = input.projectLabel ? ` on ${input.projectLabel}` : "";
	const who = input.playerName || input.dept;
	if (exempt) pushLog(state, `${who} drew ${input.name}. Campaign Refresh: negatives don't play.`, "table", input.dept);
	else if (forced) pushLog(state, `${who} must play ${input.name} immediately${on}.`, "table", input.dept);
	else pushLog(state, `${who} played ${input.name}${on}.`, "table", input.dept);
	if (input.playerId) noteDecision(state, { id: input.playerId, name: input.playerName, dept: input.dept, profileId: "" }, "action", input.name);
	if (!exempt && input.moneyCents) {
		state.adjustments.push({
			id: uid(),
			round: state.round,
			label: `${input.dept}: ${input.name}`,
			cents: input.moneyCents,
			at: input.now
		});
		pushLog(state, `${input.name}: ${input.moneyCents < 0 ? "-" : "+"}$${Math.abs(input.moneyCents) / 100} revenue.`);
	}
	if (!exempt && input.pendingCents && input.projectId) {
		state.pending.push({
			id: uid(),
			round: state.round,
			dept: input.dept,
			label: `${input.dept}: ${input.name} on project completion`,
			cents: input.pendingCents,
			projectId: input.projectId
		});
		pushLog(state, `${input.name} waits for project completion (+$${input.pendingCents / 100}).`, "host");
	}
}
export function placeProject(prev, input): Step {
	const state = clone(prev);
	hydrate(state);
	if (state.status === "lobby") return fail("Start the game before opening a project.");
	if (!input.customer || !input.house) return fail("A project needs both a customer and a house.");
	const project = {
		id: uid(),
		n: state.projects.length + 1,
		round: state.round,
		valueCents: input.valueCents ?? 0,
		status: "open",
		customer: { name: input.customer.name, text: plainCardText(input.customer.text) },
		house: { name: input.house.name, text: plainCardText(input.house.text) },
		tokens: [],
		slotsReady: false
	};
	state.projects.push(project);
	ensureSlots(state);
	state.bags.customer = input.customerBag;
	state.bags.house = input.houseBag;
	const face = (name, text, type) => ({
		id: uid(),
		round: state.round,
		name,
		text,
		type,
		at: input.now
	});
	state.customers.unshift(face(input.customer.name, input.customer.text, "customer"));
	state.houses.unshift(face(input.house.name, input.house.text, "house"));
	pushLog(state, projectTitle(project) + ".");
	return {
		ok: true,
		state
	};
}
export function reshuffleBag(prev, dept, deck, bag): Step {
	const state = clone(prev);
	if (dept) state.bags.dept[dept] = bag;
	else if (deck === "event") state.bags.event = bag;
	else if (deck === "customer") state.bags.customer = bag;
	else state.bags.house = bag;
	pushLog(state, dept ? `${dept} deck reshuffled.` : `${deck} deck reshuffled.`, "host");
	return {
		ok: true,
		state
	};
}
export function joinPlayer(prev, input): Joined {
	const state = clone(prev);
	if (state.status === "done") return fail("This game is closed.");
	const seat = input.seat?.trim().toLowerCase() ?? "";
	if (seat) {
		const existing = state.players.find((p) => p.invite && p.invite === seat);
		if (!existing) return fail("That seat link is no longer valid. Ask the GM for a new text.");
		if (!existing.active) return fail("The GM marked this seat excused. Ask them to restore it.");
		const profileErr = claimProfile(state, existing, input.profileId);
		if (profileErr) return fail(profileErr);
		const back = isClaimed(existing);
		existing.secret = input.secret;
		existing.claimed = true;
		pushLog(state, back ? `${existing.name} rejoined from their link.` : `${existing.name} is on their phone.`, "host");
		return {
			ok: true,
			state,
			player: existing
		};
	}
	const name = seatName(input.name);
	if (!fullName(name)) return fail("Enter a first name and full last name.");
	const existing = state.players.find((p) => sameName(p.name, name));
	if (existing) {
		if (!existing.active) return fail("The GM marked this seat excused. Ask them to restore it.");
		const profileErr = claimProfile(state, existing, input.profileId);
		if (profileErr) return fail(profileErr);
		if (isClaimed(existing)) return fail("That name is already seated. Ask the GM to let this phone rejoin.");
		existing.secret = input.secret;
		existing.claimed = true;
		pushLog(state, `${existing.name} is on their phone.`, "host");
		return {
			ok: true,
			state,
			player: existing
		};
	}
	if (state.rosterLocked) return fail("The roster is locked. Ask the GM to add you and assign a role.");
	if (input.profileId && state.players.some((p) => p.profileId === input.profileId)) return fail("That player is already seated in this game.");
	if (state.players.filter((p) => p.active).length >= 40) return fail("This game is full.");
	const order = state.players.reduce((m, p) => Math.max(m, p.joinOrder), 0) + 1;
	const player = {
		id: uid(),
		name,
		dept: input.dept,
		table: input.dept,
		joinOrder: order,
		joinedAt: input.now,
		active: true,
		claimed: true,
		phone: "",
		invite: freshInvite(state),
		secret: input.secret,
		profileId: input.profileId || undefined
	};
	state.players.push(player);
	pushLog(state, `${name} joined ${input.dept}.`);
	return {
		ok: true,
		state,
		player
	};
}
function scale(values) {
	if (!Array.isArray(values) || values.length !== SURVEY.length) return null;
	const out = [];
	for (const v of values) {
		if (typeof v !== "number" || !Number.isInteger(v) || v < 1 || v > 5) return null;
		out.push(v);
	}
	return out;
}
export function playerSurvey(prev, player, phase, values): Step {
	const state = clone(prev);
	const scores = scale(values);
	if (!scores || phase !== "pre" && phase !== "post") return fail("Answer all three questions from 1 to 5.");
	if (phase === "post" && state.status !== "post" && state.status !== "audit" && state.status !== "done") return fail("Post-game questions open after the result locks.");
	const cur = state.surveys[player.id] ?? {};
	if (phase === "pre") cur.pre = scores;
	else cur.post = scores;
	state.surveys[player.id] = cur;
	return {
		ok: true,
		state
	};
}
export function playerHelp(prev, player, note): Step {
	const state = clone(prev);
	if (state.status !== "live") return fail("Help requests are open during play.");
	if (state.help.some((h) => h.playerId === player.id && h.status !== "done")) return fail("You already have an open request.");
	const text = note.trim().slice(0, 180);
	if (!text) return fail("Add a short note so the GM knows what you need.");
	state.help.unshift({
		id: uid(),
		playerId: player.id,
		name: player.name,
		dept: player.dept,
		note: text,
		status: "open",
		at: Date.now()
	});
	pushLog(state, `${player.name} requested help.`, "host");
	return {
		ok: true,
		state
	};
}
export function playerShout(prev, player, toId, principle): Step {
	const state = clone(prev);
	if (state.status !== "live" && state.status !== "audit") return fail("Shout-outs are open during the game.");
	if (state.shoutouts.some((s) => s.round === state.round && s.fromId === player.id)) return fail("One shout-out per round.");
	const to = activePlayers(state).find((p) => p.id === toId);
	if (!to || to.id === player.id) return fail("Choose a teammate.");
	if (to.table !== player.table) return fail("Shout out someone at your table.");
	const named = principle.trim().slice(0, 80);
	if (!named) return fail("Pick a principle.");
	state.shoutouts.push({
		id: uid(),
		round: state.round,
		fromId: player.id,
		fromName: player.name,
		toId: to.id,
		toName: to.name,
		principle: named,
		at: Date.now()
	});
	return {
		ok: true,
		state
	};
}
export function playerFeedback(prev, player, body): Step {
	const state = clone(prev);
	if (state.status !== "post" && state.status !== "done" && state.status !== "audit") return fail("Feedback opens with the final result.");
	const experience = body.experience;
	const nps = body.nps;
	const fb = state.feedback[player.id] ?? {};
	if (typeof experience === "number" && experience >= 1 && experience <= 5) fb.experience = experience;
	if (typeof nps === "number" && nps >= 0 && nps <= 10) fb.nps = nps;
	if (typeof body.quote === "string") fb.quote = body.quote.trim().slice(0, 240);
	if (typeof body.consent === "boolean") fb.consent = body.consent;
	if (typeof body.nextRole === "string") fb.nextRole = body.nextRole.slice(0, 40);
	state.feedback[player.id] = fb;
	return {
		ok: true,
		state
	};
}

function ensureSlots(state) {
	for (const project of state.projects ?? []) {
		if (project.customer?.text) project.customer.text = plainCardText(project.customer.text);
		if (project.house?.text) project.house.text = plainCardText(project.house.text);
		if (project.slotsReady) continue;
		if (!project.tokens) project.tokens = [];
		for (const dept of BOARD_DEPTS) {
			if (!project.tokens.some((token) => token.dept === dept && !token.bonus)) {
				project.tokens.push({ id: uid(), dept, filled: false });
			}
		}
		for (const text of [project.customer?.text ?? "", project.house?.text ?? ""]) {
			const extra = extraSlot(text);
			if (!extra) continue;
			const dept = extra === "any" ? BOARD_DEPTS[Math.floor(Math.random() * BOARD_DEPTS.length)] : extra;
			project.tokens.push({ id: uid(), dept, filled: false, bonus: true });
		}
		project.slotsReady = true;
		if (!project.status) project.status = "open";
		if (typeof project.valueCents !== "number") project.valueCents = 0;
	}
}

function clearNegatives(state, dept) {
	const hand = state.hands?.[dept] ?? [];
	const bad = hand.filter((card) => card.round === state.round && card.type === "NEGATIVE");
	if (!bad.length) return;
	let bag = [...(state.bags.dept[dept] ?? [])];
	for (const card of bad) bag.push(card.index);
	const aside = [];
	const drawn = [];
	let guard = 0;
	while (drawn.length < bad.length && guard < 80) {
		guard += 1;
		if (!bag.length) {
			bag = refillDept(dept).filter((index) => {
				const snap = deptSnap(index);
				return snap && snap.type !== "NEGATIVE";
			});
			if (!bag.length) break;
		}
		const index = bag.pop();
		const snap = index === undefined ? null : deptSnap(index);
		if (!snap || snap.type === "NEGATIVE") {
			if (index !== undefined) aside.push(index);
			continue;
		}
		drawn.push({
			id: uid(),
			index,
			name: snap.name,
			type: snap.type,
			text: snap.text,
			round: state.round
		});
	}
	state.bags.dept[dept] = [...bag, ...aside];
	state.hands[dept] = [...hand.filter((card) => !(card.round === state.round && card.type === "NEGATIVE")), ...drawn];
	pushLog(state, `${dept} chose the best answer. The negative is out and a new card was dealt.`, "table", dept);
}
function negativePlayable(state, dept, card) {
	const effect = cardEffect(card.text);
	const focus = state.focus?.[`${state.round}:${dept}`] ?? [];
	const projects = (state.projects ?? []).filter((project) => focus.includes(project.id) && project.status !== "closed");
	if (!projects.length) return false;
	if (effect.kind === "none") return true;
	if (effect.kind === "slot") return true;
	if (effect.kind === "remove" || effect.kind === "move") {
		return projects.some((project) => project.tokens.some((token) => token.filled && token.dept === dept));
	}
	return projects.some((project) => stageReady(project, dept) === true && project.tokens.some((token) => !token.filled && token.dept === dept));
}
function applyIcons(state, dept, card, projectIds) {
	const effect = cardEffect(card.text);
	const icon = DEPT_ICON[dept] ?? "icon";
	const open = (id) => {
		const project = state.projects.find((item) => item.id === id);
		if (!project || project.status === "closed") return null;
		return project;
	};
	if (effect.kind === "none") return true;
	if (effect.kind === "move") {
		if (projectIds.length < 2) return true;
		const from = open(projectIds[0] ?? "");
		const to = open(projectIds[1] ?? "");
		if (!from || !to) return "That project is not open.";
		const ready = stageReady(to, dept);
		if (ready !== true) return ready;
		const idx = from.tokens.findIndex((token) => token.filled && token.dept === dept);
		if (idx < 0) return `No ${icon} is on that project.`;
		const token = from.tokens[idx];
		from.tokens.splice(idx, 1);
		to.tokens.push(token);
		return true;
	}
	if (!projectIds.length) {
		if (effect.kind === "remove") return true;
		return "Choose an open project.";
	}
	if (effect.kind === "play") {
		const ids = projectIds.length === 1 ? Array.from({ length: effect.count }, () => projectIds[0] ?? "") : projectIds;
		if (ids.length !== effect.count) return `Place all ${effect.count} icons.`;
		for (const id of ids) {
			const project = open(id);
			if (!project) return "That project is not open.";
			const ready = stageReady(project, dept);
			if (ready !== true) return ready;
			const openSlot = project.tokens.find((token) => token.dept === dept && !token.filled);
			if (!openSlot) return `No open ${icon} slot on that project.`;
			openSlot.filled = true;
		}
		return true;
	}
	const project = open(projectIds[0] ?? "");
	if (!project) return "That project is not open.";
	if (effect.kind === "slot") {
		for (let n = 0; n < effect.count; n++) project.tokens.push({ id: uid(), dept, filled: false, bonus: true });
		return true;
	}
	for (let n = 0; n < effect.count; n++) {
		const idx = project.tokens.findIndex((token) => token.filled && token.dept === dept);
		if (idx < 0) return `No ${icon} is on that project.`;
		project.tokens.splice(idx, 1);
	}
	return true;
}

function firstDollars(text) {
	const match = /\$([0-9,]+)/.exec(text);
	if (!match) return 0;
	return Number(match[1].replace(/,/g, "")) * 100;
}

function postCash(state, label, cents, now) {
	if (!cents) return;
	state.adjustments.push({ id: uid(), round: state.round, label, cents, at: now });
	pushLog(state, `${label}: ${cents < 0 ? "-" : "+"}$${Math.abs(cents) / 100}.`);
}

function faceBonus(state, project, text) {
	const upper = text.toUpperCase();
	const amounts = [...text.matchAll(/\$([0-9,]+)/g)].map((match) => Number(match[1].replace(/,/g, "")) * 100);
	const amount = amounts[0] ?? 0;
	if (!amount) return null;
	if (/NOT COMPLETED BY THE END OF ROUND/.test(upper)) return null;
	if (/4TH OR LATER/.test(upper)) {
		const earlier = (state.projects ?? []).filter((item) => item.collected && item.id !== project.id).length;
		if (earlier >= 3) return { label: "Late completion", cents: -amount };
		return null;
	}
	if (/FOR EACH OTHER PROJECT/.test(upper)) {
		const earlier = (state.projects ?? []).filter((item) => item.collected && item.id !== project.id).length;
		const cap = amounts[1] ?? 800000;
		return { label: "Referrals", cents: Math.min(amount * earlier, cap) };
	}
	if (/STAR TOKEN/.test(upper)) {
		const stars = project.tokens.filter((token) => token.dept === "Marketing" && token.filled).length;
		if (stars >= 2) return { label: "Star bonus", cents: amount };
		return null;
	}
	if (/SPECIAL CARD/.test(upper)) {
		const specials = state.plays.filter((play) => play.type === "SPECIAL" && play.projectIds?.includes(project.id)).length;
		if (specials >= 2) return { label: "Special cards", cents: amount };
		return null;
	}
	if (/WHEN THIS PROJECT COMPLETES|ON COMPLETION/.test(upper)) return { label: "Completion bonus", cents: amount };
	return null;
}

function settleProject(state, project, now) {
	if (project.collected || project.status === "closed") return;
	if (!project.tokens.length || project.tokens.some((token) => !token.filled)) return;
	project.status = "closed";
	project.collected = true;
	let earned = project.valueCents;
	postCash(state, `Project ${project.n} completed`, project.valueCents, now);
	for (const text of [project.customer?.text ?? "", project.house?.text ?? ""]) {
		const bonus = faceBonus(state, project, text);
		if (bonus?.cents) {
			earned += bonus.cents;
			postCash(state, `Project ${project.n} ${bonus.label}`, bonus.cents, now);
		}
	}
	const due = state.pending.filter((item) => item.projectId === project.id);
	state.pending = state.pending.filter((item) => item.projectId !== project.id);
	for (const item of due) {
		earned += item.cents;
		postCash(state, item.label, item.cents, now);
	}
	project.earnedCents = earned;
}

function chargeLateProjects(state, now) {
	hydrate(state);
	for (const project of state.projects ?? []) {
		if (project.collected || project.lateFee || project.status === "closed") continue;
		const text = project.customer?.text ?? "";
		if (!/not completed by the end of round 6/i.test(text)) continue;
		const amount = firstDollars(text) || 500000;
		project.lateFee = true;
		postCash(state, `Project ${project.n} missed round 6`, -amount, now);
	}
}

export function prepareRedeal(prev, dept: DeptId): Step {
	const state = clone(prev);
	hydrate(state);
	const hand = (state.hands?.[dept] ?? []).filter((card) => card.round === state.round);
	const negatives = hand.filter((card) => card.type === "NEGATIVE").length;
	if (negatives < 2) return fail("Re-deal is only when the first hand has two or three negatives.");
	if (state.plays.some((play) => play.dept === dept && play.round === state.round)) {
		return fail("Those cards are already in play.");
	}
	const key = `${state.round}:${dept}`;
	if (state.redeals?.[key]) return fail("This department already re-dealt this round.");
	const bag = [...(state.bags.dept[dept] ?? [])];
	for (const card of hand) bag.push(card.index);
	state.bags.dept[dept] = bag;
	state.hands[dept] = (state.hands?.[dept] ?? []).filter((card) => card.round !== state.round);
	state.redeals[key] = true;
	pushLog(state, `${dept} re-dealt. Those negatives do not play.`, "table", dept);
	return { ok: true, state };
}

function recallPlay(state, dept) {
	const taken = state.plays.filter((play) => play.dept === dept && play.round === state.round);
	if (!taken.length) return;
	for (const play of taken) undoIcons(state, dept, play);
	state.plays = state.plays.filter((play) => play.dept !== dept || play.round !== state.round);
	const hand = state.hands?.[dept] ?? [];
	const have = new Set(hand.map((card) => card.name));
	for (const play of taken) {
		if (have.has(play.name)) continue;
		hand.push({
			id: uid(),
			index: dataIndex(dept, play.name),
			name: play.name,
			type: play.type,
			text: play.text,
			round: state.round
		});
	}
	state.hands[dept] = hand;
	const labels = new Set(taken.map((play) => `${dept}: ${play.name}`));
	state.adjustments = state.adjustments.filter((row) => !(row.round === state.round && labels.has(row.label)));
	state.pending = state.pending.filter((row) => !(row.round === state.round && row.dept === dept));
}

function undoIcons(state, dept, play) {
	const effect = cardEffect(play.text);
	const ids = play.projectIds?.length ? play.projectIds : play.projectId ? [play.projectId] : [];
	if (effect.kind === "slot") {
		for (const id of ids) {
			const project = (state.projects ?? []).find((item) => item.id === id);
			if (!project) continue;
			const idx = project.tokens.findIndex((token) => token.dept === dept && token.bonus && !token.filled);
			if (idx >= 0) project.tokens.splice(idx, 1);
		}
		return;
	}
	if (effect.kind !== "play") return;
	const targets = ids.length === 1 ? Array.from({ length: effect.count }, () => ids[0]) : ids;
	for (const id of targets) {
		const project = (state.projects ?? []).find((item) => item.id === id);
		if (!project) continue;
		for (let i = project.tokens.length - 1; i >= 0; i--) {
			const token = project.tokens[i];
			if (token.filled && token.dept === dept) {
				token.filled = false;
				break;
			}
		}
		if (project.collected || project.status === "closed") {
			project.collected = false;
			project.status = "open";
			const prefix = `Project ${project.n}`;
			state.adjustments = state.adjustments.filter((row) => !String(row.label).startsWith(prefix));
		}
	}
}

function dataIndex(dept, name) {
	for (let i = 0; i < 80; i++) {
		const snap = deptSnap(i);
		if (snap && snap.dept === dept && snap.name === name) return i;
	}
	return -1;
}
