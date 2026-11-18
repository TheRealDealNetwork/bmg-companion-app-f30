/** Spanish for scenario cards. English is the source. Missing keys fall back to English. */
import { ALL_SCENARIOS, type ScenarioEs } from "./es-all";

export type { ScenarioEs };

export function scenarioEs(code: string): ScenarioEs | null {
  const c = code.trim().toUpperCase();
  if (c.startsWith("BE-OW") || c.startsWith("BE-RE")) return null;
  return ALL_SCENARIOS[code] ?? null;
}
