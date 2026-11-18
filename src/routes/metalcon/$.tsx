import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/metalcon/$")({
  beforeLoad: ({ params, location }) => {
    const rest = String(params._splat ?? "").replace(/^\/+|\/+$/g, "");
    const search = location.searchStr || "";
    throw redirect({ href: rest ? `/soebld/${rest}${search}` : `/soebld${search}`, replace: true });
  },
});
