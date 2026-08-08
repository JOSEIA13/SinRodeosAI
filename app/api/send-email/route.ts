import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { respuestas, usuarioEmail } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'Sin Rodeos <no-reply@tu-dominio.com>', // O un correo verificado en Resend
      to: ['reservaloaxm@gmail.com'],
      subject: 'Nueva Solicitud de Diagnóstico - Plataforma Sin Rodeos',
      text: `Nueva entrevista recibida de: ${usuarioEmail}\n\nDatos:\n${JSON.stringify(respuestas, null, 2)}`
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}