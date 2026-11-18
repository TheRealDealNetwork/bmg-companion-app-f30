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

export const Route = createFileRoute("/soebld/financials")({
  component: FinancialsPage,
});

const NAVY = COMPANY_NAVY;
type Board = Awaited<ReturnType<typeof companyBoard>>;

function FinancialsPage() {
  const navigate = useNavigate();
  const [seat, setSeat] = useState<MetalSeat | null>(null);
  const [board, setBoard] = useState<Extract<Board, { ok: true }> | null>(null);
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang(seat?.id);

  useEffect(() => {
    document.title = lang === "es" ? "Finanzas del negocio" : "Business Financials";
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
    return () => {
      stop = true;
      window.clearInterval(timer);
    };
  }, [seat]);

  if (!seat || !board) {
    return <main className="mx-auto max-w-lg px-4 py-6 text-cream">{t("numbers.opening", lang)}</main>;
  }
  const numbers = board.numbers;
  const mine = numbers.players.find((player) => player.id === seat.id);
  const companyValue = numbers.players.reduce((sum, player) => sum + player.cents, 0);

  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest text-gold uppercase">
          <p className="text-xs font-bold tracking-widest text-gold uppercase">The Business Machine Experience</p>
        </p>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      <CompanyBanner name={numbers.companyName} lang={lang} />
      <h1 className="mt-1 text-2xl text-cream" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}>
        {lang === "es" ? "Finanzas del Negocio" : "Business Financials"}
      </h1>
      <p className="mt-1 text-sm text-muted">{lang === "es" ? "Todo el dinero de la empresa en un solo lugar." : "The whole company's money in one place."}</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Big name={lang === "es" ? "Ingresos" : "Revenue"} value={money(numbers.revenueCents)} hint={lang === "es" ? "El dinero que la empresa ganó con proyectos terminados." : "Money the company brought in from finished projects."} />
        <Big name={lang === "es" ? "Nómina" : "Payroll"} value={money(numbers.payrollCents)} hint={lang === "es" ? "Lo que la empresa le pagó a su gente en este juego." : "What the company paid its people this game."} />
        <Big name={lang === "es" ? "Ganancia" : "Profit"} value={money(numbers.profitCents)} hint={lang === "es" ? "Lo que queda después de la nómina. Este es el puntaje que importa." : "What's left after payroll. This is the score that matters."} extra={numbers.profitCents < 0 ? (lang === "es" ? "Primero se paga la nómina. Los proyectos terminados traen el dinero." : "Payroll comes first. Finished projects bring the money in.") : ""} />
      </div>

      <div className="mt-4 space-y-2">
        {DEPTS.map((dept) => {
          const cents = numbers.departments.find((row) => row.dept === dept)?.cents ?? 0;
          const highlight = mine?.dept === dept;
          return (
            <div key={dept} className="flex items-center justify-between rounded-xl px-3 py-2 text-base text-cream" style={{ background: DEPT_COLOR[dept], border: highlight ? "3px solid #FFFFFF" : "none", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
              <span>{deptLabel(dept, lang)} <span className="text-xs font-normal">{lang === "es" ? "(todo el juego)" : "(this game)"}</span></span>
              <SignedLine cents={cents} lang={lang} />
              {highlight ? <span className="ml-2 rounded-full bg-cream px-2 py-0.5 text-xs text-navy">{lang === "es" ? "Tú" : "You"}</span> : null}
            </div>
          );
        })}
      </div>

      <button type="button" className="mt-4 text-sm font-semibold text-gold" onClick={() => setOpen((v) => !v)}>
        {open ? (lang === "es" ? "Ocultar" : "Hide") : lang === "es" ? "Ver de dónde vino el dinero" : "See where the money came from"}
      </button>

      {open ? (
        <div className="mt-3 space-y-3">
          <Card className="space-y-1 text-sm text-cream">
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}>{lang === "es" ? "De dónde vino el dinero" : "Where the money came from"}</h2>
            <p>{t("numbers.revenues", lang)}: {money(numbers.revenueCents)}</p>
            <p>{t("numbers.variable", lang)}: {money(numbers.otherCents)}</p>
            <p>{t("numbers.gross", lang)}: {money(numbers.revenueCents - numbers.otherCents)}</p>
            <p>{t("numbers.payroll", lang)}: {money(numbers.payrollCents)}</p>
            <p>{t("numbers.fixed", lang)}: {money(numbers.fixedCents)}</p>
            <p>{t("numbers.net", lang)}: {money(numbers.profitCents)}</p>
            <p>{t("numbers.netPct", lang)}: {numbers.marginBps === null ? "0%" : `${(numbers.marginBps / 100).toFixed(1)}%`}</p>
            <p>{lang === "es" ? "Efectos de cartas" : "Card effects so far"}: {numbers.cardEffects.length}</p>
          </Card>
          <Card className="space-y-1 text-sm text-cream">
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}>{lang === "es" ? "Proyectos" : "Projects"}</h2>
            {numbers.projects.length === 0 ? <p className="text-muted">{lang === "es" ? "No hay proyectos abiertos." : "No projects opened."}</p> : null}
            {numbers.projects.map((project) => (
              <p key={project.n}>
                {lang === "es" ? "Proyecto" : "Project"} {project.n}: {money(project.status === "complete" ? project.revenueCents : project.potentialCents)}
                {project.status === "complete" ? (lang === "es" ? " · terminado" : " · completed") : lang === "es" ? " · potencial" : " · potential"}
              </p>
            ))}
          </Card>
          <Card className="space-y-1 text-sm text-cream">
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}>{lang === "es" ? "Aporte de valor" : "Value contribution"}</h2>
            <p style={{ color: NAVY, fontFamily: "Inter, sans-serif" }}>
              {lang === "es" ? "Empresa" : "Company"}: {money(companyValue)}
            </p>
            {numbers.departments.map((row) => (
              <p key={row.dept} style={{ color: DEPT_COLOR[row.dept] || NAVY }}>
                {deptLabel(row.dept, lang)}: <SignedLine cents={row.cents} lang={lang} />
              </p>
            ))}
            {numbers.players.map((player) => (
              <p key={player.id} className="text-cream">
                {player.name} · {deptLabel(player.dept, lang)}: {money(player.cents)}
              </p>
            ))}
          </Card>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-4">
        <Link to="/soebld/play" search={{ seat: seat.id }} className="text-sm font-semibold text-gold">{lang === "es" ? "Volver a tu asiento" : "Back to your seat"}</Link>
        <span className="mx-2 text-muted">·</span>
        <Link to="/soebld/numbers" search={{ seat: seat.id }} className="text-sm font-semibold text-gold">{t("play.numbers", lang)}</Link>
        <span className="mx-2 text-muted">·</span>
        <Link to="/soebld/scoreboard" search={{ seat: seat.id }} className="text-sm font-semibold text-gold">{lang === "es" ? "Tabla de Valor" : "Value Scoreboard"}</Link>
      </div>
    </main>
  );
}

function Big({ name, value, hint, extra }: { name: string; value: string; hint?: string; extra?: string }) {
  return (
    <div className="rounded-xl px-3 py-3 text-center" style={{ background: NAVY }}>
      <p className="text-xs font-bold uppercase tracking-wide text-gold" style={{ fontFamily: "Montserrat, sans-serif" }}>{name}</p>
      <p className="mt-1 text-cream" style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(0.8rem, 3.6vw, 1.6rem)", lineHeight: 1.1, paddingInline: "0.35rem" }}>{value}</p>
      {hint ? <p className="mt-1 text-[10px] leading-tight text-muted">{hint}</p> : null}
      {extra ? <p className="mt-1 text-[10px] leading-tight text-gold">{extra}</p> : null}
    </div>
  );
}

/** One sign rule for department lines (f30): saved = green, cost = red, never a bare signed number. */
function SignedLine({ cents, lang }: { cents: number; lang: "en" | "es" }) {
  if (cents >= 0) return <span className="rounded bg-[#0C1230]/80 px-1.5 text-green-400">{lang === "es" ? "ahorró" : "saved"} {money(cents)}</span>;
  return <span className="rounded bg-[#0C1230]/80 px-1.5 text-red-400">{lang === "es" ? "costo" : "cost"} {money(Math.abs(cents))}</span>;
}
