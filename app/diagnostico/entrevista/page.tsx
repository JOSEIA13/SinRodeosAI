'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { calcularDiagnosticoBase } from '@/lib/diagnostic/engine';

const FASES_ENTREVISTA = [
  {
    fase: 1,
    nombre: 'Fase 1: Perfil y Propósito',
    descripcion: 'Definición del objetivo electoral y motivación central.',
    preguntas: [
      { id: 'cargo', texto: 'Comencemos con el objetivo: ¿A qué cargo aspira actualmente?' },
      { id: 'motivacion', texto: 'Más allá del discurso oficial, ¿cuál es la verdadera motivación personal y política detrás de esta candidatura?' },
      { id: 'arquetipo', texto: '¿Cómo definiría su estilo de liderazgo principal frente a los electores?' }
    ]
  },
  {
    fase: 2,
    nombre: 'Fase 2: Territorio y Oponente',
    descripcion: 'Lectura del terreno, dolores ciudadanos y competencia.',
    preguntas: [
      { id: 'dolorTerritorio', texto: 'Desde su lectura del terreno, ¿cuál es el problema más urgente y doloroso que la ciudadanía reclama en las calles?' },
      { id: 'oponentePrincipal', texto: '¿Quién considera que es su oponente más fuerte a vencer y cuál es su mayor debilidad?' },
      { id: 'segmentoClave', texto: '¿Cuál es el segmento poblacional o nicho geográfico que definirá esta elección y por qué?' },
      { id: 'propuestaDiferencial', texto: '¿Cuál es su propuesta más disruptiva o diferencial frente a los candidatos tradicionales?' }
    ]
  },
  {
    fase: 3,
    nombre: 'Fase 3: Capacidad Operativa y Día D',
    descripcion: 'Estructura, resiliencia de crisis y movilización.',
    preguntas: [
      { id: 'estructuraBase', texto: '¿Cómo evalúa la solidez actual de su estructura territorial y equipos base?' },
      { id: 'crisisControl', texto: 'Ante un ataque mediático o escándalo repentino en campaña, ¿cuál es su protocolo de respuesta inmediata?' },
      { id: 'presupuestoRiesgo', texto: '¿Cómo calificaría la suficiencia de sus recursos financieros y logísticos actuales?' },
      { id: 'movilizacionDiaD', texto: 'Finalmente, ¿cuenta con un sistema probado para garantizar la movilización y el control de votos el Día D?' }
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
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (PREGUNTAS_PLANAS.length > 0) {
      setHistorial([
        {
          rol: 'ia',
          texto: `Iniciamos el Diagnóstico Estratégico Sin Rodeos. Fase 1: Perfil y Propósito.\n\n${PREGUNTAS_PLANAS[0].texto}`
        }
      ]);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historial, estaEscribiendo]);

  const iniciarAnalisis = (datosFinales: Record<string, string>) => {
    const resultadoCalculado = calcularDiagnosticoBase(datosFinales);
    localStorage.setItem('sinrodeos_data_estructurada', JSON.stringify(datosFinales));
    localStorage.setItem('sinrodeos_resultado_diagnostico', JSON.stringify(resultadoCalculado));

    setAnalizando(true);
    setTimeout(() => {
      setAnalizando(false);
      setMostrarModalContacto(true);
    }, 1000);
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
      const siguientePregunta = PREGUNTAS_PLANAS[siguienteIndice];
      setEstaEscribiendo(true);
      setTimeout(() => {
        const nextText =
          siguientePregunta.fase !== preguntaObj.fase
            ? `Avanzamos a la ${siguientePregunta.nombreFase}.\n\n${siguientePregunta.texto}`
            : siguientePregunta.texto;

        setHistorial((prev) => [...prev, { rol: 'ia', texto: nextText }]);
        setIndiceActual(siguienteIndice);
        setEstaEscribiendo(false);
      }, 1000);
    } else {
      iniciarAnalisis(nuevasRespuestas);
    }
  };

  const enviarSolicitudFinal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactoUsuario.email || !contactoUsuario.whatsapp) return;

    setAnalizando(true);

    const paqueteCompleto = {
      respuestas: datosAcumulados,
      contacto: contactoUsuario,
      fecha: new Date().toISOString()
    };

    localStorage.setItem('sinrodeos_solicitud_pendiente', JSON.stringify(paqueteCompleto));

    try {
      await fetch('/api/enviar-solicitud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paqueteCompleto)
      });
    } catch (error) {
      console.error('Error al enviar notificación', error);
    }

    router.push('/diagnostico/espera');
  };

  const faseActualObj = PREGUNTAS_PLANAS[indiceActual]
    ? FASES_ENTREVISTA.find((f) => f.fase === PREGUNTAS_PLANAS[indiceActual].fase)
    : null;

  const progresoPorcentaje = Math.round(((indiceActual + 1) / PREGUNTAS_PLANAS.length) * 100);

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] flex flex-col justify-between">
      <header className="bg-[#111827] border-b border-[#233044] px-6 py-4 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#D4A53A] flex items-center justify-center font-bold text-[#0B1220]">SR</div>
            <div>
              <h1 className="text-sm font-bold tracking-wider uppercase">Entrevista Estratégica por Fases</h1>
              <p className="text-xs text-[#D4A53A] font-medium">{faseActualObj ? faseActualObj.nombre : 'Finalizando...'}</p>
            </div>
          </div>
          <div className="w-full md:w-64">
            <div className="flex justify-between text-xs text-[#94A3B8] mb-1">
              <span>Progreso General</span>
              <span>{progresoPorcentaje}%</span>
            </div>
            <div className="w-full bg-[#0B1220] h-2 rounded-full overflow-hidden border border-[#233044]">
              <div className="bg-[#D4A53A] h-full transition-all duration-500" style={{ width: `${progresoPorcentaje}%` }} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex-1 flex flex-col space-y-6 overflow-y-auto scrollbar-custom">
        {historial.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${msg.rol === 'usuario' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.rol === 'usuario' ? 'bg-[#D4A53A] text-[#0B1220]' : 'bg-[#111827] border border-[#233044] text-[#D4A53A]'}`}>
              {msg.rol === 'usuario' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div
              className={`p-4 rounded-2xl max-w-xl text-sm leading-relaxed whitespace-pre-line ${
                msg.rol === 'usuario'
                  ? 'bg-[#D4A53A] text-[#0B1220] font-medium rounded-tr-none'
                  : 'bg-[#111827] border border-[#233044] text-[#F8FAFC] rounded-tl-none shadow-lg'
              }`}
            >
              {msg.texto}
            </div>
          </motion.div>
        ))}

        {estaEscribiendo && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#111827] border border-[#233044] text-[#D4A53A] flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#111827] border border-[#233044] px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
              <div className="w-2 h-2 bg-[#D4A53A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#D4A53A] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-[#D4A53A] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </main>

      <footer className="bg-[#111827] border-t border-[#233044] p-4 sticky bottom-0 z-20">
        <form onSubmit={manejarEnvio} className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={respuestaActual}
            onChange={(e) => setRespuestaActual(e.target.value)}
            placeholder={analizando ? 'Generando diagnóstico con el motor...' : 'Escriba su respuesta estratégica aquí...'}
            disabled={analizando}
            className="flex-1 bg-[#0B1220] border border-[#233044] rounded-xl px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#D4A53A] transition-colors disabled:opacity-50"
            autoFocus
          />
          <button
            type="submit"
            disabled={analizando || !respuestaActual.trim()}
            className="bg-[#D4A53A] text-[#0B1220] font-bold px-6 py-3 rounded-xl hover:bg-[#b88f2f] transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <span>Enviar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </footer>

      {mostrarModalContacto && (
        <div className="fixed inset-0 bg-[#0B1220]/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#233044] max-w-md w-full p-8 rounded-2xl shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-extrabold text-white">¡Diagnóstico Base Generado!</h3>
              <p className="text-xs text-[#94A3B8]">
                Para procesar el puntaje oficial IESR™ y enviar el análisis de consultoría directamente a tu WhatsApp o correo, ingresa tus datos:
              </p>
            </div>
            <form onSubmit={enviarSolicitudFinal} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase block mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="candidato@correo.com"
                  value={contactoUsuario.email}
                  onChange={(e) => setContactoUsuario({ ...contactoUsuario, email: e.target.value })}
                  className="w-full bg-[#0B1220] border border-[#233044] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A53A]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#94A3B8] uppercase block mb-1">Número de WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="+57 300 000 0000"
                  value={contactoUsuario.whatsapp}
                  onChange={(e) => setContactoUsuario({ ...contactoUsuario, whatsapp: e.target.value })}
                  className="w-full bg-[#0B1220] border border-[#233044] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A53A]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMostrarModalContacto(false)}
                  className="px-4 py-3 rounded-xl border border-[#233044] text-[#94A3B8] hover:border-[#D4A53A] transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={analizando}
                  className="px-4 py-3 rounded-xl bg-[#D4A53A] text-[#0B1220] font-bold hover:bg-[#b88f2f] transition-all disabled:opacity-50"
                >
                  {analizando ? 'Enviando solicitud...' : 'Solicitar Análisis Experto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
