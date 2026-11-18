import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BrandBar, Door } from "@/components/game/ui";
import { readSlot } from "@/lib/game/session";

export const Route = createFileRoute("/g/$code/")({
  ssr: false,
  component: Gate,
});

function Gate() {
  const { code } = Route.useParams();
  const game = code.toUpperCase();
  const navigate = useNavigate();
  useEffect(() => {
    const saved = readSlot(game);
    if (saved.playerId && saved.playerToken) {
      void navigate({ to: "/g/$code/play", params: { code: game } });
    }
  }, [game, navigate]);
  return (
    <div className="min-h-screen bg-navy">
      <BrandBar />
      <main className="mx-auto grid max-w-3xl gap-3 px-4 py-8">
        <h1 className="font-display text-4xl text-cream">Game {game}</h1>
        <Door href={`/g/${game}/join`} title="Player" body="Join with your name and department." />
        <Door href={`/g/${game}/host`} title="Host" body="Clocks, roster, cards, and the company score." />
        <Door href={`/g/${game}/room`} title="Room display" body="Read-only board for the projector." />
      </main>
    </div>
  );
}
