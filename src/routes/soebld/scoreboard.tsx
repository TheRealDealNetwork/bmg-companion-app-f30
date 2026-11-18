import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { companyBoard } from "@/lib/metalcon/api";
import { readPageSeat, type MetalSeat } from "@/lib/metalcon/session";
import { money } from "@/lib/game/format";
import { Card } from "@/components/game/ui";
import { CompanyBanner } from "@/components/game/company-banner";
import { LangSwitch, useLang } from "@/lib/metalcon/lang";
import { deptLabel, t } from "@/lib/metalcon/i18n";
import { COMPANY_NAVY, DEPT_COLOR, DEPTS } from "@/lib/metalcon/principle-bank";

export const Route = createFileRoute("/soebld/scoreboard")({
  component: ScoreboardPage,
});

type Board = Awaited<ReturnType<typeof companyBoard>>;

function ScoreboardPage() {
  const navigate = useNavigate();
  const [seat, setSeat] = useState<MetalSeat | null>(null);
  const [board, setBoard] = useState<Extract<Board, { ok: true }> | null>(null);
  const [tab, setTab] = useState<"players" | "departments" | "company">("departments");
  const { lang, setLang } = useLang(seat?.id);

  useEffect(() => {
    document.title = lang === "es" ? "Tabla de Valor" : "Value Scoreboard";
    const saved = readPageSeat();
    if (!saved) void navigate({ to: "/soebld/join" });
    else setSeat(saved);
    const onVisible = () => { if (document.visibilityState === "visible") { const again = readPageSeat(); if (again) setSeat(again); } };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [navigate, lang]);

  useEffect(() => {
    if (!seat) return;
    let stop = false;
    async function load() {
      if (!seat) return;
      const res = await companyBoard({ data: { id: seat.id, secret: seat.secret } });
      if (!stop && res.ok) setBoard(res);
    }
    void load();
    const timer = window.setInterval(() => void load(), 6000);
    return () => { stop = true; window.clearInterval(timer); };
  }, [seat]);

  if (!seat || !board) return <main className="mx-auto max-w-lg px-4 py-6 text-cream">{t("numbers.opening", lang)}</main>;
  const numbers = board.numbers;
  const empty = numbers.players.every((p) => p.cents === 0) && numbers.revenueCents === 0;
  const byDept = new Map(numbers.departments.map((row) => [row.dept, row.cents]));
  const companyValue = DEPTS.reduce((sum, dept) => sum + (byDept.get(dept) ?? 0), 0);

  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest text-gold uppercase">The Business Machine Experience</p>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      <CompanyBanner name={numbers.companyName} lang={lang} />
      <h1 className="mt-1 text-2xl text-cream" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}>{lang === "es" ? "Tabla de Valor" : "Value Scoreboard"}</h1>
      <p className="mt-1 text-sm text-muted">{lang === "es" ? "Quién está aportando más valor a la empresa." : "Who's adding the most value to the company."}</p>
      {empty ? <p className="mt-4 text-sm text-muted">{lang === "es" ? "Todavía no hay números. Juega tu primera carta para poner la máquina en marcha." : "No numbers yet. Play your first card to get the machine moving."}</p> : null}

      <div className="mt-4 flex gap-2">
        {(["players", "departments", "company"] as const).map((key) => (
          <button key={key} type="button" onClick={() => setTab(key)} className={`rounded-xl px-3 py-2 text-sm font-semibold ${tab === key ? "bg-gold text-navy" : "border border-line text-cream"}`}>
            {key === "players" ? (lang === "es" ? "Jugadores" : "Players") : key === "departments" ? (lang === "es" ? "Departamentos" : "Departments") : (lang === "es" ? "Empresa" : "Company")}
          </button>
        ))}
      </div>

      {tab === "departments" ? (
        <div className="mt-4 space-y-2">
          {DEPTS.map((dept) => {
            const cents = byDept.get(dept) ?? 0;
            return (
              <div key={dept} className="flex items-center justify-between rounded-xl px-3 py-2 text-cream" style={{ background: DEPT_COLOR[dept] }}>
                <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}>{deptLabel(dept, lang)}</span>
                <SignedLine cents={cents} lang={lang} />
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "players" ? (
        <Card className="mt-4 space-y-1 text-sm text-cream">
          {numbers.players.filter((p) => DEPTS.includes(p.dept)).map((player) => (
            <p key={player.id} className="flex justify-between">
              <span>{player.name} · {deptLabel(player.dept, lang)}</span>
              <span>{money(player.cents)}</span>
            </p>
          ))}
        </Card>
      ) : null}

      {tab === "company" ? (
        <div className="mt-4 space-y-2 rounded-xl px-4 py-4 text-cream" style={{ background: COMPANY_NAVY }}>
          <p className="text-xs font-bold uppercase tracking-wide text-gold" style={{ fontFamily: "Montserrat, sans-serif" }}>{lang === "es" ? "Resultados de la empresa" : "Company results"}</p>
          <p className="flex justify-between text-sm"><span>{lang === "es" ? "Ingresos" : "Revenue"}</span><span>{money(numbers.revenueCents)}</span></p>
          <p className="flex justify-between text-sm"><span>{lang === "es" ? "Nómina" : "Payroll"}</span><span>{money(numbers.payrollCents)}</span></p>
          {numbers.fixedCents ? <p className="flex justify-between text-sm"><span>{lang === "es" ? "Costo fijo" : "Fixed cost"}</span><span>{money(numbers.fixedCents)}</span></p> : null}
          {numbers.costLines.map((line, i) => <p key={i} className="flex justify-between text-sm"><span>{lang === "es" ? line.label.replace("GM event", "evento del GM").replace("round", "ronda") : line.label}</span><span>{money(line.cents)}</span></p>)}
          <p className="flex justify-between text-sm"><span>{lang === "es" ? "Utilidad neta" : "Net profit"}</span><span>{money(numbers.profitCents)}</span></p>
          <p className="text-xs text-muted">{lang === "es" ? "Igual que Números y Finanzas." : "Same as Numbers and Financials."}</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-4">
        <Link to="/soebld/play" search={{ seat: seat.id }} className="text-sm font-semibold text-gold">{lang === "es" ? "Volver a tu asiento" : "Back to your seat"}</Link>
        <span className="mx-2 text-muted">·</span>
        <Link to="/soebld/numbers" search={{ seat: seat.id }} className="text-sm font-semibold text-gold">{t("play.numbers", lang)}</Link>
        <span className="mx-2 text-muted">·</span>
        <Link to="/soebld/financials" search={{ seat: seat.id }} className="text-sm font-semibold text-gold">{lang === "es" ? "Finanzas del Negocio" : "Business Financials"}</Link>
      </div>
    </main>
  );
}

/** One sign rule for department lines (f30): saved = green, cost = red, never a bare signed number. */
function SignedLine({ cents, lang }: { cents: number; lang: "en" | "es" }) {
  if (cents >= 0) return <span className="rounded bg-[#0C1230]/80 px-1.5 text-green-400">{lang === "es" ? "ahorró" : "saved"} {money(cents)}</span>;
  return <span className="rounded bg-[#0C1230]/80 px-1.5 text-red-400">{lang === "es" ? "costo" : "cost"} {money(Math.abs(cents))}</span>;
}
