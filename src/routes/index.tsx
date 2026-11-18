import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { readSeat } from "@/lib/metalcon/session";
import { useEffect, useState } from "react";
import { addHost, createGame, deleteGame, listGames, removeHost, resetGame, resumeHost, setProfileRank } from "@/lib/game/api";
import { adminToken, readProfileSession, readSlot, setAdminToken, writeSlot } from "@/lib/game/session";
import { PHASES, type GameSummary } from "@/lib/game/types";
import { BrandBar, Btn, Card, Field } from "@/components/game/ui";
import { InsightsPanel } from "@/components/game/insights-panel";
import { ProfileBlock } from "@/components/game/profile-block";

export const Route = createFileRoute("/")({
  ssr: false,
  component: Home,
});

const STATUS: Record<string, string> = {
  lobby: "Not started",
  live: "In progress",
  audit: "Scoring",
  post: "Post-game",
  done: "Finished",
};

function ago(iso: string): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 36) return `${hours} hr ago`;
  return new Date(iso).toLocaleDateString();
}

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const saved = readSeat();
    if (saved && saved.dept !== "General Manager") void navigate({ to: "/soebld/play", search: { seat: saved.id } });
  }, [navigate]);
  const [company, setCompany] = useState("");
  const [code, setCode] = useState("");
  const [rehearsal, setRehearsal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [opening, setOpening] = useState("");
  const [err, setErr] = useState("");
  const [games, setGames] = useState<GameSummary[] | null>(null);
  const [deskOpen, setDeskOpen] = useState(false);
  const [deskDraft, setDeskDraft] = useState("");
  const [tick, setTick] = useState(0);
  const [pending, setPending] = useState<{ code: string; action: "reset" | "delete" } | null>(null);
  const [hostFor, setHostFor] = useState("");
  const [hostName, setHostName] = useState("");
  const [issued, setIssued] = useState<{ code: string; key: string; label: string } | null>(null);
  const [acting, setActing] = useState("");
  const [tab, setTab] = useState<"games" | "insights">("games");
  const [rank, setRank] = useState<"super" | "host" | "player">("player");
  const [staffName, setStaffName] = useState("");
  const [staffRank, setStaffRank] = useState("host");
  const [staffNote, setStaffNote] = useState("");
  const [authed, setAuthed] = useState(() => Boolean(readProfileSession()));

  function secret() {
    return readProfileSession()?.secret ?? "";
  }

  useEffect(() => {
    const sync = () => setAuthed(Boolean(readProfileSession()));
    window.addEventListener("bm-session", sync);
    return () => window.removeEventListener("bm-session", sync);
  }, []);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("bm-host-key");
      if (!raw) return;
      const saved = JSON.parse(raw) as { code?: string; key?: string; label?: string };
      if (saved.code && saved.key && saved.label) {
        setIssued({ code: saved.code, key: saved.key, label: saved.label });
        setHostFor(saved.code);
      }
    } catch {
      sessionStorage.removeItem("bm-host-key");
    }
  }, []);

  useEffect(() => {
    let stop = false;
    async function load() {
      try {
        const res = await listGames({ data: { adminToken: adminToken(), profileSecret: secret() } });
        if (!stop && res.ok) {
          setGames(res.games);
          setRank(res.rank);
        }
      } catch {
        if (!stop) setGames([]);
      }
    }
    void load();
    const id = window.setInterval(() => void load(), 4000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [deskOpen, tick]);

  async function host() {
    setBusy(true);
    setErr("");
    try {
      const res = await createGame({ data: { company, rehearsal, adminToken: adminToken(), profileSecret: secret() } });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      writeSlot(res.code, { hostToken: res.hostToken });
      await navigate({ to: "/g/$code/host", params: { code: res.code } });
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not open the game.");
    } finally {
      setBusy(false);
    }
  }

  async function openGame(gameCode: string) {
    setOpening(gameCode);
    setErr("");
    try {
      const resumed = await resumeHost({
        data: { code: gameCode, adminToken: adminToken(), hostToken: readSlot(gameCode).hostToken, profileSecret: secret() },
      });
      if (!resumed.ok) {
        setErr(resumed.error);
        return;
      }
      writeSlot(gameCode, { hostToken: resumed.hostToken });
      await navigate({ to: "/g/$code/host", params: { code: gameCode } });
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not open that game.");
    } finally {
      setOpening("");
    }
  }

  async function manage(action: "reset" | "delete", gameCode: string) {
    setActing(gameCode);
    setErr("");
    try {
      const call = action === "reset" ? resetGame : deleteGame;
      const res = await call({ data: { code: gameCode, adminToken: adminToken(), profileSecret: secret() } });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      setPending(null);
      setTick((n) => n + 1);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not update that game.");
    } finally {
      setActing("");
    }
  }

  async function createHost(gameCode: string) {
    setActing(gameCode);
    setErr("");
    try {
      const res = await addHost({ data: { code: gameCode, adminToken: adminToken(), label: hostName, profileSecret: secret() } });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      setIssued({ code: gameCode, key: res.key, label: res.label });
      sessionStorage.setItem(
        "bm-host-key",
        JSON.stringify({ code: gameCode, key: res.key, label: res.label }),
      );
      setHostName("");
      setTick((n) => n + 1);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not add that host.");
    } finally {
      setActing("");
    }
  }

  async function dropHost(gameCode: string, adminId: string) {
    setActing(gameCode);
    setErr("");
    try {
      const res = await removeHost({ data: { code: gameCode, adminToken: adminToken(), adminId, profileSecret: secret() } });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      setTick((n) => n + 1);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not remove that host.");
    } finally {
      setActing("");
    }
  }

  async function assignStaff() {
    setActing("staff");
    setErr("");
    setStaffNote("");
    try {
      const res = await setProfileRank({
        data: { adminToken: adminToken(), profileSecret: secret(), username: staffName, rank: staffRank },
      });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      setStaffNote(`${res.username} is now ${res.label}.`);
      setStaffName("");
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not update that profile.");
    } finally {
      setActing("");
    }
  }

  if (!authed) return <FrontDoor />;

  return (
    <div className="min-h-screen bg-navy">
      <BrandBar light />
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:py-14">
        <div>
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">School of Entrepreneurship</p>
          <h1 className="mt-2 font-display text-5xl leading-tight text-cream sm:text-6xl">
            The Business Machine
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink">
            The board stays on the table. Phones answer the People & Principles cards, the host runs the
            clocks and the money, and the projector shows one company score.
          </p>
          <Link
            to="/soebld"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-gold px-5 text-sm font-semibold text-navy"
          >
            SOEBLD
          </Link>
          <dl className="mt-6 grid grid-cols-3 gap-3 max-w-lg">
            <Stat k="Rounds" v="8" />
            <Stat k="Win" v="$100k" />
            <Stat k="Leader" v="$250k" />
          </dl>
        </div>
        <Card>
          <h2 className="font-display text-2xl text-cream">{rank === "super" ? "Super Admin" : rank === "host" ? "Host Admin" : "Host the room"}</h2>
          <label className="mt-3 block text-sm font-semibold text-muted" htmlFor="company">
            Company name
          </label>
          <Field id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Apex Home Services" />
          <label className="mt-3 flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={rehearsal} onChange={(e) => setRehearsal(e.target.checked)} />
            Rehearsal — label it so it is not a live cohort
          </label>
          <Btn className="mt-4 w-full" disabled={busy} onClick={() => void host()}>
            {busy ? "Opening…" : rank === "player" ? "Open control room" : "Open control room"}
          </Btn>
          {err ? <p className="mt-3 text-sm text-orange-ink">{err}</p> : null}
          <div className="my-5 h-px bg-line" />
          <h2 className="font-display text-2xl text-cream">Join with a code</h2>
          <div className="mt-3 flex gap-2">
            <Field
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              aria-label="Game code"
              maxLength={8}
            />
            <Btn
              kind="navy"
              onClick={() => {
                const cleaned = code.replace(/[^A-Z0-9]/gi, "").toUpperCase();
                if (cleaned.length < 4) {
                  setErr("Enter the six-character code.");
                  return;
                }
                window.location.href = `/g/${cleaned}/join`;
              }}
            >
              Join
            </Btn>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <div className="mb-4 flex gap-2">
            <button type="button" className={`min-h-10 rounded-full px-4 text-sm font-semibold ${tab === "games" ? "bg-gold text-navy" : "bg-navy-2 text-cream"}`} onClick={() => setTab("games")}>
              Games
            </button>
            <button type="button" className={`min-h-10 rounded-full px-4 text-sm font-semibold ${tab === "insights" ? "bg-gold text-navy" : "bg-navy-2 text-cream"}`} onClick={() => setTab("insights")}>
              Insights
            </button>
            <a href="/me" className="min-h-10 rounded-full bg-navy-2 px-4 py-2 text-sm font-semibold text-cream">
              Player profile
            </a>
          </div>
          {tab === "insights" ? <InsightsPanel /> : (
          <>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="font-display text-2xl text-cream">{rank === "super" ? "All games" : "Your games"}</h2>
              <p className="mt-1 text-sm text-muted">
                {rank === "super"
                  ? "Super Admin sees every game. Host Admins only see the games under them. GM is a seat in the game, not this desk."
                  : rank === "host"
                    ? "These are the games under your Host Admin profile. Reset and delete stay on your games. A GM at the table cannot open this desk."
                    : "A Host Admin profile, or the Super Admin key, is required to run games. The GM seat plays the round. It does not run the desk."}
              </p>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-cream underline"
              onClick={() => setDeskOpen((v) => !v)}
            >
              {deskOpen ? "Hide key" : rank === "host" ? "Host Admin key" : "Super Admin key"}
            </button>
          </div>
          {deskOpen ? (
            <div className="mt-3 rounded-xl bg-navy-2 p-3">
              <p className="text-sm text-ink">
                This key is how this browser finds your games after an update. Copy it before you switch computers. A Host Admin key for one game is separate.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Btn
                  kind="navy"
                  onClick={() => void navigator.clipboard?.writeText(adminToken())}
                >
                  Copy {rank === "host" ? "Host Admin" : "Super Admin"} key
                </Btn>
              </div>
              <label className="mt-3 block text-sm font-semibold text-muted" htmlFor="desk-key">
                Paste a Super Admin key or a Host Admin key
              </label>
              <div className="mt-1 flex gap-2">
                <Field
                  id="desk-key"
                  value={deskDraft}
                  onChange={(e) => setDeskDraft(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                />
                <Btn
                  kind="ghost"
                  onClick={() => {
                    if (!setAdminToken(deskDraft)) {
                      setErr("That key is too short.");
                      return;
                    }
                    setDeskDraft("");
                    setDeskOpen(false);
                    setTick((n) => n + 1);
                  }}
                >
                  Use key
                </Btn>
              </div>
            </div>
          ) : null}
          {rank === "super" ? (
            <div className="mt-4 rounded-xl bg-navy-2 p-3">
              <p className="text-sm font-semibold text-cream">Staff profiles</p>
              <p className="mt-1 text-sm text-muted">A Host Admin runs the games under their name. Super Admin can open every game, the reports, and this list. The GM seat is not a staff role.</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Field aria-label="Staff username" value={staffName} onChange={(e) => setStaffName(e.target.value)} placeholder="Their username" />
                <select aria-label="Staff role" value={staffRank} onChange={(e) => setStaffRank(e.target.value)} className="min-h-11 rounded-xl border border-line bg-card px-3 text-sm text-cream">
                  <option value="host">Host Admin</option>
                  <option value="super">Super Admin</option>
                  <option value="player">Player</option>
                </select>
                <Btn kind="navy" disabled={acting === "staff"} onClick={() => void assignStaff()}>
                  {acting === "staff" ? "Saving…" : "Save role"}
                </Btn>
              </div>
              {staffNote ? <p className="mt-2 text-sm text-gold">{staffNote}</p> : null}
            </div>
          ) : null}
          <ul className="mt-4 space-y-3">
            {games === null ? (
              <li className="text-sm text-muted">Loading games…</li>
            ) : games.length === 0 ? (
              <li className="text-sm text-muted">
                No games on this desk yet. Games stay saved when the site is updated. On a new computer, paste the Super Admin key.
              </li>
            ) : (
              games.map((game) => {
                const phase = PHASES.find((p) => p.n === game.phase)?.label ?? "";
                const ask = pending?.code === game.code ? pending.action : null;
                return (
                  <li key={game.code} className="rounded-2xl border border-line bg-navy-2 px-4 py-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl text-cream">
                          {game.company}
                          {game.rehearsal ? <span className="ml-2 text-sm font-semibold text-orange">Rehearsal</span> : null}
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          {game.code} · {game.players} seated · {ago(game.updatedAt)}
                          {game.owned ? "" : " · not locked to this desk yet"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${game.status === "live" ? "text-orange" : "text-cream"}`}>
                          {STATUS[game.status] ?? game.status}
                        </p>
                        <p className="text-sm text-muted">
                          Round {game.round}
                          {game.status === "live" || game.status === "audit" ? ` · ${phase}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Btn kind="navy" disabled={opening === game.code || acting === game.code} onClick={() => void openGame(game.code)}>
                        {opening === game.code ? "Opening…" : "Open"}
                      </Btn>
                      <Btn kind="ghost" disabled={acting === game.code} onClick={() => setPending({ code: game.code, action: "reset" })}>
                        Reset
                      </Btn>
                      <Btn kind="ghost" disabled={acting === game.code} onClick={() => setPending({ code: game.code, action: "delete" })}>
                        Delete
                      </Btn>
                      {rank === "super" ? (
                      <Btn
                        kind="ghost"
                        onClick={() => {
                          setHostFor((current) => (current === game.code ? "" : game.code));
                          setIssued(null);
                        }}
                      >
                        Host Admins
                      </Btn>
                      ) : null}
                    </div>
                    {ask ? (
                      <div className="mt-3 rounded-xl bg-navy-2 p-3">
                        <p className="text-sm text-ink">
                          {ask === "reset"
                            ? "Reset this game? The code stays. The board, roster, and log clear."
                            : "Delete this game? It leaves this desk. Other games stay."}
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Btn kind="primary" disabled={acting === game.code} onClick={() => void manage(ask, game.code)}>
                            {acting === game.code ? "Working…" : ask === "reset" ? "Reset this game" : "Delete this game"}
                          </Btn>
                          <Btn kind="ghost" onClick={() => setPending(null)}>
                            Cancel
                          </Btn>
                        </div>
                      </div>
                    ) : null}
                    {hostFor === game.code ? (
                      <div className="mt-3 rounded-xl bg-navy-2 p-3">
                        <p className="text-sm font-semibold text-cream">Host Admins for {game.code}</p>
                        <ul className="mt-2 space-y-1">
                          {game.hosts.length ? (
                            game.hosts.map((host) => (
                              <li key={host.id} className="flex items-center justify-between gap-2 text-sm">
                                <span>
                                  {host.label}
                                  {host.yours ? " · this desk" : ""}
                                </span>
                                {host.yours ? null : (
                                  <button
                                    type="button"
                                    className="text-sm font-semibold text-cream underline"
                                    onClick={() => void dropHost(game.code, host.id)}
                                  >
                                    Remove
                                  </button>
                                )}
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-muted">No Host Admins yet.</li>
                          )}
                        </ul>
                        <label className="mt-3 block text-sm font-semibold text-muted" htmlFor={`host-${game.code}`}>
                          Host Admin name
                        </label>
                        <div className="mt-1 flex gap-2">
                          <Field
                            id={`host-${game.code}`}
                            value={hostName}
                            onChange={(e) => setHostName(e.target.value)}
                            placeholder="Alex"
                          />
                          <Btn kind="navy" disabled={acting === game.code} onClick={() => void createHost(game.code)}>
                            Create key
                          </Btn>
                        </div>
                        {issued?.code === game.code ? (
                          <div className="mt-3">
                            <p className="text-sm text-ink">
                              Send this key to {issued.label}. They paste it under Super Admin key on their computer. It opens only the games you add them to. It is shown only now.
                            </p>
                            <p className="mt-2 break-all rounded-lg bg-card px-3 py-2 font-mono text-sm text-cream">{issued.key}</p>
                            <Btn kind="ghost" className="mt-2" onClick={() => void navigator.clipboard?.writeText(issued.key)}>
                              Copy host key
                            </Btn>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </li>
                );
              })
            )}
          </ul>
          </>
          )}
        </Card>
      </main>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-gold/40 bg-navy-2 px-3 py-3 text-cream">
      <p className="text-[11px] font-semibold tracking-wider text-gold uppercase">{k}</p>
      <p className="font-display text-2xl">{v}</p>
    </div>
  );
}

function FrontDoor() {
  const [login, setLogin] = useState(false);
  return (
    <div className="flex min-h-screen items-center bg-navy">
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <img
          src="/logo-tlp.png"
          alt="The School of Entrepreneurship, Trades Leadership Program"
          className="mx-auto h-auto w-full rounded-2xl"
        />
        <div className="mt-8 grid gap-3">
          <Link
            to="/soebld"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gold px-5 text-sm font-semibold text-navy"
          >
            SOEBLD
          </Link>
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-gold bg-transparent px-5 text-sm font-semibold text-gold"
            onClick={() => setLogin((open) => !open)}
          >
            INICIAR SESIÓN
          </button>
        </div>
        {login ? (
          <Card className="mt-4">
            <ProfileBlock start="return" onReady={() => undefined} />
          </Card>
        ) : null}
      </main>
    </div>
  );
}
