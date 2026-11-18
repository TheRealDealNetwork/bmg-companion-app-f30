import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as money } from "./format-DkJBbT9C.mjs";
import { i as useLang, t as LangSwitch } from "./lang-C7kQIzzx.mjs";
import { d as Select, n as Btn, r as Card } from "./ui-TaOKJTPB.mjs";
import { S as companyBoard, f as readSeat, it as setProjectSlot } from "./router-BUNHsq7S.mjs";
import { n as resolveName, t as bilingual } from "./es-cards-CbiskBUh.mjs";
import { t as TokenSlots } from "./slots-B_8hCDMb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-DlIRmsGo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function effectLine(slot, lang) {
	const bits = [];
	if (/Bi-Level/i.test(slot.house)) bits.push(lang === "es" ? "Casa +$3,000 al completar · +1 martillo" : "House +$3,000 on completion · +1 hammer");
	if (/McMansion/i.test(slot.house)) bits.push(lang === "es" ? "Casa +$2,000 al completar · +1 espacio" : "House +$2,000 on completion · +1 slot");
	if (/Victorian/i.test(slot.house)) bits.push(lang === "es" ? "Casa +$2,000 al completar" : "House +$2,000 on completion");
	if (/Bungalow/i.test(slot.house)) bits.push(lang === "es" ? "+1 teléfono" : "+1 phone");
	if (/Lake House/i.test(slot.house)) bits.push(lang === "es" ? "+1 calculadora" : "+1 calculator");
	if (/Ranch/i.test(slot.house)) bits.push(lang === "es" ? "+1 estrella" : "+1 star");
	if (/Split-Level/i.test(slot.house)) bits.push(lang === "es" ? "+1 venta" : "+1 sale");
	if (/Colonial|Rowhome/i.test(slot.house)) bits.push(lang === "es" ? "+1 martillo" : "+1 hammer");
	if (/Harris/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$4,000 al completar" : "Customer +$4,000 on completion");
	if (/Patel/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$2,000 al completar · +1 espacio" : "Customer +$2,000 on completion · +1 slot");
	if (/Kim/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$3,000 si hay 2 estrellas" : "Customer +$3,000 if 2 marketing stars");
	if (/Garcia/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$2,000 por proyecto terminado después, tope $8,000" : "Customer +$2,000 per project finished after, cap $8,000");
	if (/Rivera/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$5,000 si hay 2 especiales" : "Customer +$5,000 if 2 specials");
	if (/Thompson/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente −$5,000 si termina 4.º o después" : "Customer −$5,000 if 4th or later");
	if (/Stanley/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente −$5,000 si no termina en la ronda 6" : "Customer −$5,000 if unfinished at round 6");
	if (/Lee/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$1,000 por ficha, tope $5,000" : "Customer +$1,000 per token, cap $5,000");
	if (/O'Brien/i.test(slot.customer)) bits.push(lang === "es" ? "Cliente +$4,000 si es el último al final del juego" : "Customer +$4,000 if last finished at game end");
	return bits.join(" · ") || (lang === "es" ? "Sin bono de casa o cliente" : "No house or customer bonus");
}
function ProjectsPage() {
	const navigate = useNavigate();
	const [seat, setSeat] = (0, import_react.useState)(null);
	const [board, setBoard] = (0, import_react.useState)(null);
	const [slots, setSlots] = (0, import_react.useState)([]);
	const [note, setNote] = (0, import_react.useState)("");
	const [loadError, setLoadError] = (0, import_react.useState)("");
	const { lang, setLang } = useLang(seat?.id);
	async function load(saved) {
		try {
			const res = await companyBoard({ data: {
				id: saved.id,
				secret: saved.secret
			} });
			if (!res.ok) {
				setLoadError(res.error);
				return;
			}
			setLoadError("");
			setBoard(res);
			setSlots(Array.from({ length: 9 }, (_, i) => {
				const n = i + 1;
				const found = res.projects.find((project) => project.n === n);
				const house = found?.house ?? "";
				const customer = found?.customer ?? "";
				return {
					n,
					id: found?.id ?? "",
					house,
					customer,
					status: found?.status === "complete" ? "complete" : found?.status === "open" ? "open" : "unopened",
					value: n <= 3 ? 1e4 : n <= 6 ? 2e4 : 3e4,
					revealed: Boolean(house && customer),
					extraSlot: found?.extra_slot ?? ""
				};
			}));
		} catch (err) {
			setLoadError(err instanceof Error ? err.message : "Could not open the projects.");
		}
	}
	(0, import_react.useEffect)(() => {
		document.title = lang === "es" ? "Proyectos" : "Projects";
		const params = new URLSearchParams(window.location.search);
		const saved = readSeat(params.get("seat") || void 0) || readSeat();
		if (!saved) navigate({ to: "/soebld/join" });
		else {
			setSeat(saved);
			load(saved);
			if (saved.dept !== "General Manager") {
				const timer = window.setInterval(() => void load(saved), 3e3);
				return () => window.clearInterval(timer);
			}
		}
	}, [lang, navigate]);
	(0, import_react.useEffect)(() => {
		const onVisible = () => {
			if (document.visibilityState === "visible") {
				const again = readSeat();
				if (again) setSeat(again);
			}
		};
		document.addEventListener("visibilitychange", onVisible);
		return () => document.removeEventListener("visibilitychange", onVisible);
	}, []);
	if (!seat || !board) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6 text-cream",
		children: loadError || (lang === "es" ? "Abriendo los proyectos…" : "Opening the projects…")
	});
	const isGm = seat.dept === "General Manager";
	const statusLabel = (status) => status === "complete" ? lang === "es" ? "Completado" : "Completed" : status === "open" ? lang === "es" ? "Abierto" : "Opened" : lang === "es" ? "No abierto" : "Not opened";
	async function save(slot) {
		const res = await setProjectSlot({ data: {
			id: seat.id,
			secret: seat.secret,
			n: slot.n,
			house: slot.house,
			customer: slot.customer,
			status: slot.status,
			extraSlot: slot.extraSlot
		} });
		setNote(res.ok ? lang === "es" ? `Proyecto ${slot.n} bloqueado.` : `Project ${slot.n} locked in.` : res.error);
		load(seat);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl text-cream",
					children: lang === "es" ? "Proyectos" : "Projects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
					lang,
					setLang
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: lang === "es" ? "Los 9 proyectos. El valor cuenta solo al completarse. Bloquea una casa y un cliente a la vez." : "All 9 projects. Value counts only on completion. Lock one house and customer at a time."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/soebld/play",
				search: { seat: seat.id },
				className: "mb-3 inline-block text-sm font-semibold text-gold",
				children: lang === "es" ? "Volver al tablero" : "Back to the board"
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-gold",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: slots.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-base font-bold text-cream",
							children: [
								lang === "es" ? "Proyecto" : "Project",
								" ",
								slot.n,
								" · ",
								money(slot.value * 100),
								" · ",
								statusLabel(slot.status)
							]
						}),
						isGm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"aria-label": lang === "es" ? "Casa" : "House",
								value: slot.house,
								onChange: (e) => setSlots((rows) => rows.map((row) => row.n === slot.n ? {
									...row,
									house: e.target.value
								} : row)),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: lang === "es" ? "Carta de casa" : "House card"
								}), board.houses.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: typeof item === "string" ? item : item.id,
									children: typeof item === "string" ? item : item.name
								}, typeof item === "string" ? item : item.id))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"aria-label": lang === "es" ? "Cliente" : "Customer",
								value: slot.customer,
								onChange: (e) => setSlots((rows) => rows.map((row) => row.n === slot.n ? {
									...row,
									customer: e.target.value
								} : row)),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: lang === "es" ? "Carta de cliente" : "Customer card"
								}), board.customers.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: typeof item === "string" ? item : item.id,
									children: typeof item === "string" ? item : item.name
								}, typeof item === "string" ? item : item.id))]
							}),
							/McMansion|Patel/i.test(`${slot.house} ${slot.customer}`) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"aria-label": lang === "es" ? "Espacio extra" : "Extra slot",
								value: slot.extraSlot,
								onChange: (e) => setSlots((rows) => rows.map((row) => row.n === slot.n ? {
									...row,
									extraSlot: e.target.value
								} : row)),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: lang === "es" ? "Espacio extra (elige departamento)" : "Extra slot (pick department)"
								}), [
									"Marketing",
									"Appointment Center",
									"Sales",
									"Production",
									"Accounting"
								].map((dept) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: dept,
									children: dept
								}, dept))]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"aria-label": lang === "es" ? "Estado" : "Status",
								value: slot.status,
								onChange: (e) => setSlots((rows) => rows.map((row) => row.n === slot.n ? {
									...row,
									status: e.target.value
								} : row)),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "unopened",
										children: lang === "es" ? "No abierto" : "Not opened"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "open",
										children: lang === "es" ? "Abierto" : "Opened"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "complete",
										children: lang === "es" ? "Completado" : "Completed"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								className: "w-full",
								onClick: () => void save(slot),
								children: lang === "es" ? "Bloquear proyecto" : "Lock in project"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-cream",
							children: [
								lang === "es" ? "Casa" : "House",
								": ",
								slot.revealed ? (() => {
									const b = bilingual(resolveName(slot.house), lang);
									return b.secondary ? `${b.primary} (${b.secondary})` : b.primary;
								})() : lang === "es" ? "Aún no revelado" : "Not yet revealed"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-cream",
							children: [
								lang === "es" ? "Cliente" : "Customer",
								": ",
								slot.revealed ? (() => {
									const b = bilingual(resolveName(slot.customer), lang);
									return b.secondary ? `${b.primary} (${b.secondary})` : b.primary;
								})() : lang === "es" ? "Aún no revelado" : "Not yet revealed"
							]
						})] }),
						slot.revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: effectLine(slot, lang)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenSlots, {
							house: slot.house,
							customer: slot.customer,
							extraSlot: slot.extraSlot,
							plays: (board.pendingPlays ?? []).filter((play) => play.n === slot.n),
							lang
						}),
						isGm && !slot.revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: lang === "es" ? "Aún no revelado" : "Not yet revealed"
						}) : null
					]
				}, slot.n))
			})
		]
	});
}
//#endregion
export { ProjectsPage as component };
