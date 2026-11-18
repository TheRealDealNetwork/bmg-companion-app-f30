import key from "./key.json";
import type { DeptId } from "@/lib/game/types";
import { METALCON_SEAT_LABEL } from "./seats";

export type MetalFace = {
  code: string;
  dept: DeptId;
  n: number;
  title: string;
  scenario: string;
  options: { A: string; B: string; C: string };
};

export type MetalCard = MetalFace & {
  values: { A: number; B: number; C: number };
  /** Host-key judgment points. +3 best, +1 partial, 0 neutral, negative misses. */
  points: { A: number; B: number; C: number };
  correct: "A" | "B" | "C";
  why: string;
  voice: string;
};

const PREFIX: Record<DeptId, string> = {
  Marketing: "BE-MK",
  "Appointment Center": "BE-AC",
  Sales: "BE-SA",
  Production: "BE-PR",
  Accounting: "BE-ACC",
  Recruiting: "BE-RE",
  "General Manager": "BE-GM",
  Owner: "BE-OW",
};

const DEPT_BY_PREFIX = Object.fromEntries(Object.entries(PREFIX).map(([dept, prefix]) => [prefix, dept])) as Record<
  string,
  DeptId
>;

export function isCompanionCard(code: string): boolean {
  const c = code.trim().toUpperCase();
  return !c.startsWith("BE-OW") && !c.startsWith("BE-RE");
}

const byCode = new Map<string, MetalCard>(
  (key as MetalCard[]).filter((card) => isCompanionCard(card.code)).map((card) => [card.code, card]),
);

export const COMPANION_CARD_COUNT = byCode.size;

function face(card: MetalCard): MetalFace {
  return {
    code: card.code,
    dept: card.dept,
    n: card.n,
    title: card.title,
    scenario: card.scenario,
    options: card.options,
  };
}

export function listForDept(dept: DeptId): MetalFace[] {
  if (dept === "Owner" || dept === "Recruiting") return [];
  return (key as MetalCard[]).filter((card) => card.dept === dept && !card.code.startsWith("BE-OW") && !card.code.startsWith("BE-RE"));
}

export function lookupMetalcon(rawInput: string, dept: DeptId): { error: string } | { card: MetalFace } {
  const s = rawInput.trim().toUpperCase().replace(/\s+/g, "");
  let code = "";
  let owner: DeptId | undefined;
  if (/^\d{1,2}$/.test(s)) {
    const n = Number(s);
    code = `${PREFIX[dept]}-${s.padStart(2, "0")}`;
    if (n < 1 || n > 40) return { error: `No ${code} card was found.` };
    owner = dept;
  } else {
    const match = /^BE-?([A-Z]{2,3})-?(\d{1,2})$/.exec(s);
    if (!match) return { error: "Enter the last two digits, or a full code like BE-MK-07." };
    const prefix = `BE-${match[1]}`;
    owner = DEPT_BY_PREFIX[prefix];
    const n = Number(match[2]);
    code = `${prefix}-${match[2].padStart(2, "0")}`;
    if (!owner || n < 1 || n > 40) return { error: `No ${code} card was found.` };
    if (owner === "Owner" || owner === "Recruiting" || code.startsWith("BE-OW") || code.startsWith("BE-RE")) {
      return { error: `No ${code} card was found.` };
    }
    if (owner !== dept) {
      return {
        error: `That card is ${code} (${METALCON_SEAT_LABEL[owner]}). This seat is ${METALCON_SEAT_LABEL[dept]}.`,
      };
    }
  }
  const card = byCode.get(code);
  if (!card || card.dept !== owner || card.code.startsWith("BE-OW") || card.code.startsWith("BE-RE") || owner === "Owner" || owner === "Recruiting") return { error: `No ${code} card was found.` };
  return { card: face(card) };
}

export function scoreMetalcon(code: string): MetalCard | null {
  return byCode.get(code.trim().toUpperCase()) ?? null;
}
