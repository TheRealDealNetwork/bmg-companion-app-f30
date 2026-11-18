import type { Lang } from "@/lib/metalcon/i18n";

/** Company name locked by the vote. Event name stays English. */
export function CompanyBanner({ name, lang }: { name: string; lang: Lang }) {
  const event = "The Business Machine Experience";
  const label = name ? `${lang === "es" ? "Empresa" : "Company"} · ${event}` : event;
  const text = name ? `${lang === "es" ? "Nuestra empresa" : "Our company"}: ${name}` : event;
  return (
    <p
      className="mb-3 rounded-xl px-3 py-2 text-center text-sm font-bold tracking-wide text-cream"
      style={{ background: "#1B2A4A", fontFamily: "Montserrat, sans-serif" }}
      aria-label={label}
    >
      {text}
    </p>
  );
}
