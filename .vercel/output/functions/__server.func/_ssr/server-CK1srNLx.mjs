import { a as normalizePhone } from "./format-DkJBbT9C.mjs";
import { t as METALCON_SEATS } from "./seats-BHNQe8_4.mjs";
import { i as scoreMetalcon, r as lookupMetalcon } from "./cards-Bf6SXNQh.mjs";
import { getMetalconSql } from "./db.server-CdWAa1xo.mjs";
import { _ as toCardId, a as actionOf, c as customerOf, d as eventOf, f as filledSlots, g as tierValue, i as HOUSES, l as effectLine, m as houseOf, n as CUSTOMERS, o as boardEffect, r as EVENTS, t as ACTION_CARDS } from "./board-CRozB46O.mjs";
import { noteClosedAttempt, seatFor, t as computeNumbers } from "./admin.server-CeOOKF1U.mjs";
import { createHash, randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/server-CK1srNLx.js
var STOP = new Set("a an the to of and or for in on at is it you your their them this that with from by be as if not just into than then over out are was were but about when what who how its do don't did does can will would should they his her our".split(" "));
function tokens(value) {
	return new Set((value.toLowerCase().replace(/—/g, " ").replace(/-/g, " ").match(/[a-z0-9']+/g) ?? []).filter((word) => word.length >= 4 && !STOP.has(word)));
}
function sentences(why) {
	return why.split(/(?<=[.!])\s+/).map((part) => part.trim()).filter(Boolean);
}
/** Verbatim host-key text for why the picked letter is not the right one. */
function missWhy(code, letter) {
	const card = scoreMetalcon(code);
	if (!card) return "";
	const picked = tokens(card.options[letter]);
	const correct = tokens(card.options[card.correct]);
	let best = "";
	let bestScore = 0;
	for (const sentence of sentences(card.why)) {
		let score = 0;
		for (const word of tokens(sentence)) if (picked.has(word) && !correct.has(word)) score += 2;
		else if (picked.has(word)) score += 1;
		if (score > bestScore) {
			bestScore = score;
			best = sentence;
		}
	}
	if (bestScore >= 2) return best;
	const parts = sentences(card.why);
	const close = parts[parts.length - 1] ?? "";
	return [card.voice, close].filter((bit, index, all) => bit && all.indexOf(bit) === index).join(" ");
}
function scoreLabel(points) {
	if (points > 0) return `[+${points}]`;
	if (points < 0) return `[−${Math.abs(points)}]`;
	return `[0]`;
}
var POINT_TOKEN = /\[\s*[+\-−–]?\s*\d+\s*\]/g;
/** Remove old point-count tokens from player-facing text. Host mapping stays internal. */
function stripPoints(value) {
	return value.replace(POINT_TOKEN, "").replace(/\(\s*score\s*\)/gi, "").replace(/\s*·\s*·\s*/g, " · ").replace(/\s*·\s*$/g, "").replace(/^\s*·\s*/g, "").replace(/\s{2,}/g, " ").replace(/\s+([,.;:])/g, "$1").trim();
}
function payrollPhrase(points, offDollars) {
	if (offDollars > 0) return `$${offDollars.toLocaleString("en-US")} off payroll`;
	if (points < 0 || points === 0) return `$500 added to payroll`;
	return "$0";
}
function asLetter(value) {
	return value === "A" || value === "B" || value === "C" ? value : null;
}
function viewAnswer(code, choiceRaw) {
	const card = scoreMetalcon(code);
	const choice = asLetter(choiceRaw);
	if (!card || !choice || !card.points) return null;
	const points = card.points[choice];
	const reduction = card.values[choice];
	const missed = choice !== card.correct;
	const offDollars = points > 0 && reduction > 0 ? reduction : 0;
	const addedPoints = points < 0 ? Math.abs(points) : 0;
	const label = scoreLabel(points);
	const payrollLabel = payrollPhrase(points, offDollars);
	const correctWording = stripPoints(card.options[card.correct]);
	const choiceWording = stripPoints(card.options[choice]);
	const headline = payrollLabel;
	let next;
	if (!missed) next = `Subtract $${offDollars.toLocaleString("en-US")} (score ${label}) from this round’s payroll, then draw 3 department action cards and play 2 of them on the board at the GM meeting. Always play 2 of the 3 drawn cards all the way through.`;
	else if (offDollars > 0) next = `Subtract $${offDollars.toLocaleString("en-US")} (score ${label}) from this round’s payroll. The next department player reads a new scenario and answers.`;
	else if (points < 0) next = `Add ${label} to this round’s payroll, and the next department player reads a new scenario and answers.`;
	else next = `Add [0] to this round’s payroll, and the next department player reads a new scenario and answers.`;
	const whyMiss = missed ? missWhy(code, choice) : "";
	const listen = missed ? `Correct answer ${card.correct}. ${card.why} You picked ${choice}. ${card.options[choice]} ${whyMiss}` : `Correct answer ${card.correct}. ${card.why}`;
	return {
		correct: card.correct,
		correctLabel: correctWording,
		why: stripPoints(card.why),
		voice: stripPoints(card.voice),
		choice,
		choiceLabel: choiceWording,
		choiceText: choiceWording,
		points,
		missed,
		missWhy: stripPoints(whyMiss),
		offDollars,
		addedPoints,
		payrollLabel,
		headline,
		next: stripPoints(next),
		listen: stripPoints(listen),
		scoreLabel: label
	};
}
/** Cents stored on the answer. A right answer takes $500 off. Every wrong answer adds $500. */
function payrollCentsFor(code, choice) {
	const card = scoreMetalcon(code);
	if (!card?.points) return 0;
	const points = card.points[choice];
	if (choice === card.correct || points > 0) return (card.values[choice] || 500) * 100;
	return -5e4;
}
var EVENT_ID = "metalcon-2026";
var EVENT_LABEL = "The Business Machine Experience";
var SEATS = new Set(METALCON_SEATS);
function hash(secret) {
	return createHash("sha256").update(secret).digest("hex");
}
function cleanName(raw) {
	return raw.replace(/\s+/g, " ").trim().slice(0, 60);
}
function seatOf(value) {
	return SEATS.has(value) ? value : null;
}
async function playerBySecret(id, secret) {
	if (!id || !secret) return null;
	const sql = await getMetalconSql();
	const player = (await sql`
    select id, name, dept, game_id from metalcon.players
    where id = ${id}
      and event_id = ${EVENT_ID}
      and (secret_hash = ${hash(secret)} or invite_token = ${secret})
    limit 1
  `)[0];
	if (!player?.game_id) return null;
	if ((await sql`
    select status from metalcon.games where id = ${player.game_id} limit 1
  `)[0]?.status !== "live") return null;
	return player;
}
async function registerSeat(input) {
	if (!input.terms) return {
		ok: false,
		error: "Check Beta Terms & Conditions to take a seat."
	};
	const firstName = cleanName(input.firstName || "");
	const lastName = cleanName(input.lastName || "");
	const company = cleanName(input.company || "");
	const jobTitle = cleanName(input.jobTitle || "");
	const name = cleanName(`${firstName} ${lastName}`.trim() || input.name);
	if (firstName.length < 1) return {
		ok: false,
		error: "Enter a first name."
	};
	if (lastName.length < 1) return {
		ok: false,
		error: "Enter a last name."
	};
	if (company.length < 1) return {
		ok: false,
		error: "Enter a company name."
	};
	if (jobTitle.length < 1) return {
		ok: false,
		error: "Enter a title."
	};
	if (name.length < 2) return {
		ok: false,
		error: "Enter your name."
	};
	const phone = normalizePhone(input.phone);
	if (!phone) return {
		ok: false,
		error: "Enter a 10-digit mobile number."
	};
	const email = input.email.trim().toLowerCase();
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) return {
		ok: false,
		error: "Enter an email address."
	};
	const dept = seatOf(input.dept);
	if (!dept) return {
		ok: false,
		error: "Choose a seat."
	};
	const seat = await seatFor(dept, input.slug);
	if (!seat.ok) return seat;
	const id = randomBytes(8).toString("hex");
	const secret = randomBytes(18).toString("hex");
	await (await getMetalconSql())`
    insert into metalcon.players (id, event_id, game_id, secret_hash, invite_token, name, first_name, last_name, company, job_title, phone, email, dept, terms_at)
    values (${id}, ${EVENT_ID}, ${seat.gameId}, ${hash(secret)}, ${secret}, ${name}, ${firstName}, ${lastName}, ${company}, ${jobTitle}, ${phone}, ${email}, ${dept}, now())
  `;
	return {
		ok: true,
		player: {
			id,
			secret,
			name,
			dept
		}
	};
}
async function nextScenario(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) return {
		ok: false,
		error: "Take a seat from the QR code first."
	};
	const used = await (await getMetalconSql())`select card_code from metalcon.answers where player_id = ${player.id}`;
	const usedCodes = new Set(used.map((row) => row.card_code));
	const { listForDept } = await import("./cards-Bf6SXNQh.mjs").then((n) => n.n).then((n) => n.n);
	const deck = listForDept(player.dept).filter((card) => !usedCodes.has(card.code));
	if (!deck.length) return {
		ok: false,
		error: "No more cards in this deck."
	};
	return {
		ok: true,
		card: deck[Math.floor(Math.random() * deck.length)]
	};
}
async function findScenario(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) {
		await noteClosedAttempt(input.secret, `Card lookup ${input.raw}.`);
		return {
			ok: false,
			error: "Take a seat from the QR code first. If the host ended the game, this seat is closed."
		};
	}
	const found = lookupMetalcon(input.raw, player.dept);
	if ("error" in found) return {
		ok: false,
		error: found.error
	};
	const sql = await getMetalconSql();
	const recent = await sql`
    select count(*)::int as n from metalcon.lookups
    where player_id = ${player.id} and created_at > now() - interval '10 minutes'
  `;
	if (Number(recent[0]?.n ?? 0) >= 15) return {
		ok: false,
		error: "Too many cards in a short time. Play the one in front of you."
	};
	await sql`
    insert into metalcon.lookups (id, game_id, player_id)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${player.id})
  `;
	return {
		ok: true,
		card: found.card,
		dept: player.dept
	};
}
async function roundRows(playerId, round) {
	return (await (await getMetalconSql())`
    select card_code, card_title, choice, payroll_cents
    from metalcon.answers
    where event_id = ${EVENT_ID} and player_id = ${playerId} and round_n = ${round}
    order by created_at
  `).filter((row) => !row.card_code.toUpperCase().startsWith("BE-OW") && !row.card_code.toUpperCase().startsWith("BE-RE")).map((row) => {
		const view = viewAnswer(row.card_code, row.choice);
		return {
			...row,
			score_label: "",
			payroll_label: view?.payrollLabel ?? "",
			off_dollars: view?.offDollars ?? 0,
			added_points: view?.addedPoints ?? 0,
			points: view?.points ?? null
		};
	});
}
async function roundSheet(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) return {
		ok: false,
		error: "Take a seat from the QR code first.",
		rows: []
	};
	const round = Math.round(input.round);
	if (!Number.isFinite(round) || round < 1) return {
		ok: true,
		rows: []
	};
	return {
		ok: true,
		rows: await roundRows(player.id, round)
	};
}
async function lockScenario(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) {
		await noteClosedAttempt(input.secret, `Tried to lock ${input.code}.`);
		return {
			ok: false,
			error: "Take a seat from the QR code first. If the host ended the game, this seat is closed."
		};
	}
	const choice = input.choice === "A" || input.choice === "B" || input.choice === "C" ? input.choice : null;
	if (!choice) return {
		ok: false,
		error: "Choose A, B, or C."
	};
	const round = Math.round(input.round);
	if (!Number.isFinite(round) || round < 1 || round > 200) return {
		ok: false,
		error: "Enter the round number."
	};
	const card = scoreMetalcon(input.code.trim().toUpperCase());
	if (!card || card.dept !== player.dept) return {
		ok: false,
		error: "That card is not in this seat's deck."
	};
	const sql = await getMetalconSql();
	const existing = await sql`
    select choice, payroll_cents, choice_text from metalcon.answers
    where event_id = ${EVENT_ID} and player_id = ${player.id} and round_n = ${round} and card_code = ${card.code}
    limit 1
  `;
	if (existing[0]) {
		const savedChoice = existing[0].choice === "A" || existing[0].choice === "B" || existing[0].choice === "C" ? existing[0].choice : choice;
		return {
			ok: true,
			duplicate: true,
			payrollCents: existing[0].payroll_cents,
			choice: savedChoice,
			choiceText: existing[0].choice_text,
			feedback: viewAnswer(card.code, savedChoice),
			rows: await roundRows(player.id, round)
		};
	}
	const payrollCents = payrollCentsFor(card.code, choice);
	const id = randomBytes(8).toString("hex");
	const meeting = await sql`select gm_meeting from metalcon.games where id = ${player.game_id} limit 1`;
	const during = Boolean(meeting[0]?.gm_meeting);
	await sql`
    insert into metalcon.answers (
      id, event_id, game_id, player_id, round_n, dept, player_name, card_code, card_title, choice, choice_text, payroll_cents, during_meeting
    ) values (
      ${id}, ${EVENT_ID}, ${player.game_id}, ${player.id}, ${round}, ${player.dept}, ${player.name},
      ${card.code}, ${card.title}, ${choice}, ${card.options[choice]}, ${payrollCents}, ${during}
    )
  `;
	const direction = payrollCents > 0 ? "off payroll" : payrollCents < 0 ? "added to payroll" : "no payroll change";
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: player.dept,
		playerName: player.name,
		cardCode: card.code,
		round,
		amountCents: payrollCents,
		kind: "scenario",
		detail: `${card.title} ${choice}. ${direction}${during ? ". during GM meeting" : ""}`,
		during
	});
	if (payrollCents !== 0) {
		const dollars = Math.abs(Math.round(payrollCents / 100)).toLocaleString("en-US");
		await raiseAlert(player.game_id ?? "", null, "scenario", `${player.name} ${payrollCents > 0 ? "took" : "added"} $${dollars} ${direction}.`, payrollCents);
	}
	await noteMargin(player.game_id ?? "");
	const roundRowsNow = await roundRows(player.id, round);
	return {
		ok: true,
		duplicate: false,
		payrollCents,
		roundPayroll: roundRowsNow.reduce((sum, row) => sum + (row.payroll_cents < 0 ? Math.abs(row.payroll_cents) : -row.payroll_cents), 0),
		choice,
		choiceText: card.options[choice],
		feedback: viewAnswer(card.code, choice),
		rows: roundRowsNow
	};
}
async function answerLog() {
	const sql = await getMetalconSql();
	const game = (await sql`
    select id, n from metalcon.games where status = 'live' order by n desc limit 1
  `)[0] ?? (await sql`select id, n from metalcon.games order by n desc limit 1`)[0];
	if (!game) return {
		ok: true,
		label: EVENT_LABEL,
		game: null,
		rows: []
	};
	const rows = await sql`
    select round_n, dept, player_name, card_code, card_title, choice, payroll_cents
    from metalcon.answers
    where event_id = ${EVENT_ID} and game_id = ${game.id}
    order by round_n, dept, created_at
  `;
	return {
		ok: true,
		label: EVENT_LABEL,
		game: game.n,
		rows: rows.filter((row) => !row.card_code.toUpperCase().startsWith("BE-OW") && !row.card_code.toUpperCase().startsWith("BE-RE")).map((row) => {
			const view = viewAnswer(row.card_code, row.choice);
			return {
				...row,
				score_label: "",
				payroll_label: view?.payrollLabel ?? ""
			};
		})
	};
}
var voiceCache = /* @__PURE__ */ new Map();
async function speakMale(text) {
	const spoken = text.replace(/\s+/g, " ").trim().slice(0, 1800);
	if (spoken.length < 2) return {
		ok: false,
		error: "Nothing to read."
	};
	const hit = voiceCache.get(spoken);
	if (hit) return {
		ok: true,
		audio: hit
	};
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Read aloud is not available right now."
	};
	const res = await fetch("https://api.x.ai/v1/tts", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			text: spoken,
			voice_id: "rex",
			language: "en"
		})
	});
	if (!res.ok) return {
		ok: false,
		error: "Read aloud is not available right now."
	};
	const bytes = Buffer.from(await res.arrayBuffer());
	if (bytes.length < 80) return {
		ok: false,
		error: "Read aloud is not available right now."
	};
	const audio = bytes.toString("base64");
	if (voiceCache.size > 40) voiceCache.clear();
	voiceCache.set(spoken, audio);
	return {
		ok: true,
		audio
	};
}
async function writeLedger(input) {
	await (await getMetalconSql())`
    insert into metalcon.ledger (
      id, game_id, player_id, dept, player_name, card_code, round_n, project_n, amount_cents, kind, detail, during_meeting
    ) values (
      ${randomBytes(8).toString("hex")}, ${input.gameId}, ${input.playerId}, ${input.dept}, ${input.playerName},
      ${input.cardCode}, ${input.round}, ${input.projectN ?? null}, ${input.amountCents}, ${input.kind}, ${input.detail}, ${input.during}
    )
  `;
}
async function raiseAlert(gameId, playerId, kind, detail, amountCents) {
	await (await getMetalconSql())`
    insert into metalcon.player_alerts (id, game_id, player_id, kind, detail, amount_cents)
    values (${randomBytes(8).toString("hex")}, ${gameId}, ${playerId}, ${kind}, ${detail}, ${amountCents})
  `;
}
async function loadNumbers(gameId) {
	const sql = await getMetalconSql();
	const row = (await sql`
    select company_name, current_round, fixed_cost_cents, fixed_cost_start_round, gm_meeting, base_payroll_cents, status
    from metalcon.games where id = ${gameId} limit 1
  `)[0];
	if (!row) return null;
	const answers = await sql`
    select player_id, dept, player_name, card_code, card_title, round_n, payroll_cents, during_meeting
    from metalcon.answers where game_id = ${gameId}
  `;
	const plays = await sql`
    select player_id, dept, player_name, card_name, card_text, project_id, other_project_id, amount_cents, round_n
    from metalcon.plays where game_id = ${gameId} and coalesce(status, 'confirmed') = 'confirmed'
  `;
	const projects = await sql`
    select id, n, title, house, customer, value_cents, status, completed_at, finish_order, extra_slot, plus_ones from metalcon.projects where game_id = ${gameId} order by n
  `;
	const players = await sql`
    select id, name, dept, name_suggestion, name_vote from metalcon.players where game_id = ${gameId} order by dept, name
  `;
	return {
		row,
		numbers: computeNumbers({
			companyName: row.company_name,
			currentRound: Number(row.current_round) || 1,
			fixedCostCents: Number(row.fixed_cost_cents) || 2e5,
			fixedStartRound: Number(row.fixed_cost_start_round) || 3,
			basePayrollCents: Number(row.base_payroll_cents) || 0,
			gameEnded: row.status === "ended",
			answers,
			plays,
			projects,
			players
		}),
		players,
		projects
	};
}
async function noteMargin(gameId) {
	const loaded = await loadNumbers(gameId);
	if (!loaded) return;
	const sql = await getMetalconSql();
	const before = (await sql`select last_margin_bps from metalcon.games where id = ${gameId} limit 1`)[0]?.last_margin_bps ?? null;
	const after = loaded.numbers.marginBps;
	if (after !== null && before !== null) {
		const crossed = (line, label) => before < line && after >= line || before >= line && after < line || before <= line && after > line || before > line && after <= line;
		if (crossed(3e3, "30%") && Math.sign(before - 3e3) !== Math.sign(after - 3e3)) await raiseAlert(gameId, null, "margin", `Net margin crossed 30%. It is now ${(after / 100).toFixed(1)}%.`, loaded.numbers.profitCents);
		if (Math.sign(before - 5e3) !== Math.sign(after - 5e3)) await raiseAlert(gameId, null, "margin", `Net margin crossed 50%. It is now ${(after / 100).toFixed(1)}%.`, loaded.numbers.profitCents);
	}
	if (loaded.numbers.fixedCents > 0 && Number(loaded.row.current_round) >= Number(loaded.row.fixed_cost_start_round)) {
		const started = await sql`select count(*)::int as n from metalcon.player_alerts where game_id = ${gameId} and kind = 'fixed'`;
		if (Number(started[0]?.n ?? 0) === 0) await raiseAlert(gameId, null, "fixed", `Fixed costs started. $2,000 a department a round from round ${loaded.row.fixed_cost_start_round}.`, -Number(loaded.row.fixed_cost_cents));
	}
	await sql`update metalcon.games set last_margin_bps = ${after} where id = ${gameId}`;
}
async function companyBoard(input) {
	try {
		const player = await playerBySecret(input.id, input.secret);
		if (!player) return {
			ok: false,
			error: "Take a seat from the QR code first."
		};
		const loaded = await loadNumbers(player.game_id ?? "");
		if (!loaded) return {
			ok: false,
			error: "This game is not open."
		};
		const sql = await getMetalconSql();
		const [alerts, ledger] = await Promise.all([sql`
      select id, kind, detail, amount_cents, created_at from metalcon.player_alerts
      where game_id = ${player.game_id} and (player_id is null or player_id = ${player.id})
      order by created_at desc limit 12
    `, sql`
      select id, card_code, round_n, amount_cents, kind, detail, during_meeting, created_at
      from metalcon.ledger where game_id = ${player.game_id} and player_id = ${player.id}
      order by created_at desc
    `]);
		const people = dedupePlayers(loaded.players);
		[...new Set(people.map((row) => row.dept))].filter((dept) => dept !== "General Manager" && dept !== "Owner" && dept !== "Recruiting");
		const named = people.filter((row) => row.name_suggestion);
		const byName = /* @__PURE__ */ new Map();
		for (const row of named) {
			const key = row.name_suggestion.trim();
			const bucket = byName.get(key) ?? {
				id: row.id,
				suggestion: key,
				votes: 0,
				ids: []
			};
			bucket.ids.push(row.id);
			byName.set(key, bucket);
		}
		for (const vote of loaded.players) {
			if (!vote.name_vote) continue;
			for (const bucket of byName.values()) if (bucket.ids.includes(vote.name_vote)) bucket.votes += 1;
		}
		const suggestions = [...byName.values()].sort((a, b) => b.votes - a.votes || a.suggestion.localeCompare(b.suggestion));
		const myVote = loaded.players.find((row) => row.id === player.id)?.name_vote ?? "";
		const myVoteId = suggestions.find((row) => row.ids.includes(myVote))?.id ?? "";
		const [attendees, prompts, turnRow, ackRow, answeredRow, modeRow, draw] = await Promise.all([
			roster(player.game_id ?? "", loaded.row.current_round),
			promptsFor(player.game_id ?? ""),
			sql`select turn_dept from metalcon.games where id = ${player.game_id} limit 1`,
			sql`select meeting_ack_round from metalcon.players where id = ${player.id} limit 1`,
			sql`select count(*)::int as n from metalcon.answers where game_id = ${player.game_id} and player_id = ${player.id} and round_n = ${Number(loaded.row.current_round) || 1}`,
			sql`select action_mode from metalcon.games where id = ${player.game_id} limit 1`,
			ensureDraw(player.game_id ?? "", player.id, loaded.row.current_round)
		]);
		const top = suggestions[0]?.votes ?? 0;
		const tiedNames = suggestions.filter((row) => row.votes === top && top > 0);
		const tied = tiedNames.length > 1 && !loaded.numbers.companyName;
		return {
			ok: true,
			companyName: loaded.numbers.companyName,
			meeting: loaded.row.gm_meeting,
			numbers: loaded.numbers,
			alerts,
			ledger,
			projects: loaded.projects,
			suggestions,
			myVoteId,
			tiedNames: tiedNames.map((row) => ({
				name: row.suggestion,
				votes: row.votes,
				id: row.id
			})),
			mine: loaded.players.find((row) => row.id === player.id) ?? null,
			voting: suggestions.length > 0 && !loaded.numbers.companyName,
			tie: tied,
			houses: HOUSES.map((card) => ({
				id: card.id,
				name: card.name
			})),
			customers: CUSTOMERS.map((card) => ({
				id: card.id,
				name: card.name
			})),
			values: [
				1e4,
				2e4,
				3e4
			],
			actions: ACTION_CARDS.map((card) => ({
				id: card.id,
				name: card.name,
				dept: card.dept,
				text: card.text
			})),
			events: EVENTS.map((card) => ({
				id: card.id,
				name: card.name
			})),
			attendees,
			atMeeting: attendees.some((row) => row.player_id === player.id),
			prompts,
			players: loaded.players.map((row) => ({
				id: row.id,
				name: row.name,
				dept: row.dept
			})),
			currentRound: Number(loaded.row.current_round) || 1,
			turnDept: turnRow[0]?.turn_dept ?? "",
			meetingAck: Number(ackRow[0]?.meeting_ack_round ?? 0),
			answeredThisRound: Number(answeredRow[0]?.n ?? 0) > 0,
			actionMode: modeRow[0]?.action_mode ?? "digital",
			draw,
			pending: player.dept === "General Manager" ? await pendingPicks(player.game_id ?? "") : [],
			pendingPlays: await sql`
      select pl.id, pl.card_name, pl.card_text, pl.dept, pl.player_name, p.n, p.customer, p.house, pl.status, pl.project_id
      from metalcon.plays pl join metalcon.projects p on p.id = pl.project_id
      where pl.game_id = ${player.game_id} and pl.dept <> 'General Manager'
      order by pl.created_at desc limit 24
    `,
			recentPlays: player.dept === "General Manager" ? await recentPlays(player.game_id ?? "") : [],
			myPlays: await myPlays(player.game_id ?? "", player.id),
			focus: await focusFor(player.game_id ?? "", player.dept === "General Manager" ? "" : player.dept, loaded.row.current_round),
			allFocus: player.dept === "General Manager" ? await allFocus(player.game_id ?? "", loaded.row.current_round) : []
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not open the board."
		};
	}
}
function dedupePlayers(rows) {
	const seen = /* @__PURE__ */ new Set();
	const kept = [];
	for (const row of rows) {
		const key = `${row.dept}|${row.name.trim().toLowerCase()}`;
		if (seen.has(key)) continue;
		seen.add(key);
		kept.push(row);
	}
	return kept;
}
async function suggestCompany(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) return {
		ok: false,
		error: "Take a seat from the QR code first."
	};
	const name = input.name.replace(/\s+/g, " ").trim().slice(0, 40);
	if (name.length < 2) return {
		ok: false,
		error: "Enter a company name."
	};
	await (await getMetalconSql())`update metalcon.players set name_suggestion = ${name} where id = ${player.id}`;
	return { ok: true };
}
async function voteCompany(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) return {
		ok: false,
		error: "Take a seat from the QR code first."
	};
	const sql = await getMetalconSql();
	if ((await sql`select company_name from metalcon.games where id = ${player.game_id} limit 1`)[0]?.company_name) return {
		ok: false,
		error: "The GM already picked the winner."
	};
	const choice = await sql`
    select id, name_suggestion, game_id, dept from metalcon.players where id = ${input.choiceId} limit 1
  `;
	if (!choice[0] || choice[0].game_id !== player.game_id || !choice[0].name_suggestion) return {
		ok: false,
		error: "That name is not in the vote."
	};
	await sql`update metalcon.players set name_vote = ${input.choiceId} where id = ${player.id}`;
	await settleName(player.game_id ?? "");
	return { ok: true };
}
async function settleName(gameId) {
	const sql = await getMetalconSql();
	const players = await sql`
    select id, name, name_suggestion, name_vote, dept from metalcon.players where game_id = ${gameId}
  `;
	const people = dedupePlayers(players);
	const filled = [...new Set(people.map((row) => row.dept))];
	if (!filled.length || filled.some((dept) => !people.some((row) => row.dept === dept && row.name_suggestion && row.name_vote))) return;
	const counts = /* @__PURE__ */ new Map();
	for (const row of players) counts.set(row.name_vote, (counts.get(row.name_vote) ?? 0) + 1);
	const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
	if (!ranked[0] || ranked[1] && ranked[1][1] === ranked[0][1]) return;
	const winner = players.find((row) => row.id === ranked[0][0]);
	if (!winner) return;
	await sql`update metalcon.games set company_name = ${winner.name_suggestion} where id = ${gameId} and company_name = ''`;
}
async function breakTie(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can break a tie."
	};
	const sql = await getMetalconSql();
	const choice = await sql`select name_suggestion from metalcon.players where id = ${input.choiceId} and game_id = ${player.game_id} limit 1`;
	if (!choice[0]?.name_suggestion) return {
		ok: false,
		error: "That name is not in the vote."
	};
	await sql`update metalcon.games set company_name = ${choice[0].name_suggestion} where id = ${player.game_id}`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: player.dept,
		playerName: player.name,
		cardCode: "company-name",
		round: 0,
		amountCents: 0,
		kind: "name",
		detail: `GM broke the tie for ${choice[0].name_suggestion}.`,
		during: false
	});
	return { ok: true };
}
async function restartVote(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can restart the vote."
	};
	const sql = await getMetalconSql();
	await sql`update metalcon.players set name_suggestion = '', name_vote = '' where game_id = ${player.game_id}`;
	await sql`update metalcon.games set company_name = '' where id = ${player.game_id}`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: player.dept,
		playerName: player.name,
		cardCode: "company-name",
		round: 0,
		amountCents: 0,
		kind: "name",
		detail: "GM restarted the company name vote.",
		during: false
	});
	return { ok: true };
}
async function setCompanyName(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can set the company name."
	};
	const name = input.name.replace(/\s+/g, " ").trim().slice(0, 40);
	if (name.length < 2) return {
		ok: false,
		error: "Enter a company name."
	};
	await (await getMetalconSql())`update metalcon.games set company_name = ${name} where id = ${player.game_id}`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: player.dept,
		playerName: player.name,
		cardCode: "company-name",
		round: 0,
		amountCents: 0,
		kind: "name",
		detail: `GM set the company name to ${name}.`,
		during: false
	});
	return { ok: true };
}
async function setMeeting(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can open the meeting."
	};
	const round = Math.max(1, Math.round(input.round) || 1);
	const sql = await getMetalconSql();
	const before = await sql`select current_round from metalcon.games where id = ${player.game_id} limit 1`;
	await sql`update metalcon.games set gm_meeting = ${input.on}, current_round = ${round}, turn_dept = 'Marketing' where id = ${player.game_id}`;
	if (round > Number(before[0]?.current_round ?? 1)) {
		const perDept = 3200;
		await raiseAlert(player.game_id ?? "", null, "round", `Round ${round} started. Payroll $${(perDept * 5).toLocaleString("en-US")} charged.${round >= 3 ? " Fixed cost $2,000 starts." : ""}`, perDept * 5 * 100);
	}
	await refreshInsights(player.game_id ?? "");
	return {
		ok: true,
		round
	};
}
async function setProjectSlot(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can set a project."
	};
	const n = Math.round(Number(input.n));
	if (n < 1 || n > 9) return {
		ok: false,
		error: "Project must be 1 to 9."
	};
	const status = input.status === "complete" || input.status === "completed" ? "complete" : input.status === "open" || input.status === "opened" ? "open" : "unopened";
	const house = input.house.trim();
	const customer = input.customer.trim();
	if (status !== "unopened") {
		if (!houseOf(toCardId(house) ?? house)) return {
			ok: false,
			error: "Choose a house card."
		};
		if (!customerOf(toCardId(customer) ?? customer)) return {
			ok: false,
			error: "Choose a customer card."
		};
	}
	const sql = await getMetalconSql();
	const existing = await sql`select id, status from metalcon.projects where game_id = ${player.game_id} and n = ${n} limit 1`;
	const value = tierValue(n) * 100;
	const completedAt = status === "complete" ? (/* @__PURE__ */ new Date()).toISOString() : null;
	const revealed = Boolean(house && customer);
	const hasRevealed = await sql`
    select count(*)::int as n from information_schema.columns
    where table_schema = 'metalcon' and table_name = 'projects' and column_name = 'revealed'
  `;
	const extraSlot = (input.extraSlot ?? "").trim();
	if (existing[0]) {
		if (Number(hasRevealed[0]?.n)) await sql`
        update metalcon.projects
        set house = ${house}, customer = ${customer}, status = ${status}, value_cents = ${value},
            completed_at = ${completedAt}, revealed = ${revealed}, extra_slot = ${extraSlot}
        where id = ${existing[0].id}
      `;
		else await sql`
        update metalcon.projects
        set house = ${house}, customer = ${customer}, status = ${status}, value_cents = ${value},
            completed_at = ${completedAt}
        where id = ${existing[0].id}
      `;
	} else {
		const id = randomBytes(8).toString("hex");
		if (Number(hasRevealed[0]?.n)) await sql`
        insert into metalcon.projects (id, game_id, n, title, house, customer, value_cents, status, completed_at, revealed, extra_slot)
        values (${id}, ${player.game_id}, ${n}, ${`Project ${n}`}, ${house}, ${customer}, ${value}, ${status}, ${completedAt}, ${revealed}, ${extraSlot})
      `;
		else await sql`
        insert into metalcon.projects (id, game_id, n, title, house, customer, value_cents, status, completed_at)
        values (${id}, ${player.game_id}, ${n}, ${`Project ${n}`}, ${house}, ${customer}, ${value}, ${status}, ${completedAt})
      `;
	}
	const label = status === "complete" ? "completed" : status === "open" ? "opened" : "not opened";
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: player.dept,
		playerName: player.name,
		cardCode: "project-slot",
		round: 0,
		projectN: n,
		amountCents: 0,
		kind: "project",
		detail: `GM set Project ${n} to ${label}${house ? ` · house ${house}` : ""}${customer ? ` · customer ${customer}` : ""}.`,
		during: false
	});
	if (status === "complete") await raiseAlert(player.game_id ?? "", null, "project", `Project ${n} finished. $${tierValue(n).toLocaleString("en-US")} base.`, value);
	await noteMargin(player.game_id ?? "");
	await refreshInsights(player.game_id ?? "");
	return {
		ok: true,
		n,
		status
	};
}
async function openProject(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can open a project."
	};
	if (!houseOf(toCardId(input.house) ?? input.house)) return {
		ok: false,
		error: "Choose a house card."
	};
	if (!customerOf(toCardId(input.customer) ?? input.customer)) return {
		ok: false,
		error: "Choose a customer card."
	};
	const sql = await getMetalconSql();
	const max = await sql`select coalesce(max(n), 0)::int as n from metalcon.projects where game_id = ${player.game_id}`;
	const n = Number(max[0]?.n ?? 0) + 1;
	const same = await sql`select n from metalcon.projects where game_id = ${player.game_id} and house = ${input.house} and customer = ${input.customer} limit 1`;
	if (same[0]) return {
		ok: false,
		error: `Project ${same[0].n} is already that house and customer. Open a different one.`
	};
	const value = tierValue(n);
	await sql`
    insert into metalcon.projects (id, game_id, n, title, house, customer, value_cents, status)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${n}, ${`Project ${n}`}, ${input.house}, ${input.customer}, ${value * 100}, 'open')
  `;
	return {
		ok: true,
		n
	};
}
async function playAction(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can enter a board action."
	};
	const card = actionOf(toCardId(input.cardName) ?? input.cardName);
	if (!card) return {
		ok: false,
		error: "Choose an action card."
	};
	const sql = await getMetalconSql();
	const project = await sql`
    select id, n, status, customer, house from metalcon.projects where id = ${input.projectId} and game_id = ${player.game_id} limit 1
  `;
	if (!project[0] || project[0].status !== "open") return {
		ok: false,
		error: "Choose an open project."
	};
	const order = [
		"Marketing",
		"Appointment Center",
		"Sales",
		"Production",
		"Accounting"
	];
	const deptIndex = order.indexOf(card.dept);
	if (deptIndex > 0) {
		const prior = order[deptIndex - 1];
		const unlocked = await sql`
      select count(*)::int as n from metalcon.plays where project_id = ${project[0].id} and dept = ${prior}
    `;
		if (Number(unlocked[0]?.n ?? 0) === 0) return {
			ok: false,
			error: `${card.dept} cannot play on this project until ${prior} has unlocked it.`
		};
	}
	const effect = boardEffect(card);
	const other = input.otherProjectId ? (await sql`select id, n, customer, status from metalcon.projects where id = ${input.otherProjectId} and game_id = ${player.game_id} limit 1`)[0] : null;
	if ((effect.kind === "move" || effect.kind === "token" && effect.count > 1) && other && other.status !== "open") return {
		ok: false,
		error: "The second project has to be open."
	};
	const amount = effect.cashCents;
	const round = Math.max(1, Math.round(input.round) || 1);
	const label = other ? `Project ${project[0].n} (${project[0].customer}) and Project ${other.n} (${other.customer})` : `Project ${project[0].n} (${project[0].customer})`;
	const words = effectLine(card.name, label);
	await sql`
    insert into metalcon.plays (id, game_id, project_id, other_project_id, round_n, player_id, dept, player_name, card_name, card_text, amount_cents)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${project[0].id}, ${other?.id ?? null}, ${round}, ${player.id}, ${card.dept}, ${player.name}, ${card.name}, ${card.text}, ${amount})
  `;
	if (/Kim/i.test(project[0].customer) && effect.token === "star") {
		const next = await sql`
      select id, n, customer from metalcon.projects
      where game_id = ${player.game_id} and status = 'open' and id <> ${project[0].id}
      order by n limit 1
    `;
		if (next[0]) {
			await sql`
        insert into metalcon.plays (id, game_id, project_id, round_n, player_id, dept, player_name, card_name, card_text, amount_cents)
        values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${next[0].id}, ${round}, ${player.id}, 'Marketing', ${player.name}, ${"Kim star"}, ${"PLACE 1 [STAR]"}, 0)
      `;
			await writeLedger({
				gameId: player.game_id ?? "",
				playerId: player.id,
				dept: "Marketing",
				playerName: player.name,
				cardCode: "Kim star",
				round,
				projectN: next[0].n,
				amountCents: 0,
				kind: "action",
				detail: `Kim Family: +1 lead star on Project ${next[0].n} (${next[0].customer})`,
				during: true
			});
		}
	}
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: card.dept,
		playerName: player.name,
		cardCode: card.name,
		round,
		projectN: project[0].n,
		amountCents: amount,
		kind: "action",
		detail: words,
		during: true
	});
	await raiseAlert(player.game_id ?? "", null, "action", words, amount);
	await noteMargin(player.game_id ?? "");
	await refreshInsights(player.game_id ?? "");
	return {
		ok: true,
		words
	};
}
async function finishProject(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can finish a project."
	};
	const sql = await getMetalconSql();
	const project = await sql`
    select id, n, title, house, customer, value_cents, status, extra_slot, plus_ones from metalcon.projects where id = ${input.projectId} and game_id = ${player.game_id} limit 1
  `;
	if (!project[0] || project[0].status === "complete") return {
		ok: false,
		error: "That project is already finished."
	};
	const plays = await sql`
    select card_name, card_text, dept from metalcon.plays where project_id = ${project[0].id} and coalesce(status, 'confirmed') = 'confirmed'
  `;
	const slots = filledSlots(project[0], plays);
	const missing = Object.entries(slots.need).filter(([dept, count]) => (slots.filled[dept] ?? 0) < count).map(([dept, count]) => `${dept} needs ${count - (slots.filled[dept] ?? 0)}`);
	if (missing.length && !input.override) return {
		ok: false,
		error: `Not finished: ${missing.join("; ")}. Override to finish anyway.`,
		missing
	};
	await sql`update metalcon.projects set status = 'complete', completed_at = now() where id = ${project[0].id}`;
	if (input.override && missing.length) await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: player.dept,
		playerName: player.name,
		cardCode: "finish-override",
		round: 0,
		projectN: project[0].n,
		amountCents: 0,
		kind: "override",
		detail: `GM finished Project ${project[0].n} with tokens missing: ${missing.join("; ")}.`,
		during: true
	});
	const revenue = ((await loadNumbers(player.game_id ?? ""))?.numbers.projects.find((item) => item.n === project[0].n))?.revenueCents ?? tierValue(project[0].n) * 100;
	const dollars = Math.round(revenue / 100).toLocaleString("en-US");
	await raiseAlert(player.game_id ?? "", null, "project", `Project ${project[0].n} finished. $${dollars} revenue.`, revenue);
	await noteMargin(player.game_id ?? "");
	await refreshInsights(player.game_id ?? "");
	return {
		ok: true,
		missing
	};
}
async function endGameFromGm(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can end the game."
	};
	await (await getMetalconSql())`update metalcon.games set status = 'ended', ended_at = now() where id = ${player.game_id}`;
	await raiseAlert(player.game_id ?? "", null, "ended", "Game ended. O'Brien pays to the last finished project.", 0);
	return { ok: true };
}
async function setFinishOrder(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "Accounting") return {
		ok: false,
		error: "Only Accounting can set the close order."
	};
	const sql = await getMetalconSql();
	const projects = await sql`
    select id, n, status from metalcon.projects where game_id = ${player.game_id} and id = any(${input.projectIds})
  `;
	if (!projects.length) return {
		ok: false,
		error: "That project is not in this game."
	};
	for (let i = 0; i < projects.length; i++) {
		const project = projects[i];
		if (project.status !== "complete") {
			await sql`update metalcon.projects set status = 'complete', completed_at = now(), finish_order = ${i + 1} where id = ${project.id} and game_id = ${player.game_id}`;
			const revenue = (await loadNumbers(player.game_id ?? ""))?.numbers.projects.find((item) => item.n === project.n)?.revenueCents ?? tierValue(project.n) * 100;
			const dollars = Math.round(revenue / 100).toLocaleString("en-US");
			await raiseAlert(player.game_id ?? "", null, "project", `Project ${project.n} finished. $${dollars} revenue.`, revenue);
		} else await sql`update metalcon.projects set finish_order = ${i + 1} where id = ${project.id} and game_id = ${player.game_id}`;
	}
	await noteMargin(player.game_id ?? "");
	await refreshInsights(player.game_id ?? "");
	return { ok: true };
}
var BOARD_DEPTS = [
	"Marketing",
	"Appointment Center",
	"Sales",
	"Production",
	"Accounting"
];
async function roster(gameId, round) {
	const sql = await getMetalconSql();
	const players = await sql`
    select id, name, dept, created_at from metalcon.players where game_id = ${gameId} and dept = any(${BOARD_DEPTS}) order by created_at
  `;
	const swaps = await sql`
    select dept, player_id from metalcon.attendees where game_id = ${gameId} and round_n = ${round}
  `;
	return BOARD_DEPTS.map((dept) => {
		const group = players.filter((row) => row.dept === dept).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
		const swapped = swaps.find((row) => row.dept === dept);
		const idx = (Math.max(1, round) - 1) % Math.max(1, group.length);
		const pick = swapped ? group.find((row) => row.id === swapped.player_id) ?? group[idx] : group[idx];
		return {
			dept,
			player_id: pick?.id ?? "",
			name: pick?.name ?? "Open seat",
			swapped: Boolean(swapped)
		};
	});
}
async function swapAttendee(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can swap an attendee."
	};
	const sql = await getMetalconSql();
	await sql`delete from metalcon.attendees where game_id = ${player.game_id} and round_n = ${input.round} and dept = ${input.dept}`;
	await sql`
    insert into metalcon.attendees (id, game_id, round_n, dept, player_id, swapped)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${input.round}, ${input.dept}, ${input.playerId}, true)
  `;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: input.dept,
		playerName: player.name,
		cardCode: "meeting-swap",
		round: input.round,
		amountCents: 0,
		kind: "meeting",
		detail: `GM swapped the ${input.dept} meeting seat.`,
		during: true
	});
	return { ok: true };
}
async function dealCards(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) return {
		ok: false,
		error: "Take a seat from the QR code first."
	};
	if (!(await roster(player.game_id ?? "", input.round)).find((row) => row.dept === player.dept && row.player_id === player.id)) return {
		ok: false,
		error: "Only the Department Head deals the action cards."
	};
	const deck = ACTION_CARDS.filter((card) => card.dept === player.dept);
	if (deck.length < 3) return {
		ok: false,
		error: "This department has no action deck."
	};
	let dealt = [...deck].sort(() => Math.random() - .5).slice(0, 3).map((card) => card.name);
	if (player.dept === "Accounting") dealt = [
		"Basic Invoice",
		"Invoice Blitz",
		"Bank Needs More Documents"
	];
	const sql = await getMetalconSql();
	await sql`delete from metalcon.draws where game_id = ${player.game_id} and player_id = ${player.id} and round_n = ${input.round}`;
	await sql`
    insert into metalcon.draws (id, game_id, round_n, dept, player_id, cards)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${input.round}, ${player.dept}, ${player.id}, ${JSON.stringify(dealt)}::jsonb)
  `;
	return {
		ok: true,
		cards: dealt
	};
}
async function undoAction(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can undo an action."
	};
	const sql = await getMetalconSql();
	const play = await sql`
    select id, card_name, project_id from metalcon.plays where id = ${input.playId} and game_id = ${player.game_id} limit 1
  `;
	if (!play[0]) return {
		ok: false,
		error: "That action is already gone."
	};
	await sql`delete from metalcon.plays where id = ${input.playId}`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: "General Manager",
		playerName: player.name,
		cardCode: play[0].card_name,
		round: 0,
		amountCents: 0,
		kind: "undo",
		detail: `GM undid ${play[0].card_name}.`,
		during: false
	});
	await refreshInsights(player.game_id ?? "");
	return { ok: true };
}
async function setFocus(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM sets focus projects."
	};
	const ids = input.projectIds.filter(Boolean).slice(0, 2);
	if (ids.length !== 2) return {
		ok: false,
		error: "Pick two focus projects."
	};
	const sql = await getMetalconSql();
	const game = await sql`select current_round from metalcon.games where id = ${player.game_id} limit 1`;
	const round = input.round > 0 ? input.round : Number(game[0]?.current_round ?? 1);
	await sql`delete from metalcon.focus where game_id = ${player.game_id} and round_n = ${round} and dept = ${input.dept}`;
	for (const projectId of ids) await sql`
      insert into metalcon.focus (id, game_id, round_n, dept, project_id)
      values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${round}, ${input.dept}, ${projectId})
    `;
	return {
		ok: true,
		round,
		dept: input.dept
	};
}
async function placeCard(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) return {
		ok: false,
		error: "Take a seat from the QR code first."
	};
	const card = actionOf(toCardId(input.cardName) ?? input.cardName);
	if (!card || card.dept !== player.dept) return {
		ok: false,
		error: "That card is not in your deck."
	};
	const effect = boardEffect(card);
	const sql = await getMetalconSql();
	if (effect.kind === "draw") {
		const round = Math.max(1, Math.round(input.round) || 1);
		const deck = ACTION_CARDS.filter((c) => c.dept === player.dept).map((c) => c.name);
		const drawn = [];
		for (let i = 0; i < effect.count; i++) drawn.push(deck[Math.floor(Math.random() * deck.length)]);
		const existing = await sql`select id, cards from metalcon.draws where game_id = ${player.game_id} and player_id = ${player.id} and round_n = ${round} order by created_at desc limit 1`;
		if (existing[0]) {
			const cards = [...existing[0].cards ?? [], ...drawn];
			await sql`update metalcon.draws set cards = ${JSON.stringify(cards)}::jsonb where id = ${existing[0].id}`;
		}
		return {
			ok: true,
			words: `${card.name}: drew ${drawn.join(", ")}`
		};
	}
	const project = await sql`
    select id, n, status, customer, house from metalcon.projects where id = ${input.projectId} and game_id = ${player.game_id} limit 1
  `;
	if (!project[0] || project[0].status !== "open") return {
		ok: false,
		error: "Choose an open project."
	};
	const order = [
		"Marketing",
		"Appointment Center",
		"Sales",
		"Production",
		"Accounting"
	];
	const deptIndex = order.indexOf(player.dept);
	if (deptIndex > 0) {
		const prior = order[deptIndex - 1];
		const unlocked = await sql`select count(*)::int as n from metalcon.plays where project_id = ${input.projectId} and dept = ${prior} and coalesce(status, 'confirmed') = 'confirmed'`;
		if (Number(unlocked[0]?.n ?? 0) === 0) return {
			ok: false,
			error: `${player.dept} cannot play here until ${prior} has played on it.`
		};
	}
	const focus = await sql`
    select project_id from metalcon.focus where game_id = ${player.game_id} and round_n = ${input.round} and dept = ${player.dept}
  `;
	if (focus.length && !focus.some((row) => row.project_id === input.projectId)) return {
		ok: false,
		error: "Play only on your two focus projects this round."
	};
	const amount = effect.cashCents;
	const round = Math.max(1, Math.round(input.round) || 1);
	const words = `${card.name}: ${effect.words} on Project ${project[0].n} (${project[0].customer})`;
	await sql`
    insert into metalcon.plays (id, game_id, project_id, round_n, player_id, dept, player_name, card_name, card_text, amount_cents, status)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${project[0].id}, ${round}, ${player.id}, ${player.dept}, ${player.name}, ${card.name}, ${card.text}, ${amount}, 'pending')
  `;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: player.dept,
		playerName: player.name,
		cardCode: card.name,
		round,
		projectN: project[0].n,
		amountCents: 0,
		kind: "proposed",
		detail: `${player.name} proposed ${card.name} on Project ${project[0].n}. Waiting on the GM.`,
		during: true
	});
	await raiseAlert(player.game_id ?? "", null, "proposed", `${player.name} proposed ${card.name} on Project ${project[0].n}. Waiting on the GM.`, 0);
	await noteMargin(player.game_id ?? "");
	await refreshInsights(player.game_id ?? "");
	return {
		ok: true,
		words
	};
}
async function confirmPlay(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM confirms a token."
	};
	const sql = await getMetalconSql();
	const play = await sql`
    select id, card_name, project_id, player_name, dept, amount_cents from metalcon.plays where id = ${input.playId} and game_id = ${player.game_id} and status = 'pending' limit 1
  `;
	if (!play[0]) return {
		ok: false,
		error: "That play is not waiting."
	};
	const project = await sql`select n, customer from metalcon.projects where id = ${play[0].project_id} limit 1`;
	await sql`update metalcon.plays set status = 'confirmed' where id = ${play[0].id}`;
	const plus = (await sql`select plus_ones from metalcon.projects where id = ${play[0].project_id} limit 1`)[0]?.plus_ones ?? {};
	if (plus[play[0].dept] && plus[play[0].dept] > 0) {
		plus[play[0].dept] -= 1;
		if (plus[play[0].dept] <= 0) delete plus[play[0].dept];
		await sql`update metalcon.projects set plus_ones = ${JSON.stringify(plus)}::jsonb where id = ${play[0].project_id}`;
	}
	const detail = `${player.name} confirmed ${play[0].card_name} on Project ${project[0]?.n ?? ""} · ${project[0]?.customer ?? ""}.`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: "General Manager",
		playerName: player.name,
		cardCode: play[0].card_name,
		round: 0,
		projectN: project[0]?.n ?? null,
		amountCents: play[0].amount_cents,
		kind: "confirmed",
		detail,
		during: true
	});
	await raiseAlert(player.game_id ?? "", null, "action", detail, play[0].amount_cents);
	await noteMargin(player.game_id ?? "");
	await refreshInsights(player.game_id ?? "");
	if (play[0].dept === "Accounting") {
		const remaining = await sql`select count(*)::int as n from metalcon.plays where game_id = ${player.game_id} and dept = 'Accounting' and status = 'pending'`;
		if (Number(remaining[0]?.n ?? 0) === 0) await endRound(player.game_id ?? "", player.id, player.name, `${player.name} confirmed Accounting. Next round begins with the GM event.`);
	}
	return { ok: true };
}
async function changePlay(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM changes a play."
	};
	const sql = await getMetalconSql();
	const play = await sql`select id, card_name, status from metalcon.plays where id = ${input.playId} and game_id = ${player.game_id} limit 1`;
	const project = await sql`select id, n, customer, status from metalcon.projects where id = ${input.projectId} and game_id = ${player.game_id} limit 1`;
	if (!play[0] || !project[0] || project[0].status !== "open") return {
		ok: false,
		error: "Choose an open project."
	};
	await sql`update metalcon.plays set project_id = ${project[0].id} where id = ${play[0].id}`;
	const verb = play[0].status === "pending" ? "changed" : "moved";
	const detail = `${player.name} ${verb} ${play[0].card_name} to Project ${project[0].n} (${project[0].customer}).`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: "General Manager",
		playerName: player.name,
		cardCode: play[0].card_name,
		round: 0,
		projectN: project[0].n,
		amountCents: 0,
		kind: verb,
		detail,
		during: true
	});
	await noteMargin(player.game_id ?? "");
	return { ok: true };
}
async function removePlay(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM removes a token."
	};
	const sql = await getMetalconSql();
	const play = await sql`select id, card_name, project_id from metalcon.plays where id = ${input.playId} and game_id = ${player.game_id} limit 1`;
	if (!play[0]) return {
		ok: false,
		error: "That play is already gone."
	};
	const project = await sql`select n from metalcon.projects where id = ${play[0].project_id} limit 1`;
	await sql`delete from metalcon.plays where id = ${play[0].id}`;
	const detail = `${player.name} removed ${play[0].card_name} from Project ${project[0]?.n ?? ""}.`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: "General Manager",
		playerName: player.name,
		cardCode: play[0].card_name,
		round: 0,
		projectN: project[0]?.n ?? null,
		amountCents: 0,
		kind: "removed",
		detail,
		during: true
	});
	await noteMargin(player.game_id ?? "");
	return { ok: true };
}
async function setPlusOne(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM changes a +1."
	};
	if (![
		"Marketing",
		"Appointment Center",
		"Sales",
		"Production",
		"Accounting"
	].includes(input.dept)) return {
		ok: false,
		error: "Choose a department."
	};
	const sql = await getMetalconSql();
	const project = await sql`select n, plus_ones from metalcon.projects where id = ${input.projectId} and game_id = ${player.game_id} limit 1`;
	if (!project[0]) return {
		ok: false,
		error: "That project is not in this game."
	};
	const current = project[0].plus_ones ?? {};
	const next = Math.max(0, (current[input.dept] ?? 0) + input.delta);
	current[input.dept] = next;
	await sql`update metalcon.projects set plus_ones = ${JSON.stringify(current)}::jsonb where id = ${input.projectId}`;
	const verb = input.delta > 0 ? "added" : "removed";
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: "General Manager",
		playerName: player.name,
		cardCode: "+1",
		round: 0,
		projectN: project[0].n,
		amountCents: 0,
		kind: "plus-one",
		detail: `${player.name} ${verb} a +1 on ${input.dept} for Project ${project[0].n}.`,
		during: true
	});
	return { ok: true };
}
async function endRound(gameId, playerId, playerName, reason) {
	await (await getMetalconSql())`update metalcon.games set current_round = current_round + 1, turn_dept = '', gm_meeting = false where id = ${gameId}`;
	await writeLedger({
		gameId,
		playerId,
		dept: "General Manager",
		playerName,
		cardCode: "round",
		round: 0,
		amountCents: 0,
		kind: "round",
		detail: reason,
		during: true
	});
}
async function startTurn(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM starts a turn."
	};
	const order = [
		"Marketing",
		"Appointment Center",
		"Sales",
		"Production",
		"Accounting"
	];
	if (!order.includes(input.dept)) return {
		ok: false,
		error: "Choose a department."
	};
	const sql = await getMetalconSql();
	const current = (await sql`select turn_dept from metalcon.games where id = ${player.game_id} limit 1`)[0]?.turn_dept || "Marketing";
	const here = Math.max(0, order.indexOf(current));
	if (order.indexOf(input.dept) > here + 1) return {
		ok: false,
		error: `${input.dept} is waiting on ${order[here]}. Go back or finish ${order[here]} first.`
	};
	if (current === "Accounting" && input.dept === "Marketing") {
		await endRound(player.game_id ?? "", player.id, player.name, `${player.name} ended the round. Next round begins with the GM event.`);
		await raiseAlert(player.game_id ?? "", null, "skip", `${player.name} skipped ${current}.`, 0);
		return {
			ok: true,
			dept: "",
			round: "next"
		};
	}
	await sql`update metalcon.games set turn_dept = ${input.dept} where id = ${player.game_id}`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: "General Manager",
		playerName: player.name,
		cardCode: "turn",
		round: 0,
		amountCents: 0,
		kind: "turn",
		detail: `${player.name} started the ${input.dept} turn.`,
		during: true
	});
	return {
		ok: true,
		dept: input.dept
	};
}
async function callMeeting(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM calls a meeting."
	};
	const sql = await getMetalconSql();
	const game = await sql`select current_round from metalcon.games where id = ${player.game_id} limit 1`;
	const round = Number(game[0]?.current_round ?? 1);
	await sql`update metalcon.games set gm_meeting = true, turn_dept = 'Marketing' where id = ${player.game_id}`;
	await sql`update metalcon.players set meeting_ack_round = 0 where game_id = ${player.game_id}`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: "General Manager",
		playerName: player.name,
		cardCode: "meeting",
		round,
		amountCents: 0,
		kind: "meeting",
		detail: `${player.name} called the next meeting.`,
		during: true
	});
	return {
		ok: true,
		round
	};
}
async function ackMeeting(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) return {
		ok: false,
		error: "Take a seat from the QR code first."
	};
	const sql = await getMetalconSql();
	const game = await sql`select current_round from metalcon.games where id = ${player.game_id} limit 1`;
	const round = Number(game[0]?.current_round ?? 1);
	await sql`update metalcon.players set meeting_ack_round = ${round} where id = ${player.id}`;
	return {
		ok: true,
		round
	};
}
async function setActionMode(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM sets the action-card mode."
	};
	const mode = input.mode === "manual" ? "manual" : "digital";
	const sql = await getMetalconSql();
	const confirmed = await sql`select count(*)::int as n from metalcon.plays where game_id = ${player.game_id} and coalesce(status, 'confirmed') = 'confirmed' and dept <> 'General Manager'`;
	if (Number(confirmed[0]?.n ?? 0) > 0) return {
		ok: false,
		error: "Action-card mode is locked once a token is confirmed."
	};
	await sql`update metalcon.games set action_mode = ${mode} where id = ${player.game_id}`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: "General Manager",
		playerName: player.name,
		cardCode: "action-mode",
		round: 0,
		amountCents: 0,
		kind: "setup",
		detail: `${player.name} set action cards to ${mode}.`,
		during: true
	});
	return {
		ok: true,
		mode
	};
}
async function recordManualCards(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) return {
		ok: false,
		error: "Take a seat from the QR code first."
	};
	const names = input.cards.filter(Boolean).slice(0, 2);
	if (names.length !== 2) return {
		ok: false,
		error: "Pick the two cards you played."
	};
	if (names.map((name) => actionOf(toCardId(name) ?? name)).filter((card) => card && card.dept === player.dept).length !== 2) return {
		ok: false,
		error: "Both cards must be from your department."
	};
	const sql = await getMetalconSql();
	const game = await sql`select action_mode, current_round from metalcon.games where id = ${player.game_id} limit 1`;
	if ((game[0]?.action_mode ?? "digital") !== "manual") return {
		ok: false,
		error: "This game uses digital cards."
	};
	const round = Math.max(1, Math.round(input.round) || Number(game[0]?.current_round ?? 1));
	await sql`delete from metalcon.draws where game_id = ${player.game_id} and player_id = ${player.id} and round_n = ${round}`;
	await sql`
    insert into metalcon.draws (id, game_id, round_n, dept, player_id, cards, played)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${round}, ${player.dept}, ${player.id}, ${JSON.stringify(names)}::jsonb, ${JSON.stringify(names)}::jsonb)
  `;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: player.dept,
		playerName: player.name,
		cardCode: names.join(", "),
		round,
		amountCents: 0,
		kind: "manual",
		detail: `${player.name} recorded ${names.join(" and ")} from the table.`,
		during: true
	});
	return {
		ok: true,
		cards: names
	};
}
async function playEvent(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player || player.dept !== "General Manager") return {
		ok: false,
		error: "Only the GM can play an event."
	};
	const event = eventOf(toCardId(input.eventName) ?? input.eventName);
	if (!event) return {
		ok: false,
		error: "Choose an event card."
	};
	const sql = await getMetalconSql();
	const project = input.projectId ? (await sql`select id, n, customer from metalcon.projects where id = ${input.projectId} and game_id = ${player.game_id} limit 1`)[0] : null;
	const cash = event.name === "Invoice Paid Early" || event.name === "Community Buzz" ? 3e5 : event.name === "Material Spike" || event.name === "Warranty Claim" || event.name === "Financing Falls Through" ? -2e5 : 0;
	const round = Math.max(1, Math.round(input.round) || 1);
	if (project) await sql`
      insert into metalcon.plays (id, game_id, project_id, round_n, player_id, dept, player_name, card_name, card_text, amount_cents)
      values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${project.id}, ${round}, ${player.id}, 'General Manager', ${player.name}, ${event.name}, ${event.text}, ${cash})
    `;
	if (/draws \d+ fewer/i.test(event.text)) {
		const adjust = (await sql`select draw_adjust from metalcon.games where id = ${player.game_id} limit 1`)[0]?.draw_adjust ?? {};
		const dept = /Marketing/i.test(event.text) ? "Marketing" : "Appointment Center";
		const fewer = /2 fewer/i.test(event.text) ? 2 : 1;
		adjust[dept] = (adjust[dept] ?? 0) - fewer;
		await sql`update metalcon.games set draw_adjust = ${JSON.stringify(adjust)}::jsonb where id = ${player.game_id}`;
	}
	const detail = `${event.name}: ${event.text}${project ? ` on Project ${project.n} (${project.customer})` : ""}`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: "General Manager",
		playerName: player.name,
		cardCode: event.name,
		round,
		projectN: project?.n ?? null,
		amountCents: cash,
		kind: "event",
		detail,
		during: true
	});
	await raiseAlert(player.game_id ?? "", null, "event", detail, cash);
	await refreshInsights(player.game_id ?? "");
	return {
		ok: true,
		detail
	};
}
async function ensureDraw(gameId, playerId, round) {
	const existing = await (await getMetalconSql())`
    select id, cards, round_n, played from metalcon.draws
    where game_id = ${gameId} and player_id = ${playerId} and round_n = ${round}
    order by created_at desc limit 1
  `;
	if (!existing[0]) return null;
	return {
		id: existing[0].id,
		cards: existing[0].cards,
		round: existing[0].round_n,
		played: existing[0].played ?? []
	};
}
async function allFocus(gameId, round) {
	return (await getMetalconSql())`
    select f.dept, p.n, p.customer, p.house
    from metalcon.focus f join metalcon.projects p on p.id = f.project_id
    where f.game_id = ${gameId} and f.round_n = ${round}
    order by f.dept, p.n
  `;
}
async function focusFor(gameId, dept, round) {
	const sql = await getMetalconSql();
	const rows = await sql`
    select p.id, p.n, p.customer, p.house, p.status
    from metalcon.focus f join metalcon.projects p on p.id = f.project_id
    where f.game_id = ${gameId} and f.round_n = ${round} and f.dept = ${dept}
  `;
	const order = [
		"Marketing",
		"Appointment Center",
		"Sales",
		"Production",
		"Accounting"
	];
	const deptIndex = order.indexOf(dept);
	const prior = deptIndex > 0 ? order[deptIndex - 1] : "";
	const result = [];
	for (const row of rows) {
		let locked = "";
		if (prior) {
			const unlocked = await sql`select count(*)::int as n from metalcon.plays where project_id = ${row.id} and dept = ${prior} and coalesce(status, 'confirmed') = 'confirmed'`;
			if (Number(unlocked[0]?.n ?? 0) === 0) locked = `Locked until ${prior} plays on it`;
		}
		result.push({
			...row,
			locked
		});
	}
	return result;
}
async function myPlays(gameId, playerId) {
	return (await getMetalconSql())`
    select pl.id, pl.card_name, p.n, p.customer
    from metalcon.plays pl join metalcon.projects p on p.id = pl.project_id
    where pl.game_id = ${gameId} and pl.player_id = ${playerId}
    order by pl.created_at desc limit 6
  `;
}
async function recentPlays(gameId) {
	return (await getMetalconSql())`
    select id, card_name, dept, player_name from metalcon.plays where game_id = ${gameId} order by created_at desc limit 8
  `;
}
async function pendingPicks(gameId) {
	return (await getMetalconSql())`
    select d.id, d.dept, d.player_id, d.cards, d.played, p.name
    from metalcon.draws d join metalcon.players p on p.id = d.player_id
    where d.game_id = ${gameId} and d.played <> '[]'::jsonb
    order by d.created_at desc limit 12
  `;
}
async function promptsFor(gameId) {
	const loaded = await loadNumbers(gameId);
	if (!loaded) return [];
	const prompts = [];
	const numbers = loaded.numbers;
	if (numbers.marginBps !== null) prompts.push(`Margin is ${(numbers.marginBps / 100).toFixed(1)}%. Ask what would move it across 30%.`);
	else prompts.push("No revenue yet. Ask which open project can finish first.");
	const worst = [...numbers.departments].sort((a, b) => a.cents - b.cents)[0];
	if (worst) prompts.push(`${worst.dept} is the payroll drag. Ask what they will change this round.`);
	const round = loaded.row.current_round;
	const seats = await roster(gameId, round);
	prompts.push(`Meeting seats: ${seats.map((row) => `${row.dept} ${row.name}`).join(", ")}.`);
	return prompts;
}
async function refreshInsights(gameId) {
	const loaded = await loadNumbers(gameId);
	if (!loaded) return;
	const sql = await getMetalconSql();
	const payload = {
		numbers: loaded.numbers,
		prompts: await promptsFor(gameId),
		updated: (/* @__PURE__ */ new Date()).toISOString()
	};
	await sql`
    insert into metalcon.insights (game_id, payload, updated_at)
    values (${gameId}, ${JSON.stringify(payload)}::jsonb, now())
    on conflict (game_id) do update set payload = excluded.payload, updated_at = now()
  `;
}
async function submitPicks(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) return {
		ok: false,
		error: "Take a seat from the QR code first."
	};
	const picks = input.picks.filter(Boolean).slice(0, 2);
	if (picks.length !== 2) return {
		ok: false,
		error: "Pick two cards."
	};
	const sql = await getMetalconSql();
	const draw = await sql`
    select id, cards from metalcon.draws
    where game_id = ${player.game_id} and player_id = ${player.id} and played = '[]'::jsonb
    order by created_at desc limit 1
  `;
	if (!draw[0]) return {
		ok: false,
		error: "No cards are waiting."
	};
	const dealt = Array.isArray(draw[0].cards) ? draw[0].cards : [];
	if (picks.some((name) => !dealt.includes(name))) return {
		ok: false,
		error: "Pick from the three cards dealt."
	};
	await sql`update metalcon.draws set played = ${JSON.stringify(picks)}::jsonb where id = ${draw[0].id}`;
	await writeLedger({
		gameId: player.game_id ?? "",
		playerId: player.id,
		dept: player.dept,
		playerName: player.name,
		cardCode: picks.join(", "),
		round: 0,
		amountCents: 0,
		kind: "picks",
		detail: `${player.name} picked ${picks.join(" and ")} for the GM to place.`,
		during: true
	});
	return { ok: true };
}
async function insightsFor(input) {
	const player = await playerBySecret(input.id, input.secret);
	if (!player) return {
		ok: false,
		error: "Take a seat from the QR code first."
	};
	const sql = await getMetalconSql();
	const loaded = await loadNumbers(player.game_id ?? "");
	const answers = await sql`
    select player_id, dept, player_name, card_code, card_title, choice, payroll_cents, round_n, created_at
    from metalcon.answers where game_id = ${player.game_id} order by created_at
  `;
	const mine = player.dept === "General Manager" ? answers : answers.filter((row) => row.player_id === player.id);
	const byDept = /* @__PURE__ */ new Map();
	for (const row of mine) {
		const bucket = byDept.get(row.dept) ?? {
			right: 0,
			total: 0
		};
		bucket.total += 1;
		if (row.payroll_cents > 0) bucket.right += 1;
		byDept.set(row.dept, bucket);
	}
	const gaps = mine.slice(1).map((row, i) => new Date(row.created_at).getTime() - new Date(mine[i].created_at).getTime());
	const avgSeconds = gaps.length ? Math.round(gaps.reduce((sum, n) => sum + n, 0) / gaps.length / 1e3) : 0;
	return {
		ok: true,
		role: player.dept === "General Manager" ? "gm" : "player",
		numbers: loaded?.numbers ?? null,
		prompts: await promptsFor(player.game_id ?? ""),
		marginByRound: loaded?.numbers.rounds.map((row) => ({
			round: row.round,
			margin: loaded.numbers.marginBps === null ? 0 : loaded.numbers.marginBps / 100
		})) ?? [],
		payrollByDept: [...byDept.entries()].map(([dept, row]) => ({
			dept,
			right: row.right,
			total: row.total
		})),
		projects: loaded?.numbers.projects ?? [],
		qualities: [...byDept.entries()].map(([dept, row]) => ({
			dept,
			accuracy: row.total ? Math.round(row.right / row.total * 100) : 0,
			avgSeconds,
			note: row.right / Math.max(1, row.total) >= .6 ? "Strong calls" : "Needs coaching"
		}))
	};
}
//#endregion
export { ackMeeting, answerLog, breakTie, callMeeting, changePlay, companyBoard, confirmPlay, dealCards, endGameFromGm, findScenario, finishProject, insightsFor, lockScenario, nextScenario, openProject, placeCard, playAction, playEvent, recordManualCards, registerSeat, removePlay, restartVote, roundSheet, setActionMode, setCompanyName, setFinishOrder, setFocus, setMeeting, setPlusOne, setProjectSlot, speakMale, startTurn, submitPicks, suggestCompany, swapAttendee, undoAction, voteCompany };
