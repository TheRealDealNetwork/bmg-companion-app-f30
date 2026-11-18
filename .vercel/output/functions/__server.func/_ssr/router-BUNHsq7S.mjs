import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, n as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { K as redirect, _ as createFileRoute, b as useNavigate, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { i as useLang, r as t, t as LangSwitch } from "./lang-C7kQIzzx.mjs";
import { a as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { b as createSsrRpc, c as Field, d as Select, n as Btn, r as Card } from "./ui-TaOKJTPB.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as METALCON_SEAT_LABEL, r as METALCON_SEAT_LABEL_ES, t as METALCON_SEATS } from "./seats-BHNQe8_4.mjs";
import { t as COMPANION_CARD_COUNT } from "./cards-Bf6SXNQh.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BOVWQ5bX.js
var registerSeat = createServerFn({ method: "POST" }).validator((input) => ({
	name: String(input?.name ?? ""),
	firstName: String(input?.firstName ?? ""),
	lastName: String(input?.lastName ?? ""),
	company: String(input?.company ?? ""),
	jobTitle: String(input?.jobTitle ?? ""),
	phone: String(input?.phone ?? ""),
	email: String(input?.email ?? ""),
	dept: String(input?.dept ?? ""),
	terms: Boolean(input?.terms),
	slug: String(input?.slug ?? "")
})).handler(createSsrRpc("917d2cf3513fa2428aa9abd394a94d12f70d14265c02ae80d801a161dc1d2c20"));
var nextScenario = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(createSsrRpc("65a159f654f8df8da13982580670f5699fa15930526f62e34b049b179afbfe0c"));
var findScenario = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	raw: String(input?.raw ?? "")
})).handler(createSsrRpc("9ee6a79476980342ae2a266ddd8e5de4ecccf1e54427c2887da7e1e52c873df4"));
var lockScenario = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	code: String(input?.code ?? ""),
	choice: String(input?.choice ?? ""),
	round: Number(input?.round ?? 0)
})).handler(createSsrRpc("09f98abb159c56dcedd36831edd9f3296e063d25da3802d3a04e72e4ea6c5327"));
var roundSheet = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	round: Number(input?.round ?? 0)
})).handler(createSsrRpc("af1be48c6195bc3baaa835b523d4c2362bbefeaa952472aeb6de9a1229d64569"));
var adminEnter = createServerFn({ method: "POST" }).validator((input) => ({
	password: String(input?.password ?? ""),
	email: String(input?.email ?? "")
})).handler(createSsrRpc("82080e2cb57213a48070910c7dbd05c504b9908299d3da244b16bc4a41466242"));
var resetPassword = createServerFn({ method: "POST" }).validator((input) => ({ email: String(input?.email ?? "") })).handler(createSsrRpc("49117452cd821426d4aa0f51e62c7002cf3d583fdc83ba52b26241cb0112ec0f"));
var changeAdminPassword = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	current: String(input?.current ?? ""),
	next: String(input?.next ?? "")
})).handler(createSsrRpc("740501fce0f5e170b02902db2119f3a8a82e4229137df38d612ff64b1322f29b"));
var adminDesk = createServerFn({ method: "POST" }).validator((input) => ({ token: String(input?.token ?? "") })).handler(createSsrRpc("e4c8357ab57792bdd10ddc90a8a33733e10fda8ef850eb6c78a24b07bb2242d9"));
var createHost = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	name: String(input?.name ?? ""),
	email: String(input?.email ?? ""),
	password: String(input?.password ?? "")
})).handler(createSsrRpc("b23be3e8970cf58aa752ebc58845a409808ced73893183587d2d47b645387fa2"));
var startGame = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	eventName: String(input?.eventName ?? ""),
	actionMode: String(input?.actionMode ?? "digital")
})).handler(createSsrRpc("f3a6fa1d47221b0dd7f268620e5c4b1d63d95d6bfec858303a789ab8592afb23"));
var endGame = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? "")
})).handler(createSsrRpc("152a62451f6daffde1f623b1b6435c7e87aeffb04543113c52eac04334b3201d"));
var reopenGame = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? "")
})).handler(createSsrRpc("2ac6dbfe2e9b4c412ad2b05d506d91ad00c371e1d3a34b5c7f7f190025e4d42f"));
var resetGame = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? "")
})).handler(createSsrRpc("0bbc65f5b9b427730c87a4b805834866e716af692cd8dec78ebe5abff06becb6"));
var setSignup = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? ""),
	open: Boolean(input?.open)
})).handler(createSsrRpc("efdc173f269164cc8abc872bf184e2ecb2e89c96389fa7c95865c6bbf0f7a503"));
var setShareSeat = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? ""),
	share: Boolean(input?.share)
})).handler(createSsrRpc("548276e79e0fa6a9f4203f60a04329faa6c48e3276d19df3060e0603bdf8c164"));
var placePlayer = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? ""),
	name: String(input?.name ?? ""),
	phone: String(input?.phone ?? ""),
	email: String(input?.email ?? ""),
	dept: String(input?.dept ?? "")
})).handler(createSsrRpc("d55873225083b61e9a93e8deadcc5fe04582adbbeec46168d40bc2967119dfbc"));
var sendSeatLink = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	playerId: String(input?.playerId ?? ""),
	origin: String(input?.origin ?? "")
})).handler(createSsrRpc("83a141feefe339441e6e3bd3141719b5a6e0572dd4de951cda79b89862f0e3d6"));
var exportGame = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? "")
})).handler(createSsrRpc("5706ac5a44e3f83f5d0a79d2b39a843c9b2152ba667f52f736910519b09b7770"));
var claimSeat = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	token: String(input?.token ?? ""),
	terms: Boolean(input?.terms)
})).handler(createSsrRpc("b63325dfdafd409c8880547341326f1b4b739f293e1a03fa3dde13fe27cfd910"));
var answerLog = createServerFn({ method: "GET" }).handler(createSsrRpc("3b34baf6f09f019a6c73f7d0a934f3dab3614e84354a653315631ae67992ef4b"));
var speakMale = createServerFn({ method: "POST" }).validator((input) => ({ text: String(input?.text ?? "").slice(0, 1800) })).handler(createSsrRpc("fc9a94d262452c80b27909dd229637a86f1d398ff2ca988f10b7733d7b07f3d6"));
var submitHostLead = createServerFn({ method: "POST" }).validator((input) => ({
	company: String(input?.company ?? ""),
	name: String(input?.name ?? ""),
	title: String(input?.title ?? ""),
	phone: String(input?.phone ?? ""),
	email: String(input?.email ?? ""),
	city: String(input?.city ?? ""),
	state: String(input?.state ?? ""),
	headcount: String(input?.headcount ?? ""),
	timing: String(input?.timing ?? ""),
	notes: String(input?.notes ?? ""),
	contact: Boolean(input?.contact)
})).handler(createSsrRpc("177119a26dd8f878d1894e41ef1234f2bab01213bf86dd98646bd11e09ab4327"));
var exportHostLeads = createServerFn({ method: "POST" }).validator((input) => ({ token: String(input?.token ?? "") })).handler(createSsrRpc("5b30b23d8f78b09bf22493534a3984e8e60bb3971a0a124bfa077116a7169b2e"));
var companyBoard = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(createSsrRpc("aebb53662a73f5b80f7d28e2cff168f05c187443a57ba9c69ba4275b2d199095"));
var suggestCompany = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	name: String(input?.name ?? "")
})).handler(createSsrRpc("9ddcc30b14e7f20b850e60f735e7d4c091ef771a9b5520d6c79e5d80c1cb58c9"));
var voteCompany = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	choiceId: String(input?.choiceId ?? "")
})).handler(createSsrRpc("c8b4d58cd579e36780ef2fc4043e444dba5cec5977b121a85de8fea7446ec485"));
createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	choiceId: String(input?.choiceId ?? "")
})).handler(createSsrRpc("2ee93492f09917e5282f0b2c3bf6b40568a90e6e5fe18cddf1892fdecd7ef4b3"));
var restartVote = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(createSsrRpc("457229633aa0a05237c3be917e248a004baf80956a1ac2f0737f6e61ffd05c77"));
var setCompanyName = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	name: String(input?.name ?? "")
})).handler(createSsrRpc("888844556097651866443de07223a3847f443db8aaaa748260b3da9ae8647cf4"));
var setMeeting = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	on: Boolean(input?.on),
	round: Number(input?.round ?? 1)
})).handler(createSsrRpc("c73c82ad01b2283f693d0aea459c00bce7902398e9726fd87af6f48e86b48fbf"));
var setProjectSlot = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	n: Number(input?.n ?? 0),
	house: String(input?.house ?? ""),
	customer: String(input?.customer ?? ""),
	status: String(input?.status ?? ""),
	extraSlot: String(input?.extraSlot ?? "")
})).handler(createSsrRpc("50441cacd11d525aeddda0dccf048eacb76b2e64f96222c3288c491df33358bb"));
var openProject = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	house: String(input?.house ?? ""),
	customer: String(input?.customer ?? ""),
	value: Number(input?.value ?? 0)
})).handler(createSsrRpc("24fe535c4d2582807a563774786c5b8b21006b5f88abdbf75b9b05582400fb21"));
createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	projectId: String(input?.projectId ?? ""),
	otherProjectId: String(input?.otherProjectId ?? ""),
	cardName: String(input?.cardName ?? ""),
	round: Number(input?.round ?? 1)
})).handler(createSsrRpc("34e3b530fbac44ecd356ccaf4026a208e91a28802ad30dc80f87adcd88092b38"));
var finishProject = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	projectId: String(input?.projectId ?? ""),
	override: Boolean(input?.override)
})).handler(createSsrRpc("5d94297988336bed7cca81c1c6509b7fd097e75a2fe471e65b068977b9d9f963"));
var setFinishOrder = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(createSsrRpc("9ec83a66693f0304cda56fd6bb356ddb16eff6e95d2ccb32ee545ad89da457fb"));
var endGameFromGm = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(createSsrRpc("8fbb730bedb0124fa42492a6c54419773c07af200df34cabd966f7de4992dd45"));
var swapAttendee = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	round: Number(input?.round ?? 1),
	dept: String(input?.dept ?? ""),
	playerId: String(input?.playerId ?? "")
})).handler(createSsrRpc("c99198de3ba06ed039569f6f4f64df68e5620b180e0841682549f09183098f8a"));
var setFocus = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	round: Number(input?.round ?? 1),
	dept: String(input?.dept ?? ""),
	projectIds: Array.isArray(input?.projectIds) ? input.projectIds.map(String) : []
})).handler(createSsrRpc("897714a8207546d7d22cfa4b9d2c905ec6c8f4bf5aef0f67fbe432ddcb5d11ae"));
var placeCard = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	cardName: String(input?.cardName ?? ""),
	projectId: String(input?.projectId ?? ""),
	round: Number(input?.round ?? 1)
})).handler(createSsrRpc("0d33b71c021cf01974cd6c7e6cb7bbbe921da3aaac76c2fc035b1d300708cc5b"));
var dealCards = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	round: Number(input?.round ?? 1)
})).handler(createSsrRpc("f04e7b0889eaf2c25b84e348a286839874991aaf76c98163df94a4fe5671edae"));
var confirmPlay = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	playId: String(input?.playId ?? "")
})).handler(createSsrRpc("b0ad290a88b1304838458038f6887536701416a7c0ea7694a25156268b985a18"));
var changePlay = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	playId: String(input?.playId ?? ""),
	projectId: String(input?.projectId ?? "")
})).handler(createSsrRpc("5022e42b64ddea9adddd31b6539a1d2a1c64e672f967d6d99a4a5e44819440bc"));
var removePlay = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	playId: String(input?.playId ?? "")
})).handler(createSsrRpc("6ae45fdfe7f76ba21ca350c415975c374fa311d4e0277a4d031247da4baa9d04"));
var startTurn = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	dept: String(input?.dept ?? "")
})).handler(createSsrRpc("9b380ad7d45dd2e3927c97280099c2f38ea9cd790c7d577e267491e367db9095"));
var callMeeting = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(createSsrRpc("3c637be98fe103667c079ccaa1fdab899000b9c18984e66930ba152274c42ea3"));
var ackMeeting = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(createSsrRpc("bfc7f2708c5022db8acd8513211ba50ace37712bb790deffd03b7933059a625d"));
var setActionMode = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	mode: String(input?.mode ?? "digital")
})).handler(createSsrRpc("7f2605dd6d0af8b1fde0298a02ff6b3913af9db41cab0dc630dc18ec42867801"));
var recordManualCards = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	cards: Array.isArray(input?.cards) ? input.cards.map(String) : [],
	round: Number(input?.round ?? 1)
})).handler(createSsrRpc("a64cf2c02f5ad93e0ba6c24c5f9062aabf51cea410eb7980c000c790ec958cf5"));
var undoAction = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	playId: String(input?.playId ?? "")
})).handler(createSsrRpc("908dce2c3218c838e313b0fb720eb182284ebd00743b7919600ec2654462e54a"));
var playEvent = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	eventName: String(input?.eventName ?? ""),
	projectId: String(input?.projectId ?? ""),
	round: Number(input?.round ?? 1)
})).handler(createSsrRpc("6cf31cda3352efdfe2d6d184b13e9fb0a11b46d92e07491e0f44ec39d4b151a9"));
createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	picks: Array.isArray(input?.picks) ? input.picks.map(String) : []
})).handler(createSsrRpc("e733dcdc7022bbd12c37a33f8c88be36e34085486bcb1f55da4a3181d5d1bf69"));
var insightsFor = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(createSsrRpc("3073ed0586c8605d0e9bacb4a1212ff5f22cbe2637f597fd34a53a71a3c997df"));
var setBasePayroll = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? ""),
	amount: Number(input?.amount ?? 3200)
})).handler(createSsrRpc("072eb16973b7ced707bdb16adee5b454806782701551d5ad8d74057ae2fa9d29"));
var setFixedCost = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? ""),
	amount: Number(input?.amount ?? 2e3),
	startRound: Number(input?.startRound ?? 3)
})).handler(createSsrRpc("fcaae68977a272665101aa5f83c67b833dbf918eea6461b002d5d2dffc9cecab"));
var setPlusOne = createServerFn({ method: "POST" }).inputValidator((data) => data).handler(createSsrRpc("09755376f775c20bc17b070663a5045e5671d0e8ff957f5c0dc044a9beb13ca0"));
/** Public: join page uses this to hide the form for ended games. */
var gameJoinStatus = createServerFn({ method: "GET" }).validator((input) => ({ slug: String(input?.slug ?? "") })).handler(createSsrRpc("2d74c4c7f10da6ab2b2f1ddb02b5cf5d9ec3dd7e66fd658c5238633bd1cec7a0"));
/** Public: play page uses this so an ended game shows no cards. */
var seatOpen = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(createSsrRpc("a7720c9eec0683df3bea5245635c529d8d5d4a1f422c802de716dff269356dca"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/session-DfE5vSRt.js
var KEY = "soe-metalcon-2026";
function readSeat(id) {
	if (typeof window === "undefined") return null;
	try {
		if (id) {
			const raw = localStorage.getItem(`${KEY}:${id}`);
			if (!raw) return null;
			const seat = JSON.parse(raw);
			if (seat.id && seat.secret && seat.dept) return seat;
			return null;
		}
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const seat = JSON.parse(raw);
		if (!seat.id || !seat.secret || !seat.dept) return null;
		if (seat.dept === "General Manager") return null;
		return seat;
	} catch {
		return null;
	}
}
function writeSeat(seat) {
	localStorage.setItem(KEY, JSON.stringify(seat));
	localStorage.setItem(`${KEY}:${seat.id}`, JSON.stringify(seat));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BUNHsq7S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-navy px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-orange",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl text-cream",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-Be14dpLF.css";
var Route$25 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "The Business Machine" },
			{
				name: "theme-color",
				content: "#1b3a5c"
			},
			{
				name: "description",
				content: "Companion for The Business Machine: player phones, GM control room, and the shared scoreboard."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,680&family=Inter:wght@400;500;600;700&family=Montserrat:wght@700&family=Outfit:wght@400;500;600;700&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: Root
});
function Root() {
	const [client] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		retry: 1,
		refetchOnWindowFocus: true
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
				client,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$22 = () => import("./routes-m513EZkY.mjs");
var Route$24 = createFileRoute("/")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./me-Cb5YqHU0.mjs");
var Route$23 = createFileRoute("/me")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var Route$22 = createFileRoute("/metalcon/")({ beforeLoad: () => {
	throw redirect({ href: "/soebld" });
} });
var Route$21 = createFileRoute("/metalcon/$")({ beforeLoad: ({ params, location }) => {
	const rest = String(params._splat ?? "").replace(/^\/+|\/+$/g, "");
	const search = location.searchStr || "";
	throw redirect({
		href: rest ? `/soebld/${rest}${search}` : `/soebld${search}`,
		replace: true
	});
} });
var $$splitComponentImporter$20 = () => import("../_username-lwXIexjd.mjs");
var Route$20 = createFileRoute("/p/$username")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./soebld-CWOBtncO.mjs");
var Route$19 = createFileRoute("/soebld/")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./admin-Pa7ZiU9A.mjs");
var Route$18 = createFileRoute("/soebld/admin")({
	loader: async () => {
		console.log("ADMIN LOADER START");
		return null;
	},
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./financials-Ctvt8gtq.mjs");
var Route$17 = createFileRoute("/soebld/financials")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./go-dLThWwB-.mjs");
var Route$16 = createFileRoute("/soebld/go")({
	validateSearch: (search) => ({
		id: String(search.id ?? ""),
		k: String(search.k ?? search.t ?? "")
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./host-CZCOLI3p.mjs");
var Route$15 = createFileRoute("/soebld/host")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./insights-DWpy5qSX.mjs");
var Route$14 = createFileRoute("/soebld/insights")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./join-C6gdSp9M.mjs");
var Route$13 = createFileRoute("/soebld/join")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var DEPT_PARAM = {
	mk: "Marketing",
	ac: "Appointment Center",
	sa: "Sales",
	pr: "Production",
	acc: "Accounting"
};
function JoinForm({ slug }) {
	const navigate = useNavigate();
	const { lang, setLang } = useLang();
	const [closed, setClosed] = (0, import_react.useState)(null);
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [company, setCompany] = (0, import_react.useState)("");
	const [jobTitle, setJobTitle] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [dept, setDept] = (0, import_react.useState)(METALCON_SEATS[0]);
	const [terms, setTerms] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const next = DEPT_PARAM[new URLSearchParams(window.location.search).get("dept")?.toLowerCase() ?? ""];
		if (next) setDept(next);
	}, []);
	(0, import_react.useEffect)(() => {
		let stop = false;
		gameJoinStatus({ data: { slug } }).then((res) => {
			if (stop) return;
			setClosed(res.closed === true);
		}).catch(() => {
			if (!stop) setClosed(true);
		});
		return () => {
			stop = true;
		};
	}, [slug]);
	async function submit() {
		setBusy(true);
		setErr("");
		try {
			const res = await registerSeat({ data: {
				name: `${firstName.trim()} ${lastName.trim()}`.trim(),
				firstName,
				lastName,
				company,
				jobTitle,
				phone,
				email,
				dept,
				terms,
				slug
			} });
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			writeSeat(res.player);
			navigate({
				to: "/soebld/play",
				search: { seat: res.player.id }
			});
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not save the seat.");
		} finally {
			setBusy(false);
		}
	}
	if (closed === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-widest text-gold uppercase",
				children: "SOEBLD"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: t("join.closedTitle", lang)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: t("seat.opening", lang)
			})
		]
	});
	if (closed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-widest text-gold uppercase",
					children: "SOEBLD"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
					lang,
					setLang
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: t("join.closedTitle", lang)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-cream",
				children: t("join.closed", lang)
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-widest text-gold uppercase",
				children: "SOEBLD"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: lang === "es" ? "Toma un asiento" : "Take a seat"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: lang === "es" ? "SOE Business Leadership Scenario Cards. Tu asiento es el departamento que vas a consultar." : "SOE Business Leadership Scenario Cards. Your seat is the department you will look up."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: lang === "es" ? `${COMPANION_CARD_COUNT} cartas` : `${COMPANION_CARD_COUNT} cards`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
						lang,
						setLang
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold text-cream",
						children: [lang === "es" ? "Asiento" : "Seat", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							className: "mt-1",
							value: dept,
							onChange: (e) => setDept(e.target.value),
							"aria-label": lang === "es" ? "Asiento" : "Seat",
							children: METALCON_SEATS.map((seat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: seat,
								children: lang === "es" ? METALCON_SEAT_LABEL_ES[seat] : METALCON_SEAT_LABEL[seat]
							}, seat))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold text-cream",
						children: [lang === "es" ? "Nombre" : "First name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							className: "mt-1",
							"aria-label": lang === "es" ? "Nombre" : "First name",
							placeholder: lang === "es" ? "Nombre" : "First name",
							value: firstName,
							onChange: (e) => setFirstName(e.target.value),
							autoComplete: "given-name"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold text-cream",
						children: [lang === "es" ? "Apellido" : "Last name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							className: "mt-1",
							"aria-label": lang === "es" ? "Apellido" : "Last name",
							placeholder: lang === "es" ? "Apellido" : "Last name",
							value: lastName,
							onChange: (e) => setLastName(e.target.value),
							autoComplete: "family-name"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold text-cream",
						children: [lang === "es" ? "Nombre de la empresa" : "Company name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							className: "mt-1",
							"aria-label": lang === "es" ? "Nombre de la empresa" : "Company name",
							placeholder: lang === "es" ? "Nombre de la empresa" : "Company name",
							value: company,
							onChange: (e) => setCompany(e.target.value),
							autoComplete: "organization"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold text-cream",
						children: [lang === "es" ? "Cargo" : "Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							className: "mt-1",
							"aria-label": lang === "es" ? "Cargo" : "Title",
							placeholder: lang === "es" ? "Cargo" : "Title",
							value: jobTitle,
							onChange: (e) => setJobTitle(e.target.value),
							autoComplete: "organization-title"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": lang === "es" ? "Número de celular" : "Mobile",
						inputMode: "tel",
						placeholder: lang === "es" ? "Número de celular" : "Mobile number",
						value: phone,
						onChange: (e) => setPhone(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": lang === "es" ? "Correo electrónico" : "Email",
						inputMode: "email",
						placeholder: lang === "es" ? "Correo electrónico" : "Email",
						value: email,
						onChange: (e) => setEmail(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-3 text-sm text-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-5 accent-[#d4a05c]",
							checked: terms,
							onChange: (e) => setTerms(e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							lang === "es" ? "Acepto los" : "I agree to the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/soebld/terms",
								className: "font-semibold text-gold",
								target: "_blank",
								children: lang === "es" ? "Términos y condiciones beta" : "Beta Terms & Conditions"
							}),
							"."
						] })]
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-orange-ink",
						children: err
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "w-full",
						disabled: busy || !terms,
						onClick: () => void submit(),
						children: busy ? lang === "es" ? "Guardando…" : "Saving…" : lang === "es" ? "Entrar a las cartas" : "Enter the cards"
					})
				]
			})
		]
	});
}
var $$splitComponentImporter$12 = () => import("./log-CIJszqXa.mjs");
var Route$12 = createFileRoute("/soebld/log")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./numbers--9Zi7bqx.mjs");
var Route$11 = createFileRoute("/soebld/numbers")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./play-BSrLj_7E.mjs");
import_react.Component;
var Route$10 = createFileRoute("/soebld/play")({
	validateSearch: (search) => ({ seat: String(search.seat ?? "") }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./projects-DlIRmsGo.mjs");
var Route$9 = createFileRoute("/soebld/projects")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./scoreboard-D-wzPUkt.mjs");
var Route$8 = createFileRoute("/soebld/scoreboard")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./terms-Dttwk_Og.mjs");
var Route$7 = createFileRoute("/soebld/terms")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("../_code-BzeTEkIj.mjs");
var Route$6 = createFileRoute("/g/$code/")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./host-c0HFO093.mjs");
var Route$5 = createFileRoute("/g/$code/host")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./join-p6ciTT0z.mjs");
var Route$4 = createFileRoute("/g/$code/join")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./play-BccZ_QkY.mjs");
var Route$3 = createFileRoute("/g/$code/play")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./room-BgxBqz7D.mjs");
var Route$2 = createFileRoute("/g/$code/room")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./join-Bh4-pGJc.mjs");
var Route$1 = createFileRoute("/soebld/join/")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_slug-Cerfz51Y.mjs");
var Route = createFileRoute("/soebld/join/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$24.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$25
});
var MeRoute = Route$23.update({
	id: "/me",
	path: "/me",
	getParentRoute: () => Route$25
});
var MetalconIndexRoute = Route$22.update({
	id: "/metalcon/",
	path: "/metalcon/",
	getParentRoute: () => Route$25
});
var MetalconSplatRoute = Route$21.update({
	id: "/metalcon/$",
	path: "/metalcon/$",
	getParentRoute: () => Route$25
});
var PUsernameRoute = Route$20.update({
	id: "/p/$username",
	path: "/p/$username",
	getParentRoute: () => Route$25
});
var SoebldIndexRoute = Route$19.update({
	id: "/soebld/",
	path: "/soebld/",
	getParentRoute: () => Route$25
});
var SoebldAdminRoute = Route$18.update({
	id: "/soebld/admin",
	path: "/soebld/admin",
	getParentRoute: () => Route$25
});
var SoebldFinancialsRoute = Route$17.update({
	id: "/soebld/financials",
	path: "/soebld/financials",
	getParentRoute: () => Route$25
});
var SoebldGoRoute = Route$16.update({
	id: "/soebld/go",
	path: "/soebld/go",
	getParentRoute: () => Route$25
});
var SoebldHostRoute = Route$15.update({
	id: "/soebld/host",
	path: "/soebld/host",
	getParentRoute: () => Route$25
});
var SoebldInsightsRoute = Route$14.update({
	id: "/soebld/insights",
	path: "/soebld/insights",
	getParentRoute: () => Route$25
});
var SoebldJoinRoute = Route$13.update({
	id: "/soebld/join",
	path: "/soebld/join",
	getParentRoute: () => Route$25
});
var SoebldLogRoute = Route$12.update({
	id: "/soebld/log",
	path: "/soebld/log",
	getParentRoute: () => Route$25
});
var SoebldNumbersRoute = Route$11.update({
	id: "/soebld/numbers",
	path: "/soebld/numbers",
	getParentRoute: () => Route$25
});
var SoebldPlayRoute = Route$10.update({
	id: "/soebld/play",
	path: "/soebld/play",
	getParentRoute: () => Route$25
});
var SoebldProjectsRoute = Route$9.update({
	id: "/soebld/projects",
	path: "/soebld/projects",
	getParentRoute: () => Route$25
});
var SoebldScoreboardRoute = Route$8.update({
	id: "/soebld/scoreboard",
	path: "/soebld/scoreboard",
	getParentRoute: () => Route$25
});
var SoebldTermsRoute = Route$7.update({
	id: "/soebld/terms",
	path: "/soebld/terms",
	getParentRoute: () => Route$25
});
var GCodeIndexRoute = Route$6.update({
	id: "/g/$code/",
	path: "/g/$code/",
	getParentRoute: () => Route$25
});
var GCodeHostRoute = Route$5.update({
	id: "/g/$code/host",
	path: "/g/$code/host",
	getParentRoute: () => Route$25
});
var GCodeJoinRoute = Route$4.update({
	id: "/g/$code/join",
	path: "/g/$code/join",
	getParentRoute: () => Route$25
});
var GCodePlayRoute = Route$3.update({
	id: "/g/$code/play",
	path: "/g/$code/play",
	getParentRoute: () => Route$25
});
var GCodeRoomRoute = Route$2.update({
	id: "/g/$code/room",
	path: "/g/$code/room",
	getParentRoute: () => Route$25
});
var SoebldJoinIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => SoebldJoinRoute
});
var SoebldJoinRouteChildren = {
	SoebldJoinSlugRoute: Route.update({
		id: "/$slug",
		path: "/$slug",
		getParentRoute: () => SoebldJoinRoute
	}),
	SoebldJoinIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	MeRoute,
	MetalconSplatRoute,
	PUsernameRoute,
	SoebldAdminRoute,
	SoebldFinancialsRoute,
	SoebldGoRoute,
	SoebldHostRoute,
	SoebldInsightsRoute,
	SoebldJoinRoute: SoebldJoinRoute._addFileChildren(SoebldJoinRouteChildren),
	SoebldLogRoute,
	SoebldNumbersRoute,
	SoebldPlayRoute,
	SoebldProjectsRoute,
	SoebldScoreboardRoute,
	SoebldTermsRoute,
	MetalconIndexRoute,
	SoebldIndexRoute,
	GCodeHostRoute,
	GCodeJoinRoute,
	GCodePlayRoute,
	GCodeRoomRoute,
	GCodeIndexRoute
};
var routeTree = Route$25._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { setFinishOrder as $, findScenario as A, recordManualCards as B, confirmPlay as C, endGameFromGm as D, endGame as E, nextScenario as F, resetPassword as G, removePlay as H, openProject as I, seatOpen as J, restartVote as K, placeCard as L, gameJoinStatus as M, insightsFor as N, exportGame as O, lockScenario as P, setCompanyName as Q, placePlayer as R, companyBoard as S, dealCards as T, reopenGame as U, registerSeat as V, resetGame as W, setActionMode as X, sendSeatLink as Y, setBasePayroll as Z, answerLog as _, Route$4 as a, setShareSeat as at, changePlay as b, Route$10 as c, startGame as ct, Route$20 as d, suggestCompany as dt, setFixedCost as et, readSeat as f, swapAttendee as ft, adminEnter as g, adminDesk as h, Route$3 as i, setProjectSlot as it, finishProject as j, exportHostLeads as k, JoinForm as l, startTurn as lt, ackMeeting as m, voteCompany as mt, Route as n, setMeeting as nt, Route$5 as o, setSignup as ot, writeSeat as p, undoAction as pt, roundSheet as q, Route$2 as r, setPlusOne as rt, Route$6 as s, speakMale as st, router_exports as t, setFocus as tt, Route$16 as u, submitHostLead as ut, callMeeting as v, createHost as w, claimSeat as x, changeAdminPassword as y, playEvent as z };
