import type { ButtonHTMLAttributes, InputHTMLAttributes, MouseEventHandler, PointerEventHandler, ReactNode, SelectHTMLAttributes } from "react";
import { useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { speak } from "@/lib/game/api";
import { clock, money, pct, secondsLeft } from "@/lib/game/format";
import type { Board, Timers } from "@/lib/game/types";
import { useServerNow } from "./use-game";
import { AccountMenu } from "./account-menu";

export function BrandBar({ light = false, trail }: { light?: boolean; trail?: ReactNode }) {
  return (
    <header className={`border-b bg-navy text-cream ${light ? "border-gold" : "border-gold/40"}`}>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <img
          src="/logo-tlp.png"
          alt="The School of Entrepreneurship, Trades Leadership Program"
          className="h-12 w-auto rounded-full bg-cream"
        />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-tight text-cream">
            The Business Machine
          </p>
          <p className="text-xs tracking-wide text-gold">
            Trades Leadership Program
          </p>
        </div>
        {trail}
        <AccountMenu />
      </div>
    </header>
  );
}

const kinds = {
  primary: "bg-[#D4A05C] text-navy",
  navy: "border border-[#2E86AB] bg-transparent text-[#2E86AB]",
  ghost: "border-2 border-[#D4A05C] bg-transparent text-[#D4A05C]",
  gold: "bg-[#D4A05C] text-[#0C1230]",
} as const;

export function Btn({
  kind = "primary",
  className = "",
  href,
  children,
  onClick,
  onPointerDown,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { kind?: keyof typeof kinds; href?: string }) {
  const cls = `inline-flex min-h-11 touch-manipulation items-center justify-center rounded-xl px-4 py-2 text-center text-sm font-semibold no-underline select-none transition active:scale-[0.98] active:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:pointer-events-none disabled:opacity-50 ${kinds[kind]} ${className}`;
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
        onPointerDown={onPointerDown as unknown as PointerEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} onPointerDown={onPointerDown} {...props}>
      {children}
    </button>
  );
}

export function ReadAloud({ text, label = "Read aloud" }: { text: string; label?: string }) {
  const [mode, setMode] = useState<"idle" | "loading" | "playing">("idle");
  const stopRef = useRef<(() => void) | null>(null);

  function unlock() {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  }

  function deviceVoice() {
    if (!window.speechSynthesis) return false;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.onend = () => setMode("idle");
    window.speechSynthesis.speak(utter);
    stopRef.current = () => window.speechSynthesis.cancel();
    setMode("playing");
    return true;
  }

  async function play() {
    if (mode === "playing") {
      stopRef.current?.();
      setMode("idle");
      return;
    }
    const ctx = unlock();
    setMode("loading");
    try {
      const res = await speak({ data: { text } });
      if (!res.ok || !ctx) {
        if (!deviceVoice()) setMode("idle");
        return;
      }
      const raw = Uint8Array.from(atob(res.audio), (ch) => ch.charCodeAt(0));
      const buffer = await ctx.decodeAudioData(raw.buffer);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = () => setMode("idle");
      source.start();
      stopRef.current = () => {
        try {
          source.stop();
        } catch {
          /* already stopped */
        }
      };
      setMode("playing");
    } catch {
      if (!deviceVoice()) setMode("idle");
    }
  }

  return (
    <button
      type="button"
      onClick={() => void play()}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-gold px-3 text-sm font-semibold text-gold"
    >
      <Volume2 className="size-4" aria-hidden />
      {mode === "loading" ? "Reading…" : mode === "playing" ? "Stop" : label}
    </button>
  );
}

export function ClockReadout({
  timers,
  serverNow,
  which,
  warnAt = 0,
  className = "",
  warnClass = "text-orange",
  calmClass = "text-cream",
}: {
  timers: Timers;
  serverNow: number;
  which: "round" | "game";
  warnAt?: number;
  className?: string;
  warnClass?: string;
  calmClass?: string;
}) {
  const now = useServerNow(serverNow);
  const left = secondsLeft(
    which === "round" ? timers.roundDeadline : timers.gameDeadline,
    which === "round" ? timers.roundLeft : timers.gameLeft,
    timers.running,
    timers.paused,
    now,
  );
  const warn = warnAt > 0 && left <= warnAt;
  return <span className={`${className} ${warn ? warnClass : calmClass}`}>{clock(left)}</span>;
}

export function Field(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-line bg-card px-3 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${props.className ?? ""}`}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-line bg-card px-3 py-3 text-base text-ink ${props.className ?? ""}`}
    />
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-card p-4 shadow-sm ${className}`}>
      {children}
    </section>
  );
}

export function CardCopy({ text }: { text: string }) {
  const parts = text.split(/(\[(?:STAR|PHONE|SALE|HAMMER|CALCULATOR)\])/g);
  return (
    <p className="text-base leading-relaxed text-ink">
      {parts.map((part, i) => {
        const icon = /^\[(STAR|PHONE|SALE|HAMMER|CALCULATOR)\]$/.exec(part);
        if (!icon) return <span key={i}>{part}</span>;
        const label = icon[1] === "CALCULATOR" ? "Calc" : icon[1][0] + icon[1].slice(1).toLowerCase();
        return (
          <span
            key={i}
            className="mx-0.5 inline-flex items-center rounded-md bg-navy px-1.5 py-0.5 text-xs font-semibold tracking-wide text-gold"
          >
            {label}
          </span>
        );
      })}
    </p>
  );
}

export function Valuation({ board, settings }: { board: Board; settings: { marginBps: number; winCents: number; mlCents: number } }) {
  const marginLabel = `${Math.round(settings.marginBps / 100)}% margin`;
  return (
    <div className="grid grid-cols-2 gap-2">
      <Tile label="Company revenue" value={money(board.revenue)} />
      <Tile label="Net profit" value={money(board.profit)} warn={board.profit < 0} />
      <Tile label="Margin" value={pct(board.margin)} warn={board.margin !== null && !board.marginOk} />
      <Tile label="Valuation ×3" value={money(board.valuation)} gold />
      <div className="col-span-2 flex flex-wrap items-center gap-2 text-sm">
        <Badge on={board.win}>Win {money(settings.winCents)}+</Badge>
        <Badge on={board.marketLeader}>Market Leader {money(settings.mlCents)}+</Badge>
        <span className="text-muted">Both need {marginLabel}. P&P reduces payroll, never revenue.</span>
      </div>
    </div>
  );
}

function Tile({ label, value, gold, warn }: { label: string; value: string; gold?: boolean; warn?: boolean }) {
  return (
    <div className={`rounded-2xl px-3 py-3 ${gold ? "bg-gold text-navy" : "bg-navy text-cream"}`}>
      <p className={`text-[11px] font-semibold tracking-wider uppercase ${gold ? "text-gold-ink" : "text-gold"}`}>
        {label}
      </p>
      <p className={`font-display text-2xl leading-tight tabular-nums ${warn && !gold ? "text-orange" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function Badge({ children, on }: { children: ReactNode; on: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide ${on ? "bg-gold text-navy" : "bg-navy-2 text-muted"}`}
    >
      {children}
    </span>
  );
}

export function DeptTable({ board }: { board: Board }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] text-left text-sm">
        <thead className="text-xs tracking-wide text-muted uppercase">
          <tr>
            <th className="py-2 pr-2 font-semibold">Department</th>
            <th className="py-2 pr-2 text-right font-semibold">Revenue</th>
            <th className="py-2 pr-2 text-right font-semibold">P&P saved</th>
            <th className="py-2 text-right font-semibold">Profit</th>
          </tr>
        </thead>
        <tbody>
          {board.depts.map((d) => (
            <tr key={d.dept} className="border-t border-line">
              <td className="py-2 pr-2 font-semibold text-cream">{d.dept}</td>
              <td className="py-2 pr-2 text-right tabular-nums">{money(d.revenue)}</td>
              <td className="py-2 pr-2 text-right tabular-nums">{money(d.pp)}</td>
              <td className={`py-2 text-right tabular-nums ${d.profit < 0 ? "text-orange" : "text-ink"}`}>
                {money(d.profit)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Door({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-line bg-card p-4 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      <h2 className="font-display text-xl text-cream">{title}</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
    </a>
  );
}
