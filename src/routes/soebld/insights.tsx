import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/game/ui";
import { money } from "@/lib/game/format";
import { insightsFor } from "@/lib/metalcon/api";
import { readPageSeat } from "@/lib/metalcon/session";

export const Route = createFileRoute("/soebld/insights")({ component: Insights });

function Insights() {
  const [data, setData] = useState<Extract<Awaited<ReturnType<typeof insightsFor>>, { ok: true }> | null>(null);
  useEffect(() => {
    const seat = readPageSeat();
    if (!seat) return;
    void insightsFor({ data: { id: seat.id, secret: seat.secret } }).then((res) => { if (res.ok) setData(res); });
  }, []);
  if (!data?.numbers) return <main className="mx-auto max-w-lg px-4 py-6 text-cream">Sign in to see insights.</main>;
  const numbers = data.numbers;
  return (
    <main className="mx-auto max-w-lg px-4 py-6">
      <h1 className="font-display text-3xl text-cream">{data.role === "gm" ? "GM insights" : "Your insights"}</h1>
      <Card className="mt-3">
        <p className="text-sm text-cream">Net margin by round</p>
        <MarginChart points={data.marginByRound} />
        <p className="mt-1 text-xs text-muted">Gold line is margin. 30% win, 50% Market Leader.</p>
      </Card>
      <Card className="mt-3">
        <p className="text-sm text-cream">Payroll by department</p>
        <BarChart rows={numbers.departments.map((row) => ({ label: row.dept, value: Math.abs(row.cents) }))} />
      </Card>
      <Card className="mt-3">
        <p className="text-sm text-cream">Revenue by project</p>
        <BarChart rows={data.projects.map((project) => ({ label: `P${project.n}${project.status === "complete" ? "" : " potential"}`, value: project.status === "complete" ? project.revenueCents : project.potentialCents }))} />
      </Card>
      <Card className="mt-3">
        <p className="text-sm text-cream">Player qualities</p>
        {data.qualities.map((row) => (
          <p key={row.dept} className="mt-2 text-sm text-cream">
            {row.dept}: {row.accuracy}% accurate · {row.avgSeconds}s between answers · {row.note}
          </p>
        ))}
        <p className="mt-2 text-xs text-muted">Accuracy is right answers over answers in this view. A player sees their own. The GM sees the game.</p>
      </Card>
      <Card className="mt-3">
        <p className="text-sm text-cream">Company</p>
        <p className="mt-1 text-sm text-cream">Revenue {money(numbers.revenueCents)} · Payroll {money(numbers.payrollCents)} · Profit {money(numbers.profitCents)}</p>
      </Card>
    </main>
  );
}

function MarginChart({ points }: { points: { round: number; margin: number }[] }) {
  const width = 320;
  const height = 120;
  const rows = points.length ? points : [{ round: 1, margin: 0 }];
  const step = width / Math.max(1, rows.length - 1);
  const y = (value: number) => height - (value / 100) * height;
  const line = rows.map((row, i) => `${i * step},${y(row.margin)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 w-full">
      <line x1="0" x2={width} y1={y(30)} y2={y(30)} stroke="#d4a05c" strokeDasharray="4 4" />
      <line x1="0" x2={width} y1={y(50)} y2={y(50)} stroke="#59ABA9" strokeDasharray="4 4" />
      <polyline fill="none" stroke="#d4a05c" strokeWidth="3" points={line} />
    </svg>
  );
}

function BarChart({ rows }: { rows: { label: string; value: number }[] }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <div className="mt-2 space-y-2">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="flex justify-between text-xs text-muted"><span>{row.label}</span><span>{money(row.value)}</span></div>
          <div className="h-2 rounded-full bg-navy-2"><div className="h-full rounded-full bg-gold" style={{ width: `${(row.value / max) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}
