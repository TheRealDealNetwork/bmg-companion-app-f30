import { createHash } from "node:crypto";
import { getSql } from "@/lib/db";
import { cleanUsername } from "./guard";

export type DeskRank = "super" | "host" | "player";

export type Access = {
  rank: DeskRank;
  hash: string;
  profileId: string;
  name: string;
};

type Touchable = {
  desk?: string;
  hostProfileId?: string;
  admins?: { hash: string; rank?: string }[];
};

function sha(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

function asRank(value: string | undefined): DeskRank {
  return value === "super" || value === "host" ? value : "player";
}

async function saveRank(hash: string, rank: Exclude<DeskRank, "player">): Promise<DeskRank> {
  const sql = await getSql();
  await sql`
    insert into staff (token_hash, rank) values (${hash}, ${rank})
    on conflict (token_hash) do update set rank = excluded.rank
  `;
  return rank;
}

async function keyRank(hash: string): Promise<DeskRank> {
  const sql = await getSql();
  const known = await sql<{ rank: string }>`select rank from staff where token_hash = ${hash} limit 1`;
  const saved = asRank(known[0]?.rank);
  if (saved !== "player") return saved;
  const rows = await sql<{ state: { desk?: string; admins?: { hash: string; rank?: string }[] } | string }>`
    select state from bm_games order by updated_at desc limit 80
  `;
  let hosted = false;
  for (const row of rows) {
    const state = typeof row.state === "string" ? JSON.parse(row.state) as Touchable : row.state;
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
    const supers = await sql<{ token_hash: string }>`select token_hash from staff where rank = 'super' limit 1`;
    if (!supers[0]) return saveRank(hash, "super");
  }
  return "player";
}

export async function accessFor(adminToken: string, profileSecret = ""): Promise<Access> {
  const token = adminToken.trim();
  const hash = token.length >= 16 ? sha(token) : "";
  const sql = await getSql();
  let profileId = "";
  let name = "";
  let profileRank: DeskRank = "player";
  if (profileSecret.length >= 16) {
    const rows = await sql<{ id: string; rank: string; first_name: string; last_name: string }>`
      select p.id, p.rank, p.first_name, p.last_name
      from profiles p
      join profile_sessions s on s.profile_id = p.id
      where s.token_hash = ${sha(profileSecret)}
      limit 1
    `;
    const row = rows[0];
    if (row) {
      profileId = row.id;
      name = `${row.first_name} ${row.last_name}`.trim();
      profileRank = asRank(row.rank);
    }
  }
  const fromKey = hash ? await keyRank(hash) : "player";
  const rank: DeskRank = profileRank === "super" || fromKey === "super" ? "super" : profileRank === "host" || fromKey === "host" ? "host" : "player";
  return { rank, hash, profileId, name };
}

export function canTouch(state: Touchable, access: Access): boolean {
  if (access.rank === "super") return true;
  if (access.rank !== "host") return false;
  if (access.hash && (state.desk === access.hash || (state.admins ?? []).some((admin) => admin.hash === access.hash))) return true;
  return Boolean(access.profileId && state.hostProfileId === access.profileId);
}

export async function setProfileRankRecord(input: { adminToken?: string; profileSecret?: string; username?: string; rank?: string }) {
  const access = await accessFor(String(input.adminToken ?? ""), String(input.profileSecret ?? ""));
  if (access.rank !== "super") return { ok: false as const, error: "Only a Super Admin can change staff." };
  const rank = asRank(String(input.rank ?? ""));
  if (rank === "player" && input.rank !== "player") return { ok: false as const, error: "Choose Host Admin, Super Admin, or Player." };
  const username = cleanUsername(String(input.username ?? ""));
  if (!username) return { ok: false as const, error: "Enter their username." };
  const sql = await getSql();
  const rows = await sql<{ id: string }>`select id from profiles where username = ${username} limit 1`;
  if (!rows[0]) return { ok: false as const, error: "No profile by that username." };
  await sql`update profiles set rank = ${rank}, updated_at = now() where id = ${rows[0].id}`;
  const label = rank === "super" ? "Super Admin" : rank === "host" ? "Host Admin" : "Player";
  return { ok: true as const, username, rank, label };
}
