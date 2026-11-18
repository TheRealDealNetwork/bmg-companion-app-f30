export type MetalSeat = { id: string; secret: string; name: string; dept: string };

const KEY = "soe-metalcon-2026";

export function readSeat(id?: string): MetalSeat | null {
  if (typeof window === "undefined") return null;
  try {
    if (id) {
      const raw = localStorage.getItem(`${KEY}:${id}`);
      if (!raw) return null;
      const seat = JSON.parse(raw) as MetalSeat;
      if (seat.id && seat.secret && seat.dept) return seat;
      return null;
    }
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const seat = JSON.parse(raw) as MetalSeat;
    if (!seat.id || !seat.secret || !seat.dept) return null;
    if (seat.dept === "General Manager") return null;
    return seat;
  } catch {
    return null;
  }
}

/** Any saved seat on this device, including the GM's (f30). Used by the secondary pages so the GM is never bounced to the join page. */
export function readLastSeat(): MetalSeat | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const seat = JSON.parse(raw) as MetalSeat;
    return seat.id && seat.secret && seat.dept ? seat : null;
  } catch {
    return null;
  }
}

/** Seat for a secondary page: ?seat= first, then the last saved seat (GM included). */
export function readPageSeat(): MetalSeat | null {
  if (typeof window === "undefined") return null;
  const id = new URLSearchParams(window.location.search).get("seat") || undefined;
  return (id ? readSeat(id) : null) || readLastSeat();
}

export function writeSeat(seat: MetalSeat) {
  localStorage.setItem(KEY, JSON.stringify(seat));
  localStorage.setItem(`${KEY}:${seat.id}`, JSON.stringify(seat));
}
