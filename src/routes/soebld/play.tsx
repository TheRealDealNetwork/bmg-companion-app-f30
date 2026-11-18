import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { findScenario, lockScenario, roundSheet, speakMale, companyBoard, suggestCompany, voteCompany, setCompanyName, setMeeting, openProject, playAction, finishProject, swapAttendee, playEvent, submitPicks, restartVote, dealCards, undoAction, setFocus, placeCard, nextScenario, endGameFromGm, setFinishOrder, confirmPlay, changePlay, removePlay, setActionMode, recordManualCards, startTurn, callMeeting, ackMeeting, setPlusOne , seatOpen } from "@/lib/metalcon/api";
import { readSeat, readLastSeat, type MetalSeat } from "@/lib/metalcon/session";
import { METALCON_SEAT_LABEL } from "@/lib/metalcon/seats";
import { money } from "@/lib/game/format";
import { Btn, Card, Field, Select } from "@/components/game/ui";
import { Confetti, WreckingBall } from "@/components/game/fx";
import { CompanyBanner } from "@/components/game/company-banner";
import { LangSwitch, useLang } from "@/lib/metalcon/lang";
import { deptLabel, t, type Lang } from "@/lib/metalcon/i18n";
import { cardFace } from "@/lib/metalcon/cardfaces";
import { TokenSlots } from "@/components/game/slots";
import { filledSlots } from "@/lib/metalcon/board";
import { bilingual, cardLine, resolveName } from "@/lib/metalcon/es-cards";
import { scenarioEs } from "@/lib/metalcon/es-scenarios";
import { DEPT_COLOR, DEPT_COLOR_ON_NAVY, principleFor } from "@/lib/metalcon/principle-bank";
import { finishTurn } from "@/lib/metalcon/api";
import { FocusPicker, GmProjectTile, HeadBadge, ScenarioPanel, TurnPanel, useToast } from "@/components/game/f30-panels";

function cardLabel(name: string, lang: "en" | "es") {
  const b = bilingual(name, lang);
  return b.secondary ? `${b.primary} (${b.secondary})` : b.primary;
}
function CardName({ name, lang, inline }: { name: string; lang: "en" | "es"; inline?: boolean }) {
  const b = bilingual(resolveName(name), lang);
  if (!b.secondary) return <>{b.primary}</>;
  if (inline) return <span>{b.primary} ({b.secondary})</span>;
  return <><span>{b.primary}</span> <span className="text-[10px] text-cream/50">{b.secondary}</span></>;
}
function NamePair({ name, lang, inline }: { name: string; lang: "en" | "es"; inline?: boolean }) {
  const base = resolveName(name);
  const b = bilingual(base, lang);
  if (!b.secondary) return <>{b.primary || name}</>;
  if (inline) return <span>{b.primary} ({b.secondary})</span>;
  return <><span>{b.primary}</span> <span className="block text-[10px] text-cream/50">{b.secondary}</span></>;
}
function cardId(nameOrId: string, actions: { id?: string; name: string }[]) {
  const hit = actions.find((card) => card.id === nameOrId || card.name.toLowerCase() === nameOrId.toLowerCase());
  return hit?.id ?? nameOrId;
}

class GmToolsBoundary extends React.Component<{ children: React.ReactNode }, { err: string }> {
  state = { err: "" };
  static getDerivedStateFromError(err: Error) { return { err: err.message }; }
  render() {
    if (this.state.err) return <p className="text-sm text-red-300">GM tools hit an error: {this.state.err}</p>;
    return this.props.children;
  }
}
function translateLog(detail: string, lang: "en" | "es" = "es") {
  let out = detail
    .replace(/confirmed/gi, lang === "es" ? "confirmó" : "confirmed")
    .replace(/proposed/gi, lang === "es" ? "propuso" : "proposed")
    .replace(/placed on/gi, lang === "es" ? "colocó en" : "placed on")
    .replace(/on Project/gi, lang === "es" ? "en el Proyecto" : "on Project")
    .replace(/locked/gi, lang === "es" ? "bloqueado" : "locked")
    .replace(/Project (\d+) finished\. \$([\d,]+) revenue\./g, lang === "es" ? "Proyecto $1 terminado. Ingresos: $$$2." : "Project $1 finished. $$$2 revenue.")
    .replace(/Game ended\. O.Brien pays to the last finished project\./g, lang === "es" ? "Juego terminado. O'Brien paga hasta el último proyecto terminado." : "Game ended. O'Brien pays to the last finished project.")
    .replace(/Game (\d+) has ended\./g, lang === "es" ? "Este juego ha terminado." : "Game $1 has ended.")
    .replace(/added \$([\d,]+) added to payroll/g, lang === "es" ? "sumó $$$1 a la nómina" : "added $$$1 to payroll")
    .replace(/Warm Lead/g, lang === "es" ? "Prospecto caliente" : "Warm Lead")
    .replace(/Add 1 star token to any project\./g, lang === "es" ? "Agrega 1 token de estrella a cualquier proyecto." : "Add 1 star token to any project.")
    .replace(/Waiting on the GM/gi, lang === "es" ? "Esperando al Gerente General" : "Waiting on the GM")
    .replace(/took \$(\d+) off payroll/gi, lang === "es" ? "restó $$$1 de la nómina" : "took $$$1 off payroll")
    .replace(/Meeting seats/gi, lang === "es" ? "Asientos en la reunión" : "Meeting seats")
    .replace(/\bMarketing\b(?! \w)/g, lang === "es" ? "Mercadeo" : "Marketing")
    .replace(/Appointment Center/g, lang === "es" ? "Centro de Citas" : "Appointment Center")
    .replace(/\bSales\b(?! \w)/g, lang === "es" ? "Ventas" : "Sales")
    .replace(/\bProduction\b(?! \w)/g, lang === "es" ? "Producción" : "Production")
    .replace(/\bAccounting\b(?! \w)/g, lang === "es" ? "Contabilidad" : "Accounting");
  out = out.replace(/\b[A-Z][A-Z ]{2,}\b/g, (caps) => {
    const resolved = resolveName(caps);
    if (resolved === caps) return caps;
    const b = bilingual(resolved, lang);
    const name = b.primary;
    return name.endsWith(" ") ? name : name + " ";
  });
  out = out.replace(/[a-z0-9]+(?:-[a-z0-9]+)+/g, (slug) => {
    const resolved = resolveName(slug);
    if (resolved === slug) return slug;
    const b = bilingual(resolved, lang);
    return b.secondary ? `${b.primary} (${b.secondary})` : resolved;
  });
  const known = ["The Garcia Family", "The Harris Family", "The Kim Family", "The Patel Family", "The Stanley Family", "The Thompson Family", "The O'Brien Family", "1970s Bi-Level", "Craftsman's Bungalow", "Historic Victorian", "Modern Lake House", "Ranch with Full Basement", "Split-Level on Sloped Lot", "Steep Colonial", "Suburban McMansion", "Urban Rowhome"];
  for (const name of known) {
    if (out.includes(name)) {
      const b = bilingual(name, lang);
      if (b.secondary && !out.includes(b.primary)) out = out.replace(name, `${b.primary} (${b.secondary})`);
    }
  }
  return out.replace(/([a-záéíóúñ])(en el)/g, "$1 $2").replace(/  +/g, " ");
}
function printed(name: string) {
  return name.toLowerCase().replace(/(^|\s)\w/g, (c) => c.toUpperCase());
}
function nameText(name: string, lang: "en" | "es") {
  const base = resolveName(name);
  const b = bilingual(base, lang);
  return b.secondary ? b.primary : (b.primary || name);
}


export const Route = createFileRoute("/soebld/play")({
  validateSearch: (search: Record<string, unknown>) => ({
    seat: String(search.seat ?? ""),
  }),
  component: PlayPage,
});

type CardFace = {
  code: string;
  title: string;
  scenario: string;
  options: { A: string; B: string; C: string };
};

function PlayPage() {
  const navigate = useNavigate();
  const { seat: seatId } = Route.useSearch();
  const [seat, setSeat] = useState<MetalSeat | null>(() => (seatId ? readSeat(seatId) : readLastSeat()));

  useEffect(() => {
    document.title = "Scenario cards";
    const restore = () => {
      const saved = (seatId ? readSeat(seatId) : readLastSeat());
      if (saved) setSeat(saved);
      else if (!seat) void navigate({ to: "/soebld/join" });
    };
    restore();
    const onVisible = () => { if (document.visibilityState === "visible") restore(); };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", restore);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", restore);
    };
  }, [navigate, seatId]);

  if (!seat) return <main className="mx-auto max-w-lg px-4 py-6 text-cream"><span className="animate-pulse">{t("play.opening", "en")}</span></main>;
  return <PlaySeat seat={seat} />;
}

type Saved = {
  card_code: string;
  card_title: string;
  choice: string;
  payroll_cents: number;
  score_label?: string;
  payroll_label?: string;
  off_dollars?: number;
  added_points?: number;
  points?: number | null;
};

type Feedback = {
  correct: "A" | "B" | "C";
  correctLabel: string;
  why: string;
  voice: string;
  choice: "A" | "B" | "C";
  choiceLabel: string;
  choiceText: string;
  missed: boolean;
  missWhy: string;
  payrollLabel: string;
  headline: string;
  next: string;
  listen: string;
};

function ModalRoot({ step, dismiss, children }: { step: string; dismiss: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    window.addEventListener("keydown", onKey);
    ref.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [step, dismiss]);
  return (
    <div ref={ref} tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center bg-[#0C1230]/95 p-4 pb-20" onClick={dismiss}>
      {children}
    </div>
  );
}

function PlaySeat({ seat }: { seat: MetalSeat }) {
  const [closed, setClosed] = useState(false);
  const [headerRound, setHeaderRound] = useState(1);
  const [companyName, setCompanyNameHeader] = useState("");
  const [digits, setDigits] = useState("");
  const [round, setRound] = useState("1");
  const [card, setCard] = useState<CardFace | null>(null);
  const [pick, setPick] = useState<"" | "A" | "B" | "C">("");
  const [result, setResult] = useState<{ kept: boolean; feedback: Feedback } | null>(null);
  const [saved, setSaved] = useState<Saved[]>([]);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const { lang, setLang } = useLang(seat.id);

  useEffect(() => {
    let stop = false;
    void seatOpen({ data: { id: seat.id, secret: seat.secret } }).then((res) => {
      if (!stop && res.closed) setClosed(true);
    }).catch(() => { if (!stop) setClosed(true); });
    return () => { stop = true; };
  }, [seat.id, seat.secret]);

  useEffect(() => {
    const n = Number(round);
    if (!Number.isFinite(n) || n < 1) return;
    let stop = false;
    void roundSheet({ data: { id: seat.id, secret: seat.secret, round: n } }).then((res) => {
      if (!stop && res.ok) setSaved(res.rows);
    });
    return () => {
      stop = true;
    };
  }, [round, seat.id, seat.secret]);

  async function find() {
    setBusy(true);
    setErr("");
    setResult(null);
    setPick("");
    try {
      const res = await findScenario({ data: { id: seat.id, secret: seat.secret, raw: digits } });
      if (!res.ok) {
        setCard(null);
        setErr(res.error);
        return;
      }
      setCard(res.card);
    } catch (error) {
      setCard(null);
      setErr(error instanceof Error ? error.message : "Could not find that card.");
    } finally {
      setBusy(false);
    }
  }

  async function lock() {
    if (!card || !pick) return;
    setBusy(true);
    setErr("");
    try {
      const res = await lockScenario({
        data: { id: seat.id, secret: seat.secret, code: card.code, choice: pick, round: Number(round) },
      });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      setSaved(res.rows);
      if (res.feedback) {
        setPick(res.feedback.choice);
        setResult({ kept: res.duplicate, feedback: res.feedback });
        if (res.feedback.missed) {
          window.setTimeout(() => nextCard(), 4000);
        }
      } else {
        setErr("That answer saved, but the feedback did not load.");
      }
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not save that answer.");
    } finally {
      setBusy(false);
    }
  }

  function nextCard() {
    setBusy(true);
    void nextScenario({ data: { id: seat.id, secret: seat.secret } }).then((res) => {
      setBusy(false);
      if (!res.ok) {
        setErr(res.error);
        setCard(null);
        return;
      }
      setCard(res.card);
      setPick("");
      setResult(null);
      setDigits("");
      setErr("");
    });
  }

  const spoken = card
    ? `${card.title}. ${card.scenario} Answer A. ${card.options.A} Answer B. ${card.options.B} Answer C. ${card.options.C}`
    : "";
  const offRows = saved.filter((row) => (row.off_dollars ?? 0) > 0);
  const added = saved.filter((row) => (row.payroll_cents ?? 0) < 0);
  const offLine = offRows.length
    ? offRows.map((row) => `${row.card_code} $${(row.off_dollars ?? 0).toLocaleString("en-US")}`).join(", ")
    : (lang === "es" ? "nada" : "none");
  const addedLine = added.length
    ? added.map((row) => `${row.card_code} $${Math.abs(Math.round(row.payroll_cents / 100)).toLocaleString("en-US")}`).join(", ")
    : (lang === "es" ? "nada" : "none");

  if (closed) {
    return (
      <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold tracking-widest text-gold">The Business Machine Experience</p>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
        <h1 className="mt-2 font-display text-3xl text-cream">{t("join.closedTitle", lang)}</h1>
        <p className="mt-3 text-sm text-cream">{lang === "es" ? "Este juego ha terminado." : "This game has ended."}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest text-gold">{deptLabel(seat.dept, lang)} · {lang === "es" ? "Ronda" : "Round"} {headerRound}</p>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      {companyName ? <p className="mt-1 text-sm font-bold tracking-wide text-cream/80" style={{ fontFamily: "Montserrat, sans-serif" }}>{companyName}</p> : null}
      <h1 className="mt-1 font-display text-3xl text-cream">{seat.name}</h1>
      <CompanyPanel seat={seat} lang={lang} setLang={setLang} onRound={setHeaderRound} onCompany={setCompanyNameHeader} />
      <p className="mt-6 mb-16 text-center text-[10px] text-cream/40">build 0214-f30</p>
      {card ? (
        <Card className="mt-3">
          <p className="text-xs font-bold tracking-wide text-gold uppercase">{card.code}</p>
          <h2 className="font-display text-2xl text-cream">{lang === "es" && scenarioEs(card.code) ? `${card.title} / ${scenarioEs(card.code)!.title}` : card.title}</h2>
          {(() => {
            const entry = principleFor(card.code);
            if (!entry) return null;
            const dept = seat.dept || entry.department_en;
            const color = DEPT_COLOR_ON_NAVY[dept] || DEPT_COLOR[dept] || "#FFFFFF";
            const text = lang === "es" ? entry.display_es : entry.display_en;
            const split = text.split(" – ");
            const label = split[0];
            const title = split.slice(1).join(" – ");
            return (
              <p className="mt-1 text-sm leading-snug" style={{ whiteSpace: "normal", overflowWrap: "anywhere" }}>
                <span style={{ color, fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}>{label}</span>
                {title ? <span style={{ color: "#FFFFFF", fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}> – {title}</span> : null}
              </p>
            );
          })()}
          <p className="mt-2 text-sm leading-relaxed text-cream">{lang === "es" && scenarioEs(card.code) ? scenarioEs(card.code)!.scenario : card.scenario}</p>
          <div className="mt-3">
            <MaleRead text={spoken} lang={lang} />
          </div>
          {(["A", "B", "C"] as const).map((letter) => (
            <button
              key={letter}
              type="button"
              disabled={Boolean(result)}
              onClick={() => setPick(letter)}
              className={`mt-2 min-h-11 w-full rounded-xl border px-3 py-3 text-left text-sm ${pick === letter ? "border-gold bg-navy-2" : "border-line"}`}
            >
              <span className="font-bold text-gold">{letter}. </span>
              {lang === "es" && scenarioEs(card.code) ? scenarioEs(card.code)!.options[letter] : card.options[letter]}
            </button>
          ))}
          {!result ? (
            <>
              {err ? <p className="mt-2 text-sm text-orange-ink">{err}</p> : null}
              <Btn className="mt-3 w-full" disabled={busy || !pick} onClick={() => void lock()}>
                {pick ? (lang === "es" ? `Confirmar ${pick}` : `Lock in ${pick}`) : (lang === "es" ? "Elige una respuesta" : "Choose an answer")}
              </Btn>
            </>
          ) : (
            <div className="mt-4 space-y-3 border-t border-line pt-3">
              {result.kept ? <p className="text-sm text-muted">Already saved. The first answer stays.</p> : null}
              <p className="text-xs font-bold tracking-wide text-gold uppercase">{lang === "es" ? "Respuesta correcta" : "Correct answer"}</p>
              <p className="font-display text-2xl text-cream">
                {[result.feedback.correct, lang === "es" && scenarioEs(card.code) ? scenarioEs(card.code)!.options[result.feedback.correct] : result.feedback.correctLabel].filter(Boolean).join(" · ")}
              </p>
              <p className="text-sm leading-relaxed text-cream">{(() => {
                const entry = principleFor(card.code);
                if (entry) return lang === "es" ? entry.why_es : entry.why_en;
                return lang === "es" && scenarioEs(card.code) ? scenarioEs(card.code)!.why : result.feedback.why;
              })()}</p>
              <p className="text-sm leading-relaxed text-gold">{lang === "es" && scenarioEs(card.code) ? scenarioEs(card.code)!.voice : result.feedback.voice}</p>
              {result.feedback.missed ? (
                <div>
                  <p className="text-xs font-bold tracking-wide text-gold uppercase">Why {result.feedback.choice} is not right</p>
                  <p className="mt-1 text-sm text-cream">
                    You picked {[result.feedback.choice, result.feedback.choiceText].filter(Boolean).join(" · ")}.
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-cream">{result.feedback.missWhy}</p>
                </div>
              ) : null}
              <MaleRead text={result.feedback.listen} lang={lang} />
              <div>
                <p className="text-xs font-bold tracking-wide text-gold uppercase">{lang === "es" ? "Qué pasa ahora" : "What happens next"}</p>
                <p className="mt-1 text-sm leading-relaxed text-cream">{lang === "es" && result.feedback.next.includes("Subtract") ? "Resta $500 de la nómina de esta ronda, luego reparte 3 cartas de acción del departamento y juega 2 de ellas en el tablero en la reunión del Gerente General. Juega siempre 2 de las 3 cartas repartidas hasta el final." : result.feedback.next}</p>
              </div>
              <p className="font-display text-xl text-gold">{lang === "es" && result.feedback.headline.includes("$500 off") ? "$500 menos en la nómina" : result.feedback.headline}</p>
              {result.feedback.missed ? (
                <>
                  <WreckingBall />
                  <div className="rounded-xl border-2 border-orange-ink bg-orange-ink/10 px-3 py-4 text-center">
                    <p className="font-display text-3xl text-orange-ink">{t("play.wrecking", lang)}</p>
                    <p className="mt-1 text-sm text-orange-ink">{t("play.wreckingDetail", lang)}</p>
                  </div>
                </>
              ) : (
                <>
                  <Confetti />
                  <div className="rounded-xl border-2 border-gold bg-gold/10 px-3 py-4 text-center">
                    <p className="font-display text-3xl text-gold">{t("play.confetti", lang)}</p>
                    <p className="mt-1 text-sm text-gold">{t("play.confettiDetail", lang)}</p>
                  </div>
                </>
              )}
              <Btn kind="navy" className="w-full" onClick={result.feedback.missed ? nextCard : () => { setCard(null); setResult(null); setPick(""); }}>
                {result.feedback.missed ? t("play.next", lang) : t("play.done", lang)}
              </Btn>
              <p className="text-sm text-cream">
                {lang === "es" ? "Nómina de la ronda" : "Round"} {Number(round) || 1} {lang === "es" ? ":" : "payroll"} {money(Math.max(0, saved.reduce((sum, row) => sum + (row.payroll_cents < 0 ? Math.abs(row.payroll_cents) : 0), 0)))}
                {saved.some((row) => row.payroll_cents > 0) ? `, ${lang === "es" ? "$500 menos por" : "down"} ${saved.filter((row) => row.payroll_cents > 0).map((row) => row.card_code).join(", ")}` : ""}.
              </p>
              <Btn kind="navy" className="w-full" onClick={nextCard}>
                {lang === "es" ? "Siguiente tarjeta" : "Next card"}
              </Btn>
            </div>
          )}
        </Card>
      ) : null}
      {saved.filter((row) => !row.card_code.toUpperCase().startsWith("BE-OW") && !row.card_code.toUpperCase().startsWith("BE-RE")).length > 0 ? (
        <Card className="mt-3">
          <h2 className="font-display text-xl text-cream">{lang === "es" ? "Ronda" : "Round"} {Number(round) || 1}</h2>
          <p className="mt-1 text-xs text-muted">{saved.filter((row) => !row.card_code.toUpperCase().startsWith("BE-OW") && !row.card_code.toUpperCase().startsWith("BE-RE")).length} {saved.filter((row) => !row.card_code.toUpperCase().startsWith("BE-OW") && !row.card_code.toUpperCase().startsWith("BE-RE")).length === 1 ? (lang === "es" ? "carta registrada" : "card recorded") : (lang === "es" ? "cartas registradas" : "cards recorded")}. {lang === "es" ? "Nada que ya se deba se reemplaza." : "Nothing already saved is replaced."}</p>
          <p className="mt-2 text-sm text-cream">
            {lang === "es" ? "Descontado de la nómina:" : "Off payroll:"} {offLine}. {lang === "es" ? "Agregado a la nómina:" : "Added to payroll:"} {addedLine}.
          </p>
          <ul className="mt-2">
            {saved.filter((row) => !row.card_code.toUpperCase().startsWith("BE-OW") && !row.card_code.toUpperCase().startsWith("BE-RE")).map((row) => (
              <li key={row.card_code} className="border-t border-line py-2 text-sm text-cream">
                <span className="font-semibold text-gold">{row.card_code}</span> {row.card_title}
                <span className="block text-xs text-muted">
                  {[row.choice, row.payroll_label || (row.payroll_cents < 0 ? `$${Math.abs(Math.round(row.payroll_cents / 100)).toLocaleString("en-US")} ${lang === "es" ? "agregado a la nómina" : "added to payroll"}` : row.payroll_cents > 0 ? `$${Math.round(row.payroll_cents / 100).toLocaleString("en-US")} ${lang === "es" ? "restó de la nómina" : "off payroll"}` : "$0")].filter(Boolean).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </main>
  );
}

function CompanyPanel({ seat, lang, setLang, onRound, onCompany }: { seat: MetalSeat; lang: Lang; setLang: (next: Lang) => void; onRound?: (n: number) => void; onCompany?: (name: string) => void }) {
  const [board, setBoard] = useState<Extract<Awaited<ReturnType<typeof companyBoard>>, { ok: true }> | null>(null);
  const [loadError, setLoadError] = useState("");
  const [name, setName] = useState("");
  const [house, setHouse] = useState("");
  const [customer, setCustomer] = useState("");
  const [value, setValue] = useState("10000");
  const [projectId, setProjectId] = useState("");
  const [cardName, setCardName] = useState("");
  const [eventName, setEventName] = useState("");
  const [endConfirm, setEndConfirm] = useState(false);
  const [round, setRound] = useState("1");
  const [note, setNote] = useState("");
  const [tab, setTab] = useState<"board" | "projects" | "numbers" | "more">("board");
  const [focusOpen, setFocusOpen] = useState(false);
  const [gmMore, setGmMore] = useState(false);

  async function load() {
    try {
      const res = await companyBoard({ data: { id: seat.id, secret: seat.secret } });
      if (res.ok) {
        setBoard(res);
        setLoadError("");
        if (res.currentRound) onRound?.(res.currentRound);
      } else setLoadError(res.error);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Could not open the board.");
    }
  }

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), 3000);
    return () => window.clearInterval(timer);
  }, [seat.id, seat.secret]);
  const toast = useToast();
  useEffect(() => { if (board) onCompany?.(board.companyName); }, [board?.companyName]);

  if (!board) return <p className="mt-3 animate-pulse text-sm text-cream">{loadError || (lang === "es" ? "Abriendo el tablero…" : "Opening the board…")}</p>;
  const mine = board.mine;
  const isGm = seat.dept === "General Manager";
  const reload = () => void load();
  // Meeting pop-up: ONLY this round's Department Heads, once per meeting (acknowledged server-side, so a reload never brings it back).
  const meetingDue = !isGm && board.meeting && board.isHead && board.meetingAck < board.currentRound;
  const ack = () => void ackMeeting({ data: { id: seat.id, secret: seat.secret } }).then(() => load());
  const joinUrl = board.joinPath ? `${typeof window === "undefined" ? "" : window.location.origin}${board.joinPath}` : "";
  return (
    <div className="mt-3 space-y-3">
      {board.alerts.slice(0, 2).map((alert) => (
        <p key={alert.id} className="rounded-xl border border-gold px-3 py-2 text-sm text-gold">{translateLog(alert.detail, lang)}</p>
      ))}
      <HeadBadge board={board} seat={seat} lang={lang} />
      {!isGm ? (
        <p className="text-sm text-cream">{lang === "es" ? "Ronda" : "Round"} {board.currentRound} · {board.turnDept ? (lang === "es" ? `Turno: ${deptLabel(board.turnDept, "es")}` : `Turn: ${board.turnDept}`) : (lang === "es" ? "Esperando a que el GM abra la reunión" : "Waiting for the GM to start the meeting")}{board.meeting ? (lang === "es" ? " · Reunión del GM abierta: tus respuestas siguen contando." : " · GM meeting open: your answers still count.") : ""}</p>
      ) : null}
      {!isGm ? <ScenarioPanel seat={seat} board={board} lang={lang} reload={reload} /> : null}
      {!isGm ? <TurnPanel seat={seat} board={board} lang={lang} reload={reload} toast={toast.show} /> : null}
      {!isGm && board.focus?.length ? (
        <p className="rounded-xl border border-line px-3 py-2 text-xs text-cream">
          {lang === "es" ? "Enfoque de tu departamento esta ronda" : "Your department's focus this round"}: {board.focus.map((project) => `P${project.n}${project.locked ? ` (${project.locked})` : ""}`).join(", ")}
        </p>
      ) : null}
      {!mine?.name_suggestion && !board.companyName ? (
        <Card className="space-y-2">
          <p className="text-sm text-cream">{t("board.suggest", lang)} {lang === "es" ? "No es la empresa donde trabajas." : "This is not the company you work for."}</p>
          <Field aria-label="Game company name" placeholder={lang === "es" ? "Nombre de la empresa" : "Company name"} value={name} onChange={(e) => setName(e.target.value)} />
          <Btn className="w-full" onClick={() => void suggestCompany({ data: { id: seat.id, secret: seat.secret, name } }).then(load)}>{t("board.submitName", lang)}</Btn>
        </Card>
      ) : null}
      {board.suggestions.length > 0 && !board.companyName ? (
        <Card className="space-y-2">
          <p className="text-base font-bold text-cream" style={{ fontFamily: "Montserrat, sans-serif" }}>{lang === "es" ? "Ideas para el nombre de la empresa" : "Company name ideas"}</p>
          <p className="text-sm text-muted">{lang === "es" ? "Vota por tu favorito. El GM elige el ganador." : "Vote for your favorite. The GM picks the winner."}</p>
          {board.suggestions.map((row) => {
            const mineVote = board.myVoteId === row.id || mine?.name_vote === row.id;
            const count = `${row.votes} ${lang === "es" ? (row.votes === 1 ? "voto" : "votos") : (row.votes === 1 ? "vote" : "votes")}`;
            return (
              <div key={row.id} className="flex items-center justify-between gap-2 rounded-xl border px-3 py-2" style={{ borderColor: mineVote ? "#FFFFFF" : "var(--color-line)", background: mineVote ? "#1B2A4A" : "transparent" }}>
                <span className="text-sm text-cream">{row.suggestion} · {count}</span>
                <div className="flex gap-2">
                  <button type="button" className="min-h-11 rounded-xl bg-gold px-3 text-sm font-semibold text-navy" onClick={() => void voteCompany({ data: { id: seat.id, secret: seat.secret, choiceId: row.id } }).then(load)}>
                    {mineVote ? (lang === "es" ? "Tu voto" : "Your vote") : (lang === "es" ? "Votar" : "Vote")}
                  </button>
                  {isGm ? (
                    <button type="button" className="min-h-11 rounded-xl border border-gold px-3 text-sm font-semibold text-gold" onClick={() => void setCompanyName({ data: { id: seat.id, secret: seat.secret, name: row.suggestion } }).then(load)}>
                      {lang === "es" ? "Elegir este nombre" : "Pick this name"}
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </Card>
      ) : null}
      {seat.dept === "Accounting" ? (() => {
        const ready = (board.projectSlots ?? []).filter((row) => row.ready);
        if (!ready.length) return null;
        return (
          <Card className="space-y-2">
            <p className="text-sm text-gold">{ready.length >= 2 ? (lang === "es" ? "Orden de cierre: hay proyectos listos. Elige cuál se cierra primero." : "Close order: projects ready. Choose which closes first.") : (lang === "es" ? "Proyecto listo para cerrar." : "Project ready to close.")}</p>
            {ready.map((project, i) => (
              <Btn key={project.id} className="w-full" onClick={() => void setFinishOrder({ data: { id: seat.id, secret: seat.secret, projectId: project.id, order: i + 1 } }).then((res) => { setNote(res.ok ? `Project ${project.n} set as close order ${i + 1}.` : res.error); void load(); })}>
                {lang === "es" ? "Cerrar el Proyecto" : "Close Project"} {project.n}
              </Btn>
            ))}
          </Card>
        );
      })() : null}
      {isGm ? (
        <Card className="space-y-2">
          <h2 className="font-display text-xl text-cream">{lang === "es" ? "Tablero del Gerente General" : "GM board"}</h2>
          <p className="text-sm text-[#D4A05C]">{lang === "es" ? "Ronda" : "Round"} {board.currentRound || 1} · {board.turnDept ? (lang === "es" ? `Turno: ${deptLabel(board.turnDept, "es")} · ${board.turn?.stage ?? ""}` : `Turn: ${board.turnDept} · ${board.turn?.stage ?? ""}`) : (lang === "es" ? "Juega el evento, fija el enfoque y convoca la reunión" : "Play the event, set focus, then call the meeting")}</p>
          {board.turn ? <p className="text-xs text-cream">{board.turn.stage === "scenario" ? (lang === "es" ? `Esperando: ${board.turn.designatedName} responde el escenario.` : `Waiting on: ${board.turn.designatedName} to answer the department scenario.`) : board.turn.stage === "deal" ? (lang === "es" ? `Esperando: ${board.turn.headName} reparte las cartas.` : `Waiting on: ${board.turn.headName} to deal the cards.`) : board.turn.stage === "negative" ? (lang === "es" ? `Esperando: ${board.turn.headName} responde por la carta negativa.` : `Waiting on: ${board.turn.headName} to answer for the negative card.`) : board.turn.stage === "cards" ? (lang === "es" ? `Esperando: ${board.turn.headName} juega ${board.turn.draw?.left ?? 0} carta(s).` : `Waiting on: ${board.turn.headName} to play ${board.turn.draw?.left ?? 0} card(s).`) : board.turn.stage === "tokens" ? (lang === "es" ? `Esperando: ${board.turn.headName} coloca fichas.` : `Waiting on: ${board.turn.headName} to place tokens.`) : (lang === "es" ? "Turno terminado." : "Turn done.")}</p> : null}
          <div className="grid grid-cols-2 gap-2">
            {!board.meeting ? (
              <button type="button" className="rounded-xl bg-[#2E86AB] py-2 text-sm font-semibold text-white" onClick={() => void callMeeting({ data: { id: seat.id, secret: seat.secret } }).then((res) => { setNote(res.ok ? (lang === "es" ? "Reunión convocada." : "Meeting called.") : res.error); void load(); })}>{lang === "es" ? "Convocar la reunión" : "Call the meeting"}</button>
            ) : (
              <button type="button" className="rounded-xl border border-[#D4A05C] py-2 text-sm font-semibold text-[#D4A05C]" onClick={() => void finishTurn({ data: { id: seat.id, secret: seat.secret } }).then((res) => { setNote(res.ok ? (lang === "es" ? "Turno pasado." : "Turn moved on.") : res.error); void load(); })}>{lang === "es" ? `Forzar: pasar de ${deptLabel(board.turnDept, "es")}` : `Force: move on from ${board.turnDept || "turn"}`}</button>
            )}
            <button type="button" className="rounded-xl border border-[#2E86AB] py-2 text-sm font-semibold text-[#2E86AB]" onClick={() => setFocusOpen(true)}>{lang === "es" ? "Proyectos de enfoque" : "Focus projects"}</button>
            {joinUrl ? <button type="button" className="col-span-2 rounded-xl border border-gold py-2 text-sm font-semibold text-gold" onClick={() => { void navigator.clipboard?.writeText(joinUrl).then(() => toast.show({ text: lang === "es" ? "Enlace para unirse copiado." : "Join link copied." }), () => toast.show({ text: joinUrl })); }}>{lang === "es" ? "Copiar enlace para unirse" : "Copy join link"} · <span className="text-xs font-normal">{board.joinPath}</span></button> : null}
          </div>
          {board.allFocus?.length ? <p className="text-xs text-cream/70">{lang === "es" ? "Enfoque" : "Focus"}: {["Marketing", "Appointment Center", "Sales", "Production", "Accounting"].map((dept) => { const rows = board.allFocus.filter((row) => row.dept === dept); return `${deptLabel(dept, lang)} ${rows.length ? rows.map((row) => `P${row.n}`).join("+") : "—"}`; }).join(" · ")}</p> : null}
          <div className="grid gap-2 sm:grid-cols-2">
            {board.projects.filter((project) => project.house && project.customer).map((project) => (
              <GmProjectTile key={project.id} project={project} board={board} seat={seat} lang={lang} reload={reload} toast={toast.show} />
            ))}
          </div>
          <button type="button" className="text-xs font-semibold text-gold" onClick={() => setGmMore((on) => !on)}>{gmMore ? (lang === "es" ? "Ocultar herramientas" : "Hide tools") : (lang === "es" ? "Más herramientas del GM" : "More GM tools")}</button>
          {gmMore ? <GmToolsBoundary><div className="space-y-2">
          <Link to="/soebld/financials" search={{ seat: seat.id }} className="inline-block text-sm font-semibold text-gold">{lang === "es" ? "Finanzas del Negocio" : "Business Financials"}</Link>
          <span className="mx-2 text-muted">·</span>
          <Link to="/soebld/projects" search={{ seat: seat.id }} className="inline-block text-sm font-semibold text-gold">{lang === "es" ? "Proyectos" : "Projects"}</Link>
          <span className="mx-2 text-muted">·</span>
          <Link to="/soebld/scoreboard" search={{ seat: seat.id }} className="inline-block text-sm font-semibold text-gold">{lang === "es" ? "Tabla de Valor" : "Value Scoreboard"}</Link>
          <span className="mx-2 text-muted">·</span>
          <a className="inline-block text-sm font-semibold text-gold" href={`/soebld/admin`}>{lang === "es" ? "Exportar desde el escritorio del anfitrión" : "Export from the host desk"}</a>
          <Field aria-label="Round" inputMode="numeric" value={round} onChange={(e) => setRound(e.target.value.replace(/\D/g, "").slice(0, 3))} />
          <Btn kind="navy" onClick={() => void setMeeting({ data: { id: seat.id, secret: seat.secret, on: board.meeting, round: Number(round) || 1 } }).then(load)}>{lang === "es" ? "Establecer ronda" : "Set round"} {round || 1}</Btn>
          <Btn kind="navy" onClick={() => void setMeeting({ data: { id: seat.id, secret: seat.secret, on: !board.meeting, round: Number(round) || 1 } }).then(load)}>{board.meeting ? (lang === "es" ? "Cerrar la reunión del Gerente General" : "Close GM meeting") : (lang === "es" ? "Abrir la reunión del Gerente General" : "Open GM meeting")}</Btn>
          <Field aria-label={lang === "es" ? "Nombre de la empresa del juego" : "Override company name"} placeholder={lang === "es" ? "Cambiar el nombre de la empresa" : "Override company name"} value={name} onChange={(e) => setName(e.target.value)} />
          <Btn kind="navy" onClick={() => void setCompanyName({ data: { id: seat.id, secret: seat.secret, name } }).then((res) => { setNote(res.ok ? "Name set." : res.error); void load(); })}>{lang === "es" ? "Establecer nombre" : "Set name"}</Btn>
          <Btn kind="ghost" onClick={() => void restartVote({ data: { id: seat.id, secret: seat.secret } }).then((res) => { setNote(res.ok ? "Vote restarted. Each department suggests again." : res.error); void load(); })}>{lang === "es" ? "Reiniciar la votación" : "Restart vote"}</Btn>
          <Select aria-label="House" value={house} onChange={(e) => setHouse(e.target.value)}>
            <option value="">{lang === "es" ? "Carta de casa" : "House card"}</option>
            {board.houses.map((item) => <option key={item.id ?? item} value={item.id ?? item}>{typeof item === "string" ? item : nameText(item.name, lang)}</option>)}
          </Select>
          <Select aria-label="Customer" value={customer} onChange={(e) => setCustomer(e.target.value)}>
            <option value="">{lang === "es" ? "Carta de cliente" : "Customer card"}</option>
            {board.customers.map((item) => <option key={item.id ?? item} value={item.id ?? item}>{typeof item === "string" ? item : nameText(item.name, lang)}</option>)}
          </Select>
          <Select aria-label="Project value" value={value} onChange={(e) => setValue(e.target.value)}>
            {board.values.map((item) => <option key={item} value={item}>${item.toLocaleString("en-US")}</option>)}
          </Select>
          <Btn className="w-full" onClick={() => void openProject({ data: { id: seat.id, secret: seat.secret, house, customer, value: Number(value) } }).then((res) => { setNote(res.ok ? `Project ${res.n} opened.` : res.error); void load(); })}>Open project</Btn>
          <button type="button" className="w-full rounded-xl border border-[#2E86AB] py-2 text-sm font-semibold text-[#2E86AB]" onClick={() => setFocusOpen(true)}>{lang === "es" ? "Proyectos de enfoque" : "Focus projects"}</button>
          <Select aria-label="Open project" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
            <option value="">Project</option>
            {board.projects.filter((project) => project.status === "open").map((project) => <option key={project.id} value={project.id}>{lang === "es" ? "Proyecto" : "Project"} {project.n} · {nameText(project.customer, lang)}</option>)}
          </Select>
<p className="text-sm text-cream">{lang === "es" ? "Cartas de acción" : "Action cards"}: {board.actionMode === "manual" ? (lang === "es" ? "Manual (mesa)" : "Manual (table)") : (lang === "es" ? "Digital" : "Digital")}</p>
          <div className="flex gap-2">
            <Btn kind="navy" onClick={() => void setActionMode({ data: { id: seat.id, secret: seat.secret, mode: "digital" } }).then((res) => { setNote(res.ok ? "Digital cards." : res.error); void load(); })}>{lang === "es" ? "Digital" : "Digital"}</Btn>
            <Btn kind="navy" onClick={() => void setActionMode({ data: { id: seat.id, secret: seat.secret, mode: "manual" } }).then((res) => { setNote(res.ok ? "Manual cards." : res.error); void load(); })}>{lang === "es" ? "Manual" : "Manual"}</Btn>
          </div>
          
          <div className="space-y-2">
            {board.projects.map((project) => (
              <div key={project.id} className="rounded-xl border border-line p-2">
                <p className="text-sm text-cream">P{project.n} · {project.customer ? <NamePair name={resolveName(project.customer)} lang={lang} /> : "—"} · {project.house ? <NamePair name={resolveName(project.house)} lang={lang} /> : "—"} · {project.status === "open" ? (lang === "es" ? "abierto" : "open") : project.status === "complete" ? (lang === "es" ? "completo" : "complete") : project.status}</p>
                <TokenSlots projectId={project.id} house={project.house} customer={project.customer} extraSlot={project.extra_slot} plusOnes={project.plus_ones} plays={board.pendingPlays ?? []} lang={lang} />
                {isGm ? (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {["Marketing", "Appointment Center", "Sales", "Production", "Accounting"].map((dept) => (
                      <span key={dept} className="inline-flex items-center gap-1">
                        <button type="button" className="rounded border border-[#F5C518] px-1 text-[10px] text-[#F5C518]" onClick={() => void setPlusOne({ data: { id: seat.id, secret: seat.secret, projectId: project.id, dept, delta: 1 } }).then((res) => { setNote(res.ok ? `+1 on ${dept}.` : res.error); void load(); })}>+1 {dept.split(" ")[0]}</button>
                        <button type="button" className="rounded border border-line px-1 text-[10px] text-cream" onClick={() => void setPlusOne({ data: { id: seat.id, secret: seat.secret, projectId: project.id, dept, delta: -1 } }).then((res) => { setNote(res.ok ? `−1 on ${dept}.` : res.error); void load(); })}>−1</button>
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <Select aria-label="Event" value={eventName} onChange={(e) => setEventName(e.target.value)}>
            <option value="">Event card</option>
            {board.events.map((item) => <option key={item.id ?? item} value={item.id ?? item}>{typeof item === "string" ? item : nameText(item.name, lang)}</option>)}
          </Select>
          <Btn kind="navy" className="w-full" onClick={() => void playEvent({ data: { id: seat.id, secret: seat.secret, eventName, projectId, round: Number(round) || 1 } }).then((res) => { setNote(res.ok ? "Event played." : res.error); void load(); })}>Play event</Btn>
          <Btn kind="navy" className="w-full" onClick={() => void finishProject({ data: { id: seat.id, secret: seat.secret, projectId, override: false } }).then((res) => { if (!res.ok && window.confirm(`${res.error}\nOverride and finish?`)) void finishProject({ data: { id: seat.id, secret: seat.secret, projectId, override: true } }).then(load); else { setNote(res.ok ? "Project finished." : res.error); void load(); } })}>{lang === "es" ? "Forzar terminado (anular)" : "Force-finish project (override)"}</Btn>
          <Btn kind="navy" className="w-full" onClick={() => setEndConfirm(true)}>End game (O'Brien check)</Btn>
          {endConfirm ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4">
              <div className="max-w-sm rounded-xl bg-[#1B2A4A] p-4 text-center">
                <p className="text-sm text-cream">{lang === "es" ? "¿Terminar el juego? No se puede deshacer." : "End the game? This can't be undone."}</p>
                <a href={`/soebld/numbers?seat=${seat.id}`} className="mt-3 block rounded-xl border border-gold py-2 text-sm font-semibold text-gold">{lang === "es" ? "Exportar números" : "Export numbers"}</a>
                <div className="mt-3 flex gap-2">
                  <button type="button" className="flex-1 rounded-xl border border-line py-2 text-sm text-cream" onClick={() => setEndConfirm(false)}>{lang === "es" ? "Cancelar" : "Cancel"}</button>
                  <button type="button" className="flex-1 rounded-xl bg-red-700 py-2 text-sm font-semibold text-white" onClick={() => { setEndConfirm(false); void endGameFromGm({ data: { id: seat.id, secret: seat.secret } }).then((res) => { setNote(res.ok ? (lang === "es" ? "Juego terminado. O'Brien paga hasta el último proyecto terminado." : "Game ended. O'Brien pays to the last finished project.") : res.error); void load(); }); }}>{lang === "es" ? "Terminar" : "End game"}</button>
                </div>
              </div>
            </div>
          ) : null}
          {(() => {
            const order = ["Marketing", "Appointment Center", "Sales", "Production", "Accounting"];
            const here = order.indexOf(board.turnDept);
            const prev = here > 0 ? order[here - 1] : "";
            return prev ? <button type="button" className="w-full rounded-xl border border-[#D4A05C] py-2 text-sm font-semibold text-[#D4A05C]" onClick={() => void startTurn({ data: { id: seat.id, secret: seat.secret, dept: prev } }).then((res) => { setNote(res.ok ? `${prev} turn.` : res.error); void load(); })}>{lang === "es" ? `Volver a ${deptLabel(prev, "es")}` : `Go back to ${prev}`}</button> : null;
          })()}
          <p className="text-sm text-cream">{lang === "es" ? "Asientos de la reunión:" : "Meeting seats:"}</p>
          {board.attendees.map((row) => (
            <label key={row.dept} className="block text-sm text-cream">
              {deptLabel(row.dept, lang)}: {row.name}{row.swapped ? (lang === "es" ? " (cambiado)" : " (swapped)") : ""}
              <Select aria-label={`Swap ${row.dept}`} value="" onChange={(e) => { if (e.target.value) void swapAttendee({ data: { id: seat.id, secret: seat.secret, round: Number(round) || 1, dept: row.dept, playerId: e.target.value } }).then(load); }}>
                <option value="">Swap if absent</option>
                {board.players.filter((person) => person.dept === row.dept).map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
              </Select>
            </label>
          ))}
                    </div></GmToolsBoundary> : null}
          {note ? <p className="text-sm text-muted">{note}</p> : null}
        </Card>
      ) : null}
      {meetingDue ? (
        <ModalRoot step="meeting" dismiss={ack}>
          <div className="w-full max-w-md space-y-3 rounded-2xl border border-[#D4A05C] bg-[#1B2A4A] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between"><LangSwitch lang={lang} setLang={setLang} /><button type="button" className="text-sm text-gold" onClick={ack}>{lang === "es" ? "Cerrar" : "Close"}</button></div>
            <h2 className="font-display text-xl text-cream">{lang === "es" ? "Eres Jefe de Departamento esta ronda" : "You're Department Head this round"}</h2>
            <p className="text-sm text-cream">{lang === "es" ? "El GM abrió la reunión. Ve a la mesa del GM. Cuando llegue el turno de tu departamento, respondes su escenario primero." : "The GM opened the meeting. Go to the GM's table. When your department's turn comes, you answer its scenario first."}</p>
            <button type="button" className="w-full rounded-xl bg-[#D4A05C] py-3 text-base font-semibold text-white" onClick={ack}>{lang === "es" ? "Entendido" : "Got it"}</button>
          </div>
        </ModalRoot>
      ) : null}
      {focusOpen && isGm ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0C1230]/95 p-4 pb-20" onClick={() => setFocusOpen(false)}>
          <div className="max-h-full w-full max-w-md space-y-3 overflow-auto rounded-2xl border border-[#D4A05C] bg-[#1B2A4A] p-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl text-cream">{lang === "es" ? "Proyectos de enfoque" : "Focus projects"}</h2>
            <p className="text-xs text-cream/70">{lang === "es" ? "Cada departamento fija sus 2 proyectos; aquí el GM los fija o los cambia." : "Each department sets its own 2; the GM sets or overrides them here."}</p>
            <div className="flex flex-wrap gap-1">
              {["Marketing", "Appointment Center", "Sales", "Production", "Accounting"].map((dept) => (
                <button key={dept} type="button" className={`rounded-full border px-3 py-1 text-xs ${cardName === dept ? "border-gold bg-gold text-navy" : "border-line text-cream"}`} onClick={() => setCardName(dept)}>{deptLabel(dept, lang)}</button>
              ))}
            </div>
            {cardName ? <FocusPicker key={cardName} seat={seat} board={board} lang={lang} reload={reload} dept={cardName} onDone={() => toast.show({ text: lang === "es" ? "Enfoque fijado." : `${cardName} focus set.` })} /> : <p className="text-sm text-cream">{lang === "es" ? "Elige un departamento." : "Pick a department."}</p>}
            <Btn kind="ghost" className="w-full" onClick={() => setFocusOpen(false)}>{lang === "es" ? "Cerrar" : "Close"}</Btn>
          </div>
        </div>
      ) : null}
      {toast.view}
      <nav className="fixed bottom-0 left-1/2 z-50 flex h-16 w-full max-w-lg -translate-x-1/2 items-center justify-around border-t border-[#1B2A4A] bg-[#0C1230] text-xs">
        {(["board", "projects", "numbers", "more"] as const).map((item) => (
          <button key={item} type="button" className={`min-h-11 px-3 ${tab === item ? "text-[#D4A05C]" : "text-cream/60"}`} onClick={() => setTab(item)}>{item === "board" ? (lang === "es" ? "Tablero" : "Board") : item === "projects" ? (lang === "es" ? "Proyectos" : "Projects") : item === "numbers" ? (lang === "es" ? "Números" : "Numbers") : (lang === "es" ? "Más" : "More")}</button>
        ))}
      </nav>
      {tab !== "board" ? (
        <div className="fixed inset-0 z-20 overflow-auto bg-[#0C1230] pb-16">
          <div className="p-4"><button type="button" className="text-sm font-semibold text-gold" onClick={() => setTab("board")}>‹ {lang === "es" ? "Volver al tablero" : "Back to the board"}</button></div>
          {tab === "projects" ? (
            <div className="space-y-2 px-4">
              <h2 className="font-display text-xl text-cream">{lang === "es" ? "Proyectos" : "Projects"}</h2>
              {board.projects.map((project) => (
                <div key={project.id} className="rounded-xl bg-[#1B2A4A] p-2">
                  <p className="text-sm text-cream">P{project.n} · {project.status === "unopened" || !project.house ? (lang === "es" ? "Aún no revelado" : "Not yet revealed") : <><NamePair name={project.customer} lang={lang} /> · <NamePair name={project.house} lang={lang} /></>}{project.status === "complete" ? (lang === "es" ? " · completo" : " · complete") : ""}</p>
                  <TokenSlots projectId={project.id} house={project.house} customer={project.customer} extraSlot={project.extra_slot} plusOnes={project.plus_ones} plays={board.pendingPlays ?? []} lang={lang} />
                </div>
              ))}
            </div>
          ) : null}
          {tab === "numbers" ? (
            <div className="space-y-2 px-4">
              <h2 className="font-display text-xl text-cream">{lang === "es" ? "Números" : "Numbers"}</h2>
              <p className="text-sm text-cream">{lang === "es" ? "Ingresos" : "Revenue"} {money(board.numbers.revenueCents)} − {lang === "es" ? "Nómina" : "Payroll"} {money(board.numbers.payrollCents)} − {lang === "es" ? "Costos fijos" : "Fixed costs"} {money(board.numbers.fixedCents)} − {lang === "es" ? "Costos variables" : "Variable costs"} {money(board.numbers.otherCents)} = <b>{lang === "es" ? "Ganancia" : "Profit"} {money(board.numbers.profitCents)}</b></p>
              <Link to="/soebld/numbers" search={{ seat: seat.id }} className="block rounded-xl border border-line px-3 py-2 text-cream">{lang === "es" ? "Abrir números" : "Open numbers"}</Link>
            </div>
          ) : null}
          {tab === "more" ? (
            <div className="space-y-2 px-4">
              <Link to="/soebld/financials" search={{ seat: seat.id }} className="block rounded-xl border border-line px-3 py-2 text-cream">{lang === "es" ? "Finanzas" : "Business Financials"}</Link>
              <Link to="/soebld/scoreboard" search={{ seat: seat.id }} className="block rounded-xl border border-line px-3 py-2 text-cream">{lang === "es" ? "Marcador" : "Value Scoreboard"}</Link>
              <Link to="/soebld/log" search={{ seat: seat.id }} className="block rounded-xl border border-line px-3 py-2 text-cream">{lang === "es" ? "Registro" : "Answer log"}</Link>
              {board.joinPath ? <button type="button" className="block w-full rounded-xl border border-gold px-3 py-2 text-left text-gold" onClick={() => { const url = `${window.location.origin}${board.joinPath}`; void navigator.clipboard?.writeText(url).then(() => toast.show({ text: lang === "es" ? "Enlace copiado." : "Join link copied." }), () => toast.show({ text: url })); }}>{lang === "es" ? "Copiar enlace para unirse" : "Copy join link"}</button> : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function MaleRead({ text, lang }: { text: string; lang: "en" | "es" }) {
  const [mode, setMode] = useState<"idle" | "loading" | "playing">("idle");
  const stopRef = useRef<(() => void) | null>(null);

  async function play() {
    if (mode === "playing") {
      stopRef.current?.();
      setMode("idle");
      return;
    }
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    const ctx = Ctx ? new Ctx() : null;
    if (ctx?.state === "suspended") void ctx.resume();
    setMode("loading");
    try {
      const res = await speakMale({ data: { text } });
      if (!res.ok || !ctx) {
        if (!fallback()) setMode("idle");
        return;
      }
      const raw = Uint8Array.from(atob(res.audio), (ch) => ch.charCodeAt(0));
      const buffer = await ctx.decodeAudioData(raw.buffer);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = () => setMode("idle");
      source.start();
      stopRef.current = () => {
        try {
          source.stop();
        } catch {
          /* already stopped */
        }
      };
      setMode("playing");
    } catch {
      if (!fallback()) setMode("idle");
    }
  }

  function fallback() {
    if (!window.speechSynthesis) return false;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const male = window.speechSynthesis.getVoices().find((voice) => /male|david|daniel|alex|fred|aaron|rex/i.test(voice.name));
    if (male) utter.voice = male;
    utter.onend = () => setMode("idle");
    window.speechSynthesis.speak(utter);
    stopRef.current = () => window.speechSynthesis.cancel();
    setMode("playing");
    return true;
  }

  return (
    <button type="button" onClick={() => void play()} className="inline-flex min-h-11 items-center rounded-xl border border-gold px-3 text-sm font-semibold text-gold">
      {mode === "loading" ? "Reading…" : mode === "playing" ? "Stop" : (lang === "es" ? "Escuchar" : "Listen")}
    </button>
  );
}

