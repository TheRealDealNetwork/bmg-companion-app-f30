import { analyzeGame, badgesFor, type EconomySource, type GameReport } from "@/lib/game/economy";
import { money, pct } from "@/lib/game/format";
import type { GameView } from "@/lib/game/types";

export function sourceFromView(view: GameView): EconomySource {
  return {
    code: view.code,
    company: view.company,
    rehearsal: view.rehearsal,
    status: view.status,
    round: view.round,
    settings: view.settings,
    board: view.board,
    players: view.players.map((p) => ({ id: p.id, name: p.name, dept: p.dept, profileId: p.profileId, active: p.active })),
    answers: view.answers.map((a) => ({
      playerId: a.playerId,
      playerName: a.playerName,
      dept: a.dept,
      valueCents: a.valueCents,
      principle: a.principle,
      title: a.title,
      round: a.round,
    })),
    plays: view.plays.map((p) => ({ dept: p.dept, name: p.name, type: p.type, text: p.text, forced: p.forced, exempt: p.exempt, round: p.round })),
    projects: view.projects.map((p) => ({ n: p.n, status: p.status, valueCents: p.valueCents, collected: p.collected, lateFee: p.lateFee })),
    adjustments: view.adjustments.map((a) => ({ cents: a.cents, label: a.label })),
  };
}

export function ReportPanel({ view, focusId }: { view: GameView; focusId?: string }) {
  const report = analyzeGame(sourceFromView(view));
  const mine = focusId ? report.people.find((p) => p.id === focusId) : null;
  const badges = mine
    ? badgesFor({
        games: 1,
        wins: report.finished && report.win ? 1 : 0,
        best: mine.best,
        weak: mine.weak,
        roles: 1,
        rate: mine.answered ? mine.best / mine.answered : 0,
      })
    : [];
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <div>
        <p className="text-xs font-bold tracking-widest text-gold uppercase">{report.finished ? "After the game" : "So far"}</p>
        <h2 className="font-display text-2xl text-cream">{report.company}</h2>
        <p className="mt-1 text-cream">
          {report.win ? "Win" : report.finished ? "Short of a win" : "In progress"}
          {report.marketLeader ? " · Market leader" : ""} · Valuation {money(report.valuation)} · Margin {pct(report.margin)}
        </p>
      </div>
      {badges.length ? (
        <ul className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <li key={badge.id} className="rounded-full border border-gold px-3 py-1 text-xs font-semibold text-gold" title={badge.detail}>
              {badge.title}
            </li>
          ))}
        </ul>
      ) : null}
      <Block title={mine ? "Your decisions" : "What carried it"} lines={mine ? mine.notes : report.wins} />
      <Block title={report.win ? "Why it won" : "What got in the way"} lines={report.causes} />
      <Block title="What to learn" lines={report.lessons} />
      {!focusId ? (
        <div>
          <p className="text-xs font-bold tracking-wide text-muted uppercase">People</p>
          <ul className="mt-2 space-y-2">
            {report.people.map((person) => (
              <li key={person.id} className="rounded-xl bg-navy-2 px-3 py-2">
                <p className="font-semibold text-cream">
                  {person.name} · {person.dept}
                </p>
                <p className="text-muted">
                  {person.best} best · {person.partial} partial · {person.weak} weak
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Bars report={report} />
    </div>
  );
}

function Block({ title, lines }: { title: string; lines: string[] }) {
  if (!lines.length) return null;
  return (
    <div>
      <p className="text-xs font-bold tracking-wide text-muted uppercase">{title}</p>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-ink">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

function Bars({ report }: { report: GameReport }) {
  const max = Math.max(1, ...report.depts.map((d) => d.best + d.weak + d.partial));
  if (!report.depts.length) return null;
  return (
    <div>
      <p className="text-xs font-bold tracking-wide text-muted uppercase">Judgment by department</p>
      <ul className="mt-2 space-y-2">
        {report.depts.map((dept) => (
          <li key={dept.dept}>
            <div className="flex justify-between text-xs text-muted">
              <span>{dept.dept}</span>
              <span>
                {dept.best} best · {dept.weak} weak
              </span>
            </div>
            <div className="mt-1 flex h-2 overflow-hidden rounded-full bg-navy">
              <span className="bg-gold" style={{ width: `${(dept.best / max) * 100}%` }} />
              <span className="bg-stage-sale" style={{ width: `${(dept.partial / max) * 100}%` }} />
              <span className="bg-stage-star" style={{ width: `${(dept.weak / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
