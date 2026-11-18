import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as money } from "./format-DkJBbT9C.mjs";
import { i as useLang, n as deptLabel, r as t, t as LangSwitch } from "./lang-C7kQIzzx.mjs";
import { r as Card } from "./ui-TaOKJTPB.mjs";
import { S as companyBoard, f as readSeat } from "./router-BUNHsq7S.mjs";
import { t as CompanyBanner } from "./company-banner-B92gQ5jp.mjs";
import { n as DEPTS, r as DEPT_COLOR } from "./principle-bank-D65k56hX.mjs";
import { n as resolveName, t as bilingual } from "./es-cards-CbiskBUh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/numbers--9Zi7bqx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function translateLedger(detail) {
	let out = detail.replace(/confirmed/gi, "confirmó").replace(/proposed/gi, "propuso").replace(/on Project/gi, "en el Proyecto");
	out = out.replace(/\b[A-Z][A-Z ]{2,}\b/g, (caps) => {
		const resolved = resolveName(caps);
		if (resolved === caps) return caps;
		const b = bilingual(resolved, "es");
		return b.secondary ? `${b.primary} (${b.secondary})` : b.primary;
	});
	out = out.replace(/[a-z0-9]+(?:-[a-z0-9]+)+/g, (slug) => {
		const resolved = resolveName(slug);
		if (resolved === slug) return slug;
		const b = bilingual(resolved, "es");
		return b.secondary ? `${b.primary} (${b.secondary})` : resolved;
	});
	return out;
}
function translateEffect(line) {
	return {
		"Overbudget Surprise: −$3,000 off company Revenues, right away.": "Overbudget Surprise: −$3,000 de los ingresos de la empresa, de inmediato.",
		"Financing Falls Through: Sales picks one unfinished project, which loses $2,000 of its revenue when it completes. If drawn again on the same project, the reductions stack.": "Financing Falls Through: Ventas elige un proyecto sin terminar, que pierde $2,000 de sus ingresos cuando se termina. Si sale de nuevo en el mismo proyecto, las reducciones se acumulan.",
		"Stanley: −$5,000 Variable Costs if the project is unfinished at the end of round 6.": "Stanley: −$5,000 en costos variables si el proyecto no está terminado al final de la ronda 6.",
		"Thompson: −$5,000 Variable Costs if the project completes 4th or later, by Accounting's close order.": "Thompson: −$5,000 en costos variables si el proyecto termina en 4.º lugar o después, según el orden de cierre de Contabilidad.",
		"Material Spike: −$2,000 Variable Costs, right away.": "Material Spike: −$2,000 en costos variables, de inmediato.",
		"Warranty Claim: −$2,000 Variable Costs, right away.": "Warranty Claim: −$2,000 en costos variables, de inmediato.",
		"Rivera: +$5,000 at completion, only if 2 or more SPECIAL cards were played on that same project. Splits and Crew Swap do not count.": "Rivera: +$5,000 al terminarlo, solo si se jugaron 2 o más cartas SPECIAL en ese mismo proyecto. Splits y Crew Swap no cuentan.",
		"Garcia: +$2,000 for each project finished after Garcia's, up to $8,000, by Accounting's close order.": "Garcia: +$2,000 por cada proyecto terminado después del de Garcia, hasta $8,000, según el orden de cierre de Contabilidad.",
		"Lee: +$1,000 for each token placed on Lee's project, up to $5,000. Moved or replaced tokens do not claw back.": "Lee: +$1,000 por cada ficha colocada en el proyecto de Lee, hasta $5,000. Las fichas movidas o reemplazadas no se recuperan.",
		"O'Brien: +$4,000 at game end to the last project that finished, by Accounting's close order. Paid once.": "O'Brien: +$4,000 al final del juego al último proyecto que terminó, según el orden de cierre de Contabilidad. Se paga una sola vez.",
		"Harris +$4,000, Patel +$2,000, Bi-Level +$3,000, McMansion +$2,000, Victorian +$2,000: at completion only.": "Harris +$4,000, Patel +$2,000, Bi-Level +$3,000, McMansion +$2,000, Victorian +$2,000: solo al terminarlo.",
		"Upsell Close: +$2,000 at completion for each time it is played on that project. The bonus stays if the token is later moved.": "Upsell Close: +$2,000 al terminarlo por cada vez que se juega en ese proyecto. La bonificación se queda si después se mueve la ficha.",
		"Invoice Blitz +$3,000, Quick Audit +$4,000, Invoice Paid Early +$3,000, Community Buzz +$3,000: added to company Revenues right away.": "Invoice Blitz +$3,000, Quick Audit +$4,000, Invoice Paid Early +$3,000, Community Buzz +$3,000: se suman a los ingresos de la empresa de inmediato."
	}[line] || line;
}
function translateFigured(line) {
	return {
		"Revenue = completed project tier + house bonus + customer bonus + special/event cash gains − revenue reductions (Overbudget Surprise, Financing Falls Through).": "Ingresos = nivel del proyecto terminado + bonificación de casa + bonificación de cliente + ganancias en efectivo de cartas special/event − reducciones de ingresos (Overbudget Surprise, Financing Falls Through).",
		"Positions 1-3 pay $10,000, 4-6 $20,000, 7-9 $30,000, only on completion. Unfinished is potential.": "Las posiciones 1-3 pagan $10,000, 4-6 $20,000, 7-9 $30,000, solo al terminarlo. Lo no terminado es potencial.",
		"Variable costs = cash losses and penalties (Stanley, Thompson, Material Spike, Warranty Claim).": "Costos variables = pérdidas en efectivo y penalizaciones (Stanley, Thompson, Material Spike, Warranty Claim).",
		"Gross margin = revenue − variable costs.": "Margen bruto = ingresos − costos variables.",
		"Payroll = $16,000 base a round + $500 × wrong answers − $500 × right answers.": "Nómina = $16,000 de base por ronda + $500 × respuestas incorrectas − $500 × respuestas correctas.",
		"Fixed cost = $2,000 × departments playing, each round from round 3.": "Costo fijo = $2,000 × departamentos que juegan, cada ronda a partir de la ronda 3.",
		"Net Margin = Gross Margin − Fixed Costs.": "Margen neto = margen bruto − costos fijos.",
		"Net Margin % = 100 × Net Margin / Revenues. 30% or below is no win. Above 30% wins. Above 50% is Market Leader.": "Margen neto % = 100 × margen neto / ingresos. 30% o menos no es victoria. Más de 30% es victoria. Más de 50% es Líder de Mercado."
	}[line] || line;
}
function NumbersPage() {
	const navigate = useNavigate();
	const [seat, setSeat] = (0, import_react.useState)(null);
	const [board, setBoard] = (0, import_react.useState)(null);
	const [loadError, setLoadError] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const { lang, setLang } = useLang(seat?.id);
	(0, import_react.useEffect)(() => {
		document.title = "Numbers";
		const params = new URLSearchParams(window.location.search);
		const saved = readSeat(params.get("seat") || void 0) || readSeat();
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
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		if (!seat) return;
		let stop = false;
		async function load() {
			if (!seat) return;
			try {
				const res = await companyBoard({ data: {
					id: seat.id,
					secret: seat.secret
				} });
				if (stop) return;
				if (res.ok) {
					setBoard(res);
					setLoadError("");
				} else setLoadError(res.error);
			} catch (err) {
				if (!stop) setLoadError(err instanceof Error ? err.message : "Could not open the numbers.");
			}
		}
		load();
		const timer = window.setInterval(() => void load(), 8e3);
		return () => {
			stop = true;
			window.clearInterval(timer);
		};
	}, [seat]);
	if (!seat || !board) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto max-w-lg px-4 py-6 text-cream",
		children: loadError || t("numbers.opening", lang)
	});
	const numbers = board.numbers;
	const mine = numbers.players.find((player) => player.id === seat.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-widest text-gold uppercase",
					children: t("numbers.title", lang)
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
				className: "mt-1 font-display text-3xl text-cream",
				children: numbers.companyName || (lang === "es" ? "Números de la empresa" : "Company numbers")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl px-3 py-3 text-center",
						style: { background: "#1B2A4A" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase text-gold",
								style: { fontFamily: "Montserrat, sans-serif" },
								children: lang === "es" ? "Ingresos" : "Revenue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-cream",
								style: {
									fontFamily: "Inter, sans-serif",
									fontSize: "clamp(0.8rem, 3.6vw, 1.6rem)",
									lineHeight: 1.1,
									paddingInline: "0.35rem"
								},
								children: money(numbers.revenueCents)
							}),
							(() => {
								const projTotal = numbers.projects.filter((p) => p.status === "complete").reduce((s, p) => s + p.revenueCents, 0);
								const cardRev = numbers.revenueCents - projTotal;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[10px] text-cream/70",
									children: lang === "es" ? `Proyectos ${money(projTotal)} + cartas ${money(cardRev)} = ${money(numbers.revenueCents)}` : `Projects ${money(projTotal)} + cards ${money(cardRev)} = ${money(numbers.revenueCents)}`
								});
							})(),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10px] leading-tight text-muted",
								style: { fontFamily: "Inter, sans-serif" },
								children: lang === "es" ? "El dinero que la empresa ganó con proyectos terminados." : "Money the company brought in from finished projects."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl px-3 py-3 text-center",
						style: { background: "#1B2A4A" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase text-gold",
								style: { fontFamily: "Montserrat, sans-serif" },
								children: lang === "es" ? "Nómina" : "Payroll"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-cream",
								style: {
									fontFamily: "Inter, sans-serif",
									fontSize: "clamp(0.8rem, 3.6vw, 1.6rem)",
									lineHeight: 1.1,
									paddingInline: "0.35rem"
								},
								children: money(numbers.payrollCents)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10px] leading-tight text-muted",
								style: { fontFamily: "Inter, sans-serif" },
								children: lang === "es" ? "Lo que la empresa le pagó a su gente en este juego." : "What the company paid its people this game."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl px-3 py-3 text-center",
						style: { background: "#1B2A4A" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase text-gold",
								style: { fontFamily: "Montserrat, sans-serif" },
								children: lang === "es" ? "Ganancia" : "Profit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-cream",
								style: {
									fontFamily: "Inter, sans-serif",
									fontSize: "clamp(0.8rem, 3.6vw, 1.6rem)",
									lineHeight: 1.1,
									paddingInline: "0.35rem"
								},
								children: money(numbers.profitCents)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10px] leading-tight text-muted",
								style: { fontFamily: "Inter, sans-serif" },
								children: lang === "es" ? "Lo que queda después de la nómina. Este es el puntaje que importa." : "What's left after payroll. This is the score that matters."
							}),
							numbers.profitCents < 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10px] leading-tight text-gold",
								style: { fontFamily: "Inter, sans-serif" },
								children: lang === "es" ? "Primero se paga la nómina. Los proyectos terminados traen el dinero." : "Payroll comes first. Finished projects bring the money in."
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: DEPTS.map((dept) => {
					const cents = numbers.departments.find((row) => row.dept === dept)?.cents ?? 0;
					const highlight = mine?.dept === dept;
					const color = DEPT_COLOR[dept];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-xl px-3 py-2 text-base text-cream",
						style: {
							background: color,
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
				className: "mt-4 mr-4 text-sm font-semibold text-gold",
				onClick: () => setOpen((v) => !v),
				children: open ? lang === "es" ? "Ocultar" : "Hide" : lang === "es" ? "Ver de dónde vino el dinero" : "See where the money came from"
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-4 space-y-1 text-sm text-cream",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-cream",
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
							t("numbers.fixed", lang),
							": ",
							money(numbers.payrollCents + numbers.fixedCents)
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "pl-3 text-xs text-muted",
							children: [
								t("numbers.payroll", lang),
								": ",
								money(numbers.payrollCents),
								" ($16,000 ",
								t("numbers.base", lang),
								", +$500 ",
								lang === "es" ? "por incorrecta" : "per wrong",
								", −$500 ",
								lang === "es" ? "por correcta" : "per right",
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "pl-3 text-xs text-muted",
							children: [
								t("numbers.deptFixed", lang),
								": ",
								money(numbers.fixedCents),
								" (",
								numbers.fixedDeptCount,
								" ",
								lang === "es" ? "deptos" : "depts",
								" × $2,000 ",
								lang === "es" ? "desde ronda 3" : "from round 3",
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-semibold text-gold",
							children: [
								t("numbers.net", lang),
								": ",
								money(numbers.profitCents)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							t("numbers.netPct", lang),
							": ",
							numbers.marginBps === null ? "0%" : `${(numbers.marginBps / 100).toFixed(1)}%`
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-32 w-8 rounded-lg border border-line bg-navy-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-0 w-full rounded-b-lg bg-gold",
										style: { height: `${Math.max(0, Math.min(100, (numbers.marginBps ?? 0) / 100))}%` }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute w-full border-t border-cream",
										style: { bottom: "30%" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute w-full border-t border-gold",
										style: { bottom: "50%" }
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["50% ", t("numbers.leader", lang)] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["30% ", lang === "es" ? "gana" : "wins"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: (numbers.marginBps ?? 0) < 0 ? "text-orange-ink" : "text-gold",
										children: numbers.marginBps === null ? "0%" : `${(numbers.marginBps / 100).toFixed(1)}%`
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: t("numbers.win", lang)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: lang === "es" ? "Nómina por ronda" : "Payroll by round"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2",
						children: [numbers.rounds.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "No payroll yet."
						}) : null, numbers.rounds.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-line py-2 text-sm text-cream",
							children: [
								lang === "es" ? "Ronda" : "Round",
								" ",
								row.round,
								": ",
								lang === "es" ? "base" : "base",
								" ",
								money(row.baseCents ?? 16e5),
								row.addedCents ? `, ${lang === "es" ? "respuestas sumaron" : "answers added"} ${money(row.addedCents)}` : "",
								row.offCents ? `, ${lang === "es" ? "respuestas restaron" : "answers took off"} ${money(row.offCents)}` : "",
								row.fixedCents ? `, fixed ${money(row.fixedCents)}` : "",
								`, ${lang === "es" ? "impacto en nómina" : "payroll impact"} ${money(row.netCents ?? row.addedCents - row.offCents - (row.fixedCents ?? 0))}`,
								row.cards.length ? ` (${row.cards.map((c) => lang === "es" ? c.replace(/ down /g, " restó ").replace(/ up /g, " sumó ") : c).join(", ")})` : ""
							]
						}, row.round))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-cream",
							children: lang === "es" ? "Marcador de escenarios" : "Scenario scoreboard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: lang === "es" ? "R = correctas. W = incorrectas. Impacto en la nómina = $500 × (W − R)." : "R = right. W = wrong. Payroll impact = $500 × (W − R)."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2",
							children: [numbers.scoreboard.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted",
								children: lang === "es" ? "Aún no hay respuestas." : "No answers yet."
							}) : null, numbers.scoreboard.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-t border-line py-2 text-sm text-cream",
								children: [
									deptLabel(row.dept, lang),
									": ",
									row.right,
									lang === "es" ? " bien" : "R",
									" ",
									row.wrong,
									lang === "es" ? " mal" : "W",
									" · ",
									lang === "es" ? "Impacto en la nómina" : "Payroll impact",
									" ",
									row.net >= 0 ? "+" : "",
									money(row.net)
								]
							}, row.dept))]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-cream",
							children: lang === "es" ? "Ejemplo" : "Example"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-cream",
							children: lang === "es" ? "Ejemplo genérico: Proyecto de posición 1, casa de ejemplo, cliente de ejemplo. Mercadeo juega Prospecto básico (1 estrella). Una respuesta correcta, una incorrecta. Ronda 3." : "Generic example: Position-1 project, example house, example customer. Marketing plays Basic Lead (1 star). One right answer, one wrong answer. Round 3."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 text-sm text-cream",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-line py-1",
									children: lang === "es" ? "Nivel (posición 1): $10,000" : "Tier (position 1): $10,000"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-line py-1",
									children: lang === "es" ? "Bonificación de casa (ejemplo): +$3,000" : "House bonus (example): +$3,000"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-line py-1",
									children: lang === "es" ? "Cliente (ejemplo, 0 cierres posteriores): $0" : "Customer (example, 0 later finishes): $0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-line py-1",
									children: lang === "es" ? "Acción (Prospecto básico): solo ficha, $0" : "Action (Basic Lead): token only, $0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-line py-1",
									children: lang === "es" ? "Ingresos del proyecto al completar: $13,000" : "Project revenue on completion: $13,000"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-line py-1",
									children: lang === "es" ? "Respuestas: 1 correcta (−$500), 1 incorrecta (+$500), impacto en nómina $0" : "Answers: 1 right (−$500), 1 wrong (+$500), payroll impact $0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-line py-1",
									children: lang === "es" ? "Nómina: $16,000 base + $0 impacto = $16,000" : "Payroll: $16,000 base + $0 payroll impact = $16,000"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-line py-1",
									children: lang === "es" ? "Fijo (5 deptos × $2,000, ronda 3): $10,000" : "Fixed (5 depts × $2,000, round 3): $10,000"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-line py-1",
									children: lang === "es" ? "Margen neto: $13,000 − $16,000 − $10,000 = −$13,000" : "Net Margin: $13,000 − $16,000 − $10,000 = −$13,000"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-line py-1",
									children: lang === "es" ? "Margen: −100%. Sin victoria." : "Margin: −100%. No win."
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-cream",
							children: "Seat scoreboard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: lang === "es" ? "Cada jugador. Acumulado." : "Each player. Cumulative."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2",
							children: numbers.players.filter((row) => row.right || row.wrong).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-t border-line py-2 text-sm text-cream",
								children: [
									row.name,
									" · ",
									deptLabel(row.dept, lang),
									" · ",
									row.right,
									lang === "es" ? " bien" : "R",
									" ",
									row.wrong,
									lang === "es" ? " mal" : "W",
									" · ",
									lang === "es" ? "ahorrando" : "saving",
									" ",
									money(row.saving)
								]
							}, row.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: lang === "es" ? "Efectos de cartas que recortan o condicionan los ingresos" : "Card effects that cut or condition revenue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2",
						children: numbers.cardEffects.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-t border-line py-2 text-sm text-cream",
							children: lang === "es" ? translateEffect(line) : line
						}, line))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: lang === "es" ? "Cómo se calcula" : "How this is figured"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2",
						children: numbers.figured.filter((line) => !numbers.cardEffects.includes(line)).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-t border-line py-2 text-sm text-cream",
							children: lang === "es" ? translateFigured(line) : line
						}, line))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-cream",
							children: lang === "es" ? "Dólares del jugador" : "Player dollars"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2",
							children: numbers.players.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-t border-line py-2 text-sm text-cream",
								children: [
									row.name,
									" · ",
									deptLabel(row.dept, lang),
									" · ",
									row.right,
									lang === "es" ? " bien" : "R",
									" ",
									row.wrong,
									lang === "es" ? " mal" : "W",
									" · ",
									money(row.cents),
									" · ",
									lang === "es" ? "ahorrando" : "saving",
									" ",
									money(row.saving)
								]
							}, row.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2",
							children: [numbers.projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted",
								children: lang === "es" ? "No hay proyectos abiertos." : "No projects opened."
							}) : null, numbers.projects.map((project) => {
								const done = project.status === "complete";
								const tag = done ? "" : lang === "es" ? ", si se termina" : ", if completed";
								const sign = (cents) => `${cents < 0 ? "-" : "+"}${money(Math.abs(cents))}`;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "border-t border-line py-2 text-sm text-cream",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											lang === "es" ? "Base del Proyecto" : "Project",
											" ",
											project.n,
											" ",
											lang === "es" ? "(posición" : "base (position",
											" ",
											project.n,
											"): ",
											money(project.valueCents)
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "pl-3 text-xs text-muted",
											children: [
												lang === "es" ? "Bonificación de casa" : "House bonus",
												" (",
												project.house,
												")",
												tag,
												": ",
												sign(project.houseBonus)
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "pl-3 text-xs text-muted",
											children: [
												lang === "es" ? "Bonificación de cliente" : "Customer bonus",
												" (",
												project.customer,
												")",
												tag,
												": ",
												sign(project.customerBonus)
											]
										}),
										project.garciaBonus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "pl-3 text-xs text-muted",
											children: [
												lang === "es" ? "Garcia (referidos)" : "Garcia referral",
												": ",
												sign(project.garciaBonus ?? 0)
											]
										}) : null,
										project.customer.includes("O'Brien") && project.status === "complete" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "pl-3 text-xs text-muted",
											children: ["O'Brien: +$4,000 ", lang === "es" ? "al final del juego" : "at game end"]
										}) : null,
										project.effect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "pl-3 text-xs text-muted",
											children: project.effect
										}) : null,
										done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "pl-3 text-xs text-gold",
											children: [
												lang === "es" ? "Total del proyecto:" : "Project total:",
												" ",
												money(project.revenueCents),
												" ",
												lang === "es" ? "contado en Ingresos" : "counted in Revenues"
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "pl-3 text-xs text-cream",
											children: [
												lang === "es" ? "Total del proyecto, si se termina:" : "Project total, if completed:",
												" ",
												money(project.potentialCents)
											]
										})
									]
								}, project.n);
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-cream",
							children: lang === "es" ? "Tu registro" : "Your ledger"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-gold",
							children: mine ? money(mine.cents) : "$0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2",
							children: board.ledger.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-t border-line py-2 text-sm text-cream",
								children: [
									lang === "es" ? translateLedger(row.detail || row.card_code) : row.detail || row.card_code,
									row.amount_cents ? ` · ${money(row.amount_cents)}` : "",
									lang !== "es" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted",
										children: row.detail
									}) : null
								]
							}, row.id))
						})
					]
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 text-sm font-semibold text-gold",
				onClick: () => {
					const cell = (value) => `"${value.replace(/"/g, "\"\"")}"`;
					const row = (record, item, value) => [
						cell(record),
						cell(item),
						cell(value)
					].join(",");
					const lines = [row("record", "item", "value")];
					lines.push(row("financials", "Revenues", (numbers.revenueCents / 100).toFixed(2)));
					lines.push(row("financials", "Variable Costs (total)", (numbers.otherCents / 100).toFixed(2)));
					lines.push(row("financials", "Gross Margin", ((numbers.revenueCents - numbers.otherCents) / 100).toFixed(2)));
					lines.push(row("financials", "Fixed Costs (total)", ((numbers.payrollCents + numbers.fixedCents) / 100).toFixed(2)));
					lines.push(row("financials", "Payroll", (numbers.payrollCents / 100).toFixed(2)));
					lines.push(row("financials", "Department fixed", (numbers.fixedCents / 100).toFixed(2)));
					lines.push(row("financials", "Net Margin ($)", (numbers.profitCents / 100).toFixed(2)));
					lines.push(row("financials", "Net Margin %", numbers.marginBps === null ? "0" : (numbers.marginBps / 100).toFixed(1)));
					for (const score of numbers.scoreboard) lines.push(row("scoreboard", score.dept, `Payroll impact ${score.net >= 0 ? "+" : ""}${(score.net / 100).toFixed(2)}`));
					for (const seat of numbers.players) lines.push(row("seat", seat.name, `${seat.right}R ${seat.wrong}W Payroll impact ${seat.saving <= 0 ? "+" : "-"}${(Math.abs(seat.saving) / 100).toFixed(2)}`));
					for (const project of numbers.projects) {
						const done = project.status === "complete";
						const tag = done ? "" : ", if completed";
						const sign = (cents) => `${cents < 0 ? "-" : "+"}${(Math.abs(cents) / 100).toFixed(2)}`;
						lines.push(row("project", `P${project.n} base`, (project.valueCents / 100).toFixed(2)));
						lines.push(row("project", `P${project.n} House bonus (${project.house})${tag}`, sign(project.houseBonus)));
						lines.push(row("project", `P${project.n} Customer bonus (${project.customer})${tag}`, sign(project.customerBonus)));
						if (project.customer.includes("O'Brien") && done) lines.push(row("project", `P${project.n} O'Brien: +$4,000 at game end`, "4000.00"));
						if (project.effect) for (const action of project.effect.split("; ").filter(Boolean)) {
							const match = /−\$([\d,]+)/.exec(action);
							const value = match ? `-${match[1].replace(/,/g, "")}` : "0.00";
							lines.push(row("project", `P${project.n} Action: ${action}`, value));
						}
						lines.push(row("project", `P${project.n} ${done ? "Completed" : "Total if completed"}`, ((done ? project.revenueCents : project.potentialCents) / 100).toFixed(2)));
					}
					for (const line of numbers.figured) lines.push(row("formula", line, ""));
					for (const line of numbers.cardEffects) lines.push(row("card-effect", line, ""));
					const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
					const blob = new Blob([lines.join("\n")], { type: "text/csv" });
					const url = URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = `soebld-numbers-${stamp}.csv`;
					a.click();
					URL.revokeObjectURL(url);
				},
				children: lang === "es" ? "Exportar números" : "Export numbers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mx-2 text-muted",
				children: "·"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/soebld/financials",
				className: "text-sm font-semibold text-gold",
				children: lang === "es" ? "Finanzas del Negocio" : "Business Financials"
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
	});
}
//#endregion
export { NumbersPage as component };
