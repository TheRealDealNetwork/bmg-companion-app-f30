import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { companyBoard, setProjectSlot } from "@/lib/metalcon/api";
import { readPageSeat, type MetalSeat } from "@/lib/metalcon/session";
import { money } from "@/lib/game/format";
import { Btn, Card, Select } from "@/components/game/ui";
import { LangSwitch, useLang } from "@/lib/metalcon/lang";
import { TokenSlots } from "@/components/game/slots";
import { canonicalCardName } from "@/lib/metalcon/board";
import { bilingual, resolveName } from "@/lib/metalcon/es-cards";

export const Route = createFileRoute("/soebld/projects")({
  component: ProjectsPage,
});

type Board = Extract<Awaited<ReturnType<typeof companyBoard>>, { ok: true }>;
type Slot = { n: number; id: string; house: string; customer: string; status: string; value: number; revealed: boolean; extraSlot: string };

function effectLine(raw: Slot, lang: "en" | "es") {
  // Stored values are slug ids; match against the printed card name.
  const slot = { ...raw, house: canonicalCardName(raw.house), customer: canonicalCardName(raw.customer) };
  const bits: string[] = [];
  if (/Bi-Level/i.test(slot.house)) bits.push(lang === "es" ? "Casa +$3,000 al completar · +1 martillo" : "House +$3,000 on completion · +1 hammer");
  if (/McMansion/i.test(slot.house)) bits.push(lang === "es" ? "Casa +$2,000 al completar · +1 espacio" : "House +$2,000 on completion · +1 slot");
  if (/Victorian/i.test(slot.house)) bits.push(lang === "es" ? "Casa +$2,000 al completar" : "House +$2,000 on completion");
  if (/Bungalow/i.test(slot.house)) bits.push(lang === "es" ? "+1 teléfono" : "+1 phone");
  if (/Lake House/i.test(slot.house)) bits.push(lang === "es" ? "+1 calculadora" : "+1 calculator");
  if (/Ranch/i.test(slot.house)) bits.push(lang === "es" ? "+1 estrella" : "+1 star");
  if (/Split-Level/i.test(slot.house)) bits.push(lang === "es" ? "+1 venta" : "+1 sale");
  if (/Colonial|Rowhome/i.test(slot.house)) bits.push(lang === "es" ? "+1 martillo" : "+1 hammer");
  if (/Harris/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$4,000 al completar" : "Customer +$4,000 on completion");
  if (/Patel/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$2,000 al completar · +1 espacio" : "Customer +$2,000 on completion · +1 slot");
  if (/Kim/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente: con su estrella, +1 estrella en otro proyecto sin terminar" : "Customer: when it gets its star, +1 star on another unfinished project");
  if (/Garcia/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$2,000 por proyecto terminado después, tope $8,000" : "Customer +$2,000 per project finished after, cap $8,000");
  if (/Rivera/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$5,000 si hay 2 especiales" : "Customer +$5,000 if 2 specials");
  if (/Thompson/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente −$5,000 si termina 4.º o después" : "Customer −$5,000 if 4th or later");
  if (/Stanley/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente −$5,000 si no termina al final de la ronda 6" : "Customer −$5,000 if unfinished by the end of round 6");
  if (/Lee/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$1,000 por ficha, tope $5,000" : "Customer +$1,000 per token, cap $5,000");
  if (/O.Brien/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$4,000 si es el último al final del juego" : "Customer +$4,000 if last finished at game end");
  return bits.join(" · ") || (lang === "es" ? "Sin bono de casa o cliente" : "No house or customer bonus");
}

function ProjectsPage() {
  const navigate = useNavigate();
  const [seat, setSeat] = useState<MetalSeat | null>(null);
  const [board, setBoard] = useState<Board | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [note, setNote] = useState("");
  const [loadError, setLoadError] = useState("");
  const { lang, setLang } = useLang(seat?.id);

  async function load(saved: MetalSeat) {
    try {
      const res = await companyBoard({ data: { id: saved.id, secret: saved.secret } });
      if (!res.ok) {
        setLoadError(res.error);
        return;
      }
      setLoadError("");
      setBoard(res);
    setSlots(Array.from({ length: 9 }, (_, i) => {
      const n = i + 1;
      const found = res.projects.find((project) => project.n === n);
      const house = found?.house ?? "";
      const customer = found?.customer ?? "";
      return {
        n,
        id: found?.id ?? "",
        house,
        customer,
        status: found?.status === "complete" ? "complete" : found?.status === "open" ? "open" : "unopened",
        value: n <= 3 ? 10000 : n <= 6 ? 20000 : 30000,
        revealed: Boolean(house && customer),
        extraSlot: found?.extra_slot ?? "",
      };
    }));
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Could not open the projects.");
    }
  }

  useEffect(() => {
    document.title = lang === "es" ? "Proyectos" : "Projects";
    const saved = readPageSeat();
    if (!saved) void navigate({ to: "/soebld/join" });
    else {
      setSeat(saved);
      void load(saved);
      if (saved.dept !== "General Manager") {
        const timer = window.setInterval(() => void load(saved), 3000);
        return () => window.clearInterval(timer);
      }
    }
  }, [lang, navigate]);

  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === "visible") { const again = readPageSeat(); if (again) setSeat(again); } };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  if (!seat || !board) return <p className="p-6 text-cream">{loadError || (lang === "es" ? "Abriendo los proyectos…" : "Opening the projects…")}</p>;
  const isGm = seat.dept === "General Manager";

  const statusLabel = (status: string) =>
    status === "complete" ? (lang === "es" ? "Completado" : "Completed")
    : status === "open" ? (lang === "es" ? "Abierto" : "Opened")
    : (lang === "es" ? "No abierto" : "Not opened");

  async function save(slot: Slot) {
    const res = await setProjectSlot({ data: { id: seat!.id, secret: seat!.secret, n: slot.n, house: slot.house, customer: slot.customer, status: slot.status, extraSlot: slot.extraSlot } });
    setNote(res.ok ? (lang === "es" ? `Proyecto ${slot.n} bloqueado.` : `Project ${slot.n} locked in.`) : res.error);
    void load(seat!);
  }

  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="font-display text-2xl text-cream">{lang === "es" ? "Proyectos" : "Projects"}</h1>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      <p className="mb-3 text-sm text-muted">{lang === "es" ? "Los 9 proyectos. El valor cuenta solo al completarse. Bloquea una casa y un cliente a la vez." : "All 9 projects. Value counts only on completion. Lock one house and customer at a time."}</p>
      <Link to="/soebld/play" search={{ seat: seat.id }} className="mb-3 inline-block text-sm font-semibold text-gold">{lang === "es" ? "Volver al tablero" : "Back to the board"}</Link>
      {note ? <p className="mb-3 text-sm text-gold">{note}</p> : null}
      <div className="space-y-3">
        {slots.map((slot) => (
          <Card key={slot.n} className="space-y-2">
            <p className="text-base font-bold text-cream">{lang === "es" ? "Proyecto" : "Project"} {slot.n} · {money(slot.value * 100)} · {statusLabel(slot.status)}</p>
            {isGm ? (
              <>
                <Select aria-label={lang === "es" ? "Casa" : "House"} value={slot.house} onChange={(e) => setSlots((rows) => rows.map((row) => row.n === slot.n ? { ...row, house: e.target.value } : row))}>
                  <option value="">{lang === "es" ? "Carta de casa" : "House card"}</option>
                  {board.houses.map((item) => <option key={typeof item === "string" ? item : item.id} value={typeof item === "string" ? item : item.id}>{typeof item === "string" ? item : item.name}</option>)}
                </Select>
                <Select aria-label={lang === "es" ? "Cliente" : "Customer"} value={slot.customer} onChange={(e) => setSlots((rows) => rows.map((row) => row.n === slot.n ? { ...row, customer: e.target.value } : row))}>
                  <option value="">{lang === "es" ? "Carta de cliente" : "Customer card"}</option>
                  {board.customers.map((item) => <option key={typeof item === "string" ? item : item.id} value={typeof item === "string" ? item : item.id}>{typeof item === "string" ? item : item.name}</option>)}
                </Select>
                {/McMansion|Patel/i.test(`${slot.house} ${slot.customer}`) ? (
                  <Select aria-label={lang === "es" ? "Espacio extra" : "Extra slot"} value={slot.extraSlot} onChange={(e) => setSlots((rows) => rows.map((row) => row.n === slot.n ? { ...row, extraSlot: e.target.value } : row))}>
                    <option value="">{lang === "es" ? "Espacio extra (elige departamento)" : "Extra slot (pick department)"}</option>
                    {["Marketing", "Appointment Center", "Sales", "Production", "Accounting"].map((dept) => <option key={dept} value={dept}>{dept}</option>)}
                  </Select>
                ) : null}
                <Select aria-label={lang === "es" ? "Estado" : "Status"} value={slot.status} onChange={(e) => setSlots((rows) => rows.map((row) => row.n === slot.n ? { ...row, status: e.target.value } : row))}>
                  <option value="unopened">{lang === "es" ? "No abierto" : "Not opened"}</option>
                  <option value="open">{lang === "es" ? "Abierto" : "Opened"}</option>
                  <option value="complete">{lang === "es" ? "Completado" : "Completed"}</option>
                </Select>
                <Btn className="w-full" onClick={() => void save(slot)}>{lang === "es" ? "Bloquear proyecto" : "Lock in project"}</Btn>
              </>
            ) : (
              <>
                <p className="text-sm text-cream">{lang === "es" ? "Casa" : "House"}: {slot.revealed ? (() => { const b = bilingual(resolveName(slot.house), lang); return b.secondary ? `${b.primary} (${b.secondary})` : b.primary; })() : (lang === "es" ? "Aún no revelado" : "Not yet revealed")}</p>
                <p className="text-sm text-cream">{lang === "es" ? "Cliente" : "Customer"}: {slot.revealed ? (() => { const b = bilingual(resolveName(slot.customer), lang); return b.secondary ? `${b.primary} (${b.secondary})` : b.primary; })() : (lang === "es" ? "Aún no revelado" : "Not yet revealed")}</p>
              </>
            )}
            {slot.revealed ? <p className="text-xs text-muted">{effectLine(slot, lang)}</p> : null}
            <TokenSlots projectId={board.projects.find((p) => p.n === slot.n)?.id} house={slot.house} customer={slot.customer} extraSlot={slot.extraSlot} plusOnes={board.projects.find((p) => p.n === slot.n)?.plus_ones} plays={board.pendingPlays ?? []} lang={lang} />
            {isGm && !slot.revealed ? <p className="text-xs text-muted">{lang === "es" ? "Aún no revelado" : "Not yet revealed"}</p> : null}
          </Card>
        ))}
      </div>
    </main>
  );
}
