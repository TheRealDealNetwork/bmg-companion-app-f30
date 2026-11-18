import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as normalizePhone, i as money, n as displayName, o as pct, r as formatPhone, s as seatInviteText } from "./format-DkJBbT9C.mjs";
import { C as hostCatalog, J as writeSlot, K as useGame, O as lookupCard, a as ClockReadout, c as Field, d as Select, f as Valuation, g as assumeSeat, i as CardCopy, j as publicJoinLink, k as lookupUsername, n as Btn, o as DeptTable, r as Card, t as BrandBar } from "./ui-TaOKJTPB.mjs";
import { o as Route$5 } from "./router-BUNHsq7S.mjs";
import { a as withBrowserFlag, n as isAppOnlyHost, o as withSeat, r as smsHref } from "./join-url-C7nhPgzU.mjs";
import { i as DEPT_SHORT, n as BOARD_CUE, o as PHASES, r as BOARD_DEPTS, s as SEAT_DEPTS } from "./types-D1bYXzt9.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
import { n as ProjectBoard, t as BoardCue } from "./board-CydjMLqt.mjs";
import { t as ReportPanel } from "./report-panel-bI4EAHIa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/host-c0HFO093.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function HostView({ code }) {
	const game = useGame(code, "host");
	const [key, setKey] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [panel, setPanel] = (0, import_react.useState)("run");
	const acting = (0, import_react.useRef)(false);
	if (!game.enabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-navy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandBar, { light: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-md px-4 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-cream",
					children: "Host key"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"This device does not have the host key for ",
						code,
						". Paste it if you started the game somewhere else."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					className: "mt-3",
					value: key,
					onChange: (e) => setKey(e.target.value),
					placeholder: "Host key"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-3 w-full",
					onClick: () => game.saveHost(key.trim()),
					children: "Open control room"
				})
			] })
		})]
	});
	const view = game.view;
	if (!view) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-navy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandBar, { light: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-3xl px-4 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-cream",
				children: game.loading ? "Opening the control room…" : game.error || "Reconnecting…"
			})
		})]
	});
	async function act(type, payload) {
		if (acting.current) return { ok: false };
		acting.current = true;
		setErr("");
		try {
			const res = await game.host(type, payload);
			if (!res.ok && "error" in res) setErr(res.error);
			return res;
		} finally {
			acting.current = false;
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-navy pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandBar, {
			light: true,
			trail: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg text-cream",
					children: view.company
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-gold",
					children: [view.rehearsal ? "Rehearsal · " : "", code]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-wrap items-center justify-between gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-wide text-gold uppercase",
								children: "Host Admin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-semibold tracking-wide text-muted uppercase",
								children: [
									"Round ",
									view.round,
									" of ",
									view.settings.rounds,
									" · ",
									PHASES.find((p) => p.n === view.phase)?.label
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockReadout, {
									timers: view.timers,
									serverNow: view.serverNow,
									which: "round",
									warnAt: 60,
									className: "font-display text-5xl tabular-nums"
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										"Game",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockReadout, {
											timers: view.timers,
											serverNow: view.serverNow,
											which: "game",
											className: "text-sm",
											calmClass: "text-muted"
										}),
										view.timers.paused ? " · paused" : ""
									]
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								view.status === "lobby" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									onClick: () => void act("start"),
									children: "Start game"
								}) : null,
								view.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										kind: "ghost",
										onClick: () => void act(view.timers.paused ? "resume" : "pause"),
										children: view.timers.paused ? "Resume" : "Pause"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										kind: "ghost",
										onClick: () => void act("extend", {
											target: "round",
											seconds: 300
										}),
										children: "+5 min"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										kind: "ghost",
										onClick: () => void act("resetRound"),
										children: "Reset round"
									}),
									view.round < view.settings.rounds ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										kind: "navy",
										onClick: () => void act("nextRound"),
										children: "Next round"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										onClick: () => void act("endGame"),
										children: "End game"
									}),
									view.settings.rounds < 16 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										kind: "ghost",
										onClick: () => void act("addRound"),
										children: "Add a round"
									}) : null
								] }) : null,
								view.status === "live" && view.round < view.settings.rounds ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									kind: "ghost",
									onClick: () => void act("endGame"),
									children: "End early"
								}) : null
							]
						}),
						view.status === "lobby" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-sm text-muted",
							children: SEAT_DEPTS.filter((dept) => !view.players.some((p) => p.active && p.dept === dept)).length ? `Still open: ${SEAT_DEPTS.filter((dept) => !view.players.some((p) => p.active && p.dept === dept)).join(", ")}. The GM plays an event when you start.` : "Every seat is filled. Start, and the GM plays one event from the shuffled deck."
						}) : null
					]
				}),
				err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 rounded-xl bg-navy-2 px-3 py-2 text-sm text-orange-ink",
					children: err
				}) : null,
				view.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardCue, {
					view,
					onBack: () => void act("boardBack"),
					onNext: () => void act("boardNext")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 grid grid-cols-5 gap-1",
					children: PHASES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: view.status !== "live",
						onClick: () => void act("phase", { phase: p.n }),
						className: `min-h-11 touch-manipulation rounded-xl text-xs font-bold select-none active:scale-[0.98] sm:text-sm ${view.phase === p.n ? "bg-navy text-cream" : "border border-gold bg-card text-cream"}`,
						children: p.label
					}, p.n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex gap-2 overflow-x-auto",
					children: [
						[
							["run", "Room"],
							["money", "Money"],
							["cards", "Cards"],
							["report", "Report"],
							["show", "Show"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPanel(id),
							className: `min-h-10 rounded-full px-4 text-sm font-semibold ${panel === id ? "bg-gold text-navy" : "bg-card text-cream"}`,
							children: label
						}, id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "min-h-10 rounded-full bg-card px-4 py-2 text-sm font-semibold text-cream",
							href: `/g/${code}/room`,
							children: "Projector"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "min-h-10 rounded-full bg-card px-4 py-2 text-sm font-semibold text-cream",
							href: `/g/${code}/join`,
							children: "Join link"
						})
					]
				}),
				panel === "run" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Run, {
					code,
					game,
					act
				}) : null,
				panel === "money" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, { game }) : null,
				panel === "cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cards, {
					code,
					token: game.slot.hostToken ?? "",
					game,
					act
				}) : null,
				panel === "report" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportPanel, { view }) }) : null,
				panel === "show" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Show, {
					game,
					act
				}) : null
			]
		})]
	});
}
function samePhone(draft, saved) {
	if (!draft.trim() && !saved.trim()) return true;
	const a = normalizePhone(draft);
	const b = normalizePhone(saved);
	return Boolean(a && b && a === b);
}
function usePublicJoin(code) {
	const [url, setUrl] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		function resolve(saved) {
			publicJoinLink({ data: { code } }).then((res) => {
				if (cancelled) return;
				if (res.ok) {
					setUrl(res.url);
					return;
				}
				if (!isAppOnlyHost(window.location.hostname)) {
					setUrl(withBrowserFlag(`${window.location.origin}/g/${code}/join`));
					return;
				}
				if (saved && !isAppOnlyHost(safeHost(saved))) {
					setUrl(withBrowserFlag(`${saved.replace(/\/$/, "")}/g/${code}/join`));
					return;
				}
				setUrl("");
			});
		}
		resolve(window.localStorage.getItem("bm-public-origin") ?? "");
		const onOrigin = () => resolve(window.localStorage.getItem("bm-public-origin") ?? "");
		window.addEventListener("bm-origin", onOrigin);
		window.addEventListener("storage", onOrigin);
		return () => {
			cancelled = true;
			window.removeEventListener("bm-origin", onOrigin);
			window.removeEventListener("storage", onOrigin);
		};
	}, [code]);
	return url;
}
function SeatPhone({ playerId, name, dept, company, claimed, phone, invite, textedAt, joinBase, smsReady, act }) {
	const [draft, setDraft] = (0, import_react.useState)(() => phone ? formatPhone(phone) : "");
	const [focused, setFocused] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("");
	const skipBlur = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!focused) setDraft(phone ? formatPhone(phone) : "");
	}, [phone, focused]);
	const e164 = normalizePhone(draft);
	const link = joinBase && invite ? withSeat(joinBase, invite) : "";
	const body = link ? seatInviteText(company, name, dept, link) : "";
	const href = e164 && body ? smsHref(e164, body) : "";
	function save(mark) {
		if (!mark && samePhone(draft, phone)) return;
		if (draft.trim() && !e164) {
			setNote("Use a 10-digit mobile number.");
			return;
		}
		act(smsReady && mark ? "text" : "reach", {
			playerId,
			phone: draft.trim(),
			mark
		}).then((res) => {
			if (!res.ok) return;
			if (mark && smsReady) setNote("Text sent.");
			else if (mark) setNote("Message opened. Tap Send in Messages. The text is also copied.");
			else setNote(draft.trim() ? "Number saved." : "");
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					"aria-label": `Mobile for ${name}`,
					inputMode: "tel",
					autoComplete: "tel",
					placeholder: "Mobile number",
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					onFocus: () => setFocused(true),
					onBlur: () => {
						setFocused(false);
						if (skipBlur.current) {
							skipBlur.current = false;
							return;
						}
						save(false);
					},
					className: "sm:max-w-56"
				}),
				claimed ? null : smsReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "navy",
					disabled: !e164,
					onClick: () => save(true),
					children: "Send text"
				}) : href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "navy",
					href,
					onPointerDown: () => {
						skipBlur.current = true;
					},
					onClick: () => {
						navigator.clipboard?.writeText(body).catch(() => void 0);
						save(true);
					},
					children: "Text invite"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "navy",
					onClick: () => {
						if (draft.trim() && !e164) setNote("Use a 10-digit mobile number.");
						else if (!draft.trim()) setNote("Enter their mobile number.");
						else if (!joinBase) setNote("Open the published site before texting links. Preview links open the Grok app.");
						else setNote("Preparing their link…");
					},
					children: "Text invite"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "ghost",
					disabled: !body,
					onClick: () => {
						if (!body) return;
						navigator.clipboard?.writeText(body).then(() => setNote("Text copied. Paste it into a message to that number."), () => setNote("Could not copy. Select the link from Join in the phone browser."));
					},
					children: "Copy text"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: note || (claimed ? "They're already on a phone. Let phone rejoin if you need to text the link again." : textedAt ? "Text opened. Still waiting for them to tap the link." : "On your phone, Text invite opens Messages ready to send. On a computer, Copy text and paste it to their number.")
		})]
	});
}
function Run({ code, game, act }) {
	const view = game.view;
	const [note, setNote] = (0, import_react.useState)("");
	const [first, setFirst] = (0, import_react.useState)("");
	const [last, setLast] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [profileId, setProfileId] = (0, import_react.useState)("");
	const [mobile, setMobile] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)(SEAT_DEPTS[0]);
	const joinBase = usePublicJoin(code);
	const openSeats = SEAT_DEPTS.filter((dept) => !view.players.some((p) => p.active && p.dept === dept));
	const needInvites = (view.contacts ?? []).some((c) => !c.invite);
	(0, import_react.useEffect)(() => {
		if (needInvites) act("invites");
	}, [needInvites]);
	(0, import_react.useEffect)(() => {
		if (view.rehearsal && view.status !== "done" && openSeats.length) act("fillCast");
	}, [
		view.rehearsal,
		view.status,
		openSeats.join("|")
	]);
	const cast = BOARD_CUE.flatMap((dept) => {
		const player = view.players.find((p) => p.active && p.standIn && p.dept === dept);
		return player ? [player] : [];
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 lg:grid-cols-[1.1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				view.rehearsal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: "Rehearsal cast"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Stand-in players fill every seat. They are not real profiles. Play as a role to test that phone."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: cast.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
							kind: "navy",
							className: "px-3 py-1 text-xs",
							onClick: () => {
								const token = game.slot.hostToken;
								if (!token) return;
								assumeSeat({ data: {
									code,
									hostToken: token,
									playerId: player.id
								} }).then((res) => {
									if (!res.ok) {
										setNote(res.error);
										return;
									}
									writeSlot(code, {
										playerId: res.playerId,
										playerToken: res.playerToken,
										name: res.name
									});
									window.location.href = `/g/${code}/play`;
								});
							},
							children: ["Play as ", DEPT_SHORT[player.dept]]
						}, player.id))
					})
				] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Valuation, {
					board: view.board,
					settings: view.settings
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: "Roster"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Add a person by their real name, or find a username. The username is not shown during the game."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"aria-label": "Username",
							value: username,
							onChange: (e) => setUsername(e.target.value),
							placeholder: "Find by username"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "navy",
							onClick: () => {
								lookupUsername({ data: {
									code,
									hostToken: game.slot.hostToken ?? "",
									username
								} }).then((res) => {
									if (!res.ok) return;
									setFirst(res.first);
									setLast(res.last);
									setProfileId(res.profileId);
								});
							},
							children: "Find"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "First name",
								value: first,
								onChange: (e) => setFirst(e.target.value),
								placeholder: "First name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "Last name",
								value: last,
								onChange: (e) => setLast(e.target.value),
								placeholder: "Last name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "Mobile number",
								value: mobile,
								inputMode: "tel",
								autoComplete: "tel",
								onChange: (e) => setMobile(e.target.value),
								placeholder: "Mobile"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								"aria-label": "Role",
								value: role,
								onChange: (e) => setRole(e.target.value),
								children: SEAT_DEPTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: () => {
									act("seat", {
										name: displayName(first, last),
										dept: role,
										phone: mobile.trim(),
										profileId
									}).then((res) => {
										if (res.ok) {
											setFirst("");
											setLast("");
											setUsername("");
											setProfileId("");
											setMobile("");
										}
									});
								},
								children: "Add"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "ghost",
							className: "flex-1",
							onClick: () => void act("lock", { locked: !view.rosterLocked }),
							children: view.rosterLocked ? "Unlock roster" : "Lock roster"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: view.players.length ? view.players.map((p) => {
							const head = view.heads.some((h) => h.playerId === p.id);
							const contact = (view.contacts ?? []).find((c) => c.id === p.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-t border-line py-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap items-center justify-between gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold text-cream",
											children: [
												p.name,
												" ",
												head ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-orange",
													children: "· Up"
												}) : null,
												!p.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted",
													children: " · excused"
												}) : null,
												!p.claimed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted",
													children: " · waiting for their phone"
												}) : null
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatPhone, {
										playerId: p.id,
										name: p.name,
										dept: p.dept,
										company: view.company,
										claimed: Boolean(p.claimed),
										phone: contact?.phone ?? "",
										invite: contact?.invite ?? "",
										textedAt: contact?.textedAt ?? null,
										joinBase,
										smsReady: view.smsReady,
										act
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
												"aria-label": `Role for ${p.name}`,
												className: "max-w-56",
												value: p.dept,
												onChange: (e) => void act("move", {
													playerId: p.id,
													dept: e.target.value
												}),
												children: (SEAT_DEPTS.includes(p.dept) ? SEAT_DEPTS : [...SEAT_DEPTS, p.dept]).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
												kind: "ghost",
												className: "px-2 py-1 text-xs",
												onClick: () => void act("reassign", { playerId: p.id }),
												children: "They're up"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
												kind: "ghost",
												className: "px-2 py-1 text-xs",
												onClick: () => void act("excuse", { playerId: p.id }),
												children: p.active ? "Excuse" : "Restore"
											}),
											p.claimed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
												kind: "ghost",
												className: "px-2 py-1 text-xs",
												onClick: () => void act("release", { playerId: p.id }),
												children: "Let phone rejoin"
											}) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
												kind: "ghost",
												className: "px-2 py-1 text-xs",
												onClick: () => {
													if (window.confirm(`Remove ${p.name} from the roster?`)) act("drop", { playerId: p.id });
												},
												children: "Remove"
											})
										]
									})
								]
							}, p.id);
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "No one seated yet. Add them here, or let them scan once the roster is unlocked."
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "Help"
				}), view.help.filter((h) => h.status !== "done").length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "No open requests."
				}) : view.help.filter((h) => h.status !== "done").map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 rounded-xl border border-line p-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-semibold text-cream",
							children: [
								h.name,
								" · ",
								h.dept
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: h.note }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								kind: "ghost",
								className: "px-2 py-1 text-xs",
								onClick: () => void act("help", {
									id: h.id,
									status: "ack"
								}),
								children: "Acknowledge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								kind: "navy",
								className: "px-2 py-1 text-xs",
								onClick: () => void act("help", {
									id: h.id,
									status: "done"
								}),
								children: "Resolve"
							})]
						})
					]
				}, h.id))] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JoinCard, {
					code,
					hostToken: game.slot.hostToken ?? ""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "Announcement"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						value: note,
						onChange: (e) => setNote(e.target.value),
						placeholder: "Short note for every screen"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						kind: "navy",
						onClick: () => void act("announce", { text: note }),
						children: "Send"
					})]
				})] }),
				view.forced ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: "Forced negatives"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "A $0 answer forces the next negative action card. $150 does not. Campaign Refresh is exempt."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1 text-sm",
						children: view.forced.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f.dept }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: f.played || f.willForce ? "font-bold text-orange" : "text-muted",
								children: f.played ? "Must play" : f.willForce ? "Next negative forces" : "Clear"
							})]
						}, f.dept))
					})
				] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xl text-cream",
						children: ["Log · ", view.company]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							"Only this game, ",
							code,
							"."
						]
					}),
					view.code === code && view.log.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 max-h-64 space-y-1 overflow-auto text-sm",
						children: view.log.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-line py-1 text-ink",
							children: l.text
						}, l.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Nothing has happened in this game yet."
					})
				] })
			]
		})]
	});
}
function JoinCard({ code, hostToken }) {
	const [src, setSrc] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [pasted, setPasted] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const saved = window.localStorage.getItem("bm-public-origin") ?? "";
		setPasted(saved);
		publicJoinLink({ data: { code } }).then((res) => {
			if (cancelled) return;
			if (res.ok) {
				setUrl(res.url);
				setNote("");
				return;
			}
			const host = window.location.hostname;
			if (!isAppOnlyHost(host)) {
				setUrl(withBrowserFlag(`${window.location.origin}/g/${code}/join`));
				setNote("");
				return;
			}
			if (saved && !isAppOnlyHost(safeHost(saved))) {
				setUrl(withBrowserFlag(`${saved.replace(/\/$/, "")}/g/${code}/join`));
				setNote("");
				return;
			}
			setUrl("");
			setNote("This preview link opens the Grok app. Publish the site, paste the public address below (it ends in .grok.me), and the QR will open in Safari or Chrome.");
		});
		return () => {
			cancelled = true;
		};
	}, [code]);
	(0, import_react.useEffect)(() => {
		if (!url) {
			setSrc("");
			return;
		}
		(0, import_lib.toDataURL)(url, {
			margin: 1,
			width: 320,
			color: {
				dark: "#1b3a5c",
				light: "#fffcf8"
			}
		}).then(setSrc);
	}, [url]);
	function usePasted() {
		const raw = pasted.trim();
		if (!raw) return;
		let origin = raw;
		if (!/^https?:\/\//i.test(origin)) origin = `https://${origin}`;
		let parsed;
		try {
			parsed = new URL(origin);
		} catch {
			setNote("That address is not a full link. Paste the published site, like https://your-game.grok.me");
			return;
		}
		if (parsed.protocol !== "https:" || isAppOnlyHost(parsed.hostname)) {
			setNote("Use the published https site, not a grok.com or preview link. Players open it in the phone browser.");
			return;
		}
		const base = parsed.origin;
		window.localStorage.setItem("bm-public-origin", base);
		window.dispatchEvent(new Event("bm-origin"));
		setUrl(withBrowserFlag(`${base}/g/${code}/join`));
		setNote("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl text-cream",
			children: "Join in the phone browser"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Players do not need the Grok app. Scanning this opens Safari or Chrome."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 font-display text-4xl tracking-widest text-cream",
			children: code
		}),
		src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: `QR code to join game ${code} in the phone browser`,
			className: "mt-3 w-48 rounded-xl"
		}) : null,
		url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm break-all text-cream",
			children: url
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "ghost",
			className: "mt-2",
			onClick: () => void navigator.clipboard?.writeText(url),
			children: "Copy browser link"
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-orange-ink",
					children: note || "Checking the public link…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-sm font-semibold text-muted",
					htmlFor: "public-origin",
					children: "Published site"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "public-origin",
					value: pasted,
					onChange: (e) => setPasted(e.target.value),
					placeholder: "https://your-game.grok.me",
					inputMode: "url",
					autoCapitalize: "none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "navy",
					className: "mt-2",
					onClick: usePasted,
					children: "Make the browser QR"
				})
			]
		}),
		hostToken ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-xs text-muted",
			children: [
				"Host key stays on this device.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "font-semibold text-cream underline",
					onClick: () => void navigator.clipboard?.writeText(hostToken),
					children: "Copy host key"
				})
			]
		}) : null
	] });
}
function safeHost(value) {
	try {
		return new URL(value).hostname;
	} catch {
		return "";
	}
}
function Money({ game }) {
	const view = game.view;
	const closed = view.projects.filter((project) => project.collected || project.status === "closed");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Valuation, {
				board: view.board,
				settings: view.settings
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Contract value posts when every slot on a project is filled. Card cash, completion bonuses, and penalties post from the card text. People & Principles still reduces payroll."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "Ledger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1 text-sm",
					children: view.adjustments.length ? view.adjustments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"R",
							a.round,
							" ",
							a.label
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: money(a.cents)
						})]
					}, a.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-muted",
						children: "Nothing posted yet. Open projects and play cards to move the money."
					})
				}),
				view.pending.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-wide text-muted uppercase",
						children: "Waiting on a project"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1 text-sm",
						children: view.pending.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: money(p.cents)
							})]
						}, p.id))
					})]
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-cream",
				children: "Completed projects"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1 text-sm",
				children: closed.length ? closed.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Project ",
						project.n,
						project.customer?.name ? ` · ${project.customer.name}` : ""
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: money(project.valueCents)
					})]
				}, project.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-muted",
					children: "No project has filled every slot yet."
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "By round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1 text-sm",
					children: view.board.rounds.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Round ", r.round] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							money(r.revenue),
							" revenue · ",
							money(r.profit),
							" profit · ",
							pct(r.revenue ? r.profit / r.revenue : null)
						] })]
					}, r.round))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeptTable, { board: view.board })
				})
			] })
		]
	});
}
function Cards({ code, token, game, act }) {
	const view = game.view;
	const [dept, setDept] = (0, import_react.useState)("Marketing");
	const [raw, setRaw] = (0, import_react.useState)("");
	const [card, setCard] = (0, import_react.useState)(null);
	const [choice, setChoice] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [list, setList] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		hostCatalog({ data: {
			code,
			hostToken: token
		} }).then(setList);
	}, [code, token]);
	const deptCards = (list && list.ok ? list.catalog : null)?.department.filter((c) => c.dept === dept && (!q || `${c.name} ${c.text}`.toLowerCase().includes(q.toLowerCase()))) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "Projects and cards"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "navy",
							onClick: () => void act("deal"),
							children: "Deal every hand"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "ghost",
							onClick: () => void act("draw", { deck: "event" }),
							children: "Event"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
							kind: "ghost",
							onClick: () => void act("deal", { dept }),
							children: ["Deal ", dept]
						}),
						waveButton(view, 1e4, 1) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => void act("openWave", { dollars: 1e4 }),
							children: "Open three $10k"
						}) : null,
						waveButton(view, 2e4, 4) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => void act("openWave", { dollars: 2e4 }),
							children: "Open three $20k"
						}) : null,
						waveButton(view, 3e4, 6) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => void act("openWave", { dollars: 3e4 }),
							children: "Open three $30k"
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					className: "mt-2",
					value: dept,
					onChange: (e) => setDept(e.target.value),
					"aria-label": "Department deck",
					children: BOARD_DEPTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Round 1 opens three $10,000 projects. Three $20,000 projects open at the end of round 3. Three $30,000 projects open at the end of round 5. Draw and play deals 3 cards to each department. The person who is up picks 2."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectBoard, {
					projects: view.projects,
					plays: view.plays,
					bare: true
				}),
				view.events[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-xl border-2 border-gold p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-bold text-muted",
							children: ["EVENT · ", view.events[0].type]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl text-cream",
							children: view.events[0].name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: view.events[0].text
						})
					]
				}) : null,
				view.plays[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-xl bg-navy-2 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-bold text-muted",
							children: [
								view.plays[0].dept,
								" · ",
								view.plays[0].type,
								view.plays[0].forced ? " · FORCED" : "",
								view.plays[0].exempt ? " · EXEMPT" : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl text-cream",
							children: view.plays[0].name
						}),
						view.plays[0].projectLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-orange-ink",
							children: view.plays[0].projectLabel
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardCopy, { text: view.plays[0].text })
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1 text-sm",
					children: BOARD_DEPTS.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [(view.hands?.[name] ?? []).length, " in hand"]
						})]
					}, name))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "P&P lookup"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Host view includes the values and the Principle Voice. Player phones do not."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						value: raw,
						onChange: (e) => setRaw(e.target.value),
						placeholder: "07",
						"aria-label": "Card digits"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						kind: "navy",
						onClick: () => {
							setErr("");
							lookupCard({ data: {
								code,
								raw,
								dept,
								hostToken: token
							} }).then((res) => {
								if (!res.ok) {
									setCard(null);
									setErr(res.error);
									return;
								}
								if (res.role === "host") setCard(res.card);
							});
						},
						children: "Find"
					})]
				}),
				err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-orange-ink",
					children: err
				}) : null,
				card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-muted",
							children: card.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl text-cream",
							children: card.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: card.scenario
						}),
						[
							"A",
							"B",
							"C"
						].map((letter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setChoice(letter),
							className: `mt-2 w-full rounded-xl border px-3 py-2 text-left text-sm ${choice === letter ? "border-gold" : "border-line"} ${card.correct === letter ? "bg-navy-2" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-cream",
									children: [letter, ". "]
								}),
								card.options[letter],
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "float-right font-bold text-cream",
									children: money(card.values[letter] * 100)
								})
							]
						}, letter)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed",
							children: card.hostNote
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
							className: "mt-3 w-full",
							disabled: !choice,
							onClick: () => void act("answer", {
								raw: card.code,
								dept: card.dept,
								choice
							}),
							children: [
								"Record ",
								choice || "answer",
								" for ",
								card.dept
							]
						})
					]
				}) : null
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-cream",
				children: "Department deck"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				className: "mt-2",
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search",
				"aria-label": "Search cards"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 max-h-[40rem] space-y-2 overflow-auto",
				children: deptCards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-line p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-bold text-muted",
							children: [c.type, c.copies > 1 ? ` · ×${c.copies}` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-cream",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardCopy, { text: c.text })
					]
				}, c.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: "Recruiting and Owner are saved for a later game. The GM uses People and Principles only."
			})
		] })]
	});
}
function waveButton(view, dollars, fromRound) {
	if (view.status !== "live" || view.round < fromRound) return false;
	return view.projects.filter((project) => project.valueCents === dollars * 100).length < 3;
}
function Show({ game, act }) {
	const view = game.view;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "Guided show"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "The projector plays the beat. You only advance it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "ghost",
							onClick: () => void act("show", { beat: Math.max(0, view.showBeat - 1) }),
							children: "Back"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => void act("show", { beat: Math.min(7, view.showBeat + 1) }),
							children: "Next"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "navy",
							onClick: () => void act("show", { beat: 0 }),
							children: "Back to live board"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm font-semibold text-cream",
					children: ["Now: ", [
						"Off",
						"Result",
						"Rounds",
						"Departments",
						"Principles",
						"Honors",
						"Shout-outs",
						"Phones"
					][view.showBeat]]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						view.status === "live" ? null : null,
						view.status === "audit" || view.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "gold",
							onClick: () => void act("openPost"),
							children: "Open post-game questions"
						}) : null,
						view.status === "post" || view.status === "audit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "navy",
							onClick: () => void act("finish"),
							children: "Close game"
						}) : null,
						view.status === "done" || view.status === "post" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "ghost",
							onClick: () => void act("reopen"),
							children: "Reopen audit"
						}) : null
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-cream",
				children: "Surveys"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-2 text-sm",
				children: view.surveyDone.map((s) => {
					const delta = s.preScores && s.postScores ? s.postScores.reduce((sum, n, i) => sum + n - (s.preScores?.[i] ?? n), 0) : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-cream",
							children: s.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								"Pre ",
								s.pre ? "yes" : "no",
								" · Post ",
								s.post ? "yes" : "no",
								delta !== null ? ` · climb ${delta > 0 ? "+" : ""}${delta}` : ""
							]
						})]
					}, s.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "Honors"
				}),
				view.honors.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-cream",
							children: [h.title, "."]
						}),
						" ",
						h.names.join(", "),
						". ",
						h.detail
					]
				}, h.id)),
				!view.honors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Honors appear once the record supports them."
				}) : null
			] })
		]
	});
}
function HostPage() {
	const { code } = Route$5.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HostView, { code: code.toUpperCase() });
}
//#endregion
export { HostPage as component };
