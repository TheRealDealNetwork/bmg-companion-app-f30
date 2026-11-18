/** Player language. English is the source. Spanish falls back to English. */
export type Lang = "en" | "es";

const UI: Record<string, { en: string; es: string }> = {
  "join.closed": { en: "This game is closed. Sign-up and cards are no longer available.", es: "Este juego está cerrado. El registro y las cartas ya no están disponibles." },
  "join.closedTitle": { en: "Game closed", es: "Juego cerrado" },
  "seat.ended": { en: "This game has ended. Cards are no longer available.", es: "Este juego ha terminado. Las cartas ya no están disponibles." },
  "seat.opening": { en: "Opening your seat…", es: "Abriendo tu asiento…" },
  "seat.invalid": { en: "This link is not valid.", es: "Este enlace no es válido." },
  "seat.take": { en: "Take this seat", es: "Tomar este asiento" },
  "seat.agree": { en: "I agree to the", es: "Acepto los" },
  "seat.terms": { en: "Beta Terms & Conditions", es: "Términos y condiciones beta" },
  "play.opening": { en: "Opening your seat…", es: "Abriendo tu asiento…" },
  "play.find": { en: "Find", es: "Buscar" },
  "play.lock": { en: "Lock this answer", es: "Confirmar respuesta" },
  "play.next": { en: "Next card", es: "Siguiente carta" },
  "play.done": { en: "Done with scenarios", es: "Listo con escenarios" },
  "play.whatNext": { en: "What happens next", es: "Qué sigue" },
  "play.whyNot": { en: "Why", es: "Por qué" },
  "play.notRight": { en: "is not right", es: "no es correcta" },
  "play.youPicked": { en: "You picked", es: "Elegiste" },
  "play.wrecking": { en: "WRECKING BALL", es: "BOLA DE DEMOLICIÓN" },
  "play.wreckingDetail": { en: "+$500 to payroll. Next card in a moment.", es: "+$500 a la nómina. Siguiente carta en un momento." },
  "play.confetti": { en: "CONFETTI", es: "Confeti" },
  "play.confettiDetail": { en: "-$500 off payroll. Deal your 3 action cards.", es: "-$500 de la nómina. Reparte tus 3 cartas de acción." },
  "play.round": { en: "Round", es: "Ronda" },
  "play.payroll": { en: "payroll", es: "nómina" },
  "play.cards": { en: "cards recorded", es: "cartas registradas" },
  "play.off": { en: "Off payroll", es: "De la nómina" },
  "play.added": { en: "Added to payroll", es: "Agregado a la nómina" },
  "play.numbers": { en: "Numbers", es: "Números" },
  "play.financials": { en: "Business Financials", es: "Finanzas del Negocio" },
  "play.log": { en: "Department answer log", es: "Registro de respuestas" },
  "board.atMeeting": { en: "You're at the GM meeting this round.", es: "Estás en la reunión del Gerente General esta ronda." },
  "board.atTable": { en: "You're at your table. Keep answering cards.", es: "Estás en tu mesa. Sigue respondiendo cartas." },
  "board.deal": { en: "Deal my 3 action cards", es: "Repartir mis 3 cartas de acción" },
  "board.focus": { en: "Your focus this round", es: "Tu enfoque esta ronda" },
  "board.waitingFocus": { en: "Waiting on the GM to set your two focus projects.", es: "Esperando que el Gerente General asigne tus dos proyectos." },
  "board.place": { en: "Place", es: "Colocar" },
  "board.on": { en: "on", es: "en" },
  "board.confirm": { en: "Confirm: play these 2", es: "Confirmar: jugar estas 2" },
  "board.meeting": { en: "GM meeting is open. Answers still count and are tagged during GM meeting.", es: "La reunión del Gerente General está abierta. Las respuestas cuentan." },
  "board.suggest": { en: "Suggest the company name for this game.", es: "Sugiere el nombre de la empresa para este juego." },
  "board.submitName": { en: "Submit a name", es: "Enviar un nombre" },
  "board.vote": { en: "Vote for your favorite. The GM picks the winner.", es: "Vota por tu favorito. El GM elige el ganador." },
  "board.tie": { en: "Tie. Break it.", es: "Empate. Rómpelo." },
  "board.setName": { en: "Set name", es: "Fijar nombre" },
  "board.restartVote": { en: "Restart vote", es: "Reiniciar votación" },
  "board.undo": { en: "Undo", es: "Deshacer" },
  "board.zoom": { en: "zoom", es: "ampliar" },
  "board.close": { en: "Close", es: "Cerrar" },
  "numbers.title": { en: "Numbers", es: "Números" },
  "numbers.opening": { en: "Opening the numbers…", es: "Abriendo los números…" },
  "numbers.revenues": { en: "Revenues", es: "Ingresos" },
  "numbers.variable": { en: "Variable Costs (total)", es: "Costos variables (total)" },
  "numbers.gross": { en: "Gross Margin", es: "Margen bruto" },
  "numbers.fixed": { en: "Fixed Costs (total)", es: "Costos fijos (total)" },
  "numbers.payroll": { en: "Payroll", es: "Nómina" },
  "numbers.deptFixed": { en: "Department fixed", es: "Fijo de departamento" },
  "numbers.net": { en: "Net Margin ($)", es: "Margen neto ($)" },
  "numbers.netPct": { en: "Net Margin %", es: "Margen neto %" },
  "numbers.win": { en: "30% or below is no win. Above 30% wins. Above 50% is Market Leader.", es: "30% o menos no gana. Más de 30% gana. Más de 50% es Líder de Mercado." },
  "numbers.leader": { en: "Market Leader", es: "Líder de Mercado" },
  "numbers.winLabel": { en: "Win", es: "Gana" },
  "numbers.noWin": { en: "No win", es: "No gana" },
  "numbers.scoreboard": { en: "Scenario scoreboard", es: "Tablero de escenarios" },
  "numbers.seatScore": { en: "Seat scoreboard", es: "Tablero por asiento" },
  "numbers.figured": { en: "How this is figured", es: "Cómo se calcula" },
  "numbers.effects": { en: "Card effects that cut or condition revenue", es: "Efectos de cartas que cortan o condicionan ingresos" },
  "numbers.projects": { en: "Player dollars", es: "Dólares del jugador" },
  "numbers.ledger": { en: "Your ledger", es: "Tu registro" },
  "numbers.export": { en: "Export numbers", es: "Exportar números" },
  "numbers.back": { en: "Back to cards", es: "Volver a las cartas" },
  "numbers.base": { en: "base", es: "base" },
  "numbers.house": { en: "House bonus", es: "Bono de casa" },
  "numbers.customer": { en: "Customer bonus", es: "Bono de cliente" },
  "numbers.ifCompleted": { en: "if completed", es: "si se completa" },
  "numbers.projectTotal": { en: "Project total", es: "Total del proyecto" },
  "numbers.counted": { en: "counted in Revenues", es: "contado en Ingresos" },
  "dept.marketing": { en: "Marketing", es: "Mercadeo" },
  "dept.appointment": { en: "Appointment Center", es: "Centro de Citas" },
  "dept.sales": { en: "Sales", es: "Ventas" },
  "dept.production": { en: "Production", es: "Producción" },
  "dept.accounting": { en: "Accounting", es: "Contabilidad" },
  "dept.gm": { en: "General Manager", es: "Gerente General" },
  "dept.owner": { en: "Owner", es: "Propietario" },
  "dept.recruiting": { en: "Recruiting", es: "Reclutamiento" },
};

export function t(key: string, lang: Lang): string {
  const entry = UI[key];
  if (!entry) return key;
  return entry[lang] || entry.en;
}

export function deptLabel(dept: string, lang: Lang): string {
  const map: Record<string, string> = {
    Marketing: "dept.marketing",
    "Appointment Center": "dept.appointment",
    Sales: "dept.sales",
    Production: "dept.production",
    Accounting: "dept.accounting",
    "General Manager": "dept.gm",
    Owner: "dept.owner",
    Recruiting: "dept.recruiting",
  };
  const key = map[dept];
  return key ? t(key, lang) : dept;
}

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  return langs.some((l) => l.toLowerCase().startsWith("es")) ? "es" : "en";
}
