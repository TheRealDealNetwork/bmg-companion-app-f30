import { createStart, createCsrfMiddleware } from "@tanstack/react-start";

const csrfMiddleware = createCsrfMiddleware({
  // Preview proxy / sandbox: Origin may be the proxy host or parent frame.
  origin: (origin) => {
    try {
      const host = new URL(origin).hostname;
      if (host === "grok.com" || host.endsWith(".grok.com")) return true;
      if (host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com")) return true;
      if (host === "localhost" || host === "127.0.0.1") return true;
      // Preview host patterns
      if (host.includes("grok-sandbox") || host.includes("hades-www")) return true;
    } catch {
      /* ignore */
    }
    return false;
  },
  // Accept any Sec-Fetch-Site in preview so the proxy does not 403.
  secFetchSite: () => true,
  allowRequestsWithoutOriginCheck: true,
  // Always return a content-type so the client does not throw
  // "Invariant failed: expected content-type header to be set".
  failureResponse: new Response(JSON.stringify({ ok: false, error: "Forbidden" }), {
    status: 403,
    headers: { "content-type": "application/json" },
  }),
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
}));
