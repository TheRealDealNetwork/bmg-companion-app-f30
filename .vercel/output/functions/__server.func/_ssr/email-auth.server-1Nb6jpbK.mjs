import { r as __exportAll } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { t as getSql } from "./db-DHZvd9Xk.mjs";
import { createHash, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/email-auth.server-1Nb6jpbK.js
var email_auth_server_1Nb6jpbK_exports = /* @__PURE__ */ __exportAll({
	a: () => sendCodeToEmail,
	i: () => email_auth_server_exports,
	n: () => confirmEmailCodeRecord,
	o: () => sendPlainEmail,
	r: () => emailProofValid,
	t: () => clearEmailChallenge
});
var email_auth_server_exports = /* @__PURE__ */ __exportAll$1({
	clearEmailChallenge: () => clearEmailChallenge,
	confirmEmailCodeRecord: () => confirmEmailCodeRecord,
	emailProofValid: () => emailProofValid,
	requestEmailCodeRecord: () => requestEmailCodeRecord,
	sendCodeToEmail: () => sendCodeToEmail,
	sendPlainEmail: () => sendPlainEmail
});
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
var CODE_MINUTES = 10;
var PROOF_MINUTES = 30;
var RESEND_WAIT_MS = 3e4;
function hash(raw) {
	return createHash("sha256").update(raw).digest("hex");
}
function same(raw, digest) {
	if (!raw || !digest) return false;
	const a = Buffer.from(hash(raw));
	const b = Buffer.from(digest);
	if (a.length !== b.length) return false;
	return timingSafeEqual(a, b);
}
function resendCreds() {
	return {
		key: process.env.RESEND_API_KEY?.trim() || "",
		from: process.env.RESEND_FROM?.trim() || "cx@soebluecollar.org"
	};
}
function fromHeader(from) {
	return from.includes("<") ? from : `The Business Machine <${from}>`;
}
function emailOk(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function six() {
	return String(randomInt(0, 1e6)).padStart(6, "0");
}
async function sendPlainEmail(email, subject, text) {
	const clean = email.trim().toLowerCase();
	if (!emailOk(clean)) return {
		ok: false,
		error: "Enter an email address."
	};
	const { key, from } = resendCreds();
	if (!key || !from) return {
		ok: false,
		error: "Email is not turned on yet."
	};
	if (!(await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${key}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			from: fromHeader(from),
			to: [clean],
			subject,
			text
		})
	})).ok) return {
		ok: false,
		error: "The link email could not be sent. Copy the link instead."
	};
	return { ok: true };
}
async function sendWithResend(email, code, kind) {
	const { key, from } = resendCreds();
	if (!key || !from) return {
		ok: false,
		error: "Email codes are not turned on yet. Add the Resend key and a verified from-address."
	};
	const pinReset = kind === "pin";
	if (!(await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${key}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			from: fromHeader(from),
			to: [email],
			subject: pinReset ? "Your Business Machine PIN reset code" : "Your Business Machine sign-up code",
			text: pinReset ? `Your PIN reset code is ${code}. It expires in ${CODE_MINUTES} minutes.\n\nIf you did not ask to reset your PIN, you can ignore this email.` : `Your sign-up code is ${code}. It expires in ${CODE_MINUTES} minutes.\n\nIf you did not ask for this, you can ignore the email.`
		})
	})).ok) return {
		ok: false,
		error: "The code email could not be sent. Try again in a moment."
	};
	return { ok: true };
}
async function sendCodeToEmail(email, kind) {
	const clean = email.trim().toLowerCase();
	if (!emailOk(clean)) return {
		ok: false,
		error: "Enter the email you want the code sent to."
	};
	const sql = await getSql();
	const pending = await sql`select sent_at from email_challenges where email = ${clean} limit 1`;
	const sentAt = pending[0]?.sent_at ? new Date(pending[0].sent_at).getTime() : 0;
	if (sentAt && Date.now() - sentAt < RESEND_WAIT_MS) return {
		ok: false,
		error: "Check your email. You can ask for another code in 30 seconds."
	};
	const code = six();
	const mailed = await sendWithResend(clean, code, kind);
	if (!mailed.ok) return mailed;
	const expires = new Date(Date.now() + CODE_MINUTES * 6e4).toISOString();
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
async function requestEmailCodeRecord(email) {
	const clean = email.trim().toLowerCase();
	if (!emailOk(clean)) return {
		ok: false,
		error: "Enter the email you want the code sent to."
	};
	if ((await (await getSql())`select id from profiles where email = ${clean} limit 1`)[0]) return {
		ok: false,
		error: "That email already has a profile. Sign in with your email or username."
	};
	return sendCodeToEmail(clean, "signup");
}
async function confirmEmailCodeRecord(email, code) {
	const clean = email.trim().toLowerCase();
	const digits = code.replace(/\D/g, "");
	if (!emailOk(clean) || digits.length !== 6) return {
		ok: false,
		error: "Enter the 6-digit code from your email."
	};
	const sql = await getSql();
	const row = (await sql`
    select code_hash, attempts, expires_at from email_challenges where email = ${clean} limit 1
  `)[0];
	if (!row) return {
		ok: false,
		error: "Ask for a code first."
	};
	if (new Date(row.expires_at).getTime() < Date.now()) return {
		ok: false,
		error: "That code expired. Ask for a new one."
	};
	if (row.attempts >= 5) return {
		ok: false,
		error: "Too many tries. Ask for a new code."
	};
	await sql`update email_challenges set attempts = attempts + 1 where email = ${clean}`;
	if (!same(`${clean}\n${digits}`, row.code_hash)) return {
		ok: false,
		error: "That code is wrong."
	};
	const proof = randomBytes(18).toString("hex");
	const until = new Date(Date.now() + PROOF_MINUTES * 6e4).toISOString();
	await sql`
    update email_challenges
    set code_hash = '', attempts = 0, proof_hash = ${hash(proof)}, proof_until = ${until}
    where email = ${clean}
  `;
	return {
		ok: true,
		proof
	};
}
async function emailProofValid(email, proof) {
	const clean = email.trim().toLowerCase();
	if (!proof || proof.length < 16) return false;
	const row = (await (await getSql())`
    select proof_hash, proof_until from email_challenges where email = ${clean} limit 1
  `)[0];
	if (!row?.proof_hash || !row.proof_until) return false;
	if (new Date(row.proof_until).getTime() < Date.now()) return false;
	return same(proof, row.proof_hash);
}
async function clearEmailChallenge(email) {
	await (await getSql())`delete from email_challenges where email = ${email.trim().toLowerCase()}`;
}
//#endregion
export { sendCodeToEmail as a, email_auth_server_1Nb6jpbK_exports as i, confirmEmailCodeRecord as n, sendPlainEmail as o, emailProofValid as r, clearEmailChallenge as t };
