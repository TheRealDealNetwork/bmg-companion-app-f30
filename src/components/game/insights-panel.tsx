import { useState } from "react";
import { askInsights, loadInsights } from "@/lib/game/api";
import { money, pct } from "@/lib/game/format";
import { BOARD_DEPTS } from "@/lib/game/types";
import type { Insights } from "@/lib/game/economy";
import { adminToken, readProfileSession } from "@/lib/game/session";
import { Btn, Field, Select } from "./ui";

export function InsightsPanel() {
  const [code, setCode] = useState("");
  const [dept, setDept] = useState("");
  const [person, setPerson] = useState("");
  const [rehearsal, setRehearsal] = useState(false);
  const [data, setData] = useState<Insights | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function run() {
    setBusy(true);
    setErr("");
    const res = await loadInsights({ data: { adminToken: adminToken(), profileSecret: readProfileSession()?.secret ?? "", code, dept, person, includeRehearsal: rehearsal } });
    setBusy(false);
    if (!res.ok) return;
    setData(res.insights);
  }

  async function ask() {
    setBusy(true);
    setErr("");
    const res = await askInsights({
      data: { adminToken: adminToken(), profileSecret: readProfileSession()?.secret ?? "", question, code, dept, person, includeRehearsal: rehearsal },
    });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setAnswer(res.answer);
  }

  const max = Math.max(1, ...(data?.byDept.map((d) => d.best + d.partial + d.weak) ?? [1]));

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-4">
        <Field aria-label="Game code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="One game code" />
        <Select aria-label="Department" value={dept} onChange={(e) => setDept(e.target.value)}>
          <option value="">All departments</option>
          {BOARD_DEPTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </Select>
        <Field aria-label="Person" value={person} onChange={(e) => setPerson(e.target.value)} placeholder="A person's name" />
        <Btn onClick={() => void run()}>{busy ? "Reading…" : "Pull the record"}</Btn>
      </div>
      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" checked={rehearsal} onChange={(e) => setRehearsal(e.target.checked)} />
        Include rehearsals
      </label>
      {err ? <p className="text-sm text-orange-ink">{err}</p> : null}
      {data ? (
        <>
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat k="Games" v={String(data.games)} />
            <Stat k="Win rate" v={pct(data.winRate)} />
            <Stat k="Avg valuation" v={money(data.avgValuation)} />
            <Stat k="Best / weak" v={`${data.bestAnswers} / ${data.weakAnswers}`} />
          </dl>
          <section>
            <h3 className="font-display text-xl text-cream">Judgment</h3>
            <ul className="mt-2 space-y-2">
              {data.byDept.map((deptRow) => (
                <li key={deptRow.dept}>
                  <div className="flex justify-between text-xs text-muted">
                    <span>{deptRow.dept}</span>
                    <span>{pct(deptRow.rate)} best</span>
                  </div>
                  <div className="mt-1 flex h-2 overflow-hidden rounded-full bg-navy">
                    <span className="bg-gold" style={{ width: `${(deptRow.best / max) * 100}%` }} />
                    <span className="bg-stage-sale" style={{ width: `${(deptRow.partial / max) * 100}%` }} />
                    <span className="bg-stage-star" style={{ width: `${(deptRow.weak / max) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="grid gap-3 sm:grid-cols-2">
            <Note title="Best performers" lines={data.whyBest} />
            <Note title="Lowest performers" lines={data.whyLow} />
          </section>
          <Note title="Who shows up, and why" lines={data.characteristics} />
          <Note title="Lessons across games" lines={data.lessons} />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs tracking-wide text-muted uppercase">
                <tr>
                  <th className="py-1 pr-3">Person</th>
                  <th className="py-1 pr-3">Roles</th>
                  <th className="py-1 pr-3">Games</th>
                  <th className="py-1 pr-3">Wins</th>
                  <th className="py-1">Best rate</th>
                </tr>
              </thead>
              <tbody>
                {data.people.slice(0, 40).map((person) => (
                  <tr key={person.key} className="border-t border-line">
                    <td className="py-2 pr-3 text-cream">
                      {person.name}
                      {person.trades ? <span className="block text-xs text-muted">{person.trades}{person.company ? ` · ${person.company}` : ""}</span> : null}
                    </td>
                    <td className="py-2 pr-3">{person.roles.join(", ")}</td>
                    <td className="py-2 pr-3">{person.games}</td>
                    <td className="py-2 pr-3">{person.wins}</td>
                    <td className="py-2">{pct(person.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted">Pull the record for every game on this GM key, or narrow it to one game, one department, or one person.</p>
      )}
      <div>
        <h3 className="font-display text-xl text-cream">Ask for a report</h3>
        <p className="mt-1 text-sm text-muted">The answer is written from the games in this filter. It does not invent scores.</p>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Who is judging well in Sales, and what should the low performers practice?"
          className="mt-2 min-h-24 w-full rounded-xl border border-line bg-navy-2 px-3 py-3 text-base text-cream"
        />
        <Btn className="mt-2" onClick={() => void ask()}>
          {busy ? "Writing…" : "Write the report"}
        </Btn>
        {answer ? <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink">{answer}</p> : null}
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-navy-2 px-3 py-2">
      <dt className="text-xs tracking-wide text-muted uppercase">{k}</dt>
      <dd className="font-display text-xl text-cream">{v}</dd>
    </div>
  );
}

function Note({ title, lines }: { title: string; lines: string[] }) {
  return (
    <section>
      <h3 className="font-display text-xl text-cream">{title}</h3>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  );
}
