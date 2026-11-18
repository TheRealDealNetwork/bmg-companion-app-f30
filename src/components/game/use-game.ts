import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { hostAct, playerAct, readGame } from "@/lib/game/api";
import { readSlot, writeSlot, type Slot } from "@/lib/game/session";
import type { Answer, GameView } from "@/lib/game/types";

export function useSlot(code: string): Slot {
  const [slot, setSlot] = useState<Slot>(() => readSlot(code));
  useEffect(() => {
    const load = () => setSlot(readSlot(code));
    load();
    window.addEventListener("bm-session", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("bm-session", load);
      window.removeEventListener("storage", load);
    };
  }, [code]);
  return slot;
}

export function useGame(code: string, mode: "host" | "player" | "room") {
  const slot = useSlot(code);
  const qc = useQueryClient();
  const enabled = mode === "room" || (mode === "host" ? Boolean(slot.hostToken) : Boolean(slot.playerId));
  const query = useQuery({
    queryKey: ["game", code, mode, slot.hostToken ?? "", slot.playerId ?? ""],
    enabled,
    refetchInterval: 1500,
    queryFn: () =>
      readGame({
        data: {
          code,
          hostToken: mode === "host" ? slot.hostToken : undefined,
          playerId: mode === "player" ? slot.playerId : undefined,
          playerToken: mode === "player" ? slot.playerToken : undefined,
        },
      }),
  });
  const view = query.data && query.data.ok ? query.data.view : null;
  const error = query.data && !query.data.ok ? query.data.error : null;

  function take<T extends { ok: boolean; view?: GameView }>(next: T): T {
    if (next.ok && next.view) {
      qc.setQueryData(["game", code, mode, slot.hostToken ?? "", slot.playerId ?? ""], next);
    }
    return next;
  }

  return {
    slot,
    view,
    error,
    loading: query.isLoading,
    enabled,
    saveHost(token: string) {
      writeSlot(code, { hostToken: token });
    },
    async host(type: string, payload?: Record<string, unknown>) {
      if (!slot.hostToken) return { ok: false as const, error: "Host key missing on this device." };
      const res = await hostAct({ data: { code, hostToken: slot.hostToken, type, payload } });
      return take(res);
    },
    async player(type: string, payload?: Record<string, unknown>) {
      if (!slot.playerId || !slot.playerToken) {
        return { ok: false as const, error: "Join this game on this phone first." };
      }
      const res = await playerAct({
        data: { code, playerId: slot.playerId, playerToken: slot.playerToken, type, payload },
      });
      return take(res);
    },
  };
}

export type Reveal = Answer;

export function useServerNow(serverStamp: number) {
  const skew = useRef(0);
  const seen = useRef<number | null>(null);
  if (seen.current !== serverStamp) {
    seen.current = serverStamp;
    skew.current = serverStamp - Date.now();
  }
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now + skew.current;
}
