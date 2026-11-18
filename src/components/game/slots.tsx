import { bilingual, resolveName } from "@/lib/metalcon/es-cards";
import { filledSlots } from "@/lib/metalcon/board";

const ORDER = ["Marketing", "Appointment Center", "Sales", "Production", "Accounting"] as const;

const TOKEN_IMG: Record<string, string> = {
  Marketing: "/tokens/marketing.png",
  "Appointment Center": "/tokens/appointment-center.png",
  Sales: "/tokens/sales.png",
  Production: "/tokens/production.png",
  Accounting: "/tokens/accounting.png",
};

const LABEL: Record<string, { en: string; es: string }> = {
  Marketing: { en: "Marketing", es: "Marketing" },
  "Appointment Center": { en: "Appointment Center", es: "Centro de Citas" },
  Sales: { en: "Sales", es: "Ventas" },
  Production: { en: "Production", es: "Producción" },
  Accounting: { en: "Accounting", es: "Contabilidad" },
};

type Play = { dept: string; card_name?: string; card_text?: string; status?: string; project_id?: string; other_project_id?: string | null };

function TokenImg({ dept, state }: { dept: string; state: "empty" | "filled" | "pending" }) {
  const src = TOKEN_IMG[dept] ?? "/tokens/marketing.png";
  const opacity = state === "empty" ? 0.33 : 1;
  const shadow = state === "filled" ? "drop-shadow(0 2px 3px rgba(0,0,0,0.45))" : "none";
  return (
    <img
      src={src}
      alt={`${dept} ${state}`}
      className="h-9 w-9 shrink-0 rounded-full"
      style={{ opacity, filter: shadow }}
    />
  );
}

function PlusOne({ count }: { count: number }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#F5C518] font-bold text-navy" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.5)", fontSize: 11 }}>
      +1
      {count > 1 ? (
        <span className="absolute -bottom-2 -right-2 z-30 flex items-center justify-center rounded-full bg-navy px-1 font-bold text-white" style={{ fontSize: 11, minWidth: 18, height: 18, lineHeight: "18px" }}>
          ×{count}
        </span>
      ) : null}
    </span>
  );
}

function CardSlot({ kind, value, lang }: { kind: "customer" | "house"; value: string; lang: "en" | "es" }) {
  const filled = Boolean(value);
  const border = kind === "customer" ? "#D4A05C" : "#48A8E2";
  const label = kind === "customer" ? (lang === "es" ? "Cliente" : "Customer") : (lang === "es" ? "Casa" : "House");
  return (
    <span className="inline-flex h-9 max-w-[9rem] min-w-0 items-center justify-center overflow-hidden rounded-lg px-2 text-[10px] font-semibold" style={{ border: `1.5px solid ${border}`, background: filled ? `${border}22` : "transparent", color: filled ? "#fff" : border, opacity: filled ? 1 : 0.4 }} title={`${label}: ${value || (lang === "es" ? "vacío" : "empty")}`}>
      {filled ? (() => { const b = bilingual(resolveName(value), lang); return b.secondary ? <><span className="truncate">{b.primary}</span> <span className="truncate text-[8px] opacity-60">{b.secondary}</span></> : <span className="truncate">{b.primary}</span>; })() : label}
    </span>
  );
}

export function TokenSlots({ projectId, house, customer, extraSlot, plusOnes, plays, lang }: {
  projectId?: string;
  house: string;
  customer: string;
  extraSlot?: string | null;
  plusOnes?: Record<string, number>;
  plays: Play[];
  lang: "en" | "es";
}) {
  // f30: every play counts the moment it is placed (no pending state). Count includes required +1 slots ("1 of 6").
  const { filled, need, outstanding, totalFilled, totalNeed, reasons } = filledSlots({ id: projectId, house, customer, extra_slot: extraSlot, plus_ones: plusOnes }, plays);
  const waiting = Object.entries(outstanding).map(([dept, n]) => {
    const src = reasons.filter((r) => r.dept === dept).map((r) => resolveName(r.source)).join(", ");
    return `${LABEL[dept]?.[lang] ?? dept} ${n}${src ? ` (${lang === "es" ? "+1 de" : "+1 from"} ${src})` : ""}`;
  }).join(" · ");

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <CardSlot kind="customer" value={customer} lang={lang} />
        <CardSlot kind="house" value={house} lang={lang} />
      </div>
      <div className="flex flex-wrap items-center gap-1 overflow-hidden">
        {ORDER.map((dept, idx) => {
          const have = Math.max(0, filled[dept] ?? 0);
          const plus = Math.max(0, (need[dept] ?? 1) - 1);
          const state = have >= (need[dept] ?? 1) ? "filled" as const : have > 0 ? "pending" as const : "empty" as const;
          return (
            <span key={dept} className="relative inline-flex items-center gap-1" title={`${LABEL[dept]?.[lang] ?? dept}: ${have}/${need[dept] ?? 1}`}>
              <TokenImg dept={dept} state={state} />
              {plus > 0 ? <PlusOne count={plus} /> : null}
              {idx < ORDER.length - 1 ? <span className="text-xs text-cream/40">→</span> : null}
            </span>
          );
        })}
      </div>
      <p className="text-xs text-gold">{totalFilled} {lang === "es" ? "de" : "of"} {totalNeed}</p>
      {waiting ? <p className="text-xs text-[#F5C518]">{lang === "es" ? "Falta" : "Still needs"}: {waiting}</p> : null}
    </div>
  );
}
