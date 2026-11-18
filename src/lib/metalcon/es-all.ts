/** Spanish scenario translations loaded from scenarios-320-es.json. English is the source. */
export type ScenarioEs = {
  title: string;
  scenario: string;
  options: { A: string; B: string; C: string };
  why: string;
  voice: string;
  titleEn: string;
};

export const ALL_SCENARIOS: Record<string, ScenarioEs> = {
  "BE-MK-01": {
    "title": "La sombra alargada",
    "scenario": "Diriges el marketing de una empresa de impermeabilización de sótanos. Últimamente el trabajo de tus dos coordinadoras sale descuidado: errores en las postales, publicaciones en redes que salen tarde, plazos incumplidos. La verdad es que tú te has estado saltando tu propia revisión y entregas tarde tu informe de presupuesto todos los meses. El dueño te pregunta qué está pasando en tu departamento.",
    "options": {
      "A": "Crea una regla de triple aprobación para que nada salga sin tres firmas.",
      "B": "Reemplaza a tu coordinadora más débil; alguien tiene que marcar la pauta.",
      "C": "Corrige primero tus propios hábitos. Revisa tu trabajo, cumple tus plazos y deja que el equipo lo vea."
    },
    "why": "Un departamento refleja a su líder. El equipo copia lo que tú haces, no lo que dices. Ni reglas nuevas ni gente nueva van a arreglar un estándar que el líder no está viviendo.",
    "voice": "Tu negocio es tu sombra alargada.",
    "titleEn": "The Elongated Shadow"
  },
  "BE-MK-02": {
    "title": "Mereces tus resultados",
    "scenario": "Los prospectos de primavera llegaron un 30% por debajo de la meta. Una actualización del algoritmo de Google afectó el posicionamiento y la lluvia arruinó una feria de hogar. Pero también enviaste las postales tres semanas tarde y nunca probaste la nueva página de destino. Mañana le presentas los resultados al dueño, y sería fácil empezar hablando del clima y de Google.",
    "options": {
      "A": "Hazte responsable. Enumera lo que hiciste y lo que no hiciste, y luego presenta tu plan para corregirlo.",
      "B": "Informa que la actualización de Google causó el resultado; técnicamente es cierto.",
      "C": "Pide un presupuesto más grande para cubrir la diferencia."
    },
    "why": "El mercado te dio lo que merecías. Culpar a las circunstancias garantiza que se repita; hacerte cargo del correo tardío y de la página sin probar es el único camino hacia resultados distintos la próxima primavera.",
    "voice": "El mundo y el mercado te están dando exactamente lo que mereces en este momento.",
    "titleEn": "You Deserve Your Results"
  },
  "BE-MK-03": {
    "title": "El dolor es combustible",
    "scenario": "Tu gran stand en la feria de hogar fue un fracaso: 9 prospectos contra una meta de 60. Gastaste $8,000, lo atendiste todo el fin de semana y viste cómo los stands de la competencia se mantenían llenos. El lunes por la mañana estás avergonzado y el dueño quiere un resumen. Una parte de ti quiere declarar muertas las ferias de hogar.",
    "options": {
      "A": "Recomienda que la empresa deje para siempre las ferias de hogar; está claro que ese canal no funciona.",
      "B": "Haz un análisis completo —ubicación del stand, letreros, personal, guiones— y reconstruye el sistema de ferias antes de la próxima.",
      "C": "Dile al dueño que este año el organizador no atrajo suficiente público."
    },
    "why": "Un tropiezo es veneno o combustible; tú decides. Los stands llenos de la competencia demuestran que el canal funciona; lo que falló fue tu sistema. Convertir el fracaso en un sistema corregido es la forma en que el dolor te paga.",
    "voice": "La historia que te cuentas sobre tu pasado debe ser combustible, no veneno.",
    "titleEn": "Pain Is Fuel"
  },
  "BE-MK-04": {
    "title": "Sé una máquina de aprender",
    "scenario": "Llevas tres años haciendo el marketing de la misma manera. Un curso de marketing por internet muy respetado en la industria tiene inscripciones abiertas, pero estás en temporada alta y tendrías que dedicarle dos noches por semana durante seis semanas. Tu costo por prospecto ha ido subiendo poco a poco y no sabes bien por qué.",
    "options": {
      "A": "Inscríbete ya y bloquea en tu calendario un tiempo semanal para aprender; trátalo como una cita.",
      "B": "Espera al invierno, cuando las cosas se calmen.",
      "C": "No lo tomes; ya aprendes bastante en el trabajo."
    },
    "why": "Trabaja más en ti mismo que en tu trabajo. Un costo por prospecto en aumento es un problema de conocimiento; “estoy demasiado ocupado para aprender” te mantiene exactamente donde estás. La temporada tranquila nunca llega de verdad.",
    "voice": "En cuanto creemos que lo sabemos todo, dejamos de aprender.",
    "titleEn": "Be a Learning Machine"
  },
  "BE-MK-05": {
    "title": "Brillante en lo básico",
    "scenario": "Tienes $5,000 de presupuesto libre. Una campaña de videos cortos de moda es tentadora, y el hijo del dueño insiste en ella. Mientras tanto, lo básico está haciendo agua: las cuadrillas ponen letreros en el jardín quizá en la mitad de los trabajos, los prospectos de la web esperan hasta el día siguiente y un tercio de los prospectos nunca se registra en el CRM con su fuente.",
    "options": {
      "A": "Lanza la campaña de video; tienes que estar donde está la atención.",
      "B": "Haz las dos cosas a medias: una pequeña prueba de video y un memo sobre lo básico.",
      "C": "Arregla primero lo básico —letrero en cada trabajo, cada prospecto en el CRM, devoluciones de llamada rápidas— y después experimenta."
    },
    "why": "Las cosas simples hechas sin falta le ganan a las cosas ingeniosas hechas de vez en cuando. Meter tráfico nuevo en un sistema con fugas es tirar el dinero; lo básico es gratis y sus resultados se acumulan.",
    "voice": "Las cosas simples son fáciles de hacer, y fáciles de no hacer.",
    "titleEn": "Brilliant on the Basics"
  },
  "BE-MK-06": {
    "title": "Primero define la realidad",
    "scenario": "El dueño entra furioso: “Bajaron los prospectos, ¿qué está pasando?”. Tienes corazonadas: quizá los anuncios de radio perdieron fuerza, quizá los camiones rotulados de un competidor están acaparando la atención. Pero tu seguimiento de datos está incompleto y, sinceramente, no sabes qué canal cayó. Él quiere una respuesta ya.",
    "options": {
      "A": "Comparte tu intuición con seguridad; un líder debe sonar decidido.",
      "B": "Dile “Dame 48 horas” y saca los números reales por canal antes de recomendar nada.",
      "C": "Promete una campaña nueva en ese mismo momento para que se vea que estás actuando."
    },
    "why": "Para arreglar las cosas tienes que verlas como son. Actuar por corazonadas ataca el canal equivocado y quema presupuesto. Un “lo voy a averiguar” honesto siempre le gana a una suposición dicha con seguridad.",
    "voice": "Para arreglar las cosas, primero tienes que verlas como son.",
    "titleEn": "Define Reality First"
  },
  "BE-MK-07": {
    "title": "Todo se crea dos veces",
    "scenario": "El dueño aprueba $30,000 para un envío de correo directo en primavera, el más grande que has hecho. El impresor te presiona para que le mandes los archivos esta semana y así cumplir con su calendario de imprenta. No has fijado una meta de prospectos, ni elegido listas de prueba, ni calculado el costo máximo aceptable por prospecto, ni planeado cómo el centro de llamadas va a atender la respuesta.",
    "options": {
      "A": "Envía ya a la lista más grande que puedas pagar y ajusta según lleguen los resultados.",
      "B": "Arma primero el modelo —meta, costo máximo por prospecto, grupos de prueba, plan de respuesta— y luego imprime.",
      "C": "Deja que el impresor diseñe la pieza y elija la lista; él hace esto todo el día."
    },
    "why": "Todo se crea dos veces: primero en papel y después en el mundo. Modelar saca a la luz los problemas mientras todavía es gratis corregirlos. La fecha límite de un impresor no es un plan.",
    "voice": "Si no planeas tu futuro, es una señal bastante clara de que no te interesa.",
    "titleEn": "Created Twice"
  },
  "BE-MK-08": {
    "title": "El poder del porqué",
    "scenario": "Tu programa de letreros exige que las cuadrillas coloquen un letrero en cada trabajo y envíen una foto por mensaje. El cumplimiento está en 40% y las cuadrillas ponen los ojos en blanco: “Somos instaladores, no vendedores de marketing”. Podrías endurecer el control, o podrías explicarles algo que nunca les has dicho.",
    "options": {
      "A": "Muéstrales el porqué: un letrero de $3.50 genera un prospecto de $200 de un vecino que confía; luego vuelve a capacitarlos en el cómo.",
      "B": "Pon una sanción por cada foto que falte.",
      "C": "Elimina el programa; no puedes obligar a la gente a que le importe."
    },
    "why": "Si no hay un porqué, el cómo no importa. La gente que entiende que un solo letrero puede pagar semanas de letreros los va a colocar; la gente castigada va a manipular las fotos y te va a guardar resentimiento.",
    "voice": "La gente no va a llegar cada día al trabajo con ganas de dar lo mejor de sí solo para que tú ganes dinero. Tiene que haber algo más.",
    "titleEn": "Why Power"
  },
  "BE-MK-09": {
    "title": "El negocio sirve a su dueño",
    "scenario": "Durante dos años has atendido en persona cada stand de feria de hogar: noches, fines de semana, días festivos. Tu pareja está harta y tú te estás quemando, pero te dices que nadie capta prospectos como tú. Vienen tres ferias en seis semanas, incluida una el día de tu aniversario.",
    "options": {
      "A": "Sigue trabajando tú mismo en cada feria; eso es dedicación.",
      "B": "Pídele al dueño que deje las ferias de hogar; te cuestan demasiados fines de semana.",
      "C": "Forma y capacita un equipo de ferias con turnos rotativos, guiones y un incentivo por cita; luego tómate libre tu aniversario."
    },
    "why": "El negocio debe darte más vida, no menos. Una función que solo funciona si sacrificas tu vida no es un sistema: es una trampa que tú mismo construiste.",
    "voice": "La libertad llega cuando te das cuenta de que no puedes hacerlo solo.",
    "titleEn": "The Business Serves Its Owner"
  },
  "BE-MK-10": {
    "title": "Haz lo correcto aunque te cueste",
    "scenario": "Tu envío de 20,000 postales salió con un error: “$500 de descuento” en lugar de “$50 de descuento”. Ya están entrando llamadas. Respetarlo podría costarle a la empresa $40,000 si todos lo canjean. El gerente del centro de llamadas pregunta qué decirle a la gente. El dueño está de viaje y no se le puede localizar hasta la noche.",
    "options": {
      "A": "Respétalo en silencio, pero solo con quienes protesten cuando se les corrija.",
      "B": "Respeta la oferta impresa para todos los que llamen y asume el error ante el dueño esta noche.",
      "C": "Dile al centro de llamadas que explique que fue un error de imprenta y ofrezca el descuento real."
    },
    "why": "Tu palabra impresa es tu palabra. La mayoría de quienes llaman no lo va a canjear, pero todos van a recordar cómo lo manejaste. Decir “error de imprenta” es la salida cómoda que cambia reputación por dólares.",
    "voice": "No necesitamos gente molesta allá afuera con conexión a internet.",
    "titleEn": "Do Right When It Costs You"
  },
  "BE-MK-11": {
    "title": "Contratar te hace o te deshace",
    "scenario": "Tu coordinadora de marketing renunció y la temporada alta empieza en seis semanas. Después de dos semanas de búsqueda tienes una sola candidata: está bien, nada más; currículum decente, entrevista sin brillo, ninguna chispa. El trabajo se te acumula en el escritorio y el dueño te dice: “Pon a alguien en ese puesto y ya”.",
    "options": {
      "A": "Sigue reclutando con fuerza: amplía el anuncio, mueve tu red de contactos y reinicia la búsqueda si hace falta.",
      "B": "Contrata a la candidata que está bien; en temporada alta, cualquiera es mejor que un escritorio vacío.",
      "C": "No contrates a nadie y absorbe el trabajo tú mismo sin decir nada."
    },
    "why": "Las decisiones sobre personas lo deciden casi todo. Una contratación mediocre cuesta meses de supervisión, trabajo rehecho y, de todos modos, una segunda búsqueda. El dolor a corto plazo es mejor que un año gestionando un error.",
    "voice": "Contratar te hará o te deshará. Con demasiada frecuencia los contratistas dedican el 1% de su tiempo a reclutar y el 99% a lidiar con sus errores de contratación.",
    "titleEn": "Hiring Makes You or Breaks You"
  },
  "BE-MK-12": {
    "title": "Carácter antes que habilidad",
    "scenario": "Tienes dos finalistas para tu puesto de marketing digital. Una tiene un portafolio impresionante y certificaciones, pero habló pestes de su último empleador en la entrevista y sus fechas no coincidían con su currículum. La otra tiene menos experiencia y muestras modestas, pero es honesta, tiene hambre de crecer y sus referencias elogian su actitud.",
    "options": {
      "A": "Contrata el portafolio; las habilidades son las que pagan las cuentas, solo la vigilarás de cerca.",
      "B": "No contrates a ninguna y vuelve a publicar el puesto con un salario más alto.",
      "C": "Contrata el carácter. Puedes enseñar plataformas de anuncios; no puedes enseñar honestidad."
    },
    "why": "Las habilidades se pueden entrenar; el carácter no. Alguien que habla mal de un empleador y maquilla su currículum terminará haciéndote ambas cosas a ti, con tu presupuesto de anuncios y tu marca en sus manos.",
    "voice": "No logramos que la gente adopte nuestros valores fundamentales. Encontramos gente que ya los tiene.",
    "titleEn": "Character Over Skill"
  },
  "BE-MK-13": {
    "title": "¡Claro que sí!, o no",
    "scenario": "Después de una larga búsqueda, tu candidata final para coordinadora de eventos es… bastante buena. Cumple con los requisitos, es agradable, nada malo en el papel. Tu equipo está dividido. Te repites que deberías estar entusiasmado, pero no lo estás. La búsqueda ya lleva nueve semanas y estás cansado.",
    "options": {
      "A": "Contrátala; bastante buena es mejor que un escritorio vacío, y la búsqueda es agotadora.",
      "B": "Ofrécele un “periodo de prueba” impreciso de 90 días para cubrir tus dudas.",
      "C": "No la contrates. Si no es un “¡claro que sí!”, es un no; reinicia la búsqueda."
    },
    "why": "La tibieza al contratar se convierte en tibieza en el trabajo. Tu duda es información. A veces la mejor decisión de contratación es la que no tomas; un periodo de prueba solo aplaza el mismo no.",
    "voice": "Si no te encanta el candidato, no lo contrates.",
    "titleEn": "Hell Yeah, or No"
  },
  "BE-MK-14": {
    "title": "La persona correcta en el puesto correcto",
    "scenario": "Tu coordinadora Dana ilumina el stand en las ferias de hogar: a los visitantes les encanta y las citas se acumulan. Pero también es responsable de tu hoja de cálculo de seguimiento de prospectos, y es un desastre: fuentes equivocadas, registros que faltan, fórmulas rotas. La has corregido tres veces. Ella detesta la hoja de cálculo y lo dice abiertamente.",
    "options": {
      "A": "Ponla en un plan de mejora de desempeño por el trabajo de seguimiento.",
      "B": "Pasa a Dana a encargarse de eventos y ferias a tiempo completo, y pon en el seguimiento a alguien a quien le encanten los detalles.",
      "C": "Despídela; en marketing la precisión importa."
    },
    "why": "Pon las fortalezas donde se necesitan y las debilidades donde no importan. Dana no es una mala empleada: es una excelente persona de eventos atrapada en un puesto de números.",
    "voice": "Todo el mundo sirve para algún trabajo.",
    "titleEn": "Right Person, Right Seat"
  },
  "BE-MK-15": {
    "title": "Capacita o retira",
    "scenario": "Tu nueva coordinadora de recepción de prospectos sigue cometiendo errores en el CRM: fuentes equivocadas, registros duplicados, prospectos marcados como perdidos que no lo están. Te das cuenta de que nunca la capacitaste de verdad; solo acompañó dos días a la coordinadora anterior antes de que se fuera. Estás a tope con la campaña de primavera y capacitarla te llevaría muchas horas.",
    "options": {
      "A": "Arma un plan de capacitación real —proceso por escrito, práctica lado a lado, puntos de control— y capacítala como se debe.",
      "B": "Despídela y contrata a alguien que “sí entienda”.",
      "C": "Deja que siga aprendiendo sola con las notas viejas; ahora estás demasiado ocupado."
    },
    "why": "No puedes exigirle cuentas a alguien por una capacitación que nunca recibió. “Demasiado ocupado para capacitar” significa pagar sus errores para siempre. ¿Y si no la capacitas y se queda?",
    "voice": "Solo acompañar a alguien produce una copia de una copia de una copia.",
    "titleEn": "Train or Remove"
  },
  "BE-MK-16": {
    "title": "Tú no eres la puerta",
    "scenario": "Todavía escribes tú mismo cada publicación de Facebook, diseñas cada volante y armas cada postal, porque eres bueno en eso y te divierte. Mientras tanto, el plan anual está a medias, nadie supervisa a la agencia y hace un mes que nadie revisa los números por canal. Tu coordinadora te ha pedido dos veces encargarse del trabajo creativo.",
    "options": {
      "A": "Trabaja de noche para poder hacer tanto lo creativo como el liderazgo.",
      "B": "Olvídate de la planificación; las publicaciones y los volantes son lo que de verdad genera prospectos.",
      "C": "Capacita a tu coordinadora para que se encargue de lo creativo; tú fijas los estándares, revisas y diriges el área."
    },
    "why": "Te pagan por los resultados del equipo, no por tu trabajo manual. Cada hora que pasas diseñando volantes es una hora en la que todo el departamento se queda sin líder, y tu coordinadora, con todas sus ganas, se queda sin desarrollarse.",
    "voice": "Si estás haciendo un trabajo dentro de tu negocio, estás estorbando.",
    "titleEn": "You Are Not the Door"
  },
  "BE-MK-17": {
    "title": "Delega, no abdiques",
    "scenario": "Vas a contratar a una agencia para manejar Google Ads por $4,000 al mes. Son muy pulidos y te dicen: “Danos el acceso y relájate; nosotros nos encargamos de todo”. Te tienta: una cosa menos en tu plato, y ellos son los expertos. El contrato está en tu escritorio.",
    "options": {
      "A": "Entrégales la contraseña y revisa el próximo trimestre; para eso contrataste expertos.",
      "B": "Fija metas de costo por prospecto, exige informes semanales y agenda revisiones mensuales; luego déjalos trabajar.",
      "C": "No firmes; sigue manejando los anuncios tú mismo por las noches."
    },
    "why": "Delegar significa metas, mediciones e informes claros; abdicar es soltar la tarea y esperar que salga bien. Si una agencia sin supervisión quema tu presupuesto, la culpa es tuya, no de ellos.",
    "voice": "Asigna la tarea, pero no entregues la responsabilidad.",
    "titleEn": "Delegate, Don't Abdicate"
  },
  "BE-MK-18": {
    "title": "Expectativas antes que rendición de cuentas",
    "scenario": "Tu nueva Showtimer (la encargada de llamar a los prospectos de ferias) dejó los prospectos de la feria del fin de semana cuatro días sin llamar. Estás furioso: los prospectos de feria que se enfrían casi nunca se convierten en cita. Luego te examinas a ti mismo: le entregaste la caja de prospectos y le dijiste “trabaja estos”, pero nunca le dijiste que el estándar era llamar a cada prospecto en menos de 24 horas.",
    "options": {
      "A": "Primero fija la expectativa —un estándar de 24 horas por escrito y por qué importa— y después exígele que lo cumpla.",
      "B": "Levántale una amonestación; el sentido común dice que a los prospectos se les llama rápido.",
      "C": "Quítale en silencio los prospectos de la feria y llámalos tú mismo."
    },
    "why": "Las brechas en las expectativas causan brechas en la ejecución. Ella no cumplió un estándar que solo existía en tu cabeza. Fíjalo con claridad una vez y te habrás ganado el derecho de exigirlo para siempre.",
    "voice": "Si no le dices a tu equipo lo que esperas, no puede rendir cuentas por ello.",
    "titleEn": "Expectations Before Accountability"
  },
  "BE-MK-19": {
    "title": "Hazme sentir importante",
    "scenario": "Tu coordinadora acaba de lograr el mejor mes de prospectos en la historia de la empresa: por iniciativa propia reconstruyó el sistema de solicitud de reseñas y las reseñas en Google se duplicaron. Tienes un pequeño presupuesto discrecional. Ella es callada y nunca pide atención, así que sería fácil asentir y seguir adelante.",
    "options": {
      "A": "Anúncialo en la reunión de la empresa, entrégale una nota escrita a mano y agrega un regalo sorpresa.",
      "B": "Agrégale $50 a su cheque sin decir nada; el dinero habla.",
      "C": "No digas nada; hacer un gran trabajo es para lo que se le paga."
    },
    "why": "El reconocimiento le gana al dinero. Cincuenta dólares silenciosos desaparecen en un cheque; un elogio público y una nota escrita a mano se guardan por años, y le dicen a todo el equipo qué se celebra aquí.",
    "voice": "Las notas escritas a mano terminan colgadas en las paredes durante años.",
    "titleEn": "Make Me Feel Important"
  },
  "BE-MK-20": {
    "title": "El amor es la mayor herramienta de liderazgo",
    "scenario": "Tu coordinadora, siempre confiable, lleva dos semanas distraída: plazos incumplidos, respuestas cortantes, un error en una postal que costó $600. Hoy te enteras por un compañero de que a su mamá acaban de diagnosticarle cáncer. La fecha límite de la campaña de primavera es en diez días y la necesitas a toda velocidad.",
    "options": {
      "A": "Empieza a documentar sus fallas en su expediente, por si acaso.",
      "B": "No te metas en su vida personal; los resultados son los resultados.",
      "C": "Siéntate con ella, pregúntale cómo puedes ayudarla, flexibiliza su horario y cubre tú los huecos."
    },
    "why": "La gente atraviesa paredes por los líderes a quienes de verdad les importan como seres humanos. La compasión hoy compra lealtad por años; documentar fríamente hoy hará que la pierdas en cuanto las cosas se estabilicen.",
    "voice": "Cada vez que hablas con alguien, lo dejas más grande o más pequeño; la elección es tuya.",
    "titleEn": "Love Is the Greatest Leadership Tool"
  },
  "BE-MK-21": {
    "title": "Regala el mérito, asume la culpa",
    "scenario": "El impulso de tu equipo para conseguir reseñas triplicó las reseñas en Google este trimestre; el dueño está feliz y te felicita en la reunión de liderazgo. En esa misma reunión sale a relucir la compra de radio mal hecha que tú aprobaste, y la coordinadora que hizo el pedido está sentada ahí mismo. Todas las miradas se dirigen a ti por ambos temas.",
    "options": {
      "A": "Acepta el elogio con gracia y comenta que en la compra de radio “intervinieron varias manos”.",
      "B": "Menciona a tu equipo por el logro de las reseñas y asume tú el error de la radio; tú lo aprobaste.",
      "C": "Mantente neutral en ambos temas; el juego del mérito y la culpa es pura política."
    },
    "why": "Los líderes pasan el mérito hacia abajo y jalan la culpa hacia arriba. Que tu coordinadora ejecutara una compra que tú aprobaste es error tuyo. Los equipos lo dan todo por los líderes que los protegen y los ponen en primer plano.",
    "voice": "En un discurso motivador, el líder regala todo el mérito y asume toda la culpa.",
    "titleEn": "Give Away the Credit, Take the Blame"
  },
  "BE-MK-22": {
    "title": "Nunca actúes con una sola versión de la historia",
    "scenario": "Uno de tus mejores vendedores te acorrala: “Tu nueva coordinadora de prospectos me está mandando prospectos basura y se guarda los buenos para sus favoritos. Arréglalo o voy con el dueño”. Es tu mayor productor y está enojado. La coordinadora está almorzando. Tienes el dedo sobre el botón de reasignar.",
    "options": {
      "A": "Espera. Escucha la versión de la coordinadora y revisa los registros de distribución de prospectos antes de cambiar nada.",
      "B": "Cambia hoy la asignación de prospectos para calmar a tu mejor vendedor y luego lo aclaras.",
      "C": "Dile al vendedor que lo hable directamente con la coordinadora."
    },
    "why": "Una sola versión de la historia es media historia. Los registros pueden mostrar una distribución pareja o un problema real. Actuar según la voz más fuerte le enseña a todos que el enojo le gana a los hechos.",
    "voice": "Nunca discutas con tu gente ni la desautorices con base en una sola versión; nada debe escaparse de tu atención.",
    "titleEn": "Never Act on One Side of a Story"
  },
  "BE-MK-23": {
    "title": "Atiéndelo mientras es pequeño",
    "scenario": "Acaban de publicar una reseña de dos estrellas en Google: “Buen trabajo, pero dejaron lodo por todas partes y nunca devolvieron la llamada”. Es una reseña entre noventa buenas, y responder significa una llamada incómoda. La cuadrilla involucrada dice que el cliente exagera. Sería fácil dejar que se pierda más abajo en la página.",
    "options": {
      "A": "Responde públicamente defendiendo la versión de la cuadrilla.",
      "B": "Llama hoy al cliente, escúchalo, resuélvelo y luego responde públicamente mostrando que lo corregiste.",
      "C": "Ignórala; una mala reseña entre noventa es ruido estadístico."
    },
    "why": "Los problemas pequeños que se atienden hoy siguen siendo pequeños. Un cliente ignorado escala el problema, y una respuesta a la defensiva le muestra a cada futuro prospecto cómo tratas las quejas. La rapidez convierte a un crítico en una recomendación.",
    "voice": "Si no haces las cosas bien cuando eres pequeño, nunca tendrás la oportunidad de ser grande.",
    "titleEn": "Handle It While It's Small"
  },
  "BE-MK-24": {
    "title": "La cultura es lo que pasa cuando el jefe se va",
    "scenario": "Estás fuera una semana en una conferencia. Al volver, te enteras de que tu equipo se saltó los cinco días la reunión diaria de revisión de prospectos, y los prospectos web del fin de semana esperaron hasta el lunes. Nada “se rompió”, pero todo lo que creías que era cultura resultó ser supervisión. El equipo se ve apenado, pero no preocupado.",
    "options": {
      "A": "Cancela las próximas conferencias; está claro que no puedes irte.",
      "B": "Instala un software que registre los tiempos de respuesta para poder vigilar a distancia.",
      "C": "Reconstrúyelo como un estándar de ellos: explica el porqué, nombra a un responsable de la reunión y deja que el equipo la dirija."
    },
    "why": "La cultura es lo que pasa cuando el jefe se va. Si los estándares solo existen cuando estás presente, construiste obediencia, no cultura. El sentido de pertenencia y un propósito comprendido sobreviven a tu ausencia; la vigilancia no.",
    "voice": "Un discurso motivador no es cultura: repítelo en todas partes, constantemente.",
    "titleEn": "Culture Is When the Boss Leaves"
  },
  "BE-MK-25": {
    "title": "Hablar sin miedo",
    "scenario": "En tu reunión de planificación de campañas, una coordinadora junior dice: “Sinceramente, creo que los nuevos anuncios de radio suenan cursis; mis vecinos se rieron de uno”. Tú escribiste esos anuncios. La sala se queda en silencio, esperando a ver cómo reaccionas. Sientes que se te enciende la cara.",
    "options": {
      "A": "Agradécele, pídele que te cuente más y propón probar ambas versiones con prospectos reales.",
      "B": "Defiende la parte creativa: explica por qué los anuncios funcionan y pasa al siguiente punto.",
      "C": "Sonríe, di “anotado” y no vuelvas a tocar el tema."
    },
    "why": "Castiga al mensajero una vez y nunca más volverás a escuchar la verdad. Sus vecinos son tu mercado: eso es investigación gratis. Manda la opinión del prospecto, no el orgullo del autor.",
    "voice": "No importa lo que tú pienses; importa lo que piensan los prospectos.",
    "titleEn": "Safe to Speak"
  },
  "BE-MK-26": {
    "title": "Un solo departamento: servicio al cliente",
    "scenario": "Tu promoción por postal está generando llamadas, pero el centro de llamadas se está ahogando: los tiempos de espera son largos y la gerente dice que la gente cuelga. En sentido estricto, es problema de su departamento; tu trabajo era generar la respuesta, y tu próxima campaña ya tiene fecha. Ella no ha pedido ayuda formalmente.",
    "options": {
      "A": "Anótalo en tu informe para que la dirección sepa que el centro de llamadas es el cuello de botella.",
      "B": "Ve hoy mismo: comparte el pronóstico de respuesta, escalona tu próximo envío y préstale a una persona capacitada para las horas pico.",
      "C": "Pausa todo el marketing hasta que el centro de llamadas contrate más personal."
    },
    "why": "Hay un solo departamento: servicio al cliente. Los prospectos que generas y luego ves morir en espera son tus prospectos perdidos. Los traspasos internos son tuyos hasta completarlos, no para documentarlos.",
    "voice": "No importa dónde trabajes, hay un solo departamento: el departamento de servicio al cliente.",
    "titleEn": "One Department: Customer Service"
  },
  "BE-MK-27": {
    "title": "Sirve a la persona, no a la casa",
    "scenario": "Estás escribiendo los textos del nuevo sitio web de la empresa. El borrador está lleno de especificaciones: modelos de bombas, capacidad de drenaje, términos de garantía. Al leer reseñas de clientes para sacar citas, notas que nadie menciona el equipo: escriben sobre dormir tranquilos durante las tormentas, salvar los álbumes de fotos de la abuela, los niños jugando en un sótano seco.",
    "options": {
      "A": "Mantén el texto centrado en especificaciones; los compradores serios quieren pruebas técnicas.",
      "B": "Busca un punto medio: especificaciones arriba y una sección de testimonios abajo.",
      "C": "Reescríbelo en torno a la vida del propietario —tranquilidad, recuerdos protegidos— con las especificaciones como respaldo."
    },
    "why": "No le das servicio a una casa; le das servicio a un ser humano que es dueño de esa casa. Los clientes compran alivio y seguridad, no modelos de bombas. Tus reseñas acaban de darte el mensaje.",
    "voice": "No le damos servicio a una casa; le damos servicio a un ser humano que es dueño de esa casa.",
    "titleEn": "Serve the Human, Not the House"
  },
  "BE-MK-28": {
    "title": "¡Wow! es el estándar",
    "scenario": "Los prospectos por recomendación cierran al doble de la tasa de los prospectos pagados y casi no cuestan nada, pero las recomendaciones están estancadas. El gerente de producción comenta que las cuadrillas terminan bien los trabajos —bastante limpios, bastante amables—, pero al final no pasa nada memorable. Tienes presupuesto que podrías gastar en más anuncios pagados.",
    "options": {
      "A": "Crea con producción un cierre ¡Wow! —recorrido final, un pequeño regalo sorpresa, dejarlo más limpio de como estaba— y luego facilita que recomienden.",
      "B": "Compra más prospectos pagados; las recomendaciones no se pueden fabricar.",
      "C": "Envía a los clientes anteriores tarjetas con una recompensa de $100 por recomendación y date por satisfecho."
    },
    "why": "Los clientes satisfechos no se lo cuentan a nadie; los clientes encantados recomiendan. El ¡Wow! crea la reciprocidad que genera los prospectos más baratos y mejores que existen. Una recompensa sin ¡Wow! le paga a la gente por recomendar algo “normal”.",
    "voice": "Los clientes que solo quedan satisfechos lo consideran una transacción justa y no se lo cuentan a nadie.",
    "titleEn": "Wow! Is the Standard"
  },
  "BE-MK-29": {
    "title": "La experiencia es la mitad del producto",
    "scenario": "Un cliente incógnito a tu propia empresa te deja inquieto: contestan el teléfono al sexto timbre, la respuesta automática del formulario web suena a robot y el correo de confirmación tiene el logo roto. El trabajo de instalación en sí es excelente. Tu proyecto planeado para este mes era una campaña de vallas publicitarias.",
    "options": {
      "A": "Lanza la valla; dar a conocer la marca es trabajo de marketing, y los modales al teléfono le tocan a operaciones.",
      "B": "Arregla primero los puntos de contacto —estándar de dos timbres, guiones cálidos, correos reescritos— y después compra publicidad.",
      "C": "Agrega “excelente servicio al cliente” como lema en la valla."
    },
    "why": "Cada punto de contacto es un Momento de la Verdad en el que el cliente juzga a toda la empresa. Una gran instalación no compensa una primera impresión descuidada, y las vallas solo mandan a más gente a vivir la mala experiencia.",
    "voice": "Los clientes juzgan tu profesionalismo en el momento delicado de decidir a quién invitan a su casa.",
    "titleEn": "The Experience Is Half the Product"
  },
  "BE-MK-30": {
    "title": "Los problemas son pruebas",
    "scenario": "Tu envío masivo de correos salió con las fechas de la oferta equivocadas: cientos de clientes esperan ahora un fin de semana de descuentos que no existe. Lo detectaste veinte minutos después de enviarlo. Podrías mandar una corrección ahora y respetar las fechas, o esperar a ver cuántas personas se dan cuenta.",
    "options": {
      "A": "Envía en la misma hora una corrección reconociendo el error y respeta de todos modos las fechas publicadas.",
      "B": "Espera unos días; si no hay quejas, no hace falta corregir.",
      "C": "Respeta las fechas solo para los clientes que llamen a preguntar."
    },
    "why": "Los clientes ven tu error como una prueba, y la rapidez es la disculpa. Manejado rápido y con generosidad, un error puede generar más confianza que un envío perfecto. Esperar es la salida cómoda que apuesta tu reputación.",
    "voice": "Dentro de cada problema está la oportunidad de mejorar.",
    "titleEn": "Problems Are Tests"
  },
  "BE-MK-31": {
    "title": "Clientes para toda la vida",
    "scenario": "Te quedan $6,000 en el presupuesto. Opción uno: una lista de correo de personas recién mudadas, desconocidos, a unos $300 por prospecto generado. Opción dos: tu base de datos de 4,200 clientes anteriores que no han sabido nada de la empresa en tres años; no existe ningún programa de contacto anual. El dueño dice: “Tú decides”.",
    "options": {
      "A": "Divídelo 50/50 para no poner todos los huevos en la misma canasta.",
      "B": "Compra la lista de recién mudados; crecer significa clientes nuevos.",
      "C": "Financia el programa para clientes anteriores: cartas anuales, recordatorios de servicio, contactos de aniversario."
    },
    "why": "Los clientes anteriores ya te conocen y confían en ti, no van a cotizar con otros y cuesta una fracción volver a activarlos. Los desconocidos cuestan cientos por prospecto. El oro que ya está en tu base de datos vale más que la tierra que no has excavado.",
    "voice": "Tienes una opción: dejarlos ir o conservarlos para siempre.",
    "titleEn": "Keep Customers for Life"
  },
  "BE-MK-32": {
    "title": "Vender es ayudar",
    "scenario": "Estás escribiendo la campaña de primavera y la agencia propone tácticas de miedo: un temporizador de cuenta regresiva que se reinicia cada noche, un “SOLO QUEDAN 3 LUGARES” que no es cierto y fotos de archivo de cimientos derrumbados. Dicen que el miedo convierte. Tus inspectores sí encuentran daños reales en la mayoría de las casas que visitan; tienes fotos e historias reales.",
    "options": {
      "A": "Usa la versión de la agencia; las tasas de conversión pagan las cuentas.",
      "B": "Usa urgencia real: fotos auténticas de daños locales, historias verdaderas y la palabra honesta “todavía”.",
      "C": "Elimina por completo la urgencia; solo enumera los servicios y un número de teléfono."
    },
    "why": "Vender es ayudar a la gente a resolver problemas reales. La urgencia honesta —daños reales, consecuencias reales de esperar— le sirve al propietario. La escasez falsa es el atajo cómodo que convierte hoy y corroe la confianza para siempre.",
    "voice": "Crea urgencia con honestidad: usa la palabra “todavía” y revive daños reales del pasado, no presión fabricada.",
    "titleEn": "Selling Is Helping"
  },
  "BE-MK-33": {
    "title": "Nunca prejuzgues",
    "scenario": "Al revisar los prospectos web de ayer, tu coordinadora marcó cuatro para descartar: una dirección de casa móvil, un código postal de “bajos ingresos”, una consulta con faltas de ortografía y una solicitud de reparación pequeñita. “No valen la tarde de un vendedor”, dice. Generar cada prospecto le costó a la empresa unos $180. Ella intenta proteger el tiempo del equipo de ventas.",
    "options": {
      "A": "Cada prospecto recibe el máximo esfuerzo y una cita agendada; explícale por qué prejuzgar acaba con las empresas.",
      "B": "Busca un término medio: manda los prospectos marcados al vendedor novato.",
      "C": "Aprueba su filtro; respetar el tiempo del equipo de ventas genera buena voluntad."
    },
    "why": "Juzgar quién va a comprar cambia tu comportamiento y hace que no compren. Las reparaciones pequeñas se convierten en recomendaciones; los códigos postales “malos” tienen casas totalmente pagadas. Los prospectos le pertenecen a la empresa, no a la opinión de nadie.",
    "voice": "Los prospectos se tratan como dinero en efectivo: son valiosos y hay que rendir cuentas de cada uno.",
    "titleEn": "Never Pre-Judge"
  },
  "BE-MK-34": {
    "title": "Nunca des un precio antes de construir valor",
    "scenario": "Tu coordinadora quiere agregar al sitio web una página de “precios aproximados” y dejar que los representantes telefónicos den cifras a grandes rasgos: “La gente solo quiere una idea, y otras empresas lo hacen”. Es cierto que a veces las llamadas terminan cuando los representantes se niegan a dar precios. El gerente de ventas se opone firmemente a cotizar antes de la inspección.",
    "options": {
      "A": "Agrega la página de precios; la transparencia es lo que esperan los compradores de hoy.",
      "B": "Mantente firme: capacita a los representantes con un guion respetuoso que venda la inspección gratuita, nunca una cifra.",
      "C": "Deja que los representantes den un rango amplio, como “de $3,000 a $30,000”."
    },
    "why": "Una cifra dada antes de construir valor es lo único que el prospecto recuerda, y cada cotización real pierde contra ella. No hay dos casas iguales; el valor se crea en la inspección.",
    "voice": "Nunca cotices ni confirmes un precio antes de la inspección y la presentación.",
    "titleEn": "Never Price Before Value"
  },
  "BE-MK-35": {
    "title": "Da seguimiento para siempre",
    "scenario": "Al limpiar el CRM, encuentras 312 propuestas no vendidas de los últimos 18 meses: propietarios que recibieron cotización y nunca compraron. Nadie ha vuelto a contactar a ninguno. Tu coordinadora sugiere archivarlas: “Se fueron con otro o cambiaron de opinión. Los prospectos nuevos importan más”.",
    "options": {
      "A": "Archívalas; perseguir cotizaciones frías molesta a la gente.",
      "B": "Envía un solo correo masivo de “¿sigues interesado?” y cierra a quien no responda.",
      "C": "Crea un programa de seguimiento: llama a cada propuesta no vendida según un calendario, para siempre, hasta que compren o pidan que pares."
    },
    "why": "Los propietarios que no cierras le compran a otro en seis meses, o siguen esperando. Esas 312 cotizaciones son prospectos ya pagados con proyectos conocidos. Da seguimiento para siempre; un “no” hoy no es un “no” en marzo.",
    "voice": "¿Qué será diferente dentro de 6 meses?",
    "titleEn": "Follow Up Forever"
  },
  "BE-MK-36": {
    "title": "El efectivo es vida",
    "scenario": "Viernes, 4:55 p. m. Acaban de llegar tres prospectos web y tu coordinadora de prospectos está recogiendo sus cosas: “Los llamo el lunes”. Sabes que generar cada prospecto costó unos $220, y quienes cotizan el fin de semana llamarán a tu competencia mañana por la mañana. Faltan dos días y medio para el lunes.",
    "options": {
      "A": "Detenla: esos prospectos se llaman en los próximos diez minutos, y resuelves la cobertura de fin de semana de forma permanente.",
      "B": "Déjalo pasar; las llamadas del lunes por la mañana son horario laboral normal.",
      "C": "Envíales a los prospectos un correo automático para que se sientan atendidos hasta el lunes."
    },
    "why": "Los prospectos son dinero, y el dinero que se deja sobre la mesa un fin de semana se muere. Un prospecto llamado en minutos convierte muchas veces más que uno llamado el lunes. Pagaste $660 por esos tres nombres.",
    "voice": "Los prospectos se tratan como dinero en efectivo: son valiosos y hay que rendir cuentas de cada uno.",
    "titleEn": "Cash Is Life"
  },
  "BE-MK-37": {
    "title": "Conoce tus números",
    "scenario": "Temporada de presupuestos. El dueño pregunta qué canales recortar y cuáles duplicar. Manejas radio, postales, Google Ads, dos ferias de hogar y letreros de jardín, pero quienes contestan las llamadas casi nunca preguntan “¿cómo se enteró de nosotros?” y un tercio de los registros del CRM dicen fuente “desconocida”. Tu intuición dice que la radio funciona.",
    "options": {
      "A": "Recomienda según tu experiencia; llevas años observando estos canales.",
      "B": "Arregla primero la atribución —pregunta obligatoria sobre la fuente, números de seguimiento por canal— y decide con datos reales el próximo trimestre.",
      "C": "Recorta el canal más caro; lo caro es donde se esconde el desperdicio."
    },
    "why": "Todo se reduce a un número, y no puedes tomar la acción correcta con números que no tienes. Una corazonada equivocada podría matar tu mejor canal y financiar el peor.",
    "voice": "Los negocios no son un misterio. Con insumos controlados podemos obtener resultados predecibles. Estás en el negocio de la aritmética.",
    "titleEn": "Know Your Numbers"
  },
  "BE-MK-38": {
    "title": "Conoce tus números",
    "scenario": "El dueño te pide recortar el presupuesto de marketing un 20 por ciento este trimestre. Tu instinto es quitar un poco a cada canal para que ninguno muera. Tu comprador de medios te advierte que repartir el recorte en todas partes dejará sin recursos a los ganadores junto con los perdedores.",
    "options": {
      "A": "Recorta cada canal un 20 por ciento por igual. Es justo y rápido, y todos los proveedores comparten el golpe. Ningún canal se derrumba, y puedes restablecer los fondos el próximo trimestre.",
      "B": "Pausa por completo los dos canales más nuevos y protege los probados con todos sus fondos. Los experimentos nuevos son el gasto más riesgoso, y el dueño pidió un recorte.",
      "C": "Reúne al equipo, muestra el costo real por prospecto de cada canal y elimina por completo los perdedores mientras proteges a los ganadores. Dile al dueño con claridad qué recortes duelen."
    },
    "why": "Convierte un recorte en una decisión de desempeño basada en números reales, y protege a quienes producen resultados en lugar de castigar a todos por igual.",
    "voice": "Los negocios no son un misterio. Con insumos controlados podemos obtener resultados predecibles. Estás en el negocio de la aritmética.",
    "titleEn": "Know Your Numbers"
  },
  "BE-MK-39": {
    "title": "Sistemas, no héroes",
    "scenario": "María, tu coordinadora estrella, es la única que conoce la lista de verificación de las ferias, el momento de pedir reseñas y cómo se asignan las fuentes de prospectos en el CRM; todo está en su cabeza. Acaba de presentar su renuncia: se va en tres semanas porque su familia se muda. El equipo está algo alarmado.",
    "options": {
      "A": "Pídele que capacite verbalmente a un compañero para que sea la nueva persona de referencia.",
      "B": "Dedica las tres semanas a documentar cada proceso —manuales por escrito, listas de verificación, recorridos grabados— y luego capacita al equipo de forma cruzada.",
      "C": "Ofrécele un gran aumento y trabajo remoto para que se quede."
    },
    "why": "Un departamento que vive en una sola cabeza no es un sistema; es una situación de rehenes. Los manuales documentados sobreviven a cualquier salida. Capacitar a un nuevo héroe solo reconstruye el mismo esquema frágil con otro nombre.",
    "voice": "Los planes simples, ejecutados a la perfección, le ganan a los planes complicados que nunca se ponen en práctica.",
    "titleEn": "Systems, Not Heroes"
  },
  "BE-MK-40": {
    "title": "Cómo hacemos cualquier cosa es cómo lo hacemos todo",
    "scenario": "Viernes por la tarde. Llega de la imprenta un lote de 200 letreros de jardín: el rojo de la empresa está notablemente desviado y tu número de teléfono sale pequeño y borroso. Las cuadrillas necesitan letreros el lunes y volver a pedirlos toma diez días. Son “solo” letreros de $3.50, y te tienta encogerte de hombros y repartirlos.",
    "options": {
      "A": "Úsalos; los propietarios no van a estudiar la precisión del color de un letrero de jardín.",
      "B": "Usa este lote ahora, pero haz que el impresor corrija el próximo pedido.",
      "C": "Rechaza el lote, pide una reimpresión urgente y cubre el lunes con los letreros anteriores correctos que tienes a mano."
    },
    "why": "Cómo hacemos cualquier cosa es cómo lo hacemos todo. Un número borroso es un prospecto perdido, y un rojo fuera de marca desgasta todas las demás impresiones por las que pagaste. El letrero de $3.50 recibe la misma excelencia que el trabajo de $50,000.",
    "voice": "Cómo hacemos cualquier cosa es cómo lo hacemos todo. No podemos tener excepciones a nuestros estándares y a nuestro comportamiento.",
    "titleEn": "How We Do Anything Is How We Do Everything"
  },
  "BE-AC-01": {
    "title": "La sombra alargada",
    "scenario": "Diriges el Centro de Citas. Últimamente llegas arrastrando los pies a las 8:55, llamas “basura” a los prospectos de marketing donde todos te oyen y te saltas la reunión de la mañana. Hoy, antes del mediodía, escuchas a tus representantes suspirar con quienes llaman y marcar prospectos como “basura” en el CRM. La energía en la sala está por los suelos, y te sorprendes culpando al equipo.",
    "options": {
      "A": "Publica una política de actitud positiva y advierte que las malas actitudes recibirán amonestación.",
      "B": "Corrígete primero: llega temprano, recorre la sala sonriendo, retoma las reuniones y nunca más hables mal de un prospecto en voz alta.",
      "C": "Llama aparte a tus dos representantes más gruñones y capacítalos en el tono telefónico."
    },
    "why": "El departamento es un espejo de su líder. Los representantes no inventaron los suspiros: los copiaron. Ni las políticas ni la capacitación pueden adelantarse a la sombra que proyectas cada mañana.",
    "voice": "Tu negocio es tu sombra alargada.",
    "titleEn": "The Elongated Shadow"
  },
  "BE-AC-02": {
    "title": "Mereces tus resultados",
    "scenario": "Tu Centro de Citas no alcanzó la meta mensual de citas por un 14%. Hubo problemas reales: bajó el volumen de prospectos de marketing, dos representantes faltaron por enfermedad y el CRM se cayó medio día. El dueño se sienta y te pregunta: “¿Qué pasó?”.",
    "options": {
      "A": "Hazte responsable: “No ajusté los turnos, no impulsé la recuperación de prospectos ni llamé yo mismo. Este es mi plan para corregirlo”.",
      "B": "Presenta una lista precisa y justa de las causas externas; de verdad ocurrieron.",
      "C": "Señala que el equipo de ventas tampoco llegó y pídele al dueño que presione a marketing para conseguir más prospectos."
    },
    "why": "Las causas eran reales, pero un líder que responde con causas se queda en 86% para siempre. La responsabilidad total es la única respuesta que produce un mes siguiente distinto.",
    "voice": "El mundo y el mercado te están dando exactamente lo que mereces en este momento.",
    "titleEn": "You Deserve Your Results"
  },
  "BE-AC-03": {
    "title": "El dolor es combustible",
    "scenario": "Eres representante. Ayer perdiste un prospecto comercial enorme por dar mal la disponibilidad de las cuadrillas, y el vendedor te regañó junto a la cafetera delante de todos. Esta mañana se te hace un nudo en el estómago cuando se ilumina el tablero de llamadas.",
    "options": {
      "A": "Pide trabajar unos días en captura de datos hasta que se calme la cosa.",
      "B": "Recuérdate que, de todos modos, la hoja de prospectos de marketing estaba mal hecha.",
      "C": "Escribe exactamente qué salió mal, corrige hoy tu hoja de disponibilidad y atiende la siguiente llamada más afilado."
    },
    "why": "Un tropiezo se convierte en veneno o en combustible según la historia que te cuentes. Esconderte y culpar a otros desperdician la lección; sacar la corrección convierte el dolor de ayer en tu ventaja de hoy.",
    "voice": "Dentro de cada problema está la oportunidad de mejorar.",
    "titleEn": "Pain Is Fuel"
  },
  "BE-AC-04": {
    "title": "Sé una máquina de aprender",
    "scenario": "La empresa empieza sesiones opcionales los viernes en las que los representantes escuchan con el grupo grabaciones de sus propias llamadas. Tú eres el veterano con la mejor tasa de citas agendadas del edificio. La sesión choca con tu hora más tranquila de papeleo.",
    "options": {
      "A": "Asiste, y lleva tu peor llamada de la semana para analizarla delante de todos.",
      "B": "No vayas; tus números demuestran que no lo necesitas. Que vayan los que batallan.",
      "C": "Asiste, pero pon tu mejor llamada para que los nuevos aprendan de ella."
    },
    "why": "En el momento en que crees que lo sabes todo, dejas de crecer. El mejor del equipo estudiando su peor grabación marca la cultura de aprendizaje de toda la sala, y encuentra su siguiente nivel.",
    "voice": "En cuanto creemos que lo sabemos todo, dejamos de aprender.",
    "titleEn": "Be a Learning Machine"
  },
  "BE-AC-05": {
    "title": "Brillante en lo básico",
    "scenario": "Vas a la mitad de escribir con cuidado las notas del CRM de tu última llamada cuando el teléfono llega al segundo timbre. Tu único compañero en la sala ya está en una llamada. El buzón de voz contestará al cuarto timbre, y quien llama siempre puede dejar un mensaje.",
    "options": {
      "A": "Termina las notas; la precisión importa, y para eso está el buzón de voz.",
      "B": "Contesta antes del segundo timbre, sonriendo, y marca tus notas para terminarlas en cuanto cuelgues.",
      "C": "Contesta y pídele de inmediato a quien llama que espere mientras terminas de escribir."
    },
    "why": "Contestar en dos timbres es lo básico sobre lo que se sostiene toda la máquina. Quien cae en el buzón de voz llama a la siguiente empresa. La opción cómoda cuesta en silencio un prospecto ya pagado.",
    "voice": "Las cosas simples son fáciles de hacer, y fáciles de no hacer.",
    "titleEn": "Brilliant on the Basics"
  },
  "BE-AC-06": {
    "title": "Primero define la realidad",
    "scenario": "Tu tasa de citas agendadas lleva tres meses seguidos bajando: 96%, 91%, 87%. La reunión de equipo empieza en una hora. Te tienta abrir con una charla motivadora y optimista para que nadie entre en pánico, porque la moral ya se siente frágil.",
    "options": {
      "A": "Promete una fiesta de pizza si el equipo vuelve a subir al 95%.",
      "B": "Dile al equipo que “seguimos siendo mejores que la mayoría de las empresas”, lo cual es cierto.",
      "C": "Pon en la pared los números por representante y por fuente, nombra la caída en voz alta y luego construyan juntos la solución."
    },
    "why": "No puedes arreglar un problema que no te atreves a nombrar. El consuelo y la pizza atienden el ánimo; solo los hechos crudos y específicos localizan la causa, y un equipo que ayuda a diagnosticar se adueña de la cura.",
    "voice": "Si no conoces tus números, no puedes tomar la acción correcta.",
    "titleEn": "Define Reality First"
  },
  "BE-AC-07": {
    "title": "Todo se crea dos veces",
    "scenario": "El dueño aprueba tu idea de un turno nocturno para atender las llamadas fuera de horario: “Empieza cuando estés listo”. Cada noche se están perdiendo llamadas, así que te tienta poner el lunes a un representante voluntario en los teléfonos y resolverlo sobre la marcha.",
    "options": {
      "A": "Diséñalo primero en papel: horario, guiones, personal, bono, proceso de traspaso, números de éxito; luego lánzalo.",
      "B": "Lánzalo el lunes y ajusta sobre la marcha; la rapidez le gana a la planificación.",
      "C": "Copia exactamente el esquema nocturno de un competidor grande."
    },
    "why": "Todo se crea dos veces: primero en un plan y después en la realidad. Un turno lanzado sin diseño fracasa a la vista de todos, quema al representante y convence al dueño de que la idea era mala.",
    "voice": "Si no planeas tu futuro, es una señal bastante clara de que no te interesa.",
    "titleEn": "Created Twice"
  },
  "BE-AC-08": {
    "title": "El poder del porqué",
    "scenario": "Tu representante más nueva te cuestiona en la capacitación: “¿Por qué importa el estándar de 95% de prospectos convertidos en cita? Es solo una cuota que alguien eligió”. Un par de veteranos levantan la vista, curiosos por ver cómo respondes.",
    "options": {
      "A": "“Porque esa es la meta que fijó la dirección. Cúmplela”.",
      "B": "Muéstrale el porqué: cada prospecto costó dinero real y es una familia con el sótano mojado; el estándar protege ambas cosas.",
      "C": "Ofrécele $5 extra por cita agendada para que valga la pena perseguir el número."
    },
    "why": "La gente no se esfuerza por la cuota de otro. Conecta el número con el dinero ya gastado y con personas que esperan ayuda, y el estándar se vuelve suyo. Los incentivos ayudan, pero un porqué alimenta un esfuerzo que ningún bono compra.",
    "voice": "La gente no va a llegar cada día al trabajo con ganas de dar lo mejor de sí solo para que tú ganes dinero. Tiene que haber algo más.",
    "titleEn": "Why Power"
  },
  "BE-AC-09": {
    "title": "El negocio sirve a su dueño",
    "scenario": "Eres el dueño. Durante seis años has revisado en persona el buzón de voz del Centro de Citas a las 10 p. m. todas las noches, incluso en vacaciones. Tu pareja ya no lo soporta. Tu gerente del Centro de Citas es capaz y ha insinuado que podría encargarse.",
    "options": {
      "A": "Sigue haciéndolo; nadie revisa ese buzón como tú.",
      "B": "Busca un punto medio: tú te quedas con los fines de semana y ella con los días entre semana.",
      "C": "Capacítala, fija el estándar de revisarlo antes de las 9 p. m. con un informe por la mañana y entrégaselo para siempre."
    },
    "why": "Un negocio que no puede pasar una noche sin ti es tu dueño. Crea el estándar y el informe, transfiere el trabajo por completo, y la máquina por fin sirve a su dueño en lugar de consumirlo.",
    "voice": "La libertad llega cuando te das cuenta de que no puedes hacerlo solo.",
    "titleEn": "The Business Serves Its Owner"
  },
  "BE-AC-10": {
    "title": "Haz lo correcto aunque te cueste",
    "scenario": "Descubres que agendaste dos veces la cita confirmada de mañana a las 9 a. m.; el vendedor no tiene forma de llegar. El cliente no se ha dado cuenta. Reprogramar con honestidad esta noche podría hacerte perder el prospecto; no decir nada significa que el vendedor puede simplemente aparecer “retrasado”.",
    "options": {
      "A": "Llama ahora, reconoce el error, discúlpate y ofrece las dos mejores opciones, además de prioridad en cualquier cancelación.",
      "B": "No digas nada; deja que el vendedor lo suavice mañana.",
      "C": "Envía esta noche un correo de disculpa ofreciendo horarios nuevos."
    },
    "why": "La integridad es lo que haces cuando la honestidad te cuesta una cita. Encubrirlo pone en riesgo al cliente, la reseña y tu cultura. Una llamada en vivo, honesta y generosa, por lo general salva el prospecto de todos modos.",
    "voice": "No necesitamos gente molesta allá afuera con conexión a internet.",
    "titleEn": "Do Right When It Costs You"
  },
  "BE-AC-11": {
    "title": "Contratar te hace o te deshace",
    "scenario": "Dos representantes renunciaron la misma semana y los teléfonos no paran. Responde una sola candidata: llega diez minutos tarde, pasa la entrevista encogiéndose de hombros y contesta con monosílabos, pero tiene experiencia en centros de llamadas y puede empezar mañana por la mañana.",
    "options": {
      "A": "Contrátala; alguien ahora es mejor que una silla vacía, y siempre puedes despedirla.",
      "B": "Contrátala con una “semana de prueba” solo para llamadas de desborde.",
      "C": "Sigue buscando; cubre con horas extra, cambios de turno y tus propias horas al teléfono."
    },
    "why": "La contratación cómoda contesta tus teléfonos encogiéndose de hombros, y cada gesto de indiferencia cuesta un prospecto ya pagado. El dolor a corto plazo en el horario es mejor que meses gestionando un error de contratación que los clientes escuchan a diario.",
    "voice": "Contratar te hará o te deshará.",
    "titleEn": "Hiring Makes You or Breaks You"
  },
  "BE-AC-12": {
    "title": "Carácter antes que habilidad",
    "scenario": "Quedan dos candidatas finales para un puesto en el Centro de Citas. Una: veterana de centros de llamadas con excelentes métricas, que habló mal de todos sus empleadores anteriores en la entrevista. La otra: una mesera sin ninguna experiencia en ventas por teléfono que iluminó la sala e hizo preguntas inteligentes.",
    "options": {
      "A": "Quédate con la veterana; las habilidades rinden ahora y la actitud se puede trabajar después.",
      "B": "Contrata a la mesera y enséñale las habilidades.",
      "C": "Contrata a las dos a medio tiempo y quédate con la que rinda."
    },
    "why": "Los guiones se enseñan en semanas; la calidez no se enseña, y la negatividad no se desaprende. Lo que la veterana dijo de sus empleadores anteriores es un adelanto de lo que dirá de ti en su próxima entrevista.",
    "voice": "No logramos que la gente adopte nuestros valores fundamentales. Encontramos gente que ya los tiene.",
    "titleEn": "Character Over Skill"
  },
  "BE-AC-13": {
    "title": "¡Claro que sí!, o no",
    "scenario": "Terminó la entrevista final. El candidato está… bien. Las referencias se confirman, sus respuestas fueron adecuadas, nada malo, pero tampoco ninguna chispa. El puesto lleva tres semanas vacío y el proceso de reclutamiento tendría que empezar de cero.",
    "options": {
      "A": "No lo contrates; reinicia la búsqueda.",
      "B": "Contrátalo; “bien” más una buena capacitación se vuelve bueno.",
      "C": "Haz un día de prueba pagado y decide después."
    },
    "why": "Si no te encanta en la entrevista —su mejor actuación—, no te va a encantar al teléfono en febrero. Las contrataciones “que están bien” llenan sillas y ponen techo a los departamentos. El estándar es “¡claro que sí!”.",
    "voice": "A veces las mejores decisiones que tomas son las que no tomas.",
    "titleEn": "Hell Yeah, or No"
  },
  "BE-AC-14": {
    "title": "La persona correcta en el puesto correcto",
    "scenario": "María es mágica en las llamadas entrantes —una Catcher nata—, pero detesta el trabajo de Recycler con llamadas salientes, y sus números de rescate de cancelaciones son pésimos. Tomás es promedio en las entrantes, pero le encanta la persecución de volver a llamar a cancelaciones y prospectos viejos. Tu horario actual rota a todos por todas las funciones.",
    "options": {
      "A": "Exígele más a María; todos en este equipo deben dominar cada función.",
      "B": "Levántale una amonestación a María por sus números de recuperación; los estándares son los estándares.",
      "C": "Reubícalos: María recibe las llamadas entrantes, Tomás recupera prospectos, y mide a cada uno en su carril."
    },
    "why": "Los seis roles —Catcher, Hunter, Surfer, Recycler, Perennial, Showtime— existen porque requieren talentos distintos. Acomoda las fortalezas a los puestos y ambos números se disparan; fuérzalos y pierdes a María y las cancelaciones.",
    "voice": "Todo el mundo sirve para algún trabajo.",
    "titleEn": "Right Person, Right Seat"
  },
  "BE-AC-15": {
    "title": "Capacita o retira",
    "scenario": "Jay lleva 60 días y todavía se congela cuando los que solo buscan precio lo presionan. Es simpático, puntual y se esfuerza, pero solo ha acompañado a otros representantes, nunca ha recibido capacitación formal, y su tasa de citas está bajando el promedio del equipo.",
    "options": {
      "A": "Dos meses son suficiente margen; despídelo.",
      "B": "Arma un plan por escrito: práctica diaria de roles con los que buscan precio, llamadas calificadas, una meta a 30 días; luego decide.",
      "C": "Sácalo para siempre de las llamadas en vivo y ponlo en confirmaciones."
    },
    "why": "Acompañar a otros produce una copia de una copia; eso no es capacitación. Le debes a una persona con ganas un plan real con una fecha límite real. Si después de eso todavía no puede, retirarlo es honesto, no cruel.",
    "voice": "Cualquier tonto puede comprar un camión. Desarrollar a la gente detrás del escritorio es el trabajo clave.",
    "titleEn": "Train or Remove"
  },
  "BE-AC-16": {
    "title": "Tú no eres la puerta",
    "scenario": "Eres el gerente del Centro de Citas y el mejor cerrador telefónico del edificio. Cada vez que se ilumina el tablero, te lanzas a las llamadas, y la capacitación, los horarios y el reclutamiento se siguen quedando para “después”. La temporada alta empieza en tres semanas y el equipo sigue agendando al 84%.",
    "options": {
      "A": "Sal de los teléfonos salvo en emergencias reales y dedica esas horas a capacitar a tus representantes para que agenden como tú.",
      "B": "Toma tú las llamadas más difíciles; el mejor cerrador para los prospectos más duros.",
      "C": "Sigue tomando llamadas y haz el trabajo de gerente fuera de horario."
    },
    "why": "Te pagan por los resultados del equipo, no por los tuyos. Un gran cerrador limita al Centro de Citas a la capacidad de una persona; un gran capacitador la multiplica por ocho. El heroísmo en la línea dos es la trampa.",
    "voice": "No te pagan por tus resultados, sino por los de tu equipo.",
    "titleEn": "You Are Not the Door"
  },
  "BE-AC-17": {
    "title": "Delega, no abdiques",
    "scenario": "Hace tres semanas le entregaste a Priya la caja de prospectos de ferias con un “Ahora es tuya, encárgate”. Hoy descubres que a la mitad de los prospectos de la feria de hogar nunca se les llamó. Se están enfriando, y el dueño pregunta por el retorno de la inversión de la feria.",
    "options": {
      "A": "Recupera la caja; está claro que solo funciona cuando la manejas tú.",
      "B": "Dile a Priya que falló y entrégasela a alguien más listo, de la misma manera.",
      "C": "Asume la falla: vuelve a delegar con un proceso definido, una meta diaria de llamadas, una fecha límite y una revisión semanal."
    },
    "why": "Entregar un resultado sin proceso, metas ni seguimiento no es delegar: es abdicar, y la falla es tuya. La misma entrega a otra persona fracasa de la misma manera.",
    "voice": "Asigna la tarea, pero no entregues la responsabilidad.",
    "titleEn": "Delegate, Don't Abdicate"
  },
  "BE-AC-18": {
    "title": "Expectativas antes que rendición de cuentas",
    "scenario": "Tu representante más nueva agendó solo el 71% de sus prospectos frente al estándar de 95% de la empresa. Estás redactando la amonestación cuando te das cuenta: en su inducción nunca se mencionó ese número. Nadie se lo dijo. No está publicado en ningún lado. Los veteranos simplemente “lo saben”.",
    "options": {
      "A": "Presenta la amonestación de todos modos; los estándares son los estándares.",
      "B": "Descártala; fija la expectativa por escrito, capacítala para cumplirla y exígele cuentas a partir de hoy.",
      "C": "No digas nada y obsérvala en silencio un mes más para tener una muestra justa."
    },
    "why": "Exigir cuentas sin expectativas declaradas es una emboscada. Ella no puede alcanzar un número que nunca ha escuchado. Fíjalo con claridad primero; entonces, y solo entonces, exigirlo es justo y eficaz.",
    "voice": "Si no le dices a tu equipo lo que esperas, no puede rendir cuentas por ello.",
    "titleEn": "Expectations Before Accountability"
  },
  "BE-AC-19": {
    "title": "Hazme sentir importante",
    "scenario": "A mitad del turno notas que Sam, uno de tus representantes, acaba de rescatar su novena cita cancelada de la semana: un récord del departamento. Él no sabe que te diste cuenta. Faltan dos semanas para el día de pago, la sala está ocupada y tienes una reunión en diez minutos.",
    "options": {
      "A": "Detén la sala ahora, anúncialo y escríbele una nota a mano que pueda colgar.",
      "B": "Guárdalo para la reunión mensual para que el reconocimiento se sienta oficial.",
      "C": "Agrégale $20 a su próximo cheque sin decir nada; ya lo notará."
    },
    "why": "El reconocimiento pierde valor con cada hora que pasa. Un elogio público, inmediato y específico —más una nota escrita a mano que vive años en una pared— le gana al dinero tardío y le muestra a toda la sala cómo se ve la grandeza.",
    "voice": "Cada vez que hablas con alguien, lo dejas más grande o más pequeño; la elección es tuya.",
    "titleEn": "Make Me Feel Important"
  },
  "BE-AC-20": {
    "title": "El amor es la mayor herramienta de liderazgo",
    "scenario": "Lena, tu mejor representante, lleva toda la semana apagada en las llamadas. Te enteras de que su mamá está en el hospital, a dos pueblos de distancia. El fin de semana de feria de hogar más grande del año empieza el viernes y contabas con ella para encabezar la ofensiva de seguimiento.",
    "options": {
      "A": "Mantenlo profesional; el trabajo es el trabajo. Recuérdale lo importante que es el fin de semana de la feria.",
      "B": "Sácala en silencio de la ofensiva de seguimiento sin decirle por qué.",
      "C": "Siéntate con ella, pregúntale qué necesita, ajusta sus turnos, quítale algo de encima, y que sea de verdad."
    },
    "why": "La gente atraviesa paredes por los líderes a quienes de verdad les importa su vida, no solo sus números. Ajustar el horario en silencio ayuda; el cariño expresado abiertamente construye una lealtad que dura más que diez fines de semana de feria.",
    "voice": "No podemos tener clientes felices sin empleados felices, preparados y comprometidos.",
    "titleEn": "Love Is the Greatest Leadership Tool"
  },
  "BE-AC-21": {
    "title": "Regala el mérito, asume la culpa",
    "scenario": "Tu Centro de Citas acaba de registrar su mejor mes de citas agendadas de la historia, en gran parte gracias a la idea de Dee, una de tus representantes, de enviar confirmaciones por mensaje de texto. En la reunión general de la empresa, el dueño te felicita por el récord. Luego pregunta por una queja: una familia esperó dos días a que le devolvieran la llamada porque la cola se desvió mal. Toda la sala está pendiente de cómo respondes a ambas cosas.",
    "options": {
      "A": "Acepta el elogio con gracia y promete investigar la queja de la llamada.",
      "B": "Dale el mérito a Dee por su nombre y luego asume tú la falla de la llamada: “Esa es mía; esta es la solución”.",
      "C": "Llama al récord “un esfuerzo de equipo” y deja que la representante que desvió la cola explique la queja."
    },
    "why": "Los líderes son megáfonos para el mérito y amortiguadores para la culpa. Nombrar a Dee crea diez Dees más; asumir la falla genera confianza. Hacer lo contrario, aunque sea con buenos modales, le enseña a la gente a esconderse.",
    "voice": "Regala el mérito; quédate con la culpa.",
    "titleEn": "Give Away the Credit, Take the Blame"
  },
  "BE-AC-22": {
    "title": "Nunca actúes con una sola versión de la historia",
    "scenario": "Un vendedor entra furioso al Centro de Citas: “Tu representante Dana me mandó esta mañana a una casa vacía; nadie se presentó. ¡Levántale una amonestación!”. Dana es tu representante más constante en tres años. El vendedor está parado frente a tu escritorio, furioso, esperando ver que hagas algo al respecto ya mismo.",
    "options": {
      "A": "Saca la grabación de la llamada y las notas del CRM, escucha la versión de Dana y luego decide con todos los hechos.",
      "B": "Levántale la amonestación a Dana ahora; ventas es tu cliente y él está furioso.",
      "C": "Defiende a Dana en ese momento y dile que está exagerando."
    },
    "why": "La información incompleta produce la acción equivocada casi siempre. Quizá el cliente mintió, quizá cambió la dirección, quizá Dana se equivocó. La grabación lo sabe. Actuar antes de escuchar es castigar a alguien al azar.",
    "voice": "Media historia produce la acción equivocada cada vez.",
    "titleEn": "Never Act on One Side of a Story"
  },
  "BE-AC-23": {
    "title": "Atiéndelo mientras es pequeño",
    "scenario": "Cole, tu nuevo representante, empezó a contestar con un seco “Centro de Citas” en lugar del saludo sonriente del guion; lo has escuchado dos veces hoy. Sus números de citas siguen bien, estás enterrado en el informe de prospectos de ferias y su evaluación de 90 días es en solo cinco semanas. Es algo pequeño. Por ahora.",
    "options": {
      "A": "Anótalo en su expediente como evidencia para la evaluación de 90 días.",
      "B": "Habla de los saludos en general en la reunión de equipo de la próxima semana.",
      "C": "Oriéntalo hoy: dos minutos, escuchen juntos una grabación y vuelve a fijar el estándar con amabilidad y claridad."
    },
    "why": "Hoy es un saludo; en cinco semanas es un hábito, y para la evaluación ya será “la forma en que habla Cole”. Los problemas pequeños son baratos de arreglar solo mientras son pequeños. La mecha ya está encendida.",
    "voice": "Cuando la mecha está encendida, ese es el momento de actuar.",
    "titleEn": "Handle It While It's Small"
  },
  "BE-AC-24": {
    "title": "La cultura es lo que pasa cuando el jefe se va",
    "scenario": "Vuelves de una conferencia de dos días. El informe telefónico de tu ausencia: los tiempos de espera se duplicaron, dos prospectos pasaron la noche sin una primera llamada y no se hizo ni una sola llamada de Recycler. Cuando tú estás en la sala, nada de eso pasa. Tu primer instinto es averiguar quién aflojó.",
    "options": {
      "A": "Instala monitoreo de pantallas y anuncia auditorías sorpresa cada vez que viajes.",
      "B": "Tómalo como tu boleta de calificaciones: vuelve a enseñar el porqué de cada estándar, publica los números a diario y nombra a un líder de sala para la próxima vez.",
      "C": "Déjalo pasar; todos los equipos se relajan un poco cuando el jefe no está."
    },
    "why": "Lo que pasa cuando nadie está mirando es la cultura que realmente construiste. La vigilancia alquila obediencia; entender el porqué y adueñarse del marcador compra un comportamiento que se mantiene con las luces apagadas.",
    "voice": "La cultura es lo que hace tu equipo cuando no lo estás mirando.",
    "titleEn": "Culture Is When the Boss Leaves"
  },
  "BE-AC-25": {
    "title": "Hablar sin miedo",
    "scenario": "En la reunión de la mañana, tu representante junior levanta la mano: “¿Esa nueva frase de cierre que tenemos que usar? Los que llaman se quedan callados y me cuelgan. Se siente insistente”. La sala se congela: todos saben que tú escribiste esa frase el mes pasado y que estás orgulloso de ella.",
    "options": {
      "A": "Defiende la frase; la probaste en persona y funciona cuando se dice bien.",
      "B": "Di “anotado”, sigue adelante y piénsalo en silencio más tarde.",
      "C": "Agradécele delante de todos, revisen juntos cinco grabaciones esta semana y prueba su versión frente a la tuya."
    },
    "why": "Si cuestionar la idea del jefe se castiga —o simplemente se ignora—, la sala aprende a quedarse callada, y pierdes todas las advertencias futuras. Recompensa al mensajero en voz alta. Gana la mejor idea, no la de mayor rango.",
    "voice": "Si no es seguro hablar, solo vas a escuchar lo que ya piensas.",
    "titleEn": "Safe to Speak"
  },
  "BE-AC-26": {
    "title": "Un solo departamento: servicio al cliente",
    "scenario": "Viernes, 4:55 p. m. Llama un vendedor, casi apenado: su lunes por la mañana está vacío, y una mañana vacía es un hueco en su cheque. Un prospecto nuevo de internet cayó en la cola hace dos minutos. Atenderlo como se debe implica quedarte después del cierre. La rotación del lunes llegaría a él tarde o temprano.",
    "options": {
      "A": "Llama ahora mismo al prospecto y trabájalo hasta agendarlo; los vendedores son tus clientes, y los espacios del lunes alimentan familias.",
      "B": "Déjalo para la rotación del lunes; faltan cinco minutos para cerrar un viernes.",
      "C": "Dile que le pida a su gerente que le pase citas de otro vendedor."
    },
    "why": "El producto del Centro de Citas es un equipo de ventas bien alimentado. Ese prospecto está más fresco ahora mismo, la necesidad es real, y “el lunes” es la salida cómoda que deja sin comer a un compañero en silencio. Un departamento, un cliente.",
    "voice": "El Centro de Citas mantiene alimentados a los vendedores.",
    "titleEn": "One Department: Customer Service"
  },
  "BE-AC-27": {
    "title": "Sirve a la persona, no a la casa",
    "scenario": "Turno brutal: las últimas tres personas que llamaron fueron groseras. Ahora tienes en la línea a una viuda mayor por agua en su sótano, pero se desvía una y otra vez contando historias de su difunto esposo, que “siempre se encargaba de estas cosas”. Dos prospectos de internet parpadean en tu cola y tu número de eficiencia está publicado en la pared.",
    "options": {
      "A": "Llévala con firmeza de vuelta a los horarios disponibles; la eficiencia le sirve a todos.",
      "B": "Baja el ritmo, sonríe para que ella lo escuche, escucha la historia y luego agenda la cita a su paso.",
      "C": "Anota su número en la lista de devolución de llamadas para que la cola siga avanzando."
    },
    "why": "Ella no está comprando un sistema de drenaje; es una persona asustada que enfrenta algo de lo que antes se encargaba su esposo. Quien llama puede oír tu sonrisa, y también tu prisa. Sirve a la persona y la cita se agenda sola.",
    "voice": "Pueden oír tu sonrisa a través del teléfono.",
    "titleEn": "Serve the Human, Not the House"
  },
  "BE-AC-28": {
    "title": "¡Wow! es el estándar",
    "scenario": "Una mujer que llama dice: “Ustedes son la tercera empresa a la que llamo por mi espacio de acceso bajo la casa, y la primera en la que contesta un ser humano”. Está lista para agendar. Podrías programarla en noventa segundos y tomar la siguiente llamada. O podrías hacer de esta llamada algo que les cuente a sus vecinos.",
    "options": {
      "A": "Agenda el horario con eficiencia y sigue; contestar en vivo ya fue el logro.",
      "B": "Comenta que los teléfonos lentos de la competencia seguramente van de la mano con su servicio lento.",
      "C": "Ve por el ¡Wow!: agéndala, envíale la confirmación por mensaje en menos de cinco minutos y mándale la foto y biografía del inspector y su ventana exacta de llegada."
    },
    "why": "Los clientes satisfechos se quedan callados; los clientes ¡Wow! hablan, y las recomendaciones son los prospectos más baratos que vas a conseguir. Ella te dio un momento para ser extraordinario. “Eficiente” es la trampa razonable que lo desperdicia.",
    "voice": "Los clientes satisfechos no hablan. Los clientes ¡Wow! sí.",
    "titleEn": "Wow! Is the Standard"
  },
  "BE-AC-29": {
    "title": "La experiencia es la mitad del producto",
    "scenario": "Estás preparando la inducción de dos nuevas contrataciones. Un representante veterano revisa tu borrador y tacha el módulo de tono y atención: “Somos agendadores. Llamadas cortas, agenda el horario; la inspección es lo que realmente vende”. Su tasa de citas es aceptable, y es cierto que llamadas más cortas significan más llamadas por hora.",
    "options": {
      "A": "Enseña que la llamada telefónica es el primer Momento de la Verdad del cliente: tono, su nombre, atención genuina, con cada persona que llame.",
      "B": "Acepta su cambio; llamadas más cortas significan más llamadas atendidas por hora.",
      "C": "Busca un punto medio: atención completa para los prospectos grandes y trato rápido para el resto."
    },
    "why": "El cliente empieza a juzgar a toda la empresa desde el primer timbre: la llamada ES la primera mitad del producto. Una llamada fría y apresurada envenena la inspección antes de que el camión del inspector siquiera arranque.",
    "voice": "La experiencia es la mitad de lo que vendemos, y empieza con el “hola”.",
    "titleEn": "The Experience Is Half the Product"
  },
  "BE-AC-30": {
    "title": "Los problemas son pruebas",
    "scenario": "Tu inspector no llegó a una cita de la 1:00 p. m.: se le descompuso el camión y se le murió el teléfono. A la 1:25 llama la propietaria, enojada: pidió medio día libre en el trabajo para esto. Está a mitad de una frase sobre “leer esta noche las reseñas de la competencia”. Para ella, la empresa ahora es cómo manejes los próximos diez minutos.",
    "options": {
      "A": "Explícale con la verdad lo que pasó con el camión y ofrécele el primer horario de mañana.",
      "B": "Discúlpate, asúmelo sin excusas y devuélvele la llamada en menos de diez minutos con una visita hoy mismo; consigue que alguien llegue hoy.",
      "C": "Pásaselo al gerente de ventas y espera instrucciones."
    },
    "why": "En los problemas es donde los clientes ponen a prueba quién eres en realidad. Para alguien que perdió medio día, las explicaciones suenan a excusas. La rapidez es la disculpa: resuélvelo hoy y ella contará la historia de enojo con un final feliz.",
    "voice": "La rapidez es la disculpa.",
    "titleEn": "Problems Are Tests"
  },
  "BE-AC-31": {
    "title": "Clientes para toda la vida",
    "scenario": "Heredas el puesto de Perennial. El archivo de clientes tiene 1,400 instalaciones anteriores con fechas de mantenimiento anual, pero nadie ha trabajado esa lista en un año; tu antecesor “nunca tuvo tiempo” entre las llamadas en vivo. Mientras tanto, marketing pide presupuesto para comprar más prospectos nuevos de internet a $60 cada uno.",
    "options": {
      "A": "Apoya el presupuesto para prospectos nuevos; los prospectos frescos son la sangre del negocio.",
      "B": "Entrégale la lista empolvada al representante más nuevo para que practique con algo fácil.",
      "C": "Reserva horas diarias de Perennial y llama a cada cliente anterior para su revisión anual; son los prospectos más baratos y más cálidos que tiene la empresa."
    },
    "why": "Un cliente conservado de por vida vuelve a comprar, recomienda a sus vecinos y no cuesta nada contactarlo. Dejar que 1,400 amigos conocidos queden en silencio mientras pagas $60 por desconocidos es la matemática de una empresa que se olvida de la gente.",
    "voice": "La venta no es el final de la relación; es el comienzo.",
    "titleEn": "Keep Customers for Life"
  },
  "BE-AC-32": {
    "title": "Vender es ayudar",
    "scenario": "Un hombre que llama te interroga durante veinte minutos sobre métodos de inyección de grietas en muros, marcas de bombas de sumidero y la letra pequeña de la garantía. Conoces tus productos al dedillo y estás orgulloso de ello. Él insiste: “Solo dime qué reparación necesito y ya veré si te vuelvo a llamar”.",
    "options": {
      "A": "Respóndele con calidez, pero vende la cita: solo una inspección gratuita en su casa puede diagnosticar su muro real; esa es la ayuda verdadera.",
      "B": "Demuestra tu experiencia: explícale cada método hasta que confíe en ti.",
      "C": "Mándale por correo los folletos de productos para que se autodiagnostique a su ritmo."
    },
    "why": "Tu producto no son las bombas: es la cita. Diagnosticar unos cimientos por teléfono no ayuda a nadie y te arriesga a equivocarte. Si cuelga sin una inspección, se queda con su problema. Vender la visita ES ayudar.",
    "voice": "Vende la cita, no el producto.",
    "titleEn": "Selling Is Helping"
  },
  "BE-AC-33": {
    "title": "Nunca prejuzgues",
    "scenario": "Llegan dos prospectos a tu cola al mismo tiempo. Uno: un formulario de internet desde una dirección frente al lago, con oraciones completas, “remodelación de sótano terminado”. El otro: un mensaje de voz tembloroso desde una ruta rural, una voz mayor que menciona “un poco de agua a veces, si no es muy caro”. Ahora mismo tienes tiempo para atender uno a la perfección.",
    "options": {
      "A": "Atiende primero el prospecto del lago con tu mejor nivel; mete el mensaje de voz después.",
      "B": "Dales a ambos exactamente tu mejor esfuerzo en el orden en que llegaron y agenda cada uno por completo.",
      "C": "Pásale el mensaje de voz rural al representante más nuevo y quédate con el del lago."
    },
    "why": "No puedes ver cuentas bancarias por una línea telefónica. Quien habla de “un poco de agua” puede tener tres propiedades pagadas; el formulario del lago puede ser alguien que solo está curioseando. Escoger a los mejores es prejuzgar, y entrena a toda la sala para hacerlo.",
    "voice": "Nunca sabes con quién estás hablando, así que trata a todos como si fueran tu cliente más grande.",
    "titleEn": "Never Pre-Judge"
  },
  "BE-AC-34": {
    "title": "Nunca des un precio antes de construir valor",
    "scenario": "Un hombre que llama se pone firme: “Dame un precio aproximado para impermeabilizar un sótano o te cuelgo. ¡Todos esconden el precio!”. Tú sí conoces los rangos típicos de los trabajos. Suena genuinamente harto de que le den vueltas, y sientes que la cita se te escapa.",
    "options": {
      "A": "Dale un rango amplio y honesto para que se sienta respetado, y luego intenta agendarlo.",
      "B": "Dale la cifra más baja para conseguir la cita; el inspector puede ajustarla después.",
      "C": "Muestra empatía, explícale que cada sótano es diferente y ofrécele la inspección gratuita que le dará una cifra real, no una suposición."
    },
    "why": "Cualquier cifra por teléfono está mal: demasiado alta mata la visita, demasiado baja explota en la sala de su casa. Un precio sin valor no significa nada. La empatía honesta más “una cifra real, gratis” agenda más llamadas de gente harta que las suposiciones.",
    "voice": "Un precio antes del valor es solo un número al que decir que no.",
    "titleEn": "Never Price Before Value"
  },
  "BE-AC-35": {
    "title": "Da seguimiento para siempre",
    "scenario": "Limpieza trimestral del CRM. Encuentras 212 citas canceladas o a las que el cliente no se presentó, de los últimos dos años, guardadas en una carpeta muerta. Borrarlas toma un clic y hace que tu cartera activa se vea ordenada para la revisión del dueño de mañana. Llamarlos a todos tomaría semanas entre las llamadas en vivo.",
    "options": {
      "A": "Arma una campaña de Recycler: programa toda la lista, de la más antigua a la más reciente, quince llamadas al día hasta que cada registro tenga una respuesta en vivo.",
      "B": "Un clic; cancelaron por algo. Un CRM limpio ayuda a todos.",
      "C": "Envía a toda la lista un correo con un cupón de reactivación y archiva a quien no responda."
    },
    "why": "Una cita cancelada es un activo: el problema en su sótano no se canceló. Cada registro costó dinero real de marketing. El clic ordenado es la opción cómoda que tritura una carpeta llena de prospectos ya pagados y todavía tibios.",
    "voice": "No dijeron “nunca”; dijeron “todavía no”.",
    "titleEn": "Follow Up Forever"
  },
  "BE-AC-36": {
    "title": "El efectivo es vida",
    "scenario": "Fin de mes. Tu tasa de prospectos convertidos en cita marca 89% frente al estándar de 95%. Rastreas la causa: los representantes se rinden después de un solo mensaje de voz con los prospectos de internet y los marcan como “inalcanzables”. Cada prospecto costó unos $55. Los representantes dicen que volver a llamar “se siente como rogar” y que, de todos modos, la cola en vivo los mantiene ocupados.",
    "options": {
      "A": "Acepta el 89%; está cerca y el equipo de verdad está ocupado.",
      "B": "Muéstrale al equipo la cuenta —6% perdido equivale a dólares reales quemados— e implementa un mínimo de cinco intentos antes de dar por perdido cualquier prospecto.",
      "C": "Pídele a marketing prospectos más baratos para que las pérdidas cuesten menos."
    },
    "why": "Los prospectos son dinero que la empresa ya gastó. Al 89%, estás prendiéndole fuego a miles al mes, una etiqueta de “inalcanzable” a la vez. El estándar es 95% o más porque cada punto por debajo es nómina que se quema.",
    "voice": "Cada prospecto es dinero que la empresa ya gastó; no lo dejes sobre la mesa.",
    "titleEn": "Cash Is Life"
  },
  "BE-AC-37": {
    "title": "Conoce tus números",
    "scenario": "El dueño vincula la evaluación de este trimestre del Centro de Citas a la tasa de citas agendadas. Tu tasa saltaría de 88% a 96% si solo contaras los prospectos “calificados”, excluyendo discretamente números equivocados, vendedores y llamadas fuera del área según tu propio criterio. Sospechas que otros departamentos ya maquillan así sus números.",
    "options": {
      "A": "Usa el número solo de calificados; se puede argumentar que de todos modos es más preciso.",
      "B": "Reporta 88% con un criterio de conteo por escrito que cualquiera pueda auditar, más tu plan para subirlo con honestidad.",
      "C": "Reporta ambos números y deja que el dueño elija cuál usar."
    },
    "why": "Un número que puedes maquillar es un número con el que no puedes guiarte. El halagador 96% esconde el problema que te pagan por resolver. Contar con honestidad duele durante una reunión; volar a ciegas duele todos los meses siguientes.",
    "voice": "Un número maquillado es peor que un número malo; un número malo lo puedes arreglar.",
    "titleEn": "Know Your Numbers"
  },
  "BE-AC-38": {
    "title": "Paga por lo que quieres que se repita",
    "scenario": "Estás diseñando el plan de bonos del Centro de Citas. El primer borrador paga $10 fijos por cita agendada. Un veterano señala la falla: los representantes podrían agendar citas dudosas, medio confirmadas, a las que el cliente no se presenta ante el vendedor; el bono paga de todos modos. Corregirlo implica un plan más complicado, y nómina lo quiere simple para el viernes.",
    "options": {
      "A": "Descarta por completo la idea del bono; los incentivos solo invitan a hacer trampa.",
      "B": "Lanza el plan simple; tus representantes son personas honestas.",
      "C": "Paga por las citas que realmente se realizan —agendadas, confirmadas y con el cliente presente— para que el bono repita el comportamiento que quieres."
    },
    "why": "La gente hace aquello por lo que pagas, exactamente como está escrito, no lo que quisiste decir. Paga por citas agendadas y obtendrás citas agendadas; paga por citas realizadas y tendrás vendedores entrando en salas reales. Diseña el plan para el comportamiento, no para la esperanza.",
    "voice": "Obtendrás más de aquello por lo que pagas, así que apunta con cuidado.",
    "titleEn": "Pay for What You Want Repeated"
  },
  "BE-AC-39": {
    "title": "Sistemas, no héroes",
    "scenario": "Rosa es la superestrella de tu Centro de Citas: improvisa cada llamada y agenda al 97%. El diagrama de flujo del guion escrito está guardado sin usar en un cajón; nadie más pasa del 85%. Rosa acaba de presentar su renuncia: se muda en tres semanas. Empieza a cundir el pánico por los números del próximo trimestre.",
    "options": {
      "A": "Siéntate ya con Rosa, extrae lo que realmente dice y llévalo al diagrama del guion, y capacita a cada representante en el sistema mejorado antes de que se vaya.",
      "B": "Ofrécele a Rosa un gran aumento para que se quede trabajando a distancia; protege el 97%.",
      "C": "Recluta con todo a “otra Rosa”; ese talento es la verdadera respuesta."
    },
    "why": "Un departamento construido sobre un héroe muere cuando el héroe se va. Su magia es solo un sistema no escrito: captúralo y el 97% se vuelve enseñable. La previsibilidad es lo que hace escalable a un Centro de Citas; el heroísmo es lo que lo hace frágil.",
    "voice": "Construye sistemas tan buenos que la gente común obtenga resultados extraordinarios.",
    "titleEn": "Systems, Not Heroes"
  },
  "BE-AC-40": {
    "title": "Cómo hacemos cualquier cosa es cómo lo hacemos todo",
    "scenario": "Viernes, 4:50 p. m. Última tarea de la semana: registrar en el CRM las notas de tus últimas seis llamadas. Nadie revisa las notas del viernes, la sala está vacía y “hablé c/ cliente, cita agendada” técnicamente bastaría. El lunes los vendedores entrarán a esas casas sabiendo solo lo que escribas en los próximos diez minutos.",
    "options": {
      "A": "Escribe la versión rápida; las citas están agendadas, y esa es la parte que importa.",
      "B": "Registra notas parciales ahora y planea terminarlas de memoria el lunes.",
      "C": "Escribe las seis con el estándar completo —problema descrito, nombres, inquietudes, indicaciones para llegar—, exactamente igual que las notas de un lunes por la mañana."
    },
    "why": "No existe una versión pequeña de tus estándares. El representante que toma atajos con las notas del viernes que nadie revisa también toma atajos en otras cosas, y el vendedor del lunes entra a ciegas. Todo cuenta, sobre todo lo que nadie revisa.",
    "voice": "Cómo hacemos cualquier cosa es cómo lo hacemos todo.",
    "titleEn": "How We Do Anything Is How We Do Everything"
  },
  "BE-SA-01": {
    "title": "La sombra alargada",
    "scenario": "Los números de tu equipo de ventas llevan tres meses seguidos bajando. En los acompañamientos en campo notas que los representantes acortan la inspección y hablan mal de marketing: los mismos atajos y quejas que tú has estado modelando en las reuniones de los lunes. El dueño te pregunta a ti, el gerente de ventas, qué le pasa al equipo.",
    "options": {
      "A": "Dile al dueño que los representantes se volvieron flojos y propón un plan de comisiones más duro.",
      "B": "Di “Empieza por mí”. Corrige primero tu propia preparación y actitud, y luego vuelve a fijar el estándar en persona.",
      "C": "Contrata en silencio a dos representantes nuevos para subir el promedio."
    },
    "why": "El equipo es la sombra del líder: copiaron exactamente lo que tú modelaste. Para que ellos tengan resultados distintos, primero tú tienes que actuar distinto.",
    "voice": "Tienes el equipo que mereces.",
    "titleEn": "The Elongated Shadow"
  },
  "BE-SA-02": {
    "title": "Mereces tus resultados",
    "scenario": "Tu representante de media tabla entra furioso: “Marketing me sigue mandando prospectos basura. Dame los buenos códigos postales y cierro como Marcus”. El CRM muestra que él y Marcus reciben prospectos del mismo grupo asignado al azar, pero Marcus factura casi cuatro veces más dólares por prospecto.",
    "options": {
      "A": "Dale la razón en que los prospectos se ven flojos y presiona a marketing para que mande unos “mejores”.",
      "B": "Pásalo un mes a los códigos postales más ricos para probar su teoría.",
      "C": "Muéstrale los números: mismo grupo, resultados distintos. Trabaja con él la verdadera variable: el vendedor."
    },
    "why": "Los mismos diez prospectos le dieron $11,000 a Lowman y $54,300 a Highman. Culpar a los prospectos es el patrón del perdedor; hacerse cargo del resultado es donde empieza la mejora.",
    "voice": "Todo pasa por una razón. Cambia las razones y cambiarás lo que pasa.",
    "titleEn": "You Deserve Your Results"
  },
  "BE-SA-03": {
    "title": "El dolor es combustible",
    "scenario": "Perdiste tres cierres en una semana brutal; un cliente hasta se rió de tu precio. Mañana tienes dos citas nuevas, y esta noche te tienta relajarte, saltarte la práctica y “proteger tu confianza” jugando a lo seguro con el precio.",
    "options": {
      "A": "Escribe lo que te enseñó cada “no”, ensaya la corrección esta noche y atiende los prospectos de mañana con todo tu entusiasmo.",
      "B": "Tómate unos días libres para que tu confianza se recupere.",
      "C": "En la próxima cita cotiza más bajo sin decir nada para que no te vuelvan a rechazar."
    },
    "why": "El rechazo no te quita nada que tuvieras. Convertido en estudio y práctica, se vuelve combustible; convertido en miedo que te hace bajar precios, se vuelve un veneno que te sigue a todas partes.",
    "voice": "Tu dolor puede ser tu veneno o tu combustible; tú eliges.",
    "titleEn": "Pain Is Fuel"
  },
  "BE-SA-04": {
    "title": "Sé una máquina de aprender",
    "scenario": "Eres el gerente de ventas y estás planeando las reuniones del próximo trimestre. Tu veterano dice que la práctica de roles es “para novatos”, y nadie ha hecho un acompañamiento en campo en un año. Mientras tanto, la mitad inferior de la tabla no ha mejorado en dos trimestres.",
    "options": {
      "A": "Exime a los veteranos de la práctica de roles para mantener la paz; exígela solo a los novatos.",
      "B": "Cómprale a todos un curso de ventas en línea para verlo en casa.",
      "C": "Haz práctica de roles semanal para todos —los veteranos primero—, más acompañamientos en campo regulares, guiando con reconocimiento."
    },
    "why": "La habilidad crece con repetición y retroalimentación, no con antigüedad. Cuando los mejores practican primero, la práctica se vuelve cultura en lugar de castigo.",
    "voice": "Lo que es fácil de hacer es fácil de no hacer.",
    "titleEn": "Be a Learning Machine"
  },
  "BE-SA-05": {
    "title": "Brillante en lo básico",
    "scenario": "Son las 8 p. m. La inspección salió muy bien y los propietarios están interesados. Estás cansado, y mandar por correo “una propuesta pulida en unos días” suena profesional, y más fácil. Conoces el estándar de tu empresa: propuesta el mismo día, proceso completo, pedir el pedido tres veces.",
    "options": {
      "A": "Promete una propuesta con un formato impecable para el viernes; se ve más profesional.",
      "B": "Arma la propuesta ahora, preséntala y pide el pedido —hasta tres veces— antes de irte.",
      "C": "Deja un folleto y un rango de precios; da seguimiento la próxima semana."
    },
    "why": "El valor y el entusiasmo que construiste se desploman en el momento en que te vas. Lo básico —propuesta el mismo día, proceso completo, pedir tres veces— es donde se gana la batalla.",
    "voice": "Vuélvete brillante en lo básico, porque ahí es donde se gana o se pierde la batalla.",
    "titleEn": "Brilliant on the Basics"
  },
  "BE-SA-06": {
    "title": "Primero define la realidad",
    "scenario": "Mañana es la reunión de pronósticos. Tu cartera está llena de negocios que llevan meses sin responder, y eso hace que el trimestre se vea seguro. El dueño está a punto de aprobar contrataciones basándose en tu número. Depurarla con honestidad te hará ver atrasado.",
    "options": {
      "A": "Depura la cartera hasta dejar la verdad —fuera los negocios muertos, etapas reales, fechas reales— y presenta la brecha honesta con un plan.",
      "B": "Déjala inflada; los números grandes mantienen motivados a todos.",
      "C": "Recorta un poco, pero conserva el gran negocio estancado por el que al dueño le encanta preguntar."
    },
    "why": "No puedes trazar un rumbo desde una posición que inventaste. Las decisiones basadas en una cartera inflada fracasan; una brecha honesta con un plan genera confianza y acción.",
    "voice": "Nuestra sabiduría está hecha tanto de ilusiones perdidas como de conocimientos adquiridos.",
    "titleEn": "Define Reality First"
  },
  "BE-SA-07": {
    "title": "Todo se crea dos veces",
    "scenario": "Mañana por la noche atiendes el prospecto por recomendación más grande de tu año: un proyecto de sótano terminado recomendado por tu mejor cliente. Tu conexión con ellos es fuerte y te tienta llegar sin más y dejar que la conversación fluya.",
    "options": {
      "A": "Improvisa; conectar con la gente es tu don, y los guiones se sienten rígidos.",
      "B": "Dale un vistazo de dos minutos a la hoja del prospecto en la entrada de su casa.",
      "C": "Planéala el día anterior: estudia la casa y las notas de la recomendación, fija los objetivos de la cita y ensaya tu agenda y las objeciones probables."
    },
    "why": "Todo se crea dos veces: una vez en tu mente y otra en la sala del cliente. Una cita planeada con detalle el día anterior fluye sola; una cita improvisada se pierde.",
    "voice": "Tienes que tener un sueño para hacer realidad un sueño.",
    "titleEn": "Created Twice"
  },
  "BE-SA-08": {
    "title": "El poder del porqué",
    "scenario": "La propietaria dice que quiere reparar la grieta de los cimientos “antes de poner la casa en venta algún día”. Pero menciona dos veces las alergias de su hija y que no deja que los niños jueguen en el cuarto de abajo, que huele a humedad. El parche barato de la grieta es la cotización fácil.",
    "options": {
      "A": "Cotiza la reparación sencilla de la grieta que pidió y vete.",
      "B": "Sigue haciendo preguntas hasta que salga el verdadero porqué y luego arma la Lista de Logros en torno a la salud de su familia y ese cuarto.",
      "C": "Presenta el sistema completo de inmediato; intuyes que la necesidad es mayor."
    },
    "why": "Primero las razones, después las respuestas. Cuando la solución se conecta con su verdadero porqué —sus hijos—, la decisión se vuelve fácil y el trabajo queda del tamaño correcto.",
    "voice": "Si no hay un porqué, el cómo no importa.",
    "titleEn": "Why Power"
  },
  "BE-SA-09": {
    "title": "El negocio sirve a su dueño",
    "scenario": "Eres dueño de la empresa y todavía atiendes tú mismo cada prospecto de ventas: noches, fines de semana, partidos de tus hijos que te pierdes. Tu tasa de cierre es la mejor del negocio, y te dices que nadie puede vender como tú. Tu pareja ya dejó de preguntar a qué hora vas a llegar.",
    "options": {
      "A": "Contrata y capacita a un vendedor, pásale prospectos con un sistema real y quédate con el trabajo del dueño: construir el equipo.",
      "B": "Sigue vendiendo todo tú mismo; tu tasa de cierre paga las cuentas.",
      "C": "Sube los precios para poder atender menos prospectos en persona."
    },
    "why": "Un negocio debe servir a su dueño, no consumirlo. Tu estrategia ganadora de trabajar más duro se convirtió en tu estrategia perdedora: no crece y te está comiendo la vida.",
    "voice": "Quieres que tu negocio te dé más vida, no que te quite más vida.",
    "titleEn": "The Business Serves Its Owner"
  },
  "BE-SA-10": {
    "title": "Haz lo correcto aunque te cueste",
    "scenario": "Tu vecino quiere el mismo sistema de impermeabilización que vendes todos los días y te insinúa un “precio de amigo”. Podrías medir un poco menos del perímetro, o simplemente no reportar la propuesta para que nadie haga preguntas. Está parado en la entrada de tu casa, esperando.",
    "options": {
      "A": "Dale un pequeño descuento extraoficial; después de todo, es tu vecino.",
      "B": "Mide un poco menos; nadie revisa nunca los pies lineales.",
      "C": "Cotiza el precio estándar, mide con exactitud y reporta la propuesta como cualquier otra."
    },
    "why": "Una sola lista de precios, sin juegos, y la actividad oculta siempre se descubre. Una integridad que se dobla por un vecino se doblará por cualquiera, y el equipo aprende de lo que tú haces.",
    "voice": "Todos pagan el mismo precio: en el centro, en las afueras, en el lado este y en el lado oeste.",
    "titleEn": "Do Right When It Costs You"
  },
  "BE-SA-11": {
    "title": "Contratar te hace o te deshace",
    "scenario": "La temporada alta empieza en seis semanas y te falta un representante. El candidato de hoy tiene pulso, licencia de conducir y poco más. Cada semana que el puesto sigue vacío, los prospectos se acumulan, y eres tú quien los atiende fuera de horario.",
    "options": {
      "A": "Contrátalo hoy; los prospectos se están quemando y alguien es mejor que un hueco.",
      "B": "Mantén el estándar alto: entrevista como si fuera tu tercera contratación, trabaja tu lista de candidatos que hoy tienen empleo y absorbe prospectos a corto plazo.",
      "C": "Contrátalo “a prueba” y decide después."
    },
    "why": "Una mala contratación en ventas quema prospectos, reputación y meses de capacitación; mucho más de lo que cuesta un puesto vacío. Pon el mismo cuidado en contratar a tu empleado número 73 que al número 3.",
    "voice": "En 30 años nunca me he arrepentido de despedir a alguien (¡aunque sí me he arrepentido de contratar a muchas personas equivocadas!).",
    "titleEn": "Hiring Makes You or Breaks You"
  },
  "BE-SA-12": {
    "title": "Carácter antes que habilidad",
    "scenario": "Se postula el mejor vendedor de tu mayor competidor. Sus números son deslumbrantes. Dos llamadas de referencia insinúan lo mismo: tratos por debajo de la mesa y papeleo maquillado. Tu equipo aprendería mucho de sus habilidades de cierre, y quizá algunas otras cosas.",
    "options": {
      "A": "Descártalo. A la gente honesta se le pueden enseñar habilidades; a la gente hábil no se le puede enseñar honestidad.",
      "B": "Contrátalo con “supervisión estricta” y auditorías rigurosas del papeleo.",
      "C": "Contrátalo y ponlo junto a tu veterano más ético para que se le pegue lo bueno."
    },
    "why": "Las trampas que él haga se van a contagiar, porque los mejores vendedores marcan la pauta. Si la gente no le cree al mensajero, no le creerá al mensaje, y tarde o temprano los clientes se van a enterar.",
    "voice": "Si la gente no le cree al mensajero, no le creerá al mensaje.",
    "titleEn": "Character Over Skill"
  },
  "BE-SA-13": {
    "title": "¡Claro que sí!, o no",
    "scenario": "Entrevista final. El candidato es un talento de nivel 10: brillante, con experiencia, magnético. Cuando le preguntas por qué quiere este trabajo, se encoge de hombros: “Pensé que podía probar un tiempo y ver qué pasa”. Se te cae el alma a los pies, pero ese talento es escaso.",
    "options": {
      "A": "Mejora la oferta hasta que aparezca su entusiasmo.",
      "B": "Contrátalo; un talento tan escaso vale la apuesta.",
      "C": "Descártalo. Un nivel 7 que quiere estar aquí le gana a un nivel 10 que no está seguro."
    },
    "why": "No te conformes con un “quizá”. El talento tibio renuncia en tu mes más ocupado, después de quemar tus mejores prospectos. El deseo es el combustible con el que funciona el talento.",
    "voice": "El deseo es el talento buscando cómo expresarse.",
    "titleEn": "Hell Yeah, or No"
  },
  "BE-SA-14": {
    "title": "La persona correcta en el puesto correcto",
    "scenario": "Tu mejor agendador interno rogó para pasar a ventas en campo. Tres meses después está infeliz y muy por debajo de su cuota, pero sigue siendo oro al teléfono, rescatando citas canceladas que nadie más puede salvar. A él le da vergüenza volver; a ti te da vergüenza moverlo.",
    "options": {
      "A": "Pásalo al puesto de Recycler, donde su talento telefónico gana, con dignidad, un plan claro y un camino real.",
      "B": "Despídelo; fracasó en ventas.",
      "C": "Dale seis meses más en ventas de campo; moverlo ahora parece rendirse."
    },
    "why": "Una personalidad es ideal para un trabajo y no para otro. Lo que falló fue el puesto, no la persona, y una cita rescatada vale tanto como una venta cerrada puerta a puerta.",
    "voice": "Una personalidad es ideal para un trabajo y no para otro.",
    "titleEn": "Right Person, Right Seat"
  },
  "BE-SA-15": {
    "title": "Capacita o retira",
    "scenario": "En las reuniones, todos los representantes asienten con la nueva presentación. Pero el CRM y los acompañamientos en campo muestran que nadie la usa de verdad, y los de media tabla siguen bajando. En la sala te dicen que sí a todo y en el campo se esconden.",
    "options": {
      "A": "Acéptalo; los veteranos se ganaron su propio estilo.",
      "B": "Haz que la práctica de roles sea semanal y obligatoria, entrena a cada representante en lo individual y retira a quien no responda a una capacitación real.",
      "C": "Envía un memo firme que vuelva a exigir la nueva presentación."
    },
    "why": "Un equipo de ventas que no practica roles te dirá que sí a todo y se esconderá. O capacitas a la gente para que mejore o la retiras; la esperanza no es una estrategia, y la mediocridad tolerada se multiplica.",
    "voice": "Un ambiente al que no le gusta la mediocridad pero la acepta obtiene mediocridad.",
    "titleEn": "Train or Remove"
  },
  "BE-SA-16": {
    "title": "Tú no eres la puerta",
    "scenario": "Eres el gerente de ventas y todavía te quedas con los mejores prospectos. Tus números personales brillan; tus representantes están estancados, y dos ya preguntaron discretamente por qué las mejores oportunidades nunca les llegan. El tiempo de capacitación se sigue posponiendo por tus propias citas.",
    "options": {
      "A": "Sigue cerrando ventas; la empresa necesita tus ingresos.",
      "B": "Quédate solo con los trabajos más grandes y difíciles, y reparte el resto.",
      "C": "Entrega todos los prospectos. Tu trabajo es formar vendedores: reclutar, capacitar, hacer acompañamientos en campo y dirigir reuniones."
    },
    "why": "Cada hora que pasas vendiendo, nadie está construyendo el equipo, y el equipo es lo único que crece. El gerente que vende más que sus representantes está mirando el marcador equivocado.",
    "voice": "Lo que te trajo hasta aquí no te llevará hasta allá.",
    "titleEn": "You Are Not the Door"
  },
  "BE-SA-17": {
    "title": "Delega, no abdiques",
    "scenario": "Le entregaste a tu nueva representante toda la cartera de propuestas no vendidas con un alegre “ve por ellos”: sin sistema, sin metas, sin revisiones. Una mala semana después, estás a punto de quitárselo todo y trabajarlo tú mismo.",
    "options": {
      "A": "Define el resultado que esperas, capacítala en el sistema de seguimiento, fija revisiones semanales y deja que ella lo maneje.",
      "B": "Recupera la cartera; es más rápido hacerlo tú.",
      "C": "Déjala completamente sola; o lo resuelve o no."
    },
    "why": "Soltar trabajo sin expectativas no es delegar, y arrebatarlo de vuelta no es dirigir. Delega la autoridad y el método; quédate con la responsabilidad y las revisiones.",
    "voice": "Delega la autoridad, conserva la responsabilidad.",
    "titleEn": "Delegate, Don't Abdicate"
  },
  "BE-SA-18": {
    "title": "Expectativas antes que rendición de cuentas",
    "scenario": "Tu nuevo representante lleva tres semanas. Estás a punto de levantarle una amonestación por su bajo promedio de dólares por prospecto (ADL) y por saltarse las propuestas el mismo día, y entonces caes en cuenta: nadie le dijo nunca cuál es la meta de ADL ni que aquí la propuesta el mismo día es el estándar.",
    "options": {
      "A": "Levántale la amonestación de todos modos; en ventas esos estándares son obvios.",
      "B": "Siéntate primero con él: una meta de ADL explícita, las expectativas del proceso completo, por escrito y acordadas; luego exígele cuentas.",
      "C": "Sáltate la conversación y publica sus números en el tablero a la vista de todos."
    },
    "why": "No puedes exigirle cuentas a la gente por expectativas que nunca fijaste. Haz primero que el estándar sea explícito y acordado; exigir cuentas sin expectativas es solo una emboscada.",
    "voice": "Las brechas en las expectativas llevan a brechas en la ejecución… No hay nada que se le acerque.",
    "titleEn": "Expectations Before Accountability"
  },
  "BE-SA-19": {
    "title": "Hazme sentir importante",
    "scenario": "Tu representante de siempre en el último lugar encabeza la tabla de ventas por una semana: la primera vez en su vida. Los veteranos ponen los ojos en blanco: “Una semana de suerte”. La agenda de la reunión del lunes ya está llena, y podrías simplemente hacerle un gesto en el pasillo.",
    "options": {
      "A": "No digas nada; una semana no prueba nada.",
      "B": "Adviértele en privado que no vuelva a caer ahora que demostró que puede.",
      "C": "Celébralo en voz alta en la reunión: nómbralo, aplaúdelo y deja que se sienta ganador delante de todos."
    },
    "why": "Los vendedores tienen que verse a sí mismos como ganadores; la comisión y la confianza se alimentan mutuamente en un círculo. Celebrar el logro del último lugar jala hacia arriba toda la parte baja de la tabla.",
    "voice": "Imagina que cada empleado lleva un letrero colgado del cuello que dice: “Hazme sentir importante”.",
    "titleEn": "Make Me Feel Important"
  },
  "BE-SA-20": {
    "title": "El amor es la mayor herramienta de liderazgo",
    "scenario": "Temporada alta, la tabla está que arde, y la esposa de tu mejor cerrador acaba de llegar al hospital. Él insiste en seguir atendiendo sus prospectos: “Necesitamos los números”. Todo el equipo está mirando qué haces ahora.",
    "options": {
      "A": "Cubre sus prospectos, mándalo al hospital con goce de sueldo y llámalo tú mismo para ver cómo está; el equipo ve cómo tratas a la gente.",
      "B": "Déjalo seguir trabajando; él lo pidió, y los adultos deciden por sí mismos.",
      "C": "Agradécele su compromiso y agéndale el doble sin decir nada; la temporada es corta."
    },
    "why": "La gente sabe si de verdad te importa, y los soldados luchan por los líderes que los quieren. Los prospectos de una temporada son baratos; un equipo que sabe que lo cubrirías no tiene precio.",
    "voice": "Al final, todo se reduce a esto: ¿amas a la gente?",
    "titleEn": "Love Is the Greatest Leadership Tool"
  },
  "BE-SA-21": {
    "title": "Regala el mérito, asume la culpa",
    "scenario": "Eres el gerente de ventas. El trimestre cerró con un récord, en gran parte gracias a una campaña de recomendaciones que inventó Ana, tu representante novata. En la cena de la empresa, el dueño brinda por “tu brillante trimestre”. También pregunta por qué se cayó el mes pasado una gran propuesta comercial: murió porque tú tuviste el papeleo detenido una semana.",
    "options": {
      "A": "Acepta el brindis en nombre del equipo y explica que el negocio comercial sufrió “retrasos en el proceso”.",
      "B": "Sonríe durante el brindis y luego, esta noche, agradécele a Ana en privado.",
      "C": "Ponte de pie, nombra a Ana y su idea de recomendaciones como la razón del récord y luego asume tú el negocio perdido: “Yo lo detuve. Mi solución: papeleo en 48 horas”."
    },
    "why": "El mérito que regalas se multiplica: Ana inventará tres ideas más y el equipo aprende que la iniciativa paga. La culpa que absorbes genera confianza. “Retrasos en el proceso” es solo culpa con corbata.",
    "voice": "Pasa el elogio hacia abajo y jala la culpa hacia arriba.",
    "titleEn": "Give Away the Credit, Take the Blame"
  },
  "BE-SA-22": {
    "title": "Nunca actúes con una sola versión de la historia",
    "scenario": "Una propietaria llama a la oficina llorando: tu representante Víctor “la presionó durante dos horas y no se quería ir”. Víctor es tu mejor cerrador, con un archivo grueso de recomendaciones. El dueño te reenvía la queja con una sola línea: “Resuélvelo hoy”. Todavía no has hablado con Víctor; está en plena cita al otro lado de la ciudad.",
    "options": {
      "A": "Llama primero a la clienta para disculparte y prometerle que Víctor será sancionado.",
      "B": "Obtén ambas versiones hoy: devuélvele la llamada con cuidado, luego siéntate con Víctor, revisa las notas y los horarios de la cita y decide con base en los hechos.",
      "C": "Respalda a Víctor; los mejores cerradores atraen quejas, viene con el trabajo."
    },
    "why": "La información incompleta produce la acción equivocada. Quizá Víctor cruzó una línea; quizá ella se impresionó con el precio y está reescribiendo la visita. Prometer una sanción antes de tener los hechos traiciona a Víctor; descartarla a ella traiciona a la clienta. Escucha a ambos y luego actúa.",
    "voice": "Una sola versión de la historia es un volado disfrazado de decisión.",
    "titleEn": "Never Act on One Side of a Story"
  },
  "BE-SA-23": {
    "title": "Atiéndelo mientras es pequeño",
    "scenario": "Al revisar las marcas de tiempo del CRM, notas que tu representante constante de media tabla empezó a llegar 10 o 15 minutos tarde a las citas: tres veces en dos semanas. Su tasa de cierre todavía no ha bajado, es buena persona y odias las conversaciones incómodas. La reunión mensual uno a uno es en diecisiete días.",
    "options": {
      "A": "Habla con él hoy —breve, amable, directo—: las llegadas tarde se acaban ya, y pregúntale qué hay detrás.",
      "B": "Espera a la reunión uno a uno; tres datos todavía no son un patrón.",
      "C": "Envía a todo el equipo un correo recordando la puntualidad."
    },
    "why": "Llegar tarde es una mecha encendida: hoy son minutos, el mes que viene son citas perdidas y reseñas de una estrella. El correo al equipo castiga a diecinueve inocentes y al culpable no le advierte nada. Pequeño, ahora y con amabilidad: eso sale barato. Después sale caro.",
    "voice": "Los problemas son como cachorros: edúcalos pequeños o pelea con ellos cuando crezcan.",
    "titleEn": "Handle It While It's Small"
  },
  "BE-SA-24": {
    "title": "La cultura es lo que pasa cuando el jefe se va",
    "scenario": "Te tomas tus primeras vacaciones de verdad en tres años. De vuelta el lunes, revisas el CRM: mientras no estabas, las propuestas el mismo día bajaron de 90% a 40%, dos representantes dieron “precios aproximados” por teléfono y la reunión de ventas del viernes se canceló “porque no estabas para dirigirla”.",
    "options": {
      "A": "Cancela las próximas vacaciones; está claro que el lugar te necesita presente.",
      "B": "Señala individualmente a los que aflojaron; los demás no necesitan sermón.",
      "C": "Tómalo como tu calificación, no la de ellos: reconstruye el porqué de cada estándar y capacita a un representante para dirigir las reuniones, estés o no."
    },
    "why": "Lo que tu equipo hace sin supervisión es lo que realmente le enseñaste. Si los estándares solo viven en tu presencia, construiste supervisión, no cultura, y un departamento que no sobrevive a unas vacaciones no sobrevivirá al crecimiento.",
    "voice": "El verdadero informe de cultura se escribe mientras estás en la playa.",
    "titleEn": "Culture Is When the Boss Leaves"
  },
  "BE-SA-25": {
    "title": "Hablar sin miedo",
    "scenario": "Reunión de ventas. Presentas la nueva plantilla de propuesta que pasaste el fin de semana armando. Una representante de segundo año dice: “¿Sinceramente? La página tres confunde a los clientes; esta semana vi a dos quedarse en blanco”. Un veterano se burla de ella con un resoplido. Todos te miran a ti, el autor, para ver qué les pasa a quienes hacen eso.",
    "options": {
      "A": "Toma nota de la observación, pero lanza la plantilla tal como está; la anécdota de una representante no es un dato.",
      "B": "Agradécele en público, corta la burla y pide a todos que prueben la página tres en las citas de la próxima semana e informen los resultados.",
      "C": "Coméntalo con ella a solas después de la reunión para no debilitar el lanzamiento."
    },
    "why": "La sala acaba de hacer una prueba: ¿aquí se recibe bien la verdad? Las conversaciones aparte protegen tu ego, no al equipo; todos vieron ganar al resoplido. Recompensa al mensajero en público y la mejor idea empezará a ganarle al rango más alto.",
    "voice": "Dispárale a un mensajero y habrás silenciado a cien.",
    "titleEn": "Safe to Speak"
  },
  "BE-SA-26": {
    "title": "Un solo departamento: servicio al cliente",
    "scenario": "Cierras a las 7 p. m. un trabajo complicado de espacio de acceso bajo la casa, apenas. Para conseguir la firma prometiste de palabra que “probablemente pueden empezar el jueves” y desestimaste la pregunta del cliente sobre la escotilla de acceso llena de cosas: “La cuadrilla se encarga de todo eso”. Ahora estás llenando el expediente del trabajo, cansado, y los detalles se sienten opcionales.",
    "options": {
      "A": "Escribe toda la verdad en el expediente: la promesa del jueves, la escotilla bloqueada, fotos, medidas; luego llama mañana a producción para ponerse de acuerdo antes de que el cliente escuche nada.",
      "B": "Entrega el expediente estándar; producción siempre resuelve las condiciones del lugar al llegar.",
      "C": "Anota lo de la escotilla, pero deja fuera el comentario del jueves; solo fue un “probablemente”."
    },
    "why": "Producción es tu cliente, y acabas de venderle un trabajo con una promesa oculta y un obstáculo oculto. Preparar a producción para ganar es la segunda mitad de tu venta; una cuadrilla sorprendida se convierte en un cliente enojado con tu nombre encima.",
    "voice": "Ventas firma el cheque que producción tiene que cobrar.",
    "titleEn": "One Department: Customer Service"
  },
  "BE-SA-27": {
    "title": "Sirve a la persona, no a la casa",
    "scenario": "La cita de esta noche: un ingeniero que abre la puerta con una hoja de cálculo de métodos de reparación de cimientos y tres cotizaciones de la competencia. Tu presentación estándar es cálida, basada en historias y llena de fotos familiares. La semana pasada esa misma presentación encantó durante cuarenta y cinco minutos a una pareja de jubilados muy platicadora. Él mira su reloj mientras abres tu maletín.",
    "options": {
      "A": "Haz tu presentación probada; es un sistema, y los sistemas funcionan cuando se hacen igual cada vez.",
      "B": "Sáltate por completo la presentación y habla solo de números, como él quiere.",
      "C": "Adapta el estilo y mantén el proceso: empieza con datos, especificaciones y respuestas directas; haz todos los pasos, pero preséntalos como ÉL compra."
    },
    "why": "Cuatro estilos de personalidad compran de cuatro maneras distintas; la Regla de Platino dice que trates a cada uno como ÉL quiere ser tratado. Los pasos no cambian; cambia la forma de presentarlos. Historias para el que cuenta historias, especificaciones para el ingeniero.",
    "voice": "Véndele a la persona que tienes enfrente, no a la de la semana pasada.",
    "titleEn": "Serve the Human, Not the House"
  },
  "BE-SA-28": {
    "title": "¡Wow! es el estándar",
    "scenario": "A mitad de la inspección, la propietaria comenta que la tubería de descarga de su bomba de sumidero se congela cada invierno: no es tu trabajo, no está en tu cotización, es un arreglo de diez minutos con una pieza de $15. Vas justo de tiempo para tu siguiente cita, y el negocio por el que viniste ya está prácticamente cerrado.",
    "options": {
      "A": "Recomiéndale un técnico de mantenimiento para la tubería de descarga y termina.",
      "B": "Arréglalo en ese momento —o haz que se resuelva gratis con la instalación— y menciónalo sin que te lo pida dos veces.",
      "C": "Agrega el arreglo de la descarga a la propuesta como una partida de $95."
    },
    "why": "Los clientes satisfechos guardan silencio; los clientes ¡Wow! se lo cuentan a sus vecinos, escriben reseñas y recomiendan. Una pieza de $15 y diez minutos compran la historia que ella va a contar durante años: esa rueda de recomendaciones es el marketing más barato que existe.",
    "voice": "El ¡Wow! no es un extra; el ¡Wow! es el trabajo.",
    "titleEn": "Wow! Is the Standard"
  },
  "BE-SA-29": {
    "title": "La experiencia es la mitad del producto",
    "scenario": "Ola de calor, 4:45 p. m., última cita del día. Te tienta saltarte la llamada de confirmación (“ya saben que voy”), dejar en el camión la camisa arrugada con el logo y quedarte con la camiseta cómoda, y olvidarte de la agenda impresa: “de todos modos a la gente le parece rígida”. Tu conocimiento del producto te va a sacar adelante. Siempre lo ha hecho.",
    "options": {
      "A": "Confirma de todos modos, ponte la camisa limpia con el logo, llega puntual al minuto y abre con la agenda; estándar completo, aunque sea la última cita del día.",
      "B": "Sáltate solo la agenda; la llamada y la camisa son lo que los clientes realmente notan.",
      "C": "Llega cómodo y amable; la autenticidad vende más que los disfraces."
    },
    "why": "El cliente no puede ver la calidad de tu producto escondida dentro de un muro; la juzga por lo que SÍ puede ver: tu camisa, tu puntualidad, tu confirmación, tu agenda. La experiencia es la mitad de lo que está comprando.",
    "voice": "No pueden ver el producto, así que la experiencia ES el producto.",
    "titleEn": "The Experience Is Half the Product"
  },
  "BE-SA-30": {
    "title": "Los problemas son pruebas",
    "scenario": "Sábado por la mañana. Una clienta de la semana pasada te llama al celular, molesta: la cuadrilla terminó ayer y dejó huellas de botas con lodo en toda su alfombra nueva, y además una reja abierta, por la que su perro se escapó una hora. El perro está bien. La oficina de producción abre el lunes. No era tu cuadrilla, y hoy es el partido de fútbol de tu hijo.",
    "options": {
      "A": "Discúlpate y prométele que producción la llamará el lunes a primera hora.",
      "B": "Explícale que los problemas de instalación se atienden en la línea de producción y mándale ese número por mensaje.",
      "C": "Asúmelo ahora: discúlpate en nombre de la empresa, organiza hoy la limpieza de la alfombra y da seguimiento en persona el lunes; la rapidez es la disculpa."
    },
    "why": "Ella no le compró a “producción”: te compró a ti. Los problemas son la prueba que convierte a los clientes en críticos o en promotores, y la calificación depende sobre todo de la rapidez. Resuelto hoy, esto se convierte en la historia que contará a tu favor.",
    "voice": "Los clientes perdonan los problemas; nunca perdonan la lentitud.",
    "titleEn": "Problems Are Tests"
  },
  "BE-SA-31": {
    "title": "Clientes para toda la vida",
    "scenario": "La instalación del mes pasado está terminada, pagada y cerrada. La llamada posterior a la instalación, la solicitud de reseña y el pedido de recomendaciones están en tu lista, pero también cinco citas nuevas muy prometedoras esta semana, y la comisión de un expediente cerrado ya está gastada. Llamar a clientes terminados no te da nada en este periodo de pago.",
    "options": {
      "A": "Sáltatelo; los clientes contentos te llaman si algo sale mal.",
      "B": "Haz la llamada esta semana: confirma que está encantada, pídele la reseña y pregúntale quién más en su calle tiene problemas de agua.",
      "C": "Pide a la oficina que le envíe una encuesta de satisfacción automática."
    },
    "why": "Un cliente conservado de por vida es un motor de recomendaciones, una reseña y un comprador que repite: el “prospecto” más rentable que vas a trabajar. La llamada cuesta diez minutos y paga durante años. Cerrar y olvidar es la forma en que las empresas se quedan pequeñas.",
    "voice": "El cliente más barato de ganar es el que ya ganaste.",
    "titleEn": "Keep Customers for Life"
  },
  "BE-SA-32": {
    "title": "Vender es ayudar",
    "scenario": "La inspección es clara: este espacio de acceso bajo la casa necesita un encapsulado completo o la pudrición seguirá avanzando hacia las vigas del piso. Al propietario le duele la cifra y te ofrece una salida: “Quizá por ahora no hacemos nada; ha estado así por años, ¿no?”. Darle la razón sería cómodo, y seguirían siendo amigos.",
    "options": {
      "A": "Quédate con respeto: muéstrale otra vez las fotos de la pudrición, relaciónalas con su piso hundido y pide el pedido; irte lo deja con el problema.",
      "B": "Respeta su decisión de inmediato; insistir después de un “no” es lo que le da mala fama a las ventas.",
      "C": "Ofrece recortar el alcance a la mitad para que el precio deje de asustarlo."
    },
    "why": "Si no le vendes la solución, se queda con el problema, y la pudrición no se detiene mientras él lo piensa. Retirarte parece cortés, pero lo abandona en una casa que empeora. Persistir con evidencia y con cuidado ES ayudar.",
    "voice": "Cuando no logras venderles, se quedan con su problema.",
    "titleEn": "Selling Is Helping"
  },
  "BE-SA-33": {
    "title": "Nunca prejuzgues",
    "scenario": "La hoja de prospectos de mañana: una casa móvil sencilla en el extremo más lejano de tu territorio, a cuarenta minutos, “olor a humedad debajo de la casa”. Tu compañero del equipo se ríe: “Eso es, como mucho, la venta de un deshumidificador de $200. Cámbiamelo por mi lista de cancelaciones del jueves y ahórrate la gasolina”. Ya has tenido suficientes lecciones sobre proyectar tu propio bolsillo, pero igual sientes la tentación.",
    "options": {
      "A": "Atiéndela, pero lleva solo las opciones de trabajos pequeños para que la visita sea rápida.",
      "B": "Cámbiala con tu compañero; el tiempo en el territorio es dinero, y las cuentas favorecen el jueves.",
      "C": "Atiéndela con la inspección completa, la presentación completa y la solución completa con precio, igual que en una casa frente al lago."
    },
    "why": "Desde la entrada no puedes ver cuentas de ahorro. Algunos de los trabajos más grandes en la historia de la empresa salieron de casas “pequeñas”, y tu bolsillo no es su bolsillo. Precalificar con los ojos es la forma en que se te escapan los clientes más grandes.",
    "voice": "No proyectes tu bolsillo en su decisión.",
    "titleEn": "Never Pre-Judge"
  },
  "BE-SA-34": {
    "title": "Nunca des un precio antes de construir valor",
    "scenario": "A dos minutos de haber entrado, antes de que hayas visto el sótano, el esposo se cruza de brazos: “Ya tenemos tres cotizaciones. Danos tu cifra y te decimos si vale la pena que hagas todo tu espectáculo”. Su esposa ya tiene una libreta en la mano con tres cifras anotadas.",
    "options": {
      "A": "Dale un rango aproximado; negarte se verá evasivo frente a tres competidores que sí cotizaron.",
      "B": "Sonríe, reconoce que su tiempo importa y explícale que tú das cifras reales, no suposiciones; gánate la inspección, arma la Lista de Logros y luego da el precio.",
      "C": "Mejora su cotización escrita más baja para cortar la comparación."
    },
    "why": "Un precio antes del valor es solo una cifra grande y aterradora; sin la brecha entre lo que tienen y lo que podrían tener, cada cifra pierde contra la cotización más barata. Nada de precios aproximados: el proceso es lo que hace que la cifra tenga sentido.",
    "voice": "Un precio sin valor siempre suena caro.",
    "titleEn": "Never Price Before Value"
  },
  "BE-SA-35": {
    "title": "Da seguimiento para siempre",
    "scenario": "La próxima semana se implementa un CRM nuevo, y te piden migrar solo las propuestas “activas”. Tu lista de no vendidos tiene 67 nombres: algunos de hace ocho meses, algunos que dijeron “quizá en primavera”, otros que dejaron de responder. Migrarlos todos implica etiquetar cada uno a mano esta noche. Marcarlos como “cerrado-perdido” toma un clic en lote.",
    "options": {
      "A": "Migra cada propuesta no vendida con una fecha de próximo contacto; esa cartera es oro, y la primavera siempre llega.",
      "B": "Cierra la lista en lote; ocho meses de silencio son una respuesta.",
      "C": "Quédate con los diez más recientes y cierra el resto; el enfoque le gana al desorden."
    },
    "why": "Hasta que se hace la venta, el prospecto está vivo: su sótano mojado no se cerró solo. La gente compra cuando su vida está lista, no cuando tu CRM está ordenado. El clic en lote es la opción cómoda que borra las comisiones del año que viene.",
    "voice": "Da seguimiento hasta que compren o se mueran.",
    "titleEn": "Follow Up Forever"
  },
  "BE-SA-36": {
    "title": "El efectivo es vida",
    "scenario": "Al final de una cita larga, el negocio está ganado de palabra por $14,800. La pareja se ve cansada. Mencionar el depósito y repasar las opciones de financiamiento significa otros quince minutos y un destello de riesgo: podrían dudar. Podrías simplemente darles la mano, saltarte la plática de dinero y “dejar que la oficina resuelva el pago esta semana”.",
    "options": {
      "A": "Consigue la firma esta noche, cobra el depósito y presenta las opciones de financiamiento como lo haces siempre; el pago es parte del cierre.",
      "B": "Firma esta noche y cobra el depósito, pero sáltate el financiamiento; no lo pidieron, y enturbia un negocio ya cerrado.",
      "C": "Despídete con un apretón de manos cálido y deja que la oficina se encargue del depósito y del pago esta semana."
    },
    "why": "Una venta no es una venta hasta que se mueve el dinero: los depósitos hacen reales las decisiones, y el susto por el precio sin financiamiento mata para el jueves los negocios “cerrados”. Ofrece financiamiento siempre: la mayoría de las objeciones son objeciones de dinero disfrazadas.",
    "voice": "Todas las objeciones son objeciones de dinero, así que resuelve el dinero.",
    "titleEn": "Cash Is Life"
  },
  "BE-SA-37": {
    "title": "Conoce tus números",
    "scenario": "Mañana es la evaluación trimestral, con un ranking por ADL: el promedio de dólares por prospecto. El tuyo está bajo por seis prospectos brutales sin venta en marzo. Un compañero te enseña el truco: reclasifica las citas a las que nadie se presentó y los prospectos “malos” como “no calificados” y salen de tu denominador. “Todos lo maquillan”, dice encogiéndose de hombros. Tu lugar en el ranking subiría cuatro puestos de la noche a la mañana.",
    "options": {
      "A": "Reclasifica solo los dos que de verdad no tenían remedio; eso es simple precisión.",
      "B": "Reporta cada prospecto que atendiste, acepta el ADL honesto y lleva tu plan para subirlo.",
      "C": "Reclasifica como todos los demás; una competencia pareja requiere las mismas cuentas."
    },
    "why": "El ADL es el único número que dice la verdad sobre un vendedor, pero solo si el denominador es honesto. Si lo reduces, no estás mejor clasificado: solo te estás mintiendo. No puedes mejorar un número que manipulaste.",
    "voice": "El ADL no miente, a menos que tú lo hagas mentir.",
    "titleEn": "Know Your Numbers"
  },
  "BE-SA-38": {
    "title": "Paga por lo que quieres que se repita",
    "scenario": "Estás rediseñando el plan de pago de ventas. El plan anterior pagaba comisión pura sobre las ventas brutas, y generó malos hábitos: sobrevender trabajos que luego se recortaban, pelearse por los prospectos grandes y cero seguimiento a los pequeños. A los representantes les gusta el plan anterior; el veterano más ruidoso dice: “No arregles lo que paga”.",
    "options": {
      "A": "Construye el plan en torno a lo que quieres que se repita —ingresos vendidos e instalados, seguimiento realizado, reseñas de clientes— y explícale el porqué al equipo.",
      "B": "Mantén el plan anterior, pero agrega un bono trimestral por “buen comportamiento” a tu criterio.",
      "C": "Mantén la comisión pura sobre ventas brutas; los planes simples causan menos discusiones."
    },
    "why": "Un plan de pago es tu instrucción más ruidosa y más permanente: la gente repite exactamente aquello por lo que paga, incluidas las partes feas. Paga sobre ingresos instalados y seguimiento realizado, y las trampas mueren porque dejan de pagar.",
    "voice": "Muéstrame el plan de pago y te mostraré el comportamiento.",
    "titleEn": "Pay for What You Want Repeated"
  },
  "BE-SA-39": {
    "title": "Sistemas, no héroes",
    "scenario": "Tu cerrador Drew vende casi el doble del promedio del equipo improvisando. Se salta la agenda, mide a ojo, pone precios “a sentimiento” y cambia el orden de los pasos en cada cita. A Drew le funciona. Ahora dos novatos copian sus atajos sin tener su instinto, y sus números se están desplomando. Drew dice que el proceso son “rueditas de entrenamiento”.",
    "options": {
      "A": "Deja que Drew trabaje por su cuenta —los resultados compran libertad—, pero obliga a los novatos a seguir el proceso.",
      "B": "Busca un punto medio: un proceso “ligero” para quien supere la cuota.",
      "C": "Un solo proceso, en orden, en cada cita, para todos; y canaliza el talento de Drew a mejorar el sistema, no a escaparse de él."
    },
    "why": "Una empresa de héroes no es una empresa: es una apuesta que nunca crece y que muere cuando Drew se va. La previsibilidad es lo que hace posible el crecimiento. Mete su magia DENTRO del proceso y cada novato la hereda.",
    "voice": "Los héroes ganan citas; los sistemas ganan empresas.",
    "titleEn": "Systems, Not Heroes"
  },
  "BE-SA-40": {
    "title": "Cómo hacemos cualquier cosa es cómo lo hacemos todo",
    "scenario": "La última cita terminó antes: el cliente firmó en cuarenta minutos. Llegas a casa a las 8 con una tarea pendiente: el informe de llamadas de esta noche y las hojas de planificación previa a las citas de mañana. Nadie las revisa. Cerraste hoy; se nota que estás en forma. El sofá y el partido están ahí mismo, y lo de “lo hago mañana en la cafetería” ya te ha funcionado antes.",
    "options": {
      "A": "Sáltate el papeleo como recompensa; el resultado te ganó la noche libre.",
      "B": "Hazlo todo ahora, con el estándar completo, esta noche —el informe, las dos hojas de planificación, cada campo—, como cualquier otra noche.",
      "C": "Resuelve el informe de llamadas esta noche e improvisa la planificación de mañana en el primer semáforo en rojo."
    },
    "why": "No hay excepciones pequeñas: cada atajo vota por quién eres. La disciplina que se sostiene cuando nadie revisa y no hay nada en juego es la misma que aparece en el cierre. Todo cuenta.",
    "voice": "No existe una versión fuera de servicio de tus estándares.",
    "titleEn": "How We Do Anything Is How We Do Everything"
  },
  "BE-PR-01": {
    "title": "La sombra alargada",
    "scenario": "Eres el gerente de producción. Durante un mes has llegado al patio a las 7:20 para un despacho de las 7:00, café en mano, contestando mensajes. Ahora dos cuadrillas cargan tarde, un capataz se saltó la revisión de su camión y los trabajos empiezan con una hora de retraso. El dueño pregunta por qué las mañanas se han vuelto un desorden. Sinceramente, no sabes dónde empezó.",
    "options": {
      "A": "Publica un memo: quien no esté cargando a las 7:05 pierde la prioridad en las horas extra del viernes.",
      "B": "Haz una reunión con las cuadrillas sobre puntualidad y pide a los capataces que se vigilen entre ellos.",
      "C": "Llega tú mismo a la puerta a las 6:45 todos los días durante un mes y luego vuelve a evaluar a las cuadrillas."
    },
    "why": "El departamento refleja a su líder. El desorden empezó contigo, así que la solución empieza contigo. Ni las reglas ni las reuniones pueden gritar más fuerte que tu ejemplo.",
    "voice": "Construimos un mejor negocio construyendo una mejor persona en el líder. Es la única manera de lograrlo.",
    "titleEn": "The Elongated Shadow"
  },
  "BE-PR-02": {
    "title": "Mereces tus resultados",
    "scenario": "Tu instalador más nuevo colocó desnivelado el depósito de una bomba de sumidero y hay que picar la losa: rehacerlo cuesta $2,200. Llevaba tres semanas en tu cuadrilla. Le enseñaste la instalación del depósito una sola vez, un día en que ibas con prisa para ganarle a la lluvia. El dueño pregunta qué pasó. Tu bono de capataz recibe el golpe de cualquier manera.",
    "options": {
      "A": "Repórtalo tal cual: al muchacho se le capacitó y aun así falló; levántale una amonestación.",
      "B": "Dile al dueño: “Lo capacité en una sola pasada apresurada. Eso es mi responsabilidad. Este es mi plan para volver a capacitarlo”.",
      "C": "Busca un punto medio: menciona que es nuevo y pídele al dueño que, por esta vez, no te descuente el bono."
    },
    "why": "Tú lo pusiste en esa tarea, tú lo capacitaste, tú fijaste el estándar. La responsabilidad total es la única posición que te da el poder de arreglarlo.",
    "voice": "Sea lo que sea tu organización hoy, pregúntate: “¿Cómo causé yo esto?”.",
    "titleEn": "You Deserve Your Results"
  },
  "BE-PR-03": {
    "title": "El dolor es combustible",
    "scenario": "El inspector del condado acaba de reprobar tu inspección de zapatas —separación equivocada de la varilla— delante del propietario. Es tu primera reprobación en dos años y rehacerla se come el fin de semana. De vuelta en el camión, tu ayudante dice: “Ese tipo la traía contra nosotros”. Estás avergonzado y enojado, y la reunión de cuadrillas del lunes te toca dirigirla a ti.",
    "options": {
      "A": "Abre la reunión del lunes con la reprobación, lo que TÚ pasaste por alto y una nueva lista de verificación de varilla para cada zapata.",
      "B": "Déjalo pasar en silencio: corrige la separación y no le cuentes a la cuadrilla una vergüenza aislada.",
      "C": "Dile a la cuadrilla que el inspector de ese municipio es muy exigente, así que revisen dos veces la separación allí."
    },
    "why": "Los tropiezos son veneno o combustible; tú decides. Culpar al inspector o esconder la reprobación no cambia nada. Cambiar los insumos —una lista de verificación, una lección pública— convierte el dolor en un sistema.",
    "voice": "Tu dolor puede ser tu veneno o tu combustible; tú eliges.",
    "titleEn": "Pain Is Fuel"
  },
  "BE-PR-04": {
    "title": "Sé una máquina de aprender",
    "scenario": "Eres capataz y pasas noventa minutos diarios manejando. La empresa te ofrece llenar el camión de audios del oficio y pagarte un curso de certificación en impermeabilización: dos noches por semana durante seis semanas, en plena temporada de softbol. Tus instalaciones ya pasan bien las inspecciones, y nadie más de la cuadrilla se está inscribiendo. El gerente de producción dice que es opcional.",
    "options": {
      "A": "Paso esta vez; ya pasas las inspecciones, y las noches son para la familia.",
      "B": "Haz solo los audios; aprendizaje gratis sin sacrificar las noches.",
      "C": "Toma el curso y los audios; trabaja más en ti mismo que en tu trabajo."
    },
    "why": "“Ya estoy suficientemente bien” es la forma en que la gente se estanca y toca techo. La certificación se va sumando: mejor paga, trabajos más grandes, camino a jefe de capataces. Es fácil saltársela, y justo por eso la mayoría se la salta.",
    "voice": "Lo que es fácil de hacer es fácil de no hacer.",
    "titleEn": "Be a Learning Machine"
  },
  "BE-PR-05": {
    "title": "Brillante en lo básico",
    "scenario": "Viernes, 4:40 p. m.; un trabajo sencillo de dos días en un espacio de acceso bajo la casa está terminado y la clienta parece contenta. Lo básico del cierre en tu empresa: recorrido final con la propietaria, barrer el área de trabajo, fotos, cobrar el pago y pedir recomendaciones. La cuadrilla quiere ganarle al tráfico, y la propietaria dice: “No se preocupen por el recorrido, se ve muy bien”.",
    "options": {
      "A": "Sáltate el recorrido, ya que ella lo dispensó; toma las fotos, cobra y vámonos.",
      "B": "Haz el cierre completo de todos modos: recorrido, limpieza, fotos, pago y pedido de recomendaciones. El tráfico puede esperar.",
      "C": "Haz el recorrido, pero sáltate las fotos y el pedido de recomendaciones; está claro que ya está convencida."
    },
    "why": "Lo básico solo funciona cuando se hace sin falta. “Ella lo dispensó” es la forma en que ocurren las visitas de corrección, los pendientes olvidados y las recomendaciones que nunca se pidieron. Fácil de hacer, fácil de no hacer.",
    "voice": "Vuélvete brillante en lo básico, porque ahí es donde se gana o se pierde la batalla.",
    "titleEn": "Brilliant on the Basics"
  },
  "BE-PR-06": {
    "title": "Primero define la realidad",
    "scenario": "Eres el gerente de producción. El tablero de programación dice que tienes trabajo reservado para cinco semanas: se ve muy bien. Pero sabes que dos de esos trabajos tienen órdenes de cambio sin firmar, un cliente no ha pagado el depósito y un jefe de cuadrilla acaba de presentar su renuncia. El dueño está a punto de aprobar un gran pedido de material y una nueva contratación basándose en ese tablero.",
    "options": {
      "A": "Deja correr el pedido; el tablero suele acomodarse solo y odias parecer alarmista.",
      "B": "Rehaz el tablero para mostrar solo el trabajo confirmado, con depósito y con cuadrilla asignada, y explícale hoy al dueño el panorama real.",
      "C": "Señala la vacante del jefe de cuadrilla, lo más urgente, y atiende los trabajos dudosos conforme vayan saliendo."
    },
    "why": "Las decisiones tomadas sobre una ficción se convierten en hechos caros. Para arreglar las cosas tienes que verlas como son: el trabajo pendiente solo cuenta cuando está firmado, financiado y con cuadrilla.",
    "voice": "Para arreglar las cosas, tienes que verlas como son.",
    "titleEn": "Define Reality First"
  },
  "BE-PR-07": {
    "title": "Todo se crea dos veces",
    "scenario": "El lunes empiezas tu trabajo más grande del año: un sistema perimetral completo de $54,000 con una ventana de egreso, dos cuadrillas, renta de una bomba y una secuencia de inspecciones que nunca has hecho en este municipio. Podrías pasar el viernes por la tarde armando un plan de trabajo día por día, o usar el viernes para sacar un pequeño trabajo de pendientes que te tiene inquieto.",
    "options": {
      "A": "Dedica el viernes a planear: secuencia, inspecciones, entregas y asignación de cuadrillas, todo dibujado día por día.",
      "B": "Saca los pendientes; ya has hecho trabajos grandes, plánealo el domingo en la noche de memoria.",
      "C": "Planea los dos primeros días con detalle y resuelve el resto según surjan las condiciones."
    },
    "why": "Todo se crea dos veces: primero en la mente y después en el concreto. Un trabajo de $54,000 con una secuencia de inspecciones desconocida que se construye “sobre la marcha” termina construyéndose dos veces en la realidad.",
    "voice": "Tienes que tener un sueño para hacer realidad un sueño.",
    "titleEn": "Created Twice"
  },
  "BE-PR-08": {
    "title": "El poder del porqué",
    "scenario": "La dirección lanza una nueva regla: cada capataz toma cinco fotos diarias del trabajo y le manda a la oficina un mensaje de estado de una línea. Tus cuadrillas refunfuñan: “Más niñera”. Tú eres el gerente de producción que la presenta en la reunión del lunes. Tienes diez minutos y una sala llena de tipos que odian el papeleo.",
    "options": {
      "A": "Sé breve: “Nueva política, cinco fotos al día, no es negociable, empieza hoy”.",
      "B": "Suavízala: “La oficina quiere fotos; hagan lo que puedan cuando se acuerden”.",
      "C": "Muestra cómo las fotos acabaron el año pasado con un reclamo falso de daños por $9,000, generan prospectos para marketing y demuestran la calidad de la cuadrilla; luego presenta la regla."
    },
    "why": "Primero las razones, después las respuestas. Las cuadrillas que saben que las fotos protegen su propio trabajo y sus bonos cumplen sin que nadie las vigile. Una regla sin porqué se vuelve opcional el día que no estás mirando.",
    "voice": "Si no hay un porqué, el cómo no importa.",
    "titleEn": "Why Power"
  },
  "BE-PR-09": {
    "title": "El negocio sirve a su dueño",
    "scenario": "Eres el gerente de producción y no has tenido un sábado completo libre desde marzo. Tú abres el taller, manejas el despacho y vas a cada trabajo complicado. El sábado es el partido de campeonato de tu hija. Hay una instalación de rutina programada, un trabajo que tu capataz más experimentado ha hecho treinta veces. La vieja costumbre te dice que vayas de todos modos.",
    "options": {
      "A": "Dale instrucciones a tu capataz el viernes, entrégale las llaves del despacho y ve al partido con el teléfono encendido solo para emergencias reales.",
      "B": "Ve al partido, pero llama al capataz cada dos horas para saber cómo va.",
      "C": "Mira el primer tiempo y luego date una vuelta por el trabajo; lo mejor de ambos mundos."
    },
    "why": "El trabajo existe para darte más vida, no para quitártela. Un trabajo de rutina que tu mejor capataz ha hecho treinta veces es exactamente aquello para lo que lo formaste.",
    "voice": "Quieres que tu negocio te dé más vida, no que te quite más vida.",
    "titleEn": "The Business Serves Its Owner"
  },
  "BE-PR-10": {
    "title": "Haz lo correcto aunque te cueste",
    "scenario": "Día de demolición en un sótano terminado: tu cuadrilla encuentra daño activo de termitas en una solera, escondido detrás de los paneles y fuera del alcance de tu contrato. Decírselo al cliente implica parar, traer a un contratista de control de plagas y probablemente perder tu lugar en el calendario; tu bono de instalación se retrasa un mes. Los paneles vuelven a su lugar de cualquier forma, y nadie se enteraría nunca.",
    "options": {
      "A": "Fotografíalo, anótalo en el expediente y menciónalo de pasada en el cierre para que el calendario se mantenga.",
      "B": "Detente, muéstrale hoy el daño al propietario, explícale las opciones y reprograma en torno al tratamiento.",
      "C": "Ciérralo; está fuera del alcance y tú no eres inspector de termitas."
    },
    "why": "Si descubres problemas ocultos, el cliente tiene que saberlo: ahora, no en el cierre. Hacer lo correcto cuando te cuesta un bono es el único momento en que “hacer lo correcto” significa algo.",
    "voice": "Nunca mires hacia otro lado: si descubres problemas ocultos en un trabajo, el cliente tiene que saberlo.",
    "titleEn": "Do Right When It Costs You"
  },
  "BE-PR-11": {
    "title": "Contratar te hace o te deshace",
    "scenario": "Te falta un instalador y tienes seis semanas de trabajo pendiente. Llega un candidato sin cita: tiene herramientas y puede empezar el lunes, pero sus dos últimos trabajos duraron menos de cuatro meses y sus referencias no devuelven la llamada. Tu otra opción es trabajar con cuadrillas incompletas dos o tres semanas más mientras sigues reclutando, pagando horas extra que vas a sentir en los costos de los trabajos.",
    "options": {
      "A": "Contrátalo con una “semana de prueba”; poco riesgo, y necesitas manos.",
      "B": "No contrates a nadie y pídele prestado en secreto un ayudante a la cuadrilla de techos de tu amigo, sin registrarlo.",
      "C": "Trabaja con la cuadrilla incompleta, paga las horas extra y sigue reclutando hasta que las referencias y el historial de alguien se confirmen."
    },
    "why": "El 95% del éxito es la gente que eliges. Una mala contratación en la propiedad de un cliente cuesta visitas de corrección, riesgo de robo y cultura de cuadrilla, mucho más que tres semanas de horas extra. Las semanas de prueba se vuelven permanentes por inercia.",
    "voice": "La mayoría de los desempleados son las personas que nadie más quiso.",
    "titleEn": "Hiring Makes You or Breaks You"
  },
  "BE-PR-12": {
    "title": "Carácter antes que habilidad",
    "scenario": "Necesitas un segundo capataz. El candidato uno es el mejor instalador que has evaluado —rápido, limpio, conoce todos los productos—, pero durante la entrevista práctica infló sus horas en noventa minutos y habló mal de su último jefe dos veces. El candidato dos es más lento y necesita capacitación en tus sistemas de bombas, pero sus referencias dicen que es “honesto hasta el extremo” y duró siete años en una misma empresa.",
    "options": {
      "A": "Quédate con el candidato dos y presupuesta el tiempo de capacitación; puedes enseñar bombas, no puedes enseñar honestidad.",
      "B": "Quédate con el candidato uno y ponle controles; un talento así es escaso.",
      "C": "Quédate con el candidato uno solo como instalador, donde inflar las horas importa menos."
    },
    "why": "Un capataz cobra cheques en la entrada de las casas, firma órdenes de cambio y dirige trabajos sin supervisión. Las brechas de habilidad se cierran con capacitación; una brecha de carácter ya te mostró lo que hace cuando cree que nadie está contando.",
    "voice": "La confianza se reduce a carácter y competencia, y la competencia se puede entrenar.",
    "titleEn": "Character Over Skill"
  },
  "BE-PR-13": {
    "title": "¡Claro que sí!, o no",
    "scenario": "Después de tres entrevistas y un acompañamiento en campo, tu finalista para jefe de cuadrilla está… bien. Cumple todos los requisitos en el papel, las referencias son educadamente positivas, pero nadie en la cuadrilla está entusiasmado, y tú sigues convenciéndote a ti mismo. La temporada fuerte de primavera empieza en cinco semanas y reiniciar la búsqueda significa otro mes cubriendo tú el puesto.",
    "options": {
      "A": "Hazle la oferta; “bien” más capacitación suele volverse bueno, y el calendario es real.",
      "B": "Descártalo, reinicia la búsqueda y sigue cubriendo el puesto hasta que un candidato te haga decir “¡claro que sí!”.",
      "C": "Ofrécele un contrato temporal de 90 días con opción a planta para no comprometerte del todo."
    },
    "why": "Si no te encanta el candidato, no lo contrates: las contrataciones tibias se convierten en ese término medio mediocre al que no puedes despedir ni ascender. El dolor de cubrir un puesto es temporal; un jefe equivocado envenena a toda una cuadrilla.",
    "voice": "Un equipo de talentos de nivel 7 que quieren estar aquí le gana a talentos de nivel 10 que no están seguros.",
    "titleEn": "Hell Yeah, or No"
  },
  "BE-PR-14": {
    "title": "La persona correcta en el puesto correcto",
    "scenario": "Marcus es tu instalador más preciso —trabajo impecable, vive para las tolerancias—, pero es torpe con los propietarios y odia llevar la voz cantante. El puesto de capataz vacante le paga $6 más por hora, y es el siguiente por antigüedad. Mientras tanto, tu rezago de control de calidad y pendientes te está matando, y ese puesto casi ni existe. Marcus pregunta por el puesto de capataz.",
    "options": {
      "A": "Asciéndelo; la antigüedad importa, y ya crecerá en el trato con el cliente.",
      "B": "Déjalo instalando y dale el puesto de capataz al que sigue en la lista.",
      "C": "Crea un puesto pagado de control de calidad e inspección final en torno a su precisión, con aumento, y explícale por qué es perfecto para él."
    },
    "why": "Pon a la gente donde sus fortalezas se valoran y sus debilidades no importan. Ascender a un artesano de precisión a un trabajo de trato con personas te hace perder un gran instalador y ganar un mal capataz.",
    "voice": "Pon a la gente donde sus fortalezas se valoran y sus debilidades no importan.",
    "titleEn": "Right Person, Right Seat"
  },
  "BE-PR-15": {
    "title": "Capacita o retira",
    "scenario": "Danny lleva ocho meses y todavía no puede instalar una tubería de descarga con la pendiente correcta: es su tercera visita de corrección por lo mismo en este trimestre. Es simpático, llega temprano y la cuadrilla lo cubre. Se lo has “mencionado” dos veces, pero nunca le has enseñado la habilidad paso a paso. Dejarlo pasar es lo más fácil; de todos modos la cuadrilla rehace sus tuberías en silencio.",
    "options": {
      "A": "Pásalo a demolición y acarreo, donde la pendiente no entra en juego.",
      "B": "Deja que la cuadrilla lo siga respaldando; está funcionando, y él es bueno para el ánimo.",
      "C": "Haz un plan de capacitación real de dos semanas con puntos de control; si no aprende la habilidad, sácalo."
    },
    "why": "La esperanza no es una estrategia, y “mencionárselo” no es capacitarlo. Capacítalo de forma deliberada y con una fecha límite; si no funciona, retíralo antes de que las visitas de corrección se conviertan en tu reputación.",
    "voice": "¿Y si no los capacito y se quedan?",
    "titleEn": "Train or Remove"
  },
  "BE-PR-16": {
    "title": "Tú no eres la puerta",
    "scenario": "Eres el gerente de producción y también el mejor instalador de la empresa. Cada vez que un trabajo se complica, agarras tus herramientas, y este mes, mientras estabas debajo de tres casas, dos cuadrillas se quedaron esperando pedidos de material que no hiciste y un permiso que no tramitaste. El dueño pregunta por qué la producción cayó un 20% si trabajaste más duro que nunca.",
    "options": {
      "A": "Reconoce que has estado haciendo el trabajo equivocado: mantente fuera de los espacios bajo la casa y encárgate de la programación, los materiales, los permisos y la capacitación.",
      "B": "Sigue sacando las herramientas en los trabajos más difíciles, pero ven los sábados para ponerte al día con el papeleo.",
      "C": "Divídelo: herramientas en la mañana y trabajo de gerente después de las 2 p. m."
    },
    "why": "Te pagan por lo que produce el equipo, no por lo que hacen tus manos. Cada hora debajo de una casa les costó a dos cuadrillas sus materiales y sus permisos. El mejor instalador de la empresa era el ayudante más caro que tenía.",
    "voice": "Hacerlo todo tú mismo es una receta para el fracaso, la frustración, el agotamiento y para quedarles mal a los clientes.",
    "titleEn": "You Are Not the Door"
  },
  "BE-PR-17": {
    "title": "Delega, no abdiques",
    "scenario": "Le entregas el inventario de herramientas y materiales a tu encargado del patio: “Que esté exacto”. Tres semanas después, dos cuadrillas llegan a los trabajos sin piezas, dos veces en una semana. Estás furioso y tentado a quitarle el inventario: nunca falló cuando lo hacías tú. Él nunca recibió las hojas de conteo, los puntos de reorden ni una sola revisión de tu parte.",
    "options": {
      "A": "Recupéralo; hay trabajos que simplemente son tuyos.",
      "B": "Vuelve a delegar como se debe: define qué es un “camión listo para salir”, dale hojas de conteo y puntos de reorden, haz una revisión semanal y dile que confías en que se va a adueñar de la tarea.",
      "C": "Déjalo a cargo, pero vuelve a contar todo tú mismo en secreto cada viernes por la noche."
    },
    "why": "No delegaste: abdicaste. Un resultado claro, recursos, confianza y un ritmo de revisiones: eso es delegar. Quitarle la tarea le enseña a todos que tus entregas son de mentira.",
    "voice": "Diles qué resultado esperas y deja que ellos descubran cómo lograrlo.",
    "titleEn": "Delegate, Don't Abdicate"
  },
  "BE-PR-18": {
    "title": "Expectativas antes que rendición de cuentas",
    "scenario": "Tu nuevo capataz, con dos semanas en el puesto, se fue de una obra a las 3:30 sin barrer la entrada y sin hacer el recorrido con el cliente. Estás a punto de levantarle una amonestación. Entonces revisas su inducción: nadie le explicó nunca tu estándar de cierre; viene de una empresa donde la oficina hacía todo el contacto con el cliente y las cuadrillas simplemente se iban.",
    "options": {
      "A": "Enséñale hoy el estándar de cierre, haz que lo aplique en sus próximos tres trabajos contigo observando y luego exígele que lo cumpla.",
      "B": "Levántale la amonestación; un capataz debería conocer lo básico de una obra en cualquier lado.",
      "C": "No le levantes la amonestación, pero comenta en la reunión de cuadrillas que los cierres se han estado descuidando."
    },
    "why": "Las brechas en las expectativas causan brechas en la ejecución. No puedes exigirle cuentas a alguien por un estándar que solo existe en tu cabeza. Fíjalo, enséñalo, y entonces exigir cuentas tendrá fuerza.",
    "voice": "Las brechas en las expectativas llevan a brechas en la ejecución. No hay nada que se le acerque.",
    "titleEn": "Expectations Before Accountability"
  },
  "BE-PR-19": {
    "title": "Hazme sentir importante",
    "scenario": "Luis lleva tres años dirigiendo tu segunda cuadrilla: cero visitas de corrección este año, capacita a cada ayudante nuevo y nunca se queja. Jamás lo han mencionado en una reunión de la empresa; los elogios siempre son para la cuadrilla que más factura. Hoy el dueño te da cinco minutos en la reunión general y $500 de presupuesto discrecional para “lo que necesite producción”.",
    "options": {
      "A": "Usa los $500 para el atornillador de impacto que las cuadrillas siguen pidiendo; las herramientas le ganan a los discursos.",
      "B": "Menciona a todas las cuadrillas por igual para que nadie se sienta excluido.",
      "C": "Dedica tus cinco minutos a Luis —cero visitas de corrección, por su nombre, con detalles— y dale los $500 como premio a la calidad."
    },
    "why": "El reconocimiento le gana al dinero, y los que cumplen callados día tras día son justo los que se olvidan. Un elogio público, específico y sincero a Luis le dice a cada capataz qué se celebra aquí.",
    "voice": "Imagina que cada empleado lleva un letrero colgado del cuello que dice: “Hazme sentir importante”.",
    "titleEn": "Make Me Feel Important"
  },
  "BE-PR-20": {
    "title": "El amor es la mayor herramienta de liderazgo",
    "scenario": "Tu mejor instalador ha estado fuera de sí toda la semana: llegó tarde dos veces, está callado y cometió un error de medición que no es propio de él. El viernes te enteras de que a su esposa la acaban de despedir y su carro se descompuso; ha estado llegando al patio en bicicleta, 40 minutos. Tienes una camioneta del taller que nadie usa y un sábado con mucho trabajo que normalmente él querría para horas extra.",
    "options": {
      "A": "Dale su espacio; los hombres buenos resuelven sus propios problemas, y él no ha pedido nada.",
      "B": "Préstale la camioneta del taller durante el mes, dale las horas extra del sábado y pregúntale qué más le ayudaría.",
      "C": "Asígnale en silencio los trabajos más fáciles hasta que las cosas se calmen."
    },
    "why": "Ayuda a alguien con su trabajo y le caerás bien; ayúdalo con su vida y te querrá. Una camioneta y un sábado no te cuestan casi nada y compran una lealtad que el dinero no puede comprar.",
    "voice": "Ayuda a alguien con su trabajo y le caerás bien. Ayúdalo con su vida y te querrá.",
    "titleEn": "Love Is the Greatest Leadership Tool"
  },
  "BE-PR-21": {
    "title": "Regala el mérito, asume la culpa",
    "scenario": "El dueño recorre con el propietario, encantado, un trabajo terminado de $38,000, y luego se voltea hacia ti delante de tu cuadrilla: “Un trabajo precioso; por esto te hice gerente de producción”. La verdad es que tu capataz rediseñó la ruta del drenaje a mitad del trabajo y lo salvó después de que TU trazo original chocara con roca firme. La cuadrilla te está mirando aceptar el apretón de manos.",
    "options": {
      "A": "Ahí mismo: “Agradézcaselo a Dave: mi trazo chocó con roca y su rediseño salvó este trabajo. Él es la razón de que se vea así”.",
      "B": "Acéptalo con gracia ahora y elogia a Dave en la próxima reunión de cuadrillas.",
      "C": "Acéptalo; tú formaste el equipo que hizo el trabajo, y para eso les pagan a los gerentes."
    },
    "why": "Regala el mérito en el momento en que te lo ofrecen, delante de quienes se lo ganaron. Espera una semana y ya es tu historia; hazlo ahora y cada hombre se esforzará más por ti.",
    "voice": "REGALA EL MÉRITO. ASUME LA CULPA.",
    "titleEn": "Give Away the Credit, Take the Blame"
  },
  "BE-PR-22": {
    "title": "Nunca actúes con una sola versión de la historia",
    "scenario": "Una propietaria te llama a ti, el gerente de producción, furiosa: tu capataz “se fue enojado del trabajo a la 1 p. m. y dejó un desorden”. Quiere que no vuelva a pisar su propiedad y un descuento. El capataz es tu hombre más constante en seis años. Tu instinto te dice que la dejes satisfecha de inmediato: amenaza con una reseña de una estrella esta noche.",
    "options": {
      "A": "Dile que lo tomas en serio, que hoy mismo vas a obtener los hechos y que le devuelves la llamada antes de las 5; luego escucha al capataz.",
      "B": "Discúlpate, prométele otra cuadrilla y un descuento, y después pregúntale al capataz qué pasó.",
      "C": "Saca al capataz del trabajo y levántale una amonestación esta noche; protege primero la reseña y después aclara los hechos."
    },
    "why": "Una forma segura de tomar la acción equivocada es actuar con media historia. Quizá se fue porque el perro de ella mordió a un ayudante, o por un olor a gas. Comprométete con la rapidez, no con un veredicto.",
    "voice": "Una forma segura de tomar la acción equivocada es actuar con información incompleta o incorrecta.",
    "titleEn": "Never Act on One Side of a Story"
  },
  "BE-PR-23": {
    "title": "Atiéndelo mientras es pequeño",
    "scenario": "En la limpieza final de un trabajo de sótano, notas una sombra húmeda en la unión de una esquina: apenas visible, probablemente condensación, quizá una filtración. La clienta no la ha visto. Revisarla implica quitar una sección del panel de pared nuevo y quedarse dos horas más un viernes. Lo más probable es que no sea nada, y de todos modos la garantía lo cubre si algún día aparece.",
    "options": {
      "A": "Anótalo en el expediente para que servicio tenga un registro si ella llama algún día.",
      "B": "Toma una foto y dile a la clienta que esté pendiente de esa esquina.",
      "C": "Quita el panel y revísalo ahora, aunque sean dos horas más, mientras las herramientas están fuera y la reparación es pequeña."
    },
    "why": "Las causas de una crisis se siembran temprano. Una filtración encontrada hoy se arregla en dos horas; encontrada en ocho meses es una alfombra inundada, una reseña furiosa y una visita de corrección de toda la cuadrilla.",
    "voice": "Los buenos líderes reconocen cuando una mecha está encendida y actúan de inmediato.",
    "titleEn": "Handle It While It's Small"
  },
  "BE-PR-24": {
    "title": "La cultura es lo que pasa cuando el jefe se va",
    "scenario": "Vuelves de dos días en una feria comercial. Tu ayudante menciona, como si nada, que mientras no estabas la cuadrilla no apuntaló una zanja de cuatro pies “porque el suelo estaba firme” y terminó temprano. Nadie salió herido, el trabajo pasó la inspección, el capataz que lo permitió es tu hombre más experimentado y al cliente le encantó la rapidez.",
    "options": {
      "A": "Déjalo pasar con una palabra discreta al capataz; no hubo daño y no quieres castigar la iniciativa.",
      "B": "Atiéndelo de frente: primero con el capataz en privado y luego vuelve a fijar el estándar de apuntalamiento con todas las cuadrillas; lo que pasa cuando no estás ES la empresa.",
      "C": "Empieza a hacer visitas sorpresa a las obras para que nunca sepan cuándo los estás mirando."
    },
    "why": "La cultura es lo que pasa cuando el jefe sale del edificio. Un estándar de seguridad que se saltó y “funcionó” se convierte en el estándar real. La vigilancia no arregla la cultura; los estándares que se sostienen sin ti, sí.",
    "voice": "La cultura es lo que pasa cuando el jefe sale del edificio.",
    "titleEn": "Culture Is When the Boss Leaves"
  },
  "BE-PR-25": {
    "title": "Hablar sin miedo",
    "scenario": "A mitad del colado, tu aprendiz más nuevo —tres semanas en el puesto— dice delante de la cuadrilla: “¿Esa cimbra de la zapata no está una pulgada fuera de escuadra?”. Revisas. Está equivocado; está dentro de la tolerancia. Dos veteranos sonríen con burla. La cuadrilla está mirando cómo respondes al muchacho nuevo que acaba de cuestionar al capataz en público.",
    "options": {
      "A": "Dile en privado después que te lleve sus dudas a solas, no delante de la cuadrilla.",
      "B": "Tómalo a broma —“tú dedícate a mezclar, novato”— y sigue con el colado.",
      "C": "Agradécele en voz alta, muéstrale la verificación de tolerancia y dile a la cuadrilla que quieres que todos los ojos hagan exactamente eso."
    },
    "why": "Cada vez que alguien habla es una prueba. Castiga una observación equivocada y perderás todas las acertadas del futuro: la próxima zapata mal hecha se colará en silencio mientras la cuadrilla mira.",
    "voice": "Cada vez que alguien habla es una prueba: nunca avergüences a nadie y usa las mejores ideas, vengan de donde vengan.",
    "titleEn": "Safe to Speak"
  },
  "BE-PR-26": {
    "title": "Un solo departamento: servicio al cliente",
    "scenario": "Tu cuadrilla abre un trabajo y descubre que el vendedor midió 30 pies de muro de menos: es la tercera vez este trimestre con el mismo representante. La cuadrilla quiere que llames a la clienta y le digas: “Ventas se equivocó; esto va a costar más”. Se sentiría muy bien, y además es verdad. La orden de cambio tiene que hacerse de cualquier forma.",
    "options": {
      "A": "Maneja la orden de cambio como “la empresa”, sin culpar a nadie ante la clienta, y luego resuelve el problema de medición directamente con ventas esa misma semana.",
      "B": "Dile claramente a la clienta que el presupuesto fue un error de ventas para que producción no cargue con la culpa.",
      "C": "Absorbe en silencio los 30 pies esta vez y mándale un correo a ventas al respecto."
    },
    "why": "Para el cliente hay una sola empresa, que gana o pierde junta. Echar a ventas bajo el autobús no le da nada a tu cuadrilla y le cuesta confianza a la empresa. Arréglalo por dentro, donde de verdad se puede arreglar.",
    "voice": "Todos ganamos o perdemos juntos: la empresa es un solo departamento.",
    "titleEn": "One Department: Customer Service"
  },
  "BE-PR-27": {
    "title": "Sirve a la persona, no a la casa",
    "scenario": "Primer día en la casa de la señora Álvarez: 81 años, viuda reciente, rondando nerviosa mientras tu cuadrilla rompe con el martillo neumático el piso de su sótano. Hace las mismas preguntas tres veces y se disculpa por ello. Tu cuadrilla va al ritmo del bono del capataz y cada minuto hablando es un minuto sin excavar. Tu ayudante murmura: “Trabaja alrededor de ella y ya”.",
    "options": {
      "A": "Sé amable, pero mantén a la cuadrilla con la cabeza abajo; el mejor regalo que le puedes dar es un sótano terminado.",
      "B": "Asígnale una persona: tú pasas a verla cada mañana, a la hora de la comida y al final del día, le explicas lo que sigue y le escribes tu celular en el contrato.",
      "C": "Sugiérele que se quede arriba por seguridad hasta que termine el trabajo ruidoso."
    },
    "why": "No le das servicio a una casa; le das servicio a un ser humano, uno asustado. Diez minutos de comunicación programada al día cuestan menos que una cancelación por pánico a mitad del trabajo o la llamada de una hija preocupada.",
    "voice": "No le damos servicio a una casa; le damos servicio a un ser humano.",
    "titleEn": "Serve the Human, Not the House"
  },
  "BE-PR-28": {
    "title": "¡Wow! es el estándar",
    "scenario": "El trabajo terminó medio día antes y por debajo del presupuesto: contrato cumplido, clienta satisfecha. Tienes a la cuadrilla hasta las 3:00. Toda la semana te llamó la atención la reja caída de la clienta; arreglarla toma veinte minutos y madera sobrante. Tu ayudante dice: “La meta es que quede satisfecha, jefe; carguemos”. Despacho con gusto te recibiría antes.",
    "options": {
      "A": "Regresa temprano; terminar antes YA ES el ¡Wow!, y a despacho le sirves.",
      "B": "Arregla la reja, menciónala en el recorrido final y pregúntale a quién más conoce que nos necesite.",
      "C": "Arregla la reja, menciónala en el recorrido final y pídele recomendaciones Y una reseña mientras la cuadrilla todavía está ahí."
    },
    "why": "Los clientes satisfechos no se lo cuentan a nadie. Los veinte minutos de la reja, más decírselo, más pedir en ese momento, son toda la rueda: el ¡Wow! solo produce recomendaciones si lo dices y lo pides.",
    "voice": "El estándar no es “cero quejas”, sino un cliente que dice “¡Wow!”.",
    "titleEn": "Wow! Is the Standard"
  },
  "BE-PR-29": {
    "title": "La experiencia es la mitad del producto",
    "scenario": "Tu trabajo de impermeabilización es el mejor del condado, y tu camión es un cajón de cachivaches con ruedas. La clienta de esta mañana vio a tu cuadrilla dejar huellas de lodo por su pasillo, subirle el volumen a una estación de música country y sacar envolturas de comida del tablero para encontrar la copia del contrato. La instalación debajo va a quedar perfecta. Tu capataz se encoge de hombros: “Nos juzgan por el sistema, no por las fundas de los asientos”.",
    "options": {
      "A": "Tiene razón; pon tu energía en la calidad de la instalación, la garantía habla por sí sola.",
      "B": "Vuelve a fijar el estándar hoy: protección de pisos, camión limpio, música apagada, cubrezapatos; la clienta no puede ver la instalación, juzga lo que SÍ puede ver.",
      "C": "Pide a la oficina que la llame después con una encuesta de calidad para compensar la impresión."
    },
    "why": "Los clientes no pueden juzgar un sistema de drenaje; deducen la calidad de lo que no ven a partir de la calidad de lo que sí ven. Para ella, el lodo en el pasillo ES el producto.",
    "voice": "Cualquiera puede hacer el trabajo, pero no cualquiera brinda una gran experiencia al cliente.",
    "titleEn": "The Experience Is Half the Product"
  },
  "BE-PR-30": {
    "title": "Los problemas son pruebas",
    "scenario": "Lunes, 7:40 a. m.: una clienta del mes pasado te llama directamente; su bomba de sumidero nueva funcionó toda la noche y otra vez hay agua en el piso. Está a punto de llorar: tiene familia de visita el jueves. Tu semana está llena, todas las cuadrillas comprometidas, y el técnico de servicio está enfermo. Técnicamente, su visita de corrección podría entrar el próximo lunes.",
    "options": {
      "A": "Dile que tú mismo estarás ahí antes del mediodía, deja la planificación y devuélvele la llamada a las 11 con tu hora estimada de llegada.",
      "B": "Agéndala en el primer espacio del próximo lunes y no le cobres la visita por la molestia.",
      "C": "Agéndala el jueves por la mañana, antes de que llegue la familia, sin romper el calendario de esta semana."
    },
    "why": "Atiende una queja rápido y bien, y el cliente termina más contento que si nada hubiera salido mal. La rapidez es la disculpa. Una semana de programación eficiente no vale lo que una fuente de recomendaciones ahogada.",
    "voice": "Los problemas son oportunidades: actúa rápido y asume la responsabilidad.",
    "titleEn": "Problems Are Tests"
  },
  "BE-PR-31": {
    "title": "Clientes para toda la vida",
    "scenario": "Producción está a tope, y en el tablero hay un día completo de visitas de mantenimiento anual: clientes anteriores, $190 cada una, agendadas bajo el plan de servicio que les vendiste con la instalación. Tu trabajo nuevo más grande va atrasado, y sacar a ese técnico por un día lo pondría al corriente. El programador dice que los clientes de mantenimiento “nunca notan” unas semanas de retraso.",
    "options": {
      "A": "Retrasa tres semanas las visitas de mantenimiento; las instalaciones nuevas pagan las cuentas.",
      "B": "Haz el día de mantenimiento como está programado; esos clientes anteriores son tus trabajos futuros, recomendaciones y reseñas más baratos.",
      "C": "Busca un punto medio: haz ahora el mantenimiento con una llamada de revisión y visítalos cuando las cosas se calmen."
    },
    "why": "O dejas ir a los clientes después del trabajo o los conservas para siempre, y la visita anual es la forma en que sucede el “para siempre”. Los clientes anteriores son oro: vuelven a comprar, recomiendan y no cuesta nada ganarlos.",
    "voice": "Conserva a los clientes de por vida manteniéndote en su mente de por vida.",
    "titleEn": "Keep Customers for Life"
  },
  "BE-PR-32": {
    "title": "Vender es ayudar",
    "scenario": "Al terminar un trabajo en un espacio bajo la casa, tu instalador te muestra el calentador de agua del cliente: conexiones corroídas, una mancha de óxido, claramente con los días contados. Tu empresa los reemplaza. No ganas comisión por la visita y mencionarlo te hace sentir “vendedor”. Si revienta en ese espacio, todo lo que acabas de encapsular se empapa.",
    "options": {
      "A": "Anótalo en el papeleo de cierre y deja que la oficina decida si llama.",
      "B": "No te salgas de tu carril; los propietarios odian que la cuadrilla les quiera vender algo más.",
      "C": "Muéstrale ahora la corrosión al propietario, explícale cómo se ve una falla y ofrécele que tu empresa le cotice el reemplazo."
    },
    "why": "Si no vendes, se quedan con su problema, y tu trabajo se inunda. Un capataz tiene más credibilidad que cualquier vendedor; no estás ofreciendo nada, estás advirtiendo a alguien de una falla que puedes ver.",
    "voice": "El técnico o el capataz dentro de la casa tiene MÁS credibilidad que el vendedor.",
    "titleEn": "Selling Is Helping"
  },
  "BE-PR-33": {
    "title": "Nunca prejuzgues",
    "scenario": "Durante una reparación de grietas de $4,000 en una casa pequeña de un piso, con aspecto cansado —carros viejos, muebles gastados—, la propietaria le pregunta a tu capataz cuánto “costaría siquiera” un sistema perimetral completo. La respuesta real implica una visita de diseño y probablemente más de $30,000. Más tarde tu capataz te cuenta que cambió de tema: “Imposible que ella pueda pagar eso. No quise avergonzarla”.",
    "options": {
      "A": "Oriéntalo hoy: nunca prejuzgues un bolsillo; ofrécele a todos la visita de diseño y deja que ELLA decida; agéndala en tu llamada de seguimiento.",
      "B": "Respalda su lectura; presionar una conversación de $30,000 a alguien con ingresos fijos raya en el abuso.",
      "C": "Pide a la oficina que le mande por correo un folleto del sistema completo para dejar la puerta abierta."
    },
    "why": "Precalificar es lo que causa el no. Los muebles gastados no dicen nada sobre sus ahorros, el dinero de un seguro o lo que vale para ella un sótano seco. Decidir por la clienta le roba la elección.",
    "voice": "Nunca prejuzgues ni precalifiques una cita.",
    "titleEn": "Never Pre-Judge"
  },
  "BE-PR-34": {
    "title": "Nunca des un precio antes de construir valor",
    "scenario": "A mitad de la instalación, el propietario se te acerca con un café: “Ya que están aquí, más o menos, ¿cuánto costaría hacer también el otro muro?”. Has calculado trabajos así cien veces; la cifra en tu cabeza ronda los $8,500. Es amable, está parado ahí mismo, y decir “no puedo decirle” se siente evasivo y de vendedor.",
    "options": {
      "A": "Dale un rango suave —“probablemente entre ocho y diez”— y dile que ventas lo confirmará.",
      "B": "Dile que ese muro merece medidas reales y un diseño real, y ofrécele traer al especialista en diseño esta semana, quizá hoy mismo.",
      "C": "Esquívalo con un “yo solo los construyo” y deja la tarjeta de un vendedor en la barra."
    },
    "why": "Nunca se dan precios aproximados, nadie, jamás. Tu “entre ocho y diez” se convierte en el techo bajo el cual ventas tiene que vender, sin haber construido ningún valor. La respuesta honesta es un proceso, no una cifra.",
    "voice": "Nunca reveles un precio antes de que una presentación completa construya valor.",
    "titleEn": "Never Price Before Value"
  },
  "BE-PR-35": {
    "title": "Da seguimiento para siempre",
    "scenario": "En el cierre, la clienta dice: “La ventana de egreso y el deshumidificador los haremos el año que viene, cuando tomemos aire”. Son $11,000 de trabajo diseñado, cotizado y aprobado por la clienta; solo que todavía no. Tu hoja de cierre no tiene un campo para eso, el vendedor ya está con prospectos nuevos y, según tu experiencia, “el año que viene” suele esfumarse.",
    "options": {
      "A": "Déjalo en manos de la clienta; ella conoce la cifra y sabe dónde encontrarte.",
      "B": "Díselo al vendedor en la próxima reunión para que vuelva a tenerlo en el radar.",
      "C": "Regístralo como trabajo no vendido con una fecha, confírmale que “nos comunicaremos en otoño” y asegúrate de que entre en la lista de Hunter de la oficina."
    },
    "why": "Toda empresa deja más trabajo sin vender que vendido: ahí está el oro. El seguimiento ocurre gracias a los sistemas, no a la memoria. El “hasta que se haga la venta” empieza por escribirlo antes de irte.",
    "voice": "SEGUIRÉ DANDO SEGUIMIENTO, PARA SIEMPRE, HASTA QUE SE HAGA LA VENTA.",
    "titleEn": "Follow Up Forever"
  },
  "BE-PR-36": {
    "title": "El efectivo es vida",
    "scenario": "Recorrido final hecho, clienta encantada, cuadrilla cargando el camión. El pago final de $7,400 vence al terminar: está en el contrato. La clienta te despide con cariño: “Esta semana te mando un cheque por correo, te lo prometo. Mi chequera está en la oficina”. Tienes otro trabajo que empieza en una hora e insistir se siente incómodo después de una semana tan buena.",
    "options": {
      "A": "Sé amable y quédate: ofrécele tarjeta, la app del banco o llevarla a su oficina; el pago al terminar es el acuerdo, cobra antes de irte.",
      "B": "Confía en su palabra; es una excelente clienta, y la confianza es parte de la relación.",
      "C": "Acepta que lo mande por correo, pero haz que firme un pagaré por el saldo."
    },
    "why": "Cobra antes de irte; si no, no has hecho tu trabajo. El día que te vas, tu influencia y la urgencia de ella se van contigo. Las cuentas por cobrar son donde el efectivo va a morir.",
    "voice": "El efectivo es vida. ¡Si te quedas sin efectivo, te quedas sin negocio!",
    "titleEn": "Cash Is Life"
  },
  "BE-PR-37": {
    "title": "Conoce tus números",
    "scenario": "El dueño te pregunta a ti, el gerente de producción, por qué el margen bruto de las instalaciones cayó cuatro puntos este trimestre. Sinceramente, no puedes decirlo: no llevas costos por trabajo. Las cuadrillas se sienten ocupadas, los trabajos terminan “más o menos” a tiempo y los viajes a la tienda de materiales se hacen cuando sea. Podrías sacar, trabajo por trabajo, las horas de mano de obra y las facturas de materiales de una muestra, pero es tedioso y estás a tope.",
    "options": {
      "A": "Dile al dueño que los márgenes cambian según la temporada y que lo vigilarás el próximo trimestre.",
      "B": "Calcula ahora el costo de una muestra —un trabajo pequeño, uno mediano y uno grande por servicio— y encuentra exactamente dónde se fugan horas y materiales.",
      "C": "Aprieta todo de golpe: congela las horas extra y exige aprobación para cada viaje por materiales."
    },
    "why": "Dirigir producción sin costos por trabajo es pisar el acelerador con los ojos cerrados. Una muestra estratégica muestra qué trabajos pierden dinero y por qué; entonces corriges causas en lugar de adivinarlas.",
    "voice": "Estar ocupado haciendo crecer la empresa sin vigilar los números es como pisar el acelerador y cerrar los ojos.",
    "titleEn": "Know Your Numbers"
  },
  "BE-PR-38": {
    "title": "Paga por lo que quieres que se repita",
    "scenario": "Tus instaladores cobran por hora, y los trabajos misteriosamente llenan todo el tiempo que permite el calendario: un trabajo de dos días toma dos o tres, según nada que puedas identificar. El dueño te ofrece rediseñar el pago de las cuadrillas. Una tarifa por trabajo aceleraría a las cuadrillas, pero te preocupa que sacrifiquen la calidad por apurarse. Las visitas de corrección caerían en los números del próximo trimestre.",
    "options": {
      "A": "Mantén el pago por hora, pero agrega un bono por velocidad por terminar antes.",
      "B": "Paga por trabajo, descontando de la tarifa cualquier visita de corrección o inspección reprobada de ese trabajo, para que la velocidad y la calidad le paguen al mismo hombre.",
      "C": "Paga por trabajo, sin más; confía en que el orgullo de las cuadrillas proteja la calidad."
    },
    "why": "Paga por hora y obtendrás horas. Paga por trabajo y obtendrás velocidad, y también trampas, a menos que la calidad esté integrada en el mismo incentivo. Diseña la medida para que el atajo no pague.",
    "voice": "Paga a los capataces por trabajo, no por hora: la gente que gana buen dinero valora su trabajo y cuida a la empresa.",
    "titleEn": "Pay for What You Want Repeated"
  },
  "BE-PR-39": {
    "title": "Sistemas, no héroes",
    "scenario": "Tony, tu capataz más experimentado, es una leyenda: carga en la cabeza cada secuencia de trabajo, cada contacto de proveedores y cada manía de los inspectores. Nada está por escrito. Acaba de pedir dos semanas libres en julio, y te diste cuenta de que su cuadrilla no puede funcionar un solo día sin él. Además, tiene 58 años, y un competidor lleva meses rondándolo.",
    "options": {
      "A": "Dedica los próximos 60 días a convertir lo que Tony sabe en listas de verificación, guiones de inicio de trabajo y una rutina de disciplina diaria, pagándole extra por crearlo y enseñarlo.",
      "B": "Dale a Tony un aumento y un bono de permanencia; mantén al genio contento y dentro del edificio.",
      "C": "Niega las vacaciones largas en temporada; ese es el precio de ser indispensable."
    },
    "why": "Previsibilidad es igual a escalabilidad. Un héroe dentro del engranaje no es un sistema: es un punto único de falla con fecha de jubilación. Pagarle para que se sistematice a sí mismo lo honra a él Y te protege a ti.",
    "voice": "Previsibilidad = escalabilidad.",
    "titleEn": "Systems, Not Heroes"
  },
  "BE-PR-40": {
    "title": "Cómo hacemos cualquier cosa es cómo lo hacemos todo",
    "scenario": "Final de un jueves largo: un retoque de garantía de $300 en un trabajo pequeñito, para un cliente que nunca deja reseñas. Tu cuadrilla quiere saltarse las lonas para el piso, las fotos y el recorrido de cierre “solo por esta vez; es un trabajo de sellador de veinte minutos, jefe”. La rutina completa agrega quizá veinticinco minutos. Nadie de la oficina lo va a revisar nunca.",
    "options": {
      "A": "Sáltate lo extra; tener criterio es ajustar el esfuerzo a lo que está en juego, y lo que está en juego son $300.",
      "B": "Pon las lonas y haz el recorrido, pero sáltate las fotos; un punto medio razonable.",
      "C": "Aplica el estándar completo: lonas, fotos, recorrido y pedido de recomendaciones. No hay trabajo tan pequeño como para hacerlo a nuestra manera a medias."
    },
    "why": "Cómo hacemos cualquier cosa es cómo lo hacemos todo. Las cuadrillas que aprenden que los estándares tienen excepciones encontrarán excepciones en todas partes. El trabajo de $300 es donde se ensaya tu verdadera cultura para el de $50,000.",
    "voice": "TODO CUENTA.",
    "titleEn": "How We Do Anything Is How We Do Everything"
  },
  "BE-ACC-01": {
    "title": "La sombra alargada",
    "scenario": "Eres la gerente de oficina. El dueño dice que los estados financieros “nunca se sienten confiables”. Revisas: asientos mal codificados, una cuenta de Varios inflada, conciliaciones con semanas de atraso. Nadie más toca QuickBooks; estos libros son tuyos. El dueño pregunta qué está pasando.",
    "options": {
      "A": "Explica que QuickBooks es el problema y pide un software nuevo.",
      "B": "Hazte cargo: los libros reflejan tus hábitos. Fija reglas de codificación, vacía la cuenta de Varios, concilia cada semana y sube tu estándar personal.",
      "C": "Corrige en silencio los asientos de este mes y espera que la pregunta se olvide."
    },
    "why": "Los libros son la sombra alargada de quien los lleva. No van a mejorar hasta que tú mejores. Culpar a las herramientas o parchar un mes deja intacto el origen: tus estándares.",
    "voice": "El negocio es la sombra alargada del líder: no va a mejorar hasta que él mejore.",
    "titleEn": "The Elongated Shadow"
  },
  "BE-ACC-02": {
    "title": "Mereces tus resultados",
    "scenario": "Las cuentas por cobrar pasaron poco a poco de 20 días a 60. Te has estado diciendo que la culpa es de los términos de pago poco claros de los vendedores y de los clientes que pagan tarde. El dueño saca el informe de antigüedad de saldos y te pregunta a ti, la contadora, qué pasó.",
    "options": {
      "A": "Di “Este número es mío” y luego crea una rutina de cobranza: facturar el mismo día, llamar a los 25 días y darle seguimiento cada semana.",
      "B": "Mándale al dueño un memo que documente cómo lo causó ventas.",
      "C": "Explica que la economía está lenta en este momento; debería corregirse sola."
    },
    "why": "La responsabilidad total es la línea de salida. Pregúntate: “¿Cómo causé yo esto?”. El informe de antigüedad de saldos es tu marcador; una vez que lo asumes como tuyo, puedes cambiarlo.",
    "voice": "Sea lo que sea tu organización hoy, pregúntate: “¿Cómo causé yo esto?”.",
    "titleEn": "You Deserve Your Results"
  },
  "BE-ACC-03": {
    "title": "El dolor es combustible",
    "scenario": "Al conciliar el banco, descubres que pagaste dos veces una factura de un proveedor: $4,200, hace tres meses. El dueño ya vio el estado de cuenta y sabe que fue un descuido tuyo. Te sientes fatal.",
    "options": {
      "A": "Discúlpate mucho y evita tomar decisiones de cuentas por pagar por un tiempo.",
      "B": "Recupera el dinero en silencio y no vuelvas a mencionarlo.",
      "C": "Recupera los $4,200 y luego integra en tu cierre una verificación de pagos duplicados para que este error no se repita nunca."
    },
    "why": "Los tropiezos son veneno o combustible; tú decides. Fallar, aprender rápido y no repetir nunca el año convierte un error de $4,200 en una mejora permanente del sistema.",
    "voice": "Los errores son el mundo dándote retroalimentación; no es nada personal. Nunca repitas el año en la escuela de la vida.",
    "titleEn": "Pain Is Fuel"
  },
  "BE-ACC-04": {
    "title": "Sé una máquina de aprender",
    "scenario": "El dueño ofrece pagarte clases financieras de SOE: Tu Spread, Muestreo de Costos por Trabajo, Cálculo de la Carga Laboral. Llevas nueve años haciendo los libros de la misma manera y el cierre de mes siempre va apretado. Sientes que no hay tiempo.",
    "options": {
      "A": "Recházalo con cortesía; la semana de cierre no deja espacio para clases.",
      "B": "Dale una hojeada a los resúmenes de las clases a la hora de la comida y date por cumplida.",
      "C": "Toma las clases y aplica una lección nueva en cada cierre mensual hasta que se vuelva hábito."
    },
    "why": "Nueve veces el mismo año no son nueve años de experiencia. El conocimiento más la experiencia más la reflexión se acumulan; una máquina de aprender vale más con cada cierre.",
    "voice": "Sabiduría = conocimiento + experiencia + reflexión.",
    "titleEn": "Be a Learning Machine"
  },
  "BE-ACC-05": {
    "title": "Brillante en lo básico",
    "scenario": "Es día 12. Los estados financieros se le entregan al dueño el día 15, todos los meses, sin excepción. No han llegado dos facturas de proveedores, quizá $3,000 en costos de trabajos. Podrías detener el cierre y entregar números “perfectos” alrededor del 25.",
    "options": {
      "A": "Registra tu mejor estimación de las facturas faltantes, cierra a tiempo y ajústalo el mes que viene.",
      "B": "Espera las facturas reales; la precisión importa más que una fecha límite.",
      "C": "Sáltate este mes y júntalo en un estado trimestral limpio."
    },
    "why": "Estados financieros para el día 15, todos los meses, sin excepción: eso es lo básico. Una estimación pequeña y honesta mantiene el ritmo; un estado “perfecto” y tardío rompe la disciplina que hace útiles los números.",
    "voice": "Hacer cosas simples con constancia hace toda la diferencia: fáciles de hacer, fáciles de no hacer.",
    "titleEn": "Brilliant on the Basics"
  },
  "BE-ACC-06": {
    "title": "Primero define la realidad",
    "scenario": "QuickBooks en base de efectivo muestra una utilidad de $38,000, pero la cuenta de cheques está casi vacía: entraron depósitos de clientes, el trabajo no está hecho y hay facturas grandes sin pagar. El dueño está feliz con “el mejor mes de la historia” y quiere celebrar.",
    "options": {
      "A": "Deja el informe como está; él está contento, y la vista técnicamente es solo una configuración.",
      "B": "Pásalo a base devengada: los depósitos son un pasivo, y el ingreso es trabajo terminado y facturado. Muéstrale el mes real.",
      "C": "Dile que es solo un tema de tiempos que se compensará para fin de año."
    },
    "why": "El primer trabajo de un líder es definir la realidad. La base de efectivo halaga; la base devengada dice la verdad. Los depósitos son trabajo que DEBES, no dinero que ganaste.",
    "voice": "Noticias falsas. Si quieres mostrar una utilidad más grande con contabilidad en base de efectivo, simplemente no pagues tus facturas.",
    "titleEn": "Define Reality First"
  },
  "BE-ACC-07": {
    "title": "Todo se crea dos veces",
    "scenario": "El dueño entra: “Encontré una gran oferta en un camión de servicio: $48,000. Haz el cheque hoy antes de que se lo lleven”. No hay ningún camión en el presupuesto de este año, y no has modelado lo que el pago le hace al efectivo.",
    "options": {
      "A": "Haz el cheque; es su empresa y su decisión.",
      "B": "Sugiere un arrendamiento para que el golpe se sienta menor.",
      "C": "Pide 24 horas: mete el camión en el modelo de efectivo y en el presupuesto, muestra el efecto en el Spread y luego decidan."
    },
    "why": "Todo se crea dos veces: primero en papel y después en la realidad. Una compra modelada primero es una decisión; una compra apresurada es una apuesta con el dinero de la nómina.",
    "voice": "Usa tus modelos —la Business Machine, la Dream Machine, la Calculadora de Efectivo— para ver hacia dónde va la empresa.",
    "titleEn": "Created Twice"
  },
  "BE-ACC-08": {
    "title": "El poder del porqué",
    "scenario": "Cerraste a tiempo. Pero el margen bruto cayó seis puntos este mes y no sabes por qué. La reunión de revisión con el dueño es mañana por la mañana. Podrías presentar los estados tal como están; técnicamente, el cierre está hecho.",
    "options": {
      "A": "Investiga esta noche: calcula los costos por trabajo del mes, aísla qué trabajos y qué partidas de costo se movieron, y lleva la causa.",
      "B": "Presenta los estados y anota que “el margen bajó, probablemente por el precio de los materiales”.",
      "C": "Reclasifica algunos costos directos como gastos generales para que el margen se vea normal."
    },
    "why": "Cerrar los libros no es el trabajo; explicarlos sí. Los números son efectos; tu valor está en nombrar la causa detrás de cada número, no solo en confirmar que cuadró.",
    "voice": "Los números son los efectos de otras cosas que pasan en la empresa: encuentra las actividades que los hacen cambiar.",
    "titleEn": "Why Power"
  },
  "BE-ACC-09": {
    "title": "El negocio sirve a su dueño",
    "scenario": "Tu dueño hace retiros al azar cada vez que la cuenta se ve gorda, y no tiene sueldo. El estado de resultados muestra una orgullosa “utilidad”, pero a nadie se le ha pagado por dirigir la empresa. Te pregunta por qué quieres “complicar las cosas” con un sueldo para el dueño.",
    "options": {
      "A": "Déjalo así; los retiros mantienen todo simple y flexible.",
      "B": "Fija un sueldo de gerente justo por el trabajo que él realmente hace, para que la línea de utilidad sea utilidad real DESPUÉS de su pago.",
      "C": "Sugiérele que no se pague en los meses lentos para que los estados siempre se vean rentables."
    },
    "why": "El negocio sirve a su dueño: le paga como les paga a todos los demás. La utilidad es lo que queda DESPUÉS de un sueldo de mercado. Cualquier otra cosa es un número bonito que esconde un trabajo no pagado.",
    "voice": "Págate un sueldo de gerente por el trabajo que haces: la utilidad es lo que queda DESPUÉS de que te pagan como a todos los demás.",
    "titleEn": "The Business Serves Its Owner"
  },
  "BE-ACC-10": {
    "title": "Haz lo correcto aunque te cueste",
    "scenario": "Mes brutal: un trabajo de garantía se comió el margen y una cuenta por cobrar grande se complicó. El estado financiero se entrega el día 15 —el viernes—, el mismo día en que el dueño sale a sus primeras vacaciones en dos años. Retenerlo una semana sería fácil y amable.",
    "options": {
      "A": "Retén el estado hasta que regrese, descansado y listo.",
      "B": "Suavízalo: pasa algunos costos al mes siguiente para que la tendencia se vea más leve.",
      "C": "Entrégalo preciso y a tiempo, con un “porqué” claro y por escrito para cada número feo, y tu plan."
    },
    "why": "Preciso y a tiempo, sobre todo cuando duele: ese es todo el trabajo. Él ya siente la verdad; un estado honesto con causas y un plan lo respeta y protege la confianza.",
    "voice": "Sé honesto sobre dónde está la empresa: ya lo saben, y la honestidad te da credibilidad para todo lo demás.",
    "titleEn": "Do Right When It Costs You"
  },
  "BE-ACC-11": {
    "title": "Contratar te hace o te deshace",
    "scenario": "Tu auxiliar de cuentas por pagar renunció y las facturas se están acumulando. Una candidata puede empezar el lunes —entrevista decente—, pero no has revisado sus referencias ni hecho una verificación de antecedentes, y ella tocaría cada pago a proveedores. El dueño dice: “Tú decides”.",
    "options": {
      "A": "Frena una semana: verificación de antecedentes, llamadas a referencias y una prueba de habilidades antes de que alguien toque las cuentas por pagar.",
      "B": "Contrátala el lunes; el rezago es el riesgo mayor en este momento.",
      "C": "No contrates a nadie; absorbe para siempre las cuentas por pagar en tu propio trabajo."
    },
    "why": "Una contratación que maneja dinero te hace o te deshace. Una semana de verificación es barata; una mala contratación en cuentas por pagar puede costar años. Contrata despacio, sobre todo cerca de la chequera.",
    "voice": "Conoce a tu gente antes y después de contratarla: quienes ya delinquieron tienen muchas más probabilidades de volver a hacerlo.",
    "titleEn": "Hiring Makes You or Breaks You"
  },
  "BE-ACC-12": {
    "title": "Carácter antes que habilidad",
    "scenario": "Dos finalistas para contadora. Una es una experta en QuickBooks con cinco años de experiencia en costos por trabajo, pero una referencia insinúa que “tomó prestado” de la caja chica en su último empleo. La otra es honesta, organizada y dispuesta a aprender, pero tendrías que capacitarla.",
    "options": {
      "A": "Contrata a la experta, pero vigílala de cerca con supervisión extra.",
      "B": "Contrata a la honesta y dispuesta a aprender, e invierte en capacitar sus habilidades.",
      "C": "Contrata a la experta y guarda para ti el comentario de la referencia; son solo rumores."
    },
    "why": "La habilidad se puede enseñar; el carácter no. Una contadora hábil con un rumor de robo en su pasado es un riesgo cargado sentado junto a tu cuenta bancaria. La vigilancia no sustituye la integridad.",
    "voice": "La confianza se reduce a carácter y competencia.",
    "titleEn": "Character Over Skill"
  },
  "BE-ACC-13": {
    "title": "¡Claro que sí!, o no",
    "scenario": "A mitad del cierre, llama un proveedor de software ofreciendo un complemento de análisis: tableros, categorización con IA, una prueba gratis. Es medianamente interesante. Decir que sí implica demostraciones, migración de datos, correos y tiempo de capacitación, todo durante tus dos semanas más ocupadas.",
    "options": {
      "A": "Acepta la prueba; podría ayudar y empezar es gratis.",
      "B": "Agenda tres llamadas de demostración por cortesía y para “mantenerte informada”.",
      "C": "Di que no —breve, cortés, definitivo— y protege el cierre. Retómalo solo si se vuelve un claro “¡claro que sí!”."
    },
    "why": "Cada sí le roba tiempo a aquello a lo que ya dijiste que sí. Un “quizá” tibio en la semana de cierre le cuesta a la empresa su fecha límite más importante. Un interés leve es un no.",
    "voice": "Mejor unos segundos de arrepentimiento por decir que no que meses de arrepentimiento por decir que sí.",
    "titleEn": "Hell Yeah, or No"
  },
  "BE-ACC-14": {
    "title": "La persona correcta en el puesto correcto",
    "scenario": "Tu auxiliar de cuentas por cobrar es cálida y excelente al teléfono, pero odia los detalles; sus conciliaciones siempre se atrasan. Tu otra empleada de oficina es una Pensadora callada a la que le encantan las hojas de cálculo y le aterran las llamadas de cobranza. Las dos están batallando en sus puestos actuales.",
    "options": {
      "A": "Intercambia el trabajo: la persona sociable se encarga de las llamadas de cobranza y la Pensadora de las conciliaciones.",
      "B": "Manda a las dos a una clase de capacitación sobre sus puntos débiles.",
      "C": "Levántale una amonestación a la auxiliar de cuentas por cobrar por las conciliaciones atrasadas."
    },
    "why": "No entrenes contra la naturaleza de alguien cuando puedes reubicarlo a su favor. Pon a la gente donde sus fortalezas se valoran y sus debilidades no importan: dos empleadas que batallan se convierten en dos empleadas fuertes de la noche a la mañana.",
    "voice": "Pon a la gente donde sus fortalezas se valoran y sus debilidades no importan.",
    "titleEn": "Right Person, Right Seat"
  },
  "BE-ACC-15": {
    "title": "Capacita o retira",
    "scenario": "Los capataces entregan hojas de trabajo sin horas y sin conteo de materiales, así que tus informes de costos por trabajo son basura. Has enviado dos correos de recordatorio. Nadie les ha enseñado nunca a los capataces qué es el costeo por trabajo ni por qué importa.",
    "options": {
      "A": "Deja de costear por trabajo; los datos están demasiado desordenados para que valga la pena.",
      "B": "Haz una capacitación corta: muéstrales cómo una hoja de trabajo se convierte en un costo por trabajo, practíquenlo y luego exige el estándar.",
      "C": "Pide a la oficina que estime las horas faltantes y sigue adelante."
    },
    "why": "La gente sin capacitar es buena gente mal dirigida. Los correos no son capacitación. Enseña el porqué y el cómo, haz que lo practiquen y luego exígelo, o vas a adivinar los márgenes para siempre.",
    "voice": "¿Y si no los capacito y se quedan?",
    "titleEn": "Train or Remove"
  },
  "BE-ACC-16": {
    "title": "Tú no eres la puerta",
    "scenario": "Eres el contralor. Tus estados financieros son impecables y siempre llegan a tiempo. El Spread lleva dos meses seguidos bajando y la antigüedad de saldos va subiendo, pero nadie ha dicho nada, y supones que el dueño lee los informes. La reunión mensual es hoy.",
    "options": {
      "A": "Quédate callado; tu trabajo es producir informes precisos, y lo hiciste.",
      "B": "Mándale después al dueño la hoja de cálculo por correo con la tendencia resaltada.",
      "C": "Plantéalo en la reunión, en voz alta: “El Spread lleva dos meses bajando; esta es la razón y esto es lo que recomiendo”."
    },
    "why": "Eres el coordinador defensivo, no un ensamblador callado de números. La defensa canta las jugadas en voz alta. Una advertencia que no se dice no protege a nadie; el trabajo del perro guardián es ladrar temprano.",
    "voice": "Mira el parabrisas, no solo el espejo retrovisor.",
    "titleEn": "You Are Not the Door"
  },
  "BE-ACC-17": {
    "title": "Delega, no abdiques",
    "scenario": "El dueño, saturado con las ventas, te dice: “Encárgate de todo: cheques, firmas, estados de cuenta, todo. No me molestes más con temas de dinero”. Es halagador. Tendrías control total del efectivo de la empresa sin ninguna supervisión.",
    "options": {
      "A": "Ponle un límite: tú manejas las finanzas del día a día, pero él sigue firmando los cheques y recibe los estados de cuenta en su casa, sin que nadie los abra antes.",
      "B": "Acéptalo todo; así se ve la verdadera confianza.",
      "C": "Acéptalo todo, pero prométele un resumen trimestral."
    },
    "why": "Los dueños asignan las finanzas, pero nunca las entregan. El control total sin supervisión pone en peligro a la empresa y a TI: cuando algo desaparece, la contadora sin supervisión es la sospechosa número uno.",
    "voice": "Puedes contratar a alguien que lleve tu contabilidad, pero no puedes contratar a alguien que entienda los números y tome las decisiones por ti.",
    "titleEn": "Delegate, Don't Abdicate"
  },
  "BE-ACC-18": {
    "title": "Expectativas antes que rendición de cuentas",
    "scenario": "El nuevo capataz se ha ido de tres trabajos sin cobrar el pago final, y tú estás persiguiendo a los clientes por teléfono por miles de dólares. Estás furiosa, hasta que te das cuenta de que nadie le dijo nunca los términos de pago ni que cobrar antes de irse es su trabajo.",
    "options": {
      "A": "Repórtalo al dueño por ser descuidado con el dinero de la empresa.",
      "B": "Sigue persiguiendo los pagos tú misma; es más rápido que una confrontación.",
      "C": "Fija primero la expectativa: términos de pago por escrito, “cobra antes de irte” en la lista de verificación del trabajo, y luego exígele que lo cumpla."
    },
    "why": "No puedes exigirle cuentas a la gente por expectativas que nunca recibió. Define el estándar con claridad, dale las herramientas, y entonces exigir cuentas es justo, y el problema de las cuentas por cobrar muere en su origen.",
    "voice": "Cuando falta liderazgo, la gente copia a otros empleados o inventa estrategias para sobrevivir.",
    "titleEn": "Expectations Before Accountability"
  },
  "BE-ACC-19": {
    "title": "Hazme sentir importante",
    "scenario": "Tu callada auxiliar de cuentas por cobrar acaba de bajar la antigüedad de saldos a menos de 30 días por primera vez en la historia de la empresa, y detectó una factura duplicada de $1,100 antes de que saliera. Ella nunca pide atención. Estás ocupada, y elogiar se siente incómodo.",
    "options": {
      "A": "Guárdalo para su evaluación anual, donde “cuenta”.",
      "B": "Elógiala ahora, por su nombre, delante del equipo: números específicos, palabras sinceras.",
      "C": "No digas nada; la cobranza y la precisión son literalmente su trabajo."
    },
    "why": "La gente hace más por reconocimiento que por dinero, sobre todo los que cumplen callados día tras día. Elogia en público el logro en cobranza y la fuga que detectó, y verás ambas cosas repetirse.",
    "voice": "Acuérdate de los que cumplen callados día tras día, no solo de las estrellas.",
    "titleEn": "Make Me Feel Important"
  },
  "BE-ACC-20": {
    "title": "El amor es la mayor herramienta de liderazgo",
    "scenario": "Tu auxiliar de nómina —cinco años, firme como una roca— ha cometido tres errores en dos semanas, incluido un depósito directo equivocado. Luego te enteras de que su mamá acaba de entrar en cuidados paliativos. La nómina se procesa el viernes, y la precisión de verdad importa.",
    "options": {
      "A": "Siéntate con ella, pregúntale por su mamá, quítale trabajo de encima y agrega un paso de doble revisión para que la nómina siga segura.",
      "B": "Dale una advertencia por escrito; los errores de nómina son graves sin importar las circunstancias.",
      "C": "Rehaz su trabajo tú misma en silencio y no le digas nada."
    },
    "why": "Cuida a la persona Y protege la nómina; no están en conflicto. Ayúdala con su vida, no solo con su trabajo, y te ganarás una lealtad que ningún sueldo puede comprar.",
    "voice": "Ayuda a alguien con su trabajo y le caerás bien. Ayúdalo con su vida y te querrá.",
    "titleEn": "Love Is the Greatest Leadership Tool"
  },
  "BE-ACC-21": {
    "title": "Regala el mérito, asume la culpa",
    "scenario": "Se venció el plazo para presentar un gravamen en un trabajo impagado de $19,000: fue un descuido de tu oficina, aunque el calendario lo tenía tu auxiliar de cuentas por pagar. Por otro lado, el nuevo proceso de depósitos de tu equipo acaba de reducir a la mitad los errores de registro. El dueño pregunta por ambas cosas en la reunión de personal.",
    "options": {
      "A": "Asume tú el descuido del gravamen —“mi sistema falló”— y dale el mérito por su nombre al equipo de la auxiliar por el logro de los depósitos.",
      "B": "Sé precisa: nombra a la auxiliar en el descuido y llévate el mérito por el proceso que tú diseñaste.",
      "C": "Menciona solo el logro de los depósitos y resuelve lo del gravamen en silencio después."
    },
    "why": "Los líderes que absorben la culpa y regalan el mérito tienen gente que resuelve problemas en lugar de esconderlos. Ser “precisa” sobre la culpa no compra nada; asumir la responsabilidad compra un equipo que protege los plazos.",
    "voice": "REGALA EL MÉRITO. ASUME LA CULPA.",
    "titleEn": "Give Away the Credit, Take the Blame"
  },
  "BE-ACC-22": {
    "title": "Nunca actúes con una sola versión de la historia",
    "scenario": "La revisión de costos por trabajo muestra el trabajo de los Hendricks con 64 horas de mano de obra contra 40 estimadas. El vendedor entra furioso: “Tu capataz infló sus horas; descuéntaselas”. Los números sí se ven mal. El capataz está en una obra a una hora de distancia.",
    "options": {
      "A": "Los datos son los datos; marca en el expediente la hoja de horas del capataz como sospechosa.",
      "B": "Llama primero al capataz: repasen el trabajo hora por hora antes de que cualquier conclusión le llegue a nadie.",
      "C": "Reparte la diferencia en el informe de costos para que nadie se pelee."
    },
    "why": "Nunca actúes con base en un informe de una sola parte. Quizá infló las horas; quizá el presupuesto no consideró un espacio bajo la casa, o la lluvia mató un día. La variación es una pregunta, no un veredicto: investiga y luego actúa.",
    "voice": "Nunca actúes con base en informes de una sola parte.",
    "titleEn": "Never Act on One Side of a Story"
  },
  "BE-ACC-23": {
    "title": "Atiéndelo mientras es pequeño",
    "scenario": "La señora Álvarez debe $6,800, que ya tienen 32 días. Es una clienta frecuente encantadora, estás a tope con la semana de cierre y el dueño nunca mira nada con menos de 60 días. Una llamada amable hoy, o dejarlo correr hasta el informe de antigüedad del mes que viene.",
    "options": {
      "A": "Espera a los 60 días y luego envía la carta estándar de saldo vencido.",
      "B": "Déjalo correr; los clientes frecuentes siempre terminan pagando.",
      "C": "Llama hoy, con calidez y brevedad: confirma que recibió la factura, acuerda una fecha de pago y anótalo en el expediente."
    },
    "why": "Una cuenta por cobrar a 30 días es una llamada; a 120 es una pelea, un gravamen o una pérdida. Las señales de alerta son más baratas el día en que aparecen. Pequeño ahora, o grande después.",
    "voice": "Investiga de inmediato las cuentas por cobrar vencidas.",
    "titleEn": "Handle It While It's Small"
  },
  "BE-ACC-24": {
    "title": "La cultura es lo que pasa cuando el jefe se va",
    "scenario": "El dueño está fuera tres semanas. El gasto en tarjetas de gasolina sube un 30%, dos cuadrillas empezaron a entregar tarde los recibos de las tarjetas y un técnico te pidió que “nada más le pases las horas” sin una hoja de horas firmada. Todos saben que nadie está mirando.",
    "options": {
      "A": "Documenta todo en silencio y entrégale un informe al dueño cuando regrese.",
      "B": "Mantén el estándar exactamente como si él estuviera aquí: recibos obligatorios, hojas de horas firmadas obligatorias, y explícale al equipo por qué.",
      "C": "Deja pasar las cosas pequeñas tres semanas; la moral importa y él regresará pronto."
    },
    "why": "La cultura es lo que pasa cuando el jefe se va, y el fraude crece donde nadie mira. Tres semanas de relajo le enseñan a toda la empresa que los controles son puro teatro. El estándar es el estándar.",
    "voice": "Toda historia de fraude empieza con “Yo confiaba en ellos”.",
    "titleEn": "Culture Is When the Boss Leaves"
  },
  "BE-ACC-25": {
    "title": "Hablar sin miedo",
    "scenario": "Tu muestreo de costos por trabajo indica que los trabajos del instalador más experimentado —el favorito del dueño— se pasan siempre un 15% en materiales. El año pasado alguien planteó un problema de costos sobre él y lo hicieron a un lado durante meses. Tú publicas las tendencias mensuales.",
    "options": {
      "A": "Publica la tendencia, pero deja sus trabajos fuera de la muestra este trimestre.",
      "B": "Publica los números reales de todos, presentados como “lo que nos dicen los trabajos”: hechos, sin culpas, las mismas reglas para todos.",
      "C": "Díselo al dueño en privado y deja que él decida si se publica."
    },
    "why": "El trabajo de finanzas es la verdad presentada de forma que la gente pueda escucharla. Los números seleccionados a conveniencia le enseñan a todos que los informes son políticos. Publica las tendencias reales sin castigar a los mensajeros, incluso cuando el mensajero son los datos.",
    "voice": "Usa las mejores ideas, vengan de donde vengan; nunca avergüences a nadie por hablar.",
    "titleEn": "Safe to Speak"
  },
  "BE-ACC-26": {
    "title": "Un solo departamento: servicio al cliente",
    "scenario": "Un capataz llama desde la entrada de una casa: el cliente disputa una orden de cambio de $900 y no quiere firmar la factura final. Tus libros dicen $900, limpio y documentado. El capataz necesita una respuesta ya; el cliente está parado ahí mismo.",
    "options": {
      "A": "Dile que la facturación no se decide en la entrada de una casa; el cliente puede llamar a la oficina el lunes.",
      "B": "Mantente firme en los $900 y que el capataz deje la factura sin firmar.",
      "C": "Toma la llamada ahora, escucha al cliente, saca el papeleo de la orden de cambio en ese momento y resuélvelo antes de que el capataz se vaya."
    },
    "why": "Hay un solo departamento: servicio al cliente. Una disputa de facturación ES la experiencia del cliente, y contabilidad le sirve al campo. Resuélvelo mientras las herramientas están fuera; después de que te vas, es un problema grande.",
    "voice": "Anima a los clientes a expresar sus inquietudes mientras las herramientas están fuera: los problemas que se detectan entonces se arreglan fácil.",
    "titleEn": "One Department: Customer Service"
  },
  "BE-ACC-27": {
    "title": "Sirve a la persona, no a la casa",
    "scenario": "Una viuda mayor llama confundida por su factura: creía que el depósito cubría más, y suena avergonzada y asustada. Tienes seis llamadas en espera y el papeleo respalda claramente el saldo pendiente. Tú tienes la razón; ella está abrumada.",
    "options": {
      "A": "Baja el ritmo, llámala por su nombre, revisa la factura con ella línea por línea hasta que la entienda y ofrécete a mandarle por correo un resumen sencillo.",
      "B": "Mándale por correo el contrato firmado y el recibo del depósito; los documentos hablan por sí solos.",
      "C": "Ofrécele un descuento para que la llamada termine rápido."
    },
    "why": "Una llamada de facturación es un momento humano, no un trámite de papeleo. Ella no necesita perder contra unos documentos ni que la compren con un descuento: necesita diez minutos de paciencia. Sirve a la persona, y el saldo llega solo.",
    "voice": "La gente olvidará lo que hiciste, pero nunca olvidará cómo la hiciste sentir.",
    "titleEn": "Serve the Human, Not the House"
  },
  "BE-ACC-28": {
    "title": "¡Wow! es el estándar",
    "scenario": "Tus facturas son precisas pero feas: códigos apretados, sin descripción del trabajo, las instrucciones de pago enterradas. Cada semana llaman clientes confundidos. Rediseñar la plantilla de QuickBooks —partidas en lenguaje sencillo, foto del trabajo terminado, fecha de vencimiento clara, nota de agradecimiento— te tomaría una tarde.",
    "options": {
      "A": "Mantén la plantilla estándar; una factura existe para ser precisa.",
      "B": "Dedica la tarde: crea una factura tan clara y profesional que un cliente podría llegar a decir “¡Wow!”.",
      "C": "Agrega a la plantilla actual una línea de “llámenos si tiene preguntas”."
    },
    "why": "El ¡Wow! es el estándar para todo lo que toca al cliente, incluidas las facturas. Una factura clara, precisa y puntual genera confianza, reduce las llamadas de gente confundida y se cobra más rápido. Todo cuenta.",
    "voice": "TODO CUENTA.",
    "titleEn": "Wow! Is the Standard"
  },
  "BE-ACC-29": {
    "title": "La experiencia es la mitad del producto",
    "scenario": "Producción dice que el trabajo de los Keller está terminado. La práctica de siempre: la factura sale por correo en una semana más o menos, y si no se paga, le sigue una carta modelo. Te das cuenta de que la factura y cualquier llamada de cobranza son los dos últimos recuerdos que el cliente tendrá de la empresa.",
    "options": {
      "A": "Mantén la rutina; la facturación es trabajo de oficina, no experiencia del cliente.",
      "B": "Envía la factura por correo electrónico de inmediato, sin ningún otro cambio; lo que cuenta es la rapidez.",
      "C": "Trata ambas como Momentos de la Verdad: factura el mismo día agradeciéndoles por su nombre, y cualquier llamada de seguimiento con un guion cálido y servicial."
    },
    "why": "La experiencia es la mitad del producto, y la facturación es el final. El último contacto es lo que recuerdan y lo que les cuentan a los vecinos. Diseña la factura y la llamada como diseñarías la obra.",
    "voice": "El estándar no es “cero quejas”, sino un cliente que dice “¡Wow!”.",
    "titleEn": "The Experience Is Half the Product"
  },
  "BE-ACC-30": {
    "title": "Los problemas son pruebas",
    "scenario": "Lunes por la mañana: un mensaje de voz furioso. A una clienta le cobraron dos veces $2,400 porque se procesaron tanto su pago de financiamiento COMO su cheque. Amenaza con una disputa bancaria y una reseña de una estrella. Es día de registros y tu escritorio está enterrado.",
    "options": {
      "A": "Llámala en menos de una hora, discúlpate, reembólsale hoy y confírmaselo por escrito cuando se refleje; luego corrige la causa.",
      "B": "Verifica todo con cuidado primero y respóndele en dos o tres días con una respuesta completa.",
      "C": "Deja que el proceso de disputa del banco lo resuelva; para eso existe."
    },
    "why": "Un problema de facturación manejado con rapidez y elegancia puede ganarte a un cliente más profundamente que si nunca hubiera habido problema. Estas pruebas se califican por el tiempo de respuesta. Primero el reembolso, después la causa de fondo.",
    "voice": "Las quejas después de que te vas son un problema grande.",
    "titleEn": "Problems Are Tests"
  },
  "BE-ACC-31": {
    "title": "Clientes para toda la vida",
    "scenario": "Los Romero —$40,000 en trabajos durante ocho años, tres recomendaciones— tienen 75 días de atraso en una factura de servicio de $2,200, por primera vez en su historia. El proceso estándar dice: carta de requerimiento final y luego agencia de cobranza. La carta ya está en la cola de impresión.",
    "options": {
      "A": "Envía la carta de requerimiento; un proceso justo significa la misma carta para todos.",
      "B": "Llama tú primero en persona: “Esto no es propio de ustedes, ¿está todo bien?”. Luego acuerden una fecha o un plan.",
      "C": "Da por perdidos los $2,200 como el costo de mantener una gran relación."
    },
    "why": "Una cobranza elegante protege el valor de por vida del cliente. Un cliente de ocho años se gana una llamada humana antes que una carta modelo. Por lo general descubrirás una enfermedad o una factura perdida, y conservarás los próximos $40,000.",
    "voice": "Este cliente eligió tu empresa; sin ellos, todos nos quedamos sin trabajo.",
    "titleEn": "Keep Customers for Life"
  },
  "BE-ACC-32": {
    "title": "Vender es ayudar",
    "scenario": "Un vendedor cerró un trabajo de cimientos de $14,000 sujeto a financiamiento, y la solicitud del cliente está a medias en el portal: campos de ingresos confusos y un archivo que no se pudo subir. El cliente de verdad necesita esta reparación. Administrar el financiamiento “no es realmente” tu trabajo.",
    "options": {
      "A": "Mándale al cliente por correo el número de la línea de ayuda del prestamista.",
      "B": "Dile al vendedor que el papeleo del financiamiento le corresponde a ventas.",
      "C": "Llama al cliente, llenen juntos la solicitud pantalla por pantalla y acompáñala hasta su aprobación hoy mismo."
    },
    "why": "Vender es ayudar, y administrar el financiamiento es la forma en que la oficina ayuda a una familia a pagar un trabajo que necesita. La venta no está hecha hasta que el dinero funciona, y tú eres quien habla el idioma del prestamista.",
    "voice": "El cliente quiere que se haga el trabajo; tu trabajo es ayudarlo a decidir.",
    "titleEn": "Selling Is Helping"
  },
  "BE-ACC-33": {
    "title": "Nunca prejuzgues",
    "scenario": "Dos juicios rápidos en una sola mañana: un cliente nuevo de un código postal difícil quiere un plan de pagos (“nunca va a pagar”, dice tu instinto), y el trabajo de los Murphy se pasó 20 horas (“el capataz está inflando”, dice el vendedor). No has verificado ninguno de los dos.",
    "options": {
      "A": "Aplica al cliente el mismo proceso de crédito que a cualquiera, y revisa el trabajo de los Murphy con el capataz antes de concluir nada.",
      "B": "Exígele al cliente un depósito más grande y audita en silencio las últimas cinco hojas de horas del capataz.",
      "C": "Confía en tu instinto en ambos casos; reconocer patrones es experiencia."
    },
    "why": "Nunca prejuzgues: ni el bolsillo del cliente ni la honestidad del capataz. Los juicios sin evidencia te cuestan buenos clientes y buena gente. El mismo proceso y la misma justicia, siempre.",
    "voice": "Nunca prejuzgues ni precalifiques.",
    "titleEn": "Never Pre-Judge"
  },
  "BE-ACC-34": {
    "title": "Nunca des un precio antes de construir valor",
    "scenario": "Un administrador de propiedades te ofrece diez trabajos de espacios bajo la casa a cambio de un descuento del 15%, y el dueño quiere tu visto bueno hoy. Tu último cálculo de carga laboral tiene dos años, y sospechas que el margen neto es más delgado de lo que el dueño cree. Ese 15% podría ser toda la utilidad.",
    "options": {
      "A": "Dale el visto bueno; diez trabajos de volumen tapan muchos pecados.",
      "B": "Calcula primero los costos reales —carga laboral completa, margen real— y aprueba un descuento solo del tamaño de los costos que realmente bajan.",
      "C": "Contraoferta con un 8% como cifra intermedia segura."
    },
    "why": "Nunca pongas precio antes de conocer el valor Y el costo. El volumen solo justifica un descuento donde de verdad reduce el costo: menos marketing, sin visita de ventas, movilizaciones agrupadas. Descontar a ciegas es regalar tu margen neto.",
    "voice": "Lo que clasificas como costo directo determina tu utilidad bruta.",
    "titleEn": "Never Price Before Value"
  },
  "BE-ACC-35": {
    "title": "Da seguimiento para siempre",
    "scenario": "El señor Tate debe $3,400, que ya tienen 95 días. Ha prometido pagar dos veces y dos veces ha desaparecido. Tu contadora anterior solía dar estas cuentas por perdidas alrededor de los 90 días “para mantener limpios los libros”. El plazo para presentar un gravamen sigue abierto tres semanas más.",
    "options": {
      "A": "Dalo por perdido; 95 días de silencio son tu respuesta.",
      "B": "Envía una sola carta certificada de requerimiento final y deja de llamar.",
      "C": "Mantén un ritmo cortés —llamada, carta, ofrecer un plan de pagos— y protege ya el plazo del gravamen para nunca perder ese derecho."
    },
    "why": "Da seguimiento para siempre, con elegancia. La persistencia es profesional, no grosera: la mayoría de los deudores que se callan están avergonzados o sin dinero, no son hostiles. Y nunca dejes que venza el plazo de un gravamen mientras eres paciente.",
    "voice": "La mayoría de los vendedores son malos para dar seguimiento: hay dinero real en los prospectos viejos.",
    "titleEn": "Follow Up Forever"
  },
  "BE-ACC-36": {
    "title": "El efectivo es vida",
    "scenario": "Cuentas del viernes: $61,000 en efectivo, $48,000 en cuentas por cobrar, $74,000 en cuentas por pagar; el Spread acaba de volverse negativo por primera vez. Un proveedor ofrece 2%/10 en una factura de $20,000, la nómina sale el viernes y dos trabajos terminados siguen sin facturar desde el martes.",
    "options": {
      "A": "Factura hoy los trabajos terminados, empuja con fuerza la cobranza hasta dejar las cuentas por cobrar en cero, toma el descuento de 2%/10 e infórmale ahora al dueño sobre el Spread.",
      "B": "No tomes el descuento y retén todas las cuentas por pagar para acumular efectivo.",
      "C": "El Spread se ve feo, pero la nómina sale; vuelve a revisar los números a fin de mes."
    },
    "why": "El efectivo es vida y el Spread es tu luz de alerta temprana. Un dólar hoy vale más que un dólar el mes que viene: factura al instante, cobra hasta cero, paga antes (2%/10 equivale a ~24% anual), nunca tarde. Y da la voz de alarma.",
    "voice": "El efectivo es vida. ¡Si te quedas sin efectivo, te quedas sin negocio!",
    "titleEn": "Cash Is Life"
  },
  "BE-ACC-37": {
    "title": "Conoce tus números",
    "scenario": "En una cena, el banquero del dueño le pregunta: “¿Cuál es tu punto de equilibrio mensual? ¿Tu costo laboral con todas las cargas? ¿Tu margen neto?”. No pudo responder ninguna. El lunes te lo pregunta a ti, y sinceramente, tú también estarías adivinando. Los datos existen; nadie ha hecho el trabajo.",
    "options": {
      "A": "Dale respuestas aproximadas de buena fe para que nunca vuelva a pasar vergüenza.",
      "B": "Construye los números reales: punto de equilibrio al dólar, carga laboral completa, muestreo de costos por trabajo y margen neto como el KPI número uno.",
      "C": "Sugiere que el contador público los calcule en temporada de impuestos."
    },
    "why": "Conocer tus números significa CONOCERLOS: punto de equilibrio al dólar, carga laboral completa, márgenes verificados con muestreo de costos por trabajo. El margen neto es el KPI número uno. Las suposiciones disfrazadas de números son las más peligrosas.",
    "voice": "Los números no son difíciles; si no los entiendes, es que no lo estás intentando.",
    "titleEn": "Know Your Numbers"
  },
  "BE-ACC-38": {
    "title": "Paga por lo que quieres que se repita",
    "scenario": "Tu incentivo de $5 por cheque cobrado funcionó de maravilla, hasta que notas que tu auxiliar de cuentas por cobrar les pide a los clientes que dividan sus pagos en varios cheques y dedica su esfuerzo a las cuentas pequeñas y fáciles mientras los saldos grandes de 90 días siguen intactos.",
    "options": {
      "A": "Elimina el incentivo; está claro que corrompe el comportamiento.",
      "B": "Ten una conversación seria sobre el espíritu del programa y deja las reglas como están.",
      "C": "Rediséñalo: paga por dólares cobrados y por la reducción de la antigüedad de saldos, no por número de cheques; recompensa exactamente el resultado que quieres."
    },
    "why": "La gente hace exactamente aquello por lo que pagas: esa es la prueba de que los incentivos funcionan. No apagues el motor; apúntalo. Paga por dólares cobrados y por una antigüedad de saldos que se reduce, y diseña contra las trampas desde el primer día.",
    "voice": "Diseña los planes de incentivos esperando explícitamente que las cosas VAN a cambiar; protégete contra las trampas.",
    "titleEn": "Pay for What You Want Repeated"
  },
  "BE-ACC-39": {
    "title": "Sistemas, no héroes",
    "scenario": "Tu contadora de confianza desde hace doce años abre el correo, registra las facturas, hace los cheques, firma con el sello y concilia el banco: todo. Nunca se ha tomado unas vacaciones completas. El dueño dice: “¿Para qué insultarla con controles? Es de la familia”.",
    "options": {
      "A": "Divide las funciones para que un fraude requiera complicidad, envía los estados de cuenta a la casa del dueño, haz obligatorias las vacaciones y dile a todos que los controles existen.",
      "B": "Dale la razón; doce años de lealtad se ganaron la confianza total.",
      "C": "Agrega una revisión anual del contador público, pero no cambies nada del día a día."
    },
    "why": "La confianza no es un control, y los buenos sistemas protegen a la gente honesta: hacen que la contadora de confianza no pueda ser acusada. Los controles visibles disuaden en silencio; un héroe sin supervisión es como empieza toda historia de fraude.",
    "voice": "Toda historia de fraude empieza con “Yo confiaba en ellos”.",
    "titleEn": "Systems, Not Heroes"
  },
  "BE-ACC-40": {
    "title": "Cómo hacemos cualquier cosa es cómo lo hacemos todo",
    "scenario": "Fin de año. Tu catálogo de cuentas tiene 240 cuentas: duplicadas, una de “Varios” con $11,000, cuentas muertas de una línea de negocio que se vendió hace años. Técnicamente, los informes todavía funcionan. El dueño predica camiones impecables y obras impecables, y luego pregunta por qué las revisiones financieras tardan tanto.",
    "options": {
      "A": "Déjalo; de todos modos el contador público lo desenreda en temporada de impuestos.",
      "B": "Oculta las cuentas muertas en las vistas de los informes para que todo se vea más limpio.",
      "C": "Límpialo como una obra: fusiona las duplicadas, vacía Varios en cuentas reales, da de baja las cuentas muertas y ajústalo al catálogo estándar de SOE."
    },
    "why": "Cómo hacemos cualquier cosa es cómo lo hacemos todo. Una empresa con camiones impecables y un catálogo de cuentas que parece cajón de cachivaches se está mintiendo en algún lado. El estándar es el estándar, también en QuickBooks.",
    "voice": "Pensar bien incluso las decisiones rutinarias —como un catálogo de cuentas— rinde para siempre.",
    "titleEn": "How We Do Anything Is How We Do Everything"
  },
  "BE-RE-01": {
    "title": "La sombra alargada",
    "scenario": "Tu anuncio en Indeed lleva tres semanas publicado. Cuarenta solicitantes, ninguno calificado. Tu calificación en Glassdoor está en 2.4 estrellas, los camiones están sucios y el anuncio dice “debe tener herramientas propias, nada de quejumbrosos”. El dueño dice: “El mercado laboral está terrible”. Estás mirando el botón de volver a publicar.",
    "options": {
      "A": "Sube el salario publicado $2 por hora y vuelve a publicar el mismo anuncio.",
      "B": "Arregla lo que los candidatos realmente ven: las reseñas, el tono del anuncio, el taller, la marca. Tus solicitantes son un reflejo de tu empresa.",
      "C": "Publica el mismo anuncio en tres bolsas de trabajo más para ampliar la red."
    },
    "why": "Los candidatos que atraes son un reflejo de la empresa que construiste. Más dinero o más bolsas de trabajo solo le muestran la misma sombra a más gente. Cambia la empresa que ven los candidatos y el grupo de solicitantes cambiará con ella.",
    "voice": "Tienes el equipo que mereces.",
    "titleEn": "The Elongated Shadow"
  },
  "BE-RE-02": {
    "title": "Mereces tus resultados",
    "scenario": "Reunión de gerentes del lunes. Las tres contrataciones de este año se cayeron antes del cuarto mes. Alrededor de la mesa todos asienten a la misma frase: “Por aquí es muy difícil encontrar buena gente”. Se está volviendo el lema de la empresa, y nadie ha cambiado un solo paso de cómo reclutan en realidad.",
    "options": {
      "A": "Hazte cargo: audita tu reclutamiento como un embudo de ventas —búsqueda, filtro, entrevistas, ofertas— y reconstruye los pasos débiles.",
      "B": "Agrega un bono de contratación de $1,500 y espera que llegue mejor gente.",
      "C": "Pásale la contratación a una agencia de personal para que los fracasos sean su problema."
    },
    "why": "“Es difícil encontrar buena gente” es una excusa que se cumple sola. Tus resultados salieron de tu proceso. Hasta que lo asumas y cambies los insumos, seguirás mereciendo las mismas bajas.",
    "voice": "¿Qué porcentaje de la culpa de los problemas que tienes es tuyo?",
    "titleEn": "You Deserve Your Results"
  },
  "BE-RE-03": {
    "title": "El dolor es combustible",
    "scenario": "El técnico que contrataste a las carreras renunció en la tercera semana, justo después de rayar el piso de madera de un cliente. Daño total: $4,800, un cliente furioso y una cuadrilla quemada. El capataz quiere a alguien a quien culpar. Tú estás avergonzado porque te saltaste dos pasos para subirlo más rápido a un camión.",
    "options": {
      "A": "Dile al equipo “por esto no podemos tener cosas buenas” y vuelve al calendario.",
      "B": "Jura no volver a usar Indeed; de ahí salió él, así que la fuente es el problema.",
      "C": "Haz un análisis a fondo de la contratación, nombra los pasos que te saltaste y convierte la lección en una mejora permanente del proceso."
    },
    "why": "El daño de una mala contratación es una colegiatura, pero solo si cobras la lección. El dolor se vuelve combustible cuando mejora el proceso para que el mismo error no pueda pasar dos veces.",
    "voice": "Tu dolor puede ser tu veneno o tu combustible; tú eliges.",
    "titleEn": "Pain Is Fuel"
  },
  "BE-RE-04": {
    "title": "Sé una máquina de aprender",
    "scenario": "Has contratado a once personas en tu carrera y nunca te enseñaron cómo hacerlo. Cada entrevista es improvisada. La temporada baja empieza el mes que viene y tienes dos puestos por cubrir: el primer respiro real que has tenido en todo el año para mejorar en esto.",
    "options": {
      "A": "Bloquea tiempo semanal para estudiar contratación —libros, audios en el camión, las clases de SOE— y practica antes de que se abran los puestos.",
      "B": "Sigue improvisando; la experiencia de once contrataciones es la mejor maestra que existe.",
      "C": "Copia una lista de preguntas de entrevista del primer resultado de Google y date por capacitado."
    },
    "why": "La gente que deja de aprender llega al límite de lo que ya sabe. Reclutar es una habilidad que se aprende, y la temporada baja es justo cuando una máquina de aprender construye la habilidad antes de necesitarla.",
    "voice": "Lo que es fácil de hacer es fácil de no hacer.",
    "titleEn": "Be a Learning Machine"
  },
  "BE-RE-05": {
    "title": "Brillante en lo básico",
    "scenario": "Tienes en tu bandeja de entrada treinta y una solicitudes del anuncio de la semana pasada. Tu gerente de oficina dice: “Solo llamamos a los buenos; llamar a todos se comería medio día”. Es temporada alta. También sabes que este es un pueblo pequeño donde todo el mundo habla, y la mitad de esos solicitantes son primos o clientes de alguien.",
    "options": {
      "A": "Dale la razón; el calendario está saturado y los solicitantes no calificados nunca notarán la diferencia.",
      "B": "Llama o escríbele a cada solicitante en menos de 48 horas, siempre, sin excepción, e intégralo a la rutina.",
      "C": "Configura un correo automático de rechazo para que al menos todos reciban algo."
    },
    "why": "Devolverle la llamada a cada solicitante es algo básico, y lo básico es donde se gana o se pierde la batalla. Cada solicitante ignorado es un vecino, un futuro cliente y un megáfono en un pueblo pequeño.",
    "voice": "Vuélvete brillante en lo básico, porque ahí es donde se gana o se pierde la batalla.",
    "titleEn": "Brilliant on the Basics"
  },
  "BE-RE-06": {
    "title": "Primero define la realidad",
    "scenario": "El dueño desestima tu preocupación: “Nuestra rotación está bien; la gente se va por más dinero, así es el oficio”. Tú revisas los expedientes en silencio: nueve de las últimas catorce contrataciones se fueron antes de un año, y tres notas de salida mencionan al mismo supervisor. El dueño quiere tu informe de contratación el viernes.",
    "options": {
      "A": "Suaviza los números del informe para que la reunión del viernes no explote.",
      "B": "Quédate con la versión del dueño; lleva treinta años en esto y conoce su empresa.",
      "C": "Calcula la tasa real de rotación y los motivos reales de salida, y presenta los hechos tal cual."
    },
    "why": "No puedes arreglar un problema que no te atreves a nombrar. Los números honestos de rotación y los motivos reales de salida son el punto de partida; las historias cómodas sobre “el dinero” protegen egos mientras el mismo supervisor vacía la banca.",
    "voice": "Los hechos no dejan de existir porque se ignoren.",
    "titleEn": "Define Reality First"
  },
  "BE-RE-07": {
    "title": "Todo se crea dos veces",
    "scenario": "Tu jefe de cuadrilla renunció el viernes por la tarde. El dueño quiere entrevistas el lunes por la mañana. No hay descripción del puesto ni una lista de lo que hacía excelente al último jefe, ni de lo que hizo un desastre al anterior. La reclutadora pregunta: “Entonces… ¿qué estoy buscando exactamente?”.",
    "options": {
      "A": "Dedica primero dos horas a definir el puesto, las cualidades ideales y cómo se ve el éxito; luego entrevista contra esa imagen.",
      "B": "Empieza las entrevistas el lunes y define el puesto conforme vayan pasando los candidatos; la rapidez importa.",
      "C": "Reutiliza el anuncio viejo de técnico instalador; se parece bastante y ya está escrito."
    },
    "why": "Todo se crea dos veces: una vez en la mente y otra en la realidad. Si no puedes describir a la persona correcta antes de entrevistar, contratarás a quien se presente y lo llamarás destino. Dos horas de diseño le ganan a dos meses de arrepentimiento.",
    "voice": "Tienes que tener un sueño para hacer realidad un sueño.",
    "titleEn": "Created Twice"
  },
  "BE-RE-08": {
    "title": "El poder del porqué",
    "scenario": "Tu mejor candidato de climatización llama: un competidor le ofreció $1.50 más por hora. Es bueno —muy bueno— y decide el viernes. Tu salario es justo, pero no puedes ganar una guerra de ofertas pura, y tu empresa tiene un programa de capacitación, un camino de crecimiento y una historia que el competidor no puede igualar.",
    "options": {
      "A": "Iguala el salario y súmale $2, y espera que con eso se acabe.",
      "B": "Vende la historia: hacia dónde va la empresa, su camino de crecimiento, la capacitación, el porqué. Luego habla del paquete completo.",
      "C": "Déjalo ir; si ahora persigue centavos, los perseguirá siempre."
    },
    "why": "Con razones suficientemente fuertes, la gente hace cosas increíbles, incluido elegir la mejor carrera sobre la tarifa por hora más alta. Vende primero la visión; ganarlo solo con salario invita al siguiente postor a llevárselo de la misma manera.",
    "voice": "Si no hay un porqué, el cómo no importa.",
    "titleEn": "Why Power"
  },
  "BE-RE-09": {
    "title": "El negocio sirve a su dueño",
    "scenario": "El dueño entrevista en persona a cada candidato, incluso a los ayudantes de almacén de medio tiempo. Está orgulloso de eso. También trabaja setenta horas a la semana, y la contratación se congela por completo cada vez que viaja. El mes pasado dos candidatos aceptaron otros trabajos mientras esperaban un espacio en su agenda.",
    "options": {
      "A": "Programa las entrevistas a las 7 p. m. para que el dueño pueda meterlas después de su jornada.",
      "B": "Pausa la contratación hasta la temporada baja, cuando el dueño tenga más tiempo.",
      "C": "Crea un proceso de selección que el equipo maneje de principio a fin; el dueño solo conoce a los finalistas."
    },
    "why": "El negocio debe servir a su dueño, no consumirlo. Un sistema de contratación que maneja el equipo contrata más rápido Y le devuelve al dueño sus noches. Un dueño convertido en cuello de botella es lo contrario de ambas cosas.",
    "voice": "Quieres que tu negocio te dé más vida, no que te quite más vida.",
    "titleEn": "The Business Serves Its Owner"
  },
  "BE-RE-10": {
    "title": "Haz lo correcto aunque te cueste",
    "scenario": "Entrevista final con tu mejor candidato en meses. Te pregunta directamente: “¿Voy a trabajar los sábados?”. La verdad: todos los sábados de junio a agosto, sin excepción. Sientes que la oferta se te muere en las manos si lo dices tal cual, y el puesto lleva nueve semanas vacío.",
    "options": {
      "A": "Dile toda la verdad —todos los sábados del verano—, más el porqué y cómo lo compensas de forma justa con tiempo libre y pago.",
      "B": "Dile que “de vez en cuando” y deja que descubra el horario real después de empezar.",
      "C": "Esquívalo: “Hablemos del horario cuando tengamos lista tu oferta”."
    },
    "why": "Una presentación honesta del puesto te cuesta algunos candidatos ahora; prometer de más te cuesta la contratación, el retrabajo y tu nombre después. De cualquier modo se enterará de la verdad en junio; la única pregunta es si se la dijiste tú.",
    "voice": "Di toda la verdad, aunque no sea bonita.",
    "titleEn": "Do Right When It Costs You"
  },
  "BE-RE-11": {
    "title": "Contratar te hace o te deshace",
    "scenario": "Temporada alta. A una cuadrilla le falta un hombre, el calendario se está desangrando y hay un candidato disponible para empezar el lunes. Es alguien con pulso y un currículum vago. Tu gerente de producción está en la puerta de tu oficina: “No me importa quién; necesito a alguien en ese camión”.",
    "options": {
      "A": "Contrátalo; los camiones tienen que salir el lunes, y siempre puedes arreglarlo después.",
      "B": "Mantén el estándar y sigue reclutando con fuerza; una contratación equivocada cambia 1% de esfuerzo en reclutar por 99% de gestionar errores.",
      "C": "Contrátalo como “temporal” y después decide qué es en realidad."
    },
    "why": "Contratar es el único trabajo que un gerente tiene que hacer muy bien. El que solo llena el puesto resuelve una semana del calendario y crea meses de visitas de corrección, daños y drama. Que falte un hombre duele; el hombre equivocado rompe.",
    "voice": "En 30 años nunca me he arrepentido de despedir a alguien (¡aunque sí me he arrepentido de contratar a muchas personas equivocadas!).",
    "titleEn": "Hiring Makes You or Breaks You"
  },
  "BE-RE-12": {
    "title": "Carácter antes que habilidad",
    "scenario": "Un candidato a técnico de servicio arrasa en tu prueba técnica: lo mejor que has visto. En la entrevista habla pestes de sus tres empleadores anteriores, y una referencia dice en voz baja que “no lo volvería a contratar”. Es temporada alta, el tablero está lleno y sus habilidades rendirían desde la primera semana.",
    "options": {
      "A": "Contrátalo; un talento así es escaso, y la actitud la puedes manejar después.",
      "B": "Contrátalo con un periodo de prueba de 90 días como seguro.",
      "C": "Descártalo. Nunca contrates negatividad, por muy hábil que sea. Termina las verificaciones de antecedentes y reinicia la búsqueda."
    },
    "why": "La habilidad arregla tuberías; el carácter forma a la cuadrilla. La negatividad se contagia a cada camión en el que se sube, y el periodo de prueba solo agenda el daño. Las referencias ya te contaron el final: créeles.",
    "voice": "Acaba con los chismes, la negatividad y el sabotaje de forma decidida.",
    "titleEn": "Character Over Skill"
  },
  "BE-RE-13": {
    "title": "¡Claro que sí!, o no",
    "scenario": "Ronda final para un puesto de gerente de servicio que lleva seis semanas vacío. El candidato está… bien. Nadie en el panel está entusiasmado; nadie puede nombrar una objeción real tampoco. Alguien se encoge de hombros: “Cumple con lo que pedimos. Seis semanas es mucho tiempo”. La carta de oferta está redactada y esperando.",
    "options": {
      "A": "Reinicia la búsqueda. Si a nadie le encanta el candidato, es un no; conformarte con un jugador B te trae jugadores C después.",
      "B": "Envía la oferta; un puesto vacío durante seis semanas te está costando más de lo que costaría una contratación que “está bien”.",
      "C": "Contrátalo ahora y planea en silencio mejorar el puesto el año que viene."
    },
    "why": "Un equipo de gente de la que estás seguro le gana a un talento mayor que te deja tibio. Los gerentes se multiplican: un B contrata a C. “Bien” en la entrevista es lo mejor que se va a ver jamás.",
    "voice": "Pon el mismo cuidado en contratar a tu empleado número 73 que al número 3.",
    "titleEn": "Hell Yeah, or No"
  },
  "BE-RE-14": {
    "title": "La persona correcta en el puesto correcto",
    "scenario": "Marcus era tu hombre más cuidadoso del almacén: inventario perfecto durante dos años. Lo ascendiste a despacho, donde los teléfonos se acumulan y los planes cambian cada diez minutos. Seis semanas después se está ahogando, les contesta mal a los choferes y tu gerente de oficina dice: “Creo que tenemos que dejarlo ir”.",
    "options": {
      "A": "Levántale una amonestación; el puesto es el puesto, y despacho es el trabajo que aceptó.",
      "B": "Regrésalo a donde su estilo cuidadoso y constante gana; acomoda a la persona en el puesto correcto. Todo el mundo sirve para algún trabajo.",
      "C": "Mándalo a un seminario de alta energía para arreglar su personalidad."
    },
    "why": "La gente tiene estilos distintos, y una personalidad es ideal para un trabajo y no para otro. Marcus no se volvió un mal empleado en seis semanas: tú moviste a uno excelente al puesto equivocado.",
    "voice": "Una personalidad es ideal para un trabajo y no para otro.",
    "titleEn": "Right Person, Right Seat"
  },
  "BE-RE-15": {
    "title": "Capacita o retira",
    "scenario": "Por fin conseguiste a un verdadero ganador: excelentes referencias, excelente actitud. El primer día lo aventaron a un camión con un gruñido de “mira y aprende”. En la cuarta semana se ve promedio, no pregunta nada y un compañero lo escuchó decir que “no está seguro de que este lugar de verdad quiera que le vaya bien”.",
    "options": {
      "A": "Concluye que contrataste mal y corta tus pérdidas pronto.",
      "B": "Dile al capataz que “le eche un ojo” y vuelve a revisar el mes que viene.",
      "C": "Construye la inducción que te saltaste: unos primeros 30 días planeados, un capacitador asignado y revisiones programadas, a partir de mañana."
    },
    "why": "Un ganador con una mala inducción se convierte en un tipo promedio desmotivado, y eso es culpa de la empresa, no de él. Capacita de forma deliberada o terminarás “retirando” a gente que en realidad contrataste bien.",
    "voice": "Un ambiente al que no le gusta la mediocridad pero la acepta obtiene mediocridad.",
    "titleEn": "Train or Remove"
  },
  "BE-RE-16": {
    "title": "Tú no eres la puerta",
    "scenario": "Tu gerente de producción trabaja con cuadrillas a las que les faltan dos hombres y se queja todos los días. Cuando le preguntas qué está haciendo al respecto, dice: “¿Contratar? Eso es trabajo de Recursos Humanos; yo dirijo producción”. Recursos Humanos le ha mandado seis currículums; no ha abierto la carpeta. Mientras tanto, conoce por nombre a cada buen técnico del condado.",
    "options": {
      "A": "Oriéntalo: todo gerente recluta. Formar la banca va en su agenda semanal, igual que las reuniones de seguridad; no es negociable.",
      "B": "Haz que Recursos Humanos le mande más currículums y le dé más seguimiento.",
      "C": "Recluta tú mismo a sus técnicos para que por fin se haga bien."
    },
    "why": "Reclutar no es un departamento; es una obligación de cualquier gerente. El gerente que conoce a cada buen técnico del condado es el mejor reclutador que tiene la empresa, si su líder hace del reclutamiento parte del trabajo y no una interrupción.",
    "voice": "El único trabajo que paga $250 la hora es el del líder, si lo haces bien.",
    "titleEn": "You Are Not the Door"
  },
  "BE-RE-17": {
    "title": "Delega, no abdiques",
    "scenario": "Hace tres meses le entregaste toda la contratación a tu nueva gerente de oficina y te fuiste aliviado. Nunca has revisado su proceso, ni te has sentado en una entrevista, ni has hecho una sola pregunta. Ahora dos de sus contrataciones fracasaron, y el dueño te pregunta, con intención: “¿Quién los contrató?”.",
    "options": {
      "A": "Recupera la contratación; está claro que delegar falló.",
      "B": "Mantente al margen; lo delegaste, así que arreglar los errores le toca a ella.",
      "C": "Sigue siendo responsable: revisen juntos su proceso, fija puntos de control y números, porque “quién los contrató” te incluye a ti."
    },
    "why": "Delega la autoridad, conserva la responsabilidad. Entregar la contratación sin ninguna revisión no es delegar, es abdicar. La solución no es arrebatarla ni esconderte: es orientar a quien delegaste dentro de un proceso que sigue siendo tuyo.",
    "voice": "Delega la autoridad, conserva la responsabilidad.",
    "titleEn": "Delegate, Don't Abdicate"
  },
  "BE-RE-18": {
    "title": "Expectativas antes que rendición de cuentas",
    "scenario": "Tu nueva representante de servicio al cliente tiene “bajo desempeño” en su primer mes: según el informe, su tasa de citas agendadas es demasiado baja. Sacas su carta de oferta: no menciona ninguna métrica. Su capacitación de la primera semana: acompañar a quien estuviera menos ocupado. Nadie le dijo nunca que agendar citas era el trabajo. Su gerente quiere una amonestación hoy.",
    "options": {
      "A": "Aprueba la amonestación; después de todo, las métricas están publicadas en la pared.",
      "B": "Fija primero las expectativas: los números del puesto por escrito, revisados juntos, y a partir de ahí exígele cuentas.",
      "C": "Baja la meta de citas hasta que se acomode."
    },
    "why": "No puedes exigirle cuentas a alguien por expectativas que nunca recibió. Exigir cuentas sin expectativas no es dirigir, es una emboscada, y las expectativas empiezan en la carta de oferta y en la primera semana, no en el segundo mes.",
    "voice": "Las brechas en las expectativas llevan a brechas en la ejecución. No hay nada que se le acerque.",
    "titleEn": "Expectations Before Accountability"
  },
  "BE-RE-19": {
    "title": "Hazme sentir importante",
    "scenario": "Primer día de tu nuevo instalador: nadie lo esperaba en la puerta, no había uniforme de su talla ni casillero, y el dueño pasó junto a él sin saludarlo. A la hora de la comida le escribió a un amigo: “No estoy seguro de este lugar”. Te enteras esa noche por su jefe de cuadrilla.",
    "options": {
      "A": "Rediseña el primer día para cada contratación: el equipo avisado con anticipación, el equipo de trabajo listo, una bienvenida de verdad y una comida con el dueño.",
      "B": "Dale mañana una tarjeta de regalo de $50 y discúlpate por el mal comienzo.",
      "C": "No hagas nada; a los instaladores les importa el cheque, no las ceremonias."
    },
    "why": "Un primer día dice “aquí importas” o “eres un número más”. Él decidió si se quedaría a largo plazo antes de su primer cheque. El reconocimiento empieza con el saludo: diséñalo, no lo dejes a la suerte.",
    "voice": "Imagina que cada empleado lleva un letrero colgado del cuello que dice: “Hazme sentir importante”.",
    "titleEn": "Make Me Feel Important"
  },
  "BE-RE-20": {
    "title": "El amor es la mayor herramienta de liderazgo",
    "scenario": "Tu mejor técnico —seis años, capacita a los novatos, los clientes piden que vaya él— te lo dice de frente: un competidor lo llamó ofreciéndole $3 más por hora. No ha dicho que sí. Vino contigo primero, y eso requirió valor. Está parado en tu oficina esperando ver qué haces con eso.",
    "options": {
      "A": "Mejora la oferta por $4 ahí mismo; problema resuelto.",
      "B": "Recuérdale lo que significa la lealtad y menciona el acuerdo de no captación.",
      "C": "Agradécele su honestidad. Revisa su pago con justicia Y muéstrale cariño: camino de crecimiento, reconocimiento, tiempo real con él."
    },
    "why": "Retener es amor en acción, y él acaba de poner a prueba si existe. El dinero solo gana la subasta hasta la siguiente oferta; el cariño más un pago justo gana a la persona. Las amenazas lo pierden para el viernes.",
    "voice": "Cuando un gran empleado se va, es que te despidió como su jefe.",
    "titleEn": "Love Is the Greatest Leadership Tool"
  },
  "BE-RE-21": {
    "title": "Regala el mérito, asume la culpa",
    "scenario": "El plomero que tu subgerente defendió acaba de renunciar después de ocho semanas caóticas. En la reunión de liderazgo, todas las miradas se dirigen a ella. Se está preparando para el golpe. Tú también aprobaste la contratación, y la verdad es que tu proceso de selección son dos preguntas y un apretón de manos, para todos.",
    "options": {
      "A": "Deja que ella lo asuma en público; ella lo impulsó, y exigir cuentas tiene que significar algo.",
      "B": "Asume tú la culpa, señala el proceso débil como la verdadera falla y corrígelo junto con ella.",
      "C": "Di “estas cosas pasan” y pasa al siguiente punto de la agenda."
    },
    "why": "Una contratación fallida es culpa del proceso antes que de cualquier persona. Los líderes que asumen la culpa y arreglan el sistema mantienen a sus gerentes dispuestos a reclutar con audacia; los líderes que reparten culpas obtienen gerentes que dejan de contratar.",
    "voice": "Asume la culpa, regala el mérito: tu gente será más leal y trabajará más duro por ti.",
    "titleEn": "Give Away the Credit, Take the Blame"
  },
  "BE-RE-22": {
    "title": "Nunca actúes con una sola versión de la historia",
    "scenario": "El currículum de un candidato a capataz dice que “dirigió $2M en proyectos” en su última empresa, y cuenta una gran historia sobre por qué se fue: “dueño nuevo, caos total”. Se entrevista de maravilla. El puesto lleva cinco semanas vacío, puede empezar el lunes y localizar a las referencias tomaría días.",
    "options": {
      "A": "Contrátalo; la entrevista es la prueba real, y de todos modos las referencias solo dicen cosas buenas.",
      "B": "Contrátalo ahora, pero llama a las referencias durante su primera semana, por si acaso.",
      "C": "Verifica antes de decidir: llama a las referencias, confirma lo de los $2M y escucha la otra versión de esa salida."
    },
    "why": "Un currículum es una sola versión de la historia, contada por su autor. Toda salida tiene dos versiones, y una forma segura de tomar la acción equivocada es actuar con información incompleta. Unos días de verificación le ganan a meses de limpieza.",
    "voice": "Una forma segura de tomar la acción equivocada es actuar con información incompleta o incorrecta.",
    "titleEn": "Never Act on One Side of a Story"
  },
  "BE-RE-23": {
    "title": "Atiéndelo mientras es pequeño",
    "scenario": "Tu técnico de servicio, en su segunda semana, llegó tarde dos veces y se saltó la reunión de seguridad del viernes. Su capacitador lo menciona casi de pasada: “Seguramente se está adaptando”. Es talentoso, peleaste para conseguirlo y mencionarlo ahora se siente exagerado. Sería más fácil esperar a ver si se forma un patrón.",
    "options": {
      "A": "Habla con él hoy —amable, directo, volviendo a dejar claras las expectativas— mientras es un tropiezo y no un hábito.",
      "B": "Anótalo en su expediente y trata todo en la evaluación de 90 días.",
      "C": "Espera dos semanas más a que haya un patrón más claro antes de decir algo."
    },
    "why": "La segunda semana es cuando se forman los hábitos. Una conversación de cinco minutos ahora es orientación; la misma conversación en el sexto mes es una confrontación por un patrón que toleraste. Las mechas encendidas no se apagan solas.",
    "voice": "Si no descuidas los asuntos pequeños de cada día, los grandes rara vez aparecen.",
    "titleEn": "Handle It While It's Small"
  },
  "BE-RE-24": {
    "title": "La cultura es lo que pasa cuando el jefe se va",
    "scenario": "Tu técnico que más factura se burla de los nuevos, ignora la reunión de la mañana y llama “niñera” a las listas de verificación de seguridad, pero solo cuando no hay gerentes cerca. Dos reclutas prometedores renunciaron en su primer mes este trimestre. Una nota de salida decía: “Vi quién se sale con la suya aquí”.",
    "options": {
      "A": "Asigna a los nuevos mejores mentores y mantenlos lejos de él.",
      "B": "Enfrenta el comportamiento y acaba con él —cambia o se va—, porque a quien toleras le enseña a todos qué es lo que realmente vale aquí.",
      "C": "Déjalo así; produce, y hablar de cultura no paga las cuentas."
    },
    "why": "La cultura es lo que pasa cuando el jefe sale del edificio, y tu estrella tolerada ES la lección que aprenden los nuevos. Cada dólar que gastas en reclutar cae en una cubeta a la que él le está haciendo agujeros.",
    "voice": "La cultura es lo que pasa cuando el jefe sale del edificio.",
    "titleEn": "Culture Is When the Boss Leaves"
  },
  "BE-RE-25": {
    "title": "Hablar sin miedo",
    "scenario": "Tu tercer instalador de este año acaba de presentar su renuncia. La entrevista de salida está en tu agenda y la hará, como siempre, el supervisor del que está huyendo. Todos los formularios de salida del año pasado dicen “mejor oportunidad” con una letra sospechosamente parecida. Él le contó la verdad a un compañero, pero “no quiere quemar puentes”.",
    "options": {
      "A": "Elimina las entrevistas de salida; de todos modos la gente nunca dice la verdad cuando se va.",
      "B": "Deja al supervisor a cargo; él es quien mejor conoce el departamento.",
      "C": "Haz que una persona neutral lo entreviste, promete que no habrá represalias y protege de la misma forma cada salida futura."
    },
    "why": "La verdad de una salida solo aflora donde es seguro hablar. Una entrevista de salida dirigida por el problema produce ficción, y estás volviendo a cubrir el mismo puesto cada año porque la razón real nunca te llega.",
    "voice": "Para arreglar las cosas, tienes que verlas como son.",
    "titleEn": "Safe to Speak"
  },
  "BE-RE-26": {
    "title": "Un solo departamento: servicio al cliente",
    "scenario": "Tu reclutador cubre rápido los puestos de ventas: el dueño vigila ese número. Producción lleva un mes rogando por dos instaladores y recibe lo que sobra. Ahora los trabajos se acumulan, los clientes esperan tres semanas extra y el gerente de producción ya ni siquiera manda solicitudes de personal: “¿Para qué?”.",
    "options": {
      "A": "Trata a cada departamento como cliente de reclutamiento: una sola lista de prioridades basada en lo que toda la máquina necesita para servir a los clientes.",
      "B": "Mantén ventas en primer lugar; sin ventas no hay negocio.",
      "C": "Dile a producción que haga su propio reclutamiento, ya que no está contenta con el tuyo."
    },
    "why": "La empresa es un solo departamento: servicio al cliente. Reclutamiento sirve a cada engranaje, y un equipo de producción sin gente significa clientes esperando, lo que estrangula las mismas ventas para las que estabas contratando. La máquina necesita que todos los engranajes giren.",
    "voice": "Todos ganamos o perdemos juntos, y la empresa es un solo departamento.",
    "titleEn": "One Department: Customer Service"
  },
  "BE-RE-27": {
    "title": "Sirve a la persona, no a la casa",
    "scenario": "Un candidato te escribe la noche antes de su entrevista: a su mamá le dio un derrame cerebral; necesita reprogramar otra vez, por segunda ocasión. Tu gerente de oficina pone los ojos en blanco: “Márcalo como poco confiable y sigue adelante. Tenemos una pila de currículums”. Su solicitud era la más fuerte del grupo.",
    "options": {
      "A": "Sigue adelante; la vida pasa, pero la confiabilidad es parte del trabajo.",
      "B": "Trátalo primero como ser humano: reprograma con amabilidad genuina y júzgalo por la entrevista, no por la emergencia.",
      "C": "Déjalo en la pila, pero ponlo en último lugar sin decir nada."
    },
    "why": "Los candidatos son seres humanos, no currículums. Una crisis familiar no es una calificación de confiabilidad. Cómo tratas a alguien en su peor momento le dice a él —y a todos con quienes habla— exactamente cómo sería trabajar para ti.",
    "voice": "No le damos servicio a una casa; le damos servicio a un ser humano.",
    "titleEn": "Serve the Human, Not the House"
  },
  "BE-RE-28": {
    "title": "¡Wow! es el estándar",
    "scenario": "Tus entrevistas son en la sala de descanso: mesa pegajosa, zumbido de lámparas fluorescentes, interrupciones cada cinco minutos. Los candidatos esperan veinte minutos después de su hora. Ayer un gran electricista dejó plantada su segunda entrevista. Su respuesta de una línea a tu mensaje de seguimiento: “Acepté otra oferta. Sin rencores”.",
    "options": {
      "A": "Acéptalo como algo propio de los técnicos; hoy en día dejar plantado a alguien pasa de ambos lados.",
      "B": "Agrega un bono de contratación de $500 a tus anuncios para compensar la experiencia.",
      "C": "Trata a los candidatos como clientes: puntualidad, una sala preparada, recorrido por el taller y seguimiento el mismo día. Dales un ¡Wow!: la entrevista ES marketing."
    },
    "why": "Los candidatos juzgan el trabajo por la entrevista, igual que los clientes juzgan el trabajo por la experiencia. Una experiencia de contratación descuidada le dice todo a tu mejor prospecto, y tus mejores prospectos tienen opciones.",
    "voice": "Todo cuenta: clientes y empleados por igual leen cada detalle como evidencia de quién eres.",
    "titleEn": "Wow! Is the Standard"
  },
  "BE-RE-29": {
    "title": "La experiencia es la mitad del producto",
    "scenario": "Un candidato presentó su solicitud el martes. Tu sistema: la solicitud espera tres días, luego un correo genérico y después una entrevista telefónica “cuando alguien llegue a ella”. Tiempo promedio hasta la oferta: 19 días. Tu competidor les escribe a los solicitantes en menos de una hora y los entrevista en menos de 48. Sigues perdiendo a los buenos en el camino.",
    "options": {
      "A": "Rediseña el recorrido de contratación como Momentos de la Verdad: mapea cada punto de contacto, fija estándares de rapidez y haz que el propio proceso venda la empresa.",
      "B": "Diles a los candidatos desde el principio que las cosas buenas toman tiempo; las empresas de calidad avanzan con cuidado.",
      "C": "Sáltate por completo los pasos de selección y pasa directo a las ofertas para ganarle al competidor en rapidez."
    },
    "why": "El proceso de contratación es el primer Momento de la Verdad de la empresa: los candidatos deducen cómo es trabajar aquí a partir de cómo se siente postularse aquí. Lento y en silencio se lee como “así me van a tratar”. Acelera los contactos, no te saltes los estándares.",
    "voice": "Las grandes empresas no dejan nada al azar.",
    "titleEn": "The Experience Is Half the Product"
  },
  "BE-RE-30": {
    "title": "Los problemas son pruebas",
    "scenario": "Un instalador despedido publicó una reseña de una estrella en Indeed: “La gerencia tiene favoritos, las promesas son basura”. Es medio falsa, un poco verdadera, y ahora es lo primero que lee cada solicitante. Tu gerente de operaciones quiere responder en caliente y “aclarar las cosas”. Las solicitudes bajaron esta semana.",
    "options": {
      "A": "Haz que el abogado exija a Indeed que la elimine.",
      "B": "Responde en público con elegancia —reconoce lo que es justo, corrige los hechos con calma, invita a una conversación directa— y arregla lo que tenga de verdad.",
      "C": "Ignórala; responder solo echa leña al fuego, y las reseñas se olvidan."
    },
    "why": "Cada solicitante lee la reseña Y tu respuesta. Una respuesta elegante y honesta convierte el ataque en prueba de carácter; una respuesta en caliente le da la razón. Los problemas son pruebas: esta es pública, y la puedes pasar.",
    "voice": "Actúa rápido y asume la responsabilidad antes de que las malas noticias queden en internet para siempre.",
    "titleEn": "Problems Are Tests"
  },
  "BE-RE-31": {
    "title": "Clientes para toda la vida",
    "scenario": "Dana, una técnica sólida que se fue hace dos años en buenos términos a una empresa más grande, acaba de darle “me gusta” a una publicación de Facebook de tu empresa. Se dice que no está contenta donde terminó. Tu vieja política —no escrita, pero real— es “no recontratamos a quien se va”. Tienes un puesto que ella podría hacer con los ojos cerrados.",
    "options": {
      "A": "Mantén la política; recontratar a quienes se van le enseña a todos que el pasto del vecino es más verde.",
      "B": "Espera a que ella se postule; buscarla primero parece desesperación.",
      "C": "Llámala esta semana. Quienes regresan llegan capacitados, probados y con humildad, y te ayudan a construir una banca de exempleados que nunca se cierra."
    },
    "why": "Conserva a tu gente de por vida igual que conservas a los clientes de por vida. Una buena exempleada que regresa es tu contratación más barata, segura y rápida, y cada exempleado tratado con cariño se vuelve reclutador en el taller de otro.",
    "voice": "La mejor gente ya está trabajando en algún lado: mantente en contacto antes de necesitarla.",
    "titleEn": "Keep Customers for Life"
  },
  "BE-RE-32": {
    "title": "Vender es ayudar",
    "scenario": "Estás a punto de llamar a tu finalista para hacerle la oferta. Tu plan: mandarle por correo la hoja de compensación y “dejar que lo piense”. También está entrevistándose en otros dos talleres. Sabes que este trabajo encaja de verdad con sus metas —él mismo lo dijo—, pero insistir se siente agresivo, y odias sentirte vendedor.",
    "options": {
      "A": "Trata la llamada de la oferta como un cierre: conecta la oferta con sus metas, pide el sí y resuelve sus dudas en vivo. Reclutar ES vender.",
      "B": "Envía la oferta por correo con un plazo de una semana y espera con respeto.",
      "C": "Ofrece un poco menos para dejar margen a la negociación que tanto temes."
    },
    "why": "Si el trabajo de verdad encaja con sus metas, ayudarlo a decir que sí es un servicio, no presión. Una oferta por correo para que “lo piense” le entrega tu finalista al competidor que sí pida el sí.",
    "voice": "¡Véndeles! ¡Es lo correcto para todos!",
    "titleEn": "Selling Is Helping"
  },
  "BE-RE-33": {
    "title": "Nunca prejuzgues",
    "scenario": "Tres finalistas para un puesto de aprendiz: un muchacho platicador que “se siente que encaja”, un hombre callado que viene de la gerencia en comercio minorista y quiere cambiar de carrera, y una mujer que sería la primera instaladora que han tenido tus cuadrillas. Tu capataz ya decidió: “El muchacho. Los otros dos no van a durar en este oficio”.",
    "options": {
      "A": "Confía en el instinto del capataz; él es quien tiene que trabajar con ellos.",
      "B": "Evalúa a los tres con la misma tabla de puntuación, la misma prueba práctica y el mismo acompañamiento en campo, y juzga solo la evidencia.",
      "C": "Busca un punto medio y descarta solo al de comercio; no tener experiencia en el oficio es una carencia real."
    },
    "why": "Prejuzgar filtra justo a la gente que nadie más es lo bastante listo para contratar: los callados, los que cambian de carrera, los primeros. La evidencia de la misma prueba para todos le gana a la corazonada de un capataz sobre quién “dura”.",
    "voice": "Incluye a personas distintas a ti que complementen tus debilidades.",
    "titleEn": "Never Pre-Judge"
  },
  "BE-RE-34": {
    "title": "Nunca des un precio antes de construir valor",
    "scenario": "Entrevista telefónica: a los noventa segundos, el candidato pregunta: “¿Cuánto paga?”. La costumbre de tu reclutador es soltar el rango de inmediato y ver cómo la mitad cuelga. Este candidato es justo el capataz con experiencia que llevas meses buscando, y tu salario base está en el promedio del mercado, aunque el paquete completo no.",
    "options": {
      "A": "Di el salario base de inmediato; transparencia, lo tomas o lo dejas.",
      "B": "Niégate a hablar de dinero hasta la entrevista final.",
      "C": "Vende primero la carrera —crecimiento, capacitación, cultura, paquete completo— y luego pon el salario dentro de ese panorama."
    },
    "why": "Un salario dicho antes de construir valor es solo un número para comparar con el número de otro. Un salario base promedio dentro de una gran historia de carrera gana; un salario base promedio solo pierde en noventa segundos.",
    "voice": "Una vez que tienen el precio, ya no te necesitan.",
    "titleEn": "Never Price Before Value"
  },
  "BE-RE-35": {
    "title": "Da seguimiento para siempre",
    "scenario": "El mejor capataz de tu mercado te rechazó hace catorce meses: está contento donde está. Lo tachaste de la lista. Hoy su empresa acaba de ser comprada por un grupo de capital privado que está adquiriendo empresas, y tu superintendente comenta que esta mañana, en la tienda de materiales, “no sonaba muy contento”.",
    "options": {
      "A": "Déjalo en paz; perseguir a alguien que dijo que no parece desesperado y desgasta la buena voluntad.",
      "B": "Llámalo hoy usando la noticia como motivo, y ponlo en una lista de banca que contactas cada trimestre, para siempre.",
      "C": "Espera a que él te busque; sabe dónde encontrarte."
    },
    "why": "“No” significa “todavía no”. La gran gente que trabaja en otro lado es tu banca: cortéjala durante años con contactos reales y sé la primera llamada cuando su mundo cambie. Hoy su mundo cambió.",
    "voice": "SEGUIRÉ DANDO SEGUIMIENTO, PARA SIEMPRE, HASTA QUE SE HAGA LA VENTA.",
    "titleEn": "Follow Up Forever"
  },
  "BE-RE-36": {
    "title": "El efectivo es vida",
    "scenario": "El dueño acaba de recortar tu presupuesto de reclutamiento: “Anuncios, evaluaciones, servicios de referencias: $9,000 al año que no necesitamos”. Mientras tanto, las dos malas contrataciones del año pasado costaron unos $40,000 cada una en salarios, horas de capacitación, daños a camiones, trabajo rehecho y un cliente perdido: números que nadie le ha puesto enfrente nunca.",
    "options": {
      "A": "Muéstrale la cuenta: el costo total de una contratación equivocada frente al costo de contratar bien. El gasto en reclutamiento protege el efectivo.",
      "B": "Acepta el recorte y maneja en silencio un proceso más flaco; ya te las arreglarás.",
      "C": "Pasa el ahorro a bonos de contratación, ya que al menos esos atraen gente."
    },
    "why": "El efectivo es vida, y nada lo quema más silenciosamente que una contratación equivocada: salarios, retrabajo, daños, clientes perdidos. $9,000 de proceso que evitan un error de $40,000 son el mejor margen del edificio. Muestra la cuenta.",
    "voice": "Estar ocupado haciendo crecer la empresa sin vigilar los números es como pisar el acelerador y cerrar los ojos.",
    "titleEn": "Cash Is Life"
  },
  "BE-RE-37": {
    "title": "Conoce tus números",
    "scenario": "El dueño pregunta: “¿Cómo vamos con las contrataciones?”. Tu respuesta honesta sería “últimamente se siente mejor”. No mides nada: ni tasa de rotación, ni antigüedad promedio, ni tiempo para cubrir un puesto, ni ingresos por empleado. Dicen que tu competidor del otro lado de la ciudad recita sus números de memoria en cada reunión de liderazgo.",
    "options": {
      "A": "Sigue dirigiendo por intuición; reclutar se trata de personas, y las personas no son hojas de cálculo.",
      "B": "Saca solo las contrataciones contra las salidas de este trimestre como una foto rápida para el dueño.",
      "C": "Construye el tablero —tasa de rotación, antigüedad promedio, tiempo para cubrir un puesto, ingresos por empleado— y dale seguimiento durante años, no trimestres."
    },
    "why": "Toda actividad humana de negocios se reduce a un número, y tienes que medir para saber, comparar, mejorar y fijar metas. “Se siente mejor” no es una tendencia; cinco años midiendo la rotación y la antigüedad sí lo son.",
    "voice": "Tienes que medir para saber, comparar, mejorar y fijar metas.",
    "titleEn": "Know Your Numbers"
  },
  "BE-RE-38": {
    "title": "Paga por lo que quieres que se repita",
    "scenario": "Tu programa de recomendaciones paga $300 el día en que empieza la persona recomendada. Los técnicos aprendieron el juego: recomiendan a cualquiera con pulso, cobran y se encogen de hombros cuando el tipo renuncia en la sexta semana. Mientras tanto, tu mejor instalador trajo a dos que llevan cinco años y recibió los mismos $300 que todos los demás.",
    "options": {
      "A": "Elimina el programa; está claro que las trampas ya no tienen remedio.",
      "B": "Reestructúralo: más dinero, pagado por etapas a los 90 días y al año; paga por la permanencia, que es lo que realmente quieres.",
      "C": "Sube el bono a $600 al empezar para que al menos sigan llegando recomendaciones."
    },
    "why": "El comportamiento sigue al bono. Paga el primer día y habrás comprado gente que solo llena el puesto; paga a los noventa días y al año y habrás comprado gente que se queda. Recompensa exactamente lo que quieres que se repita, y nada más.",
    "voice": "Lo que se mide y se celebra, mejora.",
    "titleEn": "Pay for What You Want Repeated"
  },
  "BE-RE-39": {
    "title": "Sistemas, no héroes",
    "scenario": "Tu gerente de operaciones es famoso por su intuición: “En cinco minutos sé si un técnico es bueno”. Su historial dice otra cosa: más o menos la mitad de sus contrataciones de cinco minutos se cayeron. Se salta la entrevista telefónica, improvisa sus preguntas y nunca usa la entrevista práctica en campo. La próxima semana vuelve a contratar.",
    "options": {
      "A": "Implementa el sistema: las mismas preguntas para todos, selección en varios pasos y un acompañamiento práctico en campo; nada de contrataciones solo por intuición, incluidas las suyas.",
      "B": "Déjalo con su método, pero pídele que después anote algo para el expediente.",
      "C": "Junta su intuición con la tuya; dos intuiciones entrevistando juntas deberían cancelar los errores."
    },
    "why": "Una moneda también cae cara la mitad de las veces. Los guiones y los pasos repetibles hacen que la excelencia sea repetible para la gente común; contratar solo por intuición hace que los resultados dependan de que un héroe tenga un buen día. El mismo proceso, con cada candidato, siempre.",
    "voice": "¡Hay tantos beneficios en una idea simple bien ejecutada!",
    "titleEn": "Systems, Not Heroes"
  },
  "BE-RE-40": {
    "title": "Cómo hacemos cualquier cosa es cómo lo hacemos todo",
    "scenario": "Mañana tu mejor candidato en un año recorre el taller. Ahora mismo: botes de basura desbordados, un camión muerto sobre bloques, el cartel de seguridad del mes pasado tirado en el piso y una sala de descanso que huele a 2019. Tu supervisor se ríe: “Viene a apretar tuercas, no a juzgar la decoración”.",
    "options": {
      "A": "Hazle el recorrido solo por la oficina y mantén cerradas las puertas del taller.",
      "B": "Discúlpate por adelantado —“perdona el desorden, es temporada alta”— y hazle el recorrido así.",
      "C": "Límpialo esta noche y mantenlo así; el taller le dice a los candidatos exactamente cómo haces todo lo demás."
    },
    "why": "Todo lo que ven los empleados y los candidatos enseña. Un taller desordenado dice “este es nuestro estándar” más fuerte que cualquier discurso, y cómo mantienes el taller es cómo vas a cumplirle tus promesas. Los detalles son evidencia.",
    "voice": "Somos damas y caballeros al servicio de damas y caballeros.",
    "titleEn": "How We Do Anything Is How We Do Everything"
  },
  "BE-GM-01": {
    "title": "La sombra alargada",
    "scenario": "Evaluación de fin de año en la empresa de reparación de cimientos que diriges: las cuadrillas dejan las obras desordenadas, la oficina devuelve tarde las llamadas y las reuniones de ventas empiezan cuando sea. El dueño trajo a un consultor, que en voz baja te señala que te saltas las noches de capacitación, llegas a las 9:30 y tu propio camión es un desastre. Te pregunta: “¿Dónde crees que lo aprendieron?”.",
    "options": {
      "A": "Contrata a un gerente de operaciones duro que meta a todos en cintura; tú te enfocarás en el crecimiento.",
      "B": "Audítate primero: tu puntualidad, tu camión, tu asistencia a las capacitaciones. Cámbiate a ti y luego vuelve a fijar el estándar.",
      "C": "Envía un memo a toda la empresa sobre los estándares, con sanciones para la próxima falta."
    },
    "why": "El negocio es tu reflejo y nunca va a rendir más que su líder. Contratar a alguien que haga cumplir las reglas o mandar memos mientras tú modelas el descuido solo le enseña a todos que el memo es opcional.",
    "voice": "Tu negocio es tu sombra alargada.",
    "titleEn": "The Elongated Shadow"
  },
  "BE-GM-02": {
    "title": "Mereces tus resultados",
    "scenario": "Una instalación de drenaje de $14,000 falló e inundó el sótano de la clienta. El instalador que contrataste a las carreras —sin proceso, dos días de acompañamiento, sin lista de verificación— se saltó la prueba que nunca le enseñaste. La clienta está furiosa y tu gerente de ventas dice: “Despide al tipo y dile que fue una manzana podrida”.",
    "options": {
      "A": "Despide al instalador, dile a la clienta que la manzana podrida ya no está y sigue adelante.",
      "B": "Levántale una amonestación, vuelve a capacitarlo y di que fue un error compartido.",
      "C": "Asúmelo por completo: tú lo contrataste, tú lo capacitaste, tú fijaste las expectativas. Arregla su sótano y luego arregla tu sistema de contratación y capacitación."
    },
    "why": "Responsabilidad total. La historia de la manzana podrida es la mentira cómoda: el sistema que lo produjo sigue funcionando y producirá otro el mes que viene.",
    "voice": "Yo los contraté, yo los capacité, yo fijé las expectativas, yo creé la cultura; por lo tanto, soy responsable.",
    "titleEn": "You Deserve Your Results"
  },
  "BE-GM-03": {
    "title": "El dolor es combustible",
    "scenario": "Un febrero brutal: tu cuenta comercial más grande se fue, tu segundo mejor vendedor renunció para irse con el competidor que se lo robó, y estás en la mesa de la cocina a las 11 p. m. repasando ambas pérdidas. Mañana por la mañana el equipo va a leer tu cara. Sientes que te estás amargando.",
    "options": {
      "A": "Escribe lo que controlas —insumos, mentores, libros, el plan— y convierte el ardor en un contraataque de 90 días.",
      "B": "Entiérralo, no digas nada y trabaja más horas hasta que los números lo tapen.",
      "C": "Abre la reunión del lunes desahogándote sobre los empleados desleales y un mercado injusto."
    },
    "why": "Los tropiezos son veneno o combustible; tú decides. Trabajar en silencio no cambia nada en el origen; desahogarte envenena todo el taller. Cambiar tus insumos lo cambia todo más adelante.",
    "voice": "Tu dolor puede ser tu veneno o tu combustible; tú eliges.",
    "titleEn": "Pain Is Fuel"
  },
  "BE-GM-04": {
    "title": "Sé una máquina de aprender",
    "scenario": "Estás atrapado en semanas de 60 horas. Un taller de liderazgo de tres días que llevas dos años queriendo tomar cae en abril —tu temporada alta— y cuesta $3,000 más el viaje. Tu gerente de operaciones dice: “No podemos perderte tres días”. No has leído un libro de negocios desde 2023.",
    "options": {
      "A": "No vayas. El negocio te necesita al pie del cañón en temporada alta.",
      "B": "Manda a tu gerente de operaciones en tu lugar y pídele que te cuente lo que aprendió.",
      "C": "Ve tú. Prepara al equipo, tómate los tres días y regresa como un mejor líder."
    },
    "why": "Trabaja más en ti mismo que en tu trabajo: el líder es el techo de la empresa. Mandar a tu gerente de operaciones parece desarrollo, pero la limitación que estás evitando mejorar eres tú.",
    "voice": "El emprendimiento es el poder de crear. Primero, el poder de crearte a ti mismo.",
    "titleEn": "Be a Learning Machine"
  },
  "BE-GM-05": {
    "title": "Brillante en lo básico",
    "scenario": "Las ventas están bajando. Al investigar, descubres que tus representantes dejaron en silencio de hacer propuestas escritas el mismo día —“las mandamos después por correo para ahorrar tiempo”— y la mayoría pide el pedido una vez, si acaso. Esa misma semana, un proveedor te ofrece un nuevo canal de generación de prospectos de moda con una demostración muy pulida.",
    "options": {
      "A": "Compra el nuevo canal de prospectos; más oportunidades compensarán la baja.",
      "B": "Vuelve a instalar primero lo básico: propuestas escritas el mismo día, presentadas en persona, pedir tres veces, esfuerzo total con cada prospecto.",
      "C": "Baja los precios 10% para cerrar más de lo que ya estás atendiendo."
    },
    "why": "Las cosas simples hechas sin falta ganan la batalla. Meter prospectos nuevos y caros en un equipo que abandonó lo básico solo los desperdicia más rápido, y descontar castiga el margen por un problema de disciplina.",
    "voice": "Lo que es fácil de hacer es fácil de no hacer.",
    "titleEn": "Brilliant on the Basics"
  },
  "BE-GM-06": {
    "title": "Primero define la realidad",
    "scenario": "Le dices a todo el mundo que diriges “una empresa de $4 millones”. El número real: $2.9M instalados, el margen dos puntos abajo, y tu tasa de cierre por debajo del grupo de colegas que conociste en una conferencia. El dueño quiere un plan de crecimiento en su escritorio para el viernes. Tu ego quiere incluir la historia de los $4M.",
    "options": {
      "A": "Construye el plan con los números reales, compáralo con tus colegas y pregúntate por escrito: “¿Qué porcentaje de la culpa es mío?”.",
      "B": "Presenta proyecciones optimistas para mantener confiado al dueño.",
      "C": "Haz primero un evento para levantar la moral; el equipo necesita creer antes de las malas noticias."
    },
    "why": "Para arreglar las cosas tienes que verlas como son. Un plan basado en una historia halagadora fracasa en el campo; un evento motivacional antes de la realidad es anestesia, no liderazgo.",
    "voice": "¿Qué porcentaje de la culpa de los problemas que tienes es tuyo?",
    "titleEn": "Define Reality First"
  },
  "BE-GM-07": {
    "title": "Todo se crea dos veces",
    "scenario": "El dueño quiere una segunda cuadrilla de instalación el próximo año —alrededor de $1M más de capacidad—, y te toca a ti armar el plan. En una subasta el sábado, un camión de caja en buen estado sale barato. Tu capataz dice que lo compres; el dueño pregunta cuál es el plan real. Tienes una corazonada, una cifra meta y nada en papel.",
    "options": {
      "A": "Publica ahora un anuncio de empleo y resuelve lo demás sobre la marcha.",
      "B": "Presiona al dueño para que compre el camión; la oportunidad obliga a todos a comprometerse.",
      "C": "Modélalo primero —en lo funcional, lo financiero y lo físico: los prospectos, los números, la gente y el equipo— y luego cierra la brecha pieza por pieza."
    },
    "why": "Todo se crea dos veces: primero en la mente y después en la realidad. El camión se siente decisivo, pero es una respuesta física a una pregunta que todavía no terminas de hacer. Planear saca a la luz los problemas gratis.",
    "voice": "Tienes que tener un sueño para hacer realidad un sueño.",
    "titleEn": "Created Twice"
  },
  "BE-GM-08": {
    "title": "El poder del porqué",
    "scenario": "En la reunión general presentas: “¡$10 millones para 2029!”. Las miradas se apagan. Después, tu gerente de ventas te pregunta en privado: “¿Por qué diez? ¿Qué le aporta a cualquiera de los que estaban en esa sala?”. Te das cuenta de que tu respuesta honesta es “porque podemos”. La carpeta del plan es gruesa; falta la razón.",
    "options": {
      "A": "Divide la meta en cuotas por departamento; la claridad generará compromiso.",
      "B": "Detente. Define el porqué —para ti, para ellos, para los clientes— y vuelve a lanzar la meta conectada con lo que de verdad le importa a la gente.",
      "C": "Ponle dinero de bono a la cifra y deja que el dinero hable."
    },
    "why": "Primero las razones, después las respuestas. Las cuotas y los bonos son la maquinaria del “cómo”; nadie aguanta febreros difíciles por una cifra que solo hace más rico al dueño.",
    "voice": "Si no hay un porqué, el cómo no importa.",
    "titleEn": "Why Power"
  },
  "BE-GM-09": {
    "title": "El negocio sirve a su dueño",
    "scenario": "No has tomado unas vacaciones de verdad en tres años. Tu pareja reserva una semana en la playa en julio, la misma semana de tu instalación más grande del verano. Tu gerente de producción es capaz, pero nunca ha dirigido un trabajo grande sin que tú estés encima. El depósito de la casa de playa no es reembolsable.",
    "options": {
      "A": "Ve. Informa al equipo, dale a tu gerente de producción autoridad total y toma la semana como la prueba de independencia.",
      "B": "Pospón el viaje a la temporada baja; solo esta vez más.",
      "C": "Ve, pero dirige el trabajo por teléfono desde la playa toda la semana."
    },
    "why": "El negocio existe para darte más vida, no para quitártela. “Solo esta vez más” es la forma en que tres años se volvieron tres más. Un equipo que no puede funcionar una semana sin ti es la verdadera emergencia.",
    "voice": "Quieres que tu negocio te dé más vida, no que te quite más vida.",
    "titleEn": "The Business Serves Its Owner"
  },
  "BE-GM-10": {
    "title": "Haz lo correcto aunque te cueste",
    "scenario": "Tu estimador midió mal un trabajo de impermeabilización firmado de $18,000; hecho bien, vas a perder unos $2,500. La nómina es el viernes y febrero estuvo lento. La salida fácil es una llamada rápida: “Subió el costo de los materiales; el precio tiene que aumentar”. El cliente probablemente lo creería.",
    "options": {
      "A": "Haz la llamada de los costos de materiales y vuelve a cotizar el trabajo.",
      "B": "Dile la verdad al cliente y pídele repartir la diferencia.",
      "C": "Cumple tu palabra, haz el trabajo como se firmó, absorbe la pérdida y luego arregla el proceso de medición."
    },
    "why": "Tu palabra es el producto. La llamada maquillada es cómoda y probablemente funcione una vez, y te convierte en una empresa que miente cuando le sale caro. Arreglar el sistema convierte los $2,500 en una colegiatura, no en un desperdicio.",
    "voice": "Si la gente no le cree al mensajero, no le creerá al mensaje.",
    "titleEn": "Do Right When It Costs You"
  },
  "BE-GM-11": {
    "title": "Contratar te hace o te deshace",
    "scenario": "El trabajo pendiente de producción llega a seis semanas y tu mejor capataz está rogando por ayuda. Hoy llegó alguien sin cita: disponible el lunes, currículum vago, “mucha experiencia”. Tu proceso completo de contratación —entrevistas, referencias, antecedentes, entrevista práctica— toma tres semanas que sientes que no tienes.",
    "options": {
      "A": "Contrátalo el lunes. Gente ahora, ya se ordenará después.",
      "B": "Mantén el proceso. Cubre la brecha con semanas de seis días y ayudantes alrededor de tus capataces fuertes mientras reclutas bien.",
      "C": "Sáltate las referencias y los antecedentes; una buena entrevista y empieza el miércoles."
    },
    "why": "El 95% del éxito es la gente que eliges. La contratación apresurada convierte un problema de programación de seis semanas en un problema de años gestionando tu error. La capacidad flexible compra el tiempo que necesita el proceso.",
    "voice": "Contratar te hará o te deshará. Con demasiada frecuencia los contratistas dedican el 1% de su tiempo a reclutar y el 99% a lidiar con sus errores de contratación.",
    "titleEn": "Hiring Makes You or Breaks You"
  },
  "BE-GM-12": {
    "title": "Carácter antes que habilidad",
    "scenario": "Un candidato acaba de arrasar en tu entrevista práctica: de verdad el mejor instalador técnico que has visto trabajar. Luego, las dos llamadas de referencia insinúan lo mismo: trabajos por fuera con clientes de la empresa y hablar mal de su último jefe todo el tiempo. Tu gerente de producción dice: “Podemos vigilarlo. Mira esas manos”.",
    "options": {
      "A": "Descártalo. Reinicia la búsqueda y explícale a tu gerente exactamente por qué.",
      "B": "Contrátalo con una advertencia severa de cero tolerancia desde el primer día.",
      "C": "Úsalo como subcontratista para que el riesgo quede fuera de la empresa."
    },
    "why": "Puedes enseñar habilidades; no puedes enseñar carácter. Dos referencias que cantan la misma canción son información, no chisme. La maniobra del subcontratista igual mete su carácter en las casas de tus clientes con tu reputación encima.",
    "voice": "No logramos que la gente adopte nuestros valores fundamentales. Encontramos gente que ya los tiene.",
    "titleEn": "Character Over Skill"
  },
  "BE-GM-13": {
    "title": "¡Claro que sí!, o no",
    "scenario": "El puesto de gerente de ventas lleva cuatro meses vacío y te está costando. Después de las entrevistas finales, calificas al mejor de tres finalistas con un 7.5 de 10: currículum sólido, buenas respuestas, ninguna chispa. A tu equipo le pareció “más o menos”. Volver a reclutar significa dos meses más cubriendo tú el puesto.",
    "options": {
      "A": "Contrata al 7.5; lo perfecto es enemigo de lo bueno, y el puesto se está desangrando.",
      "B": "Asciende esta noche a tu mejor vendedor para detener el dolor.",
      "C": "Reinicia la búsqueda. Si no te encanta el candidato, la respuesta es no."
    },
    "why": "Los jugadores A contratan jugadores A; contratar a un líder que “está bien” pone techo a cada contratación que haga. El 7.5 se siente responsable: esa es la trampa. Dos meses duros más le ganan a tres años mediocres.",
    "voice": "A veces la mejor decisión de contratación es no contratar.",
    "titleEn": "Hell Yeah, or No"
  },
  "BE-GM-14": {
    "title": "La persona correcta en el puesto correcto",
    "scenario": "Tu gerente de oficina es brillante con los sistemas, los horarios y los números, y después de un año de orientación sigue siendo rígida y cortante con los clientes molestos al teléfono. Ayer hizo enojar más a una clienta que estaba llorando. Es leal, lleva diez años y sabe que la descripción de su puesto dice que los teléfonos le tocan a ella.",
    "options": {
      "A": "Sigue orientándola en el teléfono; los líderes no se rinden con la gente.",
      "B": "Rediseña los puestos: dale por completo los sistemas y la contabilidad, y contrata para los teléfonos a alguien con vocación natural de servicio.",
      "C": "Levántale una amonestación; los teléfonos están en la descripción de su puesto."
    },
    "why": "Pon las fortalezas donde se valoran y las debilidades donde no importan. Un año de orientación contra la naturaleza de alguien no es lealtad: es fricción para ella y para el cliente. Todo el mundo sirve para algún puesto.",
    "voice": "Todo el mundo sirve para algún trabajo.",
    "titleEn": "Right Person, Right Seat"
  },
  "BE-GM-15": {
    "title": "Capacita o retira",
    "scenario": "Tu instalador de nueve años —padrino del hijo de tu capataz, infaltable en la fiesta de Navidad— lleva seis meses bajando: visitas de corrección, atajos, dos reclamos de garantía. Has tenido dos pláticas amistosas. Nada cambió. La cuadrilla empezó a rehacer su trabajo en silencio, y la temporada alta empieza en tres semanas.",
    "options": {
      "A": "Arma un plan de capacitación por escrito con estándares claros y una fecha límite de 30 días: que mejore, o se separan con dignidad.",
      "B": "Sigue cubriéndolo. Nueve años compran paciencia; probablemente se va a componer.",
      "C": "Pásalo en silencio a tareas del taller sin mencionar el problema real."
    },
    "why": "La esperanza no es una estrategia. Sabiendo lo que ahora sabes, no contratarías hoy a esta versión de él; así que capacítalo hasta que vuelva a ser contratable o déjalo ir con dignidad. El cambio silencioso esquiva la verdad que él merece.",
    "voice": "En 30 años nunca me he arrepentido de despedir a alguien (¡aunque sí me he arrepentido de contratar a muchas personas equivocadas!).",
    "titleEn": "Train or Remove"
  },
  "BE-GM-16": {
    "title": "Tú no eres la puerta",
    "scenario": "Tu mejor vendedor estará fuera seis semanas por una cirugía, y deja $400K de cartera sin cubrir. Hace quince años tú eras el mejor cerrador del condado, y una parte de ti está encantada con la excusa. Tus otros dos representantes son promedio. Tu agenda como gerente general ya está llena del trabajo que solo tú puedes hacer.",
    "options": {
      "A": "Atiende tú sus prospectos; nadie en el edificio cierra como tú.",
      "B": "Reparte los prospectos y recorta el gasto en marketing para achicar la cartera a la medida.",
      "C": "Redistribuye los prospectos y usa seis semanas de acompañamientos en campo para que tus representantes promedio mejoren. Quédate en el puesto de líder."
    },
    "why": "Te pagan por los resultados del equipo, no por los tuyos. Volver a cargar el maletín se siente heroico y te paga un sueldo mientras tu verdadero trabajo —formar a quienes hacen el trabajo— se queda sin hacer seis semanas.",
    "voice": "La libertad no llega cuando has resuelto todos tus problemas. La libertad llega cuando te das cuenta de que no puedes hacerlo solo.",
    "titleEn": "You Are Not the Door"
  },
  "BE-GM-17": {
    "title": "Delega, no abdiques",
    "scenario": "Hace tres meses le entregaste el marketing a un gerente nuevo con una sola instrucción: “Haz que suene el teléfono”. Sin presupuesto, sin metas de prospectos, sin revisión semanal. Los prospectos bajaron un 20% y él se ve ocupado pero perdido. Estás avergonzado, saturado, y la campaña de primavera empieza en seis semanas.",
    "options": {
      "A": "Asume la mala entrega. Vuelve a delegar como se debe —propósito, metas de prospectos, presupuesto, informes semanales— y oriéntalo hacia las metas.",
      "B": "Recupera tú el marketing hasta que las cosas se estabilicen.",
      "C": "Dale otro trimestre para que lo resuelva; ahora estás demasiado ocupado."
    },
    "why": "“Haz que suene el teléfono” fue abdicar, y las fallas de abdicar te pertenecen. Recuperarlo te deja con el trabajo para siempre; otro trimestre a ciegas es la versión cómoda del mismo error.",
    "voice": "Si nunca cedes la autoridad, te quedarás con el trabajo para siempre. ¿Es eso lo que quieres?",
    "titleEn": "Delegate, Don't Abdicate"
  },
  "BE-GM-18": {
    "title": "Expectativas antes que rendición de cuentas",
    "scenario": "Descubres que tres prospectos de internet pasaron la noche sin respuesta: a $200 por prospecto, $600 quemados mientras un competidor les devolvía la llamada a esos propietarios en minutos. Estás furioso y a medio camino de levantarle una amonestación a la representante del centro de citas. Entonces revisas: no existe en ningún lado un estándar escrito de velocidad de respuesta a prospectos. Nunca ha existido.",
    "options": {
      "A": "Amonesta a la representante; cualquiera con sentido común sabe que los prospectos no pueden esperar.",
      "B": "Fija primero el estándar explícito —cada consulta respondida en menos de una hora, guiones, cobertura, capacitación— y luego exige que se cumpla.",
      "C": "Instala un software de monitoreo para atrapar tú mismo a los flojos."
    },
    "why": "Las brechas en las expectativas causan brechas en la ejecución; no hay nada que se le acerque. Castigar a la gente por estándares que solo viven en tu cabeza enseña miedo; vigilar sin claridad enseña desconfianza. Primero la claridad, después la rendición de cuentas.",
    "voice": "Las brechas en las expectativas llevan a brechas en la ejecución. No hay nada que se le acerque.",
    "titleEn": "Expectations Before Accountability"
  },
  "BE-GM-19": {
    "title": "Hazme sentir importante",
    "scenario": "Noche de presupuesto. En la oficina se murmura sobre aumentos, la moral está por los suelos y las entrevistas de salida dicen que la gente se siente invisible. Mientras tanto, tu mejor capataz acaba de terminar a la perfección un trabajo brutal de diez días bajo la lluvia, y nadie por encima de él le dijo una sola palabra. Tienes $15K de margen discrecional en total.",
    "options": {
      "A": "Repártelo como aumentos generales del 3%; el dinero habla.",
      "B": "Guárdalo para anunciar un bono en diciembre.",
      "C": "Empieza a reconocer ya: llama esta noche al capataz, escribe notas a mano, elógialo en público en la reunión general, y guarda el dinero para recompensas específicas."
    },
    "why": "La gente hace más por reconocimiento que por dinero. Un aumento del 3% se olvida para el segundo cheque; un agradecimiento específico, público y sincero termina colgado en la pared del garaje durante diez años.",
    "voice": "Imagina que cada empleado lleva un letrero colgado del cuello que dice: “Hazme sentir importante”.",
    "titleEn": "Make Me Feel Important"
  },
  "BE-GM-20": {
    "title": "El amor es la mayor herramienta de liderazgo",
    "scenario": "Tu despachadora —cinco años, firme como una roca— lleva un mes distraída: agendó dos veces a las mismas cuadrillas y le contestó mal a un capataz. El viernes te enteras de que su mamá está gravemente enferma a tres estados de distancia. Ella no ha pedido nada. El calendario del lunes es el más cargado del año, y lo arma ella.",
    "options": {
      "A": "Reúnete con ella en privado, pregúntale por su mamá y armen juntos la ayuda: horario flexible, días cubiertos, lo que su familia necesite.",
      "B": "Pasa en silencio sus tareas propensas a errores a otras personas hasta que esto pase.",
      "C": "Documenta ya los errores para que la empresa quede protegida pase lo que pase."
    },
    "why": "Ayudar con la vida es amor, y la gente que sabe que te importa se convierte en su propio supervisor. El arreglo silencioso parece suave, pero le dice que es un riesgo, no una persona, y no resuelve nada de lo que está cargando.",
    "voice": "Al final, todo se reduce a esto: ¿amas a la gente?",
    "titleEn": "Love Is the Greatest Leadership Tool"
  },
  "BE-GM-21": {
    "title": "Regala el mérito, asume la culpa",
    "scenario": "Trimestre récord —el mejor en la historia de la empresa—, impulsado sobre todo por un cambio de precios que tu joven gerente de ventas defendió a pesar de tus objeciones. La asociación del gremio te invita a contar la historia en el escenario, y un reportero del periódico de negocios del condado quiere conocer “el secreto del gerente general”. Mientras tanto, la única mancha del trimestre, una instalación mal hecha, también fue técnicamente una decisión de programación de él.",
    "options": {
      "A": "Cuenta la historia tal cual: su idea, tu duda inicial, la ejecución del equipo, y asume la instalación fallida como error tuyo.",
      "B": "Sube tú al escenario, pero agradécele “a todo el equipo” en general.",
      "C": "Comparte el mérito del logro y deja que él explique la falla de la instalación; la rendición de cuentas importa."
    },
    "why": "El mérito fluye hacia abajo y la culpa hacia arriba. El vago agradecimiento “a todo el equipo” mantiene discretamente el reflector sobre ti, y cargarle a él la mancha mientras te embolsas su logro es exactamente al revés.",
    "voice": "En un discurso motivador, el líder regala todo el mérito y asume toda la culpa.",
    "titleEn": "Give Away the Credit, Take the Blame"
  },
  "BE-GM-22": {
    "title": "Nunca actúes con una sola versión de la historia",
    "scenario": "Tu gerente de oficina —quince años, de toda tu confianza— te acorrala el viernes: “Tu nuevo gerente de producción le gritó a María y está a punto de renunciar. Tienes que encargarte de él hoy”. Es la tercera queja que te trae sobre él este mes. Él ha estado cambiando la forma en que la oficina programa a las cuadrillas, y sabes que a ella le molestó perder ese control.",
    "options": {
      "A": "Actúa hoy; tres quejas de tu persona de mayor confianza son evidencia suficiente.",
      "B": "Dile al gerente de producción que se disculpe y que frene sus cambios.",
      "C": "Habla con él, con María y con cualquiera que haya estado presente antes de juzgar, y fíjate en quién sale ganando si él pierde."
    },
    "why": "Hay una historia detrás de la historia: a veces quien acusa está defendiendo su territorio. Incluso la gente de confianza puede usar tu impulso por actuar como arma. Una forma segura de actuar mal es actuar con una sola versión.",
    "voice": "Una forma segura de tomar la acción equivocada es actuar con información incompleta o incorrecta.",
    "titleEn": "Never Act on One Side of a Story"
  },
  "BE-GM-23": {
    "title": "Atiéndelo mientras es pequeño",
    "scenario": "Domingo en la noche, tu capataz te escribe: el viernes una cuadrilla rozó una línea de gas en casa de los Henderson. No olieron nada, la taparon ellos mismos, no dijeron nada y terminaron el trabajo. La compañía de gas no la ha inspeccionado. El cliente está contento y ya publicó una reseña excelente. Llamar implica una conversación incómoda, una visita de la compañía de gas y quizá rehacer un muro.",
    "options": {
      "A": "Llama al cliente y a la compañía de gas el lunes a primera hora, consigue la inspección, asúmelo y absorbe lo que cueste.",
      "B": "No digas nada; está tapada, está bien, y reabrir el tema solo genera alarma.",
      "C": "Manda al capataz de vuelta en silencio “a revisar su trabajo” sin decirle al cliente por qué."
    },
    "why": "Las crisis son problemas pequeños sobre los que alguien decidió sentarse. El silencio es la apuesta cómoda que crece hasta convertirse en la demanda, el titular, la licencia perdida. Asúmelo antes de que lo haga internet, o algo peor.",
    "voice": "Los buenos líderes reconocen cuando una mecha está encendida y actúan de inmediato.",
    "titleEn": "Handle It While It's Small"
  },
  "BE-GM-24": {
    "title": "La cultura es lo que pasa cuando el jefe se va",
    "scenario": "Tu regla de “cero chismes” está publicada en la pared. Tu mejor instalador —las manos más rápidas, los clientes lo adoran, agenda llena— también es la máquina de chismes del taller; ya lo has escuchado dos veces hablando pestes de un ayudante nuevo, y el ayudante parece a punto de renunciar. El último al que corregiste por chismoso fue un técnico junior. Todos están mirando qué pasa cuando se trata de la estrella.",
    "options": {
      "A": "Déjalo pasar durante la temporada alta; ahora no puedes darte el lujo de incomodar a tu mejor productor.",
      "B": "Corrígelo en privado, con el mismo estándar que al técnico junior y consecuencias claras si continúa, sea estrella o no.",
      "C": "Vuelve a anunciar la política de cero chismes en la próxima reunión sin nombrar a nadie."
    },
    "why": "La cultura es lo que pasa cuando sales del edificio, y una sola falta tolerada reescribe las reglas reales para todos. El anuncio sin nombres le dice al taller que la estrella está exenta, y esa es la lección que se quedará.",
    "voice": "Un ambiente al que no le gusta la mediocridad pero la acepta obtiene mediocridad.",
    "titleEn": "Culture Is When the Boss Leaves"
  },
  "BE-GM-25": {
    "title": "Hablar sin miedo",
    "scenario": "Tus últimas tres buenas ideas fracasaron en silencio, y cada vez te enteraste con meses de retraso. En la reunión de gerentes de hoy propusiste un nuevo plan de comisiones y obtuviste seis gestos de aprobación y cero preguntas. Más tarde escuchas a dos gerentes en el patio enumerando exactamente por qué no va a funcionar. Ninguno dijo una palabra en la sala. Uno de ellos solía cuestionarte hace años, hasta una reunión en la que hiciste pedazos su idea.",
    "options": {
      "A": "Enfrenta a los dos gerentes por hablar a tus espaldas.",
      "B": "Pídele a tu cuñado, que es gerente, que sea tus ojos y te cuente lo que la gente realmente piensa.",
      "C": "Asume el silencio que creaste: reconoce el momento en que hiciste pedazos aquella idea, pregúntale en privado a cada gerente “¿qué tiene de malo mi plan?” y recompensa la primera respuesta dura."
    },
    "why": "Entre más alto subes, peor es la retroalimentación que recibes, y tú les enseñaste a callar. Castigar la conversación del patio sella la bóveda; una red de espías es un parche para una confianza que tienes que reconstruir tú mismo.",
    "voice": "¿Qué puedo empezar a hacer, dejar de hacer y seguir haciendo para ser mejor para ti?",
    "titleEn": "Safe to Speak"
  },
  "BE-GM-26": {
    "title": "Un solo departamento: servicio al cliente",
    "scenario": "Guerra abierta: producción dice que ventas “promete calendarios de fantasía para cerrar negocios”; ventas dice que producción “mata las recomendaciones con entregas descuidadas”. Un cliente acaba de quedar atrapado en el fuego cruzado: le dieron dos fechas de inicio distintas con una semana de diferencia. Tus gerentes de ventas y de producción quieren reunirse contigo por separado para culparse el uno al otro.",
    "options": {
      "A": "Mete a los dos gerentes en una misma sala: aquí hay un solo departamento, servicio al cliente. Construyan juntos el estándar compartido de entrega y una reunión semanal conjunta.",
      "B": "Reúnete con cada uno por separado, escucha ambas versiones y decide quién tiene la razón.",
      "C": "Agrega un puesto de coordinador que se siente entre los dos departamentos."
    },
    "why": "El “nosotros contra ellos” es la enfermedad; hacerle de árbitro o contratar un amortiguador la alimenta. Lo que produce cada engranaje es el insumo del siguiente: se sirven entre sí o el cliente paga. El que unifica hace desaparecer las líneas.",
    "voice": "No importa dónde trabajes, hay un solo departamento: el departamento de servicio al cliente.",
    "titleEn": "One Department: Customer Service"
  },
  "BE-GM-27": {
    "title": "Sirve a la persona, no a la casa",
    "scenario": "Día de acompañamiento en campo. Tu mejor cuadrilla termina un trabajo en un espacio bajo la casa técnicamente perfecto, y ves cómo pasan tres veces junto a la propietaria, una viuda de 80 años, sin decirle una palabra. Ella los sigue con preguntas; ellos responden con gruñidos, recogen y se van. El trabajo es impecable. Ella se ve alterada. Tu capataz se encoge de hombros: “El trabajo quedó bien, ¿no?”.",
    "options": {
      "A": "Déjalo pasar; ella pagó por un trabajo impecable, y estos muchachos producen.",
      "B": "Orienta a la cuadrilla esa noche: el cliente es la persona, no la casa; luego entrena como estándar los saludos, las visitas para ver cómo va y el recorrido final.",
      "C": "Mándale una tarjeta de regalo para suavizarlo y sigue adelante."
    },
    "why": "El mismo producto con distinto servicio da dos resultados distintos. Ella no puede juzgar el espacio bajo la casa; puede juzgar cómo la trataron, y eso es lo que les va a contar a sus vecinos. La tarjeta de regalo parcha un síntoma y no capacita a nadie.",
    "voice": "No le damos servicio a una casa; le damos servicio a un ser humano que es dueño de esa casa.",
    "titleEn": "Serve the Human, Not the House"
  },
  "BE-GM-28": {
    "title": "¡Wow! es el estándar",
    "scenario": "Tu costo por prospecto subió poco a poco hasta $310 y tu gerente de marketing quiere otros $40K para anuncios. Al revisar los números, notas que los prospectos por recomendación —casi gratis, y que cierran al doble— bajaron del 30% del volumen al 12% en dos años, el mismo periodo en que tus llamadas de seguimiento después del trabajo y los pequeños detalles extra murieron en silencio porque estabas ocupado.",
    "options": {
      "A": "Aprueba los $40K; un prospecto es un prospecto y la temporada se acerca.",
      "B": "Baja los precios para convertir a más de los prospectos caros.",
      "C": "Reconstruye primero el motor del ¡Wow! —llamadas de seguimiento, detalles extra, programa de recomendaciones— y vuelve a hacer de superar expectativas el estándar que se mide."
    },
    "why": "La rueda gira así: ¡Wow! → recomendaciones → prospectos más baratos → mejores márgenes → mejor gente. Estás pagando $40K para correr más rápido que una rueda rota. Los clientes que solo quedan satisfechos no se lo cuentan a nadie; los encantados son tu departamento de marketing más barato.",
    "voice": "Los clientes satisfechos lo consideran una transacción justa y no se lo cuentan a nadie: encántalos para que se vuelvan discípulos que recomiendan.",
    "titleEn": "Wow! Is the Standard"
  },
  "BE-GM-29": {
    "title": "La experiencia es la mitad del producto",
    "scenario": "Hacer de cliente incógnito con tu propia empresa te deja inquieto: contestaron el teléfono al sexto timbre, el correo de confirmación tenía un error, el vendedor fue excelente, la cuadrilla llegó 40 minutos antes y encontró a la clienta en bata, sorprendida, y nadie llamó después de terminar. Cinco puntos de contacto, uno bueno. Tus instalaciones en sí son genuinamente excelentes.",
    "options": {
      "A": "Comparte los hallazgos y dile a cada departamento que mejore su parte.",
      "B": "Mapea cada Momento de la Verdad de principio a fin, diseña a propósito lo que pasa en cada uno, y capacita y mide.",
      "C": "Enfócate en la calidad de la instalación; ese es el producto por el que realmente pagan."
    },
    "why": "Los clientes no pueden juzgar la instalación; juzgan la experiencia y deducen de ella el trabajo, y juntan cada punto de contacto en un solo veredicto. “Mejoren” sin diseño deja la experiencia en manos de quien conteste el teléfono.",
    "voice": "Cualquiera puede hacer el trabajo, pero no cualquiera brinda una gran experiencia al cliente.",
    "titleEn": "The Experience Is Half the Product"
  },
  "BE-GM-30": {
    "title": "Los problemas son pruebas",
    "scenario": "Sábado, 7:40 a. m., suena tu celular: un trabajo de sótano de $30K del mes pasado está goteando sobre una alfombra nueva, y la clienta está alterada, quizá siendo injusta; tu capataz jura que la filtración viene de su canaleta, no de tu sistema. Tu técnico de servicio está libre hasta el martes. Ella amenaza con una reseña. Tu fin de semana iba a ser para el torneo de tu hijo.",
    "options": {
      "A": "Consigue que alguien vaya hoy —tú mismo si hace falta—; primero arregla y después aclaren de quién fue la culpa.",
      "B": "Explícale con calma que probablemente son sus canaletas y agéndala en el primer horario del martes.",
      "C": "Ofrécele por teléfono un crédito de buena voluntad de $500 y programa una visita durante la semana."
    },
    "why": "Los problemas son pruebas, y la rapidez es la disculpa: “hoy” dice que te estás encargando; “el martes” dice que lo estás esquivando. Tener o no la razón es irrelevante en la primera hora; un cliente atendido rápido a menudo recomienda más que uno que nunca tuvo un problema.",
    "voice": "La única versión de la historia que cuenta es la del cliente.",
    "titleEn": "Problems Are Tests"
  },
  "BE-GM-31": {
    "title": "Clientes para toda la vida",
    "scenario": "Reunión de presupuesto. Te quedan $25K para el año. Opción uno: una ofensiva de anuncios para clientes nuevos a unos $250 por prospecto. Opción dos: la propuesta de tu gerente de servicio, un programa anual de mantenimiento e inspección que contacte a los 3,100 clientes anteriores, que hoy nunca vuelven a saber de ti después del pago final. Tu gerente de marketing llama a los clientes anteriores “negocios cerrados”.",
    "options": {
      "A": "Divide el dinero para tener contentos a los dos gerentes.",
      "B": "Elige la ofensiva; el crecimiento viene de nombres nuevos en el embudo.",
      "C": "Financia el programa de contacto anual; los clientes anteriores son oro que ya pagaste por extraer."
    },
    "why": "Los clientes anteriores te conocen, confían en ti, no cotizan con otros y cuesta una fracción volver a activarlos, y la visita anual genera prospectos, recomendaciones y reseñas para siempre. Llamarlos “negocios cerrados” es la forma de dejar que el oro se vaya con tu competidor.",
    "voice": "Tienes una opción: dejarlos ir o conservarlos para siempre.",
    "titleEn": "Keep Customers for Life"
  },
  "BE-GM-32": {
    "title": "Vender es ayudar",
    "scenario": "Tu técnico de servicio comenta que, en una visita de mantenimiento, notó que el sistema de sumidero de la clienta tiene quince años y está a una tormenta de fallar, pero no dijo nada porque “no soy vendedor y no quería parecer insistente”. Dos semanas después se inunda el sótano de esa clienta. Llama molesta: “Tu muchacho acaba de estar aquí. ¿Por qué no me dijo nada?”.",
    "options": {
      "A": "Aprieta el procedimiento: los técnicos le reportan los hallazgos a la oficina y ventas decide a quién contactar.",
      "B": "Enséñales a todos que informar a los clientes de problemas reales ES la ayuda, pidiendo permiso y mostrando el problema, nunca presionando.",
      "C": "Orienta al técnico en privado y discúlpate con la clienta con un descuento."
    },
    "why": "Todos venden, y no decírselo fue robarle, no respetarla. El técnico dentro de la casa tiene más credibilidad que cualquier vendedor. Cambiar el procedimiento entierra el momento de confianza en papeleo.",
    "voice": "¡Véndeles! ¡Es lo correcto para todos!",
    "titleEn": "Selling Is Helping"
  },
  "BE-GM-33": {
    "title": "Nunca prejuzgues",
    "scenario": "El tablero del lunes tiene dos citas y una entrevista. Prospecto uno: una casa de campo con la reja oxidada que tu vendedor quiere saltarse: “No pueden pagarnos; dame mejor la casa del lago”. La entrevista: un candidato que lleva nueve años manejando un montacargas, sin experiencia en la industria, cuya carta de presentación es lo más hambriento que has leído en todo el año. Tu gerente de ventas quiere cancelar la casa de campo y saltarse la entrevista.",
    "options": {
      "A": "Atiende el prospecto de la casa de campo con todo el esfuerzo y haz la entrevista; juzga a la gente por su comportamiento, no por la envoltura.",
      "B": "Confía en la lectura de tu vendedor; él conoce su territorio.",
      "C": "Manda al nuevo a la casa de campo para que tu cerrador se quede con la casa del lago."
    },
    "why": "Prejuzgar cambia tu comportamiento y causa el no: las casas de campo esconden grandes clientes y los operadores de montacargas esconden capataces. Los prospectos le pertenecen a la empresa, no a la opinión de un vendedor. La opción C sigue clasificando a los clientes por adivinanza.",
    "voice": "Cuando los vendedores juzgan quién va a comprar, su comportamiento cambia y hace que el cliente no compre.",
    "titleEn": "Never Pre-Judge"
  },
  "BE-GM-34": {
    "title": "Nunca des un precio antes de construir valor",
    "scenario": "Una propietaria te llama directamente —amiga de un cliente anterior—: “Ya tengo tres cotizaciones. Solo dame tu cifra por teléfono; si estás cerca, te quedas con el trabajo”. Tu cotización estaría alrededor de un 20% por encima de las que te leyó. Febrero está lento, las cuadrillas tienen huecos y tu vendedor nuevo te susurra: “Iguala la cotización de en medio y asegúralo”.",
    "options": {
      "A": "Dale ahora la cifra aproximada con un descuento por teléfono; es temporada lenta, llena a la cuadrilla.",
      "B": "Mantente firme: nada de precio antes de la inspección y la presentación. Gánate la cita, construye el valor y siéntete orgulloso de la cifra.",
      "C": "Recházala con cortesía; si ya tiene tres cotizaciones, solo busca precio y no es tu clienta."
    },
    "why": "Un precio sin valor construido es solo un número que superar: una vez que lo tiene, ya no te necesita. La empresa HVLR explica el precio una vez en lugar de disculparse por la calidad para siempre. Retirarte es prejuzgar a un prospecto recomendado.",
    "voice": "Preferimos explicar el precio una vez que disculparnos por la calidad para siempre.",
    "titleEn": "Never Price Before Value"
  },
  "BE-GM-35": {
    "title": "Da seguimiento para siempre",
    "scenario": "Tu auditoría del CRM encuentra 214 propuestas no vendidas de los últimos 18 meses —unos $1.6M de trabajo— intactas desde el primer “déjame pensarlo” de cada una. Tus vendedores llaman “rogar” al seguimiento y prefieren prospectos nuevos. Los datos de la industria colgados en tu pared dicen que la mayoría de esos propietarios le compró, o le comprará, a alguien en menos de seis meses.",
    "options": {
      "A": "Haz una ofensiva de una semana con las 50 más recientes y archiva el resto.",
      "B": "Archívalas; los prospectos viejos avergüenzan a la marca, invierte hacia adelante en nuevos.",
      "C": "Construye un sistema de seguimiento para siempre: rol de Hunter, calendario, guiones con información nueva, ningún expediente cerrado jamás."
    },
    "why": "El competidor más peligroso es el que nunca se rinde: cada propuesta no vendida es oro ya pagado que cosecha quien llame. Una ofensiva es un evento; la persistencia es una identidad, y la identidad se construye dentro de los sistemas.",
    "voice": "Seguiré dando seguimiento, para siempre, hasta que se haga la venta.",
    "titleEn": "Follow Up Forever"
  },
  "BE-GM-36": {
    "title": "El efectivo es vida",
    "scenario": "El mejor trimestre de tu carrera: $380K de utilidad en papel. El dueño te reenvía la oferta preaprobada del banquero de una línea de crédito de $250K “para crecer de forma agresiva” y te pide tu recomendación; ya está hablando de un gran retiro de fin de año, y tú quieres un camión nuevo y dos contrataciones. Pero las cuentas por cobrar están infladas, el Spread es más delgado que el año pasado y la temporada baja empieza en nueve semanas.",
    "options": {
      "A": "Recomienda tomar la línea y dile al dueño que se ganó el gran retiro; una utilidad en papel de ese tamaño cubre ambas cosas.",
      "B": "Recomienda cobrar las cuentas pendientes, construir un fondo de reserva para el invierno y, como mucho, un retiro modesto, y dejar la línea de crédito sin firmar.",
      "C": "Recomienda tomar la línea de crédito, pero solo como “seguro de emergencia”."
    },
    "why": "La quiebra es quedarse sin efectivo; no sin ingresos, ni siquiera sin utilidades. Una utilidad en papel con cuentas por cobrar infladas y un Spread cada vez más delgado es una advertencia, no un bono. El crédito fácil antes del invierno es la trampa cómoda.",
    "voice": "NO GASTES MÁS DE LO QUE ENTRA. ¡Y punto!",
    "titleEn": "Cash Is Life"
  },
  "BE-GM-37": {
    "title": "Conoce tus números",
    "scenario": "En una comida, tu contador te hace una pregunta sencilla: “¿Cuál es tu punto de equilibrio mensual?”. Adivinas una cifra. Él hace una mueca: te equivocaste por $60K. Tampoco puedes decir tu margen neto ni el ADL por vendedor sin llamar a la oficina. Mientras tanto, estás a punto de recomendarle al dueño que firme un arrendamiento de $4,200 al mes por un taller más grande porque “últimamente nos va de maravilla”.",
    "options": {
      "A": "Detente. Calcula primero el punto de equilibrio, el margen neto y la Calculadora de Efectivo, y luego juzga el arrendamiento por lo que le hace a esos números.",
      "B": "Saca adelante el arrendamiento; el impulso es real, y el problema de espacio también.",
      "C": "Pásale la pregunta de los números al contador; para eso le pagas."
    },
    "why": "Crecer sin vigilar los números es pisar el acelerador con los ojos cerrados. Cada dólar de costo fijo mueve el punto de equilibrio y hay que pagarlo con trabajo instalado. Tu contador arma los números; solo quien dirige la empresa puede guiarse por ellos.",
    "voice": "Estar ocupado haciendo crecer la empresa sin vigilar los números es como pisar el acelerador y cerrar los ojos.",
    "titleEn": "Know Your Numbers"
  },
  "BE-GM-38": {
    "title": "Paga por lo que quieres que se repita",
    "scenario": "Les pagas a las cuadrillas por hora, y los trabajos misteriosamente se estiran hasta llenar la semana: las horas extra se están comiendo el margen. Tu contadora redacta una solución: pagarles a los capataces un porcentaje del valor del contrato terminado. Tu capataz más veterano gruñe: “¿O sea que nos vas a bajar la paga cuando llueva?”. También notas que el bono de tus vendedores recompensa los ingresos vendidos, no los trabajos que realmente resultan rentables al costearlos.",
    "options": {
      "A": "Agrega un supervisor que vigile a las cuadrillas y aprieta las hojas de horas.",
      "B": "Descarta la idea; la resistencia del capataz no vale la pelea.",
      "C": "Haz una prueba piloto de pago por desempeño de 2 a 4 semanas con un mínimo por hora, pregúntate primero “¿cómo podrían hacerle trampa?” y alinea los bonos de ventas con los trabajos rentables."
    },
    "why": "Cuando pagas por horas, obtienes horas. La vigilancia pelea contra los incentivos en lugar de arreglarlos. Un pago por desempeño probado en piloto, con mínimo garantizado y a prueba de trampas, hace que la cuadrilla quiera lo mismo que tú: así se duplica la producción sin rotación.",
    "voice": "Cuando le pagas a la gente por hora… eso es lo que obtienes: horas.",
    "titleEn": "Pay for What You Want Repeated"
  },
  "BE-GM-39": {
    "title": "Sistemas, no héroes",
    "scenario": "Dave maneja tu producción como un mago: los horarios en su cabeza, tratos con proveedores de palabra y cuadrillas que solo le responden a él. Nada está por escrito. Es un héroe, y lo sabe: cuando le pediste documentar el proceso de programación, se rió: “¿Para qué? No me voy a ningún lado”. El mes pasado estuvo enfermo tres días y la producción prácticamente se detuvo.",
    "options": {
      "A": "Dale un aumento a Dave y reza para que siga sano y leal.",
      "B": "Hazlo innegociable, con respeto: cada engranaje tiene un proceso documentado, un respaldo con nombre y KPI, empezando por el de Dave y construido con Dave.",
      "C": "Contrata en silencio a un segundo gerente de producción para que aprenda mirándolo."
    },
    "why": "Un negocio que vive en la cabeza de un héroe no es una máquina: es una situación de rehenes con un buen tipo. La contratación en la sombra evita la conversación y divide a la cuadrilla. Construye el sistema con el héroe, y hónralo dentro de él.",
    "voice": "Si todos se fueran, ¿cuánto valdría entonces tu patrimonio?",
    "titleEn": "Systems, Not Heroes"
  },
  "BE-GM-40": {
    "title": "Cómo hacemos cualquier cosa es cómo lo hacemos todo",
    "scenario": "Son las 6:50 p. m. y eres el último en salir. Al recorrer el taller ves las cosas pequeñas: un letrero de jardín con una letra despegada todavía en la pila de instalación, los vasos de café de ayer en la sala de exhibición, un camión de demostración con tu logo y un espejo roto, una nota adhesiva de las 11 a. m. que dice “le devolvemos la llamada”. Nadie te culparía por irte a casa: son problemas de $500, y mañana es un gran día de instalación.",
    "options": {
      "A": "Quédate veinte minutos: quita el letrero malo, haz la llamada pendiente, registra lo del espejo, y haz de los estándares en las cosas pequeñas el primer tema de la reunión de mañana.",
      "B": "Vete a casa; los líderes no deberían preocuparse por detalles de $500, ya lo mencionarás algún día.",
      "C": "Fotografía todo y mándales esta noche la lista por correo a los gerentes para que se encarguen."
    },
    "why": "La excelencia en los asuntos pequeños es donde los grandes fracasos no logran germinar, y el líder la modela o no existe. El correo delega los síntomas pero se salta el ejemplo; el equipo aprende de lo que haces, no de lo que reenvías.",
    "voice": "Cómo hacemos cualquier cosa es cómo lo hacemos todo. Somos damas y caballeros al servicio de damas y caballeros, en todo momento.",
    "titleEn": "How We Do Anything Is How We Do Everything"
  },
  "BE-OW-01": {
    "title": "La sombra alargada",
    "scenario": "Los informes de tus gerentes del lunes son puro sol, hasta que llegan los números reales y febrero resulta más feo de lo que nadie admitió. Anoche te sorprendiste haciendo lo mismo: redondeando hacia arriba los ingresos para el banquero, diciéndole a tu pareja que la temporada lenta está “bien”. Tu gerente general por fin lo dice en voz alta: “En este edificio nadie dice toda la verdad, jefe. Incluido el piso de arriba”.",
    "options": {
      "A": "Contrata a un consultor de cultura para que dé talleres de honestidad y corrija el hábito de los informes en toda la empresa.",
      "B": "Asúmelo: el maquillaje empezó contigo. Empieza a decir toda la verdad —al banco, al equipo, a ti mismo— y dilo en público.",
      "C": "Aprieta los controles: exige que cada gerente certifique sus números por escrito cada lunes."
    },
    "why": "La empresa es el reflejo del dueño; nunca será más honesta que su líder. Los consultores y las certificaciones tratan la sombra; solo quien la proyecta puede cambiar su forma.",
    "voice": "Si la gente no le cree al mensajero, no le creerá al mensaje.",
    "titleEn": "The Elongated Shadow"
  },
  "BE-OW-02": {
    "title": "Mereces tus resultados",
    "scenario": "Tercer año estancado. En la cena de la asociación culpas al mercado laboral y a “los que solo buscan precio”. Luego tu gerente general te entrega el expediente incómodo: dos competidores locales crecieron un 30%, tus precios no se han movido desde 2022, el presupuesto de marketing es la misma cifra que fijaste hace cinco años y nadie ha ido a una capacitación desde el COVID. Cada una de esas decisiones lleva tus iniciales.",
    "options": {
      "A": "Acéptalo: el mercado te dio exactamente lo que merecías. Cambia los insumos que son tuyos: precios, presupuesto, capacitación, tú.",
      "B": "Mantén el rumbo; los mercados son cíclicos, y los buenos años siempre regresan para los operadores pacientes.",
      "C": "Reemplaza al gerente de marketing; los números de prospectos le tocaba entregarlos a él."
    },
    "why": "La responsabilidad total es la primera ley del dueño. Los competidores enfrentaron el mismo mercado y crecieron; la diferencia fueron los insumos, y cada insumo era tuyo.",
    "voice": "Todo pasa por una razón. Cambia las razones y cambiarás lo que pasa.",
    "titleEn": "You Deserve Your Results"
  },
  "BE-OW-03": {
    "title": "El dolor es combustible",
    "scenario": "Hace diez años una contadora te robó $60,000. Desde entonces firmas cada cheque, apruebas cada compra y abres el portal del banco antes del café. A cada gerente nuevo le cuentas la historia del robo como la razón. Hoy tu nuevo gerente general pide autoridad para compras de hasta $5,000, y sientes que se te aprieta el pecho antes de que termine la frase.",
    "options": {
      "A": "Niégate, y vuelve a contarle la historia para que entienda por qué tiene que ser así.",
      "B": "Dale autoridad total sin controles, para demostrarle a todos que ya lo superaste.",
      "C": "Convierte el dolor en combustible: crea controles dobles, dale la autoridad y retira la historia del robo como tu sistema operativo."
    },
    "why": "La historia es veneno o combustible; tú eliges. El combustible se ve como sistemas más inteligentes y una empresa más grande, no como una herida de hace diez años firmando cada cheque.",
    "voice": "Tu dolor puede ser tu veneno o tu combustible; tú eliges.",
    "titleEn": "Pain Is Fuel"
  },
  "BE-OW-04": {
    "title": "Sé una máquina de aprender",
    "scenario": "Tu gerente general escucha audios en su camión, acaba de terminar un curso de finanzas y en la reunión del martes te citó un libro, correctamente. Tú no has terminado un libro en dos años; has estado “demasiado ocupado dirigiendo las cosas”. Últimamente sus ideas son mejores que las tuyas y los gerentes lo saben. Una parte de ti está orgullosa. Otra parte quiere recordarle a la sala de quién es el nombre que está en el edificio.",
    "options": {
      "A": "Reafírmate: recupera algunas decisiones clave para que todos recuerden quién es el dueño.",
      "B": "Hazte a un lado satisfecho; ahora la máquina está aprendiendo, así que el dueño ya no tiene que hacerlo.",
      "C": "Ponte a su nivel: arma tu propio plan de estudio —libros, un mentor, un grupo de colegas—. La empresa no puede crecer más que tú."
    },
    "why": "Trabaja más en ti mismo que en tu trabajo. Un dueño que deja de aprender se convierte en el techo de la empresa; un dueño que se siente amenazado por el crecimiento se convierte en su enemigo.",
    "voice": "Lo que es fácil de hacer es fácil de no hacer.",
    "titleEn": "Be a Learning Machine"
  },
  "BE-OW-05": {
    "title": "Brillante en lo básico",
    "scenario": "Tú mismo creaste el ritmo: reunión de gerentes el lunes, revisión semanal del marcador, reunión mensual uno a uno con el gerente general. Luego empezaron a llegar “cosas grandes” —el banco, una demanda, un lío con un proveedor— y te has saltado cinco de los últimos ocho lunes. Esta semana tu gerente general también canceló una, “ya que siempre sale algo”. El marcador del pasillo tiene tres semanas sin actualizarse.",
    "options": {
      "A": "Vuelve a comprometerte sin excepción; la asistencia del dueño es lo que hace que lo básico sea innegociable para todos los demás.",
      "B": "Entrégale al gerente general todas las reuniones para siempre, para que el ritmo nunca dependa de tu agenda.",
      "C": "Reemplaza las reuniones con un tablero semanal por escrito; la misma información en menos tiempo."
    },
    "why": "El dueño modela las disciplinas simples sin falta, o nadie más lo hará. El primer lunes que te saltaste le enseñó a la empresa qué es realmente opcional.",
    "voice": "¡Deja que los hábitos te lleven a los resultados!",
    "titleEn": "Brilliant on the Basics"
  },
  "BE-OW-06": {
    "title": "Primero define la realidad",
    "scenario": "Llega la comparación anual de tu grupo de colegas: cuartil inferior en margen neto, mitad inferior en prospectos por dólar de marketing, último lugar en retención de empleados. Alrededor de la mesa, dueños de mercados más pequeños presentan mejores números. Tu borrador de respuesta explica por qué tu condado es diferente. Tu mano ya va por el discurso de “nuestro mercado es único” que has dado antes.",
    "options": {
      "A": "Encarga tu propio estudio regional que demuestre por qué estas comparaciones no aplican a tu mercado.",
      "B": "Acepta la comparación como tu posición real, pregúntate qué porcentaje es culpa tuya y ataca primero la peor brecha.",
      "C": "Sal discretamente del grupo de colegas; las comparaciones desmoralizan y de todos modos tu equipo nunca las ve."
    },
    "why": "No puedes trazar un rumbo sin fijar con honestidad tu posición, en el negocio y en ti mismo. El estudio del “mercado único” es una defensa del ego con bata de laboratorio.",
    "voice": "¿Qué porcentaje de la culpa de los problemas que tienes es tuyo?",
    "titleEn": "Define Reality First"
  },
  "BE-OW-07": {
    "title": "Todo se crea dos veces",
    "scenario": "El sueño de la segunda sucursal de pronto es real: hay un edificio en venta en el condado de al lado, tu gerente general está entusiasmado y el agente dice que otro comprador está rondando. Tienes una estimación de ingresos, una corazonada y una carpeta vacía: sin plan de personal, sin cálculo de prospectos, sin modelo financiero, sin un dibujo de cómo se vería siquiera “terminado”.",
    "options": {
      "A": "Constrúyelo primero en papel —modelos funcional, financiero y físico— antes de firmar nada. Pierde el edificio si es necesario.",
      "B": "Asegura hoy el edificio con un depósito; una propiedad tan buena no espera a las hojas de cálculo.",
      "C": "Pide al gerente general que redacte un plan en paralelo mientras tu abogado negocia la compra."
    },
    "why": "Todo se crea dos veces: una vez en la mente y otra en la realidad. Una sucursal construida antes de modelarla es solo una forma cara de descubrir el modelo.",
    "voice": "Tienes que tener un sueño para hacer realidad un sueño.",
    "titleEn": "Created Twice"
  },
  "BE-OW-08": {
    "title": "El poder del porqué",
    "scenario": "En tu escritorio hay una carta de un grupo consolidador: dinero real por la empresa. Esa misma semana, tu banquero traza un plan a cinco años para duplicarla en lugar de venderla. Llevas un mes cambiando de opinión cada noche: vender, crecer, vender, crecer. Por fin tu pareja te hace la pregunta que te deja helado: “¿Cómo quieres que sea tu vida a los sesenta?”. No tienes respuesta.",
    "options": {
      "A": "Acepta la oferta; la certeza le gana a las hojas de cálculo, y más vale pájaro en mano para financiar cualquier futuro.",
      "B": "Modela la valuación a cinco años de ambos caminos y deja que la cifra más grande decida.",
      "C": "Detente. Escribe primero tus metas personales —ingresos, satisfacción, familia— y deja que ese porqué elija entre los caminos."
    },
    "why": "Las metas personales van primero; el negocio es el vehículo, no el destino. Sin el porqué, ambos caminos son solo caminadoras con formas distintas.",
    "voice": "Si no hay un porqué, el cómo no importa.",
    "titleEn": "Why Power"
  },
  "BE-OW-09": {
    "title": "El negocio sirve a su dueño",
    "scenario": "Después de treinta años, la empresa por fin funciona: un buen gerente general, márgenes sólidos, un fondo de reserva real. Y tú sigues llegando primero a las 6 a. m., sigues atendiendo llamadas de servicio los sábados, sigues perdiéndote los partidos de tu nieta. La semana pasada te sorprendiste inventando una razón para ir un domingo. Tu pareja te pregunta en voz baja: “¿Cuándo empieza a ser para nosotros?”.",
    "options": {
      "A": "Vende la empresa; está claro que es la única forma en que de verdad vas a parar.",
      "B": "Rediseña tu papel a propósito: quédate solo con el trabajo que te encanta, agenda primero la vida y deja que la máquina que construiste haga su trabajo.",
      "C": "Reduce a cuatro días, pero mantén el teléfono encendido para cada problema que escale, por si acaso."
    },
    "why": "El negocio debe darle a su dueño más vida, no menos. Una máquina que funciona sin ti no vale nada si nunca la dejas funcionar.",
    "voice": "Quieres que tu negocio te dé más vida, no que te quite más vida.",
    "titleEn": "The Business Serves Its Owner"
  },
  "BE-OW-10": {
    "title": "Haz lo correcto aunque te cueste",
    "scenario": "En enero le prometiste a toda la empresa: si llegan a $4.2M instalados para fin de año, todos se reparten una bolsa de bonos de $40,000. Lo lograron, y luego un desastre de garantía en diciembre se comió la utilidad que iba a financiarla. Pagar significa saltarte tu propio retiro del primer trimestre y meter mano al fondo de reserva. Tu contador señala que la promesa decía “instalados”, pero un abogado podría alegar la intención.",
    "options": {
      "A": "Paga cada dólar, a tiempo, de tu propio retiro si hace falta, y diles exactamente cuánto costó.",
      "B": "Paga la mitad ahora y la otra mitad “cuando se recupere el efectivo”, con una explicación sentida.",
      "C": "Apóyate en la letra pequeña: siempre se entendió que los bonos requerían rentabilidad."
    },
    "why": "Cumple tu palabra cuando sale cara: es el único momento en que cuenta. El equipo alcanzó la cifra que tú pusiste; la pérdida por garantía es tu lección, no la de ellos.",
    "voice": "Haz lo correcto aunque cueste más, y al final sale mejor para todos.",
    "titleEn": "Do Right When It Costs You"
  },
  "BE-OW-11": {
    "title": "Contratar te hace o te deshace",
    "scenario": "Por fin vas a contratar a tu primer gerente general de verdad: la contratación que decide si algún día recuperas tu vida. Opción uno: tu leal gerente de oficina de catorce años, que lo sabe todo y costaría menos. Opción dos: un operador muy pulido de un competidor de $20M, disponible ahora pero recibiendo otras ofertas. Te tienta decidir esta semana y terminar con el asunto.",
    "options": {
      "A": "Asciende a la leal persona de casa; la cultura lo es todo, y ella se lo ganó.",
      "B": "Muévete rápido con el operador de fuera antes de que otra empresa se lo lleve.",
      "C": "Haz el proceso más riguroso de tu vida: define el puesto, entrevistas a fondo, referencias, sesiones de trabajo; con cada candidato, sin atajos."
    },
    "why": "El gerente general es la contratación con más palanca que un dueño hace jamás. La lealtad y la rapidez son atajos, y los atajos en este puesto se acumulan durante una década.",
    "voice": "Tienes el equipo que mereces.",
    "titleEn": "Hiring Makes You or Breaks You"
  },
  "BE-OW-12": {
    "title": "Carácter antes que habilidad",
    "scenario": "Tu finalista para gerente general es deslumbrante: cuadruplicó su última empresa, conoce tu industria al dedillo, las referencias brillan. Luego, en la cena, se ríe de haber guardado una copia de la lista de clientes de su antiguo empleador “como palanca” y menciona el acuerdo de no competencia al que le encontró la vuelta. Podría empezar el lunes. El puesto lleva siete meses vacío y te está desangrando.",
    "options": {
      "A": "Contrátalo con un contrato a prueba de todo, una cláusula de no competencia más estricta y supervisión cercana.",
      "B": "Descártalo, sin importar cuánto tiempo siga vacío el puesto; en el nivel de liderazgo, una falla de carácter es fatal.",
      "C": "Tráelo con una prueba de 90 días y vigílalo de cerca."
    },
    "why": "Lo que les hizo a ellos te lo hará a ti. Las brechas de habilidad se pueden entrenar; una falla de carácter en la segunda silla tarde o temprano le cuesta a toda la empresa.",
    "voice": "La actividad oculta siempre se descubre.",
    "titleEn": "Character Over Skill"
  },
  "BE-OW-13": {
    "title": "¡Claro que sí!, o no",
    "scenario": "Cinco meses buscando al gerente que dirigirá tu nueva sucursal, y el embudo produjo un solo finalista. Es competente, las referencias se confirman, el salario funciona, y en la entrevista final se encogió de hombros: “Es un trabajo como cualquier otro”. El lanzamiento es en ocho semanas, el arrendamiento está firmado y reiniciar la búsqueda significa retrasarlo todo y explicar por qué.",
    "options": {
      "A": "Sigue buscando: reinicia el embudo y retrasa el lanzamiento si hace falta. Nunca te conformes en un puesto clave.",
      "B": "Contrátalo y arma un paquete de incentivos generoso para fabricar el hambre que le falta.",
      "C": "Contrátalo como “interino” mientras sigues buscando en silencio."
    },
    "why": "Los jugadores A contratan jugadores A; un líder tibio construye una sucursal tibia. La presión del calendario es real, y es exactamente la forma en que los dueños se convencen de quedarse con jugadores B.",
    "voice": "Quedarte con las personas equivocadas es morir lentamente.",
    "titleEn": "Hell Yeah, or No"
  },
  "BE-OW-14": {
    "title": "La persona correcta en el puesto correcto",
    "scenario": "Sé honesto: eres un vendedor de clase mundial y un gerente de operaciones mediocre. Llevas seis años en el puesto de operaciones “para ahorrarte el sueldo”: la programación es un caos, los márgenes se desvían y los capataces hacen lo que quieren. El mejor cerrador de la empresa está sentado en tu oficina haciendo mal los horarios mientras el equipo de ventas rinde por debajo. Tu contador dice que los errores de operaciones te costaron $90K el año pasado.",
    "options": {
      "A": "Toma un curso de gestión de operaciones y esfuérzate hasta ser bueno en eso.",
      "B": "Divide las operaciones de manera informal entre tus dos capataces más experimentados y mantente involucrado a distancia.",
      "C": "Reconoce que el dueño está en el puesto equivocado: contrata a un verdadero líder de operaciones para tu debilidad y muévete a donde eres de clase mundial."
    },
    "why": "Contrata para tus debilidades; no tienes que volverte bueno en ellas. El empleado en el puesto equivocado más caro de la empresa muchas veces es el dueño.",
    "voice": "Como emprendedor, son tus debilidades las que te frenan.",
    "titleEn": "Right Person, Right Seat"
  },
  "BE-OW-15": {
    "title": "Capacita o retira",
    "scenario": "Tu hijo, de 28 años, lleva dos años dirigiendo producción. Los plazos se incumplen, dos capataces corrigen sus horarios en silencio y tu gerente general por fin lo dijo: “Si tuviera otro apellido, habríamos actuado hace un año”. Has rehecho su trabajo de noche para que nadie lo vea. Es un buen muchacho. La prueba KWINK te mira de frente: sabiendo lo que ahora sabes, ¿lo pondrías hoy en ese puesto?",
    "options": {
      "A": "Sigue cubriéndolo; ya crecerá en el puesto, y la familia es para siempre.",
      "B": "Trátalo como a cualquier gerente al que quieres: expectativas reales, un plan de capacitación real, una fecha límite real, y otro puesto si no responde.",
      "C": "Sácalo por completo de la empresa para demostrar que no hay favoritismo."
    },
    "why": "Capacitar o retirar aplica a todos, sobre todo a la familia. Cubrirlo le roba su crecimiento, envenena la cultura y no es lealtad: es evasión con su nombre encima.",
    "voice": "Un ambiente al que no le gusta la mediocridad pero la acepta obtiene mediocridad.",
    "titleEn": "Train or Remove"
  },
  "BE-OW-16": {
    "title": "Tú no eres la puerta",
    "scenario": "Treinta años en el camión, y todavía tomas tú mismo los trabajos más difíciles en espacios bajo la casa: “Nadie lo hace como yo”. Este mes, mientras estabas debajo del porche de los Henderson, una decisión de precios esperó nueve días, dos candidatos de primer nivel aceptaron otras ofertas y tu gerente general no pudo localizarte. Tus rodillas ya no dan más, y el trabajo de sueldo está desplazando el único trabajo que paga $250 la hora.",
    "options": {
      "A": "Haz la transición: capacita a tus dos mejores jefes de cuadrilla en los trabajos difíciles y sácate para siempre de la lista de quienes hacen el trabajo.",
      "B": "Quédate solo con el 10% más difícil; te da credibilidad con las cuadrillas.",
      "C": "Contrata a un ayudante que trabaje contigo en esos trabajos para que salgan más rápido."
    },
    "why": "Trabaja por utilidades, no por sueldos. Los trabajos de “credibilidad” en realidad son comodidad: las cuadrillas necesitan a alguien que construya el negocio más que a una leyenda en un espacio bajo la casa.",
    "voice": "Los sueldos te dan para vivir; las utilidades te dan una fortuna.",
    "titleEn": "You Are Not the Door"
  },
  "BE-OW-17": {
    "title": "Delega, no abdiques",
    "scenario": "El gerente general que contrataste hace dos años es excelente, tan excelente que te has ido alejando hacia la casa del lago. No has revisado un balance general en cinco meses. Contrató a un gerente y despidió a otro sin llamarte, y la semana pasada te enteraste de que está reescribiendo la visión de la empresa para la reunión general de primavera. Todo parece bien. Sientes una pequeña alarma que sigues ignorando.",
    "options": {
      "A": "Mantente al margen; se ganó la autonomía total, y cuestionarlo ahora sería un insulto.",
      "B": "Regresa y retoma el control del día a día antes de que la empresa deje de ser tuya.",
      "C": "Vuelve a involucrarte en lo esencial que nunca debiste entregar —la visión, las decisiones sobre personas, la supervisión financiera— y déjale la operación diaria."
    },
    "why": "Delega la operación, nunca lo esencial: la visión, las crisis, las personas y el dinero. La alarma que estás ignorando es la diferencia entre delegar y abdicar.",
    "voice": "Delega la autoridad, conserva la responsabilidad.",
    "titleEn": "Delegate, Don't Abdicate"
  },
  "BE-OW-18": {
    "title": "Expectativas antes que rendición de cuentas",
    "scenario": "Estás redactando el despido de tu gerente general. Utilidad estancada dos años, dos gerentes que se fueron, y ya te hartaste. Luego buscas el estándar que no cumplió: no existe. Su “descripción de puesto” es un apretón de manos de 2023: “dirige el lugar”. Sin meta de utilidad, sin tablero de resultados, sin ritmo de revisiones. Él cree que lo está haciendo bien. Nunca le dijiste lo contrario; simplemente dejaste de hablar con él poco a poco.",
    "options": {
      "A": "Despídelo de todos modos; a ese nivel, los resultados deberían hablar por sí solos.",
      "B": "Define primero el puesto: resultados por escrito, números y un ritmo de revisiones. Reinicia el reloj y luego mantente firme.",
      "C": "Haz una evaluación de desempeño sin rodeos exponiendo dos años de decepciones acumuladas."
    },
    "why": "Las brechas en las expectativas causan brechas en la ejecución; no hay nada que se le acerque. Exigir cuentas sin expectativas no es liderazgo: es una emboscada, y la repetirías con el próximo gerente general.",
    "voice": "Las brechas en las expectativas llevan a brechas en la ejecución.",
    "titleEn": "Expectations Before Accountability"
  },
  "BE-OW-19": {
    "title": "Hazme sentir importante",
    "scenario": "Al limpiar un cajón del escritorio, encuentras una foto: el tablero del camión de un capataz con tu nota escrita a mano de 2016, “orgulloso de ti”, todavía pegada. Mientras tanto, tu gerente general actual sacó adelante a la empresa en un año brutal y nunca se lo has dicho; suponías que el sueldo era el mensaje. La semana pasada su esposa le contó a la tuya que él cree que estás decepcionado de él.",
    "options": {
      "A": "Dale un aumento; el dinero lo dice con más credibilidad que las palabras.",
      "B": "Pídele a Recursos Humanos que lance un programa de empleado del mes en toda la empresa.",
      "C": "Haz del reconocimiento una disciplina del dueño: empieza hoy con el gerente general —específico, personal, delante de otros— y no dejes que vuelva a decaer."
    },
    "why": "La gente hace más por reconocimiento que por dinero, y el elogio del dueño es el que más pesa. Una nota que escribiste en 2016 sigue pegada en un tablero: ese es el dato.",
    "voice": "Imagina que cada empleado lleva un letrero colgado del cuello que dice: “Hazme sentir importante”.",
    "titleEn": "Make Me Feel Important"
  },
  "BE-OW-20": {
    "title": "El amor es la mayor herramienta de liderazgo",
    "scenario": "Tu gerente general —estable durante seis años— se está desmoronando en silencio: un divorcio, reuniones a las que falta, un arranque de mal genio con un capataz. Los números de sus departamentos están bajando justo cuando empieza la campaña de primavera. Tu asesor sugiere documentar ya su desempeño “para proteger a la empresa”. Conoces a los hijos de este hombre desde que iban en sillita del carro.",
    "options": {
      "A": "Ve con él primero como ser humano: escúchalo, cubre lo que la empresa pueda y construyan juntos el camino de regreso.",
      "B": "Empieza el plan de desempeño documentado; no se puede permitir que la compasión dirija una empresa.",
      "C": "No digas nada y dale su espacio; un hombre orgulloso merece su privacidad."
    },
    "why": "La gente que sabe que te importa se convierte en su propio supervisor. El rastro de papeles te protege de una demanda; el cariño te protege de perder al hombre.",
    "voice": "Al final, todo se reduce a esto: “¿Amas a la gente?”.",
    "titleEn": "Love Is the Greatest Leadership Tool"
  },
  "BE-OW-21": {
    "title": "Regala el mérito, asume la culpa",
    "scenario": "Un trabajo de impermeabilización fallido apareció en el grupo de Facebook del condado: agua en un sótano terminado, el nombre de tu empresa en el titular. Los atajos se remontan a una presión de calendario que tú ordenaste en marzo. En la reunión general de mañana, tu gerente general se ofrece a “ponerse de pie y aguantar el golpe por producción”. Está dispuesto. La sala lo aceptaría. Y, por cierto, la primavera récord salió de tu idea de ventas.",
    "options": {
      "A": "Deja que el gerente general lo asuma; eso es rendir cuentas, y protegerlo de los momentos difíciles frenaría su crecimiento.",
      "B": "Ponte de pie tú: la falla es tuya en público, y la primavera récord le pertenece al equipo, con nombres.",
      "C": "Emite un comunicado conjunto en el que cada departamento asuma su parte proporcional."
    },
    "why": "En público, el dueño asume toda la culpa y regala todo el mérito. Dejar que el gerente general absorba la presión de calendario que tú ordenaste parece desarrollo, pero en realidad es un refugio para tu ego, y la sala lo sabe.",
    "voice": "El mérito fluye hacia abajo y la culpa hacia arriba: así se construye la confianza.",
    "titleEn": "Give Away the Credit, Take the Blame"
  },
  "BE-OW-22": {
    "title": "Nunca actúes con una sola versión de la historia",
    "scenario": "Viernes por la mañana, tu gerente general está en la puerta de tu oficina, encendido: Marcos, tu instalador más experimentado, lleva “meses inflando horas”; el GPS muestra rutas largas e inicios tardíos. Quiere que se vaya antes de que se procese la nómina esta tarde. Marcos lleva once años contigo. El gerente general rara vez se equivoca con los números, y te prometiste respaldar sus decisiones en público.",
    "options": {
      "A": "Respalda la decisión de tu gerente general; cuestionarlo delante del equipo debilita la cadena de mando que construiste.",
      "B": "Despídelo con la nómina y con una indemnización generosa; once años se ganan un aterrizaje suave, no un juicio.",
      "C": "Frena: escucha primero a Marcos —la historia detrás de la historia— y luego decide con ambas mitades en la mano."
    },
    "why": "Las noticias le llegan filtradas al dueño. Quizá Marcos infla horas; quizá despacho lo desvió después del cierre del puente. Actuar con una sola versión despide a un hombre, o una verdad, que no puedes recuperar.",
    "voice": "Siempre hay una historia detrás de la historia: ve a buscarla.",
    "titleEn": "Never Act on One Side of a Story"
  },
  "BE-OW-23": {
    "title": "Atiéndelo mientras es pequeño",
    "scenario": "Domingo en la noche: una reseña de una estrella dice que tu cuadrilla “rompió el patio y desapareció”, con fotos y etiquetando a un reportero local de temas de consumo. Tu jefe de cuadrilla te escribe: “La grieta ya estaba, 100%”. El lunes viene brutal: la nómina del viernes encima, una llamada con el banco, dos instalaciones. Es una reseña entre seiscientas, y una parte de ti quiere dejarla reposar una semana.",
    "options": {
      "A": "Llama tú mismo esta noche al propietario, párate mañana en ese patio y resuélvelo antes de que le crezcan los dientes.",
      "B": "Mándasela a tu abogado; admitir cualquier cosa en un tema de responsabilidad es como empiezan las demandas.",
      "C": "Déjala reposar hasta que se despeje la semana; una reseña entre seiscientas no mueve nada."
    },
    "why": "Todo desastre fue pequeño alguna vez. Esta noche esto cuesta una llamada y una visita al patio; la semana que viene es un reportaje en las noticias. De quién fue la culpa puede esperar; qué tan rápido te presentaste, no.",
    "voice": "Atiéndelo mientras es pequeño, o te atenderá a ti cuando sea grande.",
    "titleEn": "Handle It While It's Small"
  },
  "BE-OW-24": {
    "title": "La cultura es lo que pasa cuando el jefe se va",
    "scenario": "De vuelta tras dos semanas fuera, te enteras de que tu mejor vendedor —el treinta por ciento de un trimestre récord— se ha estado saltando la inspección de humedad obligatoria y cotizando desde la entrada de la casa. Tu gerente general lo sabía y lo dejó pasar: “Números como los suyos le compran algo de cuerda”. Tres representantes más jóvenes ya empezaron a cotizar a su manera. El tablero de primavera nunca se había visto mejor.",
    "options": {
      "A": "Llámalo aparte para una corrección discreta y privada: con tacto, con elegancia, sin escándalo.",
      "B": "Haz cumplir el estándar donde el equipo pueda verlo: la misma regla para el mejor productor, consecuencias reales, y retira la teoría de la cuerda de tu gerente general.",
      "C": "Déjalo para cuando termine la campaña de primavera; atiende la cultura en la temporada baja."
    },
    "why": "La cultura es lo que pasa cuando no estás, y una falta tolerada da permiso para la siguiente: tres representantes ya lo copiaron. Una palabra discreta no puede desenseñar lo que toda la sala vio recompensar.",
    "voice": "Lo que toleras, lo enseñas.",
    "titleEn": "Culture Is When the Boss Leaves"
  },
  "BE-OW-25": {
    "title": "Hablar sin miedo",
    "scenario": "La entrevista de salida de tu gerente de servicio que se va es un golpe al estómago: “Las reuniones se quedaron en silencio el día que te lanzaste contra Dave por las visitas de corrección. Desde entonces, todos te dicen lo que quieres oír”. Eso fue hace catorce meses. Habías notado que últimamente las reuniones se sentían más fluidas; lo tomaste como alineación. Cuando le preguntas directamente, tu gerente general duda y luego dice: “No está… equivocado, jefe”.",
    "options": {
      "A": "Pide a Recursos Humanos que haga una encuesta anónima trimestral para que la verdad te llegue de forma segura.",
      "B": "No le des importancia; las entrevistas de salida son donde la amargura tiene la última palabra.",
      "C": "Reconstruye tú la seguridad: discúlpate en público por el momento con Dave, pide primero las malas noticias y agradece a cada mensajero que las traiga."
    },
    "why": "Entre más alto el puesto, peor la retroalimentación: el silencio no es alineación, es miedo. Las encuestas anónimas le dan la vuelta al problema; solo el dueño que causó el silencio puede terminarlo.",
    "voice": "Si nadie te está dando malas noticias, estás pagando por buena actuación.",
    "titleEn": "Safe to Speak"
  },
  "BE-OW-26": {
    "title": "Un solo departamento: servicio al cliente",
    "scenario": "La reunión del martes se convierte en un tribunal: ventas culpa a producción de las visitas de corrección que matan las recomendaciones; producción dice que ventas promete instalaciones en dos semanas en junio. Tu gerente general propone bolsas de bonos separadas y reuniones separadas “para que dejen de pelear”. El correo de un cliente esta mañana decía: “Tu vendedor y tu capataz me dijeron cada uno que el otro estaba equivocado”.",
    "options": {
      "A": "Reinícialo desde la silla del dueño: una empresa, un departamento —servicio al cliente—, metas compartidas y un solo marcador que el cliente reconocería.",
      "B": "Aprueba las bolsas separadas; una rivalidad sana entre departamentos los afila a ambos.",
      "C": "Haz una sesión para aclarar el ambiente en la que ambos lados ventilen todas sus quejas."
    },
    "why": "Los departamentos son una ficción interna: el cliente vive una sola empresa. Las bolsas separadas le pagan a la gente por mantener el muro en pie. Solo el dueño puede declarar que hay un solo departamento, y sostenerlo.",
    "voice": "Al cliente no le importa qué departamento dejó caer la pelota.",
    "titleEn": "One Department: Customer Service"
  },
  "BE-OW-27": {
    "title": "Sirve a la persona, no a la casa",
    "scenario": "En un acompañamiento en campo, ves a tu mejor cerrador venderle a una viuda asustada un sistema perimetral completo de $18,400. De vuelta en el camión le preguntas por las lecturas; se encoge de hombros: un arreglo de drenaje de $900 habría resuelto su problema real. En la oficina toca la campana de ventas. El equipo aplaude. El cheque del depósito de ella ya está en la carpeta.",
    "options": {
      "A": "Elogia el cierre y luego aplícale discretamente un descuento para personas mayores para suavizar su contrato.",
      "B": "Reescribe el contrato a lo que ella necesita, devuélvele la diferencia y vuelve a fijar la filosofía de la empresa: primero diagnosticar, servir a la persona.",
      "C": "Déjalo así; ella firmó, y un dueño que deshace los negocios de sus cerradores no tendrá cerradores por mucho tiempo."
    },
    "why": "Sirves a la persona, no a la casa ni al monto de la venta. Venderle miedo a una viuda es un retiro de todas las cuentas: la de ella, la del equipo, la de la marca. Respaldar “el cierre” aquí es respaldar lo equivocado.",
    "voice": "Véndeles lo que necesitan, como si ahí viviera tu madre.",
    "titleEn": "Serve the Human, Not the House"
  },
  "BE-OW-28": {
    "title": "¡Wow! es el estándar",
    "scenario": "El costo por prospecto se duplicó en dos años. La respuesta de la agencia es un presupuesto más grande; tu gerente de ventas quiere un servicio externo de prospectos. Entonces tu gerente general proyecta una sola diapositiva: tasa de recomendaciones, 41% hace tres años, 16% ahora; el mismo periodo en que las reseñas de tus instalaciones bajaron de 4.9 a 4.1 mientras crecías rápido. La reunión del presupuesto de anuncios es el jueves.",
    "options": {
      "A": "Financia el presupuesto de anuncios más grande; los prospectos son oxígeno, y puedes arreglar la calidad cuando la cartera esté llena.",
      "B": "Compra el servicio de prospectos como un puente rápido para la primavera.",
      "C": "Arregla la rueda desde su origen: reinvierte en el ¡Wow!; vuelven las recomendaciones, los prospectos salen más baratos, los márgenes engordan y llega mejor gente."
    },
    "why": "Los prospectos comprados rentan lo que el ¡Wow! te da en propiedad. El costo por prospecto duplicado no es un problema de marketing: es la factura de un estándar de servicio que se cayó mientras la empresa estaba ocupada creciendo.",
    "voice": "El ¡Wow! es el marketing más barato que vas a financiar.",
    "titleEn": "Wow! Is the Standard"
  },
  "BE-OW-29": {
    "title": "La experiencia es la mitad del producto",
    "scenario": "Pierdes tres cotizaciones en un mes contra un competidor cuyo trabajo instalado no es mejor que el tuyo, y además cuesta más. Así que le pides a tu hermana que solicite cotizaciones a ambas empresas. La de ellos: mensajes de confirmación, un representante impecable, cubrezapatos, una llamada de seguimiento. La tuya: una ventana de cita incumplida, una hoja de presupuesto manchada de lodo y silencio después. El mismo producto. Una empresa distinta, por lo visto.",
    "options": {
      "A": "Diseña a propósito cada Momento de la Verdad —desde la primera llamada hasta el recorrido final— e inspecciona la experiencia como inspeccionas el trabajo.",
      "B": "Envía un memo el lunes: profesionalismo, avisar antes de llegar, camiones limpios; a partir de hoy.",
      "C": "Agrega un regalo de agradecimiento al final de cada trabajo; un buen cierre es lo que recuerdan los clientes."
    },
    "why": "El cliente no puede ver tu mano de obra debajo de la losa: juzga la mitad del producto que sí puede ver. Los memos exigen una experiencia; solo el diseño la produce.",
    "voice": "Juzgan lo que pueden ver, no lo que está enterrado.",
    "titleEn": "The Experience Is Half the Product"
  },
  "BE-OW-30": {
    "title": "Los problemas son pruebas",
    "scenario": "Sábado del fin de semana largo de Memorial Day, 9 p. m.: un sistema que instalaste en abril falla durante una tormenta y al sótano terminado de los Keller le está entrando agua. El técnico de guardia está en una boda a dos horas. La tercera llamada del cliente entra a tu celular. De quién es la culpa —la bomba, la luz o la instalación— de verdad no está claro.",
    "options": {
      "A": "Responde el lunes con una cuadrilla completa y un diagnóstico como se debe; una visita bien hecha le gana a una apresurada.",
      "B": "Muévete esta noche: consigue que lleguen una bomba y una persona —tú, si hace falta—. Primero arregla, después aclaren la culpa.",
      "C": "Devuelve la llamada, discúlpate sinceramente y ofrece un crédito generoso para la visita de reparación."
    },
    "why": "La rapidez es la disculpa. Los Keller van a contar este fin de semana durante diez años: o la versión en la que el dueño llegó bajo la lluvia, o aquella en la que la máquina dijo “el lunes”.",
    "voice": "Un problema resuelto rápido es mejor historia que no haber tenido ningún problema.",
    "titleEn": "Problems Are Tests"
  },
  "BE-OW-31": {
    "title": "Clientes para toda la vida",
    "scenario": "Tu división de contratos de servicio anual apenas sale tablas, y tu gerente general quiere cerrarla: “Esas revisiones de $189 tienen ocupados a dos técnicos todo el invierno”. Pero sacas el expediente: quienes tienen contrato compran 3 veces más en diez años, recomiendan al doble y nunca cotizan con otros. Los camiones que esos técnicos dejarían libres podrían salir tras instalaciones nuevas con margen completo desde el lunes.",
    "options": {
      "A": "Cierra la división; el capital va donde el margen de este año es más alto.",
      "B": "Mantenla, pero sube el precio de la revisión hasta que se pague sola hoy.",
      "C": "Mantenla e invierte: la revisión no es un producto, es la relación, y la relación es el activo."
    },
    "why": "El valor de por vida es matemática de dueño; una línea del estado de resultados no puede verlo. La división que “sale tablas” es la máquina que fabrica clientes de por vida: cerrarla cambia el huerto por una sola cosecha.",
    "voice": "La primera venta te compra un cliente; todo lo que viene después es la fortuna.",
    "titleEn": "Keep Customers for Life"
  },
  "BE-OW-32": {
    "title": "Vender es ayudar",
    "scenario": "Todo lo que quieres para el año que viene necesita un sí que todavía no te has ganado: el del banco, para ampliar la línea de crédito; el de tu mejor capataz, para aceptar el puesto de gerente de sucursal que le da miedo; el de tu pareja, para un año más antes de bajar el ritmo. Sigues entrando a estas conversaciones con hojas de cálculo y saliendo con “quizás”. “Soy dueño, no vendedor”, le dices a tu gerente general.",
    "options": {
      "A": "Acepta que el verdadero trabajo del dueño es vender la visión todos los días, y prepárate para el banquero como tu cerrador se prepara para la mesa de la cocina de un cliente.",
      "B": "Manda al gerente general a encargarse del banco; es mejor con los números y te libera la semana.",
      "C": "Deja de intentar persuadir; si el plan es sólido, la gente correcta lo verá por sí misma."
    },
    "why": "Vender es ayudar a la gente a obtener lo que necesita, y el dueño le vende la visión a todos: bancos, capataces, familia. Una visión que nunca se vende es solo una opinión privada con presupuesto.",
    "voice": "Si tú no vendes el sueño, nadie puede comprarlo.",
    "titleEn": "Selling Is Helping"
  },
  "BE-OW-33": {
    "title": "Nunca prejuzgues",
    "scenario": "El dueño de una empresa competidora te llama para venderte su negocio. Pasas frente a su taller: hierba crecida, dos camiones oxidados, un letrero pintado a mano. Tu gerente general se ríe: “Eso es un deshuesadero, no una adquisición”. Pero el viejo ha dominado el norte del condado durante treinta años, y nunca has visto sus libros, su lista de personal ni su archivo de clientes. La reunión te costaría la mañana de un martes.",
    "options": {
      "A": "Declina con cortesía; treinta años de hierba y óxido te dicen todo lo que dirían los libros.",
      "B": "Ve a la reunión y juzga lo real: libros, personal, base de clientes. Los camiones oxidados han escondido muchas minas de oro.",
      "C": "Envía una oferta baja sin verlo; si acepta, el precio cubre lo que esté mal."
    },
    "why": "Nunca prejuzgues: ni a clientes, ni a candidatos, ni a empresas por adquirir. El taller descuidado podría esconder una empresa sin deudas con tres mil clientes leales. Ese juicio no te costaba nada evitarlo y podría costarte un condado mantenerlo.",
    "voice": "La portada nunca te dice cuánto vale el libro.",
    "titleEn": "Never Pre-Judge"
  },
  "BE-OW-34": {
    "title": "Nunca des un precio antes de construir valor",
    "scenario": "Un competidor respaldado por capital privado inunda tu mercado con precios 20% por debajo de los tuyos. Dos cerradores quieren autoridad para dar descuentos “solo durante el verano”, y tu gerente general redacta un volante para igualar precios. Mientras tanto, tus números dicen que ganas 6 de cada 10 cotizaciones que presentas completas —a tu precio— y tus reseñas son las mejores del condado. La voz de tu padre en tu cabeza dice que nadie le gana al barato convirtiéndose en él.",
    "options": {
      "A": "Iguálalos durante el verano; gana primero la guerra del volumen y recupera el margen después.",
      "B": "Busca un punto medio: un descuento discreto del 10% como “respuesta competitiva”.",
      "C": "Mantén el precio y afila la historia de valor: presenta mejor, demuestra más y siéntete orgulloso de la cifra."
    },
    "why": "Un precio antes del valor es rendirse; el valor antes del precio es una posición. Ya ganas a tu precio cuando se presenta el valor; el descuento no te compraría clientes, vendería tu margen para financiar el de ellos.",
    "voice": "Siéntete orgulloso de tu precio: alguien tiene que ser el mejor, y lo mejor cuesta más.",
    "titleEn": "Never Price Before Value"
  },
  "BE-OW-35": {
    "title": "Da seguimiento para siempre",
    "scenario": "En una limpieza del CRM, tu gerente general quiere borrar 1,400 prospectos “muertos”: cotizaciones de más de un año, incluido un trabajo comercial de cimientos de $230K que se quedó en silencio en 2024. “Perseguir fantasmas nos hace quedar mal”, dice. Tú recuerdas la vez que te ganaron por paciencia: un rival se quedó con la cuenta de tus sueños simplemente por seguir ahí en el tercer año, después de que tú dejaste de llamar.",
    "options": {
      "A": "Consérvalos todos y construye el ritmo de seguimiento para siempre: contactos útiles y sin pena hasta que compren o pidan que pares.",
      "B": "Borra el archivo; la limpieza de la cartera importa más que la nostalgia.",
      "C": "Conserva solo el prospecto comercial grande y deja ir el resto."
    },
    "why": "El competidor más peligroso es el que nunca se rinde: decide ser tú. “Muerto” casi siempre significa “todavía no”, y el dueño que da seguimiento para siempre está ahí el día que cambia el momento.",
    "voice": "La mayor parte del mercado no está perdida; simplemente no está lista, y alguien estará ahí cuando lo esté.",
    "titleEn": "Follow Up Forever"
  },
  "BE-OW-36": {
    "title": "El efectivo es vida",
    "scenario": "Septiembre récord: el mejor trimestre de la historia, el saldo del banco nunca se había visto tan gordo. El contrato de la casa del lago que llevas una década queriendo vence el viernes, y el enganche está ahí mismo. Tu gerente general quiere tres camiones; tú quieres el lago. Pero $410K de ese “efectivo” son cuentas por cobrar, el fondo de reserva alcanza para dos nóminas, y todavía recuerdas el febrero en que casi no pagas la nómina, con dinero prestado.",
    "options": {
      "A": "Da el enganche; treinta años se ganaron esto, y los septiembres así financian los febreros.",
      "B": "Espera: lleva primero el fondo de reserva a su meta, luego los camiones y después el lago; el Spread decide el orden, no el calendario.",
      "C": "Divídelo: la mitad al depósito del lago y la mitad a reservas; todos ganan."
    },
    "why": "El efectivo es vida, y las cuentas por cobrar no son efectivo. Septiembre siempre se siente permanente y nunca lo es; la casa del lago comprada con un fondo de reserva real es alegría; comprada con un trimestre caliente, es rehén de febrero.",
    "voice": "Nunca gastes más de lo que entra: punto, sin asteriscos, sin septiembres.",
    "titleEn": "Cash Is Life"
  },
  "BE-OW-37": {
    "title": "Conoce tus números",
    "scenario": "Tu banquero te hace tres preguntas para la renovación de la línea de crédito: tu punto de equilibrio, tu margen neto y tu posición de efectivo a noventa días. No respondes ninguna; siempre has “sentido” el negocio, y tu contadora “tiene todo eso”. Manejando a casa, te cae el veinte: has estado pisando el acelerador de una empresa de $5M con los ojos cerrados, confiando en que alguien más te avise de los precipicios.",
    "options": {
      "A": "Asciende a la contadora a contralora y pídele que te informe cada mes.",
      "B": "Prepara respuestas claras para la próxima reunión con el banquero; esa es la prueba que importa.",
      "C": "Aprende tú los números —punto de equilibrio, margen, la Calculadora de Efectivo— hasta que puedas responder sin pensarlo, y luego mantén un ritmo semanal."
    },
    "why": "Conocer tus números es trabajo del dueño, no un servicio que se contrata. Una contralora informa a un conductor que sabe leer el tablero; no puede manejar por uno que no quiere abrir los ojos.",
    "voice": "No puedes manejar con los ojos cerrados y el pie en el acelerador.",
    "titleEn": "Know Your Numbers"
  },
  "BE-OW-38": {
    "title": "Paga por lo que quieres que se repita",
    "scenario": "Día de auditoría de tus propios planes de compensación: los cerradores a los que se les paga por ingresos están dando descuentos para llegar al volumen; las cuadrillas a las que se les paga por trabajo están apurándose tanto que generan visitas de corrección; el sueldo fijo de tu gerente general le paga exactamente lo mismo si la utilidad se duplica o si el lugar se quema. Luego él pide un aumento, y amenaza con escuchar a un reclutador si la respuesta tarda. Cada plan lo diseñaste tú.",
    "options": {
      "A": "Reconstruye la compensación en torno a lo que quieres que se repita —margen, calidad, permanencia— y liga la ganancia del gerente general a la utilidad que él genere.",
      "B": "Dale ya el aumento al gerente general para acabar con lo del reclutador, y revisa los planes el próximo invierno.",
      "C": "Agrega un bono discrecional de fin de año encima de cada plan existente."
    },
    "why": "Siempre obtienes aquello por lo que pagas: tus planes pagaban por descuentos y trabajos apresurados, y cumplieron. La amenaza del aumento es un síntoma: un sueldo fijo no le dio a tu mejor líder ninguna razón para construir tu utilidad.",
    "voice": "Muéstrame el plan de pago y te diré cómo se comportan.",
    "titleEn": "Pay for What You Want Repeated"
  },
  "BE-OW-39": {
    "title": "Sistemas, no héroes",
    "scenario": "Tu programación vive en la cabeza de Rita. Con veintidós años en la empresa, asigna rutas a las cuadrillas, calma a los clientes y recuerda qué calles se inundan. El mes pasado estuvo una semana fuera por herpes zóster y la empresa chocó contra una pared: instalaciones perdidas, cuadrillas agendadas dos veces, un trabajo de $14K reprogramado tres veces. Ya regresó y todo vuelve a ir sobre ruedas, y eso es exactamente lo que te preocupa.",
    "options": {
      "A": "Súbele el sueldo a Rita considerablemente para que la mujer irreemplazable nunca se vaya.",
      "B": "Construye la máquina: documenta el proceso, nombra un respaldo para cada engranaje y haz que el héroe sea el sistema, no Rita. Hónrala pidiéndole que lo construya ella.",
      "C": "Compra un software de programación y pide a sistemas que migre todo lo de su escritorio este trimestre."
    },
    "why": "Un héroe es un sistema con un único punto de falla. Pagarle más profundiza la dependencia y la llama lealtad. La Business Machine funciona con engranajes documentados y responsables con nombre, incluido el de Rita, escrito por Rita.",
    "voice": "Si vive en una sola cabeza, no es un sistema: es una cuenta regresiva.",
    "titleEn": "Systems, Not Heroes"
  },
  "BE-OW-40": {
    "title": "Cómo hacemos cualquier cosa es cómo lo hacemos todo",
    "scenario": "Al salir el viernes, pasas junto a todo: un letrero de jardín chueco en el vestíbulo, un círculo de café en la mesa de juntas, tu propio camión —el que las cuadrillas ven todos los días— con el parabrisas estrellado y la caja llena de escombros del mes pasado. El lunes das la charla general sobre subir los estándares. Ya nadie más lo nota. Esa es la parte que te detiene.",
    "options": {
      "A": "Da la charla el lunes y asígnale a la gerente de oficina una lista de verificación de instalaciones.",
      "B": "Olvídate por completo del discurso; solo acciones, las palabras ya dejaron de funcionar.",
      "C": "Arregla primero tu propio camión, el letrero y la mesa —este fin de semana, a la vista de todos— y luego da una charla que ya empezaste a cumplir."
    },
    "why": "Cómo hacemos cualquier cosa es cómo lo hacemos todo, y los hábitos más pequeños del dueño son el verdadero programa de capacitación de la empresa. Un discurso sobre estándares dado desde un camión sucio enseña exactamente una cosa, y no son estándares.",
    "voice": "No pueden escuchar el discurso por encima del parabrisas estrellado.",
    "titleEn": "How We Do Anything Is How We Do Everything"
  }
};
