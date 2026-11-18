import { useEffect, useState } from "react";
import { companyBoard, dealCards, finishProject, findScenario, finishTurn, lockScenario, nextScenario, placeCard, placeToken, recordManualCards, removePlay, changePlay, undoAction, setFocus } from "@/lib/metalcon/api";
import type { MetalSeat } from "@/lib/metalcon/session";
import { cardFace } from "@/lib/metalcon/cardfaces";
import { deptLabel, type Lang } from "@/lib/metalcon/i18n";
import { principleFor, DEPT_COLOR, DEPT_COLOR_ON_NAVY } from "@/lib/metalcon/principle-bank";
import { scenarioEs } from "@/lib/metalcon/es-scenarios";
import { bilingual, resolveName } from "@/lib/metalcon/es-cards";
import { canonicalCardName, isNegative } from "@/lib/metalcon/board";
import { TokenSlots } from "@/components/game/slots";

export type Board = Extract<Awaited<ReturnType<typeof companyBoard>>, { ok: true }>;
type Card = { code: string; title: string; scenario: string; options: { A: string; B: string; C: string } };
type Feedback = { correct: "A" | "B" | "C"; correctLabel: string; why: string; voice: string; choice: "A" | "B" | "C"; choiceText: string; missed: boolean; missWhy: string; headline: string };

const primary = "w-full rounded-xl bg-[#D4A05C] py-3 text-base font-semibold text-white disabled:opacity-40";
const ghost = "w-full rounded-xl border border-line py-2 text-sm text-cream";
const L = (lang: Lang, en: string, es: string) => (lang === "es" ? es : en);
const cardName = (name: string, lang: Lang) => { const b = bilingual(resolveName(name), lang); return b.primary || name; };
const money = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;

/** Short non-blocking toast (Game 11 TOP PRIORITY: instant plays, GM fixes after). */
export function useToast() {
  const [toast, setToast] = useState<{ text: string; undo?: () => void } | null>(null);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 8000);
    return () => window.clearTimeout(timer);
  }, [toast]);
  const view = toast ? (
    <div className="fixed bottom-20 left-1/2 z-[60] flex w-[92%] max-w-md -translate-x-1/2 items-center justify-between gap-2 rounded-xl border border-gold bg-[#1B2A4A] px-3 py-2 text-sm text-cream shadow-lg" role="status">
      <span>{toast.text}</span>
      {toast.undo ? <button type="button" className="rounded-lg bg-gold px-3 py-1 text-sm font-semibold text-navy" onClick={() => { toast.undo?.(); setToast(null); }}>Undo</button> : null}
    </div>
  ) : null;
  return { show: setToast, view };
}

export function HeadBadge({ board, seat, lang }: { board: Board; seat: MetalSeat; lang: Lang }) {
  if (seat.dept === "General Manager") return null;
  const color = DEPT_COLOR[seat.dept] ?? "#D4A05C";
  if (board.isHead) {
    return (
      <p className="rounded-xl px-3 py-2 text-center text-sm font-bold text-white" style={{ background: color }}>
        ★ {L(lang, "You're the Department Head this round", "Eres el Jefe de Departamento esta ronda")}
      </p>
    );
  }
  return (
    <p className="rounded-xl border px-3 py-2 text-center text-sm text-cream" style={{ borderColor: color }}>
      {L(lang, "Department Head this round", "Jefe de Departamento esta ronda")}: <b>{board.myHeadName || "—"}</b>
    </p>
  );
}

/** Scenario number entry -> pop-up with the Principle ABOVE the scenario -> A/B/C -> readable feedback.
 *  Available to EVERY department seat at all times, including non-heads during the GM meeting (Game 11 #120). */
export function ScenarioPanel({ seat, board, lang, reload }: { seat: MetalSeat; board: Board; lang: Lang; reload: () => void }) {
  const [digits, setDigits] = useState("");
  const [card, setCard] = useState<Card | null>(null);
  const [pick, setPick] = useState<"" | "A" | "B" | "C">("");
  const [result, setResult] = useState<{ feedback: Feedback; duplicate: boolean; purpose: string; negation: { card: string; outcome: string; replacement?: string; replacementVoid?: boolean } | null } | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  if (seat.dept === "General Manager") return null;
  const purpose = board.scenarioPurpose;
  const title = purpose === "turn"
    ? L(lang, "Your department's scenario. A right answer earns 3 action cards.", "El escenario de tu departamento. Una respuesta correcta gana 3 cartas de acción.")
    : purpose === "negate"
      ? L(lang, `Negate ${cardName(board.scenarioNegative, "en")}: answer right and it's cancelled and replaced. Wrong and it plays.`, `Anula ${cardName(board.scenarioNegative, "es")}: si aciertas se cancela y se reemplaza. Si fallas, se juega.`)
      : L(lang, "Answer a scenario card. Every answer counts for payroll, during the GM meeting too.", "Responde una carta de escenario. Cada respuesta cuenta para la nómina, también durante la reunión.");

  async function find(raw: string) {
    setErr("");
    if (!/^\d{1,2}$/.test(raw.trim())) { setErr(L(lang, "Enter the two-digit number on the card, for example 07.", "Escribe el número de dos dígitos de la carta, por ejemplo 07.")); return; }
    setBusy(true);
    try {
      const res = await findScenario({ data: { id: seat.id, secret: seat.secret, raw: raw.trim() } });
      if (!res.ok) { setErr(L(lang, `No ${seat.dept} card number ${raw.trim().padStart(2, "0")}. Check the number on the card.`, `No hay carta de ${deptLabel(seat.dept, "es")} número ${raw.trim().padStart(2, "0")}. Revisa el número.`)); return; }
      setCard(res.card); setPick(""); setResult(null);
    } finally { setBusy(false); }
  }
  async function drawDigital() {
    setBusy(true); setErr("");
    const res = await nextScenario({ data: { id: seat.id, secret: seat.secret } });
    setBusy(false);
    if (!res.ok) { setErr(res.error); return; }
    setCard(res.card); setPick(""); setResult(null);
  }
  async function lock() {
    if (!card || !pick) return;
    setBusy(true); setErr("");
    try {
      const res = await lockScenario({ data: { id: seat.id, secret: seat.secret, code: card.code, choice: pick, round: board.currentRound || 1 } });
      if (!res.ok) { setErr(res.error); return; }
      if (res.feedback) setResult({ feedback: res.feedback as Feedback, duplicate: res.duplicate, purpose: "purpose" in res ? String(res.purpose) : "table", negation: "negation" in res ? (res.negation as never) : null });
      reload();
    } finally { setBusy(false); }
  }
  const es = card && lang === "es" ? scenarioEs(card.code) : null;
  const entry = card ? principleFor(card.code) : null;
  return (
    <div className="space-y-2 rounded-xl border border-gold p-3">
      <p className="text-sm font-semibold text-gold">{title}</p>
      <div className="flex gap-2">
        <input aria-label={L(lang, "Scenario card number", "Número de la carta de escenario")} inputMode="numeric" maxLength={2} value={digits} placeholder="07"
          onChange={(e) => setDigits(e.target.value.replace(/\D/g, "").slice(0, 2))}
          onKeyDown={(e) => { if (e.key === "Enter") void find(digits); }}
          className="w-24 rounded-xl border border-line bg-card px-3 py-3 text-center text-xl text-ink" />
        <button type="button" className={primary} disabled={busy || !digits} onClick={() => void find(digits)}>{L(lang, "Open card", "Abrir carta")}</button>
      </div>
      <button type="button" className="text-xs text-cream/60 underline" onClick={() => void drawDigital()}>{L(lang, "No card in front of you? Draw one on screen", "¿No tienes carta? Saca una en pantalla")}</button>
      {err ? <p className="text-sm text-orange-ink">{err}</p> : null}
      {card ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C1230]/95 p-4 pb-20">
          <div className="max-h-full w-full max-w-md space-y-3 overflow-auto rounded-2xl border border-[#D4A05C] bg-[#1B2A4A] p-4">
            {entry ? (() => {
              const color = DEPT_COLOR_ON_NAVY[seat.dept] || DEPT_COLOR[seat.dept] || "#FFFFFF";
              const text = lang === "es" ? entry.display_es : entry.display_en;
              const [label, ...rest] = text.split(" – ");
              return (
                <div className="rounded-xl border px-3 py-2" style={{ borderColor: color }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cream/60">{L(lang, "Principle of Excellence", "Principio de Excelencia")}</p>
                  <p className="text-base font-bold" style={{ color, fontFamily: "Montserrat, sans-serif" }}>{label}{rest.length ? <span className="text-white"> – {rest.join(" – ")}</span> : null}</p>
                </div>
              );
            })() : null}
            <p className="text-xs text-[#D4A05C]">{card.code}</p>
            <h3 className="font-display text-xl text-cream">{es ? es.title : card.title}</h3>
            <p className="text-base leading-relaxed text-cream">{es ? es.scenario : card.scenario}</p>
            {(["A", "B", "C"] as const).map((letter) => {
              const isCorrect = result && result.feedback.correct === letter;
              const isMine = (result ? result.feedback.choice : pick) === letter;
              return (
                <button key={letter} type="button" disabled={Boolean(result)} onClick={() => setPick(letter)}
                  className={`block w-full rounded-xl border-2 px-3 py-3 text-left text-base ${isCorrect ? "border-green-400 text-green-300" : isMine ? "border-[#D4A05C] text-[#D4A05C]" : "border-line text-cream"}`}>
                  <b>{letter}.</b> {es ? es.options[letter] : card.options[letter]}
                </button>
              );
            })}
            {!result ? (
              <>
                <button type="button" className={primary} disabled={busy || !pick} onClick={() => void lock()}>{pick ? L(lang, `Lock in ${pick}`, `Confirmar ${pick}`) : L(lang, "Choose A, B or C", "Elige A, B o C")}</button>
                <button type="button" className={ghost} onClick={() => { setCard(null); setPick(""); }}>{L(lang, "Cancel", "Cancelar")}</button>
              </>
            ) : (
              <div className="space-y-2 border-t border-line pt-3">
                {result.duplicate ? <p className="text-sm text-muted">{L(lang, "You already answered this card this round. The first answer stays.", "Ya respondiste esta carta esta ronda. Se queda la primera respuesta.")}</p> : null}
                <p className={`font-display text-2xl ${result.feedback.missed ? "text-orange-ink" : "text-green-300"}`}>{result.feedback.missed ? L(lang, "Not this time", "Esta vez no") : L(lang, "Right!", "¡Correcto!")}</p>
                <p className="text-sm text-cream"><b>{L(lang, "Correct answer", "Respuesta correcta")}: {result.feedback.correct}</b></p>
                <p className="text-sm leading-relaxed text-cream">{entry ? (lang === "es" ? entry.why_es : entry.why_en) : (es ? es.why : result.feedback.why)}</p>
                {result.feedback.missed && result.feedback.missWhy ? <p className="text-sm text-cream/80">{result.feedback.missWhy}</p> : null}
                <p className="text-sm font-semibold text-gold">{result.feedback.missed ? L(lang, "$500 added to payroll.", "$500 sumados a la nómina.") : L(lang, "$500 off payroll.", "$500 menos en la nómina.")}</p>
                {result.purpose === "turn" ? <p className="text-sm text-cream">{result.feedback.missed ? L(lang, "The next player in your department answers a new scenario.", "El siguiente jugador de tu departamento responde un nuevo escenario.") : L(lang, "Your Department Head can deal the 3 action cards now.", "Tu Jefe de Departamento ya puede repartir las 3 cartas de acción.")}</p> : null}
                {result.negation ? <p className="text-sm text-cream">{result.negation.outcome === "negated" ? L(lang, `${cardName(result.negation.card, "en")} is negated.${result.negation.replacement ? ` New card: ${cardName(result.negation.replacement, "en")}${result.negation.replacementVoid ? " (also negative, so it does not play)" : ""}.` : ""}`, `${cardName(result.negation.card, "es")} queda anulada.${result.negation.replacement ? ` Nueva carta: ${cardName(result.negation.replacement, "es")}${result.negation.replacementVoid ? " (también negativa, no se juega)" : ""}.` : ""}`) : L(lang, `${cardName(result.negation.card, "en")} plays.`, `${cardName(result.negation.card, "es")} se juega.`)}</p> : null}
                <button type="button" className={primary} onClick={() => { setCard(null); setResult(null); setPick(""); setDigits(""); }}>{L(lang, "Done", "Listo")}</button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** 3-card carousel: tap the hand to open, tap outside to close, tap a card to pick it. */
export function CardCarousel({ cards, negation, picks, setPicks, max, locked, board, lang, onClose }: {
  cards: string[]; negation: Record<string, string>; picks: string[]; setPicks: (next: string[]) => void; max: number; locked: string[]; board: Board; lang: Lang; onClose: () => void;
}) {
  const [at, setAt] = useState(0);
  const card = cards[Math.min(at, cards.length - 1)];
  if (!card) return null;
  const face = cardFace(card);
  const info = board.actions.find((row) => row.name === card);
  const neg = isNegative(card);
  const state = negation[card];
  const picked = picks.includes(card);
  const disabled = state === "void" || state === "negated";
  const toggle = () => {
    if (disabled || locked.includes(card)) return;
    setPicks(picked ? picks.filter((c) => c !== card) : picks.length < max ? [...picks, card] : picks);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-3" onClick={onClose}>
      <div className="w-full max-w-md space-y-2" onClick={(e) => e.stopPropagation()}>
        <p className="text-center text-sm text-gold">{picks.length} {L(lang, `of ${max} picked`, `de ${max} elegidas`)} · {at + 1}/{cards.length}</p>
        <button type="button" onClick={toggle} className={`relative block w-full rounded-2xl border-4 p-2 ${picked ? "border-gold" : neg ? "border-red-500" : "border-line"} ${disabled ? "opacity-40" : ""}`} aria-label={`${cardName(card, lang)}${neg ? " (negative)" : ""}`}>
          {face ? <img src={face} alt={`${cardName(card, lang)}: ${info?.text ?? ""}`} className="w-full rounded-xl" style={{ maxHeight: "48vh", objectFit: "contain" }} /> : null}
          <p className="mt-2 text-lg font-bold text-cream">{cardName(card, lang)}</p>
          {neg ? <p className="text-sm font-bold text-red-400">{L(lang, "NEGATIVE", "NEGATIVA")}{state === "must" ? L(lang, " · must play", " · se debe jugar") : state === "negated" ? L(lang, " · negated", " · anulada") : state === "void" ? L(lang, " · does not play", " · no se juega") : ""}</p> : null}
          <p className="mt-1 text-base leading-snug text-cream">{info?.text ?? ""}</p>
          {picked ? <span className="absolute right-3 top-3 rounded-full bg-gold px-2 py-1 text-sm font-bold text-navy">✓</span> : null}
        </button>
        <div className="flex gap-2">
          <button type="button" className={ghost} disabled={at === 0} onClick={() => setAt((n) => Math.max(0, n - 1))}>‹ {L(lang, "Prev", "Anterior")}</button>
          <button type="button" className={ghost} disabled={at >= cards.length - 1} onClick={() => setAt((n) => Math.min(cards.length - 1, n + 1))}>{L(lang, "Next", "Siguiente")} ›</button>
        </div>
        <button type="button" className={primary} onClick={onClose}>{picks.length >= max ? L(lang, "Play these", "Jugar estas") : L(lang, "Close", "Cerrar")}</button>
      </div>
    </div>
  );
}

/** Head picks the department's 2 focus projects (finished / ready-to-close projects never appear). GM uses it per department. */
export function FocusPicker({ seat, board, lang, reload, dept, onDone }: { seat: MetalSeat; board: Board; lang: Lang; reload: () => void; dept: string; onDone?: () => void }) {
  const open = board.projects.filter((p) => p.status === "open" && !board.projectSlots.find((s) => s.id === p.id)?.ready);
  const need = Math.min(2, open.length);
  const [ids, setIds] = useState<string[]>([]);
  const [err, setErr] = useState("");
  return (
    <div className="space-y-2">
      <p className="text-sm text-cream">{L(lang, `Pick ${need} focus project${need === 1 ? "" : "s"} for ${dept}`, `Elige ${need} proyecto${need === 1 ? "" : "s"} de enfoque para ${deptLabel(dept, "es")}`)}</p>
      <div className="grid grid-cols-2 gap-2">
        {open.map((p) => {
          const on = ids.includes(p.id);
          return (
            <button key={p.id} type="button" className={`rounded-xl border-2 px-2 py-2 text-left text-xs ${on ? "border-gold text-gold" : "border-line text-cream"}`} onClick={(e) => { e.stopPropagation(); setIds((cur) => cur.includes(p.id) ? cur.filter((x) => x !== p.id) : cur.length < need ? [...cur, p.id] : [cur[1] ?? cur[0], p.id].filter(Boolean) as string[]); }}>
              P{p.n} · {cardName(canonicalCardName(p.customer), lang)}<br />{cardName(canonicalCardName(p.house), lang)}
            </button>
          );
        })}
      </div>
      {err ? <p className="text-sm text-orange-ink">{err}</p> : null}
      <button type="button" className={primary} disabled={ids.length !== need || need === 0} onClick={(e) => { e.stopPropagation(); void setFocus({ data: { id: seat.id, secret: seat.secret, round: board.currentRound || 1, dept, projectIds: ids } }).then((res) => { if (!res.ok) { setErr(res.error); return; } setErr(""); setIds([]); reload(); onDone?.(); }); }}>
        {L(lang, "Set focus", "Fijar enfoque")}
      </button>
    </div>
  );
}

/** The department's turn, driven by the server stage: scenario -> deal -> negative -> cards -> tokens -> done. */
export function TurnPanel({ seat, board, lang, reload, toast }: { seat: MetalSeat; board: Board; lang: Lang; reload: () => void; toast: (t: { text: string; undo?: () => void }) => void }) {
  const [picks, setPicks] = useState<string[]>([]);
  const [carousel, setCarousel] = useState(false);
  const [other, setOther] = useState("");
  const [err, setErr] = useState("");
  const [manual, setManual] = useState<string[]>([]);
  const turn = board.turn;
  if (seat.dept === "General Manager" || !turn) return null;
  if (board.turnDept !== seat.dept) {
    return <p className="text-sm text-cream/70">{L(lang, `${board.turnDept}'s turn. Your department plays when the turn reaches ${seat.dept}.`, `Turno de ${deptLabel(board.turnDept, "es")}. Tu departamento juega cuando el turno llegue a ${deptLabel(seat.dept, "es")}.`)}</p>;
  }
  const draw = turn.draw;
  const isHead = board.isHead;
  const color = DEPT_COLOR[seat.dept] ?? "#D4A05C";
  const header = <p className="text-sm font-bold" style={{ color }}>{L(lang, "Your department's turn", "Turno de tu departamento")}</p>;
  if (!isHead) {
    const what = turn.stage === "scenario" ? (turn.designatedId === seat.id ? L(lang, "It's on you: answer the department scenario above.", "Te toca: responde el escenario del departamento arriba.") : L(lang, `${turn.designatedName} is answering the department scenario.`, `${turn.designatedName} está respondiendo el escenario.`)) : L(lang, `${turn.headName} is playing the cards and tokens.`, `${turn.headName} está jugando las cartas y fichas.`);
    return <div className="rounded-xl border p-3" style={{ borderColor: color }}>{header}<p className="text-sm text-cream">{what}</p></div>;
  }
  const focus = board.focus ?? [];
  const slotsById = Object.fromEntries(board.projectSlots.map((s) => [s.id, s]));
  const targets = (card: string) => {
    const neg = isNegative(card);
    const pool = neg || !focus.length ? board.projects.filter((p) => p.status === "open") : focus.filter((p) => p.status === "open");
    return pool.map((p) => ({ id: p.id, n: p.n, lock: slotsById[p.id]?.locks?.[seat.dept] ?? "" }));
  };
  const place = async (card: string, projectId: string) => {
    setErr("");
    const res = await placeCard({ data: { id: seat.id, secret: seat.secret, cardName: card, projectId, otherProjectId: other, round: board.currentRound } });
    if (!res.ok) { setErr(res.error); return; }
    setPicks((cur) => cur.filter((c) => c !== card)); setOther("");
    toast({ text: res.words });
    reload();
  };
  return (
    <div className="space-y-2 rounded-xl border-2 p-3" style={{ borderColor: color }}>
      {header}
      {turn.stage === "scenario" ? <p className="text-sm text-cream">{turn.designatedId === seat.id ? L(lang, "Step 1: enter your scenario card number above and answer it. A right answer earns 3 action cards.", "Paso 1: escribe arriba el número de tu carta de escenario y respóndela. Una respuesta correcta gana 3 cartas.") : L(lang, `Step 1: ${turn.designatedName} answers the next department scenario (your answer was wrong).`, `Paso 1: ${turn.designatedName} responde el siguiente escenario.`)}</p> : null}
      {turn.stage === "deal" ? (
        board.actionMode === "manual" ? (
          <div className="space-y-1">
            <p className="text-sm text-cream">{L(lang, "Tap the two cards you drew at the table.", "Toca las dos cartas que sacaste en la mesa.")}</p>
            <div className="max-h-60 space-y-1 overflow-auto">
              {board.actions.filter((c) => c.dept === seat.dept).map((c) => (
                <button key={c.name} type="button" className={`block w-full rounded-xl border px-3 py-2 text-left text-sm ${manual.includes(c.name) ? "border-gold text-gold" : "border-line text-cream"}`} onClick={() => setManual((cur) => cur.includes(c.name) ? cur.filter((x) => x !== c.name) : cur.length < 2 ? [...cur, c.name] : cur)}>{cardName(c.name, lang)}</button>
              ))}
            </div>
            <button type="button" className={primary} disabled={manual.length !== 2} onClick={() => void recordManualCards({ data: { id: seat.id, secret: seat.secret, cards: manual, round: board.currentRound } }).then((res) => { if (!res.ok) setErr(res.error); setManual([]); reload(); })}>{L(lang, "Record these two", "Registrar estas 2")}</button>
          </div>
        ) : (
          <button type="button" className={primary} onClick={() => void dealCards({ data: { id: seat.id, secret: seat.secret, round: board.currentRound } }).then((res) => { if (!res.ok) setErr(res.error); reload(); })}>{L(lang, "Right answer! Deal my 3 action cards", "¡Correcto! Repartir mis 3 cartas")}</button>
        )
      ) : null}
      {draw ? (
        <>
          <button type="button" className="grid w-full grid-cols-3 gap-1" onClick={() => setCarousel(true)} aria-label={L(lang, "Open your cards", "Abrir tus cartas")}>
            {draw.cards.map((card) => {
              const face = cardFace(card);
              const state = draw.negation[card];
              return (
                <span key={card} className={`relative block rounded-lg border-2 p-0.5 ${picks.includes(card) ? "border-gold" : isNegative(card) ? "border-red-500" : "border-line"} ${state === "void" || state === "negated" || draw.placed.includes(card) ? "opacity-40" : ""}`}>
                  {face ? <img src={face} alt={cardName(card, lang)} className="w-full rounded" /> : null}
                  <span className="block truncate text-[10px] text-cream">{cardName(card, lang)}</span>
                  {isNegative(card) ? <span className="block text-[10px] font-bold text-red-400">{state === "negated" ? L(lang, "negated", "anulada") : state === "void" ? L(lang, "no play", "no se juega") : state === "must" ? L(lang, "must play", "se juega") : L(lang, "negative", "negativa")}</span> : null}
                  {draw.placed.includes(card) ? <span className="block text-[10px] text-gold">{L(lang, "played", "jugada")}</span> : null}
                </span>
              );
            })}
          </button>
          <p className="text-xs text-cream/70">{L(lang, "Tap the cards to read them big and pick.", "Toca las cartas para verlas grandes y elegir.")}</p>
        </>
      ) : null}
      {turn.stage === "negative" ? <p className="text-sm text-red-300">{L(lang, `Negative card dealt: ${cardName(draw?.unresolved?.[0] ?? "", "en")}. Answer one more scenario above: right cancels it and deals a new card; wrong means it plays.`, `Salió una carta negativa: ${cardName(draw?.unresolved?.[0] ?? "", "es")}. Responde otro escenario arriba: si aciertas se anula y sale otra carta; si fallas, se juega.`)}</p> : null}
      {turn.stage === "cards" && draw ? (
        <div className="space-y-2">
          {!focus.length ? <FocusPicker seat={seat} board={board} lang={lang} reload={reload} dept={seat.dept} /> : (
            <>
              <p className="text-sm text-cream">{L(lang, `Play ${draw.left} more card${draw.left === 1 ? "" : "s"}.`, `Juega ${draw.left} carta${draw.left === 1 ? "" : "s"} más.`)}{draw.must.length ? L(lang, ` ${draw.must.map((c) => cardName(c, "en")).join(", ")} must play.`, ` ${draw.must.map((c) => cardName(c, "es")).join(", ")} se debe jugar.`) : ""}</p>
              {[...new Set([...draw.must, ...picks])].filter((c) => !draw.placed.includes(c)).slice(0, 1).map((card) => {
                const text = board.actions.find((a) => a.name === card)?.text ?? "";
                const needsOther = /MOVE 1|SPLIT/i.test(text);
                const noTarget = /DRAW \d|DOES NOT REQUIRE|SUBTRACT \$|GM MEDIATES/i.test(text);
                return (
                  <div key={card} className="space-y-1 rounded-xl border border-line p-2">
                    <p className="text-sm text-gold">{L(lang, "Place", "Coloca")} {cardName(card, lang)}</p>
                    {noTarget ? <button type="button" className={primary} onClick={() => void place(card, "")}>{L(lang, "Play it", "Jugarla")}</button> : (
                      <>
                        {needsOther ? (
                          <select aria-label={L(lang, "Second project", "Segundo proyecto")} value={other} onChange={(e) => setOther(e.target.value)} className="w-full rounded-xl border border-line bg-card px-3 py-2 text-sm text-ink">
                            <option value="">{/MOVE 1/i.test(text) ? L(lang, "Move the token to… (required)", "Mover la ficha a… (requerido)") : L(lang, "Split: second project (optional)", "Dividir: segundo proyecto (opcional)")}</option>
                            {board.projects.filter((p) => p.status === "open").map((p) => <option key={p.id} value={p.id}>P{p.n}</option>)}
                          </select>
                        ) : null}
                        {targets(card).map((t) => (
                          <button key={t.id} type="button" className={`${primary} text-sm`} disabled={Boolean(t.lock)} onClick={() => void place(card, t.id)}>P{t.n}{t.lock ? ` · ${t.lock}` : ""}</button>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
              {!picks.filter((c) => !draw.placed.includes(c)).length && !draw.must.filter((c) => !draw.placed.includes(c)).length ? <button type="button" className={primary} onClick={() => setCarousel(true)}>{L(lang, `Pick ${draw.left} card${draw.left === 1 ? "" : "s"} to play`, `Elige ${draw.left} carta${draw.left === 1 ? "" : "s"}`)}</button> : null}
            </>
          )}
        </div>
      ) : null}
      {turn.stage === "tokens" ? (
        <div className="space-y-1">
          <p className="text-sm text-cream">{L(lang, "Token step: place your department's token on each eligible focus project.", "Paso de fichas: coloca la ficha de tu departamento en cada proyecto de enfoque elegible.")}</p>
          {turn.tokenTargets.map((t) => (
            <button key={t.id} type="button" className={primary} onClick={() => void placeToken({ data: { id: seat.id, secret: seat.secret, projectId: t.id } }).then((res) => { if (!res.ok) setErr(res.error); else toast({ text: res.words }); reload(); })}>{L(lang, `Place ${seat.dept} token on P${t.n}`, `Colocar ficha de ${deptLabel(seat.dept, "es")} en P${t.n}`)}</button>
          ))}
          <button type="button" className={ghost} onClick={() => void finishTurn({ data: { id: seat.id, secret: seat.secret } }).then((res) => { if (!res.ok) setErr(res.error); reload(); })}>{L(lang, "Done with tokens: pass the turn", "Listo con las fichas: pasar el turno")}</button>
        </div>
      ) : null}
      {turn.stage === "done" ? <p className="text-sm text-gold">{L(lang, "Your turn is done. The next department is up.", "Tu turno terminó. Sigue el próximo departamento.")}</p> : null}
      {err ? <p className="text-sm text-orange-ink">{err}</p> : null}
      {carousel && draw ? <CardCarousel cards={draw.cards} negation={draw.negation} picks={[...new Set([...draw.must.filter((c) => !draw.placed.includes(c)), ...picks])].filter((c) => !draw.placed.includes(c))} setPicks={(next) => setPicks(next.filter((c) => !draw.must.includes(c)))} max={draw.left} locked={[...draw.must, ...draw.placed]} board={board} lang={lang} onClose={() => setCarousel(false)} /> : null}
    </div>
  );
}

/** GM project tile: slots, one-tap Close P# ($X) with payout, and inline Undo / Move / Remove on every play. */
export function GmProjectTile({ project, board, seat, lang, reload, toast }: { project: Board["projects"][number]; board: Board; seat: MetalSeat; lang: Lang; reload: () => void; toast: (t: { text: string; undo?: () => void }) => void }) {
  const [showAll, setShowAll] = useState(false);
  const close = board.closeReady.find((row) => row.projectId === project.id);
  const plays = (board.pendingPlays ?? []).filter((play) => play.project_id === project.id || play.other_project_id === project.id);
  const shown = showAll ? plays : plays.filter((play) => play.round_n === board.currentRound);
  const slots = board.projectSlots.find((s) => s.id === project.id);
  return (
    <div className="space-y-1 rounded-xl bg-[#0C1230] p-2">
      <p className="text-xs text-[#D4A05C]">P{project.n} · {money(project.value_cents)} · {project.status === "complete" ? L(lang, "complete", "completo") : `${slots?.totalFilled ?? 0} ${L(lang, "of", "de")} ${slots?.totalNeed ?? 5}`}</p>
      <TokenSlots projectId={project.id} house={project.house} customer={project.customer} extraSlot={project.extra_slot} plusOnes={project.plus_ones} plays={board.pendingPlays ?? []} lang={lang} />
      {close ? (
        <button type="button" className="w-full rounded-xl bg-green-700 px-2 py-2 text-left text-sm font-semibold text-white" onClick={() => void finishProject({ data: { id: seat.id, secret: seat.secret, projectId: project.id, override: false } }).then((res) => { toast({ text: res.ok ? L(lang, `P${project.n} closed: ${money(close.totalCents)}`, `P${project.n} cerrado: ${money(close.totalCents)}`) : res.error }); reload(); })}>
          {L(lang, `Close P${project.n} (${money(close.totalCents)})`, `Cerrar P${project.n} (${money(close.totalCents)})`)}
          <span className="block text-[11px] font-normal">{close.lines.map((line) => lang === "es" ? line.replace(/^House /, "Casa ").replace(/^Customer /, "Cliente ").replace(/^Garcia referral /, "Referido Garcia ").replace(/^Cards /, "Cartas ") : line).join(" · ")}</span>
        </button>
      ) : null}
      {project.status === "open" ? (
        <div className="space-y-1">
          {shown.map((play) => (
            <div key={play.id} className="flex flex-wrap items-center gap-1 rounded-lg border border-line px-1 py-1 text-[11px] text-cream">
              <span className="mr-auto">{deptLabel(play.dept, lang)} · {cardName(play.card_name, lang)}{play.round_n !== board.currentRound ? ` · R${play.round_n}` : ""}</span>
              <button type="button" className="rounded border border-gold px-1.5 py-0.5 text-gold" onClick={() => void undoAction({ data: { id: seat.id, secret: seat.secret, playId: play.id } }).then((res) => { toast({ text: res.ok ? L(lang, `Undid ${cardName(play.card_name, "en")}; back in ${play.dept}'s hand.`, `Se deshizo ${cardName(play.card_name, "es")}.`) : res.error }); reload(); })}>{L(lang, "Undo", "Deshacer")}</button>
              <select aria-label={L(lang, "Move to project", "Mover a proyecto")} value="" className="rounded border border-line bg-card px-1 py-0.5 text-ink" onChange={(e) => { const to = e.target.value; if (to) void changePlay({ data: { id: seat.id, secret: seat.secret, playId: play.id, projectId: to } }).then((res) => { toast({ text: res.ok ? L(lang, "Moved.", "Movida.") : res.error }); reload(); }); }}>
                <option value="">{L(lang, "Move", "Mover")}</option>
                {board.projects.filter((p) => p.status === "open" && p.id !== project.id).map((p) => <option key={p.id} value={p.id}>P{p.n}</option>)}
              </select>
              <button type="button" className="rounded border border-red-400 px-1.5 py-0.5 text-red-300" onClick={() => void removePlay({ data: { id: seat.id, secret: seat.secret, playId: play.id } }).then((res) => { toast({ text: res.ok ? L(lang, "Removed.", "Quitada.") : res.error }); reload(); })}>{L(lang, "Remove", "Quitar")}</button>
            </div>
          ))}
          {plays.length > shown.length || showAll ? <button type="button" className="text-[11px] text-gold underline" onClick={() => setShowAll((v) => !v)}>{showAll ? L(lang, "This round only", "Solo esta ronda") : L(lang, `Show all ${plays.length} plays`, `Ver las ${plays.length} jugadas`)}</button> : null}
        </div>
      ) : null}
    </div>
  );
}
