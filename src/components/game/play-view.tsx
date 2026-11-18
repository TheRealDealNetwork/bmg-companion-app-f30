import { Building2, Ellipsis, LifeBuoy, Play, StickyNote, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { lookupCard, assumeSeat } from "@/lib/game/api";
import { money } from "@/lib/game/format";
import { cardEffect, DEPT_ICON, stageReady } from "@/lib/game/icons";
import { BOARD_CUE, BOARD_DEPTS, DEPT_SHORT, NEXT_ROLES, PHASES, SHOUT_PRINCIPLES, type Answer, type EventPick, type GameView, type HandCard, type Project } from "@/lib/game/types";
import { BoardCue, ProjectBoard, Sheet } from "./board";
import { ReportPanel } from "./report-panel";
import { BrandBar, Btn, Card, CardCopy, ClockReadout, DeptTable, Field, ReadAloud, Select, Valuation } from "./ui";
import { useGame } from "./use-game";
import { clearPlayer, writeSlot } from "@/lib/game/session";

type Tab = "play" | "company" | "notes" | "team" | "help" | "more";

export function PlayView({ code }: { code: string }) {
  const game = useGame(code, "player");
  const [tab, setTab] = useState<Tab>("play");
  const [err, setErr] = useState("");
  const [reveal, setReveal] = useState<Answer | null>(null);
  const [phasesOpen, setPhasesOpen] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const { view } = game;

  useEffect(() => {
    try {
      if (localStorage.getItem("bmg-phases-seen") !== "1") setPhasesOpen(true);
    } catch {
      /* private mode */
    }
  }, []);

  if (!game.enabled) {
    return (
      <Shell code={code}>
        <Card>
          <h1 className="font-display text-2xl text-cream">Join this game</h1>
          <p className="mt-2 text-sm text-muted">This phone does not have a seat yet.</p>
          <a href={`/g/${code}/join`} className="mt-4 block">
            <Btn className="w-full">Join</Btn>
          </a>
        </Card>
      </Shell>
    );
  }
  if (!view) {
    return (
      <Shell code={code}>
        <Card>
          <p className="text-cream">{game.loading ? "Connecting to the room…" : game.error || "Reconnecting…"}</p>
        </Card>
      </Shell>
    );
  }

  const me = view.players.find((p) => p.id === view.mine?.playerId);
  const myHead = view.heads.find((h) => h.table === me?.table);
  const group = view.players.filter((p) => p.active && p.dept === me?.dept);
  const phase = PHASES.find((p) => p.n === view.phase);

  return (
    <Shell code={code} company={view.company} round={view.round} phase={phase?.label ?? ""}>
      {view.announcement ? (
        <div className="mb-3 rounded-xl bg-gold px-3 py-2 text-sm font-semibold text-navy">{view.announcement}</div>
      ) : null}
      {view.rehearsal && game.slot.hostToken ? (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gold">Rehearsal — switch role</p>
          <div className="mt-1 flex gap-1 overflow-x-auto">
            {BOARD_CUE.flatMap((dept) => {
              const player = view.players.find((p) => p.active && p.standIn && p.dept === dept);
              if (!player) return [];
              const mine = player.id === view.mine?.playerId;
              return [
                <button
                  key={player.id}
                  type="button"
                  className={`min-h-10 shrink-0 rounded-full px-3 text-xs font-semibold ${mine ? "bg-gold text-navy" : "bg-card text-cream"}`}
                  onClick={() => {
                    if (mine || !game.slot.hostToken) return;
                    void assumeSeat({ data: { code, hostToken: game.slot.hostToken, playerId: player.id } }).then((res) => {
                      if (!res.ok) {
                        setErr(res.error);
                        return;
                      }
                      writeSlot(code, { playerId: res.playerId, playerToken: res.playerToken, name: res.name });
                    });
                  }}
                >
                  {DEPT_SHORT[player.dept]}
                </button>,
              ];
            })}
          </div>
          <a href={`/g/${code}/host`} className="mt-1 inline-block text-xs font-semibold text-gold">
            Back to control room
          </a>
        </div>
      ) : null}
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">
            Round {view.round} of {view.settings.rounds}
            {view.rehearsal ? " · Rehearsal" : ""}
          </p>
          <h1 className="font-display text-2xl text-cream">{phase?.label}</h1>
        </div>
        <div className="text-right">
          <p>
            <ClockReadout
              timers={view.timers}
              serverNow={view.serverNow}
              which="round"
              warnAt={10}
              className="font-display text-3xl tabular-nums"
            />
          </p>
          <p className="text-xs text-muted">
            Game{" "}
            <ClockReadout
              timers={view.timers}
              serverNow={view.serverNow}
              which="game"
              className="text-xs"
              calmClass="text-muted"
            />
          </p>
        </div>
      </div>
      <BoardCue view={view} />
      <TurnCard game={game} setErr={setErr} />
      {view.status === "live" ? <PhaseTip step={view.turn.step} /> : null}
      {myHead ? (
        <div className="mb-3 rounded-xl bg-navy px-3 py-2 text-sm text-cream">
          <p>
            Up in your group: <span className="font-semibold text-gold">{myHead.name}</span>
            {myHead.playerId === view.mine?.playerId ? " · that's you" : ""}
          </p>
          {group.length > 1 ? (
            <p className="mt-1 text-cream/80">
              {group.map((p) => (p.id === myHead.playerId ? `${p.name} (up)` : p.name)).join(" · ")}
            </p>
          ) : null}
        </div>
      ) : null}
      {err ? <p className="mb-3 rounded-xl bg-navy-2 px-3 py-2 text-sm text-orange-ink">{err}</p> : null}

      {tab === "play" ? (
        <PlayTab code={code} game={game} reveal={reveal} setReveal={setReveal} setErr={setErr} />
      ) : null}
      {tab === "company" ? (
        <div className="space-y-3">
          <Card>
            <p className="text-xs font-bold tracking-wide text-gold uppercase">This round's payroll</p>
            <p className="font-display text-3xl text-cream">{money(view.turn.weeklyCents)}</p>
            <p className="text-sm text-muted">Set once at the start. Every round charges that week.</p>
          </Card>
          <Card>
            <Valuation board={view.board} settings={view.settings} />
          </Card>
          <Card>
            <DeptTable board={view.board} />
          </Card>
          <ProjectBoard projects={view.projects} plays={view.plays} />
        </div>
      ) : null}
      {tab === "notes" ? <NotesTab game={game} setErr={setErr} /> : null}
      {tab === "team" ? <TeamTab game={game} setErr={setErr} /> : null}
      {tab === "help" ? (
        <HelpTab
          game={game}
          setErr={setErr}
          onPhases={() => {
            setPhaseIndex(0);
            setPhasesOpen(true);
          }}
        />
      ) : null}
      {tab === "more" ? <MoreTab code={code} game={game} setErr={setErr} /> : null}
      {view.eventDeck && view.eventDeck.length ? (
        <EventDeck game={game} cards={view.eventDeck} setErr={setErr} />
      ) : null}
      {phasesOpen ? (
        <PhaseDeck
          index={phaseIndex}
          setIndex={setPhaseIndex}
          onClose={() => {
            try {
              localStorage.setItem("bmg-phases-seen", "1");
            } catch {
              /* private mode */
            }
            setPhasesOpen(false);
          }}
        />
      ) : null}

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-card">
        <div className="mx-auto grid max-w-lg grid-cols-6">
          {(
            [
              ["play", "Play", Play],
              ["company", "Numbers", Building2],
              ["notes", "Notes", StickyNote],
              ["team", "Team", Users],
              ["help", "Help", LifeBuoy],
              ["more", "More", Ellipsis],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex min-h-14 touch-manipulation flex-col items-center justify-center gap-0.5 text-xs font-semibold select-none active:bg-navy-2 ${tab === id ? "text-orange" : "text-muted"}`}
            >
              <Icon className="size-5" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </nav>
    </Shell>
  );
}

function formatDollars(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 7);
  if (!digits) return "";
  return `$${Number(digits).toLocaleString("en-US")}`;
}

function TurnCard({ game, setErr }: { game: ReturnType<typeof useGame>; setErr: (s: string) => void }) {
  const view = game.view;
  const [picked, setPicked] = useState<string[]>([]);
  const [choice, setChoice] = useState<"" | "A" | "B" | "C">("");
  const [busy, setBusy] = useState(false);
  const [payFields, setPayFields] = useState<Record<string, string>>({});
  const [ppOpen, setPpOpen] = useState(false);
  const ppSeen = useRef("");
  const mine = view?.mine;
  const me = view?.players.find((player) => player.id === mine?.playerId);
  const inDept = Boolean(view && me && me.dept === view.turn.dept);
  const myTurn = Boolean(inDept && mine?.isHead);

  useEffect(() => {
    if (!view || !inDept || view.turn.step !== "principle" || !view.dutyCard) return;
    if (ppSeen.current === view.dutyCard.code) return;
    ppSeen.current = view.dutyCard.code;
    setPpOpen(true);
  }, [inDept, view]);

  if (!view || view.status !== "live") return null;
  const openProjects = view.projects.filter((project) => project.status !== "closed");

  async function send(type: string, payload: Record<string, unknown>) {
    setBusy(true);
    setErr("");
    const res = await game.player(type, payload);
    setBusy(false);
    if (!res.ok) setErr(res.error ?? "Could not save that.");
    else {
      setPicked([]);
      setChoice("");
    }
  }

  return (
    <div className="mb-3 rounded-xl border border-gold bg-navy-2 px-3 py-3">
      <p className="text-xs font-bold tracking-wide text-gold uppercase">
        {DEPT_SHORT[view.turn.dept]}'s turn · {view.turn.head}
      </p>
      <p className="mt-1 text-sm text-cream">{view.turn.line}</p>
      {myTurn && view.turn.step === "payroll"
        ? view.turn.openPayroll.map((dept) => {
            const raw = payFields[dept] ?? "";
            const dollars = Number(raw.replace(/\D/g, ""));
            const week = Number.isFinite(dollars) && dollars > 0 ? Math.round(dollars / 52) : 0;
            return (
              <div key={dept} className="mt-3 space-y-2">
                <p className="text-sm font-semibold text-cream">{dept}</p>
                <Field
                  aria-label={`${dept} annual payroll`}
                  inputMode="numeric"
                  value={raw}
                  placeholder="$100,000"
                  onChange={(e) => setPayFields((cur) => ({ ...cur, [dept]: formatDollars(e.target.value) }))}
                />
                <p className="text-sm text-muted">
                  Charged every round: {week ? money(week * 100) : "—"}. Asked once. It cannot be changed.
                </p>
                <Btn
                  className="w-full"
                  disabled={busy || dollars < 1000}
                  onClick={() => {
                    setBusy(true);
                    setErr("");
                    void game.player("payroll", { annual: dollars, dept }).then((res) => {
                      setBusy(false);
                      if (!res.ok) setErr(res.error ?? "Could not lock payroll.");
                      else setPayFields((cur) => ({ ...cur, [dept]: "" }));
                    });
                  }}
                >
                  Lock {DEPT_SHORT[dept]}
                </Btn>
              </div>
            );
          })
        : null}
      {myTurn && view.turn.step === "focus" ? (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-cream">Department head meeting. Lock two open projects. You can only play on those two this round.</p>
          {openProjects.map((project) => {
            const on = picked.includes(project.id);
            return (
              <button
                key={project.id}
                type="button"
                onClick={() =>
                  setPicked((cur) => (cur.includes(project.id) ? cur.filter((id) => id !== project.id) : cur.length >= 2 ? cur : [...cur, project.id]))
                }
                className={`w-full rounded-xl border px-3 py-2 text-left ${on ? "border-gold bg-navy" : "border-line"}`}
              >
                <p className="font-semibold text-cream">Project {project.n} · {money(project.valueCents)}</p>
                <p className="text-xs text-muted">{project.customer?.name} · {project.house?.name}</p>
              </button>
            );
          })}
          <Btn className="w-full" disabled={busy || picked.length !== 2} onClick={() => void send("focus", { projectIds: picked })}>
            Lock these two
          </Btn>
        </div>
      ) : null}
      {inDept && view.turn.step === "principle" && view.dutyCard ? (
        <div className="mt-3">
          {!myTurn ? <p className="text-sm text-cream">{view.turn.head} decides this round. You decide next.</p> : null}
          <Btn className="mt-2 w-full" onClick={() => setPpOpen(true)}>
            Open the People & Principles card
          </Btn>
        </div>
      ) : null}
      {ppOpen && inDept && view.dutyCard ? (
        <Sheet title="People & Principles" onClose={() => setPpOpen(false)}>
          <div className="space-y-2">
            {!myTurn ? <p className="text-sm text-cream">{view.turn.head} decides this round. You decide next.</p> : null}
            <p className="text-xs font-bold tracking-wide text-gold uppercase">{view.dutyCard.code}</p>
            <h3 className="font-display text-xl text-cream">{view.dutyCard.title}</h3>
            <p className="text-sm text-cream">{view.dutyCard.scenario}</p>
            <ReadAloud text={`${view.dutyCard.title}. ${view.dutyCard.scenario}`} />
            {(["A", "B", "C"] as const).map((letter) => (
              <button
                key={letter}
                type="button"
                disabled={!myTurn}
                onClick={() => myTurn && setChoice(letter)}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${choice === letter ? "border-gold bg-navy" : "border-line"} ${myTurn ? "" : "opacity-80"}`}
              >
                <span className="font-bold text-gold">{letter}. </span>
                {view.dutyCard?.options[letter]}
              </button>
            ))}
            {myTurn ? (
              <Btn className="w-full" disabled={busy || !choice} onClick={() => void send("answer", { raw: view.dutyCard?.code, choice })}>
                Answer
              </Btn>
            ) : null}
            {view.hand.some((card) => card.type === "NEGATIVE") ? (
              <p className="text-sm text-muted">A negative was dealt. The best answer removes it and deals a replacement.</p>
            ) : null}
          </div>
        </Sheet>
      ) : null}
    </div>
  );
}

function NotesTab({ game, setErr }: { game: ReturnType<typeof useGame>; setErr: (s: string) => void }) {
  const view = game.view;
  const [text, setText] = useState(view?.note ?? "");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setText(view?.note ?? "");
  }, [view?.note]);
  if (!view) return null;
  return (
    <Card>
      <h2 className="font-display text-xl text-cream">Notes</h2>
      <p className="mt-1 text-sm text-muted">Bring these back from the board meeting. Only this phone keeps them.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="mt-3 w-full rounded-xl border border-line bg-navy px-3 py-2 text-sm text-cream"
        placeholder="What the GM and the other departments decided"
      />
      <Btn
        className="mt-3 w-full"
        disabled={busy}
        onClick={() => {
          setBusy(true);
          setErr("");
          void game.player("note", { text }).then((res) => {
            setBusy(false);
            if (!res.ok) setErr(res.error ?? "Could not save the note.");
          });
        }}
      >
        Save note
      </Btn>
    </Card>
  );
}

function EventDeck({
  game,
  cards,
  setErr,
}: {
  game: ReturnType<typeof useGame>;
  cards: EventPick[];
  setErr: (s: string) => void;
}) {
  const [pick, setPick] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const chosen = cards.find((card) => card.index === pick) ?? null;

  async function play() {
    if (pick === null) return;
    setBusy(true);
    setErr("");
    const res = await game.player("event", { index: pick });
    setBusy(false);
    if (!res.ok) setErr(res.error ?? "Could not play that event.");
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-navy/80 p-3 sm:items-center">
      <div role="dialog" aria-modal="true" aria-label="Event deck" className="max-h-[92vh] w-full max-w-lg overflow-auto rounded-2xl bg-card p-4">
        <p className="text-xs font-bold tracking-widest text-gold uppercase">General Manager</p>
        <h2 className="font-display text-2xl text-cream">Play this event</h2>
        <p className="mt-1 text-sm text-muted">The deck was shuffled. This is the one event. It goes into the business.</p>
        {chosen ? (
          <div className="mt-3">
            <ReadAloud text={`${chosen.name}. ${chosen.text}`} />
          </div>
        ) : null}
        <ul className="mt-3 space-y-2">
          {cards.map((card) => {
            const on = card.index === pick;
            return (
              <li key={card.index}>
                <button
                  type="button"
                  onClick={() => setPick(card.index)}
                  className={`w-full touch-manipulation rounded-xl border px-3 py-3 text-left select-none active:scale-[0.99] ${on ? "border-gold bg-navy-2" : "border-line bg-navy"}`}
                >
                  <p className="text-xs font-bold tracking-wide text-gold uppercase">{card.type || "Event"}</p>
                  <p className="font-display text-lg text-cream">{card.name}</p>
                  <p className="mt-1 text-sm text-cream/90">{card.text}</p>
                </button>
              </li>
            );
          })}
        </ul>
        <Btn className="mt-4 w-full" disabled={pick === null || busy} onClick={() => void play()}>
          {busy ? "Playing…" : chosen ? `Play ${chosen.name}` : "Choose a card"}
        </Btn>
      </div>
    </div>
  );
}

function Shell({
  code,
  company,
  round,
  phase,
  children,
}: {
  code: string;
  company?: string;
  round?: number;
  phase?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy pb-28">
      <BrandBar
        trail={
          <p className="text-right text-xs font-semibold text-cream">
            {company || code}
            {round ? <span className="block font-normal text-muted">{phase}</span> : null}
          </p>
        }
      />
      <main className="mx-auto max-w-lg px-4 py-4">{children}</main>
    </div>
  );
}

function PlayTab({
  code,
  game,
  reveal,
  setReveal,
  setErr,
}: {
  code: string;
  game: ReturnType<typeof useGame>;
  reveal: Answer | null;
  setReveal: (a: Answer | null) => void;
  setErr: (s: string) => void;
}) {
  const view = game.view!;
  const mine = view.mine;
  const [digits, setDigits] = useState("");
  const [card, setCard] = useState<{
    code: string;
    title: string;
    scenario: string;
    options: { A: string; B: string; C: string };
  } | null>(null);
  const [pick, setPick] = useState<"A" | "B" | "C" | null>(null);
  const [busy, setBusy] = useState(false);
  const [survey, setSurvey] = useState<[number, number, number]>([0, 0, 0]);

  const needsPre = mine && !mine.preDone && view.status !== "done";
  const needsPost = mine && !mine.postDone && (view.status === "post" || view.status === "done" || view.status === "audit");
  const dept = view.players.find((p) => p.id === mine?.playerId)?.dept;
  const boardDept = dept ? (BOARD_DEPTS as readonly string[]).includes(dept) : false;
  const dealKey = useRef("");

  useEffect(() => {
    if (view.status !== "live" || !mine?.isHead || !boardDept || !dept) return;
    if (view.turn.dept !== dept || view.turn.step !== "cards") return;
    if (view.hand.length > 0) return;
    const key = `${view.round}:${dept}`;
    if (dealKey.current === key) return;
    dealKey.current = key;
    void game.player("deal").then((res) => {
      if (!res.ok) dealKey.current = "";
    });
  }, [view.rev, view.status, view.turn.dept, view.turn.step, view.hand.length, view.round, mine?.isHead, boardDept, dept]);

  async function saveSurvey(phase: "pre" | "post") {
    if (survey.some((n) => n < 1)) {
      setErr("Answer all three, from 1 to 5.");
      return;
    }
    setErr("");
    const res = await game.player("survey", { phase, values: survey });
    if (!res.ok) setErr(res.error);
  }

  async function findCard() {
    setErr("");
    setReveal(null);
    setPick(null);
    const res = await lookupCard({
      data: { code, raw: digits, playerId: game.slot.playerId, playerToken: game.slot.playerToken },
    });
    if (!res.ok) {
      setCard(null);
      setErr(res.error);
      return;
    }
    if (res.role !== "player") return;
    setCard(res.card);
  }

  async function lockIn() {
    if (!card || !pick) return;
    setBusy(true);
    setErr("");
    const res = await game.player("answer", { raw: card.code, choice: pick });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    if (res.reveal) setReveal(res.reveal);
    setCard(null);
    setDigits("");
    setPick(null);
  }

  return (
    <div className="space-y-3">
      {mine?.forced ? (
        <div className="rounded-2xl border-2 border-gold bg-gold px-3 py-3 text-navy">
          <p className="text-xs font-bold tracking-wide uppercase">Must play immediately</p>
          <p className="mt-1 text-sm font-semibold">
            This negative is in play. A best People & Principles answer would have cleared a single negative.
          </p>
          <p className="mt-2 font-display text-lg">{mine.forced.name}</p>
        </div>
      ) : null}
      {mine?.mustPlayNegative && !mine.forced && (view.phase === 3 || view.phase === 4) ? (
        <div className="rounded-2xl border border-gold bg-navy-2 px-3 py-3 text-sm text-orange-ink">
          One negative is in the hand. It plays unless the department locks the best People & Principles answer.
        </div>
      ) : null}

      {needsPre || needsPost ? (
        <Card>
          <h2 className="font-display text-xl text-cream">{needsPre ? "Before we start" : "After the game"}</h2>
          <p className="mt-1 text-sm text-muted">Same three questions. 1 is low, 5 is high. Your answers stay off the room screen.</p>
          <div className="mt-3 space-y-4">
            {view.surveyPrompts.map((q, i) => (
              <div key={q.key}>
                <p className="text-sm font-semibold text-cream">{q.prompt}</p>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        setSurvey((cur) => {
                          const next = [...cur] as [number, number, number];
                          next[i] = n;
                          return next;
                        })
                      }
                      className={`min-h-11 touch-manipulation rounded-xl border font-semibold select-none active:scale-[0.98] ${survey[i] === n ? "border-gold bg-gold text-navy" : "border-line bg-card text-cream"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Btn className="mt-4 w-full" onClick={() => saveSurvey(needsPre ? "pre" : "post")}>
            Save answers
          </Btn>
        </Card>
      ) : null}

      {view.status === "lobby" ? (
        <Card>
          <h2 className="font-display text-xl text-cream">Waiting for the GM</h2>
          <p className="mt-1 text-sm text-muted">You are in. The clocks start when the host opens the game.</p>
        </Card>
      ) : null}

      {view.status === "live" && view.events.some((event) => event.round === view.round) ? (
        <Card>
          <p className="text-xs font-bold tracking-widest text-gold uppercase">In the business</p>
          <h2 className="font-display text-xl text-cream">{view.events.find((event) => event.round === view.round)?.name}</h2>
          <p className="mt-1 text-sm text-cream/90">{view.events.find((event) => event.round === view.round)?.text}</p>
          <div className="mt-3">
            <ReadAloud
              text={`${view.events.find((event) => event.round === view.round)?.name}. ${view.events.find((event) => event.round === view.round)?.text ?? ""}`}
            />
          </div>
        </Card>
      ) : null}

      {view.status !== "lobby" ? <ProjectBoard projects={view.projects} plays={view.plays} /> : null}

      {boardDept && view.status === "live" && view.turn.dept === dept ? (
        <HandPlay game={game} setErr={setErr} busy={busy} setBusy={setBusy} />
      ) : null}

      {view.status === "live" ? (
        <Card>
          <h2 className="font-display text-xl text-cream">People & Principles</h2>
          <p className="mt-1 text-sm text-muted">
            {dept} · {mine?.used ?? 0} of {mine?.cap ?? 3} this round. Dollar values stay hidden until the answer locks.
            {mine?.mustPlayNegative
              ? " The best answer clears the mandatory negative."
              : mine?.negativeCleared
                ? " Best answer locked. Play the other two cards."
                : ""}
          </p>
          <div className="mt-3 flex gap-2">
            <Field
              className="min-w-0 flex-1"
              inputMode="text"
              value={digits}
              placeholder="07 or BE-MK-07"
              aria-label="Card code"
              onChange={(e) => setDigits(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void findCard();
              }}
            />
            <Btn kind="navy" onClick={() => void findCard()}>
              Find
            </Btn>
          </div>
          {card ? (
            <div className="mt-4">
              <p className="text-xs font-bold tracking-wide text-muted">{card.code}</p>
              <h3 className="font-display text-2xl text-cream">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{card.scenario}</p>
              <div className="mt-3">
                <ReadAloud
                  text={`${card.title}. ${card.scenario} Answer A. ${card.options.A} Answer B. ${card.options.B} Answer C. ${card.options.C}`}
                />
              </div>
              {(["A", "B", "C"] as const).map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => mine?.isHead && setPick(letter)}
                  className={`mt-2 min-h-11 w-full touch-manipulation rounded-xl border px-3 py-3 text-left text-sm select-none active:scale-[0.99] ${pick === letter ? "border-gold bg-navy-2" : "border-line bg-card"}`}
                >
                  <span className="font-bold text-cream">{letter}. </span>
                  {card.options[letter]}
                </button>
              ))}
              {mine?.isHead ? (
                <Btn className="mt-3 w-full" disabled={!pick || busy} onClick={() => void lockIn()}>
                  {pick ? `Lock in ${pick}` : "Choose an answer"}
                </Btn>
              ) : (
                <p className="mt-3 text-sm text-cream">{view.heads.find((head) => head.dept === dept)?.name ?? "The person up"} decides this round. You decide next.</p>
              )}
            </div>
          ) : null}
        </Card>
      ) : null}

      {reveal ? <Reveal answer={reveal} /> : null}
      {!reveal && view.answers[0] ? <Reveal answer={view.answers[view.answers.length - 1]!} /> : null}
    </div>
  );
}

function HandPlay({
  game,
  setErr,
  busy,
  setBusy,
}: {
  game: ReturnType<typeof useGame>;
  setErr: (s: string) => void;
  busy: boolean;
  setBusy: (v: boolean) => void;
}) {
  const view = game.view!;
  const mine = view.mine;
  const hand = view.hand;
  const me = view.players.find((p) => p.id === mine?.playerId);
  const played = view.plays.filter((play) => play.round === view.round && play.dept === me?.dept);
  const deciding = Boolean(mine?.isHead);
  const deptUp = view.turn.dept === me?.dept && (view.turn.step === "cards" || (view.turn.step === "principle" && played.length < 2));
  const done = !deptUp || played.length >= 2;
  const openProjects = view.focusIds.length === 2
    ? view.projects.filter((project) => view.focusIds.includes(project.id) && project.status !== "closed")
    : view.projects.filter((project) => project.status !== "closed");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [places, setPlaces] = useState<Record<string, string[]>>({});
  const [cursor, setCursor] = useState(0);
  const [ready, setReady] = useState(false);
  const seen = useRef("");
  const handKey = hand.map((card) => card.id).join();
  const upName = view.heads.find((head) => head.dept === me?.dept)?.name ?? "Your department";

  useEffect(() => {
    if (!hand.length || done) return;
    if (seen.current === handKey) return;
    seen.current = handKey;
    setSelected([]);
    setPlaces({});
    setCursor(0);
    setReady(false);
    setOpen(true);
  }, [handKey, done, hand.length]);

  function chosenIds() {
    const blocked = mine?.negativeCleared
      ? hand.filter((card) => card.type === "NEGATIVE").map((card) => card.id)
      : [];
    const locked = mine?.mustPlayNegative ? hand.filter((card) => card.type === "NEGATIVE").map((card) => card.id) : [];
    const rest = selected.filter((id) => !locked.includes(id) && !blocked.includes(id));
    return [...locked, ...rest].slice(0, 2);
  }

  function toggle(id: string) {
    const card = hand.find((item) => item.id === id);
    if (mine?.mustPlayNegative && card?.type === "NEGATIVE" && selected.includes(id)) return;
    setSelected((cur) => {
      if (cur.includes(id)) return cur.filter((item) => item !== id);
      if (cur.length >= 2) return cur;
      return [...cur, id];
    });
  }

  async function redeal() {
    setBusy(true);
    setErr("");
    const res = await game.player("redeal");
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setOpen(false);
    setSelected([]);
    setPlaces({});
    setCursor(0);
    setReady(false);
  }

  const steps = chosenIds().flatMap((id) => {
    const card = hand.find((item) => item.id === id);
    if (!card || !me) return [];
    return stepsFor(card, openProjects, me.dept).map((slot) => ({ id, slot, card }));
  });
  const step = ready && cursor < steps.length ? steps[cursor] : null;

  async function playTwo() {
    const ids = chosenIds();
    setBusy(true);
    setErr("");
    const res = await game.player("play", {
      ids,
      placements: ids.map((id) => ({ id, projectIds: places[id] ?? [] })),
    });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setOpen(false);
    setSelected([]);
  }

  return (
    <Card>
      <h2 className="font-display text-xl text-cream">Your department cards</h2>
      <p className="mt-1 text-sm text-muted">
        {hand.length
          ? deciding
            ? "Three cards are dealt. Choose two to play."
            : `${upName} decides this round. You decide next.`
          : deptUp
            ? "Shuffling three cards…"
            : `${upName} is up.`}
      </p>
      {mine?.mustPlayNegative ? (
        <p className="mt-2 text-sm font-semibold text-orange-ink">
          The negative is a mandatory play. The best People & Principles answer clears it.
        </p>
      ) : null}
      {mine?.negativeCleared && hand.some((card) => card.type === "NEGATIVE") ? (
        <p className="mt-2 text-sm font-semibold text-cream">
          Best answer locked. Play the other two cards. The negative stays out.
        </p>
      ) : null}
      {hand.length && mine?.isHead && !done && mine.canRedeal ? (
        <Btn kind="ghost" className="mt-3 w-full" disabled={busy} onClick={() => void redeal()}>
          Re-deal · these negatives do not play
        </Btn>
      ) : null}
      {hand.length && mine?.isHead && !done && !legalCount(hand, openProjects, me?.dept) ? (
        <Btn className="mt-3 w-full" disabled={busy} onClick={() => void game.player("pass")}>
          Nothing can be played. Next department
        </Btn>
      ) : null}
      {hand.length && !done ? (
        <Btn className="mt-3 w-full" onClick={() => setOpen(true)}>
          {deciding ? "Choose two of the three cards" : "View the three cards"}
        </Btn>
      ) : null}
      {done ? <p className="mt-3 text-sm font-semibold text-cream">Two cards are in for this round.</p> : null}
      {played.length ? (
        <ul className="mt-3 space-y-2">
          {played.map((play) => (
            <li key={play.id} className="rounded-xl border border-line p-3">
              <p className="text-xs font-bold text-muted uppercase">
                Played{play.playerName ? ` · ${play.playerName}` : ""} · {play.type}
              </p>
              <p className="font-semibold text-cream">{play.name}</p>
              {play.projectLabel ? <p className="text-sm font-semibold text-orange-ink">{play.projectLabel}</p> : null}
              <CardCopy text={play.text} />
              <div className="mt-2">
                <ReadAloud text={`${play.name}. ${play.text}`} />
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      {open && !done ? (
        <Sheet
          title={!ready ? "Your three cards" : step ? stepTitle(step.card, step.slot, me?.dept) : "Play these two"}
          onClose={() => setOpen(false)}
        >
          {!ready ? (
            <div className="space-y-2">
              <p className="text-sm text-muted">
                {!deciding
                  ? `${upName} decides this round. You decide next.`
                  : mine?.mustPlayNegative
                    ? "The negative stays selected. Pick one more card to play with it. The best People & Principles answer removes it and deals a replacement."
                    : "Tap two cards. Then place each one on one of this department's two projects."}
              </p>
              {view.dutyCard && hand.some((card) => card.type === "NEGATIVE") ? (
                <DutyPick game={game} card={view.dutyCard} setErr={setErr} canSubmit={deciding} />
              ) : null}
              {mine?.canRedeal ? (
                <Btn kind="ghost" className="w-full" disabled={busy} onClick={() => void redeal()}>
                  Re-deal · these negatives do not play
                </Btn>
              ) : null}
              <ReadAloud text={hand.map((card) => `${card.name}. ${card.text}`).join(" ")} label="Read the cards" />
              {hand.map((card) => {
                const lockedNeg = Boolean(mine?.mustPlayNegative && card.type === "NEGATIVE");
                const clearedNeg = Boolean(mine?.negativeCleared && card.type === "NEGATIVE");
                const on = !clearedNeg && (selected.includes(card.id) || lockedNeg);
                return (
                  <button
                    key={card.id}
                    type="button"
                    aria-pressed={on}
                    disabled={!deciding || clearedNeg}
                    onClick={() => deciding && !clearedNeg && toggle(card.id)}
                    className={`w-full touch-manipulation rounded-xl border px-3 py-3 text-left select-none active:scale-[0.99] ${clearedNeg ? "border-line opacity-40" : on ? "border-gold bg-navy-2" : "border-line bg-card"}`}
                  >
                    <p className="text-xs font-bold tracking-wide text-muted uppercase">
                      {card.type}
                      {lockedNeg ? " · mandatory" : clearedNeg ? " · cleared" : on ? " · selected" : ""}
                    </p>
                    <p className="font-display text-lg text-cream">{card.name}</p>
                    <CardCopy text={card.text} />
                  </button>
                );
              })}
              {deciding ? (
                <Btn
                  className="w-full"
                  disabled={chosenIds().length < 1}
                  onClick={() => {
                    setSelected(chosenIds());
                    setCursor(0);
                    setReady(true);
                  }}
                >
                  {chosenIds().length ? "Next" : "Choose a card that can be played"}
                </Btn>
              ) : null}
            </div>
          ) : null}
          {step && me ? (
            <div className="space-y-2">
              <p className="font-display text-lg text-cream">{step.card.name}</p>
              <CardCopy text={step.card.text} />
              <ReadAloud text={`${step.card.name}. ${step.card.text}`} />
              <ProjectChoices
                projects={deciding ? choicesFor(step.card, openProjects, me.dept, step.slot) : []}
                onPick={(projectId) => {
                  setPlaces((cur) => {
                    const list = [...(cur[step.id] ?? [])];
                    list[step.slot] = projectId;
                    return { ...cur, [step.id]: list };
                  });
                  setCursor((n) => n + 1);
                }}
              />
            </div>
          ) : null}
          {ready && !step && chosenIds().length > 0 ? (
            <div className="space-y-3">
              {chosenIds().map((id) => {
                const card = hand.find((item) => item.id === id);
                const names = (places[id] ?? [])
                  .map((projectId) => openProjects.find((project) => project.id === projectId))
                  .filter((project): project is Project => Boolean(project))
                  .map((project) => `Project ${project.n}`);
                return (
                  <div key={id} className="rounded-xl border border-line p-3">
                    <p className="font-semibold text-cream">{card?.name}</p>
                    <p className="text-sm text-muted">{names.length ? names.join(" · ") : "No project"}</p>
                  </div>
                );
              })}
              {deciding ? (
                <Btn className="w-full" disabled={busy} onClick={() => void playTwo()}>
                  Play {chosenIds().length === 1 ? "this card" : "these two"}
                </Btn>
              ) : (
                <p className="text-sm text-cream">{upName} decides this round. You decide next.</p>
              )}
              <Btn
                kind="ghost"
                className="w-full"
                onClick={() => {
                  setSelected([]);
                  setPlaces({});
                  setCursor(0);
                  setReady(false);
                }}
              >
                Start over
              </Btn>
            </div>
          ) : null}
        </Sheet>
      ) : null}
    </Card>
  );
}

function DutyPick({
  game,
  card,
  setErr,
  canSubmit,
}: {
  game: ReturnType<typeof useGame>;
  card: NonNullable<GameView["dutyCard"]>;
  setErr: (s: string) => void;
  canSubmit: boolean;
}) {
  const [choice, setChoice] = useState<"" | "A" | "B" | "C">("");
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-2 rounded-xl border border-gold p-3">
      <p className="text-xs font-bold tracking-wide text-gold uppercase">Clear the negative</p>
      <p className="font-display text-lg text-cream">{card.title}</p>
      <p className="text-sm text-cream">{card.scenario}</p>
      {(["A", "B", "C"] as const).map((letter) => (
        <button
          key={letter}
          type="button"
          disabled={!canSubmit}
          onClick={() => canSubmit && setChoice(letter)}
          className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${choice === letter ? "border-gold bg-navy" : "border-line"}`}
        >
          <span className="font-bold text-gold">{letter}. </span>
          {card.options[letter]}
        </button>
      ))}
      {canSubmit ? (
        <Btn
          className="w-full"
          disabled={busy || !choice}
          onClick={() => {
            setBusy(true);
            setErr("");
            void game.player("answer", { raw: card.code, choice }).then((res) => {
              setBusy(false);
              if (!res.ok) setErr(res.error ?? "Could not answer.");
            });
          }}
        >
          Answer
        </Btn>
      ) : (
        <p className="text-sm text-muted">Only the person up can submit this answer.</p>
      )}
    </div>
  );
}

function legalCount(hand: HandCard[], projects: Project[], dept?: string): number {
  if (!dept) return 0;
  return hand.filter((card) => stepsFor(card, projects, dept).length > 0 || cardEffect(card.text).kind === "none").length;
}

function stepsFor(card: HandCard, projects: Project[], dept: string): number[] {
  const effect = cardEffect(card.text);
  if (effect.kind === "none") return [];
  const iconDept = dept as Project["tokens"][number]["dept"];
  const hasIcon = projects.some((project) =>
    project.tokens.some((token) => token.filled && token.dept === iconDept),
  );
  if ((effect.kind === "remove" || effect.kind === "move") && !hasIcon) return [];
  if (!projects.length) return [];
  if (effect.kind === "move") {
    const to = projects.some((project) => stageReady(project, iconDept) === true);
    return to ? [0, 1] : [];
  }
  if (effect.kind === "play") {
    const ready = projects.some(
      (project) =>
        stageReady(project, iconDept) === true &&
        project.tokens.some((token) => !token.filled && token.dept === iconDept),
    );
    if (!ready) return [];
    return Array.from({ length: effect.count }, (_, n) => n);
  }
  return [0];
}

function choicesFor(card: HandCard, projects: Project[], dept: string, slot: number): Project[] {
  const effect = cardEffect(card.text);
  const iconDept = dept as Project["tokens"][number]["dept"];
  if (effect.kind === "remove" || (effect.kind === "move" && slot === 0)) {
    return projects.filter((project) => project.tokens.some((token) => token.filled && token.dept === iconDept));
  }
  if (effect.kind === "play") {
    return projects.filter(
      (project) =>
        stageReady(project, iconDept) === true &&
        project.tokens.some((token) => !token.filled && token.dept === iconDept),
    );
  }
  if (effect.kind === "move" && slot > 0) {
    return projects.filter((project) => stageReady(project, iconDept) === true);
  }
  return projects;
}

function stepTitle(card: HandCard, slot: number, dept?: string): string {
  const effect = cardEffect(card.text);
  const icon = (dept && DEPT_ICON[dept as keyof typeof DEPT_ICON]) || "icon";
  if (effect.kind === "move" && slot === 0) return `Take the ${icon} off`;
  if (effect.kind === "move") return `Put the ${icon} on`;
  if (effect.kind === "slot") return `Add an open ${icon} slot`;
  if (effect.kind === "remove") return `Remove a ${icon}`;
  if (effect.kind === "play" && effect.count > 1) return `Place ${icon} ${slot + 1} of ${effect.count}`;
  return `Place the ${icon}`;
}

function ProjectChoices({ projects, onPick }: { projects: Project[]; onPick: (id: string) => void }) {
  if (!projects.length) return <p className="text-sm text-muted">No open project can take this yet.</p>;
  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <button
          key={project.id}
          type="button"
          onClick={() => onPick(project.id)}
          className="min-h-11 w-full touch-manipulation rounded-xl border border-line bg-card px-3 py-3 text-left select-none active:scale-[0.99] active:border-gold"
        >
          <p className="font-semibold text-cream">
            Project {project.n}
            {project.valueCents > 0 ? ` · ${money(project.valueCents)}` : ""} · Open
          </p>
          <p className="text-sm text-muted">
            {project.customer?.name} · {project.house?.name}
          </p>
        </button>
      ))}
    </div>
  );
}

function Reveal({ answer }: { answer: Answer }) {
  const strong = answer.valueCents === 50000;
  const partial = answer.valueCents === 15000;
  return (
    <Card className={strong ? "border-gold bg-gold" : ""}>
      <p className="text-xs font-bold tracking-wide text-cream uppercase">{answer.cardCode}</p>
      <h2 className="font-display text-2xl text-cream">{answer.title}</h2>
      <p className="mt-2 text-lg font-semibold text-cream">
        {strong
          ? "You chose like an owner. +$500 payroll savings."
          : partial
            ? "Partial answer. +$150 payroll savings."
            : "This answer does not reduce payroll."}
      </p>
      <p className="mt-1 text-sm font-semibold text-cream">
        You locked {answer.choice}. The strong answer is {answer.correct}. Principle: {answer.principle}.
      </p>
      {answer.hostNote ? <p className="mt-3 text-sm leading-relaxed text-ink">{answer.hostNote}</p> : null}
    </Card>
  );
}

function TeamTab({ game, setErr }: { game: ReturnType<typeof useGame>; setErr: (s: string) => void }) {
  const view = game.view!;
  const me = view.players.find((p) => p.id === view.mine?.playerId);
  const mates = view.players.filter((p) => p.active && p.table === me?.table && p.id !== me?.id);
  const [toId, setToId] = useState(mates[0]?.id ?? "");
  const [principle, setPrinciple] = useState<string>(SHOUT_PRINCIPLES[0]);
  const sent = view.shoutouts.some((s) => s.round === view.round && s.fromId === me?.id);
  return (
    <div className="space-y-3">
      <Card>
        <h2 className="font-display text-xl text-cream">{me?.dept}</h2>
        <ul className="mt-2 space-y-2">
          {view.players
            .filter((p) => p.table === me?.table)
            .map((p) => (
              <li key={p.id} className="flex items-center justify-between text-sm">
                <span className="font-semibold text-cream">
                  {p.name}
                  {!p.active ? " · excused" : ""}
                </span>
                {view.heads.some((h) => h.playerId === p.id) ? (
                  <span className="text-xs font-bold text-orange">Up</span>
                ) : null}
              </li>
            ))}
        </ul>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-cream">Shout-out</h2>
        <p className="mt-1 text-sm text-muted">One per round, to someone at your table. It is recognition, not a score.</p>
        {sent ? (
          <p className="mt-3 text-sm font-semibold text-cream">Sent for this round.</p>
        ) : (
          <div className="mt-3 space-y-2">
            <Select value={toId} onChange={(e) => setToId(e.target.value)} aria-label="Teammate">
              {mates.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
            <Select value={principle} onChange={(e) => setPrinciple(e.target.value)} aria-label="Principle">
              {SHOUT_PRINCIPLES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </Select>
            <Btn
              kind="navy"
              className="w-full"
              disabled={!toId}
              onClick={() => {
                void game.player("shout", { toId, principle }).then((res) => {
                  if (!res.ok) setErr(res.error);
                });
              }}
            >
              Send shout-out
            </Btn>
          </div>
        )}
        <ul className="mt-3 space-y-2 text-sm">
          {view.shoutouts
            .filter((s) => s.toId === me?.id)
            .map((s) => (
              <li key={s.id} className="rounded-xl bg-navy-2 px-3 py-2">
                <span className="font-semibold text-cream">{s.fromName}</span> recognized you for {s.principle}.
              </li>
            ))}
        </ul>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-cream">Your record</h2>
        <p className="mt-1 text-sm text-muted">
          {view.mine?.correct ?? 0} strong answers out of {view.mine?.answered ?? 0}.{" "}
          {view.mine?.climb === null || view.mine?.climb === undefined
            ? "Climb appears after both surveys."
            : `Learning climb ${view.mine.climb > 0 ? "+" : ""}${view.mine.climb}.`}
        </p>
      </Card>
    </div>
  );
}

const PHASE_CARDS = [
  {
    title: "Phase 1 — Who is up",
    body: "The gold bar names the department and the one person who decides this round. Everyone in that department sees the same cards. Only that person submits.",
  },
  {
    title: "Phase 2 — Payroll",
    body: "The GM asks each first department head once. The annual number locks and is charged every round.",
  },
  {
    title: "Phase 3 — Focus",
    body: "The head locks two open projects at the meeting. This department can only play on those two this round.",
  },
  {
    title: "Phase 4 — Draw and play",
    body: "Three action cards open for the whole department. The person up picks two and places them only where they fit.",
  },
  {
    title: "Phase 5 — People & Principles",
    body: "The person up must answer. The best answer can clear a negative. Next round, the next person decides.",
  },
  {
    title: "Phase 6 — The board",
    body: "A finished project shows Completed in green, plus the money it made. Numbers is the board. Notes is what you bring back.",
  },
];

const PHASE_TIP: Partial<Record<GameView["turn"]["step"], string>> = {
  payroll: "Phase 2 — The GM asks each first department head once. Payroll locks and is charged every round.",
  focus: "Phase 3 — Lock two open projects. You can only play on those two.",
  event: "The GM plays the one event that was dealt, then answers People & Principles.",
  cards: "Phase 4 — Three cards are open. The person up picks two.",
  principle: "Phase 5 — The person up answers People & Principles.",
};

function PhaseTip({ step }: { step: GameView["turn"]["step"] }) {
  const line = PHASE_TIP[step];
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!line) {
      setShow(false);
      return;
    }
    const key = `bmg-phase-tip:${step}`;
    try {
      if (sessionStorage.getItem(key) === "1") {
        setShow(false);
        return;
      }
      sessionStorage.setItem(key, "1");
    } catch {
      /* private mode */
    }
    setShow(true);
  }, [step, line]);
  if (!show || !line) return null;
  return <p className="mb-3 rounded-xl border border-gold px-3 py-2 text-sm text-cream">{line}</p>;
}

function PhaseDeck({
  index,
  setIndex,
  onClose,
}: {
  index: number;
  setIndex: (n: number) => void;
  onClose: () => void;
}) {
  const card = PHASE_CARDS[index] ?? PHASE_CARDS[0];
  const last = index >= PHASE_CARDS.length - 1;
  return (
    <Sheet title={`${index + 1} of ${PHASE_CARDS.length}`} onClose={onClose}>
      <p className="font-display text-2xl text-cream">{card.title}</p>
      <p className="mt-2 text-sm text-cream">{card.body}</p>
      <div className="mt-4 flex gap-2">
        {index > 0 ? (
          <Btn kind="ghost" className="flex-1" onClick={() => setIndex(index - 1)}>
            Back
          </Btn>
        ) : null}
        <Btn className="flex-1" onClick={() => (last ? onClose() : setIndex(index + 1))}>
          {last ? "Start" : "Next"}
        </Btn>
      </div>
    </Sheet>
  );
}

function HelpTab({
  game,
  setErr,
  onPhases,
}: {
  game: ReturnType<typeof useGame>;
  setErr: (s: string) => void;
  onPhases: () => void;
}) {
  const view = game.view!;
  const open = view.help.find((h) => h.status !== "done");
  const [note, setNote] = useState("");
  return (
    <div className="space-y-3">
      <Card>
        <h2 className="font-display text-xl text-cream">How to play</h2>
        <p className="mt-1 text-sm text-muted">Six short phases. The same cards open for the whole department. Only the person up submits.</p>
        <Btn className="mt-3 w-full" onClick={onPhases}>
          Open the phases
        </Btn>
      </Card>
      <Card>
      <h2 className="font-display text-xl text-cream">Ask the GM</h2>
      {open ? (
        <p className="mt-2 text-sm">
          <span className="font-semibold text-cream">
            {open.status === "open" ? "Sent" : open.status === "ack" ? "GM is on it" : "Resolved"}
          </span>
          <span className="mt-1 block text-muted">{open.note}</span>
        </p>
      ) : (
        <>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What do you need?"
            className="mt-3 min-h-24 w-full rounded-xl border border-line bg-card px-3 py-3 text-base"
          />
          <Btn
            className="mt-3 w-full"
            onClick={() => {
              void game.player("help", { note }).then((res) => {
                if (!res.ok) setErr(res.error);
                else setNote("");
              });
            }}
          >
            Send help request
          </Btn>
        </>
      )}
      </Card>
    </div>
  );
}

function MoreTab({
  code,
  game,
  setErr,
}: {
  code: string;
  game: ReturnType<typeof useGame>;
  setErr: (s: string) => void;
}) {
  const view = game.view!;
  const [experience, setExperience] = useState(view.ownFeedback?.experience ?? 0);
  const [nps, setNps] = useState(view.ownFeedback?.nps ?? -1);
  const [quote, setQuote] = useState(view.ownFeedback?.quote ?? "");
  const [consent, setConsent] = useState(Boolean(view.ownFeedback?.consent));
  const [nextRole, setNextRole] = useState(view.ownFeedback?.nextRole ?? "");
  const showFeedback = view.status === "post" || view.status === "done" || view.status === "audit";
  return (
    <div className="space-y-3">
      <Card>
        <ReportPanel view={view} focusId={view.mine?.playerId} />
        <a href="/me" className="mt-3 inline-block text-sm font-semibold text-gold">
          Your profile, badges, and friends
        </a>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-cream">How the money works</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink">
          <li>Eight rounds. Valuation is net profit times 3.</li>
          <li>
            Win at {money(view.settings.winCents)} with at least a 30% margin. Market Leader at {money(view.settings.mlCents)}.
          </li>
          <li>A strong P&P answer saves $500 of that department's payroll. A partial saves $150. A weak answer saves nothing.</li>
          <li>Card money changes revenue, never profit directly.</li>
          <li>Each round the department is dealt 3 action cards and plays 2 of them onto a project.</li>
        </ul>
      </Card>
      {showFeedback ? (
        <Card>
          <h2 className="font-display text-xl text-cream">One minute of feedback</h2>
          <p className="mt-1 text-sm text-muted">How was the Business Machine experience?</p>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setExperience(n)}
                className={`min-h-11 touch-manipulation rounded-xl border font-semibold select-none ${experience === n ? "border-gold bg-gold text-navy" : "border-line"}`}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-cream">
            How likely are you to recommend the Business Machine experience to someone like you?
          </p>
          <div className="mt-2 grid grid-cols-6 gap-1">
            {Array.from({ length: 11 }, (_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNps(n)}
                className={`min-h-11 touch-manipulation rounded-lg border text-sm font-semibold select-none ${nps === n ? "border-gold bg-gold text-navy" : "border-line"}`}
              >
                {n}
              </button>
            ))}
          </div>
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Optional sentence"
            className="mt-3 min-h-20 w-full rounded-xl border border-line px-3 py-3 text-base"
          />
          <label className="mt-2 flex items-start gap-2 text-sm">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>The GM may read this sentence back to the room.</span>
          </label>
          <Select className="mt-3" value={nextRole} onChange={(e) => setNextRole(e.target.value)} aria-label="Next role">
            <option value="">Where do you want to go next?</option>
            {NEXT_ROLES.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </Select>
          <Btn
            className="mt-3 w-full"
            onClick={() => {
              void game
                .player("feedback", { experience, nps, quote, consent, nextRole })
                .then((res) => {
                  if (!res.ok) setErr(res.error);
                });
            }}
          >
            Save feedback
          </Btn>
        </Card>
      ) : null}
      <Card>
        <h2 className="font-display text-xl text-cream">This phone</h2>
        <p className="mt-1 text-sm text-muted">Leave the seat on this device. The GM can seat you again.</p>
        <Btn
          kind="ghost"
          className="mt-3 w-full"
          onClick={() => {
            clearPlayer(code);
          }}
        >
          Leave this seat
        </Btn>
      </Card>
    </div>
  );
}
