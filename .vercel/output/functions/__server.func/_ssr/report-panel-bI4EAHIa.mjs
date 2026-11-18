import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as money, o as pct } from "./format-DkJBbT9C.mjs";
import { n as badgesFor, t as analyzeGame } from "./economy-D2xlDfFl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-panel-bI4EAHIa.js
var import_jsx_runtime = require_jsx_runtime();
function sourceFromView(view) {
	return {
		code: view.code,
		company: view.company,
		rehearsal: view.rehearsal,
		status: view.status,
		round: view.round,
		settings: view.settings,
		board: view.board,
		players: view.players.map((p) => ({
			id: p.id,
			name: p.name,
			dept: p.dept,
			profileId: p.profileId,
			active: p.active
		})),
		answers: view.answers.map((a) => ({
			playerId: a.playerId,
			playerName: a.playerName,
			dept: a.dept,
			valueCents: a.valueCents,
			principle: a.principle,
			title: a.title,
			round: a.round
		})),
		plays: view.plays.map((p) => ({
			dept: p.dept,
			name: p.name,
			type: p.type,
			text: p.text,
			forced: p.forced,
			exempt: p.exempt,
			round: p.round
		})),
		projects: view.projects.map((p) => ({
			n: p.n,
			status: p.status,
			valueCents: p.valueCents,
			collected: p.collected,
			lateFee: p.lateFee
		})),
		adjustments: view.adjustments.map((a) => ({
			cents: a.cents,
			label: a.label
		}))
	};
}
function ReportPanel({ view, focusId }) {
	const report = analyzeGame(sourceFromView(view));
	const mine = focusId ? report.people.find((p) => p.id === focusId) : null;
	const badges = mine ? badgesFor({
		games: 1,
		wins: report.finished && report.win ? 1 : 0,
		best: mine.best,
		weak: mine.weak,
		roles: 1,
		rate: mine.answered ? mine.best / mine.answered : 0
	}) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 text-sm leading-relaxed",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-widest text-gold uppercase",
					children: report.finished ? "After the game" : "So far"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-cream",
					children: report.company
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-cream",
					children: [
						report.win ? "Win" : report.finished ? "Short of a win" : "In progress",
						report.marketLeader ? " · Market leader" : "",
						" · Valuation ",
						money(report.valuation),
						" · Margin ",
						pct(report.margin)
					]
				})
			] }),
			badges.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-wrap gap-2",
				children: badges.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-full border border-gold px-3 py-1 text-xs font-semibold text-gold",
					title: badge.detail,
					children: badge.title
				}, badge.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: mine ? "Your decisions" : "What carried it",
				lines: mine ? mine.notes : report.wins
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: report.win ? "Why it won" : "What got in the way",
				lines: report.causes
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "What to learn",
				lines: report.lessons
			}),
			!focusId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-wide text-muted uppercase",
				children: "People"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-2",
				children: report.people.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-navy-2 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-semibold text-cream",
						children: [
							person.name,
							" · ",
							person.dept
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: [
							person.best,
							" best · ",
							person.partial,
							" partial · ",
							person.weak,
							" weak"
						]
					})]
				}, person.id))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, { report })
		]
	});
}
function Block({ title, lines }) {
	if (!lines.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-bold tracking-wide text-muted uppercase",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-1 list-disc space-y-1 pl-5 text-ink",
		children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
	})] });
}
function Bars({ report }) {
	const max = Math.max(1, ...report.depts.map((d) => d.best + d.weak + d.partial));
	if (!report.depts.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-bold tracking-wide text-muted uppercase",
		children: "Judgment by department"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2 space-y-2",
		children: report.depts.map((dept) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between text-xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dept.dept }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				dept.best,
				" best · ",
				dept.weak,
				" weak"
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-1 flex h-2 overflow-hidden rounded-full bg-navy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-gold",
					style: { width: `${dept.best / max * 100}%` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-stage-sale",
					style: { width: `${dept.partial / max * 100}%` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-stage-star",
					style: { width: `${dept.weak / max * 100}%` }
				})
			]
		})] }, dept.dept))
	})] });
}
//#endregion
export { ReportPanel as t };
