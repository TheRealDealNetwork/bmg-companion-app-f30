import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as money } from "./format-DkJBbT9C.mjs";
import { i as useLang, r as t, t as LangSwitch } from "./lang-C7kQIzzx.mjs";
import { r as Card } from "./ui-TaOKJTPB.mjs";
import { S as companyBoard, _ as answerLog, f as readSeat } from "./router-BUNHsq7S.mjs";
import { t as CompanyBanner } from "./company-banner-B92gQ5jp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/log-CIJszqXa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LogPage() {
	const { lang, setLang } = useLang();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [game, setGame] = (0, import_react.useState)(null);
	const [companyName, setCompanyName] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		document.title = "The Business Machine Experience answer log";
		let stop = false;
		async function load() {
			try {
				const res = await answerLog();
				if (stop) return;
				if (!res.ok) {
					setErr("The log is not available yet.");
					return;
				}
				setRows(res.rows.filter((row) => !row.card_code.toUpperCase().startsWith("BE-OW") && !row.card_code.toUpperCase().startsWith("BE-RE")));
				setGame(res.game);
			} catch {
				if (!stop) setErr("The log is not available yet.");
			}
		}
		load();
		const timer = window.setInterval(() => void load(), 8e3);
		return () => {
			stop = true;
			window.clearInterval(timer);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const seat = readSeat();
		if (!seat) return;
		companyBoard({ data: {
			id: seat.id,
			secret: seat.secret
		} }).then((res) => {
			if (res.ok) setCompanyName(res.companyName);
		});
	}, []);
	const depts = [...new Set(rows.map((row) => row.dept))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-3xl px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-widest text-gold uppercase",
					children: "The Business Machine Experience"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
					lang,
					setLang
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyBanner, {
				name: companyName,
				lang
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: game ? lang === "es" ? `Registro de respuestas del juego ${game}` : `Game ${game} answer log` : lang === "es" ? "Registro de respuestas" : "Answer log"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: lang === "es" ? "Se guarda cada carta respondida en una ronda. Una carta posterior no reemplaza una anterior." : "Every card answered in a round is kept. A later card does not replace an earlier one."
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-orange-ink",
				children: err
			}) : null,
			depts.length === 0 && !err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: lang === "es" ? "Todavía no hay respuestas." : "No answers yet."
			}) : null,
			depts.map((dept) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: dept
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs tracking-wide text-gold uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: lang === "es" ? "Ronda" : "Round"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: lang === "es" ? "Jugador" : "Player"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: lang === "es" ? "Carta" : "Card"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: lang === "es" ? "Respuesta" : "Answer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2",
									children: lang === "es" ? "Nómina" : "Payroll"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.filter((row) => row.dept === dept).map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3 text-cream",
									children: row.round_n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3 text-cream",
									children: row.player_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2 pr-3 text-cream",
									children: [row.card_code, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted",
										children: row.card_title
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3 text-cream",
									children: row.choice
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-gold",
									children: row.payroll_label || (row.payroll_cents > 0 ? `${money(row.payroll_cents)} ${lang === "es" ? "menos en la nómina" : "off payroll"}` : row.payroll_cents < 0 ? `${money(Math.abs(row.payroll_cents))} ${lang === "es" ? "agregado a la nómina" : "added to payroll"}` : "$0")
								})
							]
						}, `${row.card_code}-${row.player_name}-${i}`)) })]
					})
				})]
			}, dept)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/soebld/financials",
				className: "mt-4 mr-4 inline-block text-sm font-semibold text-gold",
				children: t("play.financials", lang)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/soebld",
				className: "mt-4 inline-block text-sm font-semibold text-gold",
				children: lang === "es" ? "Código QR" : "QR code"
			})
		]
	});
}
//#endregion
export { LogPage as component };
