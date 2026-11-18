import { createHash, randomInt, randomBytes, timingSafeEqual } from "node:crypto";
import { getSql } from "@/lib/db";

/**
 * Sign-up codes go out through Resend. The key lives only in this server
 * module (or RESEND_API_KEY / RESEND_FROM if those are set). Never import
 * this file from a page.
 *
 * Roadmap — SMS sign-in, not built yet:
 * A 7-digit code sent from the school number (Twilio, already used for seat
 * invites). The player types that code in the app. Same challenge table shape,
 * purpose = "sms", expiry 10 minutes, 5 tries, then the code is dead.
 * Do not turn that on until the business number and copy are approved.
 */

const CODE_MINUTES = 10;
const PROOF_MINUTES = 30;
const RESEND_WAIT_MS = 30_000;

function hash(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

function same(raw: string, digest: string | null): boolean {
  if (!raw || !digest) return false;
  const a = Buffer.from(hash(raw));
  const b = Buffer.from(digest);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function resendCreds(): { key: string; from: string } {
  const key = process.env.RESEND_API_KEY?.trim() || "";
  const from = process.env.RESEND_FROM?.trim() || "cx@soebluecollar.org";
  return { key, from };
}

function fromHeader(from: string): string {
  return from.includes("<") ? from : `The Business Machine <${from}>`;
}

function emailOk(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function six(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export async function sendPlainEmail(
  email: string,
  subject: string,
  text: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const clean = email.trim().toLowerCase();
  if (!emailOk(clean)) return { ok: false, error: "Enter an email address." };
  const { key, from } = resendCreds();
  if (!key || !from) return { ok: false, error: "Email is not turned on yet." };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromHeader(from),
      to: [clean],
      subject,
      text,
    }),
  });
  if (!res.ok) return { ok: false, error: "The link email could not be sent. Copy the link instead." };
  return { ok: true };
}

async function sendWithResend(email: string, code: string, kind: "signup" | "pin"): Promise<{ ok: true } | { ok: false; error: string }> {
  const { key, from } = resendCreds();
  if (!key || !from) {
    return { ok: false, error: "Email codes are not turned on yet. Add the Resend key and a verified from-address." };
  }
  const pinReset = kind === "pin";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromHeader(from),
      to: [email],
      subject: pinReset ? "Your Business Machine PIN reset code" : "Your Business Machine sign-up code",
      text: pinReset
        ? `Your PIN reset code is ${code}. It expires in ${CODE_MINUTES} minutes.\n\nIf you did not ask to reset your PIN, you can ignore this email.`
        : `Your sign-up code is ${code}. It expires in ${CODE_MINUTES} minutes.\n\nIf you did not ask for this, you can ignore the email.`,
    }),
  });
  if (!res.ok) return { ok: false, error: "The code email could not be sent. Try again in a moment." };
  return { ok: true };
}

export async function sendCodeToEmail(email: string, kind: "signup" | "pin"): Promise<{ ok: true } | { ok: false; error: string }> {
  const clean = email.trim().toLowerCase();
  if (!emailOk(clean)) return { ok: false, error: "Enter the email you want the code sent to." };
  const sql = await getSql();
  const pending = await sql<{ sent_at: Date | string }>`select sent_at from email_challenges where email = ${clean} limit 1`;
  const sentAt = pending[0]?.sent_at ? new Date(pending[0].sent_at).getTime() : 0;
  if (sentAt && Date.now() - sentAt < RESEND_WAIT_MS) {
    return { ok: false, error: "Check your email. You can ask for another code in 30 seconds." };
  }
  const code = six();
  const mailed = await sendWithResend(clean, code, kind);
  if (!mailed.ok) return mailed;
  const expires = new Date(Date.now() + CODE_MINUTES * 60_000).toISOString();
  await sql`
    insert into email_challenges (email, code_hash, attempts, sent_at, expires_at, proof_hash, proof_until)
    values (${clean}, ${hash(`${clean}\n${code}`)}, 0, now(), ${expires}, null, null)
    on conflict (email) do update set
      code_hash = excluded.code_hash,
      attempts = 0,
      sent_at = now(),
      expires_at = excluded.expires_at,
      proof_hash = null,
      proof_until = null
  `;
  return { ok: true };
}

export async function requestEmailCodeRecord(email: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const clean = email.trim().toLowerCase();
  if (!emailOk(clean)) return { ok: false, error: "Enter the email you want the code sent to." };
  const sql = await getSql();
  const taken = await sql<{ id: string }>`select id from profiles where email = ${clean} limit 1`;
  if (taken[0]) return { ok: false, error: "That email already has a profile. Sign in with your email or username." };
  return sendCodeToEmail(clean, "signup");
}

export async function confirmEmailCodeRecord(email: string, code: string): Promise<{ ok: true; proof: string } | { ok: false; error: string }> {
  const clean = email.trim().toLowerCase();
  const digits = code.replace(/\D/g, "");
  if (!emailOk(clean) || digits.length !== 6) return { ok: false, error: "Enter the 6-digit code from your email." };
  const sql = await getSql();
  const rows = await sql<{ code_hash: string; attempts: number; expires_at: Date | string }>`
    select code_hash, attempts, expires_at from email_challenges where email = ${clean} limit 1
  `;
  const row = rows[0];
  if (!row) return { ok: false, error: "Ask for a code first." };
  if (new Date(row.expires_at).getTime() < Date.now()) return { ok: false, error: "That code expired. Ask for a new one." };
  if (row.attempts >= 5) return { ok: false, error: "Too many tries. Ask for a new code." };
  await sql`update email_challenges set attempts = attempts + 1 where email = ${clean}`;
  if (!same(`${clean}\n${digits}`, row.code_hash)) return { ok: false, error: "That code is wrong." };
  const proof = randomBytes(18).toString("hex");
  const until = new Date(Date.now() + PROOF_MINUTES * 60_000).toISOString();
  await sql`
    update email_challenges
    set code_hash = '', attempts = 0, proof_hash = ${hash(proof)}, proof_until = ${until}
    where email = ${clean}
  `;
  return { ok: true, proof };
}

export async function emailProofValid(email: string, proof: string): Promise<boolean> {
  const clean = email.trim().toLowerCase();
  if (!proof || proof.length < 16) return false;
  const sql = await getSql();
  const rows = await sql<{ proof_hash: string | null; proof_until: Date | string | null }>`
    select proof_hash, proof_until from email_challenges where email = ${clean} limit 1
  `;
  const row = rows[0];
  if (!row?.proof_hash || !row.proof_until) return false;
  if (new Date(row.proof_until).getTime() < Date.now()) return false;
  return same(proof, row.proof_hash);
}

export async function clearEmailChallenge(email: string): Promise<void> {
  const sql = await getSql();
  await sql`delete from email_challenges where email = ${email.trim().toLowerCase()}`;
}
