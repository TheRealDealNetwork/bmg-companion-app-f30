import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/company-banner-B92gQ5jp.js
var import_jsx_runtime = require_jsx_runtime();
/** Company name locked by the vote. Event name stays English. */
function CompanyBanner({ name, lang }) {
	const event = "The Business Machine Experience";
	const label = name ? `${lang === "es" ? "Empresa" : "Company"} · ${event}` : event;
	const text = name ? `${lang === "es" ? "Nuestra empresa" : "Our company"}: ${name}` : event;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-3 rounded-xl px-3 py-2 text-center text-sm font-bold tracking-wide text-cream",
		style: {
			background: "#1B2A4A",
			fontFamily: "Montserrat, sans-serif"
		},
		"aria-label": label,
		children: text
	});
}
//#endregion
export { CompanyBanner as t };
