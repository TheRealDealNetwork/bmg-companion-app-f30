import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as displayName } from "./format-DkJBbT9C.mjs";
import { A as previewSeat, F as readProfileSession, I as readSlot, J as writeSlot, N as readGame, T as joinGame, c as Field, d as Select, l as ProfileBlock, n as Btn, r as Card, t as BrandBar } from "./ui-TaOKJTPB.mjs";
import { a as Route$4 } from "./router-BUNHsq7S.mjs";
import { i as systemBrowserHref, t as inAppBrowser } from "./join-url-C7nhPgzU.mjs";
import { s as SEAT_DEPTS } from "./types-D1bYXzt9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/join-p6ciTT0z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JoinPage() {
	const { code } = Route$4.useParams();
	const game = code.toUpperCase();
	const navigate = useNavigate();
	const [first, setFirst] = (0, import_react.useState)("");
	const [last, setLast] = (0, import_react.useState)("");
	const [dept, setDept] = (0, import_react.useState)(SEAT_DEPTS[0]);
	const [lockedRole, setLockedRole] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)([]);
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [inApp, setInApp] = (0, import_react.useState)(false);
	const [profileReady, setProfileReady] = (0, import_react.useState)(() => Boolean(readProfileSession()));
	const [seat] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "";
		return new URLSearchParams(window.location.search).get("seat") ?? "";
	});
	const [assigned, setAssigned] = (0, import_react.useState)(null);
	const [seatErr, setSeatErr] = (0, import_react.useState)("");
	const [seatLoading, setSeatLoading] = (0, import_react.useState)(Boolean(seat));
	(0, import_react.useEffect)(() => {
		const saved = readSlot(game);
		if (saved.playerId && saved.playerToken) {
			navigate({
				to: "/g/$code/play",
				params: { code: game }
			});
			return;
		}
		setInApp(inAppBrowser(navigator.userAgent));
		if (seat) {
			previewSeat({ data: {
				code: game,
				seat
			} }).then((res) => {
				if (!res.ok) {
					setSeatErr(res.error);
					setSeatLoading(false);
					return;
				}
				setAssigned({
					name: res.name,
					dept: res.dept,
					claimed: res.claimed,
					active: res.active
				});
				const parts = res.name.split(" ");
				const lastName = parts.pop() ?? "";
				setFirst(parts.join(" ") || res.name);
				setLast(lastName.length < 2 ? "" : lastName);
				setDept(res.dept);
				setLockedRole(true);
				setSeatLoading(false);
			});
			return;
		}
		readGame({ data: { code: game } }).then((res) => {
			if (!res.ok) return;
			setOpen(res.view.players.filter((p) => p.active && !p.claimed));
		});
	}, [game, seat]);
	function claim(player) {
		const parts = player.name.split(" ");
		const lastName = parts.pop() ?? "";
		setFirst(parts.join(" ") || player.name);
		setLast(lastName.length < 2 ? "" : lastName);
		setDept(player.dept);
		setLockedRole(true);
		setErr("");
	}
	async function join() {
		const profile = readProfileSession();
		if (!profile) {
			setErr("Save a username first. It stays off the board.");
			return;
		}
		const name = displayName(first, last);
		setBusy(true);
		setErr("");
		try {
			const res = await joinGame({ data: {
				code: game,
				name,
				dept,
				seat,
				profileSecret: profile.secret
			} });
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			writeSlot(game, {
				playerId: res.playerId,
				playerToken: res.playerToken,
				name: res.view.players.find((p) => p.id === res.playerId)?.name
			});
			await navigate({
				to: "/g/$code/play",
				params: { code: game }
			});
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not join.");
		} finally {
			setBusy(false);
		}
	}
	const browserHref = typeof window === "undefined" ? "" : systemBrowserHref(window.location.href, navigator.userAgent);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-navy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-md px-4 py-6",
			children: [inApp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mb-3 border-gold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl text-cream",
						children: "Open this in your browser"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink",
						children: "This page opened inside an app. The game runs in Safari or Chrome. You do not need the Grok app."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: browserHref,
						className: "mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-navy",
						children: "Open in Safari or Chrome"
					})
				]
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-bold tracking-widest text-gold uppercase",
				children: ["Game ", game]
			}), seatLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-cream",
				children: "Opening your seat…"
			}) : assigned && !assigned.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-3xl text-cream",
				children: "This seat is excused"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Ask the GM to restore ",
					assigned.name,
					" before you join."
				]
			})] }) : assigned?.claimed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl text-cream",
					children: "Welcome back"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-2xl text-cream",
					children: assigned.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-gold",
					children: assigned.dept
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "This link puts you back in your seat, even after a refresh."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileBlock, {
					onReady: () => setProfileReady(true),
					onClear: () => setProfileReady(false)
				}),
				err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-orange-ink",
					children: err
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-4 w-full",
					disabled: busy || !profileReady,
					onClick: () => void join(),
					children: busy ? "Opening…" : `Open ${assigned.name}'s seat`
				})
			] }) : assigned ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl text-cream",
					children: "Your seat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-2xl text-cream",
					children: assigned.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-orange",
					children: assigned.dept
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "This opens in the phone browser. The table uses the name the GM assigned."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileBlock, {
					onReady: () => setProfileReady(true),
					onClear: () => setProfileReady(false)
				}),
				err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-orange-ink",
					children: err
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-4 w-full",
					disabled: busy || !profileReady,
					onClick: () => void join(),
					children: busy ? "Joining…" : `Join as ${assigned.name}`
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl text-cream",
					children: "Take a seat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Your real first and last name is what the table sees. Your username is only for your profile and for the host to find you."
				}),
				seatErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-orange-ink",
					children: seatErr
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileBlock, {
					onReady: () => setProfileReady(true),
					onClear: () => setProfileReady(false)
				}),
				open.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-cream",
						children: "The GM already assigned these seats"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-2",
						children: open.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => claim(p),
							className: "flex min-h-11 w-full items-center justify-between rounded-xl border border-line bg-navy-2 px-3 py-2 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-cream",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: p.dept
							})]
						}) }, p.id))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-sm font-semibold text-muted",
					htmlFor: "first",
					children: "First name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "first",
					value: first,
					onChange: (e) => setFirst(e.target.value),
					autoComplete: "given-name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-sm font-semibold text-muted",
					htmlFor: "last",
					children: "Last name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "last",
					value: last,
					onChange: (e) => setLast(e.target.value),
					autoComplete: "family-name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-sm font-semibold text-muted",
					htmlFor: "dept",
					children: "Role"
				}),
				lockedRole ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					id: "dept",
					className: "mt-1 rounded-xl bg-navy-2 px-3 py-3 font-semibold text-cream",
					children: dept
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					id: "dept",
					value: dept,
					onChange: (e) => setDept(e.target.value),
					children: SEAT_DEPTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))
				}),
				err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-orange-ink",
					children: err
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-4 w-full",
					disabled: busy || !profileReady,
					onClick: () => void join(),
					children: busy ? "Joining…" : "Join the table"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `/g/${game}/room`,
					className: "mt-4 block text-center text-sm font-semibold text-cream",
					children: "This screen is the projector"
				})
			] })] })]
		})]
	});
}
//#endregion
export { JoinPage as component };
