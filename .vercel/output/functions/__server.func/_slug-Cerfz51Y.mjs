import { i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { l as JoinForm, n as Route } from "./_ssr/router-BUNHsq7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Cerfz51Y.js
var import_jsx_runtime = require_jsx_runtime();
function SlugJoin() {
	const { slug } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JoinForm, { slug });
}
//#endregion
export { SlugJoin as component };
