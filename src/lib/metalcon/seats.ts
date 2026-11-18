import type { DeptId } from "@/lib/game/types";

/** Companion seats. Owner and Recruiting decks are not in this app. */
export const METALCON_SEATS: DeptId[] = [
  "Marketing",
  "Appointment Center",
  "Sales",
  "Production",
  "Accounting",
  "General Manager",
];

export const METALCON_SEAT_LABEL: Record<DeptId, string> = {
  Marketing: "Marketing",
  "Appointment Center": "Appointment Center",
  Sales: "Sales",
  Production: "Production / Service",
  Accounting: "Accounting",
  Recruiting: "Recruiting",
  "General Manager": "General Manager",
  Owner: "Owner",
};

export const METALCON_SEAT_LABEL_ES: Record<DeptId, string> = {
  Marketing: "Marketing",
  "Appointment Center": "Centro de Citas",
  Sales: "Ventas",
  Production: "Producción / Servicio",
  Accounting: "Contabilidad",
  Recruiting: "Reclutamiento",
  "General Manager": "Gerente General",
  Owner: "Propietario",
};
