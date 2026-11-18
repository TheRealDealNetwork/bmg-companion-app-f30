import { scoreMetalcon } from "./cards";

export type Letter = "A" | "B" | "C";

const STOP = new Set(
  "a an the to of and or for in on at is it you your their them this that with from by be as if not just into than then over out are was were but about when what who how its do don't did does can will would should they his her our".split(
    " ",
  ),
);

function tokens(value: string) {
  return new Set(
    (value.toLowerCase().replace(/—/g, " ").replace(/-/g, " ").match(/[a-z0-9']+/g) ?? []).filter(
      (word) => word.length >= 4 && !STOP.has(word),
    ),
  );
}

function sentences(why: string) {
  return why
    .split(/(?<=[.!])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Verbatim host-key text for why the picked letter is not the right one. */
export function missWhy(code: string, letter: Letter): string {
  const card = scoreMetalcon(code);
  if (!card) return "";
  const picked = tokens(card.options[letter]);
  const correct = tokens(card.options[card.correct]);
  let best = "";
  let bestScore = 0;
  for (const sentence of sentences(card.why)) {
    let score = 0;
    for (const word of tokens(sentence)) {
      if (picked.has(word) && !correct.has(word)) score += 2;
      else if (picked.has(word)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = sentence;
    }
  }
  if (bestScore >= 2) return best;
  const parts = sentences(card.why);
  const close = parts[parts.length - 1] ?? "";
  const bits = [card.voice, close].filter((bit, index, all) => bit && all.indexOf(bit) === index);
  return bits.join(" ");
}

export function scoreLabel(points: number) {
  if (points > 0) return `[+${points}]`;
  if (points < 0) return `[−${Math.abs(points)}]`;
  return `[0]`;
}

const POINT_TOKEN = /\[\s*[+\-−–]?\s*\d+\s*\]/g;

/** Remove old point-count tokens from player-facing text. Host mapping stays internal. */
export function stripPoints(value: string) {
  return value
    .replace(POINT_TOKEN, "")
    .replace(/\(\s*score\s*\)/gi, "")
    .replace(/\s*·\s*·\s*/g, " · ")
    .replace(/\s*·\s*$/g, "")
    .replace(/^\s*·\s*/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:])/g, "$1")
    .trim();
}

export function payrollPhrase(points: number, offDollars: number) {
  if (offDollars > 0) return `$${offDollars.toLocaleString("en-US")} off payroll`;
  if (points < 0 || points === 0) return `$500 added to payroll`;
  return "$0";
}

export type AnswerView = {
  correct: Letter;
  correctLabel: string;
  why: string;
  voice: string;
  choice: Letter;
  choiceLabel: string;
  choiceText: string;
  points: number;
  missed: boolean;
  missWhy: string;
  /** Dollars taken off payroll. 0 when this answer is not a +3 or +1 savings. */
  offDollars: number;
  /** Host-key score added to payroll when the score is negative. 0 otherwise. */
  addedPoints: number;
  payrollLabel: string;
  headline: string;
  next: string;
  listen: string;
  scoreLabel: string;
};

function asLetter(value: string): Letter | null {
  return value === "A" || value === "B" || value === "C" ? value : null;
}

export function viewAnswer(code: string, choiceRaw: string): AnswerView | null {
  const card = scoreMetalcon(code);
  const choice = asLetter(choiceRaw);
  if (!card || !choice || !card.points) return null;
  const points = card.points[choice];
  const reduction = card.values[choice];
  const missed = choice !== card.correct;
  const offDollars = points > 0 && reduction > 0 ? reduction : 0;
  const addedPoints = points < 0 ? Math.abs(points) : 0;
  const label = scoreLabel(points);
  const payrollLabel = payrollPhrase(points, offDollars);
  const correctWording = stripPoints(card.options[card.correct]);
  const choiceWording = stripPoints(card.options[choice]);
  const headline = payrollLabel;
  let next: string;
  if (!missed) {
    next = `Subtract $${offDollars.toLocaleString("en-US")} (score ${label}) from this round’s payroll, then draw 3 department action cards and play 2 of them on the board at the GM meeting. Always play 2 of the 3 drawn cards all the way through.`;
  } else if (offDollars > 0) {
    next = `Subtract $${offDollars.toLocaleString("en-US")} (score ${label}) from this round’s payroll. The next department player reads a new scenario and answers.`;
  } else if (points < 0) {
    next = `Add ${label} to this round’s payroll, and the next department player reads a new scenario and answers.`;
  } else {
    next = `Add [0] to this round’s payroll, and the next department player reads a new scenario and answers.`;
  }
  const whyMiss = missed ? missWhy(code, choice) : "";
  const listen = missed
    ? `Correct answer ${card.correct}. ${card.why} You picked ${choice}. ${card.options[choice]} ${whyMiss}`
    : `Correct answer ${card.correct}. ${card.why}`;
  return {
    correct: card.correct,
    correctLabel: correctWording,
    why: stripPoints(card.why),
    voice: stripPoints(card.voice),
    choice,
    choiceLabel: choiceWording,
    choiceText: choiceWording,
    points,
    missed,
    missWhy: stripPoints(whyMiss),
    offDollars,
    addedPoints,
    payrollLabel,
    headline,
    next: stripPoints(next),
    listen: stripPoints(listen),
    scoreLabel: label,
  };
}

/** Cents stored on the answer. A right answer takes $500 off. Every wrong answer adds $500. */
export function payrollCentsFor(code: string, choice: Letter) {
  const card = scoreMetalcon(code);
  if (!card?.points) return 0;
  const points = card.points[choice];
  if (choice === card.correct || points > 0) return (card.values[choice] || 500) * 100;
  return -50000;
}
