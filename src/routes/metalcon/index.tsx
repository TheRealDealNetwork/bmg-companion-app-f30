import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/metalcon/")({
  beforeLoad: () => {
    throw redirect({ href: "/soebld" });
  },
});
