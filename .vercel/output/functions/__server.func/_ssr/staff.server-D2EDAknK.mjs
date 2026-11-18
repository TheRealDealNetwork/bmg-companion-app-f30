import { t as getSql } from "./db-DHZvd9Xk.mjs";
import { t as cleanUsername } from "./guard-CeXycLg8.mjs";
import { createHash } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/staff.server-D2EDAknK.js
function sha(raw) {
	return createHash("sha256").update(raw).digest("hex");
}
function asRank(value) {
	return value === "super" || value === "host" ? value : "player";
}
async function saveRank(hash, rank) {
	await (await getSql())`
    insert into staff (token_hash, rank) values (${hash}, ${rank})
    on conflict (token_hash) do update set rank = excluded.rank
  `;
	return rank;
}
async function keyRank(hash) {
	const sql = await getSql();
	const saved = asRank((await sql`select rank from staff where token_hash = ${hash} limit 1`)[0]?.rank);
	if (saved !== "player") return saved;
	const rows = await sql`
    select state from bm_games order by updated_at desc limit 80
  `;
	let hosted = false;
	for (const row of rows) {
		const state = typeof row.state === "string" ? JSON.parse(row.state) : row.state;
		const admins = state.admins ?? [];
		if (admins.some((admin) => admin.hash === hash && admin.rank === "super")) return saveRank(hash, "super");
		if (admins.some((admin) => admin.hash === hash && admin.rank === "host")) {
			hosted = true;
			continue;
		}
		if (state.desk === hash) return saveRank(hash, "super");
		if (admins.some((admin) => admin.hash === hash)) hosted = true;
	}
	if (hosted) return saveRank(hash, "host");
	if (rows.length === 0) {
		if (!(await sql`select token_hash from staff where rank = 'super' limit 1`)[0]) return saveRank(hash, "super");
	}
	return "player";
}
async function accessFor(adminToken, profileSecret = "") {
	const token = adminToken.trim();
	const hash = token.length >= 16 ? sha(token) : "";
	const sql = await getSql();
	let profileId = "";
	let name = "";
	let profileRank = "player";
	if (profileSecret.length >= 16) {
		const row = (await sql`
      select p.id, p.rank, p.first_name, p.last_name
      from profiles p
      join profile_sessions s on s.profile_id = p.id
      where s.token_hash = ${sha(profileSecret)}
      limit 1
    `)[0];
		if (row) {
			profileId = row.id;
			name = `${row.first_name} ${row.last_name}`.trim();
			profileRank = asRank(row.rank);
		}
	}
	const fromKey = hash ? await keyRank(hash) : "player";
	return {
		rank: profileRank === "super" || fromKey === "super" ? "super" : profileRank === "host" || fromKey === "host" ? "host" : "player",
		hash,
		profileId,
		name
	};
}
function canTouch(state, access) {
	if (access.rank === "super") return true;
	if (access.rank !== "host") return false;
	if (access.hash && (state.desk === access.hash || (state.admins ?? []).some((admin) => admin.hash === access.hash))) return true;
	return Boolean(access.profileId && state.hostProfileId === access.profileId);
}
async function setProfileRankRecord(input) {
	if ((await accessFor(String(input.adminToken ?? ""), String(input.profileSecret ?? ""))).rank !== "super") return {
		ok: false,
		error: "Only a Super Admin can change staff."
	};
	const rank = asRank(String(input.rank ?? ""));
	if (rank === "player" && input.rank !== "player") return {
		ok: false,
		error: "Choose Host Admin, Super Admin, or Player."
	};
	const username = cleanUsername(String(input.username ?? ""));
	if (!username) return {
		ok: false,
		error: "Enter their username."
	};
	const sql = await getSql();
	const rows = await sql`select id from profiles where username = ${username} limit 1`;
	if (!rows[0]) return {
		ok: false,
		error: "No profile by that username."
	};
	await sql`update profiles set rank = ${rank}, updated_at = now() where id = ${rows[0].id}`;
	return {
		ok: true,
		username,
		rank,
		label: rank === "super" ? "Super Admin" : rank === "host" ? "Host Admin" : "Player"
	};
}
//#endregion
export { accessFor, canTouch, setProfileRankRecord };
