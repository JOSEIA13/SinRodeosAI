import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Permitir que la función corra hasta 60 segundos en Vercel
export const maxDuration = 60; 

export async function POST(req: Request) {
  try {
    // 1. Recibir los datos estructurados que armamos en la entrevista
    const { datosEstructurados } = await req.json();

    // 2. Ejecutar la llamada estructurada a OpenAI
    const { object } = await generateObject({
      model: openai('gpt-4o-mini'), // Rápido, económico e inteligente para estructurar datos
      system: `Eres el Estratega Político Principal de 'Sin Rodeos', un sistema de consultoría electoral crudo, analítico y basado en realpolitik. 
      Tu trabajo es evaluar las respuestas de un candidato a 12 variables críticas y devolver un diagnóstico matemático y táctico.
      
      REGLAS ESTRICTAS DE PUNTUACIÓN:
      1. Sé implacable. Si las respuestas suenan a "político tradicional", clichés o son vacías, los puntajes deben caer al rango de 30-50.
      2. Si no hay una ventaja competitiva real contra los adversarios, la 'diferenciacion' debe ser baja y debe marcarse como vulnerabilidad.
      3. Si no tiene estructura ni equipo propio, la 'movilizacion' y 'organizacion' deben ser menores a 40.
      4. El 'iesr' (Índice de Eficiencia Estratégica y Riesgo) es un promedio riguroso de las métricas.
      5. Las recomendaciones deben ser acciones tácticas, frías y de ejecución inmediata (ej: "Despedir al jefe de prensa", "Ocultar historial de contratación"), no consejos de autoayuda.`,
      
      prompt: `Analiza las siguientes respuestas del candidato y genera la Matriz Estratégica en el JSON exacto solicitado:\n\n${JSON.stringify(datosEstructurados, null, 2)}`,
      
      // 3. Forzar la estructura de salida (El motor de la aplicación)
      schema: z.object({
        iesr: z.number().describe("Puntaje global entre 0 y 100"),
        metricas: z.object({
          claridadNarrativa: z.number().describe("0-100"),
          diferenciacion: z.number().describe("0-100"),
          coherencia: z.number().describe("0-100"),
          credibilidad: z.number().describe("0-100"),
          conocimientoTerritorial: z.number().describe("0-100"),
          organizacion: z.number().describe("0-100"),
          movilizacion: z.number().describe("0-100"),
          gestionRiesgo: z.number().describe("0-100"),
          resiliencia: z.number().describe("0-100"),
          viabilidad: z.number().describe("0-100"),
        }),
        analisisCualitativo: z.object({
          fortalezas: z.array(z.string()).length(3).describe("3 fortalezas concretas"),
          vulnerabilidades: z.array(z.string()).length(3).describe("3 riesgos o debilidades graves"),
          inconsistencias: z.array(z.string()).describe("Contradicciones entre lo que dice y sus recursos"),
          recomendaciones: z.array(z.string()).length(3).describe("3 acciones tácticas urgentes")
        })
      })
    });

    // 4. Devolver el JSON perfectamente estructurado al frontend
    return Response.json(object);

  } catch (error) {
    console.error("Error en motor de análisis:", error);
    return Response.json({ error: 'Error procesando la matriz estratégica' }, { status: 500 });
  }
}