import { createHash, randomBytes } from "node:crypto";
import { normalizePhone } from "@/lib/game/format";
import type { DeptId } from "@/lib/game/types";
import { noteClosedAttempt, seatFor } from "./admin.server";
import { lookupMetalcon, scoreMetalcon } from "./cards";
import { payrollCentsFor, viewAnswer } from "./feedback";
import { METALCON_SEATS } from "./seats";
import { getMetalconSql } from "./db.server";
import { ACTION_CARDS, actionOf, boardEffect, canonicalCardName, CUSTOMERS, customerOf, effectLine, EVENTS, eventOf, filledSlots, HOUSES, houseOf, isNegative, PIPELINE, pipelineBlock, tierValue, toCardId, type SlotPlay } from "./board";
import { computeNumbers } from "./numbers";

export const EVENT_ID = "metalcon-2026";
export const EVENT_LABEL = "The Business Machine Experience";

const SEATS = new Set<string>(METALCON_SEATS);

function hash(secret: string) {
  return createHash("sha256").update(secret).digest("hex");
}

function cleanName(raw: string) {
  return raw.replace(/\s+/g, " ").trim().slice(0, 60);
}

function seatOf(value: string): DeptId | null {
  return SEATS.has(value) ? (value as DeptId) : null;
}

async function playerBySecret(id: string, secret: string) {
  if (!id || !secret) return null;
  const sql = await getMetalconSql();
  const rows = await sql<{ id: string; name: string; dept: string; game_id: string | null }>`
    select id, name, dept, game_id from metalcon.players
    where id = ${id}
      and event_id = ${EVENT_ID}
      and (secret_hash = ${hash(secret)} or invite_token = ${secret})
    limit 1
  `;
  const player = rows[0];
  if (!player?.game_id) return null;
  const games = await sql<{ status: string }>`
    select status from metalcon.games where id = ${player.game_id} limit 1
  `;
  if (games[0]?.status !== "live") return null;
  return player;
}

export async function registerSeat(input: {
  name: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  jobTitle?: string;
  phone: string;
  email: string;
  dept: string;
  terms: boolean;
  slug: string;
}) {
  if (!input.terms) return { ok: false as const, error: "Check Beta Terms & Conditions to take a seat." };
  const firstName = cleanName(input.firstName || "");
  const lastName = cleanName(input.lastName || "");
  const company = cleanName(input.company || "");
  const jobTitle = cleanName(input.jobTitle || "");
  const name = cleanName(`${firstName} ${lastName}`.trim() || input.name);
  if (firstName.length < 1) return { ok: false as const, error: "Enter a first name." };
  if (lastName.length < 1) return { ok: false as const, error: "Enter a last name." };
  if (company.length < 1) return { ok: false as const, error: "Enter a company name." };
  if (jobTitle.length < 1) return { ok: false as const, error: "Enter a title." };
  if (name.length < 2) return { ok: false as const, error: "Enter your name." };
  const phone = normalizePhone(input.phone);
  if (!phone) return { ok: false as const, error: "Enter a 10-digit mobile number." };
  const email = input.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    return { ok: false as const, error: "Enter an email address." };
  }
  const dept = seatOf(input.dept);
  if (!dept) return { ok: false as const, error: "Choose a seat." };
  const seat = await seatFor(dept, input.slug);
  if (!seat.ok) return seat;
  if (dept === "General Manager") {
    // One GM identity per game (Game 11 #65): a second GM made by the join page split ownership of the board.
    const sqlGm = await getMetalconSql();
    const gm = await sqlGm<{ id: string }>`select id from metalcon.players where game_id = ${seat.gameId} and dept = 'General Manager' limit 1`;
    if (gm[0]) return { ok: false as const, error: "This game already has a GM. Open your GM link (or the host desk) to get back into the same GM seat." };
  }
  const id = randomBytes(8).toString("hex");
  const secret = randomBytes(18).toString("hex");
  const sql = await getMetalconSql();
  await sql`
    insert into metalcon.players (id, event_id, game_id, secret_hash, invite_token, name, first_name, last_name, company, job_title, phone, email, dept, terms_at)
    values (${id}, ${EVENT_ID}, ${seat.gameId}, ${hash(secret)}, ${secret}, ${name}, ${firstName}, ${lastName}, ${company}, ${jobTitle}, ${phone}, ${email}, ${dept}, now())
  `;
  return { ok: true as const, player: { id, secret, name, dept } };
}

export async function nextScenario(input: { id: string; secret: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const sql = await getMetalconSql();
  const used = await sql<{ card_code: string }>`select card_code from metalcon.answers where player_id = ${player.id}`;
  const usedCodes = new Set(used.map((row) => row.card_code));
  const { listForDept } = await import("./cards");
  const deck = listForDept(player.dept as DeptId).filter((card) => !usedCodes.has(card.code));
  if (!deck.length) return { ok: false as const, error: "No more cards in this deck." };
  const card = deck[Math.floor(Math.random() * deck.length)];
  return { ok: true as const, card };
}

export async function findScenario(input: { id: string; secret: string; raw: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) {
    await noteClosedAttempt(input.secret, `Card lookup ${input.raw}.`);
    return { ok: false as const, error: "Take a seat from the QR code first. If the host ended the game, this seat is closed." };
  }
  const found = lookupMetalcon(input.raw, player.dept as DeptId);
  if ("error" in found) return { ok: false as const, error: found.error };
  const sql = await getMetalconSql();
  const recent = await sql<{ n: number }>`
    select count(*)::int as n from metalcon.lookups
    where player_id = ${player.id} and created_at > now() - interval '10 minutes'
  `;
  if (Number(recent[0]?.n ?? 0) >= 15) {
    return { ok: false as const, error: "Too many cards in a short time. Play the one in front of you." };
  }
  await sql`
    insert into metalcon.lookups (id, game_id, player_id)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${player.id})
  `;
  return { ok: true as const, card: found.card, dept: player.dept };
}

async function roundRows(playerId: string, round: number) {
  const sql = await getMetalconSql();
  const rows = await sql<{ card_code: string; card_title: string; choice: string; payroll_cents: number }>`
    select card_code, card_title, choice, payroll_cents
    from metalcon.answers
    where event_id = ${EVENT_ID} and player_id = ${playerId} and round_n = ${round}
    order by created_at
  `;
  return rows
    .filter((row) => !row.card_code.toUpperCase().startsWith("BE-OW") && !row.card_code.toUpperCase().startsWith("BE-RE"))
    .map((row) => {
    const view = viewAnswer(row.card_code, row.choice);
    return {
      ...row,
      score_label: "",
      payroll_label: view?.payrollLabel ?? "",
      off_dollars: view?.offDollars ?? 0,
      added_points: view?.addedPoints ?? 0,
      points: view?.points ?? null,
    };
  });
}

export async function roundSheet(input: { id: string; secret: string; round: number }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first.", rows: [] };
  const round = Math.round(input.round);
  if (!Number.isFinite(round) || round < 1) return { ok: true as const, rows: [] };
  return { ok: true as const, rows: await roundRows(player.id, round) };
}

export async function lockScenario(input: {
  id: string;
  secret: string;
  code: string;
  choice: string;
  round: number;
}) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) {
    await noteClosedAttempt(input.secret, `Tried to lock ${input.code}.`);
    return { ok: false as const, error: "Take a seat from the QR code first. If the host ended the game, this seat is closed." };
  }
  const choice = input.choice === "A" || input.choice === "B" || input.choice === "C" ? input.choice : null;
  if (!choice) return { ok: false as const, error: "Choose A, B, or C." };
  const round = Math.round(input.round);
  if (!Number.isFinite(round) || round < 1 || round > 200) return { ok: false as const, error: "Enter the round number." };
  const card = scoreMetalcon(input.code.trim().toUpperCase());
  if (!card || card.dept !== player.dept) return { ok: false as const, error: "That card is not in this seat's deck." };
  const sql = await getMetalconSql();
  const existing = await sql<{ choice: string; payroll_cents: number; choice_text: string }>`
    select choice, payroll_cents, choice_text from metalcon.answers
    where event_id = ${EVENT_ID} and player_id = ${player.id} and round_n = ${round} and card_code = ${card.code}
    limit 1
  `;
  if (existing[0]) {
    const savedChoice = existing[0].choice === "A" || existing[0].choice === "B" || existing[0].choice === "C" ? existing[0].choice : choice;
    return {
      ok: true as const,
      duplicate: true,
      payrollCents: existing[0].payroll_cents,
      choice: savedChoice,
      choiceText: existing[0].choice_text,
      feedback: viewAnswer(card.code, savedChoice),
      rows: await roundRows(player.id, round),
    };
  }
  const payrollCents = payrollCentsFor(card.code, choice);
  const id = randomBytes(8).toString("hex");
  const meeting = await sql<{ gm_meeting: boolean; current_round: number }>`select gm_meeting, current_round from metalcon.games where id = ${player.game_id} limit 1`;
  const during = Boolean(meeting[0]?.gm_meeting);
  // Server decides what this answer is for. Every answer always counts for payroll (non-heads during the meeting included).
  const gameRound = Number(meeting[0]?.current_round ?? round) || round;
  const role = await scenarioRole(player.game_id ?? "", player.id, player.dept, gameRound);
  const purpose = round === gameRound ? role.purpose : "table";
  await sql`
    insert into metalcon.answers (
      id, event_id, game_id, player_id, round_n, dept, player_name, card_code, card_title, choice, choice_text, payroll_cents, during_meeting, purpose
    ) values (
      ${id}, ${EVENT_ID}, ${player.game_id}, ${player.id}, ${round}, ${player.dept}, ${player.name},
      ${card.code}, ${card.title}, ${choice}, ${card.options[choice]}, ${payrollCents}, ${during}, ${purpose}
    )
  `;
  let negation: { card: string; outcome: "negated" | "plays"; replacement?: string; replacementVoid?: boolean } | null = null;
  if (purpose === "negate" && role.negative && role.drawId) negation = await resolveNegative(role.drawId, player.dept, role.negative, payrollCents > 0);
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
    detail: `${card.title} ${choice}. ${direction}${purpose === "turn" ? (payrollCents > 0 ? ". Department scenario right: 3 action cards earned" : ". Department scenario wrong: next player answers") : purpose === "negate" ? (negation?.outcome === "negated" ? `. Negative ${negation.card} negated` : `. Negative ${negation?.card ?? ""} plays`) : ""}${during ? ". during GM meeting" : ""}`,
    during,
  });
  if (payrollCents !== 0) {
    const dollars = Math.abs(Math.round(payrollCents / 100)).toLocaleString("en-US");
    await raiseAlert(player.game_id ?? "", null, "scenario", `${player.name} ${payrollCents > 0 ? "took" : "added"} $${dollars} ${direction}.`, payrollCents);
  }
  await noteMargin(player.game_id ?? "");
  const roundRowsNow = await roundRows(player.id, round);
  const roundPayroll = roundRowsNow.reduce((sum, row) => sum + (row.payroll_cents < 0 ? Math.abs(row.payroll_cents) : -row.payroll_cents), 0);
  return {
    ok: true as const,
    duplicate: false,
    purpose,
    negation,
    payrollCents,
    roundPayroll,
    choice,
    choiceText: card.options[choice],
    feedback: viewAnswer(card.code, choice),
    rows: roundRowsNow,
  };
}

export async function answerLog() {
  const sql = await getMetalconSql();
  const games = await sql<{ id: string; n: number }>`
    select id, n from metalcon.games where status = 'live' order by n desc limit 1
  `;
  const game = games[0] ?? (await sql<{ id: string; n: number }>`select id, n from metalcon.games order by n desc limit 1`)[0];
  if (!game) return { ok: true as const, label: EVENT_LABEL, game: null, rows: [] };
  const rows = await sql<{
    round_n: number;
    dept: string;
    player_name: string;
    card_code: string;
    card_title: string;
    choice: string;
    payroll_cents: number;
  }>`
    select round_n, dept, player_name, card_code, card_title, choice, payroll_cents
    from metalcon.answers
    where event_id = ${EVENT_ID} and game_id = ${game.id}
    order by round_n, dept, created_at
  `;
  return {
    ok: true as const,
    label: EVENT_LABEL,
    game: game.n,
    rows: rows
      .filter((row) => !row.card_code.toUpperCase().startsWith("BE-OW") && !row.card_code.toUpperCase().startsWith("BE-RE"))
      .map((row) => {
      const view = viewAnswer(row.card_code, row.choice);
      return {
        ...row,
        score_label: "",
        payroll_label: view?.payrollLabel ?? "",
      };
    }),
  };
}

const voiceCache = new Map<string, string>();

export async function speakMale(text: string) {
  const spoken = text.replace(/\s+/g, " ").trim().slice(0, 1800);
  if (spoken.length < 2) return { ok: false as const, error: "Nothing to read." };
  const hit = voiceCache.get(spoken);
  if (hit) return { ok: true as const, audio: hit };
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false as const, error: "Read aloud is not available right now." };
  const res = await fetch("https://api.x.ai/v1/tts", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ text: spoken, voice_id: "rex", language: "en" }),
  });
  if (!res.ok) return { ok: false as const, error: "Read aloud is not available right now." };
  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length < 80) return { ok: false as const, error: "Read aloud is not available right now." };
  const audio = bytes.toString("base64");
  if (voiceCache.size > 40) voiceCache.clear();
  voiceCache.set(spoken, audio);
  return { ok: true as const, audio };
}

async function writeLedger(input: {
  gameId: string;
  playerId: string | null;
  dept: string;
  playerName: string;
  cardCode: string;
  round: number;
  projectN?: number | null;
  amountCents: number;
  kind: string;
  detail: string;
  during: boolean;
}) {
  const sql = await getMetalconSql();
  await sql`
    insert into metalcon.ledger (
      id, game_id, player_id, dept, player_name, card_code, round_n, project_n, amount_cents, kind, detail, during_meeting
    ) values (
      ${randomBytes(8).toString("hex")}, ${input.gameId}, ${input.playerId}, ${input.dept}, ${input.playerName},
      ${input.cardCode}, ${input.round}, ${input.projectN ?? null}, ${input.amountCents}, ${input.kind}, ${input.detail}, ${input.during}
    )
  `;
}

async function raiseAlert(gameId: string, playerId: string | null, kind: string, detail: string, amountCents: number) {
  const sql = await getMetalconSql();
  await sql`
    insert into metalcon.player_alerts (id, game_id, player_id, kind, detail, amount_cents)
    values (${randomBytes(8).toString("hex")}, ${gameId}, ${playerId}, ${kind}, ${detail}, ${amountCents})
  `;
}

async function loadNumbers(gameId: string) {
  const sql = await getMetalconSql();
  const game = await sql<{ company_name: string; current_round: number; fixed_cost_cents: number; fixed_cost_start_round: number; gm_meeting: boolean; base_payroll_cents: number; status: string }>`
    select company_name, current_round, fixed_cost_cents, fixed_cost_start_round, gm_meeting, base_payroll_cents, status
    from metalcon.games where id = ${gameId} limit 1
  `;
  const row = game[0];
  if (!row) return null;
  const answers = await sql<{ player_id: string; dept: string; player_name: string; card_code: string; card_title: string; round_n: number; payroll_cents: number; during_meeting: boolean }>`
    select player_id, dept, player_name, card_code, card_title, round_n, payroll_cents, during_meeting
    from metalcon.answers where game_id = ${gameId}
  `;
  const plays = await sql<{ player_id: string | null; dept: string; player_name: string; card_name: string; card_text: string; project_id: string; other_project_id: string | null; amount_cents: number; round_n: number }>`
    select player_id, dept, player_name, card_name, card_text, project_id, other_project_id, amount_cents, round_n
    from metalcon.plays where game_id = ${gameId}
  `;
  const projects = await sql<{ id: string; n: number; title: string; house: string; customer: string; value_cents: number; status: string; completed_at: string | null; finish_order: number | null; extra_slot: string | null; plus_ones: Record<string, number> }>`
    select id, n, title, house, customer, value_cents, status, completed_at, finish_order, extra_slot, plus_ones from metalcon.projects where game_id = ${gameId} order by n
  `;
  const players = await sql<{ id: string; name: string; dept: string; name_suggestion: string; name_vote: string }>`
    select id, name, dept, name_suggestion, name_vote from metalcon.players where game_id = ${gameId} order by dept, name
  `;
  const numbers = computeNumbers({
    companyName: row.company_name,
    currentRound: Number(row.current_round) || 1,
    fixedCostCents: Number(row.fixed_cost_cents) || 200000,
    fixedStartRound: Number(row.fixed_cost_start_round) || 3,
    basePayrollCents: Number(row.base_payroll_cents) || 0,
    gameEnded: row.status === "ended",
    answers,
    plays,
    projects,
    players,
  });
  return { row, numbers, players, projects };
}

async function noteMargin(gameId: string) {
  const loaded = await loadNumbers(gameId);
  if (!loaded) return;
  const sql = await getMetalconSql();
  const prior = await sql<{ last_margin_bps: number | null }>`select last_margin_bps from metalcon.games where id = ${gameId} limit 1`;
  const before = prior[0]?.last_margin_bps ?? null;
  const after = loaded.numbers.marginBps;
  if (after !== null && before !== null) {
    const crossed = (line: number, label: string) =>
      (before < line && after >= line) || (before >= line && after < line) || (before <= line && after > line) || (before > line && after <= line);
    if (crossed(3000, "30%") && Math.sign(before - 3000) !== Math.sign(after - 3000)) {
      await raiseAlert(gameId, null, "margin", `Net margin crossed 30%. It is now ${(after / 100).toFixed(1)}%.`, loaded.numbers.profitCents);
    }
    if (Math.sign(before - 5000) !== Math.sign(after - 5000)) {
      await raiseAlert(gameId, null, "margin", `Net margin crossed 50%. It is now ${(after / 100).toFixed(1)}%.`, loaded.numbers.profitCents);
    }
  }
  if (loaded.numbers.fixedCents > 0 && Number(loaded.row.current_round) >= Number(loaded.row.fixed_cost_start_round)) {
    const started = await sql<{ n: number }>`select count(*)::int as n from metalcon.player_alerts where game_id = ${gameId} and kind = 'fixed'`;
    if (Number(started[0]?.n ?? 0) === 0) {
      await raiseAlert(gameId, null, "fixed", `Fixed costs started. $2,000 a department a round from round ${loaded.row.fixed_cost_start_round}.`, -Number(loaded.row.fixed_cost_cents));
    }
  }
  await sql`update metalcon.games set last_margin_bps = ${after} where id = ${gameId}`;
}

export async function companyBoard(input: { id: string; secret: string }) {
  try {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const loaded = await loadNumbers(player.game_id ?? "");
  if (!loaded) return { ok: false as const, error: "This game is not open." };
  const sql = await getMetalconSql();
  const [alerts, ledger] = await Promise.all([
    sql<{ id: string; kind: string; detail: string; amount_cents: number; created_at: string }>`
      select id, kind, detail, amount_cents, created_at from metalcon.player_alerts
      where game_id = ${player.game_id} and (player_id is null or player_id = ${player.id})
      order by created_at desc limit 12
    `,
    sql<{ id: string; card_code: string; round_n: number; amount_cents: number; kind: string; detail: string; during_meeting: boolean; created_at: string }>`
      select id, card_code, round_n, amount_cents, kind, detail, during_meeting, created_at
      from metalcon.ledger where game_id = ${player.game_id} and player_id = ${player.id}
      order by created_at desc
    `,
  ]);
  const people = dedupePlayers(loaded.players);
  const filled = [...new Set(people.map((row) => row.dept))].filter((dept) => dept !== "General Manager" && dept !== "Owner" && dept !== "Recruiting");
  const named = people.filter((row) => row.name_suggestion);
  const byName = new Map<string, { id: string; suggestion: string; votes: number; ids: string[] }>();
  for (const row of named) {
    const key = row.name_suggestion.trim();
    const bucket = byName.get(key) ?? { id: row.id, suggestion: key, votes: 0, ids: [] };
    bucket.ids.push(row.id);
    byName.set(key, bucket);
  }
  for (const vote of loaded.players) {
    if (!vote.name_vote) continue;
    for (const bucket of byName.values()) {
      if (bucket.ids.includes(vote.name_vote)) bucket.votes += 1;
    }
  }
  const suggestions = [...byName.values()].sort((a, b) => b.votes - a.votes || a.suggestion.localeCompare(b.suggestion));
  const myVote = loaded.players.find((row) => row.id === player.id)?.name_vote ?? "";
  const myVoteId = suggestions.find((row) => row.ids.includes(myVote))?.id ?? "";
  const [attendees, prompts, turnRow, ackRow, answeredRow, modeRow, draw] = await Promise.all([
    roster(player.game_id ?? "", loaded.row.current_round),
    promptsFor(player.game_id ?? ""),
    sql<{ turn_dept: string }>`select turn_dept from metalcon.games where id = ${player.game_id} limit 1`,
    sql<{ meeting_ack_round: number }>`select meeting_ack_round from metalcon.players where id = ${player.id} limit 1`,
    sql<{ n: number }>`select count(*)::int as n from metalcon.answers where game_id = ${player.game_id} and player_id = ${player.id} and round_n = ${Number(loaded.row.current_round) || 1}`,
    sql<{ action_mode: string }>`select action_mode from metalcon.games where id = ${player.game_id} limit 1`,
    ensureDraw(player.game_id ?? "", player.id, loaded.row.current_round),
  ]);
  const top = suggestions[0]?.votes ?? 0;
  const tiedNames = suggestions.filter((row) => row.votes === top && top > 0);
  const tied = tiedNames.length > 1 && !loaded.numbers.companyName;
  return {
    ok: true as const,
    companyName: loaded.numbers.companyName,
    meeting: loaded.row.gm_meeting,
    numbers: loaded.numbers,
    alerts,
    ledger,
    projects: loaded.projects,
    suggestions,
    myVoteId,
    tiedNames: tiedNames.map((row) => ({ name: row.suggestion, votes: row.votes, id: row.id })),
    mine: loaded.players.find((row) => row.id === player.id) ?? null,
    voting: suggestions.length > 0 && !loaded.numbers.companyName,
    tie: tied,
    houses: HOUSES.map((card) => ({ id: card.id, name: card.name })),
    customers: CUSTOMERS.map((card) => ({ id: card.id, name: card.name })),
    values: [10000, 20000, 30000],
    actions: ACTION_CARDS.map((card) => ({ id: card.id, name: card.name, dept: card.dept, text: card.text })),
    events: EVENTS.map((card) => ({ id: card.id, name: card.name })),
    attendees,
    atMeeting: attendees.some((row) => row.player_id === player.id),
    prompts,
    players: loaded.players.map((row) => ({ id: row.id, name: row.name, dept: row.dept })),
    currentRound: Number(loaded.row.current_round) || 1,
    turnDept: turnRow[0]?.turn_dept ?? "",
    meetingAck: Number(ackRow[0]?.meeting_ack_round ?? 0),
    answeredThisRound: Number(answeredRow[0]?.n ?? 0) > 0,
    actionMode: modeRow[0]?.action_mode ?? "digital",
    draw,
    pending: player.dept === "General Manager" ? await pendingPicks(player.game_id ?? "") : [],
    // Every play on the board (all count instantly). Name kept for client compatibility.
    pendingPlays: await sql<{ id: string; card_name: string; card_text: string; dept: string; player_name: string; player_id: string | null; n: number; customer: string; house: string; status: string; project_id: string; other_project_id: string | null; round_n: number; created_at: string }>`
      select pl.id, pl.card_name, pl.card_text, pl.dept, pl.player_name, pl.player_id, p.n, p.customer, p.house, 'confirmed' as status, pl.project_id, pl.other_project_id, pl.round_n, pl.created_at
      from metalcon.plays pl join metalcon.projects p on p.id = pl.project_id
      where pl.game_id = ${player.game_id}
      order by pl.created_at desc
    `,
        recentPlays: player.dept === "General Manager" ? await recentPlays(player.game_id ?? "") : [],
    myPlays: await myPlays(player.game_id ?? "", player.id),
    focus: await focusFor(player.game_id ?? "", player.dept === "General Manager" ? "" : player.dept, loaded.row.current_round),
    allFocus: player.dept === "General Manager" ? await allFocus(player.game_id ?? "", loaded.row.current_round) : [],
    ...(await boardExtras(player, loaded, turnRow[0]?.turn_dept ?? "", attendees)),
  };
  } catch (err) {
    return { ok: false as const, error: err instanceof Error ? err.message : "Could not open the board." };
  }
}

async function boardExtras(
  player: { id: string; name: string; dept: string; game_id: string | null },
  loaded: NonNullable<Awaited<ReturnType<typeof loadNumbers>>>,
  turnDept: string,
  attendees: { dept: string; player_id: string; name: string }[],
) {
  const gameId = player.game_id ?? "";
  const round = Number(loaded.row.current_round) || 1;
  const isGm = player.dept === "General Manager";
  const myHead = attendees.find((row) => row.dept === player.dept);
  const [turn, role, plays, projects, gameRow] = await Promise.all([
    turnDept ? turnState(gameId, turnDept, round) : Promise.resolve(null),
    isGm ? Promise.resolve(null) : scenarioRole(gameId, player.id, player.dept, round),
    gamePlays(gameId),
    gameProjects(gameId),
    getMetalconSql().then((sql) => sql<{ slug: string | null; n: number }>`select slug, n from metalcon.games where id = ${gameId} limit 1`),
  ]);
  const projectSlots = projects.map((project) => {
    const slots = slotsFor(project, plays);
    return {
      id: project.id, n: project.n, status: project.status, ready: project.status === "open" && slots.ready,
      totalNeed: slots.totalNeed, totalFilled: slots.totalFilled, need: slots.need, filled: slots.filled, outstanding: slots.outstanding, reasons: slots.reasons,
      locks: Object.fromEntries(PIPELINE.map((dept) => [dept, pipelineBlock(project, plays as SlotPlay[], dept)])),
    };
  });
  const closeReady = isGm
    ? (await Promise.all(projectSlots.filter((row) => row.ready).map((row) => closePreview(gameId, row.id).then((preview) => preview ? { projectId: row.id, ...preview } : null)))).filter(Boolean)
    : [];
  return {
    isHead: Boolean(myHead && myHead.player_id === player.id),
    myHeadName: myHead?.name ?? "",
    scenarioPurpose: role?.purpose ?? "table",
    scenarioNegative: role?.negative ?? "",
    turn,
    projectSlots,
    closeReady: closeReady as { projectId: string; n: number; totalCents: number; lines: string[] }[],
    joinPath: gameRow[0]?.slug ? `/soebld/join/${gameRow[0].slug}` : "",
    gameNumber: Number(gameRow[0]?.n ?? 0),
  };
}

function dedupePlayers<T extends { id: string; name: string; dept: string; name_suggestion?: string }>(rows: T[]) {
  const seen = new Set<string>();
  const kept: T[] = [];
  for (const row of rows) {
    const key = `${row.dept}|${row.name.trim().toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    kept.push(row);
  }
  return kept;
}

export async function suggestCompany(input: { id: string; secret: string; name: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const name = input.name.replace(/\s+/g, " ").trim().slice(0, 40);
  if (name.length < 2) return { ok: false as const, error: "Enter a company name." };
  const sql = await getMetalconSql();
  await sql`update metalcon.players set name_suggestion = ${name} where id = ${player.id}`;
  return { ok: true as const };
}

export async function voteCompany(input: { id: string; secret: string; choiceId: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const sql = await getMetalconSql();
  const game = await sql<{ company_name: string }>`select company_name from metalcon.games where id = ${player.game_id} limit 1`;
  if (game[0]?.company_name) return { ok: false as const, error: "The GM already picked the winner." };
  const choice = await sql<{ id: string; name_suggestion: string; game_id: string; dept: string }>`
    select id, name_suggestion, game_id, dept from metalcon.players where id = ${input.choiceId} limit 1
  `;
  if (!choice[0] || choice[0].game_id !== player.game_id || !choice[0].name_suggestion) {
    return { ok: false as const, error: "That name is not in the vote." };
  }
  await sql`update metalcon.players set name_vote = ${input.choiceId} where id = ${player.id}`;
  await settleName(player.game_id ?? "");
  return { ok: true as const };
}

async function settleName(gameId: string) {
  const sql = await getMetalconSql();
  const players = await sql<{ id: string; name: string; name_suggestion: string; name_vote: string; dept: string }>`
    select id, name, name_suggestion, name_vote, dept from metalcon.players where game_id = ${gameId}
  `;
  const people = dedupePlayers(players);
  const filled = [...new Set(people.map((row) => row.dept))];
  if (!filled.length || filled.some((dept) => !people.some((row) => row.dept === dept && row.name_suggestion && row.name_vote))) return;
  const counts = new Map<string, number>();
  for (const row of players) counts.set(row.name_vote, (counts.get(row.name_vote) ?? 0) + 1);
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  if (!ranked[0] || (ranked[1] && ranked[1][1] === ranked[0][1])) return;
  const winner = players.find((row) => row.id === ranked[0][0]);
  if (!winner) return;
  await sql`update metalcon.games set company_name = ${winner.name_suggestion} where id = ${gameId} and company_name = ''`;
}

export async function breakTie(input: { id: string; secret: string; choiceId: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can break a tie." };
  const sql = await getMetalconSql();
  const choice = await sql<{ name_suggestion: string }>`select name_suggestion from metalcon.players where id = ${input.choiceId} and game_id = ${player.game_id} limit 1`;
  if (!choice[0]?.name_suggestion) return { ok: false as const, error: "That name is not in the vote." };
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
    during: false,
  });
  return { ok: true as const };
}

export async function restartVote(input: { id: string; secret: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can restart the vote." };
  const sql = await getMetalconSql();
  await sql`update metalcon.players set name_suggestion = '', name_vote = '' where game_id = ${player.game_id}`;
  await sql`update metalcon.games set company_name = '' where id = ${player.game_id}`;
  await writeLedger({
    gameId: player.game_id ?? "", playerId: player.id, dept: player.dept, playerName: player.name,
    cardCode: "company-name", round: 0, amountCents: 0, kind: "name",
    detail: "GM restarted the company name vote.", during: false,
  });
  return { ok: true as const };
}

export async function setCompanyName(input: { id: string; secret: string; name: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can set the company name." };
  const name = input.name.replace(/\s+/g, " ").trim().slice(0, 40);
  if (name.length < 2) return { ok: false as const, error: "Enter a company name." };
  const sql = await getMetalconSql();
  await sql`update metalcon.games set company_name = ${name} where id = ${player.game_id}`;
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
    during: false,
  });
  return { ok: true as const };
}

export async function setMeeting(input: { id: string; secret: string; on: boolean; round: number }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can open the meeting." };
  const round = Math.max(1, Math.round(input.round) || 1);
  const sql = await getMetalconSql();
  const before = await sql<{ current_round: number }>`select current_round from metalcon.games where id = ${player.game_id} limit 1`;
  await sql`update metalcon.games set gm_meeting = ${input.on}, current_round = ${round}, turn_dept = 'Marketing' where id = ${player.game_id}`;
  if (round > Number(before[0]?.current_round ?? 1)) {
    const perDept = 3200;
    await raiseAlert(player.game_id ?? "", null, "round", `Round ${round} started. Payroll $${(perDept * 5).toLocaleString("en-US")} charged.${round >= 3 ? " Fixed cost $2,000 starts." : ""}`, perDept * 5 * 100);
  }
  await refreshInsights(player.game_id ?? "");
  return { ok: true as const, round };
}

export async function setProjectSlot(input: { id: string; secret: string; n: number; house: string; customer: string; status: string; extraSlot?: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can set a project." };
  const n = Math.round(Number(input.n));
  if (n < 1 || n > 9) return { ok: false as const, error: "Project must be 1 to 9." };
  const status = input.status === "complete" || input.status === "completed" ? "complete" : input.status === "open" || input.status === "opened" ? "open" : "unopened";
  const house = input.house.trim();
  const customer = input.customer.trim();
  if (status !== "unopened") {
    if (!houseOf(toCardId(house) ?? house)) return { ok: false as const, error: "Choose a house card." };
    if (!customerOf(toCardId(customer) ?? customer)) return { ok: false as const, error: "Choose a customer card." };
  }
  const sql = await getMetalconSql();
  const existing = await sql<{ id: string; status: string }>`select id, status from metalcon.projects where game_id = ${player.game_id} and n = ${n} limit 1`;
  const value = tierValue(n) * 100;
  const completedAt = status === "complete" ? new Date().toISOString() : null;
  const revealed = Boolean(house && customer);
  const hasRevealed = await sql<{ n: number }>`
    select count(*)::int as n from information_schema.columns
    where table_schema = 'metalcon' and table_name = 'projects' and column_name = 'revealed'
  `;
  const extraSlot = (input.extraSlot ?? "").trim();
  if (existing[0]) {
    if (Number(hasRevealed[0]?.n)) {
      await sql`
        update metalcon.projects
        set house = ${house}, customer = ${customer}, status = ${status}, value_cents = ${value},
            completed_at = ${completedAt}, revealed = ${revealed}, extra_slot = ${extraSlot}
        where id = ${existing[0].id}
      `;
    } else {
      await sql`
        update metalcon.projects
        set house = ${house}, customer = ${customer}, status = ${status}, value_cents = ${value},
            completed_at = ${completedAt}
        where id = ${existing[0].id}
      `;
    }
  } else {
    const id = randomBytes(8).toString("hex");
    if (Number(hasRevealed[0]?.n)) {
      await sql`
        insert into metalcon.projects (id, game_id, n, title, house, customer, value_cents, status, completed_at, revealed, extra_slot)
        values (${id}, ${player.game_id}, ${n}, ${`Project ${n}`}, ${house}, ${customer}, ${value}, ${status}, ${completedAt}, ${revealed}, ${extraSlot})
      `;
    } else {
      await sql`
        insert into metalcon.projects (id, game_id, n, title, house, customer, value_cents, status, completed_at)
        values (${id}, ${player.game_id}, ${n}, ${`Project ${n}`}, ${house}, ${customer}, ${value}, ${status}, ${completedAt})
      `;
    }
  }
  const label = status === "complete" ? "completed" : status === "open" ? "opened" : "not opened";
  await writeLedger({
    gameId: player.game_id ?? "", playerId: player.id, dept: player.dept, playerName: player.name,
    cardCode: "project-slot", round: 0, projectN: n, amountCents: 0, kind: "project",
    detail: `GM set Project ${n} to ${label}${house ? ` · house ${house}` : ""}${customer ? ` · customer ${customer}` : ""}.`, during: false,
  });
  if (status === "complete") {
    await raiseAlert(player.game_id ?? "", null, "project", `Project ${n} finished. $${tierValue(n).toLocaleString("en-US")} base.`, value);
  }
  await noteMargin(player.game_id ?? "");
  await refreshInsights(player.game_id ?? "");
  return { ok: true as const, n, status };
}

export async function openProject(input: { id: string; secret: string; house: string; customer: string; value: number }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can open a project." };
  if (!houseOf(toCardId(input.house) ?? input.house)) return { ok: false as const, error: "Choose a house card." };
  if (!customerOf(toCardId(input.customer) ?? input.customer)) return { ok: false as const, error: "Choose a customer card." };
  const sql = await getMetalconSql();
  const max = await sql<{ n: number }>`select coalesce(max(n), 0)::int as n from metalcon.projects where game_id = ${player.game_id}`;
  const n = Number(max[0]?.n ?? 0) + 1;
  const same = await sql<{ n: number }>`select n from metalcon.projects where game_id = ${player.game_id} and house = ${input.house} and customer = ${input.customer} limit 1`;
  if (same[0]) return { ok: false as const, error: `Project ${same[0].n} is already that house and customer. Open a different one.` };
  const value = tierValue(n);
  const id = randomBytes(8).toString("hex");
  await sql`
    insert into metalcon.projects (id, game_id, n, title, house, customer, value_cents, status)
    values (${id}, ${player.game_id}, ${n}, ${`Project ${n}`}, ${input.house}, ${input.customer}, ${value * 100}, 'open')
  `;
  return { ok: true as const, n };
}

export async function playAction(input: { id: string; secret: string; projectId: string; otherProjectId?: string; cardName: string; round: number }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can enter a board action." };
  const card = actionOf(toCardId(input.cardName) ?? input.cardName);
  if (!card) return { ok: false as const, error: "Choose an action card." };
  const sql = await getMetalconSql();
  const project = await sql<{ id: string; n: number; status: string; customer: string; house: string }>`
    select id, n, status, customer, house from metalcon.projects where id = ${input.projectId} and game_id = ${player.game_id} limit 1
  `;
  if (!project[0] || project[0].status !== "open") return { ok: false as const, error: "Choose an open project." };
  const order = ["Marketing", "Appointment Center", "Sales", "Production", "Accounting"];
  const deptIndex = order.indexOf(card.dept);
  if (deptIndex > 0) {
    const prior = order[deptIndex - 1];
    const unlocked = await sql<{ n: number }>`
      select count(*)::int as n from metalcon.plays where project_id = ${project[0].id} and dept = ${prior}
    `;
    if (Number(unlocked[0]?.n ?? 0) === 0) {
      return { ok: false as const, error: `${card.dept} cannot play on this project until ${prior} has unlocked it.` };
    }
  }
  const effect = boardEffect(card);
  const other = input.otherProjectId
    ? (await sql<{ id: string; n: number; customer: string; status: string }>`select id, n, customer, status from metalcon.projects where id = ${input.otherProjectId} and game_id = ${player.game_id} limit 1`)[0]
    : null;
  if ((effect.kind === "move" || effect.kind === "token" && effect.count > 1) && other && other.status !== "open") {
    return { ok: false as const, error: "The second project has to be open." };
  }
  const amount = effect.cashCents;
  const round = Math.max(1, Math.round(input.round) || 1);
  const label = other
    ? `Project ${project[0].n} (${project[0].customer}) and Project ${other.n} (${other.customer})`
    : `Project ${project[0].n} (${project[0].customer})`;
  const words = effectLine(card.name, label);
  await sql`
    insert into metalcon.plays (id, game_id, project_id, other_project_id, round_n, player_id, dept, player_name, card_name, card_text, amount_cents)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${project[0].id}, ${other?.id ?? null}, ${round}, ${player.id}, ${card.dept}, ${player.name}, ${card.name}, ${card.text}, ${amount})
  `;
  if (/Kim/i.test(project[0].customer) && effect.token === "star") {
    const next = await sql<{ id: string; n: number; customer: string }>`
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
        gameId: player.game_id ?? "", playerId: player.id, dept: "Marketing", playerName: player.name,
        cardCode: "Kim star", round, projectN: next[0].n, amountCents: 0, kind: "action",
        detail: `Kim Family: +1 lead star on Project ${next[0].n} (${next[0].customer})`, during: true,
      });
    }
  }
  await writeLedger({
    gameId: player.game_id ?? "", playerId: player.id, dept: card.dept, playerName: player.name,
    cardCode: card.name, round, projectN: project[0].n, amountCents: amount, kind: "action", detail: words, during: true,
  });
  await raiseAlert(player.game_id ?? "", null, "action", words, amount);
  await noteMargin(player.game_id ?? "");
  await refreshInsights(player.game_id ?? "");
  return { ok: true as const, words };
}

export async function finishProject(input: { id: string; secret: string; projectId: string; override?: boolean }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can finish a project." };
  const sql = await getMetalconSql();
  const project = await sql<{ id: string; n: number; title: string; house: string; customer: string; value_cents: number; status: string; extra_slot: string | null; plus_ones: Record<string, number> }>`
    select id, n, title, house, customer, value_cents, status, extra_slot, plus_ones from metalcon.projects where id = ${input.projectId} and game_id = ${player.game_id} limit 1
  `;
  if (!project[0] || project[0].status === "complete") return { ok: false as const, error: "That project is already finished." };
  const plays = await gamePlays(player.game_id ?? "");
  const slots = filledSlots(project[0], plays as SlotPlay[]);
  const missing = Object.entries(slots.outstanding).map(([dept, count]) => `${dept} needs ${count}`);
  if (missing.length && !input.override) return { ok: false as const, error: `Not finished: ${missing.join("; ")}. Override to finish anyway.`, missing };
  const preview = await closePreview(player.game_id ?? "", project[0].id);
  const done = await sql<{ n: number }>`select count(*)::int as n from metalcon.projects where game_id = ${player.game_id} and status = 'complete'`;
  await sql`update metalcon.projects set status = 'complete', completed_at = now(), finish_order = coalesce(finish_order, ${Number(done[0]?.n ?? 0) + 1}) where id = ${project[0].id}`;
  if (input.override && missing.length) {
    await writeLedger({
      gameId: player.game_id ?? "", playerId: player.id, dept: player.dept, playerName: player.name,
      cardCode: "finish-override", round: 0, projectN: project[0].n, amountCents: 0, kind: "override",
      detail: `GM finished Project ${project[0].n} with tokens missing: ${missing.join("; ")}.`, during: true,
    });
  }
  const loaded = await loadNumbers(player.game_id ?? "");
  const proj = loaded?.numbers.projects.find((item) => item.n === project[0].n);
  const revenue = proj?.revenueCents ?? tierValue(project[0].n) * 100;
  const dollars = Math.round(revenue / 100).toLocaleString("en-US");
  await raiseAlert(player.game_id ?? "", null, "project", `Project ${project[0].n} finished. $${dollars} revenue.`, revenue);
  await noteMargin(player.game_id ?? "");
  await refreshInsights(player.game_id ?? "");
  return { ok: true as const, missing, payout: preview };
}

export async function endGameFromGm(input: { id: string; secret: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can end the game." };
  const sql = await getMetalconSql();
  await sql`update metalcon.games set status = 'ended', ended_at = now() where id = ${player.game_id}`;
  await raiseAlert(player.game_id ?? "", null, "ended", "Game ended. O'Brien pays to the last finished project.", 0);
  return { ok: true as const };
}

export async function setFinishOrder(input: { id: string; secret: string; projectIds: string[] }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "Accounting") return { ok: false as const, error: "Only Accounting can set the close order." };
  const sql = await getMetalconSql();
  const projects = await sql<{ id: string; n: number; status: string }>`
    select id, n, status from metalcon.projects where game_id = ${player.game_id} and id = any(${input.projectIds})
  `;
  if (!projects.length) return { ok: false as const, error: "That project is not in this game." };
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    if (project.status !== "complete") {
      await sql`update metalcon.projects set status = 'complete', completed_at = now(), finish_order = ${i + 1} where id = ${project.id} and game_id = ${player.game_id}`;
      const loaded = await loadNumbers(player.game_id ?? "");
      const revenue = loaded?.numbers.projects.find((item) => item.n === project.n)?.revenueCents ?? tierValue(project.n) * 100;
      const dollars = Math.round(revenue / 100).toLocaleString("en-US");
      await raiseAlert(player.game_id ?? "", null, "project", `Project ${project.n} finished. $${dollars} revenue.`, revenue);
    } else {
      await sql`update metalcon.projects set finish_order = ${i + 1} where id = ${project.id} and game_id = ${player.game_id}`;
    }
  }
  await noteMargin(player.game_id ?? "");
  await refreshInsights(player.game_id ?? "");
  return { ok: true as const };
}

const BOARD_DEPTS = ["Marketing", "Appointment Center", "Sales", "Production", "Accounting"];

async function roster(gameId: string, round: number) {
  const sql = await getMetalconSql();
  const players = await sql<{ id: string; name: string; dept: string; created_at: string }>`
    select id, name, dept, created_at from metalcon.players where game_id = ${gameId} and dept = any(${BOARD_DEPTS}) order by created_at
  `;
  const swaps = await sql<{ dept: string; player_id: string }>`
    select dept, player_id from metalcon.attendees where game_id = ${gameId} and round_n = ${round}
  `;
  return BOARD_DEPTS.map((dept) => {
    const group = players.filter((row) => row.dept === dept).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    const swapped = swaps.find((row) => row.dept === dept);
    const idx = (Math.max(1, round) - 1) % Math.max(1, group.length);
    const pick = swapped ? group.find((row) => row.id === swapped.player_id) ?? group[idx] : group[idx];
    return { dept, player_id: pick?.id ?? "", name: pick?.name ?? "Open seat", swapped: Boolean(swapped) };
  });
}

export async function swapAttendee(input: { id: string; secret: string; round: number; dept: string; playerId: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can swap an attendee." };
  const sql = await getMetalconSql();
  await sql`delete from metalcon.attendees where game_id = ${player.game_id} and round_n = ${input.round} and dept = ${input.dept}`;
  await sql`
    insert into metalcon.attendees (id, game_id, round_n, dept, player_id, swapped)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${input.round}, ${input.dept}, ${input.playerId}, true)
  `;
  await writeLedger({
    gameId: player.game_id ?? "", playerId: player.id, dept: input.dept, playerName: player.name,
    cardCode: "meeting-swap", round: input.round, amountCents: 0, kind: "meeting",
    detail: `GM swapped the ${input.dept} meeting seat.`, during: true,
  });
  return { ok: true as const };
}

export async function dealCards(input: { id: string; secret: string; round: number }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const sql = await getMetalconSql();
  const game = await sql<{ current_round: number; turn_dept: string }>`select current_round, turn_dept from metalcon.games where id = ${player.game_id} limit 1`;
  const round = Number(game[0]?.current_round ?? 1);
  const { headId } = await deptGroup(player.game_id ?? "", player.dept, round);
  if (headId !== player.id) return { ok: false as const, error: "Only the Department Head deals the action cards." };
  if (game[0]?.turn_dept !== player.dept) return { ok: false as const, error: `Cards are dealt on your department's turn. It's ${game[0]?.turn_dept || "the GM"}'s turn now.` };
  // Rule (Game 11 #8/#23): cards are earned only by a RIGHT answer on the department scenario.
  const role = await scenarioRole(player.game_id ?? "", player.id, player.dept, round);
  if (!role.earned) return { ok: false as const, error: "Answer your department's scenario right first. A right answer earns the 3 action cards." };
  const existing = await currentDraw(player.game_id ?? "", player.id, round);
  if (existing) return { ok: true as const, cards: existing.cards };
  const deck = ACTION_CARDS.filter((card) => card.dept === player.dept);
  if (deck.length < 3) return { ok: false as const, error: "This department has no action deck." };
  // f29z.8 forced Accounting to the same 3 cards every round (a leftover test line). Deals are random for every department.
  const dealt = [...deck].sort(() => Math.random() - 0.5).slice(0, 3).map((card) => card.name);
  await sql`
    insert into metalcon.draws (id, game_id, round_n, dept, player_id, cards)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${round}, ${player.dept}, ${player.id}, ${JSON.stringify(dealt)}::jsonb)
  `;
  const negatives = dealt.filter((card) => isNegative(card));
  await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept: player.dept, playerName: player.name, cardCode: dealt.join(", "), round, amountCents: 0, kind: "dealt", detail: `${player.name} was dealt ${dealt.join(", ")}${negatives.length ? `. Negative: ${negatives.join(", ")} (answer a scenario to try to negate it)` : ""}.`, during: true });
  return { ok: true as const, cards: dealt };
}

export async function undoAction(input: { id: string; secret: string; playId: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can undo an action." };
  const sql = await getMetalconSql();
  const play = await sql<{ id: string; card_name: string; project_id: string; player_id: string | null; round_n: number; dept: string }>`
    select id, card_name, project_id, player_id, round_n, dept from metalcon.plays where id = ${input.playId} and game_id = ${player.game_id} limit 1
  `;
  if (!play[0]) return { ok: false as const, error: "That action is already gone." };
  await sql`delete from metalcon.plays where id = ${input.playId}`;
  // Undo hands the card back to the department so it can be placed again (Remove discards it).
  if (play[0].player_id) {
    const draws = await sql<{ id: string; placed: string[] }>`select id, placed from metalcon.draws where game_id = ${player.game_id} and player_id = ${play[0].player_id} and round_n = ${play[0].round_n} order by created_at desc limit 1`;
    if (draws[0]) {
      const placed = [...(draws[0].placed ?? [])];
      const at = placed.indexOf(play[0].card_name);
      if (at >= 0) placed.splice(at, 1);
      await sql`update metalcon.draws set placed = ${JSON.stringify(placed)}::jsonb, played = ${JSON.stringify(placed)}::jsonb, tokens_done = false where id = ${draws[0].id}`;
    }
  }
  await writeLedger({
    gameId: player.game_id ?? "", playerId: player.id, dept: "General Manager", playerName: player.name,
    cardCode: play[0].card_name, round: 0, amountCents: 0, kind: "undo",
    detail: `GM undid ${play[0].card_name}; it went back to ${play[0].dept}'s hand.`, during: true,
  });
  await refreshInsights(player.game_id ?? "");
  return { ok: true as const };
}

export async function setFocus(input: { id: string; secret: string; round: number; dept: string; projectIds: string[] }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const sql = await getMetalconSql();
  const game = await sql<{ current_round: number }>`select current_round from metalcon.games where id = ${player.game_id} limit 1`;
  const round = input.round > 0 ? input.round : Number(game[0]?.current_round ?? 1);
  const isGm = player.dept === "General Manager";
  const dept = isGm ? input.dept : player.dept;
  if (!PIPELINE.includes(dept as never)) return { ok: false as const, error: "Choose a department." };
  if (!isGm) {
    // Johnny (Nov 17, #48b): each department sets its own 2 focus projects; the GM can override.
    const { headId } = await deptGroup(player.game_id ?? "", dept, round);
    if (headId !== player.id) return { ok: false as const, error: "Your Department Head sets your focus projects." };
  }
  const ids = [...new Set(input.projectIds.filter(Boolean))].slice(0, 2);
  const projects = await gameProjects(player.game_id ?? "");
  const plays = await gamePlays(player.game_id ?? "");
  const open = projects.filter((row) => row.status === "open" && !slotsFor(row, plays).ready);
  const need = Math.min(2, open.length);
  if (ids.length !== need || need === 0) return { ok: false as const, error: need === 0 ? "No unfinished project is open." : need === 1 ? "Pick the one open project." : "Pick two focus projects." };
  if (ids.some((id) => !open.some((row) => row.id === id))) return { ok: false as const, error: "Finished or ready-to-close projects can't be focus projects." };
  await sql`delete from metalcon.focus where game_id = ${player.game_id} and round_n = ${round} and dept = ${dept}`;
  for (const projectId of ids) {
    await sql`
      insert into metalcon.focus (id, game_id, round_n, dept, project_id)
      values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${round}, ${dept}, ${projectId})
    `;
  }
  await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept, playerName: player.name, cardCode: "focus", round, amountCents: 0, kind: "focus", detail: `${isGm ? "GM" : player.name} set ${dept} focus: ${ids.map((id) => `P${projects.find((p) => p.id === id)?.n}`).join(", ")}.`, during: true });
  return { ok: true as const, round, dept };
}

export async function placeCard(input: { id: string; secret: string; cardName: string; projectId: string; otherProjectId?: string; round: number }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const card = actionOf(toCardId(input.cardName) ?? input.cardName);
  if (!card || card.dept !== player.dept) return { ok: false as const, error: "That card is not in your deck." };
  const sql = await getMetalconSql();
  const game = await sql<{ current_round: number; turn_dept: string; action_mode: string }>`select current_round, turn_dept, action_mode from metalcon.games where id = ${player.game_id} limit 1`;
  const round = Number(game[0]?.current_round ?? 1);
  if (game[0]?.turn_dept !== player.dept) return { ok: false as const, error: `It's ${game[0]?.turn_dept || "the GM"}'s turn.` };
  const draw = await currentDraw(player.game_id ?? "", player.id, round);
  if (!draw) return { ok: false as const, error: "Deal your 3 cards first." };
  const rules = drawRules(draw);
  if (rules.unresolved.length) return { ok: false as const, error: `Answer a scenario for the negative card ${rules.unresolved[0]} first.` };
  if (!rules.playable.includes(card.name) || draw.placed.includes(card.name)) return { ok: false as const, error: "That card isn't in your hand to play." };
  if (rules.left <= 0) return { ok: false as const, error: "You already played your cards this round." };
  if (rules.must.length >= rules.left && !rules.must.includes(card.name)) return { ok: false as const, error: `${rules.must.join(" and ")} must play (the negation scenario was missed).` };
  const effect = boardEffect(card);
  const markPlaced = async () => {
    const placed = [...draw.placed, card.name];
    await sql`update metalcon.draws set placed = ${JSON.stringify(placed)}::jsonb, played = ${JSON.stringify(placed)}::jsonb where id = ${draw.id}`;
  };
  if (effect.kind === "draw") {
    const deck = ACTION_CARDS.filter((c) => c.dept === player.dept && !draw.cards.includes(c.name)).map((c) => c.name);
    const drawn = [...deck].sort(() => Math.random() - 0.5).slice(0, effect.count);
    const cards = [...draw.cards, ...drawn];
    const negation = { ...draw.negation };
    // Campaign Refresh: "NEGATIVES DON'T PLAY."
    for (const name of drawn) negation[name] = isNegative(name) ? "void" : "drawn";
    await sql`update metalcon.draws set cards = ${JSON.stringify(cards)}::jsonb, negation = ${JSON.stringify(negation)}::jsonb where id = ${draw.id}`;
    await markPlaced();
    await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept: player.dept, playerName: player.name, cardCode: card.name, round, amountCents: 0, kind: "placed", detail: `${card.name}: drew ${drawn.join(", ")}.`, during: true });
    const moved = await advanceIfDone(player.game_id ?? "", player.dept, round, player);
    return { ok: true as const, words: `${card.name}: drew ${drawn.join(", ")}`, playId: "", moved };
  }
  const projects = await gameProjects(player.game_id ?? "");
  const plays = await gamePlays(player.game_id ?? "");
  const focus = await focusIds(player.game_id ?? "", player.dept, round);
  const needsProject = !(effect.kind === "cash" && !effect.token) && effect.kind !== "none";
  const project = projects.find((row) => row.id === input.projectId);
  if (needsProject || input.projectId) {
    const block = targetBlock(project, plays, player.dept, focus, { ignoreFocus: isNegative(card.name) });
    if (block) return { ok: false as const, error: block };
  }
  const other = input.otherProjectId ? projects.find((row) => row.id === input.otherProjectId) : undefined;
  if (effect.kind === "move" && !other) return { ok: false as const, error: "Pick the project the token moves to." };
  if (other) {
    const block = targetBlock(other, plays, player.dept, focus, { ignoreFocus: true });
    if (block) return { ok: false as const, error: `Second project: ${block}` };
  }
  const target = project ?? projects.find((row) => row.status === "open");
  if (!target) return { ok: false as const, error: "Choose an open project." };
  const amount = effect.cashCents;
  const playId = randomBytes(8).toString("hex");
  const label = other ? `Project ${target.n} and Project ${other.n}` : `Project ${target.n}`;
  const words = `${card.name}: ${effect.words.replace(`${card.name}: `, "")} on ${label}`;
  // Instant: the play counts the moment it's placed. The GM fixes it with Undo / Move / Remove on the project tile.
  await sql`
    insert into metalcon.plays (id, game_id, project_id, other_project_id, round_n, player_id, dept, player_name, card_name, card_text, amount_cents, status)
    values (${playId}, ${player.game_id}, ${target.id}, ${other?.id ?? null}, ${round}, ${player.id}, ${player.dept}, ${player.name}, ${card.name}, ${card.text}, ${amount}, 'confirmed')
  `;
  await markPlaced();
  await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept: player.dept, playerName: player.name, cardCode: card.name, round, projectN: target.n, amountCents: amount, kind: "placed", detail: `${player.name} played ${words}.`, during: true });
  await raiseAlert(player.game_id ?? "", null, "action", `${player.name} played ${words}.`, amount);
  if (effect.token === "star") await kimStar(player.game_id ?? "", target, player, round);
  const moved = await advanceIfDone(player.game_id ?? "", player.dept, round, player);
  await noteMargin(player.game_id ?? "");
  await refreshInsights(player.game_id ?? "");
  return { ok: true as const, words, playId, moved };
}

/** Legacy: f29z.8 rows left 'pending' still count (every play counts). Confirm just clears the old flag. */
export async function confirmPlay(input: { id: string; secret: string; playId: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM confirms a token." };
  const sql = await getMetalconSql();
  await sql`update metalcon.plays set status = 'confirmed' where id = ${input.playId} and game_id = ${player.game_id}`;
  return { ok: true as const };
}

export async function changePlay(input: { id: string; secret: string; playId: string; projectId: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM changes a play." };
  const sql = await getMetalconSql();
  const play = await sql<{ id: string; card_name: string; status: string }>`select id, card_name, status from metalcon.plays where id = ${input.playId} and game_id = ${player.game_id} limit 1`;
  const project = await sql<{ id: string; n: number; customer: string; status: string }>`select id, n, customer, status from metalcon.projects where id = ${input.projectId} and game_id = ${player.game_id} limit 1`;
  if (!play[0] || !project[0] || project[0].status !== "open") return { ok: false as const, error: "Choose an open project." };
  await sql`update metalcon.plays set project_id = ${project[0].id} where id = ${play[0].id}`;
  const verb = play[0].status === "pending" ? "changed" : "moved";
  const detail = `${player.name} ${verb} ${play[0].card_name} to Project ${project[0].n} (${project[0].customer}).`;
  await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept: "General Manager", playerName: player.name, cardCode: play[0].card_name, round: 0, projectN: project[0].n, amountCents: 0, kind: verb, detail, during: true });
  await noteMargin(player.game_id ?? "");
  return { ok: true as const };
}

export async function removePlay(input: { id: string; secret: string; playId: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM removes a token." };
  const sql = await getMetalconSql();
  const play = await sql<{ id: string; card_name: string; project_id: string }>`select id, card_name, project_id from metalcon.plays where id = ${input.playId} and game_id = ${player.game_id} limit 1`;
  if (!play[0]) return { ok: false as const, error: "That play is already gone." };
  const project = await sql<{ n: number }>`select n from metalcon.projects where id = ${play[0].project_id} limit 1`;
  await sql`delete from metalcon.plays where id = ${play[0].id}`;
  const detail = `${player.name} removed ${play[0].card_name} from Project ${project[0]?.n ?? ""}.`;
  await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept: "General Manager", playerName: player.name, cardCode: play[0].card_name, round: 0, projectN: project[0]?.n ?? null, amountCents: 0, kind: "removed", detail, during: true });
  await noteMargin(player.game_id ?? "");
  return { ok: true as const };
}



export async function setPlusOne(input: { id: string; secret: string; projectId: string; dept: string; delta: number }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM changes a +1." };
  const order = ["Marketing", "Appointment Center", "Sales", "Production", "Accounting"];
  if (!order.includes(input.dept)) return { ok: false as const, error: "Choose a department." };
  const sql = await getMetalconSql();
  const project = await sql<{ n: number; plus_ones: Record<string, number> }>`select n, plus_ones from metalcon.projects where id = ${input.projectId} and game_id = ${player.game_id} limit 1`;
  if (!project[0]) return { ok: false as const, error: "That project is not in this game." };
  const current = project[0].plus_ones ?? {};
  const next = Math.max(0, (current[input.dept] ?? 0) + input.delta);
  current[input.dept] = next;
  await sql`update metalcon.projects set plus_ones = ${JSON.stringify(current)}::jsonb where id = ${input.projectId}`;
  const verb = input.delta > 0 ? "added" : "removed";
  await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept: "General Manager", playerName: player.name, cardCode: "+1", round: 0, projectN: project[0].n, amountCents: 0, kind: "plus-one", detail: `${player.name} ${verb} a +1 on ${input.dept} for Project ${project[0].n}.`, during: true });
  return { ok: true as const };
}

async function endRound(gameId: string, playerId: string, playerName: string, reason: string) {
  const sql = await getMetalconSql();
  await sql`update metalcon.games set current_round = current_round + 1, turn_dept = '', gm_meeting = false where id = ${gameId}`;
  await writeLedger({ gameId, playerId, dept: "General Manager", playerName, cardCode: "round", round: 0, amountCents: 0, kind: "round", detail: reason, during: true });
}

export async function startTurn(input: { id: string; secret: string; dept: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM starts a turn." };
  const order = ["Marketing", "Appointment Center", "Sales", "Production", "Accounting"];
  if (!order.includes(input.dept)) return { ok: false as const, error: "Choose a department." };
  const sql = await getMetalconSql();
  const game = await sql<{ turn_dept: string }>`select turn_dept from metalcon.games where id = ${player.game_id} limit 1`;
  const current = game[0]?.turn_dept || "Marketing";
  const here = Math.max(0, order.indexOf(current));
  const there = order.indexOf(input.dept);
  if (there > here + 1) return { ok: false as const, error: `${input.dept} is waiting on ${order[here]}. Go back or finish ${order[here]} first.` };
  const wrapping = current === "Accounting" && input.dept === "Marketing";
  if (wrapping) {
    await endRound(player.game_id ?? "", player.id, player.name, `${player.name} ended the round. Next round begins with the GM event.`);
    await raiseAlert(player.game_id ?? "", null, "skip", `${player.name} skipped ${current}.`, 0);
    return { ok: true as const, dept: "", round: "next" };
  }
  await sql`update metalcon.games set turn_dept = ${input.dept} where id = ${player.game_id}`;
  await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept: "General Manager", playerName: player.name, cardCode: "turn", round: 0, amountCents: 0, kind: "turn", detail: `${player.name} started the ${input.dept} turn.`, during: true });
  return { ok: true as const, dept: input.dept };
}

export async function callMeeting(input: { id: string; secret: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM calls a meeting." };
  const sql = await getMetalconSql();
  const game = await sql<{ current_round: number }>`select current_round from metalcon.games where id = ${player.game_id} limit 1`;
  const round = Number(game[0]?.current_round ?? 1);
  await sql`update metalcon.games set gm_meeting = true, turn_dept = 'Marketing' where id = ${player.game_id}`;
  await sql`update metalcon.players set meeting_ack_round = 0 where game_id = ${player.game_id}`;
  await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept: "General Manager", playerName: player.name, cardCode: "meeting", round, amountCents: 0, kind: "meeting", detail: `${player.name} called the next meeting.`, during: true });
  return { ok: true as const, round };
}

export async function ackMeeting(input: { id: string; secret: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const sql = await getMetalconSql();
  const game = await sql<{ current_round: number }>`select current_round from metalcon.games where id = ${player.game_id} limit 1`;
  const round = Number(game[0]?.current_round ?? 1);
  await sql`update metalcon.players set meeting_ack_round = ${round} where id = ${player.id}`;
  return { ok: true as const, round };
}

export async function setActionMode(input: { id: string; secret: string; mode: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM sets the action-card mode." };
  const mode = input.mode === "manual" ? "manual" : "digital";
  const sql = await getMetalconSql();
  const confirmed = await sql<{ n: number }>`select count(*)::int as n from metalcon.plays where game_id = ${player.game_id} and coalesce(status, 'confirmed') = 'confirmed' and dept <> 'General Manager'`;
  if (Number(confirmed[0]?.n ?? 0) > 0) return { ok: false as const, error: "Action-card mode is locked once a token is confirmed." };
  await sql`update metalcon.games set action_mode = ${mode} where id = ${player.game_id}`;
  await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept: "General Manager", playerName: player.name, cardCode: "action-mode", round: 0, amountCents: 0, kind: "setup", detail: `${player.name} set action cards to ${mode}.`, during: true });
  return { ok: true as const, mode };
}

export async function recordManualCards(input: { id: string; secret: string; cards: string[]; round: number }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const names = input.cards.filter(Boolean).slice(0, 2);
  if (names.length !== 2) return { ok: false as const, error: "Pick the two cards you played." };
  const cards = names.map((name) => actionOf(toCardId(name) ?? name)).filter((card) => card && card.dept === player.dept);
  if (cards.length !== 2) return { ok: false as const, error: "Both cards must be from your department." };
  const sql = await getMetalconSql();
  const game = await sql<{ action_mode: string; current_round: number }>`select action_mode, current_round from metalcon.games where id = ${player.game_id} limit 1`;
  if ((game[0]?.action_mode ?? "digital") !== "manual") return { ok: false as const, error: "This game uses digital cards." };
  const round = Math.max(1, Math.round(input.round) || Number(game[0]?.current_round ?? 1));
  await sql`delete from metalcon.draws where game_id = ${player.game_id} and player_id = ${player.id} and round_n = ${round}`;
  await sql`
    insert into metalcon.draws (id, game_id, round_n, dept, player_id, cards, played)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${round}, ${player.dept}, ${player.id}, ${JSON.stringify(names)}::jsonb, ${JSON.stringify(names)}::jsonb)
  `;
  await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept: player.dept, playerName: player.name, cardCode: names.join(", "), round, amountCents: 0, kind: "manual", detail: `${player.name} recorded ${names.join(" and ")} from the table.`, during: true });
  return { ok: true as const, cards: names };
}

export async function playEvent(input: { id: string; secret: string; eventName: string; projectId?: string; round: number }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player || player.dept !== "General Manager") return { ok: false as const, error: "Only the GM can play an event." };
  const event = eventOf(toCardId(input.eventName) ?? input.eventName);
  if (!event) return { ok: false as const, error: "Choose an event card." };
  const sql = await getMetalconSql();
  const project = input.projectId
    ? (await sql<{ id: string; n: number; customer: string }>`select id, n, customer from metalcon.projects where id = ${input.projectId} and game_id = ${player.game_id} limit 1`)[0]
    : null;
  const cash = event.name === "Invoice Paid Early" || event.name === "Community Buzz" ? 300000
    : event.name === "Material Spike" || event.name === "Warranty Claim" || event.name === "Financing Falls Through" ? -200000 : 0;
  const round = Math.max(1, Math.round(input.round) || 1);
  if (project) {
    await sql`
      insert into metalcon.plays (id, game_id, project_id, round_n, player_id, dept, player_name, card_name, card_text, amount_cents)
      values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${project.id}, ${round}, ${player.id}, 'General Manager', ${player.name}, ${event.name}, ${event.text}, ${cash})
    `;
  }
  if (/draws \d+ fewer/i.test(event.text)) {
    const current = await sql<{ draw_adjust: Record<string, number> }>`select draw_adjust from metalcon.games where id = ${player.game_id} limit 1`;
    const adjust = current[0]?.draw_adjust ?? {};
    const dept = /Marketing/i.test(event.text) ? "Marketing" : "Appointment Center";
    const fewer = /2 fewer/i.test(event.text) ? 2 : 1;
    adjust[dept] = (adjust[dept] ?? 0) - fewer;
    await sql`update metalcon.games set draw_adjust = ${JSON.stringify(adjust)}::jsonb where id = ${player.game_id}`;
  }
  const detail = `${event.name}: ${event.text}${project ? ` on Project ${project.n} (${project.customer})` : ""}`;
  await writeLedger({
    gameId: player.game_id ?? "", playerId: player.id, dept: "General Manager", playerName: player.name,
    cardCode: event.name, round, projectN: project?.n ?? null, amountCents: cash, kind: "event", detail, during: true,
  });
  await raiseAlert(player.game_id ?? "", null, "event", detail, cash);
  await refreshInsights(player.game_id ?? "");
  return { ok: true as const, detail };
}

async function ensureDraw(gameId: string, playerId: string, round: number) {
  const sql = await getMetalconSql();
  const existing = await sql<{ id: string; cards: string[]; round_n: number; played: string[] }>`
    select id, cards, round_n, played from metalcon.draws
    where game_id = ${gameId} and player_id = ${playerId} and round_n = ${round}
    order by created_at desc limit 1
  `;
  if (!existing[0]) return null;
  return { id: existing[0].id, cards: existing[0].cards, round: existing[0].round_n, played: existing[0].played ?? [] };
}

async function allFocus(gameId: string, round: number) {
  const sql = await getMetalconSql();
  return sql<{ dept: string; n: number; customer: string; house: string }>`
    select f.dept, p.n, p.customer, p.house
    from metalcon.focus f join metalcon.projects p on p.id = f.project_id
    where f.game_id = ${gameId} and f.round_n = ${round}
    order by f.dept, p.n
  `;
}

async function focusFor(gameId: string, dept: string, round: number) {
  const sql = await getMetalconSql();
  const rows = await sql<{ id: string; n: number; customer: string; house: string; status: string }>`
    select p.id, p.n, p.customer, p.house, p.status
    from metalcon.focus f join metalcon.projects p on p.id = f.project_id
    where f.game_id = ${gameId} and f.round_n = ${round} and f.dept = ${dept}
  `;
  if (!rows.length || !dept) return rows.map((row) => ({ ...row, locked: "" }));
  const [plays, projects] = await Promise.all([gamePlays(gameId), gameProjects(gameId)]);
  return rows.map((row) => {
    const project = projects.find((p) => p.id === row.id);
    // Strict pipeline: the lock names the REAL blocker (an unfilled earlier +1, not just "the previous department").
    const locked = project ? pipelineBlock(project, plays as SlotPlay[], dept) : "";
    return { ...row, locked };
  });
}

async function myPlays(gameId: string, playerId: string) {
  const sql = await getMetalconSql();
  return sql<{ id: string; card_name: string; n: number; customer: string }>`
    select pl.id, pl.card_name, p.n, p.customer
    from metalcon.plays pl join metalcon.projects p on p.id = pl.project_id
    where pl.game_id = ${gameId} and pl.player_id = ${playerId}
    order by pl.created_at desc limit 6
  `;
}

async function recentPlays(gameId: string) {
  const sql = await getMetalconSql();
  return sql<{ id: string; card_name: string; dept: string; player_name: string }>`
    select id, card_name, dept, player_name from metalcon.plays where game_id = ${gameId} order by created_at desc limit 8
  `;
}

async function pendingPicks(gameId: string) {
  const sql = await getMetalconSql();
  return sql<{ id: string; dept: string; player_id: string; cards: string[]; played: string[] }>`
    select d.id, d.dept, d.player_id, d.cards, d.played, p.name
    from metalcon.draws d join metalcon.players p on p.id = d.player_id
    where d.game_id = ${gameId} and d.played <> '[]'::jsonb
    order by d.created_at desc limit 12
  `;
}

async function promptsFor(gameId: string) {
  const loaded = await loadNumbers(gameId);
  if (!loaded) return [];
  const prompts: string[] = [];
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

async function refreshInsights(gameId: string) {
  const loaded = await loadNumbers(gameId);
  if (!loaded) return;
  const sql = await getMetalconSql();
  const payload = {
    numbers: loaded.numbers,
    prompts: await promptsFor(gameId),
    updated: new Date().toISOString(),
  };
  await sql`
    insert into metalcon.insights (game_id, payload, updated_at)
    values (${gameId}, ${JSON.stringify(payload)}::jsonb, now())
    on conflict (game_id) do update set payload = excluded.payload, updated_at = now()
  `;
}

export async function submitPicks(input: { id: string; secret: string; picks: string[] }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const picks = input.picks.filter(Boolean).slice(0, 2);
  if (picks.length !== 2) return { ok: false as const, error: "Pick two cards." };
  const sql = await getMetalconSql();
  const draw = await sql<{ id: string; cards: string[] }>`
    select id, cards from metalcon.draws
    where game_id = ${player.game_id} and player_id = ${player.id} and played = '[]'::jsonb
    order by created_at desc limit 1
  `;
  if (!draw[0]) return { ok: false as const, error: "No cards are waiting." };
  const dealt = Array.isArray(draw[0].cards) ? draw[0].cards : [];
  if (picks.some((name) => !dealt.includes(name))) return { ok: false as const, error: "Pick from the three cards dealt." };
  await sql`update metalcon.draws set played = ${JSON.stringify(picks)}::jsonb where id = ${draw[0].id}`;
  await writeLedger({
    gameId: player.game_id ?? "", playerId: player.id, dept: player.dept, playerName: player.name,
    cardCode: picks.join(", "), round: 0, amountCents: 0, kind: "picks",
    detail: `${player.name} picked ${picks.join(" and ")} for the GM to place.`, during: true,
  });
  return { ok: true as const };
}

export async function insightsFor(input: { id: string; secret: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const sql = await getMetalconSql();
  const loaded = await loadNumbers(player.game_id ?? "");
  const answers = await sql<{ player_id: string; dept: string; player_name: string; card_code: string; card_title: string; choice: string; payroll_cents: number; round_n: number; created_at: string }>`
    select player_id, dept, player_name, card_code, card_title, choice, payroll_cents, round_n, created_at
    from metalcon.answers where game_id = ${player.game_id} order by created_at
  `;
  const mine = player.dept === "General Manager" ? answers : answers.filter((row) => row.player_id === player.id);
  const byDept = new Map<string, { right: number; total: number }>();
  for (const row of mine) {
    const bucket = byDept.get(row.dept) ?? { right: 0, total: 0 };
    bucket.total += 1;
    if (row.payroll_cents > 0) bucket.right += 1;
    byDept.set(row.dept, bucket);
  }
  const gaps = mine.slice(1).map((row, i) => new Date(row.created_at).getTime() - new Date(mine[i].created_at).getTime());
  const avgSeconds = gaps.length ? Math.round(gaps.reduce((sum, n) => sum + n, 0) / gaps.length / 1000) : 0;
  return {
    ok: true as const,
    role: player.dept === "General Manager" ? "gm" : "player",
    numbers: loaded?.numbers ?? null,
    prompts: await promptsFor(player.game_id ?? ""),
    marginByRound: loaded?.numbers.rounds.map((row) => ({ round: row.round, margin: loaded.numbers.marginBps === null ? 0 : loaded.numbers.marginBps / 100 })) ?? [],
    payrollByDept: [...byDept.entries()].map(([dept, row]) => ({ dept, right: row.right, total: row.total })),
    projects: loaded?.numbers.projects ?? [],
    qualities: [...byDept.entries()].map(([dept, row]) => ({
      dept,
      accuracy: row.total ? Math.round((row.right / row.total) * 100) : 0,
      avgSeconds,
      note: row.right / Math.max(1, row.total) >= 0.6 ? "Strong calls" : "Needs coaching",
    })),
  };
}

// ---------------------------------------------------------------------------
// f30 turn engine: department scenario -> 3 cards (negative rule) -> instant card plays -> token step -> auto-advance.
// ---------------------------------------------------------------------------

type PlayRow = { id: string; project_id: string; other_project_id: string | null; dept: string; card_name: string; card_text: string; round_n: number; player_id: string | null; status: string | null };
type ProjectRow = { id: string; n: number; house: string; customer: string; status: string; extra_slot: string | null; plus_ones: Record<string, number>; value_cents: number };
type DrawRow = { id: string; cards: string[]; played: string[]; placed: string[]; negation: Record<string, string>; tokens_done: boolean; player_id: string; round_n: number };

async function gamePlays(gameId: string) {
  const sql = await getMetalconSql();
  return sql<PlayRow>`select id, project_id, other_project_id, dept, card_name, card_text, round_n, player_id, status from metalcon.plays where game_id = ${gameId} order by created_at`;
}
async function gameProjects(gameId: string) {
  const sql = await getMetalconSql();
  return sql<ProjectRow>`select id, n, house, customer, status, extra_slot, plus_ones, value_cents from metalcon.projects where game_id = ${gameId} order by n`;
}
function slotsFor(project: ProjectRow, plays: PlayRow[]) {
  return filledSlots(project, plays as SlotPlay[]);
}

/** Department players in seat order, the head this round, and the head's index. */
async function deptGroup(gameId: string, dept: string, round: number) {
  const sql = await getMetalconSql();
  const group = await sql<{ id: string; name: string; created_at: string }>`
    select id, name, created_at from metalcon.players where game_id = ${gameId} and dept = ${dept} order by created_at
  `;
  const seats = await roster(gameId, round);
  const head = seats.find((row) => row.dept === dept);
  const headIdx = Math.max(0, group.findIndex((row) => row.id === head?.player_id));
  return { group, headId: head?.player_id ?? "", headName: head?.name ?? "", headIdx };
}

async function currentDraw(gameId: string, playerId: string, round: number): Promise<DrawRow | null> {
  const sql = await getMetalconSql();
  const rows = await sql<DrawRow>`
    select id, cards, played, placed, negation, tokens_done, player_id, round_n from metalcon.draws
    where game_id = ${gameId} and player_id = ${playerId} and round_n = ${round} order by created_at desc limit 1
  `;
  const row = rows[0];
  if (!row) return null;
  return { ...row, cards: row.cards ?? [], played: row.played ?? [], placed: row.placed ?? [], negation: row.negation ?? {} };
}
async function deptDraw(gameId: string, dept: string, round: number): Promise<DrawRow | null> {
  const sql = await getMetalconSql();
  const rows = await sql<DrawRow>`
    select id, cards, played, placed, negation, tokens_done, player_id, round_n from metalcon.draws
    where game_id = ${gameId} and dept = ${dept} and round_n = ${round} order by created_at desc limit 1
  `;
  const row = rows[0];
  if (!row) return null;
  return { ...row, cards: row.cards ?? [], played: row.played ?? [], placed: row.placed ?? [], negation: row.negation ?? {} };
}

function drawRules(draw: DrawRow) {
  const playable = draw.cards.filter((card) => draw.negation[card] !== "void" && draw.negation[card] !== "negated");
  const must = draw.cards.filter((card) => draw.negation[card] === "must" && !draw.placed.includes(card));
  const unresolved = draw.cards.filter((card) => isNegative(card) && !draw.negation[card]);
  const extra = draw.cards.filter((card) => draw.negation[card] === "drawn").length;
  const maxPlays = Math.min(playable.length, 2 + extra);
  const left = Math.max(0, maxPlays - draw.placed.length);
  return { playable, must, unresolved, maxPlays, left };
}

/** What the next scenario answer by this player counts as. */
async function scenarioRole(gameId: string, playerId: string, dept: string, round: number): Promise<{ purpose: "turn" | "negate" | "table"; negative?: string; drawId?: string; designatedId?: string; earned: boolean }> {
  if (!PIPELINE.includes(dept as never)) return { purpose: "table", earned: false };
  const sql = await getMetalconSql();
  const game = await sql<{ turn_dept: string; gm_meeting: boolean }>`select turn_dept, gm_meeting from metalcon.games where id = ${gameId} limit 1`;
  const turn = game[0]?.turn_dept ?? "";
  const { group, headId, headIdx } = await deptGroup(gameId, dept, round);
  const turnAnswers = await sql<{ player_id: string; payroll_cents: number }>`
    select player_id, payroll_cents from metalcon.answers where game_id = ${gameId} and dept = ${dept} and round_n = ${round} and purpose = 'turn' order by created_at
  `;
  const earned = turnAnswers.some((row) => row.payroll_cents > 0);
  const designatedId = group.length ? group[(headIdx + turnAnswers.length) % group.length].id : "";
  if (turn === dept && !earned && designatedId === playerId) return { purpose: "turn", designatedId, earned };
  if (playerId === headId && earned) {
    const draw = await currentDraw(gameId, playerId, round);
    if (draw) {
      const rules = drawRules(draw);
      if (rules.unresolved.length) return { purpose: "negate", negative: rules.unresolved[0], drawId: draw.id, designatedId, earned };
    }
  }
  return { purpose: "table", designatedId, earned };
}

/** Johnny's negative-card rule. Right: the negative is negated and a new card is dealt; a second negative does not play. Wrong: the negative plays. */
async function resolveNegative(drawId: string, dept: string, negative: string, right: boolean) {
  const sql = await getMetalconSql();
  const rows = await sql<{ cards: string[]; negation: Record<string, string> }>`select cards, negation from metalcon.draws where id = ${drawId} limit 1`;
  const cards = [...(rows[0]?.cards ?? [])];
  const negation = { ...(rows[0]?.negation ?? {}) };
  if (!right) {
    negation[negative] = "must";
    await sql`update metalcon.draws set negation = ${JSON.stringify(negation)}::jsonb where id = ${drawId}`;
    return { card: negative, outcome: "plays" as const };
  }
  const pool = ACTION_CARDS.filter((card) => card.dept === dept && !cards.includes(card.name)).map((card) => card.name);
  const replacement = pool.length ? pool[Math.floor(Math.random() * pool.length)] : "";
  negation[negative] = "negated";
  if (replacement) {
    cards.push(replacement);
    negation[replacement] = isNegative(replacement) ? "void" : "replacement";
  }
  await sql`update metalcon.draws set cards = ${JSON.stringify(cards)}::jsonb, negation = ${JSON.stringify(negation)}::jsonb where id = ${drawId}`;
  return { card: negative, outcome: "negated" as const, replacement, replacementVoid: replacement ? isNegative(replacement) : false };
}

async function focusIds(gameId: string, dept: string, round: number) {
  const sql = await getMetalconSql();
  const rows = await sql<{ project_id: string }>`select project_id from metalcon.focus where game_id = ${gameId} and round_n = ${round} and dept = ${dept}`;
  return rows.map((row) => row.project_id);
}

/** Can `dept` put a card/token on this project right now? "" = yes, otherwise the reason. */
function targetBlock(project: ProjectRow | undefined, plays: PlayRow[], dept: string, focus: string[], opts: { ignoreFocus?: boolean } = {}) {
  if (!project || project.status !== "open") return "Choose an open project.";
  if (!opts.ignoreFocus && focus.length && !focus.includes(project.id)) return "Play only on your two focus projects this round.";
  return pipelineBlock(project, plays as SlotPlay[], dept);
}

/** Token step: projects where the department can still place its own token this round. */
function tokenTargets(projects: ProjectRow[], plays: PlayRow[], dept: string, focus: string[], round: number) {
  return projects.filter((project) => {
    if (project.status !== "open") return false;
    if (focus.length && !focus.includes(project.id)) return false;
    if (targetBlock(project, plays, dept, focus)) return false;
    const slots = slotsFor(project, plays);
    if (!(slots.outstanding[dept] > 0)) return false;
    return !plays.some((play) => play.project_id === project.id && play.dept === dept && play.card_name === "Token" && play.round_n === round);
  });
}

export async function turnState(gameId: string, dept: string, round: number) {
  const [plays, projects, focus, draw, role] = await Promise.all([
    gamePlays(gameId), gameProjects(gameId), focusIds(gameId, dept, round), deptDraw(gameId, dept, round), deptGroup(gameId, dept, round),
  ]);
  const sql = await getMetalconSql();
  const turnAnswers = await sql<{ payroll_cents: number }>`select payroll_cents from metalcon.answers where game_id = ${gameId} and dept = ${dept} and round_n = ${round} and purpose = 'turn' order by created_at`;
  const earned = turnAnswers.some((row) => row.payroll_cents > 0);
  const designated = role.group.length ? role.group[(role.headIdx + turnAnswers.length) % role.group.length] : null;
  const rules = draw ? drawRules(draw) : null;
  const placeable = (card: string) => {
    const effect = boardEffect(actionOf(toCardId(card) ?? card) ?? { name: card, dept, text: "" });
    if (effect.kind === "draw" || (effect.kind === "cash" && !effect.token) || effect.kind === "none") return true;
    return projects.some((project) => !targetBlock(project, plays, dept, focus, { ignoreFocus: isNegative(card) }));
  };
  const cardsLeft = rules ? rules.playable.filter((card) => !draw!.placed.includes(card) && placeable(card)) : [];
  const cardsDone = Boolean(draw && rules && (rules.left === 0 || cardsLeft.length === 0) && rules.unresolved.length === 0);
  const tokens = tokenTargets(projects, plays, dept, focus, round);
  const stage: "scenario" | "deal" | "negative" | "cards" | "tokens" | "done" =
    !earned && !draw ? "scenario"
    : !draw ? "deal"
    : rules!.unresolved.length ? "negative"
    : !cardsDone ? "cards"
    : !draw.tokens_done && tokens.length ? "tokens"
    : "done";
  return {
    stage, earned, headId: role.headId, headName: role.headName,
    designatedId: designated?.id ?? "", designatedName: designated?.name ?? "",
    wrongTries: turnAnswers.length - (earned ? 1 : 0),
    draw: draw ? { id: draw.id, cards: draw.cards, placed: draw.placed, negation: draw.negation, tokensDone: draw.tokens_done, ...rules!, cardsLeft } : null,
    tokenTargets: tokens.map((project) => ({ id: project.id, n: project.n })),
  };
}

/** Moves the turn on when the department is done; after Accounting the round ends. */
async function advanceIfDone(gameId: string, dept: string, round: number, actor: { id: string; name: string }) {
  const sql = await getMetalconSql();
  const game = await sql<{ turn_dept: string; current_round: number }>`select turn_dept, current_round from metalcon.games where id = ${gameId} limit 1`;
  if (game[0]?.turn_dept !== dept || Number(game[0]?.current_round) !== round) return null;
  const state = await turnState(gameId, dept, round);
  if (state.stage !== "done") return null;
  return passTurn(gameId, dept, actor, `${dept} finished its turn.`);
}

async function passTurn(gameId: string, dept: string, actor: { id: string; name: string }, why: string) {
  const sql = await getMetalconSql();
  const idx = PIPELINE.indexOf(dept as never);
  const next = idx >= 0 && idx < PIPELINE.length - 1 ? PIPELINE[idx + 1] : "";
  if (!next) {
    await endRound(gameId, actor.id, actor.name, `${why} Round over. Next round begins with the GM event.`);
    await raiseAlert(gameId, null, "round", `${why} Round over. The GM starts the next round.`, 0);
    return { next: "", roundOver: true };
  }
  await sql`update metalcon.games set turn_dept = ${next} where id = ${gameId} and turn_dept = ${dept}`;
  await writeLedger({ gameId, playerId: actor.id, dept: "General Manager", playerName: actor.name, cardCode: "turn", round: 0, amountCents: 0, kind: "turn", detail: `${why} ${next}'s turn.`, during: true });
  await raiseAlert(gameId, null, "turn", `${why} ${next}'s turn.`, 0);
  return { next, roundOver: false };
}

export async function placeToken(input: { id: string; secret: string; projectId: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const sql = await getMetalconSql();
  const game = await sql<{ current_round: number; turn_dept: string }>`select current_round, turn_dept from metalcon.games where id = ${player.game_id} limit 1`;
  const round = Number(game[0]?.current_round ?? 1);
  if (game[0]?.turn_dept !== player.dept) return { ok: false as const, error: `It's ${game[0]?.turn_dept || "the GM"}'s turn.` };
  const { headId } = await deptGroup(player.game_id ?? "", player.dept, round);
  if (headId !== player.id) return { ok: false as const, error: "The Department Head places the tokens." };
  const state = await turnState(player.game_id ?? "", player.dept, round);
  if (state.stage !== "tokens") return { ok: false as const, error: state.stage === "done" ? "Your turn is done." : "Play your action cards first." };
  const target = state.tokenTargets.find((row) => row.id === input.projectId);
  if (!target) return { ok: false as const, error: "That project has no open slot for your department right now." };
  const project = (await gameProjects(player.game_id ?? "")).find((row) => row.id === input.projectId)!;
  const token = boardEffect({ name: "Token", dept: player.dept, text: "PLAY 1 [TOKEN] ON A PROJECT." });
  await sql`
    insert into metalcon.plays (id, game_id, project_id, round_n, player_id, dept, player_name, card_name, card_text, amount_cents, status)
    values (${randomBytes(8).toString("hex")}, ${player.game_id}, ${project.id}, ${round}, ${player.id}, ${player.dept}, ${player.name}, 'Token', 'PLAY 1 [TOKEN] ON A PROJECT.', 0, 'confirmed')
  `;
  const words = `${player.name} placed a ${player.dept} token (${token.token}) on Project ${project.n}.`;
  await writeLedger({ gameId: player.game_id ?? "", playerId: player.id, dept: player.dept, playerName: player.name, cardCode: "Token", round, projectN: project.n, amountCents: 0, kind: "token", detail: words, during: true });
  await raiseAlert(player.game_id ?? "", null, "token", words, 0);
  await kimStar(player.game_id ?? "", project, player, round);
  const after = await turnState(player.game_id ?? "", player.dept, round);
  if (after.stage === "tokens" && !after.tokenTargets.length) await sql`update metalcon.draws set tokens_done = true where id = ${after.draw?.id ?? ""}`;
  const moved = await advanceIfDone(player.game_id ?? "", player.dept, round, player);
  await noteMargin(player.game_id ?? "");
  await refreshInsights(player.game_id ?? "");
  return { ok: true as const, words, moved };
}

/** Head taps "Done with tokens" (or the GM forces the turn on). */
export async function finishTurn(input: { id: string; secret: string; dept?: string }) {
  const player = await playerBySecret(input.id, input.secret);
  if (!player) return { ok: false as const, error: "Take a seat from the QR code first." };
  const sql = await getMetalconSql();
  const game = await sql<{ current_round: number; turn_dept: string }>`select current_round, turn_dept from metalcon.games where id = ${player.game_id} limit 1`;
  const round = Number(game[0]?.current_round ?? 1);
  const dept = game[0]?.turn_dept ?? "";
  if (!dept) return { ok: false as const, error: "No department turn is running. Call the meeting first." };
  if (player.dept === "General Manager") {
    const moved = await passTurn(player.game_id ?? "", dept, player, `GM moved the turn on from ${dept}.`);
    return { ok: true as const, moved };
  }
  if (player.dept !== dept) return { ok: false as const, error: `It's ${dept}'s turn.` };
  const { headId } = await deptGroup(player.game_id ?? "", dept, round);
  if (headId !== player.id) return { ok: false as const, error: "Only the Department Head ends the turn." };
  const state = await turnState(player.game_id ?? "", dept, round);
  if (state.stage === "scenario" || state.stage === "deal" || state.stage === "negative") return { ok: false as const, error: "Answer the scenario and play your cards first, or ask the GM to move the turn on." };
  if (state.stage === "cards") return { ok: false as const, error: "Play your cards first." };
  if (state.draw) await sql`update metalcon.draws set tokens_done = true where id = ${state.draw.id}`;
  const moved = await passTurn(player.game_id ?? "", dept, player, `${dept} finished its turn.`);
  return { ok: true as const, moved };
}

/** Kim (printed): when this project gets its star token, place 1 star on another unfinished project. Once per Kim project. */
async function kimStar(gameId: string, project: ProjectRow, player: { id: string; name: string }, round: number) {
  if (!/Kim/i.test(canonicalCardName(project.customer))) return;
  const plays = await gamePlays(gameId);
  if ((slotsFor(project, plays).filled.Marketing ?? 0) < 1) return;
  if (plays.some((play) => play.card_name === "Kim star" && play.other_project_id === project.id)) return;
  const projects = await gameProjects(gameId);
  const next = projects.find((row) => row.status === "open" && row.id !== project.id && (slotsFor(row, plays).outstanding.Marketing ?? 0) > 0)
    ?? projects.find((row) => row.status === "open" && row.id !== project.id);
  if (!next) return;
  const sql = await getMetalconSql();
  // other_project_id records which Kim project triggered it (so it fires once). The star lands on project_id.
  await sql`
    insert into metalcon.plays (id, game_id, project_id, other_project_id, round_n, player_id, dept, player_name, card_name, card_text, amount_cents, status)
    values (${randomBytes(8).toString("hex")}, ${gameId}, ${next.id}, ${project.id}, ${round}, ${player.id}, 'Marketing', ${player.name}, 'Kim star', 'PLAY 1 [STAR] ON A PROJECT.', 0, 'confirmed')
  `;
  await writeLedger({ gameId, playerId: player.id, dept: "Marketing", playerName: player.name, cardCode: "Kim star", round, projectN: next.n, amountCents: 0, kind: "action", detail: `Kim Family: +1 star on Project ${next.n}.`, during: true });
}

/** Payout if the GM closes this project now: base + house + customer (+ Upsell/Financing, Garcia). */
async function closePreview(gameId: string, projectId: string) {
  const loaded = await loadNumbers(gameId);
  if (!loaded) return null;
  const projects = loaded.projects.map((row) => row.id === projectId ? { ...row, status: "complete", completed_at: new Date().toISOString(), finish_order: (loaded.projects.filter((p) => p.status === "complete").length + 1) } : row);
  const sql = await getMetalconSql();
  const answers = await sql<{ player_id: string; dept: string; player_name: string; card_code: string; card_title: string; round_n: number; payroll_cents: number; during_meeting: boolean }>`
    select player_id, dept, player_name, card_code, card_title, round_n, payroll_cents, during_meeting from metalcon.answers where game_id = ${gameId}
  `;
  const plays = await sql<{ player_id: string | null; dept: string; player_name: string; card_name: string; card_text: string; project_id: string; other_project_id: string | null; amount_cents: number; round_n: number }>`
    select player_id, dept, player_name, card_name, card_text, project_id, other_project_id, amount_cents, round_n from metalcon.plays where game_id = ${gameId}
  `;
  const sim = computeNumbers({
    companyName: loaded.row.company_name, currentRound: Number(loaded.row.current_round) || 1,
    fixedCostCents: Number(loaded.row.fixed_cost_cents) || 200000, fixedStartRound: Number(loaded.row.fixed_cost_start_round) || 3,
    basePayrollCents: 0, gameEnded: false, answers, plays, projects, players: loaded.players,
  });
  const target = projects.find((row) => row.id === projectId)!;
  const proj = sim.projects.find((row) => row.n === target.n);
  if (!proj) return null;
  const base = proj.valueCents;
  const house = proj.houseBonus;
  const cust = proj.customerBonus ?? 0;
  const garcia = proj.garciaBonus ?? 0;
  const cards = proj.revenueCents - base - house - cust - garcia;
  const usd = (c: number) => `${c >= 0 ? "+" : "−"}$${(Math.abs(c) / 100).toLocaleString("en-US")}`;
  const lines = [`Base (P${proj.n}) $${(base / 100).toLocaleString("en-US")}`];
  lines.push(`House ${canonicalCardName(target.house)} ${usd(house)}`);
  // Customer line always shows, even at $0, so base + house + customer (+ Garcia referral + cards) = total on the tile.
  lines.push(`Customer ${canonicalCardName(target.customer)} ${usd(cust)}`);
  if (garcia) lines.push(`Garcia referral ${usd(garcia)}`);
  if (cards) lines.push(`Cards ${usd(cards)}`);
  return { n: proj.n, totalCents: proj.revenueCents, lines };
}
