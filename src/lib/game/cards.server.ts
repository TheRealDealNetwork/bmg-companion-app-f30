import raw from "./dataset.json";
import { BOARD_DEPTS, type DeptId, isDept, principleOf } from "./types";

type Opt = { text: string; value: number };
type Pp = {
  n: number;
  title: string;
  scenario: string;
  options: { A: Opt; B: Opt; C: Opt };
  correct: "A" | "B" | "C";
  host_note: string;
  card_code: string;
  dept: DeptId;
};
type Simple = { name: string; dept: string; type: string; text: string; copies?: number };

const data = raw as {
  pp_decks: { deck: string; cards: Omit<Pp, "dept">[] }[];
  department_cards: Simple[];
  event_cards: Simple[];
  customer_cards: Simple[];
  house_cards: Simple[];
};

const byCode = new Map<string, Pp>();
for (const deck of data.pp_decks) {
  if (!isDept(deck.deck)) continue;
  for (const card of deck.cards) {
    byCode.set(card.card_code, { ...card, dept: deck.deck });
  }
}

export const PREFIX: Record<DeptId, string> = {
  Marketing: "BE-MK",
  "Appointment Center": "BE-AC",
  Sales: "BE-SA",
  Production: "BE-PR",
  Accounting: "BE-ACC",
  Recruiting: "BE-RE",
  Owner: "BE-OW",
  "General Manager": "BE-GM",
};

const DEPT_BY_PREFIX = Object.fromEntries(
  Object.entries(PREFIX).map(([dept, prefix]) => [prefix, dept]),
) as Record<string, DeptId>;

export function shuffle(list: number[]): number[] {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j] ?? tmp;
    a[j] = tmp;
  }
  return a;
}

export function freshBags() {
  const dept: Partial<Record<DeptId, number[]>> = {};
  for (const name of BOARD_DEPTS) {
    const idxs: number[] = [];
    data.department_cards.forEach((card, i) => {
      if (card.dept !== name) return;
      const copies = card.copies ?? 1;
      for (let c = 0; c < copies; c++) idxs.push(i);
    });
    dept[name] = shuffle(idxs);
  }
  return {
    event: shuffle(data.event_cards.map((_, i) => i)),
    customer: shuffle(data.customer_cards.map((_, i) => i)),
    house: shuffle(data.house_cards.map((_, i) => i)),
    dept,
  };
}

export function refillDept(dept: DeptId): number[] {
  return freshBags().dept[dept] ?? [];
}

export function refillSimple(deck: "event" | "customer" | "house"): number[] {
  const bags = freshBags();
  return bags[deck];
}

export function cleanBlurb(text: string): string {
  return text
    .replace(/^Accepted terms?:\s*/i, "")
    .replace(
      /^EVENT - drawn by the GM at the start of the round\. No legal effect: discard and redraw\.\s*/i,
      "",
    )
    .trim();
}

export type PublicCard = {
  code: string;
  dept: DeptId;
  n: number;
  title: string;
  scenario: string;
  options: { A: string; B: string; C: string };
};

export type FullCard = PublicCard & {
  values: { A: number; B: number; C: number };
  correct: "A" | "B" | "C";
  hostNote: string;
  principle: string;
};

function toPublic(card: Pp): PublicCard {
  return {
    code: card.card_code,
    dept: card.dept,
    n: card.n,
    title: card.title,
    scenario: card.scenario,
    options: { A: card.options.A.text, B: card.options.B.text, C: card.options.C.text },
  };
}

function toFull(card: Pp): FullCard {
  return {
    ...toPublic(card),
    values: { A: card.options.A.value, B: card.options.B.value, C: card.options.C.value },
    correct: card.correct,
    hostNote: card.host_note,
    principle: principleOf(card.host_note),
  };
}

export function normalizeLookup(
  rawInput: string,
  dept?: DeptId,
): { error: string } | { code: string; dept: DeptId } {
  const s = rawInput.trim().toUpperCase().replace(/\s+/g, "");
  if (/^\d{1,2}$/.test(s)) {
    if (!dept) return { error: "Choose a department, or enter the full code." };
    const n = Number(s);
    if (n < 1 || n > 40) return { error: `No ${PREFIX[dept]}-${s.padStart(2, "0")} card was found.` };
    return { code: `${PREFIX[dept]}-${s.padStart(2, "0")}`, dept };
  }
  const match = /^BE-?([A-Z]{2,3})-?(\d{1,2})$/.exec(s);
  if (!match) return { error: "Enter the last two digits, or a full code like BE-MK-07." };
  const prefix = `BE-${match[1]}`;
  const owner = DEPT_BY_PREFIX[prefix];
  const n = Number(match[2]);
  const code = `${prefix}-${match[2].padStart(2, "0")}`;
  if (!owner || n < 1 || n > 40) return { error: `No ${code} card was found.` };
  if (dept && owner !== dept) {
    return {
      error: `That card is ${code} (${owner}). This seat is ${dept} (${PREFIX[dept]}). Ask the GM before switching decks.`,
    };
  }
  return { code, dept: owner };
}

export function publicByCode(code: string): PublicCard | null {
  const card = byCode.get(code.trim().toUpperCase());
  return card ? toPublic(card) : null;
}

export function randomCode(dept: DeptId): string {
  const cards = [...byCode.values()].filter((card) => card.dept === dept);
  const card = cards[Math.floor(Math.random() * cards.length)];
  return card?.card_code ?? "";
}

export function lookupPlayer(rawInput: string, dept: DeptId): { error: string } | { card: PublicCard } {
  const norm = normalizeLookup(rawInput, dept);
  if ("error" in norm) return norm;
  const card = byCode.get(norm.code);
  if (!card || card.dept !== dept) return { error: `No ${norm.code} card was found.` };
  return { card: toPublic(card) };
}

export function lookupHost(rawInput: string, dept?: DeptId): { error: string } | { card: FullCard } {
  const norm = normalizeLookup(rawInput, dept);
  if ("error" in norm) return norm;
  const card = byCode.get(norm.code);
  if (!card) return { error: `No ${norm.code} card was found.` };
  return { card: toFull(card) };
}

export function fullByCode(code: string): FullCard | null {
  const card = byCode.get(code);
  return card ? toFull(card) : null;
}

export type Snap = { name: string; type: string; text: string; dept: string };

export function deptSnap(index: number): Snap | null {
  const card = data.department_cards[index];
  if (!card) return null;
  return { name: card.name, type: card.type, text: card.text, dept: card.dept };
}

export function faceSnap(deck: "event" | "customer" | "house", index: number): Snap | null {
  const list =
    deck === "event" ? data.event_cards : deck === "customer" ? data.customer_cards : data.house_cards;
  const card = list[index];
  if (!card) return null;
  return { name: card.name, type: card.type || deck, text: cleanBlurb(card.text), dept: card.dept };
}

const DEPT_MONEY: Record<string, number> = {
  "INVOICE BLITZ": 300_000,
  "QUICK AUDIT": 400_000,
  "OVERBUDGET SURPRISE": -300_000,
};

const PENDING_MONEY: Record<string, number> = {
  "UPSELL CLOSE": 200_000,
};

const EVENT_MONEY: Record<string, number> = {
  "INVOICE PAID EARLY": 300_000,
  "MATERIAL SPIKE": -200_000,
  "WARRANTY CLAIM": -200_000,
  "FINANCING FALLS THROUGH": -200_000,
};

export function deptMoney(name: string): number | null {
  return DEPT_MONEY[name] ?? null;
}
export function pendingMoney(name: string): number | null {
  return PENDING_MONEY[name] ?? null;
}
export function eventMoney(name: string): number | null {
  return EVENT_MONEY[name] ?? null;
}

export function catalog() {
  return {
    department: data.department_cards.map((c) => ({
      name: c.name,
      dept: c.dept,
      type: c.type,
      text: c.text,
      copies: c.copies ?? 1,
    })),
    event: data.event_cards.map((c) => ({
      name: c.name,
      type: c.type,
      text: cleanBlurb(c.text),
    })),
    customer: data.customer_cards.map((c) => ({ name: c.name, text: c.text })),
    house: data.house_cards.map((c) => ({ name: c.name, text: c.text })),
  };
}
