import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as money } from "./format-DkJBbT9C.mjs";
import { i as useLang, n as deptLabel, r as t, t as LangSwitch } from "./lang-C7kQIzzx.mjs";
import { r as Card } from "./ui-TaOKJTPB.mjs";
import { S as companyBoard, f as readSeat } from "./router-BUNHsq7S.mjs";
import { t as CompanyBanner } from "./company-banner-B92gQ5jp.mjs";
import { n as DEPTS, r as DEPT_COLOR, t as COMPANY_NAVY } from "./principle-bank-D65k56hX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scoreboard-D-wzPUkt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ScoreboardPage() {
	const navigate = useNavigate();
	const [seat, setSeat] = (0, import_react.useState)(null);
	const [board, setBoard] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("departments");
	const { lang, setLang } = useLang(seat?.id);
	(0, import_react.useEffect)(() => {
		document.title = lang === "es" ? "Tabla de Valor" : "Value Scoreboard";
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
	const empty = numbers.players.every((p) => p.cents === 0) && numbers.revenueCents === 0;
	const byDept = new Map(numbers.departments.map((row) => [row.dept, row.cents]));
	DEPTS.reduce((sum, dept) => sum + (byDept.get(dept) ?? 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
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
				name: numbers.companyName,
				lang
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-2xl text-cream",
				style: {
					fontFamily: "Montserrat, sans-serif",
					fontWeight: 700
				},
				children: lang === "es" ? "Tabla de Valor" : "Value Scoreboard"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: lang === "es" ? "Quién está aportando más valor a la empresa." : "Who's adding the most value to the company."
			}),
			empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: lang === "es" ? "Todavía no hay números. Juega tu primera carta para poner la máquina en marcha." : "No numbers yet. Play your first card to get the machine moving."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex gap-2",
				children: [
					"players",
					"departments",
					"company"
				].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(key),
					className: `rounded-xl px-3 py-2 text-sm font-semibold ${tab === key ? "bg-gold text-navy" : "border border-line text-cream"}`,
					children: key === "players" ? lang === "es" ? "Jugadores" : "Players" : key === "departments" ? lang === "es" ? "Departamentos" : "Departments" : lang === "es" ? "Empresa" : "Company"
				}, key))
			}),
			tab === "departments" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: DEPTS.map((dept) => {
					const cents = byDept.get(dept) ?? 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-xl px-3 py-2 text-cream",
						style: { background: DEPT_COLOR[dept] },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontFamily: "Montserrat, sans-serif",
								fontWeight: 700
							},
							children: deptLabel(dept, lang)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { fontFamily: "Inter, sans-serif" },
							children: money(cents)
						})]
					}, dept);
				})
			}) : null,
			tab === "players" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mt-4 space-y-1 text-sm text-cream",
				children: numbers.players.filter((p) => DEPTS.includes(p.dept)).map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						player.name,
						" · ",
						deptLabel(player.dept, lang)
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(player.cents) })]
				}, player.id))
			}) : null,
			tab === "company" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2 rounded-xl px-4 py-4 text-cream",
				style: { background: COMPANY_NAVY },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-wide text-gold",
						style: { fontFamily: "Montserrat, sans-serif" },
						children: lang === "es" ? "Resultados de la empresa" : "Company results"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang === "es" ? "Ingresos" : "Revenue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(numbers.revenueCents) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang === "es" ? "Nómina" : "Payroll" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(numbers.payrollCents) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang === "es" ? "Utilidad neta" : "Net profit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(numbers.revenueCents - numbers.payrollCents - (numbers.fixedCents ?? 0)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: lang === "es" ? "Igual que Números y Finanzas." : "Same as Numbers and Financials."
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
						to: "/soebld/financials",
						className: "text-sm font-semibold text-gold",
						children: lang === "es" ? "Finanzas del Negocio" : "Business Financials"
					})
				]
			})
		]
	});
}
//#endregion
export { ScoreboardPage as component };
