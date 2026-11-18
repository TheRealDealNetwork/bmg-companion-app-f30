import dataset from "@/lib/game/dataset.json";
import { cardEs } from "@/lib/metalcon/es-cards";

type Face = { name: string; dept: string; type?: string; text: string };

const data = dataset as { department_cards: Face[]; house_cards: Face[]; customer_cards: Face[] };

export const DEPARTMENTS = ["Marketing", "Appointment Center", "Sales", "Production", "Accounting"] as const;
export const DEFAULT_BASE_PAYROLL = 3200;

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const ACTION_CARDS = data.department_cards.map((card) => ({
  id: slug(card.name),
  name: card.name,
  dept: card.dept,
  type: card.type ?? "",
  text: card.text,
}));

export const HOUSES = data.house_cards.map((card) => ({ id: slug(card.name), name: card.name, text: card.text }));
export const CUSTOMERS = data.customer_cards.map((card) => ({ id: slug(card.name), name: card.name, text: card.text }));

export const EVENTS = [
  { id: slug("Word of Mouth"), name: "Word of Mouth", text: "Focus on up to 2 extra projects. Every department draws 1 extra card." },
  { id: slug("Warm Lead"), name: "Warm Lead", text: "Add 1 star token to any project." },
  { id: slug("Rush Callback"), name: "Rush Callback", text: "Add 1 phone token to any project." },
  { id: slug("Crew Efficiency"), name: "Crew Efficiency", text: "Add 1 hammer token to any project." },
  { id: slug("Smooth Close"), name: "Smooth Close", text: "Sales may play 1 extra card this round." },
  { id: slug("Invoice Paid Early"), name: "Invoice Paid Early", text: "Company cash +$3,000." },
  { id: slug("Community Buzz"), name: "Community Buzz", text: "Company cash +$3,000." },
  { id: slug("Buyer's Remorse"), name: "Buyer's Remorse", text: "Remove 1 Sales token from an unfinished project." },
  { id: slug("Algorithm Change"), name: "Algorithm Change", text: "Marketing draws 2 fewer cards this round." },
  { id: slug("Material Spike"), name: "Material Spike", text: "Company pays $2,000 for materials." },
  { id: slug("Warranty Claim"), name: "Warranty Claim", text: "Company pays $2,000." },
  { id: slug("No-Show Day"), name: "No-Show Day", text: "Appointment Center draws 1 fewer card this round." },
  { id: slug("Financing Falls Through"), name: "Financing Falls Through", text: "Sales chooses one unfinished project. It completes for $2,000 less." },
  { id: slug("One-Star Review"), name: "One-Star Review", text: "Marketing draws 1 fewer card this round." },
];

/** Resolve a stored display name to its stable ID. Call this before action processing, not inside the lookup. */
export function toCardId(stored: string): string | null {
  const key = stored.trim().toLowerCase();
  const hit = ACTION_CARDS.find((card) => card.id === key || card.name.toLowerCase() === key)
    ?? HOUSES.find((card) => card.id === key || card.name.toLowerCase() === key)
    ?? CUSTOMERS.find((card) => card.id === key || card.name.toLowerCase() === key)
    ?? EVENTS.find((card) => card.id === key || card.name.toLowerCase() === key);
  return hit?.id ?? null;
}

export function actionOf(id: string) {
  return ACTION_CARDS.find((card) => card.id === id) ?? null;
}
export function houseOf(id: string) {
  return HOUSES.find((card) => card.id === id) ?? null;
}
export function customerOf(id: string) {
  return CUSTOMERS.find((card) => card.id === id) ?? null;
}
export function eventOf(id: string) {
  return EVENTS.find((card) => card.id === id) ?? null;
}

export function tierValue(position: number) {
  if (position <= 3) return 10000;
  if (position <= 6) return 20000;
  return 30000;
}

export type Token = "star" | "phone" | "sale" | "hammer" | "calculator";

const TOKEN_WORD: Record<Token, string> = {
  star: "lead star",
  phone: "phone",
  sale: "Sales token",
  hammer: "hammer",
  calculator: "calculator",
};

export type BoardEffect = {
  kind: "token" | "slot" | "remove" | "move" | "draw" | "cash" | "none";
  count: number;
  token: Token | null;
  cashCents: number;
  cashWhen: "now" | "complete" | null;
  words: string;
};


export const DEPT_TOKEN: Record<string, Token> = {
  Marketing: "star",
  "Appointment Center": "phone",
  Sales: "sale",
  Production: "hammer",
  Accounting: "calculator",
};

export const DEPT_COLOR: Record<string, string> = {
  Marketing: "#C0272D",
  "Appointment Center": "#E87722",
  Sales: "#2E86AB",
  Production: "#6A4C93",
  Accounting: "#2E7D32",
};

/** Resolve a stored house/customer value (slug id OR display name) to the printed card name.
 *  Root cause of the Game 11 money bug: the GM dropdown stores the slug id ("1970s-bi-level-dated-everything"),
 *  and every rule below used to regex the display name ("1970s Bi-Level"), so most house/customer rules never fired. */
export function canonicalCardName(stored: string | null | undefined): string {
  const raw = (stored ?? "").trim();
  if (!raw) return "";
  const id = toCardId(raw) ?? raw;
  return houseOf(id)?.name ?? customerOf(id)?.name ?? raw;
}

export const PIPELINE = ["Marketing", "Appointment Center", "Sales", "Production", "Accounting"] as const;
const TOKEN_DEPT: Record<Token, string> = { star: "Marketing", phone: "Appointment Center", sale: "Sales", hammer: "Production", calculator: "Accounting" };

/** Extra required slots from the house card (printed Nov 4 flats). */
export function houseExtra(house: string, extraSlot?: string | null): Record<string, number> {
  const name = canonicalCardName(house);
  const out: Record<string, number> = {};
  if (/Steep Colonial|1970s Bi-Level|Urban Rowhome/i.test(name)) out.Production = 1;
  if (/Ranch with Full Basement/i.test(name)) out.Marketing = 1;
  if (/Split-Level/i.test(name)) out.Sales = 1;
  if (/Craftsman/i.test(name)) out["Appointment Center"] = 1;
  if (/Modern Lake House/i.test(name)) out.Accounting = 1;
  if (/Suburban McMansion/i.test(name)) { const d = PIPELINE.includes((extraSlot ?? "") as never) ? extraSlot! : "Production"; out[d] = (out[d] ?? 0) + 1; }
  return out;
}

/** Extra required slots from the customer card. Only Patel adds a slot. */
export function customerExtra(customer: string, extraSlot?: string | null): Record<string, number> {
  const name = canonicalCardName(customer);
  const out: Record<string, number> = {};
  if (/Patel/i.test(name)) { const d = PIPELINE.includes((extraSlot ?? "") as never) ? extraSlot! : "Sales"; out[d] = 1; }
  return out;
}

export type SlotPlay = { dept: string; card_name?: string; card_text?: string; project_id?: string; other_project_id?: string | null; id?: string };

/** Event cards the GM plays onto a project that add/remove a department token. */
function eventToken(name: string): { token: Token; delta: number } | null {
  if (/^Warm Lead$/i.test(name)) return { token: "star", delta: 1 };
  if (/^Rush Callback$/i.test(name)) return { token: "phone", delta: 1 };
  if (/^Crew Efficiency$/i.test(name)) return { token: "hammer", delta: 1 };
  if (/^Buyer's Remorse$/i.test(name)) return { token: "sale", delta: -1 };
  return null;
}

/** What one play does to one project: token deltas (by department) and extra slots (by department). */
export function playEffectOn(projectId: string | undefined, play: SlotPlay) {
  const tokens: Record<string, number> = {};
  const slots: Record<string, number> = {};
  const onThis = !projectId || !play.project_id || play.project_id === projectId;
  const onOther = Boolean(projectId && play.other_project_id && play.other_project_id === projectId && play.other_project_id !== play.project_id);
  if (!onThis && !onOther) return { tokens, slots };
  if (play.dept === "General Manager") {
    const ev = eventToken(play.card_name ?? "");
    if (ev && onThis) tokens[TOKEN_DEPT[ev.token]] = ev.delta;
    return { tokens, slots };
  }
  const effect = boardEffect({ name: play.card_name ?? "", dept: play.dept, text: play.card_text ?? "" });
  const dept = effect.token ? TOKEN_DEPT[effect.token] : play.dept;
  if (effect.kind === "token" || (effect.kind === "cash" && effect.token && effect.count > 0)) {
    const split = Boolean(play.other_project_id && play.other_project_id !== play.project_id && effect.count >= 2);
    if (split) tokens[dept] = 1; // 1 here, 1 on the other project
    else if (onThis) tokens[dept] = effect.count;
  } else if (effect.kind === "remove" && onThis) tokens[dept] = -1;
  else if (effect.kind === "move") tokens[dept] = onThis && play.other_project_id ? -1 : onOther ? 1 : 0;
  else if (effect.kind === "slot" && onThis) slots[play.dept] = effect.count;
  return { tokens, slots };
}

export type SlotReason = { dept: string; source: string };

export function filledSlots(project: { id?: string; house: string; customer: string; extra_slot?: string | null; plus_ones?: Record<string, number> }, plays: SlotPlay[]) {
  const need: Record<string, number> = { Marketing: 1, "Appointment Center": 1, Sales: 1, Production: 1, Accounting: 1 };
  const reasons: SlotReason[] = [];
  const houseName = canonicalCardName(project.house);
  const customerName = canonicalCardName(project.customer);
  for (const [dept, n] of Object.entries(houseExtra(project.house, project.extra_slot))) { need[dept] += n; reasons.push({ dept, source: houseName }); }
  for (const [dept, n] of Object.entries(customerExtra(project.customer, project.extra_slot))) { need[dept] += n; reasons.push({ dept, source: customerName }); }
  for (const [dept, n] of Object.entries(project.plus_ones ?? {})) {
    if (need[dept] === undefined || !n) continue;
    need[dept] = Math.max(1, need[dept] + n);
    if (n > 0) reasons.push({ dept, source: "GM +1" });
  }
  const raw: Record<string, number> = {};
  for (const play of plays) {
    const { tokens, slots } = playEffectOn(project.id, play);
    for (const [dept, n] of Object.entries(tokens)) raw[dept] = (raw[dept] ?? 0) + n;
    for (const [dept, n] of Object.entries(slots)) { if (need[dept] !== undefined) { need[dept] += n; reasons.push({ dept, source: play.card_name ?? "card" }); } }
  }
  const filled: Record<string, number> = {};
  const outstanding: Record<string, number> = {};
  const plus: Record<string, number> = {};
  let totalNeed = 0;
  let totalFilled = 0;
  for (const dept of PIPELINE) {
    const have = Math.max(0, raw[dept] ?? 0);
    filled[dept] = have;
    totalNeed += need[dept];
    totalFilled += Math.min(have, need[dept]);
    if (need[dept] > 1) plus[dept] = need[dept] - 1;
    if (have < need[dept]) outstanding[dept] = need[dept] - have;
  }
  const ready = Object.keys(outstanding).length === 0;
  return { need, filled, plus, outstanding, totalNeed, totalFilled, ready, reasons };
}

/** Strict pipeline. Returns "" when `dept` may play on the project, otherwise the real blocker. */
export function pipelineBlock(project: Parameters<typeof filledSlots>[0], plays: SlotPlay[], dept: string, lang: "en" | "es" = "en"): string {
  const idx = PIPELINE.indexOf(dept as never);
  if (idx <= 0) return "";
  const slots = filledSlots(project, plays);
  for (const earlier of PIPELINE.slice(0, idx)) {
    const owe = slots.outstanding[earlier] ?? 0;
    if (!owe) continue;
    const src = slots.reasons.filter((r) => r.dept === earlier).map((r) => r.source);
    const word = TOKEN_WORD[DEPT_TOKEN[earlier]];
    if (lang === "es") return `Bloqueado: ${earlier} todavía debe ${owe} ${word}${owe > 1 ? "s" : ""}${src.length ? ` (+1 de ${src.join(", ")})` : ""}`;
    return `Locked: ${earlier} still owes ${owe} ${word}${owe > 1 ? "s" : ""}${src.length && (slots.filled[earlier] ?? 0) > 0 ? ` (+1 from ${src.join(", ")})` : src.length ? ` (needs ${slots.need[earlier]}: +1 from ${src.join(", ")})` : ""}`;
  }
  return "";
}

/** @deprecated kept for callers; use filledSlots().plus */
export function plusOnes(project: { house: string; customer: string; extra_slot?: string | null }, plays: SlotPlay[]) {
  return filledSlots(project, plays).plus;
}

export function slotNeed(project: { house: string; customer: string; extra_slot?: string | null }) {
  return filledSlots(project, []).need;
}

export function isNegative(name: string) {
  const card = actionOf(toCardId(name) ?? name);
  return (card?.type ?? "").toUpperCase() === "NEGATIVE";
}
export function isSpecial(name: string) {
  const card = actionOf(toCardId(name) ?? name);
  return (card?.type ?? "").toUpperCase() === "SPECIAL";
}

function tokenOf(dept: string): Token {
  if (dept === "Marketing") return "star";
  if (dept === "Appointment Center") return "phone";
  if (dept === "Sales") return "sale";
  if (dept === "Production") return "hammer";
  return "calculator";
}

export function boardEffect(card: { name: string; dept: string; text: string }): BoardEffect {
  const text = card.text.toUpperCase();
  const token = tokenOf(card.dept);
  if (card.name.toLowerCase() === "invoice blitz") return { kind: "cash", count: 1, token, cashCents: 300000, cashWhen: "now", words: "Invoice Blitz: +$3,000 company revenue, and +1 calculator on the project" };
  if (card.name.toLowerCase() === "quick audit") return { kind: "cash", count: 0, token: null, cashCents: 400000, cashWhen: "now", words: "Quick Audit: +$4,000 company revenue now" };
  if (card.name.toLowerCase() === "overbudget surprise") return { kind: "cash", count: 0, token: null, cashCents: -300000, cashWhen: "now", words: "Overbudget Surprise: −$3,000 company revenue" };
  if (card.name.toLowerCase() === "upsell close") return { kind: "cash", count: 1, token: "sale", cashCents: 200000, cashWhen: "complete", words: "Upsell Close: +1 Sales token, +$2,000 when this project finishes" };
  if (card.name.toLowerCase() === "financing falls through") return { kind: "cash", count: 0, token: null, cashCents: -200000, cashWhen: "complete", words: "Financing Falls Through: −$2,000 when this project finishes" };
  if (/DRAW\s+(\d+)/.test(text)) {
    const n = Number(/DRAW\s+(\d+)/.exec(text)?.[1] ?? 1);
    return { kind: "draw", count: n, token: null, cashCents: 0, cashWhen: null, words: `${card.name}: draw ${n} card${n === 1 ? "" : "s"}` };
  }
  if (/MOVE\s+1/.test(text)) return { kind: "move", count: 1, token, cashCents: 0, cashWhen: null, words: `${card.name}: move 1 ${TOKEN_WORD[token]}` };
  if (/REMOVE\s+1/.test(text)) return { kind: "remove", count: 1, token, cashCents: 0, cashWhen: null, words: `${card.name}: remove 1 ${TOKEN_WORD[token]}` };
  if (/ADD\s+1/.test(text) && /SLOT/.test(text)) return { kind: "slot", count: 1, token, cashCents: 0, cashWhen: null, words: `${card.name}: +1 ${TOKEN_WORD[token]} slot` };
  const play = /PLAY\s+(\d+)/.exec(text);
  // Cards with no PLAY/ADD/REMOVE/MOVE/DRAW (e.g. Crew Swap, a GM-mediated swap) place no token.
  // f29z.8 defaulted them to "+1 token", which is how Crew Swap filled the Bi-Level's extra hammer slot in Game 11.
  if (!play) return { kind: "none", count: 0, token: null, cashCents: 0, cashWhen: null, words: `${card.name}: no token (table effect)` };
  const n = Number(play[1]);
  return { kind: "token", count: n, token, cashCents: 0, cashWhen: null, words: `${card.name}: +${n} ${TOKEN_WORD[token]}${n === 1 ? "" : "s"}` };
}

export function effectLine(cardName: string, projectLabel: string) {
  const card = actionOf(cardName);
  if (!card) return cardName;
  const effect = boardEffect(card);
  if (effect.kind === "draw" || effect.kind === "cash" && !effect.token) return effect.words;
  return `${effect.words} on ${projectLabel}`;
}

export function houseBonus(stored: string) {
  const name = canonicalCardName(stored);
  if (/1970s Bi-Level/i.test(name)) return 300000;
  if (/Suburban McMansion/i.test(name)) return 200000;
  if (/Historic Victorian/i.test(name)) return 200000;
  return 0;
}

export function customerCash(input: {
  name: string;
  tokensPlaced: number;
  specials: number;
  finishedAfter: number;
  isLastFinished: boolean;
  isFourthOrLater: boolean;
  complete: boolean;
  gameEnded?: boolean;
  marketingStars?: number;
}) {
  input = { ...input, name: canonicalCardName(input.name) };
  if (/Garcia/i.test(input.name)) return Math.min(input.finishedAfter, 4) * 200000;
  if (/Harris/i.test(input.name) && input.complete) return 400000;
  if (/Patel/i.test(input.name) && input.complete) return 200000;
  // Kim (printed Nov 4 flat): no cash. Its effect is the extra star placed on another project (server placeCard).
  if (/Rivera/i.test(input.name) && input.complete) return input.specials >= 2 ? 500000 : 0;
  if (/Thompson/i.test(input.name) && input.complete && input.isFourthOrLater) return -500000;
  if (/Lee/i.test(input.name)) return Math.min(input.tokensPlaced, 5) * 100000;
  if (/O'Brien/i.test(input.name) && input.complete && input.isLastFinished && input.gameEnded) return 400000;
  return 0;
}

export function stanleyPenalty(stored: string, round: number, status: string) {
  // Printed: "if not completed by the END of round 6" -> charged once round 7 starts.
  if (!/Stanley/i.test(canonicalCardName(stored)) || status === "complete") return 0;
  return round >= 7 ? -500000 : 0;
}

export function eventCash(name: string) {
  if (name === "Invoice Paid Early" || name === "Community Buzz") return 300000;
  if (name === "Material Spike" || name === "Warranty Claim") return -200000;
  return 0;
}
