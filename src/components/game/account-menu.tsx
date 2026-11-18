import { useEffect, useRef, useState } from "react";
import { UserRound } from "lucide-react";
import { ProfileBlock } from "./profile-block";
import { clearProfileSession, readProfileSession, type HeldProfile } from "@/lib/game/session";

export function AccountMenu() {
  const [profile, setProfile] = useState<HeldProfile | null>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setProfile(readProfileSession());
    sync();
    window.addEventListener("bm-session", sync);
    return () => window.removeEventListener("bm-session", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onDoc(event: MouseEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function share() {
    const name = profile?.username;
    if (!name) return;
    void navigator.clipboard?.writeText(`${window.location.origin}/p/${name}`);
    setCopied(true);
  }

  function signOut() {
    clearProfileSession();
    setOpen(false);
    if (window.location.pathname === "/me") window.location.href = "/";
  }

  return (
    <div ref={root} className="relative shrink-0">
      <button
        type="button"
        aria-label={profile ? "Profile and settings" : "Sign in or sign up"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex size-11 touch-manipulation items-center justify-center overflow-hidden rounded-full border-2 ${profile ? "border-gold bg-gold text-navy" : "border-gold bg-transparent text-gold"}`}
      >
        {profile?.avatar ? (
          <img src={profile.avatar} alt="" className="size-full rounded-full object-cover" />
        ) : (
          <UserRound className="size-6" aria-hidden />
        )}
      </button>
      {open && !profile ? (
        <div className="absolute right-0 z-40 mt-2 max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] overflow-auto rounded-2xl border border-gold bg-card p-3 shadow-lg">
          <p className="font-display text-xl text-cream">Sign in / Sign up</p>
          <p className="mt-1 text-xs text-muted">The table uses your real name. Your username stays off the board.</p>
          <ProfileBlock onReady={() => setOpen(false)} />
        </div>
      ) : null}
      {open && profile ? (
        <div className="absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-2xl border border-gold bg-card shadow-lg">
          <p className="border-b border-line px-3 py-2 text-sm">
            <span className="block font-semibold text-cream">
              {profile.first} {profile.last}
            </span>
            <span className="text-xs text-muted">Signed in</span>
          </p>
          <nav className="flex flex-col py-1 text-sm">
            <MenuLink href="/me#profile">Profile</MenuLink>
            <MenuLink href="/me#settings">Contact and photo</MenuLink>
            <MenuLink href="/me#record">Roles and progression</MenuLink>
            <MenuLink href="/me#friends">Friends</MenuLink>
            <button type="button" className="px-3 py-2 text-left text-cream hover:bg-navy-2" onClick={share}>
              {copied ? "Link copied" : "Share results"}
            </button>
            <button type="button" className="px-3 py-2 text-left text-gold hover:bg-navy-2" onClick={signOut}>
              Sign out
            </button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

function MenuLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="px-3 py-2 text-cream hover:bg-navy-2">
      {children}
    </a>
  );
}
