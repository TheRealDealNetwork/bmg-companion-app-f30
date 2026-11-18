import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { friendAct, imagineAvatar, readProfile, readThread, saveProfile, searchPeople, sendMessage } from "@/lib/game/api";
import { money, pct } from "@/lib/game/format";
import { clearProfileSession, readProfileSession, writeProfileSession } from "@/lib/game/session";
import { ProfileBlock } from "@/components/game/profile-block";
import { BrandBar, Btn, Card, Field } from "@/components/game/ui";

export const Route = createFileRoute("/me")({
  ssr: false,
  component: MePage,
});

type Friend = { username: string; name: string; city: string; email: string; phone: string; status: string };
type Career = {
  games: number;
  wins: number;
  losses: number;
  best: number;
  weak: number;
  rate: number | null;
  roles: { role: string; games: number; best: number; weak: number }[];
  history: { code: string; company: string; at: string; role: string; win: boolean; valuation: number; best: number; weak: number }[];
  badges: { id: string; title: string; detail: string }[];
};

function MePage() {
  const [ready, setReady] = useState(() => Boolean(readProfileSession()));
  const [profile, setProfile] = useState<{ first: string; last: string; username: string; city: string; state: string; email: string; phone: string; avatar: string; rank?: string; background: { firstTime: boolean; trades: string; title: string; company: string; workCity: string } } | null>(null);
  const [career, setCareer] = useState<Career | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [err, setErr] = useState("");

  async function load() {
    const secret = readProfileSession()?.secret;
    if (!secret) return;
    const res = await readProfile({ data: { secret } });
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setProfile(res.profile);
    setCareer(res.career);
    setFriends(res.friends);
    const held = readProfileSession();
    if (held && held.avatar !== res.profile.avatar) writeProfileSession({ ...held, avatar: res.profile.avatar });
  }

  useEffect(() => {
    if (ready) void load();
  }, [ready]);

  return (
    <div className="min-h-screen bg-navy">
      <BrandBar trail={<a href="/" className="text-sm font-semibold text-gold">Home</a>} />
      <main className="mx-auto max-w-3xl space-y-3 px-4 py-6">
        {!ready ? (
          <Card>
            <h1 className="font-display text-3xl text-cream">Your profile</h1>
            <p className="mt-2 text-sm text-muted">Create a username once. The game still shows your real name.</p>
            <ProfileBlock
              onReady={() => setReady(true)}
            />
            {err ? <p className="mt-3 text-sm text-orange-ink">{err}</p> : null}
          </Card>
        ) : !profile || !career ? (
          <Card><p className="text-cream">{err || "Opening your record…"}</p></Card>
        ) : (
          <>
            <Card>
              <div id="profile">
              <div className="flex items-center gap-3">
                {profile.avatar ? <img src={profile.avatar} alt="" className="size-16 rounded-full object-cover" /> : <span className="flex size-16 items-center justify-center rounded-full bg-gold font-display text-2xl text-navy">{profile.first.slice(0, 1)}</span>}
                <div>
                  <h1 className="font-display text-3xl text-cream">{profile.first} {profile.last}</h1>
                  {profile.rank === "super" ? <p className="text-xs font-semibold text-gold">Super Admin</p> : profile.rank === "host" ? <p className="text-xs font-semibold text-gold">Host Admin</p> : null}
                  <p className="text-sm text-muted">{profile.city}{profile.state ? `, ${profile.state}` : ""}</p>
                </div>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {career.badges.map((badge) => (
                  <li key={badge.id} title={badge.detail} className="rounded-full border border-gold px-3 py-1 text-xs font-semibold text-gold">{badge.title}</li>
                ))}
              </ul>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Stat k="Games" v={String(career.games)} />
                <Stat k="Wins" v={String(career.wins)} />
                <Stat k="Best rate" v={pct(career.rate)} />
              </dl>
              {!profile.email ? <p className="mt-3 text-sm text-muted">Add your email to receive reports and offers from the school, including possible job leads.</p> : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <Btn kind="navy" onClick={() => void navigator.clipboard?.writeText(`${window.location.origin}/p/${profile.username}`)}>Share results</Btn>
                <Btn kind="ghost" onClick={() => { clearProfileSession(); setReady(false); setProfile(null); }}>Sign out</Btn>
              </div>
              </div>
            </Card>
            <div id="settings">
              <Editor profile={profile} onSaved={() => void load()} />
            </div>
            <Card>
              <div id="record">
              <h2 className="font-display text-xl text-cream">Roles</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {career.roles.map((role) => (
                  <li key={role.role} className="flex justify-between text-cream">
                    <span>{role.role}</span>
                    <span className="text-muted">{role.games} games · {role.best} best · {role.weak} weak</span>
                  </li>
                ))}
              </ul>
              <h2 className="mt-4 font-display text-xl text-cream">Progression</h2>
              <ul className="mt-2 space-y-2">
                {career.history.map((game) => (
                  <li key={game.code}>
                    <div className="flex justify-between text-xs text-muted">
                      <span>{game.company} · {game.role}</span>
                      <span>{game.win ? "Win" : "Short"} · {money(game.valuation)}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-navy">
                      <div className="h-2 rounded-full bg-gold" style={{ width: `${Math.min(100, (game.best + 1) * 12)}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              </div>
            </Card>
            <Friends friends={friends} onChange={() => void load()} />
          </>
        )}
      </main>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-navy-2 px-2 py-2">
      <p className="text-[11px] tracking-wide text-muted uppercase">{k}</p>
      <p className="font-display text-xl text-cream">{v}</p>
    </div>
  );
}

function Editor({ profile, onSaved }: { profile: { first: string; last: string; city: string; state: string; email: string; phone: string; avatar: string; background: { firstTime: boolean; trades: string; title: string; company: string; workCity: string } }; onSaved: () => void }) {
  const [city, setCity] = useState(profile.city);
  const [stateName, setStateName] = useState(profile.state);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [photo, setPhoto] = useState(profile.avatar);
  const [look, setLook] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function save(avatar?: string) {
    setBusy(true);
    setErr("");
    try {
      const secret = readProfileSession()?.secret ?? "";
      const nextAvatar = avatar ?? photo;
      const res = await saveProfile({
        data: {
          secret,
          first: profile.first,
          last: profile.last,
          city,
          state: stateName,
          email,
          phone,
          avatar: nextAvatar,
          firstTime: profile.background.firstTime,
          trades: profile.background.trades,
          title: profile.background.title,
          company: profile.background.company,
          workCity: profile.background.workCity,
        },
      });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      if (avatar) setPhoto(avatar);
      const held = readProfileSession();
      if (held) writeProfileSession({ ...held, avatar: nextAvatar });
      onSaved();
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not save that photo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <h2 className="font-display text-xl text-cream">Contact and photo</h2>
      <p className="mt-1 text-sm text-muted">Friends you accept can email or call what you put here. The board never shows it. Your photo shows on your profile.</p>
      <div className="mt-3 flex items-center gap-3">
        {photo ? (
          <img src={photo} alt="" className="size-16 rounded-full object-cover" />
        ) : (
          <span className="flex size-16 items-center justify-center rounded-full bg-gold font-display text-2xl text-navy">{profile.first.slice(0, 1)}</span>
        )}
        <div className="min-w-0 flex-1">
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              if (/heic|heif/i.test(file.type) || /\.heic$/i.test(file.name)) {
                setErr("Save that photo as a JPEG or PNG, then upload it.");
                return;
              }
              setBusy(true);
              setErr("");
              void fileToJpeg(file)
                .then((avatar) => save(avatar))
                .catch((error: unknown) => {
                  setBusy(false);
                  setErr(error instanceof Error ? error.message : "Could not use that photo.");
                });
            }}
          />
          <Btn kind="navy" disabled={busy} onClick={() => fileRef.current?.click()}>
            {busy ? "Working…" : "Upload a photo"}
          </Btn>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <Field aria-label="Avatar description" value={look} onChange={(e) => setLook(e.target.value)} placeholder="Describe an avatar, such as a gold hard hat" />
        <Btn
          kind="navy"
          disabled={busy || look.trim().length < 3}
          onClick={() => {
            setBusy(true);
            setErr("");
            void imagineAvatar({ data: { prompt: look } })
              .then(async (res) => {
                if (!res.ok) {
                  setErr(res.error);
                  setBusy(false);
                  return;
                }
                const avatar = await fitJpeg(res.image);
                await save(avatar);
              })
              .catch((error: unknown) => {
                setBusy(false);
                setErr(error instanceof Error ? error.message : "Could not draw that avatar.");
              });
          }}
        >
          Draw it
        </Btn>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <Field aria-label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
        <Field aria-label="State" value={stateName} onChange={(e) => setStateName(e.target.value)} placeholder="State" />
        <Field aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Field aria-label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      </div>
      {err ? <p className="mt-2 text-sm text-orange-ink">{err}</p> : null}
      <Btn className="mt-3" disabled={busy} onClick={() => void save()}>Save</Btn>
    </Card>
  );
}

function fileToJpeg(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that photo."));
    reader.onload = () => {
      void fitJpeg(String(reader.result)).then(resolve, reject);
    };
    reader.readAsDataURL(file);
  });
}

function fitJpeg(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not use that image."));
        return;
      }
      const side = Math.min(img.width, img.height) || 1;
      ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, 256, 256);
      let quality = 0.82;
      let data = canvas.toDataURL("image/jpeg", quality);
      while (data.length > 170_000 && quality > 0.4) {
        quality -= 0.12;
        data = canvas.toDataURL("image/jpeg", quality);
      }
      if (!data.startsWith("data:image/jpeg;base64,") || data.length > 180_000) {
        reject(new Error("That image is too large. Try another one."));
        return;
      }
      resolve(data);
    };
    img.onerror = () => reject(new Error("Use a JPEG or PNG. Phone HEIC photos need to be saved as JPEG first."));
    img.src = src;
  });
}

function Friends({ friends, onChange }: { friends: Friend[]; onChange: () => void }) {
  const [username, setUsername] = useState("");
  const [found, setFound] = useState("");
  const [open, setOpen] = useState("");
  const [thread, setThread] = useState<{ mine: boolean; body: string }[]>([]);
  const [body, setBody] = useState("");
  const [err, setErr] = useState("");
  const secret = () => readProfileSession()?.secret ?? "";

  async function act(action: string, name: string) {
    const res = await friendAct({ data: { secret: secret(), username: name, action } });
    if (!res.ok) setErr(res.error);
    else onChange();
  }

  return (
    <Card>
      <div id="friends">
      <h2 className="font-display text-xl text-cream">Players you know</h2>
      <div className="mt-3 flex gap-2">
        <Field aria-label="Find username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Their username" />
        <Btn
          kind="navy"
          onClick={() => {
            void searchPeople({ data: { secret: secret(), username } }).then((res) => {
              if (!res.ok) {
                setErr(res.error);
                setFound("");
                return;
              }
              setFound(res.username);
              setErr("");
            });
          }}
        >
          Find
        </Btn>
      </div>
      {found ? (
        <button type="button" className="mt-2 text-sm font-semibold text-gold" onClick={() => void act("request", found)}>
          Ask {found} to connect
        </button>
      ) : null}
      {err ? <p className="mt-2 text-sm text-orange-ink">{err}</p> : null}
      <ul className="mt-3 space-y-3">
        {friends.map((friend) => (
          <li key={friend.username} className="border-t border-line pt-3">
            <p className="font-semibold text-cream">{friend.name}</p>
            <p className="text-xs text-muted">{friend.status === "accepted" ? friend.city : friend.status === "incoming" ? "Wants to connect" : "Request sent"}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {friend.status === "incoming" ? <Btn className="px-3 py-1 text-xs" onClick={() => void act("accept", friend.username)}>Accept</Btn> : null}
              {friend.status === "accepted" ? (
                <Btn kind="navy" className="px-3 py-1 text-xs" onClick={() => {
                  setOpen(friend.username);
                  void readThread({ data: { secret: secret(), username: friend.username } }).then((res) => {
                    if (res.ok) setThread(res.messages);
                  });
                }}>Chat</Btn>
              ) : null}
              {friend.email ? <a className="rounded-xl border border-gold px-3 py-1 text-xs font-semibold text-gold" href={`mailto:${friend.email}`}>Email</a> : null}
              {friend.phone ? <a className="rounded-xl border border-gold px-3 py-1 text-xs font-semibold text-gold" href={`tel:${friend.phone}`}>Call</a> : null}
              <Btn kind="ghost" className="px-3 py-1 text-xs" onClick={() => void act("remove", friend.username)}>Remove</Btn>
            </div>
            {open === friend.username ? (
              <div className="mt-2">
                <ul className="max-h-48 space-y-1 overflow-auto text-sm">
                  {thread.map((item, index) => (
                    <li key={`${item.body}-${index}`} className={item.mine ? "text-right text-gold" : "text-cream"}>{item.body}</li>
                  ))}
                </ul>
                <div className="mt-2 flex gap-2">
                  <Field aria-label="Message" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Message" />
                  <Btn onClick={() => {
                    void sendMessage({ data: { secret: secret(), username: friend.username, body } }).then(async (res) => {
                      if (!res.ok) {
                        setErr(res.error);
                        return;
                      }
                      setBody("");
                      const next = await readThread({ data: { secret: secret(), username: friend.username } });
                      if (next.ok) setThread(next.messages);
                    });
                  }}>Send</Btn>
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      </div>
    </Card>
  );
}
