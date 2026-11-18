import { useEffect, useState } from "react";
import { saveProfile, signInProfile, requestEmailCode, confirmEmailCode, requestPinReset, confirmPinReset, resetPin } from "@/lib/game/api";
import { readProfileSession, writeProfileSession, clearProfileSession, type HeldProfile } from "@/lib/game/session";
import { Btn, Field, Select } from "./ui";
import { LangSwitch, useLang } from "@/lib/metalcon/lang";

export function ProfileBlock({ onReady, onClear, start = "create" }: { onReady: (profile: HeldProfile) => void; onClear?: () => void; start?: "create" | "return" }) {
  const { lang, setLang } = useLang();
  const [mode, setMode] = useState<"create" | "return" | "reset">(start);
  const [held, setHeld] = useState<HeldProfile | null>(() => readProfileSession());
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstTime, setFirstTime] = useState("yes");
  const [trades, setTrades] = useState("new");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [workCity, setWorkCity] = useState("");
  const [code, setCode] = useState("");
  const [proof, setProof] = useState("");
  const [sent, setSent] = useState(false);
  const [cool, setCool] = useState(0);
  const [nextPin, setNextPin] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (cool <= 0) return;
    const timer = window.setTimeout(() => setCool((n) => n - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cool]);

  function markSent() {
    setSent(true);
    setCool(30);
  }

  if (held) {
    return (
      <div className="mt-4 rounded-xl bg-navy-2 p-3">
        <p className="text-sm text-cream">
          {held.first} {held.last}
        </p>
        <p className="text-xs text-muted">Your username stays off the board. The table uses your real name.</p>
        <button
          type="button"
          className="mt-2 text-sm font-semibold text-gold"
          onClick={() => {
            clearProfileSession();
            setHeld(null);
            setMode("return");
            onClear?.();
          }}
        >
          Use a different username
        </button>
      </div>
    );
  }

  async function submit() {
    setBusy(true);
    setErr("");
    try {
      const res =
        mode === "return"
          ? await signInProfile({ data: { username, pin } })
          : await saveProfile({
              data: {
                username,
                pin,
                first,
                last,
                city,
                state: stateName,
                email,
                phone,
                emailProof: proof,
                firstTime: firstTime === "yes",
                trades,
                title,
                company,
                workCity,
              },
            });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      const next = { id: res.id, secret: res.secret, username: res.username, first: res.first, last: res.last };
      writeProfileSession(next);
      setHeld(next);
      onReady(next);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not save that profile.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      <div className="flex gap-2">
        <button type="button" className={`min-h-10 flex-1 rounded-full text-sm font-semibold ${mode === "create" ? "bg-gold text-navy" : "bg-navy-2 text-cream"}`} onClick={() => setMode("create")}>
          {lang === "es" ? "Nuevo usuario" : "New username"}
        </button>
        <button type="button" className={`min-h-10 flex-1 rounded-full text-sm font-semibold ${mode === "return" ? "bg-gold text-navy" : "bg-navy-2 text-cream"}`} onClick={() => setMode("return")}>
          {lang === "es" ? "Ya tengo uno" : "I already have one"}
        </button>
      </div>
      {mode === "create" ? (
        <>
          <Field aria-label={lang === "es" ? "Nombre" : "First name"} value={first} onChange={(e) => setFirst(e.target.value)} placeholder={lang === "es" ? "Nombre" : "First name"} autoComplete="given-name" />
          <Field aria-label={lang === "es" ? "Apellido" : "Last name"} value={last} onChange={(e) => setLast(e.target.value)} placeholder={lang === "es" ? "Apellido" : "Full last name"} autoComplete="family-name" />
        </>
      ) : null}
      {mode !== "reset" ? (
        <>
          <Field
            aria-label={mode === "return" ? (lang === "es" ? "Correo o nombre de usuario" : "Email or username") : (lang === "es" ? "Nombre de usuario" : "Username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={mode === "return" ? (lang === "es" ? "Correo o nombre de usuario" : "Email or username") : (lang === "es" ? "Nombre de usuario" : "Username")}
            autoComplete={mode === "return" ? "username" : "username"}
          />
          <Field aria-label="PIN" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))} placeholder={lang === "es" ? "PIN, de 4 a 8 dígitos" : "PIN, 4 to 8 digits"} inputMode="numeric" autoComplete={mode === "return" ? "current-password" : "new-password"} />
        </>
      ) : (
        <ResetPin
          busy={busy}
          setBusy={setBusy}
          cool={cool}
          sent={sent}
          code={code}
          proof={proof}
          nextPin={nextPin}
          setCode={setCode}
          setProof={setProof}
          setNextPin={setNextPin}
          setErr={setErr}
          onSent={markSent}
          onDone={(next) => {
            writeProfileSession(next);
            setHeld(next);
            onReady(next);
          }}
        />
      )}
      {mode === "create" ? (
        <>
          <Select aria-label={lang === "es" ? "Primera vez" : "First time"} value={firstTime} onChange={(e) => setFirstTime(e.target.value)}>
            <option value="yes">{lang === "es" ? "Es la primera vez que juego" : "This is my first time playing"}</option>
            <option value="no">{lang === "es" ? "Ya he jugado" : "I have played before"}</option>
          </Select>
          <Select aria-label={lang === "es" ? "Experiencia en los oficios" : "Trades experience"} value={trades} onChange={(e) => setTrades(e.target.value)}>
            <option value="new">{lang === "es" ? "Soy nuevo en los oficios" : "New to the trades"}</option>
            <option value="familiar">{lang === "es" ? "Conozco los oficios" : "Familiar with the trades"}</option>
            <option value="working">{lang === "es" ? "Ya trabajo en los oficios" : "I already work in the trades"}</option>
          </Select>
          {trades === "working" ? (
            <>
              <Field aria-label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your title" />
              <Field aria-label="Company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
              <Field aria-label="Work location" value={workCity} onChange={(e) => setWorkCity(e.target.value)} placeholder="City you work in" />
            </>
          ) : null}
          <p className="text-xs leading-relaxed text-muted">
            {lang === "es" ? "El correo es obligatorio. Te enviamos un código de 6 dígitos para que solo tú puedas abrir este perfil. La ciudad, el estado y el teléfono siguen siendo opcionales. La escuela puede usar tu correo para informes, ofertas y posibles oportunidades de trabajo. Tu nombre de usuario nunca se muestra durante el juego." : "Email is required. We send a 6-digit code so only you can open this profile. City, state, and phone stay optional. The school can use your email for reports, offers, and possible job leads. Your username is never shown during play."}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Field aria-label={lang === "es" ? "Ciudad" : "City"} value={city} onChange={(e) => setCity(e.target.value)} placeholder={lang === "es" ? "Ciudad" : "City"} />
            <Field aria-label={lang === "es" ? "Estado" : "State"} value={stateName} onChange={(e) => setStateName(e.target.value)} placeholder={lang === "es" ? "Estado" : "State"} />
          </div>
          <Field
            aria-label={lang === "es" ? "Correo electrónico" : "Email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSent(false);
              setProof("");
              setCode("");
            }}
            placeholder={lang === "es" ? "Correo electrónico" : "Email"}
            autoComplete="email"
          />
          {proof ? (
            <p className="text-sm font-semibold text-gold">Email confirmed.</p>
          ) : (
            <>
              <Btn
                kind="navy"
                className="w-full"
                disabled={busy || cool > 0}
                onClick={() => {
                  setBusy(true);
                  setErr("");
                  void requestEmailCode({ data: { email } })
                    .then((res) => {
                      if (!res.ok) setErr(res.error);
                      else markSent();
                    })
                    .catch(() => setErr("Could not send the code."))
                    .finally(() => setBusy(false));
                }}
              >
                {cool > 0 ? `Send again in ${cool}s` : sent ? "Send again" : (lang === "es" ? "Envíame un código por correo" : "Email me a code")}
              </Btn>
              {sent ? (
                <>
                  <Field
                    aria-label="Email code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="6-digit code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                  />
                  <Btn
                    kind="navy"
                    className="w-full"
                    disabled={busy || code.length !== 6}
                    onClick={() => {
                      setBusy(true);
                      setErr("");
                      void confirmEmailCode({ data: { email, code } })
                        .then((res) => {
                          if (!res.ok) setErr(res.error);
                          else setProof(res.proof);
                        })
                        .catch(() => setErr("Could not check that code."))
                        .finally(() => setBusy(false));
                    }}
                  >
                    Confirm code
                  </Btn>
                </>
              ) : null}
            </>
          )}
          <Field aria-label={lang === "es" ? "Teléfono, opcional" : "Phone"} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={lang === "es" ? "Teléfono, opcional" : "Phone, optional"} inputMode="tel" />
          <p className="text-xs leading-relaxed text-muted">
            {lang === "es" ? "El inicio de sesión por mensaje de texto está en el plan: un código de 7 dígitos a este número, que se escribe aquí. Todavía no está activado." : "Text-message sign-in is on the roadmap: a 7-digit code to this number, typed back here. It is not turned on yet."}
          </p>
        </>
      ) : null}
      {err ? <p className="text-sm text-orange-ink">{err}</p> : null}
      {mode === "return" ? (
        <button type="button" className="text-sm font-semibold text-gold" onClick={() => { setMode("reset"); setErr(""); setSent(false); setProof(""); setCode(""); setCool(0); }}>
          {lang === "es" ? "Restablecer mi PIN" : "Reset my PIN"}
        </button>
      ) : null}
      {mode === "reset" ? (
        <button type="button" className="text-sm font-semibold text-gold" onClick={() => { setMode("return"); setErr(""); }}>
          Back to sign in
        </button>
      ) : null}
      {mode !== "reset" ? (
        <Btn className="w-full" disabled={busy || (mode === "create" && !proof)} onClick={() => void submit()}>
          {busy ? (lang === "es" ? "Guardando…" : "Saving…") : mode === "create" ? (lang === "es" ? "Guardar mi nombre de usuario" : "Save my username") : (lang === "es" ? "Abrir mi perfil" : "Open my profile")}
        </Btn>
      ) : null}
    </div>
  );
}

function ResetPin({
  busy,
  setBusy,
  cool,
  sent,
  code,
  proof,
  nextPin,
  setCode,
  setProof,
  setNextPin,
  setErr,
  onSent,
  onDone,
}: {
  busy: boolean;
  setBusy: (value: boolean) => void;
  cool: number;
  sent: boolean;
  code: string;
  proof: string;
  nextPin: string;
  setCode: (value: string) => void;
  setProof: (value: string) => void;
  setNextPin: (value: string) => void;
  setErr: (value: string) => void;
  onSent: () => void;
  onDone: (profile: HeldProfile) => void;
}) {
  const [login, setLogin] = useState("");
  return (
    <>
      <p className="text-sm text-cream">We'll email a 6-digit code to the address on that profile. Then you choose a new PIN.</p>
      <Field
        aria-label="Email or username for reset"
        value={login}
        onChange={(e) => {
          setLogin(e.target.value);
          setProof("");
          setCode("");
        }}
        placeholder="Email or username"
        autoComplete="username"
      />
      {proof ? (
        <>
          <p className="text-sm font-semibold text-gold">Code confirmed. Choose a new PIN.</p>
          <Field
            aria-label="New PIN"
            value={nextPin}
            onChange={(e) => setNextPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
            placeholder="New PIN, 4 to 8 digits"
            inputMode="numeric"
            autoComplete="new-password"
          />
          <Btn
            className="w-full"
            disabled={busy || nextPin.length < 4}
            onClick={() => {
              setBusy(true);
              setErr("");
              void resetPin({ data: { login, proof, pin: nextPin } })
                .then((res) => {
                  if (!res.ok) setErr(res.error);
                  else onDone({ id: res.id, secret: res.secret, username: res.username, first: res.first, last: res.last });
                })
                .catch(() => setErr("Could not save that PIN."))
                .finally(() => setBusy(false));
            }}
          >
            {busy ? "Saving…" : "Save new PIN"}
          </Btn>
        </>
      ) : (
        <>
          <Btn
            kind="navy"
            className="w-full"
            disabled={busy || cool > 0}
            onClick={() => {
              setBusy(true);
              setErr("");
              void requestPinReset({ data: { login } })
                .then((res) => {
                  if (!res.ok) setErr(res.error);
                  else onSent();
                })
                .catch(() => setErr("Could not send the code."))
                .finally(() => setBusy(false));
            }}
          >
            {cool > 0 ? `Send again in ${cool}s` : sent ? "Send again" : "Email me a reset code"}
          </Btn>
          {sent ? (
            <>
              <Field
                aria-label="Reset code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="6-digit code"
                inputMode="numeric"
                autoComplete="one-time-code"
              />
              <Btn
                kind="navy"
                className="w-full"
                disabled={busy || code.length !== 6}
                onClick={() => {
                  setBusy(true);
                  setErr("");
                  void confirmPinReset({ data: { login, code } })
                    .then((res) => {
                      if (!res.ok) setErr(res.error);
                      else setProof(res.proof);
                    })
                    .catch(() => setErr("Could not check that code."))
                    .finally(() => setBusy(false));
                }}
              >
                Confirm code
              </Btn>
            </>
          ) : null}
        </>
      )}
    </>
  );
}
