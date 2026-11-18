export type Slot = {
  hostToken?: string;
  playerId?: string;
  playerToken?: string;
  name?: string;
};

const KEY = "bm-session-v1";
const COOKIE = "bm-seat";

function readCookie(): Slot & { code?: string } {
  if (typeof document === "undefined") return {};
  const raw = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE}=`));
  if (!raw) return {};
  try {
    return JSON.parse(decodeURIComponent(raw.slice(COOKIE.length + 1))) as Slot & { code?: string };
  } catch {
    return {};
  }
}

function writeCookie(code: string, slot: Slot) {
  if (typeof document === "undefined") return;
  if (!slot.playerId || !slot.playerToken) return;
  const value = encodeURIComponent(JSON.stringify({ code, playerId: slot.playerId, playerToken: slot.playerToken, name: slot.name }));
  document.cookie = `${COOKIE}=${value}; Path=/; Max-Age=2592000; SameSite=Lax`;
}

function readAll(): Record<string, Slot> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, Slot>) : {};
  } catch {
    return {};
  }
}

export function readSlot(code: string): Slot {
  const id = code.toUpperCase();
  const saved = readAll()[id];
  if (saved?.playerId && saved.playerToken) return saved;
  const cookie = readCookie();
  if (cookie.code === id && cookie.playerId && cookie.playerToken) {
    const restored = { ...saved, playerId: cookie.playerId, playerToken: cookie.playerToken, name: cookie.name };
    if (typeof window !== "undefined") {
      const all = readAll();
      all[id] = restored;
      localStorage.setItem(KEY, JSON.stringify(all));
    }
    return restored;
  }
  return saved ?? {};
}

export function writeSlot(code: string, patch: Slot) {
  const all = readAll();
  const id = code.toUpperCase();
  all[id] = { ...all[id], ...patch };
  localStorage.setItem(KEY, JSON.stringify(all));
  writeCookie(id, all[id]);
  window.dispatchEvent(new Event("bm-session"));
}

const ADMIN = "bm-admin-v1";

export function adminToken(): string {
  if (typeof window === "undefined") return "";
  const existing = localStorage.getItem(ADMIN)?.trim() ?? "";
  if (existing.length >= 16) return existing;
  const created = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "");
  localStorage.setItem(ADMIN, created);
  return created;
}

export function setAdminToken(token: string): boolean {
  const next = token.trim();
  if (next.length < 16) return false;
  localStorage.setItem(ADMIN, next);
  window.dispatchEvent(new Event("bm-session"));
  return true;
}

export function clearPlayer(code: string) {
  const all = readAll();
  const id = code.toUpperCase();
  if (!all[id]) return;
  delete all[id].playerId;
  delete all[id].playerToken;
  delete all[id].name;
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("bm-session"));
}

const PROFILE = "bm-profile-v1";

export type HeldProfile = { id: string; secret: string; username: string; first: string; last: string; avatar?: string };

export function readProfileSession(): HeldProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as HeldProfile;
    if (!parsed.secret || !parsed.username) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeProfileSession(profile: HeldProfile) {
  localStorage.setItem(PROFILE, JSON.stringify(profile));
  window.dispatchEvent(new Event("bm-session"));
}

export function clearProfileSession() {
  localStorage.removeItem(PROFILE);
  window.dispatchEvent(new Event("bm-session"));
}
