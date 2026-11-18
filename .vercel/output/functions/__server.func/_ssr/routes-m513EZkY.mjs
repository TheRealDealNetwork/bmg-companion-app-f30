import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as money, o as pct } from "./format-DkJBbT9C.mjs";
import { B as resumeHost, D as loadInsights, E as listGames, F as readProfileSession, G as setProfileRank, I as readSlot, J as writeSlot, R as removeHost, W as setAdminToken, c as Field, d as Select, h as askInsights, l as ProfileBlock, m as adminToken, n as Btn, p as addHost, r as Card, t as BrandBar, x as deleteGame, y as createGame, z as resetGame } from "./ui-TaOKJTPB.mjs";
import { f as readSeat } from "./router-BUNHsq7S.mjs";
import { o as PHASES, r as BOARD_DEPTS } from "./types-D1bYXzt9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-m513EZkY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InsightsPanel() {
	const [code, setCode] = (0, import_react.useState)("");
	const [dept, setDept] = (0, import_react.useState)("");
	const [person, setPerson] = (0, import_react.useState)("");
	const [rehearsal, setRehearsal] = (0, import_react.useState)(false);
	const [data, setData] = (0, import_react.useState)(null);
	const [question, setQuestion] = (0, import_react.useState)("");
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	async function run() {
		setBusy(true);
		setErr("");
		const res = await loadInsights({ data: {
			adminToken: adminToken(),
			profileSecret: readProfileSession()?.secret ?? "",
			code,
			dept,
			person,
			includeRehearsal: rehearsal
		} });
		setBusy(false);
		if (!res.ok) return;
		setData(res.insights);
	}
	async function ask() {
		setBusy(true);
		setErr("");
		const res = await askInsights({ data: {
			adminToken: adminToken(),
			profileSecret: readProfileSession()?.secret ?? "",
			question,
			code,
			dept,
			person,
			includeRehearsal: rehearsal
		} });
		setBusy(false);
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		setAnswer(res.answer);
	}
	const max = Math.max(1, ...data?.byDept.map((d) => d.best + d.partial + d.weak) ?? [1]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Game code",
						value: code,
						onChange: (e) => setCode(e.target.value.toUpperCase()),
						placeholder: "One game code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"aria-label": "Department",
						value: dept,
						onChange: (e) => setDept(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All departments"
						}), BOARD_DEPTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Person",
						value: person,
						onChange: (e) => setPerson(e.target.value),
						placeholder: "A person's name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => void run(),
						children: busy ? "Reading…" : "Pull the record"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: rehearsal,
					onChange: (e) => setRehearsal(e.target.checked)
				}), "Include rehearsals"]
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-orange-ink",
				children: err
			}) : null,
			data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							k: "Games",
							v: String(data.games)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							k: "Win rate",
							v: pct(data.winRate)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							k: "Avg valuation",
							v: money(data.avgValuation)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							k: "Best / weak",
							v: `${data.bestAnswers} / ${data.weakAnswers}`
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl text-cream",
					children: "Judgment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2",
					children: data.byDept.map((deptRow) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: deptRow.dept }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [pct(deptRow.rate), " best"] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex h-2 overflow-hidden rounded-full bg-navy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-gold",
								style: { width: `${deptRow.best / max * 100}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-stage-sale",
								style: { width: `${deptRow.partial / max * 100}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-stage-star",
								style: { width: `${deptRow.weak / max * 100}%` }
							})
						]
					})] }, deptRow.dept))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
						title: "Best performers",
						lines: data.whyBest
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
						title: "Lowest performers",
						lines: data.whyLow
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
					title: "Who shows up, and why",
					lines: data.characteristics
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
					title: "Lessons across games",
					lines: data.lessons
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs tracking-wide text-muted uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1 pr-3",
									children: "Person"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1 pr-3",
									children: "Roles"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1 pr-3",
									children: "Games"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1 pr-3",
									children: "Wins"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1",
									children: "Best rate"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.people.slice(0, 40).map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2 pr-3 text-cream",
									children: [person.name, person.trades ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-xs text-muted",
										children: [person.trades, person.company ? ` · ${person.company}` : ""]
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3",
									children: person.roles.join(", ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3",
									children: person.games
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3",
									children: person.wins
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2",
									children: pct(person.rate)
								})
							]
						}, person.key)) })]
					})
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Pull the record for every game on this GM key, or narrow it to one game, one department, or one person."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl text-cream",
					children: "Ask for a report"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "The answer is written from the games in this filter. It does not invent scores."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: question,
					onChange: (e) => setQuestion(e.target.value),
					placeholder: "Who is judging well in Sales, and what should the low performers practice?",
					className: "mt-2 min-h-24 w-full rounded-xl border border-line bg-navy-2 px-3 py-3 text-base text-cream"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-2",
					onClick: () => void ask(),
					children: busy ? "Writing…" : "Write the report"
				}),
				answer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink",
					children: answer
				}) : null
			] })
		]
	});
}
function Stat$1({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-navy-2 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs tracking-wide text-muted uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-display text-xl text-cream",
			children: v
		})]
	});
}
function Note({ title, lines }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "font-display text-xl text-cream",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-1 list-disc space-y-1 pl-5 text-sm text-ink",
		children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
	})] });
}
var STATUS = {
	lobby: "Not started",
	live: "In progress",
	audit: "Scoring",
	post: "Post-game",
	done: "Finished"
};
function ago(iso) {
	const then = new Date(iso).getTime();
	if (!Number.isFinite(then)) return "";
	const mins = Math.max(0, Math.round((Date.now() - then) / 6e4));
	if (mins < 1) return "just now";
	if (mins < 60) return `${mins} min ago`;
	const hours = Math.round(mins / 60);
	if (hours < 36) return `${hours} hr ago`;
	return new Date(iso).toLocaleDateString();
}
function Home() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const saved = readSeat();
		if (saved && saved.dept !== "General Manager") navigate({
			to: "/soebld/play",
			search: { seat: saved.id }
		});
	}, [navigate]);
	const [company, setCompany] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [rehearsal, setRehearsal] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [opening, setOpening] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [games, setGames] = (0, import_react.useState)(null);
	const [deskOpen, setDeskOpen] = (0, import_react.useState)(false);
	const [deskDraft, setDeskDraft] = (0, import_react.useState)("");
	const [tick, setTick] = (0, import_react.useState)(0);
	const [pending, setPending] = (0, import_react.useState)(null);
	const [hostFor, setHostFor] = (0, import_react.useState)("");
	const [hostName, setHostName] = (0, import_react.useState)("");
	const [issued, setIssued] = (0, import_react.useState)(null);
	const [acting, setActing] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("games");
	const [rank, setRank] = (0, import_react.useState)("player");
	const [staffName, setStaffName] = (0, import_react.useState)("");
	const [staffRank, setStaffRank] = (0, import_react.useState)("host");
	const [staffNote, setStaffNote] = (0, import_react.useState)("");
	const [authed, setAuthed] = (0, import_react.useState)(() => Boolean(readProfileSession()));
	function secret() {
		return readProfileSession()?.secret ?? "";
	}
	(0, import_react.useEffect)(() => {
		const sync = () => setAuthed(Boolean(readProfileSession()));
		window.addEventListener("bm-session", sync);
		return () => window.removeEventListener("bm-session", sync);
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			const raw = sessionStorage.getItem("bm-host-key");
			if (!raw) return;
			const saved = JSON.parse(raw);
			if (saved.code && saved.key && saved.label) {
				setIssued({
					code: saved.code,
					key: saved.key,
					label: saved.label
				});
				setHostFor(saved.code);
			}
		} catch {
			sessionStorage.removeItem("bm-host-key");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		let stop = false;
		async function load() {
			try {
				const res = await listGames({ data: {
					adminToken: adminToken(),
					profileSecret: secret()
				} });
				if (!stop && res.ok) {
					setGames(res.games);
					setRank(res.rank);
				}
			} catch {
				if (!stop) setGames([]);
			}
		}
		load();
		const id = window.setInterval(() => void load(), 4e3);
		return () => {
			stop = true;
			window.clearInterval(id);
		};
	}, [deskOpen, tick]);
	async function host() {
		setBusy(true);
		setErr("");
		try {
			const res = await createGame({ data: {
				company,
				rehearsal,
				adminToken: adminToken(),
				profileSecret: secret()
			} });
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			writeSlot(res.code, { hostToken: res.hostToken });
			await navigate({
				to: "/g/$code/host",
				params: { code: res.code }
			});
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not open the game.");
		} finally {
			setBusy(false);
		}
	}
	async function openGame(gameCode) {
		setOpening(gameCode);
		setErr("");
		try {
			const resumed = await resumeHost({ data: {
				code: gameCode,
				adminToken: adminToken(),
				hostToken: readSlot(gameCode).hostToken,
				profileSecret: secret()
			} });
			if (!resumed.ok) {
				setErr(resumed.error);
				return;
			}
			writeSlot(gameCode, { hostToken: resumed.hostToken });
			await navigate({
				to: "/g/$code/host",
				params: { code: gameCode }
			});
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not open that game.");
		} finally {
			setOpening("");
		}
	}
	async function manage(action, gameCode) {
		setActing(gameCode);
		setErr("");
		try {
			const res = await (action === "reset" ? resetGame : deleteGame)({ data: {
				code: gameCode,
				adminToken: adminToken(),
				profileSecret: secret()
			} });
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			setPending(null);
			setTick((n) => n + 1);
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not update that game.");
		} finally {
			setActing("");
		}
	}
	async function createHost(gameCode) {
		setActing(gameCode);
		setErr("");
		try {
			const res = await addHost({ data: {
				code: gameCode,
				adminToken: adminToken(),
				label: hostName,
				profileSecret: secret()
			} });
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			setIssued({
				code: gameCode,
				key: res.key,
				label: res.label
			});
			sessionStorage.setItem("bm-host-key", JSON.stringify({
				code: gameCode,
				key: res.key,
				label: res.label
			}));
			setHostName("");
			setTick((n) => n + 1);
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not add that host.");
		} finally {
			setActing("");
		}
	}
	async function dropHost(gameCode, adminId) {
		setActing(gameCode);
		setErr("");
		try {
			const res = await removeHost({ data: {
				code: gameCode,
				adminToken: adminToken(),
				adminId,
				profileSecret: secret()
			} });
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			setTick((n) => n + 1);
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not remove that host.");
		} finally {
			setActing("");
		}
	}
	async function assignStaff() {
		setActing("staff");
		setErr("");
		setStaffNote("");
		try {
			const res = await setProfileRank({ data: {
				adminToken: adminToken(),
				profileSecret: secret(),
				username: staffName,
				rank: staffRank
			} });
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			setStaffNote(`${res.username} is now ${res.label}.`);
			setStaffName("");
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not update that profile.");
		} finally {
			setActing("");
		}
	}
	if (!authed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrontDoor, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-navy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandBar, { light: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold tracking-widest text-gold uppercase",
						children: "School of Entrepreneurship"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-5xl leading-tight text-cream sm:text-6xl",
						children: "The Business Machine"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-lg leading-relaxed text-ink",
						children: "The board stays on the table. Phones answer the People & Principles cards, the host runs the clocks and the money, and the projector shows one company score."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/soebld",
						className: "mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-gold px-5 text-sm font-semibold text-navy",
						children: "SOEBLD"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 grid grid-cols-3 gap-3 max-w-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Rounds",
								v: "8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Win",
								v: "$100k"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Leader",
								v: "$250k"
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-cream",
						children: rank === "super" ? "Super Admin" : rank === "host" ? "Host Admin" : "Host the room"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-3 block text-sm font-semibold text-muted",
						htmlFor: "company",
						children: "Company name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "company",
						value: company,
						onChange: (e) => setCompany(e.target.value),
						placeholder: "Apex Home Services"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 flex items-center gap-2 text-sm text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: rehearsal,
							onChange: (e) => setRehearsal(e.target.checked)
						}), "Rehearsal — label it so it is not a live cohort"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "mt-4 w-full",
						disabled: busy,
						onClick: () => void host(),
						children: busy ? "Opening…" : rank === "player" ? "Open control room" : "Open control room"
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-orange-ink",
						children: err
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-5 h-px bg-line" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-cream",
						children: "Join with a code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							value: code,
							onChange: (e) => setCode(e.target.value.toUpperCase()),
							placeholder: "ABC123",
							"aria-label": "Game code",
							maxLength: 8
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "navy",
							onClick: () => {
								const cleaned = code.replace(/[^A-Z0-9]/gi, "").toUpperCase();
								if (cleaned.length < 4) {
									setErr("Enter the six-character code.");
									return;
								}
								window.location.href = `/g/${cleaned}/join`;
							},
							children: "Join"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `min-h-10 rounded-full px-4 text-sm font-semibold ${tab === "games" ? "bg-gold text-navy" : "bg-navy-2 text-cream"}`,
								onClick: () => setTab("games"),
								children: "Games"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `min-h-10 rounded-full px-4 text-sm font-semibold ${tab === "insights" ? "bg-gold text-navy" : "bg-navy-2 text-cream"}`,
								onClick: () => setTab("insights"),
								children: "Insights"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/me",
								className: "min-h-10 rounded-full bg-navy-2 px-4 py-2 text-sm font-semibold text-cream",
								children: "Player profile"
							})
						]
					}), tab === "insights" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightsPanel, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-end justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl text-cream",
								children: rank === "super" ? "All games" : "Your games"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: rank === "super" ? "Super Admin sees every game. Host Admins only see the games under them. GM is a seat in the game, not this desk." : rank === "host" ? "These are the games under your Host Admin profile. Reset and delete stay on your games. A GM at the table cannot open this desk." : "A Host Admin profile, or the Super Admin key, is required to run games. The GM seat plays the round. It does not run the desk."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-sm font-semibold text-cream underline",
								onClick: () => setDeskOpen((v) => !v),
								children: deskOpen ? "Hide key" : rank === "host" ? "Host Admin key" : "Super Admin key"
							})]
						}),
						deskOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 rounded-xl bg-navy-2 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-ink",
									children: "This key is how this browser finds your games after an update. Copy it before you switch computers. A Host Admin key for one game is separate."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
										kind: "navy",
										onClick: () => void navigator.clipboard?.writeText(adminToken()),
										children: [
											"Copy ",
											rank === "host" ? "Host Admin" : "Super Admin",
											" key"
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mt-3 block text-sm font-semibold text-muted",
									htmlFor: "desk-key",
									children: "Paste a Super Admin key or a Host Admin key"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "desk-key",
										value: deskDraft,
										onChange: (e) => setDeskDraft(e.target.value),
										autoComplete: "off",
										spellCheck: false
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										kind: "ghost",
										onClick: () => {
											if (!setAdminToken(deskDraft)) {
												setErr("That key is too short.");
												return;
											}
											setDeskDraft("");
											setDeskOpen(false);
											setTick((n) => n + 1);
										},
										children: "Use key"
									})]
								})
							]
						}) : null,
						rank === "super" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl bg-navy-2 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-cream",
									children: "Staff profiles"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: "A Host Admin runs the games under their name. Super Admin can open every game, the reports, and this list. The GM seat is not a staff role."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											"aria-label": "Staff username",
											value: staffName,
											onChange: (e) => setStaffName(e.target.value),
											placeholder: "Their username"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											"aria-label": "Staff role",
											value: staffRank,
											onChange: (e) => setStaffRank(e.target.value),
											className: "min-h-11 rounded-xl border border-line bg-card px-3 text-sm text-cream",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "host",
													children: "Host Admin"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "super",
													children: "Super Admin"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "player",
													children: "Player"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
											kind: "navy",
											disabled: acting === "staff",
											onClick: () => void assignStaff(),
											children: acting === "staff" ? "Saving…" : "Save role"
										})
									]
								}),
								staffNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-gold",
									children: staffNote
								}) : null
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: games === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted",
								children: "Loading games…"
							}) : games.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted",
								children: "No games on this desk yet. Games stay saved when the site is updated. On a new computer, paste the Super Admin key."
							}) : games.map((game) => {
								const phase = PHASES.find((p) => p.n === game.phase)?.label ?? "";
								const ask = pending?.code === game.code ? pending.action : null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-2xl border border-line bg-navy-2 px-4 py-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-display text-xl text-cream",
												children: [game.company, game.rehearsal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-2 text-sm font-semibold text-orange",
													children: "Rehearsal"
												}) : null]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-sm text-muted",
												children: [
													game.code,
													" · ",
													game.players,
													" seated · ",
													ago(game.updatedAt),
													game.owned ? "" : " · not locked to this desk yet"
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `text-sm font-bold ${game.status === "live" ? "text-orange" : "text-cream"}`,
													children: STATUS[game.status] ?? game.status
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-sm text-muted",
													children: [
														"Round ",
														game.round,
														game.status === "live" || game.status === "audit" ? ` · ${phase}` : ""
													]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex flex-wrap gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
													kind: "navy",
													disabled: opening === game.code || acting === game.code,
													onClick: () => void openGame(game.code),
													children: opening === game.code ? "Opening…" : "Open"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
													kind: "ghost",
													disabled: acting === game.code,
													onClick: () => setPending({
														code: game.code,
														action: "reset"
													}),
													children: "Reset"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
													kind: "ghost",
													disabled: acting === game.code,
													onClick: () => setPending({
														code: game.code,
														action: "delete"
													}),
													children: "Delete"
												}),
												rank === "super" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
													kind: "ghost",
													onClick: () => {
														setHostFor((current) => current === game.code ? "" : game.code);
														setIssued(null);
													},
													children: "Host Admins"
												}) : null
											]
										}),
										ask ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 rounded-xl bg-navy-2 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-ink",
												children: ask === "reset" ? "Reset this game? The code stays. The board, roster, and log clear." : "Delete this game? It leaves this desk. Other games stay."
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
													kind: "primary",
													disabled: acting === game.code,
													onClick: () => void manage(ask, game.code),
													children: acting === game.code ? "Working…" : ask === "reset" ? "Reset this game" : "Delete this game"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
													kind: "ghost",
													onClick: () => setPending(null),
													children: "Cancel"
												})]
											})]
										}) : null,
										hostFor === game.code ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 rounded-xl bg-navy-2 p-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-sm font-semibold text-cream",
													children: ["Host Admins for ", game.code]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													className: "mt-2 space-y-1",
													children: game.hosts.length ? game.hosts.map((host) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-center justify-between gap-2 text-sm",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [host.label, host.yours ? " · this desk" : ""] }), host.yours ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															className: "text-sm font-semibold text-cream underline",
															onClick: () => void dropHost(game.code, host.id),
															children: "Remove"
														})]
													}, host.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
														className: "text-sm text-muted",
														children: "No Host Admins yet."
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "mt-3 block text-sm font-semibold text-muted",
													htmlFor: `host-${game.code}`,
													children: "Host Admin name"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-1 flex gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														id: `host-${game.code}`,
														value: hostName,
														onChange: (e) => setHostName(e.target.value),
														placeholder: "Alex"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
														kind: "navy",
														disabled: acting === game.code,
														onClick: () => void createHost(game.code),
														children: "Create key"
													})]
												}),
												issued?.code === game.code ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-sm text-ink",
															children: [
																"Send this key to ",
																issued.label,
																". They paste it under Super Admin key on their computer. It opens only the games you add them to. It is shown only now."
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-2 break-all rounded-lg bg-card px-3 py-2 font-mono text-sm text-cream",
															children: issued.key
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
															kind: "ghost",
															className: "mt-2",
															onClick: () => void navigator.clipboard?.writeText(issued.key),
															children: "Copy host key"
														})
													]
												}) : null
											]
										}) : null
									]
								}, game.code);
							})
						})
					] })]
				})
			]
		})]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-gold/40 bg-navy-2 px-3 py-3 text-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] font-semibold tracking-wider text-gold uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: v
		})]
	});
}
function FrontDoor() {
	const [login, setLogin] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center bg-navy",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-sm px-4 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logo-tlp.png",
					alt: "The School of Entrepreneurship, Trades Leadership Program",
					className: "mx-auto h-auto w-full rounded-2xl"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/soebld",
						className: "inline-flex min-h-12 items-center justify-center rounded-xl bg-gold px-5 text-sm font-semibold text-navy",
						children: "SOEBLD"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex min-h-12 items-center justify-center rounded-xl border border-gold bg-transparent px-5 text-sm font-semibold text-gold",
						onClick: () => setLogin((open) => !open),
						children: "INICIAR SESIÓN"
					})]
				}),
				login ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileBlock, {
						start: "return",
						onReady: () => void 0
					})
				}) : null
			]
		})
	});
}
//#endregion
export { Home as component };
