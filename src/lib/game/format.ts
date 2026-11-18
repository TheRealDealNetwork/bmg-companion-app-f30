export function money(cents: number | null | undefined): string {
  if (cents === null || cents === undefined || Number.isNaN(cents)) return "—";
  const sign = cents < 0 ? "-" : "";
  const dollars = Math.round(Math.abs(cents) / 100);
  return `${sign}$${dollars.toLocaleString("en-US")}`;
}

export function clock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

export function pct(ratio: number | null | undefined): string {
  if (ratio === null || ratio === undefined || Number.isNaN(ratio)) return "—";
  return `${Math.round(ratio * 100)}%`;
}

export function secondsLeft(
  deadline: number | null,
  stored: number,
  running: boolean,
  paused: boolean,
  now: number,
): number {
  if (running && !paused && deadline) return Math.max(0, Math.ceil((deadline - now) / 1000));
  return Math.max(0, stored);
}

export function displayName(first: string, last: string): string {
  return `${first.trim()} ${last.trim()}`.replace(/\s+/g, " ").trim().slice(0, 48);
}

/** US mobile as E.164, or null when it is not 10 digits. */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

export function formatPhone(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  const n = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (n.length !== 10) return e164.trim();
  return `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}`;
}

export function seatInviteText(company: string, name: string, dept: string, url: string): string {
  const who = company && company !== "The Company" ? company : "The Business Machine";
  return `${name}, you're ${dept} at ${who}. Tap to take your seat in the phone browser:\n${url}`;
}
