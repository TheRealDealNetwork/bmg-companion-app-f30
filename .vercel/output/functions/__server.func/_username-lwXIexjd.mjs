import { o as __toESM } from "./_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { o as pct } from "./_ssr/format-DkJBbT9C.mjs";
import { M as publicProfile, r as Card, t as BrandBar } from "./_ssr/ui-TaOKJTPB.mjs";
import { d as Route$20 } from "./_ssr/router-BUNHsq7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_username-lwXIexjd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PublicPage() {
	const { username } = Route$20.useParams();
	const [card, setCard] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		publicProfile({ data: { username } }).then(setCard);
	}, [username]);
	const shown = card && card.ok ? card.card : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-navy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-xl px-4 py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				!card ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-cream",
					children: "Opening…"
				}) : null,
				card && !card.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-cream",
					children: card.error
				}) : null,
				shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [shown.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: shown.avatar,
							alt: "",
							className: "size-16 rounded-full object-cover"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-3xl text-cream",
							children: [
								shown.first,
								" ",
								shown.last
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: [shown.city, shown.state].filter(Boolean).join(", ")
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-ink",
						children: [shown.background.firstTime ? "First time with the game. " : "Has played before. ", shown.background.trades === "working" ? `Works as ${shown.background.title} at ${shown.background.company}.` : shown.background.trades === "familiar" ? "Familiar with the trades." : "New to the trades."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-wrap gap-2",
						children: shown.career.badges.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-full border border-gold px-3 py-1 text-xs font-semibold text-gold",
							children: badge.title
						}, badge.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-cream",
						children: [
							shown.career.games,
							" games · ",
							shown.career.wins,
							" wins · ",
							pct(shown.career.rate),
							" best answers"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1 text-sm",
						children: shown.career.roles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between text-cream",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: role.role }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [role.games, " games"]
							})]
						}, role.role))
					})
				] }) : null
			] })
		})]
	});
}
//#endregion
export { PublicPage as component };
