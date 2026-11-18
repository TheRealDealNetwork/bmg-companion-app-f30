import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { normalizePhone } from "@/lib/game/format";
import type { DeptId } from "@/lib/game/types";
import { sendPlainEmail } from "@/lib/game/email-auth.server";
import { METALCON_SEATS } from "./seats";
import { getMetalconSql } from "./db.server";
import { pushHostLead } from "./ghl";
import { computeNumbers } from "./numbers";

const EVENT_ID = "metalcon-2026";
async function adminHash(): Promise<string> {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  const sql = await getMetalconSql();
  const rows = await sql<{ value: string }>`select value from metalcon.admin_settings where key = 'super_admin_hash' limit 1`;
  return rows[0]?.value ?? "";
}
const SEED_HASH = "$2b$10$placeholder";
const ALERT_TO = "johnny@thecnsoe.com";
const SEATS = new Set<string>(METALCON_SEATS);

type Actor = { id: string; role: "super" | "host"; name: string };
type GameRow = {
  id: string;
  n: number;
  status: string;
  share_seat: boolean;
  registration_open: boolean;
  slug: string | null;
  event_name: string | null;
  host_id: string | null;
};

function hash(secret: string) {
  return createHash("sha256").update(secret).digest("hex");
}

async function passwordOk(given: string): Promise<boolean> {
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

function sign(actor: { id: string; role: string }) {
  const exp = String(Date.now() + 12 * 60 * 60 * 1000);
  const body = `v2.${actor.id}.${actor.role}.${exp}`;
  const sig = createHmac("sha256", "metalcon-host-gate").update(body).digest("hex");
  return `${body}.${sig}`;
}

function actorOf(token: string): Actor | null {
  const [ver, id, role, exp, sig] = token.split(".");
  if (ver !== "v2" || !id || (role !== "super" && role !== "host") || !exp || !sig) return null;
  if (Number(exp) < Date.now()) return null;
  const expected = createHmac("sha256", "metalcon-host-gate").update(`${ver}.${id}.${role}.${exp}`).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return { id, role, name: "" };
}

function deny() {
  return { ok: false as const, error: "Enter the host password again." };
}

function cleanName(raw: string) {
  return raw.replace(/\s+/g, " ").trim().slice(0, 60);
}

function seatOf(value: string): DeptId | null {
  return SEATS.has(value) ? (value as DeptId) : null;
}

function originOf(raw: string) {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return url.origin;
  } catch {
    return "";
  }
}

function datedSlug(n: number) {
  const date = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  return `${date}-soebld-g${n}`;
}

async function ping(gameId: string | null, kind: string, detail: string) {
  const sql = await getMetalconSql();
  await sql`
    insert into metalcon.alerts (id, game_id, kind, detail)
    values (${randomBytes(8).toString("hex")}, ${gameId}, ${kind}, ${detail})
  `;
  if (kind === "attempt") {
    const recent = await sql<{ n: number }>`
      select count(*)::int as n from metalcon.alerts
      where kind = 'attempt' and game_id = ${gameId} and created_at > now() - interval '10 minutes'
    `;
    if (Number(recent[0]?.n ?? 0) > 1) return;
  }
  const games = gameId
    ? await sql<{ slug: string | null; event_name: string | null }>`
        select slug, event_name from metalcon.games where id = ${gameId} limit 1
      `
    : [];
  const slug = games[0]?.slug ?? "no-slug";
  const title = games[0]?.event_name ?? "SOEBLD";
  await sendPlainEmail(ALERT_TO, `SOE beta ${kind}: ${title}`, `${detail}\n\nSlug: ${slug}\n`).catch(() => undefined);
}

export async function noteClosedAttempt(secret: string, detail: string) {
  if (!secret) return;
  const sql = await getMetalconSql();
  const rows = await sql<{ game_id: string; player_name: string; dept: string }>`
    select game_id, player_name, dept from metalcon.revoked where secret_hash = ${hash(secret)} limit 1
  `;
  const row = rows[0];
  if (!row) return;
  await ping(row.game_id, "attempt", `${row.player_name} (${row.dept}) used a closed seat. ${detail}`);
}

async function ensureSuper() {
  const sql = await getMetalconSql();
  const rows = await sql<{ id: string; name: string; email: string; role: string }>`
    select id, name, email, role from metalcon.hosts where role = 'super' limit 1
  `;
  if (rows[0]) return rows[0];
  const id = randomBytes(8).toString("hex");
  await sql`
    insert into metalcon.hosts (id, name, email, password_hash, role)
    values (${id}, 'Johnny Neal', ${ALERT_TO}, ${hash(randomBytes(32).toString("hex"))}, 'super')
  `;
  return { id, name: "Johnny Neal", email: ALERT_TO, role: "super" };
}

async function allow(token: string, gameId: string) {
  const actor = actorOf(token);
  if (!actor) return null;
  const sql = await getMetalconSql();
  const rows = await sql<GameRow>`
    select id, n, status, share_seat, registration_open, slug, event_name, host_id
    from metalcon.games where id = ${gameId} limit 1
  `;
  const game = rows[0];
  if (!game) return null;
  if (actor.role !== "super" && game.host_id !== actor.id) return null;
  return { actor, game };
}

export async function seatFor(dept: string, slug: string): Promise<{ ok: true; gameId: string } | { ok: false; error: string }> {
  const sql = await getMetalconSql();
  const rows = await sql<GameRow>`
    select id, n, status, share_seat, registration_open, slug, event_name, host_id
    from metalcon.games where slug = ${slug} limit 1
  `;
  const game = rows[0];
  if (!game) return { ok: false, error: "That game link is not valid." };
  if (game.status !== "live") {
    await ping(game.id, "attempt", `Someone tried to take a ${dept} seat on a closed game.`);
    return { ok: false, error: "This game is closed." };
  }
  if (game.registration_open === false) return { ok: false, error: "Sign-up for this game is closed." };
  if (!game.share_seat) {
    const taken = await sql<{ id: string }>`
      select id from metalcon.players where game_id = ${game.id} and dept = ${dept} limit 1
    `;
    if (taken[0]) return { ok: false, error: `${dept} already has a player. Turn on shared seats to add another.` };
  }
  return { ok: true, gameId: game.id };
}

export async function adminEnter(password: string, email: string) {
  if (!await adminHash() && !email.trim()) return { ok: false as const, error: "Admin password is not configured." };
  const sql = await getMetalconSql();
  const clean = email.trim().toLowerCase();
  if (clean) {
    const rows = await sql<{ id: string; name: string; email: string; password_hash: string; role: string }>`
      select id, name, email, password_hash, role from metalcon.hosts where email = ${clean} limit 1
    `;
    const host = rows[0];
    if (!host || hash(password) !== host.password_hash) return { ok: false as const, error: "That email or password is not right." };
    return { ok: true as const, token: sign(host), role: host.role, name: host.name };
  }
  if (!await passwordOk(password)) return { ok: false as const, error: "That password is not right." };
  const superRow = await ensureSuper();
  return { ok: true as const, token: sign(superRow), role: "super" as const, name: superRow.name };
}

export async function resetPassword(email: string) {
  const clean = email.trim().toLowerCase();
  if (!clean) return { ok: false as const, error: "Enter your email." };
  const sql = await getMetalconSql();
  const rows = await sql<{ id: string }>`select id from metalcon.hosts where email = ${clean} limit 1`;
  if (!rows[0]) return { ok: false as const, error: "No host with that email." };
  const temp = randomBytes(4).toString("hex");
  await sql`update metalcon.hosts set password_hash = ${hash(temp)} where id = ${rows[0].id}`;
  await sendPlainEmail(clean, "SOE admin password reset", `Your temporary password is: ${temp}\n\nSign in and change it.`).catch(() => undefined);
  return { ok: true as const };
}

export async function changeAdminPassword(token: string, current: string, next: string) {
  const actor = actorOf(token);
  if (!actor || actor.role !== "super") return { ok: false as const, error: "Only the super admin can change this." };
  if (!await passwordOk(current)) return { ok: false as const, error: "Current password is not right." };
  if (next.length < 12) return { ok: false as const, error: "New password must be at least 12 characters." };
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(next, salt, 32).toString("hex");
  const sql = await getMetalconSql();
  await sql`insert into metalcon.admin_settings (key, value) values ('super_admin_hash', ${salt + ":" + hash}) on conflict (key) do update set value = excluded.value`;
  return { ok: true as const };
}

export async function createHost(input: { token: string; name: string; email: string; password: string }) {
  const actor = actorOf(input.token);
  if (!actor || actor.role !== "super") return { ok: false as const, error: "Only the super admin can add a host." };
  const name = cleanName(input.name);
  const email = input.email.trim().toLowerCase();
  if (name.length < 2) return { ok: false as const, error: "Enter the host's name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false as const, error: "Enter the host's email." };
  if (input.password.length < 6) return { ok: false as const, error: "Use a host password of at least 6 characters." };
  const sql = await getMetalconSql();
  const id = randomBytes(8).toString("hex");
  try {
    await sql`
      insert into metalcon.hosts (id, name, email, password_hash, role)
      values (${id}, ${name}, ${email}, ${hash(input.password)}, 'host')
    `;
  } catch {
    return { ok: false as const, error: "That email is already a host." };
  }
  await ping(null, "host", `${name} (${email}) was added as a host.`);
  return { ok: true as const };
}

export async function adminDesk(token: string) {
  const actor = actorOf(token);
  if (!actor) return deny();
  const sql = await getMetalconSql();
  const who = await sql<{ name: string }>`select name from metalcon.hosts where id = ${actor.id} limit 1`;
  const games = await sql<GameRow & { players: number; answers: number; host_name: string | null }>`
    select g.id, g.n, g.status, g.share_seat, g.registration_open, g.slug, g.event_name, g.host_id,
      h.name as host_name,
      (select count(*)::int from metalcon.players p where p.game_id = g.id) as players,
      (select count(*)::int from metalcon.answers a where a.game_id = g.id) as answers
    from metalcon.games g
    left join metalcon.hosts h on h.id = g.host_id
    order by g.n desc
  `;
  const visible = games.filter((game) => actor.role === "super" || game.host_id === actor.id);
  for (const game of visible) {
    if (game.slug) continue;
    const slug = datedSlug(game.n);
    game.slug = slug;
    game.event_name = game.event_name || "The Business Machine Experience";
    await sql`update metalcon.games set slug = ${slug}, event_name = ${game.event_name} where id = ${game.id} and slug is null`;
  }
  const liveIds = new Set(visible.filter((game) => game.status === "live").map((game) => game.id));
  const seated = liveIds.size
    ? await sql<{ id: string; name: string; phone: string; email: string; dept: string; invite_token: string | null; game_id: string; company: string; job_title: string }>`
        select id, name, phone, email, dept, invite_token, game_id, company, job_title
        from metalcon.players
        where game_id in (select id from metalcon.games where status = 'live')
        order by dept, created_at
      `
    : [];
  const players = seated.filter((player) => liveIds.has(player.game_id));
  const hosts =
    actor.role === "super"
      ? await sql<{ id: string; name: string; email: string; role: string }>`
          select id, name, email, role from metalcon.hosts order by role desc, name
        `
      : [];
  const max = await sql<{ n: number }>`select coalesce(max(n), 0)::int as n from metalcon.games`;
  const leads =
    actor.role === "super"
      ? await sql<{
          id: string;
          company: string;
          contact_name: string;
          title: string;
          phone: string;
          email: string;
          city: string;
          state: string;
          headcount: string;
          timing: string;
          notes: string;
          created_at: string;
        }>`
          select id, company, contact_name, title, phone, email, city, state, headcount, timing, notes, created_at
          from metalcon.host_leads
          order by created_at desc
          limit 200
        `
      : [];
  return {
    ok: true as const,
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
      answers: Number(game.answers),
    })),
    players,
  };
}

export async function startGame(token: string, eventName: string, actionMode = "digital") {
  const actor = actorOf(token);
  if (!actor) return deny();
  const label = cleanName(eventName) || "The Business Machine Experience";
  const sql = await getMetalconSql();
  const max = await sql<{ n: number }>`select coalesce(max(n), 0)::int as n from metalcon.games`;
  const n = Number(max[0]?.n ?? 0) + 1;
  const id = randomBytes(8).toString("hex");
  let slug = datedSlug(n);
  const clash = await sql<{ id: string }>`select id from metalcon.games where slug = ${slug} limit 1`;
  if (clash[0]) slug = `${slug}-${randomBytes(2).toString("hex")}`;
  await sql`
    insert into metalcon.games (id, n, status, share_seat, registration_open, slug, event_name, host_id, action_mode)
    values (${id}, ${n}, 'live', true, true, ${slug}, ${label}, ${actor.id}, ${actionMode === "manual" ? "manual" : "digital"})
  `;
  await ping(id, "opened", `${label} is live with sign-up open. Other games were left as they are.`);
  return { ok: true as const, n, slug };
}

export async function endGame(token: string, gameId: string) {
  const allowed = await allow(token, gameId);
  if (!allowed) return deny();
  if (allowed.game.status !== "live") return { ok: false as const, error: "That game is already closed." };
  const file = await dumpAndClose(allowed.game);
  await ping(allowed.game.id, "closed", `${allowed.game.slug} was closed. Seats were removed.`);
  return { ok: true as const, n: allowed.game.n, csv: file.csv, filename: file.filename };
}

export async function reopenGame(token: string, gameId: string) {
  const allowed = await allow(token, gameId);
  if (!allowed) return deny();
  if (allowed.game.status === "live") return { ok: false as const, error: "That game is already open." };
  const sql = await getMetalconSql();
  await sql`
    update metalcon.games
    set status = 'live', ended_at = null, registration_open = false
    where id = ${allowed.game.id}
  `;
  await ping(allowed.game.id, "reopened", `${allowed.game.slug} was reopened. Sign-up stays closed until it is turned on.`);
  return { ok: true as const, n: allowed.game.n };
}

export async function resetGame(token: string, gameId: string) {
  const allowed = await allow(token, gameId);
  if (!allowed) return deny();
  if (allowed.game.status !== "live") return { ok: false as const, error: "That game is closed." };
  const sql = await getMetalconSql();
  await sql`delete from metalcon.answers where game_id = ${allowed.game.id}`;
  return { ok: true as const, n: allowed.game.n };
}

export async function setSignup(token: string, gameId: string, open: boolean) {
  const allowed = await allow(token, gameId);
  if (!allowed) return deny();
  if (allowed.game.status !== "live") return { ok: false as const, error: "That game is closed." };
  const sql = await getMetalconSql();
  await sql`update metalcon.games set registration_open = ${open} where id = ${allowed.game.id}`;
  if (open) await ping(allowed.game.id, "exposed", `${allowed.game.slug} sign-up was opened. Anyone with the link can take a seat.`);
  return { ok: true as const };
}

export async function setShareSeat(token: string, gameId: string, share: boolean) {
  const allowed = await allow(token, gameId);
  if (!allowed) return deny();
  const sql = await getMetalconSql();
  await sql`update metalcon.games set share_seat = ${share} where id = ${allowed.game.id}`;
  return { ok: true as const };
}

async function dumpAndClose(game: { id: string; n: number }) {
  const sql = await getMetalconSql();
  const file = await buildCsv(game);
  await sql`
    insert into metalcon.archives (id, game_id, n, csv)
    values (${randomBytes(8).toString("hex")}, ${game.id}, ${game.n}, ${file.csv})
  `;
  const seated = await sql<{ secret_hash: string; name: string; dept: string }>`
    select secret_hash, name, dept from metalcon.players where game_id = ${game.id}
  `;
  for (const player of seated) {
    await sql`
      insert into metalcon.revoked (id, game_id, secret_hash, player_name, dept)
      values (${randomBytes(8).toString("hex")}, ${game.id}, ${player.secret_hash}, ${player.name}, ${player.dept})
    `;
  }
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

export async function placePlayer(input: { token: string; gameId: string; name: string; phone: string; email: string; dept: string }) {
  const allowed = await allow(input.token, input.gameId);
  if (!allowed) return deny();
  if (allowed.game.status !== "live") return { ok: false as const, error: "That game is closed." };
  const name = cleanName(input.name);
  if (name.length < 2) return { ok: false as const, error: "Enter the player's name." };
  const phone = normalizePhone(input.phone);
  if (!phone) return { ok: false as const, error: "Enter a 10-digit mobile number." };
  const email = input.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false as const, error: "Enter an email address." };
  const dept = seatOf(input.dept);
  if (!dept) return { ok: false as const, error: "Choose a seat." };
  const sql = await getMetalconSql();
  if (!allowed.game.share_seat) {
    const taken = await sql<{ id: string }>`
      select id from metalcon.players where game_id = ${allowed.game.id} and dept = ${dept} limit 1
    `;
    if (taken[0]) return { ok: false as const, error: `${dept} already has a player.` };
  }
  const id = randomBytes(8).toString("hex");
  const secret = randomBytes(18).toString("hex");
  await sql`
    insert into metalcon.players (id, event_id, game_id, secret_hash, invite_token, name, phone, email, dept, terms_at)
    values (${id}, ${EVENT_ID}, ${allowed.game.id}, ${hash(secret)}, ${secret}, ${name}, ${phone}, ${email}, ${dept}, null)
  `;
  return { ok: true as const, player: { id, token: secret, name, dept } };
}

export async function sendSeatLink(input: { token: string; playerId: string; origin: string }) {
  const actor = actorOf(input.token);
  if (!actor) return deny();
  const origin = originOf(input.origin);
  if (!origin) return { ok: false as const, error: "Could not build the link." };
  const sql = await getMetalconSql();
  const rows = await sql<{ id: string; name: string; email: string; dept: string; invite_token: string | null; n: number; slug: string | null; host_id: string | null }>`
    select p.id, p.name, p.email, p.dept, p.invite_token, g.n, g.slug, g.host_id
    from metalcon.players p
    join metalcon.games g on g.id = p.game_id
    where p.id = ${input.playerId}
    limit 1
  `;
  const player = rows[0];
  if (!player) return { ok: false as const, error: "That player is not on a game." };
  if (actor.role !== "super" && player.host_id !== actor.id) return deny();
  let invite = player.invite_token;
  if (!invite) {
    invite = randomBytes(18).toString("hex");
    await sql`update metalcon.players set invite_token = ${invite}, secret_hash = ${hash(invite)} where id = ${player.id}`;
  }
  const link = `${origin}/soebld/go?id=${player.id}&k=${invite}`;
  const sent = await sendPlainEmail(
    player.email,
    `Your seat for ${player.slug ?? `Game ${player.n}`}`,
    `${player.name}, you are seated in ${player.dept}.\n\nOpen this link, agree to the beta terms, and you are in:\n${link}\n`,
  );
  if (!sent.ok) return { ok: false as const, error: sent.error, link };
  return { ok: true as const, link };
}

function csvCell(value: string | number) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export async function exportGame(token: string, gameId: string) {
  const allowed = await allow(token, gameId);
  if (!allowed) return deny();
  const sql = await getMetalconSql();
  const saved = await sql<{ n: number; csv: string }>`
    select n, csv from metalcon.archives where game_id = ${gameId} order by created_at desc limit 1
  `;
  if (saved[0]) return { ok: true as const, filename: `soebld-game-${saved[0].n}.csv`, csv: saved[0].csv };
  return { ok: true as const, ...(await buildCsv(allowed.game)) };
}

async function buildCsv(game: { id: string; n: number }) {
  const sql = await getMetalconSql();
  const players = await sql<{ name: string; phone: string; email: string; dept: string }>`
    select name, phone, email, dept from metalcon.players where game_id = ${game.id} order by dept, name
  `;
  const answers = await sql<{
    round_n: number;
    dept: string;
    player_name: string;
    card_code: string;
    card_title: string;
    choice: string;
    choice_text: string;
    payroll_cents: number;
  }>`
    select round_n, dept, player_name, card_code, card_title, choice, choice_text, payroll_cents
    from metalcon.answers
    where game_id = ${game.id}
    order by round_n, dept, created_at
  `;
  const lines = [
    ["record", "game", "department", "player", "phone", "email", "round", "card", "title", "answer", "answer_text", "payroll"].join(","),
  ];
  for (const player of players) {
    lines.push(["player", game.n, player.dept, player.name, player.phone, player.email, "", "", "", "", "", ""].map(csvCell).join(","));
  }
  for (const row of answers) {
    if (row.card_code.toUpperCase().startsWith("BE-OW") || row.card_code.toUpperCase().startsWith("BE-RE")) continue;
    lines.push(
      ["answer", game.n, row.dept, row.player_name, "", "", row.round_n, row.card_code, row.card_title, row.choice, row.choice_text, (Number(row.payroll_cents) / 100).toFixed(2)]
        .map(csvCell)
        .join(","),
    );
  }
  const ledger = await sql<{
    dept: string;
    player_name: string;
    round_n: number;
    card_code: string;
    amount_cents: number;
    kind: string;
    detail: string;
    during_meeting: boolean;
    created_at: string;
  }>`
    select dept, player_name, round_n, card_code, amount_cents, kind, detail, during_meeting, created_at
    from metalcon.ledger where game_id = ${game.id} order by created_at
  `;
  for (const row of ledger) {
    if (row.card_code.toUpperCase().startsWith("BE-OW") || row.card_code.toUpperCase().startsWith("BE-RE")) continue;
    lines.push(
      ["ledger", game.n, row.dept, row.player_name, "", "", row.round_n, row.card_code, row.detail, row.kind, row.during_meeting ? "during GM meeting" : "", (Number(row.amount_cents) / 100).toFixed(2), row.created_at]
        .map(csvCell)
        .join(","),
    );
  }
  const settings = await sql<{ company_name: string; current_round: number; fixed_cost_cents: number; fixed_cost_start_round: number; base_payroll_cents: number }>`
    select company_name, current_round, fixed_cost_cents, fixed_cost_start_round, base_payroll_cents from metalcon.games where id = ${game.id} limit 1
  `;
  const projects = await sql<{ id: string; n: number; title: string; house: string; customer: string; value_cents: number; status: string }>`
    select id, n, title, house, customer, value_cents, status from metalcon.projects where game_id = ${game.id}
  `;
  const plays = await sql<{ player_id: string | null; dept: string; player_name: string; card_name: string; card_text: string; project_id: string; amount_cents: number; round_n: number }>`
    select player_id, dept, player_name, card_name, card_text, project_id, amount_cents, round_n from metalcon.plays where game_id = ${game.id}
  `;
  const people = await sql<{ id: string; name: string; dept: string }>`select id, name, dept from metalcon.players where game_id = ${game.id}`;
  const numbers = computeNumbers({
    companyName: settings[0]?.company_name ?? "",
    currentRound: Number(settings[0]?.current_round) || 1,
    fixedCostCents: Number(settings[0]?.fixed_cost_cents) || 200000,
    fixedStartRound: Number(settings[0]?.fixed_cost_start_round) || 3,
    basePayrollCents: Number(settings[0]?.base_payroll_cents) || 0,
    answers: answers.map((row) => ({ ...row, player_id: "", during_meeting: false })),
    plays,
    projects,
    players: people,
  });
  lines.push(["numbers", game.n, "", "", "", "", "", "revenue", "", "", "", (numbers.revenueCents / 100).toFixed(2)].map(csvCell).join(","));
  lines.push(["numbers", game.n, "", "", "", "", "", "payroll", "", "", "", (numbers.payrollCents / 100).toFixed(2)].map(csvCell).join(","));
  lines.push(["numbers", game.n, "", "", "", "", "", "fixed", "", "", "", (numbers.fixedCents / 100).toFixed(2)].map(csvCell).join(","));
  lines.push(["numbers", game.n, "", "", "", "", "", "other", "", "", "", (numbers.otherCents / 100).toFixed(2)].map(csvCell).join(","));
  lines.push(["numbers", game.n, "", "", "", "", "", "profit", "", "", "", (numbers.profitCents / 100).toFixed(2)].map(csvCell).join(","));
  lines.push(["numbers", game.n, "", "", "", "", "", "margin", "", "", "", numbers.marginBps === null ? "" : (numbers.marginBps / 100).toFixed(1)].map(csvCell).join(","));
  for (const project of numbers.projects) {
    lines.push(["project", game.n, "", project.title, "", "", project.n, "", project.status, "", "", (project.revenueCents / 100).toFixed(2)].map(csvCell).join(","));
  }
  for (const dept of numbers.departments) {
    lines.push(["department", game.n, dept.dept, "", "", "", "", "", "", "", "", (dept.cents / 100).toFixed(2)].map(csvCell).join(","));
  }
  for (const person of numbers.players) {
    lines.push(["player-value", game.n, person.dept, person.name, "", "", "", "", "", "", "", (person.cents / 100).toFixed(2)].map(csvCell).join(","));
  }
  for (const row of numbers.scoreboard) {
    lines.push(["scoreboard", game.n, row.dept, "", "", "", "", `${row.right}R ${row.wrong}W`, "", "", "", (row.net / 100).toFixed(2)].map(csvCell).join(","));
  }
  for (const line of numbers.figured) {
    lines.push(["formula", game.n, "", "", "", "", "", line, "", "", "", ""].map(csvCell).join(","));
  }
  return { filename: `soebld-game-${game.n}.csv`, csv: lines.join("\n") };
}

export async function setBasePayroll(input: { token: string; gameId: string; amount: number }) {
  const allowed = await allow(input.token, input.gameId);
  if (!allowed) return deny();
  const amount = Math.round(input.amount);
  if (!Number.isFinite(amount) || amount < 0 || amount > 20000) return { ok: false as const, error: "Enter a base from $0 to $20,000 per department." };
  const sql = await getMetalconSql();
  await sql`update metalcon.games set base_payroll_cents = ${amount * 100} where id = ${input.gameId}`;
  return { ok: true as const };
}

export async function setFixedCost(input: { token: string; gameId: string; amount: number; startRound: number }) {
  const allowed = await allow(input.token, input.gameId);
  if (!allowed) return deny();
  const amount = Math.round(input.amount);
  const start = Math.round(input.startRound);
  if (!Number.isFinite(amount) || amount < 0 || amount > 100000) return { ok: false as const, error: "Enter a fixed cost from $0 to $100,000." };
  if (!Number.isFinite(start) || start < 1 || start > 20) return { ok: false as const, error: "Enter a starting round from 1 to 20." };
  const sql = await getMetalconSql();
  await sql`update metalcon.games set fixed_cost_cents = ${amount * 100}, fixed_cost_start_round = ${start} where id = ${input.gameId}`;
  return { ok: true as const };
}

export async function claimSeat(input: { id: string; token: string; terms: boolean }) {
  if (!input.id || !input.token) return { ok: false as const, error: "This link is not valid." };
  const sql = await getMetalconSql();
  const rows = await sql<{
    id: string;
    name: string;
    dept: string;
    invite_token: string | null;
    terms_at: string | null;
    status: string;
    n: number;
    game_id: string;
  }>`
    select p.id, p.name, p.dept, p.invite_token, p.terms_at, p.game_id, g.status, g.n
    from metalcon.players p
    join metalcon.games g on g.id = p.game_id
    where p.id = ${input.id}
    limit 1
  `;
  const player = rows[0];
  if (!player || player.invite_token !== input.token) {
    await noteClosedAttempt(input.token, "Opened a seat link.");
    return { ok: false as const, error: "This link is not valid." };
  }
  if (player.status !== "live") {
    await noteClosedAttempt(input.token, "Opened a seat link after close.");
    return { ok: false as const, error: `Game ${player.n} has ended.` };
  }
  if (!player.terms_at) {
    if (!input.terms) {
      return { ok: true as const, needsTerms: true as const, name: player.name, dept: player.dept, game: player.n };
    }
    await sql`update metalcon.players set terms_at = now() where id = ${player.id}`;
  }
  return {
    ok: true as const,
    needsTerms: false as const,
    player: { id: player.id, secret: input.token, name: player.name, dept: player.dept },
  };
}

function cleanLine(raw: string, max = 80) {
  return raw.replace(/\s+/g, " ").trim().slice(0, max);
}

export async function submitHostLead(input: {
  company?: string;
  name?: string;
  title?: string;
  phone?: string;
  email?: string;
  city?: string;
  state?: string;
  headcount?: string;
  timing?: string;
  notes?: string;
  contact?: boolean;
}) {
  const company = cleanLine(input.company ?? "", 80);
  const name = cleanLine(input.name ?? "", 60);
  const phone = cleanLine(input.phone ?? "", 30);
  const email = cleanLine(input.email ?? "", 80).toLowerCase();
  if (!company || !name) return { ok: false as const, error: "Company and your name are required." };
  if (!phone && !email) return { ok: false as const, error: "Add a mobile number or an email so we can reach you." };
  if (!input.contact) return { ok: false as const, error: "Check the box so we can contact you about a game day." };
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
    notes ? `Notes: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  await sendPlainEmail(ALERT_TO, `Game day interest: ${company}`, body).catch(() => undefined);
  const ghl = await pushHostLead({ company, name, title, phone, email, city, state, headcount, timing, notes }).catch(() => null);
  if (ghl?.contactId) {
    await sql`update metalcon.host_leads set ghl_contact_id = ${ghl.contactId} where id = ${id}`;
  }
  return { ok: true as const, ghl: Boolean(ghl?.contactId) };
}

export async function exportHostLeads(token: string) {
  const actor = actorOf(token);
  if (!actor || actor.role !== "super") return deny();
  const sql = await getMetalconSql();
  const rows = await sql<{
    company: string;
    contact_name: string;
    title: string;
    phone: string;
    email: string;
    city: string;
    state: string;
    headcount: string;
    timing: string;
    notes: string;
    created_at: string;
  }>`
    select company, contact_name, title, phone, email, city, state, headcount, timing, notes, created_at
    from metalcon.host_leads
    order by created_at desc
  `;
  const lines = [
    ["company", "contact", "title", "phone", "email", "city", "state", "people", "when", "notes", "received"].join(","),
  ];
  for (const row of rows) {
    lines.push(
      [row.company, row.contact_name, row.title, row.phone, row.email, row.city, row.state, row.headcount, row.timing, row.notes, row.created_at]
        .map(csvCell)
        .join(","),
    );
  }
  return { ok: true as const, filename: "soebld-game-day-leads.csv", csv: lines.join("\n") };
}
