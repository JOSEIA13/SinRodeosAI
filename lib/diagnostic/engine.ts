import { RespuestaEntrevista, ResultadoDiagnostico, CandidateDNA, RiesgoDetectado, RecomendacionTactica } from './types';

/**
 * Motor de Diagnóstico Base (Scoring Algorítmico)
 * Traduce las respuestas de texto de la entrevista en variables cuantificables (0-100)
 */
export function calcularDiagnosticoBase(respuestas: Record<string, string>): ResultadoDiagnostico {
  
  // Lógica heurística de análisis de texto básica (para fallback o procesamiento inicial)
  const textoCompleto = Object.values(respuestas).join(' ').toLowerCase();
  
  // Ejemplo de penalización por respuestas vacías o evasivas
  const factorExtension = Math.min(textoCompleto.length / 1500, 1); // Premia respuestas detalladas
  
  // Cálculo matemático base de las 10 dimensiones del Candidate DNA
  const baseScore = Math.floor(45 + (factorExtension * 35));
  
  const dna: CandidateDNA = {
    claridadNarrativa: calcularMetricaEspecifica(respuestas['promesaCentral'], 70, baseScore),
    diferenciacion: calcularMetricaEspecifica(respuestas['diferenciacion'], 65, baseScore),
    coherencia: baseScore,
    credibilidad: calcularMetricaEspecifica(respuestas['percepcion'], 60, baseScore),
    conocimientoTerritorial: calcularMetricaEspecifica(respuestas['dolorTerritorio'], 75, baseScore),
    organizacion: calcularMetricaEspecifica(respuestas['equipo'], 50, baseScore - 10),
    movilizacion: calcularMetricaEspecifica(respuestas['movilizacion'], 55, baseScore - 15),
    gestionRiesgo: calcularMetricaEspecifica(respuestas['vulnerabilidad'], 50, baseScore),
    resiliencia: 65,
    viabilidad: 0 // Se calcula al final como promedio ponderado
  };

  // Cálculo del IESR (Índice de Eficiencia Estratégica y Riesgo)
  const valoresDNA = Object.values(dna).filter(v => v > 0);
  const promedioDNA = Math.round(valoresDNA.reduce((acc, val) => acc + val, 0) / valoresDNA.length);
  dna.viabilidad = promedioDNA;

  const iesr = promedioDNA;

  // Detección de riesgos basados en los inputs críticos
  const riesgos: RiesgoDetectado[] = [
    {
      id: 'r1',
      titulo: 'Vulnerabilidad Estructurada en Discurso',
      nivel: dna.claridadNarrativa < 60 ? 'ALTO' : 'MODERADO',
      descripcion: 'Las respuestas muestran una propuesta que puede diluirse ante ataques de adversarios tradicionales.',
      impacto: 'Pérdida de tracción en el segmento de votantes indecisos.'
    },
    {
      id: 'r2',
      titulo: 'Capacidad de Movilización en Día D',
      nivel: dna.movilizacion < 60 ? 'CRÍTICO' : 'MODERADO',
      descripcion: 'La estructura territorial descrita presenta vacíos operativos para la defensa del voto.',
      impacto: 'Fuga de votos en mesas electorales clave.'
    }
  ];

  // Recomendaciones tácticas inmediatas
  const recomendaciones: RecomendacionTactica[] = [
    {
      id: 'rec1',
      problema: 'Ambigüedad en el mensaje central',
      accion: 'Reducir la promesa de campaña a una sola frase de ejecución inmediata que ataque directamente el principal dolor del territorio.',
      prioridad: 'Inmediata',
      horizonteDias: 7
    },
    {
      id: 'rec2',
      problema: 'Estructura organizativa débil',
      accion: 'Consolidar un núcleo operativo de 10 líderes zonales antes de iniciar la pauta publicitaria masiva.',
      prioridad: 'Alta',
      horizonteDias: 14
    }
  ];

  return {
    iesr,
    veredictoViabilidad: iesr > 70 ? 'Viabilidad competitiva alta con ajustes tácticos.' : 'Alerta roja: Campaña con alto riesgo de estancamiento estructural.',
    dna,
    perfilDominante: dna.movilizacion > 70 ? 'Líder Territorial de Alta Movilización' : 'Candidato en Construcción de Posicionamiento',
    fortalezas: [
      'Lectura clara de las frustraciones iniciales del territorio.',
      'Disposición a evaluar riesgos tácticos de campaña.',
      'Potencial de diferenciación frente al continuismo.'
    ],
    vulnerabilidades: [
      'Deficiencias en la estructura operativa del Día D.',
      'Riesgo de polarización pasiva ante ataques de la oposición.',
      'Falta de un anclaje narrativo contundente.'
    ],
    riesgos,
    recomendaciones
  };
}

// Función auxiliar interna para ponderar texto
function calcularMetricaEspecifica(texto: string | undefined, maxEsperado: number, fallback: number): number {
  if (!texto) return fallback - 10;
  if (texto.length > 120) return Math.min(maxEsperado + 15, 95);
  if (texto.length > 50) return maxEsperado;
  return Math.max(fallback - 15, 30);
}