import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLang, r as t, t as LangSwitch } from "./lang-C7kQIzzx.mjs";
import { c as Field, d as Select, n as Btn, r as Card } from "./ui-TaOKJTPB.mjs";
import { n as METALCON_SEAT_LABEL, r as METALCON_SEAT_LABEL_ES, t as METALCON_SEATS } from "./seats-BHNQe8_4.mjs";
import { t as COMPANION_CARD_COUNT } from "./cards-Bf6SXNQh.mjs";
import { M as gameJoinStatus, V as registerSeat, p as writeSeat } from "./router-BUNHsq7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/join-C6gdSp9M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEPT_PARAM = {
	mk: "Marketing",
	ac: "Appointment Center",
	sa: "Sales",
	pr: "Production",
	acc: "Accounting"
};
function JoinForm({ slug }) {
	const navigate = useNavigate();
	const { lang, setLang } = useLang();
	const [closed, setClosed] = (0, import_react.useState)(null);
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [company, setCompany] = (0, import_react.useState)("");
	const [jobTitle, setJobTitle] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [dept, setDept] = (0, import_react.useState)(METALCON_SEATS[0]);
	const [terms, setTerms] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const next = DEPT_PARAM[new URLSearchParams(window.location.search).get("dept")?.toLowerCase() ?? ""];
		if (next) setDept(next);
	}, []);
	(0, import_react.useEffect)(() => {
		let stop = false;
		gameJoinStatus({ data: { slug } }).then((res) => {
			if (stop) return;
			setClosed(res.closed === true);
		}).catch(() => {
			if (!stop) setClosed(true);
		});
		return () => {
			stop = true;
		};
	}, [slug]);
	async function submit() {
		setBusy(true);
		setErr("");
		try {
			const res = await registerSeat({ data: {
				name: `${firstName.trim()} ${lastName.trim()}`.trim(),
				firstName,
				lastName,
				company,
				jobTitle,
				phone,
				email,
				dept,
				terms,
				slug
			} });
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			writeSeat(res.player);
			navigate({
				to: "/soebld/play",
				search: { seat: res.player.id }
			});
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not save the seat.");
		} finally {
			setBusy(false);
		}
	}
	if (closed === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-widest text-gold uppercase",
				children: "SOEBLD"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: t("join.closedTitle", lang)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: t("seat.opening", lang)
			})
		]
	});
	if (closed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-widest text-gold uppercase",
					children: "SOEBLD"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
					lang,
					setLang
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: t("join.closedTitle", lang)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-cream",
				children: t("join.closed", lang)
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-widest text-gold uppercase",
				children: "SOEBLD"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: lang === "es" ? "Toma un asiento" : "Take a seat"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: lang === "es" ? "SOE Business Leadership Scenario Cards. Tu asiento es el departamento que vas a consultar." : "SOE Business Leadership Scenario Cards. Your seat is the department you will look up."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: lang === "es" ? `${COMPANION_CARD_COUNT} cartas` : `${COMPANION_CARD_COUNT} cards`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
						lang,
						setLang
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold text-cream",
						children: [lang === "es" ? "Asiento" : "Seat", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							className: "mt-1",
							value: dept,
							onChange: (e) => setDept(e.target.value),
							"aria-label": lang === "es" ? "Asiento" : "Seat",
							children: METALCON_SEATS.map((seat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: seat,
								children: lang === "es" ? METALCON_SEAT_LABEL_ES[seat] : METALCON_SEAT_LABEL[seat]
							}, seat))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold text-cream",
						children: [lang === "es" ? "Nombre" : "First name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							className: "mt-1",
							"aria-label": lang === "es" ? "Nombre" : "First name",
							placeholder: lang === "es" ? "Nombre" : "First name",
							value: firstName,
							onChange: (e) => setFirstName(e.target.value),
							autoComplete: "given-name"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold text-cream",
						children: [lang === "es" ? "Apellido" : "Last name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							className: "mt-1",
							"aria-label": lang === "es" ? "Apellido" : "Last name",
							placeholder: lang === "es" ? "Apellido" : "Last name",
							value: lastName,
							onChange: (e) => setLastName(e.target.value),
							autoComplete: "family-name"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold text-cream",
						children: [lang === "es" ? "Nombre de la empresa" : "Company name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							className: "mt-1",
							"aria-label": lang === "es" ? "Nombre de la empresa" : "Company name",
							placeholder: lang === "es" ? "Nombre de la empresa" : "Company name",
							value: company,
							onChange: (e) => setCompany(e.target.value),
							autoComplete: "organization"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold text-cream",
						children: [lang === "es" ? "Cargo" : "Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							className: "mt-1",
							"aria-label": lang === "es" ? "Cargo" : "Title",
							placeholder: lang === "es" ? "Cargo" : "Title",
							value: jobTitle,
							onChange: (e) => setJobTitle(e.target.value),
							autoComplete: "organization-title"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": lang === "es" ? "Número de celular" : "Mobile",
						inputMode: "tel",
						placeholder: lang === "es" ? "Número de celular" : "Mobile number",
						value: phone,
						onChange: (e) => setPhone(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": lang === "es" ? "Correo electrónico" : "Email",
						inputMode: "email",
						placeholder: lang === "es" ? "Correo electrónico" : "Email",
						value: email,
						onChange: (e) => setEmail(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-3 text-sm text-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-5 accent-[#d4a05c]",
							checked: terms,
							onChange: (e) => setTerms(e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							lang === "es" ? "Acepto los" : "I agree to the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/soebld/terms",
								className: "font-semibold text-gold",
								target: "_blank",
								children: lang === "es" ? "Términos y condiciones beta" : "Beta Terms & Conditions"
							}),
							"."
						] })]
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-orange-ink",
						children: err
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "w-full",
						disabled: busy || !terms,
						onClick: () => void submit(),
						children: busy ? lang === "es" ? "Guardando…" : "Saving…" : lang === "es" ? "Entrar a las cartas" : "Enter the cards"
					})
				]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
//#endregion
export { JoinForm, SplitComponent as component };
