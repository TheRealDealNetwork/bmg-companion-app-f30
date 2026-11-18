//#region node_modules/.nitro/vite/services/ssr/assets/join-url-C7nhPgzU.js
/** Hosts whose links the Grok app claims, or that a player's phone cannot open. */
function isAppOnlyHost(hostname) {
	const host = hostname.split(":")[0]?.toLowerCase() ?? "";
	if (!host) return true;
	if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
	if (host === "grok.com" || host.endsWith(".grok.com")) return true;
	if (host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com")) return true;
	return false;
}
/**
* `mwbv=true` is excluded from the Grok app's universal links, so a camera
* scan stays in Safari or Chrome instead of the App Store.
*/
function withBrowserFlag(href) {
	const url = new URL(href);
	url.searchParams.set("mwbv", "true");
	return url.toString();
}
/** Personal seat link. `mwbv=true` keeps the tap in Safari or Chrome. */
function withSeat(joinUrl, invite) {
	const url = new URL(joinUrl);
	url.searchParams.set("mwbv", "true");
	url.searchParams.set("seat", invite);
	return url.toString();
}
/** Opens the device Messages app with the number and body filled in. */
function smsHref(e164, body) {
	return `sms:${e164.startsWith("+") ? e164 : `+${e164.replace(/\D/g, "")}`}?&body=${encodeURIComponent(body)}`;
}
/** Leave an in-app webview for the real phone browser. */
function systemBrowserHref(href, userAgent) {
	const url = new URL(withBrowserFlag(href));
	if (/iPhone|iPad|iPod/i.test(userAgent)) return `x-safari-${url.toString()}`;
	return `intent://${`${url.host}${url.pathname}${url.search}`}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(url.toString())};end`;
}
function inAppBrowser(userAgent) {
	return /GrokApp|\bGrok\/|Instagram|FBAN|FBAV|FB_IAB|Line\//i.test(userAgent);
}
//#endregion
export { withBrowserFlag as a, systemBrowserHref as i, isAppOnlyHost as n, withSeat as o, smsHref as r, inAppBrowser as t };
