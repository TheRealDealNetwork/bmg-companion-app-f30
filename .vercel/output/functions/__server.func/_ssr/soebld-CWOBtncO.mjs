import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as readSeat } from "./router-BUNHsq7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/soebld-CWOBtncO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MetalHome() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const saved = readSeat();
		if (saved && saved.dept !== "General Manager") navigate({
			to: "/soebld/play",
			search: { seat: saved.id }
		});
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-widest text-gold uppercase",
				children: "SOEBLD"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: "SOE Business Leadership Scenario Cards"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Each game has its own link. The host at your table has the QR code. A saved link from another game will not open these cards."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/soebld/admin",
				className: "mt-6 block text-center text-xs font-semibold tracking-wide text-muted uppercase",
				children: "Host"
			})
		]
	});
}
//#endregion
export { MetalHome as component };
