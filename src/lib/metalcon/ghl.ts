const LOCATION = "wFA7c81WPLZah5WDzehk";
const PIPELINE = "SYmIhCUjPNWZTjZpO7jf";
const STAGE = "1b4864f2-da18-46ed-b278-8b5b34a06cf9";
const API = "https://services.leadconnectorhq.com";

type Lead = {
  company: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  headcount: string;
  timing: string;
  notes: string;
};

function splitName(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return { firstName: parts[0] ?? name, lastName: parts.slice(1).join(" ") };
}

async function ghl(path: string, body: Record<string, unknown>, token: string) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`GHL ${res.status}: ${text.slice(0, 180)}`);
  return text ? (JSON.parse(text) as Record<string, unknown>) : {};
}

export async function pushHostLead(lead: Lead): Promise<{ contactId: string } | null> {
  const token = process.env.GHL_TOKEN?.trim();
  if (!token) return null;
  const { firstName, lastName } = splitName(lead.name);
  const contact = await ghl(
    "/contacts/upsert",
    {
      locationId: LOCATION,
      firstName,
      lastName,
      name: lead.name,
      email: lead.email || undefined,
      phone: lead.phone || undefined,
      companyName: lead.company,
      city: lead.city || undefined,
      state: lead.state || undefined,
      country: "US",
      source: "SOEBLD host QR",
      tags: ["SOEBLD", "Host a Game Day"],
    },
    token,
  );
  const contactId = String((contact.contact as { id?: string } | undefined)?.id ?? contact.id ?? "");
  if (!contactId) return null;
  const detail = [
    lead.title ? `Title: ${lead.title}` : "",
    lead.headcount ? `People: ${lead.headcount}` : "",
    lead.timing ? `When: ${lead.timing}` : "",
    lead.notes ? `Notes: ${lead.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  await ghl(
    "/opportunities/",
    {
      locationId: LOCATION,
      pipelineId: PIPELINE,
      pipelineStageId: STAGE,
      contactId,
      name: `${lead.company} — host a game day`,
      status: "open",
      source: "SOEBLD host QR",
    },
    token,
  ).catch(() => undefined);
  if (detail) {
    await ghl(`/contacts/${contactId}/notes`, { body: detail }, token).catch(() => undefined);
  }
  return { contactId };
}
