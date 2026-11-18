import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { readSeat, readLastSeat, type MetalSeat } from "@/lib/metalcon/session";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/soebld/")({
  ssr: false,
  component: MetalHome,
});

function MetalHome() {
  const navigate = useNavigate();
  const [last, setLast] = useState<MetalSeat | null>(null);
  useEffect(() => {
    setLast(readLastSeat());
        const saved = readSeat();
    if (saved && saved.dept !== "General Manager") void navigate({ to: "/soebld/play", search: { seat: saved.id } });
  }, [navigate]);
  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <p className="text-xs font-bold tracking-widest text-gold uppercase">SOEBLD</p>
      <h1 className="mt-2 font-display text-3xl text-cream">SOE Business Leadership Scenario Cards</h1>
      <p className="mt-2 text-sm text-muted">
        Each game has its own link. The host at your table has the QR code. A saved link from another game will not open these cards.
      </p>
      {last ? (
        <Link to="/soebld/play" search={{ seat: last.id }} className="mt-6 block rounded-xl bg-gold py-3 text-center text-base font-semibold text-navy">
          Back to your seat ({last.dept === "General Manager" ? "GM" : last.dept}) · Volver a tu asiento
        </Link>
      ) : null}
      <Link to="/soebld/admin" className="mt-6 block text-center text-xs font-semibold tracking-wide text-muted uppercase">
        Host
      </Link>
    </main>
  );
}
