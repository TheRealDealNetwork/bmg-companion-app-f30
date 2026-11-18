import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as money } from "./format-DkJBbT9C.mjs";
import { r as Card } from "./ui-TaOKJTPB.mjs";
import { N as insightsFor, f as readSeat } from "./router-BUNHsq7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/insights-DWpy5qSX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Insights() {
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const seat = readSeat();
		if (!seat) return;
		insightsFor({ data: {
			id: seat.id,
			secret: seat.secret
		} }).then((res) => {
			if (res.ok) setData(res);
		});
	}, []);
	if (!data?.numbers) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto max-w-lg px-4 py-6 text-cream",
		children: "Sign in to see insights."
	});
	const numbers = data.numbers;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl text-cream",
				children: data.role === "gm" ? "GM insights" : "Your insights"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-cream",
						children: "Net margin by round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarginChart, { points: data.marginByRound }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Gold line is margin. 30% win, 50% Market Leader."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-cream",
					children: "Payroll by department"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarChart, { rows: numbers.departments.map((row) => ({
					label: row.dept,
					value: Math.abs(row.cents)
				})) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-cream",
					children: "Revenue by project"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarChart, { rows: data.projects.map((project) => ({
					label: `P${project.n}${project.status === "complete" ? "" : " potential"}`,
					value: project.status === "complete" ? project.revenueCents : project.potentialCents
				})) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-cream",
						children: "Player qualities"
					}),
					data.qualities.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-cream",
						children: [
							row.dept,
							": ",
							row.accuracy,
							"% accurate · ",
							row.avgSeconds,
							"s between answers · ",
							row.note
						]
					}, row.dept)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "Accuracy is right answers over answers in this view. A player sees their own. The GM sees the game."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-cream",
					children: "Company"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-cream",
					children: [
						"Revenue ",
						money(numbers.revenueCents),
						" · Payroll ",
						money(numbers.payrollCents),
						" · Profit ",
						money(numbers.profitCents)
					]
				})]
			})
		]
	});
}
function MarginChart({ points }) {
	const width = 320;
	const height = 120;
	const rows = points.length ? points : [{
		round: 1,
		margin: 0
	}];
	const step = width / Math.max(1, rows.length - 1);
	const y = (value) => height - value / 100 * height;
	const line = rows.map((row, i) => `${i * step},${y(row.margin)}`).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${width} ${height}`,
		className: "mt-2 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "0",
				x2: width,
				y1: y(30),
				y2: y(30),
				stroke: "#d4a05c",
				strokeDasharray: "4 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "0",
				x2: width,
				y1: y(50),
				y2: y(50),
				stroke: "#59ABA9",
				strokeDasharray: "4 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
				fill: "none",
				stroke: "#d4a05c",
				strokeWidth: "3",
				points: line
			})
		]
	});
}
function BarChart({ rows }) {
	const max = Math.max(1, ...rows.map((row) => row.value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 space-y-2",
		children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between text-xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(row.value) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-2 rounded-full bg-navy-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-gold",
				style: { width: `${row.value / max * 100}%` }
			})
		})] }, row.label))
	});
}
//#endregion
export { Insights as component };
