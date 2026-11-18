const TOKENS = [
  "fuck", "shit", "bitch", "cunt", "dick", "cock", "pussy", "asshole", "bastard", "slut", "whore",
  "nigger", "nigga", "faggot", "fag", "retard", "spic", "kike", "chink", "wetback", "tranny",
  "rape", "rapist", "nazi", "hitler", "porn", "sex", "sexy", "penis", "vagina", "blowjob", "handjob",
  "cum", "jizz", "tits", "boob", "dildo", "anal", "anus", "damn", "piss", "crap", "hell",
];

const CONTAINS = ["nigger", "nigga", "faggot", "fuck", "shit", "cunt", "bitch", "whore", "slut", "retard", "nazi"];

const RESERVED = new Set(["admin", "administrator", "host", "grok", "owner", "staff", "support", "system", "mod", "moderator"]);

function letters(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[@4]/g, "a")
    .replace(/[0]/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/3/g, "e")
    .replace(/[5$]/g, "s")
    .replace(/7/g, "t")
    .replace(/[^a-z]/g, "");
}

function squash(raw: string): string {
  return letters(raw).replace(/(.)\1+/g, "$1");
}

export function isProfane(raw: string): boolean {
  const flat = letters(raw);
  const tight = squash(raw);
  if (!flat && !tight) return false;
  if (CONTAINS.some((word) => flat.includes(word) || tight.includes(word))) return true;
  const parts = raw.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).map(squash);
  return parts.some((part) => TOKENS.includes(part));
}

export function cleanUsername(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 32);
}

export function usernameError(raw: string): string | null {
  const name = cleanUsername(raw);
  if (name.length < 3) return "Usernames need at least 3 letters or numbers.";
  if (!/^[a-z][a-z0-9_]{2,31}$/.test(name)) return "Start with a letter. Use only letters, numbers, and underscores.";
  if (RESERVED.has(name) || isProfane(name)) return "That username isn't allowed. Pick another.";
  return null;
}

export function personNameError(first: string, last: string): string | null {
  const a = first.trim().replace(/\s+/g, " ");
  const b = last.trim().replace(/\s+/g, " ");
  if (a.length < 2 || b.length < 2) return "Enter your first name and full last name.";
  if (a.length > 24 || b.length > 24) return "That name is too long.";
  if (!/^[a-zA-Z][a-zA-Z' -]*$/.test(a) || !/^[a-zA-Z][a-zA-Z' -]*$/.test(b)) return "Use letters in your name.";
  if (isProfane(a) || isProfane(b) || isProfane(`${a} ${b}`)) return "That name isn't allowed.";
  return null;
}

export function plainError(value: string, label: string): string | null {
  const text = value.trim();
  if (!text) return null;
  if (text.length > 80) return `${label} is too long.`;
  if (isProfane(text)) return `${label} isn't allowed.`;
  return null;
}
