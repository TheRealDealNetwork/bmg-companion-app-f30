import { BOARD_DEPTS, type DeptId } from "./types";

export const DEPT_ICON: Partial<Record<DeptId, string>> = {
  Marketing: "STAR",
  "Appointment Center": "PHONE",
  Sales: "SALE",
  Production: "HAMMER",
  Accounting: "CALCULATOR",
};

export type CardEffect =
  | { kind: "play"; count: number }
  | { kind: "slot"; count: number }
  | { kind: "remove"; count: number }
  | { kind: "move"; count: number }
  | { kind: "none" };

export function cardEffect(text: string): CardEffect {
  const t = text.toUpperCase();
  const play = /PLAY\s+(\d+)/.exec(t);
  if (play) return { kind: "play", count: Number(play[1]) };
  if (t.includes("SLOT")) {
    const slot = /ADD\s+(\d+)/.exec(t);
    if (slot) return { kind: "slot", count: Number(slot[1]) };
  }
  const remove = /REMOVE\s+(\d+)/.exec(t);
  if (remove) return { kind: "remove", count: Number(remove[1]) };
  const move = /MOVE\s+(\d+)/.exec(t);
  if (move) return { kind: "move", count: Number(move[1]) };
  return { kind: "none" };
}

const EXTRA_DEPT: Record<string, DeptId> = {
  star: "Marketing",
  phone: "Appointment Center",
  $: "Sales",
  hammer: "Production",
  calculator: "Accounting",
};

/** A house or customer that adds one more icon slot. "any" is chosen when the project opens. */
export function extraSlot(text: string): DeptId | "any" | null {
  const named = /1 extra (star|phone|\$|hammer|calculator) slot/i.exec(text);
  if (named) return EXTRA_DEPT[named[1].toLowerCase()] ?? null;
  if (/1 extra icon slot of (?:any type|its choice)/i.test(text)) return "any";
  return null;
}

export function plainCardText(text: string): string {
  return text.replace(/^Accepted terms?:\s*/i, "").trim();
}

export function cashEffect(text: string): { immediate: number; onComplete: number } {
  const upper = text.toUpperCase();
  const amount = dollarCents(text);
  if (!amount) return { immediate: 0, onComplete: 0 };
  if (/CHOOSE|IF |FOR EACH|NOT COMPLETED|4TH OR LATER|AT LEAST 2|2 OR MORE/.test(upper)) {
    return { immediate: 0, onComplete: 0 };
  }
  const negative = /SUBTRACT|LOSE|PAYS \$|PAY \$|COMPANY PAYS/.test(upper);
  const signed = (negative ? -1 : 1) * amount;
  if (/ON PROJECT COMPLETION|WHEN THIS PROJECT COMPLETES/.test(upper)) return { immediate: 0, onComplete: signed };
  if (/REVENUE|COMPANY CASH|COMPANY PAYS/.test(upper)) return { immediate: signed, onComplete: 0 };
  return { immediate: 0, onComplete: 0 };
}

function dollarCents(text: string): number {
  const match = /\$([0-9,]+)/.exec(text);
  if (!match) return 0;
  return Number(match[1].replace(/,/g, "")) * 100;
}

const ICON_NOUN: Partial<Record<DeptId, string>> = {
  Marketing: "star",
  "Appointment Center": "phone",
  Sales: "sale",
  Production: "hammer",
  Accounting: "calculator",
};

/** Earlier departments on this project must be filled, including extra slots, before this one can play. */
export function stageReady(
  project: { n: number; tokens: { dept: DeptId; filled: boolean }[] },
  dept: DeptId,
): true | string {
  const index = (BOARD_DEPTS as readonly string[]).indexOf(dept);
  if (index <= 0) return true;
  for (let i = 0; i < index; i++) {
    const earlier = BOARD_DEPTS[i];
    const tokens = project.tokens.filter((token) => token.dept === earlier);
    const waiting = tokens.filter((token) => !token.filled).length;
    if (tokens.length > 0 && waiting === 0) continue;
    const need = waiting || 1;
    const noun = ICON_NOUN[earlier] ?? "icon";
    return `Project ${project.n} still needs ${need} ${noun}${need === 1 ? "" : "s"} before ${dept} can play there.`;
  }
  return true;
}

export function tokenClass(dept: DeptId, filled: boolean): string {
  if (!filled) {
    if (dept === "Marketing") return "border-2 border-stage-star bg-transparent text-stage-star";
    if (dept === "Appointment Center") return "border-2 border-stage-phone bg-transparent text-stage-phone";
    if (dept === "Sales") return "border-2 border-stage-sale bg-transparent text-stage-sale";
    if (dept === "Production") return "border-2 border-stage-hammer bg-transparent text-stage-hammer";
    if (dept === "Accounting") return "border-2 border-stage-calc bg-transparent text-stage-calc";
    return "border-2 border-line bg-transparent text-muted";
  }
  if (dept === "Marketing") return "bg-stage-star text-cream";
  if (dept === "Appointment Center") return "bg-stage-phone text-cream";
  if (dept === "Sales") return "bg-stage-sale text-cream";
  if (dept === "Production") return "bg-stage-hammer text-cream";
  if (dept === "Accounting") return "bg-stage-calc text-cream";
  if (dept === "Recruiting") return "bg-dept-re text-cream";
  if (dept === "General Manager") return "bg-dept-gm text-cream";
  if (dept === "Owner") return "bg-dept-ow text-navy";
  return "bg-navy-2 text-cream";
}
