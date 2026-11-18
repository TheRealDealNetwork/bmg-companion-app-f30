const cache = new Map<string, string>();

export async function speakRecord(text: string): Promise<{ ok: true; audio: string } | { ok: false; error: string }> {
  const spoken = text.replace(/\s+/g, " ").trim().slice(0, 1800);
  if (spoken.length < 2) return { ok: false, error: "Nothing to read." };
  const hit = cache.get(spoken);
  if (hit) return { ok: true, audio: hit };
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false, error: "Read aloud is not available right now." };
  const res = await fetch("https://api.x.ai/v1/tts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: spoken, voice_id: "eve", language: "en" }),
  });
  if (!res.ok) return { ok: false, error: "Read aloud is not available right now." };
  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length < 80) return { ok: false, error: "Read aloud is not available right now." };
  const audio = bytes.toString("base64");
  if (cache.size > 40) cache.clear();
  cache.set(spoken, audio);
  return { ok: true, audio };
}
