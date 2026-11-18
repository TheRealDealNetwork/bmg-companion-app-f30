export const BOARD_DEPTS = [
  "Marketing",
  "Appointment Center",
  "Sales",
  "Production",
  "Accounting",
] as const;

export const EXTRA_DEPTS = ["Recruiting", "Owner", "General Manager"] as const;

export const ALL_DEPTS = [...BOARD_DEPTS, ...EXTRA_DEPTS] as const;

/** Roles a GM can assign today. Recruiting and Owner stay in the data for a later game. */
export const SEAT_DEPTS = [...BOARD_DEPTS, "General Manager"] as const;

/** Between rounds, heads are called in this order. */
export const BOARD_CUE = ["General Manager", ...BOARD_DEPTS] as const;

export type DeptId = (typeof ALL_DEPTS)[number];

export const DEPT_SHORT: Record<DeptId, string> = {
  Marketing: "Marketing",
  "Appointment Center": "Appointments",
  Sales: "Sales",
  Production: "Production",
  Accounting: "Accounting",
  Recruiting: "Recruiting",
  Owner: "Owner",
  "General Manager": "GM",
};

export const PHASES = [
  { n: 1, label: "Event" },
  { n: 2, label: "Board & P&P" },
  { n: 3, label: "Projects" },
  { n: 4, label: "Draw & play" },
  { n: 5, label: "Payroll" },
] as const;

export const SURVEY = [
  {
    key: "department_interdependence",
    prompt:
      "How well do you understand how the departments of a contracting business work together?",
  },
  {
    key: "leadership_role_clarity",
    prompt:
      "How clearly can you see yourself in a management or ownership role in the trades?",
  },
  {
    key: "principle_profit_alignment",
    prompt:
      "How much do you believe doing the right thing is also the most profitable thing in business?",
  },
] as const;

export const SHOUT_PRINCIPLES = [
  "Define Reality First",
  "Do Right When It Costs You",
  "Expectations Before Accountability",
  "Brilliant on the Basics",
  "Give Away the Credit, Take the Blame",
  "How We Do Anything Is How We Do Everything",
  "Serve the Human, Not the House",
  "Love Is the Greatest Leadership Tool",
  "Know Your Numbers",
  "Character Over Skill",
  "The Business Serves Its Owner",
  "Never Pre-Judge",
] as const;

export const NEXT_ROLES = [...SEAT_DEPTS];

export type Status = "lobby" | "live" | "audit" | "post" | "done";

export type GameSummary = {
  code: string;
  company: string;
  rehearsal: boolean;
  status: Status;
  round: number;
  phase: number;
  players: number;
  updatedAt: string;
  owned: boolean;
  hosts: { id: string; label: string; yours: boolean }[];
};

export type Settings = {
  rounds: number;
  roundSec: number;
  gameSec: number;
  marginBps: number;
  winCents: number;
  mlCents: number;
};

export type Timers = {
  running: boolean;
  paused: boolean;
  roundDeadline: number | null;
  gameDeadline: number | null;
  roundLeft: number;
  gameLeft: number;
};

export type Player = {
  id: string;
  name: string;
  dept: DeptId;
  table: string;
  joinOrder: number;
  joinedAt: number;
  active: boolean;
  /** False when the GM seated them and this phone has not claimed the seat yet. */
  claimed?: boolean;
  /** E.164 mobile, host only. Never sent to player or projector views. */
  phone?: string;
  /** Unguessable seat-link token. Host only. */
  invite?: string;
  /** When the GM last opened or sent the seat text. */
  textedAt?: number;
  secret: string;
  /** Durable profile. Never shown as a username during play. */
  profileId?: string;
  /** Rehearsal stand-in. Not a real profile. */
  standIn?: boolean;
};

export type Answer = {
  id: string;
  round: number;
  dept: DeptId;
  playerId: string | null;
  playerName: string;
  cardCode: string;
  title: string;
  choice: "A" | "B" | "C";
  choiceText: string;
  valueCents: number;
  correct: "A" | "B" | "C";
  principle: string;
  hostNote: string;
  at: number;
  /** The one required People & Principles answer on this department's turn. */
  duty?: boolean;
};

export type RoundScore = {
  revenue: Partial<Record<DeptId, number | null>>;
  payroll: Partial<Record<DeptId, number | null>>;
};

export type Adjustment = {
  id: string;
  round: number;
  label: string;
  cents: number;
  at: number;
};

export type PendingBonus = {
  id: string;
  round: number;
  dept: DeptId;
  label: string;
  cents: number;
  projectId?: string;
};

export type HelpReq = {
  id: string;
  playerId: string;
  name: string;
  dept: DeptId;
  note: string;
  status: "open" | "ack" | "done";
  at: number;
};

export type LogEntry = {
  id: string;
  at: number;
  scope: "public" | "host" | "table";
  table: string;
  text: string;
};

export type DeptPlay = {
  id: string;
  round: number;
  dept: DeptId;
  name: string;
  type: string;
  text: string;
  forced: boolean;
  exempt: boolean;
  at: number;
  projectId?: string;
  projectIds?: string[];
  projectLabel?: string;
  /** The person who submitted this play. Reports use this, not the department. */
  playerId?: string;
  playerName?: string;
};

export type Decision = {
  id: string;
  round: number;
  dept: DeptId;
  playerId: string;
  playerName: string;
  profileId: string;
  kind: "payroll" | "focus" | "action" | "pp" | "pass";
  detail: string;
};

export type FaceDraw = {
  id: string;
  round: number;
  name: string;
  text: string;
  type: string;
  at: number;
};

export type HandCard = {
  id: string;
  index: number;
  name: string;
  type: string;
  text: string;
  round: number;
};

export type ProjectFace = { name: string; text: string };

export type ProjectToken = {
  id: string;
  dept: DeptId;
  filled: boolean;
  /** Extra slot required by the house or customer. Shown as +1. */
  bonus?: boolean;
};

export type Project = {
  id: string;
  n: number;
  round: number;
  valueCents: number;
  status: "open" | "closed";
  customer: ProjectFace | null;
  house: ProjectFace | null;
  tokens: ProjectToken[];
  /** Base slots and house/customer extras have been added. */
  slotsReady?: boolean;
  /** Contract revenue has been posted. */
  collected?: boolean;
  /** Missed-deadline fee has been posted. */
  lateFee?: boolean;
  /** Contract value plus house and customer bonuses or penalties, in cents. */
  earnedCents?: number;
};

export type Shout = {
  id: string;
  round: number;
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  principle: string;
  at: number;
};

export type Feedback = {
  experience?: number;
  nps?: number;
  quote?: string;
  consent?: boolean;
  nextRole?: string;
};

export type Bags = {
  event: number[];
  customer: number[];
  house: number[];
  dept: Partial<Record<DeptId, number[]>>;
};

export type GameState = {
  company: string;
  rehearsal: boolean;
  status: Status;
  round: number;
  phase: number;
  settings: Settings;
  timers: Timers;
  rosterLocked: boolean;
  players: Player[];
  headOverride: Record<string, string>;
  scores: RoundScore[];
  adjustments: Adjustment[];
  pending: PendingBonus[];
  answers: Answer[];
  plays: DeptPlay[];
  events: FaceDraw[];
  customers: FaceDraw[];
  houses: FaceDraw[];
  hands?: Partial<Record<DeptId, HandCard[]>>;
  projects?: Project[];
  /** Dollar amounts already opened: 10000, 20000, 30000. */
  waves?: number[];
  /** `${round}:${dept}` hands that already used their one re-deal. */
  redeals?: Record<string, true>;
  /** Index into BOARD_CUE. Whose department is at the board. */
  boardStep?: number;
  help: HelpReq[];
  log: LogEntry[];
  shoutouts: Shout[];
  surveys: Record<string, { pre?: number[]; post?: number[] }>;
  feedback: Record<string, Feedback>;
  announcement: string;
  showBeat: number;
  bags: Bags;
  shield: Partial<Record<DeptId, number>>;
  createdAt: number;
  /** sha256 of the Super Admin key that owns the desk. Never sent to players. */
  desk?: string;
  /** Profile that hosts this game. Host Admin sees their own games. */
  hostProfileId?: string;
  /** People who can open this game. Hashes stay on the server. */
  admins?: { id: string; label: string; hash: string; rank?: "super" | "host" }[];
  /** Extra host-key hashes. The first key stays on the game row. */
  hostHashes?: string[];
  /** Annual payroll dollars, once per department. A legacy `${round}:${dept}` key still counts. */
  payAnnual?: Record<string, number>;
  /** Two project ids keyed by `${round}:${dept}`. */
  focus?: Record<string, string[]>;
  notes?: Record<string, string>;
  /** Off-turn People & Principles answers since this department's turn started. */
  offPp?: Partial<Record<DeptId, number>>;
  dutyCode?: string;
  dutyFor?: string;
  /** `${round}:${dept}` card plays skipped because nothing legal was open. */
  skipped?: Record<string, true>;
  /** One row per submitted decision, attributed to the person who sent it. */
  decisions?: Decision[];
};

export type Head = { table: string; playerId: string; name: string; dept: DeptId };

export type DeptTotals = {
  dept: DeptId;
  revenue: number;
  payroll: number;
  netPay: number;
  pp: number;
  profit: number;
  margin: number | null;
  payrollMissing: boolean;
};

export type RoundTotals = {
  round: number;
  revenue: number;
  payroll: number;
  pp: number;
  profit: number;
};

export type Board = {
  depts: DeptTotals[];
  rounds: RoundTotals[];
  revenue: number;
  netPay: number;
  pp: number;
  profit: number;
  margin: number | null;
  valuation: number;
  win: boolean;
  marketLeader: boolean;
  adj: number;
  marginOk: boolean;
};

export type Honor = { id: string; title: string; detail: string; names: string[] };

export type PublicPlayer = Omit<Player, "secret" | "phone" | "invite" | "textedAt">;

export type SeatContact = {
  id: string;
  phone: string;
  invite: string;
  textedAt: number | null;
};

export type Mine = {
  playerId: string;
  isHead: boolean;
  atRisk: boolean;
  /** One negative in the hand, and the best P&P answer has not cleared it. */
  mustPlayNegative: boolean;
  /** Best answer this round. A single mandatory negative can be skipped. */
  negativeCleared: boolean;
  /** Two or three negatives in the first hand. One re-deal, and only then. */
  canRedeal: boolean;
  forced: DeptPlay | null;
  cap: number;
  used: number;
  preDone: boolean;
  postDone: boolean;
  climb: number | null;
  correct: number;
  answered: number;
};

export type EventPick = { index: number; name: string; type: string; text: string };

export type ForcedFlag = { dept: DeptId; willForce: boolean; played: boolean };

export type GameView = {
  code: string;
  rev: number;
  role: "host" | "player" | "room";
  company: string;
  rehearsal: boolean;
  status: Status;
  round: number;
  phase: number;
  settings: Settings;
  timers: Timers;
  announcement: string;
  rosterLocked: boolean;
  players: PublicPlayer[];
  contacts: SeatContact[] | null;
  smsReady: boolean;
  heads: Head[];
  board: Board;
  scores: RoundScore[] | null;
  adjustments: Adjustment[];
  pending: PendingBonus[];
  answers: Answer[];
  plays: DeptPlay[];
  events: FaceDraw[];
  /** Shuffled event deck. Only the GM sees it, and only until one is played this round. */
  eventDeck: EventPick[] | null;
  customers: FaceDraw[];
  houses: FaceDraw[];
  hand: HandCard[];
  hands: Partial<Record<DeptId, HandCard[]>> | null;
  projects: Project[];
  boardStep: number;
  help: HelpReq[];
  log: LogEntry[];
  shoutouts: Shout[];
  showBeat: number;
  honors: Honor[];
  principles: { name: string; count: number }[];
  forced: ForcedFlag[] | null;
  mine: Mine | null;
  surveyPrompts: { key: string; prompt: string }[];
  ownSurvey: { pre?: number[]; post?: number[] } | null;
  surveyDone: {
    id: string;
    name: string;
    pre: boolean;
    post: boolean;
    preScores?: number[];
    postScores?: number[];
  }[];
  ownFeedback: Feedback | null;
  serverNow: number;
  turn: {
    dept: DeptId;
    head: string;
    step: "payroll" | "focus" | "event" | "cards" | "principle" | "wait";
    line: string;
    weeklyCents: number;
    /** Departments whose annual payroll is still unset. Empty once it is locked. */
    openPayroll: DeptId[];
  };
  focusIds: string[];
  note: string;
  dutyCard: { code: string; title: string; scenario: string; options: { A: string; B: string; C: string } } | null;
};

export type Choice = "A" | "B" | "C";

export type FullCard = {
  code: string;
  dept: DeptId;
  n: number;
  title: string;
  scenario: string;
  options: Record<Choice, string>;
  values: Record<Choice, number>;
  correct: Choice;
  hostNote: string;
  principle: string;
};

export function isDept(value: string): value is DeptId {
  return (ALL_DEPTS as readonly string[]).includes(value);
}

export function principleOf(hostNote: string): string {
  const match = /^Principle:\s*([^.]+)/.exec(hostNote.trim());
  return match ? match[1].trim() : "The principle";
}
