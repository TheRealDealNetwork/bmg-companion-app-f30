import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as money, o as pct } from "./format-DkJBbT9C.mjs";
import { K as useGame, a as ClockReadout } from "./ui-TaOKJTPB.mjs";
import { r as Route$2 } from "./router-BUNHsq7S.mjs";
import { o as PHASES } from "./types-D1bYXzt9.mjs";
import { n as ProjectBoard, t as BoardCue } from "./board-CydjMLqt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/room-BgxBqz7D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BEATS = [
	"Live board",
	"The result",
	"Round by round",
	"Departments",
	"Principles",
	"Honors",
	"Shout-outs",
	"Check your phones"
];
function RoomView({ code }) {
	const game = useGame(code, "room");
	const view = game.view;
	const [pulse, setPulse] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!view) return;
		setPulse(true);
		const id = window.setTimeout(() => setPulse(false), 600);
		return () => window.clearTimeout(id);
	}, [view?.rev]);
	if (!view) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-navy px-6 text-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl",
			children: game.loading ? "Opening the room…" : game.error || "Finding the game…"
		})
	});
	const beat = view.showBeat;
	const ceremony = beat > 0 && view.status !== "lobby";
	const phase = PHASES.find((p) => p.n === view.phase)?.label ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-navy px-6 py-6 text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo-tlp.png",
						alt: "",
						className: "h-14 w-auto rounded-full bg-cream"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl leading-none",
						children: view.company
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-gold",
						children: [
							view.rehearsal ? "Rehearsal · " : "",
							view.status === "live" ? `Round ${view.round} of ${view.settings.rounds} · ${phase}` : label(view.status),
							ceremony ? ` · ${BEATS[beat]}` : ""
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockReadout, {
						timers: view.timers,
						serverNow: view.serverNow,
						which: view.status === "live" ? "round" : "game",
						warnAt: 60,
						className: `font-display text-6xl leading-none tabular-nums ${pulse ? "opacity-80" : ""}`,
						calmClass: "text-cream"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gold",
						children: view.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Game",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockReadout, {
								timers: view.timers,
								serverNow: view.serverNow,
								which: "game",
								className: "text-sm",
								calmClass: "text-gold"
							})
						] }) : "Valuation × 3"
					})]
				})]
			}),
			view.announcement ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-4 max-w-6xl rounded-2xl bg-gold px-4 py-3 text-lg font-semibold text-navy",
				children: view.announcement
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-6 max-w-6xl",
				children: [
					ceremony && beat === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, { view }) : null,
					ceremony && beat === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rounds, { view }) : null,
					ceremony && beat === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Depts, { view }) : null,
					ceremony && beat === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Principles, { view }) : null,
					ceremony && beat === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Honors, { view }) : null,
					ceremony && beat === 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shouts, { view }) : null,
					ceremony && beat === 7 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "py-16 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-5xl",
							children: "Check your phones"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-xl text-xl text-gold",
							children: "Three questions, a rating, and an optional sentence. It takes less than a minute."
						})]
					}) : null,
					!ceremony ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Live, { view }) : null
				]
			})
		]
	});
}
function label(status) {
	if (status === "audit") return "Final audit";
	if (status === "post") return "Post-game";
	if (status === "done") return "Closed";
	if (status === "lobby") return "Lobby";
	return status;
}
function Live({ view }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[1.2fr_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-3xl bg-navy-2 p-6 text-cream lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardCue, { view })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectBoard, {
					projects: view.projects,
					wide: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl bg-navy-2 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold tracking-widest text-gold uppercase",
						children: "Valuation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-7xl leading-none text-gold",
						children: money(view.board.valuation)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-3 text-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Revenue ", money(view.board.revenue)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Profit ", money(view.board.profit)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Margin ", pct(view.board.margin)] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
							on: view.board.win,
							children: ["Win ", money(view.settings.winCents)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
							on: view.board.marketLeader,
							children: ["Market Leader ", money(view.settings.mlCents)]
						})]
					}),
					view.events[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border-t border-cream/20 pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold tracking-widest text-gold uppercase",
								children: "Event"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl",
								children: view.events[0].name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-xl text-cream/90",
								children: view.events[0].text
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl bg-navy-2 p-6 text-cream",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Departments"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3",
					children: view.board.depts.map((d) => {
						const head = view.heads.find((h) => h.dept === d.dept);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between gap-3 border-b border-line pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: d.dept
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: head ? `Up ${head.name}` : "No players yet"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tabular-nums",
								children: money(d.profit)
							})]
						}, d.dept);
					})
				})]
			})
		]
	});
}
function Result({ view }) {
	const title = view.board.marketLeader ? "Market Leader" : view.board.win ? "Win" : "Short of the mark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold tracking-widest text-gold uppercase",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-8xl text-gold",
				children: money(view.board.valuation)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-2xl",
				children: [
					"Profit ",
					money(view.board.profit),
					" · Margin ",
					pct(view.board.margin),
					" · Revenue ",
					money(view.board.revenue)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-gold",
				children: [
					"Net profit × 3. Margin qualifier ",
					Math.round(view.settings.marginBps / 100),
					"%."
				]
			})
		]
	});
}
function Rounds({ view }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-4xl",
		children: "Round by round"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 grid grid-cols-2 gap-3 md:grid-cols-4",
		children: view.board.rounds.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-navy-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-gold",
					children: ["Round ", r.round]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl",
					children: money(r.profit)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-cream/80",
					children: ["Revenue ", money(r.revenue)]
				})
			]
		}, r.round))
	})] });
}
function Depts({ view }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-4xl",
		children: "Departments"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 grid gap-3 md:grid-cols-2",
		children: view.board.depts.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between rounded-2xl bg-navy-2 px-4 py-4 text-cream",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: d.dept
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Revenue ",
					money(d.revenue),
					" · Payroll ",
					money(d.netPay)
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl tabular-nums",
				children: money(d.profit)
			})]
		}, d.dept))
	})] });
}
function Principles({ view }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-4xl",
		children: "Principles"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 grid gap-3 md:grid-cols-2",
		children: view.principles.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center justify-between rounded-2xl bg-navy-2 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-3xl text-gold",
				children: item.count
			})]
		}, item.name))
	})] });
}
function Honors({ view }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-4xl",
		children: "Honors"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 space-y-3",
		children: view.honors.map((honor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-2xl bg-navy-2 px-4 py-4 text-cream",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: honor.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: honor.detail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-semibold",
					children: honor.names.join(", ") || "—"
				})
			]
		}, honor.id))
	})] });
}
function Shouts({ view }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-4xl",
		children: "Shout-outs"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 space-y-3",
		children: view.shoutouts.map((shout) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-2xl bg-navy-2 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-2xl",
				children: [
					shout.fromName,
					" → ",
					shout.toName
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-gold",
				children: shout.principle
			})]
		}, shout.id))
	})] });
}
function Mark({ on, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full px-3 py-1 text-sm font-semibold ${on ? "bg-gold text-navy" : "bg-white/10 text-cream"}`,
		children
	});
}
function RoomPage() {
	const { code } = Route$2.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomView, { code: code.toUpperCase() });
}
//#endregion
export { RoomPage as component };
