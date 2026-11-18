/** Hosts whose links the Grok app claims, or that a player's phone cannot open. */
export function isAppOnlyHost(hostname: string): boolean {
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
export function withBrowserFlag(href: string): string {
  const url = new URL(href);
  url.searchParams.set("mwbv", "true");
  return url.toString();
}

/** Personal seat link. `mwbv=true` keeps the tap in Safari or Chrome. */
export function withSeat(joinUrl: string, invite: string): string {
  const url = new URL(joinUrl);
  url.searchParams.set("mwbv", "true");
  url.searchParams.set("seat", invite);
  return url.toString();
}

/** Opens the device Messages app with the number and body filled in. */
export function smsHref(e164: string, body: string): string {
  const to = e164.startsWith("+") ? e164 : `+${e164.replace(/\D/g, "")}`;
  return `sms:${to}?&body=${encodeURIComponent(body)}`;
}

/** Leave an in-app webview for the real phone browser. */
export function systemBrowserHref(href: string, userAgent: string): string {
  const url = new URL(withBrowserFlag(href));
  if (/iPhone|iPad|iPod/i.test(userAgent)) return `x-safari-${url.toString()}`;
  const path = `${url.host}${url.pathname}${url.search}`;
  return `intent://${path}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(url.toString())};end`;
}

export function inAppBrowser(userAgent: string): boolean {
  return /GrokApp|\bGrok\/|Instagram|FBAN|FBAV|FB_IAB|Line\//i.test(userAgent);
}
