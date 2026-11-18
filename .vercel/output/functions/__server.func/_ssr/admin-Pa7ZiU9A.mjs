import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as Field, d as Select, n as Btn, r as Card } from "./ui-TaOKJTPB.mjs";
import { n as METALCON_SEAT_LABEL, t as METALCON_SEATS } from "./seats-BHNQe8_4.mjs";
import { E as endGame, G as resetPassword, O as exportGame, R as placePlayer, U as reopenGame, W as resetGame, Y as sendSeatLink, Z as setBasePayroll, at as setShareSeat, ct as startGame, et as setFixedCost, g as adminEnter, h as adminDesk, k as exportHostLeads, ot as setSignup, w as createHost, y as changeAdminPassword } from "./router-BUNHsq7S.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Pa7ZiU9A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var KEY = "soe-metalcon-admin";
function store(op, value = "") {
	try {
		if (op === "get") return sessionStorage.getItem(KEY) ?? "";
		if (op === "set") sessionStorage.setItem(KEY, value);
		else sessionStorage.removeItem(KEY);
	} catch {}
	return "";
}
function fileOf(value) {
	if (!value || typeof value !== "object") return null;
	const row = value;
	if (typeof row.filename !== "string" || typeof row.csv !== "string") return null;
	return {
		filename: row.filename,
		csv: row.csv
	};
}
function saveCsv(filename, csv) {
	const blob = new Blob([csv], { type: "text/csv" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}
function AdminPage() {
	const [token, setToken] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [resetMode, setResetMode] = (0, import_react.useState)(false);
	const [desk, setDesk] = (0, import_react.useState)(null);
	const [gameId, setGameId] = (0, import_react.useState)("");
	const [eventName, setEventName] = (0, import_react.useState)("The Business Machine Experience");
	const [actionMode, setActionMode] = (0, import_react.useState)("digital");
	const [err, setErr] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [seatLink, setSeatLink] = (0, import_react.useState)("");
	const [gmLink, setGmLink] = (0, import_react.useState)("");
	const [curPass, setCurPass] = (0, import_react.useState)("");
	const [newPass, setNewPass] = (0, import_react.useState)("");
	const [confirmPass, setConfirmPass] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [playerEmail, setPlayerEmail] = (0, import_react.useState)("");
	const [dept, setDept] = (0, import_react.useState)(METALCON_SEATS[0]);
	const [hostName, setHostName] = (0, import_react.useState)("");
	const [hostEmail, setHostEmail] = (0, import_react.useState)("");
	const [hostPassword, setHostPassword] = (0, import_react.useState)("");
	const [fixedAmount, setFixedAmount] = (0, import_react.useState)("2000");
	const [fixedRound, setFixedRound] = (0, import_react.useState)("3");
	const [payrollBase, setPayrollBase] = (0, import_react.useState)("3200");
	const [qr, setQr] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		document.title = "SOEBLD host";
		const saved = store("get");
		if (saved && saved !== "undefined" && saved !== "null") setToken(saved);
		else if (saved) store("del");
	}, []);
	async function load(next = token) {
		if (!next) return;
		const res = await adminDesk({ data: { token: next } });
		if (!res.ok) {
			store("del");
			setToken("");
			setDesk(null);
			setErr(res.error);
			return;
		}
		setDesk(res);
		setGameId((current) => res.games.some((game) => game.id === current) ? current : res.games.find((game) => game.status === "live")?.id ?? res.games[0]?.id ?? "");
	}
	(0, import_react.useEffect)(() => {
		if (!token) return;
		load(token);
	}, [token]);
	const game = desk?.games.find((item) => item.id === gameId) ?? null;
	const seated = (desk?.players ?? []).filter((player) => player.game_id === gameId);
	(0, import_react.useEffect)(() => {
		if (!game?.slug) {
			setQr("");
			return;
		}
		const url = `${window.location.origin}/soebld/join/${game.slug}`;
		import_lib.toDataURL(url, {
			margin: 1,
			width: 480,
			color: {
				dark: "#0c1230",
				light: "#f6f1e4"
			}
		}).then(setQr);
	}, [game?.slug]);
	async function enter() {
		setBusy(true);
		setErr("");
		if (resetMode) {
			const res = await resetPassword({ data: { email } });
			setBusy(false);
			setErr(res.ok ? "Check your email for a temporary password." : res.error);
			if (res.ok) setResetMode(false);
			return;
		}
		try {
			const res = await adminEnter({ data: {
				password,
				email
			} });
			if (res instanceof Response) {
				setBusy(false);
				setErr(`Sign-in failed (HTTP ${res.status}, ${res.headers.get("content-type") ?? "no type"}). Reload the page and try again.`);
				return;
			}
			const r = res;
			if (!r || r.ok !== true || typeof r.token !== "string" || !r.token) {
				setBusy(false);
				setErr(r?.error || "Login failed. Check the password.");
				return;
			}
			setBusy(false);
			store("set", r.token);
			setPassword("");
			setToken(r.token);
		} catch (e) {
			setBusy(false);
			setErr(e instanceof Error ? e.message : "Server error. Try again.");
		}
	}
	async function openGame() {
		if (!token) return;
		setBusy(true);
		setErr("");
		setNote("");
		const res = await startGame({ data: {
			token,
			eventName,
			actionMode
		} });
		setBusy(false);
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		setNote(`Game ${res.n} is open at /soebld/join/${res.slug}`);
		await load();
	}
	async function closeGame() {
		if (!game) return;
		if (!window.confirm(`Close ${game.slug}? The file downloads, and every seat for this game stops working. Other games stay open.`)) return;
		setBusy(true);
		setErr("");
		const res = await endGame({ data: {
			token,
			gameId: game.id
		} });
		setBusy(false);
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		const file = fileOf(res);
		if (file) saveCsv(file.filename, file.csv);
		setNote(`${game.slug} is closed.`);
		await load();
	}
	async function reopen() {
		if (!game) return;
		if (!window.confirm(`Reopen ${game.slug}? Sign-up stays closed until you turn it on. Johnny is notified.`)) return;
		setBusy(true);
		const res = await reopenGame({ data: {
			token,
			gameId: game.id
		} });
		setBusy(false);
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		setNote(`${game.slug} is open again. Sign-up is still closed.`);
		await load();
	}
	async function savePassword() {
		if (newPass !== confirmPass) {
			setErr("Passwords don't match.");
			return;
		}
		const res = await changeAdminPassword({ data: {
			token,
			current: curPass,
			next: newPass
		} });
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		setCurPass("");
		setNewPass("");
		setConfirmPass("");
		setNote("Admin password changed. Use the new one next time.");
	}
	async function issueGmLink(gameId) {
		setBusy(true);
		const res = await placePlayer({ data: {
			token,
			gameId,
			name: "GM",
			phone: "5555550100",
			email: "gm@game.local",
			dept: "General Manager"
		} });
		setBusy(false);
		if (res.ok) setGmLink(`${window.location.origin}/soebld/go?id=${res.player.id}&k=${res.player.token}`);
		else setErr(res.error);
	}
	async function place() {
		if (!game) return;
		setBusy(true);
		setErr("");
		const res = await placePlayer({ data: {
			token,
			gameId: game.id,
			name,
			phone,
			email: playerEmail,
			dept
		} });
		setBusy(false);
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		setName("");
		setPhone("");
		setPlayerEmail("");
		setNote(`${res.player.name} is seated in ${res.player.dept}.`);
		setSeatLink(`${window.location.origin}/soebld/go?id=${res.player.id}&k=${res.player.token}`);
		await load();
	}
	async function addHost() {
		setBusy(true);
		setErr("");
		const res = await createHost({ data: {
			token,
			name: hostName,
			email: hostEmail,
			password: hostPassword
		} });
		setBusy(false);
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		setHostName("");
		setHostEmail("");
		setHostPassword("");
		setNote("Host added. They sign in with that email and password.");
		await load();
	}
	if (!token) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-sm px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-widest text-gold uppercase",
				children: "The Business Machine Experience"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: "Host"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Email",
						placeholder: "Email, hosts only",
						value: email,
						onChange: (e) => setEmail(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						type: "password",
						"aria-label": "Password",
						placeholder: "Password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") enter();
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs text-gold",
						onClick: () => setResetMode(true),
						children: "Forgot password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Super admin leaves the email blank. A host uses the email they were given."
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-orange-ink",
						children: err
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "w-full",
						disabled: busy || password.length < 1,
						onClick: () => void enter(),
						children: "Open the host desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-[10px] text-cream/40",
						children: "build 0214-f29z.8"
					})
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-bold tracking-widest text-gold uppercase",
				children: [
					desk?.role === "super" ? "Super admin" : "Host",
					" · ",
					desk?.name
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: "Games"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Event name",
						value: eventName,
						onChange: (e) => setEventName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"aria-label": "Action cards",
						value: actionMode,
						onChange: (e) => setActionMode(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "digital",
							children: "Digital action cards"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "manual",
							children: "Manual action cards"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						disabled: busy,
						onClick: () => void openGame(),
						children: ["Start game ", desk?.nextNumber ?? 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "This does not close the other games. The link is dated and uses SOEBLD. The event name stays off the address."
					})
				]
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 break-all text-sm text-gold",
				children: note
			}) : null,
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-orange-ink",
				children: err
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: (desk?.games ?? []).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setGameId(item.id),
					className: `w-full rounded-2xl border px-3 py-3 text-left ${item.id === gameId ? "border-gold" : "border-line"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-semibold text-cream",
						children: [
							item.eventName,
							" · Game ",
							item.n,
							" · ",
							item.status
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							item.slug,
							" · ",
							item.hostName,
							" · ",
							item.players,
							" players"
						]
					})]
				}, item.id))
			}),
			game ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: game.eventName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 break-all text-xs text-gold",
						children: [
							"/soebld/join/",
							game.slug,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ml-2 rounded border border-gold px-2 py-0.5 text-[10px] text-gold",
								onClick: () => void navigator.clipboard.writeText(`${window.location.origin}/soebld/join/${game.slug}`),
								children: "Copy"
							})
						]
					}),
					qr && game.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: qr,
						alt: "QR code for this game",
						className: "mx-auto mt-3 w-full max-w-xs rounded-xl"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							game.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								kind: "navy",
								disabled: busy,
								onClick: () => void closeGame(),
								children: "End this game"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								kind: "ghost",
								disabled: busy || game.status !== "live",
								onClick: () => void issueGmLink(game.id),
								children: "GM link"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								disabled: busy,
								onClick: () => void reopen(),
								children: "Reopen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								kind: "ghost",
								disabled: busy || game.status !== "live",
								onClick: () => void resetGame({ data: {
									token,
									gameId: game.id
								} }).then(() => load()),
								children: "Reset answers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								kind: "ghost",
								disabled: busy,
								onClick: () => void exportGame({ data: {
									token,
									gameId: game.id
								} }).then((res) => {
									const file = fileOf(res);
									if (file) saveCsv(file.filename, file.csv);
									else if (!res.ok) setErr(res.error);
								}),
								children: "Download"
							})
						]
					}),
					game.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 flex items-start gap-3 text-sm text-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-5 accent-[#d4a05c]",
							checked: game.shareSeat,
							onChange: (e) => {
								setShareSeat({ data: {
									token,
									gameId: game.id,
									share: e.target.checked
								} }).then(() => load());
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Allow more than one player in the same seat." })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 flex items-start gap-3 text-sm text-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-5 accent-[#d4a05c]",
							checked: game.registrationOpen,
							onChange: (e) => {
								setSignup({ data: {
									token,
									gameId: game.id,
									open: e.target.checked
								} }).then(() => load());
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign-up is open. Turning this on exposes the deck to anyone with the link." })]
					})] }) : null,
					game.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-cream",
								children: "Fixed costs. Default $2,000 starting in round 3."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "Fixed cost",
								inputMode: "numeric",
								value: fixedAmount,
								onChange: (e) => setFixedAmount(e.target.value.replace(/\D/g, ""))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "Starting round",
								inputMode: "numeric",
								value: fixedRound,
								onChange: (e) => setFixedRound(e.target.value.replace(/\D/g, ""))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								kind: "navy",
								disabled: busy,
								onClick: () => void setFixedCost({ data: {
									token,
									gameId: game.id,
									amount: Number(fixedAmount),
									startRound: Number(fixedRound)
								} }).then((res) => setNote(res.ok ? "Fixed costs saved." : res.error)),
								children: "Save fixed costs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pt-2 text-sm text-cream",
								children: "Base payroll per department per round. Default $3,200, host can change. Charged for all 5 departments every round."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "Base payroll per department",
								inputMode: "numeric",
								value: payrollBase,
								onChange: (e) => setPayrollBase(e.target.value.replace(/\D/g, ""))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								kind: "navy",
								disabled: busy,
								onClick: () => void setBasePayroll({ data: {
									token,
									gameId: game.id,
									amount: Number(payrollBase)
								} }).then((res) => setNote(res.ok ? "Base payroll saved." : res.error)),
								children: "Save base payroll"
							})
						]
					}) : null
				]
			}) : null,
			game?.status === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: "Place a player"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								"aria-label": "Seat",
								value: dept,
								onChange: (e) => setDept(e.target.value),
								children: METALCON_SEATS.map((seat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: seat,
									children: METALCON_SEAT_LABEL[seat]
								}, seat))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "Name",
								placeholder: "Name",
								value: name,
								onChange: (e) => setName(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "Mobile",
								placeholder: "Mobile",
								value: phone,
								onChange: (e) => setPhone(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "Player email",
								placeholder: "Email",
								value: playerEmail,
								onChange: (e) => setPlayerEmail(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								className: "w-full",
								disabled: busy,
								onClick: () => void place(),
								children: "Seat them"
							}),
							seatLink ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									readOnly: true,
									value: seatLink,
									className: "flex-1 rounded-xl border border-line bg-transparent px-2 py-1 text-xs text-cream"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-xl border border-gold px-3 py-1 text-xs text-gold",
									onClick: () => void navigator.clipboard.writeText(seatLink),
									children: "Copy"
								})]
							}) : null,
							gmLink ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									readOnly: true,
									value: gmLink,
									className: "flex-1 rounded-xl border border-line bg-transparent px-2 py-1 text-xs text-cream"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-xl border border-gold px-3 py-1 text-xs text-gold",
									onClick: () => void navigator.clipboard.writeText(gmLink),
									children: "Copy GM"
								})]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3",
						children: seated.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-line py-3 text-sm text-cream",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: player.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										METALCON_SEAT_LABEL[player.dept] ?? player.dept,
										[player.company, player.job_title].filter(Boolean).length ? ` · ${[player.company, player.job_title].filter(Boolean).join(" · ")}` : "",
										" · ",
										player.email
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									kind: "navy",
									className: "mt-2",
									disabled: busy,
									onClick: () => void sendSeatLink({ data: {
										token,
										playerId: player.id,
										origin: window.location.origin
									} }).then((res) => {
										if (!res.ok) setErr(res.error);
										else setNote("Link sent.");
									}),
									children: "Send link"
								})
							]
						}, player.id))
					})
				]
			}) : null,
			desk?.role === "super" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-cream",
							children: "Game day leads"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							kind: "ghost",
							disabled: busy,
							onClick: () => void exportHostLeads({ data: { token } }).then((res) => {
								const file = fileOf(res);
								if (file) saveCsv(file.filename, file.csv);
								else if (!res.ok) setErr(res.error);
							}),
							children: "Download"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Companies that scanned the host QR. You also get an email when one comes in."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2",
						children: [(desk.leads ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-t border-line py-2 text-sm text-muted",
							children: "None yet."
						}) : null, (desk.leads ?? []).map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-line py-3 text-sm text-cream",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: lead.company
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										lead.contact_name,
										lead.title ? ` · ${lead.title}` : "",
										lead.phone ? ` · ${lead.phone}` : "",
										lead.email ? ` · ${lead.email}` : ""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										[lead.city, lead.state].filter(Boolean).join(", "),
										lead.headcount ? ` · ${lead.headcount}` : "",
										lead.timing ? ` · ${lead.timing}` : ""
									]
								}),
								lead.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-cream",
									children: lead.notes
								}) : null
							]
						}, lead.id))]
					})
				]
			}) : null,
			desk?.role === "super" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: "Admin password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						type: "password",
						placeholder: "Current password",
						value: curPass,
						onChange: (e) => setCurPass(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						type: "password",
						placeholder: "New password",
						value: newPass,
						onChange: (e) => setNewPass(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						type: "password",
						placeholder: "Confirm new password",
						value: confirmPass,
						onChange: (e) => setConfirmPass(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "At least 12 characters. This changes the super admin password for every device."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						kind: "navy",
						className: "w-full",
						disabled: busy || !curPass || newPass.length < 12 || newPass !== confirmPass,
						onClick: () => void savePassword(),
						children: "Change password"
					})
				]
			}) : null,
			desk?.role === "super" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: "Hosts"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2",
						children: desk.hosts.map((host) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-line py-2 text-sm text-cream",
							children: [
								host.name,
								" · ",
								host.email,
								" · ",
								host.role
							]
						}, host.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "Host name",
								placeholder: "Host name",
								value: hostName,
								onChange: (e) => setHostName(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "Host email",
								placeholder: "Host email",
								value: hostEmail,
								onChange: (e) => setHostEmail(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"aria-label": "Host password",
								placeholder: "Host password",
								value: hostPassword,
								onChange: (e) => setHostPassword(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								className: "w-full",
								disabled: busy,
								onClick: () => void addHost(),
								children: "Add host"
							})
						]
					})
				]
			}) : null
		]
	});
}
//#endregion
export { AdminPage as component };
