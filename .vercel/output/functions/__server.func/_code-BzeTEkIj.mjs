import { o as __toESM } from "./_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { I as readSlot, s as Door, t as BrandBar } from "./_ssr/ui-TaOKJTPB.mjs";
import { s as Route$6 } from "./_ssr/router-BUNHsq7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-BzeTEkIj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Gate() {
	const { code } = Route$6.useParams();
	const game = code.toUpperCase();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const saved = readSlot(game);
		if (saved.playerId && saved.playerToken) navigate({
			to: "/g/$code/play",
			params: { code: game }
		});
	}, [game, navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-navy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto grid max-w-3xl gap-3 px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-4xl text-cream",
					children: ["Game ", game]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {
					href: `/g/${game}/join`,
					title: "Player",
					body: "Join with your name and department."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {
					href: `/g/${game}/host`,
					title: "Host",
					body: "Clocks, roster, cards, and the company score."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {
					href: `/g/${game}/room`,
					title: "Room display",
					body: "Read-only board for the projector."
				})
			]
		})]
	});
}
//#endregion
export { Gate as component };
