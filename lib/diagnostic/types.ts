// lib/diagnostic/types.ts

export type BloquePregunta = 'Perfil' | 'Territorio' | 'Posicionamiento' | 'Capacidad' | 'Riesgos';

export interface RespuestaEntrevista {
  id: string;
  bloque: BloquePregunta;
  pregunta: string;
  respuesta: string;
}

export interface CandidateDNA {
  claridadNarrativa: number;
  diferenciacion: number;
  coherencia: number;
  credibilidad: number;
  conocimientoTerritorial: number;
  organizacion: number;
  movilizacion: number;
  gestionRiesgo: number;
  resiliencia: number;
  viabilidad: number;
}

export interface RiesgoDetectado {
  id: string;
  titulo: string;
  nivel: 'BAJO' | 'MODERADO' | 'ALTO' | 'CRÍTICO';
  descripcion: string;
  impacto: string;
}

export interface RecomendacionTactica {
  id: string;
  problema: string;
  accion: string;
  prioridad: 'Inmediata' | 'Alta' | 'Media';
  horizonteDias: number;
}

export interface ResultadoDiagnostico {
  iesr: number;
  veredictoViabilidad: string;
  dna: CandidateDNA;
  perfilDominante: string;
  fortalezas: string[];
  vulnerabilidades: string[];
  riesgos: RiesgoDetectado[];
  recomendaciones: RecomendacionTactica[];
}