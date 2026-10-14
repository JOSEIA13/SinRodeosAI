// lib/preguntas.ts

export interface Pregunta {
    id: string;
    texto: string;
    categoria: 'crisis' | 'narrativa' | 'realpolitik';
}

const bancoPreguntas: Pregunta[] = [
    // FILTRO 1: MANEJO DE CRISIS
    { id: 'c1', categoria: 'crisis', texto: 'A 3 meses de elecciones, se filtra un audio de tu jefe de debate haciendo un acuerdo político cuestionable con un contratista. Tu equipo de prensa sugiere no decir nada y esperar a que pase el escándalo. ¿Qué haces en las primeras 2 horas?' },
    { id: 'c2', categoria: 'crisis', texto: 'Durante un debate en vivo, tu principal oponente te acusa con documentos falsos de tener investigaciones por corrupción. Tienes 30 segundos de réplica. ¿Cómo reaccionas?' },
    { id: 'c3', categoria: 'crisis', texto: 'Una crisis de seguridad estalla en la ciudad (ej. un atentado o disturbios graves) justo cuando vas liderando las encuestas. ¿Cómo capitalizas el momento sin parecer un oportunista político?' },

    // FILTRO 2: NARRATIVA Y TERRITORIO
    { id: 'n1', categoria: 'narrativa', texto: 'Tienes 60 segundos frente a una junta de acción comunal en un barrio que históricamente vota por tus oponentes. ¿Cómo logras que te escuchen sin prometer cemento, obras ni subsidios?' },
    { id: 'n2', categoria: 'narrativa', texto: 'Si un votante joven y apático te dice en la calle: "Todos ustedes son iguales, solo aparecen en campaña", ¿cuál es tu frase exacta para romper su apatía en 10 segundos?' },
    { id: 'n3', categoria: 'narrativa', texto: 'Resume la causa principal de tu campaña en una sola oración. No puedes usar palabras como "cambio", "futuro", "transparencia" o "desarrollo".' },

    // FILTRO 3: REALPOLITIK Y NEGOCIACIÓN
    { id: 'r1', categoria: 'realpolitik', texto: 'Un empresario clave te ofrece financiar el 30% de tu campaña, pero te insinúa que espera influir en el nombramiento del Secretario de Hacienda. ¿Cómo manejas esta negociación sin perder el dinero ni vender tu independencia?' },
    { id: 'r2', categoria: 'realpolitik', texto: 'Para ganar la elección necesitas el apoyo de un partido tradicional que tiene mala imagen, pero los votos suficientes. ¿Cómo integras esa alianza sin destruir tu narrativa de "candidato independiente"?' },
    { id: 'r3', categoria: 'realpolitik', texto: 'Eres elegido, pero el concejo/asamblea queda con mayoría opositora y bloquean tu primer gran proyecto. ¿Cuál es tu primera jugada política para quebrar esa coalición en contra?' },
];

export function obtenerPreguntasAleatorias(): Pregunta[] {
    // Selecciona una pregunta al azar de cada categoría para crear una entrevista única
    const crisis = bancoPreguntas.filter(p => p.categoria === 'crisis');
    const narrativa = bancoPreguntas.filter(p => p.categoria === 'narrativa');
    const realpolitik = bancoPreguntas.filter(p => p.categoria === 'realpolitik');

    const p1 = crisis[Math.floor(Math.random() * crisis.length)];
    const p2 = narrativa[Math.floor(Math.random() * narrativa.length)];
    const p3 = realpolitik[Math.floor(Math.random() * realpolitik.length)];

    return [p1, p2, p3];
}