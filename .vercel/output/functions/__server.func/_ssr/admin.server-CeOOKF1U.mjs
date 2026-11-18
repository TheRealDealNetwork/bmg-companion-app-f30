import { a as normalizePhone } from "./format-DkJBbT9C.mjs";
import { t as METALCON_SEATS } from "./seats-BHNQe8_4.mjs";
import { o as sendPlainEmail } from "./email-auth.server-1Nb6jpbK.mjs";
import { getMetalconSql } from "./db.server-CdWAa1xo.mjs";
import { g as tierValue, h as stanleyPenalty, o as boardEffect, p as houseBonus, s as customerCash, u as eventCash } from "./board-CRozB46O.mjs";
import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.server-CeOOKF1U.js
var LOCATION = "wFA7c81WPLZah5WDzehk";
var PIPELINE = "SYmIhCUjPNWZTjZpO7jf";
var STAGE = "1b4864f2-da18-46ed-b278-8b5b34a06cf9";
var API = "https://services.leadconnectorhq.com";
function splitName(name) {
	const parts = name.split(" ").filter(Boolean);
	return {
		firstName: parts[0] ?? name,
		lastName: parts.slice(1).join(" ")
	};
}
async function ghl(path, body, token) {
	const res = await fetch(`${API}${path}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			Version: "2021-07-28",
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify(body)
	});
	const text = await res.text();
	if (!res.ok) throw new Error(`GHL ${res.status}: ${text.slice(0, 180)}`);
	return text ? JSON.parse(text) : {};
}
async function pushHostLead(lead) {
	const token = process.env.GHL_TOKEN?.trim();
	if (!token) return null;
	const { firstName, lastName } = splitName(lead.name);
	const contact = await ghl("/contacts/upsert", {
		locationId: LOCATION,
		firstName,
		lastName,
		name: lead.name,
		email: lead.email || void 0,
		phone: lead.phone || void 0,
		companyName: lead.company,
		city: lead.city || void 0,
		state: lead.state || void 0,
		country: "US",
		source: "SOEBLD host QR",
		tags: ["SOEBLD", "Host a Game Day"]
	}, token);
	const contactId = String(contact.contact?.id ?? contact.id ?? "");
	if (!contactId) return null;
	const detail = [
		lead.title ? `Title: ${lead.title}` : "",
		lead.headcount ? `People: ${lead.headcount}` : "",
		lead.timing ? `When: ${lead.timing}` : "",
		lead.notes ? `Notes: ${lead.notes}` : ""
	].filter(Boolean).join("\n");
	await ghl("/opportunities/", {
		locationId: LOCATION,
		pipelineId: PIPELINE,
		pipelineStageId: STAGE,
		contactId,
		name: `${lead.company} — host a game day`,
		status: "open",
		source: "SOEBLD host QR"
	}, token).catch(() => void 0);
	if (detail) await ghl(`/contacts/${contactId}/notes`, { body: detail }, token).catch(() => void 0);
	return { contactId };
}
function resultOf(marginBps) {
	if (marginBps === null) return "No revenue yet";
	if (marginBps > 5e3) return "Market Leader";
	if (marginBps > 3e3) return "Win";
	return "No win";
}
function computeNumbers(input) {
	const round = Math.max(1, input.currentRound, ...input.answers.map((row) => row.round_n), 0);
	const playing = new Set(input.players.map((row) => row.dept).filter((dept) => dept !== "General Manager" && dept !== "Owner" && dept !== "Recruiting"));
	const fixedDeptCount = Math.max(1, playing.size);
	const fixedPerRoundCents = 2e5 * fixedDeptCount;
	const fixedCents = (round >= input.fixedStartRound ? round - input.fixedStartRound + 1 : 0) * fixedPerRoundCents;
	const baseRound = 16e5;
	const payrollLabel = "$16,000 base a round";
	const payrollByRound = /* @__PURE__ */ new Map();
	const playerCents = /* @__PURE__ */ new Map();
	const deptCents = /* @__PURE__ */ new Map();
	let offCents = 0;
	let addedCents = 0;
	for (const row of input.answers) {
		const bucket = payrollByRound.get(row.round_n) ?? {
			off: 0,
			added: 0,
			cards: []
		};
		if (row.payroll_cents > 0) {
			offCents += row.payroll_cents;
			bucket.off += row.payroll_cents;
			bucket.cards.push(`${row.card_code} down $${Math.round(row.payroll_cents / 100).toLocaleString("en-US")}`);
		} else if (row.payroll_cents < 0) {
			addedCents += Math.abs(row.payroll_cents);
			bucket.added += Math.abs(row.payroll_cents);
			bucket.cards.push(`${row.card_code} up $${Math.round(Math.abs(row.payroll_cents) / 100).toLocaleString("en-US")}`);
		}
		payrollByRound.set(row.round_n, bucket);
		playerCents.set(row.player_id, (playerCents.get(row.player_id) ?? 0) + row.payroll_cents);
		deptCents.set(row.dept, (deptCents.get(row.dept) ?? 0) + row.payroll_cents);
	}
	const roundsPlayed = Math.max(1, round);
	const payrollCents = baseRound * roundsPlayed + addedCents - offCents;
	const scoreByPlayer = /* @__PURE__ */ new Map();
	const scoreByDept = /* @__PURE__ */ new Map();
	for (const row of input.answers) {
		const right = row.payroll_cents > 0;
		const playerScore = scoreByPlayer.get(row.player_id) ?? {
			right: 0,
			wrong: 0
		};
		const deptScore = scoreByDept.get(row.dept) ?? {
			right: 0,
			wrong: 0
		};
		if (right) {
			playerScore.right += 1;
			deptScore.right += 1;
		} else if (row.payroll_cents < 0) {
			playerScore.wrong += 1;
			deptScore.wrong += 1;
		}
		scoreByPlayer.set(row.player_id, playerScore);
		scoreByDept.set(row.dept, deptScore);
	}
	const scoreboard = [...scoreByDept.entries()].map(([dept, row]) => ({
		dept,
		right: row.right,
		wrong: row.wrong,
		added: row.wrong * 5e4,
		removed: row.right * 5e4,
		net: (row.wrong - row.right) * 5e4,
		saving: (row.right - row.wrong) * 5e4
	}));
	const byFinish = [...input.projects.filter((project) => project.status === "complete")].sort((a, b) => {
		const orderA = a.finish_order ?? 9999;
		const orderB = b.finish_order ?? 9999;
		if (orderA !== orderB) return orderA - orderB;
		return (a.completed_at ? new Date(a.completed_at).getTime() : 0) - (b.completed_at ? new Date(b.completed_at).getTime() : 0);
	});
	const lastFinishedId = byFinish.length ? byFinish[byFinish.length - 1].id : "";
	const finishRank = /* @__PURE__ */ new Map();
	byFinish.forEach((project, index) => finishRank.set(project.id, index + 1));
	let revenueCents = 0;
	let otherCents = 0;
	const projectRevenue = /* @__PURE__ */ new Map();
	const projectTokens = /* @__PURE__ */ new Map();
	const projectEffect = /* @__PURE__ */ new Map();
	for (const project of input.projects) {
		const plays = input.plays.filter((play) => play.project_id === project.id);
		const tokens = {
			star: 0,
			phone: 0,
			sale: 0,
			hammer: 0,
			calculator: 0
		};
		let specials = 0;
		let leePlacements = 0;
		let upsellCount = 0;
		let financingCount = 0;
		const effects = [];
		for (const play of plays) {
			const effect = boardEffect({
				name: play.card_name,
				dept: play.dept,
				text: play.card_text
			});
			if (effect.token && effect.kind === "token") {
				tokens[effect.token] += effect.count;
				if (/Lee/i.test(project.customer)) leePlacements += effect.count;
			}
			if (effect.token && effect.kind === "remove") tokens[effect.token] -= effect.count;
			if (effect.kind === "slot") effects.push(`+${effect.count} ${effect.token} slot`);
			if (/SPECIAL/i.test(play.card_text) && play.project_id === project.id && !/Crew Swap/i.test(play.card_name)) specials += 1;
			if (/Upsell Close/i.test(play.card_name)) upsellCount += 1;
			if (/Financing Falls Through/i.test(play.card_name)) financingCount += 1;
			if (effect.cashCents && effect.cashWhen === "now") revenueCents += effect.cashCents;
			effects.push(effect.words);
		}
		Object.values(tokens).reduce((sum, n) => sum + Math.max(0, n), 0);
		const rank = finishRank.get(project.id) ?? 0;
		const finishedAfter = rank > 0 ? byFinish.length - rank : 0;
		const tier = tierValue(project.n) * 100;
		let revenue = 0;
		if (project.status === "complete") {
			revenue += tier;
			revenue += houseBonus(project.house);
			const customerBonus = customerCash({
				name: project.customer,
				tokensPlaced: leePlacements,
				specials,
				finishedAfter: /Garcia/i.test(project.customer) ? 0 : finishedAfter,
				isLastFinished: project.id === lastFinishedId,
				isFourthOrLater: rank >= 4,
				complete: true,
				gameEnded: input.gameEnded,
				marketingStars: tokens.star
			});
			revenue += customerBonus;
			const garciaProject = input.projects.find((pr) => /Garcia/i.test(pr.customer) && pr.status === "complete");
			if (garciaProject && project.id !== garciaProject.id && rank > (finishRank.get(garciaProject.id) ?? 0) && rank > 0) {
				revenue += 2e5;
				projectRevenue.set(project.id + ":garcia", 2e5);
			}
			revenue += upsellCount * 2e5;
			revenue -= financingCount * 2e5;
		} else revenue += customerCash({
			name: project.customer,
			tokensPlaced: leePlacements,
			specials: 0,
			finishedAfter: 0,
			isLastFinished: false,
			isFourthOrLater: false,
			complete: false,
			marketingStars: tokens.star
		});
		revenue += stanleyPenalty(project.customer, round, project.status);
		projectRevenue.set(project.id, project.status === "complete" ? revenue : tier);
		projectTokens.set(project.id, Object.entries(tokens).filter(([, n]) => n).map(([token, n]) => `${n} ${token}`).join(", ") || "no tokens yet");
		projectEffect.set(project.id, effects.join("; "));
		const house = houseBonus(project.house);
		const customer = customerCash({
			name: project.customer,
			tokensPlaced: 0,
			specials: 0,
			finishedAfter: 0,
			isLastFinished: false,
			isFourthOrLater: false,
			complete: true,
			marketingStars: tokens.star
		});
		const potential = tier + house + Math.max(0, customer);
		projectRevenue.set(project.id + ":potential", potential);
		projectRevenue.set(project.id + ":house", house);
		projectRevenue.set(project.id + ":customer", customer);
		if (project.status === "complete") revenueCents += revenue;
	}
	for (const play of input.plays) {
		const cash = eventCash(play.card_name);
		if (cash > 0) revenueCents += cash;
		if (cash < 0) otherCents += Math.abs(cash);
	}
	const profitCents = revenueCents - payrollCents - fixedCents - otherCents;
	const marginBps = revenueCents > 0 ? Math.round(profitCents / revenueCents * 1e4) : null;
	return {
		companyName: input.companyName,
		revenueCents,
		payrollCents,
		payrollBaseCents: baseRound,
		payrollRoundCents: baseRound,
		payrollAddedCents: addedCents,
		payrollOffCents: offCents,
		payrollNetCents: addedCents - offCents,
		payrollLabel,
		fixedCents,
		fixedDeptCount,
		fixedPerRoundCents,
		otherCents,
		profitCents,
		marginBps,
		result: resultOf(marginBps),
		rounds: Array.from({ length: roundsPlayed }, (_, i) => i + 1).map((n) => {
			const bucket = payrollByRound.get(n) ?? {
				off: 0,
				added: 0,
				cards: []
			};
			return {
				round: n,
				baseCents: baseRound,
				payrollCents: baseRound + bucket.added - bucket.off,
				offCents: bucket.off,
				addedCents: bucket.added,
				fixedCents: n >= input.fixedStartRound ? fixedPerRoundCents : 0,
				netCents: bucket.added - bucket.off - (n >= input.fixedStartRound ? fixedPerRoundCents : 0),
				cards: bucket.cards
			};
		}),
		projects: input.projects.map((project) => ({
			n: project.n,
			title: project.title,
			status: project.status,
			house: project.house,
			customer: project.customer,
			valueCents: tierValue(project.n) * 100,
			houseBonus: projectRevenue.get(project.id + ":house") ?? 0,
			customerBonus: projectRevenue.get(project.id + ":customer") ?? 0,
			garciaBonus: projectRevenue.get(project.id + ":garcia") ?? 0,
			revenueCents: project.status === "complete" ? projectRevenue.get(project.id) ?? 0 : 0,
			potentialCents: projectRevenue.get(project.id + ":potential") ?? tierValue(project.n) * 100,
			tokens: projectTokens.get(project.id) ?? "no tokens yet",
			effect: projectEffect.get(project.id) ?? "",
			breakdown: [
				`Tier (position ${project.n}): $${(tierValue(project.n) * 100 / 100).toLocaleString("en-US")}`,
				`House (${project.house}): $${((projectRevenue.get(project.id + ":house") ?? 0) / 100).toLocaleString("en-US")}`,
				`Customer (${project.customer}): $${((projectRevenue.get(project.id + ":customer") ?? 0) / 100).toLocaleString("en-US")}`,
				`Potential: $${((projectRevenue.get(project.id + ":potential") ?? 0) / 100).toLocaleString("en-US")}`
			]
		})),
		departments: [...deptCents.entries()].map(([dept, cents]) => ({
			dept,
			cents
		})),
		players: input.players.map((player) => {
			const score = scoreByPlayer.get(player.id) ?? {
				right: 0,
				wrong: 0
			};
			return {
				id: player.id,
				name: player.name,
				dept: player.dept,
				cents: playerCents.get(player.id) ?? 0,
				right: score.right,
				wrong: score.wrong,
				saving: (score.right - score.wrong) * 5e4
			};
		}),
		scoreboard,
		figured: (input.lang ?? "en") === "es" ? [
			"Ingresos = nivel del proyecto terminado + bonificación de casa + bonificación de cliente + ganancias en efectivo de cartas special/event − reducciones de ingresos (Overbudget Surprise, Financing Falls Through).",
			"Las posiciones 1-3 pagan $10,000, 4-6 $20,000, 7-9 $30,000, solo al terminarlo. Lo no terminado es potencial.",
			"Costos variables = pérdidas en efectivo y penalizaciones (Stanley, Thompson, Material Spike, Warranty Claim).",
			"Margen bruto = ingresos − costos variables.",
			"Nómina = $16,000 de base por ronda + $500 × respuestas incorrectas − $500 × respuestas correctas.",
			"Costo fijo = $2,000 × departamentos que juegan, cada ronda a partir de la ronda 3.",
			"Margen neto = margen bruto − costos fijos.",
			"Margen neto % = 100 × margen neto / ingresos. 30% o menos no es victoria. Más de 30% es victoria. Más de 50% es Líder de Mercado."
		] : [
			"Overbudget Surprise: −$3,000 off company Revenues, right away.",
			"Financing Falls Through: Sales picks one unfinished project, which loses $2,000 of its revenue when it completes.",
			"Stanley: −$5,000 Variable Costs if the project is unfinished at the end of round 6.",
			"Thompson: −$5,000 Variable Costs if the project completes 4th or later.",
			"Material Spike: −$2,000 Variable Costs, right away.",
			"Warranty Claim: −$2,000 Variable Costs, right away.",
			"Garcia: +$2,000 for each project finished after Garcia's, up to $8,000.",
			"Harris +$4,000, Patel +$2,000: on completion.",
			"Upsell Close: +$2,000 on completion per play.",
			"Invoice Blitz +$3,000, Quick Audit +$4,000: added to company Revenues right away."
		],
		cardEffects: (input.lang ?? "en") === "es" ? [
			"Overbudget Surprise: −$3,000 de los ingresos de la empresa, de inmediato.",
			"Financing Falls Through: Ventas elige un proyecto sin terminar, que pierde $2,000 de sus ingresos cuando se termina. Si sale de nuevo en el mismo proyecto, las reducciones se acumulan.",
			"Stanley: −$5,000 en costos variables si el proyecto no está terminado al final de la ronda 6.",
			"Thompson: −$5,000 en costos variables si el proyecto termina en 4.º lugar o después, según el orden de cierre de Contabilidad.",
			"Material Spike: −$2,000 en costos variables, de inmediato.",
			"Warranty Claim: −$2,000 en costos variables, de inmediato.",
			"Rivera: +$5,000 al terminarlo, solo si se jugaron 2 o más cartas SPECIAL en ese mismo proyecto. Splits y Crew Swap no cuentan.",
			"Garcia: +$2,000 por cada proyecto terminado después del de Garcia, hasta $8,000, según el orden de cierre de Contabilidad.",
			"Lee: +$1,000 por cada ficha colocada en el proyecto de Lee, hasta $5,000. Las fichas movidas o reemplazadas no se recuperan.",
			"O'Brien: +$4,000 al final del juego al último proyecto que terminó, según el orden de cierre de Contabilidad. Se paga una sola vez.",
			"Harris +$4,000, Patel +$2,000, Bi-Level +$3,000, McMansion +$2,000, Victorian +$2,000: solo al terminarlo.",
			"Upsell Close: +$2,000 al terminarlo por cada vez que se juega en ese proyecto. La bonificación se queda si después se mueve la ficha.",
			"Invoice Blitz +$3,000, Quick Audit +$4,000, Invoice Paid Early +$3,000, Community Buzz +$3,000: se suman a los ingresos de la empresa de inmediato."
		] : [
			"Revenue = completed project tier + house bonus + customer bonus + special/event cash gains − revenue reductions (Overbudget Surprise, Financing Falls Through).",
			"Positions 1-3 pay $10,000, 4-6 $20,000, 7-9 $30,000, only on completion. Unfinished is potential.",
			"Variable costs = cash losses and penalties (Stanley, Thompson, Material Spike, Warranty Claim).",
			"Gross margin = revenue − variable costs.",
			"Payroll = $16,000 base a round + $500 × wrong answers − $500 × right answers.",
			"Fixed cost = $2,000 × departments playing, each round from round 3.",
			"Net Margin = Gross Margin − Fixed Costs.",
			"Net Margin % = 100 × Net Margin / Revenues. 30% or below is no win. Above 30% wins. Above 50% is Market Leader."
		]
	};
}
var EVENT_ID = "metalcon-2026";
async function adminHash() {
	if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
	return (await (await getMetalconSql())`select value from metalcon.admin_settings where key = 'super_admin_hash' limit 1`)[0]?.value ?? "";
}
var ALERT_TO = "johnny@thecnsoe.com";
var SEATS = new Set(METALCON_SEATS);
function hash(secret) {
	return createHash("sha256").update(secret).digest("hex");
}
async function passwordOk(given) {
	const expected = await adminHash();
	if (!expected) return false;
	if (process.env.ADMIN_PASSWORD) {
		const a = createHash("sha256").update(given).digest();
		const b = createHash("sha256").update(expected).digest();
		return timingSafeEqual(a, b);
	}
	const [salt, stored] = expected.split(":");
	if (!salt || !stored || !/^[0-9a-f]{64}$/.test(stored)) return false;
	const check = scryptSync(given, salt, 32);
	return timingSafeEqual(check, Buffer.from(stored, "hex"));
}
function sign(actor) {
	const exp = String(Date.now() + 432e5);
	const body = `v2.${actor.id}.${actor.role}.${exp}`;
	return `${body}.${createHmac("sha256", "metalcon-host-gate").update(body).digest("hex")}`;
}
function actorOf(token) {
	const [ver, id, role, exp, sig] = token.split(".");
	if (ver !== "v2" || !id || role !== "super" && role !== "host" || !exp || !sig) return null;
	if (Number(exp) < Date.now()) return null;
	const expected = createHmac("sha256", "metalcon-host-gate").update(`${ver}.${id}.${role}.${exp}`).digest("hex");
	const a = Buffer.from(sig);
	const b = Buffer.from(expected);
	if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
	return {
		id,
		role,
		name: ""
	};
}
function deny() {
	return {
		ok: false,
		error: "Enter the host password again."
	};
}
function cleanName(raw) {
	return raw.replace(/\s+/g, " ").trim().slice(0, 60);
}
function seatOf(value) {
	return SEATS.has(value) ? value : null;
}
function originOf(raw) {
	try {
		const url = new URL(raw);
		if (url.protocol !== "https:" && url.protocol !== "http:") return "";
		return url.origin;
	} catch {
		return "";
	}
}
function datedSlug(n) {
	return `${(/* @__PURE__ */ new Date()).toLocaleDateString("en-CA", { timeZone: "America/New_York" })}-soebld-g${n}`;
}
async function ping(gameId, kind, detail) {
	const sql = await getMetalconSql();
	await sql`
    insert into metalcon.alerts (id, game_id, kind, detail)
    values (${randomBytes(8).toString("hex")}, ${gameId}, ${kind}, ${detail})
  `;
	if (kind === "attempt") {
		const recent = await sql`
      select count(*)::int as n from metalcon.alerts
      where kind = 'attempt' and game_id = ${gameId} and created_at > now() - interval '10 minutes'
    `;
		if (Number(recent[0]?.n ?? 0) > 1) return;
	}
	const games = gameId ? await sql`
        select slug, event_name from metalcon.games where id = ${gameId} limit 1
      ` : [];
	const slug = games[0]?.slug ?? "no-slug";
	const title = games[0]?.event_name ?? "SOEBLD";
	await sendPlainEmail(ALERT_TO, `SOE beta ${kind}: ${title}`, `${detail}\n\nSlug: ${slug}\n`).catch(() => void 0);
}
async function noteClosedAttempt(secret, detail) {
	if (!secret) return;
	const row = (await (await getMetalconSql())`
    select game_id, player_name, dept from metalcon.revoked where secret_hash = ${hash(secret)} limit 1
  `)[0];
	if (!row) return;
	await ping(row.game_id, "attempt", `${row.player_name} (${row.dept}) used a closed seat. ${detail}`);
}
async function ensureSuper() {
	const sql = await getMetalconSql();
	const rows = await sql`
    select id, name, email, role from metalcon.hosts where role = 'super' limit 1
  `;
	if (rows[0]) return rows[0];
	const id = randomBytes(8).toString("hex");
	await sql`
    insert into metalcon.hosts (id, name, email, password_hash, role)
    values (${id}, 'Johnny Neal', ${ALERT_TO}, ${hash(randomBytes(32).toString("hex"))}, 'super')
  `;
	return {
		id,
		name: "Johnny Neal",
		email: ALERT_TO,
		role: "super"
	};
}
async function allow(token, gameId) {
	const actor = actorOf(token);
	if (!actor) return null;
	const game = (await (await getMetalconSql())`
    select id, n, status, share_seat, registration_open, slug, event_name, host_id
    from metalcon.games where id = ${gameId} limit 1
  `)[0];
	if (!game) return null;
	if (actor.role !== "super" && game.host_id !== actor.id) return null;
	return {
		actor,
		game
	};
}
async function seatFor(dept, slug) {
	const sql = await getMetalconSql();
	const game = (await sql`
    select id, n, status, share_seat, registration_open, slug, event_name, host_id
    from metalcon.games where slug = ${slug} limit 1
  `)[0];
	if (!game) return {
		ok: false,
		error: "That game link is not valid."
	};
	if (game.status !== "live") {
		await ping(game.id, "attempt", `Someone tried to take a ${dept} seat on a closed game.`);
		return {
			ok: false,
			error: "This game is closed."
		};
	}
	if (game.registration_open === false) return {
		ok: false,
		error: "Sign-up for this game is closed."
	};
	if (!game.share_seat) {
		if ((await sql`
      select id from metalcon.players where game_id = ${game.id} and dept = ${dept} limit 1
    `)[0]) return {
			ok: false,
			error: `${dept} already has a player. Turn on shared seats to add another.`
		};
	}
	return {
		ok: true,
		gameId: game.id
	};
}
async function adminEnter(password, email) {
	if (!await adminHash() && !email.trim()) return {
		ok: false,
		error: "Admin password is not configured."
	};
	const sql = await getMetalconSql();
	const clean = email.trim().toLowerCase();
	if (clean) {
		const host = (await sql`
      select id, name, email, password_hash, role from metalcon.hosts where email = ${clean} limit 1
    `)[0];
		if (!host || hash(password) !== host.password_hash) return {
			ok: false,
			error: "That email or password is not right."
		};
		return {
			ok: true,
			token: sign(host),
			role: host.role,
			name: host.name
		};
	}
	if (!await passwordOk(password)) return {
		ok: false,
		error: "That password is not right."
	};
	const superRow = await ensureSuper();
	return {
		ok: true,
		token: sign(superRow),
		role: "super",
		name: superRow.name
	};
}
async function resetPassword(email) {
	const clean = email.trim().toLowerCase();
	if (!clean) return {
		ok: false,
		error: "Enter your email."
	};
	const sql = await getMetalconSql();
	const rows = await sql`select id from metalcon.hosts where email = ${clean} limit 1`;
	if (!rows[0]) return {
		ok: false,
		error: "No host with that email."
	};
	const temp = randomBytes(4).toString("hex");
	await sql`update metalcon.hosts set password_hash = ${hash(temp)} where id = ${rows[0].id}`;
	await sendPlainEmail(clean, "SOE admin password reset", `Your temporary password is: ${temp}\n\nSign in and change it.`).catch(() => void 0);
	return { ok: true };
}
async function changeAdminPassword(token, current, next) {
	const actor = actorOf(token);
	if (!actor || actor.role !== "super") return {
		ok: false,
		error: "Only the super admin can change this."
	};
	if (!await passwordOk(current)) return {
		ok: false,
		error: "Current password is not right."
	};
	if (next.length < 12) return {
		ok: false,
		error: "New password must be at least 12 characters."
	};
	const salt = randomBytes(16).toString("hex");
	const hash = scryptSync(next, salt, 32).toString("hex");
	await (await getMetalconSql())`insert into metalcon.admin_settings (key, value) values ('super_admin_hash', ${salt + ":" + hash}) on conflict (key) do update set value = excluded.value`;
	return { ok: true };
}
async function createHost(input) {
	const actor = actorOf(input.token);
	if (!actor || actor.role !== "super") return {
		ok: false,
		error: "Only the super admin can add a host."
	};
	const name = cleanName(input.name);
	const email = input.email.trim().toLowerCase();
	if (name.length < 2) return {
		ok: false,
		error: "Enter the host's name."
	};
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return {
		ok: false,
		error: "Enter the host's email."
	};
	if (input.password.length < 6) return {
		ok: false,
		error: "Use a host password of at least 6 characters."
	};
	const sql = await getMetalconSql();
	const id = randomBytes(8).toString("hex");
	try {
		await sql`
      insert into metalcon.hosts (id, name, email, password_hash, role)
      values (${id}, ${name}, ${email}, ${hash(input.password)}, 'host')
    `;
	} catch {
		return {
			ok: false,
			error: "That email is already a host."
		};
	}
	await ping(null, "host", `${name} (${email}) was added as a host.`);
	return { ok: true };
}
async function adminDesk(token) {
	const actor = actorOf(token);
	if (!actor) return deny();
	const sql = await getMetalconSql();
	const who = await sql`select name from metalcon.hosts where id = ${actor.id} limit 1`;
	const visible = (await sql`
    select g.id, g.n, g.status, g.share_seat, g.registration_open, g.slug, g.event_name, g.host_id,
      h.name as host_name,
      (select count(*)::int from metalcon.players p where p.game_id = g.id) as players,
      (select count(*)::int from metalcon.answers a where a.game_id = g.id) as answers
    from metalcon.games g
    left join metalcon.hosts h on h.id = g.host_id
    order by g.n desc
  `).filter((game) => actor.role === "super" || game.host_id === actor.id);
	for (const game of visible) {
		if (game.slug) continue;
		const slug = datedSlug(game.n);
		game.slug = slug;
		game.event_name = game.event_name || "The Business Machine Experience";
		await sql`update metalcon.games set slug = ${slug}, event_name = ${game.event_name} where id = ${game.id} and slug is null`;
	}
	const liveIds = new Set(visible.filter((game) => game.status === "live").map((game) => game.id));
	const players = (liveIds.size ? await sql`
        select id, name, phone, email, dept, invite_token, game_id, company, job_title
        from metalcon.players
        where game_id in (select id from metalcon.games where status = 'live')
        order by dept, created_at
      ` : []).filter((player) => liveIds.has(player.game_id));
	const hosts = actor.role === "super" ? await sql`
          select id, name, email, role from metalcon.hosts order by role desc, name
        ` : [];
	const max = await sql`select coalesce(max(n), 0)::int as n from metalcon.games`;
	const leads = actor.role === "super" ? await sql`
          select id, company, contact_name, title, phone, email, city, state, headcount, timing, notes, created_at
          from metalcon.host_leads
          order by created_at desc
          limit 200
        ` : [];
	return {
		ok: true,
		role: actor.role,
		name: who[0]?.name ?? "Host",
		nextNumber: Number(max[0]?.n ?? 0) + 1,
		hosts,
		leads,
		games: visible.map((game) => ({
			id: game.id,
			n: game.n,
			status: game.status,
			slug: game.slug ?? "",
			eventName: game.event_name ?? "The Business Machine Experience",
			hostName: game.host_name ?? "Unassigned",
			shareSeat: game.share_seat,
			registrationOpen: game.registration_open !== false,
			players: Number(game.players),
			answers: Number(game.answers)
		})),
		players
	};
}
async function startGame(token, eventName, actionMode = "digital") {
	const actor = actorOf(token);
	if (!actor) return deny();
	const label = cleanName(eventName) || "The Business Machine Experience";
	const sql = await getMetalconSql();
	const max = await sql`select coalesce(max(n), 0)::int as n from metalcon.games`;
	const n = Number(max[0]?.n ?? 0) + 1;
	const id = randomBytes(8).toString("hex");
	let slug = datedSlug(n);
	if ((await sql`select id from metalcon.games where slug = ${slug} limit 1`)[0]) slug = `${slug}-${randomBytes(2).toString("hex")}`;
	await sql`
    insert into metalcon.games (id, n, status, share_seat, registration_open, slug, event_name, host_id, action_mode)
    values (${id}, ${n}, 'live', true, true, ${slug}, ${label}, ${actor.id}, ${actionMode === "manual" ? "manual" : "digital"})
  `;
	await ping(id, "opened", `${label} is live with sign-up open. Other games were left as they are.`);
	return {
		ok: true,
		n,
		slug
	};
}
async function endGame(token, gameId) {
	const allowed = await allow(token, gameId);
	if (!allowed) return deny();
	if (allowed.game.status !== "live") return {
		ok: false,
		error: "That game is already closed."
	};
	const file = await dumpAndClose(allowed.game);
	await ping(allowed.game.id, "closed", `${allowed.game.slug} was closed. Seats were removed.`);
	return {
		ok: true,
		n: allowed.game.n,
		csv: file.csv,
		filename: file.filename
	};
}
async function reopenGame(token, gameId) {
	const allowed = await allow(token, gameId);
	if (!allowed) return deny();
	if (allowed.game.status === "live") return {
		ok: false,
		error: "That game is already open."
	};
	await (await getMetalconSql())`
    update metalcon.games
    set status = 'live', ended_at = null, registration_open = false
    where id = ${allowed.game.id}
  `;
	await ping(allowed.game.id, "reopened", `${allowed.game.slug} was reopened. Sign-up stays closed until it is turned on.`);
	return {
		ok: true,
		n: allowed.game.n
	};
}
async function resetGame(token, gameId) {
	const allowed = await allow(token, gameId);
	if (!allowed) return deny();
	if (allowed.game.status !== "live") return {
		ok: false,
		error: "That game is closed."
	};
	await (await getMetalconSql())`delete from metalcon.answers where game_id = ${allowed.game.id}`;
	return {
		ok: true,
		n: allowed.game.n
	};
}
async function setSignup(token, gameId, open) {
	const allowed = await allow(token, gameId);
	if (!allowed) return deny();
	if (allowed.game.status !== "live") return {
		ok: false,
		error: "That game is closed."
	};
	await (await getMetalconSql())`update metalcon.games set registration_open = ${open} where id = ${allowed.game.id}`;
	if (open) await ping(allowed.game.id, "exposed", `${allowed.game.slug} sign-up was opened. Anyone with the link can take a seat.`);
	return { ok: true };
}
async function setShareSeat(token, gameId, share) {
	const allowed = await allow(token, gameId);
	if (!allowed) return deny();
	await (await getMetalconSql())`update metalcon.games set share_seat = ${share} where id = ${allowed.game.id}`;
	return { ok: true };
}
async function dumpAndClose(game) {
	const sql = await getMetalconSql();
	const file = await buildCsv(game);
	await sql`
    insert into metalcon.archives (id, game_id, n, csv)
    values (${randomBytes(8).toString("hex")}, ${game.id}, ${game.n}, ${file.csv})
  `;
	const seated = await sql`
    select secret_hash, name, dept from metalcon.players where game_id = ${game.id}
  `;
	for (const player of seated) await sql`
      insert into metalcon.revoked (id, game_id, secret_hash, player_name, dept)
      values (${randomBytes(8).toString("hex")}, ${game.id}, ${player.secret_hash}, ${player.name}, ${player.dept})
    `;
	await sql`delete from metalcon.lookups where game_id = ${game.id}`;
	await sql`delete from metalcon.answers where game_id = ${game.id}`;
	await sql`delete from metalcon.players where game_id = ${game.id}`;
	await sql`
    update metalcon.games
    set status = 'ended', ended_at = now(), registration_open = false
    where id = ${game.id}
  `;
	return file;
}
async function placePlayer(input) {
	const allowed = await allow(input.token, input.gameId);
	if (!allowed) return deny();
	if (allowed.game.status !== "live") return {
		ok: false,
		error: "That game is closed."
	};
	const name = cleanName(input.name);
	if (name.length < 2) return {
		ok: false,
		error: "Enter the player's name."
	};
	const phone = normalizePhone(input.phone);
	if (!phone) return {
		ok: false,
		error: "Enter a 10-digit mobile number."
	};
	const email = input.email.trim().toLowerCase();
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return {
		ok: false,
		error: "Enter an email address."
	};
	const dept = seatOf(input.dept);
	if (!dept) return {
		ok: false,
		error: "Choose a seat."
	};
	const sql = await getMetalconSql();
	if (!allowed.game.share_seat) {
		if ((await sql`
      select id from metalcon.players where game_id = ${allowed.game.id} and dept = ${dept} limit 1
    `)[0]) return {
			ok: false,
			error: `${dept} already has a player.`
		};
	}
	const id = randomBytes(8).toString("hex");
	const secret = randomBytes(18).toString("hex");
	await sql`
    insert into metalcon.players (id, event_id, game_id, secret_hash, invite_token, name, phone, email, dept, terms_at)
    values (${id}, ${EVENT_ID}, ${allowed.game.id}, ${hash(secret)}, ${secret}, ${name}, ${phone}, ${email}, ${dept}, null)
  `;
	return {
		ok: true,
		player: {
			id,
			token: secret,
			name,
			dept
		}
	};
}
async function sendSeatLink(input) {
	const actor = actorOf(input.token);
	if (!actor) return deny();
	const origin = originOf(input.origin);
	if (!origin) return {
		ok: false,
		error: "Could not build the link."
	};
	const sql = await getMetalconSql();
	const player = (await sql`
    select p.id, p.name, p.email, p.dept, p.invite_token, g.n, g.slug, g.host_id
    from metalcon.players p
    join metalcon.games g on g.id = p.game_id
    where p.id = ${input.playerId}
    limit 1
  `)[0];
	if (!player) return {
		ok: false,
		error: "That player is not on a game."
	};
	if (actor.role !== "super" && player.host_id !== actor.id) return deny();
	let invite = player.invite_token;
	if (!invite) {
		invite = randomBytes(18).toString("hex");
		await sql`update metalcon.players set invite_token = ${invite}, secret_hash = ${hash(invite)} where id = ${player.id}`;
	}
	const link = `${origin}/soebld/go?id=${player.id}&k=${invite}`;
	const sent = await sendPlainEmail(player.email, `Your seat for ${player.slug ?? `Game ${player.n}`}`, `${player.name}, you are seated in ${player.dept}.\n\nOpen this link, agree to the beta terms, and you are in:\n${link}\n`);
	if (!sent.ok) return {
		ok: false,
		error: sent.error,
		link
	};
	return {
		ok: true,
		link
	};
}
function csvCell(value) {
	const text = String(value ?? "");
	return /[",\n]/.test(text) ? `"${text.replace(/"/g, "\"\"")}"` : text;
}
async function exportGame(token, gameId) {
	const allowed = await allow(token, gameId);
	if (!allowed) return deny();
	const saved = await (await getMetalconSql())`
    select n, csv from metalcon.archives where game_id = ${gameId} order by created_at desc limit 1
  `;
	if (saved[0]) return {
		ok: true,
		filename: `soebld-game-${saved[0].n}.csv`,
		csv: saved[0].csv
	};
	return {
		ok: true,
		...await buildCsv(allowed.game)
	};
}
async function buildCsv(game) {
	const sql = await getMetalconSql();
	const players = await sql`
    select name, phone, email, dept from metalcon.players where game_id = ${game.id} order by dept, name
  `;
	const answers = await sql`
    select round_n, dept, player_name, card_code, card_title, choice, choice_text, payroll_cents
    from metalcon.answers
    where game_id = ${game.id}
    order by round_n, dept, created_at
  `;
	const lines = [[
		"record",
		"game",
		"department",
		"player",
		"phone",
		"email",
		"round",
		"card",
		"title",
		"answer",
		"answer_text",
		"payroll"
	].join(",")];
	for (const player of players) lines.push([
		"player",
		game.n,
		player.dept,
		player.name,
		player.phone,
		player.email,
		"",
		"",
		"",
		"",
		"",
		""
	].map(csvCell).join(","));
	for (const row of answers) {
		if (row.card_code.toUpperCase().startsWith("BE-OW") || row.card_code.toUpperCase().startsWith("BE-RE")) continue;
		lines.push([
			"answer",
			game.n,
			row.dept,
			row.player_name,
			"",
			"",
			row.round_n,
			row.card_code,
			row.card_title,
			row.choice,
			row.choice_text,
			(Number(row.payroll_cents) / 100).toFixed(2)
		].map(csvCell).join(","));
	}
	const ledger = await sql`
    select dept, player_name, round_n, card_code, amount_cents, kind, detail, during_meeting, created_at
    from metalcon.ledger where game_id = ${game.id} order by created_at
  `;
	for (const row of ledger) {
		if (row.card_code.toUpperCase().startsWith("BE-OW") || row.card_code.toUpperCase().startsWith("BE-RE")) continue;
		lines.push([
			"ledger",
			game.n,
			row.dept,
			row.player_name,
			"",
			"",
			row.round_n,
			row.card_code,
			row.detail,
			row.kind,
			row.during_meeting ? "during GM meeting" : "",
			(Number(row.amount_cents) / 100).toFixed(2),
			row.created_at
		].map(csvCell).join(","));
	}
	const settings = await sql`
    select company_name, current_round, fixed_cost_cents, fixed_cost_start_round, base_payroll_cents from metalcon.games where id = ${game.id} limit 1
  `;
	const projects = await sql`
    select id, n, title, house, customer, value_cents, status from metalcon.projects where game_id = ${game.id}
  `;
	const plays = await sql`
    select player_id, dept, player_name, card_name, card_text, project_id, amount_cents, round_n from metalcon.plays where game_id = ${game.id}
  `;
	const people = await sql`select id, name, dept from metalcon.players where game_id = ${game.id}`;
	const numbers = computeNumbers({
		companyName: settings[0]?.company_name ?? "",
		currentRound: Number(settings[0]?.current_round) || 1,
		fixedCostCents: Number(settings[0]?.fixed_cost_cents) || 2e5,
		fixedStartRound: Number(settings[0]?.fixed_cost_start_round) || 3,
		basePayrollCents: Number(settings[0]?.base_payroll_cents) || 0,
		answers: answers.map((row) => ({
			...row,
			player_id: "",
			during_meeting: false
		})),
		plays,
		projects,
		players: people
	});
	lines.push([
		"numbers",
		game.n,
		"",
		"",
		"",
		"",
		"",
		"revenue",
		"",
		"",
		"",
		(numbers.revenueCents / 100).toFixed(2)
	].map(csvCell).join(","));
	lines.push([
		"numbers",
		game.n,
		"",
		"",
		"",
		"",
		"",
		"payroll",
		"",
		"",
		"",
		(numbers.payrollCents / 100).toFixed(2)
	].map(csvCell).join(","));
	lines.push([
		"numbers",
		game.n,
		"",
		"",
		"",
		"",
		"",
		"fixed",
		"",
		"",
		"",
		(numbers.fixedCents / 100).toFixed(2)
	].map(csvCell).join(","));
	lines.push([
		"numbers",
		game.n,
		"",
		"",
		"",
		"",
		"",
		"other",
		"",
		"",
		"",
		(numbers.otherCents / 100).toFixed(2)
	].map(csvCell).join(","));
	lines.push([
		"numbers",
		game.n,
		"",
		"",
		"",
		"",
		"",
		"profit",
		"",
		"",
		"",
		(numbers.profitCents / 100).toFixed(2)
	].map(csvCell).join(","));
	lines.push([
		"numbers",
		game.n,
		"",
		"",
		"",
		"",
		"",
		"margin",
		"",
		"",
		"",
		numbers.marginBps === null ? "" : (numbers.marginBps / 100).toFixed(1)
	].map(csvCell).join(","));
	for (const project of numbers.projects) lines.push([
		"project",
		game.n,
		"",
		project.title,
		"",
		"",
		project.n,
		"",
		project.status,
		"",
		"",
		(project.revenueCents / 100).toFixed(2)
	].map(csvCell).join(","));
	for (const dept of numbers.departments) lines.push([
		"department",
		game.n,
		dept.dept,
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		(dept.cents / 100).toFixed(2)
	].map(csvCell).join(","));
	for (const person of numbers.players) lines.push([
		"player-value",
		game.n,
		person.dept,
		person.name,
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		(person.cents / 100).toFixed(2)
	].map(csvCell).join(","));
	for (const row of numbers.scoreboard) lines.push([
		"scoreboard",
		game.n,
		row.dept,
		"",
		"",
		"",
		"",
		`${row.right}R ${row.wrong}W`,
		"",
		"",
		"",
		(row.net / 100).toFixed(2)
	].map(csvCell).join(","));
	for (const line of numbers.figured) lines.push([
		"formula",
		game.n,
		"",
		"",
		"",
		"",
		"",
		line,
		"",
		"",
		"",
		""
	].map(csvCell).join(","));
	return {
		filename: `soebld-game-${game.n}.csv`,
		csv: lines.join("\n")
	};
}
async function setBasePayroll(input) {
	if (!await allow(input.token, input.gameId)) return deny();
	const amount = Math.round(input.amount);
	if (!Number.isFinite(amount) || amount < 0 || amount > 2e4) return {
		ok: false,
		error: "Enter a base from $0 to $20,000 per department."
	};
	await (await getMetalconSql())`update metalcon.games set base_payroll_cents = ${amount * 100} where id = ${input.gameId}`;
	return { ok: true };
}
async function setFixedCost(input) {
	if (!await allow(input.token, input.gameId)) return deny();
	const amount = Math.round(input.amount);
	const start = Math.round(input.startRound);
	if (!Number.isFinite(amount) || amount < 0 || amount > 1e5) return {
		ok: false,
		error: "Enter a fixed cost from $0 to $100,000."
	};
	if (!Number.isFinite(start) || start < 1 || start > 20) return {
		ok: false,
		error: "Enter a starting round from 1 to 20."
	};
	await (await getMetalconSql())`update metalcon.games set fixed_cost_cents = ${amount * 100}, fixed_cost_start_round = ${start} where id = ${input.gameId}`;
	return { ok: true };
}
async function claimSeat(input) {
	if (!input.id || !input.token) return {
		ok: false,
		error: "This link is not valid."
	};
	const sql = await getMetalconSql();
	const player = (await sql`
    select p.id, p.name, p.dept, p.invite_token, p.terms_at, p.game_id, g.status, g.n
    from metalcon.players p
    join metalcon.games g on g.id = p.game_id
    where p.id = ${input.id}
    limit 1
  `)[0];
	if (!player || player.invite_token !== input.token) {
		await noteClosedAttempt(input.token, "Opened a seat link.");
		return {
			ok: false,
			error: "This link is not valid."
		};
	}
	if (player.status !== "live") {
		await noteClosedAttempt(input.token, "Opened a seat link after close.");
		return {
			ok: false,
			error: `Game ${player.n} has ended.`
		};
	}
	if (!player.terms_at) {
		if (!input.terms) return {
			ok: true,
			needsTerms: true,
			name: player.name,
			dept: player.dept,
			game: player.n
		};
		await sql`update metalcon.players set terms_at = now() where id = ${player.id}`;
	}
	return {
		ok: true,
		needsTerms: false,
		player: {
			id: player.id,
			secret: input.token,
			name: player.name,
			dept: player.dept
		}
	};
}
function cleanLine(raw, max = 80) {
	return raw.replace(/\s+/g, " ").trim().slice(0, max);
}
async function submitHostLead(input) {
	const company = cleanLine(input.company ?? "", 80);
	const name = cleanLine(input.name ?? "", 60);
	const phone = cleanLine(input.phone ?? "", 30);
	const email = cleanLine(input.email ?? "", 80).toLowerCase();
	if (!company || !name) return {
		ok: false,
		error: "Company and your name are required."
	};
	if (!phone && !email) return {
		ok: false,
		error: "Add a mobile number or an email so we can reach you."
	};
	if (!input.contact) return {
		ok: false,
		error: "Check the box so we can contact you about a game day."
	};
	const sql = await getMetalconSql();
	const id = randomBytes(8).toString("hex");
	const title = cleanLine(input.title ?? "", 60);
	const city = cleanLine(input.city ?? "", 60);
	const state = cleanLine(input.state ?? "", 30);
	const headcount = cleanLine(input.headcount ?? "", 40);
	const timing = cleanLine(input.timing ?? "", 80);
	const notes = cleanLine(input.notes ?? "", 400);
	await sql`
    insert into metalcon.host_leads
      (id, company, contact_name, title, phone, email, city, state, headcount, timing, notes)
    values
      (${id}, ${company}, ${name}, ${title}, ${phone}, ${email}, ${city}, ${state}, ${headcount}, ${timing}, ${notes})
  `;
	const body = [
		`Company: ${company}`,
		`Contact: ${name}${title ? `, ${title}` : ""}`,
		`Phone: ${phone || "not given"}`,
		`Email: ${email || "not given"}`,
		`Where: ${[city, state].filter(Boolean).join(", ") || "not given"}`,
		`People: ${headcount || "not given"}`,
		`When: ${timing || "not given"}`,
		notes ? `Notes: ${notes}` : ""
	].filter(Boolean).join("\n");
	await sendPlainEmail(ALERT_TO, `Game day interest: ${company}`, body).catch(() => void 0);
	const ghl = await pushHostLead({
		company,
		name,
		title,
		phone,
		email,
		city,
		state,
		headcount,
		timing,
		notes
	}).catch(() => null);
	if (ghl?.contactId) await sql`update metalcon.host_leads set ghl_contact_id = ${ghl.contactId} where id = ${id}`;
	return {
		ok: true,
		ghl: Boolean(ghl?.contactId)
	};
}
async function exportHostLeads(token) {
	const actor = actorOf(token);
	if (!actor || actor.role !== "super") return deny();
	const rows = await (await getMetalconSql())`
    select company, contact_name, title, phone, email, city, state, headcount, timing, notes, created_at
    from metalcon.host_leads
    order by created_at desc
  `;
	const lines = [[
		"company",
		"contact",
		"title",
		"phone",
		"email",
		"city",
		"state",
		"people",
		"when",
		"notes",
		"received"
	].join(",")];
	for (const row of rows) lines.push([
		row.company,
		row.contact_name,
		row.title,
		row.phone,
		row.email,
		row.city,
		row.state,
		row.headcount,
		row.timing,
		row.notes,
		row.created_at
	].map(csvCell).join(","));
	return {
		ok: true,
		filename: "soebld-game-day-leads.csv",
		csv: lines.join("\n")
	};
}
//#endregion
export { adminDesk, adminEnter, changeAdminPassword, claimSeat, createHost, endGame, exportGame, exportHostLeads, noteClosedAttempt, placePlayer, reopenGame, resetGame, resetPassword, seatFor, sendSeatLink, setBasePayroll, setFixedCost, setShareSeat, setSignup, startGame, submitHostLead, computeNumbers as t };
