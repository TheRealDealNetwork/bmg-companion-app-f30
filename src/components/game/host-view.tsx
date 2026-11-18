import { useEffect, useRef, useState } from "react";
import { toDataURL } from "qrcode";
import { assumeSeat, hostCatalog, lookupCard, lookupUsername, publicJoinLink } from "@/lib/game/api";
import { displayName, formatPhone, money, normalizePhone, pct, seatInviteText } from "@/lib/game/format";
import { isAppOnlyHost, smsHref, withBrowserFlag, withSeat } from "@/lib/game/join-url";
import { writeSlot } from "@/lib/game/session";
import { BOARD_CUE, BOARD_DEPTS, DEPT_SHORT, PHASES, SEAT_DEPTS, type DeptId, type FullCard } from "@/lib/game/types";
import { BrandBar, Btn, Card, CardCopy, ClockReadout, DeptTable, Field, Select, Valuation } from "./ui";
import { BoardCue, ProjectBoard } from "./board";
import { ReportPanel } from "./report-panel";
import { useGame } from "./use-game";

export function HostView({ code }: { code: string }) {
  const game = useGame(code, "host");
  const [key, setKey] = useState("");
  const [err, setErr] = useState("");
  const [panel, setPanel] = useState<"run" | "money" | "cards" | "show" | "report">("run");
  const acting = useRef(false);

  if (!game.enabled) {
    return (
      <div className="min-h-screen bg-navy">
        <BrandBar light />
        <main className="mx-auto max-w-md px-4 py-8">
          <Card>
            <h1 className="font-display text-3xl text-cream">Host key</h1>
            <p className="mt-2 text-sm text-muted">
              This device does not have the host key for {code}. Paste it if you started the game somewhere else.
            </p>
            <Field className="mt-3" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Host key" />
            <Btn className="mt-3 w-full" onClick={() => game.saveHost(key.trim())}>
              Open control room
            </Btn>
          </Card>
        </main>
      </div>
    );
  }

  const view = game.view;
  if (!view) {
    return (
      <div className="min-h-screen bg-navy">
        <BrandBar light />
        <main className="mx-auto max-w-3xl px-4 py-8">
          <p className="text-cream">{game.loading ? "Opening the control room…" : game.error || "Reconnecting…"}</p>
        </main>
      </div>
    );
  }

  async function act(type: string, payload?: Record<string, unknown>) {
    if (acting.current) return { ok: false as const };
    acting.current = true;
    setErr("");
    try {
      const res = await game.host(type, payload);
      if (!res.ok && "error" in res) setErr(res.error);
      return res;
    } finally {
      acting.current = false;
    }
  }

  return (
    <div className="min-h-screen bg-navy pb-16">
      <BrandBar
        light
        trail={
          <div className="text-right">
            <p className="font-display text-lg text-cream">{view.company}</p>
            <p className="text-xs text-gold">{view.rehearsal ? "Rehearsal · " : ""}{code}</p>
          </div>
        }
      />
      <main className="mx-auto max-w-6xl px-4 py-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-gold uppercase">Host Admin</p>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              Round {view.round} of {view.settings.rounds} · {PHASES.find((p) => p.n === view.phase)?.label}
            </p>
            <div className="flex items-baseline gap-4">
              <p>
                <ClockReadout
                  timers={view.timers}
                  serverNow={view.serverNow}
                  which="round"
                  warnAt={60}
                  className="font-display text-5xl tabular-nums"
                />
              </p>
              <p className="text-sm text-muted">
                Game{" "}
                <ClockReadout
                  timers={view.timers}
                  serverNow={view.serverNow}
                  which="game"
                  className="text-sm"
                  calmClass="text-muted"
                />
                {view.timers.paused ? " · paused" : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {view.status === "lobby" ? <Btn onClick={() => void act("start")}>Start game</Btn> : null}
            {view.status === "live" ? (
              <>
                <Btn kind="ghost" onClick={() => void act(view.timers.paused ? "resume" : "pause")}>
                  {view.timers.paused ? "Resume" : "Pause"}
                </Btn>
                <Btn kind="ghost" onClick={() => void act("extend", { target: "round", seconds: 300 })}>
                  +5 min
                </Btn>
                <Btn kind="ghost" onClick={() => void act("resetRound")}>
                  Reset round
                </Btn>
                {view.round < view.settings.rounds ? (
                  <Btn kind="navy" onClick={() => void act("nextRound")}>
                    Next round
                  </Btn>
                ) : (
                  <Btn onClick={() => void act("endGame")}>End game</Btn>
                )}
                {view.settings.rounds < 16 ? (
                  <Btn kind="ghost" onClick={() => void act("addRound")}>
                    Add a round
                  </Btn>
                ) : null}
              </>
            ) : null}
            {view.status === "live" && view.round < view.settings.rounds ? (
              <Btn kind="ghost" onClick={() => void act("endGame")}>
                End early
              </Btn>
            ) : null}
          </div>
          {view.status === "lobby" ? (
            <p className="mt-2 max-w-xl text-sm text-muted">
              {SEAT_DEPTS.filter((dept) => !view.players.some((p) => p.active && p.dept === dept)).length
                ? `Still open: ${SEAT_DEPTS.filter((dept) => !view.players.some((p) => p.active && p.dept === dept)).join(", ")}. The GM plays an event when you start.`
                : "Every seat is filled. Start, and the GM plays one event from the shuffled deck."}
            </p>
          ) : null}
        </div>
        {err ? <p className="mb-3 rounded-xl bg-navy-2 px-3 py-2 text-sm text-orange-ink">{err}</p> : null}
        {view.status === "live" ? (
          <BoardCue view={view} onBack={() => void act("boardBack")} onNext={() => void act("boardNext")} />
        ) : null}
        <div className="mb-3 grid grid-cols-5 gap-1">
          {PHASES.map((p) => (
            <button
              key={p.n}
              type="button"
              disabled={view.status !== "live"}
              onClick={() => void act("phase", { phase: p.n })}
              className={`min-h-11 touch-manipulation rounded-xl text-xs font-bold select-none active:scale-[0.98] sm:text-sm ${view.phase === p.n ? "bg-navy text-cream" : "border border-gold bg-card text-cream"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="mb-4 flex gap-2 overflow-x-auto">
          {(
            [
              ["run", "Room"],
              ["money", "Money"],
              ["cards", "Cards"],
              ["report", "Report"],
              ["show", "Show"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setPanel(id)}
              className={`min-h-10 rounded-full px-4 text-sm font-semibold ${panel === id ? "bg-gold text-navy" : "bg-card text-cream"}`}
            >
              {label}
            </button>
          ))}
          <a className="min-h-10 rounded-full bg-card px-4 py-2 text-sm font-semibold text-cream" href={`/g/${code}/room`}>
            Projector
          </a>
          <a className="min-h-10 rounded-full bg-card px-4 py-2 text-sm font-semibold text-cream" href={`/g/${code}/join`}>
            Join link
          </a>
        </div>

        {panel === "run" ? <Run code={code} game={game} act={act} /> : null}
        {panel === "money" ? <Money game={game} /> : null}
        {panel === "cards" ? <Cards code={code} token={game.slot.hostToken ?? ""} game={game} act={act} /> : null}
        {panel === "report" ? (
          <Card>
            <ReportPanel view={view} />
          </Card>
        ) : null}
        {panel === "show" ? <Show game={game} act={act} /> : null}
      </main>
    </div>
  );
}

function samePhone(draft: string, saved: string): boolean {
  if (!draft.trim() && !saved.trim()) return true;
  const a = normalizePhone(draft);
  const b = normalizePhone(saved);
  return Boolean(a && b && a === b);
}

function usePublicJoin(code: string): string {
  const [url, setUrl] = useState("");
  useEffect(() => {
    let cancelled = false;
    function resolve(saved: string) {
      void publicJoinLink({ data: { code } }).then((res) => {
        if (cancelled) return;
        if (res.ok) {
          setUrl(res.url);
          return;
        }
        if (!isAppOnlyHost(window.location.hostname)) {
          setUrl(withBrowserFlag(`${window.location.origin}/g/${code}/join`));
          return;
        }
        if (saved && !isAppOnlyHost(safeHost(saved))) {
          setUrl(withBrowserFlag(`${saved.replace(/\/$/, "")}/g/${code}/join`));
          return;
        }
        setUrl("");
      });
    }
    resolve(window.localStorage.getItem("bm-public-origin") ?? "");
    const onOrigin = () => resolve(window.localStorage.getItem("bm-public-origin") ?? "");
    window.addEventListener("bm-origin", onOrigin);
    window.addEventListener("storage", onOrigin);
    return () => {
      cancelled = true;
      window.removeEventListener("bm-origin", onOrigin);
      window.removeEventListener("storage", onOrigin);
    };
  }, [code]);
  return url;
}

function SeatPhone({
  playerId,
  name,
  dept,
  company,
  claimed,
  phone,
  invite,
  textedAt,
  joinBase,
  smsReady,
  act,
}: {
  playerId: string;
  name: string;
  dept: string;
  company: string;
  claimed: boolean;
  phone: string;
  invite: string;
  textedAt: number | null;
  joinBase: string;
  smsReady: boolean;
  act: (type: string, payload?: Record<string, unknown>) => Promise<{ ok: boolean }>;
}) {
  const [draft, setDraft] = useState(() => (phone ? formatPhone(phone) : ""));
  const [focused, setFocused] = useState(false);
  const [note, setNote] = useState("");
  const skipBlur = useRef(false);
  useEffect(() => {
    if (!focused) setDraft(phone ? formatPhone(phone) : "");
  }, [phone, focused]);

  const e164 = normalizePhone(draft);
  const link = joinBase && invite ? withSeat(joinBase, invite) : "";
  const body = link ? seatInviteText(company, name, dept, link) : "";
  const href = e164 && body ? smsHref(e164, body) : "";

  function save(mark: boolean) {
    if (!mark && samePhone(draft, phone)) return;
    if (draft.trim() && !e164) {
      setNote("Use a 10-digit mobile number.");
      return;
    }
    const type = smsReady && mark ? "text" : "reach";
    void act(type, { playerId, phone: draft.trim(), mark }).then((res) => {
      if (!res.ok) return;
      if (mark && smsReady) setNote("Text sent.");
      else if (mark) setNote("Message opened. Tap Send in Messages. The text is also copied.");
      else setNote(draft.trim() ? "Number saved." : "");
    });
  }

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <Field
          aria-label={`Mobile for ${name}`}
          inputMode="tel"
          autoComplete="tel"
          placeholder="Mobile number"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            if (skipBlur.current) {
              skipBlur.current = false;
              return;
            }
            save(false);
          }}
          className="sm:max-w-56"
        />
        {claimed ? null : smsReady ? (
          <Btn kind="navy" disabled={!e164} onClick={() => save(true)}>
            Send text
          </Btn>
        ) : href ? (
          <Btn
            kind="navy"
            href={href}
            onPointerDown={() => {
              skipBlur.current = true;
            }}
            onClick={() => {
              void navigator.clipboard?.writeText(body).catch(() => undefined);
              save(true);
            }}
          >
            Text invite
          </Btn>
        ) : (
          <Btn
            kind="navy"
            onClick={() => {
              if (draft.trim() && !e164) setNote("Use a 10-digit mobile number.");
              else if (!draft.trim()) setNote("Enter their mobile number.");
              else if (!joinBase) setNote("Open the published site before texting links. Preview links open the Grok app.");
              else setNote("Preparing their link…");
            }}
          >
            Text invite
          </Btn>
        )}
        <Btn
          kind="ghost"
          disabled={!body}
          onClick={() => {
            if (!body) return;
            void navigator.clipboard?.writeText(body).then(
              () => setNote("Text copied. Paste it into a message to that number."),
              () => setNote("Could not copy. Select the link from Join in the phone browser."),
            );
          }}
        >
          Copy text
        </Btn>
      </div>
      <p className="mt-1 text-xs text-muted">
        {note ||
          (claimed
            ? "They're already on a phone. Let phone rejoin if you need to text the link again."
            : textedAt
              ? "Text opened. Still waiting for them to tap the link."
              : "On your phone, Text invite opens Messages ready to send. On a computer, Copy text and paste it to their number.")}
      </p>
    </div>
  );
}

function Run({
  code,
  game,
  act,
}: {
  code: string;
  game: ReturnType<typeof useGame>;
  act: (type: string, payload?: Record<string, unknown>) => Promise<{ ok: boolean }>;
}) {
  const view = game.view!;
  const [note, setNote] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [profileId, setProfileId] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState<string>(SEAT_DEPTS[0]);
  const joinBase = usePublicJoin(code);
  const openSeats = SEAT_DEPTS.filter((dept) => !view.players.some((p) => p.active && p.dept === dept));
  const needInvites = (view.contacts ?? []).some((c) => !c.invite);
  useEffect(() => {
    if (needInvites) void act("invites");
  }, [needInvites]);
  useEffect(() => {
    if (view.rehearsal && view.status !== "done" && openSeats.length) void act("fillCast");
  }, [view.rehearsal, view.status, openSeats.join("|")]);
  const cast = BOARD_CUE.flatMap((dept) => {
    const player = view.players.find((p) => p.active && p.standIn && p.dept === dept);
    return player ? [player] : [];
  });
  return (
    <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-3">
        {view.rehearsal ? (
          <Card>
            <h2 className="font-display text-xl text-cream">Rehearsal cast</h2>
            <p className="mt-1 text-sm text-muted">Stand-in players fill every seat. They are not real profiles. Play as a role to test that phone.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cast.map((player) => (
                <Btn
                  key={player.id}
                  kind="navy"
                  className="px-3 py-1 text-xs"
                  onClick={() => {
                    const token = game.slot.hostToken;
                    if (!token) return;
                    void assumeSeat({ data: { code, hostToken: token, playerId: player.id } }).then((res) => {
                      if (!res.ok) {
                        setNote(res.error);
                        return;
                      }
                      writeSlot(code, { playerId: res.playerId, playerToken: res.playerToken, name: res.name });
                      window.location.href = `/g/${code}/play`;
                    });
                  }}
                >
                  Play as {DEPT_SHORT[player.dept]}
                </Btn>
              ))}
            </div>
          </Card>
        ) : null}
        <Card>
          <Valuation board={view.board} settings={view.settings} />
        </Card>
        <Card>
          <h2 className="font-display text-xl text-cream">Roster</h2>
          <p className="mt-1 text-sm text-muted">
            Add a person by their real name, or find a username. The username is not shown during the game.
          </p>
          <div className="mt-3 flex gap-2">
            <Field aria-label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Find by username" />
            <Btn
              kind="navy"
              onClick={() => {
                void lookupUsername({ data: { code, hostToken: game.slot.hostToken ?? "", username } }).then((res) => {
                  if (!res.ok) return;
                  setFirst(res.first);
                  setLast(res.last);
                  setProfileId(res.profileId);
                });
              }}
            >
              Find
            </Btn>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <Field aria-label="First name" value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First name" />
            <Field aria-label="Last name" value={last} onChange={(e) => setLast(e.target.value)} placeholder="Last name" />
            <Field
              aria-label="Mobile number"
              value={mobile}
              inputMode="tel"
              autoComplete="tel"
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
            />
            <Select aria-label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
              {SEAT_DEPTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </Select>
            <Btn
              onClick={() => {
                const name = displayName(first, last);
                void act("seat", { name, dept: role, phone: mobile.trim(), profileId }).then((res) => {
                  if (res.ok) {
                    setFirst("");
                    setLast("");
                    setUsername("");
                    setProfileId("");
                    setMobile("");
                  }
                });
              }}
            >
              Add
            </Btn>
          </div>
          <div className="mt-2 flex gap-2">
            <Btn kind="ghost" className="flex-1" onClick={() => void act("lock", { locked: !view.rosterLocked })}>
              {view.rosterLocked ? "Unlock roster" : "Lock roster"}
            </Btn>
          </div>
          <ul className="mt-3 space-y-2">
            {view.players.length ? (
              view.players.map((p) => {
                const head = view.heads.some((h) => h.playerId === p.id);
                const contact = (view.contacts ?? []).find((c) => c.id === p.id);
                return (
                  <li key={p.id} className="border-t border-line py-3 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-cream">
                        {p.name} {head ? <span className="text-orange">· Up</span> : null}
                        {!p.active ? <span className="text-muted"> · excused</span> : null}
                        {!p.claimed ? <span className="text-muted"> · waiting for their phone</span> : null}
                      </p>
                    </div>
                    <SeatPhone
                      playerId={p.id}
                      name={p.name}
                      dept={p.dept}
                      company={view.company}
                      claimed={Boolean(p.claimed)}
                      phone={contact?.phone ?? ""}
                      invite={contact?.invite ?? ""}
                      textedAt={contact?.textedAt ?? null}
                      joinBase={joinBase}
                      smsReady={view.smsReady}
                      act={act}
                    />
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Select
                        aria-label={`Role for ${p.name}`}
                        className="max-w-56"
                        value={p.dept}
                        onChange={(e) => void act("move", { playerId: p.id, dept: e.target.value })}
                      >
                        {((SEAT_DEPTS as readonly string[]).includes(p.dept) ? SEAT_DEPTS : [...SEAT_DEPTS, p.dept]).map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </Select>
                      <Btn kind="ghost" className="px-2 py-1 text-xs" onClick={() => void act("reassign", { playerId: p.id })}>
                        They're up
                      </Btn>
                      <Btn kind="ghost" className="px-2 py-1 text-xs" onClick={() => void act("excuse", { playerId: p.id })}>
                        {p.active ? "Excuse" : "Restore"}
                      </Btn>
                      {p.claimed ? (
                        <Btn kind="ghost" className="px-2 py-1 text-xs" onClick={() => void act("release", { playerId: p.id })}>
                          Let phone rejoin
                        </Btn>
                      ) : null}
                      <Btn
                        kind="ghost"
                        className="px-2 py-1 text-xs"
                        onClick={() => {
                          if (window.confirm(`Remove ${p.name} from the roster?`)) void act("drop", { playerId: p.id });
                        }}
                      >
                        Remove
                      </Btn>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="text-sm text-muted">No one seated yet. Add them here, or let them scan once the roster is unlocked.</li>
            )}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-xl text-cream">Help</h2>
          {view.help.filter((h) => h.status !== "done").length === 0 ? (
            <p className="mt-2 text-sm text-muted">No open requests.</p>
          ) : (
            view.help
              .filter((h) => h.status !== "done")
              .map((h) => (
                <div key={h.id} className="mt-2 rounded-xl border border-line p-3 text-sm">
                  <p className="font-semibold text-cream">
                    {h.name} · {h.dept}
                  </p>
                  <p>{h.note}</p>
                  <div className="mt-2 flex gap-2">
                    <Btn kind="ghost" className="px-2 py-1 text-xs" onClick={() => void act("help", { id: h.id, status: "ack" })}>
                      Acknowledge
                    </Btn>
                    <Btn kind="navy" className="px-2 py-1 text-xs" onClick={() => void act("help", { id: h.id, status: "done" })}>
                      Resolve
                    </Btn>
                  </div>
                </div>
              ))
          )}
        </Card>
      </div>
      <div className="space-y-3">
        <JoinCard code={code} hostToken={game.slot.hostToken ?? ""} />
        <Card>
          <h2 className="font-display text-xl text-cream">Announcement</h2>
          <div className="mt-2 flex gap-2">
            <Field value={note} onChange={(e) => setNote(e.target.value)} placeholder="Short note for every screen" />
            <Btn kind="navy" onClick={() => void act("announce", { text: note })}>
              Send
            </Btn>
          </div>
        </Card>
        {view.forced ? (
          <Card>
            <h2 className="font-display text-xl text-cream">Forced negatives</h2>
            <p className="mt-1 text-sm text-muted">A $0 answer forces the next negative action card. $150 does not. Campaign Refresh is exempt.</p>
            <ul className="mt-2 space-y-1 text-sm">
              {view.forced.map((f) => (
                <li key={f.dept} className="flex justify-between gap-2">
                  <span>{f.dept}</span>
                  <span className={f.played || f.willForce ? "font-bold text-orange" : "text-muted"}>
                    {f.played ? "Must play" : f.willForce ? "Next negative forces" : "Clear"}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}
        <Card>
          <h2 className="font-display text-xl text-cream">Log · {view.company}</h2>
          <p className="mt-1 text-sm text-muted">Only this game, {code}.</p>
          {view.code === code && view.log.length ? (
            <ul className="mt-2 max-h-64 space-y-1 overflow-auto text-sm">
              {view.log.map((l) => (
                <li key={l.id} className="border-b border-line py-1 text-ink">
                  {l.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted">Nothing has happened in this game yet.</p>
          )}
        </Card>
      </div>
    </div>
  );
}

function JoinCard({ code, hostToken }: { code: string; hostToken: string }) {
  const [src, setSrc] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [pasted, setPasted] = useState("");
  useEffect(() => {
    let cancelled = false;
    const saved = window.localStorage.getItem("bm-public-origin") ?? "";
    setPasted(saved);
    void publicJoinLink({ data: { code } }).then((res) => {
      if (cancelled) return;
      if (res.ok) {
        setUrl(res.url);
        setNote("");
        return;
      }
      const host = window.location.hostname;
      if (!isAppOnlyHost(host)) {
        setUrl(withBrowserFlag(`${window.location.origin}/g/${code}/join`));
        setNote("");
        return;
      }
      if (saved && !isAppOnlyHost(safeHost(saved))) {
        setUrl(withBrowserFlag(`${saved.replace(/\/$/, "")}/g/${code}/join`));
        setNote("");
        return;
      }
      setUrl("");
      setNote(
        "This preview link opens the Grok app. Publish the site, paste the public address below (it ends in .grok.me), and the QR will open in Safari or Chrome.",
      );
    });
    return () => {
      cancelled = true;
    };
  }, [code]);
  useEffect(() => {
    if (!url) {
      setSrc("");
      return;
    }
    void toDataURL(url, {
      margin: 1,
      width: 320,
      color: { dark: "#1b3a5c", light: "#fffcf8" },
    }).then(setSrc);
  }, [url]);

  function usePasted() {
    const raw = pasted.trim();
    if (!raw) return;
    let origin = raw;
    if (!/^https?:\/\//i.test(origin)) origin = `https://${origin}`;
    let parsed: URL;
    try {
      parsed = new URL(origin);
    } catch {
      setNote("That address is not a full link. Paste the published site, like https://your-game.grok.me");
      return;
    }
    if (parsed.protocol !== "https:" || isAppOnlyHost(parsed.hostname)) {
      setNote("Use the published https site, not a grok.com or preview link. Players open it in the phone browser.");
      return;
    }
    const base = parsed.origin;
    window.localStorage.setItem("bm-public-origin", base);
    window.dispatchEvent(new Event("bm-origin"));
    setUrl(withBrowserFlag(`${base}/g/${code}/join`));
    setNote("");
  }

  return (
    <Card>
      <h2 className="font-display text-xl text-cream">Join in the phone browser</h2>
      <p className="mt-1 text-sm text-muted">
        Players do not need the Grok app. Scanning this opens Safari or Chrome.
      </p>
      <p className="mt-3 font-display text-4xl tracking-widest text-cream">{code}</p>
      {src ? <img src={src} alt={`QR code to join game ${code} in the phone browser`} className="mt-3 w-48 rounded-xl" /> : null}
      {url ? (
        <>
          <p className="mt-2 text-sm break-all text-cream">{url}</p>
          <Btn kind="ghost" className="mt-2" onClick={() => void navigator.clipboard?.writeText(url)}>
            Copy browser link
          </Btn>
        </>
      ) : (
        <div className="mt-3">
          <p className="text-sm text-orange-ink">{note || "Checking the public link…"}</p>
          <label className="mt-3 block text-sm font-semibold text-muted" htmlFor="public-origin">
            Published site
          </label>
          <Field
            id="public-origin"
            value={pasted}
            onChange={(e) => setPasted(e.target.value)}
            placeholder="https://your-game.grok.me"
            inputMode="url"
            autoCapitalize="none"
          />
          <Btn kind="navy" className="mt-2" onClick={usePasted}>
            Make the browser QR
          </Btn>
        </div>
      )}
      {hostToken ? (
        <p className="mt-3 text-xs text-muted">
          Host key stays on this device.{" "}
          <button type="button" className="font-semibold text-cream underline" onClick={() => void navigator.clipboard?.writeText(hostToken)}>
            Copy host key
          </button>
        </p>
      ) : null}
    </Card>
  );
}

function safeHost(value: string): string {
  try {
    return new URL(value).hostname;
  } catch {
    return "";
  }
}

function Money({
  game,
}: {
  game: ReturnType<typeof useGame>;
}) {
  const view = game.view!;
  const closed = view.projects.filter((project) => project.collected || project.status === "closed");

  return (
    <div className="space-y-3">
      <Card>
        <Valuation board={view.board} settings={view.settings} />
        <p className="mt-3 text-sm text-muted">
          Contract value posts when every slot on a project is filled. Card cash, completion bonuses, and penalties post from the card text. People & Principles still reduces payroll.
        </p>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-cream">Ledger</h2>
        <ul className="mt-3 space-y-1 text-sm">
          {view.adjustments.length ? (
            view.adjustments.map((a) => (
              <li key={a.id} className="flex justify-between gap-2">
                <span>
                  R{a.round} {a.label}
                </span>
                <span className="tabular-nums">{money(a.cents)}</span>
              </li>
            ))
          ) : (
            <li className="text-muted">Nothing posted yet. Open projects and play cards to move the money.</li>
          )}
        </ul>
        {view.pending.length ? (
          <div className="mt-4">
            <p className="text-xs font-bold tracking-wide text-muted uppercase">Waiting on a project</p>
            <ul className="mt-2 space-y-1 text-sm">
              {view.pending.map((p) => (
                <li key={p.id} className="flex justify-between gap-2">
                  <span>{p.label}</span>
                  <span className="tabular-nums">{money(p.cents)}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Card>
      <Card>
        <h2 className="font-display text-xl text-cream">Completed projects</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {closed.length ? (
            closed.map((project) => (
              <li key={project.id} className="flex justify-between gap-2">
                <span>
                  Project {project.n}
                  {project.customer?.name ? ` · ${project.customer.name}` : ""}
                </span>
                <span className="tabular-nums">{money(project.valueCents)}</span>
              </li>
            ))
          ) : (
            <li className="text-muted">No project has filled every slot yet.</li>
          )}
        </ul>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-cream">By round</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {view.board.rounds.map((r) => (
            <li key={r.round} className="flex justify-between">
              <span>Round {r.round}</span>
              <span>
                {money(r.revenue)} revenue · {money(r.profit)} profit · {pct(r.revenue ? r.profit / r.revenue : null)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <DeptTable board={view.board} />
        </div>
      </Card>
    </div>
  );
}

function Cards({
  code,
  token,
  game,
  act,
}: {
  code: string;
  token: string;
  game: ReturnType<typeof useGame>;
  act: (type: string, payload?: Record<string, unknown>) => Promise<{ ok: boolean }>;
}) {
  const view = game.view!;
  const [dept, setDept] = useState<DeptId>("Marketing");
  const [raw, setRaw] = useState("");
  const [card, setCard] = useState<FullCard | null>(null);
  const [choice, setChoice] = useState<"A" | "B" | "C" | "">("");
  const [err, setErr] = useState("");
  const [list, setList] = useState<Awaited<ReturnType<typeof hostCatalog>> | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    void hostCatalog({ data: { code, hostToken: token } }).then(setList);
  }, [code, token]);

  const catalog = list && list.ok ? list.catalog : null;
  const deptCards = catalog?.department.filter((c) => c.dept === dept && (!q || `${c.name} ${c.text}`.toLowerCase().includes(q.toLowerCase()))) ?? [];

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="space-y-3">
        <Card>
          <h2 className="font-display text-xl text-cream">Projects and cards</h2>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Btn kind="navy" onClick={() => void act("deal")}>
              Deal every hand
            </Btn>
            <Btn kind="ghost" onClick={() => void act("draw", { deck: "event" })}>
              Event
            </Btn>
            <Btn kind="ghost" onClick={() => void act("deal", { dept })}>
              Deal {dept}
            </Btn>
            {waveButton(view, 10000, 1) ? (
              <Btn onClick={() => void act("openWave", { dollars: 10000 })}>Open three $10k</Btn>
            ) : null}
            {waveButton(view, 20000, 4) ? (
              <Btn onClick={() => void act("openWave", { dollars: 20000 })}>Open three $20k</Btn>
            ) : null}
            {waveButton(view, 30000, 6) ? (
              <Btn onClick={() => void act("openWave", { dollars: 30000 })}>Open three $30k</Btn>
            ) : null}
          </div>
          <Select className="mt-2" value={dept} onChange={(e) => setDept(e.target.value as DeptId)} aria-label="Department deck">
            {BOARD_DEPTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </Select>
          <p className="mt-2 text-sm text-muted">
            Round 1 opens three $10,000 projects. Three $20,000 projects open at the end of round 3. Three $30,000
            projects open at the end of round 5. Draw and play deals 3 cards to each department. The person who is up
            picks 2.
          </p>
          <ProjectBoard projects={view.projects} plays={view.plays} bare />
          {view.events[0] ? (
            <div className="mt-3 rounded-xl border-2 border-gold p-3">
              <p className="text-xs font-bold text-muted">EVENT · {view.events[0].type}</p>
              <h3 className="font-display text-xl text-cream">{view.events[0].name}</h3>
              <p className="mt-1 text-sm">{view.events[0].text}</p>
            </div>
          ) : null}
          {view.plays[0] ? (
            <div className="mt-3 rounded-xl bg-navy-2 p-3">
              <p className="text-xs font-bold text-muted">
                {view.plays[0].dept} · {view.plays[0].type}
                {view.plays[0].forced ? " · FORCED" : ""}
                {view.plays[0].exempt ? " · EXEMPT" : ""}
              </p>
              <h3 className="font-display text-xl text-cream">{view.plays[0].name}</h3>
              {view.plays[0].projectLabel ? (
                <p className="text-sm font-semibold text-orange-ink">{view.plays[0].projectLabel}</p>
              ) : null}
              <CardCopy text={view.plays[0].text} />
            </div>
          ) : null}
          <ul className="mt-3 space-y-1 text-sm">
            {BOARD_DEPTS.map((name) => (
              <li key={name} className="flex justify-between">
                <span>{name}</span>
                <span className="text-muted">{(view.hands?.[name] ?? []).length} in hand</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-xl text-cream">P&P lookup</h2>
          <p className="mt-1 text-sm text-muted">Host view includes the values and the Principle Voice. Player phones do not.</p>
          <div className="mt-2 flex gap-2">
            <Field value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="07" aria-label="Card digits" />
            <Btn
              kind="navy"
              onClick={() => {
                setErr("");
                void lookupCard({ data: { code, raw, dept, hostToken: token } }).then((res) => {
                  if (!res.ok) {
                    setCard(null);
                    setErr(res.error);
                    return;
                  }
                  if (res.role === "host") setCard(res.card);
                });
              }}
            >
              Find
            </Btn>
          </div>
          {err ? <p className="mt-2 text-sm text-orange-ink">{err}</p> : null}
          {card ? (
            <div className="mt-3">
              <p className="text-xs font-bold text-muted">{card.code}</p>
              <h3 className="font-display text-2xl text-cream">{card.title}</h3>
              <p className="mt-2 text-sm">{card.scenario}</p>
              {(["A", "B", "C"] as const).map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setChoice(letter)}
                  className={`mt-2 w-full rounded-xl border px-3 py-2 text-left text-sm ${choice === letter ? "border-gold" : "border-line"} ${card.correct === letter ? "bg-navy-2" : ""}`}
                >
                  <span className="font-bold text-cream">{letter}. </span>
                  {card.options[letter]}
                  <span className="float-right font-bold text-cream">{money(card.values[letter] * 100)}</span>
                </button>
              ))}
              <p className="mt-3 text-sm leading-relaxed">{card.hostNote}</p>
              <Btn
                className="mt-3 w-full"
                disabled={!choice}
                onClick={() => void act("answer", { raw: card.code, dept: card.dept, choice })}
              >
                Record {choice || "answer"} for {card.dept}
              </Btn>
            </div>
          ) : null}
        </Card>
      </div>
      <Card>
        <h2 className="font-display text-xl text-cream">Department deck</h2>
        <Field className="mt-2" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search cards" />
        <ul className="mt-3 max-h-[40rem] space-y-2 overflow-auto">
          {deptCards.map((c) => (
            <li key={c.name} className="rounded-xl border border-line p-3">
              <p className="text-xs font-bold text-muted">
                {c.type}
                {c.copies > 1 ? ` · ×${c.copies}` : ""}
              </p>
              <p className="font-semibold text-cream">{c.name}</p>
              <CardCopy text={c.text} />
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">Recruiting and Owner are saved for a later game. The GM uses People and Principles only.</p>
      </Card>
    </div>
  );
}

function waveButton(
  view: { status: string; round: number; projects: { valueCents: number }[] },
  dollars: number,
  fromRound: number,
) {
  if (view.status !== "live" || view.round < fromRound) return false;
  return view.projects.filter((project) => project.valueCents === dollars * 100).length < 3;
}

function Show({
  game,
  act,
}: {
  game: ReturnType<typeof useGame>;
  act: (type: string, payload?: Record<string, unknown>) => Promise<{ ok: boolean }>;
}) {
  const view = game.view!;
  const beats = ["Off", "Result", "Rounds", "Departments", "Principles", "Honors", "Shout-outs", "Phones"];
  return (
    <div className="space-y-3">
      <Card>
        <h2 className="font-display text-xl text-cream">Guided show</h2>
        <p className="mt-1 text-sm text-muted">The projector plays the beat. You only advance it.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Btn kind="ghost" onClick={() => void act("show", { beat: Math.max(0, view.showBeat - 1) })}>
            Back
          </Btn>
          <Btn onClick={() => void act("show", { beat: Math.min(7, view.showBeat + 1) })}>Next</Btn>
          <Btn kind="navy" onClick={() => void act("show", { beat: 0 })}>
            Back to live board
          </Btn>
        </div>
        <p className="mt-3 text-sm font-semibold text-cream">Now: {beats[view.showBeat]}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {view.status === "live" ? null : null}
          {view.status === "audit" || view.status === "live" ? (
            <Btn kind="gold" onClick={() => void act("openPost")}>
              Open post-game questions
            </Btn>
          ) : null}
          {view.status === "post" || view.status === "audit" ? (
            <Btn kind="navy" onClick={() => void act("finish")}>
              Close game
            </Btn>
          ) : null}
          {view.status === "done" || view.status === "post" ? (
            <Btn kind="ghost" onClick={() => void act("reopen")}>
              Reopen audit
            </Btn>
          ) : null}
        </div>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-cream">Surveys</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {view.surveyDone.map((s) => {
            const delta =
              s.preScores && s.postScores
                ? s.postScores.reduce((sum, n, i) => sum + n - (s.preScores?.[i] ?? n), 0)
                : null;
            return (
              <li key={s.id} className="flex justify-between gap-2">
                <span className="font-semibold text-cream">{s.name}</span>
                <span className="text-muted">
                  Pre {s.pre ? "yes" : "no"} · Post {s.post ? "yes" : "no"}
                  {delta !== null ? ` · climb ${delta > 0 ? "+" : ""}${delta}` : ""}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>
      <Card>
        <h2 className="font-display text-xl text-cream">Honors</h2>
        {view.honors.map((h) => (
          <p key={h.id} className="mt-2 text-sm">
            <span className="font-semibold text-cream">{h.title}.</span> {h.names.join(", ")}. {h.detail}
          </p>
        ))}
        {!view.honors.length ? <p className="mt-2 text-sm text-muted">Honors appear once the record supports them.</p> : null}
      </Card>
    </div>
  );
}
