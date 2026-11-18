import { a as normalizePhone } from "./format-DkJBbT9C.mjs";
import { t as getSql } from "./db-DHZvd9Xk.mjs";
import { a as computeBoard, h as hydrate } from "./engine-BCCNldHm.mjs";
import { a as usernameError, i as plainError, n as isProfane, r as personNameError, t as cleanUsername } from "./guard-CeXycLg8.mjs";
import { accessFor, canTouch } from "./staff.server-D2EDAknK.mjs";
import { a as sendCodeToEmail, n as confirmEmailCodeRecord, r as emailProofValid, t as clearEmailChallenge } from "./email-auth.server-1Nb6jpbK.mjs";
import { i as careerOf, r as buildInsights, t as analyzeGame } from "./economy-D2xlDfFl.mjs";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/people.server-P4BX2n4b.js
function hash(raw) {
	return createHash("sha256").update(raw).digest("hex");
}
function same(raw, digest) {
	if (!raw || !digest) return false;
	const a = Buffer.from(hash(raw));
	const b = Buffer.from(digest);
	if (a.length !== b.length) return false;
	return timingSafeEqual(a, b);
}
function uid() {
	return randomBytes(9).toString("hex");
}
function parseBg(value) {
	const raw = typeof value === "string" ? JSON.parse(value) : value;
	const trades = raw?.trades === "familiar" || raw?.trades === "working" ? raw.trades : "new";
	return {
		firstTime: Boolean(raw?.firstTime),
		trades,
		title: String(raw?.title ?? ""),
		company: String(raw?.company ?? ""),
		workCity: String(raw?.workCity ?? "")
	};
}
function emailOk(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function checkText(fields) {
	for (const field of fields) {
		const err = plainError(field.value, field.label);
		if (err) return err;
	}
	return null;
}
async function bySession(secret) {
	if (!secret || secret.length < 16) return null;
	return (await (await getSql())`
    select p.* from profiles p
    join profile_sessions s on s.profile_id = p.id
    where s.token_hash = ${hash(secret)}
    limit 1
  `)[0] ?? null;
}
async function issue(profileId) {
	const secret = randomBytes(18).toString("hex");
	await (await getSql())`insert into profile_sessions (token_hash, profile_id) values (${hash(secret)}, ${profileId})`;
	return secret;
}
async function resolveProfile(secret) {
	const row = await bySession(secret);
	if (!row) return null;
	return {
		id: row.id,
		first: row.first_name,
		last: row.last_name,
		username: row.username
	};
}
async function saveProfileRecord(input) {
	const first = String(input.first ?? "").trim().replace(/\s+/g, " ");
	const last = String(input.last ?? "").trim().replace(/\s+/g, " ");
	const nameErr = personNameError(first, last);
	if (nameErr) return {
		ok: false,
		error: nameErr
	};
	const city = String(input.city ?? "").trim().slice(0, 40);
	const state = String(input.state ?? "").trim().slice(0, 40);
	const email = String(input.email ?? "").trim().toLowerCase().slice(0, 80);
	const title = String(input.title ?? "").trim().slice(0, 60);
	const company = String(input.company ?? "").trim().slice(0, 60);
	const workCity = String(input.workCity ?? "").trim().slice(0, 60);
	const textErr = checkText([
		{
			label: "City",
			value: city
		},
		{
			label: "State",
			value: state
		},
		{
			label: "Title",
			value: title
		},
		{
			label: "Company",
			value: company
		},
		{
			label: "Work location",
			value: workCity
		}
	]);
	if (textErr) return {
		ok: false,
		error: textErr
	};
	if (email && !emailOk(email)) return {
		ok: false,
		error: "That email does not look right."
	};
	const phone = String(input.phone ?? "").trim();
	const parsedPhone = phone ? normalizePhone(phone) : "";
	if (phone && !parsedPhone) return {
		ok: false,
		error: "Enter a 10-digit phone, or leave it blank."
	};
	const trades = input.trades === "familiar" || input.trades === "working" ? input.trades : "new";
	if (trades === "working" && (!title || !company)) return {
		ok: false,
		error: "Add your title and company so we can see how working players do."
	};
	const background = {
		firstTime: Boolean(input.firstTime),
		trades,
		title,
		company,
		workCity
	};
	const avatar = String(input.avatar ?? "");
	if (avatar && !avatar.startsWith("data:image/jpeg;base64,")) return {
		ok: false,
		error: "Use a JPEG photo."
	};
	if (avatar.length > 18e4) return {
		ok: false,
		error: "That photo is too large. Try a smaller one."
	};
	const existing = input.secret ? await bySession(input.secret) : null;
	const sql = await getSql();
	if (existing) {
		await sql`
      update profiles set
        first_name = ${first},
        last_name = ${last},
        city = ${city},
        state = ${state},
        email = ${email},
        phone = ${parsedPhone ?? ""},
        avatar = ${avatar || existing.avatar},
        background = ${JSON.stringify(background)}::jsonb,
        updated_at = now()
      where id = ${existing.id}
    `;
		const pin = String(input.pin ?? "").trim();
		if (pin) {
			if (!/^\d{4,8}$/.test(pin)) return {
				ok: false,
				error: "PIN needs 4 to 8 digits."
			};
			await sql`update profiles set pin_hash = ${hash(`${existing.username}\n${pin}`)} where id = ${existing.id}`;
		}
		return {
			ok: true,
			id: existing.id,
			secret: input.secret || "",
			username: existing.username,
			first,
			last
		};
	}
	const username = cleanUsername(String(input.username ?? ""));
	const userErr = usernameError(username);
	if (userErr) return {
		ok: false,
		error: userErr
	};
	const pin = String(input.pin ?? "").trim();
	if (!/^\d{4,8}$/.test(pin)) return {
		ok: false,
		error: "Choose a PIN of 4 to 8 digits. It is how you open your profile on another phone."
	};
	if (!email) return {
		ok: false,
		error: "Enter your email so we can confirm it is yours."
	};
	if (!await emailProofValid(email, String(input.emailProof ?? ""))) return {
		ok: false,
		error: "Confirm the code from your email before saving."
	};
	if ((await sql`select id from profiles where username = ${username} limit 1`)[0]) return {
		ok: false,
		error: "That username is taken."
	};
	if ((await sql`select id from profiles where email = ${email} limit 1`)[0]) return {
		ok: false,
		error: "That email already has a profile. Sign in with your username."
	};
	const id = uid();
	await sql`
    insert into profiles (id, username, pin_hash, first_name, last_name, city, state, email, phone, avatar, background, email_verified)
    values (${id}, ${username}, ${hash(`${username}\n${pin}`)}, ${first}, ${last}, ${city}, ${state}, ${email}, ${parsedPhone ?? ""}, ${avatar}, ${JSON.stringify(background)}::jsonb, true)
  `;
	await clearEmailChallenge(email);
	return {
		ok: true,
		id,
		secret: await issue(id),
		username,
		first,
		last
	};
}
var OWNER_USERNAME = "therealdeal_johnnyneal";
var OWNER_PIN = "0240";
var OWNER_EMAIL = "johnny@thecnsoe.com";
async function ensureOwner() {
	const sql = await getSql();
	const pinHash = hash(`${OWNER_USERNAME}\n${OWNER_PIN}`);
	const row = (await sql`
    select id, email, rank from profiles where username = ${OWNER_USERNAME} or email = ${OWNER_EMAIL} limit 1
  `)[0];
	if (!row) {
		await sql`
      insert into profiles (id, username, pin_hash, first_name, last_name, city, state, email, phone, avatar, background, email_verified, rank)
      values (${uid()}, ${OWNER_USERNAME}, ${pinHash}, ${"Johnny"}, ${"Neal"}, ${""}, ${""}, ${OWNER_EMAIL}, ${""}, ${""}, ${"{}"}::jsonb, true, ${"super"})
    `;
		return;
	}
	if (row.rank === "super") return;
	await sql`
    update profiles set
      username = ${OWNER_USERNAME},
      email = ${OWNER_EMAIL},
      email_verified = true,
      first_name = ${"Johnny"},
      last_name = ${"Neal"},
      rank = ${"super"},
      pin_hash = ${pinHash},
      updated_at = now()
    where id = ${row.id}
  `;
}
async function signInProfileRecord(input) {
	const pin = String(input.pin ?? "").trim();
	try {
		await ensureOwner();
	} catch {}
	const row = await findLogin(String(input.username ?? ""));
	if (!row || !pin || !same(`${row.username}\n${pin}`, row.pin_hash)) return {
		ok: false,
		error: "Email, username, or PIN is wrong."
	};
	const secret = await issue(row.id);
	return {
		ok: true,
		id: row.id,
		secret,
		username: row.username,
		first: row.first_name,
		last: row.last_name
	};
}
async function findLogin(raw) {
	const text = raw.trim();
	if (!text) return null;
	const sql = await getSql();
	if (text.includes("@")) return (await sql`select * from profiles where email = ${text.toLowerCase().slice(0, 80)} limit 1`)[0] ?? null;
	const username = cleanUsername(text);
	if (!username) return null;
	return (await sql`select * from profiles where username = ${username} limit 1`)[0] ?? null;
}
async function requestPinResetRecord(login) {
	const row = await findLogin(login);
	if (!row) return {
		ok: false,
		error: "We couldn't find that email or username."
	};
	if (!row.email) return {
		ok: false,
		error: "That profile has no email, so a reset code can't be sent."
	};
	return sendCodeToEmail(row.email, "pin");
}
async function confirmPinResetRecord(login, code) {
	const row = await findLogin(login);
	if (!row?.email) return {
		ok: false,
		error: "Ask for a code first."
	};
	return confirmEmailCodeRecord(row.email, code);
}
async function resetPinRecord(input) {
	const row = await findLogin(String(input.login ?? ""));
	const pin = String(input.pin ?? "").trim();
	if (!row?.email) return {
		ok: false,
		error: "Ask for a code first."
	};
	if (!/^\d{4,8}$/.test(pin)) return {
		ok: false,
		error: "Choose a PIN of 4 to 8 digits."
	};
	if (!await emailProofValid(row.email, String(input.proof ?? ""))) return {
		ok: false,
		error: "Confirm the code from your email before choosing a new PIN."
	};
	await (await getSql())`update profiles set pin_hash = ${hash(`${row.username}\n${pin}`)}, updated_at = now() where id = ${row.id}`;
	await clearEmailChallenge(row.email);
	const secret = await issue(row.id);
	return {
		ok: true,
		id: row.id,
		secret,
		username: row.username,
		first: row.first_name,
		last: row.last_name
	};
}
function privateView(row) {
	return {
		id: row.id,
		username: row.username,
		first: row.first_name,
		last: row.last_name,
		city: row.city,
		state: row.state,
		email: row.email,
		phone: row.phone,
		avatar: row.avatar,
		rank: row.rank === "super" || row.rank === "host" ? row.rank : "player",
		background: parseBg(row.background)
	};
}
async function readProfileRecord(secret) {
	const row = await bySession(secret);
	if (!row) return {
		ok: false,
		error: "Sign in to see your profile."
	};
	const career = await careerFor(row.id);
	const friends = await friendList(row.id);
	return {
		ok: true,
		profile: privateView(row),
		career,
		friends
	};
}
async function friendList(id) {
	return (await (await getSql())`
    select f.from_id, f.to_id, f.status, p.username, p.first_name, p.last_name, p.email, p.phone, p.city
    from friendships f
    join profiles p on p.id = case when f.from_id = ${id} then f.to_id else f.from_id end
    where f.from_id = ${id} or f.to_id = ${id}
    order by f.created_at desc
  `).map((row) => {
		const accepted = row.status === "accepted";
		const incoming = row.to_id === id && row.status === "pending";
		return {
			username: row.username,
			name: `${row.first_name} ${row.last_name}`,
			city: accepted ? row.city : "",
			email: accepted ? row.email : "",
			phone: accepted ? row.phone : "",
			status: incoming ? "incoming" : row.from_id === id && row.status === "pending" ? "outgoing" : "accepted"
		};
	});
}
function parseState(value) {
	return typeof value === "string" ? JSON.parse(value) : value;
}
function sourceOf(code, state, updatedAt) {
	return {
		code,
		company: state.company || "The Company",
		rehearsal: Boolean(state.rehearsal),
		status: state.status,
		round: state.round,
		updatedAt,
		settings: state.settings,
		board: computeBoard(state),
		players: (state.players ?? []).map((p) => ({
			id: p.id,
			name: p.name,
			dept: p.dept,
			profileId: p.profileId,
			active: p.active
		})),
		answers: (state.answers ?? []).map((a) => ({
			playerId: a.playerId,
			playerName: a.playerName,
			dept: a.dept,
			valueCents: a.valueCents,
			principle: a.principle,
			title: a.title,
			round: a.round
		})),
		plays: (state.plays ?? []).map((p) => ({
			dept: p.dept,
			name: p.name,
			type: p.type,
			text: p.text,
			forced: p.forced,
			exempt: p.exempt,
			round: p.round,
			playerId: p.playerId
		})),
		calls: (state.decisions ?? []).map((d) => ({
			playerId: d.playerId,
			playerName: d.playerName,
			dept: d.dept,
			round: d.round,
			kind: d.kind,
			detail: d.detail
		})),
		projects: (state.projects ?? []).map((p) => ({
			n: p.n,
			status: p.status,
			valueCents: p.valueCents,
			collected: p.collected,
			lateFee: p.lateFee
		})),
		adjustments: (state.adjustments ?? []).map((a) => ({
			cents: a.cents,
			label: a.label
		}))
	};
}
async function gamesFor(profileId) {
	const rows = await (await getSql())`
    select code, state, updated_at from bm_games order by updated_at desc limit 200
  `;
	const history = [];
	for (const row of rows) {
		const state = hydrate(parseState(row.state));
		const mine = state.players.find((p) => p.profileId === profileId);
		if (!mine) continue;
		const report = analyzeGame(sourceOf(row.code, state, ""));
		const person = report.people.find((p) => p.id === mine.id);
		history.push({
			code: row.code,
			company: report.company,
			at: stamp(row.updated_at),
			role: mine.dept,
			win: report.finished && report.win,
			valuation: report.valuation,
			best: person?.best ?? 0,
			partial: person?.partial ?? 0,
			weak: person?.weak ?? 0,
			rehearsal: report.rehearsal
		});
	}
	return history;
}
function stamp(value) {
	const parsed = new Date(String(value ?? ""));
	return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString();
}
async function careerFor(profileId) {
	return careerOf(await gamesFor(profileId));
}
async function publicProfileRecord(usernameRaw) {
	const username = cleanUsername(usernameRaw);
	const row = (await (await getSql())`select * from profiles where username = ${username} limit 1`)[0];
	if (!row) return {
		ok: false,
		error: "No player by that username."
	};
	return {
		ok: true,
		card: {
			username: row.username,
			first: row.first_name,
			last: row.last_name,
			city: row.city,
			state: row.state,
			avatar: row.avatar,
			background: parseBg(row.background),
			career: await careerFor(row.id)
		}
	};
}
async function other(usernameRaw) {
	const username = cleanUsername(usernameRaw);
	if (!username) return null;
	return (await (await getSql())`select * from profiles where username = ${username} limit 1`)[0] ?? null;
}
async function searchPeopleRecord(secret, usernameRaw) {
	const me = await bySession(secret);
	if (!me) return {
		ok: false,
		error: "Sign in first."
	};
	const row = await other(usernameRaw);
	if (!row || row.id === me.id) return {
		ok: false,
		error: "No player by that username."
	};
	return {
		ok: true,
		username: row.username,
		name: `${row.first_name} ${row.last_name}`,
		city: row.city
	};
}
async function friendActRecord(secret, usernameRaw, action) {
	const me = await bySession(secret);
	if (!me) return {
		ok: false,
		error: "Sign in first."
	};
	const row = await other(usernameRaw);
	if (!row || row.id === me.id) return {
		ok: false,
		error: "No player by that username."
	};
	const sql = await getSql();
	const link = (await sql`
    select id, from_id, to_id, status from friendships
    where (from_id = ${me.id} and to_id = ${row.id}) or (from_id = ${row.id} and to_id = ${me.id})
    limit 1
  `)[0];
	if (action === "request") {
		if (link) return {
			ok: false,
			error: link.status === "accepted" ? "You are already connected." : "That request is already open."
		};
		await sql`insert into friendships (id, from_id, to_id, status) values (${uid()}, ${me.id}, ${row.id}, 'pending')`;
		return { ok: true };
	}
	if (!link) return {
		ok: false,
		error: "No request to update."
	};
	if (action === "accept") {
		if (link.to_id !== me.id) return {
			ok: false,
			error: "You can only accept a request sent to you."
		};
		await sql`update friendships set status = 'accepted' where id = ${link.id}`;
		return { ok: true };
	}
	if (action === "remove") {
		await sql`delete from friendships where id = ${link.id}`;
		return { ok: true };
	}
	return {
		ok: false,
		error: "Unknown action."
	};
}
async function acceptedPair(a, b) {
	const rows = await (await getSql())`
    select id from friendships
    where status = 'accepted' and ((from_id = ${a} and to_id = ${b}) or (from_id = ${b} and to_id = ${a}))
    limit 1
  `;
	return Boolean(rows[0]);
}
async function sendMessageRecord(secret, usernameRaw, bodyRaw) {
	const me = await bySession(secret);
	if (!me) return {
		ok: false,
		error: "Sign in first."
	};
	const row = await other(usernameRaw);
	if (!row) return {
		ok: false,
		error: "No player by that username."
	};
	if (!await acceptedPair(me.id, row.id)) return {
		ok: false,
		error: "Connect as friends before you message."
	};
	const body = bodyRaw.replace(/\s+/g, " ").trim().slice(0, 500);
	if (body.length < 1) return {
		ok: false,
		error: "Write a message first."
	};
	if (isProfane(body)) return {
		ok: false,
		error: "That message isn't allowed."
	};
	await (await getSql())`insert into messages (id, from_id, to_id, body) values (${uid()}, ${me.id}, ${row.id}, ${body})`;
	return { ok: true };
}
async function readThreadRecord(secret, usernameRaw) {
	const me = await bySession(secret);
	if (!me) return {
		ok: false,
		error: "Sign in first."
	};
	const row = await other(usernameRaw);
	if (!row) return {
		ok: false,
		error: "No player by that username."
	};
	if (!await acceptedPair(me.id, row.id)) return {
		ok: false,
		error: "Connect as friends before you message."
	};
	const rows = await (await getSql())`
    select from_id, body, created_at from messages
    where (from_id = ${me.id} and to_id = ${row.id}) or (from_id = ${row.id} and to_id = ${me.id})
    order by created_at asc
    limit 80
  `;
	return {
		ok: true,
		name: `${row.first_name} ${row.last_name}`,
		email: row.email,
		phone: row.phone,
		messages: rows.map((item) => ({
			mine: item.from_id === me.id,
			body: item.body,
			at: stamp(item.created_at)
		}))
	};
}
async function ownedReports(adminToken, filter) {
	const access = await accessFor(adminToken, String(filter.profileSecret ?? ""));
	const sql = await getSql();
	const rows = await sql`
    select code, state, updated_at from bm_games order by updated_at desc limit 200
  `;
	const reports = [];
	const ids = /* @__PURE__ */ new Set();
	const wantCode = String(filter.code ?? "").trim().toUpperCase();
	const person = String(filter.person ?? "").trim().toLowerCase();
	const dept = String(filter.dept ?? "").trim();
	for (const row of rows) {
		const state = hydrate(parseState(row.state));
		if (access.rank === "player" || !canTouch(state, access)) continue;
		if (!filter.includeRehearsal && state.rehearsal) continue;
		if (wantCode && row.code.toUpperCase() !== wantCode) continue;
		const report = analyzeGame(sourceOf(row.code, state, stamp(row.updated_at)));
		if (dept && !report.people.some((p) => p.dept === dept)) continue;
		if (person && !report.people.some((p) => p.name.toLowerCase().includes(person))) continue;
		if (dept) report.people = report.people.filter((p) => p.dept === dept);
		if (person) report.people = report.people.filter((p) => p.name.toLowerCase().includes(person));
		for (const p of report.people) if (p.profileId) ids.add(p.profileId);
		reports.push(report);
	}
	const meta = /* @__PURE__ */ new Map();
	if (ids.size) {
		const list = [...ids];
		const found = await sql.query("select * from profiles where id = any($1::text[])", [list]);
		for (const row of found) {
			const bg = parseBg(row.background);
			meta.set(row.id, {
				username: row.username,
				trades: bg.trades,
				firstTime: bg.firstTime,
				company: bg.company,
				title: bg.title,
				city: row.city,
				state: row.state
			});
		}
	}
	if (person) {
		for (const [id, info] of meta) if (!info.username.includes(person) && !reports.some((r) => r.people.some((p) => p.profileId === id))) continue;
	}
	return {
		reports,
		meta
	};
}
async function insightsRecord(adminToken, filter) {
	const { reports, meta } = await ownedReports(adminToken, filter);
	return {
		ok: true,
		insights: buildInsights({
			reports,
			meta
		})
	};
}
async function askInsightsRecord(adminToken, questionRaw, filter) {
	const question = questionRaw.replace(/\s+/g, " ").trim().slice(0, 500);
	if (question.length < 3) return {
		ok: false,
		error: "Ask a question first."
	};
	if (isProfane(question)) return {
		ok: false,
		error: "Rephrase that question."
	};
	const { reports, meta } = await ownedReports(adminToken, filter);
	const insights = buildInsights({
		reports,
		meta
	});
	const facts = {
		games: insights.games,
		finished: insights.finished,
		wins: insights.wins,
		losses: insights.losses,
		winRate: insights.winRate,
		avgValuation: insights.avgValuation,
		avgMargin: insights.avgMargin,
		bestAnswers: insights.bestAnswers,
		weakAnswers: insights.weakAnswers,
		byDept: insights.byDept,
		people: insights.people.slice(0, 40).map((p) => ({
			name: p.name,
			games: p.games,
			wins: p.wins,
			best: p.best,
			weak: p.weak,
			rate: p.rate,
			roles: p.roles,
			trades: p.trades,
			firstTime: p.firstTime,
			company: p.company,
			title: p.title,
			city: p.city,
			state: p.state
		})),
		whyBest: insights.whyBest,
		whyLow: insights.whyLow,
		characteristics: insights.characteristics,
		lessons: insights.lessons,
		recent: reports.slice(0, 12).map((g) => ({
			code: g.code,
			company: g.company,
			win: g.win,
			valuation: g.valuation,
			margin: g.margin,
			best: g.best,
			weak: g.weak,
			causes: g.causes,
			wins: g.wins
		}))
	};
	const local = [
		insights.whyBest[0],
		insights.whyLow[0],
		...insights.characteristics,
		...insights.lessons
	].filter(Boolean).join(" ");
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: true,
		answer: local || "No finished games match that filter yet.",
		source: "record"
	};
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				model: process.env.XAI_CHAT_MODEL || "grok-4",
				temperature: .2,
				messages: [{
					role: "system",
					content: "You write reports for The Business Machine, a trades-leadership game. Use only the JSON facts. Never invent players, scores, companies, or causes. If the facts do not say, say so. Plain sentences a host can read to a class. No profanity. Do not mention usernames."
				}, {
					role: "user",
					content: `${question}\n\nFACTS:\n${JSON.stringify(facts).slice(0, 14e3)}`
				}]
			})
		});
		if (!res.ok) return {
			ok: true,
			answer: local || "The record is above. A written report is not available right now.",
			source: "record"
		};
		const answer = (await res.json()).choices?.[0]?.message?.content?.trim();
		if (!answer) return {
			ok: true,
			answer: local,
			source: "record"
		};
		return {
			ok: true,
			answer,
			source: "ai"
		};
	} catch {
		return {
			ok: true,
			answer: local || "No finished games match that filter yet.",
			source: "record"
		};
	}
}
async function lookupForHostRecord(input) {
	const code = input.code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
	const row = (await (await getSql())`select host_token, state from bm_games where code = ${code} limit 1`)[0];
	if (!row) return {
		ok: false,
		error: "Game not found."
	};
	const state = parseState(row.state);
	const token = input.hostToken.trim();
	const hashes = [row.host_token, ...state.hostHashes ?? []];
	if (!token || !hashes.some((item) => same(token, item))) return {
		ok: false,
		error: "Host key required."
	};
	const found = await other(input.username);
	if (!found) return {
		ok: false,
		error: "No player by that username."
	};
	return {
		ok: true,
		profileId: found.id,
		first: found.first_name,
		last: found.last_name
	};
}
//#endregion
export { askInsightsRecord, confirmPinResetRecord, friendActRecord, insightsRecord, lookupForHostRecord, publicProfileRecord, readProfileRecord, readThreadRecord, requestPinResetRecord, resetPinRecord, resolveProfile, saveProfileRecord, searchPeopleRecord, sendMessageRecord, signInProfileRecord };
