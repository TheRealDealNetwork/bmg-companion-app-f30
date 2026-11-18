import { n as createMiddleware, t as createCsrfMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-AYOEguNK.js
function dedupeSerializationAdapters(deduped, serializationAdapters) {
	for (let i = 0, len = serializationAdapters.length; i < len; i++) {
		const current = serializationAdapters[i];
		if (!deduped.has(current)) {
			deduped.add(current);
			if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
		}
	}
}
var createStart = (getOptions) => {
	return {
		getOptions: async () => {
			const options = await getOptions();
			if (options.serializationAdapters) {
				const deduped = /* @__PURE__ */ new Set();
				dedupeSerializationAdapters(deduped, options.serializationAdapters);
				options.serializationAdapters = Array.from(deduped);
			}
			return options;
		},
		createMiddleware
	};
};
var csrfMiddleware = createCsrfMiddleware({
	origin: (origin) => {
		try {
			const host = new URL(origin).hostname;
			if (host === "grok.com" || host.endsWith(".grok.com")) return true;
			if (host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com")) return true;
			if (host === "localhost" || host === "127.0.0.1") return true;
			if (host.includes("grok-sandbox") || host.includes("hades-www")) return true;
		} catch {}
		return false;
	},
	secFetchSite: () => true,
	allowRequestsWithoutOriginCheck: true,
	failureResponse: new Response(JSON.stringify({
		ok: false,
		error: "Forbidden"
	}), {
		status: 403,
		headers: { "content-type": "application/json" }
	})
});
var startInstance = createStart(() => ({ requestMiddleware: [csrfMiddleware] }));
//#endregion
export { startInstance };
