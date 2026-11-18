import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-CNlv3Sqq.js
var registerSeat_createServerFn_handler = createServerRpc({
	id: "917d2cf3513fa2428aa9abd394a94d12f70d14265c02ae80d801a161dc1d2c20",
	name: "registerSeat",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => registerSeat.__executeServer(opts));
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
})).handler(registerSeat_createServerFn_handler, async ({ data }) => {
	try {
		const { registerSeat: run } = await import("./server-CK1srNLx.mjs");
		return await run(data);
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not save the seat."
		};
	}
});
var nextScenario_createServerFn_handler = createServerRpc({
	id: "65a159f654f8df8da13982580670f5699fa15930526f62e34b049b179afbfe0c",
	name: "nextScenario",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => nextScenario.__executeServer(opts));
var nextScenario = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(nextScenario_createServerFn_handler, async ({ data }) => {
	const { nextScenario: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var findScenario_createServerFn_handler = createServerRpc({
	id: "9ee6a79476980342ae2a266ddd8e5de4ecccf1e54427c2887da7e1e52c873df4",
	name: "findScenario",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => findScenario.__executeServer(opts));
var findScenario = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	raw: String(input?.raw ?? "")
})).handler(findScenario_createServerFn_handler, async ({ data }) => {
	try {
		const { findScenario: run } = await import("./server-CK1srNLx.mjs");
		return await run(data);
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not find that card."
		};
	}
});
var lockScenario_createServerFn_handler = createServerRpc({
	id: "09f98abb159c56dcedd36831edd9f3296e063d25da3802d3a04e72e4ea6c5327",
	name: "lockScenario",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => lockScenario.__executeServer(opts));
var lockScenario = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	code: String(input?.code ?? ""),
	choice: String(input?.choice ?? ""),
	round: Number(input?.round ?? 0)
})).handler(lockScenario_createServerFn_handler, async ({ data }) => {
	try {
		const { lockScenario: run } = await import("./server-CK1srNLx.mjs");
		return await run(data);
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not save that answer."
		};
	}
});
var roundSheet_createServerFn_handler = createServerRpc({
	id: "af1be48c6195bc3baaa835b523d4c2362bbefeaa952472aeb6de9a1229d64569",
	name: "roundSheet",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => roundSheet.__executeServer(opts));
var roundSheet = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	round: Number(input?.round ?? 0)
})).handler(roundSheet_createServerFn_handler, async ({ data }) => {
	try {
		const { roundSheet: run } = await import("./server-CK1srNLx.mjs");
		return await run(data);
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not load this round.",
			rows: []
		};
	}
});
var adminEnter_createServerFn_handler = createServerRpc({
	id: "82080e2cb57213a48070910c7dbd05c504b9908299d3da244b16bc4a41466242",
	name: "adminEnter",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => adminEnter.__executeServer(opts));
var adminEnter = createServerFn({ method: "POST" }).validator((input) => ({
	password: String(input?.password ?? ""),
	email: String(input?.email ?? "")
})).handler(adminEnter_createServerFn_handler, async ({ data }) => {
	const { adminEnter: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.password, data.email);
});
var resetPassword_createServerFn_handler = createServerRpc({
	id: "49117452cd821426d4aa0f51e62c7002cf3d583fdc83ba52b26241cb0112ec0f",
	name: "resetPassword",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => resetPassword.__executeServer(opts));
var resetPassword = createServerFn({ method: "POST" }).validator((input) => ({ email: String(input?.email ?? "") })).handler(resetPassword_createServerFn_handler, async ({ data }) => {
	const { resetPassword: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.email);
});
var changeAdminPassword_createServerFn_handler = createServerRpc({
	id: "740501fce0f5e170b02902db2119f3a8a82e4229137df38d612ff64b1322f29b",
	name: "changeAdminPassword",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => changeAdminPassword.__executeServer(opts));
var changeAdminPassword = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	current: String(input?.current ?? ""),
	next: String(input?.next ?? "")
})).handler(changeAdminPassword_createServerFn_handler, async ({ data }) => {
	const { changeAdminPassword: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.token, data.current, data.next);
});
var adminDesk_createServerFn_handler = createServerRpc({
	id: "e4c8357ab57792bdd10ddc90a8a33733e10fda8ef850eb6c78a24b07bb2242d9",
	name: "adminDesk",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => adminDesk.__executeServer(opts));
var adminDesk = createServerFn({ method: "POST" }).validator((input) => ({ token: String(input?.token ?? "") })).handler(adminDesk_createServerFn_handler, async ({ data }) => {
	const { adminDesk: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.token);
});
var createHost_createServerFn_handler = createServerRpc({
	id: "b23be3e8970cf58aa752ebc58845a409808ced73893183587d2d47b645387fa2",
	name: "createHost",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => createHost.__executeServer(opts));
var createHost = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	name: String(input?.name ?? ""),
	email: String(input?.email ?? ""),
	password: String(input?.password ?? "")
})).handler(createHost_createServerFn_handler, async ({ data }) => {
	const { createHost: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data);
});
var startGame_createServerFn_handler = createServerRpc({
	id: "f3a6fa1d47221b0dd7f268620e5c4b1d63d95d6bfec858303a789ab8592afb23",
	name: "startGame",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => startGame.__executeServer(opts));
var startGame = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	eventName: String(input?.eventName ?? ""),
	actionMode: String(input?.actionMode ?? "digital")
})).handler(startGame_createServerFn_handler, async ({ data }) => {
	const { startGame: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.token, data.eventName, data.actionMode);
});
var endGame_createServerFn_handler = createServerRpc({
	id: "152a62451f6daffde1f623b1b6435c7e87aeffb04543113c52eac04334b3201d",
	name: "endGame",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => endGame.__executeServer(opts));
var endGame = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? "")
})).handler(endGame_createServerFn_handler, async ({ data }) => {
	const { endGame: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.token, data.gameId);
});
var reopenGame_createServerFn_handler = createServerRpc({
	id: "2ac6dbfe2e9b4c412ad2b05d506d91ad00c371e1d3a34b5c7f7f190025e4d42f",
	name: "reopenGame",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => reopenGame.__executeServer(opts));
var reopenGame = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? "")
})).handler(reopenGame_createServerFn_handler, async ({ data }) => {
	const { reopenGame: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.token, data.gameId);
});
var resetGame_createServerFn_handler = createServerRpc({
	id: "0bbc65f5b9b427730c87a4b805834866e716af692cd8dec78ebe5abff06becb6",
	name: "resetGame",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => resetGame.__executeServer(opts));
var resetGame = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? "")
})).handler(resetGame_createServerFn_handler, async ({ data }) => {
	const { resetGame: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.token, data.gameId);
});
var setSignup_createServerFn_handler = createServerRpc({
	id: "efdc173f269164cc8abc872bf184e2ecb2e89c96389fa7c95865c6bbf0f7a503",
	name: "setSignup",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => setSignup.__executeServer(opts));
var setSignup = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? ""),
	open: Boolean(input?.open)
})).handler(setSignup_createServerFn_handler, async ({ data }) => {
	const { setSignup: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.token, data.gameId, data.open);
});
var setShareSeat_createServerFn_handler = createServerRpc({
	id: "548276e79e0fa6a9f4203f60a04329faa6c48e3276d19df3060e0603bdf8c164",
	name: "setShareSeat",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => setShareSeat.__executeServer(opts));
var setShareSeat = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? ""),
	share: Boolean(input?.share)
})).handler(setShareSeat_createServerFn_handler, async ({ data }) => {
	const { setShareSeat: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.token, data.gameId, data.share);
});
var placePlayer_createServerFn_handler = createServerRpc({
	id: "d55873225083b61e9a93e8deadcc5fe04582adbbeec46168d40bc2967119dfbc",
	name: "placePlayer",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => placePlayer.__executeServer(opts));
var placePlayer = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? ""),
	name: String(input?.name ?? ""),
	phone: String(input?.phone ?? ""),
	email: String(input?.email ?? ""),
	dept: String(input?.dept ?? "")
})).handler(placePlayer_createServerFn_handler, async ({ data }) => {
	const { placePlayer: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data);
});
var sendSeatLink_createServerFn_handler = createServerRpc({
	id: "83a141feefe339441e6e3bd3141719b5a6e0572dd4de951cda79b89862f0e3d6",
	name: "sendSeatLink",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => sendSeatLink.__executeServer(opts));
var sendSeatLink = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	playerId: String(input?.playerId ?? ""),
	origin: String(input?.origin ?? "")
})).handler(sendSeatLink_createServerFn_handler, async ({ data }) => {
	const { sendSeatLink: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data);
});
var exportGame_createServerFn_handler = createServerRpc({
	id: "5706ac5a44e3f83f5d0a79d2b39a843c9b2152ba667f52f736910519b09b7770",
	name: "exportGame",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => exportGame.__executeServer(opts));
var exportGame = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? "")
})).handler(exportGame_createServerFn_handler, async ({ data }) => {
	const { exportGame: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.token, data.gameId);
});
var claimSeat_createServerFn_handler = createServerRpc({
	id: "b63325dfdafd409c8880547341326f1b4b739f293e1a03fa3dde13fe27cfd910",
	name: "claimSeat",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => claimSeat.__executeServer(opts));
var claimSeat = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	token: String(input?.token ?? ""),
	terms: Boolean(input?.terms)
})).handler(claimSeat_createServerFn_handler, async ({ data }) => {
	const { claimSeat: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data);
});
var answerLog_createServerFn_handler = createServerRpc({
	id: "3b34baf6f09f019a6c73f7d0a934f3dab3614e84354a653315631ae67992ef4b",
	name: "answerLog",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => answerLog.__executeServer(opts));
var answerLog = createServerFn({ method: "GET" }).handler(answerLog_createServerFn_handler, async () => {
	const { answerLog: run } = await import("./server-CK1srNLx.mjs");
	return run();
});
var speakMale_createServerFn_handler = createServerRpc({
	id: "fc9a94d262452c80b27909dd229637a86f1d398ff2ca988f10b7733d7b07f3d6",
	name: "speakMale",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => speakMale.__executeServer(opts));
var speakMale = createServerFn({ method: "POST" }).validator((input) => ({ text: String(input?.text ?? "").slice(0, 1800) })).handler(speakMale_createServerFn_handler, async ({ data }) => {
	const { speakMale: run } = await import("./server-CK1srNLx.mjs");
	return run(data.text);
});
var submitHostLead_createServerFn_handler = createServerRpc({
	id: "177119a26dd8f878d1894e41ef1234f2bab01213bf86dd98646bd11e09ab4327",
	name: "submitHostLead",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => submitHostLead.__executeServer(opts));
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
})).handler(submitHostLead_createServerFn_handler, async ({ data }) => {
	try {
		const { submitHostLead: run } = await import("./admin.server-CeOOKF1U.mjs");
		return await run(data);
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Could not save that. Try again."
		};
	}
});
var exportHostLeads_createServerFn_handler = createServerRpc({
	id: "5b30b23d8f78b09bf22493534a3984e8e60bb3971a0a124bfa077116a7169b2e",
	name: "exportHostLeads",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => exportHostLeads.__executeServer(opts));
var exportHostLeads = createServerFn({ method: "POST" }).validator((input) => ({ token: String(input?.token ?? "") })).handler(exportHostLeads_createServerFn_handler, async ({ data }) => {
	const { exportHostLeads: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data.token);
});
var companyBoard_createServerFn_handler = createServerRpc({
	id: "aebb53662a73f5b80f7d28e2cff168f05c187443a57ba9c69ba4275b2d199095",
	name: "companyBoard",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => companyBoard.__executeServer(opts));
var companyBoard = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(companyBoard_createServerFn_handler, async ({ data }) => {
	const { companyBoard: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var suggestCompany_createServerFn_handler = createServerRpc({
	id: "9ddcc30b14e7f20b850e60f735e7d4c091ef771a9b5520d6c79e5d80c1cb58c9",
	name: "suggestCompany",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => suggestCompany.__executeServer(opts));
var suggestCompany = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	name: String(input?.name ?? "")
})).handler(suggestCompany_createServerFn_handler, async ({ data }) => {
	const { suggestCompany: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var voteCompany_createServerFn_handler = createServerRpc({
	id: "c8b4d58cd579e36780ef2fc4043e444dba5cec5977b121a85de8fea7446ec485",
	name: "voteCompany",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => voteCompany.__executeServer(opts));
var voteCompany = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	choiceId: String(input?.choiceId ?? "")
})).handler(voteCompany_createServerFn_handler, async ({ data }) => {
	const { voteCompany: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var breakTie_createServerFn_handler = createServerRpc({
	id: "2ee93492f09917e5282f0b2c3bf6b40568a90e6e5fe18cddf1892fdecd7ef4b3",
	name: "breakTie",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => breakTie.__executeServer(opts));
var breakTie = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	choiceId: String(input?.choiceId ?? "")
})).handler(breakTie_createServerFn_handler, async ({ data }) => {
	const { breakTie: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var restartVote_createServerFn_handler = createServerRpc({
	id: "457229633aa0a05237c3be917e248a004baf80956a1ac2f0737f6e61ffd05c77",
	name: "restartVote",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => restartVote.__executeServer(opts));
var restartVote = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(restartVote_createServerFn_handler, async ({ data }) => {
	const { restartVote: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var setCompanyName_createServerFn_handler = createServerRpc({
	id: "888844556097651866443de07223a3847f443db8aaaa748260b3da9ae8647cf4",
	name: "setCompanyName",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => setCompanyName.__executeServer(opts));
var setCompanyName = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	name: String(input?.name ?? "")
})).handler(setCompanyName_createServerFn_handler, async ({ data }) => {
	const { setCompanyName: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var setMeeting_createServerFn_handler = createServerRpc({
	id: "c73c82ad01b2283f693d0aea459c00bce7902398e9726fd87af6f48e86b48fbf",
	name: "setMeeting",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => setMeeting.__executeServer(opts));
var setMeeting = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	on: Boolean(input?.on),
	round: Number(input?.round ?? 1)
})).handler(setMeeting_createServerFn_handler, async ({ data }) => {
	const { setMeeting: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var setProjectSlot_createServerFn_handler = createServerRpc({
	id: "50441cacd11d525aeddda0dccf048eacb76b2e64f96222c3288c491df33358bb",
	name: "setProjectSlot",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => setProjectSlot.__executeServer(opts));
var setProjectSlot = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	n: Number(input?.n ?? 0),
	house: String(input?.house ?? ""),
	customer: String(input?.customer ?? ""),
	status: String(input?.status ?? ""),
	extraSlot: String(input?.extraSlot ?? "")
})).handler(setProjectSlot_createServerFn_handler, async ({ data }) => {
	const { setProjectSlot: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var openProject_createServerFn_handler = createServerRpc({
	id: "24fe535c4d2582807a563774786c5b8b21006b5f88abdbf75b9b05582400fb21",
	name: "openProject",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => openProject.__executeServer(opts));
var openProject = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	house: String(input?.house ?? ""),
	customer: String(input?.customer ?? ""),
	value: Number(input?.value ?? 0)
})).handler(openProject_createServerFn_handler, async ({ data }) => {
	const { openProject: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var playAction_createServerFn_handler = createServerRpc({
	id: "34e3b530fbac44ecd356ccaf4026a208e91a28802ad30dc80f87adcd88092b38",
	name: "playAction",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => playAction.__executeServer(opts));
var playAction = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	projectId: String(input?.projectId ?? ""),
	otherProjectId: String(input?.otherProjectId ?? ""),
	cardName: String(input?.cardName ?? ""),
	round: Number(input?.round ?? 1)
})).handler(playAction_createServerFn_handler, async ({ data }) => {
	const { playAction: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var finishProject_createServerFn_handler = createServerRpc({
	id: "5d94297988336bed7cca81c1c6509b7fd097e75a2fe471e65b068977b9d9f963",
	name: "finishProject",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => finishProject.__executeServer(opts));
var finishProject = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	projectId: String(input?.projectId ?? ""),
	override: Boolean(input?.override)
})).handler(finishProject_createServerFn_handler, async ({ data }) => {
	const { finishProject: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var setFinishOrder_createServerFn_handler = createServerRpc({
	id: "9ec83a66693f0304cda56fd6bb356ddb16eff6e95d2ccb32ee545ad89da457fb",
	name: "setFinishOrder",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => setFinishOrder.__executeServer(opts));
var setFinishOrder = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(setFinishOrder_createServerFn_handler, async ({ data }) => {
	const { setFinishOrder: run } = await import("./server-CK1srNLx.mjs");
	return run({
		id: data.id,
		secret: data.secret,
		projectIds: [data.projectId]
	});
});
var endGameFromGm_createServerFn_handler = createServerRpc({
	id: "8fbb730bedb0124fa42492a6c54419773c07af200df34cabd966f7de4992dd45",
	name: "endGameFromGm",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => endGameFromGm.__executeServer(opts));
var endGameFromGm = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(endGameFromGm_createServerFn_handler, async ({ data }) => {
	const { endGameFromGm: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var swapAttendee_createServerFn_handler = createServerRpc({
	id: "c99198de3ba06ed039569f6f4f64df68e5620b180e0841682549f09183098f8a",
	name: "swapAttendee",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => swapAttendee.__executeServer(opts));
var swapAttendee = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	round: Number(input?.round ?? 1),
	dept: String(input?.dept ?? ""),
	playerId: String(input?.playerId ?? "")
})).handler(swapAttendee_createServerFn_handler, async ({ data }) => {
	const { swapAttendee: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var setFocus_createServerFn_handler = createServerRpc({
	id: "897714a8207546d7d22cfa4b9d2c905ec6c8f4bf5aef0f67fbe432ddcb5d11ae",
	name: "setFocus",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => setFocus.__executeServer(opts));
var setFocus = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	round: Number(input?.round ?? 1),
	dept: String(input?.dept ?? ""),
	projectIds: Array.isArray(input?.projectIds) ? input.projectIds.map(String) : []
})).handler(setFocus_createServerFn_handler, async ({ data }) => {
	const { setFocus: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var placeCard_createServerFn_handler = createServerRpc({
	id: "0d33b71c021cf01974cd6c7e6cb7bbbe921da3aaac76c2fc035b1d300708cc5b",
	name: "placeCard",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => placeCard.__executeServer(opts));
var placeCard = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	cardName: String(input?.cardName ?? ""),
	projectId: String(input?.projectId ?? ""),
	round: Number(input?.round ?? 1)
})).handler(placeCard_createServerFn_handler, async ({ data }) => {
	const { placeCard: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var dealCards_createServerFn_handler = createServerRpc({
	id: "f04e7b0889eaf2c25b84e348a286839874991aaf76c98163df94a4fe5671edae",
	name: "dealCards",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => dealCards.__executeServer(opts));
var dealCards = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	round: Number(input?.round ?? 1)
})).handler(dealCards_createServerFn_handler, async ({ data }) => {
	const { dealCards: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var confirmPlay_createServerFn_handler = createServerRpc({
	id: "b0ad290a88b1304838458038f6887536701416a7c0ea7694a25156268b985a18",
	name: "confirmPlay",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => confirmPlay.__executeServer(opts));
var confirmPlay = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	playId: String(input?.playId ?? "")
})).handler(confirmPlay_createServerFn_handler, async ({ data }) => {
	const { confirmPlay: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var changePlay_createServerFn_handler = createServerRpc({
	id: "5022e42b64ddea9adddd31b6539a1d2a1c64e672f967d6d99a4a5e44819440bc",
	name: "changePlay",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => changePlay.__executeServer(opts));
var changePlay = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	playId: String(input?.playId ?? ""),
	projectId: String(input?.projectId ?? "")
})).handler(changePlay_createServerFn_handler, async ({ data }) => {
	const { changePlay: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var removePlay_createServerFn_handler = createServerRpc({
	id: "6ae45fdfe7f76ba21ca350c415975c374fa311d4e0277a4d031247da4baa9d04",
	name: "removePlay",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => removePlay.__executeServer(opts));
var removePlay = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	playId: String(input?.playId ?? "")
})).handler(removePlay_createServerFn_handler, async ({ data }) => {
	const { removePlay: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var startTurn_createServerFn_handler = createServerRpc({
	id: "9b380ad7d45dd2e3927c97280099c2f38ea9cd790c7d577e267491e367db9095",
	name: "startTurn",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => startTurn.__executeServer(opts));
var startTurn = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	dept: String(input?.dept ?? "")
})).handler(startTurn_createServerFn_handler, async ({ data }) => {
	const { startTurn: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var callMeeting_createServerFn_handler = createServerRpc({
	id: "3c637be98fe103667c079ccaa1fdab899000b9c18984e66930ba152274c42ea3",
	name: "callMeeting",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => callMeeting.__executeServer(opts));
var callMeeting = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(callMeeting_createServerFn_handler, async ({ data }) => {
	const { callMeeting: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var ackMeeting_createServerFn_handler = createServerRpc({
	id: "bfc7f2708c5022db8acd8513211ba50ace37712bb790deffd03b7933059a625d",
	name: "ackMeeting",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => ackMeeting.__executeServer(opts));
var ackMeeting = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(ackMeeting_createServerFn_handler, async ({ data }) => {
	const { ackMeeting: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var setActionMode_createServerFn_handler = createServerRpc({
	id: "7f2605dd6d0af8b1fde0298a02ff6b3913af9db41cab0dc630dc18ec42867801",
	name: "setActionMode",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => setActionMode.__executeServer(opts));
var setActionMode = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	mode: String(input?.mode ?? "digital")
})).handler(setActionMode_createServerFn_handler, async ({ data }) => {
	const { setActionMode: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var recordManualCards_createServerFn_handler = createServerRpc({
	id: "a64cf2c02f5ad93e0ba6c24c5f9062aabf51cea410eb7980c000c790ec958cf5",
	name: "recordManualCards",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => recordManualCards.__executeServer(opts));
var recordManualCards = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	cards: Array.isArray(input?.cards) ? input.cards.map(String) : [],
	round: Number(input?.round ?? 1)
})).handler(recordManualCards_createServerFn_handler, async ({ data }) => {
	const { recordManualCards: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var undoAction_createServerFn_handler = createServerRpc({
	id: "908dce2c3218c838e313b0fb720eb182284ebd00743b7919600ec2654462e54a",
	name: "undoAction",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => undoAction.__executeServer(opts));
var undoAction = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	playId: String(input?.playId ?? "")
})).handler(undoAction_createServerFn_handler, async ({ data }) => {
	const { undoAction: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var playEvent_createServerFn_handler = createServerRpc({
	id: "6cf31cda3352efdfe2d6d184b13e9fb0a11b46d92e07491e0f44ec39d4b151a9",
	name: "playEvent",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => playEvent.__executeServer(opts));
var playEvent = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	eventName: String(input?.eventName ?? ""),
	projectId: String(input?.projectId ?? ""),
	round: Number(input?.round ?? 1)
})).handler(playEvent_createServerFn_handler, async ({ data }) => {
	const { playEvent: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var submitPicks_createServerFn_handler = createServerRpc({
	id: "e733dcdc7022bbd12c37a33f8c88be36e34085486bcb1f55da4a3181d5d1bf69",
	name: "submitPicks",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => submitPicks.__executeServer(opts));
var submitPicks = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? ""),
	picks: Array.isArray(input?.picks) ? input.picks.map(String) : []
})).handler(submitPicks_createServerFn_handler, async ({ data }) => {
	const { submitPicks: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var insightsFor_createServerFn_handler = createServerRpc({
	id: "3073ed0586c8605d0e9bacb4a1212ff5f22cbe2637f597fd34a53a71a3c997df",
	name: "insightsFor",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => insightsFor.__executeServer(opts));
var insightsFor = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(insightsFor_createServerFn_handler, async ({ data }) => {
	const { insightsFor: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var setBasePayroll_createServerFn_handler = createServerRpc({
	id: "072eb16973b7ced707bdb16adee5b454806782701551d5ad8d74057ae2fa9d29",
	name: "setBasePayroll",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => setBasePayroll.__executeServer(opts));
var setBasePayroll = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? ""),
	amount: Number(input?.amount ?? 3200)
})).handler(setBasePayroll_createServerFn_handler, async ({ data }) => {
	const { setBasePayroll: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data);
});
var setFixedCost_createServerFn_handler = createServerRpc({
	id: "fcaae68977a272665101aa5f83c67b833dbf918eea6461b002d5d2dffc9cecab",
	name: "setFixedCost",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => setFixedCost.__executeServer(opts));
var setFixedCost = createServerFn({ method: "POST" }).validator((input) => ({
	token: String(input?.token ?? ""),
	gameId: String(input?.gameId ?? ""),
	amount: Number(input?.amount ?? 2e3),
	startRound: Number(input?.startRound ?? 3)
})).handler(setFixedCost_createServerFn_handler, async ({ data }) => {
	const { setFixedCost: run } = await import("./admin.server-CeOOKF1U.mjs");
	return run(data);
});
var setPlusOne_createServerFn_handler = createServerRpc({
	id: "09755376f775c20bc17b070663a5045e5671d0e8ff957f5c0dc044a9beb13ca0",
	name: "setPlusOne",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => setPlusOne.__executeServer(opts));
var setPlusOne = createServerFn({ method: "POST" }).inputValidator((data) => data).handler(setPlusOne_createServerFn_handler, async ({ data }) => {
	const { setPlusOne: run } = await import("./server-CK1srNLx.mjs");
	return run(data);
});
var gameJoinStatus_createServerFn_handler = createServerRpc({
	id: "2d74c4c7f10da6ab2b2f1ddb02b5cf5d9ec3dd7e66fd658c5238633bd1cec7a0",
	name: "gameJoinStatus",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => gameJoinStatus.__executeServer(opts));
var gameJoinStatus = createServerFn({ method: "GET" }).validator((input) => ({ slug: String(input?.slug ?? "") })).handler(gameJoinStatus_createServerFn_handler, async ({ data }) => {
	const { getMetalconSql } = await import("./db.server-CdWAa1xo.mjs");
	const game = (await (await getMetalconSql())`
      select status, event_name, n from metalcon.games where slug = ${data.slug} limit 1
    `)[0];
	if (!game) {
		console.log("JOIN CLOSED: missing slug", data.slug);
		return {
			ok: false,
			closed: true,
			reason: "missing"
		};
	}
	if (game.status !== "live") {
		console.log("JOIN CLOSED: ended", data.slug, game.status);
		return {
			ok: false,
			closed: true,
			reason: "ended",
			status: game.status,
			n: game.n
		};
	}
	return {
		ok: true,
		closed: false,
		status: game.status,
		eventName: game.event_name,
		n: game.n
	};
});
var seatOpen_createServerFn_handler = createServerRpc({
	id: "a7720c9eec0683df3bea5245635c529d8d5d4a1f422c802de716dff269356dca",
	name: "seatOpen",
	filename: "src/lib/metalcon/api.ts"
}, (opts) => seatOpen.__executeServer(opts));
var seatOpen = createServerFn({ method: "POST" }).validator((input) => ({
	id: String(input?.id ?? ""),
	secret: String(input?.secret ?? "")
})).handler(seatOpen_createServerFn_handler, async ({ data }) => {
	const { getMetalconSql } = await import("./db.server-CdWAa1xo.mjs");
	if ((await (await getMetalconSql())`
      select g.status from metalcon.players p
      join metalcon.games g on g.id = p.game_id
      where p.id = ${data.id} limit 1
    `)[0]?.status !== "live") return {
		ok: false,
		closed: true
	};
	return {
		ok: true,
		closed: false
	};
});
//#endregion
export { ackMeeting_createServerFn_handler, adminDesk_createServerFn_handler, adminEnter_createServerFn_handler, answerLog_createServerFn_handler, breakTie_createServerFn_handler, callMeeting_createServerFn_handler, changeAdminPassword_createServerFn_handler, changePlay_createServerFn_handler, claimSeat_createServerFn_handler, companyBoard_createServerFn_handler, confirmPlay_createServerFn_handler, createHost_createServerFn_handler, dealCards_createServerFn_handler, endGameFromGm_createServerFn_handler, endGame_createServerFn_handler, exportGame_createServerFn_handler, exportHostLeads_createServerFn_handler, findScenario_createServerFn_handler, finishProject_createServerFn_handler, gameJoinStatus_createServerFn_handler, insightsFor_createServerFn_handler, lockScenario_createServerFn_handler, nextScenario_createServerFn_handler, openProject_createServerFn_handler, placeCard_createServerFn_handler, placePlayer_createServerFn_handler, playAction_createServerFn_handler, playEvent_createServerFn_handler, recordManualCards_createServerFn_handler, registerSeat_createServerFn_handler, removePlay_createServerFn_handler, reopenGame_createServerFn_handler, resetGame_createServerFn_handler, resetPassword_createServerFn_handler, restartVote_createServerFn_handler, roundSheet_createServerFn_handler, seatOpen_createServerFn_handler, sendSeatLink_createServerFn_handler, setActionMode_createServerFn_handler, setBasePayroll_createServerFn_handler, setCompanyName_createServerFn_handler, setFinishOrder_createServerFn_handler, setFixedCost_createServerFn_handler, setFocus_createServerFn_handler, setMeeting_createServerFn_handler, setPlusOne_createServerFn_handler, setProjectSlot_createServerFn_handler, setShareSeat_createServerFn_handler, setSignup_createServerFn_handler, speakMale_createServerFn_handler, startGame_createServerFn_handler, startTurn_createServerFn_handler, submitHostLead_createServerFn_handler, submitPicks_createServerFn_handler, suggestCompany_createServerFn_handler, swapAttendee_createServerFn_handler, undoAction_createServerFn_handler, voteCompany_createServerFn_handler };
