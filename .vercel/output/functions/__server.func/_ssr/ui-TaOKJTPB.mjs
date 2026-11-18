import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { c as secondsLeft, i as money, o as pct, t as clock } from "./format-DkJBbT9C.mjs";
import { i as useLang, t as LangSwitch } from "./lang-C7kQIzzx.mjs";
import { i as UserRound, t as Volume2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-TaOKJTPB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createGame = createServerFn({ method: "POST" }).validator((input) => ({
	company: String(input?.company ?? ""),
	rehearsal: Boolean(input?.rehearsal),
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(createSsrRpc("6575fe05311bcd7848cdfbe88717cc28ed9400ca673a8ff177b6818b31deffee"));
var listGames = createServerFn({ method: "POST" }).validator((input) => ({
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(createSsrRpc("96f14f73c994370f023589e7cd2499138d22ca999fade0f8c9eb0a301adff2c7"));
var resumeHost = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	adminToken: String(input?.adminToken ?? ""),
	hostToken: input?.hostToken ? String(input.hostToken) : void 0,
	profileSecret: String(input?.profileSecret ?? "")
})).handler(createSsrRpc("63e46883dd5fb084524623187d21ec9c9042f96cd4bcd87dfd1b641b4a0a56ea"));
var resetGame = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(createSsrRpc("2c88b50ea0e70d958a3ba33eb17013c806970b960e35d39300b20f3476feb27c"));
var deleteGame = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(createSsrRpc("e7bed325ed9240d09880583e81766125349a977ed2537f5e413e86df8d4656e4"));
var addHost = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	adminToken: String(input?.adminToken ?? ""),
	label: String(input?.label ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(createSsrRpc("2982dcc265448ae9e9d9acc18661c062ab8667e96028b283a8dcbfd27db29cd2"));
var removeHost = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	adminToken: String(input?.adminToken ?? ""),
	adminId: String(input?.adminId ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(createSsrRpc("0e62e8692c19951b6fd4517daedcd88aa4aef66ced99c72e674bf475524deb87"));
var readGame = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	hostToken: input?.hostToken ? String(input.hostToken) : void 0,
	playerId: input?.playerId ? String(input.playerId) : void 0,
	playerToken: input?.playerToken ? String(input.playerToken) : void 0
})).handler(createSsrRpc("cd08e7c4f1fd5a44257ad689ba1db388eb77daaf4d102edaa772db55da4cbcc8"));
var publicJoinLink = createServerFn({ method: "POST" }).validator((input) => ({ code: String(input?.code ?? "") })).handler(createSsrRpc("707820e82dc776faf562ce3fc76df29bf7e1755bdeb0fe3e3bea62e9d00c055f"));
var joinGame = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	name: String(input?.name ?? ""),
	dept: String(input?.dept ?? ""),
	seat: String(input?.seat ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(createSsrRpc("5d84cc7283425ddc14d9e6ec277bc5aa4a160e1fe0eb935ae3c10e6e0f1ad480"));
var previewSeat = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	seat: String(input?.seat ?? "")
})).handler(createSsrRpc("926d0271547b1d35e2693e31c0dbffc8f05ca719ab3c0eaf3a9c99fff475224a"));
var assumeSeat = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	hostToken: String(input?.hostToken ?? ""),
	playerId: String(input?.playerId ?? "")
})).handler(createSsrRpc("180267ee6079b6f75d1a9a61f6fece3290a53211396874503acb111a89ce428d"));
var hostAct = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	hostToken: String(input?.hostToken ?? ""),
	type: String(input?.type ?? ""),
	payload: input?.payload && typeof input.payload === "object" ? input.payload : {}
})).handler(createSsrRpc("26b3661fc0b41ec705a41d6e315c6cbde6c841a09a517a41184ce822456d8788"));
var playerAct = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	playerId: String(input?.playerId ?? ""),
	playerToken: String(input?.playerToken ?? ""),
	type: String(input?.type ?? ""),
	payload: input?.payload && typeof input.payload === "object" ? input.payload : {}
})).handler(createSsrRpc("a4f503c7baf8d100833481fd526d54d1daaaa09c1c414b548bd0a3ded2344f2c"));
var lookupCard = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	raw: String(input?.raw ?? ""),
	dept: input?.dept ? String(input.dept) : void 0,
	hostToken: input?.hostToken ? String(input.hostToken) : void 0,
	playerId: input?.playerId ? String(input.playerId) : void 0,
	playerToken: input?.playerToken ? String(input.playerToken) : void 0
})).handler(createSsrRpc("e889f82d9933de9d5eeb306928ee9c40a0a6bcdfea68bc9ea4473a3538c01939"));
var hostCatalog = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	hostToken: String(input?.hostToken ?? "")
})).handler(createSsrRpc("b369db19929271bb398210e4c8b3a1333586fc5558259fc191cb028e2db8a133"));
var speak = createServerFn({ method: "POST" }).validator((input) => ({ text: String(input?.text ?? "").slice(0, 1800) })).handler(createSsrRpc("54d55bd5be629952cf916ebfe9fa78078ef7451d8f13ce14d6453cf609cdb6f5"));
var requestEmailCode = createServerFn({ method: "POST" }).validator((input) => ({ email: String(input?.email ?? "").trim().toLowerCase().slice(0, 80) })).handler(createSsrRpc("5aa0a30fbad251e6fdce9d9004aab4b5b17fe9e3fb6c42349373f78dd846e1e4"));
var confirmEmailCode = createServerFn({ method: "POST" }).validator((input) => ({
	email: String(input?.email ?? "").trim().toLowerCase().slice(0, 80),
	code: String(input?.code ?? "").replace(/\D/g, "").slice(0, 6)
})).handler(createSsrRpc("b4d31326e74504bea46a48aa70c34aa2063b6b2b84e66f79345c38c0126dc09a"));
var imagineAvatar = createServerFn({ method: "POST" }).validator((input) => ({ prompt: String(input?.prompt ?? "").slice(0, 240) })).handler(createSsrRpc("d9b08057ea97f141435c1dbb8b7a0481042c9a766a568a6da76ae265d821d1c8"));
var saveProfile = createServerFn({ method: "POST" }).validator((input) => input ?? {}).handler(createSsrRpc("b8500a7183652fb7510e0b9687118af5a6d89280eaebc0e27a87df46afa35f0d"));
var signInProfile = createServerFn({ method: "POST" }).validator((input) => ({
	username: String(input?.username ?? "").trim().slice(0, 80),
	pin: String(input?.pin ?? "")
})).handler(createSsrRpc("167b97ee44f1981a414fd63850ddb7a60c5fe660a37ee9f2a3ca9fa173eb4cec"));
var requestPinReset = createServerFn({ method: "POST" }).validator((input) => ({ login: String(input?.login ?? "").trim().slice(0, 80) })).handler(createSsrRpc("d2290995bacb3f7735d177d0cfd6492aea34669c8957ce8db850343333a797e3"));
var confirmPinReset = createServerFn({ method: "POST" }).validator((input) => ({
	login: String(input?.login ?? "").trim().slice(0, 80),
	code: String(input?.code ?? "").replace(/\D/g, "").slice(0, 6)
})).handler(createSsrRpc("bef972fe9a6c9c192ec876344827524e4a85b7f9b9530482608d42bed3e3991d"));
var resetPin = createServerFn({ method: "POST" }).validator((input) => ({
	login: String(input?.login ?? "").trim().slice(0, 80),
	proof: String(input?.proof ?? ""),
	pin: String(input?.pin ?? "").replace(/\D/g, "").slice(0, 8)
})).handler(createSsrRpc("90209f40f140119c0c715407c78292c3bb3b49e8e0b5e304e1738b2a8675a0dc"));
var readProfile = createServerFn({ method: "POST" }).validator((input) => ({ secret: String(input?.secret ?? "") })).handler(createSsrRpc("df2714a4e0555ddcc63089fc5ce2ec526d2b44f93c35c5a88f84e79b331201c9"));
var publicProfile = createServerFn({ method: "POST" }).validator((input) => ({ username: String(input?.username ?? "") })).handler(createSsrRpc("b940a4224b9e89672302629254a651e711f83dece35e37679ecb06e0b60ef77d"));
var searchPeople = createServerFn({ method: "POST" }).validator((input) => ({
	secret: String(input?.secret ?? ""),
	username: String(input?.username ?? "")
})).handler(createSsrRpc("7a3ad47158208b9302c1ab138353d0fdc3342a2a07266c2d55451693c364adc6"));
var friendAct = createServerFn({ method: "POST" }).validator((input) => ({
	secret: String(input?.secret ?? ""),
	username: String(input?.username ?? ""),
	action: String(input?.action ?? "")
})).handler(createSsrRpc("399d551c3a63eae5f3e7c9e076807a1c2982a57a97cb952b2bdc6b7821093822"));
var sendMessage = createServerFn({ method: "POST" }).validator((input) => ({
	secret: String(input?.secret ?? ""),
	username: String(input?.username ?? ""),
	body: String(input?.body ?? "")
})).handler(createSsrRpc("689085ae41db128f62eb941e1b3a5e99faafe4c49461b47ad8c7e5ff5932f5e9"));
var readThread = createServerFn({ method: "POST" }).validator((input) => ({
	secret: String(input?.secret ?? ""),
	username: String(input?.username ?? "")
})).handler(createSsrRpc("f216dfe5ac6aa2a8a0610c30c9412d169d5796457dc33c8e9168a5352003a6b7"));
var setProfileRank = createServerFn({ method: "POST" }).validator((input) => ({
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? ""),
	username: String(input?.username ?? ""),
	rank: String(input?.rank ?? "")
})).handler(createSsrRpc("cb55f6ee317443ad510c49f876f8d2334b4935a027a439650983111fd152298f"));
var loadInsights = createServerFn({ method: "POST" }).validator((input) => ({
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? ""),
	code: String(input?.code ?? ""),
	dept: String(input?.dept ?? ""),
	person: String(input?.person ?? ""),
	includeRehearsal: Boolean(input?.includeRehearsal)
})).handler(createSsrRpc("2300065dececd9be35ee9d2cb3cc464deead4878f15d8f319b51a3da5ee9d383"));
var askInsights = createServerFn({ method: "POST" }).validator((input) => ({
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? ""),
	question: String(input?.question ?? ""),
	code: String(input?.code ?? ""),
	dept: String(input?.dept ?? ""),
	person: String(input?.person ?? ""),
	includeRehearsal: Boolean(input?.includeRehearsal)
})).handler(createSsrRpc("24136c423c4241657e2587f98d959f13f6dca4137729c9601fceae826d4e4c8a"));
var lookupUsername = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	hostToken: String(input?.hostToken ?? ""),
	username: String(input?.username ?? "")
})).handler(createSsrRpc("646c3ff30e04a6cead53fc0b8563083037bcffec988d0d1f275d59126f73b8f7"));
var KEY = "bm-session-v1";
var COOKIE = "bm-seat";
function readCookie() {
	if (typeof document === "undefined") return {};
	const raw = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE}=`));
	if (!raw) return {};
	try {
		return JSON.parse(decodeURIComponent(raw.slice(8)));
	} catch {
		return {};
	}
}
function writeCookie(code, slot) {
	if (typeof document === "undefined") return;
	if (!slot.playerId || !slot.playerToken) return;
	const value = encodeURIComponent(JSON.stringify({
		code,
		playerId: slot.playerId,
		playerToken: slot.playerToken,
		name: slot.name
	}));
	document.cookie = `${COOKIE}=${value}; Path=/; Max-Age=2592000; SameSite=Lax`;
}
function readAll() {
	if (typeof window === "undefined") return {};
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}
function readSlot(code) {
	const id = code.toUpperCase();
	const saved = readAll()[id];
	if (saved?.playerId && saved.playerToken) return saved;
	const cookie = readCookie();
	if (cookie.code === id && cookie.playerId && cookie.playerToken) {
		const restored = {
			...saved,
			playerId: cookie.playerId,
			playerToken: cookie.playerToken,
			name: cookie.name
		};
		if (typeof window !== "undefined") {
			const all = readAll();
			all[id] = restored;
			localStorage.setItem(KEY, JSON.stringify(all));
		}
		return restored;
	}
	return saved ?? {};
}
function writeSlot(code, patch) {
	const all = readAll();
	const id = code.toUpperCase();
	all[id] = {
		...all[id],
		...patch
	};
	localStorage.setItem(KEY, JSON.stringify(all));
	writeCookie(id, all[id]);
	window.dispatchEvent(new Event("bm-session"));
}
var ADMIN = "bm-admin-v1";
function adminToken() {
	if (typeof window === "undefined") return "";
	const existing = localStorage.getItem(ADMIN)?.trim() ?? "";
	if (existing.length >= 16) return existing;
	const created = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "");
	localStorage.setItem(ADMIN, created);
	return created;
}
function setAdminToken(token) {
	const next = token.trim();
	if (next.length < 16) return false;
	localStorage.setItem(ADMIN, next);
	window.dispatchEvent(new Event("bm-session"));
	return true;
}
function clearPlayer(code) {
	const all = readAll();
	const id = code.toUpperCase();
	if (!all[id]) return;
	delete all[id].playerId;
	delete all[id].playerToken;
	delete all[id].name;
	localStorage.setItem(KEY, JSON.stringify(all));
	window.dispatchEvent(new Event("bm-session"));
}
var PROFILE = "bm-profile-v1";
function readProfileSession() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(PROFILE);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed.secret || !parsed.username) return null;
		return parsed;
	} catch {
		return null;
	}
}
function writeProfileSession(profile) {
	localStorage.setItem(PROFILE, JSON.stringify(profile));
	window.dispatchEvent(new Event("bm-session"));
}
function clearProfileSession() {
	localStorage.removeItem(PROFILE);
	window.dispatchEvent(new Event("bm-session"));
}
function useSlot(code) {
	const [slot, setSlot] = (0, import_react.useState)(() => readSlot(code));
	(0, import_react.useEffect)(() => {
		const load = () => setSlot(readSlot(code));
		load();
		window.addEventListener("bm-session", load);
		window.addEventListener("storage", load);
		return () => {
			window.removeEventListener("bm-session", load);
			window.removeEventListener("storage", load);
		};
	}, [code]);
	return slot;
}
function useGame(code, mode) {
	const slot = useSlot(code);
	const qc = useQueryClient();
	const enabled = mode === "room" || (mode === "host" ? Boolean(slot.hostToken) : Boolean(slot.playerId));
	const query = useQuery({
		queryKey: [
			"game",
			code,
			mode,
			slot.hostToken ?? "",
			slot.playerId ?? ""
		],
		enabled,
		refetchInterval: 1500,
		queryFn: () => readGame({ data: {
			code,
			hostToken: mode === "host" ? slot.hostToken : void 0,
			playerId: mode === "player" ? slot.playerId : void 0,
			playerToken: mode === "player" ? slot.playerToken : void 0
		} })
	});
	const view = query.data && query.data.ok ? query.data.view : null;
	const error = query.data && !query.data.ok ? query.data.error : null;
	function take(next) {
		if (next.ok && next.view) qc.setQueryData([
			"game",
			code,
			mode,
			slot.hostToken ?? "",
			slot.playerId ?? ""
		], next);
		return next;
	}
	return {
		slot,
		view,
		error,
		loading: query.isLoading,
		enabled,
		saveHost(token) {
			writeSlot(code, { hostToken: token });
		},
		async host(type, payload) {
			if (!slot.hostToken) return {
				ok: false,
				error: "Host key missing on this device."
			};
			return take(await hostAct({ data: {
				code,
				hostToken: slot.hostToken,
				type,
				payload
			} }));
		},
		async player(type, payload) {
			if (!slot.playerId || !slot.playerToken) return {
				ok: false,
				error: "Join this game on this phone first."
			};
			return take(await playerAct({ data: {
				code,
				playerId: slot.playerId,
				playerToken: slot.playerToken,
				type,
				payload
			} }));
		}
	};
}
function useServerNow(serverStamp) {
	const skew = (0, import_react.useRef)(0);
	const seen = (0, import_react.useRef)(null);
	if (seen.current !== serverStamp) {
		seen.current = serverStamp;
		skew.current = serverStamp - Date.now();
	}
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	return now + skew.current;
}
function ProfileBlock({ onReady, onClear, start = "create" }) {
	const { lang, setLang } = useLang();
	const [mode, setMode] = (0, import_react.useState)(start);
	const [held, setHeld] = (0, import_react.useState)(() => readProfileSession());
	const [first, setFirst] = (0, import_react.useState)("");
	const [last, setLast] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [pin, setPin] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [stateName, setStateName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [firstTime, setFirstTime] = (0, import_react.useState)("yes");
	const [trades, setTrades] = (0, import_react.useState)("new");
	const [title, setTitle] = (0, import_react.useState)("");
	const [company, setCompany] = (0, import_react.useState)("");
	const [workCity, setWorkCity] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [proof, setProof] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [cool, setCool] = (0, import_react.useState)(0);
	const [nextPin, setNextPin] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (cool <= 0) return;
		const timer = window.setTimeout(() => setCool((n) => n - 1), 1e3);
		return () => window.clearTimeout(timer);
	}, [cool]);
	function markSent() {
		setSent(true);
		setCool(30);
	}
	if (held) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 rounded-xl bg-navy-2 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-cream",
				children: [
					held.first,
					" ",
					held.last
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Your username stays off the board. The table uses your real name."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-2 text-sm font-semibold text-gold",
				onClick: () => {
					clearProfileSession();
					setHeld(null);
					setMode("return");
					onClear?.();
				},
				children: "Use a different username"
			})
		]
	});
	async function submit() {
		setBusy(true);
		setErr("");
		try {
			const res = mode === "return" ? await signInProfile({ data: {
				username,
				pin
			} }) : await saveProfile({ data: {
				username,
				pin,
				first,
				last,
				city,
				state: stateName,
				email,
				phone,
				emailProof: proof,
				firstTime: firstTime === "yes",
				trades,
				title,
				company,
				workCity
			} });
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			const next = {
				id: res.id,
				secret: res.secret,
				username: res.username,
				first: res.first,
				last: res.last
			};
			writeProfileSession(next);
			setHeld(next);
			onReady(next);
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not save that profile.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
					lang,
					setLang
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `min-h-10 flex-1 rounded-full text-sm font-semibold ${mode === "create" ? "bg-gold text-navy" : "bg-navy-2 text-cream"}`,
					onClick: () => setMode("create"),
					children: lang === "es" ? "Nuevo usuario" : "New username"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `min-h-10 flex-1 rounded-full text-sm font-semibold ${mode === "return" ? "bg-gold text-navy" : "bg-navy-2 text-cream"}`,
					onClick: () => setMode("return"),
					children: lang === "es" ? "Ya tengo uno" : "I already have one"
				})]
			}),
			mode === "create" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				"aria-label": lang === "es" ? "Nombre" : "First name",
				value: first,
				onChange: (e) => setFirst(e.target.value),
				placeholder: lang === "es" ? "Nombre" : "First name",
				autoComplete: "given-name"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				"aria-label": lang === "es" ? "Apellido" : "Last name",
				value: last,
				onChange: (e) => setLast(e.target.value),
				placeholder: lang === "es" ? "Apellido" : "Full last name",
				autoComplete: "family-name"
			})] }) : null,
			mode !== "reset" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				"aria-label": mode === "return" ? lang === "es" ? "Correo o nombre de usuario" : "Email or username" : lang === "es" ? "Nombre de usuario" : "Username",
				value: username,
				onChange: (e) => setUsername(e.target.value),
				placeholder: mode === "return" ? lang === "es" ? "Correo o nombre de usuario" : "Email or username" : lang === "es" ? "Nombre de usuario" : "Username",
				autoComplete: mode === "return" ? "username" : "username"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				"aria-label": "PIN",
				value: pin,
				onChange: (e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8)),
				placeholder: lang === "es" ? "PIN, de 4 a 8 dígitos" : "PIN, 4 to 8 digits",
				inputMode: "numeric",
				autoComplete: mode === "return" ? "current-password" : "new-password"
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetPin, {
				busy,
				setBusy,
				cool,
				sent,
				code,
				proof,
				nextPin,
				setCode,
				setProof,
				setNextPin,
				setErr,
				onSent: markSent,
				onDone: (next) => {
					writeProfileSession(next);
					setHeld(next);
					onReady(next);
				}
			}),
			mode === "create" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"aria-label": lang === "es" ? "Primera vez" : "First time",
					value: firstTime,
					onChange: (e) => setFirstTime(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "yes",
						children: lang === "es" ? "Es la primera vez que juego" : "This is my first time playing"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "no",
						children: lang === "es" ? "Ya he jugado" : "I have played before"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"aria-label": lang === "es" ? "Experiencia en los oficios" : "Trades experience",
					value: trades,
					onChange: (e) => setTrades(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "new",
							children: lang === "es" ? "Soy nuevo en los oficios" : "New to the trades"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "familiar",
							children: lang === "es" ? "Conozco los oficios" : "Familiar with the trades"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "working",
							children: lang === "es" ? "Ya trabajo en los oficios" : "I already work in the trades"
						})
					]
				}),
				trades === "working" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Title",
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Your title"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Company",
						value: company,
						onChange: (e) => setCompany(e.target.value),
						placeholder: "Company"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Work location",
						value: workCity,
						onChange: (e) => setWorkCity(e.target.value),
						placeholder: "City you work in"
					})
				] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed text-muted",
					children: lang === "es" ? "El correo es obligatorio. Te enviamos un código de 6 dígitos para que solo tú puedas abrir este perfil. La ciudad, el estado y el teléfono siguen siendo opcionales. La escuela puede usar tu correo para informes, ofertas y posibles oportunidades de trabajo. Tu nombre de usuario nunca se muestra durante el juego." : "Email is required. We send a 6-digit code so only you can open this profile. City, state, and phone stay optional. The school can use your email for reports, offers, and possible job leads. Your username is never shown during play."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": lang === "es" ? "Ciudad" : "City",
						value: city,
						onChange: (e) => setCity(e.target.value),
						placeholder: lang === "es" ? "Ciudad" : "City"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": lang === "es" ? "Estado" : "State",
						value: stateName,
						onChange: (e) => setStateName(e.target.value),
						placeholder: lang === "es" ? "Estado" : "State"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					"aria-label": lang === "es" ? "Correo electrónico" : "Email",
					value: email,
					onChange: (e) => {
						setEmail(e.target.value);
						setSent(false);
						setProof("");
						setCode("");
					},
					placeholder: lang === "es" ? "Correo electrónico" : "Email",
					autoComplete: "email"
				}),
				proof ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-gold",
					children: "Email confirmed."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "navy",
					className: "w-full",
					disabled: busy || cool > 0,
					onClick: () => {
						setBusy(true);
						setErr("");
						requestEmailCode({ data: { email } }).then((res) => {
							if (!res.ok) setErr(res.error);
							else markSent();
						}).catch(() => setErr("Could not send the code.")).finally(() => setBusy(false));
					},
					children: cool > 0 ? `Send again in ${cool}s` : sent ? "Send again" : lang === "es" ? "Envíame un código por correo" : "Email me a code"
				}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					"aria-label": "Email code",
					value: code,
					onChange: (e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
					placeholder: "6-digit code",
					inputMode: "numeric",
					autoComplete: "one-time-code"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "navy",
					className: "w-full",
					disabled: busy || code.length !== 6,
					onClick: () => {
						setBusy(true);
						setErr("");
						confirmEmailCode({ data: {
							email,
							code
						} }).then((res) => {
							if (!res.ok) setErr(res.error);
							else setProof(res.proof);
						}).catch(() => setErr("Could not check that code.")).finally(() => setBusy(false));
					},
					children: "Confirm code"
				})] }) : null] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					"aria-label": lang === "es" ? "Teléfono, opcional" : "Phone",
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					placeholder: lang === "es" ? "Teléfono, opcional" : "Phone, optional",
					inputMode: "tel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed text-muted",
					children: lang === "es" ? "El inicio de sesión por mensaje de texto está en el plan: un código de 7 dígitos a este número, que se escribe aquí. Todavía no está activado." : "Text-message sign-in is on the roadmap: a 7-digit code to this number, typed back here. It is not turned on yet."
				})
			] }) : null,
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-orange-ink",
				children: err
			}) : null,
			mode === "return" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-sm font-semibold text-gold",
				onClick: () => {
					setMode("reset");
					setErr("");
					setSent(false);
					setProof("");
					setCode("");
					setCool(0);
				},
				children: lang === "es" ? "Restablecer mi PIN" : "Reset my PIN"
			}) : null,
			mode === "reset" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-sm font-semibold text-gold",
				onClick: () => {
					setMode("return");
					setErr("");
				},
				children: "Back to sign in"
			}) : null,
			mode !== "reset" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				className: "w-full",
				disabled: busy || mode === "create" && !proof,
				onClick: () => void submit(),
				children: busy ? lang === "es" ? "Guardando…" : "Saving…" : mode === "create" ? lang === "es" ? "Guardar mi nombre de usuario" : "Save my username" : lang === "es" ? "Abrir mi perfil" : "Open my profile"
			}) : null
		]
	});
}
function ResetPin({ busy, setBusy, cool, sent, code, proof, nextPin, setCode, setProof, setNextPin, setErr, onSent, onDone }) {
	const [login, setLogin] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-cream",
			children: "We'll email a 6-digit code to the address on that profile. Then you choose a new PIN."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			"aria-label": "Email or username for reset",
			value: login,
			onChange: (e) => {
				setLogin(e.target.value);
				setProof("");
				setCode("");
			},
			placeholder: "Email or username",
			autoComplete: "username"
		}),
		proof ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-gold",
				children: "Code confirmed. Choose a new PIN."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				"aria-label": "New PIN",
				value: nextPin,
				onChange: (e) => setNextPin(e.target.value.replace(/\D/g, "").slice(0, 8)),
				placeholder: "New PIN, 4 to 8 digits",
				inputMode: "numeric",
				autoComplete: "new-password"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				className: "w-full",
				disabled: busy || nextPin.length < 4,
				onClick: () => {
					setBusy(true);
					setErr("");
					resetPin({ data: {
						login,
						proof,
						pin: nextPin
					} }).then((res) => {
						if (!res.ok) setErr(res.error);
						else onDone({
							id: res.id,
							secret: res.secret,
							username: res.username,
							first: res.first,
							last: res.last
						});
					}).catch(() => setErr("Could not save that PIN.")).finally(() => setBusy(false));
				},
				children: busy ? "Saving…" : "Save new PIN"
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "navy",
			className: "w-full",
			disabled: busy || cool > 0,
			onClick: () => {
				setBusy(true);
				setErr("");
				requestPinReset({ data: { login } }).then((res) => {
					if (!res.ok) setErr(res.error);
					else onSent();
				}).catch(() => setErr("Could not send the code.")).finally(() => setBusy(false));
			},
			children: cool > 0 ? `Send again in ${cool}s` : sent ? "Send again" : "Email me a reset code"
		}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			"aria-label": "Reset code",
			value: code,
			onChange: (e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
			placeholder: "6-digit code",
			inputMode: "numeric",
			autoComplete: "one-time-code"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "navy",
			className: "w-full",
			disabled: busy || code.length !== 6,
			onClick: () => {
				setBusy(true);
				setErr("");
				confirmPinReset({ data: {
					login,
					code
				} }).then((res) => {
					if (!res.ok) setErr(res.error);
					else setProof(res.proof);
				}).catch(() => setErr("Could not check that code.")).finally(() => setBusy(false));
			},
			children: "Confirm code"
		})] }) : null] })
	] });
}
function AccountMenu() {
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const root = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const sync = () => setProfile(readProfileSession());
		sync();
		window.addEventListener("bm-session", sync);
		return () => window.removeEventListener("bm-session", sync);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onDoc(event) {
			if (!root.current?.contains(event.target)) setOpen(false);
		}
		function onKey(event) {
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
		navigator.clipboard?.writeText(`${window.location.origin}/p/${name}`);
		setCopied(true);
	}
	function signOut() {
		clearProfileSession();
		setOpen(false);
		if (window.location.pathname === "/me") window.location.href = "/";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: root,
		className: "relative shrink-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": profile ? "Profile and settings" : "Sign in or sign up",
				"aria-expanded": open,
				onClick: () => setOpen((v) => !v),
				className: `flex size-11 touch-manipulation items-center justify-center overflow-hidden rounded-full border-2 ${profile ? "border-gold bg-gold text-navy" : "border-gold bg-transparent text-gold"}`,
				children: profile?.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: profile.avatar,
					alt: "",
					className: "size-full rounded-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
					className: "size-6",
					"aria-hidden": true
				})
			}),
			open && !profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-0 z-40 mt-2 max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] overflow-auto rounded-2xl border border-gold bg-card p-3 shadow-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl text-cream",
						children: "Sign in / Sign up"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "The table uses your real name. Your username stays off the board."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileBlock, { onReady: () => setOpen(false) })
				]
			}) : null,
			open && profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-2xl border border-gold bg-card shadow-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "border-b border-line px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block font-semibold text-cream",
						children: [
							profile.first,
							" ",
							profile.last
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: "Signed in"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col py-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuLink, {
							href: "/me#profile",
							children: "Profile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuLink, {
							href: "/me#settings",
							children: "Contact and photo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuLink, {
							href: "/me#record",
							children: "Roles and progression"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuLink, {
							href: "/me#friends",
							children: "Friends"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "px-3 py-2 text-left text-cream hover:bg-navy-2",
							onClick: share,
							children: copied ? "Link copied" : "Share results"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "px-3 py-2 text-left text-gold hover:bg-navy-2",
							onClick: signOut,
							children: "Sign out"
						})
					]
				})]
			}) : null
		]
	});
}
function MenuLink({ href, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className: "px-3 py-2 text-cream hover:bg-navy-2",
		children
	});
}
function BrandBar({ light = false, trail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `border-b bg-navy text-cream ${light ? "border-gold" : "border-gold/40"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logo-tlp.png",
					alt: "The School of Entrepreneurship, Trades Leadership Program",
					className: "h-12 w-auto rounded-full bg-cream"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg leading-tight text-cream",
						children: "The Business Machine"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-gold",
						children: "Trades Leadership Program"
					})]
				}),
				trail,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountMenu, {})
			]
		})
	});
}
var kinds = {
	primary: "bg-[#D4A05C] text-navy",
	navy: "border border-[#2E86AB] bg-transparent text-[#2E86AB]",
	ghost: "border-2 border-[#D4A05C] bg-transparent text-[#D4A05C]",
	gold: "bg-[#D4A05C] text-[#0C1230]"
};
function Btn({ kind = "primary", className = "", href, children, onClick, onPointerDown, type = "button", ...props }) {
	const cls = `inline-flex min-h-11 touch-manipulation items-center justify-center rounded-xl px-4 py-2 text-center text-sm font-semibold no-underline select-none transition active:scale-[0.98] active:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:pointer-events-none disabled:opacity-50 ${kinds[kind]} ${className}`;
	if (href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className: cls,
		onClick,
		onPointerDown,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cls,
		onClick,
		onPointerDown,
		...props,
		children
	});
}
function ReadAloud({ text, label = "Read aloud" }) {
	const [mode, setMode] = (0, import_react.useState)("idle");
	const stopRef = (0, import_react.useRef)(null);
	function unlock() {
		const Ctx = window.AudioContext || window.webkitAudioContext;
		if (!Ctx) return null;
		const ctx = new Ctx();
		if (ctx.state === "suspended") ctx.resume();
		return ctx;
	}
	function deviceVoice() {
		if (!window.speechSynthesis) return false;
		window.speechSynthesis.cancel();
		const utter = new SpeechSynthesisUtterance(text);
		utter.onend = () => setMode("idle");
		window.speechSynthesis.speak(utter);
		stopRef.current = () => window.speechSynthesis.cancel();
		setMode("playing");
		return true;
	}
	async function play() {
		if (mode === "playing") {
			stopRef.current?.();
			setMode("idle");
			return;
		}
		const ctx = unlock();
		setMode("loading");
		try {
			const res = await speak({ data: { text } });
			if (!res.ok || !ctx) {
				if (!deviceVoice()) setMode("idle");
				return;
			}
			const raw = Uint8Array.from(atob(res.audio), (ch) => ch.charCodeAt(0));
			const buffer = await ctx.decodeAudioData(raw.buffer);
			const source = ctx.createBufferSource();
			source.buffer = buffer;
			source.connect(ctx.destination);
			source.onended = () => setMode("idle");
			source.start();
			stopRef.current = () => {
				try {
					source.stop();
				} catch {}
			};
			setMode("playing");
		} catch {
			if (!deviceVoice()) setMode("idle");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => void play(),
		className: "inline-flex min-h-11 items-center gap-2 rounded-xl border border-gold px-3 text-sm font-semibold text-gold",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
			className: "size-4",
			"aria-hidden": true
		}), mode === "loading" ? "Reading…" : mode === "playing" ? "Stop" : label]
	});
}
function ClockReadout({ timers, serverNow, which, warnAt = 0, className = "", warnClass = "text-orange", calmClass = "text-cream" }) {
	const now = useServerNow(serverNow);
	const left = secondsLeft(which === "round" ? timers.roundDeadline : timers.gameDeadline, which === "round" ? timers.roundLeft : timers.gameLeft, timers.running, timers.paused, now);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `${className} ${warnAt > 0 && left <= warnAt ? warnClass : calmClass}`,
		children: clock(left)
	});
}
function Field(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: `w-full rounded-xl border border-line bg-card px-3 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${props.className ?? ""}`
	});
}
function Select(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		className: `w-full rounded-xl border border-line bg-card px-3 py-3 text-base text-ink ${props.className ?? ""}`
	});
}
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `rounded-2xl border border-line bg-card p-4 shadow-sm ${className}`,
		children
	});
}
function CardCopy({ text }) {
	const parts = text.split(/(\[(?:STAR|PHONE|SALE|HAMMER|CALCULATOR)\])/g);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-base leading-relaxed text-ink",
		children: parts.map((part, i) => {
			const icon = /^\[(STAR|PHONE|SALE|HAMMER|CALCULATOR)\]$/.exec(part);
			if (!icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i);
			const label = icon[1] === "CALCULATOR" ? "Calc" : icon[1][0] + icon[1].slice(1).toLowerCase();
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mx-0.5 inline-flex items-center rounded-md bg-navy px-1.5 py-0.5 text-xs font-semibold tracking-wide text-gold",
				children: label
			}, i);
		})
	});
}
function Valuation({ board, settings }) {
	const marginLabel = `${Math.round(settings.marginBps / 100)}% margin`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
				label: "Company revenue",
				value: money(board.revenue)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
				label: "Net profit",
				value: money(board.profit),
				warn: board.profit < 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
				label: "Margin",
				value: pct(board.margin),
				warn: board.margin !== null && !board.marginOk
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
				label: "Valuation ×3",
				value: money(board.valuation),
				gold: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-2 flex flex-wrap items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						on: board.win,
						children: [
							"Win ",
							money(settings.winCents),
							"+"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						on: board.marketLeader,
						children: [
							"Market Leader ",
							money(settings.mlCents),
							"+"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [
							"Both need ",
							marginLabel,
							". P&P reduces payroll, never revenue."
						]
					})
				]
			})
		]
	});
}
function Tile({ label, value, gold, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-2xl px-3 py-3 ${gold ? "bg-gold text-navy" : "bg-navy text-cream"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `text-[11px] font-semibold tracking-wider uppercase ${gold ? "text-gold-ink" : "text-gold"}`,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `font-display text-2xl leading-tight tabular-nums ${warn && !gold ? "text-orange" : ""}`,
			children: value
		})]
	});
}
function Badge({ children, on }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full px-3 py-1 text-xs font-bold tracking-wide ${on ? "bg-gold text-navy" : "bg-navy-2 text-muted"}`,
		children
	});
}
function DeptTable({ board }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[28rem] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "text-xs tracking-wide text-muted uppercase",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 pr-2 font-semibold",
						children: "Department"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 pr-2 text-right font-semibold",
						children: "Revenue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 pr-2 text-right font-semibold",
						children: "P&P saved"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 text-right font-semibold",
						children: "Profit"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: board.depts.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 pr-2 font-semibold text-cream",
						children: d.dept
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 pr-2 text-right tabular-nums",
						children: money(d.revenue)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 pr-2 text-right tabular-nums",
						children: money(d.pp)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: `py-2 text-right tabular-nums ${d.profit < 0 ? "text-orange" : "text-ink"}`,
						children: money(d.profit)
					})
				]
			}, d.dept)) })]
		})
	});
}
function Door({ href, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		className: "block rounded-2xl border border-line bg-card p-4 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl text-cream",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-relaxed text-muted",
			children: body
		})]
	});
}
//#endregion
export { previewSeat as A, resumeHost as B, hostCatalog as C, loadInsights as D, listGames as E, readProfileSession as F, setProfileRank as G, searchPeople as H, readSlot as I, writeSlot as J, useGame as K, readThread as L, publicProfile as M, readGame as N, lookupCard as O, readProfile as P, removeHost as R, friendAct as S, joinGame as T, sendMessage as U, saveProfile as V, setAdminToken as W, clearPlayer as _, ClockReadout as a, createSsrRpc as b, Field as c, Select as d, Valuation as f, assumeSeat as g, askInsights as h, CardCopy as i, publicJoinLink as j, lookupUsername as k, ProfileBlock as l, adminToken as m, Btn as n, DeptTable as o, addHost as p, writeProfileSession as q, Card as r, Door as s, BrandBar as t, ReadAloud as u, clearProfileSession as v, imagineAvatar as w, deleteGame as x, createGame as y, resetGame as z };
