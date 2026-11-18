import { r as cashEffect } from "./icons-DRCSszAQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/economy-D2xlDfFl.js
var BEST = 5e4;
var PARTIAL = 15e3;
function grade(cents) {
	if (cents >= BEST) return "best";
	if (cents >= PARTIAL) return "partial";
	return "weak";
}
function money(cents) {
	return `${cents < 0 ? "-" : ""}$${Math.round(Math.abs(cents) / 100).toLocaleString("en-US")}`;
}
function analyzeGame(source) {
	const finished = source.status === "done" || source.status === "post" || source.status === "audit";
	const people = /* @__PURE__ */ new Map();
	for (const player of source.players) people.set(player.id, {
		id: player.id,
		profileId: player.profileId ?? "",
		name: player.name,
		dept: player.dept,
		best: 0,
		partial: 0,
		weak: 0,
		answered: 0,
		stuckNegatives: 0,
		cash: 0,
		missed: [],
		notes: []
	});
	let best = 0;
	let partial = 0;
	let weak = 0;
	for (const answer of source.answers) {
		const kind = grade(answer.valueCents);
		if (kind === "best") best += 1;
		else if (kind === "partial") partial += 1;
		else weak += 1;
		const row = answer.playerId ? people.get(answer.playerId) : void 0;
		if (!row) continue;
		row.answered += 1;
		row[kind] += 1;
		if (kind === "weak" && answer.principle) row.missed.push(answer.principle);
	}
	const deptCash = /* @__PURE__ */ new Map();
	const deptStuck = /* @__PURE__ */ new Map();
	const looseCash = /* @__PURE__ */ new Map();
	const looseStuck = /* @__PURE__ */ new Map();
	for (const play of source.plays) {
		const cash = cashEffect(play.text).immediate;
		const negative = play.type === "NEGATIVE" && !play.exempt;
		deptCash.set(play.dept, (deptCash.get(play.dept) ?? 0) + cash);
		if (negative) deptStuck.set(play.dept, (deptStuck.get(play.dept) ?? 0) + 1);
		const row = play.playerId ? people.get(play.playerId) : void 0;
		if (row) {
			row.cash += cash;
			if (negative) row.stuckNegatives += 1;
		} else {
			looseCash.set(play.dept, (looseCash.get(play.dept) ?? 0) + cash);
			if (negative) looseStuck.set(play.dept, (looseStuck.get(play.dept) ?? 0) + 1);
		}
	}
	for (const row of people.values()) {
		const mates = [...people.values()].filter((p) => p.dept === row.dept).length || 1;
		row.cash += Math.round((looseCash.get(row.dept) ?? 0) / mates);
		row.stuckNegatives += looseStuck.get(row.dept) ?? 0;
		const calls = (source.calls ?? []).filter((call) => call.playerId === row.id);
		const payroll = calls.filter((call) => call.kind === "payroll").length;
		const focus = calls.filter((call) => call.kind === "focus").length;
		const cards = calls.filter((call) => call.kind === "action").length;
		if (payroll || focus || cards) row.notes.push(`Decisions on record: ${[
			payroll ? `${payroll} payroll` : "",
			focus ? `${focus} focus` : "",
			cards ? `${cards} card${cards === 1 ? "" : "s"}` : ""
		].filter(Boolean).join(", ")}.`);
		if (row.best > 0) row.notes.push(`${row.best} best People & Principles answer${row.best === 1 ? "" : "s"}, worth $500 of payroll each.`);
		if (row.weak > 0) row.notes.push(`${row.weak} weak answer${row.weak === 1 ? "" : "s"}. The principles missed: ${unique(row.missed).slice(0, 3).join(", ") || "not named"}.`);
		if (row.stuckNegatives > 0) row.notes.push(`${row.name} played ${row.stuckNegatives} negative card${row.stuckNegatives === 1 ? "" : "s"}.`);
		if (!row.notes.length) row.notes.push(row.answered ? "Solid, quiet round. No weak answers on record." : "No People & Principles decision was recorded for this seat.");
	}
	const depts = source.board.depts.map((dept) => ({
		dept: dept.dept,
		best: source.answers.filter((a) => a.dept === dept.dept && grade(a.valueCents) === "best").length,
		partial: source.answers.filter((a) => a.dept === dept.dept && grade(a.valueCents) === "partial").length,
		weak: source.answers.filter((a) => a.dept === dept.dept && grade(a.valueCents) === "weak").length,
		cash: deptCash.get(dept.dept) ?? 0,
		stuck: deptStuck.get(dept.dept) ?? 0,
		profit: dept.profit
	}));
	const closed = source.projects.filter((p) => p.status === "closed" || p.collected);
	const late = source.projects.filter((p) => p.lateFee);
	const open = source.projects.filter((p) => p.status === "open");
	const contract = closed.reduce((s, p) => s + p.valueCents, 0);
	const cardCash = source.adjustments.reduce((s, a) => s + a.cents, 0);
	const causes = [];
	const wins = [];
	const lessons = [];
	if (closed.length) wins.push(`${closed.length} project${closed.length === 1 ? "" : "s"} collected ${money(contract)}.`);
	if (best) wins.push(`${best} best answer${best === 1 ? "" : "s"} saved ${money(best * BEST)} of payroll.`);
	if (cardCash > 0) wins.push(`Cards added ${money(cardCash)} to the company.`);
	if (source.board.win) causes.push(`The company won. Valuation ${money(source.board.valuation)} cleared ${money(source.settings.winCents)} with the margin intact.`);
	else if (finished) {
		if (!source.board.marginOk) causes.push("The margin missed 30%. Revenue that is not profitable does not count as a win.");
		if (source.board.valuation < source.settings.winCents) causes.push(`Valuation finished at ${money(source.board.valuation)}, short of ${money(source.settings.winCents)}.`);
	} else causes.push("This game is still in progress. The score below is where it stands now.");
	if (weak) causes.push(`${weak} weak People & Principles answer${weak === 1 ? "" : "s"} saved no payroll.`);
	if (late.length) causes.push(`${late.length} project${late.length === 1 ? "" : "s"} paid a late fee.`);
	const stuck = [...deptStuck.values()].reduce((s, n) => s + n, 0);
	if (stuck) causes.push(`${stuck} negative action card${stuck === 1 ? "" : "s"} stayed on the business.`);
	if (!causes.length) causes.push("No single failure stands out in the record.");
	const missed = unique(source.answers.filter((a) => grade(a.valueCents) === "weak").map((a) => a.principle).filter(Boolean));
	if (missed.length) lessons.push(`The weak answers clustered on: ${missed.slice(0, 4).join(", ")}.`);
	if (open.length && finished) lessons.push(`${open.length} project${open.length === 1 ? "" : "s"} never closed, so that contract revenue never landed.`);
	if (best > weak) lessons.push("Judgment carried this table. Protect that habit: read the principle before the dollar.");
	else if (weak > best) lessons.push("The next game is won in the People & Principles choice, not by playing more cards.");
	if (source.board.margin !== null && source.board.margin < .3) lessons.push("Chase margin before top-line. A busy company under 30% still loses.");
	return {
		code: source.code ?? "",
		company: source.company,
		rehearsal: source.rehearsal,
		status: source.status,
		finished,
		win: source.board.win,
		marketLeader: source.board.marketLeader,
		valuation: source.board.valuation,
		profit: source.board.profit,
		revenue: source.board.revenue,
		margin: source.board.margin,
		projectsClosed: closed.length,
		projectsOpen: open.length,
		projectsLate: late.length,
		best,
		partial,
		weak,
		people: [...people.values()],
		depts,
		causes,
		lessons,
		wins
	};
}
function unique(list) {
	return [...new Set(list)];
}
function careerOf(rows) {
	const games = rows.length;
	const wins = rows.filter((g) => g.win).length;
	const best = rows.reduce((s, g) => s + g.best, 0);
	const partial = rows.reduce((s, g) => s + g.partial, 0);
	const weak = rows.reduce((s, g) => s + g.weak, 0);
	const answered = best + partial + weak;
	const roles = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const cur = roles.get(row.role) ?? {
			role: row.role,
			games: 0,
			best: 0,
			weak: 0
		};
		cur.games += 1;
		cur.best += row.best;
		cur.weak += row.weak;
		roles.set(row.role, cur);
	}
	return {
		games,
		wins,
		losses: games - wins,
		best,
		partial,
		weak,
		rate: answered ? best / answered : null,
		roles: [...roles.values()].sort((a, b) => b.games - a.games),
		history: rows,
		badges: badgesFor({
			games,
			wins,
			best,
			weak,
			roles: roles.size,
			rate: answered ? best / answered : 0
		})
	};
}
function badgesFor(input) {
	const badges = [];
	if (input.games >= 1) badges.push({
		id: "seat",
		title: "First Seat",
		detail: "Sat a real game."
	});
	if (input.games >= 3) badges.push({
		id: "regular",
		title: "Regular",
		detail: "Three games on record."
	});
	if (input.wins >= 1) badges.push({
		id: "win",
		title: "Company Win",
		detail: "On the roster when the company cleared the win."
	});
	if (input.wins >= 3) badges.push({
		id: "trophy",
		title: "Trophy · Repeat Champion",
		detail: "Three winning companies."
	});
	if (input.best >= 3 && input.rate >= .5) badges.push({
		id: "sharp",
		title: "Sharp Judgment",
		detail: "Best answers on at least half of the calls."
	});
	if (input.best >= 8) badges.push({
		id: "scholar",
		title: "Trophy · Principle Scholar",
		detail: "Eight best People & Principles answers."
	});
	if (input.roles >= 3) badges.push({
		id: "cross",
		title: "Cross-trained",
		detail: "Played three different roles."
	});
	if (input.games >= 2 && input.weak === 0 && input.best > 0) badges.push({
		id: "clean",
		title: "Clean Record",
		detail: "No weak answers across multiple games."
	});
	return badges;
}
function buildInsights(input) {
	const reports = input.reports;
	const finished = reports.filter((g) => g.finished);
	const wins = finished.filter((g) => g.win).length;
	const losses = finished.length - wins;
	const avgValuation = finished.length ? Math.round(finished.reduce((s, g) => s + g.valuation, 0) / finished.length) : 0;
	const margins = finished.map((g) => g.margin).filter((m) => m !== null);
	const avgMargin = margins.length ? margins.reduce((s, n) => s + n, 0) / margins.length : null;
	const deptMap = /* @__PURE__ */ new Map();
	const people = /* @__PURE__ */ new Map();
	for (const report of reports) {
		for (const dept of report.depts) {
			const row = deptMap.get(dept.dept) ?? {
				dept: dept.dept,
				best: 0,
				partial: 0,
				weak: 0,
				cash: 0
			};
			row.best += dept.best;
			row.partial += dept.partial;
			row.weak += dept.weak;
			row.cash += dept.cash;
			deptMap.set(dept.dept, row);
		}
		for (const person of report.people) {
			const key = person.profileId || person.name.toLowerCase();
			const meta = person.profileId ? input.meta.get(person.profileId) : void 0;
			const row = people.get(key) ?? {
				key,
				name: person.name,
				username: meta?.username ?? "",
				games: 0,
				wins: 0,
				best: 0,
				partial: 0,
				weak: 0,
				rate: null,
				roles: [],
				trades: meta?.trades ?? "",
				firstTime: meta?.firstTime ?? null,
				company: meta?.company ?? "",
				title: meta?.title ?? "",
				city: meta?.city ?? "",
				state: meta?.state ?? ""
			};
			row.games += 1;
			if (report.win && report.finished) row.wins += 1;
			row.best += person.best;
			row.partial += person.partial;
			row.weak += person.weak;
			if (!row.roles.includes(person.dept)) row.roles.push(person.dept);
			people.set(key, row);
		}
	}
	const list = [...people.values()].map((p) => {
		const answered = p.best + p.partial + p.weak;
		return {
			...p,
			rate: answered ? p.best / answered : null
		};
	});
	list.sort((a, b) => (b.rate ?? -1) - (a.rate ?? -1) || b.best - a.best);
	const judged = list.filter((p) => p.best + p.partial + p.weak >= 2);
	const best = judged[0] ?? null;
	const lowest = [...judged].sort((a, b) => (a.rate ?? 1) - (b.rate ?? 1) || b.weak - a.weak)[0] ?? null;
	const whyBest = best ? [
		`${best.name} has the strongest judgment on record: ${best.best} best answers and ${best.weak} weak ones across ${best.games} game${best.games === 1 ? "" : "s"}.`,
		best.roles.length ? `Roles: ${best.roles.join(", ")}.` : "",
		best.trades ? `Background: ${labelTrades(best.trades)}${best.firstTime ? ", first time with this game" : ""}.` : "",
		best.company ? `Works as ${best.title || "a trades role"} at ${best.company}.` : ""
	].filter(Boolean) : ["Not enough repeated decisions yet to name a best performer."];
	const whyLow = lowest && lowest.key !== best?.key ? [
		`${lowest.name} has the weakest judgment on record: ${lowest.weak} weak answers against ${lowest.best} best ones.`,
		lowest.roles.length ? `That showed up in ${lowest.roles.join(", ")}.` : "",
		"Weak answers save no payroll. The pattern is the decision, not the department title."
	].filter(Boolean) : ["No separate low performer stands out yet."];
	const characteristics = characteristicLines(list);
	const lessons = unique(reports.flatMap((g) => g.lessons)).slice(0, 6);
	const byDept = [...deptMap.values()].map((d) => {
		const answered = d.best + d.partial + d.weak;
		return {
			...d,
			rate: answered ? d.best / answered : null
		};
	});
	return {
		games: reports.length,
		finished: finished.length,
		wins,
		losses,
		winRate: finished.length ? wins / finished.length : null,
		avgValuation,
		avgMargin,
		bestAnswers: reports.reduce((s, g) => s + g.best, 0),
		weakAnswers: reports.reduce((s, g) => s + g.weak, 0),
		byDept,
		people: list,
		best,
		lowest: lowest && lowest.key !== best?.key ? lowest : null,
		whyBest,
		whyLow,
		characteristics,
		lessons
	};
}
function labelTrades(value) {
	if (value === "working") return "already working in the trades";
	if (value === "familiar") return "familiar with the trades";
	if (value === "new") return "new to the trades";
	return value;
}
function characteristicLines(people) {
	const lines = [];
	for (const [key, label] of [
		["new", "New to the trades"],
		["familiar", "Familiar with the trades"],
		["working", "Already in a trades role"]
	]) {
		const rows = people.filter((p) => p.trades === key && p.rate !== null);
		if (!rows.length) continue;
		const rate = rows.reduce((s, p) => s + (p.rate ?? 0), 0) / rows.length;
		lines.push(`${label}: ${rows.length} player${rows.length === 1 ? "" : "s"}, ${Math.round(rate * 100)}% best-answer rate.`);
	}
	const first = people.filter((p) => p.firstTime === true && p.rate !== null);
	const again = people.filter((p) => p.firstTime === false && p.rate !== null);
	if (first.length && again.length) {
		const a = first.reduce((s, p) => s + (p.rate ?? 0), 0) / first.length;
		const b = again.reduce((s, p) => s + (p.rate ?? 0), 0) / again.length;
		lines.push(b >= a ? "Players who have seen the game before judge a little better than first-timers." : "First-time players are judging as well as returning players.");
	}
	const roleScore = /* @__PURE__ */ new Map();
	for (const person of people) for (const role of person.roles) {
		const row = roleScore.get(role) ?? {
			best: 0,
			weak: 0
		};
		row.best += person.best;
		row.weak += person.weak;
		roleScore.set(role, row);
	}
	const ranked = [...roleScore.entries()].map(([role, row]) => ({
		role,
		rate: row.best + row.weak ? row.best / (row.best + row.weak) : null,
		n: row.best + row.weak
	})).filter((r) => r.rate !== null && r.n >= 2).sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));
	if (ranked[0]) lines.push(`${ranked[0].role} has the highest best-answer rate among roles with enough decisions.`);
	if (!lines.length) lines.push("Ask players whether this is their first game and whether they already work in the trades. That is what separates the groups.");
	return lines;
}
//#endregion
export { careerOf as i, badgesFor as n, buildInsights as r, analyzeGame as t };
