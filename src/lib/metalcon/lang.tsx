import { useEffect, useState } from "react";
import { detectLang, type Lang } from "@/lib/metalcon/i18n";

const KEY = "soebld-lang";

export function useLang(playerId?: string) {
  const storageKey = playerId ? `${KEY}:${playerId}` : KEY;
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "en" || saved === "es") return saved;
    return detectLang();
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "en" || saved === "es") setLangState(saved);
    else setLangState(detectLang());
  }, [storageKey]);

  function setLang(next: Lang) {
    setLangState(next);
    if (typeof window !== "undefined") window.localStorage.setItem(storageKey, next);
  }

  return { lang, setLang };
}

export function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (next: Lang) => void }) {
  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      <button
        type="button"
        className={lang === "en" ? "text-gold" : "text-muted"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <span className="text-line">|</span>
      <button
        type="button"
        className={lang === "es" ? "text-gold" : "text-muted"}
        onClick={() => setLang("es")}
      >
        ESPAÑOL
      </button>
    </div>
  );
}
