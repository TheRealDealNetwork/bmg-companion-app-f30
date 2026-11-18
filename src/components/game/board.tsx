import { useState } from "react";
import { Calculator, ChevronRight, DollarSign, Hammer, House, Phone, Star, User } from "lucide-react";
import { money } from "@/lib/game/format";
import { BOARD_CUE, BOARD_DEPTS, DEPT_SHORT, type DeptPlay, type GameView, type Project } from "@/lib/game/types";
import { Btn, ReadAloud } from "./ui";

export function BoardCue({
  view,
  onNext,
  onBack,
}: {
  view: Pick<GameView, "boardStep" | "heads">;
  onNext?: () => void;
  onBack?: () => void;
}) {
  const step = view.boardStep % BOARD_CUE.length;
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold tracking-wide text-muted uppercase">At the board</p>
        <div className="flex gap-2">
          {onBack ? (
            <Btn kind="ghost" className="px-3 py-1 text-xs" onClick={onBack}>
              Previous department
            </Btn>
          ) : null}
          {onNext ? (
            <Btn kind="navy" className="px-3 py-1 text-xs" onClick={onNext}>
              Next department
            </Btn>
          ) : null}
        </div>
      </div>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {BOARD_CUE.map((dept, index) => {
          const head = view.heads.find((item) => item.dept === dept);
          const on = index === step;
          return (
            <div
              key={dept}
              className={`min-w-32 shrink-0 rounded-xl border px-3 py-2 ${on ? "border-gold bg-navy-2" : "border-line bg-card"}`}
            >
              <p className="text-xs font-bold text-muted">{index + 1}</p>
              <p className={`font-semibold ${on ? "text-orange-ink" : "text-cream"}`}>{DEPT_SHORT[dept]}</p>
              <p className="text-xs text-muted">{head?.name ?? "Open seat"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SLOTS = [
  { n: 1, cents: 1_000_000 },
  { n: 2, cents: 1_000_000 },
  { n: 3, cents: 1_000_000 },
  { n: 4, cents: 2_000_000 },
  { n: 5, cents: 2_000_000 },
  { n: 6, cents: 2_000_000 },
  { n: 7, cents: 3_000_000 },
  { n: 8, cents: 3_000_000 },
  { n: 9, cents: 3_000_000 },
] as const;

const STAGES: { dept: (typeof BOARD_DEPTS)[number]; label: string; fill: string; edge: string; Icon: typeof Star }[] = [
  { dept: "Marketing", label: "Star", fill: "bg-stage-star", edge: "border-stage-star text-stage-star", Icon: Star },
  { dept: "Appointment Center", label: "Phone", fill: "bg-stage-phone", edge: "border-stage-phone text-stage-phone", Icon: Phone },
  { dept: "Sales", label: "Sale", fill: "bg-stage-sale", edge: "border-stage-sale text-stage-sale", Icon: DollarSign },
  { dept: "Production", label: "Hammer", fill: "bg-stage-hammer", edge: "border-stage-hammer text-stage-hammer", Icon: Hammer },
  { dept: "Accounting", label: "Calculator", fill: "bg-stage-calc", edge: "border-stage-calc text-stage-calc", Icon: Calculator },
];

export function ProjectBoard({
  projects,
  wide = false,
}: {
  projects: Project[];
  plays?: DeptPlay[];
  bare?: boolean;
  wide?: boolean;
}) {
  const [id, setId] = useState<string | null>(null);
  const project = projects.find((item) => item.id === id) ?? null;
  const byNumber = new Map(projects.map((item) => [item.n, item]));
  return (
    <div className="rounded-3xl bg-board px-3 pt-6 pb-4 sm:px-4">
      <ul className={`grid gap-x-4 gap-y-6 ${wide ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
        {SLOTS.map((slot) => (
          <ProjectCard key={slot.n} slot={slot} project={byNumber.get(slot.n) ?? null} room={wide} onOpen={setId} />
        ))}
      </ul>
      {project ? (
        <Sheet
          title={`Project ${project.n} · ${money(project.valueCents || SLOTS[project.n - 1]?.cents || 0)}`}
          onClose={() => setId(null)}
        >
          <Details project={project} />
        </Sheet>
      ) : null}
    </div>
  );
}

function ProjectCard({
  slot,
  project,
  room,
  onOpen,
}: {
  slot: (typeof SLOTS)[number];
  project: Project | null;
  room?: boolean;
  onOpen: (id: string) => void;
}) {
  const price = project?.valueCents || slot.cents;
  const open = Boolean(project);
  return (
    <li className="relative rounded-3xl border-2 border-board-line px-3 pt-6 pb-3">
      <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-board-line bg-board px-3 py-1 text-center text-xs font-bold tracking-wide text-cream whitespace-nowrap">
        PROJECT {slot.n} - {money(price)}
      </p>
      {project?.collected ? (
        <p className="mb-2 text-center text-sm font-bold text-green-400">
          Completed · {money(project.earnedCents ?? project.valueCents)}
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-2">
        <Face
          kind="customer"
          name={project?.customer?.name}
          open={open}
          onClick={project ? () => onOpen(project.id) : undefined}
        />
        <Face
          kind="house"
          name={project?.house?.name}
          open={open}
          onClick={project ? () => onOpen(project.id) : undefined}
        />
      </div>
      <StageTrack project={project} room={room} />
    </li>
  );
}

function Face({
  kind,
  name,
  open,
  onClick,
}: {
  kind: "customer" | "house";
  name?: string;
  open: boolean;
  onClick?: () => void;
}) {
  const house = kind === "house" ? houseArt(name) : null;
  const customer = kind === "customer" ? customerArt(name) : null;
  const picture = house || customer;
  const tone = kind === "customer" ? "border-customer bg-customer text-gold-ink" : "border-house bg-house text-gold-ink";
  const className = `flex min-h-28 flex-col overflow-hidden rounded-xl border-2 ${tone} ${onClick ? "touch-manipulation active:scale-[0.98]" : ""} ${open ? "" : "opacity-80"}`;
  const body = (
    <>
      {picture ? (
        <img src={picture} alt="" className="h-24 w-full object-cover" />
      ) : (
        <span className="flex flex-1 items-center justify-center pt-3">
          {kind === "customer" ? <User className="size-8" aria-hidden /> : <House className="size-8" aria-hidden />}
        </span>
      )}
      <span className="px-2 pt-1 text-center text-[10px] font-bold tracking-wide uppercase">{kind === "customer" ? "Customer" : "House"}</span>
      <span className="line-clamp-2 px-2 pb-2 text-center text-xs font-semibold">
        {open ? name || "Assigned" : "Not open yet"}
      </span>
    </>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {body}
      </button>
    );
  }
  return <div className={className}>{body}</div>;
}

function customerArt(name?: string): string | null {
  if (!name) return null;
  const key = name.toLowerCase();
  if (key.includes("garcia")) return "/customers/garcia.jpg";
  if (key.includes("harris")) return "/customers/harris.jpg";
  if (key.includes("kim")) return "/customers/kim.jpg";
  if (key.includes("lee")) return "/customers/lee.jpg";
  if (key.includes("brien")) return "/customers/obrien.jpg";
  if (key.includes("patel")) return "/customers/patel.jpg";
  if (key.includes("rivera")) return "/customers/rivera.jpg";
  if (key.includes("stanley")) return "/customers/stanley.jpg";
  if (key.includes("thompson")) return "/customers/thompson.jpg";
  return null;
}

function houseArt(name?: string): string | null {
  if (!name) return null;
  const key = name.toLowerCase();
  if (key.includes("bi-level")) return "/houses/bi-level.jpg";
  if (key.includes("bungalow")) return "/houses/bungalow.jpg";
  if (key.includes("victorian")) return "/houses/victorian.jpg";
  if (key.includes("lake")) return "/houses/lake.jpg";
  if (key.includes("ranch")) return "/houses/ranch.jpg";
  if (key.includes("split-level")) return "/houses/split-level.jpg";
  if (key.includes("colonial")) return "/houses/colonial.jpg";
  if (key.includes("mcmansion")) return "/houses/mcmansion.jpg";
  if (key.includes("rowhome") || key.includes("row house")) return "/houses/rowhome.jpg";
  return null;
}

function StageTrack({ project, room }: { project: Project | null; room?: boolean }) {
  const box = room ? "size-12" : "size-10";
  const glyph = room ? "size-6" : "size-5";
  return (
    <div className="mt-3 flex items-center justify-between rounded-full border border-board-line px-2 py-2">
      {STAGES.map((stage, index) => {
        const mine = project?.tokens.filter((token) => token.dept === stage.dept) ?? [];
        const filled = mine.filter((token) => token.filled).length;
        const bonus = mine.some((token) => token.bonus);
        const bonusDone = mine.some((token) => token.bonus && token.filled);
        const on = filled > 0;
        return (
          <span key={stage.dept} className="flex items-center">
            {index > 0 ? <ChevronRight className="size-4 shrink-0 text-board-line" aria-hidden /> : null}
            <span
              title={`${DEPT_SHORT[stage.dept]} · ${on ? "Played" : "Open slot"}${bonus ? " · +1 required" : ""}`}
              className={`relative flex items-center justify-center rounded-full border-2 ${box} ${on ? `${stage.fill} border-transparent text-cream ring-4 ring-gold` : `${stage.edge} bg-transparent`}`}
            >
              <stage.Icon className={glyph} aria-hidden />
              {bonus ? (
                <span className={`absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-0.5 text-[9px] font-bold text-navy ${bonusDone ? "ring-2 ring-cream" : ""}`}>
                  +1
                </span>
              ) : null}
            </span>
          </span>
        );
      })}
    </div>
  );
}

function Details({ project }: { project: Project }) {
  const script = [
    `Customer. ${project.customer?.name ?? "Not assigned"}.`,
    project.customer?.text ?? "",
    `House. ${project.house?.name ?? "Not assigned"}.`,
    project.house?.text ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <ReadAloud text={script} />
      <div className="rounded-xl bg-customer p-3 text-gold-ink">
        {customerArt(project.customer?.name) ? (
          <img src={customerArt(project.customer?.name) ?? ""} alt="" className="mb-2 h-40 w-full rounded-lg object-cover" />
        ) : null}
        <p className="text-xs font-bold tracking-wide uppercase">Customer</p>
        <p className="font-display text-xl">{project.customer?.name ?? "Not assigned"}</p>
        <p className="mt-1">{project.customer?.text}</p>
      </div>
      <div className="overflow-hidden rounded-xl bg-house text-gold-ink">
        {houseArt(project.house?.name) ? (
          <img src={houseArt(project.house?.name) ?? ""} alt="" className="h-40 w-full object-cover" />
        ) : null}
        <div className="p-3">
          <p className="text-xs font-bold tracking-wide uppercase">House</p>
          <p className="font-display text-xl">{project.house?.name ?? "Not assigned"}</p>
          <p className="mt-1">{project.house?.text}</p>
        </div>
      </div>
      <ul className="space-y-1">
        {STAGES.map((stage) => {
          const mine = project.tokens.filter((token) => token.dept === stage.dept);
          const filled = mine.filter((token) => token.filled).length;
          const bonus = mine.some((token) => token.bonus);
          return (
            <li key={stage.dept} className="flex justify-between text-cream">
              <span>{stage.label}</span>
              <span>
                {filled ? `${filled} played` : "Not played"}
                {bonus ? " · +1" : ""}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Sheet({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/80 p-3 sm:items-center">
      <div role="dialog" aria-modal="true" aria-label={title} className="max-h-screen w-full max-w-lg overflow-auto rounded-2xl bg-card p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-xl text-cream">{title}</h2>
          <button type="button" className="min-h-11 px-2 text-sm font-semibold text-cream" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
