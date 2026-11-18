import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as money } from "./format-DkJBbT9C.mjs";
import { d as House, f as Hammer, g as Calculator, h as ChevronRight, l as Phone, m as DollarSign, r as User, s as Star } from "../_libs/lucide-react.mjs";
import { n as Btn, u as ReadAloud } from "./ui-TaOKJTPB.mjs";
import { i as DEPT_SHORT, n as BOARD_CUE } from "./types-D1bYXzt9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/board-CydjMLqt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BoardCue({ view, onNext, onBack }) {
	const step = view.boardStep % BOARD_CUE.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-wide text-muted uppercase",
				children: "At the board"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [onBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "ghost",
					className: "px-3 py-1 text-xs",
					onClick: onBack,
					children: "Previous department"
				}) : null, onNext ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "navy",
					className: "px-3 py-1 text-xs",
					onClick: onNext,
					children: "Next department"
				}) : null]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 flex gap-2 overflow-x-auto pb-1",
			children: BOARD_CUE.map((dept, index) => {
				const head = view.heads.find((item) => item.dept === dept);
				const on = index === step;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `min-w-32 shrink-0 rounded-xl border px-3 py-2 ${on ? "border-gold bg-navy-2" : "border-line bg-card"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-muted",
							children: index + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `font-semibold ${on ? "text-orange-ink" : "text-cream"}`,
							children: DEPT_SHORT[dept]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: head?.name ?? "Open seat"
						})
					]
				}, dept);
			})
		})]
	});
}
var SLOTS = [
	{
		n: 1,
		cents: 1e6
	},
	{
		n: 2,
		cents: 1e6
	},
	{
		n: 3,
		cents: 1e6
	},
	{
		n: 4,
		cents: 2e6
	},
	{
		n: 5,
		cents: 2e6
	},
	{
		n: 6,
		cents: 2e6
	},
	{
		n: 7,
		cents: 3e6
	},
	{
		n: 8,
		cents: 3e6
	},
	{
		n: 9,
		cents: 3e6
	}
];
var STAGES = [
	{
		dept: "Marketing",
		label: "Star",
		fill: "bg-stage-star",
		edge: "border-stage-star text-stage-star",
		Icon: Star
	},
	{
		dept: "Appointment Center",
		label: "Phone",
		fill: "bg-stage-phone",
		edge: "border-stage-phone text-stage-phone",
		Icon: Phone
	},
	{
		dept: "Sales",
		label: "Sale",
		fill: "bg-stage-sale",
		edge: "border-stage-sale text-stage-sale",
		Icon: DollarSign
	},
	{
		dept: "Production",
		label: "Hammer",
		fill: "bg-stage-hammer",
		edge: "border-stage-hammer text-stage-hammer",
		Icon: Hammer
	},
	{
		dept: "Accounting",
		label: "Calculator",
		fill: "bg-stage-calc",
		edge: "border-stage-calc text-stage-calc",
		Icon: Calculator
	}
];
function ProjectBoard({ projects, wide = false }) {
	const [id, setId] = (0, import_react.useState)(null);
	const project = projects.find((item) => item.id === id) ?? null;
	const byNumber = new Map(projects.map((item) => [item.n, item]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-board px-3 pt-6 pb-4 sm:px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: `grid gap-x-4 gap-y-6 ${wide ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`,
			children: SLOTS.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, {
				slot,
				project: byNumber.get(slot.n) ?? null,
				room: wide,
				onOpen: setId
			}, slot.n))
		}), project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			title: `Project ${project.n} · ${money(project.valueCents || SLOTS[project.n - 1]?.cents || 0)}`,
			onClose: () => setId(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Details, { project })
		}) : null]
	});
}
function ProjectCard({ slot, project, room, onOpen }) {
	const price = project?.valueCents || slot.cents;
	const open = Boolean(project);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "relative rounded-3xl border-2 border-board-line px-3 pt-6 pb-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-board-line bg-board px-3 py-1 text-center text-xs font-bold tracking-wide text-cream whitespace-nowrap",
				children: [
					"PROJECT ",
					slot.n,
					" - ",
					money(price)
				]
			}),
			project?.collected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-2 text-center text-sm font-bold text-green-400",
				children: ["Completed · ", money(project.earnedCents ?? project.valueCents)]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
					kind: "customer",
					name: project?.customer?.name,
					open,
					onClick: project ? () => onOpen(project.id) : void 0
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
					kind: "house",
					name: project?.house?.name,
					open,
					onClick: project ? () => onOpen(project.id) : void 0
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageTrack, {
				project,
				room
			})
		]
	});
}
function Face({ kind, name, open, onClick }) {
	const house = kind === "house" ? houseArt(name) : null;
	const customer = kind === "customer" ? customerArt(name) : null;
	const picture = house || customer;
	const className = `flex min-h-28 flex-col overflow-hidden rounded-xl border-2 ${kind === "customer" ? "border-customer bg-customer text-gold-ink" : "border-house bg-house text-gold-ink"} ${onClick ? "touch-manipulation active:scale-[0.98]" : ""} ${open ? "" : "opacity-80"}`;
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		picture ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: picture,
			alt: "",
			className: "h-24 w-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex flex-1 items-center justify-center pt-3",
			children: kind === "customer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
				className: "size-8",
				"aria-hidden": true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
				className: "size-8",
				"aria-hidden": true
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "px-2 pt-1 text-center text-[10px] font-bold tracking-wide uppercase",
			children: kind === "customer" ? "Customer" : "House"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "line-clamp-2 px-2 pb-2 text-center text-xs font-semibold",
			children: open ? name || "Assigned" : "Not open yet"
		})
	] });
	if (onClick) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className,
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		children: body
	});
}
function customerArt(name) {
	if (!name) return null;
	const key = name.toLowerCase();
	if (key.includes("garcia")) return "/customers/garcia.jpg";
	if (key.includes("harris")) return "/customers/harris.jpg";
	if (key.includes("kim")) return "/customers/kim.jpg";
	if (key.includes("lee")) return "/customers/lee.jpg";
	if (key.includes("brien")) return "/customers/obrien.jpg";
	if (key.includes("patel")) return "/customers/patel.jpg";
	if (key.includes("rivera")) return "/customers/rivera.jpg";
	if (key.includes("stanley")) return "/customers/stanley.jpg";
	if (key.includes("thompson")) return "/customers/thompson.jpg";
	return null;
}
function houseArt(name) {
	if (!name) return null;
	const key = name.toLowerCase();
	if (key.includes("bi-level")) return "/houses/bi-level.jpg";
	if (key.includes("bungalow")) return "/houses/bungalow.jpg";
	if (key.includes("victorian")) return "/houses/victorian.jpg";
	if (key.includes("lake")) return "/houses/lake.jpg";
	if (key.includes("ranch")) return "/houses/ranch.jpg";
	if (key.includes("split-level")) return "/houses/split-level.jpg";
	if (key.includes("colonial")) return "/houses/colonial.jpg";
	if (key.includes("mcmansion")) return "/houses/mcmansion.jpg";
	if (key.includes("rowhome") || key.includes("row house")) return "/houses/rowhome.jpg";
	return null;
}
function StageTrack({ project, room }) {
	const box = room ? "size-12" : "size-10";
	const glyph = room ? "size-6" : "size-5";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 flex items-center justify-between rounded-full border border-board-line px-2 py-2",
		children: STAGES.map((stage, index) => {
			const mine = project?.tokens.filter((token) => token.dept === stage.dept) ?? [];
			const filled = mine.filter((token) => token.filled).length;
			const bonus = mine.some((token) => token.bonus);
			const bonusDone = mine.some((token) => token.bonus && token.filled);
			const on = filled > 0;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center",
				children: [index > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: "size-4 shrink-0 text-board-line",
					"aria-hidden": true
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					title: `${DEPT_SHORT[stage.dept]} · ${on ? "Played" : "Open slot"}${bonus ? " · +1 required" : ""}`,
					className: `relative flex items-center justify-center rounded-full border-2 ${box} ${on ? `${stage.fill} border-transparent text-cream ring-4 ring-gold` : `${stage.edge} bg-transparent`}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(stage.Icon, {
						className: glyph,
						"aria-hidden": true
					}), bonus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-0.5 text-[9px] font-bold text-navy ${bonusDone ? "ring-2 ring-cream" : ""}`,
						children: "+1"
					}) : null]
				})]
			}, stage.dept);
		})
	});
}
function Details({ project }) {
	const script = [
		`Customer. ${project.customer?.name ?? "Not assigned"}.`,
		project.customer?.text ?? "",
		`House. ${project.house?.name ?? "Not assigned"}.`,
		project.house?.text ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 text-sm leading-relaxed",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloud, { text: script }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-customer p-3 text-gold-ink",
				children: [
					customerArt(project.customer?.name) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: customerArt(project.customer?.name) ?? "",
						alt: "",
						className: "mb-2 h-40 w-full rounded-lg object-cover"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-wide uppercase",
						children: "Customer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: project.customer?.name ?? "Not assigned"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: project.customer?.text
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl bg-house text-gold-ink",
				children: [houseArt(project.house?.name) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: houseArt(project.house?.name) ?? "",
					alt: "",
					className: "h-40 w-full object-cover"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold tracking-wide uppercase",
							children: "House"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: project.house?.name ?? "Not assigned"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: project.house?.text
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1",
				children: STAGES.map((stage) => {
					const mine = project.tokens.filter((token) => token.dept === stage.dept);
					const filled = mine.filter((token) => token.filled).length;
					const bonus = mine.some((token) => token.bonus);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between text-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stage.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [filled ? `${filled} played` : "Not played", bonus ? " · +1" : ""] })]
					}, stage.dept);
				})
			})
		]
	});
}
function Sheet({ title, children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-navy/80 p-3 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			className: "max-h-screen w-full max-w-lg overflow-auto rounded-2xl bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-cream",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 px-2 text-sm font-semibold text-cream",
					onClick: onClose,
					children: "Close"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children
			})]
		})
	});
}
//#endregion
export { ProjectBoard as n, Sheet as r, BoardCue as t };
