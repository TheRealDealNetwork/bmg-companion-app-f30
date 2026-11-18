import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { getRequest } from "@tanstack/react-start/server";
import { getSql } from "@/lib/db";
import { seatInviteText } from "./format";
import { withSeat } from "./join-url";
import {
  catalog,
  deptMoney,
  deptSnap,
  eventMoney,
  faceSnap,
  freshBags,
  fullByCode,
  lookupHost,
  lookupPlayer,
  pendingMoney,
  publicByCode,
  randomCode,
  refillDept,
  refillSimple,
  shuffle,
} from "./cards.server";
import {
  blankState,
  giveHand,
  HAND_SIZE,
  hydrate,
  isHead,
  annualOf,
  missingPayroll,
  placeProject,
  playHand,
  prepareRedeal,
  joinPlayer,
  playerFeedback,
  playerHelp,
  playerShout,
  playerSurvey,
  recordAnswer,
  recordDeptPlay,
  recordFace,
  reduceHost,
  reshuffleBag,
  seatCast,
  saveNote,
  setAnnualPay,
  setFocusProjects,
  skipCards,
  uid,
} from "./engine";
import { cashEffect } from "./icons";
import { present, type Viewer } from "./present";
import {
  type Answer,
  BOARD_CUE,
  type DeptId,
  type GameState,
  type GameSummary,
  type GameView,
  type HandCard,
  isDept,
} from "./types";
import { accessFor, canTouch, type Access } from "./staff.server";

type Row = { code: string; host_token: string; rev: number; state: GameState | string };

function hashSecret(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

function matches(raw: string, hash: string): boolean {
  if (!raw || !hash) return false;
  const a = Buffer.from(hashSecret(raw));
  const b = Buffer.from(hash);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function newSecret(): string {
  return randomBytes(18).toString("hex");
}

const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function makeCode(): string {
  const bytes = randomBytes(6);
  let s = "";
  for (let i = 0; i < 6; i++) s += ALPHA[bytes[i]! % ALPHA.length];
  return s;
}

function parseState(value: GameState | string): GameState {
  if (typeof value === "string") return JSON.parse(value) as GameState;
  return value;
}

async function load(code: string): Promise<{ rev: number; hostHash: string; state: GameState } | null> {
  const sql = await getSql();
  const rows = await sql<Row>`select code, host_token, rev, state from bm_games where code = ${code}`;
  const row = rows[0];
  if (!row) return null;
  return { rev: Number(row.rev), hostHash: row.host_token, state: hydrate(parseState(row.state)) };
}

async function save(code: string, rev: number, state: GameState): Promise<number | null> {
  const sql = await getSql();
  const rows = await sql<{ rev: number }>`
    update bm_games
    set state = ${JSON.stringify(state)}::jsonb, rev = rev + 1, updated_at = now()
    where code = ${code} and rev = ${rev}
    returning rev
  `;
  const next = rows[0]?.rev;
  return next === undefined ? null : Number(next);
}

async function commit(
  code: string,
  mutate: (state: GameState) => { ok: false; error: string } | { ok: true; state: GameState },
): Promise<{ ok: false; error: string } | { ok: true; state: GameState; rev: number }> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const row = await load(code);
    if (!row) return { ok: false, error: "Game not found. Check the code." };
    const result = mutate(row.state);
    if (!result.ok) return result;
    const rev = await save(code, row.rev, result.state);
    if (rev !== null) return { ok: true, state: result.state, rev };
  }
  return { ok: false, error: "The room updated at the same time. Try once more." };
}

function deskHash(adminToken: string): string {
  const admin = adminToken.trim();
  if (admin.length < 16) return "";
  return hashSecret(admin);
}

function hostKeyMatches(raw: string, column: string, extra?: string[]): boolean {
  if (matches(raw, column)) return true;
  return (extra ?? []).some((hash) => matches(raw, hash));
}

function isAdmin(state: GameState, hash: string): boolean {
  if (!hash) return false;
  if (state.desk && state.desk === hash) return true;
  return (state.admins ?? []).some((admin) => admin.hash === hash);
}

function canManage(state: GameState, hash: string): boolean {
  if (!hash) return false;
  if (!state.desk && !(state.admins ?? []).length) return true;
  return isAdmin(state, hash);
}

function hostRows(state: GameState, hash: string): { id: string; label: string; yours: boolean }[] {
  return (state.admins ?? []).map((admin) => ({
    id: admin.id,
    label: admin.rank === "super" || (!admin.rank && admin.hash === state.desk) ? "Super Admin" : admin.label === "GM" ? "Host Admin" : admin.label,
    yours: admin.hash === hash,
  }));
}

function cleanCode(code: string): string {
  return code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function viewerFor(
  state: GameState,
  hostHash: string,
  creds: { hostToken?: string; playerId?: string; playerToken?: string },
): { ok: false; error: string } | { ok: true; viewer: Viewer } {
  if (creds.hostToken && hostKeyMatches(creds.hostToken, hostHash, state.hostHashes)) {
    return { ok: true, viewer: { kind: "host" } };
  }
  if (creds.hostToken) return { ok: false, error: "That host key does not match this game." };
  if (creds.playerId && creds.playerToken) {
    const player = state.players.find((p) => p.id === creds.playerId);
    if (!player || !matches(creds.playerToken, player.secret)) {
      return { ok: false, error: "This device is not on the roster. Join again." };
    }
    return { ok: true, viewer: { kind: "player", player } };
  }
  return { ok: true, viewer: { kind: "room" } };
}

function viewOf(code: string, rev: number, state: GameState, viewer: Viewer): GameView {
  const view = present(code, rev, state, viewer, Date.now());
  if (viewer.kind === "host") view.smsReady = smsConfigured();
  if (
    viewer.kind === "player" &&
    viewer.player.dept === "General Manager" &&
    viewer.player.active &&
    state.status === "live" &&
    (state.boardStep ?? 0) === 0 &&
    missingPayroll(state).length === 0 &&
    !state.events.some((event) => event.round === state.round)
  ) {
    const index = state.bags.event[state.bags.event.length - 1];
    const snap = index === undefined ? null : faceSnap("event", index);
    view.eventDeck = snap ? [{ index, name: snap.name, type: snap.type, text: snap.text }] : [];
  }
  const step = state.boardStep ?? 0;
  const current = step < BOARD_CUE.length ? BOARD_CUE[step] : null;
  const dutyKey = current ? `${state.round}:${current}` : "";
  if (current && state.dutyFor === dutyKey && state.dutyCode) {
    const card = publicByCode(state.dutyCode);
    const mine = viewer.kind === "player" && viewer.player.dept === current;
    if (card && (viewer.kind === "host" || mine)) {
      view.dutyCard = { code: card.code, title: card.title, scenario: card.scenario, options: card.options };
    }
  }
  return view;
}

function smsConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID?.trim() &&
      process.env.TWILIO_AUTH_TOKEN?.trim() &&
      process.env.TWILIO_FROM_NUMBER?.trim(),
  );
}

function cleanSeat(raw: string): string {
  const seat = raw.trim().toLowerCase();
  if (!/^[a-z0-9]{8,24}$/.test(seat)) return "";
  return seat;
}

export async function createGameRecord(input: { company: string; rehearsal: boolean; adminToken?: string; profileSecret?: string }) {
  const company = input.company.trim().slice(0, 48) || "The Company";
  const access = await accessFor(String(input.adminToken ?? ""), String(input.profileSecret ?? ""));
  if (access.rank === "player" || !access.hash) {
    return { ok: false as const, error: "Sign in as a Host Admin, or use the Super Admin key, to open a game." };
  }
  const sql = await getSql();
  for (let i = 0; i < 6; i++) {
    const code = makeCode();
    const hostToken = newSecret();
    let state = blankState(company, input.rehearsal, freshBags());
    if (input.rehearsal) {
      const cast = seatCast(state, Date.now());
      if (cast.ok) state = cast.state;
    }
    state.desk = access.hash;
    state.hostProfileId = access.profileId || undefined;
    state.admins = [{
      id: uid(),
      label: access.rank === "super" ? "Super Admin" : access.name || "Host Admin",
      hash: access.hash,
      rank: access.rank === "super" ? "super" : "host",
    }];
    try {
      await sql`
        insert into bm_games (code, host_token, rev, state)
        values (${code}, ${hashSecret(hostToken)}, 1, ${JSON.stringify(state)}::jsonb)
      `;
      return {
        ok: true as const,
        code,
        hostToken,
        view: viewOf(code, 1, state, { kind: "host" }),
      };
    } catch (err) {
      const msg = String(err);
      if (msg.includes("duplicate") || msg.includes("unique")) continue;
      throw err;
    }
  }
  return { ok: false as const, error: "Could not open a game. Try again." };
}

export async function readGameRecord(input: {
  code: string;
  hostToken?: string;
  playerId?: string;
  playerToken?: string;
}) {
  const code = cleanCode(input.code);
  const row = await load(code);
  if (!row) return { ok: false as const, error: "Game not found. Check the code." };
  const who = viewerFor(row.state, row.hostHash, input);
  if (!who.ok) return who;
  return { ok: true as const, view: viewOf(code, row.rev, row.state, who.viewer) };
}

const STATUS_RANK: Record<string, number> = { live: 0, lobby: 1, audit: 2, post: 3, done: 4 };

function whenStamp(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(String(value ?? ""));
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export async function listGamesRecord(adminToken: string, profileSecret = ""): Promise<{ ok: true; games: GameSummary[]; rank: Access["rank"] }> {
  try {
  const access = await accessFor(adminToken, profileSecret);
  const sql = await getSql();
  const rows = await sql<{ code: string; state: GameState | string; updated_at: unknown }>`
    select code, state, updated_at from bm_games order by updated_at desc limit 80
  `;
  const games: GameSummary[] = [];
  for (const row of rows) {
    const state = hydrate(parseState(row.state));
    if (!canTouch(state, access)) continue;
    games.push({
      code: row.code,
      company: state.company || "The Company",
      rehearsal: Boolean(state.rehearsal),
      status: state.status,
      round: state.round,
      phase: state.phase,
      players: state.players.filter((p) => p.active).length,
      updatedAt: whenStamp(row.updated_at),
      owned: true,
      hosts: hostRows(state, access.hash),
    });
  }
  games.sort((a, b) => (STATUS_RANK[a.status] ?? 9) - (STATUS_RANK[b.status] ?? 9) || b.updatedAt.localeCompare(a.updatedAt));
  return { ok: true, games, rank: access.rank };
  } catch (err) {
    console.error("[db] listGames failed", err);
    return { ok: true, games: [], rank: "player" };
  }
}

export async function resumeHostRecord(input: { code: string; adminToken: string; hostToken?: string; profileSecret?: string }) {
  const code = cleanCode(input.code);
  const access = await accessFor(input.adminToken, input.profileSecret);
  if (!access.hash && access.rank !== "super") return { ok: false as const, error: "Sign in as a Host Admin, or use the Super Admin key." };
  const row = await load(code);
  if (!row) return { ok: false as const, error: "Game not found." };
  if (!canTouch(row.state, access)) {
    return { ok: false as const, error: "That game is under another Host Admin." };
  }
  const state = parseState(row.state);
  hydrate(state);
  if (access.hash && !isAdmin(state, access.hash)) {
    if (!state.desk) state.desk = access.hash;
    state.admins = [...(state.admins ?? []), { id: uid(), label: access.rank === "super" ? "Super Admin" : "Host Admin", hash: access.hash, rank: access.rank === "super" ? "super" : "host" }];
  }
  const keeps = Boolean(input.hostToken && hostKeyMatches(input.hostToken, row.hostHash, state.hostHashes));
  if (keeps && input.hostToken) {
    return {
      ok: true as const,
      code,
      hostToken: input.hostToken,
      view: viewOf(code, row.rev, state, { kind: "host" }),
    };
  }
  const hostToken = newSecret();
  state.hostHashes = [...(state.hostHashes ?? []), hashSecret(hostToken)];
  const sql = await getSql();
  const saved = await sql<{ rev: number }>`
    update bm_games
    set state = ${JSON.stringify(state)}::jsonb,
        rev = rev + 1,
        updated_at = now()
    where code = ${code} and rev = ${row.rev}
    returning rev
  `;
  if (!saved[0]) return { ok: false as const, error: "The room updated at the same time. Try once more." };
  return {
    ok: true as const,
    code,
    hostToken,
    view: viewOf(code, Number(saved[0].rev), state, { kind: "host" }),
  };
}

export async function resetGameRecord(input: { code: string; adminToken: string; profileSecret?: string }) {
  const code = cleanCode(input.code);
  const access = await accessFor(input.adminToken, input.profileSecret);
  const row = await load(code);
  if (!row) return { ok: false as const, error: "Game not found." };
  if (!canTouch(row.state, access)) return { ok: false as const, error: "This desk cannot reset that game." };
  const fresh = blankState(row.state.company, row.state.rehearsal, freshBags());
  if (fresh.rehearsal) {
    const cast = seatCast(fresh, Date.now());
    if (cast.ok) Object.assign(fresh, cast.state);
  }
  fresh.desk = row.state.desk || access.hash;
  fresh.hostProfileId = row.state.hostProfileId;
  fresh.admins = row.state.admins?.length ? row.state.admins : [{ id: uid(), label: "Host Admin", hash: access.hash, rank: "host" }];
  fresh.hostHashes = row.state.hostHashes ?? [];
  fresh.createdAt = row.state.createdAt;
  fresh.log = [
    {
      id: uid(),
      at: Date.now(),
      scope: "host",
      table: "",
      text: "Game reset. Same code, clear board.",
    },
  ];
  const sql = await getSql();
  const saved = await sql<{ rev: number }>`
    update bm_games
    set state = ${JSON.stringify(fresh)}::jsonb,
        rev = rev + 1,
        updated_at = now()
    where code = ${code} and rev = ${row.rev}
    returning rev
  `;
  if (!saved[0]) return { ok: false as const, error: "The room updated at the same time. Try once more." };
  return { ok: true as const };
}

export async function deleteGameRecord(input: { code: string; adminToken: string; profileSecret?: string }) {
  const code = cleanCode(input.code);
  const access = await accessFor(input.adminToken, input.profileSecret);
  const row = await load(code);
  if (!row) return { ok: false as const, error: "Game not found." };
  if (!canTouch(row.state, access)) return { ok: false as const, error: "This desk cannot delete that game." };
  const sql = await getSql();
  await sql`delete from bm_games where code = ${code}`;
  return { ok: true as const };
}

export async function addHostRecord(input: { code: string; adminToken: string; label: string; profileSecret?: string }) {
  const code = cleanCode(input.code);
  const access = await accessFor(input.adminToken, input.profileSecret);
  const label = input.label.trim().slice(0, 40);
  if (access.rank !== "super") return { ok: false as const, error: "Only a Super Admin can add a Host Admin." };
  if (!label) return { ok: false as const, error: "Name the Host Admin." };
  const row = await load(code);
  if (!row) return { ok: false as const, error: "Game not found." };
  if (!canTouch(row.state, access)) return { ok: false as const, error: "This desk cannot add a Host Admin." };
  const state = parseState(row.state);
  hydrate(state);
  const key = newSecret();
  state.admins = [...(state.admins ?? []), { id: uid(), label, hash: hashSecret(key), rank: "host" }];
  const sql = await getSql();
  const saved = await sql<{ rev: number }>`
    update bm_games
    set state = ${JSON.stringify(state)}::jsonb,
        rev = rev + 1,
        updated_at = now()
    where code = ${code} and rev = ${row.rev}
    returning rev
  `;
  if (!saved[0]) return { ok: false as const, error: "The room updated at the same time. Try once more." };
  return { ok: true as const, key, label };
}

export async function removeHostRecord(input: { code: string; adminToken: string; adminId: string; profileSecret?: string }) {
  const code = cleanCode(input.code);
  const access = await accessFor(input.adminToken, input.profileSecret);
  const adminId = input.adminId.trim();
  if (access.rank !== "super") return { ok: false as const, error: "Only a Super Admin can change Host Admins." };
  const row = await load(code);
  if (!row) return { ok: false as const, error: "Game not found." };
  if (!canTouch(row.state, access)) return { ok: false as const, error: "This desk cannot change Host Admins." };
  const state = parseState(row.state);
  hydrate(state);
  const admins = state.admins ?? [];
  if (admins.length < 2) return { ok: false as const, error: "A game needs at least one host." };
  const target = admins.find((admin) => admin.id === adminId);
  if (!target) return { ok: false as const, error: "That host is not on this game." };
  if (target.hash === access.hash) return { ok: false as const, error: "You cannot remove your own desk." };
  state.admins = admins.filter((admin) => admin.id !== adminId);
  if (state.desk === target.hash) {
    const next = state.admins[0];
    if (next) state.desk = next.hash;
  }
  const sql = await getSql();
  const saved = await sql<{ rev: number }>`
    update bm_games
    set state = ${JSON.stringify(state)}::jsonb,
        rev = rev + 1,
        updated_at = now()
    where code = ${code} and rev = ${row.rev}
    returning rev
  `;
  if (!saved[0]) return { ok: false as const, error: "The room updated at the same time. Try once more." };
  return { ok: true as const };
}

export async function joinRecord(input: { code: string; name: string; dept: string; seat?: string; profileSecret?: string }) {
  const code = cleanCode(input.code);
  const seat = cleanSeat(input.seat ?? "");
  if ((input.seat ?? "").trim() && !seat) {
    return { ok: false as const, error: "That seat link is no longer valid. Ask the GM for a new text." };
  }
  if (!seat && !isDept(input.dept)) return { ok: false as const, error: "Choose a department." };
  const dept = isDept(input.dept) ? input.dept : "Marketing";
  const { resolveProfile } = await import("./people.server");
  const profile = input.profileSecret ? await resolveProfile(input.profileSecret) : null;
  const name = profile && !seat ? `${profile.first} ${profile.last}` : input.name;
  const secret = newSecret();
  const hash = hashSecret(secret);
  const result = await commit(code, (state) =>
    joinPlayer(state, {
      name,
      dept,
      secret: hash,
      now: Date.now(),
      seat: seat || undefined,
      profileId: profile?.id,
    }),
  );
  if (!result.ok) return result;
  const joined = result.state.players.find((p) => p.secret === hash);
  if (!joined) return { ok: false as const, error: "Could not join." };
  return {
    ok: true as const,
    playerId: joined.id,
    playerToken: secret,
    view: viewOf(code, result.rev, result.state, { kind: "player", player: joined }),
  };
}

export async function seatPreviewRecord(input: { code: string; seat: string }) {
  const code = cleanCode(input.code);
  const seat = cleanSeat(input.seat);
  if (!seat) return { ok: false as const, error: "That seat link is no longer valid." };
  const row = await load(code);
  if (!row) return { ok: false as const, error: "Game not found." };
  const player = row.state.players.find((p) => p.invite === seat);
  if (!player) return { ok: false as const, error: "That seat link is no longer valid. Ask the GM for a new text." };
  return {
    ok: true as const,
    name: player.name,
    dept: player.dept,
    claimed: player.claimed !== false && player.secret.length > 0,
    active: player.active,
    company: row.state.company,
  };
}

function browserHost(raw: string | null | undefined): string {
  const host = String(raw ?? "")
    .split(",")[0]
    ?.trim()
    .split(":")[0]
    ?.toLowerCase() ?? "";
  if (!host || !/^[a-z0-9.-]+$/.test(host) || !host.includes(".")) return "";
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return "";
  if (host === "localhost" || host.endsWith(".local")) return "";
  if (host === "vercel.app" || host.endsWith(".vercel.app") || host.endsWith(".vercel.com")) return "";
  if (host === "grok.com" || host.endsWith(".grok.com")) return "";
  if (host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com")) return "";
  return host;
}

/** Public https join link that opens in the phone browser, not the Grok app. */
export function browserJoinLink(code: string): { ok: true; url: string } | { ok: false; error: string } {
  const clean = cleanCode(code);
  if (clean.length < 4) return { ok: false, error: "Game code missing." };
  const fromEnv = browserHost(process.env.VITE_PUBLIC_HOSTNAME);
  let host = fromEnv;
  if (!host) {
    try {
      const req = getRequest();
      if (req) {
        let fromUrl = "";
        try {
          fromUrl = new URL(req.url).hostname;
        } catch {
          fromUrl = "";
        }
        host =
          browserHost(req.headers.get("x-forwarded-host")) ||
          browserHost(req.headers.get("host")) ||
          browserHost(fromUrl);
      }
    } catch {
      host = "";
    }
  }
  if (!host) {
    return {
      ok: false,
      error: "Publish the app, then open the public site to print a browser QR. Preview links open the Grok app.",
    };
  }
  const url = new URL(`https://${host}/g/${clean}/join`);
  url.searchParams.set("mwbv", "true");
  return { ok: true, url: url.toString() };
}

function choiceOf(value: unknown): "A" | "B" | "C" | null {
  return value === "A" || value === "B" || value === "C" ? value : null;
}

async function sendSms(to: string, body: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const sid = process.env.TWILIO_ACCOUNT_SID?.trim() ?? "";
  const token = process.env.TWILIO_AUTH_TOKEN?.trim() ?? "";
  const from = process.env.TWILIO_FROM_NUMBER?.trim() ?? "";
  if (!sid || !token || !from) {
    return { ok: false, error: "Texting from the game is not connected. Use Text invite to send from your phone." };
  }
  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const form = new URLSearchParams({ To: to, From: from, Body: body });
  let res: Response;
  try {
    res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
  } catch {
    return { ok: false, error: "The text could not be sent. Try again." };
  }
  if (!res.ok) {
    let detail = "The text did not send. Check the mobile number and try again.";
    try {
      const data = (await res.json()) as { code?: number };
      if (data.code === 21211 || data.code === 21614) detail = "That number can't take this text.";
      else if (data.code === 21608 || data.code === 21610) detail = "The texting account can't reach that number yet.";
    } catch {
      detail = "The text did not send. Check the mobile number and try again.";
    }
    return { ok: false, error: detail };
  }
  return { ok: true };
}

async function deliverSeatText(code: string, payload: Record<string, unknown>) {
  const playerId = typeof payload.playerId === "string" ? payload.playerId : "";
  const phone = typeof payload.phone === "string" ? payload.phone : "";
  const primed = await commit(code, (state) => reduceHost(state, "reach", { playerId, phone }, Date.now()));
  if (!primed.ok) return primed;
  const player = primed.state.players.find((p) => p.id === playerId);
  const held = viewOf(code, primed.rev, primed.state, { kind: "host" });
  if (!player?.phone || !player.invite) return { ok: false as const, error: "Add a mobile number first.", view: held };
  const link = browserJoinLink(code);
  if (!link.ok) return { ok: false as const, error: link.error, view: held };
  const url = withSeat(link.url, player.invite);
  const body = seatInviteText(primed.state.company, player.name, player.dept, url);
  const sent = await sendSms(player.phone, body);
  if (!sent.ok) return { ok: false as const, error: sent.error, view: held };
  const stamped = await commit(code, (state) => reduceHost(state, "texted", { playerId }, Date.now()));
  if (!stamped.ok) return { ok: true as const, view: held };
  return { ok: true as const, view: viewOf(code, stamped.rev, stamped.state, { kind: "host" }) };
}

export async function assumeSeatRecord(input: { code: string; hostToken: string; playerId: string }) {
  const code = cleanCode(input.code);
  const row = await load(code);
  if (!row) return { ok: false as const, error: "Game not found." };
  if (!hostKeyMatches(input.hostToken, row.hostHash, row.state.hostHashes)) {
    return { ok: false as const, error: "Host key required." };
  }
  if (!row.state.rehearsal) return { ok: false as const, error: "Role switching is only for a rehearsal." };
  const secret = newSecret();
  const hash = hashSecret(secret);
  const result = await commit(code, (state) => {
    if (!state.rehearsal) return { ok: false as const, error: "Role switching is only for a rehearsal." };
    const player = state.players.find((p) => p.id === input.playerId && p.active);
    if (!player || !player.standIn) return { ok: false as const, error: "That seat is not a rehearsal stand-in." };
    player.secret = hash;
    player.claimed = true;
    return { ok: true as const, state };
  });
  if (!result.ok) return result;
  const player = result.state.players.find((p) => p.id === input.playerId);
  if (!player) return { ok: false as const, error: "That seat is gone." };
  return {
    ok: true as const,
    playerId: player.id,
    playerToken: secret,
    name: player.name,
    dept: player.dept,
  };
}

export async function hostRecord(input: {
  code: string;
  hostToken: string;
  type: string;
  payload?: Record<string, unknown>;
}) {
  const code = cleanCode(input.code);
  const payload = input.payload ?? {};
  const row = await load(code);
  if (!row) return { ok: false as const, error: "Game not found." };
  if (!matches(input.hostToken, row.hostHash)) return { ok: false as const, error: "Host key required." };
  if (input.type === "text") return deliverSeatText(code, payload);

  const result = await commit(code, (state) => {
    const now = Date.now();
    if (
      input.type === "start" ||
      input.type === "nextRound" ||
      input.type === "phase" ||
      input.type === "openWave"
    ) {
      return schedule(state, input.type, payload, now);
    }
    if (input.type === "answer") {
      const raw = typeof payload.raw === "string" ? payload.raw : "";
      const dept = typeof payload.dept === "string" && isDept(payload.dept) ? payload.dept : undefined;
      const found = lookupHost(raw, dept);
      if ("error" in found) return { ok: false as const, error: found.error };
      const choice = choiceOf(payload.choice);
      if (!choice) return { ok: false as const, error: "Choose A, B, or C." };
      const card = found.card;
      return recordAnswer(state, {
        player: null,
        asGm: true,
        now,
        card: {
          code: card.code,
          dept: card.dept,
          title: card.title,
          choice,
          choiceText: card.options[choice],
          valueCents: card.values[choice] * 100,
          correct: card.correct,
          hostNote: card.hostNote,
        },
      });
    }
    if (input.type === "draw") {
      return drawFrom(state, payload, true, null, now);
    }
    if (input.type === "deal") {
      return dealDepts(state, payload, true, null, now);
    }
    if (input.type === "play") {
      return playFrom(state, payload, true, null, now);
    }
    if (input.type === "openProject") {
      return openProject(state, now);
    }
    if (input.type === "reshuffle") {
      const deck = typeof payload.deck === "string" ? payload.deck : "";
      const dept = typeof payload.dept === "string" && isDept(payload.dept) ? payload.dept : null;
      if (deck === "dept") {
        if (!dept) return { ok: false as const, error: "Choose a department." };
        return reshuffleBag(state, dept, deck, refillDept(dept));
      }
      if (deck === "event" || deck === "customer" || deck === "house") {
        return reshuffleBag(state, null, deck, refillSimple(deck));
      }
      return { ok: false as const, error: "Unknown deck." };
    }
    return reduceHost(state, input.type, payload, now);
  });
  if (!result.ok) return result;
  const reveal = latestReveal(result.state);
  return {
    ok: true as const,
    view: viewOf(code, result.rev, result.state, { kind: "host" }),
    reveal: input.type === "answer" ? reveal : undefined,
  };
}

function latestReveal(state: GameState): Answer | undefined {
  return state.answers[state.answers.length - 1];
}

function dealOne(
  state: GameState,
  dept: DeptId,
  asGm: boolean,
  player: GameState["players"][number] | null,
  now: number,
) {
  let bag = [...(state.bags.dept[dept] ?? [])];
  let reshuffled = false;
  const cards: HandCard[] = [];
  while (cards.length < HAND_SIZE) {
    if (!bag.length) {
      bag = refillDept(dept);
      reshuffled = true;
      if (!bag.length) break;
    }
    const index = bag.pop();
    if (index === undefined) break;
    const snap = deptSnap(index);
    if (!snap) continue;
    cards.push({
      id: uid(),
      index,
      name: snap.name,
      type: snap.type,
      text: snap.text,
      round: state.round,
    });
  }
  return giveHand(state, { dept, cards, bag, asGm, player, reshuffled, now });
}

function dealDepts(
  state: GameState,
  payload: Record<string, unknown>,
  asGm: boolean,
  player: GameState["players"][number] | null,
  now: number,
) {
  const only = typeof payload.dept === "string" && isDept(payload.dept) ? payload.dept : player?.dept;
  const depts: DeptId[] =
    only && only !== "Recruiting" && only !== "Owner" && only !== "General Manager"
      ? [only]
      : only
        ? [only]
        : (["Marketing", "Appointment Center", "Sales", "Production", "Accounting"] as DeptId[]);
  let current = state;
  let dealt = 0;
  let lastError = "Choose a department.";
  for (const dept of depts) {
    const result = dealOne(current, dept, asGm, player, now);
    if (!result.ok) {
      lastError = result.error;
      if (depts.length === 1) return result;
      continue;
    }
    current = result.state;
    dealt += 1;
  }
  if (!dealt) return { ok: false as const, error: lastError };
  return { ok: true as const, state: current };
}

function playFrom(
  state: GameState,
  payload: Record<string, unknown>,
  asGm: boolean,
  player: GameState["players"][number] | null,
  now: number,
) {
  const dept = player?.dept ?? (typeof payload.dept === "string" && isDept(payload.dept) ? payload.dept : null);
  if (!dept) return { ok: false as const, error: "Choose a department." };
  const ids = Array.isArray(payload.ids) ? payload.ids.filter((id): id is string => typeof id === "string") : [];
  const projectIds = Array.isArray(payload.projectIds)
    ? payload.projectIds.map((id) => (typeof id === "string" ? id : ""))
    : [];
  const placements = Array.isArray(payload.placements)
    ? payload.placements.flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const row = item as { id?: unknown; projectIds?: unknown };
        const id = typeof row.id === "string" ? row.id : "";
        const chosen = Array.isArray(row.projectIds)
          ? row.projectIds.filter((value): value is string => typeof value === "string")
          : [];
        return id ? [{ id, projectIds: chosen }] : [];
      })
    : undefined;
  const hand = state.hands?.[dept] ?? [];
  const money = ids.map((id) => {
    const card = hand.find((item) => item.id === id);
    const parsed = cashEffect(card?.text ?? "");
    return parsed.immediate || deptMoney(card?.name ?? "");
  });
  const pending = ids.map((id) => {
    const card = hand.find((item) => item.id === id);
    const parsed = cashEffect(card?.text ?? "");
    return parsed.onComplete || pendingMoney(card?.name ?? "");
  });
  const played = playHand(state, { dept, ids, projectIds, placements, asGm, player, money, pending, now });
  if (!played.ok) return played;
  return { ok: true as const, state: maybeAdvance(played.state, now) };
}

function redealFrom(state: GameState, player: GameState["players"][number], now: number) {
  const dept = player.dept;
  const prepared = prepareRedeal(state, dept);
  if (!prepared.ok) return prepared;
  const bag = prepared.state.bags.dept[dept] ?? [];
  prepared.state.bags.dept[dept] = shuffle(bag);
  return dealOne(prepared.state, dept, false, player, now);
}

function ensureDuty(state: GameState, dept: DeptId) {
  const key = `${state.round}:${dept}`;
  if (state.answers.some((answer) => answer.round === state.round && answer.dept === dept && answer.duty)) return;
  if (state.dutyFor === key && state.dutyCode) return;
  const code = randomCode(dept);
  if (!code) return;
  state.dutyCode = code;
  state.dutyFor = key;
}

function turnGate(state: GameState, dept: DeptId): "payroll" | "focus" | "event" | "cards" | "principle" | "done" {
  const key = `${state.round}:${dept}`;
  if (dept === "General Manager" && missingPayroll(state).length) return "payroll";
  if (annualOf(state, dept) == null) return "payroll";
  if (dept === "General Manager") {
    if (!state.events.some((event) => event.round === state.round)) return "event";
    if (!state.answers.some((answer) => answer.round === state.round && answer.dept === dept && answer.duty)) return "principle";
    return "done";
  }
  if ((state.focus?.[key] ?? []).length < 2) return "focus";
  const played = state.plays.filter((play) => play.dept === dept && play.round === state.round).length;
  const skipped = Boolean(state.skipped?.[key]);
  const hand = (state.hands?.[dept] ?? []).filter((card) => card.round === state.round);
  if (!played && !skipped && !hand.length) return "cards";
  if (!state.answers.some((answer) => answer.round === state.round && answer.dept === dept && answer.duty)) return "principle";
  if (!played && !skipped) return "cards";
  return "done";
}

function maybeAdvance(state: GameState, now: number): GameState {
  let current = state;
  for (let guard = 0; guard < 8; guard++) {
    const step = current.boardStep ?? 0;
    if (step >= BOARD_CUE.length) return current;
    const dept = BOARD_CUE[step];
    const stage = turnGate(current, dept);
    if (stage === "cards" && dept !== "General Manager") {
      const dealt = dealOne(current, dept, true, null, now);
      if (dealt.ok) current = dealt.state;
      ensureDuty(current, dept);
      return current;
    }
    if (stage === "principle" || stage === "event" || stage === "payroll" || stage === "focus") {
      if (stage === "principle") ensureDuty(current, dept);
      return current;
    }
    const nextIndex = step + 1;
    if (nextIndex >= BOARD_CUE.length) {
      current.boardStep = BOARD_CUE.length;
      current.log.push({
        id: `gm-${now}`,
        at: now,
        scope: "public",
        table: "",
        text: "Departments are done. The GM opens the next round.",
      });
      return current;
    }
    current.boardStep = nextIndex;
    const next = BOARD_CUE[nextIndex];
    current.offPp = { ...(current.offPp ?? {}), [next]: 0 };
    current.dutyCode = "";
    current.dutyFor = "";
    current.log.push({
      id: `board-${now}-${nextIndex}`,
      at: now,
      scope: "public",
      table: "",
      text: `At the board: ${next}.`,
    });
  }
  return current;
}

function advanceAfterPlay(state: GameState, dept: DeptId, now: number) {
  return { ok: true as const, state: maybeAdvance(state, now) };
}

function takeSimple(state: GameState, deck: "customer" | "house") {
  let bag = [...state.bags[deck]];
  if (!bag.length) bag = refillSimple(deck);
  if (!bag.length) return { ok: false as const, error: `The ${deck} deck is empty.` };
  const index = bag.pop();
  if (index === undefined) return { ok: false as const, error: `The ${deck} deck is empty.` };
  const snap = faceSnap(deck, index);
  if (!snap) return { ok: false as const, error: "Card missing from the deck." };
  return { ok: true as const, bag, face: { name: snap.name, text: snap.text } };
}

function openWave(state: GameState, dollars: number, count: number, now: number) {
  hydrate(state);
  if ((state.waves ?? []).includes(dollars)) return { ok: true as const, state };
  state.bags.customer = shuffle(state.bags.customer);
  state.bags.house = shuffle(state.bags.house);
  let current = state;
  for (let n = 0; n < count; n++) {
    const customer = takeSimple(current, "customer");
    if (!customer.ok) return customer;
    const house = takeSimple({ ...current, bags: { ...current.bags, customer: customer.bag } }, "house");
    if (!house.ok) return house;
    const placed = placeProject(current, {
      customer: customer.face,
      house: house.face,
      customerBag: customer.bag,
      houseBag: house.bag,
      valueCents: dollars * 100,
      now,
    });
    if (!placed.ok) return placed;
    current = placed.state;
  }
  current.waves = [...(current.waves ?? []), dollars];
  return { ok: true as const, state: current };
}

function schedule(state: GameState, type: string, payload: Record<string, unknown>, now: number) {
  if (type === "openWave") {
    const dollars = typeof payload.dollars === "number" ? payload.dollars : 0;
    if (dollars !== 10000 && dollars !== 20000 && dollars !== 30000) {
      return { ok: false as const, error: "Unknown project set." };
    }
    return openWave(state, dollars, 3, now);
  }
  const reduced = reduceHost(state, type, payload, now);
  if (!reduced.ok) return reduced;
  let next = reduced.state;
  if (type === "start") {
    const wave = openWave(next, 10000, 3, now);
    if (!wave.ok) return wave;
    next = wave.state;
  }
  if (type === "nextRound") {
    const dollars = next.round === 4 ? 20000 : next.round === 6 ? 30000 : 0;
    if (dollars) {
      const wave = openWave(next, dollars, 3, now);
      if (!wave.ok) return wave;
      next = wave.state;
    }
  }
  if (type === "phase" && payload.phase === 4) {
    next.boardStep = Math.max(0, BOARD_CUE.indexOf("Marketing"));
    const dealt = dealDepts(next, { dept: "Marketing" }, true, null, now);
    if (dealt.ok) next = dealt.state;
  }
  return { ok: true as const, state: next };
}

function openProject(state: GameState, now: number) {
  const customer = takeSimple(state, "customer");
  if (!customer.ok) return customer;
  const house = takeSimple({ ...state, bags: { ...state.bags, customer: customer.bag } }, "house");
  if (!house.ok) return house;
  return placeProject(state, {
    customer: customer.face,
    house: house.face,
    customerBag: customer.bag,
    houseBag: house.bag,
    valueCents: 0,
    now,
  });
}

function eventChoices(state: GameState): { index: number; name: string; type: string; text: string }[] {
  const seen = new Set<number>();
  const cards: { index: number; name: string; type: string; text: string }[] = [];
  for (let i = state.bags.event.length - 1; i >= 0; i--) {
    const index = state.bags.event[i];
    if (index === undefined || seen.has(index)) continue;
    seen.add(index);
    const snap = faceSnap("event", index);
    if (!snap) continue;
    cards.push({ index, name: snap.name, type: snap.type, text: snap.text });
  }
  return cards;
}

function playEvent(state: GameState, player: GameState["players"][number], index: number, now: number) {
  if (player.dept !== "General Manager") return { ok: false as const, error: "Only the GM plays the event." };
  if (state.status !== "live") return { ok: false as const, error: "The game has not started." };
  if ((state.boardStep ?? 0) !== 0) return { ok: false as const, error: "The event is played on the GM's turn." };
  if (state.events.some((event) => event.round === state.round)) {
    return { ok: false as const, error: "An event is already in the business this round." };
  }
  const bag = [...state.bags.event];
  const at = bag.indexOf(index);
  if (at < 0) return { ok: false as const, error: "That card is no longer in the deck." };
  bag.splice(at, 1);
  const snap = faceSnap("event", index);
  if (!snap) return { ok: false as const, error: "Card missing from the deck." };
  const parsed = cashEffect(snap.text);
  return recordFace(state, "event", { name: snap.name, type: snap.type, text: snap.text }, bag, now, parsed.immediate || eventMoney(snap.name));
}

function drawFrom(
  state: GameState,
  payload: Record<string, unknown>,
  asGm: boolean,
  player: GameState["players"][number] | null,
  now: number,
) {
  const deck = typeof payload.deck === "string" ? payload.deck : "";
  if (deck === "dept") {
    const dept =
      player?.dept ?? (typeof payload.dept === "string" && isDept(payload.dept) ? payload.dept : null);
    if (!dept) return { ok: false as const, error: "Choose a department." };
    let bag = [...(state.bags.dept[dept as DeptId] ?? [])];
    let reshuffled = false;
    if (!bag.length) {
      bag = refillDept(dept);
      reshuffled = true;
    }
    const index = bag.pop();
    if (index === undefined) return { ok: false as const, error: "That deck is empty." };
    const snap = deptSnap(index);
    if (!snap) return { ok: false as const, error: "Card missing from the deck." };
    return recordDeptPlay(state, {
      dept,
      card: { name: snap.name, type: snap.type, text: snap.text },
      bag,
      asGm,
      player,
      reshuffled,
      moneyCents: deptMoney(snap.name),
      pendingCents: pendingMoney(snap.name),
      now,
    });
  }
  if (deck !== "event" && deck !== "customer" && deck !== "house") {
    return { ok: false as const, error: "Unknown deck." };
  }
  let bag = [...state.bags[deck]];
  if (!bag.length) {
    if (deck === "event") bag = refillSimple("event");
    else return { ok: false as const, error: "That deck is empty. Reshuffle if you want to draw again." };
  }
  const index = bag.pop();
  if (index === undefined) return { ok: false as const, error: "That deck is empty." };
  const snap = faceSnap(deck, index);
  if (!snap) return { ok: false as const, error: "Card missing from the deck." };
  const parsed = cashEffect(snap.text);
  const money = deck === "event" ? parsed.immediate || eventMoney(snap.name) : null;
  return recordFace(state, deck, { name: snap.name, type: snap.type, text: snap.text }, bag, now, money);
}

export async function playerRecord(input: {
  code: string;
  playerId: string;
  playerToken: string;
  type: string;
  payload?: Record<string, unknown>;
}) {
  const code = cleanCode(input.code);
  const payload = input.payload ?? {};
  let reveal: Answer | undefined;
  const result = await commit(code, (state) => {
    const player = state.players.find((p) => p.id === input.playerId);
    if (!player || !matches(input.playerToken, player.secret)) {
      return { ok: false as const, error: "Rejoin from this phone. The session does not match." };
    }
    if (!player.active) return { ok: false as const, error: "The GM marked this seat excused." };
    const now = Date.now();
    if (input.type === "survey") {
      return playerSurvey(state, player, String(payload.phase ?? ""), payload.values);
    }
    if (input.type === "help") {
      return playerHelp(state, player, typeof payload.note === "string" ? payload.note : "");
    }
    if (input.type === "shout") {
      return playerShout(
        state,
        player,
        typeof payload.toId === "string" ? payload.toId : "",
        typeof payload.principle === "string" ? payload.principle : "",
      );
    }
    if (input.type === "feedback") return playerFeedback(state, player, payload);
    if (input.type === "answer") {
      const found = lookupPlayer(typeof payload.raw === "string" ? payload.raw : "", player.dept);
      if ("error" in found) return { ok: false as const, error: found.error };
      const full = fullByCode(found.card.code);
      const choice = choiceOf(payload.choice);
      if (!full || !choice) return { ok: false as const, error: "Choose A, B, or C." };
      const recorded = recordAnswer(state, {
        player,
        asGm: false,
        now,
        card: {
          code: full.code,
          dept: full.dept,
          title: full.title,
          choice,
          choiceText: full.options[choice],
          valueCents: full.values[choice] * 100,
          correct: full.correct,
          hostNote: full.hostNote,
        },
      });
      if (recorded.ok && "answer" in recorded) reveal = recorded.answer;
      if (!recorded.ok) return recorded;
      return { ok: true as const, state: maybeAdvance(recorded.state, now) };
    }
    if (input.type === "draw") return drawFrom(state, { deck: "dept" }, false, player, now);
    if (input.type === "deal") {
      const dealt = dealDepts(state, {}, false, player, now);
      if (!dealt.ok) return dealt;
      return { ok: true as const, state: maybeAdvance(dealt.state, now) };
    }
    if (input.type === "play") return playFrom(state, payload, false, player, now);
    if (input.type === "redeal") {
      if (!isHead(state, player.id)) return { ok: false as const, error: "Only the person up this round can re-deal." };
      return redealFrom(state, player, now);
    }
    if (input.type === "event") {
      const index = typeof payload.index === "number" ? payload.index : -1;
      const played = playEvent(state, player, index, now);
      if (!played.ok) return { ok: false as const, error: played.error };
      return { ok: true as const, state: maybeAdvance(played.state, now) };
    }
    if (input.type === "payroll") {
      const target = typeof payload.dept === "string" && isDept(payload.dept) ? payload.dept : player.dept;
      const gm = player.dept === "General Manager" && isHead(state, player.id);
      const own = target === player.dept && isHead(state, player.id);
      if (!gm && !own) {
        return { ok: false as const, error: "The GM sets payroll once, after asking the first department head." };
      }
      const annual = typeof payload.annual === "number" ? payload.annual : Number(payload.annual);
      const set = setAnnualPay(state, target, annual, now, player);
      if (!set.ok) return { ok: false as const, error: "error" in set ? set.error : "Could not set payroll." };
      return { ok: true as const, state: maybeAdvance(set.state, now) };
    }
    if (input.type === "focus") {
      if (!isHead(state, player.id)) return { ok: false as const, error: "Only the person up this round locks the two projects." };
      const ids = Array.isArray(payload.projectIds) ? payload.projectIds.filter((id): id is string => typeof id === "string") : [];
      const set = setFocusProjects(state, player.dept, ids, now, player);
      if (!set.ok) return { ok: false as const, error: "error" in set ? set.error : "Could not lock those projects." };
      return { ok: true as const, state: maybeAdvance(set.state, now) };
    }
    if (input.type === "note") {
      const saved = saveNote(state, player.id, typeof payload.text === "string" ? payload.text : "");
      if (!saved.ok) return { ok: false as const, error: "Could not save that note." };
      return { ok: true as const, state: saved.state };
    }
    if (input.type === "pass") {
      if (!isHead(state, player.id)) return { ok: false as const, error: "Only the person up this round can pass." };
      const skipped = skipCards(state, player.dept, player);
      if (!skipped.ok) return { ok: false as const, error: "error" in skipped ? skipped.error : "Could not pass." };
      return { ok: true as const, state: maybeAdvance(skipped.state, now) };
    }
    return { ok: false as const, error: "Unknown action." };
  });
  if (!result.ok) return result;
  const player = result.state.players.find((p) => p.id === input.playerId);
  if (!player) return { ok: false as const, error: "Rejoin from this phone." };
  return {
    ok: true as const,
    view: viewOf(code, result.rev, result.state, { kind: "player", player }),
    reveal,
  };
}

export async function lookupRecord(input: {
  code: string;
  raw: string;
  dept?: string;
  hostToken?: string;
  playerId?: string;
  playerToken?: string;
}) {
  const code = cleanCode(input.code);
  const row = await load(code);
  if (!row) return { ok: false as const, error: "Game not found." };
  if (input.hostToken && matches(input.hostToken, row.hostHash)) {
    const dept = input.dept && isDept(input.dept) ? input.dept : undefined;
    const found = lookupHost(input.raw, dept);
    if ("error" in found) return { ok: false as const, error: found.error };
    return { ok: true as const, role: "host" as const, card: found.card };
  }
  const player = row.state.players.find((p) => p.id === input.playerId);
  if (!player || !input.playerToken || !matches(input.playerToken, player.secret)) {
    return { ok: false as const, error: "Join the game before looking up a card." };
  }
  const found = lookupPlayer(input.raw, player.dept);
  if ("error" in found) return { ok: false as const, error: found.error };
  return { ok: true as const, role: "player" as const, card: found.card };
}

export async function catalogRecord(input: { code: string; hostToken: string }) {
  const code = cleanCode(input.code);
  const row = await load(code);
  if (!row) return { ok: false as const, error: "Game not found." };
  if (!matches(input.hostToken, row.hostHash)) return { ok: false as const, error: "Host key required." };
  return { ok: true as const, catalog: catalog() };
}
