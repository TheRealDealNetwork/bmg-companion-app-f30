import { useEffect, useState } from "react";
import { money, pct } from "@/lib/game/format";
import { PHASES } from "@/lib/game/types";
import { BoardCue, ProjectBoard } from "./board";
import { ClockReadout } from "./ui";
import { useGame } from "./use-game";

const BEATS = [
  "Live board",
  "The result",
  "Round by round",
  "Departments",
  "Principles",
  "Honors",
  "Shout-outs",
  "Check your phones",
];

export function RoomView({ code }: { code: string }) {
  const game = useGame(code, "room");
  const view = game.view;
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (!view) return;
    setPulse(true);
    const id = window.setTimeout(() => setPulse(false), 600);
    return () => window.clearTimeout(id);
  }, [view?.rev]);

  if (!view) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-navy px-6 text-cream">
        <p className="font-display text-3xl">{game.loading ? "Opening the room…" : game.error || "Finding the game…"}</p>
      </main>
    );
  }

  const beat = view.showBeat;
  const ceremony = beat > 0 && view.status !== "lobby";
  const phase = PHASES.find((p) => p.n === view.phase)?.label ?? "";

  return (
    <main className="min-h-screen bg-navy px-6 py-6 text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo-tlp.png" alt="" className="h-14 w-auto rounded-full bg-cream" />
          <div>
            <p className="font-display text-3xl leading-none">{view.company}</p>
            <p className="mt-1 text-sm text-gold">
              {view.rehearsal ? "Rehearsal · " : ""}
              {view.status === "live" ? `Round ${view.round} of ${view.settings.rounds} · ${phase}` : label(view.status)}
              {ceremony ? ` · ${BEATS[beat]}` : ""}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p>
            <ClockReadout
              timers={view.timers}
              serverNow={view.serverNow}
              which={view.status === "live" ? "round" : "game"}
              warnAt={60}
              className={`font-display text-6xl leading-none tabular-nums ${pulse ? "opacity-80" : ""}`}
              calmClass="text-cream"
            />
          </p>
          <p className="text-sm text-gold">
            {view.status === "live" ? (
              <>
                Game{" "}
                <ClockReadout
                  timers={view.timers}
                  serverNow={view.serverNow}
                  which="game"
                  className="text-sm"
                  calmClass="text-gold"
                />
              </>
            ) : (
              "Valuation × 3"
            )}
          </p>
        </div>
      </div>

      {view.announcement ? (
        <p className="mx-auto mt-4 max-w-6xl rounded-2xl bg-gold px-4 py-3 text-lg font-semibold text-navy">
          {view.announcement}
        </p>
      ) : null}

      <div className="mx-auto mt-6 max-w-6xl">
        {ceremony && beat === 1 ? <Result view={view} /> : null}
        {ceremony && beat === 2 ? <Rounds view={view} /> : null}
        {ceremony && beat === 3 ? <Depts view={view} /> : null}
        {ceremony && beat === 4 ? <Principles view={view} /> : null}
        {ceremony && beat === 5 ? <Honors view={view} /> : null}
        {ceremony && beat === 6 ? <Shouts view={view} /> : null}
        {ceremony && beat === 7 ? (
          <section className="py-16 text-center">
            <h2 className="font-display text-5xl">Check your phones</h2>
            <p className="mx-auto mt-4 max-w-xl text-xl text-gold">
              Three questions, a rating, and an optional sentence. It takes less than a minute.
            </p>
          </section>
        ) : null}
        {!ceremony ? <Live view={view} /> : null}
      </div>
    </main>
  );
}

function label(status: string) {
  if (status === "audit") return "Final audit";
  if (status === "post") return "Post-game";
  if (status === "done") return "Closed";
  if (status === "lobby") return "Lobby";
  return status;
}

function Live({ view }: { view: NonNullable<ReturnType<typeof useGame>["view"]> }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <section className="rounded-3xl bg-navy-2 p-6 text-cream lg:col-span-2">
        <BoardCue view={view} />
      </section>
      <div className="lg:col-span-2">
        <ProjectBoard projects={view.projects} wide />
      </div>
      <section className="rounded-3xl bg-navy-2 p-6">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase">Valuation</p>
        <p className="font-display text-7xl leading-none text-gold">{money(view.board.valuation)}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-lg">
          <span>Revenue {money(view.board.revenue)}</span>
          <span>Profit {money(view.board.profit)}</span>
          <span>Margin {pct(view.board.margin)}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <Mark on={view.board.win}>Win {money(view.settings.winCents)}</Mark>
          <Mark on={view.board.marketLeader}>Market Leader {money(view.settings.mlCents)}</Mark>
        </div>
        {view.events[0] ? (
          <div className="mt-6 border-t border-cream/20 pt-4">
            <p className="text-xs font-bold tracking-widest text-gold uppercase">Event</p>
            <p className="font-display text-3xl">{view.events[0].name}</p>
            <p className="mt-1 max-w-xl text-cream/90">{view.events[0].text}</p>
          </div>
        ) : null}
      </section>
      <section className="rounded-3xl bg-navy-2 p-6 text-cream">
        <h2 className="font-display text-2xl">Departments</h2>
        <ul className="mt-3 space-y-3">
          {view.board.depts.map((d) => {
            const head = view.heads.find((h) => h.dept === d.dept);
            return (
              <li key={d.dept} className="flex items-baseline justify-between gap-3 border-b border-line pb-2">
                <div>
                  <p className="font-semibold">{d.dept}</p>
                  <p className="text-sm text-muted">{head ? `Up ${head.name}` : "No players yet"}</p>
                </div>
                <p className="font-display text-2xl tabular-nums">{money(d.profit)}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Result({ view }: { view: NonNullable<ReturnType<typeof useGame>["view"]> }) {
  const title = view.board.marketLeader ? "Market Leader" : view.board.win ? "Win" : "Short of the mark";
  return (
    <section className="py-8 text-center">
      <p className="text-sm font-bold tracking-widest text-gold uppercase">{title}</p>
      <p className="font-display text-8xl text-gold">{money(view.board.valuation)}</p>
      <p className="mt-3 text-2xl">
        Profit {money(view.board.profit)} · Margin {pct(view.board.margin)} · Revenue {money(view.board.revenue)}
      </p>
      <p className="mt-2 text-gold">Net profit × 3. Margin qualifier {Math.round(view.settings.marginBps / 100)}%.</p>
    </section>
  );
}

function Rounds({ view }: { view: NonNullable<ReturnType<typeof useGame>["view"]> }) {
  return (
    <section>
      <h2 className="font-display text-4xl">Round by round</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {view.board.rounds.map((r) => (
          <div key={r.round} className="rounded-2xl bg-navy-2 p-4">
            <p className="text-sm text-gold">Round {r.round}</p>
            <p className="font-display text-3xl">{money(r.profit)}</p>
            <p className="text-sm text-cream/80">Revenue {money(r.revenue)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Depts({ view }: { view: NonNullable<ReturnType<typeof useGame>["view"]> }) {
  return (
    <section>
      <h2 className="font-display text-4xl">Departments</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {view.board.depts.map((d) => (
          <div key={d.dept} className="flex items-center justify-between rounded-2xl bg-navy-2 px-4 py-4 text-cream">
            <div>
              <p className="font-display text-2xl">{d.dept}</p>
              <p className="text-sm text-muted">
                Revenue {money(d.revenue)} · Payroll {money(d.netPay)}
              </p>
            </div>
            <p className="font-display text-3xl tabular-nums">{money(d.profit)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Principles({ view }: { view: NonNullable<ReturnType<typeof useGame>["view"]> }) {
  return (
    <section>
      <h2 className="font-display text-4xl">Principles</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {view.principles.map((item) => (
          <li key={item.name} className="flex items-center justify-between rounded-2xl bg-navy-2 px-4 py-3">
            <span>{item.name}</span>
            <span className="font-display text-3xl text-gold">{item.count}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Honors({ view }: { view: NonNullable<ReturnType<typeof useGame>["view"]> }) {
  return (
    <section>
      <h2 className="font-display text-4xl">Honors</h2>
      <ul className="mt-4 space-y-3">
        {view.honors.map((honor) => (
          <li key={honor.id} className="rounded-2xl bg-navy-2 px-4 py-4 text-cream">
            <p className="font-display text-2xl">{honor.title}</p>
            <p className="text-sm text-muted">{honor.detail}</p>
            <p className="mt-1 font-semibold">{honor.names.join(", ") || "—"}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Shouts({ view }: { view: NonNullable<ReturnType<typeof useGame>["view"]> }) {
  return (
    <section>
      <h2 className="font-display text-4xl">Shout-outs</h2>
      <ul className="mt-4 space-y-3">
        {view.shoutouts.map((shout) => (
          <li key={shout.id} className="rounded-2xl bg-navy-2 px-4 py-3">
            <p className="font-display text-2xl">
              {shout.fromName} → {shout.toName}
            </p>
            <p className="text-gold">{shout.principle}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Mark({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${on ? "bg-gold text-navy" : "bg-white/10 text-cream"}`}>
      {children}
    </span>
  );
}
