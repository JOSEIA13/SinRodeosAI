import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { respuestas, cargo } = body;

        const apiKey = process.env.TOKEN_SECRETO_IA;

        if (!apiKey) {
            return NextResponse.json({ error: 'Falta configurar el TOKEN_SECRETO_IA en Vercel' }, { status: 500 });
        }

        const systemPrompt = `
      Eres un Consultor Político Senior, experto en perfilamiento psicológico de candidatos y estrategia electoral despiadada.
      Estás evaluando a un aspirante a un cargo ${cargo}.
      
      REGLA 1 - DETECCIÓN DE HUMO: Si las respuestas son evasivas, usan clichés ("trabajar por el pueblo") o no responden la crisis planteada, el puntaje debe caer drásticamente.
      
      TU MISIÓN: Generar un perfil psicológico-estratégico del candidato basado en sus decisiones ante las 3 situaciones planteadas (Crisis, Narrativa, Realpolitik).
      
      FORMATO DE SALIDA OBLIGATORIO (JSON estricto):
      {
        "arquetipo_politico": "Asigna un perfil (Ej: 'El Gerente Pragmático', 'El Novato Idealista', 'El Político Tradicional', 'El Estratega Calculador')",
        "puntaje_global": number,
        "resumen_fortalezas": "Una frase corta validando su punto más fuerte (alimenta su ego).",
        "gancho_de_dolor": "Una frase muy dura y analítica sobre su principal falla en las respuestas. Tiene que asustarlo sobre lo que le pasaría en una campaña real por pensar así.",
        "puntos_ciegos_criticos": ["Falla táctica 1", "Falla táctica 2", "Falla táctica 3"] 
      }
    `;

        const userPrompt = `
      Cargo aspirado: ${cargo}
      Respuestas del candidato ante situaciones de alto estrés:
      ${JSON.stringify(respuestas, null, 2)}
    `;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Si tienes GPT-4o habilitado, puedes usarlo para mayor profundidad
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                response_format: { type: "json_object" },
                temperature: 0.4 // Subimos un poco la temperatura para que sea más creativo en el Arquetipo
            })
        });

        const aiData = await response.json();

        if (aiData.error) throw new Error(aiData.error.message);

        const resultadoEvaluacion = JSON.parse(aiData.choices[0].message.content);
        return NextResponse.json(resultadoEvaluacion);

    } catch (error) {
        console.error("Error en evaluación:", error);
        return NextResponse.json({ error: 'Error procesando la evaluación estratégica.' }, { status: 500 });
    }
}