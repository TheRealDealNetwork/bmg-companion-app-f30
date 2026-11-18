import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { submitHostLead } from "@/lib/metalcon/api";
import { Btn, Card, Field } from "@/components/game/ui";

export const Route = createFileRoute("/soebld/host")({
  ssr: false,
  component: HostInterest,
});

function HostInterest() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [timing, setTiming] = useState("");
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  async function submit() {
    setBusy(true);
    setErr("");
    try {
      const res = await submitHostLead({
        data: { company, name, title, phone, email, city, state, headcount, timing, notes, contact },
      });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      setDone(true);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not save that. Try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <main className="mx-auto min-h-dvh max-w-lg px-4 py-8">
        <p className="text-xs font-bold tracking-widest text-gold uppercase">The Business Machine Experience</p>
        <h1 className="mt-2 font-display text-3xl text-cream">We have it.</h1>
        <p className="mt-3 text-sm text-muted">
          Johnny will reach out about hosting a game day for {company}.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <p className="text-xs font-bold tracking-widest text-gold uppercase">The Business Machine Experience</p>
      <h1 className="mt-2 font-display text-3xl text-cream">Host a game day</h1>
      <p className="mt-2 text-sm text-muted">
        Your company runs the board. We bring the cards, the host desk, and the debrief. Leave your details and we will call you.
      </p>
      <Card className="mt-4 space-y-3">
        <Field aria-label="Company" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <Field aria-label="Your name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <Field aria-label="Title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Field aria-label="Mobile" inputMode="tel" placeholder="Mobile" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Field aria-label="Email" inputMode="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="grid grid-cols-[1fr_6rem] gap-2">
          <Field aria-label="City" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <Field aria-label="State" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <Field aria-label="About how many people" placeholder="About how many people" value={headcount} onChange={(e) => setHeadcount(e.target.value)} />
        <Field aria-label="When you want it" placeholder="When you want it" value={timing} onChange={(e) => setTiming(e.target.value)} />
        <textarea
          aria-label="Notes"
          placeholder="Anything we should know"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-24 w-full rounded-xl border border-line bg-navy px-3 py-2 text-sm text-cream outline-none"
        />
        <label className="flex items-start gap-3 text-sm text-cream">
          <input type="checkbox" className="mt-1 size-5 accent-[#d4a05c]" checked={contact} onChange={(e) => setContact(e.target.checked)} />
          <span>You can contact me about hosting a game day.</span>
        </label>
        {err ? <p className="text-sm text-orange-ink">{err}</p> : null}
        <Btn className="w-full" disabled={busy || !contact} onClick={() => void submit()}>
          {busy ? "Sending…" : "Send my details"}
        </Btn>
      </Card>
    </main>
  );
}
