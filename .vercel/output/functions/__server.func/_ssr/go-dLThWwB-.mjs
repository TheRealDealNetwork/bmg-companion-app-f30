import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLang, n as deptLabel, r as t, t as LangSwitch } from "./lang-C7kQIzzx.mjs";
import { n as Btn, r as Card } from "./ui-TaOKJTPB.mjs";
import { p as writeSeat, u as Route$16, x as claimSeat } from "./router-BUNHsq7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/go-dLThWwB-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoPage() {
	const { id, k } = Route$16.useSearch();
	const navigate = useNavigate();
	const [err, setErr] = (0, import_react.useState)("");
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [terms, setTerms] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const { lang, setLang } = useLang(id);
	(0, import_react.useEffect)(() => {
		document.title = "Your seat";
		let stop = false;
		claimSeat({ data: {
			id,
			token: k,
			terms: false
		} }).then((res) => {
			if (stop) return;
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			if (res.needsTerms) {
				setPreview({
					name: res.name,
					dept: res.dept,
					game: res.game
				});
				return;
			}
			writeSeat(res.player);
			navigate({
				to: "/soebld/play",
				search: { seat: res.player.id }
			});
		}).catch((error) => {
			if (!stop) setErr(error instanceof Error ? error.message : "Could not open the seat.");
		});
		return () => {
			stop = true;
		};
	}, [
		id,
		k,
		navigate
	]);
	async function accept() {
		setBusy(true);
		setErr("");
		const res = await claimSeat({ data: {
			id,
			token: k,
			terms: true
		} });
		setBusy(false);
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		if (res.needsTerms) return;
		writeSeat(res.player);
		navigate({
			to: "/soebld/play",
			search: { seat: res.player.id }
		});
	}
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-cream",
				children: preview ? preview.name : t("seat.opening", lang).replace("…", "")
			}),
			preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-cream",
						children: [
							t("play.round", lang),
							" ",
							preview.game,
							" · ",
							deptLabel(preview.dept, lang)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-3 text-sm text-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-5 accent-[#d4a05c]",
							checked: terms,
							onChange: (e) => setTerms(e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							t("seat.agree", lang),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/soebld/terms",
								className: "font-semibold text-gold",
								target: "_blank",
								children: t("seat.terms", lang)
							}),
							"."
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "w-full",
						disabled: busy || !terms,
						onClick: () => void accept(),
						children: t("seat.take", lang)
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: err || (id && k ? t("seat.opening", lang) : t("seat.invalid", lang))
			}),
			err && preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-orange-ink",
				children: err
			}) : null
		]
	});
}
//#endregion
export { GoPage as component };
