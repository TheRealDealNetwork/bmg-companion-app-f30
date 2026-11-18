import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as Field, n as Btn, r as Card } from "./ui-TaOKJTPB.mjs";
import { ut as submitHostLead } from "./router-BUNHsq7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/host-CZCOLI3p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HostInterest() {
	const [company, setCompany] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [state, setState] = (0, import_react.useState)("");
	const [headcount, setHeadcount] = (0, import_react.useState)("");
	const [timing, setTiming] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [contact, setContact] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	async function submit() {
		setBusy(true);
		setErr("");
		try {
			const res = await submitHostLead({ data: {
				company,
				name,
				title,
				phone,
				email,
				city,
				state,
				headcount,
				timing,
				notes,
				contact
			} });
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			setDone(true);
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not save that. Try again.");
		} finally {
			setBusy(false);
		}
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-widest text-gold uppercase",
				children: "The Business Machine Experience"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: "We have it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					"Johnny will reach out about hosting a game day for ",
					company,
					"."
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-widest text-gold uppercase",
				children: "The Business Machine Experience"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: "Host a game day"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Your company runs the board. We bring the cards, the host desk, and the debrief. Leave your details and we will call you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Company",
						placeholder: "Company",
						value: company,
						onChange: (e) => setCompany(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Your name",
						placeholder: "Your name",
						value: name,
						onChange: (e) => setName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Title",
						placeholder: "Title",
						value: title,
						onChange: (e) => setTitle(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Mobile",
						inputMode: "tel",
						placeholder: "Mobile",
						value: phone,
						onChange: (e) => setPhone(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "Email",
						inputMode: "email",
						placeholder: "Email",
						value: email,
						onChange: (e) => setEmail(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_6rem] gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"aria-label": "City",
							placeholder: "City",
							value: city,
							onChange: (e) => setCity(e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"aria-label": "State",
							placeholder: "State",
							value: state,
							onChange: (e) => setState(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "About how many people",
						placeholder: "About how many people",
						value: headcount,
						onChange: (e) => setHeadcount(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"aria-label": "When you want it",
						placeholder: "When you want it",
						value: timing,
						onChange: (e) => setTiming(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						"aria-label": "Notes",
						placeholder: "Anything we should know",
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						className: "min-h-24 w-full rounded-xl border border-line bg-navy px-3 py-2 text-sm text-cream outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-3 text-sm text-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-5 accent-[#d4a05c]",
							checked: contact,
							onChange: (e) => setContact(e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "You can contact me about hosting a game day." })]
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-orange-ink",
						children: err
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "w-full",
						disabled: busy || !contact,
						onClick: () => void submit(),
						children: busy ? "Sending…" : "Send my details"
					})
				]
			})
		]
	});
}
//#endregion
export { HostInterest as component };
