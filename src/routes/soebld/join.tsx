import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { gameJoinStatus, registerSeat } from "@/lib/metalcon/api";
import { t } from "@/lib/metalcon/i18n";
import { writeSeat } from "@/lib/metalcon/session";
import { METALCON_SEAT_LABEL, METALCON_SEAT_LABEL_ES, METALCON_SEATS } from "@/lib/metalcon/seats";
import { COMPANION_CARD_COUNT } from "@/lib/metalcon/cards";
import { Btn, Card, Field, Select } from "@/components/game/ui";
import { LangSwitch, useLang } from "@/lib/metalcon/lang";

export const Route = createFileRoute("/soebld/join")({
  component: () => <Outlet />,
});

const DEPT_PARAM: Record<string, string> = {
  mk: "Marketing",
  ac: "Appointment Center",
  sa: "Sales",
  pr: "Production",
  acc: "Accounting",
};

export function JoinForm({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const [closed, setClosed] = useState<boolean | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState<string>("");
  const [gameInfo, setGameInfo] = useState<{ n?: number; eventName?: string | null; hasGm?: boolean }>({});
  const [terms, setTerms] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("dept")?.toLowerCase() ?? "";
    const next = DEPT_PARAM[raw];
    if (next) setDept(next);
  }, []);

  useEffect(() => {
    let stop = false;
    void gameJoinStatus({ data: { slug } }).then((res) => {
      if (stop) return;
      setClosed(res.closed === true);
      if (res.ok) setGameInfo({ n: res.n, eventName: res.eventName, hasGm: res.hasGm });
    }).catch(() => {
      if (!stop) setClosed(true);
    });
    return () => { stop = true; };
  }, [slug]);

  async function submit() {
    if (!dept) { setErr(lang === "es" ? "Elige tu asiento." : "Choose your seat."); return; }
    setBusy(true);
    setErr("");
    try {
      const res = await registerSeat({ data: { name: `${firstName.trim()} ${lastName.trim()}`.trim(), firstName, lastName, company, jobTitle, phone, email, dept, terms, slug } });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      writeSeat(res.player);
      void navigate({ to: "/soebld/play", search: { seat: res.player.id } });
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not save the seat.");
    } finally {
      setBusy(false);
    }
  }

  if (closed === null) {
    return (
      <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
        <p className="text-xs font-bold tracking-widest text-gold uppercase">SOEBLD</p>
        <p className="mt-3 animate-pulse text-sm text-muted">{lang === "es" ? "Cargando el juego…" : "Loading the game…"}</p>
      </main>
    );
  }
  if (closed) {
    return (
      <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold tracking-widest text-gold uppercase">SOEBLD</p>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
        <h1 className="mt-2 font-display text-3xl text-cream">{t("join.closedTitle", lang)}</h1>
        <p className="mt-3 text-sm text-cream">{t("join.closed", lang)}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <p className="text-xs font-bold tracking-widest text-gold uppercase">SOEBLD</p>
      {gameInfo.n ? <p className="mt-1 text-sm font-semibold text-cream">{lang === "es" ? "Juego" : "Game"} {gameInfo.n}{gameInfo.eventName ? ` · ${gameInfo.eventName}` : ""}</p> : null}
      <h1 className="mt-2 font-display text-3xl text-cream">{lang === "es" ? "Toma un asiento" : "Take a seat"}</h1>
      <p className="mt-2 text-sm text-muted">{lang === "es" ? "SOE Business Leadership Scenario Cards. Tu asiento es el departamento que vas a consultar." : "SOE Business Leadership Scenario Cards. Your seat is the department you will look up."}</p>
      <p className="mt-1 text-sm text-muted">{lang === "es" ? `${COMPANION_CARD_COUNT} cartas` : `${COMPANION_CARD_COUNT} cards`}</p>
      <Card className="mt-4 space-y-3">
        <LangSwitch lang={lang} setLang={setLang} />
        <label className="block text-sm font-semibold text-cream">
          {lang === "es" ? "Asiento" : "Seat"}
          <Select className="mt-1" value={dept} onChange={(e) => setDept(e.target.value)} aria-label={lang === "es" ? "Asiento" : "Seat"}>
            <option value="" disabled>{lang === "es" ? "Elige tu asiento" : "Choose your seat"}</option>
            {METALCON_SEATS.filter((seat) => !(seat === "General Manager" && gameInfo.hasGm)).map((seat) => (
              <option key={seat} value={seat}>
                {lang === "es" ? METALCON_SEAT_LABEL_ES[seat] : METALCON_SEAT_LABEL[seat]}
              </option>
            ))}
          </Select>
        </label>
        <label className="block text-sm font-semibold text-cream">
          {lang === "es" ? "Nombre" : "First name"}
          <Field className="mt-1" aria-label={lang === "es" ? "Nombre" : "First name"} placeholder={lang === "es" ? "Nombre" : "First name"} value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
        </label>
        <label className="block text-sm font-semibold text-cream">
          {lang === "es" ? "Apellido" : "Last name"}
          <Field className="mt-1" aria-label={lang === "es" ? "Apellido" : "Last name"} placeholder={lang === "es" ? "Apellido" : "Last name"} value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
        </label>
        <label className="block text-sm font-semibold text-cream">
          {lang === "es" ? "Nombre de la empresa" : "Company name"}
          <Field className="mt-1" aria-label={lang === "es" ? "Nombre de la empresa" : "Company name"} placeholder={lang === "es" ? "Nombre de la empresa" : "Company name"} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
        </label>
        <label className="block text-sm font-semibold text-cream">
          {lang === "es" ? "Cargo" : "Title"}
          <Field className="mt-1" aria-label={lang === "es" ? "Cargo" : "Title"} placeholder={lang === "es" ? "Cargo" : "Title"} value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} autoComplete="organization-title" />
        </label>
        <Field aria-label={lang === "es" ? "Número de celular" : "Mobile"} inputMode="tel" placeholder={lang === "es" ? "Número de celular" : "Mobile number"} value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Field aria-label={lang === "es" ? "Correo electrónico" : "Email"} inputMode="email" placeholder={lang === "es" ? "Correo electrónico" : "Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="flex items-start gap-3 text-sm text-cream">
          <input type="checkbox" className="mt-1 size-5 accent-[#d4a05c]" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          <span>
            {lang === "es" ? "Acepto los" : "I agree to the"}{" "}
            <Link to="/soebld/terms" className="font-semibold text-gold" target="_blank">
              {lang === "es" ? "Términos y condiciones beta" : "Beta Terms & Conditions"}
            </Link>
            .
          </span>
        </label>
        {err ? <p className="text-sm text-orange-ink">{err}</p> : null}
        <Btn className="w-full" disabled={busy || !terms} onClick={() => void submit()}>
          {busy ? (lang === "es" ? "Guardando…" : "Saving…") : (lang === "es" ? "Entrar a las cartas" : "Enter the cards")}
        </Btn>
      </Card>
    </main>
  );
}
