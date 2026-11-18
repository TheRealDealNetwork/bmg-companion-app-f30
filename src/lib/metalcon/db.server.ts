import { randomBytes } from "node:crypto";
import type { Sql } from "@/lib/db";

const OID_INT8 = 20;
const OID_DATE = 1082;
const OID_INTERVAL = 1186;
const identity = (value: string) => value;

type Run = <T>(text: string, params: unknown[]) => Promise<T[]>;

function toSql(run: Run): Sql {
  const sql = (async <T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]> => {
    let text = strings[0] ?? "";
    for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1] ?? ""}`;
    return run<T>(text, values);
  }) as Sql;
  sql.query = <T = Record<string, unknown>>(text: string, params: unknown[] = []) => run<T>(text, params);
  return sql;
}

const globalRef = globalThis as typeof globalThis & {
  __metalconSqlV7__?: Promise<Sql>;
};

const SCHEMA = `
create schema if not exists metalcon;
create table if not exists metalcon.event (
  id text primary key,
  label text not null,
  created_at timestamptz not null default now()
);
insert into metalcon.event (id, label)
values ('metalcon-2026', 'SOE Business Learning Day')
on conflict (id) do update set label = excluded.label;
create table if not exists metalcon.games (
  id text primary key,
  n integer not null,
  status text not null default 'live',
  share_seat boolean not null default true,
  created_at timestamptz not null default now(),
  ended_at timestamptz
);
alter table metalcon.games add column if not exists registration_open boolean not null default true;
alter table metalcon.games add column if not exists slug text;
alter table metalcon.games add column if not exists event_name text;
alter table metalcon.games add column if not exists host_id text;
create unique index if not exists metalcon_games_slug on metalcon.games (slug);
create table if not exists metalcon.hosts (
  id text primary key,
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null,
  created_at timestamptz not null default now()
);
create table if not exists metalcon.revoked (
  id text primary key,
  game_id text not null,
  secret_hash text not null,
  player_name text not null,
  dept text not null,
  created_at timestamptz not null default now()
);
create table if not exists metalcon.alerts (
  id text primary key,
  game_id text,
  kind text not null,
  detail text not null,
  created_at timestamptz not null default now()
);
create table if not exists metalcon.archives (
  id text primary key,
  game_id text not null,
  n integer not null,
  csv text not null,
  created_at timestamptz not null default now()
);
create table if not exists metalcon.lookups (
  id text primary key,
  game_id text not null,
  player_id text not null,
  created_at timestamptz not null default now()
);
create table if not exists metalcon.players (
  id text primary key,
  event_id text not null default 'metalcon-2026',
  game_id text,
  secret_hash text not null,
  invite_token text,
  name text not null,
  phone text not null,
  email text not null,
  dept text not null,
  terms_at timestamptz,
  created_at timestamptz not null default now()
);
alter table metalcon.players add column if not exists game_id text;
alter table metalcon.players add column if not exists invite_token text;
alter table metalcon.players alter column terms_at drop not null;
alter table metalcon.players add column if not exists first_name text not null default '';
alter table metalcon.players add column if not exists last_name text not null default '';
alter table metalcon.players add column if not exists company text not null default '';
alter table metalcon.players add column if not exists job_title text not null default '';
create table if not exists metalcon.answers (
  id text primary key,
  event_id text not null default 'metalcon-2026',
  game_id text,
  player_id text not null,
  round_n integer not null,
  dept text not null,
  player_name text not null,
  card_code text not null,
  card_title text not null,
  choice text not null,
  choice_text text not null,
  payroll_cents integer not null,
  created_at timestamptz not null default now()
);
alter table metalcon.answers add column if not exists game_id text;
create table if not exists metalcon.host_leads (
  id text primary key,
  company text not null,
  contact_name text not null,
  title text not null default '',
  phone text not null default '',
  email text not null default '',
  city text not null default '',
  state text not null default '',
  headcount text not null default '',
  timing text not null default '',
  notes text not null default '',
  ghl_contact_id text,
  created_at timestamptz not null default now()
);
alter table metalcon.games add column if not exists company_name text not null default '';
alter table metalcon.games add column if not exists fixed_cost_cents integer not null default 200000;
alter table metalcon.games add column if not exists fixed_cost_start_round integer not null default 3;
alter table metalcon.games add column if not exists gm_meeting boolean not null default false;
alter table metalcon.games add column if not exists current_round integer not null default 1;
alter table metalcon.games add column if not exists draw_adjust jsonb not null default '{}'::jsonb;
create table if not exists metalcon.attendees (
  id text primary key,
  game_id text not null,
  round_n integer not null,
  dept text not null,
  player_id text not null,
  swapped boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists metalcon.draws (
  id text primary key,
  game_id text not null,
  round_n integer not null,
  dept text not null,
  player_id text not null,
  cards jsonb not null,
  played jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create table if not exists metalcon.focus (
  id text primary key,
  game_id text not null,
  round_n integer not null,
  dept text not null,
  project_id text not null,
  created_at timestamptz not null default now()
);
create table if not exists metalcon.insights (
  game_id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);
alter table metalcon.players add column if not exists name_suggestion text not null default '';
alter table metalcon.players add column if not exists name_vote text not null default '';
alter table metalcon.answers add column if not exists during_meeting boolean not null default false;
create table if not exists metalcon.projects (
  id text primary key,
  game_id text not null,
  n integer not null,
  title text not null,
  house text not null,
  customer text not null,
  value_cents integer not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  finish_order integer
);
alter table metalcon.projects add column if not exists completed_at timestamptz;
alter table metalcon.projects add column if not exists finish_order integer;
alter table metalcon.projects add column if not exists revealed boolean not null default false;
alter table metalcon.projects add column if not exists extra_slot text;
alter table metalcon.projects add column if not exists plus_ones jsonb not null default '{}';
alter table metalcon.games add column if not exists base_payroll_cents integer not null default 0;
alter table metalcon.games add column if not exists last_margin_bps integer;
create table if not exists metalcon.plays (
  id text primary key,
  game_id text not null,
  project_id text not null,
  round_n integer not null,
  player_id text,
  dept text not null,
  player_name text not null,
  card_name text not null,
  card_text text not null,
  amount_cents integer not null,
  created_at timestamptz not null default now()
);
alter table metalcon.plays add column if not exists other_project_id text;
alter table metalcon.plays add column if not exists status text not null default 'confirmed';
alter table metalcon.games add column if not exists action_mode text not null default 'digital';
alter table metalcon.games add column if not exists turn_dept text not null default '';
alter table metalcon.players add column if not exists meeting_ack_round integer not null default 0;
alter table metalcon.draws add column if not exists placed jsonb not null default '[]'::jsonb;
alter table metalcon.draws add column if not exists negation jsonb not null default '{}'::jsonb;
alter table metalcon.draws add column if not exists tokens_done boolean not null default false;
alter table metalcon.answers add column if not exists purpose text not null default 'table';
create table if not exists metalcon.ledger (
  id text primary key,
  game_id text not null,
  player_id text,
  dept text not null,
  player_name text not null,
  card_code text not null default '',
  round_n integer not null default 0,
  project_n integer,
  amount_cents integer not null,
  kind text not null,
  detail text not null,
  during_meeting boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists metalcon.player_alerts (
  id text primary key,
  game_id text not null,
  player_id text,
  kind text not null,
  detail text not null,
  amount_cents integer not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists metalcon.admin_settings (
  key text primary key,
  value text not null
);
`;

let f15Seeded = false;
async function seedAdminHash(query: (text: string, params?: unknown[]) => Promise<unknown[]>) {
  const existing = await query("select value from metalcon.admin_settings where key = 'super_admin_hash' limit 1");
  if (existing[0]) return;
  await query("insert into metalcon.admin_settings (key, value) values ('super_admin_hash', $1) on conflict (key) do nothing", ["f55c0fd9ee720305e4a522615d26578e:6864523097dace918f5e41f65c99a853d69229b950cc586fc46e936ad2fd9d32"]);
}
async function applySchema(exec: (text: string) => Promise<void>) {
  for (const statement of SCHEMA.split(";").map((part) => part.trim()).filter(Boolean)) {
    await exec(statement);
  }
}

async function backfill(query: (text: string, params?: unknown[]) => Promise<Record<string, unknown>[]>) {
  const games = await query("select id from metalcon.games order by n desc limit 1");
  const orphan = await query("select count(*)::int as n from metalcon.players where game_id is null");
  const count = Number(orphan[0]?.n ?? 0);
  if (!count) return;
  let gameId = games[0]?.id ? String(games[0].id) : "";
  if (!gameId) {
    gameId = randomBytes(8).toString("hex");
    await query("insert into metalcon.games (id, n, status, share_seat) values ($1, 1, 'live', true)", [gameId]);
  }
  await query("update metalcon.players set game_id = $1 where game_id is null", [gameId]);
  await query("update metalcon.answers set game_id = $1 where game_id is null", [gameId]);
}

async function seedPreviewCheck(pg: { query: <T>(text: string, params?: unknown[]) => Promise<{ rows: T[] }> }) {
  const existing = await pg.query<{ n: number }>("select count(*)::int as n from metalcon.games");
  if (Number(existing.rows[0]?.n ?? 0) > 0) return;
  const { createHash, randomBytes } = await import("node:crypto");
  const { writeFileSync } = await import("node:fs");
  const hash = (value: string) => createHash("sha256").update(value).digest("hex");
  const gameId = randomBytes(8).toString("hex");
  const slug = "2026-11-13-soebld-projects-check";
  await pg.query(
    "insert into metalcon.games (id, n, status, share_seat, registration_open, slug, event_name, current_round) values ($1, 1, 'live', true, true, $2, 'Projects check preview', 1)",
    [gameId, slug],
  );
  const seats = [
    ["General Manager", "Check GM"],
    ["Marketing", "Check Marketing"],
    ["Appointment Center", "Check Appointment"],
    ["Sales", "Check Sales"],
    ["Production", "Check Production"],
    ["Accounting", "Check Accounting"],
  ];
  const links = [];
  for (const [dept, name] of seats) {
    const id = randomBytes(8).toString("hex");
    const token = randomBytes(16).toString("hex");
    await pg.query(
      "insert into metalcon.players (id, event_id, game_id, secret_hash, invite_token, name, phone, email, dept, terms_at) values ($1, 'metalcon-2026', $2, $3, $4, $5, '', '', $6, now())",
      [id, gameId, hash(token), token, name, dept],
    );
    links.push({ dept, id, token });
  }
  writeFileSync("/tmp/preview-check-links.json", JSON.stringify({ gameId, slug, links }, null, 2));
}


async function seedF15(pg: { query: <T>(text: string, params?: unknown[]) => Promise<{ rows: T[] }> }) {
  console.log("SEED F15 START");
  const slug = "2026-11-14-soebld-f16-check";
  const existing = await pg.query<{ id: string }>("select id from metalcon.games where slug = $1 limit 1", [slug]);
  if (existing.rows.length) { console.log("SEED F15 EXISTS"); return; }
  const { randomBytes } = await import("node:crypto");
  const { writeFileSync } = await import("node:fs");
  const gameId = randomBytes(8).toString("hex");
  const max = await pg.query<{ n: number }>("select coalesce(max(n), 0)::int as n from metalcon.games");
  const n = Number(max.rows[0]?.n ?? 0) + 1;
  await pg.query(
    "insert into metalcon.games (id, n, status, share_seat, registration_open, slug, event_name, action_mode, current_round, turn_dept) values ($1, $2, 'live', true, true, $3, 'f15 check', 'digital', 1, 'Marketing')",
    [gameId, n, slug],
  );
  const seats = [
    ["General Manager", "Test GM"],
    ["Marketing", "Test Marketing"],
    ["Appointment Center", "Test Appointment"],
    ["Sales", "Test Sales"],
    ["Production", "Test Production"],
    ["Accounting", "Test Accounting"],
  ];
  const links = [];
  for (const [dept, name] of seats) {
    const id = randomBytes(8).toString("hex");
    const token = randomBytes(16).toString("hex");
    const { createHash } = await import("node:crypto");
    const secretHash = createHash("sha256").update(token).digest("hex");
    await pg.query(
      "insert into metalcon.players (id, event_id, game_id, secret_hash, invite_token, name, phone, email, dept, terms_at) values ($1, 'metalcon-2026', $2, $3, $4, $5, '', '', $6, now())",
      [id, gameId, secretHash, token, name, dept],
    );
    links.push({ dept, id, token });
  }
  writeFileSync("/tmp/f16-links.json", JSON.stringify({ gameId, slug, links }, null, 2));
}

async function openPglite(): Promise<Sql> {
  const { PGlite } = await import("@electric-sql/pglite");
  const { mkdirSync } = await import("node:fs");
  const parsers = { [OID_INT8]: Number, [OID_DATE]: identity, [OID_INTERVAL]: identity };
  const dir = "/workspace/.data/metalcon-preview-check";
  mkdirSync(dir, { recursive: true });
  const pg = new PGlite(dir, { parsers });
  await pg.waitReady;
  await applySchema((text) => pg.exec(text).then(() => undefined));
  await seedAdminHash(async (text, params = []) => { const res = await pg.query(text, params); return res.rows; });
  await backfill(async (text, params = []) => {
    const result = await pg.query<Record<string, unknown>>(text, params);
    return result.rows;
  });
  await seedPreviewCheck(pg);
  await seedF15(pg);
  if (!f15Seeded) {
    f15Seeded = true;
    await seedF15(pg);
  }
  return toSql(async <T>(text: string, params: unknown[]) => {
    const result = await pg.query<T>(text, params);
    return result.rows;
  });
}

async function openNeon(gameUrl: string): Promise<Sql> {
  const { Pool, types } = await import("pg");
  types.setTypeParser(OID_INT8, Number);
  types.setTypeParser(OID_DATE, identity);
  types.setTypeParser(OID_INTERVAL, identity);
  const pool = new Pool({
    connectionString: gameUrl,
    connectionTimeoutMillis: 8000,
    max: 2,
  });
  pool.on("error", (e) => console.error("metalcon pool error", e.message));
  await applySchema(async (text) => {
    await pool.query(text);
  });
  await seedAdminHash(async (text, params = []) => (await pool.query(text, params)).rows);
  await backfill(async (text, params = []) => {
    const result = await pool.query(text, params);
    return result.rows as Record<string, unknown>[];
  });
  return toSql(async <T>(text: string, params: unknown[]) => {
    const result = await pool.query(text, params);
    return result.rows as T[];
  });
}

async function openExisting(connectionString: string): Promise<Sql> {
  const { Pool, types } = await import("pg");
  types.setTypeParser(OID_INT8, Number);
  types.setTypeParser(OID_DATE, identity);
  types.setTypeParser(OID_INTERVAL, identity);
  const pool = new Pool({ connectionString });
  pool.on("error", (e) => console.error("metalcon pool error", e.message));
  await applySchema(async (text) => {
    await pool.query(text);
  });
  await seedAdminHash(async (text, params = []) => (await pool.query(text, params)).rows);
  await backfill(async (text, params = []) => {
    const result = await pool.query(text, params);
    return result.rows as Record<string, unknown>[];
  });
  return toSql(async <T>(text: string, params: unknown[]) => {
    const result = await pool.query(text, params);
    return result.rows as T[];
  });
}

/** METALCON 2026 tables only, in the metalcon schema. Game tables are never read or written. */
export function getMetalconSql(): Promise<Sql> {
  globalRef.__metalconSqlV7__ ??= (async () => {
    const dedicated = process.env.METALCON_DATABASE_URL?.trim();
    if (dedicated) return openExisting(dedicated);
    const gameUrl = process.env.DATABASE_URL?.trim();
    if (!gameUrl) return openPglite();
    return openNeon(gameUrl);
  })().catch((err) => {
    globalRef.__metalconSqlV7__ = undefined;
    throw err;
  });
  return globalRef.__metalconSqlV7__;
}
