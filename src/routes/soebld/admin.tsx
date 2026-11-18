import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  adminDesk,
  adminEnter,
  resetPassword,
  changeAdminPassword,
  createHost,
  endGame,
  exportGame,
  exportHostLeads,
  placePlayer,
  reopenGame,
  resetGame,
  sendSeatLink,
  setShareSeat,
  setSignup,
  startGame,
  setFixedCost,
  setBasePayroll,
} from "@/lib/metalcon/api";
import { METALCON_SEAT_LABEL, METALCON_SEATS } from "@/lib/metalcon/seats";
import { Btn, Card, Field, Select } from "@/components/game/ui";

export const Route = createFileRoute("/soebld/admin")({
  loader: async () => {
    console.log("ADMIN LOADER START");

    return null;
  },
  component: AdminPage,
});

const KEY = "soe-metalcon-admin";
function store(op: "get" | "set" | "del", value = ""): string { try { if (op === "get") return sessionStorage.getItem(KEY) ?? ""; if (op === "set") sessionStorage.setItem(KEY, value); else sessionStorage.removeItem(KEY); } catch { } return ""; }

type Game = {
  id: string;
  n: number;
  status: string;
  slug: string;
  eventName: string;
  hostName: string;
  shareSeat: boolean;
  registrationOpen: boolean;
  players: number;
  answers: number;
};

type Lead = {
  id: string;
  company: string;
  contact_name: string;
  title: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  headcount: string;
  timing: string;
  notes: string;
};

type Desk = {
  role: "super" | "host";
  name: string;
  nextNumber: number;
  hosts: { id: string; name: string; email: string; role: string }[];
  leads: Lead[];
  games: Game[];
  players: { id: string; name: string; phone: string; email: string; dept: string; invite_token: string | null; game_id: string; company?: string; job_title?: string }[];
};

function fileOf(value: unknown): { filename: string; csv: string } | null {
  if (!value || typeof value !== "object") return null;
  const row = value as { filename?: unknown; csv?: unknown };
  if (typeof row.filename !== "string" || typeof row.csv !== "string") return null;
  return { filename: row.filename, csv: row.csv };
}

function saveCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function AdminPage() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [desk, setDesk] = useState<Desk | null>(null);
  const [gameId, setGameId] = useState("");
  const [eventName, setEventName] = useState("The Business Machine Experience");
  const [actionMode, setActionMode] = useState("digital");
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");
  const [seatLink, setSeatLink] = useState("");
  const [gmLink, setGmLink] = useState("");
  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [dept, setDept] = useState<string>(METALCON_SEATS[0]);
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [hostPassword, setHostPassword] = useState("");
  const [fixedAmount, setFixedAmount] = useState("2000");
  const [fixedRound, setFixedRound] = useState("3");
  const [payrollBase, setPayrollBase] = useState("3200");
  const [qr, setQr] = useState("");

  useEffect(() => {
    document.title = "SOEBLD host";
    const saved = store("get");
    if (saved && saved !== "undefined" && saved !== "null") setToken(saved); else if (saved) store("del");
  }, []);

  async function load(next = token) {
    if (!next) return;
    const res = await adminDesk({ data: { token: next } });
    if (!res.ok) {
      store("del");
      setToken("");
      setDesk(null);
      setErr(res.error);
      return;
    }
    setDesk(res);
    setGameId((current) => (res.games.some((game) => game.id === current) ? current : res.games.find((game) => game.status === "live")?.id ?? res.games[0]?.id ?? ""));
  }

  useEffect(() => {
    if (!token) return;
    void load(token);
  }, [token]);

  const game = desk?.games.find((item) => item.id === gameId) ?? null;
  const seated = (desk?.players ?? []).filter((player) => player.game_id === gameId);

  useEffect(() => {
    if (!game?.slug) {
      setQr("");
      return;
    }
    const url = `${window.location.origin}/soebld/join/${game.slug}`;
    void QRCode.toDataURL(url, { margin: 1, width: 480, color: { dark: "#0c1230", light: "#f6f1e4" } }).then(setQr);
  }, [game?.slug]);

  async function enter() {
    setBusy(true);
    setErr("");
    if (resetMode) {
      const res = await resetPassword({ data: { email } });
      setBusy(false);
      setErr(res.ok ? "Check your email for a temporary password." : res.error);
      if (res.ok) setResetMode(false);
      return;
    }
    try {
      const res: unknown = await adminEnter({ data: { password, email } });
      if (res instanceof Response) { setBusy(false); setErr(`Sign-in failed (HTTP ${res.status}, ${res.headers.get("content-type") ?? "no type"}). Reload the page and try again.`); return; }
      const r = res as { ok?: boolean; token?: unknown; error?: string } | null;
      if (!r || r.ok !== true || typeof r.token !== "string" || !r.token) { setBusy(false); setErr(r?.error || "Login failed. Check the password."); return; }
      setBusy(false);
      store("set", r.token);
      setPassword("");
      setToken(r.token);
    } catch (e) {
      setBusy(false);
      setErr(e instanceof Error ? e.message : "Server error. Try again.");
    }
  }

  async function openGame() {
    if (!token) return;
    setBusy(true);
    setErr("");
    setNote("");
    const res = await startGame({ data: { token, eventName, actionMode } });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setNote(`Game ${res.n} is open at /soebld/join/${res.slug}`);
    await load();
  }

  async function closeGame() {
    if (!game) return;
    if (!window.confirm(`Close ${game.slug}? The file downloads, and every seat for this game stops working. Other games stay open.`)) return;
    setBusy(true);
    setErr("");
    const res = await endGame({ data: { token, gameId: game.id } });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    const file = fileOf(res);
    if (file) saveCsv(file.filename, file.csv);
    setNote(`${game.slug} is closed.`);
    await load();
  }

  async function reopen() {
    if (!game) return;
    if (!window.confirm(`Reopen ${game.slug}? Sign-up stays closed until you turn it on. Johnny is notified.`)) return;
    setBusy(true);
    const res = await reopenGame({ data: { token, gameId: game.id } });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setNote(`${game.slug} is open again. Sign-up is still closed.`);
    await load();
  }

  async function savePassword() {
    if (newPass !== confirmPass) { setErr("Passwords don't match."); return; }
    const res = await changeAdminPassword({ data: { token, current: curPass, next: newPass } });
    if (!res.ok) { setErr(res.error); return; }
    setCurPass(""); setNewPass(""); setConfirmPass("");
    setNote("Admin password changed. Use the new one next time.");
  }
  async function issueGmLink(gameId: string) {
    setBusy(true);
    const res = await placePlayer({ data: { token, gameId, name: "GM", phone: "5555550100", email: "gm@game.local", dept: "General Manager" } });
    setBusy(false);
    if (res.ok) setGmLink(`${window.location.origin}/soebld/go?id=${res.player.id}&k=${res.player.token}`);
    else setErr(res.error);
  }
  async function place() {
    if (!game) return;
    setBusy(true);
    setErr("");
    const res = await placePlayer({ data: { token, gameId: game.id, name, phone, email: playerEmail, dept } });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setName("");
    setPhone("");
    setPlayerEmail("");
    setNote(`${res.player.name} is seated in ${res.player.dept}.`);
    setSeatLink(`${window.location.origin}/soebld/go?id=${res.player.id}&k=${res.player.token}`);
    await load();
  }

  async function addHost() {
    setBusy(true);
    setErr("");
    const res = await createHost({ data: { token, name: hostName, email: hostEmail, password: hostPassword } });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setHostName("");
    setHostEmail("");
    setHostPassword("");
    setNote("Host added. They sign in with that email and password.");
    await load();
  }

  if (!token) {
    return (
      <main className="mx-auto min-h-dvh max-w-sm px-4 py-10">
        <p className="text-xs font-bold tracking-widest text-gold uppercase">The Business Machine Experience</p>
        <h1 className="mt-2 font-display text-3xl text-cream">Host</h1>
        <Card className="mt-4 space-y-3">
          <Field aria-label="Email" placeholder="Email, hosts only" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Field type="password" aria-label="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") void enter(); }} />
          <button type="button" className="text-xs text-gold" onClick={() => setResetMode(true)}>Forgot password</button>
          <p className="text-xs text-muted">Super admin leaves the email blank. A host uses the email they were given.</p>
          {err ? <p className="text-sm text-orange-ink">{err}</p> : null}
          <Btn className="w-full" disabled={busy || password.length < 1} onClick={() => void enter()}>Open the host desk</Btn>
          <p className="text-center text-[10px] text-cream/40">build 0214-f29z.8</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <p className="text-xs font-bold tracking-widest text-gold uppercase">{desk?.role === "super" ? "Super admin" : "Host"} · {desk?.name}</p>
      <h1 className="mt-2 font-display text-3xl text-cream">Games</h1>
      <Card className="mt-4 space-y-2">
        <Field aria-label="Event name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        <Select aria-label="Action cards" value={actionMode} onChange={(e) => setActionMode(e.target.value)}><option value="digital">Digital action cards</option><option value="manual">Manual action cards</option></Select>
        <Btn disabled={busy} onClick={() => void openGame()}>Start game {desk?.nextNumber ?? 1}</Btn>
        <p className="text-xs text-muted">This does not close the other games. The link is dated and uses SOEBLD. The event name stays off the address.</p>
      </Card>
      {note ? <p className="mt-3 break-all text-sm text-gold">{note}</p> : null}
      {err ? <p className="mt-3 text-sm text-orange-ink">{err}</p> : null}

      <div className="mt-4 space-y-2">
        {(desk?.games ?? []).map((item) => (
          <button key={item.id} type="button" onClick={() => setGameId(item.id)} className={`w-full rounded-2xl border px-3 py-3 text-left ${item.id === gameId ? "border-gold" : "border-line"}`}>
            <p className="text-sm font-semibold text-cream">{item.eventName} · Game {item.n} · {item.status}</p>
            <p className="text-xs text-muted">{item.slug} · {item.hostName} · {item.players} players</p>
          </button>
        ))}
      </div>

      {game ? (
        <Card className="mt-4">
          <h2 className="font-display text-xl text-cream">{game.eventName}</h2>
          <p className="mt-1 break-all text-xs text-gold">/soebld/join/{game.slug} <button type="button" className="ml-2 rounded border border-gold px-2 py-0.5 text-[10px] text-gold" onClick={() => void navigator.clipboard.writeText(`${window.location.origin}/soebld/join/${game.slug}`)}>Copy</button></p>
          {qr && game.status === "live" ? <img src={qr} alt="QR code for this game" className="mx-auto mt-3 w-full max-w-xs rounded-xl" /> : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {game.status === "live" ? (
              <>
              <Btn kind="navy" disabled={busy} onClick={() => void closeGame()}>End this game</Btn>
              <Btn kind="ghost" disabled={busy || game.status !== "live"} onClick={() => void issueGmLink(game.id)}>GM link</Btn>
              </>
            ) : (
              <Btn disabled={busy} onClick={() => void reopen()}>Reopen</Btn>
            )}
            <Btn kind="ghost" disabled={busy || game.status !== "live"} onClick={() => void resetGame({ data: { token, gameId: game.id } }).then(() => load())}>Reset answers</Btn>
            <Btn kind="ghost" disabled={busy} onClick={() => void exportGame({ data: { token, gameId: game.id } }).then((res) => { const file = fileOf(res); if (file) saveCsv(file.filename, file.csv); else if (!res.ok) setErr(res.error); })}>Download</Btn>
          </div>
          {game.status === "live" ? (
            <>
              <label className="mt-4 flex items-start gap-3 text-sm text-cream">
                <input type="checkbox" className="mt-1 size-5 accent-[#d4a05c]" checked={game.shareSeat} onChange={(e) => { void setShareSeat({ data: { token, gameId: game.id, share: e.target.checked } }).then(() => load()); }} />
                <span>Allow more than one player in the same seat.</span>
              </label>
              <label className="mt-3 flex items-start gap-3 text-sm text-cream">
                <input type="checkbox" className="mt-1 size-5 accent-[#d4a05c]" checked={game.registrationOpen} onChange={(e) => { void setSignup({ data: { token, gameId: game.id, open: e.target.checked } }).then(() => load()); }} />
                <span>Sign-up is open. Turning this on exposes the deck to anyone with the link.</span>
              </label>
            </>
          ) : null}
          {game.status === "live" ? (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-cream">Fixed costs. Default $2,000 starting in round 3.</p>
              <Field aria-label="Fixed cost" inputMode="numeric" value={fixedAmount} onChange={(e) => setFixedAmount(e.target.value.replace(/\D/g, ""))} />
              <Field aria-label="Starting round" inputMode="numeric" value={fixedRound} onChange={(e) => setFixedRound(e.target.value.replace(/\D/g, ""))} />
              <Btn kind="navy" disabled={busy} onClick={() => void setFixedCost({ data: { token, gameId: game.id, amount: Number(fixedAmount), startRound: Number(fixedRound) } }).then((res) => setNote(res.ok ? "Fixed costs saved." : res.error))}>Save fixed costs</Btn>
              <p className="pt-2 text-sm text-cream">Base payroll per department per round. Default $3,200, host can change. Charged for all 5 departments every round.</p>
              <Field aria-label="Base payroll per department" inputMode="numeric" value={payrollBase} onChange={(e) => setPayrollBase(e.target.value.replace(/\D/g, ""))} />
              <Btn kind="navy" disabled={busy} onClick={() => void setBasePayroll({ data: { token, gameId: game.id, amount: Number(payrollBase) } }).then((res) => setNote(res.ok ? "Base payroll saved." : res.error))}>Save base payroll</Btn>
            </div>
          ) : null}
        </Card>
      ) : null}

      {game?.status === "live" ? (
        <Card className="mt-3">
          <h2 className="font-display text-xl text-cream">Place a player</h2>
          <div className="mt-3 space-y-2">
            <Select aria-label="Seat" value={dept} onChange={(e) => setDept(e.target.value)}>
              {METALCON_SEATS.map((seat) => <option key={seat} value={seat}>{METALCON_SEAT_LABEL[seat]}</option>)}
            </Select>
            <Field aria-label="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Field aria-label="Mobile" placeholder="Mobile" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Field aria-label="Player email" placeholder="Email" value={playerEmail} onChange={(e) => setPlayerEmail(e.target.value)} />
            <Btn className="w-full" disabled={busy} onClick={() => void place()}>Seat them</Btn>
            {seatLink ? <div className="mt-2 flex gap-2"><input readOnly value={seatLink} className="flex-1 rounded-xl border border-line bg-transparent px-2 py-1 text-xs text-cream" /><button type="button" className="rounded-xl border border-gold px-3 py-1 text-xs text-gold" onClick={() => void navigator.clipboard.writeText(seatLink)}>Copy</button></div> : null}
            {gmLink ? <div className="mt-2 flex gap-2"><input readOnly value={gmLink} className="flex-1 rounded-xl border border-line bg-transparent px-2 py-1 text-xs text-cream" /><button type="button" className="rounded-xl border border-gold px-3 py-1 text-xs text-gold" onClick={() => void navigator.clipboard.writeText(gmLink)}>Copy GM</button></div> : null}
          </div>
          <ul className="mt-3">
            {seated.map((player) => (
              <li key={player.id} className="border-t border-line py-3 text-sm text-cream">
                <p className="font-semibold">{player.name}</p>
                <p className="text-xs text-muted">{METALCON_SEAT_LABEL[player.dept as keyof typeof METALCON_SEAT_LABEL] ?? player.dept}{[player.company, player.job_title].filter(Boolean).length ? ` · ${[player.company, player.job_title].filter(Boolean).join(" · ")}` : ""} · {player.email}</p>
                <Btn kind="navy" className="mt-2" disabled={busy} onClick={() => void sendSeatLink({ data: { token, playerId: player.id, origin: window.location.origin } }).then((res) => { if (!res.ok) setErr(res.error); else setNote("Link sent."); })}>Send link</Btn>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {desk?.role === "super" ? (
        <Card className="mt-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl text-cream">Game day leads</h2>
            <Btn kind="ghost" disabled={busy} onClick={() => void exportHostLeads({ data: { token } }).then((res) => { const file = fileOf(res); if (file) saveCsv(file.filename, file.csv); else if (!res.ok) setErr(res.error); })}>Download</Btn>
          </div>
          <p className="mt-1 text-xs text-muted">Companies that scanned the host QR. You also get an email when one comes in.</p>
          <ul className="mt-2">
            {(desk.leads ?? []).length === 0 ? <li className="border-t border-line py-2 text-sm text-muted">None yet.</li> : null}
            {(desk.leads ?? []).map((lead) => (
              <li key={lead.id} className="border-t border-line py-3 text-sm text-cream">
                <p className="font-semibold">{lead.company}</p>
                <p className="text-xs text-muted">
                  {lead.contact_name}{lead.title ? ` · ${lead.title}` : ""}
                  {lead.phone ? ` · ${lead.phone}` : ""}
                  {lead.email ? ` · ${lead.email}` : ""}
                </p>
                <p className="text-xs text-muted">
                  {[lead.city, lead.state].filter(Boolean).join(", ")}
                  {lead.headcount ? ` · ${lead.headcount}` : ""}
                  {lead.timing ? ` · ${lead.timing}` : ""}
                </p>
                {lead.notes ? <p className="mt-1 text-xs text-cream">{lead.notes}</p> : null}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {desk?.role === "super" ? (
        <Card className="mt-3">
          <h2 className="font-display text-xl text-cream">Admin password</h2>
          <Field type="password" placeholder="Current password" value={curPass} onChange={(e) => setCurPass(e.target.value)} />
          <Field type="password" placeholder="New password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
          <Field type="password" placeholder="Confirm new password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
          <p className="text-xs text-muted">At least 12 characters. This changes the super admin password for every device.</p>
          <Btn kind="navy" className="w-full" disabled={busy || !curPass || newPass.length < 12 || newPass !== confirmPass} onClick={() => void savePassword()}>Change password</Btn>
        </Card>
      ) : null}
      {desk?.role === "super" ? (
        <Card className="mt-3">
          <h2 className="font-display text-xl text-cream">Hosts</h2>
          <ul className="mt-2">
            {desk.hosts.map((host) => (
              <li key={host.id} className="border-t border-line py-2 text-sm text-cream">{host.name} · {host.email} · {host.role}</li>
            ))}
          </ul>
          <div className="mt-3 space-y-2">
            <Field aria-label="Host name" placeholder="Host name" value={hostName} onChange={(e) => setHostName(e.target.value)} />
            <Field aria-label="Host email" placeholder="Host email" value={hostEmail} onChange={(e) => setHostEmail(e.target.value)} />
            <Field aria-label="Host password" placeholder="Host password" value={hostPassword} onChange={(e) => setHostPassword(e.target.value)} />
            <Btn className="w-full" disabled={busy} onClick={() => void addHost()}>Add host</Btn>
          </div>
        </Card>
      ) : null}
    </main>
  );
}
