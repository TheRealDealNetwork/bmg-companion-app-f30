import { r as BOARD_DEPTS } from "./types-D1bYXzt9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/icons-DRCSszAQ.js
var DEPT_ICON = {
	Marketing: "STAR",
	"Appointment Center": "PHONE",
	Sales: "SALE",
	Production: "HAMMER",
	Accounting: "CALCULATOR"
};
function cardEffect(text) {
	const t = text.toUpperCase();
	const play = /PLAY\s+(\d+)/.exec(t);
	if (play) return {
		kind: "play",
		count: Number(play[1])
	};
	if (t.includes("SLOT")) {
		const slot = /ADD\s+(\d+)/.exec(t);
		if (slot) return {
			kind: "slot",
			count: Number(slot[1])
		};
	}
	const remove = /REMOVE\s+(\d+)/.exec(t);
	if (remove) return {
		kind: "remove",
		count: Number(remove[1])
	};
	const move = /MOVE\s+(\d+)/.exec(t);
	if (move) return {
		kind: "move",
		count: Number(move[1])
	};
	return { kind: "none" };
}
var EXTRA_DEPT = {
	star: "Marketing",
	phone: "Appointment Center",
	$: "Sales",
	hammer: "Production",
	calculator: "Accounting"
};
/** A house or customer that adds one more icon slot. "any" is chosen when the project opens. */
function extraSlot(text) {
	const named = /1 extra (star|phone|\$|hammer|calculator) slot/i.exec(text);
	if (named) return EXTRA_DEPT[named[1].toLowerCase()] ?? null;
	if (/1 extra icon slot of (?:any type|its choice)/i.test(text)) return "any";
	return null;
}
function plainCardText(text) {
	return text.replace(/^Accepted terms?:\s*/i, "").trim();
}
function cashEffect(text) {
	const upper = text.toUpperCase();
	const amount = dollarCents(text);
	if (!amount) return {
		immediate: 0,
		onComplete: 0
	};
	if (/CHOOSE|IF |FOR EACH|NOT COMPLETED|4TH OR LATER|AT LEAST 2|2 OR MORE/.test(upper)) return {
		immediate: 0,
		onComplete: 0
	};
	const signed = (/SUBTRACT|LOSE|PAYS \$|PAY \$|COMPANY PAYS/.test(upper) ? -1 : 1) * amount;
	if (/ON PROJECT COMPLETION|WHEN THIS PROJECT COMPLETES/.test(upper)) return {
		immediate: 0,
		onComplete: signed
	};
	if (/REVENUE|COMPANY CASH|COMPANY PAYS/.test(upper)) return {
		immediate: signed,
		onComplete: 0
	};
	return {
		immediate: 0,
		onComplete: 0
	};
}
function dollarCents(text) {
	const match = /\$([0-9,]+)/.exec(text);
	if (!match) return 0;
	return Number(match[1].replace(/,/g, "")) * 100;
}
var ICON_NOUN = {
	Marketing: "star",
	"Appointment Center": "phone",
	Sales: "sale",
	Production: "hammer",
	Accounting: "calculator"
};
/** Earlier departments on this project must be filled, including extra slots, before this one can play. */
function stageReady(project, dept) {
	const index = BOARD_DEPTS.indexOf(dept);
	if (index <= 0) return true;
	for (let i = 0; i < index; i++) {
		const earlier = BOARD_DEPTS[i];
		const tokens = project.tokens.filter((token) => token.dept === earlier);
		const waiting = tokens.filter((token) => !token.filled).length;
		if (tokens.length > 0 && waiting === 0) continue;
		const need = waiting || 1;
		const noun = ICON_NOUN[earlier] ?? "icon";
		return `Project ${project.n} still needs ${need} ${noun}${need === 1 ? "" : "s"} before ${dept} can play there.`;
	}
	return true;
}
//#endregion
export { plainCardText as a, extraSlot as i, cardEffect as n, stageReady as o, cashEffect as r, DEPT_ICON as t };
