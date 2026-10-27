// ... (código anterior de OpenAI)

const dictamen = JSON.parse(completion.choices[0].message.content || '{}');

// Validación estricta para evitar que envíe con la llave de prueba
if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_dummy_key_para_compilar') {
    await resend.emails.send({
        from: 'Sin Rodeos AI <onboarding@resend.dev>',
        to: 'unioncafetero@gmail.com',
        subject: `🚨 LEAD: ${cargo} - ${dictamen.arquetipo_politico} (${dictamen.puntaje_global}/100)`,
        html: `
          <h2>Nuevo prospecto capturado</h2>
          <ul>
            <li><strong>Cargo:</strong> ${cargo}</li>
            <li><strong>Historial:</strong> ${historial}</li>
            <li><strong>WhatsApp:</strong> ${telefono}</li>
            <li><strong>Correo:</strong> ${correo}</li>
          </ul>
          <h3>Vulnerabilidades para la venta:</h3>
          <p>${dictamen.puntos_ciegos_criticos.join('<br>')}</p>
        `
    });
}

return NextResponse.json(dictamen);