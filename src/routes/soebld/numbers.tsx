import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { companyBoard } from "@/lib/metalcon/api";
import { readPageSeat, type MetalSeat } from "@/lib/metalcon/session";
import { money } from "@/lib/game/format";
import { Card } from "@/components/game/ui";
import { LangSwitch, useLang } from "@/lib/metalcon/lang";
import { bilingual, resolveName } from "@/lib/metalcon/es-cards";
import { TokenSlots } from "@/components/game/slots";
import { deptLabel, t } from "@/lib/metalcon/i18n";
import { DEPT_COLOR, DEPTS } from "@/lib/metalcon/principle-bank";

export const Route = createFileRoute("/soebld/numbers")({
  component: NumbersPage,
});

type Board = Awaited<ReturnType<typeof companyBoard>>;

function translateLedger(detail: string): string {
  let out = detail
    .replace(/confirmed/gi, "confirmó")
    .replace(/proposed/gi, "propuso")
    .replace(/on Project/gi, "en el Proyecto");
  out = out.replace(/\b[A-Z][A-Z ]{2,}\b/g, (caps) => {
    const resolved = resolveName(caps);
    if (resolved === caps) return caps;
    const b = bilingual(resolved, "es");
    return b.secondary ? `${b.primary} (${b.secondary})` : b.primary;
  });
  out = out.replace(/[a-z0-9]+(?:-[a-z0-9]+)+/g, (slug) => {
    const resolved = resolveName(slug);
    if (resolved === slug) return slug;
    const b = bilingual(resolved, "es");
    return b.secondary ? `${b.primary} (${b.secondary})` : resolved;
  });
  return out;
}
function translateEffect(line: string): string {
  const map: Record<string, string> = {
    "Overbudget Surprise: −$3,000 off company Revenues, right away.": "Overbudget Surprise: −$3,000 de los ingresos de la empresa, de inmediato.",
    "Financing Falls Through: Sales picks one unfinished project, which loses $2,000 of its revenue when it completes. If drawn again on the same project, the reductions stack.": "Financing Falls Through: Ventas elige un proyecto sin terminar, que pierde $2,000 de sus ingresos cuando se termina. Si sale de nuevo en el mismo proyecto, las reducciones se acumulan.",
    "Stanley: −$5,000 Variable Costs if the project is unfinished at the end of round 6.": "Stanley: −$5,000 en costos variables si el proyecto no está terminado al final de la ronda 6.",
    "Thompson: −$5,000 Variable Costs if the project completes 4th or later, by Accounting's close order.": "Thompson: −$5,000 en costos variables si el proyecto termina en 4.º lugar o después, según el orden de cierre de Contabilidad.",
    "Material Spike: −$2,000 Variable Costs, right away.": "Material Spike: −$2,000 en costos variables, de inmediato.",
    "Warranty Claim: −$2,000 Variable Costs, right away.": "Warranty Claim: −$2,000 en costos variables, de inmediato.",
    "Rivera: +$5,000 at completion, only if 2 or more SPECIAL cards were played on that same project. Splits and Crew Swap do not count.": "Rivera: +$5,000 al terminarlo, solo si se jugaron 2 o más cartas SPECIAL en ese mismo proyecto. Splits y Crew Swap no cuentan.",
    "Garcia: +$2,000 for each project finished after Garcia's, up to $8,000, by Accounting's close order.": "Garcia: +$2,000 por cada proyecto terminado después del de Garcia, hasta $8,000, según el orden de cierre de Contabilidad.",
    "Lee: +$1,000 for each token placed on Lee's project, up to $5,000. Moved or replaced tokens do not claw back.": "Lee: +$1,000 por cada ficha colocada en el proyecto de Lee, hasta $5,000. Las fichas movidas o reemplazadas no se recuperan.",
    "O'Brien: +$4,000 at game end to the last project that finished, by Accounting's close order. Paid once.": "O'Brien: +$4,000 al final del juego al último proyecto que terminó, según el orden de cierre de Contabilidad. Se paga una sola vez.",
    "Harris +$4,000, Patel +$2,000, Bi-Level +$3,000, McMansion +$2,000, Victorian +$2,000: at completion only.": "Harris +$4,000, Patel +$2,000, Bi-Level +$3,000, McMansion +$2,000, Victorian +$2,000: solo al terminarlo.",
    "Upsell Close: +$2,000 at completion for each time it is played on that project. The bonus stays if the token is later moved.": "Upsell Close: +$2,000 al terminarlo por cada vez que se juega en ese proyecto. La bonificación se queda si después se mueve la ficha.",
    "Invoice Blitz +$3,000, Quick Audit +$4,000, Invoice Paid Early +$3,000, Community Buzz +$3,000: added to company Revenues right away.": "Invoice Blitz +$3,000, Quick Audit +$4,000, Invoice Paid Early +$3,000, Community Buzz +$3,000: se suman a los ingresos de la empresa de inmediato.",
  };
  return map[line] || line;
}

function translateFigured(line: string): string {
  const map: Record<string, string> = {
    "Revenue = completed project tier + house bonus + customer bonus + special/event cash gains − revenue reductions (Overbudget Surprise, Financing Falls Through).": "Ingresos = nivel del proyecto terminado + bonificación de casa + bonificación de cliente + ganancias en efectivo de cartas special/event − reducciones de ingresos (Overbudget Surprise, Financing Falls Through).",
    "Positions 1-3 pay $10,000, 4-6 $20,000, 7-9 $30,000, only on completion. Unfinished is potential.": "Las posiciones 1-3 pagan $10,000, 4-6 $20,000, 7-9 $30,000, solo al terminarlo. Lo no terminado es potencial.",
    "Variable costs = cash losses and penalties (Stanley, Thompson, Material Spike, Warranty Claim).": "Costos variables = pérdidas en efectivo y penalizaciones (Stanley, Thompson, Material Spike, Warranty Claim).",
    "Gross margin = revenue − variable costs.": "Margen bruto = ingresos − costos variables.",
    "Payroll = $16,000 base a round + $500 × wrong answers − $500 × right answers.": "Nómina = $16,000 de base por ronda + $500 × respuestas incorrectas − $500 × respuestas correctas.",
    "Fixed cost = $2,000 × departments playing, each round from round 3.": "Costo fijo = $2,000 × departamentos que juegan, cada ronda a partir de la ronda 3.",
    "Net Margin = Gross Margin − Fixed Costs.": "Margen neto = margen bruto − costos fijos.",
    "Net Margin % = 100 × Net Margin / Revenues. 30% or below is no win. Above 30% wins. Above 50% is Market Leader.": "Margen neto % = 100 × margen neto / ingresos. 30% o menos no es victoria. Más de 30% es victoria. Más de 50% es Líder de Mercado.",
  };
  return map[line] || line;
}

function NumbersPage() {
  const navigate = useNavigate();
  const [seat, setSeat] = useState<MetalSeat | null>(null);
  const [board, setBoard] = useState<Extract<Board, { ok: true }> | null>(null);
  const [loadError, setLoadError] = useState("");
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang(seat?.id);

  useEffect(() => {
    document.title = "Numbers";
    const saved = readPageSeat();
    if (!saved) void navigate({ to: "/soebld/join" });
    else setSeat(saved);
    const onVisible = () => { if (document.visibilityState === "visible") { const again = readPageSeat(); if (again) setSeat(again); } };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [navigate]);

  useEffect(() => {
    if (!seat) return;
    let stop = false;
    async function load() {
      if (!seat) return;
      try {
        const res = await companyBoard({ data: { id: seat.id, secret: seat.secret } });
        if (stop) return;
        if (res.ok) {
          setBoard(res);
          setLoadError("");
        } else setLoadError(res.error);
      } catch (err) {
        if (!stop) setLoadError(err instanceof Error ? err.message : "Could not open the numbers.");
      }
    }
    void load();
    const timer = window.setInterval(() => void load(), 8000);
    return () => {
      stop = true;
      window.clearInterval(timer);
    };
  }, [seat]);

  if (!seat || !board) return <main className="mx-auto max-w-lg px-4 py-6 text-cream">{loadError || t("numbers.opening", lang)}</main>;
  const numbers = board.numbers;
  const mine = numbers.players.find((player) => player.id === seat.id);
  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest text-gold uppercase">{t("numbers.title", lang)}</p>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      <h1 className="mt-1 font-display text-3xl text-cream">{numbers.companyName || (lang === "es" ? "Números de la empresa" : "Company numbers")}</h1>
      {(() => {
        const es = lang === "es";
        const costLabel = (label: string) => es ? label.replace("GM event", "evento del GM").replace("round", "ronda") : label;
        // Every cost is its own labeled line, so Revenue − costs = Profit is visible on screen (Game 11 #105/#109/#112/#113).
        const rows: { label: string; cents: number; sign: "+" | "−" }[] = [
          { label: es ? "Ingresos" : "Revenue", cents: numbers.revenueCents, sign: "+" },
          { label: es ? "Nómina" : "Payroll", cents: numbers.payrollCents, sign: "−" },
          ...(numbers.fixedCents ? [{ label: es ? `Costo fijo (${numbers.fixedDeptCount} deptos × $2,000 por ronda desde la ronda 3)` : `Fixed cost (${numbers.fixedDeptCount} depts × $2,000 a round from round 3)`, cents: numbers.fixedCents, sign: "−" as const }] : []),
          ...numbers.costLines.map((line) => ({ label: costLabel(line.label), cents: line.cents, sign: "−" as const })),
        ];
        return (
          <div className="mt-4 rounded-xl px-3 py-3" style={{ background: "#1B2A4A", fontFamily: "Inter, sans-serif" }}>
            {rows.map((row, i) => (
              <div key={i} className="flex justify-between border-b border-line/40 py-1 text-sm">
                <span className={row.sign === "+" ? "text-cream" : "text-cream/90"}>{row.sign === "+" ? "" : "− "}{row.label}</span>
                <span className={row.sign === "+" ? "text-green-400" : "text-red-400"}>{row.sign === "+" ? "" : "−"}{money(row.cents)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 text-lg font-bold">
              <span className="text-gold">= {es ? "Ganancia" : "Profit"}</span>
              <span className={numbers.profitCents >= 0 ? "text-green-400" : "text-red-400"}>{money(numbers.profitCents)}</span>
            </div>
            <p className="mt-1 text-[10px] text-cream/70">{money(numbers.revenueCents)} − {rows.slice(1).map((row) => money(row.cents)).join(" − ")} = {money(numbers.profitCents)}</p>
            {(() => { const projTotal = numbers.projects.filter((p) => p.status === "complete").reduce((sum, p) => sum + p.revenueCents, 0); return <p className="mt-1 text-[10px] text-cream/70">{es ? `Ingresos: proyectos terminados ${money(projTotal)} + cartas ${money(numbers.revenueCents - projTotal)}` : `Revenue: finished projects ${money(projTotal)} + cards ${money(numbers.revenueCents - projTotal)}`}</p>; })()}
            {numbers.profitCents < 0 ? <p className="mt-1 text-[10px] text-gold">{es ? "Primero se paga la nómina. Los proyectos terminados traen el dinero." : "Payroll comes first. Finished projects bring the money in."}</p> : null}
          </div>
        );
      })()}
      <p className="mt-4 text-xs text-cream/70">{lang === "es" ? "Departamentos, todo el juego: ahorrado en verde (respuestas correctas), costo en rojo (incorrectas)." : "Departments, this game: saved in green (right answers), cost in red (wrong answers)."}</p>
      <div className="mt-2 space-y-2">
        {DEPTS.map((dept) => {
          const line = numbers.departmentLines.find((row) => row.dept === dept) ?? { savedCents: 0, costCents: 0, netCents: 0, right: 0, wrong: 0 };
          const highlight = mine?.dept === dept;
          const color = DEPT_COLOR[dept];
          return (
            <div key={dept} className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-cream" style={{ background: color, border: highlight ? "3px solid #FFFFFF" : "none", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
              <span>{deptLabel(dept, lang)}</span>
              <span className="flex items-center gap-2">
                <span className="rounded bg-[#0C1230]/80 px-1.5 text-green-400">{lang === "es" ? "ahorró" : "saved"} {money(line.savedCents)}</span>
                <span className="rounded bg-[#0C1230]/80 px-1.5 text-red-400">{lang === "es" ? "costo" : "cost"} {money(line.costCents)}</span>
                {highlight ? <span className="rounded-full bg-cream px-2 py-0.5 text-xs text-navy">{lang === "es" ? "Tú" : "You"}</span> : null}
              </span>
            </div>
          );
        })}
      </div>
      <button type="button" className="mt-4 mr-4 text-sm font-semibold text-gold" onClick={() => setOpen((v) => !v)}>{open ? (lang === "es" ? "Ocultar" : "Hide") : (lang === "es" ? "Ver de dónde vino el dinero" : "See where the money came from")}</button>
      {open ? (
      <>
      <Card className="mt-4 space-y-1 text-sm text-cream">
        <h2 className="font-display text-xl text-cream">{lang === "es" ? "De dónde vino el dinero" : "Where the money came from"}</h2>
        <p>{t("numbers.revenues", lang)}: {money(numbers.revenueCents)}</p>
        <p>{t("numbers.variable", lang)}: {money(numbers.otherCents)}</p>
        <p>{t("numbers.gross", lang)}: {money(numbers.revenueCents - numbers.otherCents)}</p>
        <p>{t("numbers.fixed", lang)}: {money(numbers.payrollCents + numbers.fixedCents)}</p>
        <p className="pl-3 text-xs text-muted">{t("numbers.payroll", lang)}: {money(numbers.payrollCents)} ($16,000 {t("numbers.base", lang)}, +$500 {lang === "es" ? "por incorrecta" : "per wrong"}, −$500 {lang === "es" ? "por correcta" : "per right"})</p>
        <p className="pl-3 text-xs text-muted">{t("numbers.deptFixed", lang)}: {money(numbers.fixedCents)} ({numbers.fixedDeptCount} {lang === "es" ? "deptos" : "depts"} × $2,000 {lang === "es" ? "desde ronda 3" : "from round 3"})</p>
        <p className="font-semibold text-gold">{t("numbers.net", lang)}: {money(numbers.profitCents)}</p>
        <p>{t("numbers.netPct", lang)}: {numbers.marginBps === null ? "0%" : `${(numbers.marginBps / 100).toFixed(1)}%`}</p>
        <div className="mt-2 flex items-end gap-2">
          <div className="relative h-32 w-8 rounded-lg border border-line bg-navy-2">
            <div className="absolute bottom-0 w-full rounded-b-lg bg-gold" style={{ height: `${Math.max(0, Math.min(100, (numbers.marginBps ?? 0) / 100))}%` }} />
            <div className="absolute w-full border-t border-cream" style={{ bottom: "30%" }} />
            <div className="absolute w-full border-t border-gold" style={{ bottom: "50%" }} />
          </div>
          <div className="text-xs text-muted">
            <p>50% {t("numbers.leader", lang)}</p>
            <p>30% {lang === "es" ? "gana" : "wins"}</p>
            <p className={(numbers.marginBps ?? 0) < 0 ? "text-orange-ink" : "text-gold"}>{numbers.marginBps === null ? "0%" : `${(numbers.marginBps / 100).toFixed(1)}%`}</p>
          </div>
        </div>
        <p className="text-xs text-muted">{t("numbers.win", lang)}</p>
      </Card>
      <Card className="mt-3">
        <h2 className="font-display text-xl text-cream">{lang === "es" ? "Nómina por ronda" : "Payroll by round"}</h2>
        <ul className="mt-2">
          {numbers.rounds.length === 0 ? <li className="text-sm text-muted">No payroll yet.</li> : null}
          {numbers.rounds.map((row) => (
            <li key={row.round} className="border-t border-line py-2 text-sm text-cream">
              {lang === "es" ? "Nómina de la ronda" : "Round payroll"} {row.round}: {lang === "es" ? "base" : "base"} {money(row.baseCents ?? 1600000)}
              {row.addedCents ? `, ${lang === "es" ? "respuestas sumaron" : "answers added"} ${money(row.addedCents)}` : ""}
              {row.offCents ? `, ${lang === "es" ? "respuestas restaron" : "answers took off"} ${money(row.offCents)}` : ""}
              {row.fixedCents ? `, ${lang === "es" ? "fijo" : "fixed"} ${money(row.fixedCents)}` : ""}
              {`, ${lang === "es" ? "impacto en nómina" : "payroll impact"} ${money(row.netCents ?? row.addedCents - row.offCents - (row.fixedCents ?? 0))}`}
              {row.cards.length ? ` (${row.cards.map((c) => lang === "es" ? c.replace(/ down /g, " restó ").replace(/ up /g, " sumó ") : c).join(", ")})` : ""}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="mt-3">
        <h2 className="font-display text-xl text-cream">{lang === "es" ? "Marcador de escenarios" : "Scenario scoreboard"}</h2>
        <p className="mt-1 text-xs text-muted">{lang === "es" ? "R = correctas. W = incorrectas. Impacto en la nómina = $500 × (W − R)." : "R = right. W = wrong. Payroll impact = $500 × (W − R)."}</p>
        <ul className="mt-2">
          {numbers.scoreboard.length === 0 ? <li className="text-sm text-muted">{lang === "es" ? "Aún no hay respuestas." : "No answers yet."}</li> : null}
          {numbers.scoreboard.map((row) => (
            <li key={row.dept} className="border-t border-line py-2 text-sm text-cream">
              {deptLabel(row.dept, lang)}: {row.right}{lang === "es" ? " bien" : "R"} {row.wrong}{lang === "es" ? " mal" : "W"} · {lang === "es" ? "Impacto en la nómina" : "Payroll impact"} {row.net >= 0 ? "+" : ""}{money(row.net)}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="mt-3">
        <h2 className="font-display text-xl text-cream">{lang === "es" ? "Ejemplo" : "Example"}</h2>
        <p className="mt-1 text-sm text-cream">{lang === "es" ? "Ejemplo genérico: Proyecto de posición 1, casa de ejemplo, cliente de ejemplo. Mercadeo juega Prospecto básico (1 estrella). Una respuesta correcta, una incorrecta. Ronda 3." : "Generic example: Position-1 project, example house, example customer. Marketing plays Basic Lead (1 star). One right answer, one wrong answer. Round 3."}</p>
        <ul className="mt-2 text-sm text-cream">
          <li className="border-t border-line py-1">{lang === "es" ? "Nivel (posición 1): $10,000" : "Tier (position 1): $10,000"}</li>
          <li className="border-t border-line py-1">{lang === "es" ? "Bonificación de casa (ejemplo): +$3,000" : "House bonus (example): +$3,000"}</li>
          <li className="border-t border-line py-1">{lang === "es" ? "Cliente (ejemplo, 0 cierres posteriores): $0" : "Customer (example, 0 later finishes): $0"}</li>
          <li className="border-t border-line py-1">{lang === "es" ? "Acción (Prospecto básico): solo ficha, $0" : "Action (Basic Lead): token only, $0"}</li>
          <li className="border-t border-line py-1">{lang === "es" ? "Ingresos del proyecto al completar: $13,000" : "Project revenue on completion: $13,000"}</li>
          <li className="border-t border-line py-1">{lang === "es" ? "Respuestas: 1 correcta (−$500), 1 incorrecta (+$500), impacto en nómina $0" : "Answers: 1 right (−$500), 1 wrong (+$500), payroll impact $0"}</li>
          <li className="border-t border-line py-1">{lang === "es" ? "Nómina: $16,000 base + $0 impacto = $16,000" : "Payroll: $16,000 base + $0 payroll impact = $16,000"}</li>
          <li className="border-t border-line py-1">{lang === "es" ? "Fijo (5 deptos × $2,000, ronda 3): $10,000" : "Fixed (5 depts × $2,000, round 3): $10,000"}</li>
          <li className="border-t border-line py-1">{lang === "es" ? "Margen neto: $13,000 − $16,000 − $10,000 = −$13,000" : "Net Margin: $13,000 − $16,000 − $10,000 = −$13,000"}</li>
          <li className="border-t border-line py-1">{lang === "es" ? "Margen: −100%. Sin victoria." : "Margin: −100%. No win."}</li>
        </ul>
        
      </Card>
      <Card className="mt-3">
        <h2 className="font-display text-xl text-cream">Seat scoreboard</h2>
        <p className="mt-1 text-xs text-muted">{lang === "es" ? "Cada jugador. Acumulado." : "Each player. Cumulative."}</p>
        <ul className="mt-2">
          {numbers.players.filter((row) => row.right || row.wrong).map((row) => (
            <li key={row.id} className="border-t border-line py-2 text-sm text-cream">
              {row.name} · {deptLabel(row.dept, lang)} · {row.right}{lang === "es" ? " bien" : "R"} {row.wrong}{lang === "es" ? " mal" : "W"} · {lang === "es" ? "ahorrando" : "saving"} {money(row.saving)}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="mt-3">
        <h2 className="font-display text-xl text-cream">{lang === "es" ? "Efectos de cartas que recortan o condicionan los ingresos" : "Card effects that cut or condition revenue"}</h2>
        <ul className="mt-2">
          {numbers.cardEffects.map((line) => <li key={line} className="border-t border-line py-2 text-sm text-cream">{lang === "es" ? translateEffect(line) : line}</li>)}
        </ul>
      </Card>
      <Card className="mt-3">
        <h2 className="font-display text-xl text-cream">{lang === "es" ? "Cómo se calcula" : "How this is figured"}</h2>
        <ul className="mt-2">
          {numbers.figured.filter((line) => !numbers.cardEffects.includes(line)).map((line) => <li key={line} className="border-t border-line py-2 text-sm text-cream">{lang === "es" ? translateFigured(line) : line}</li>)}
        </ul>
      </Card>
      <Card className="mt-3">
        <h2 className="font-display text-xl text-cream">{lang === "es" ? "Dólares del jugador" : "Player dollars"}</h2>
        <ul className="mt-2">
          {numbers.players.map((row) => <li key={row.id} className="border-t border-line py-2 text-sm text-cream">{row.name} · {deptLabel(row.dept, lang)} · {row.right}{lang === "es" ? " bien" : "R"} {row.wrong}{lang === "es" ? " mal" : "W"} · {money(row.cents)} · {lang === "es" ? "ahorrando" : "saving"} {money(row.saving)}</li>)}
        </ul>
        <ul className="mt-2">
          {numbers.projects.length === 0 ? <li className="text-sm text-muted">{lang === "es" ? "No hay proyectos abiertos." : "No projects opened."}</li> : null}
          {numbers.projects.map((project) => {
            const done = project.status === "complete";
            const tag = done ? "" : (lang === "es" ? ", si se termina" : ", if completed");
            const sign = (cents: number) => `${cents < 0 ? "-" : "+"}${money(Math.abs(cents))}`;
            return (
              <li key={project.n} className="border-t border-line py-2 text-sm text-cream">
                <p>{lang === "es" ? "Base del Proyecto" : "Project"} {project.n} {lang === "es" ? "(posición" : "base (position"} {project.n}): {money(project.valueCents)}</p>
                <p className="pl-3 text-xs text-muted">{lang === "es" ? "Bonificación de casa" : "House bonus"} ({project.house}){tag}: {sign(project.houseBonus)}</p>
                <p className="pl-3 text-xs text-muted">{lang === "es" ? "Bonificación de cliente" : "Customer bonus"} ({project.customer}){tag}: {sign(project.customerBonus)}</p>
                {(project as { garciaBonus?: number }).garciaBonus ? <p className="pl-3 text-xs text-muted">{lang === "es" ? "Garcia (referidos)" : "Garcia referral"}: {sign((project as { garciaBonus?: number }).garciaBonus ?? 0)}</p> : null}
                {project.customer.includes("O'Brien") && project.status === "complete" ? <p className="pl-3 text-xs text-muted">O'Brien: +$4,000 {lang === "es" ? "al final del juego" : "at game end"}</p> : null}
                {project.effect ? <p className="pl-3 text-xs text-muted">{project.effect}</p> : null}
                {done
                  ? <p className="pl-3 text-xs text-gold">{lang === "es" ? "Total del proyecto:" : "Project total:"} {money(project.revenueCents)} {lang === "es" ? "contado en Ingresos" : "counted in Revenues"}</p>
                  : <p className="pl-3 text-xs text-cream">{lang === "es" ? "Total del proyecto, si se termina:" : "Project total, if completed:"} {money(project.potentialCents)}</p>}
              </li>
            );
          })}
        </ul>
      </Card>
      <Card className="mt-3">
        <h2 className="font-display text-xl text-cream">{lang === "es" ? "Tu registro" : "Your ledger"}</h2>
        <p className="mt-1 text-sm text-gold">{mine ? money(mine.cents) : "$0"}</p>
        <ul className="mt-2">
          {board.ledger.map((row) => (
            <li key={row.id} className="border-t border-line py-2 text-sm text-cream">
              {lang === "es" ? translateLedger(row.detail || row.card_code) : (row.detail || row.card_code)}{row.amount_cents ? ` · ${money(row.amount_cents)}` : ""}
              {lang !== "es" ? <span className="block text-xs text-muted">{row.detail}</span> : null}
            </li>
          ))}
        </ul>
      </Card>
      </>
      ) : null}
      <button type="button" className="mt-4 text-sm font-semibold text-gold" onClick={() => {
        const cell = (value: string) => `"${value.replace(/"/g, '""')}"`;
        const row = (record: string, item: string, value: string) => [cell(record), cell(item), cell(value)].join(",");
        const lines = [row("record", "item", "value")];
        lines.push(row("financials", "Revenues", (numbers.revenueCents / 100).toFixed(2)));
        lines.push(row("financials", "Variable Costs (total)", (numbers.otherCents / 100).toFixed(2)));
        lines.push(row("financials", "Gross Margin", ((numbers.revenueCents - numbers.otherCents) / 100).toFixed(2)));
        lines.push(row("financials", "Fixed Costs (total)", ((numbers.payrollCents + numbers.fixedCents) / 100).toFixed(2)));
        lines.push(row("financials", "Payroll", (numbers.payrollCents / 100).toFixed(2)));
        lines.push(row("financials", "Department fixed", (numbers.fixedCents / 100).toFixed(2)));
        lines.push(row("financials", "Net Margin ($)", (numbers.profitCents / 100).toFixed(2)));
        lines.push(row("financials", "Net Margin %", numbers.marginBps === null ? "0" : (numbers.marginBps / 100).toFixed(1)));
        for (const score of numbers.scoreboard) lines.push(row("scoreboard", score.dept, `Payroll impact ${score.net >= 0 ? "+" : ""}${(score.net / 100).toFixed(2)}`));
        for (const seat of numbers.players) lines.push(row("seat", seat.name, `${seat.right}R ${seat.wrong}W Payroll impact ${seat.saving <= 0 ? "+" : "-"}${(Math.abs(seat.saving) / 100).toFixed(2)}`));
        for (const project of numbers.projects) {
          const done = project.status === "complete";
          const tag = done ? "" : ", if completed";
          const sign = (cents: number) => `${cents < 0 ? "-" : "+"}${(Math.abs(cents) / 100).toFixed(2)}`;
          lines.push(row("project", `P${project.n} base`, (project.valueCents / 100).toFixed(2)));
          lines.push(row("project", `P${project.n} House bonus (${project.house})${tag}`, sign(project.houseBonus)));
          lines.push(row("project", `P${project.n} Customer bonus (${project.customer})${tag}`, sign(project.customerBonus)));
          if (project.customer.includes("O'Brien") && done) lines.push(row("project", `P${project.n} O'Brien: +$4,000 at game end`, "4000.00"));
          if (project.effect) {
            for (const action of project.effect.split("; ").filter(Boolean)) {
              const match = /−\$([\d,]+)/.exec(action);
              const value = match ? `-${match[1].replace(/,/g, "")}` : "0.00";
              lines.push(row("project", `P${project.n} Action: ${action}`, value));
            }
          }
          lines.push(row("project", `P${project.n} ${done ? "Completed" : "Total if completed"}`, ((done ? project.revenueCents : project.potentialCents) / 100).toFixed(2)));
        }
        for (const line of numbers.figured) lines.push(row("formula", line, ""));
        for (const line of numbers.cardEffects) lines.push(row("card-effect", line, ""));
        const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
        const blob = new Blob([lines.join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `soebld-numbers-${stamp}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }}>{lang === "es" ? "Exportar números" : "Export numbers"}</button>
      <span className="mx-2 text-muted">·</span>
      <Link to="/soebld/financials" search={{ seat: seat.id }} className="text-sm font-semibold text-gold">{lang === "es" ? "Finanzas del Negocio" : "Business Financials"}</Link>
      <span className="mx-2 text-muted">·</span>
      <Link to="/soebld/scoreboard" search={{ seat: seat.id }} className="text-sm font-semibold text-gold">{lang === "es" ? "Tabla de Valor" : "Value Scoreboard"}</Link>
    </main>
  );
}
