import { boardEffect, canonicalCardName, customerCash, DEPARTMENTS, eventCash, houseBonus, isSpecial, playEffectOn, stanleyPenalty, tierValue } from "./board";

export type NumberAnswer = {
  player_id: string;
  dept: string;
  player_name: string;
  card_code: string;
  card_title: string;
  round_n: number;
  payroll_cents: number;
  during_meeting: boolean;
};

export type NumberPlay = {
  player_id: string | null;
  dept: string;
  player_name: string;
  card_name: string;
  card_text: string;
  project_id: string;
  other_project_id?: string | null;
  amount_cents: number;
  round_n: number;
};

export type NumberProject = {
  id: string;
  n: number;
  title: string;
  house: string;
  customer: string;
  value_cents: number;
  status: string;
  completed_at?: string | null;
  finish_order?: number | null;
};

export type NumberInput = {
  companyName: string;
  currentRound: number;
  fixedCostCents: number;
  fixedStartRound: number;
  basePayrollCents: number;
  gameEnded?: boolean;
  answers: NumberAnswer[];
  plays: NumberPlay[];
  projects: NumberProject[];
  players: { id: string; name: string; dept: string }[];
  lang?: "en" | "es";
};

export type Numbers = {
  companyName: string;
  revenueCents: number;
  payrollCents: number;
  payrollBaseCents: number;
  payrollRoundCents: number;
  payrollAddedCents: number;
  payrollOffCents: number;
  payrollNetCents: number;
  payrollLabel: string;
  fixedCents: number;
  fixedDeptCount: number;
  fixedPerRoundCents: number;
  otherCents: number;
  profitCents: number;
  marginBps: number | null;
  result: string;
  rounds: { round: number; baseCents: number; payrollCents: number; offCents: number; addedCents: number; netCents: number; fixedCents: number; cards: string[] }[];
  projects: { n: number; title: string; status: string; valueCents: number; revenueCents: number; potentialCents: number; tokens: string; effect: string; house: string; customer: string; houseBonus: number; customerBonus: number; garciaBonus: number; breakdown: string[] }[];
  departments: { dept: string; cents: number }[];
  /** One sign rule for every screen: savedCents (green) and costCents (red) are both positive numbers; netCents > 0 means the department saved money. */
  departmentLines: { dept: string; savedCents: number; costCents: number; netCents: number; right: number; wrong: number }[];
  /** Every variable cost as its own labeled line (event losses, Stanley/Thompson penalties). */
  costLines: { label: string; cents: number; round: number | null }[];
  players: { id: string; name: string; dept: string; cents: number; right: number; wrong: number; saving: number }[];
  scoreboard: { dept: string; right: number; wrong: number; added: number; removed: number; net: number; saving: number }[];
  figured: string[];
  cardEffects: string[];
};

function resultOf(marginBps: number | null) {
  if (marginBps === null) return "No revenue yet";
  if (marginBps > 5000) return "Market Leader";
  if (marginBps > 3000) return "Win";
  return "No win";
}

export function computeNumbers(input: NumberInput): Numbers {
  const round = Math.max(1, input.currentRound, ...input.answers.map((row) => row.round_n), 0);
  const playing = new Set(input.players.map((row) => row.dept).filter((dept) => dept !== "General Manager" && dept !== "Owner" && dept !== "Recruiting"));
  const fixedDeptCount = Math.max(1, playing.size);
  const fixedPerRoundCents = 200000 * fixedDeptCount;
  const fixedRounds = round >= input.fixedStartRound ? round - input.fixedStartRound + 1 : 0;
  const fixedCents = fixedRounds * fixedPerRoundCents;
  const perDept = 320000;
  const baseRound = 1600000;
  const payrollLabel = "$16,000 base a round";

  const payrollByRound = new Map<number, { off: number; added: number; cards: string[] }>();
  const playerCents = new Map<string, number>();
  const deptCents = new Map<string, number>();
  let offCents = 0;
  let addedCents = 0;
  for (const row of input.answers) {
    const bucket = payrollByRound.get(row.round_n) ?? { off: 0, added: 0, cards: [] };
    if (row.payroll_cents > 0) {
      offCents += row.payroll_cents;
      bucket.off += row.payroll_cents;
      bucket.cards.push(`${row.card_code} down $${Math.round(row.payroll_cents / 100).toLocaleString("en-US")}`);
    } else if (row.payroll_cents < 0) {
      addedCents += Math.abs(row.payroll_cents);
      bucket.added += Math.abs(row.payroll_cents);
      bucket.cards.push(`${row.card_code} up $${Math.round(Math.abs(row.payroll_cents) / 100).toLocaleString("en-US")}`);
    }
    payrollByRound.set(row.round_n, bucket);
    playerCents.set(row.player_id, (playerCents.get(row.player_id) ?? 0) + row.payroll_cents);
    deptCents.set(row.dept, (deptCents.get(row.dept) ?? 0) + row.payroll_cents);
  }
  const roundsPlayed = Math.max(1, round);
  const payrollBaseCents = baseRound * roundsPlayed;
  const payrollCents = payrollBaseCents + addedCents - offCents;

  const scoreByPlayer = new Map<string, { right: number; wrong: number }>();
  const scoreByDept = new Map<string, { right: number; wrong: number }>();
  for (const row of input.answers) {
    const right = row.payroll_cents > 0;
    const playerScore = scoreByPlayer.get(row.player_id) ?? { right: 0, wrong: 0 };
    const deptScore = scoreByDept.get(row.dept) ?? { right: 0, wrong: 0 };
    if (right) { playerScore.right += 1; deptScore.right += 1; }
    else if (row.payroll_cents < 0) { playerScore.wrong += 1; deptScore.wrong += 1; }
    scoreByPlayer.set(row.player_id, playerScore);
    scoreByDept.set(row.dept, deptScore);
  }
  const scoreboard = [...scoreByDept.entries()].map(([dept, row]) => ({
    dept,
    right: row.right,
    wrong: row.wrong,
    added: row.wrong * 50000,
    removed: row.right * 50000,
    net: (row.wrong - row.right) * 50000,
    saving: (row.right - row.wrong) * 50000,
  }));

  const completed = input.projects.filter((project) => project.status === "complete");
  const byFinish = [...completed].sort((a, b) => {
    const orderA = a.finish_order ?? 9999;
    const orderB = b.finish_order ?? 9999;
    if (orderA !== orderB) return orderA - orderB;
    const timeA = a.completed_at ? new Date(a.completed_at).getTime() : 0;
    const timeB = b.completed_at ? new Date(b.completed_at).getTime() : 0;
    return timeA - timeB;
  });
  const lastFinishedId = byFinish.length ? byFinish[byFinish.length - 1].id : "";
  const finishRank = new Map<string, number>();
  byFinish.forEach((project, index) => finishRank.set(project.id, index + 1));
  let revenueCents = 0;
  let otherCents = 0;
  const projectRevenue = new Map<string, number>();
  const projectTokens = new Map<string, string>();
  const projectEffect = new Map<string, string>();

  for (const project of input.projects) {
    const plays = input.plays.filter((play) => play.project_id === project.id || play.other_project_id === project.id);
    const tokens: Record<string, number> = { star: 0, phone: 0, sale: 0, hammer: 0, calculator: 0 };
    const DEPT_TO_TOKEN: Record<string, string> = { Marketing: "star", "Appointment Center": "phone", Sales: "sale", Production: "hammer", Accounting: "calculator" };
    let specials = 0;
    let leePlacements = 0;
    let upsellCount = 0;
    let financingCount = 0;
    const effects: string[] = [];
    for (const play of plays) {
      const here = play.project_id === project.id;
      const effect = boardEffect({ name: play.card_name, dept: play.dept, text: play.card_text });
      const fx = playEffectOn(project.id, play);
      for (const [dept, n] of Object.entries(fx.tokens)) {
        const tk = DEPT_TO_TOKEN[dept];
        if (tk) tokens[tk] += n;
        if (n > 0) leePlacements += n;
      }
      if (!here) continue;
      if (effect.kind === "slot") effects.push(`+${effect.count} ${effect.token} slot`);
      // Rivera counts SPECIAL cards by card TYPE (f29z.8 regexed the card text, which never contains "SPECIAL").
      if (isSpecial(play.card_name) && !/Crew Swap/i.test(play.card_name)) specials += 1;
      if (/Upsell Close/i.test(play.card_name)) upsellCount += 1;
      if (/Financing Falls Through/i.test(play.card_name)) financingCount += 1;
      if (effect.cashCents && effect.cashWhen === "now") revenueCents += effect.cashCents;
      effects.push(effect.words);
    }
    const isLee = /Lee/i.test(canonicalCardName(project.customer));
    const placed = Object.values(tokens).reduce((sum, n) => sum + Math.max(0, n), 0);
    const rank = finishRank.get(project.id) ?? 0;
    const finishedAfter = rank > 0 ? byFinish.length - rank : 0;
    const tier = tierValue(project.n) * 100;
    let revenue = 0;
    if (project.status === "complete") {
      revenue += tier;
      revenue += houseBonus(project.house);
      const customerBonus = customerCash({
        name: project.customer,
        tokensPlaced: leePlacements,
        specials,
        finishedAfter: /Garcia/i.test(project.customer) ? 0 : finishedAfter,
        isLastFinished: project.id === lastFinishedId,
        isFourthOrLater: rank >= 4,
        complete: true,
        gameEnded: input.gameEnded,
        marketingStars: tokens.star,
      });
      revenue += customerBonus;
      const garciaProject = input.projects.find((pr) => /Garcia/i.test(canonicalCardName(pr.customer)) && pr.status === "complete");
      const garciaRank = garciaProject ? (finishRank.get(garciaProject.id) ?? 0) : 0;
      // Printed Garcia: +$2,000 for each project finished after Garcia's, MAX $8,000 (4 projects). f29z.8 had no cap.
      if (garciaProject && project.id !== garciaProject.id && rank > garciaRank && rank > 0 && rank - garciaRank <= 4) {
        revenue += 200000;
        projectRevenue.set(project.id + ":garcia", 200000);
      }
      revenue += upsellCount * 200000;
      revenue -= financingCount * 200000;
    } else {
      revenue += customerCash({
        name: project.customer,
        tokensPlaced: leePlacements,
        specials: 0,
        finishedAfter: 0,
        isLastFinished: false,
        isFourthOrLater: false,
        complete: false,
        marketingStars: tokens.star,
      });
    }
    revenue += stanleyPenalty(project.customer, round, project.status);
    // Printed Lee: "GAIN $1,000 EVERY TIME A TOKEN IS PLACED (MAX $5,000)" is paid as tokens land, not only on completion.
    if (isLee && project.status !== "complete") revenueCents += Math.min(leePlacements, 5) * 100000;
    projectRevenue.set(project.id, project.status === "complete" ? revenue : tier);
    projectTokens.set(project.id, Object.entries(tokens).filter(([, n]) => n).map(([token, n]) => `${n} ${token}`).join(", ") || "no tokens yet");
    projectEffect.set(project.id, effects.join("; "));
    const house = houseBonus(project.house);
    const customer = customerCash({
      name: project.customer,
      tokensPlaced: 0,
      specials: 0,
      finishedAfter: 0,
      isLastFinished: false,
      isFourthOrLater: false,
      complete: true,
      marketingStars: tokens.star,
    });
    const potential = tier + house + Math.max(0, customer);
    projectRevenue.set(project.id + ":potential", potential);
    projectRevenue.set(project.id + ":house", house);
    projectRevenue.set(project.id + ":customer", customer);
    if (project.status === "complete") revenueCents += revenue;
  }

  const costLines: { label: string; cents: number; round: number | null }[] = [];
  for (const play of input.plays) {
    const cash = eventCash(play.card_name);
    if (cash > 0) revenueCents += cash;
    if (cash < 0) {
      otherCents += Math.abs(cash);
      costLines.push({ label: `${play.card_name} (GM event${play.round_n ? `, round ${play.round_n}` : ""})`, cents: Math.abs(cash), round: play.round_n || null });
    }
  }
  const departmentLines = DEPARTMENTS.map((dept) => {
    const score = scoreByDept.get(dept) ?? { right: 0, wrong: 0 };
    const savedCents = input.answers.filter((row) => row.dept === dept && row.payroll_cents > 0).reduce((sum, row) => sum + row.payroll_cents, 0);
    const costCents = input.answers.filter((row) => row.dept === dept && row.payroll_cents < 0).reduce((sum, row) => sum + Math.abs(row.payroll_cents), 0);
    return { dept, savedCents, costCents, netCents: savedCents - costCents, right: score.right, wrong: score.wrong };
  });

  const profitCents = revenueCents - payrollCents - fixedCents - otherCents;
  const marginBps = revenueCents > 0 ? Math.round((profitCents / revenueCents) * 10000) : null;
  return {
    companyName: input.companyName,
    revenueCents,
    payrollCents,
    payrollBaseCents: baseRound,
    payrollRoundCents: baseRound,
    payrollAddedCents: addedCents,
    payrollOffCents: offCents,
    payrollNetCents: addedCents - offCents,
    payrollLabel,
    fixedCents,
    fixedDeptCount,
    fixedPerRoundCents,
    otherCents,
    profitCents,
    marginBps,
    result: resultOf(marginBps),
    rounds: Array.from({ length: roundsPlayed }, (_, i) => i + 1).map((n) => {
      const bucket = payrollByRound.get(n) ?? { off: 0, added: 0, cards: [] };
      return {
        round: n,
        baseCents: baseRound,
        payrollCents: baseRound + bucket.added - bucket.off,
        offCents: bucket.off,
        addedCents: bucket.added,
        fixedCents: n >= input.fixedStartRound ? fixedPerRoundCents : 0,
        netCents: bucket.added - bucket.off - (n >= input.fixedStartRound ? fixedPerRoundCents : 0),
        cards: bucket.cards,
      };
    }),
    projects: input.projects.map((project) => ({
      n: project.n,
      title: project.title,
      status: project.status,
      house: project.house,
      customer: project.customer,
      valueCents: tierValue(project.n) * 100,
      houseBonus: projectRevenue.get(project.id + ":house") ?? 0,
      customerBonus: projectRevenue.get(project.id + ":customer") ?? 0,
      garciaBonus: projectRevenue.get(project.id + ":garcia") ?? 0,
      revenueCents: project.status === "complete" ? (projectRevenue.get(project.id) ?? 0) : 0,
      potentialCents: projectRevenue.get(project.id + ":potential") ?? tierValue(project.n) * 100,
      tokens: projectTokens.get(project.id) ?? "no tokens yet",
      effect: projectEffect.get(project.id) ?? "",
      breakdown: [
        `Tier (position ${project.n}): $${(tierValue(project.n) * 100 / 100).toLocaleString("en-US")}`,
        `House (${project.house}): $${((projectRevenue.get(project.id + ":house") ?? 0) / 100).toLocaleString("en-US")}`,
        `Customer (${project.customer}): $${((projectRevenue.get(project.id + ":customer") ?? 0) / 100).toLocaleString("en-US")}`,
        `Potential: $${((projectRevenue.get(project.id + ":potential") ?? 0) / 100).toLocaleString("en-US")}`,
      ],
    })),
    departments: [...deptCents.entries()].map(([dept, cents]) => ({ dept, cents })),
    departmentLines,
    costLines,
    players: input.players.map((player) => {
      const score = scoreByPlayer.get(player.id) ?? { right: 0, wrong: 0 };
      return {
        id: player.id,
        name: player.name,
        dept: player.dept,
        cents: playerCents.get(player.id) ?? 0,
        right: score.right,
        wrong: score.wrong,
        saving: (score.right - score.wrong) * 50000,
      };
    }),
    scoreboard,
    figured: (input.lang ?? "en") === "es" ? [
      "Ingresos = nivel del proyecto terminado + bonificación de casa + bonificación de cliente + ganancias en efectivo de cartas special/event − reducciones de ingresos (Overbudget Surprise, Financing Falls Through).",
      "Las posiciones 1-3 pagan $10,000, 4-6 $20,000, 7-9 $30,000, solo al terminarlo. Lo no terminado es potencial.",
      "Costos variables = pérdidas en efectivo y penalizaciones (Stanley, Thompson, Material Spike, Warranty Claim).",
      "Margen bruto = ingresos − costos variables.",
      "Nómina = $16,000 de base por ronda + $500 × respuestas incorrectas − $500 × respuestas correctas.",
      "Costo fijo = $2,000 × departamentos que juegan, cada ronda a partir de la ronda 3.",
      "Margen neto = margen bruto − costos fijos.",
      "Margen neto % = 100 × margen neto / ingresos. 30% o menos no es victoria. Más de 30% es victoria. Más de 50% es Líder de Mercado.",
    ] : [
      "Overbudget Surprise: −$3,000 off company Revenues, right away.",
      "Financing Falls Through: Sales picks one unfinished project, which loses $2,000 of its revenue when it completes.",
      "Stanley: −$5,000 Variable Costs if the project is unfinished at the end of round 6.",
      "Thompson: −$5,000 Variable Costs if the project completes 4th or later.",
      "Material Spike: −$2,000 Variable Costs, right away.",
      "Warranty Claim: −$2,000 Variable Costs, right away.",
      "Garcia: +$2,000 for each project finished after Garcia's, up to $8,000.",
      "Harris +$4,000, Patel +$2,000: on completion.",
      "Upsell Close: +$2,000 on completion per play.",
      "Invoice Blitz +$3,000, Quick Audit +$4,000: added to company Revenues right away.",
    ],
    cardEffects: (input.lang ?? "en") === "es" ? [
      "Overbudget Surprise: −$3,000 de los ingresos de la empresa, de inmediato.",
      "Financing Falls Through: Ventas elige un proyecto sin terminar, que pierde $2,000 de sus ingresos cuando se termina. Si sale de nuevo en el mismo proyecto, las reducciones se acumulan.",
      "Stanley: −$5,000 en costos variables si el proyecto no está terminado al final de la ronda 6.",
      "Thompson: −$5,000 en costos variables si el proyecto termina en 4.º lugar o después, según el orden de cierre de Contabilidad.",
      "Material Spike: −$2,000 en costos variables, de inmediato.",
      "Warranty Claim: −$2,000 en costos variables, de inmediato.",
      "Rivera: +$5,000 al terminarlo, solo si se jugaron 2 o más cartas SPECIAL en ese mismo proyecto. Splits y Crew Swap no cuentan.",
      "Garcia: +$2,000 por cada proyecto terminado después del de Garcia, hasta $8,000, según el orden de cierre de Contabilidad.",
      "Lee: +$1,000 por cada ficha colocada en el proyecto de Lee, hasta $5,000. Las fichas movidas o reemplazadas no se recuperan.",
      "O'Brien: +$4,000 al final del juego al último proyecto que terminó, según el orden de cierre de Contabilidad. Se paga una sola vez.",
      "Harris +$4,000, Patel +$2,000, Bi-Level +$3,000, McMansion +$2,000, Victorian +$2,000: solo al terminarlo.",
      "Upsell Close: +$2,000 al terminarlo por cada vez que se juega en ese proyecto. La bonificación se queda si después se mueve la ficha.",
      "Invoice Blitz +$3,000, Quick Audit +$4,000, Invoice Paid Early +$3,000, Community Buzz +$3,000: se suman a los ingresos de la empresa de inmediato.",
    ] : [
      "Revenue = completed project tier + house bonus + customer bonus + special/event cash gains − revenue reductions (Overbudget Surprise, Financing Falls Through).",
      "Positions 1-3 pay $10,000, 4-6 $20,000, 7-9 $30,000, only on completion. Unfinished is potential.",
      "Variable costs = cash losses and penalties (Stanley, Thompson, Material Spike, Warranty Claim).",
      "Gross margin = revenue − variable costs.",
      "Payroll = $16,000 base a round + $500 × wrong answers − $500 × right answers.",
      "Fixed cost = $2,000 × departments playing, each round from round 3.",
      "Net Margin = Gross Margin − Fixed Costs.",
      "Net Margin % = 100 × Net Margin / Revenues. 30% or below is no win. Above 30% wins. Above 50% is Market Leader.",
    ],
  };
}
