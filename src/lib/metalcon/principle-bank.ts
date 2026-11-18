import bank from "./principle-bank-320.json";

export type PrincipleEntry = {
  id: string;
  department_en: string;
  department_es: string;
  display_en: string;
  display_es: string;
  why_en: string;
  why_es: string;
};

const byId = new Map<string, PrincipleEntry>(
  (bank as PrincipleEntry[]).map((row) => [row.id, row]),
);

export function principleFor(id: string): PrincipleEntry | null {
  const code = id.trim().toUpperCase();
  if (code.startsWith("BE-OW") || code.startsWith("BE-RE")) return null;
  return byId.get(id) ?? byId.get(code) ?? null;
}

export const DEPT_COLOR: Record<string, string> = {
  Marketing: "#C0272D",
  "Appointment Center": "#E87722",
  Sales: "#2E86AB",
  Production: "#6A4C93",
  Accounting: "#2E7D32",
  Recruiting: "#00897B",
  "General Manager": "#37474F",
  Owner: "#B8860B",
};

/** Lighter tints of the v2 palette that clear 4.5:1 on the navy card. */
export const DEPT_COLOR_ON_NAVY: Record<string, string> = {
  Marketing: "#D57074",
  "Appointment Center": "#E87722",
  Sales: "#4B97B7",
  Production: "#9A85B6",
  Accounting: "#609C63",
  "General Manager": "#879195",
};

export const DEPTS = [
  "Marketing",
  "Appointment Center",
  "Sales",
  "Production",
  "Accounting",
  "General Manager",
];

export const COMPANY_NAVY = "#1B2A4A";
