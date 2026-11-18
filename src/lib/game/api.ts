import { createServerFn } from "@tanstack/react-start";

export const createGame = createServerFn({ method: "POST" })
  .validator((input: { company?: string; rehearsal?: boolean; adminToken?: string; profileSecret?: string }) => ({
    company: String(input?.company ?? ""),
    rehearsal: Boolean(input?.rehearsal),
    adminToken: String(input?.adminToken ?? ""),
    profileSecret: String(input?.profileSecret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { createGameRecord } = await import("./actions.server");
    return createGameRecord(data);
  });

export const listGames = createServerFn({ method: "POST" })
  .validator((input: { adminToken?: string; profileSecret?: string }) => ({
    adminToken: String(input?.adminToken ?? ""),
    profileSecret: String(input?.profileSecret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { listGamesRecord } = await import("./actions.server");
    return listGamesRecord(data.adminToken, data.profileSecret);
  });

export const resumeHost = createServerFn({ method: "POST" })
  .validator((input: { code?: string; adminToken?: string; hostToken?: string; profileSecret?: string }) => ({
    code: String(input?.code ?? ""),
    adminToken: String(input?.adminToken ?? ""),
    hostToken: input?.hostToken ? String(input.hostToken) : undefined,
    profileSecret: String(input?.profileSecret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { resumeHostRecord } = await import("./actions.server");
    return resumeHostRecord(data);
  });

export const resetGame = createServerFn({ method: "POST" })
  .validator((input: { code?: string; adminToken?: string; profileSecret?: string }) => ({
    code: String(input?.code ?? ""),
    adminToken: String(input?.adminToken ?? ""),
    profileSecret: String(input?.profileSecret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { resetGameRecord } = await import("./actions.server");
    return resetGameRecord(data);
  });

export const deleteGame = createServerFn({ method: "POST" })
  .validator((input: { code?: string; adminToken?: string; profileSecret?: string }) => ({
    code: String(input?.code ?? ""),
    adminToken: String(input?.adminToken ?? ""),
    profileSecret: String(input?.profileSecret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { deleteGameRecord } = await import("./actions.server");
    return deleteGameRecord(data);
  });

export const addHost = createServerFn({ method: "POST" })
  .validator((input: { code?: string; adminToken?: string; label?: string; profileSecret?: string }) => ({
    code: String(input?.code ?? ""),
    adminToken: String(input?.adminToken ?? ""),
    label: String(input?.label ?? ""),
    profileSecret: String(input?.profileSecret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { addHostRecord } = await import("./actions.server");
    return addHostRecord(data);
  });

export const removeHost = createServerFn({ method: "POST" })
  .validator((input: { code?: string; adminToken?: string; adminId?: string; profileSecret?: string }) => ({
    code: String(input?.code ?? ""),
    adminToken: String(input?.adminToken ?? ""),
    adminId: String(input?.adminId ?? ""),
    profileSecret: String(input?.profileSecret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { removeHostRecord } = await import("./actions.server");
    return removeHostRecord(data);
  });

export const readGame = createServerFn({ method: "POST" })
  .validator(
    (input: { code?: string; hostToken?: string; playerId?: string; playerToken?: string }) => ({
      code: String(input?.code ?? ""),
      hostToken: input?.hostToken ? String(input.hostToken) : undefined,
      playerId: input?.playerId ? String(input.playerId) : undefined,
      playerToken: input?.playerToken ? String(input.playerToken) : undefined,
    }),
  )
  .handler(async ({ data }) => {
    const { readGameRecord } = await import("./actions.server");
    return readGameRecord(data);
  });

export const publicJoinLink = createServerFn({ method: "POST" })
  .validator((input: { code?: string }) => ({ code: String(input?.code ?? "") }))
  .handler(async ({ data }) => {
    const { browserJoinLink } = await import("./actions.server");
    return browserJoinLink(data.code);
  });

export const joinGame = createServerFn({ method: "POST" })
  .validator((input: { code?: string; name?: string; dept?: string; seat?: string; profileSecret?: string }) => ({
    code: String(input?.code ?? ""),
    name: String(input?.name ?? ""),
    dept: String(input?.dept ?? ""),
    seat: String(input?.seat ?? ""),
    profileSecret: String(input?.profileSecret ?? ""),
  }))
  .handler(async ({ data }) => {
    const { joinRecord } = await import("./actions.server");
    return joinRecord(data);
  });

export const previewSeat = createServerFn({ method: "POST" })
  .validator((input: { code?: string; seat?: string }) => ({
    code: String(input?.code ?? ""),
    seat: String(input?.seat ?? ""),
  }))
  .handler(async ({ data }) => {
    const { seatPreviewRecord } = await import("./actions.server");
    return seatPreviewRecord(data);
  });

export const assumeSeat = createServerFn({ method: "POST" })
  .validator((input: { code?: string; hostToken?: string; playerId?: string }) => ({
    code: String(input?.code ?? ""),
    hostToken: String(input?.hostToken ?? ""),
    playerId: String(input?.playerId ?? ""),
  }))
  .handler(async ({ data }) => {
    const { assumeSeatRecord } = await import("./actions.server");
    return assumeSeatRecord(data);
  });

export const hostAct = createServerFn({ method: "POST" })
  .validator(
    (input: { code?: string; hostToken?: string; type?: string; payload?: Record<string, unknown> }) => ({
      code: String(input?.code ?? ""),
      hostToken: String(input?.hostToken ?? ""),
      type: String(input?.type ?? ""),
      payload: input?.payload && typeof input.payload === "object" ? input.payload : {},
    }),
  )
  .handler(async ({ data }) => {
    const { hostRecord } = await import("./actions.server");
    return hostRecord(data);
  });

export const playerAct = createServerFn({ method: "POST" })
  .validator(
    (input: {
      code?: string;
      playerId?: string;
      playerToken?: string;
      type?: string;
      payload?: Record<string, unknown>;
    }) => ({
      code: String(input?.code ?? ""),
      playerId: String(input?.playerId ?? ""),
      playerToken: String(input?.playerToken ?? ""),
      type: String(input?.type ?? ""),
      payload: input?.payload && typeof input.payload === "object" ? input.payload : {},
    }),
  )
  .handler(async ({ data }) => {
    const { playerRecord } = await import("./actions.server");
    return playerRecord(data);
  });

export const lookupCard = createServerFn({ method: "POST" })
  .validator(
    (input: {
      code?: string;
      raw?: string;
      dept?: string;
      hostToken?: string;
      playerId?: string;
      playerToken?: string;
    }) => ({
      code: String(input?.code ?? ""),
      raw: String(input?.raw ?? ""),
      dept: input?.dept ? String(input.dept) : undefined,
      hostToken: input?.hostToken ? String(input.hostToken) : undefined,
      playerId: input?.playerId ? String(input.playerId) : undefined,
      playerToken: input?.playerToken ? String(input.playerToken) : undefined,
    }),
  )
  .handler(async ({ data }) => {
    const { lookupRecord } = await import("./actions.server");
    return lookupRecord(data);
  });

export const hostCatalog = createServerFn({ method: "POST" })
  .validator((input: { code?: string; hostToken?: string }) => ({
    code: String(input?.code ?? ""),
    hostToken: String(input?.hostToken ?? ""),
  }))
  .handler(async ({ data }) => {
    const { catalogRecord } = await import("./actions.server");
    return catalogRecord(data);
  });

export const speak = createServerFn({ method: "POST" })
  .validator((input: { text?: string }) => ({ text: String(input?.text ?? "").slice(0, 1800) }))
  .handler(async ({ data }) => {
    const { speakRecord } = await import("./speech.server");
    return speakRecord(data.text);
  });

export const requestEmailCode = createServerFn({ method: "POST" })
  .validator((input: { email?: string }) => ({
    email: String(input?.email ?? "").trim().toLowerCase().slice(0, 80),
  }))
  .handler(async ({ data }) => {
    const { requestEmailCodeRecord } = await import("./email-auth.server");
    return requestEmailCodeRecord(data.email);
  });

export const confirmEmailCode = createServerFn({ method: "POST" })
  .validator((input: { email?: string; code?: string }) => ({
    email: String(input?.email ?? "").trim().toLowerCase().slice(0, 80),
    code: String(input?.code ?? "").replace(/\D/g, "").slice(0, 6),
  }))
  .handler(async ({ data }) => {
    const { confirmEmailCodeRecord } = await import("./email-auth.server");
    return confirmEmailCodeRecord(data.email, data.code);
  });

export const imagineAvatar = createServerFn({ method: "POST" })
  .validator((input: { prompt?: string }) => ({ prompt: String(input?.prompt ?? "").slice(0, 240) }))
  .handler(async ({ data }) => {
    const { imagineAvatarRecord } = await import("./avatar.server");
    return imagineAvatarRecord(data.prompt);
  });

export const saveProfile = createServerFn({ method: "POST" })
  .validator((input: Record<string, unknown> | undefined) => input ?? {})
  .handler(async ({ data }) => {
    const { saveProfileRecord } = await import("./people.server");
    return saveProfileRecord(data as Parameters<typeof saveProfileRecord>[0]);
  });

export const signInProfile = createServerFn({ method: "POST" })
  .validator((input: { username?: string; pin?: string }) => ({
    username: String(input?.username ?? "").trim().slice(0, 80),
    pin: String(input?.pin ?? ""),
  }))
  .handler(async ({ data }) => {
    const { signInProfileRecord } = await import("./people.server");
    return signInProfileRecord(data);
  });

export const requestPinReset = createServerFn({ method: "POST" })
  .validator((input: { login?: string }) => ({
    login: String(input?.login ?? "").trim().slice(0, 80),
  }))
  .handler(async ({ data }) => {
    const { requestPinResetRecord } = await import("./people.server");
    return requestPinResetRecord(data.login);
  });

export const confirmPinReset = createServerFn({ method: "POST" })
  .validator((input: { login?: string; code?: string }) => ({
    login: String(input?.login ?? "").trim().slice(0, 80),
    code: String(input?.code ?? "").replace(/\D/g, "").slice(0, 6),
  }))
  .handler(async ({ data }) => {
    const { confirmPinResetRecord } = await import("./people.server");
    return confirmPinResetRecord(data.login, data.code);
  });

export const resetPin = createServerFn({ method: "POST" })
  .validator((input: { login?: string; proof?: string; pin?: string }) => ({
    login: String(input?.login ?? "").trim().slice(0, 80),
    proof: String(input?.proof ?? ""),
    pin: String(input?.pin ?? "").replace(/\D/g, "").slice(0, 8),
  }))
  .handler(async ({ data }) => {
    const { resetPinRecord } = await import("./people.server");
    return resetPinRecord(data);
  });

export const readProfile = createServerFn({ method: "POST" })
  .validator((input: { secret?: string }) => ({ secret: String(input?.secret ?? "") }))
  .handler(async ({ data }) => {
    const { readProfileRecord } = await import("./people.server");
    return readProfileRecord(data.secret);
  });

export const publicProfile = createServerFn({ method: "POST" })
  .validator((input: { username?: string }) => ({ username: String(input?.username ?? "") }))
  .handler(async ({ data }) => {
    const { publicProfileRecord } = await import("./people.server");
    return publicProfileRecord(data.username);
  });

export const searchPeople = createServerFn({ method: "POST" })
  .validator((input: { secret?: string; username?: string }) => ({
    secret: String(input?.secret ?? ""),
    username: String(input?.username ?? ""),
  }))
  .handler(async ({ data }) => {
    const { searchPeopleRecord } = await import("./people.server");
    return searchPeopleRecord(data.secret, data.username);
  });

export const friendAct = createServerFn({ method: "POST" })
  .validator((input: { secret?: string; username?: string; action?: string }) => ({
    secret: String(input?.secret ?? ""),
    username: String(input?.username ?? ""),
    action: String(input?.action ?? ""),
  }))
  .handler(async ({ data }) => {
    const { friendActRecord } = await import("./people.server");
    return friendActRecord(data.secret, data.username, data.action);
  });

export const sendMessage = createServerFn({ method: "POST" })
  .validator((input: { secret?: string; username?: string; body?: string }) => ({
    secret: String(input?.secret ?? ""),
    username: String(input?.username ?? ""),
    body: String(input?.body ?? ""),
  }))
  .handler(async ({ data }) => {
    const { sendMessageRecord } = await import("./people.server");
    return sendMessageRecord(data.secret, data.username, data.body);
  });

export const readThread = createServerFn({ method: "POST" })
  .validator((input: { secret?: string; username?: string }) => ({
    secret: String(input?.secret ?? ""),
    username: String(input?.username ?? ""),
  }))
  .handler(async ({ data }) => {
    const { readThreadRecord } = await import("./people.server");
    return readThreadRecord(data.secret, data.username);
  });

export const setProfileRank = createServerFn({ method: "POST" })
  .validator((input: { adminToken?: string; profileSecret?: string; username?: string; rank?: string }) => ({
    adminToken: String(input?.adminToken ?? ""),
    profileSecret: String(input?.profileSecret ?? ""),
    username: String(input?.username ?? ""),
    rank: String(input?.rank ?? ""),
  }))
  .handler(async ({ data }) => {
    const { setProfileRankRecord } = await import("./staff.server");
    return setProfileRankRecord(data);
  });

export const loadInsights = createServerFn({ method: "POST" })
  .validator((input: { adminToken?: string; profileSecret?: string; code?: string; dept?: string; person?: string; includeRehearsal?: boolean }) => ({
    adminToken: String(input?.adminToken ?? ""),
    profileSecret: String(input?.profileSecret ?? ""),
    code: String(input?.code ?? ""),
    dept: String(input?.dept ?? ""),
    person: String(input?.person ?? ""),
    includeRehearsal: Boolean(input?.includeRehearsal),
  }))
  .handler(async ({ data }) => {
    const { insightsRecord } = await import("./people.server");
    return insightsRecord(data.adminToken, data);
  });

export const askInsights = createServerFn({ method: "POST" })
  .validator((input: { adminToken?: string; profileSecret?: string; question?: string; code?: string; dept?: string; person?: string; includeRehearsal?: boolean }) => ({
    adminToken: String(input?.adminToken ?? ""),
    profileSecret: String(input?.profileSecret ?? ""),
    question: String(input?.question ?? ""),
    code: String(input?.code ?? ""),
    dept: String(input?.dept ?? ""),
    person: String(input?.person ?? ""),
    includeRehearsal: Boolean(input?.includeRehearsal),
  }))
  .handler(async ({ data }) => {
    const { askInsightsRecord } = await import("./people.server");
    return askInsightsRecord(data.adminToken, data.question, data);
  });

export const lookupUsername = createServerFn({ method: "POST" })
  .validator((input: { code?: string; hostToken?: string; username?: string }) => ({
    code: String(input?.code ?? ""),
    hostToken: String(input?.hostToken ?? ""),
    username: String(input?.username ?? ""),
  }))
  .handler(async ({ data }) => {
    const { lookupForHostRecord } = await import("./people.server");
    return lookupForHostRecord(data);
  });

