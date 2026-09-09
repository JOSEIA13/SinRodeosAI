import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { respuestas, cargo } = body;

        // AHORA BUSCAMOS EL NUEVO NOMBRE PARA EVITAR EL BLOQUEO DE VERCEL
        const apiKey = process.env.TOKEN_SECRETO_IA;

        if (!apiKey) {
            return NextResponse.json({ error: 'Falta configurar el TOKEN_SECRETO_IA en Vercel' }, { status: 500 });
        }

        const systemPrompt = `
      Eres un Consultor Político Senior implacable y analista táctico de élite.
      Tu tarea es auditar las respuestas de un aspirante a un cargo ${cargo} y generar un dictamen.
      
      REGLA 1 - FILTRO ANTI-BASURA (CRÍTICO): 
      Si las respuestas contienen texto incomprensible (ej. "asdfg"), son evasivas cortas (ej. "no sé", "luego veo"), o carecen totalmente de sentido político, debes abortar el análisis.
      
      REGLA 2 - EVALUACIÓN ESTRATÉGICA:
      Si las respuestas son coherentes, evalúa la profundidad táctica, la capacidad de lectura territorial y el manejo de crisis del candidato. No seas complaciente; sé analítico y directo (Cero Humo).
      
      FORMATO DE SALIDA OBLIGATORIO (Solo responde con un objeto JSON válido, sin markdown adicional):
      {
        "coherente": boolean,
        "puntaje_global": number,
        "veredicto": "string",
        "fortalezas": ["string", "string"],
        "vulnerabilidades_graves": ["string", "string"],
        "recomendacion_tactica": "string"
      }
    `;

        const userPrompt = `
      Cargo aspirado: ${cargo}
      Respuestas del candidato (ID de pregunta : Respuesta):
      ${JSON.stringify(respuestas, null, 2)}
    `;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                response_format: { type: "json_object" },
                temperature: 0.2
            })
        });

        const aiData = await response.json();

        if (aiData.error) {
            throw new Error(aiData.error.message);
        }

        const resultadoEvaluacion = JSON.parse(aiData.choices[0].message.content);

        return NextResponse.json(resultadoEvaluacion);
    } catch (error) {
        console.error('Error en el Juez Evaluador:', error);
        return NextResponse.json({ error: 'Error procesando la evaluación estratégica.' }, { status: 500 });
    }
}