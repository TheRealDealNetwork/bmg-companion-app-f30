import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-7u5DJtSj.js
var createGame_createServerFn_handler = createServerRpc({
	id: "6575fe05311bcd7848cdfbe88717cc28ed9400ca673a8ff177b6818b31deffee",
	name: "createGame",
	filename: "src/lib/game/api.ts"
}, (opts) => createGame.__executeServer(opts));
var createGame = createServerFn({ method: "POST" }).validator((input) => ({
	company: String(input?.company ?? ""),
	rehearsal: Boolean(input?.rehearsal),
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(createGame_createServerFn_handler, async ({ data }) => {
	const { createGameRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return createGameRecord(data);
});
var listGames_createServerFn_handler = createServerRpc({
	id: "96f14f73c994370f023589e7cd2499138d22ca999fade0f8c9eb0a301adff2c7",
	name: "listGames",
	filename: "src/lib/game/api.ts"
}, (opts) => listGames.__executeServer(opts));
var listGames = createServerFn({ method: "POST" }).validator((input) => ({
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(listGames_createServerFn_handler, async ({ data }) => {
	const { listGamesRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return listGamesRecord(data.adminToken, data.profileSecret);
});
var resumeHost_createServerFn_handler = createServerRpc({
	id: "63e46883dd5fb084524623187d21ec9c9042f96cd4bcd87dfd1b641b4a0a56ea",
	name: "resumeHost",
	filename: "src/lib/game/api.ts"
}, (opts) => resumeHost.__executeServer(opts));
var resumeHost = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	adminToken: String(input?.adminToken ?? ""),
	hostToken: input?.hostToken ? String(input.hostToken) : void 0,
	profileSecret: String(input?.profileSecret ?? "")
})).handler(resumeHost_createServerFn_handler, async ({ data }) => {
	const { resumeHostRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return resumeHostRecord(data);
});
var resetGame_createServerFn_handler = createServerRpc({
	id: "2c88b50ea0e70d958a3ba33eb17013c806970b960e35d39300b20f3476feb27c",
	name: "resetGame",
	filename: "src/lib/game/api.ts"
}, (opts) => resetGame.__executeServer(opts));
var resetGame = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(resetGame_createServerFn_handler, async ({ data }) => {
	const { resetGameRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return resetGameRecord(data);
});
var deleteGame_createServerFn_handler = createServerRpc({
	id: "e7bed325ed9240d09880583e81766125349a977ed2537f5e413e86df8d4656e4",
	name: "deleteGame",
	filename: "src/lib/game/api.ts"
}, (opts) => deleteGame.__executeServer(opts));
var deleteGame = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(deleteGame_createServerFn_handler, async ({ data }) => {
	const { deleteGameRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return deleteGameRecord(data);
});
var addHost_createServerFn_handler = createServerRpc({
	id: "2982dcc265448ae9e9d9acc18661c062ab8667e96028b283a8dcbfd27db29cd2",
	name: "addHost",
	filename: "src/lib/game/api.ts"
}, (opts) => addHost.__executeServer(opts));
var addHost = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	adminToken: String(input?.adminToken ?? ""),
	label: String(input?.label ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(addHost_createServerFn_handler, async ({ data }) => {
	const { addHostRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return addHostRecord(data);
});
var removeHost_createServerFn_handler = createServerRpc({
	id: "0e62e8692c19951b6fd4517daedcd88aa4aef66ced99c72e674bf475524deb87",
	name: "removeHost",
	filename: "src/lib/game/api.ts"
}, (opts) => removeHost.__executeServer(opts));
var removeHost = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	adminToken: String(input?.adminToken ?? ""),
	adminId: String(input?.adminId ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(removeHost_createServerFn_handler, async ({ data }) => {
	const { removeHostRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return removeHostRecord(data);
});
var readGame_createServerFn_handler = createServerRpc({
	id: "cd08e7c4f1fd5a44257ad689ba1db388eb77daaf4d102edaa772db55da4cbcc8",
	name: "readGame",
	filename: "src/lib/game/api.ts"
}, (opts) => readGame.__executeServer(opts));
var readGame = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	hostToken: input?.hostToken ? String(input.hostToken) : void 0,
	playerId: input?.playerId ? String(input.playerId) : void 0,
	playerToken: input?.playerToken ? String(input.playerToken) : void 0
})).handler(readGame_createServerFn_handler, async ({ data }) => {
	const { readGameRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return readGameRecord(data);
});
var publicJoinLink_createServerFn_handler = createServerRpc({
	id: "707820e82dc776faf562ce3fc76df29bf7e1755bdeb0fe3e3bea62e9d00c055f",
	name: "publicJoinLink",
	filename: "src/lib/game/api.ts"
}, (opts) => publicJoinLink.__executeServer(opts));
var publicJoinLink = createServerFn({ method: "POST" }).validator((input) => ({ code: String(input?.code ?? "") })).handler(publicJoinLink_createServerFn_handler, async ({ data }) => {
	const { browserJoinLink } = await import("./actions.server-Cic0Zb3D.mjs");
	return browserJoinLink(data.code);
});
var joinGame_createServerFn_handler = createServerRpc({
	id: "5d84cc7283425ddc14d9e6ec277bc5aa4a160e1fe0eb935ae3c10e6e0f1ad480",
	name: "joinGame",
	filename: "src/lib/game/api.ts"
}, (opts) => joinGame.__executeServer(opts));
var joinGame = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	name: String(input?.name ?? ""),
	dept: String(input?.dept ?? ""),
	seat: String(input?.seat ?? ""),
	profileSecret: String(input?.profileSecret ?? "")
})).handler(joinGame_createServerFn_handler, async ({ data }) => {
	const { joinRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return joinRecord(data);
});
var previewSeat_createServerFn_handler = createServerRpc({
	id: "926d0271547b1d35e2693e31c0dbffc8f05ca719ab3c0eaf3a9c99fff475224a",
	name: "previewSeat",
	filename: "src/lib/game/api.ts"
}, (opts) => previewSeat.__executeServer(opts));
var previewSeat = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	seat: String(input?.seat ?? "")
})).handler(previewSeat_createServerFn_handler, async ({ data }) => {
	const { seatPreviewRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return seatPreviewRecord(data);
});
var assumeSeat_createServerFn_handler = createServerRpc({
	id: "180267ee6079b6f75d1a9a61f6fece3290a53211396874503acb111a89ce428d",
	name: "assumeSeat",
	filename: "src/lib/game/api.ts"
}, (opts) => assumeSeat.__executeServer(opts));
var assumeSeat = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	hostToken: String(input?.hostToken ?? ""),
	playerId: String(input?.playerId ?? "")
})).handler(assumeSeat_createServerFn_handler, async ({ data }) => {
	const { assumeSeatRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return assumeSeatRecord(data);
});
var hostAct_createServerFn_handler = createServerRpc({
	id: "26b3661fc0b41ec705a41d6e315c6cbde6c841a09a517a41184ce822456d8788",
	name: "hostAct",
	filename: "src/lib/game/api.ts"
}, (opts) => hostAct.__executeServer(opts));
var hostAct = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	hostToken: String(input?.hostToken ?? ""),
	type: String(input?.type ?? ""),
	payload: input?.payload && typeof input.payload === "object" ? input.payload : {}
})).handler(hostAct_createServerFn_handler, async ({ data }) => {
	const { hostRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return hostRecord(data);
});
var playerAct_createServerFn_handler = createServerRpc({
	id: "a4f503c7baf8d100833481fd526d54d1daaaa09c1c414b548bd0a3ded2344f2c",
	name: "playerAct",
	filename: "src/lib/game/api.ts"
}, (opts) => playerAct.__executeServer(opts));
var playerAct = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	playerId: String(input?.playerId ?? ""),
	playerToken: String(input?.playerToken ?? ""),
	type: String(input?.type ?? ""),
	payload: input?.payload && typeof input.payload === "object" ? input.payload : {}
})).handler(playerAct_createServerFn_handler, async ({ data }) => {
	const { playerRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return playerRecord(data);
});
var lookupCard_createServerFn_handler = createServerRpc({
	id: "e889f82d9933de9d5eeb306928ee9c40a0a6bcdfea68bc9ea4473a3538c01939",
	name: "lookupCard",
	filename: "src/lib/game/api.ts"
}, (opts) => lookupCard.__executeServer(opts));
var lookupCard = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	raw: String(input?.raw ?? ""),
	dept: input?.dept ? String(input.dept) : void 0,
	hostToken: input?.hostToken ? String(input.hostToken) : void 0,
	playerId: input?.playerId ? String(input.playerId) : void 0,
	playerToken: input?.playerToken ? String(input.playerToken) : void 0
})).handler(lookupCard_createServerFn_handler, async ({ data }) => {
	const { lookupRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return lookupRecord(data);
});
var hostCatalog_createServerFn_handler = createServerRpc({
	id: "b369db19929271bb398210e4c8b3a1333586fc5558259fc191cb028e2db8a133",
	name: "hostCatalog",
	filename: "src/lib/game/api.ts"
}, (opts) => hostCatalog.__executeServer(opts));
var hostCatalog = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	hostToken: String(input?.hostToken ?? "")
})).handler(hostCatalog_createServerFn_handler, async ({ data }) => {
	const { catalogRecord } = await import("./actions.server-Cic0Zb3D.mjs");
	return catalogRecord(data);
});
var speak_createServerFn_handler = createServerRpc({
	id: "54d55bd5be629952cf916ebfe9fa78078ef7451d8f13ce14d6453cf609cdb6f5",
	name: "speak",
	filename: "src/lib/game/api.ts"
}, (opts) => speak.__executeServer(opts));
var speak = createServerFn({ method: "POST" }).validator((input) => ({ text: String(input?.text ?? "").slice(0, 1800) })).handler(speak_createServerFn_handler, async ({ data }) => {
	const { speakRecord } = await import("./speech.server-CTo5wV7i.mjs");
	return speakRecord(data.text);
});
var requestEmailCode_createServerFn_handler = createServerRpc({
	id: "5aa0a30fbad251e6fdce9d9004aab4b5b17fe9e3fb6c42349373f78dd846e1e4",
	name: "requestEmailCode",
	filename: "src/lib/game/api.ts"
}, (opts) => requestEmailCode.__executeServer(opts));
var requestEmailCode = createServerFn({ method: "POST" }).validator((input) => ({ email: String(input?.email ?? "").trim().toLowerCase().slice(0, 80) })).handler(requestEmailCode_createServerFn_handler, async ({ data }) => {
	const { requestEmailCodeRecord } = await import("./email-auth.server-1Nb6jpbK.mjs").then((n) => n.i).then((n) => n.i);
	return requestEmailCodeRecord(data.email);
});
var confirmEmailCode_createServerFn_handler = createServerRpc({
	id: "b4d31326e74504bea46a48aa70c34aa2063b6b2b84e66f79345c38c0126dc09a",
	name: "confirmEmailCode",
	filename: "src/lib/game/api.ts"
}, (opts) => confirmEmailCode.__executeServer(opts));
var confirmEmailCode = createServerFn({ method: "POST" }).validator((input) => ({
	email: String(input?.email ?? "").trim().toLowerCase().slice(0, 80),
	code: String(input?.code ?? "").replace(/\D/g, "").slice(0, 6)
})).handler(confirmEmailCode_createServerFn_handler, async ({ data }) => {
	const { confirmEmailCodeRecord } = await import("./email-auth.server-1Nb6jpbK.mjs").then((n) => n.i).then((n) => n.i);
	return confirmEmailCodeRecord(data.email, data.code);
});
var imagineAvatar_createServerFn_handler = createServerRpc({
	id: "d9b08057ea97f141435c1dbb8b7a0481042c9a766a568a6da76ae265d821d1c8",
	name: "imagineAvatar",
	filename: "src/lib/game/api.ts"
}, (opts) => imagineAvatar.__executeServer(opts));
var imagineAvatar = createServerFn({ method: "POST" }).validator((input) => ({ prompt: String(input?.prompt ?? "").slice(0, 240) })).handler(imagineAvatar_createServerFn_handler, async ({ data }) => {
	const { imagineAvatarRecord } = await import("./avatar.server-Dh4z5JO-.mjs");
	return imagineAvatarRecord(data.prompt);
});
var saveProfile_createServerFn_handler = createServerRpc({
	id: "b8500a7183652fb7510e0b9687118af5a6d89280eaebc0e27a87df46afa35f0d",
	name: "saveProfile",
	filename: "src/lib/game/api.ts"
}, (opts) => saveProfile.__executeServer(opts));
var saveProfile = createServerFn({ method: "POST" }).validator((input) => input ?? {}).handler(saveProfile_createServerFn_handler, async ({ data }) => {
	const { saveProfileRecord } = await import("./people.server-P4BX2n4b.mjs");
	return saveProfileRecord(data);
});
var signInProfile_createServerFn_handler = createServerRpc({
	id: "167b97ee44f1981a414fd63850ddb7a60c5fe660a37ee9f2a3ca9fa173eb4cec",
	name: "signInProfile",
	filename: "src/lib/game/api.ts"
}, (opts) => signInProfile.__executeServer(opts));
var signInProfile = createServerFn({ method: "POST" }).validator((input) => ({
	username: String(input?.username ?? "").trim().slice(0, 80),
	pin: String(input?.pin ?? "")
})).handler(signInProfile_createServerFn_handler, async ({ data }) => {
	const { signInProfileRecord } = await import("./people.server-P4BX2n4b.mjs");
	return signInProfileRecord(data);
});
var requestPinReset_createServerFn_handler = createServerRpc({
	id: "d2290995bacb3f7735d177d0cfd6492aea34669c8957ce8db850343333a797e3",
	name: "requestPinReset",
	filename: "src/lib/game/api.ts"
}, (opts) => requestPinReset.__executeServer(opts));
var requestPinReset = createServerFn({ method: "POST" }).validator((input) => ({ login: String(input?.login ?? "").trim().slice(0, 80) })).handler(requestPinReset_createServerFn_handler, async ({ data }) => {
	const { requestPinResetRecord } = await import("./people.server-P4BX2n4b.mjs");
	return requestPinResetRecord(data.login);
});
var confirmPinReset_createServerFn_handler = createServerRpc({
	id: "bef972fe9a6c9c192ec876344827524e4a85b7f9b9530482608d42bed3e3991d",
	name: "confirmPinReset",
	filename: "src/lib/game/api.ts"
}, (opts) => confirmPinReset.__executeServer(opts));
var confirmPinReset = createServerFn({ method: "POST" }).validator((input) => ({
	login: String(input?.login ?? "").trim().slice(0, 80),
	code: String(input?.code ?? "").replace(/\D/g, "").slice(0, 6)
})).handler(confirmPinReset_createServerFn_handler, async ({ data }) => {
	const { confirmPinResetRecord } = await import("./people.server-P4BX2n4b.mjs");
	return confirmPinResetRecord(data.login, data.code);
});
var resetPin_createServerFn_handler = createServerRpc({
	id: "90209f40f140119c0c715407c78292c3bb3b49e8e0b5e304e1738b2a8675a0dc",
	name: "resetPin",
	filename: "src/lib/game/api.ts"
}, (opts) => resetPin.__executeServer(opts));
var resetPin = createServerFn({ method: "POST" }).validator((input) => ({
	login: String(input?.login ?? "").trim().slice(0, 80),
	proof: String(input?.proof ?? ""),
	pin: String(input?.pin ?? "").replace(/\D/g, "").slice(0, 8)
})).handler(resetPin_createServerFn_handler, async ({ data }) => {
	const { resetPinRecord } = await import("./people.server-P4BX2n4b.mjs");
	return resetPinRecord(data);
});
var readProfile_createServerFn_handler = createServerRpc({
	id: "df2714a4e0555ddcc63089fc5ce2ec526d2b44f93c35c5a88f84e79b331201c9",
	name: "readProfile",
	filename: "src/lib/game/api.ts"
}, (opts) => readProfile.__executeServer(opts));
var readProfile = createServerFn({ method: "POST" }).validator((input) => ({ secret: String(input?.secret ?? "") })).handler(readProfile_createServerFn_handler, async ({ data }) => {
	const { readProfileRecord } = await import("./people.server-P4BX2n4b.mjs");
	return readProfileRecord(data.secret);
});
var publicProfile_createServerFn_handler = createServerRpc({
	id: "b940a4224b9e89672302629254a651e711f83dece35e37679ecb06e0b60ef77d",
	name: "publicProfile",
	filename: "src/lib/game/api.ts"
}, (opts) => publicProfile.__executeServer(opts));
var publicProfile = createServerFn({ method: "POST" }).validator((input) => ({ username: String(input?.username ?? "") })).handler(publicProfile_createServerFn_handler, async ({ data }) => {
	const { publicProfileRecord } = await import("./people.server-P4BX2n4b.mjs");
	return publicProfileRecord(data.username);
});
var searchPeople_createServerFn_handler = createServerRpc({
	id: "7a3ad47158208b9302c1ab138353d0fdc3342a2a07266c2d55451693c364adc6",
	name: "searchPeople",
	filename: "src/lib/game/api.ts"
}, (opts) => searchPeople.__executeServer(opts));
var searchPeople = createServerFn({ method: "POST" }).validator((input) => ({
	secret: String(input?.secret ?? ""),
	username: String(input?.username ?? "")
})).handler(searchPeople_createServerFn_handler, async ({ data }) => {
	const { searchPeopleRecord } = await import("./people.server-P4BX2n4b.mjs");
	return searchPeopleRecord(data.secret, data.username);
});
var friendAct_createServerFn_handler = createServerRpc({
	id: "399d551c3a63eae5f3e7c9e076807a1c2982a57a97cb952b2bdc6b7821093822",
	name: "friendAct",
	filename: "src/lib/game/api.ts"
}, (opts) => friendAct.__executeServer(opts));
var friendAct = createServerFn({ method: "POST" }).validator((input) => ({
	secret: String(input?.secret ?? ""),
	username: String(input?.username ?? ""),
	action: String(input?.action ?? "")
})).handler(friendAct_createServerFn_handler, async ({ data }) => {
	const { friendActRecord } = await import("./people.server-P4BX2n4b.mjs");
	return friendActRecord(data.secret, data.username, data.action);
});
var sendMessage_createServerFn_handler = createServerRpc({
	id: "689085ae41db128f62eb941e1b3a5e99faafe4c49461b47ad8c7e5ff5932f5e9",
	name: "sendMessage",
	filename: "src/lib/game/api.ts"
}, (opts) => sendMessage.__executeServer(opts));
var sendMessage = createServerFn({ method: "POST" }).validator((input) => ({
	secret: String(input?.secret ?? ""),
	username: String(input?.username ?? ""),
	body: String(input?.body ?? "")
})).handler(sendMessage_createServerFn_handler, async ({ data }) => {
	const { sendMessageRecord } = await import("./people.server-P4BX2n4b.mjs");
	return sendMessageRecord(data.secret, data.username, data.body);
});
var readThread_createServerFn_handler = createServerRpc({
	id: "f216dfe5ac6aa2a8a0610c30c9412d169d5796457dc33c8e9168a5352003a6b7",
	name: "readThread",
	filename: "src/lib/game/api.ts"
}, (opts) => readThread.__executeServer(opts));
var readThread = createServerFn({ method: "POST" }).validator((input) => ({
	secret: String(input?.secret ?? ""),
	username: String(input?.username ?? "")
})).handler(readThread_createServerFn_handler, async ({ data }) => {
	const { readThreadRecord } = await import("./people.server-P4BX2n4b.mjs");
	return readThreadRecord(data.secret, data.username);
});
var setProfileRank_createServerFn_handler = createServerRpc({
	id: "cb55f6ee317443ad510c49f876f8d2334b4935a027a439650983111fd152298f",
	name: "setProfileRank",
	filename: "src/lib/game/api.ts"
}, (opts) => setProfileRank.__executeServer(opts));
var setProfileRank = createServerFn({ method: "POST" }).validator((input) => ({
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? ""),
	username: String(input?.username ?? ""),
	rank: String(input?.rank ?? "")
})).handler(setProfileRank_createServerFn_handler, async ({ data }) => {
	const { setProfileRankRecord } = await import("./staff.server-D2EDAknK.mjs");
	return setProfileRankRecord(data);
});
var loadInsights_createServerFn_handler = createServerRpc({
	id: "2300065dececd9be35ee9d2cb3cc464deead4878f15d8f319b51a3da5ee9d383",
	name: "loadInsights",
	filename: "src/lib/game/api.ts"
}, (opts) => loadInsights.__executeServer(opts));
var loadInsights = createServerFn({ method: "POST" }).validator((input) => ({
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? ""),
	code: String(input?.code ?? ""),
	dept: String(input?.dept ?? ""),
	person: String(input?.person ?? ""),
	includeRehearsal: Boolean(input?.includeRehearsal)
})).handler(loadInsights_createServerFn_handler, async ({ data }) => {
	const { insightsRecord } = await import("./people.server-P4BX2n4b.mjs");
	return insightsRecord(data.adminToken, data);
});
var askInsights_createServerFn_handler = createServerRpc({
	id: "24136c423c4241657e2587f98d959f13f6dca4137729c9601fceae826d4e4c8a",
	name: "askInsights",
	filename: "src/lib/game/api.ts"
}, (opts) => askInsights.__executeServer(opts));
var askInsights = createServerFn({ method: "POST" }).validator((input) => ({
	adminToken: String(input?.adminToken ?? ""),
	profileSecret: String(input?.profileSecret ?? ""),
	question: String(input?.question ?? ""),
	code: String(input?.code ?? ""),
	dept: String(input?.dept ?? ""),
	person: String(input?.person ?? ""),
	includeRehearsal: Boolean(input?.includeRehearsal)
})).handler(askInsights_createServerFn_handler, async ({ data }) => {
	const { askInsightsRecord } = await import("./people.server-P4BX2n4b.mjs");
	return askInsightsRecord(data.adminToken, data.question, data);
});
var lookupUsername_createServerFn_handler = createServerRpc({
	id: "646c3ff30e04a6cead53fc0b8563083037bcffec988d0d1f275d59126f73b8f7",
	name: "lookupUsername",
	filename: "src/lib/game/api.ts"
}, (opts) => lookupUsername.__executeServer(opts));
var lookupUsername = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	hostToken: String(input?.hostToken ?? ""),
	username: String(input?.username ?? "")
})).handler(lookupUsername_createServerFn_handler, async ({ data }) => {
	const { lookupForHostRecord } = await import("./people.server-P4BX2n4b.mjs");
	return lookupForHostRecord(data);
});
//#endregion
export { addHost_createServerFn_handler, askInsights_createServerFn_handler, assumeSeat_createServerFn_handler, confirmEmailCode_createServerFn_handler, confirmPinReset_createServerFn_handler, createGame_createServerFn_handler, deleteGame_createServerFn_handler, friendAct_createServerFn_handler, hostAct_createServerFn_handler, hostCatalog_createServerFn_handler, imagineAvatar_createServerFn_handler, joinGame_createServerFn_handler, listGames_createServerFn_handler, loadInsights_createServerFn_handler, lookupCard_createServerFn_handler, lookupUsername_createServerFn_handler, playerAct_createServerFn_handler, previewSeat_createServerFn_handler, publicJoinLink_createServerFn_handler, publicProfile_createServerFn_handler, readGame_createServerFn_handler, readProfile_createServerFn_handler, readThread_createServerFn_handler, removeHost_createServerFn_handler, requestEmailCode_createServerFn_handler, requestPinReset_createServerFn_handler, resetGame_createServerFn_handler, resetPin_createServerFn_handler, resumeHost_createServerFn_handler, saveProfile_createServerFn_handler, searchPeople_createServerFn_handler, sendMessage_createServerFn_handler, setProfileRank_createServerFn_handler, signInProfile_createServerFn_handler, speak_createServerFn_handler };
