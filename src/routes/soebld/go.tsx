import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { claimSeat } from "@/lib/metalcon/api";
import { writeSeat } from "@/lib/metalcon/session";
import { Btn, Card } from "@/components/game/ui";
import { LangSwitch, useLang } from "@/lib/metalcon/lang";
import { deptLabel, t } from "@/lib/metalcon/i18n";

export const Route = createFileRoute("/soebld/go")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: String(search.id ?? ""),
    k: String(search.k ?? search.t ?? ""),
  }),
  component: GoPage,
});

function GoPage() {
  const { id, k } = Route.useSearch();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [preview, setPreview] = useState<{ name: string; dept: string; game: number } | null>(null);
  const [terms, setTerms] = useState(false);
  const [busy, setBusy] = useState(false);
  const { lang, setLang } = useLang(id);

  useEffect(() => {
    document.title = "Your seat";
    let stop = false;
    void claimSeat({ data: { id, token: k, terms: false } }).then((res) => {
      if (stop) return;
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      if (res.needsTerms) {
        setPreview({ name: res.name, dept: res.dept, game: res.game });
        return;
      }
      writeSeat(res.player);
      void navigate({ to: "/soebld/play", search: { seat: res.player.id } });
    }).catch((error) => {
      if (!stop) setErr(error instanceof Error ? error.message : "Could not open the seat.");
    });
    return () => {
      stop = true;
    };
  }, [id, k, navigate]);

  async function accept() {
    setBusy(true);
    setErr("");
    const res = await claimSeat({ data: { id, token: k, terms: true } });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    if (res.needsTerms) return;
    writeSeat(res.player);
    void navigate({ to: "/soebld/play", search: { seat: res.player.id } });
  }

  return (
    <main className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest text-gold uppercase">The Business Machine Experience</p>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      <h1 className="mt-2 font-display text-3xl text-cream">{preview ? preview.name : t("seat.opening", lang).replace("…", "")}</h1>
      {preview ? (
        <Card className="mt-4 space-y-3">
          <p className="text-sm text-cream">
            {t("play.round", lang)} {preview.game} · {deptLabel(preview.dept, lang)}
          </p>
          <label className="flex items-start gap-3 text-sm text-cream">
            <input type="checkbox" className="mt-1 size-5 accent-[#d4a05c]" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
            <span>
              {t("seat.agree", lang)}{" "}
              <Link to="/soebld/terms" className="font-semibold text-gold" target="_blank">
                {t("seat.terms", lang)}
              </Link>
              .
            </span>
          </label>
          <Btn className="w-full" disabled={busy || !terms} onClick={() => void accept()}>
            {t("seat.take", lang)}
          </Btn>
        </Card>
      ) : (
        <p className="mt-3 text-sm text-muted">{err || (id && k ? t("seat.opening", lang) : t("seat.invalid", lang))}</p>
      )}
      {err && preview ? <p className="mt-3 text-sm text-orange-ink">{err}</p> : null}
    </main>
  );
}
