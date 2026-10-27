export interface Pregunta {
  id: string;
  texto: string;
  categoria: 'crisis' | 'narrativa' | 'realpolitik';
}

const bancoPreguntas: Pregunta[] = [
  // ==========================================
  // FILTRO 1: MANEJO DE CRISIS (Mide reflejos, control de daños y carácter)
  // ==========================================
  { id: 'c1', categoria: 'crisis', texto: 'A 3 meses de elecciones, se filtra un audio de tu jefe de debate haciendo un acuerdo político cuestionable con un contratista. Tu equipo de prensa sugiere silencio total. ¿Qué haces en las primeras 2 horas?' },
  { id: 'c2', categoria: 'crisis', texto: 'Durante un debate en vivo por la [CARGO], tu principal oponente te acusa con documentos falsos de tener investigaciones por corrupción. Tienes 30 segundos de réplica. ¿Cómo reaccionas?' },
  { id: 'c3', categoria: 'crisis', texto: 'Una crisis de seguridad grave estalla en tu territorio justo cuando vas liderando las encuestas. La prensa te acorrala pidiendo declaraciones. ¿Cómo capitalizas el momento sin parecer un oportunista político?' },
  { id: 'c4', categoria: 'crisis', texto: 'Un medio local publica un reportaje afirmando que tu campaña a la [CARGO] está recibiendo financiación oculta. Tienes las pruebas de que es mentira, pero el rumor ya es viral. ¿Cuál es tu primera maniobra operativa?' },
  { id: 'c5', categoria: 'crisis', texto: 'Faltando una semana para las elecciones, tu candidato aliado comete un error fatal en televisión nacional y la opinión pública te exige que lo repudies. ¿Cómo manejas esta bomba mediática?' },
  { id: 'c6', categoria: 'crisis', texto: 'Alguien infiltra tu campaña y roba la base de datos de tus líderes territoriales. Al día siguiente, la maquinaria tradicional empieza a comprarlos uno por uno. ¿Cómo detienes la hemorragia?' },

  // ==========================================
  // FILTRO 2: NARRATIVA Y TERRITORIO (Mide empatía estratégica y capacidad de relato)
  // ==========================================
  { id: 'n1', categoria: 'narrativa', texto: 'Tienes 60 segundos frente a una junta de acción comunal en un barrio que históricamente vota en contra tuya. ¿Cómo logras que te escuchen sin prometer cemento, obras ni subsidios?' },
  { id: 'n2', categoria: 'narrativa', texto: 'Si un votante joven y apático te dice en la calle: "Todos los que aspiran a la [CARGO] son iguales, solo aparecen en campaña", ¿cuál es tu frase exacta para romper su apatía en 10 segundos?' },
  { id: 'n3', categoria: 'narrativa', texto: 'Resume el enemigo principal de tu campaña a la [CARGO] en una sola oración. No puedes usar palabras cliché como "corrupción", "pobreza" o "desigualdad".' },
  { id: 'n4', categoria: 'narrativa', texto: 'Estás visitando una zona de alta vulnerabilidad económica. ¿Cuál es tu primera línea de discurso para conectar emocionalmente sin caer en el asistencialismo?' },
  { id: 'n5', categoria: 'narrativa', texto: 'Tu principal oponente tiene el carisma popular y la maquinaria que a ti te falta. ¿Cómo construyes un relato que vuelva su carisma en su contra?' },
  { id: 'n6', categoria: 'narrativa', texto: 'Durante una entrevista en radio, el periodista te acorrala diciendo que no tienes la experiencia necesaria para asumir la [CARGO]. ¿Cómo desvías el ataque y posicionas tu narrativa?' },

  // ==========================================
  // FILTRO 3: REALPOLITIK Y NEGOCIACIÓN (Mide pragmatismo y cálculo político)
  // ==========================================
  { id: 'r1', categoria: 'realpolitik', texto: 'Un empresario clave te ofrece financiar el 30% de tu campaña a la [CARGO], pero te insinúa que espera influir en la designación de los presupuestos. ¿Cómo manejas la negociación sin perder el dinero ni vender tu independencia?' },
  { id: 'r2', categoria: 'realpolitik', texto: 'Para asegurar tu triunfo necesitas el apoyo de un partido tradicional que tiene altísimo rechazo popular, pero los votos suficientes. ¿Cómo integras esa alianza sin destruir tu imagen?' },
  { id: 'r3', categoria: 'realpolitik', texto: 'Ganas la elección, pero el órgano colegiado queda con mayoría opositora y bloquean tu primer gran proyecto. ¿Cuál es tu primera jugada táctica para quebrar esa coalición en contra?' },
  { id: 'r4', categoria: 'realpolitik', texto: 'El barón electoral de tu región te exige el control de una secretaría crítica a cambio de endosarte su estructura política. Si le dices que no, apoya a tu rival. ¿Cómo operas en esta mesa?' },
  { id: 'r5', categoria: 'realpolitik', texto: 'Tu jefe de campaña te demuestra con datos que, para asegurar la [CARGO], debes atacar directamente la vida personal de tu oponente. Es legal, pero sucio. ¿Das la orden operativa o retrocedes?' },
  { id: 'r6', categoria: 'realpolitik', texto: 'El candidato de la maquinaria tradicional se da cuenta de que estás creciendo rápido y te ofrece ser su fórmula o aliado estratégico con garantías de poder. ¿Cómo declinas sin convertirlo en un enemigo a muerte?' },
];

export function obtenerPreguntasAleatorias(cargo: string): Pregunta[] {
  // 1. Clasificamos las preguntas
  const crisis = bancoPreguntas.filter(p => p.categoria === 'crisis');
  const narrativa = bancoPreguntas.filter(p => p.categoria === 'narrativa');
  const realpolitik = bancoPreguntas.filter(p => p.categoria === 'realpolitik');

  // 2. Selección 100% aleatoria (Evita repeticiones forzadas)
  const p1 = { ...crisis[Math.floor(Math.random() * crisis.length)] };
  const p2 = { ...narrativa[Math.floor(Math.random() * narrativa.length)] };
  const p3 = { ...realpolitik[Math.floor(Math.random() * realpolitik.length)] };

  // 3. Inyección Dinámica del Cargo (Reemplaza el comodín sin destruir la pregunta)
  const nombreCargo = cargo || 'campaña';

  p1.texto = p1.texto.replace(/\[CARGO\]/g, nombreCargo);
  p2.texto = p2.texto.replace(/\[CARGO\]/g, nombreCargo);
  p3.texto = p3.texto.replace(/\[CARGO\]/g, nombreCargo);

  return [p1, p2, p3];
}