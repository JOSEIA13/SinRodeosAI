import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: 'RESEND_API_KEY no está configurada.' },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const data = await resend.emails.send({
      from: 'Sin Rodeos <no-reply@tudominio.com>', // Cambia por tu dominio verificado en Resend
      to: ['reservaloaxm@gmail.com'],
      subject: 'Nueva Solicitud de Diagnóstico - Plataforma Sin Rodeos',
      text: `Nueva entrevista recibida:\n\n${JSON.stringify(body, null, 2)}`
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}