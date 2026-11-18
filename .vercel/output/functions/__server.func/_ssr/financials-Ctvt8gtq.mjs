import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as money } from "./format-DkJBbT9C.mjs";
import { i as useLang, n as deptLabel, r as t, t as LangSwitch } from "./lang-C7kQIzzx.mjs";
import { r as Card } from "./ui-TaOKJTPB.mjs";
import { S as companyBoard, f as readSeat } from "./router-BUNHsq7S.mjs";
import { t as CompanyBanner } from "./company-banner-B92gQ5jp.mjs";
import { n as DEPTS, r as DEPT_COLOR, t as COMPANY_NAVY } from "./principle-bank-D65k56hX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/financials-Ctvt8gtq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAVY = COMPANY_NAVY;
function FinancialsPage() {
	const navigate = useNavigate();
	const [seat, setSeat] = (0, import_react.useState)(null);
	const [board, setBoard] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const { lang, setLang } = useLang(seat?.id);
	(0, import_react.useEffect)(() => {
		document.title = lang === "es" ? "Finanzas del negocio" : "Business Financials";
		const saved = readSeat();
		if (!saved) navigate({ to: "/soebld/join" });
		else setSeat(saved);
		const onVisible = () => {
			if (document.visibilityState === "visible") {
				const again = readSeat();
				if (again) setSeat(again);
			}
		};
		document.addEventListener("visibilitychange", onVisible);
		return () => document.removeEventListener("visibilitychange", onVisible);
	}, [navigate, lang]);
	(0, import_react.useEffect)(() => {
		if (!seat) return;
		let stop = false;
		async function load() {
			if (!seat) return;
			const res = await companyBoard({ data: {
				id: seat.id,
				secret: seat.secret
			} });
			if (!stop && res.ok) setBoard(res);
		}
		load();
		const timer = window.setInterval(() => void load(), 6e3);
		return () => {
			stop = true;
			window.clearInterval(timer);
		};
	}, [seat]);
	if (!seat || !board) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto max-w-lg px-4 py-6 text-cream",
		children: t("numbers.opening", lang)
	});
	const numbers = board.numbers;
	const mine = numbers.players.find((player) => player.id === seat.id);
	const companyValue = numbers.players.reduce((sum, player) => sum + player.cents, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-widest text-gold uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-widest text-gold uppercase",
						children: "The Business Machine Experience"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
					lang,
					setLang
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyBanner, {
				name: numbers.companyName,
				lang
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-2xl text-cream",
				style: {
					fontFamily: "Montserrat, sans-serif",
					fontWeight: 700
				},
				children: lang === "es" ? "Finanzas del Negocio" : "Business Financials"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: lang === "es" ? "Todo el dinero de la empresa en un solo lugar." : "The whole company's money in one place."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Big, {
						name: lang === "es" ? "Ingresos" : "Revenue",
						value: money(numbers.revenueCents),
						hint: lang === "es" ? "El dinero que la empresa ganó con proyectos terminados." : "Money the company brought in from finished projects."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Big, {
						name: lang === "es" ? "Nómina" : "Payroll",
						value: money(numbers.payrollCents),
						hint: lang === "es" ? "Lo que la empresa le pagó a su gente en este juego." : "What the company paid its people this game."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Big, {
						name: lang === "es" ? "Ganancia" : "Profit",
						value: money(numbers.profitCents),
						hint: lang === "es" ? "Lo que queda después de la nómina. Este es el puntaje que importa." : "What's left after payroll. This is the score that matters.",
						extra: numbers.profitCents < 0 ? lang === "es" ? "Primero se paga la nómina. Los proyectos terminados traen el dinero." : "Payroll comes first. Finished projects bring the money in." : ""
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: DEPTS.map((dept) => {
					const cents = numbers.departments.find((row) => row.dept === dept)?.cents ?? 0;
					const highlight = mine?.dept === dept;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-xl px-3 py-2 text-base text-cream",
						style: {
							background: DEPT_COLOR[dept],
							border: highlight ? "3px solid #FFFFFF" : "none",
							fontFamily: "Inter, sans-serif",
							fontWeight: 600
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: highlight ? lang === "es" ? `${deptLabel(dept, lang)} aportó ${money(cents)} esta ronda.` : `${deptLabel(dept, lang)} added ${money(cents)} this round.` : `${deptLabel(dept, lang)} · ${money(cents)}` }), highlight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 rounded-full bg-cream px-2 py-0.5 text-xs text-navy",
							children: lang === "es" ? "Tú" : "You"
						}) : null]
					}, dept);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 text-sm font-semibold text-gold",
				onClick: () => setOpen((v) => !v),
				children: open ? lang === "es" ? "Ocultar" : "Hide" : lang === "es" ? "Ver de dónde vino el dinero" : "See where the money came from"
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "space-y-1 text-sm text-cream",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								style: {
									fontFamily: "Montserrat, sans-serif",
									fontWeight: 700
								},
								children: lang === "es" ? "De dónde vino el dinero" : "Where the money came from"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								t("numbers.revenues", lang),
								": ",
								money(numbers.revenueCents)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								t("numbers.variable", lang),
								": ",
								money(numbers.otherCents)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								t("numbers.gross", lang),
								": ",
								money(numbers.revenueCents - numbers.otherCents)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								t("numbers.payroll", lang),
								": ",
								money(numbers.payrollCents)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								t("numbers.fixed", lang),
								": ",
								money(numbers.fixedCents)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								t("numbers.net", lang),
								": ",
								money(numbers.profitCents)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								t("numbers.netPct", lang),
								": ",
								numbers.marginBps === null ? "0%" : `${(numbers.marginBps / 100).toFixed(1)}%`
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								lang === "es" ? "Efectos de cartas" : "Card effects so far",
								": ",
								numbers.cardEffects.length
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "space-y-1 text-sm text-cream",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								style: {
									fontFamily: "Montserrat, sans-serif",
									fontWeight: 700
								},
								children: lang === "es" ? "Proyectos" : "Projects"
							}),
							numbers.projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: lang === "es" ? "No hay proyectos abiertos." : "No projects opened."
							}) : null,
							numbers.projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								lang === "es" ? "Proyecto" : "Project",
								" ",
								project.n,
								": ",
								money(project.status === "complete" ? project.revenueCents : project.potentialCents),
								project.status === "complete" ? lang === "es" ? " · terminado" : " · completed" : lang === "es" ? " · potencial" : " · potential"
							] }, project.n))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "space-y-1 text-sm text-cream",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								style: {
									fontFamily: "Montserrat, sans-serif",
									fontWeight: 700
								},
								children: lang === "es" ? "Aporte de valor" : "Value contribution"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: {
									color: NAVY,
									fontFamily: "Inter, sans-serif"
								},
								children: [
									lang === "es" ? "Empresa" : "Company",
									": ",
									money(companyValue)
								]
							}),
							numbers.departments.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: { color: DEPT_COLOR[row.dept] || NAVY },
								children: [
									deptLabel(row.dept, lang),
									": ",
									money(row.cents)
								]
							}, row.dept)),
							numbers.players.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-cream",
								children: [
									player.name,
									" · ",
									deptLabel(player.dept, lang),
									": ",
									money(player.cents)
								]
							}, player.id))
						]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/soebld/play",
						search: { seat: seat.id },
						className: "text-sm font-semibold text-gold",
						children: lang === "es" ? "Volver a tu asiento" : "Back to your seat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2 text-muted",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/soebld/numbers",
						className: "text-sm font-semibold text-gold",
						children: t("play.numbers", lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2 text-muted",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/soebld/scoreboard",
						className: "text-sm font-semibold text-gold",
						children: lang === "es" ? "Tabla de Valor" : "Value Scoreboard"
					})
				]
			})
		]
	});
}
function Big({ name, value, hint, extra }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl px-3 py-3 text-center",
		style: { background: NAVY },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase tracking-wide text-gold",
				style: { fontFamily: "Montserrat, sans-serif" },
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-cream",
				style: {
					fontFamily: "Inter, sans-serif",
					fontSize: "clamp(0.8rem, 3.6vw, 1.6rem)",
					lineHeight: 1.1,
					paddingInline: "0.35rem"
				},
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[10px] leading-tight text-muted",
				children: hint
			}) : null,
			extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[10px] leading-tight text-gold",
				children: extra
			}) : null
		]
	});
}
//#endregion
export { FinancialsPage as component };
