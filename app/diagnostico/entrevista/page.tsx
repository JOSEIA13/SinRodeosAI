'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EntrevistaPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(0); 
  const [respuestaActual, setRespuestaActual] = useState("");
  const [historial, setHistorial] = useState<{rol: 'ia' | 'candidato', texto: string}[]>([]);
  const [estaEscribiendo, setEstaEscribiendo] = useState(true);
  const [analizando, setAnalizando] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const preguntasEstrategicas = [
    "Comencemos con lo fundamental: ¿Cuál es el principal motivo que lo impulsa a buscar este cargo en este momento específico?",
    "Entendido. Desde su perspectiva, ¿cuál es el mayor 'dolor' o problema no resuelto de los ciudadanos en su territorio?",
    "Para contrastar con sus adversarios, ¿cuál considera que es su mayor ventaja competitiva? Aquello que usted tiene y ellos no.",
    "Finalmente, si su campaña tuviera que resumirse en una sola frase o promesa central, ¿cuál sería?"
  ];

  // Iniciar la primera pregunta al cargar la página
  useEffect(() => {
    let montado = true;
    setTimeout(() => {
      if (montado) {
        setHistorial([{ rol: 'ia', texto: preguntasEstrategicas[0] }]);
        setEstaEscribiendo(false);
      }
    }, 1500);
    return () => { montado = false; };
  }, []);

  // Auto-scroll al último mensaje
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historial, estaEscribiendo]);

  const iniciarPregunta = (index: number) => {
    setEstaEscribiendo(true);
    setTimeout(() => {
      setHistorial(prev => [...prev, { rol: 'ia', texto: preguntasEstrategicas[index] }]);
      setEstaEscribiendo(false);
    }, 1500);
  };

  const handleEnviar = () => {
    if (!respuestaActual.trim() || estaEscribiendo) return;

    const nuevaRespuesta = respuestaActual;
    setRespuestaActual("");
    setHistorial(prev => [...prev, { rol: 'candidato', texto: nuevaRespuesta }]);

    const siguientePaso = paso + 1;
    
    if (siguientePaso < preguntasEstrategicas.length) {
      setPaso(siguientePaso);
      iniciarPregunta(siguientePaso);
    } else {
      iniciarAnalisis();
    }
  };

  const iniciarAnalisis = () => {
    setEstaEscribiendo(true);
    setTimeout(() => {
      setHistorial(prev => [...prev, { 
        rol: 'ia', 
        texto: "Entrevista completada. Iniciando procesamiento de lenguaje natural y generación de Candidate DNA™..." 
      }]);
      setEstaEscribiendo(false);
      setAnalizando(true);

      // Redirigir a los resultados después de 3 segundos
      setTimeout(() => {
        router.push('/diagnostico/resultado');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col items-center">
      
      {/* Header fijo */}
      <div className="w-full bg-[#111827] border-b border-[#233044] p-4 sticky top-0 z-10 flex justify-center">
        <div className="max-w-3xl w-full flex justify-between items-center px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#D4A53A]/10 border border-[#D4A53A]/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#D4A53A]" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">Sin Rodeos OS</p>
              <p className="text-sm font-semibold flex items-center gap-2">
                Entrevista Activa 
                {analizando && <span className="flex items-center gap-1 text-[#D4A53A] text-xs"><Activity className="w-3 h-3 animate-pulse"/> Analizando</span>}
              </p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-[#94A3B8] uppercase tracking-wider">Progreso</p>
            <p className="text-sm font-bold text-[#D4A53A]">{Math.min(paso + 1, preguntasEstrategicas.length)} / {preguntasEstrategicas.length}</p>
          </div>
        </div>
      </div>

      {/* Área de Chat */}
      <div className="w-full max-w-3xl flex-1 flex flex-col p-4 sm:p-8 overflow-y-auto pb-40">
        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {historial.map((mensaje, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${mensaje.rol === 'candidato' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className="shrink-0 mt-1">
                  {mensaje.rol === 'ia' ? (
                    <div className="w-8 h-8 rounded-full bg-[#111827] border border-[#233044] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-[#D4A53A]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#D4A53A] flex items-center justify-center">
                      <User className="w-4 h-4 text-[#0B1220]" />
                    </div>
                  )}
                </div>

                {/* Burbuja de Mensaje */}
                <div className={`max-w-[85%] rounded-2xl p-4 text-sm md:text-base leading-relaxed ${
                  mensaje.rol === 'ia' 
                    ? 'bg-[#111827] border border-[#233044] text-[#F8FAFC]' 
                    : 'bg-[#D4A53A] text-[#0B1220] font-medium'
                }`}>
                  {mensaje.texto}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Indicador de "Escribiendo..." */}
          {estaEscribiendo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#111827] border border-[#233044] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#D4A53A]" />
              </div>
              <div className="bg-[#111827] border border-[#233044] rounded-2xl py-3 px-5 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input de Texto Fijo abajo */}
      {!analizando && (
        <div className="fixed bottom-0 w-full bg-[#0B1220]/90 backdrop-blur-md border-t border-[#233044] p-4 flex justify-center pb-8">
          <div className="max-w-3xl w-full relative">
            <textarea 
              value={respuestaActual}
              onChange={(e) => setRespuestaActual(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleEnviar();
                }
              }}
              placeholder={estaEscribiendo ? "Espere la pregunta..." : "Escriba su respuesta táctica aquí... (Presione Enter para enviar)"}
              disabled={estaEscribiendo}
              className="w-full bg-[#111827] border border-[#233044] rounded-xl pl-4 pr-14 py-4 text-sm text-white outline-none focus:border-[#D4A53A] transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
              rows={2}
            />
            <button 
              onClick={handleEnviar}
              disabled={!respuestaActual.trim() || estaEscribiendo}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#D4A53A] hover:bg-[#b88f2f] disabled:bg-[#233044] disabled:text-[#94A3B8] text-[#0B1220] p-2 rounded-lg transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Overlay de Análisis (Aparece al final) */}
      <AnimatePresence>
        {analizando && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-[#0B1220]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-20 h-20 relative mb-6">
              <div className="absolute inset-0 border-4 border-[#233044] rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#D4A53A] rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#D4A53A]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Procesando Candidate DNA™</h2>
            <p className="text-[#94A3B8] max-w-sm">Evaluando coherencia narrativa, identificando vulnerabilidades y estructurando el informe estratégico...</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
