import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { readLastSeat, type MetalSeat } from "@/lib/metalcon/session";

export const Route = createFileRoute("/soebld/join/")({
  ssr: false,
  component: JoinIndex,
});

function JoinIndex() {
  // f30: never strand a signed-in player (or the GM) here; offer the saved seat first.
  const [last, setLast] = useState<MetalSeat | null>(null);
  useEffect(() => setLast(readLastSeat()), []);
  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <p className="text-xs font-bold tracking-widest text-gold uppercase">SOEBLD</p>
      {last ? (
        <Link to="/soebld/play" search={{ seat: last.id }} className="mt-4 block rounded-xl bg-gold py-3 text-center text-base font-semibold text-navy">
          Back to your seat ({last.dept === "General Manager" ? "GM" : last.dept}) · Volver a tu asiento
        </Link>
      ) : null}
      <h1 className="mt-4 font-display text-3xl text-cream">Use your game link</h1>
      <p className="mt-2 text-sm text-muted">Each game has its own link and QR code. Ask the host for the one on your table.</p>
      <p className="mt-1 text-sm text-muted">Cada juego tiene su propio enlace y código QR. Pídele al anfitrión el de tu mesa.</p>
    </main>
  );
}
