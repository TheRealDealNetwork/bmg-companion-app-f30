import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as money } from "./format-DkJBbT9C.mjs";
import { _ as Building2, c as Play, n as Users, o as StickyNote, p as Ellipsis, u as LifeBuoy } from "../_libs/lucide-react.mjs";
import { J as writeSlot, K as useGame, O as lookupCard, _ as clearPlayer, a as ClockReadout, c as Field, d as Select, f as Valuation, g as assumeSeat, i as CardCopy, n as Btn, o as DeptTable, r as Card, t as BrandBar, u as ReadAloud } from "./ui-TaOKJTPB.mjs";
import { i as Route$3 } from "./router-BUNHsq7S.mjs";
import { a as NEXT_ROLES, c as SHOUT_PRINCIPLES, i as DEPT_SHORT, n as BOARD_CUE, o as PHASES, r as BOARD_DEPTS } from "./types-D1bYXzt9.mjs";
import { n as cardEffect, o as stageReady, t as DEPT_ICON } from "./icons-DRCSszAQ.mjs";
import { n as ProjectBoard, r as Sheet, t as BoardCue } from "./board-CydjMLqt.mjs";
import { t as ReportPanel } from "./report-panel-bI4EAHIa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play-BccZ_QkY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlayView({ code }) {
	const game = useGame(code, "player");
	const [tab, setTab] = (0, import_react.useState)("play");
	const [err, setErr] = (0, import_react.useState)("");
	const [reveal, setReveal] = (0, import_react.useState)(null);
	const [phasesOpen, setPhasesOpen] = (0, import_react.useState)(false);
	const [phaseIndex, setPhaseIndex] = (0, import_react.useState)(0);
	const { view } = game;
	(0, import_react.useEffect)(() => {
		try {
			if (localStorage.getItem("bmg-phases-seen") !== "1") setPhasesOpen(true);
		} catch {}
	}, []);
	if (!game.enabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		code,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl text-cream",
				children: "Join this game"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "This phone does not have a seat yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `/g/${code}/join`,
				className: "mt-4 block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "w-full",
					children: "Join"
				})
			})
		] })
	});
	if (!view) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		code,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-cream",
			children: game.loading ? "Connecting to the room…" : game.error || "Reconnecting…"
		}) })
	});
	const me = view.players.find((p) => p.id === view.mine?.playerId);
	const myHead = view.heads.find((h) => h.table === me?.table);
	const group = view.players.filter((p) => p.active && p.dept === me?.dept);
	const phase = PHASES.find((p) => p.n === view.phase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		code,
		company: view.company,
		round: view.round,
		phase: phase?.label ?? "",
		children: [
			view.announcement ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 rounded-xl bg-gold px-3 py-2 text-sm font-semibold text-navy",
				children: view.announcement
			}) : null,
			view.rehearsal && game.slot.hostToken ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-gold",
						children: "Rehearsal — switch role"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 flex gap-1 overflow-x-auto",
						children: BOARD_CUE.flatMap((dept) => {
							const player = view.players.find((p) => p.active && p.standIn && p.dept === dept);
							if (!player) return [];
							const mine = player.id === view.mine?.playerId;
							return [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `min-h-10 shrink-0 rounded-full px-3 text-xs font-semibold ${mine ? "bg-gold text-navy" : "bg-card text-cream"}`,
								onClick: () => {
									if (mine || !game.slot.hostToken) return;
									assumeSeat({ data: {
										code,
										hostToken: game.slot.hostToken,
										playerId: player.id
									} }).then((res) => {
										if (!res.ok) {
											setErr(res.error);
											return;
										}
										writeSlot(code, {
											playerId: res.playerId,
											playerToken: res.playerToken,
											name: res.name
										});
									});
								},
								children: DEPT_SHORT[player.dept]
							}, player.id)];
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `/g/${code}/host`,
						className: "mt-1 inline-block text-xs font-semibold text-gold",
						children: "Back to control room"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-semibold tracking-wide text-muted uppercase",
					children: [
						"Round ",
						view.round,
						" of ",
						view.settings.rounds,
						view.rehearsal ? " · Rehearsal" : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl text-cream",
					children: phase?.label
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockReadout, {
						timers: view.timers,
						serverNow: view.serverNow,
						which: "round",
						warnAt: 10,
						className: "font-display text-3xl tabular-nums"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"Game",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockReadout, {
								timers: view.timers,
								serverNow: view.serverNow,
								which: "game",
								className: "text-xs",
								calmClass: "text-muted"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardCue, { view }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurnCard, {
				game,
				setErr
			}),
			view.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseTip, { step: view.turn.step }) : null,
			myHead ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 rounded-xl bg-navy px-3 py-2 text-sm text-cream",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Up in your group: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-gold",
						children: myHead.name
					}),
					myHead.playerId === view.mine?.playerId ? " · that's you" : ""
				] }), group.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-cream/80",
					children: group.map((p) => p.id === myHead.playerId ? `${p.name} (up)` : p.name).join(" · ")
				}) : null]
			}) : null,
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 rounded-xl bg-navy-2 px-3 py-2 text-sm text-orange-ink",
				children: err
			}) : null,
			tab === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayTab, {
				code,
				game,
				reveal,
				setReveal,
				setErr
			}) : null,
			tab === "company" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold tracking-wide text-gold uppercase",
							children: "This round's payroll"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl text-cream",
							children: money(view.turn.weeklyCents)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Set once at the start. Every round charges that week."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Valuation, {
						board: view.board,
						settings: view.settings
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeptTable, { board: view.board }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectBoard, {
						projects: view.projects,
						plays: view.plays
					})
				]
			}) : null,
			tab === "notes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesTab, {
				game,
				setErr
			}) : null,
			tab === "team" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamTab, {
				game,
				setErr
			}) : null,
			tab === "help" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpTab, {
				game,
				setErr,
				onPhases: () => {
					setPhaseIndex(0);
					setPhasesOpen(true);
				}
			}) : null,
			tab === "more" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreTab, {
				code,
				game,
				setErr
			}) : null,
			view.eventDeck && view.eventDeck.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventDeck, {
				game,
				cards: view.eventDeck,
				setErr
			}) : null,
			phasesOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseDeck, {
				index: phaseIndex,
				setIndex: setPhaseIndex,
				onClose: () => {
					try {
						localStorage.setItem("bmg-phases-seen", "1");
					} catch {}
					setPhasesOpen(false);
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 border-t border-line bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-lg grid-cols-6",
					children: [
						[
							"play",
							"Play",
							Play
						],
						[
							"company",
							"Numbers",
							Building2
						],
						[
							"notes",
							"Notes",
							StickyNote
						],
						[
							"team",
							"Team",
							Users
						],
						[
							"help",
							"Help",
							LifeBuoy
						],
						[
							"more",
							"More",
							Ellipsis
						]
					].map(([id, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(id),
						className: `flex min-h-14 touch-manipulation flex-col items-center justify-center gap-0.5 text-xs font-semibold select-none active:bg-navy-2 ${tab === id ? "text-orange" : "text-muted"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							"aria-hidden": true
						}), label]
					}, id))
				})
			})
		]
	});
}
function formatDollars(raw) {
	const digits = raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 7);
	if (!digits) return "";
	return `$${Number(digits).toLocaleString("en-US")}`;
}
function TurnCard({ game, setErr }) {
	const view = game.view;
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [choice, setChoice] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [payFields, setPayFields] = (0, import_react.useState)({});
	const [ppOpen, setPpOpen] = (0, import_react.useState)(false);
	const ppSeen = (0, import_react.useRef)("");
	const mine = view?.mine;
	const me = view?.players.find((player) => player.id === mine?.playerId);
	const inDept = Boolean(view && me && me.dept === view.turn.dept);
	const myTurn = Boolean(inDept && mine?.isHead);
	(0, import_react.useEffect)(() => {
		if (!view || !inDept || view.turn.step !== "principle" || !view.dutyCard) return;
		if (ppSeen.current === view.dutyCard.code) return;
		ppSeen.current = view.dutyCard.code;
		setPpOpen(true);
	}, [inDept, view]);
	if (!view || view.status !== "live") return null;
	const openProjects = view.projects.filter((project) => project.status !== "closed");
	async function send(type, payload) {
		setBusy(true);
		setErr("");
		const res = await game.player(type, payload);
		setBusy(false);
		if (!res.ok) setErr(res.error ?? "Could not save that.");
		else {
			setPicked([]);
			setChoice("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 rounded-xl border border-gold bg-navy-2 px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-bold tracking-wide text-gold uppercase",
				children: [
					DEPT_SHORT[view.turn.dept],
					"'s turn · ",
					view.turn.head
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-cream",
				children: view.turn.line
			}),
			myTurn && view.turn.step === "payroll" ? view.turn.openPayroll.map((dept) => {
				const raw = payFields[dept] ?? "";
				const dollars = Number(raw.replace(/\D/g, ""));
				const week = Number.isFinite(dollars) && dollars > 0 ? Math.round(dollars / 52) : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-cream",
							children: dept
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"aria-label": `${dept} annual payroll`,
							inputMode: "numeric",
							value: raw,
							placeholder: "$100,000",
							onChange: (e) => setPayFields((cur) => ({
								...cur,
								[dept]: formatDollars(e.target.value)
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								"Charged every round: ",
								week ? money(week * 100) : "—",
								". Asked once. It cannot be changed."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
							className: "w-full",
							disabled: busy || dollars < 1e3,
							onClick: () => {
								setBusy(true);
								setErr("");
								game.player("payroll", {
									annual: dollars,
									dept
								}).then((res) => {
									setBusy(false);
									if (!res.ok) setErr(res.error ?? "Could not lock payroll.");
									else setPayFields((cur) => ({
										...cur,
										[dept]: ""
									}));
								});
							},
							children: ["Lock ", DEPT_SHORT[dept]]
						})
					]
				}, dept);
			}) : null,
			myTurn && view.turn.step === "focus" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-cream",
						children: "Department head meeting. Lock two open projects. You can only play on those two this round."
					}),
					openProjects.map((project) => {
						const on = picked.includes(project.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setPicked((cur) => cur.includes(project.id) ? cur.filter((id) => id !== project.id) : cur.length >= 2 ? cur : [...cur, project.id]),
							className: `w-full rounded-xl border px-3 py-2 text-left ${on ? "border-gold bg-navy" : "border-line"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold text-cream",
								children: [
									"Project ",
									project.n,
									" · ",
									money(project.valueCents)
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									project.customer?.name,
									" · ",
									project.house?.name
								]
							})]
						}, project.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "w-full",
						disabled: busy || picked.length !== 2,
						onClick: () => void send("focus", { projectIds: picked }),
						children: "Lock these two"
					})
				]
			}) : null,
			inDept && view.turn.step === "principle" && view.dutyCard ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [!myTurn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-cream",
					children: [view.turn.head, " decides this round. You decide next."]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-2 w-full",
					onClick: () => setPpOpen(true),
					children: "Open the People & Principles card"
				})]
			}) : null,
			ppOpen && inDept && view.dutyCard ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				title: "People & Principles",
				onClose: () => setPpOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						!myTurn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-cream",
							children: [view.turn.head, " decides this round. You decide next."]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold tracking-wide text-gold uppercase",
							children: view.dutyCard.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl text-cream",
							children: view.dutyCard.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-cream",
							children: view.dutyCard.scenario
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, { text: `${view.dutyCard.title}. ${view.dutyCard.scenario}` }),
						[
							"A",
							"B",
							"C"
						].map((letter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !myTurn,
							onClick: () => myTurn && setChoice(letter),
							className: `w-full rounded-xl border px-3 py-2 text-left text-sm ${choice === letter ? "border-gold bg-navy" : "border-line"} ${myTurn ? "" : "opacity-80"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-gold",
								children: [letter, ". "]
							}), view.dutyCard?.options[letter]]
						}, letter)),
						myTurn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							className: "w-full",
							disabled: busy || !choice,
							onClick: () => void send("answer", {
								raw: view.dutyCard?.code,
								choice
							}),
							children: "Answer"
						}) : null,
						view.hand.some((card) => card.type === "NEGATIVE") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "A negative was dealt. The best answer removes it and deals a replacement."
						}) : null
					]
				})
			}) : null
		]
	});
}
function NotesTab({ game, setErr }) {
	const view = game.view;
	const [text, setText] = (0, import_react.useState)(view?.note ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setText(view?.note ?? "");
	}, [view?.note]);
	if (!view) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl text-cream",
			children: "Notes"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Bring these back from the board meeting. Only this phone keeps them."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value: text,
			onChange: (e) => setText(e.target.value),
			rows: 8,
			className: "mt-3 w-full rounded-xl border border-line bg-navy px-3 py-2 text-sm text-cream",
			placeholder: "What the GM and the other departments decided"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			className: "mt-3 w-full",
			disabled: busy,
			onClick: () => {
				setBusy(true);
				setErr("");
				game.player("note", { text }).then((res) => {
					setBusy(false);
					if (!res.ok) setErr(res.error ?? "Could not save the note.");
				});
			},
			children: "Save note"
		})
	] });
}
function EventDeck({ game, cards, setErr }) {
	const [pick, setPick] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const chosen = cards.find((card) => card.index === pick) ?? null;
	async function play() {
		if (pick === null) return;
		setBusy(true);
		setErr("");
		const res = await game.player("event", { index: pick });
		setBusy(false);
		if (!res.ok) setErr(res.error ?? "Could not play that event.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-end justify-center bg-navy/80 p-3 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Event deck",
			className: "max-h-[92vh] w-full max-w-lg overflow-auto rounded-2xl bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-widest text-gold uppercase",
					children: "General Manager"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-cream",
					children: "Play this event"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "The deck was shuffled. This is the one event. It goes into the business."
				}),
				chosen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, { text: `${chosen.name}. ${chosen.text}` })
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: cards.map((card) => {
						const on = card.index === pick;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setPick(card.index),
							className: `w-full touch-manipulation rounded-xl border px-3 py-3 text-left select-none active:scale-[0.99] ${on ? "border-gold bg-navy-2" : "border-line bg-navy"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold tracking-wide text-gold uppercase",
									children: card.type || "Event"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg text-cream",
									children: card.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-cream/90",
									children: card.text
								})
							]
						}) }, card.index);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-4 w-full",
					disabled: pick === null || busy,
					onClick: () => void play(),
					children: busy ? "Playing…" : chosen ? `Play ${chosen.name}` : "Choose a card"
				})
			]
		})
	});
}
function Shell({ code, company, round, phase, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-navy pb-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandBar, { trail: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-right text-xs font-semibold text-cream",
			children: [company || code, round ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-normal text-muted",
				children: phase
			}) : null]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-lg px-4 py-4",
			children
		})]
	});
}
function PlayTab({ code, game, reveal, setReveal, setErr }) {
	const view = game.view;
	const mine = view.mine;
	const [digits, setDigits] = (0, import_react.useState)("");
	const [card, setCard] = (0, import_react.useState)(null);
	const [pick, setPick] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [survey, setSurvey] = (0, import_react.useState)([
		0,
		0,
		0
	]);
	const needsPre = mine && !mine.preDone && view.status !== "done";
	const needsPost = mine && !mine.postDone && (view.status === "post" || view.status === "done" || view.status === "audit");
	const dept = view.players.find((p) => p.id === mine?.playerId)?.dept;
	const boardDept = dept ? BOARD_DEPTS.includes(dept) : false;
	const dealKey = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		if (view.status !== "live" || !mine?.isHead || !boardDept || !dept) return;
		if (view.turn.dept !== dept || view.turn.step !== "cards") return;
		if (view.hand.length > 0) return;
		const key = `${view.round}:${dept}`;
		if (dealKey.current === key) return;
		dealKey.current = key;
		game.player("deal").then((res) => {
			if (!res.ok) dealKey.current = "";
		});
	}, [
		view.rev,
		view.status,
		view.turn.dept,
		view.turn.step,
		view.hand.length,
		view.round,
		mine?.isHead,
		boardDept,
		dept
	]);
	async function saveSurvey(phase) {
		if (survey.some((n) => n < 1)) {
			setErr("Answer all three, from 1 to 5.");
			return;
		}
		setErr("");
		const res = await game.player("survey", {
			phase,
			values: survey
		});
		if (!res.ok) setErr(res.error);
	}
	async function findCard() {
		setErr("");
		setReveal(null);
		setPick(null);
		const res = await lookupCard({ data: {
			code,
			raw: digits,
			playerId: game.slot.playerId,
			playerToken: game.slot.playerToken
		} });
		if (!res.ok) {
			setCard(null);
			setErr(res.error);
			return;
		}
		if (res.role !== "player") return;
		setCard(res.card);
	}
	async function lockIn() {
		if (!card || !pick) return;
		setBusy(true);
		setErr("");
		const res = await game.player("answer", {
			raw: card.code,
			choice: pick
		});
		setBusy(false);
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		if (res.reveal) setReveal(res.reveal);
		setCard(null);
		setDigits("");
		setPick(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			mine?.forced ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border-2 border-gold bg-gold px-3 py-3 text-navy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-wide uppercase",
						children: "Must play immediately"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-semibold",
						children: "This negative is in play. A best People & Principles answer would have cleared a single negative."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-lg",
						children: mine.forced.name
					})
				]
			}) : null,
			mine?.mustPlayNegative && !mine.forced && (view.phase === 3 || view.phase === 4) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-gold bg-navy-2 px-3 py-3 text-sm text-orange-ink",
				children: "One negative is in the hand. It plays unless the department locks the best People & Principles answer."
			}) : null,
			needsPre || needsPost ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: needsPre ? "Before we start" : "After the game"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Same three questions. 1 is low, 5 is high. Your answers stay off the room screen."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-4",
					children: view.surveyPrompts.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-cream",
						children: q.prompt
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-5 gap-2",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSurvey((cur) => {
								const next = [...cur];
								next[i] = n;
								return next;
							}),
							className: `min-h-11 touch-manipulation rounded-xl border font-semibold select-none active:scale-[0.98] ${survey[i] === n ? "border-gold bg-gold text-navy" : "border-line bg-card text-cream"}`,
							children: n
						}, n))
					})] }, q.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-4 w-full",
					onClick: () => saveSurvey(needsPre ? "pre" : "post"),
					children: "Save answers"
				})
			] }) : null,
			view.status === "lobby" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-cream",
				children: "Waiting for the GM"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "You are in. The clocks start when the host opens the game."
			})] }) : null,
			view.status === "live" && view.events.some((event) => event.round === view.round) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-widest text-gold uppercase",
					children: "In the business"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: view.events.find((event) => event.round === view.round)?.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-cream/90",
					children: view.events.find((event) => event.round === view.round)?.text
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, { text: `${view.events.find((event) => event.round === view.round)?.name}. ${view.events.find((event) => event.round === view.round)?.text ?? ""}` })
				})
			] }) : null,
			view.status !== "lobby" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectBoard, {
				projects: view.projects,
				plays: view.plays
			}) : null,
			boardDept && view.status === "live" && view.turn.dept === dept ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandPlay, {
				game,
				setErr,
				busy,
				setBusy
			}) : null,
			view.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "People & Principles"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						dept,
						" · ",
						mine?.used ?? 0,
						" of ",
						mine?.cap ?? 3,
						" this round. Dollar values stay hidden until the answer locks.",
						mine?.mustPlayNegative ? " The best answer clears the mandatory negative." : mine?.negativeCleared ? " Best answer locked. Play the other two cards." : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						className: "min-w-0 flex-1",
						inputMode: "text",
						value: digits,
						placeholder: "07 or BE-MK-07",
						"aria-label": "Card code",
						onChange: (e) => setDigits(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") findCard();
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						kind: "navy",
						onClick: () => void findCard(),
						children: "Find"
					})]
				}),
				card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold tracking-wide text-muted",
							children: card.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl text-cream",
							children: card.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed",
							children: card.scenario
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, { text: `${card.title}. ${card.scenario} Answer A. ${card.options.A} Answer B. ${card.options.B} Answer C. ${card.options.C}` })
						}),
						[
							"A",
							"B",
							"C"
						].map((letter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => mine?.isHead && setPick(letter),
							className: `mt-2 min-h-11 w-full touch-manipulation rounded-xl border px-3 py-3 text-left text-sm select-none active:scale-[0.99] ${pick === letter ? "border-gold bg-navy-2" : "border-line bg-card"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-cream",
								children: [letter, ". "]
							}), card.options[letter]]
						}, letter)),
						mine?.isHead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							className: "mt-3 w-full",
							disabled: !pick || busy,
							onClick: () => void lockIn(),
							children: pick ? `Lock in ${pick}` : "Choose an answer"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-cream",
							children: [view.heads.find((head) => head.dept === dept)?.name ?? "The person up", " decides this round. You decide next."]
						})
					]
				}) : null
			] }) : null,
			reveal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { answer: reveal }) : null,
			!reveal && view.answers[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { answer: view.answers[view.answers.length - 1] }) : null
		]
	});
}
function HandPlay({ game, setErr, busy, setBusy }) {
	const view = game.view;
	const mine = view.mine;
	const hand = view.hand;
	const me = view.players.find((p) => p.id === mine?.playerId);
	const played = view.plays.filter((play) => play.round === view.round && play.dept === me?.dept);
	const deciding = Boolean(mine?.isHead);
	const deptUp = view.turn.dept === me?.dept && (view.turn.step === "cards" || view.turn.step === "principle" && played.length < 2);
	const done = !deptUp || played.length >= 2;
	const openProjects = view.focusIds.length === 2 ? view.projects.filter((project) => view.focusIds.includes(project.id) && project.status !== "closed") : view.projects.filter((project) => project.status !== "closed");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [places, setPlaces] = (0, import_react.useState)({});
	const [cursor, setCursor] = (0, import_react.useState)(0);
	const [ready, setReady] = (0, import_react.useState)(false);
	const seen = (0, import_react.useRef)("");
	const handKey = hand.map((card) => card.id).join();
	const upName = view.heads.find((head) => head.dept === me?.dept)?.name ?? "Your department";
	(0, import_react.useEffect)(() => {
		if (!hand.length || done) return;
		if (seen.current === handKey) return;
		seen.current = handKey;
		setSelected([]);
		setPlaces({});
		setCursor(0);
		setReady(false);
		setOpen(true);
	}, [
		handKey,
		done,
		hand.length
	]);
	function chosenIds() {
		const blocked = mine?.negativeCleared ? hand.filter((card) => card.type === "NEGATIVE").map((card) => card.id) : [];
		const locked = mine?.mustPlayNegative ? hand.filter((card) => card.type === "NEGATIVE").map((card) => card.id) : [];
		const rest = selected.filter((id) => !locked.includes(id) && !blocked.includes(id));
		return [...locked, ...rest].slice(0, 2);
	}
	function toggle(id) {
		const card = hand.find((item) => item.id === id);
		if (mine?.mustPlayNegative && card?.type === "NEGATIVE" && selected.includes(id)) return;
		setSelected((cur) => {
			if (cur.includes(id)) return cur.filter((item) => item !== id);
			if (cur.length >= 2) return cur;
			return [...cur, id];
		});
	}
	async function redeal() {
		setBusy(true);
		setErr("");
		const res = await game.player("redeal");
		setBusy(false);
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		setOpen(false);
		setSelected([]);
		setPlaces({});
		setCursor(0);
		setReady(false);
	}
	const steps = chosenIds().flatMap((id) => {
		const card = hand.find((item) => item.id === id);
		if (!card || !me) return [];
		return stepsFor(card, openProjects, me.dept).map((slot) => ({
			id,
			slot,
			card
		}));
	});
	const step = ready && cursor < steps.length ? steps[cursor] : null;
	async function playTwo() {
		const ids = chosenIds();
		setBusy(true);
		setErr("");
		const res = await game.player("play", {
			ids,
			placements: ids.map((id) => ({
				id,
				projectIds: places[id] ?? []
			}))
		});
		setBusy(false);
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		setOpen(false);
		setSelected([]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl text-cream",
			children: "Your department cards"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: hand.length ? deciding ? "Three cards are dealt. Choose two to play." : `${upName} decides this round. You decide next.` : deptUp ? "Shuffling three cards…" : `${upName} is up.`
		}),
		mine?.mustPlayNegative ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm font-semibold text-orange-ink",
			children: "The negative is a mandatory play. The best People & Principles answer clears it."
		}) : null,
		mine?.negativeCleared && hand.some((card) => card.type === "NEGATIVE") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm font-semibold text-cream",
			children: "Best answer locked. Play the other two cards. The negative stays out."
		}) : null,
		hand.length && mine?.isHead && !done && mine.canRedeal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			kind: "ghost",
			className: "mt-3 w-full",
			disabled: busy,
			onClick: () => void redeal(),
			children: "Re-deal · these negatives do not play"
		}) : null,
		hand.length && mine?.isHead && !done && !legalCount(hand, openProjects, me?.dept) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			className: "mt-3 w-full",
			disabled: busy,
			onClick: () => void game.player("pass"),
			children: "Nothing can be played. Next department"
		}) : null,
		hand.length && !done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			className: "mt-3 w-full",
			onClick: () => setOpen(true),
			children: deciding ? "Choose two of the three cards" : "View the three cards"
		}) : null,
		done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm font-semibold text-cream",
			children: "Two cards are in for this round."
		}) : null,
		played.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: played.map((play) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-line p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-bold text-muted uppercase",
						children: [
							"Played",
							play.playerName ? ` · ${play.playerName}` : "",
							" · ",
							play.type
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-cream",
						children: play.name
					}),
					play.projectLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-orange-ink",
						children: play.projectLabel
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardCopy, { text: play.text }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, { text: `${play.name}. ${play.text}` })
					})
				]
			}, play.id))
		}) : null,
		open && !done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
			title: !ready ? "Your three cards" : step ? stepTitle(step.card, step.slot, me?.dept) : "Play these two",
			onClose: () => setOpen(false),
			children: [
				!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: !deciding ? `${upName} decides this round. You decide next.` : mine?.mustPlayNegative ? "The negative stays selected. Pick one more card to play with it. The best People & Principles answer removes it and deals a replacement." : "Tap two cards. Then place each one on one of this department's two projects."
						}),
						view.dutyCard && hand.some((card) => card.type === "NEGATIVE") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DutyPick, {
							game,
							card: view.dutyCard,
							setErr,
							canSubmit: deciding
						}) : null,
						mine?.canRedeal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "ghost",
							className: "w-full",
							disabled: busy,
							onClick: () => void redeal(),
							children: "Re-deal · these negatives do not play"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, {
							text: hand.map((card) => `${card.name}. ${card.text}`).join(" "),
							label: "Read the cards"
						}),
						hand.map((card) => {
							const lockedNeg = Boolean(mine?.mustPlayNegative && card.type === "NEGATIVE");
							const clearedNeg = Boolean(mine?.negativeCleared && card.type === "NEGATIVE");
							const on = !clearedNeg && (selected.includes(card.id) || lockedNeg);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": on,
								disabled: !deciding || clearedNeg,
								onClick: () => deciding && !clearedNeg && toggle(card.id),
								className: `w-full touch-manipulation rounded-xl border px-3 py-3 text-left select-none active:scale-[0.99] ${clearedNeg ? "border-line opacity-40" : on ? "border-gold bg-navy-2" : "border-line bg-card"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-bold tracking-wide text-muted uppercase",
										children: [card.type, lockedNeg ? " · mandatory" : clearedNeg ? " · cleared" : on ? " · selected" : ""]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg text-cream",
										children: card.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardCopy, { text: card.text })
								]
							}, card.id);
						}),
						deciding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							className: "w-full",
							disabled: chosenIds().length < 1,
							onClick: () => {
								setSelected(chosenIds());
								setCursor(0);
								setReady(true);
							},
							children: chosenIds().length ? "Next" : "Choose a card that can be played"
						}) : null
					]
				}) : null,
				step && me ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg text-cream",
							children: step.card.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardCopy, { text: step.card.text }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, { text: `${step.card.name}. ${step.card.text}` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectChoices, {
							projects: deciding ? choicesFor(step.card, openProjects, me.dept, step.slot) : [],
							onPick: (projectId) => {
								setPlaces((cur) => {
									const list = [...cur[step.id] ?? []];
									list[step.slot] = projectId;
									return {
										...cur,
										[step.id]: list
									};
								});
								setCursor((n) => n + 1);
							}
						})
					]
				}) : null,
				ready && !step && chosenIds().length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						chosenIds().map((id) => {
							const card = hand.find((item) => item.id === id);
							const names = (places[id] ?? []).map((projectId) => openProjects.find((project) => project.id === projectId)).filter((project) => Boolean(project)).map((project) => `Project ${project.n}`);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-line p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-cream",
									children: card?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: names.length ? names.join(" · ") : "No project"
								})]
							}, id);
						}),
						deciding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
							className: "w-full",
							disabled: busy,
							onClick: () => void playTwo(),
							children: ["Play ", chosenIds().length === 1 ? "this card" : "these two"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-cream",
							children: [upName, " decides this round. You decide next."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "ghost",
							className: "w-full",
							onClick: () => {
								setSelected([]);
								setPlaces({});
								setCursor(0);
								setReady(false);
							},
							children: "Start over"
						})
					]
				}) : null
			]
		}) : null
	] });
}
function DutyPick({ game, card, setErr, canSubmit }) {
	const [choice, setChoice] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-xl border border-gold p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-wide text-gold uppercase",
				children: "Clear the negative"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg text-cream",
				children: card.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-cream",
				children: card.scenario
			}),
			[
				"A",
				"B",
				"C"
			].map((letter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: !canSubmit,
				onClick: () => canSubmit && setChoice(letter),
				className: `w-full rounded-xl border px-3 py-2 text-left text-sm ${choice === letter ? "border-gold bg-navy" : "border-line"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-bold text-gold",
					children: [letter, ". "]
				}), card.options[letter]]
			}, letter)),
			canSubmit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				className: "w-full",
				disabled: busy || !choice,
				onClick: () => {
					setBusy(true);
					setErr("");
					game.player("answer", {
						raw: card.code,
						choice
					}).then((res) => {
						setBusy(false);
						if (!res.ok) setErr(res.error ?? "Could not answer.");
					});
				},
				children: "Answer"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Only the person up can submit this answer."
			})
		]
	});
}
function legalCount(hand, projects, dept) {
	if (!dept) return 0;
	return hand.filter((card) => stepsFor(card, projects, dept).length > 0 || cardEffect(card.text).kind === "none").length;
}
function stepsFor(card, projects, dept) {
	const effect = cardEffect(card.text);
	if (effect.kind === "none") return [];
	const iconDept = dept;
	const hasIcon = projects.some((project) => project.tokens.some((token) => token.filled && token.dept === iconDept));
	if ((effect.kind === "remove" || effect.kind === "move") && !hasIcon) return [];
	if (!projects.length) return [];
	if (effect.kind === "move") return projects.some((project) => stageReady(project, iconDept) === true) ? [0, 1] : [];
	if (effect.kind === "play") {
		if (!projects.some((project) => stageReady(project, iconDept) === true && project.tokens.some((token) => !token.filled && token.dept === iconDept))) return [];
		return Array.from({ length: effect.count }, (_, n) => n);
	}
	return [0];
}
function choicesFor(card, projects, dept, slot) {
	const effect = cardEffect(card.text);
	const iconDept = dept;
	if (effect.kind === "remove" || effect.kind === "move" && slot === 0) return projects.filter((project) => project.tokens.some((token) => token.filled && token.dept === iconDept));
	if (effect.kind === "play") return projects.filter((project) => stageReady(project, iconDept) === true && project.tokens.some((token) => !token.filled && token.dept === iconDept));
	if (effect.kind === "move" && slot > 0) return projects.filter((project) => stageReady(project, iconDept) === true);
	return projects;
}
function stepTitle(card, slot, dept) {
	const effect = cardEffect(card.text);
	const icon = dept && DEPT_ICON[dept] || "icon";
	if (effect.kind === "move" && slot === 0) return `Take the ${icon} off`;
	if (effect.kind === "move") return `Put the ${icon} on`;
	if (effect.kind === "slot") return `Add an open ${icon} slot`;
	if (effect.kind === "remove") return `Remove a ${icon}`;
	if (effect.kind === "play" && effect.count > 1) return `Place ${icon} ${slot + 1} of ${effect.count}`;
	return `Place the ${icon}`;
}
function ProjectChoices({ projects, onPick }) {
	if (!projects.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No open project can take this yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onPick(project.id),
			className: "min-h-11 w-full touch-manipulation rounded-xl border border-line bg-card px-3 py-3 text-left select-none active:scale-[0.99] active:border-gold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-semibold text-cream",
				children: [
					"Project ",
					project.n,
					project.valueCents > 0 ? ` · ${money(project.valueCents)}` : "",
					" · Open"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					project.customer?.name,
					" · ",
					project.house?.name
				]
			})]
		}, project.id))
	});
}
function Reveal({ answer }) {
	const strong = answer.valueCents === 5e4;
	const partial = answer.valueCents === 15e3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: strong ? "border-gold bg-gold" : "",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-wide text-cream uppercase",
				children: answer.cardCode
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-cream",
				children: answer.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg font-semibold text-cream",
				children: strong ? "You chose like an owner. +$500 payroll savings." : partial ? "Partial answer. +$150 payroll savings." : "This answer does not reduce payroll."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm font-semibold text-cream",
				children: [
					"You locked ",
					answer.choice,
					". The strong answer is ",
					answer.correct,
					". Principle: ",
					answer.principle,
					"."
				]
			}),
			answer.hostNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-ink",
				children: answer.hostNote
			}) : null
		]
	});
}
function TeamTab({ game, setErr }) {
	const view = game.view;
	const me = view.players.find((p) => p.id === view.mine?.playerId);
	const mates = view.players.filter((p) => p.active && p.table === me?.table && p.id !== me?.id);
	const [toId, setToId] = (0, import_react.useState)(mates[0]?.id ?? "");
	const [principle, setPrinciple] = (0, import_react.useState)(SHOUT_PRINCIPLES[0]);
	const sent = view.shoutouts.some((s) => s.round === view.round && s.fromId === me?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-cream",
				children: me?.dept
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-2",
				children: view.players.filter((p) => p.table === me?.table).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold text-cream",
						children: [p.name, !p.active ? " · excused" : ""]
					}), view.heads.some((h) => h.playerId === p.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold text-orange",
						children: "Up"
					}) : null]
				}, p.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "Shout-out"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "One per round, to someone at your table. It is recognition, not a score."
				}),
				sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm font-semibold text-cream",
					children: "Sent for this round."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: toId,
							onChange: (e) => setToId(e.target.value),
							"aria-label": "Teammate",
							children: mates.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p.id,
								children: p.name
							}, p.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: principle,
							onChange: (e) => setPrinciple(e.target.value),
							"aria-label": "Principle",
							children: SHOUT_PRINCIPLES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: p }, p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "navy",
							className: "w-full",
							disabled: !toId,
							onClick: () => {
								game.player("shout", {
									toId,
									principle
								}).then((res) => {
									if (!res.ok) setErr(res.error);
								});
							},
							children: "Send shout-out"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: view.shoutouts.filter((s) => s.toId === me?.id).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-navy-2 px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-cream",
								children: s.fromName
							}),
							" recognized you for ",
							s.principle,
							"."
						]
					}, s.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-cream",
				children: "Your record"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					view.mine?.correct ?? 0,
					" strong answers out of ",
					view.mine?.answered ?? 0,
					".",
					" ",
					view.mine?.climb === null || view.mine?.climb === void 0 ? "Climb appears after both surveys." : `Learning climb ${view.mine.climb > 0 ? "+" : ""}${view.mine.climb}.`
				]
			})] })
		]
	});
}
var PHASE_CARDS = [
	{
		title: "Phase 1 — Who is up",
		body: "The gold bar names the department and the one person who decides this round. Everyone in that department sees the same cards. Only that person submits."
	},
	{
		title: "Phase 2 — Payroll",
		body: "The GM asks each first department head once. The annual number locks and is charged every round."
	},
	{
		title: "Phase 3 — Focus",
		body: "The head locks two open projects at the meeting. This department can only play on those two this round."
	},
	{
		title: "Phase 4 — Draw and play",
		body: "Three action cards open for the whole department. The person up picks two and places them only where they fit."
	},
	{
		title: "Phase 5 — People & Principles",
		body: "The person up must answer. The best answer can clear a negative. Next round, the next person decides."
	},
	{
		title: "Phase 6 — The board",
		body: "A finished project shows Completed in green, plus the money it made. Numbers is the board. Notes is what you bring back."
	}
];
var PHASE_TIP = {
	payroll: "Phase 2 — The GM asks each first department head once. Payroll locks and is charged every round.",
	focus: "Phase 3 — Lock two open projects. You can only play on those two.",
	event: "The GM plays the one event that was dealt, then answers People & Principles.",
	cards: "Phase 4 — Three cards are open. The person up picks two.",
	principle: "Phase 5 — The person up answers People & Principles."
};
function PhaseTip({ step }) {
	const line = PHASE_TIP[step];
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!line) {
			setShow(false);
			return;
		}
		const key = `bmg-phase-tip:${step}`;
		try {
			if (sessionStorage.getItem(key) === "1") {
				setShow(false);
				return;
			}
			sessionStorage.setItem(key, "1");
		} catch {}
		setShow(true);
	}, [step, line]);
	if (!show || !line) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-3 rounded-xl border border-gold px-3 py-2 text-sm text-cream",
		children: line
	});
}
function PhaseDeck({ index, setIndex, onClose }) {
	const card = PHASE_CARDS[index] ?? PHASE_CARDS[0];
	const last = index >= PHASE_CARDS.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: `${index + 1} of ${PHASE_CARDS.length}`,
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl text-cream",
				children: card.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-cream",
				children: card.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [index > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "ghost",
					className: "flex-1",
					onClick: () => setIndex(index - 1),
					children: "Back"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "flex-1",
					onClick: () => last ? onClose() : setIndex(index + 1),
					children: last ? "Start" : "Next"
				})]
			})
		]
	});
}
function HelpTab({ game, setErr, onPhases }) {
	const open = game.view.help.find((h) => h.status !== "done");
	const [note, setNote] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-cream",
				children: "How to play"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Six short phases. The same cards open for the whole department. Only the person up submits."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				className: "mt-3 w-full",
				onClick: onPhases,
				children: "Open the phases"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl text-cream",
			children: "Ask the GM"
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold text-cream",
				children: open.status === "open" ? "Sent" : open.status === "ack" ? "GM is on it" : "Resolved"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-muted",
				children: open.note
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value: note,
			onChange: (e) => setNote(e.target.value),
			placeholder: "What do you need?",
			className: "mt-3 min-h-24 w-full rounded-xl border border-line bg-card px-3 py-3 text-base"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			className: "mt-3 w-full",
			onClick: () => {
				game.player("help", { note }).then((res) => {
					if (!res.ok) setErr(res.error);
					else setNote("");
				});
			},
			children: "Send help request"
		})] })] })]
	});
}
function MoreTab({ code, game, setErr }) {
	const view = game.view;
	const [experience, setExperience] = (0, import_react.useState)(view.ownFeedback?.experience ?? 0);
	const [nps, setNps] = (0, import_react.useState)(view.ownFeedback?.nps ?? -1);
	const [quote, setQuote] = (0, import_react.useState)(view.ownFeedback?.quote ?? "");
	const [consent, setConsent] = (0, import_react.useState)(Boolean(view.ownFeedback?.consent));
	const [nextRole, setNextRole] = (0, import_react.useState)(view.ownFeedback?.nextRole ?? "");
	const showFeedback = view.status === "post" || view.status === "done" || view.status === "audit";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportPanel, {
				view,
				focusId: view.mine?.playerId
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/me",
				className: "mt-3 inline-block text-sm font-semibold text-gold",
				children: "Your profile, badges, and friends"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-cream",
				children: "How the money works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Eight rounds. Valuation is net profit times 3." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Win at ",
						money(view.settings.winCents),
						" with at least a 30% margin. Market Leader at ",
						money(view.settings.mlCents),
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A strong P&P answer saves $500 of that department's payroll. A partial saves $150. A weak answer saves nothing." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Card money changes revenue, never profit directly." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Each round the department is dealt 3 action cards and plays 2 of them onto a project." })
				]
			})] }),
			showFeedback ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "One minute of feedback"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "How was the Business Machine experience?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-5 gap-2",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setExperience(n),
						className: `min-h-11 touch-manipulation rounded-xl border font-semibold select-none ${experience === n ? "border-gold bg-gold text-navy" : "border-line"}`,
						children: n
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm font-semibold text-cream",
					children: "How likely are you to recommend the Business Machine experience to someone like you?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-6 gap-1",
					children: Array.from({ length: 11 }, (_, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setNps(n),
						className: `min-h-11 touch-manipulation rounded-lg border text-sm font-semibold select-none ${nps === n ? "border-gold bg-gold text-navy" : "border-line"}`,
						children: n
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: quote,
					onChange: (e) => setQuote(e.target.value),
					placeholder: "Optional sentence",
					className: "mt-3 min-h-20 w-full rounded-xl border border-line px-3 py-3 text-base"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 flex items-start gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: consent,
						onChange: (e) => setConsent(e.target.checked)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The GM may read this sentence back to the room." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					className: "mt-3",
					value: nextRole,
					onChange: (e) => setNextRole(e.target.value),
					"aria-label": "Next role",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Where do you want to go next?"
					}), NEXT_ROLES.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: role }, role))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-3 w-full",
					onClick: () => {
						game.player("feedback", {
							experience,
							nps,
							quote,
							consent,
							nextRole
						}).then((res) => {
							if (!res.ok) setErr(res.error);
						});
					},
					children: "Save feedback"
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: "This phone"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Leave the seat on this device. The GM can seat you again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "ghost",
					className: "mt-3 w-full",
					onClick: () => {
						clearPlayer(code);
					},
					children: "Leave this seat"
				})
			] })
		]
	});
}
function PlayPage() {
	const { code } = Route$3.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayView, { code: code.toUpperCase() });
}
//#endregion
export { PlayPage as component };
