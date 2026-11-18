import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { joinGame, previewSeat, readGame } from "@/lib/game/api";
import { displayName } from "@/lib/game/format";
import { inAppBrowser, systemBrowserHref } from "@/lib/game/join-url";
import { SEAT_DEPTS, type PublicPlayer } from "@/lib/game/types";
import { readProfileSession, readSlot, writeSlot } from "@/lib/game/session";
import { ProfileBlock } from "@/components/game/profile-block";
import { BrandBar, Btn, Card, Field, Select } from "@/components/game/ui";

export const Route = createFileRoute("/g/$code/join")({
  ssr: false,
  component: JoinPage,
});

function JoinPage() {
  const { code } = Route.useParams();
  const game = code.toUpperCase();
  const navigate = useNavigate();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [dept, setDept] = useState<string>(SEAT_DEPTS[0]);
  const [lockedRole, setLockedRole] = useState(false);
  const [open, setOpen] = useState<PublicPlayer[]>([]);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [inApp, setInApp] = useState(false);
  const [profileReady, setProfileReady] = useState(() => Boolean(readProfileSession()));
  const [seat] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("seat") ?? "";
  });
  const [assigned, setAssigned] = useState<{ name: string; dept: string; claimed: boolean; active: boolean } | null>(null);
  const [seatErr, setSeatErr] = useState("");
  const [seatLoading, setSeatLoading] = useState(Boolean(seat));

  useEffect(() => {
    const saved = readSlot(game);
    if (saved.playerId && saved.playerToken) {
      void navigate({ to: "/g/$code/play", params: { code: game } });
      return;
    }
    setInApp(inAppBrowser(navigator.userAgent));
    if (seat) {
      void previewSeat({ data: { code: game, seat } }).then((res) => {
        if (!res.ok) {
          setSeatErr(res.error);
          setSeatLoading(false);
          return;
        }
        setAssigned({ name: res.name, dept: res.dept, claimed: res.claimed, active: res.active });
        const parts = res.name.split(" ");
        const lastName = parts.pop() ?? "";
        setFirst(parts.join(" ") || res.name);
        setLast(lastName.length < 2 ? "" : lastName);
        setDept(res.dept);
        setLockedRole(true);
        setSeatLoading(false);
      });
      return;
    }
    void readGame({ data: { code: game } }).then((res) => {
      if (!res.ok) return;
      setOpen(res.view.players.filter((p) => p.active && !p.claimed));
    });
  }, [game, seat]);

  function claim(player: PublicPlayer) {
    const parts = player.name.split(" ");
    const lastName = parts.pop() ?? "";
    setFirst(parts.join(" ") || player.name);
    setLast(lastName.length < 2 ? "" : lastName);
    setDept(player.dept);
    setLockedRole(true);
    setErr("");
  }

  async function join() {
    const profile = readProfileSession();
    if (!profile) {
      setErr("Save a username first. It stays off the board.");
      return;
    }
    const name = displayName(first, last);
    setBusy(true);
    setErr("");
    try {
      const res = await joinGame({ data: { code: game, name, dept, seat, profileSecret: profile.secret } });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      writeSlot(game, {
        playerId: res.playerId,
        playerToken: res.playerToken,
        name: res.view.players.find((p) => p.id === res.playerId)?.name,
      });
      await navigate({ to: "/g/$code/play", params: { code: game } });
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not join.");
    } finally {
      setBusy(false);
    }
  }

  const browserHref =
    typeof window === "undefined" ? "" : systemBrowserHref(window.location.href, navigator.userAgent);

  return (
    <div className="min-h-screen bg-navy">
      <BrandBar />
      <main className="mx-auto max-w-md px-4 py-6">
        {inApp ? (
          <Card className="mb-3 border-gold">
            <h1 className="font-display text-2xl text-cream">Open this in your browser</h1>
            <p className="mt-2 text-sm text-ink">
              This page opened inside an app. The game runs in Safari or Chrome. You do not need the Grok app.
            </p>
            <a href={browserHref} className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-navy">
              Open in Safari or Chrome
            </a>
          </Card>
        ) : null}
        <Card>
          <p className="text-xs font-bold tracking-widest text-gold uppercase">Game {game}</p>
          {seatLoading ? (
            <p className="mt-3 text-cream">Opening your seat…</p>
          ) : assigned && !assigned.active ? (
            <>
              <h1 className="mt-1 font-display text-3xl text-cream">This seat is excused</h1>
              <p className="mt-2 text-sm text-muted">Ask the GM to restore {assigned.name} before you join.</p>
            </>
          ) : assigned?.claimed ? (
            <>
              <h1 className="mt-1 font-display text-3xl text-cream">Welcome back</h1>
              <p className="mt-2 font-display text-2xl text-cream">{assigned.name}</p>
              <p className="text-sm font-semibold text-gold">{assigned.dept}</p>
              <p className="mt-2 text-sm text-muted">This link puts you back in your seat, even after a refresh.</p>
              <ProfileBlock onReady={() => setProfileReady(true)} onClear={() => setProfileReady(false)} />
              {err ? <p className="mt-3 text-sm text-orange-ink">{err}</p> : null}
              <Btn className="mt-4 w-full" disabled={busy || !profileReady} onClick={() => void join()}>
                {busy ? "Opening…" : `Open ${assigned.name}'s seat`}
              </Btn>
            </>
          ) : assigned ? (
            <>
              <h1 className="mt-1 font-display text-3xl text-cream">Your seat</h1>
              <p className="mt-2 font-display text-2xl text-cream">{assigned.name}</p>
              <p className="text-sm font-semibold text-orange">{assigned.dept}</p>
              <p className="mt-2 text-sm text-muted">This opens in the phone browser. The table uses the name the GM assigned.</p>
              <ProfileBlock onReady={() => setProfileReady(true)} onClear={() => setProfileReady(false)} />
              {err ? <p className="mt-3 text-sm text-orange-ink">{err}</p> : null}
              <Btn className="mt-4 w-full" disabled={busy || !profileReady} onClick={() => void join()}>
                {busy ? "Joining…" : `Join as ${assigned.name}`}
              </Btn>
            </>
          ) : (
            <>
          <h1 className="mt-1 font-display text-3xl text-cream">Take a seat</h1>
          <p className="mt-2 text-sm text-muted">
            Your real first and last name is what the table sees. Your username is only for your profile and for the host to find you.
          </p>
          {seatErr ? <p className="mt-3 text-sm text-orange-ink">{seatErr}</p> : null}
          <ProfileBlock onReady={() => setProfileReady(true)} onClear={() => setProfileReady(false)} />
          {open.length ? (
            <div className="mt-4">
              <p className="text-sm font-semibold text-cream">The GM already assigned these seats</p>
              <ul className="mt-2 space-y-2">
                {open.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => claim(p)}
                      className="flex min-h-11 w-full items-center justify-between rounded-xl border border-line bg-navy-2 px-3 py-2 text-left"
                    >
                      <span className="font-semibold text-cream">{p.name}</span>
                      <span className="text-sm text-muted">{p.dept}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <label className="mt-4 block text-sm font-semibold text-muted" htmlFor="first">
            First name
          </label>
          <Field id="first" value={first} onChange={(e) => setFirst(e.target.value)} autoComplete="given-name" />
          <label className="mt-3 block text-sm font-semibold text-muted" htmlFor="last">
            Last name
          </label>
          <Field id="last" value={last} onChange={(e) => setLast(e.target.value)} autoComplete="family-name" />
          <label className="mt-3 block text-sm font-semibold text-muted" htmlFor="dept">
            Role
          </label>
          {lockedRole ? (
            <p id="dept" className="mt-1 rounded-xl bg-navy-2 px-3 py-3 font-semibold text-cream">
              {dept}
            </p>
          ) : (
            <Select id="dept" value={dept} onChange={(e) => setDept(e.target.value)}>
              {SEAT_DEPTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </Select>
          )}
          {err ? <p className="mt-3 text-sm text-orange-ink">{err}</p> : null}
          <Btn className="mt-4 w-full" disabled={busy || !profileReady} onClick={() => void join()}>
            {busy ? "Joining…" : "Join the table"}
          </Btn>
          <a href={`/g/${game}/room`} className="mt-4 block text-center text-sm font-semibold text-cream">
            This screen is the projector
          </a>
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
