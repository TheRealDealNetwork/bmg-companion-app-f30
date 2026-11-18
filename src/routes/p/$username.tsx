import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { publicProfile } from "@/lib/game/api";
import { pct } from "@/lib/game/format";
import { BrandBar, Card } from "@/components/game/ui";

export const Route = createFileRoute("/p/$username")({
  ssr: false,
  component: PublicPage,
});

function PublicPage() {
  const { username } = Route.useParams();
  const [card, setCard] = useState<Awaited<ReturnType<typeof publicProfile>> | null>(null);

  useEffect(() => {
    void publicProfile({ data: { username } }).then(setCard);
  }, [username]);

  const shown = card && card.ok ? card.card : null;
  return (
    <div className="min-h-screen bg-navy">
      <BrandBar />
      <main className="mx-auto max-w-xl px-4 py-6">
        <Card>
          {!card ? <p className="text-cream">Opening…</p> : null}
          {card && !card.ok ? <p className="text-cream">{card.error}</p> : null}
          {shown ? (
            <>
              <div className="flex items-center gap-3">
                {shown.avatar ? <img src={shown.avatar} alt="" className="size-16 rounded-full object-cover" /> : null}
                <div>
                  <h1 className="font-display text-3xl text-cream">{shown.first} {shown.last}</h1>
                  <p className="text-sm text-muted">{[shown.city, shown.state].filter(Boolean).join(", ")}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink">
                {shown.background.firstTime ? "First time with the game. " : "Has played before. "}
                {shown.background.trades === "working" ? `Works as ${shown.background.title} at ${shown.background.company}.` : shown.background.trades === "familiar" ? "Familiar with the trades." : "New to the trades."}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {shown.career.badges.map((badge) => (
                  <li key={badge.id} className="rounded-full border border-gold px-3 py-1 text-xs font-semibold text-gold">{badge.title}</li>
                ))}
              </ul>
              <p className="mt-4 text-cream">{shown.career.games} games · {shown.career.wins} wins · {pct(shown.career.rate)} best answers</p>
              <ul className="mt-3 space-y-1 text-sm">
                {shown.career.roles.map((role) => (
                  <li key={role.role} className="flex justify-between text-cream">
                    <span>{role.role}</span>
                    <span className="text-muted">{role.games} games</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </Card>
      </main>
    </div>
  );
}
