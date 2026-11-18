import {
  answersThisRound,
  computeBoard,
  headsFor,
  honorsOf,
  hydrate,
  isHead,
  latestValue,
  annualOf,
  missingPayroll,
  principleCounts,
  scenarioCap,
} from "./engine";
import {
  BOARD_CUE,
  DEPT_SHORT,
  SURVEY,
  type Answer,
  type DeptId,
  type ForcedFlag,
  type GameState,
  type GameView,
  type HelpReq,
  type LogEntry,
  type Mine,
  type Player,
  type PublicPlayer,
  type SeatContact,
} from "./types";

export type Viewer =
  | { kind: "host" }
  | { kind: "player"; player: Player }
  | { kind: "room" };

function pub(p: Player): PublicPlayer {
  return {
    id: p.id,
    name: p.name,
    dept: p.dept,
    table: p.table,
    joinOrder: p.joinOrder,
    joinedAt: p.joinedAt,
    active: p.active,
    claimed: p.claimed !== false && p.secret.length > 0,
    standIn: Boolean(p.standIn),
  };
}

function contactsOf(state: GameState): SeatContact[] {
  return state.players.map((p) => ({
    id: p.id,
    phone: p.phone ?? "",
    invite: p.invite ?? "",
    textedAt: p.textedAt ?? null,
  }));
}

function stripAnswer(a: Answer, keepNote: boolean): Answer {
  if (keepNote) return a;
  return { ...a, hostNote: "", choiceText: "" };
}

export function present(
  code: string,
  rev: number,
  state: GameState,
  viewer: Viewer,
  serverNow: number,
): GameView {
  hydrate(state);
  const role = viewer.kind;
  const player = viewer.kind === "player" ? viewer.player : null;
  const host = role === "host";
  const answers = state.answers.filter((a) => {
    if (host) return true;
    if (player) return a.dept === player.dept;
    return false;
  }).map((a) => stripAnswer(a, host || !!player));

  const plays = state.plays.filter((p) => host || (player ? p.dept === player.dept : false));
  const help: HelpReq[] = host
    ? state.help
    : player
      ? state.help.filter((h) => h.playerId === player.id)
      : [];
  const log: LogEntry[] = state.log.filter((entry) => {
    if (host) return true;
    if (entry.scope === "host") return false;
    if (entry.scope === "table") return !!player && entry.table === player.dept;
    return true;
  });

  let mine: Mine | null = null;
  if (player) {
    const forced =
      state.plays.find((p) => p.dept === player.dept && p.round === state.round && p.forced) ?? null;
    const pre = state.surveys[player.id]?.pre;
    const post = state.surveys[player.id]?.post;
    const mineAnswers = state.answers.filter((a) => a.playerId === player.id);
    let climb: number | null = null;
    if (pre && post && pre.length === 3 && post.length === 3) {
      climb = post.reduce((s, n, i) => s + n - (pre[i] ?? n), 0);
    }
    const roundHand = (state.hands?.[player.dept] ?? []).filter((card) => card.round === state.round);
    const negatives = roundHand.filter((card) => card.type === "NEGATIVE").length;
    const negativeCleared = latestValue(state, player.dept) === 50000;
    const played = state.plays.some((play) => play.dept === player.dept && play.round === state.round);
    mine = {
      playerId: player.id,
      isHead: isHead(state, player.id),
      atRisk: negatives === 1 && !negativeCleared,
      mustPlayNegative: negatives === 1 && !negativeCleared,
      negativeCleared,
      canRedeal: negatives >= 2 && !played && !state.redeals?.[`${state.round}:${player.dept}`],
      forced,
      cap: scenarioCap(state, player.dept),
      used: answersThisRound(state, player.dept).length,
      preDone: !!pre,
      postDone: !!post,
      climb,
      correct: mineAnswers.filter((a) => a.valueCents === 50000).length,
      answered: mineAnswers.length,
    };
  }

  const forced: ForcedFlag[] | null = host
    ? (["Marketing", "Appointment Center", "Sales", "Production", "Accounting"] as const).map((dept) => ({
        dept,
        willForce: latestValue(state, dept) !== 50000 && (state.hands?.[dept] ?? []).some((card) => card.round === state.round && card.type === "NEGATIVE"),
        played: state.plays.some((p) => p.dept === dept && p.round === state.round && p.forced),
      }))
    : null;

  const showSurvey = host && (state.status === "audit" || state.status === "post" || state.status === "done");
  const surveyDone = host
    ? state.players.map((p) => ({
        id: p.id,
        name: p.name,
        pre: !!state.surveys[p.id]?.pre,
        post: !!state.surveys[p.id]?.post,
        ...(showSurvey
          ? { preScores: state.surveys[p.id]?.pre, postScores: state.surveys[p.id]?.post }
          : {}),
      }))
    : [];

  return {
    code,
    rev,
    role,
    company: state.company,
    rehearsal: state.rehearsal,
    status: state.status,
    round: state.round,
    phase: state.phase,
    settings: state.settings,
    timers: state.timers,
    announcement: state.announcement,
    rosterLocked: state.rosterLocked,
    players: state.players.map(pub),
    contacts: host ? contactsOf(state) : null,
    smsReady: false,
    heads: headsFor(state),
    board: computeBoard(state),
    scores: host ? state.scores : null,
    adjustments: state.adjustments,
    pending: host ? state.pending : [],
    answers,
    plays,
    events: state.events,
    eventDeck: null,
    customers: state.customers,
    houses: state.houses,
    hand: player && player.dept ? (state.hands?.[player.dept] ?? []).filter((card) => card.round === state.round) : [],
    hands: host ? (state.hands ?? {}) : null,
    projects: state.projects ?? [],
    boardStep: state.boardStep ?? 0,
    help,
    log: log.slice(-40).reverse(),
    shoutouts: state.shoutouts,
    showBeat: state.showBeat,
    honors: state.status === "lobby" ? [] : honorsOf(state),
    principles: principleCounts(state),
    forced,
    mine,
    surveyPrompts: SURVEY.map((s) => ({ key: s.key, prompt: s.prompt })),
    ownSurvey: player ? (state.surveys[player.id] ?? null) : null,
    surveyDone,
    ownFeedback: player ? (state.feedback[player.id] ?? null) : null,
    ...turnOf(state, player),
    serverNow,
  };
}

function turnOf(state: GameState, player: Player | null) {
  const step = state.boardStep ?? 0;
  const waiting = step >= BOARD_CUE.length;
  const dept: DeptId = waiting ? "General Manager" : (BOARD_CUE[step] ?? "General Manager");
  const head = headsFor(state).find((item) => item.dept === dept)?.name ?? "the department head";
  const key = `${state.round}:${dept}`;
  const openPayroll: DeptId[] = state.status === "live"
    ? dept === "General Manager"
      ? missingPayroll(state)
      : annualOf(state, dept) == null
        ? [dept]
        : []
    : [];
  const weekly = (["General Manager", "Marketing", "Appointment Center", "Sales", "Production", "Accounting"] as const).reduce((sum, name) => {
    const annual = annualOf(state, name);
    return sum + (typeof annual === "number" ? Math.round((annual * 100) / 52) : 0);
  }, 0);
  let stage: GameView["turn"]["step"] = "wait";
  let line = "Departments are done. The GM opens the next round.";
  if (!waiting && state.status === "live") {
    if (dept === "General Manager" && openPayroll.length) {
      stage = "payroll";
      line = `${head} asks each first department head for annual payroll. It locks for the game and is charged every round.`;
    } else if (annualOf(state, dept) == null) {
      stage = "payroll";
      line = `${head} gives ${DEPT_SHORT[dept]} annual payroll to the GM. It locks and is charged every round.`;
    } else if (dept !== "General Manager" && (state.focus?.[key] ?? []).length < 2) {
      stage = "focus";
      line = `${head}, go to the board meeting. Choose the two projects ${DEPT_SHORT[dept]} will play on this round, then tell your table.`;
    } else if (dept === "General Manager" && !state.events.some((event) => event.round === state.round)) {
      stage = "event";
      line = `${head} plays the one event that was dealt.`;
    } else if (dept !== "General Manager" && !state.skipped?.[key] && !state.plays.some((play) => play.dept === dept && play.round === state.round && (state.plays.filter((item) => item.dept === dept && item.round === state.round).length >= 2))) {
      stage = "cards";
      line = `${head} has three cards. Choose two and play them on the department's projects.`;
    } else if (!state.answers.some((answer) => answer.round === state.round && answer.dept === dept && answer.duty)) {
      stage = "principle";
      line = `${head} answers the People & Principles card.`;
    } else {
      stage = "cards";
      line = `${head} plays ${DEPT_SHORT[dept]}'s cards on the two chosen projects.`;
    }
  }
  return {
    turn: { dept, head, step: stage, line, weeklyCents: weekly, openPayroll: stage === "payroll" ? openPayroll : [] },
    focusIds: player ? (state.focus?.[`${state.round}:${player.dept}`] ?? []) : [],
    note: player ? (state.notes?.[player.id] ?? "") : "",
    dutyCard: null,
  };
}
