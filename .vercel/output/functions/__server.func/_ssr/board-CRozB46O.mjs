import { t as dataset_default } from "./dataset-CIkrBzpZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/board-CRozB46O.js
var data = dataset_default;
function slug(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
var ACTION_CARDS = data.department_cards.map((card) => ({
	id: slug(card.name),
	name: card.name,
	dept: card.dept,
	type: card.type ?? "",
	text: card.text
}));
var HOUSES = data.house_cards.map((card) => ({
	id: slug(card.name),
	name: card.name,
	text: card.text
}));
var CUSTOMERS = data.customer_cards.map((card) => ({
	id: slug(card.name),
	name: card.name,
	text: card.text
}));
var EVENTS = [
	{
		id: slug("Word of Mouth"),
		name: "Word of Mouth",
		text: "Focus on up to 2 extra projects. Every department draws 1 extra card."
	},
	{
		id: slug("Warm Lead"),
		name: "Warm Lead",
		text: "Add 1 star token to any project."
	},
	{
		id: slug("Rush Callback"),
		name: "Rush Callback",
		text: "Add 1 phone token to any project."
	},
	{
		id: slug("Crew Efficiency"),
		name: "Crew Efficiency",
		text: "Add 1 hammer token to any project."
	},
	{
		id: slug("Smooth Close"),
		name: "Smooth Close",
		text: "Sales may play 1 extra card this round."
	},
	{
		id: slug("Invoice Paid Early"),
		name: "Invoice Paid Early",
		text: "Company cash +$3,000."
	},
	{
		id: slug("Community Buzz"),
		name: "Community Buzz",
		text: "Company cash +$3,000."
	},
	{
		id: slug("Buyer's Remorse"),
		name: "Buyer's Remorse",
		text: "Remove 1 Sales token from an unfinished project."
	},
	{
		id: slug("Algorithm Change"),
		name: "Algorithm Change",
		text: "Marketing draws 2 fewer cards this round."
	},
	{
		id: slug("Material Spike"),
		name: "Material Spike",
		text: "Company pays $2,000 for materials."
	},
	{
		id: slug("Warranty Claim"),
		name: "Warranty Claim",
		text: "Company pays $2,000."
	},
	{
		id: slug("No-Show Day"),
		name: "No-Show Day",
		text: "Appointment Center draws 1 fewer card this round."
	},
	{
		id: slug("Financing Falls Through"),
		name: "Financing Falls Through",
		text: "Sales chooses one unfinished project. It completes for $2,000 less."
	},
	{
		id: slug("One-Star Review"),
		name: "One-Star Review",
		text: "Marketing draws 1 fewer card this round."
	}
];
/** Resolve a stored display name to its stable ID. Call this before action processing, not inside the lookup. */
function toCardId(stored) {
	const key = stored.trim().toLowerCase();
	return (ACTION_CARDS.find((card) => card.id === key || card.name.toLowerCase() === key) ?? HOUSES.find((card) => card.id === key || card.name.toLowerCase() === key) ?? CUSTOMERS.find((card) => card.id === key || card.name.toLowerCase() === key) ?? EVENTS.find((card) => card.id === key || card.name.toLowerCase() === key))?.id ?? null;
}
function actionOf(id) {
	return ACTION_CARDS.find((card) => card.id === id) ?? null;
}
function houseOf(id) {
	return HOUSES.find((card) => card.id === id) ?? null;
}
function customerOf(id) {
	return CUSTOMERS.find((card) => card.id === id) ?? null;
}
function eventOf(id) {
	return EVENTS.find((card) => card.id === id) ?? null;
}
function tierValue(position) {
	if (position <= 3) return 1e4;
	if (position <= 6) return 2e4;
	return 3e4;
}
var TOKEN_WORD = {
	star: "lead star",
	phone: "phone",
	sale: "Sales token",
	hammer: "hammer",
	calculator: "calculator"
};
function plusOnes(project, plays) {
	const plus = {};
	const add = (dept, n = 1) => {
		plus[dept] = (plus[dept] ?? 0) + n;
	};
	if (/Steep Colonial|1970s Bi-Level|Urban Rowhome/i.test(project.house)) add("Production");
	if (/Ranch with Full Basement/i.test(project.house)) add("Marketing");
	if (/Split-Level/i.test(project.house)) add("Sales");
	if (/Craftsman/i.test(project.house)) add("Appointment Center");
	if (/Modern Lake House/i.test(project.house)) add("Accounting");
	if (/Suburban McMansion/i.test(project.house)) add(project.extra_slot || "Production");
	if (/Patel/i.test(project.customer)) add(project.extra_slot || "Sales");
	for (const play of plays) {
		const effect = boardEffect({
			name: play.card_name ?? "",
			dept: play.dept,
			text: play.card_text ?? ""
		});
		if (effect.kind === "slot") add(play.dept, effect.count);
	}
	return plus;
}
function slotNeed(_project, _extraFromPlays = {}) {
	return {
		Marketing: 1,
		"Appointment Center": 1,
		Sales: 1,
		Production: 1,
		Accounting: 1
	};
}
function filledSlots(project, plays) {
	const need = slotNeed(project);
	const filled = {};
	for (const play of plays) filled[play.dept] = (filled[play.dept] ?? 0) + 1;
	const plus = plusOnes(project, plays);
	for (const [dept, n] of Object.entries(project.plus_ones ?? {})) plus[dept] = (plus[dept] ?? 0) + n;
	const outstanding = {};
	for (const [dept, n] of Object.entries(plus)) {
		const extra = Math.max(0, (filled[dept] ?? 0) - 1);
		const left = Math.max(0, n - extra);
		if (left > 0) outstanding[dept] = left;
	}
	const totalNeed = 5;
	const totalFilled = Object.keys(need).filter((dept) => (filled[dept] ?? 0) >= 1).length;
	return {
		need,
		filled,
		plus,
		outstanding,
		totalNeed,
		totalFilled,
		ready: totalFilled >= 5 && Object.keys(outstanding).length === 0
	};
}
function tokenOf(dept) {
	if (dept === "Marketing") return "star";
	if (dept === "Appointment Center") return "phone";
	if (dept === "Sales") return "sale";
	if (dept === "Production") return "hammer";
	return "calculator";
}
function boardEffect(card) {
	const text = card.text.toUpperCase();
	const token = tokenOf(card.dept);
	if (card.name.toLowerCase() === "invoice blitz") return {
		kind: "cash",
		count: 1,
		token,
		cashCents: 3e5,
		cashWhen: "now",
		words: "Invoice Blitz: +$3,000 company revenue, and +1 calculator on the project"
	};
	if (card.name.toLowerCase() === "quick audit") return {
		kind: "cash",
		count: 0,
		token: null,
		cashCents: 4e5,
		cashWhen: "now",
		words: "Quick Audit: +$4,000 company revenue now"
	};
	if (card.name.toLowerCase() === "overbudget surprise") return {
		kind: "cash",
		count: 0,
		token: null,
		cashCents: -3e5,
		cashWhen: "now",
		words: "Overbudget Surprise: −$3,000 company revenue"
	};
	if (card.name.toLowerCase() === "upsell close") return {
		kind: "cash",
		count: 1,
		token: "sale",
		cashCents: 2e5,
		cashWhen: "complete",
		words: "Upsell Close: +1 Sales token, +$2,000 when this project finishes"
	};
	if (card.name.toLowerCase() === "financing falls through") return {
		kind: "cash",
		count: 0,
		token: null,
		cashCents: -2e5,
		cashWhen: "complete",
		words: "Financing Falls Through: −$2,000 when this project finishes"
	};
	if (/DRAW\s+(\d+)/.test(text)) {
		const n = Number(/DRAW\s+(\d+)/.exec(text)?.[1] ?? 1);
		return {
			kind: "draw",
			count: n,
			token: null,
			cashCents: 0,
			cashWhen: null,
			words: `${card.name}: draw ${n} card${n === 1 ? "" : "s"}`
		};
	}
	if (/MOVE\s+1/.test(text)) return {
		kind: "move",
		count: 1,
		token,
		cashCents: 0,
		cashWhen: null,
		words: `${card.name}: move 1 ${TOKEN_WORD[token]}`
	};
	if (/REMOVE\s+1/.test(text)) return {
		kind: "remove",
		count: 1,
		token,
		cashCents: 0,
		cashWhen: null,
		words: `${card.name}: remove 1 ${TOKEN_WORD[token]}`
	};
	if (/ADD\s+1/.test(text) && /SLOT/.test(text)) return {
		kind: "slot",
		count: 1,
		token,
		cashCents: 0,
		cashWhen: null,
		words: `${card.name}: +1 ${TOKEN_WORD[token]} slot`
	};
	const play = /PLAY\s+(\d+)/.exec(text);
	const n = Number(play?.[1] ?? 1);
	return {
		kind: "token",
		count: n,
		token,
		cashCents: 0,
		cashWhen: null,
		words: `${card.name}: +${n} ${TOKEN_WORD[token]}${n === 1 ? "" : "s"}`
	};
}
function effectLine(cardName, projectLabel) {
	const card = actionOf(cardName);
	if (!card) return cardName;
	const effect = boardEffect(card);
	if (effect.kind === "draw" || effect.kind === "cash" && !effect.token) return effect.words;
	return `${effect.words} on ${projectLabel}`;
}
function houseBonus(name) {
	if (/1970s Bi-Level/i.test(name)) return 3e5;
	if (/Suburban McMansion/i.test(name)) return 2e5;
	if (/Historic Victorian/i.test(name)) return 2e5;
	return 0;
}
function customerCash(input) {
	if (/Garcia/i.test(input.name)) return Math.min(input.finishedAfter, 4) * 2e5;
	if (/Harris/i.test(input.name) && input.complete) return 4e5;
	if (/Patel/i.test(input.name) && input.complete) return 2e5;
	if (/Kim/i.test(input.name) && input.complete && (input.marketingStars ?? 0) >= 2) return 3e5;
	if (/Rivera/i.test(input.name) && input.complete) return input.specials >= 2 ? 5e5 : 0;
	if (/Thompson/i.test(input.name) && input.complete && input.isFourthOrLater) return -5e5;
	if (/Lee/i.test(input.name)) return Math.min(input.tokensPlaced, 5) * 1e5;
	if (/O'Brien/i.test(input.name) && input.complete && input.isLastFinished && input.gameEnded) return 4e5;
	return 0;
}
function stanleyPenalty(name, round, status) {
	if (!/Stanley/i.test(name) || status === "complete") return 0;
	return round >= 6 ? -5e5 : 0;
}
function eventCash(name) {
	if (name === "Invoice Paid Early" || name === "Community Buzz") return 3e5;
	if (name === "Material Spike" || name === "Warranty Claim") return -2e5;
	return 0;
}
//#endregion
export { toCardId as _, actionOf as a, customerOf as c, eventOf as d, filledSlots as f, tierValue as g, stanleyPenalty as h, HOUSES as i, effectLine as l, houseOf as m, CUSTOMERS as n, boardEffect as o, houseBonus as p, EVENTS as r, customerCash as s, ACTION_CARDS as t, eventCash as u };
