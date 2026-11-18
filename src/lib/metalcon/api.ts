import { createServerFn } from "@tanstack/react-start";

export const registerSeat = createServerFn({ method: "POST" })
  .validator((input: {
    name?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    jobTitle?: string;
    phone?: string;
    email?: string;
    dept?: string;
    terms?: boolean;
    slug?: string;
  }) => ({
    name: String(input?.name ?? ""),
    firstName: String(input?.firstName ?? ""),
    lastName: String(input?.lastName ?? ""),
    company: String(input?.company ?? ""),
    jobTitle: String(input?.jobTitle ?? ""),
    phone: String(input?.phone ?? ""),
    email: String(input?.email ?? ""),
    dept: String(input?.dept ?? ""),
    terms: Boolean(input?.terms),
    slug: String(input?.slug ?? ""),
  }))
  .handler(async ({ data }) => {
    try {
      const { registerSeat: run } = await import("./server");
      return await run(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save the seat.";
      return { ok: false as const, error: message };
    }
  });

export const nextScenario = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { nextScenario: run } = await import("./server");
    return run(data);
  });

export const findScenario = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; raw?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    raw: String(input?.raw ?? ""),
  }))
  .handler(async ({ data }) => {
    try {
      const { findScenario: run } = await import("./server");
      return await run(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not find that card.";
      return { ok: false as const, error: message };
    }
  });

export const lockScenario = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; code?: string; choice?: string; round?: number }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    code: String(input?.code ?? ""),
    choice: String(input?.choice ?? ""),
    round: Number(input?.round ?? 0),
  }))
  .handler(async ({ data }) => {
    try {
      const { lockScenario: run } = await import("./server");
      return await run(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save that answer.";
      return { ok: false as const, error: message };
    }
  });

export const roundSheet = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; round?: number }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    round: Number(input?.round ?? 0),
  }))
  .handler(async ({ data }) => {
    try {
      const { roundSheet: run } = await import("./server");
      return await run(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not load this round.";
      return { ok: false as const, error: message, rows: [] };
    }
  });

export const adminEnter = createServerFn({ method: "POST" })
  .validator((input: { password?: string; email?: string }) => ({
    password: String(input?.password ?? ""),
    email: String(input?.email ?? ""),
  }))
  .handler(async ({ data }) => {
    const { adminEnter: run } = await import("./admin.server");
    return run(data.password, data.email);
  });

export const resetPassword = createServerFn({ method: "POST" })
  .validator((input: { email?: string }) => ({ email: String(input?.email ?? "") }))
  .handler(async ({ data }) => {
    const { resetPassword: run } = await import("./admin.server");
    return run(data.email);
  });

export const changeAdminPassword = createServerFn({ method: "POST" })
  .validator((input: { token?: string; current?: string; next?: string }) => ({
    token: String(input?.token ?? ""),
    current: String(input?.current ?? ""),
    next: String(input?.next ?? ""),
  }))
  .handler(async ({ data }) => {
    const { changeAdminPassword: run } = await import("./admin.server");
    return run(data.token, data.current, data.next);
  });

export const adminDesk = createServerFn({ method: "POST" })
  .validator((input: { token?: string }) => ({ token: String(input?.token ?? "") }))
  .handler(async ({ data }) => {
    const { adminDesk: run } = await import("./admin.server");
    return run(data.token);
  });

export const createHost = createServerFn({ method: "POST" })
  .validator((input: { token?: string; name?: string; email?: string; password?: string }) => ({
    token: String(input?.token ?? ""),
    name: String(input?.name ?? ""),
    email: String(input?.email ?? ""),
    password: String(input?.password ?? ""),
  }))
  .handler(async ({ data }) => {
    const { createHost: run } = await import("./admin.server");
    return run(data);
  });

export const startGame = createServerFn({ method: "POST" })
  .validator((input: { token?: string; eventName?: string; actionMode?: string }) => ({
    token: String(input?.token ?? ""),
    eventName: String(input?.eventName ?? ""),
    actionMode: String(input?.actionMode ?? "digital"),
  }))
  .handler(async ({ data }) => {
    const { startGame: run } = await import("./admin.server");
    return run(data.token, data.eventName, data.actionMode);
  });

export const endGame = createServerFn({ method: "POST" })
  .validator((input: { token?: string; gameId?: string }) => ({
    token: String(input?.token ?? ""),
    gameId: String(input?.gameId ?? ""),
  }))
  .handler(async ({ data }) => {
    const { endGame: run } = await import("./admin.server");
    return run(data.token, data.gameId);
  });

export const reopenGame = createServerFn({ method: "POST" })
  .validator((input: { token?: string; gameId?: string }) => ({
    token: String(input?.token ?? ""),
    gameId: String(input?.gameId ?? ""),
  }))
  .handler(async ({ data }) => {
    const { reopenGame: run } = await import("./admin.server");
    return run(data.token, data.gameId);
  });

export const resetGame = createServerFn({ method: "POST" })
  .validator((input: { token?: string; gameId?: string }) => ({
    token: String(input?.token ?? ""),
    gameId: String(input?.gameId ?? ""),
  }))
  .handler(async ({ data }) => {
    const { resetGame: run } = await import("./admin.server");
    return run(data.token, data.gameId);
  });

export const setSignup = createServerFn({ method: "POST" })
  .validator((input: { token?: string; gameId?: string; open?: boolean }) => ({
    token: String(input?.token ?? ""),
    gameId: String(input?.gameId ?? ""),
    open: Boolean(input?.open),
  }))
  .handler(async ({ data }) => {
    const { setSignup: run } = await import("./admin.server");
    return run(data.token, data.gameId, data.open);
  });

export const setShareSeat = createServerFn({ method: "POST" })
  .validator((input: { token?: string; gameId?: string; share?: boolean }) => ({
    token: String(input?.token ?? ""),
    gameId: String(input?.gameId ?? ""),
    share: Boolean(input?.share),
  }))
  .handler(async ({ data }) => {
    const { setShareSeat: run } = await import("./admin.server");
    return run(data.token, data.gameId, data.share);
  });

export const placePlayer = createServerFn({ method: "POST" })
  .validator((input: { token?: string; gameId?: string; name?: string; phone?: string; email?: string; dept?: string }) => ({
    token: String(input?.token ?? ""),
    gameId: String(input?.gameId ?? ""),
    name: String(input?.name ?? ""),
    phone: String(input?.phone ?? ""),
    email: String(input?.email ?? ""),
    dept: String(input?.dept ?? ""),
  }))
  .handler(async ({ data }) => {
    const { placePlayer: run } = await import("./admin.server");
    return run(data);
  });

export const sendSeatLink = createServerFn({ method: "POST" })
  .validator((input: { token?: string; playerId?: string; origin?: string }) => ({
    token: String(input?.token ?? ""),
    playerId: String(input?.playerId ?? ""),
    origin: String(input?.origin ?? ""),
  }))
  .handler(async ({ data }) => {
    const { sendSeatLink: run } = await import("./admin.server");
    return run(data);
  });

export const exportGame = createServerFn({ method: "POST" })
  .validator((input: { token?: string; gameId?: string }) => ({
    token: String(input?.token ?? ""),
    gameId: String(input?.gameId ?? ""),
  }))
  .handler(async ({ data }) => {
    const { exportGame: run } = await import("./admin.server");
    return run(data.token, data.gameId);
  });

export const claimSeat = createServerFn({ method: "POST" })
  .validator((input: { id?: string; token?: string; terms?: boolean }) => ({
    id: String(input?.id ?? ""),
    token: String(input?.token ?? ""),
    terms: Boolean(input?.terms),
  }))
  .handler(async ({ data }) => {
    const { claimSeat: run } = await import("./admin.server");
    return run(data);
  });

export const answerLog = createServerFn({ method: "GET" }).handler(async () => {
  const { answerLog: run } = await import("./server");
  return run();
});

export const speakMale = createServerFn({ method: "POST" })
  .validator((input: { text?: string }) => ({ text: String(input?.text ?? "").slice(0, 1800) }))
  .handler(async ({ data }) => {
    const { speakMale: run } = await import("./server");
    return run(data.text);
  });

export const submitHostLead = createServerFn({ method: "POST" })
  .validator((input: {
    company?: string;
    name?: string;
    title?: string;
    phone?: string;
    email?: string;
    city?: string;
    state?: string;
    headcount?: string;
    timing?: string;
    notes?: string;
    contact?: boolean;
  }) => ({
    company: String(input?.company ?? ""),
    name: String(input?.name ?? ""),
    title: String(input?.title ?? ""),
    phone: String(input?.phone ?? ""),
    email: String(input?.email ?? ""),
    city: String(input?.city ?? ""),
    state: String(input?.state ?? ""),
    headcount: String(input?.headcount ?? ""),
    timing: String(input?.timing ?? ""),
    notes: String(input?.notes ?? ""),
    contact: Boolean(input?.contact),
  }))
  .handler(async ({ data }) => {
    try {
      const { submitHostLead: run } = await import("./admin.server");
      return await run(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save that. Try again.";
      return { ok: false as const, error: message };
    }
  });

export const exportHostLeads = createServerFn({ method: "POST" })
  .validator((input: { token?: string }) => ({ token: String(input?.token ?? "") }))
  .handler(async ({ data }) => {
    const { exportHostLeads: run } = await import("./admin.server");
    return run(data.token);
  });

export const companyBoard = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string }) => ({ id: String(input?.id ?? ""), secret: String(input?.secret ?? "") }))
  .handler(async ({ data }) => {
    const { companyBoard: run } = await import("./server");
    return run(data);
  });

export const suggestCompany = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; name?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    name: String(input?.name ?? ""),
  }))
  .handler(async ({ data }) => {
    const { suggestCompany: run } = await import("./server");
    return run(data);
  });

export const voteCompany = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; choiceId?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    choiceId: String(input?.choiceId ?? ""),
  }))
  .handler(async ({ data }) => {
    const { voteCompany: run } = await import("./server");
    return run(data);
  });

export const breakTie = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; choiceId?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    choiceId: String(input?.choiceId ?? ""),
  }))
  .handler(async ({ data }) => {
    const { breakTie: run } = await import("./server");
    return run(data);
  });

export const restartVote = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { restartVote: run } = await import("./server");
    return run(data);
  });

export const setCompanyName = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; name?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    name: String(input?.name ?? ""),
  }))
  .handler(async ({ data }) => {
    const { setCompanyName: run } = await import("./server");
    return run(data);
  });

export const setMeeting = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; on?: boolean; round?: number }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    on: Boolean(input?.on),
    round: Number(input?.round ?? 1),
  }))
  .handler(async ({ data }) => {
    const { setMeeting: run } = await import("./server");
    return run(data);
  });

export const setProjectSlot = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; n?: number; house?: string; customer?: string; status?: string; extraSlot?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    n: Number(input?.n ?? 0),
    house: String(input?.house ?? ""),
    customer: String(input?.customer ?? ""),
    status: String(input?.status ?? ""),
    extraSlot: String(input?.extraSlot ?? ""),
  }))
  .handler(async ({ data }) => {
    const { setProjectSlot: run } = await import("./server");
    return run(data);
  });

export const openProject = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; house?: string; customer?: string; value?: number }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    house: String(input?.house ?? ""),
    customer: String(input?.customer ?? ""),
    value: Number(input?.value ?? 0),
  }))
  .handler(async ({ data }) => {
    const { openProject: run } = await import("./server");
    return run(data);
  });

export const playAction = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; projectId?: string; otherProjectId?: string; cardName?: string; round?: number }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    projectId: String(input?.projectId ?? ""),
    otherProjectId: String(input?.otherProjectId ?? ""),
    cardName: String(input?.cardName ?? ""),
    round: Number(input?.round ?? 1),
  }))
  .handler(async ({ data }) => {
    const { playAction: run } = await import("./server");
    return run(data);
  });

export const finishProject = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; projectId?: string; override?: boolean }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    projectId: String(input?.projectId ?? ""),
    override: Boolean(input?.override),
  }))
  .handler(async ({ data }) => {
    const { finishProject: run } = await import("./server");
    return run(data);
  });

export const setFinishOrder = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string; secret: string; projectId: string; order: number }) => input)
  .handler(async ({ data }) => {
    const { setFinishOrder: run } = await import("./server");
    return run({ id: data.id, secret: data.secret, projectIds: [data.projectId] });
  });

export const endGameFromGm = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { endGameFromGm: run } = await import("./server");
    return run(data);
  });

export const swapAttendee = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; round?: number; dept?: string; playerId?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    round: Number(input?.round ?? 1),
    dept: String(input?.dept ?? ""),
    playerId: String(input?.playerId ?? ""),
  }))
  .handler(async ({ data }) => {
    const { swapAttendee: run } = await import("./server");
    return run(data);
  });

export const setFocus = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; round?: number; dept?: string; projectIds?: string[] }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    round: Number(input?.round ?? 1),
    dept: String(input?.dept ?? ""),
    projectIds: Array.isArray(input?.projectIds) ? input.projectIds.map(String) : [],
  }))
  .handler(async ({ data }) => {
    const { setFocus: run } = await import("./server");
    return run(data);
  });

export const placeCard = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; cardName?: string; projectId?: string; otherProjectId?: string; round?: number }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    cardName: String(input?.cardName ?? ""),
    projectId: String(input?.projectId ?? ""),
    otherProjectId: String(input?.otherProjectId ?? ""),
    round: Number(input?.round ?? 1),
  }))
  .handler(async ({ data }) => {
    const { placeCard: run } = await import("./server");
    return run(data);
  });

export const dealCards = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; round?: number }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    round: Number(input?.round ?? 1),
  }))
  .handler(async ({ data }) => {
    const { dealCards: run } = await import("./server");
    return run(data);
  });


export const confirmPlay = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; playId?: string }) => ({ id: String(input?.id ?? ""), secret: String(input?.secret ?? ""), playId: String(input?.playId ?? "") }))
  .handler(async ({ data }) => { const { confirmPlay: run } = await import("./server"); return run(data); });

export const changePlay = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; playId?: string; projectId?: string }) => ({ id: String(input?.id ?? ""), secret: String(input?.secret ?? ""), playId: String(input?.playId ?? ""), projectId: String(input?.projectId ?? "") }))
  .handler(async ({ data }) => { const { changePlay: run } = await import("./server"); return run(data); });

export const removePlay = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; playId?: string }) => ({ id: String(input?.id ?? ""), secret: String(input?.secret ?? ""), playId: String(input?.playId ?? "") }))
  .handler(async ({ data }) => { const { removePlay: run } = await import("./server"); return run(data); });


export const startTurn = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; dept?: string }) => ({ id: String(input?.id ?? ""), secret: String(input?.secret ?? ""), dept: String(input?.dept ?? "") }))
  .handler(async ({ data }) => { const { startTurn: run } = await import("./server"); return run(data); });

export const callMeeting = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string }) => ({ id: String(input?.id ?? ""), secret: String(input?.secret ?? "") }))
  .handler(async ({ data }) => { const { callMeeting: run } = await import("./server"); return run(data); });

export const ackMeeting = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string }) => ({ id: String(input?.id ?? ""), secret: String(input?.secret ?? "") }))
  .handler(async ({ data }) => { const { ackMeeting: run } = await import("./server"); return run(data); });

export const setActionMode = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; mode?: string }) => ({ id: String(input?.id ?? ""), secret: String(input?.secret ?? ""), mode: String(input?.mode ?? "digital") }))
  .handler(async ({ data }) => { const { setActionMode: run } = await import("./server"); return run(data); });

export const recordManualCards = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; cards?: string[]; round?: number }) => ({ id: String(input?.id ?? ""), secret: String(input?.secret ?? ""), cards: Array.isArray(input?.cards) ? input.cards.map(String) : [], round: Number(input?.round ?? 1) }))
  .handler(async ({ data }) => { const { recordManualCards: run } = await import("./server"); return run(data); });

export const undoAction = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; playId?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    playId: String(input?.playId ?? ""),
  }))
  .handler(async ({ data }) => {
    const { undoAction: run } = await import("./server");
    return run(data);
  });

export const playEvent = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; eventName?: string; projectId?: string; round?: number }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    eventName: String(input?.eventName ?? ""),
    projectId: String(input?.projectId ?? ""),
    round: Number(input?.round ?? 1),
  }))
  .handler(async ({ data }) => {
    const { playEvent: run } = await import("./server");
    return run(data);
  });

export const submitPicks = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; picks?: string[] }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
    picks: Array.isArray(input?.picks) ? input.picks.map(String) : [],
  }))
  .handler(async ({ data }) => {
    const { submitPicks: run } = await import("./server");
    return run(data);
  });

export const insightsFor = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { insightsFor: run } = await import("./server");
    return run(data);
  });

export const setBasePayroll = createServerFn({ method: "POST" })
  .validator((input: { token?: string; gameId?: string; amount?: number }) => ({
    token: String(input?.token ?? ""),
    gameId: String(input?.gameId ?? ""),
    amount: Number(input?.amount ?? 3200),
  }))
  .handler(async ({ data }) => {
    const { setBasePayroll: run } = await import("./admin.server");
    return run(data);
  });

export const setFixedCost = createServerFn({ method: "POST" })
  .validator((input: { token?: string; gameId?: string; amount?: number; startRound?: number }) => ({
    token: String(input?.token ?? ""),
    gameId: String(input?.gameId ?? ""),
    amount: Number(input?.amount ?? 2000),
    startRound: Number(input?.startRound ?? 3),
  }))
  .handler(async ({ data }) => {
    const { setFixedCost: run } = await import("./admin.server");
    return run(data);
  });

export const setPlusOne = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; secret: string; projectId: string; dept: string; delta: number }) => data)
  .handler(async ({ data }) => { const { setPlusOne: run } = await import("./server"); return run(data); });


/** Public: join page uses this to hide the form for ended games. */
export const gameJoinStatus = createServerFn({ method: "GET" })
  .validator((input: { slug?: string }) => ({ slug: String(input?.slug ?? "") }))
  .handler(async ({ data }) => {
    const { getMetalconSql } = await import("./db.server");
    const sql = await getMetalconSql();
    const rows = await sql<{ id: string; status: string; event_name: string | null; n: number }>`
      select id, status, event_name, n from metalcon.games where slug = ${data.slug} limit 1
    `;
    const game = rows[0];
    if (!game) { console.log("JOIN CLOSED: missing slug", data.slug); return { ok: false as const, closed: true as const, reason: "missing" as const }; }
    if (game.status !== "live") { console.log("JOIN CLOSED: ended", data.slug, game.status); return { ok: false as const, closed: true as const, reason: "ended" as const, status: game.status, n: game.n }; }
    const gm = await sql<{ c: number }>`select count(*)::int as c from metalcon.players where game_id = ${game.id} and dept = 'General Manager'`;
    return { ok: true as const, closed: false as const, status: game.status, eventName: game.event_name, n: game.n, hasGm: Number(gm[0]?.c ?? 0) > 0 };
  });

/** Public: play page uses this so an ended game shows no cards. */
export const seatOpen = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string }) => ({
    id: String(input?.id ?? ""),
    secret: String(input?.secret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { getMetalconSql } = await import("./db.server");
    const sql = await getMetalconSql();
    const rows = await sql<{ status: string }>`
      select g.status from metalcon.players p
      join metalcon.games g on g.id = p.game_id
      where p.id = ${data.id} limit 1
    `;
    const status = rows[0]?.status;
    if (status !== "live") return { ok: false as const, closed: true as const };
    return { ok: true as const, closed: false as const };
  });

export const placeToken = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string; projectId?: string }) => ({ id: String(input?.id ?? ""), secret: String(input?.secret ?? ""), projectId: String(input?.projectId ?? "") }))
  .handler(async ({ data }) => { const { placeToken: run } = await import("./server"); return run(data); });

export const finishTurn = createServerFn({ method: "POST" })
  .validator((input: { id?: string; secret?: string }) => ({ id: String(input?.id ?? ""), secret: String(input?.secret ?? "") }))
  .handler(async ({ data }) => { const { finishTurn: run } = await import("./server"); return run(data); });
