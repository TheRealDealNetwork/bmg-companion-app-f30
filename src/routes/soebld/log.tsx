import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { answerLog, companyBoard } from "@/lib/metalcon/api";
import { readPageSeat } from "@/lib/metalcon/session";
import { money } from "@/lib/game/format";
import { Card } from "@/components/game/ui";
import { CompanyBanner } from "@/components/game/company-banner";
import { LangSwitch, useLang } from "@/lib/metalcon/lang";
import { t } from "@/lib/metalcon/i18n";

export const Route = createFileRoute("/soebld/log")({
  component: LogPage,
});

type Row = {
  round_n: number;
  dept: string;
  player_name: string;
  card_code: string;
  card_title: string;
  choice: string;
  payroll_cents: number;
  score_label?: string;
  payroll_label?: string;
};

function LogPage() {
  const { lang, setLang } = useLang();
  const [rows, setRows] = useState<Row[]>([]);
  const [game, setGame] = useState<number | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [err, setErr] = useState("");
  const [seatId, setSeatId] = useState("");

  useEffect(() => {
    document.title = "The Business Machine Experience answer log";
    let stop = false;
    async function load() {
      try {
        const res = await answerLog();
        if (stop) return;
        if (!res.ok) {
          setErr("The log is not available yet.");
          return;
        }
        setRows(res.rows.filter((row) => !row.card_code.toUpperCase().startsWith("BE-OW") && !row.card_code.toUpperCase().startsWith("BE-RE")));
        setGame(res.game);
      } catch {
        if (!stop) setErr("The log is not available yet.");
      }
    }
    void load();
    const timer = window.setInterval(() => void load(), 8000);
    return () => {
      stop = true;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const seat = readPageSeat();
    if (!seat) return;
    setSeatId(seat.id);
    void companyBoard({ data: { id: seat.id, secret: seat.secret } }).then((res) => {
      if (res.ok) setCompanyName(res.companyName);
    });
  }, []);

  const depts = [...new Set(rows.map((row) => row.dept))];

  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest text-gold uppercase">The Business Machine Experience</p>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      <CompanyBanner name={companyName} lang={lang} />
      <h1 className="mt-2 font-display text-3xl text-cream">{game ? (lang === "es" ? `Registro de respuestas del juego ${game}` : `Game ${game} answer log`) : (lang === "es" ? "Registro de respuestas" : "Answer log")}</h1>
      <p className="mt-1 text-sm text-muted">{lang === "es" ? "Se guarda cada carta respondida en una ronda. Una carta posterior no reemplaza una anterior." : "Every card answered in a round is kept. A later card does not replace an earlier one."}</p>
      {err ? <p className="mt-3 text-sm text-orange-ink">{err}</p> : null}
      {depts.length === 0 && !err ? <p className="mt-4 text-sm text-muted">{lang === "es" ? "Todavía no hay respuestas." : "No answers yet."}</p> : null}
      {depts.map((dept) => (
        <Card key={dept} className="mt-4">
          <h2 className="font-display text-xl text-cream">{dept}</h2>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs tracking-wide text-gold uppercase">
                <tr>
                  <th className="py-2 pr-3">{lang === "es" ? "Ronda" : "Round"}</th>
                  <th className="py-2 pr-3">{lang === "es" ? "Jugador" : "Player"}</th>
                  <th className="py-2 pr-3">{lang === "es" ? "Carta" : "Card"}</th>
                  <th className="py-2 pr-3">{lang === "es" ? "Respuesta" : "Answer"}</th>
                  <th className="py-2">{lang === "es" ? "Nómina" : "Payroll"}</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((row) => row.dept === dept)
                  .map((row, i) => (
                    <tr key={`${row.card_code}-${row.player_name}-${i}`} className="border-t border-line">
                      <td className="py-2 pr-3 text-cream">{row.round_n}</td>
                      <td className="py-2 pr-3 text-cream">{row.player_name}</td>
                      <td className="py-2 pr-3 text-cream">
                        {row.card_code}
                        <span className="block text-xs text-muted">{row.card_title}</span>
                      </td>
                      <td className="py-2 pr-3 text-cream">{row.choice}</td>
                      <td className="py-2 text-gold">{row.payroll_label || (row.payroll_cents > 0 ? `${money(row.payroll_cents)} ${lang === "es" ? "menos en la nómina" : "off payroll"}` : row.payroll_cents < 0 ? `${money(Math.abs(row.payroll_cents))} ${lang === "es" ? "agregado a la nómina" : "added to payroll"}` : "$0")}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}
      {seatId ? <Link to="/soebld/play" search={{ seat: seatId }} className="mt-4 mr-4 inline-block text-sm font-semibold text-gold">{lang === "es" ? "Volver a tu asiento" : "Back to your seat"}</Link> : null}
      <Link to="/soebld/financials" search={seatId ? { seat: seatId } : undefined} className="mt-4 mr-4 inline-block text-sm font-semibold text-gold">
        {t("play.financials", lang)}
      </Link>
      <Link to="/soebld" className="mt-4 inline-block text-sm font-semibold text-gold">
        {lang === "es" ? "Código QR" : "QR code"}
      </Link>
    </main>
  );
}
