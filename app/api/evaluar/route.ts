import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Resend } from 'resend';

// Inicializamos las llaves de API
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { cargo, historial, correo, telefono, respuestas } = body;

        // 1. El Cerebro (Prompt del Sistema con inyección de cargo e historial)
        const systemPrompt = `
      Eres el Consultor Político Jefe de la agencia 'Sin Rodeos', experto en perfilamiento psicológico