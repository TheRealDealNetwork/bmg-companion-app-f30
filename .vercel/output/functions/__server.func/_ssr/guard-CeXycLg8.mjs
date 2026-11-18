//#region node_modules/.nitro/vite/services/ssr/assets/guard-CeXycLg8.js
var TOKENS = [
	"fuck",
	"shit",
	"bitch",
	"cunt",
	"dick",
	"cock",
	"pussy",
	"asshole",
	"bastard",
	"slut",
	"whore",
	"nigger",
	"nigga",
	"faggot",
	"fag",
	"retard",
	"spic",
	"kike",
	"chink",
	"wetback",
	"tranny",
	"rape",
	"rapist",
	"nazi",
	"hitler",
	"porn",
	"sex",
	"sexy",
	"penis",
	"vagina",
	"blowjob",
	"handjob",
	"cum",
	"jizz",
	"tits",
	"boob",
	"dildo",
	"anal",
	"anus",
	"damn",
	"piss",
	"crap",
	"hell"
];
var CONTAINS = [
	"nigger",
	"nigga",
	"faggot",
	"fuck",
	"shit",
	"cunt",
	"bitch",
	"whore",
	"slut",
	"retard",
	"nazi"
];
var RESERVED = /* @__PURE__ */ new Set([
	"admin",
	"administrator",
	"host",
	"grok",
	"owner",
	"staff",
	"support",
	"system",
	"mod",
	"moderator"
]);
function letters(raw) {
	return raw.toLowerCase().replace(/[@4]/g, "a").replace(/[0]/g, "o").replace(/[1!|]/g, "i").replace(/3/g, "e").replace(/[5$]/g, "s").replace(/7/g, "t").replace(/[^a-z]/g, "");
}
function squash(raw) {
	return letters(raw).replace(/(.)\1+/g, "$1");
}
function isProfane(raw) {
	const flat = letters(raw);
	const tight = squash(raw);
	if (!flat && !tight) return false;
	if (CONTAINS.some((word) => flat.includes(word) || tight.includes(word))) return true;
	return raw.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).map(squash).some((part) => TOKENS.includes(part));
}
function cleanUsername(raw) {
	return raw.trim().toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 32);
}
function usernameError(raw) {
	const name = cleanUsername(raw);
	if (name.length < 3) return "Usernames need at least 3 letters or numbers.";
	if (!/^[a-z][a-z0-9_]{2,31}$/.test(name)) return "Start with a letter. Use only letters, numbers, and underscores.";
	if (RESERVED.has(name) || isProfane(name)) return "That username isn't allowed. Pick another.";
	return null;
}
function personNameError(first, last) {
	const a = first.trim().replace(/\s+/g, " ");
	const b = last.trim().replace(/\s+/g, " ");
	if (a.length < 2 || b.length < 2) return "Enter your first name and full last name.";
	if (a.length > 24 || b.length > 24) return "That name is too long.";
	if (!/^[a-zA-Z][a-zA-Z' -]*$/.test(a) || !/^[a-zA-Z][a-zA-Z' -]*$/.test(b)) return "Use letters in your name.";
	if (isProfane(a) || isProfane(b) || isProfane(`${a} ${b}`)) return "That name isn't allowed.";
	return null;
}
function plainError(value, label) {
	const text = value.trim();
	if (!text) return null;
	if (text.length > 80) return `${label} is too long.`;
	if (isProfane(text)) return `${label} isn't allowed.`;
	return null;
}
//#endregion
export { usernameError as a, plainError as i, isProfane as n, personNameError as r, cleanUsername as t };
