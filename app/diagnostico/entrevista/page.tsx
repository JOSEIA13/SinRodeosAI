'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Bot, User, Download, Printer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { calcularDiagnosticoBase } from '@/lib/diagnostic/engine';

const FASES_ENTREVISTA = [
  {
    fase: 1,
    nombre: 'Fase 1: Perfil y Propósito',
    descripcion: 'Definición del objetivo electoral y motivación central.',
    preguntas: [
      { id: 'cargo', texto: '¿A qué cargo aspira actualmente?' },
      { id: 'motivacion', texto: 'Más allá del discurso oficial, ¿cuál es la verdadera motivación personal y política detrás de esta candidatura?' },
      { id: 'arquetipo', texto: '¿Cómo definiría su estilo de liderazgo principal frente a los electores?' }
    ]
  },
  {
    fase: 2,
    nombre: 'Fase 2: Territorio y Oponente',
    descripcion: 'Lectura del terreno, dolores ciudadanos y competencia.',
    preguntas: [
      { id: 'dolorTerritorio', texto: '¿Cuál es el problema más urgente y doloroso que la ciudadanía reclama en las calles?' },
      { id: 'oponentePrincipal', texto: '¿Quién considera que es su oponente más fuerte a vencer y cuál es su mayor debilidad?' },
      { id: 'segmentoClave', texto: '¿Cuál es el segmento poblacional o nicho geográfico que definirá esta elección y por qué?' },
      { id: 'propuestaDiferencial', texto: '¿Cuál es su propuesta más disruptiva frente a los candidatos tradicionales?' }
    ]
  },
  {
    fase: 3,
    nombre: 'Fase 3: Capacidad Operativa y Día D',
    descripcion: 'Estructura, resiliencia y movilización.',
    preguntas: [
      { id: 'estructuraBase', texto: '¿Cómo evalúa la solidez actual de su estructura territorial y equipos base?' },
      { id: 'crisisControl', texto: 'Ante un ataque mediático o escándalo, ¿cuál es su protocolo de respuesta inmediata?' },
      { id: 'presupuestoRiesgo', texto: '¿Cómo calificaría la suficiencia de sus recursos financieros y logísticos?' },
      { id: 'movilizacionDiaD', texto: '¿Cuenta con un sistema probado para garantizar el control de votos el Día D?' }
    ]
  }
];

const PREGUNTAS_PLANAS = FASES_ENTREVISTA.flatMap((faseObj) =>
  faseObj.preguntas.map((p) => ({ ...p, fase: faseObj.fase, nombreFase: faseObj.nombre }))
);

export default function EntrevistaEstructuradaPage() {
  const router = useRouter();
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestaActual, setRespuestaActual] = useState('');
  const [datosAcumulados, setDatosAcumulados] = useState<Record<string, string>>({});
  const [historial, setHistorial] = useState<Array<{ rol: 'ia' | 'usuario'; texto: string }>>([]);
  const [estaEscribiendo, setEstaEscribiendo] = useState(false);
  const [analizando, setAnalizando] = useState(false);
  const [mostrarModalContacto, setMostrarModalContacto] = useState(false);
  const [contactoUsuario, setContactoUsuario] = useState({ email: '', whatsapp: '' });
  const [resultadoFinal, setResultadoFinal] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistorial([
      {
        rol: 'ia',
        texto: `Iniciamos el Diagnóstico Estratégico. Fase 1: Perfil y Propósito.\n\n${PREGUNTAS_PLANAS[0].texto}`
      }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historial, estaEscribiendo]);

  const finalizarEntrevista = (datosFinales: Record<string, string>) => {
    const puntaje = calcularDiagnosticoBase(datosFinales);
    setResultadoFinal(puntaje);
    localStorage.setItem('sinrodeos_resultado_diagnostico', JSON.stringify(puntaje));
    setAnalizando(false);
    setMostrarModalContacto(true);
  };

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!respuestaActual.trim() || analizando) return;

    const preguntaObj = PREGUNTAS_PLANAS[indiceActual];
    const respuestaTrim = respuestaActual.trim();
    const nuevasRespuestas = { ...datosAcumulados, [preguntaObj.id]: respuestaTrim };

    setHistorial((prev) => [...prev, { rol: 'usuario', texto: respuestaTrim }]);
    setRespuestaActual('');
    setDatosAcumulados(nuevasRespuestas);

    const siguienteIndice = indiceActual + 1;

    if (siguienteIndice < PREGUNTAS_PLANAS.length) {
      setEstaEscribiendo(true);
      setTimeout(() => {
        const siguientePregunta = PREGUNTAS_PLANAS[siguienteIndice];
        const nextText = siguientePregunta.fase !== preguntaObj.fase
          ? `Avanzamos a la ${siguientePregunta.nombreFase}.\n\n${siguientePregunta.texto}`
          : siguientePregunta.texto;

        setHistorial((prev) => [...prev, { rol: 'ia', texto: nextText }]);
        setIndiceActual(siguienteIndice);
        setEstaEscribiendo(false);
      }, 800);
    } else {
      setAnalizando(true);
      finalizarEntrevista(nuevasRespuestas);
    }
  };

  const enviarSolicitudFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalizando(true);
    try {
      await fetch('/api/enviar-solicitud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respuestas: datosAcumulados,
          contacto: contactoUsuario,
          resultado: resultadoFinal
        })
      });
      router.push('/diagnostico/espera');
    } catch (err) {
      console.error(err);
      setAnalizando(false);
    }
  };

  const descargarReporte = () => {
    window.print();
  };

  const progreso = Math.round(((indiceActual + 1) / PREGUNTAS_PLANAS.length) * 100);

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      <header className="bg-[#111827] border-b border-[#233044] p-4 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-sm font-bold uppercase tracking-widest text-[#D4A53A]">Auditoría Estratégica</h1>
          <div className="w-40 bg-[#0B1220] h-2 rounded-full border border-[#233044] overflow-hidden">
            <div className="bg-[#D4A53A] h-full transition-all" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </header>

      <main className="max-w-3xl w-full mx-auto p-4 flex-1 space-y-6">
        {historial.map((msg, idx) => (
          <div key={idx} className={`flex items-start gap-3 ${msg.rol === 'usuario' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.rol === 'usuario' ? 'bg-[#D4A53A]' : 'bg-[#111827] border border-[#233044]'}`}>
              {msg.rol === 'usuario' ? <User className="w-4 h-4 text-black" /> : <Bot className="w-4 h-4 text-[#D4A53A]" />}
            </div>
            <div className={`p-4 rounded-2xl text-sm ${msg.rol === 'usuario' ? 'bg-[#D4A53A] text-black rounded-tr-none' : 'bg-[#111827] border border-[#233044] rounded-tl-none'}`}>
              {msg.texto}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      <footer className="p-4 bg-[#111827]">
        <form onSubmit={manejarEnvio} className="max-w-3xl mx-auto flex gap-2">
          <input
            className="flex-1 bg-[#0B1220] border border-[#233044] rounded-xl px-4 py-3 text-sm focus:border-[#D4A53A] outline-none"
            value={respuestaActual}
            onChange={(e) => setRespuestaActual(e.target.value)}
            placeholder="Respuesta estratégica..."
            disabled={analizando}
          />
          <button className="bg-[#D4A53A] px-6 py-2 rounded-xl text-black font-bold">Enviar</button>
        </form>
      </footer>

      {mostrarModalContacto && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111827] border border-[#233044] p-8 rounded-2xl max-w-md w-full space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#D4A53A]">Diagnóstico Calculado con Éxito</h2>
              <p className="text-xs text-[#94A3B8] mt-1">Puntuación y ponderación preliminar generada.</p>
            </div>

            <div className="bg-[#0B1220] p-4 rounded-xl border border-[#233044] text-center">
              <span className="text-xs text-gray-400 uppercase tracking-wider block">Puntaje Global</span>
              <span className="text-3xl font-black text-[#D4A53A]">
                {typeof resultadoFinal === 'object' ? resultadoFinal?.total || resultadoFinal?.puntajeFinal || 'Evaluado' : resultadoFinal}
              </span>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={descargarReporte} className="flex-1 border border-[#D4A53A] text-[#D4A53A] py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#D4A53A]/10">
                <Download className="w-4 h-4" /> Descargar / Imprimir
              </button>
              <button type="button" onClick={descargarReporte} className="flex-1 border border-[#233044] text-gray-300 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800">
                <Printer className="w-4 h-4" /> Vista PDF
              </button>
            </div>

            <form onSubmit={enviarSolicitudFinal} className="space-y-3 border-t border-[#233044] pt-4">
              <p className="text-xs text-[#94A3B8]">Ingresa tus datos para recibir copia en tu correo y continuar:</p>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full bg-black border border-[#233044] p-3 rounded-xl text-sm outline-none focus:border-[#D4A53A]"
                value={contactoUsuario.email}
                onChange={(e) => setContactoUsuario({ ...contactoUsuario, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Tu WhatsApp"
                className="w-full bg-black border border-[#233044] p-3 rounded-xl text-sm outline-none focus:border-[#D4A53A]"
                value={contactoUsuario.whatsapp}
                onChange={(e) => setContactoUsuario({ ...contactoUsuario, whatsapp: e.target.value })}
                required
              />
              <button className="w-full bg-[#D4A53A] text-black py-3 rounded-xl font-bold text-sm hover:brightness-110 transition">
                Enviar Copia y Ver Informe Completo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
