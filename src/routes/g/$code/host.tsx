import { createFileRoute } from "@tanstack/react-router";
import { HostView } from "@/components/game/host-view";

export const Route = createFileRoute("/g/$code/host")({
  ssr: false,
  component: HostPage,
});

function HostPage() {
  const { code } = Route.useParams();
  return <HostView code={code.toUpperCase()} />;
}
