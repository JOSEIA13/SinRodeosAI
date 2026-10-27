import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Resend } from 'resend';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { cargo, historial, correo, telefono, respuestas } = body;

        const systemPrompt = `
      Eres el Consultor Político Jefe de la agencia 'Sin Rodeos', experto en perfilamiento psicológico, capacidad operativa y estrategia electoral despiadada.
      Estás evaluando a un aspirante al cargo de: ${cargo}.
      Su historial político es: ${historial}.
      
      REGLA DE PERFILAMIENTO: 
      - Si es "Excandidato", tu gancho de dolor debe ser crudo sobre por qué volverá a perder si repite sus errores.
      - Si es "Aspirante Nuevo", tu gancho de dolor debe enfocarse en su ingenuidad y cómo la maquinaria lo destruirá.
      - Evalúa estrictamente la "Capacidad Operativa": ¿Sabe delegar, tiene reflejos rápidos o es un llanero solitario que colapsará?
      
      FORMATO DE SALIDA OBLIGATORIO (JSON estricto):
      {
        "arquetipo_politico": "Asigna un perfil",
        "puntaje_global": 50,
        "capacidad_operativa": "Diagnóstico corto sobre su equipo y logística.",
        "mapeo_comunicacional": {
          "fortaleza_principal": "Su mayor virtud al comunicar.",
          "falla_estructural": "El error de comunicación que le costará votos."
        },
        "gancho_de_dolor": "Una frase muy dura que asuste al candidato.",
        "puntos_ciegos_criticos": ["Falla operativa 1", "Falla de narrativa 2", "Falla estratégica 3"] 
      }
    `;

        const userPrompt = `Respuestas del candidato:\n${JSON.stringify(respuestas, null, 2)}`;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: "gpt-4o-mini",
            response_format: { type: "json_object" }
        });

        const dictamen = JSON.parse(completion.choices[0].message.content || '{}');

        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: 'Sin Rodeos AI <onboarding@resend.dev>',
                to: 'TU_CORREO_DE_AGENCIA@gmail.com', // CAMBIA ESTO POR TU CORREO
                subject: `🚨 LEAD: ${cargo} - ${dictamen.arquetipo_politico} (${dictamen.puntaje_global}/100)`,
                html: `
          <h2>Nuevo prospecto capturado</h2>
          <ul>
            <li><strong>Cargo:</strong> ${cargo}</li>
            <li><strong>Historial:</strong> ${historial}</li>
            <li><strong>WhatsApp:</strong> ${telefono}</li>
            <li><strong>Correo:</strong> ${correo}</li>
          </ul>
          <h3>Vulnerabilidades:</h3>
          <p>${dictamen.puntos_ciegos_criticos.join('<br>')}</p>
        `
            });
        }

        return NextResponse.json(dictamen);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error procesando la evaluación' }, { status: 500 });
    }
}