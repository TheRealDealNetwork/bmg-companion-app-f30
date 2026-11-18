import { createFileRoute } from "@tanstack/react-router";
import { PlayView } from "@/components/game/play-view";

export const Route = createFileRoute("/g/$code/play")({
  ssr: false,
  component: PlayPage,
});

function PlayPage() {
  const { code } = Route.useParams();
  return <PlayView code={code.toUpperCase()} />;
}
