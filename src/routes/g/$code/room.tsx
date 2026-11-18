import { createFileRoute } from "@tanstack/react-router";
import { RoomView } from "@/components/game/room-view";

export const Route = createFileRoute("/g/$code/room")({
  ssr: false,
  component: RoomPage,
});

function RoomPage() {
  const { code } = Route.useParams();
  return <RoomView code={code.toUpperCase()} />;
}
