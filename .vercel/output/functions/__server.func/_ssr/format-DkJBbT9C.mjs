//#region node_modules/.nitro/vite/services/ssr/assets/format-DkJBbT9C.js
function money(cents) {
	if (cents === null || cents === void 0 || Number.isNaN(cents)) return "—";
	return `${cents < 0 ? "-" : ""}$${Math.round(Math.abs(cents) / 100).toLocaleString("en-US")}`;
}
function clock(seconds) {
	const s = Math.max(0, Math.floor(seconds));
	const m = Math.floor(s / 60);
	const r = s % 60;
	return `${m}:${String(r).padStart(2, "0")}`;
}
function pct(ratio) {
	if (ratio === null || ratio === void 0 || Number.isNaN(ratio)) return "—";
	return `${Math.round(ratio * 100)}%`;
}
function secondsLeft(deadline, stored, running, paused, now) {
	if (running && !paused && deadline) return Math.max(0, Math.ceil((deadline - now) / 1e3));
	return Math.max(0, stored);
}
function displayName(first, last) {
	return `${first.trim()} ${last.trim()}`.replace(/\s+/g, " ").trim().slice(0, 48);
}
/** US mobile as E.164, or null when it is not 10 digits. */
function normalizePhone(raw) {
	const digits = raw.replace(/\D/g, "");
	if (digits.length === 10) return `+1${digits}`;
	if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
	return null;
}
function formatPhone(e164) {
	const digits = e164.replace(/\D/g, "");
	const n = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
	if (n.length !== 10) return e164.trim();
	return `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}`;
}
function seatInviteText(company, name, dept, url) {
	return `${name}, you're ${dept} at ${company && company !== "The Company" ? company : "The Business Machine"}. Tap to take your seat in the phone browser:\n${url}`;
}
//#endregion
export { normalizePhone as a, secondsLeft as c, money as i, displayName as n, pct as o, formatPhone as r, seatInviteText as s, clock as t };
