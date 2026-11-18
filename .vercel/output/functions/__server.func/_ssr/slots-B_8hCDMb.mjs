import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as filledSlots } from "./board-CRozB46O.mjs";
import { n as resolveName, t as bilingual } from "./es-cards-CbiskBUh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/slots-B_8hCDMb.js
var import_jsx_runtime = require_jsx_runtime();
var ORDER = [
	"Marketing",
	"Appointment Center",
	"Sales",
	"Production",
	"Accounting"
];
var TOKEN_IMG = {
	Marketing: "/tokens/marketing.png",
	"Appointment Center": "/tokens/appointment-center.png",
	Sales: "/tokens/sales.png",
	Production: "/tokens/production.png",
	Accounting: "/tokens/accounting.png"
};
var LABEL = {
	Marketing: {
		en: "Marketing",
		es: "Marketing"
	},
	"Appointment Center": {
		en: "Appointment Center",
		es: "Centro de Citas"
	},
	Sales: {
		en: "Sales",
		es: "Ventas"
	},
	Production: {
		en: "Production",
		es: "Producción"
	},
	Accounting: {
		en: "Accounting",
		es: "Contabilidad"
	}
};
function TokenImg({ dept, state }) {
	const src = TOKEN_IMG[dept] ?? "/tokens/marketing.png";
	const opacity = state === "empty" ? .33 : 1;
	const shadow = state === "filled" ? "drop-shadow(0 2px 3px rgba(0,0,0,0.45))" : "none";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: `${dept} ${state}`,
		className: "h-9 w-9 shrink-0 rounded-full",
		style: {
			opacity,
			filter: shadow
		}
	});
}
function PlusOne({ count }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "absolute -right-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#F5C518] font-bold text-navy",
		style: {
			boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
			fontSize: 11
		},
		children: ["+1", count > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "absolute -bottom-2 -right-2 z-30 flex items-center justify-center rounded-full bg-navy px-1 font-bold text-white",
			style: {
				fontSize: 11,
				minWidth: 18,
				height: 18,
				lineHeight: "18px"
			},
			children: ["×", count]
		}) : null]
	});
}
function CardSlot({ kind, value, lang }) {
	const filled = Boolean(value);
	const border = kind === "customer" ? "#D4A05C" : "#48A8E2";
	const label = kind === "customer" ? lang === "es" ? "Cliente" : "Customer" : lang === "es" ? "Casa" : "House";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex h-9 max-w-[9rem] min-w-0 items-center justify-center overflow-hidden rounded-lg px-2 text-[10px] font-semibold",
		style: {
			border: `1.5px solid ${border}`,
			background: filled ? `${border}22` : "transparent",
			color: filled ? "#fff" : border,
			opacity: filled ? 1 : .4
		},
		title: `${label}: ${value || (lang === "es" ? "vacío" : "empty")}`,
		children: filled ? (() => {
			const b = bilingual(resolveName(value), lang);
			return b.secondary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: b.primary
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-[8px] opacity-60",
					children: b.secondary
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: b.primary
			});
		})() : label
	});
}
function TokenSlots({ house, customer, extraSlot, plusOnes, plays, lang }) {
	const confirmed = plays.filter((play) => (play.status ?? "confirmed") === "confirmed");
	const pending = plays.filter((play) => play.status === "pending");
	const { filled, outstanding, totalFilled, totalNeed } = filledSlots({
		house,
		customer,
		extra_slot: extraSlot,
		plus_ones: plusOnes
	}, confirmed);
	const pendingByDept = {};
	for (const play of pending) pendingByDept[play.dept] = (pendingByDept[play.dept] ?? 0) + 1;
	const waiting = Object.entries(outstanding).map(([dept, n]) => `${LABEL[dept]?.[lang] ?? dept} +1${n > 1 ? ` ×${n}` : ""}`).join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardSlot, {
					kind: "customer",
					value: customer,
					lang
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardSlot, {
					kind: "house",
					value: house,
					lang
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-1 overflow-hidden",
				children: ORDER.map((dept, idx) => {
					const have = Math.max(0, filled[dept] ?? 0);
					const pend = pendingByDept[dept] ?? 0;
					const plus = outstanding[dept] ?? 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenImg, {
								dept,
								state: have >= 1 ? "filled" : pend >= 1 ? "pending" : "empty"
							}),
							plus > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlusOne, { count: plus }) : null,
							idx < ORDER.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-cream/40",
								children: "→"
							}) : null
						]
					}, dept);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-gold",
				children: [
					totalFilled,
					" ",
					lang === "es" ? "de" : "of",
					" ",
					totalNeed
				]
			}),
			waiting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-[#F5C518]",
				children: [
					lang === "es" ? "Esperando" : "Waiting on",
					": ",
					waiting
				]
			}) : null
		]
	});
}
//#endregion
export { TokenSlots as t };
