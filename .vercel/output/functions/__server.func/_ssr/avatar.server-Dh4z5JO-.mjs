import { n as isProfane } from "./guard-CeXycLg8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/avatar.server-Dh4z5JO-.js
async function imagineAvatarRecord(prompt) {
	const text = prompt.replace(/\s+/g, " ").trim().slice(0, 240);
	if (text.length < 3) return {
		ok: false,
		error: "Describe the avatar you want."
	};
	if (isProfane(text)) return {
		ok: false,
		error: "Describe an avatar without that language."
	};
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Avatar drawing is not available right now."
	};
	const res = await fetch("https://api.x.ai/v1/images/generations", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			model: "grok-imagine-image",
			prompt: `Stylized square profile portrait of a fictional character, head and shoulders, plain background, no text, no watermark, not a photograph of a real person. ${text}`,
			n: 1,
			aspect_ratio: "1:1",
			resolution: "1k",
			response_format: "b64_json"
		})
	});
	if (!res.ok) return {
		ok: false,
		error: "That avatar could not be drawn. Try a different description."
	};
	const item = (await res.json()).data?.[0];
	if (item?.b64_json) return {
		ok: true,
		image: `data:image/png;base64,${item.b64_json}`
	};
	if (!item?.url) return {
		ok: false,
		error: "That avatar could not be drawn. Try a different description."
	};
	const fetched = await fetch(item.url);
	if (!fetched.ok) return {
		ok: false,
		error: "That avatar could not be drawn. Try a different description."
	};
	const bytes = Buffer.from(await fetched.arrayBuffer());
	if (bytes.length < 80 || bytes.length > 4e6) return {
		ok: false,
		error: "That avatar could not be drawn. Try a different description."
	};
	return {
		ok: true,
		image: `data:${fetched.headers.get("content-type")?.includes("jpeg") ? "image/jpeg" : "image/png"};base64,${bytes.toString("base64")}`
	};
}
//#endregion
export { imagineAvatarRecord };
