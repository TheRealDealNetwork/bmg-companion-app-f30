import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as money, o as pct } from "./format-DkJBbT9C.mjs";
import { F as readProfileSession, H as searchPeople, L as readThread, P as readProfile, S as friendAct, U as sendMessage, V as saveProfile, c as Field, l as ProfileBlock, n as Btn, q as writeProfileSession, r as Card, t as BrandBar, v as clearProfileSession, w as imagineAvatar } from "./ui-TaOKJTPB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/me-Cb5YqHU0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MePage() {
	const [ready, setReady] = (0, import_react.useState)(() => Boolean(readProfileSession()));
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [career, setCareer] = (0, import_react.useState)(null);
	const [friends, setFriends] = (0, import_react.useState)([]);
	const [err, setErr] = (0, import_react.useState)("");
	async function load() {
		const secret = readProfileSession()?.secret;
		if (!secret) return;
		const res = await readProfile({ data: { secret } });
		if (!res.ok) {
			setErr(res.error);
			return;
		}
		setProfile(res.profile);
		setCareer(res.career);
		setFriends(res.friends);
		const held = readProfileSession();
		if (held && held.avatar !== res.profile.avatar) writeProfileSession({
			...held,
			avatar: res.profile.avatar
		});
	}
	(0, import_react.useEffect)(() => {
		if (ready) load();
	}, [ready]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-navy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandBar, { trail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/",
			className: "text-sm font-semibold text-gold",
			children: "Home"
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-3xl space-y-3 px-4 py-6",
			children: !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-cream",
					children: "Your profile"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Create a username once. The game still shows your real name."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileBlock, { onReady: () => setReady(true) }),
				err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-orange-ink",
					children: err
				}) : null
			] }) : !profile || !career ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-cream",
				children: err || "Opening your record…"
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "profile",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [profile.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: profile.avatar,
								alt: "",
								className: "size-16 rounded-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-16 items-center justify-center rounded-full bg-gold font-display text-2xl text-navy",
								children: profile.first.slice(0, 1)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "font-display text-3xl text-cream",
									children: [
										profile.first,
										" ",
										profile.last
									]
								}),
								profile.rank === "super" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-gold",
									children: "Super Admin"
								}) : profile.rank === "host" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-gold",
									children: "Host Admin"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [profile.city, profile.state ? `, ${profile.state}` : ""]
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 flex flex-wrap gap-2",
							children: career.badges.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								title: badge.detail,
								className: "rounded-full border border-gold px-3 py-1 text-xs font-semibold text-gold",
								children: badge.title
							}, badge.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-3 gap-2 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Games",
									v: String(career.games)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Wins",
									v: String(career.wins)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Best rate",
									v: pct(career.rate)
								})
							]
						}),
						!profile.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "Add your email to receive reports and offers from the school, including possible job leads."
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								kind: "navy",
								onClick: () => void navigator.clipboard?.writeText(`${window.location.origin}/p/${profile.username}`),
								children: "Share results"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								kind: "ghost",
								onClick: () => {
									clearProfileSession();
									setReady(false);
									setProfile(null);
								},
								children: "Sign out"
							})]
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "settings",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, {
						profile,
						onSaved: () => void load()
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "record",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-cream",
							children: "Roles"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1 text-sm",
							children: career.roles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between text-cream",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: role.role }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [
										role.games,
										" games · ",
										role.best,
										" best · ",
										role.weak,
										" weak"
									]
								})]
							}, role.role))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-xl text-cream",
							children: "Progression"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-2",
							children: career.history.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									game.company,
									" · ",
									game.role
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									game.win ? "Win" : "Short",
									" · ",
									money(game.valuation)
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 h-2 rounded-full bg-navy",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 rounded-full bg-gold",
									style: { width: `${Math.min(100, (game.best + 1) * 12)}%` }
								})
							})] }, game.code))
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Friends, {
					friends,
					onChange: () => void load()
				})
			] })
		})]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-navy-2 px-2 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] tracking-wide text-muted uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl text-cream",
			children: v
		})]
	});
}
function Editor({ profile, onSaved }) {
	const [city, setCity] = (0, import_react.useState)(profile.city);
	const [stateName, setStateName] = (0, import_react.useState)(profile.state);
	const [email, setEmail] = (0, import_react.useState)(profile.email);
	const [phone, setPhone] = (0, import_react.useState)(profile.phone);
	const [photo, setPhoto] = (0, import_react.useState)(profile.avatar);
	const [look, setLook] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	async function save(avatar) {
		setBusy(true);
		setErr("");
		try {
			const secret = readProfileSession()?.secret ?? "";
			const nextAvatar = avatar ?? photo;
			const res = await saveProfile({ data: {
				secret,
				first: profile.first,
				last: profile.last,
				city,
				state: stateName,
				email,
				phone,
				avatar: nextAvatar,
				firstTime: profile.background.firstTime,
				trades: profile.background.trades,
				title: profile.background.title,
				company: profile.background.company,
				workCity: profile.background.workCity
			} });
			if (!res.ok) {
				setErr(res.error);
				return;
			}
			if (avatar) setPhoto(avatar);
			const held = readProfileSession();
			if (held) writeProfileSession({
				...held,
				avatar: nextAvatar
			});
			onSaved();
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Could not save that photo.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl text-cream",
			children: "Contact and photo"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Friends you accept can email or call what you put here. The board never shows it. Your photo shows on your profile."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-center gap-3",
			children: [photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photo,
				alt: "",
				className: "size-16 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-16 items-center justify-center rounded-full bg-gold font-display text-2xl text-navy",
				children: profile.first.slice(0, 1)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "image/jpeg,image/png,image/webp",
					className: "sr-only",
					onChange: (e) => {
						const file = e.target.files?.[0];
						e.target.value = "";
						if (!file) return;
						if (/heic|heif/i.test(file.type) || /\.heic$/i.test(file.name)) {
							setErr("Save that photo as a JPEG or PNG, then upload it.");
							return;
						}
						setBusy(true);
						setErr("");
						fileToJpeg(file).then((avatar) => save(avatar)).catch((error) => {
							setBusy(false);
							setErr(error instanceof Error ? error.message : "Could not use that photo.");
						});
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "navy",
					disabled: busy,
					onClick: () => fileRef.current?.click(),
					children: busy ? "Working…" : "Upload a photo"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				"aria-label": "Avatar description",
				value: look,
				onChange: (e) => setLook(e.target.value),
				placeholder: "Describe an avatar, such as a gold hard hat"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				kind: "navy",
				disabled: busy || look.trim().length < 3,
				onClick: () => {
					setBusy(true);
					setErr("");
					imagineAvatar({ data: { prompt: look } }).then(async (res) => {
						if (!res.ok) {
							setErr(res.error);
							setBusy(false);
							return;
						}
						await save(await fitJpeg(res.image));
					}).catch((error) => {
						setBusy(false);
						setErr(error instanceof Error ? error.message : "Could not draw that avatar.");
					});
				},
				children: "Draw it"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-2 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					"aria-label": "City",
					value: city,
					onChange: (e) => setCity(e.target.value),
					placeholder: "City"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					"aria-label": "State",
					value: stateName,
					onChange: (e) => setStateName(e.target.value),
					placeholder: "State"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					"aria-label": "Email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					placeholder: "Email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					"aria-label": "Phone",
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					placeholder: "Phone"
				})
			]
		}),
		err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-orange-ink",
			children: err
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			className: "mt-3",
			disabled: busy,
			onClick: () => void save(),
			children: "Save"
		})
	] });
}
function fileToJpeg(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that photo."));
		reader.onload = () => {
			fitJpeg(String(reader.result)).then(resolve, reject);
		};
		reader.readAsDataURL(file);
	});
}
function fitJpeg(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = 256;
			canvas.height = 256;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(/* @__PURE__ */ new Error("Could not use that image."));
				return;
			}
			const side = Math.min(img.width, img.height) || 1;
			ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, 256, 256);
			let quality = .82;
			let data = canvas.toDataURL("image/jpeg", quality);
			while (data.length > 17e4 && quality > .4) {
				quality -= .12;
				data = canvas.toDataURL("image/jpeg", quality);
			}
			if (!data.startsWith("data:image/jpeg;base64,") || data.length > 18e4) {
				reject(/* @__PURE__ */ new Error("That image is too large. Try another one."));
				return;
			}
			resolve(data);
		};
		img.onerror = () => reject(/* @__PURE__ */ new Error("Use a JPEG or PNG. Phone HEIC photos need to be saved as JPEG first."));
		img.src = src;
	});
}
function Friends({ friends, onChange }) {
	const [username, setUsername] = (0, import_react.useState)("");
	const [found, setFound] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)("");
	const [thread, setThread] = (0, import_react.useState)([]);
	const [body, setBody] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const secret = () => readProfileSession()?.secret ?? "";
	async function act(action, name) {
		const res = await friendAct({ data: {
			secret: secret(),
			username: name,
			action
		} });
		if (!res.ok) setErr(res.error);
		else onChange();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "friends",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-cream",
				children: "Players you know"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					"aria-label": "Find username",
					value: username,
					onChange: (e) => setUsername(e.target.value),
					placeholder: "Their username"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					kind: "navy",
					onClick: () => {
						searchPeople({ data: {
							secret: secret(),
							username
						} }).then((res) => {
							if (!res.ok) {
								setErr(res.error);
								setFound("");
								return;
							}
							setFound(res.username);
							setErr("");
						});
					},
					children: "Find"
				})]
			}),
			found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "mt-2 text-sm font-semibold text-gold",
				onClick: () => void act("request", found),
				children: [
					"Ask ",
					found,
					" to connect"
				]
			}) : null,
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-orange-ink",
				children: err
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-3",
				children: friends.map((friend) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-t border-line pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-cream",
							children: friend.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: friend.status === "accepted" ? friend.city : friend.status === "incoming" ? "Wants to connect" : "Request sent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [
								friend.status === "incoming" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									className: "px-3 py-1 text-xs",
									onClick: () => void act("accept", friend.username),
									children: "Accept"
								}) : null,
								friend.status === "accepted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									kind: "navy",
									className: "px-3 py-1 text-xs",
									onClick: () => {
										setOpen(friend.username);
										readThread({ data: {
											secret: secret(),
											username: friend.username
										} }).then((res) => {
											if (res.ok) setThread(res.messages);
										});
									},
									children: "Chat"
								}) : null,
								friend.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "rounded-xl border border-gold px-3 py-1 text-xs font-semibold text-gold",
									href: `mailto:${friend.email}`,
									children: "Email"
								}) : null,
								friend.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "rounded-xl border border-gold px-3 py-1 text-xs font-semibold text-gold",
									href: `tel:${friend.phone}`,
									children: "Call"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									kind: "ghost",
									className: "px-3 py-1 text-xs",
									onClick: () => void act("remove", friend.username),
									children: "Remove"
								})
							]
						}),
						open === friend.username ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "max-h-48 space-y-1 overflow-auto text-sm",
								children: thread.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: item.mine ? "text-right text-gold" : "text-cream",
									children: item.body
								}, `${item.body}-${index}`))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									"aria-label": "Message",
									value: body,
									onChange: (e) => setBody(e.target.value),
									placeholder: "Message"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									onClick: () => {
										sendMessage({ data: {
											secret: secret(),
											username: friend.username,
											body
										} }).then(async (res) => {
											if (!res.ok) {
												setErr(res.error);
												return;
											}
											setBody("");
											const next = await readThread({ data: {
												secret: secret(),
												username: friend.username
											} });
											if (next.ok) setThread(next.messages);
										});
									},
									children: "Send"
								})]
							})]
						}) : null
					]
				}, friend.username))
			})
		]
	}) });
}
//#endregion
export { MePage as component };
