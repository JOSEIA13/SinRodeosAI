'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 👉 IMPORTA EL MOTOR AQUÍ (Arriba, antes de declarar el componente)
const iniciarAnalisis = (datosFinales: Record<string, string>) => {
    setEstaEscribiendo(true);
    setTimeout(() => {
      setHistorial(prev => [...prev, { 
        rol: 'ia', 
        texto: "Entrevista completada. Procesando variables territoriales, de posicionamiento y riesgo. Generando matriz estratégica..." 
      }]);
      setEstaEscribiendo(false);
      setAnalizando(true);

      // 1. EJECUTAR EL MOTOR DE CÁLCULO BASE
      const resultadoCalculado = calcularDiagnosticoBase(datosFinales);

      // 2. GUARDAR EL RESULTADO ESTRUCTURADO EN LOCALSTORAGE
      localStorage.setItem('sinrodeos_data_estructurada', JSON.stringify(datosFinales));
      localStorage.setItem('sinrodeos_resultado_diagnostico', JSON.stringify(resultadoCalculado));

      setTimeout(() => {
        router.push('/diagnostico/resultado');
      }, 3500);
    }, 1000);
  };
import { calcularDiagnosticoBase } from '@/lib/diagnostic/engine';

// Matriz Estratégica de Preguntas
const PREGUNTAS_ESTRATEGICAS = [
  { id: 'cargo', bloque: 'A. Perfil', texto: 'Comencemos con el objetivo: ¿A qué cargo aspira y en qué territorio específico?' },
  { id: 'motivacion', bloque: 'A. Perfil', texto: 'Más allá del discurso oficial, ¿cuál es su motivación personal y real para buscar este cargo ahora?' },
  { id: 'dolorTerritorio', bloque: 'B. Territorio', texto: 'Desde su lectura del terreno, ¿cuál es el mayor "dolor" o frustración actual de los ciudadanos en su territorio?' },
  { id: 'oportunidad', bloque: 'B. Territorio', texto: '¿Qué oportunidad de desarrollo o sector económico está siendo desaprovechado y usted planea potenciar?' },
  { id: 'diferenciacion', bloque: 'C. Posicionamiento', texto: 'Pensando en sus adversarios, ¿cuál es su mayor ventaja competitiva? Aquello que usted tiene y ellos definitivamente no.' },
  { id: 'promesaCentral', bloque: 'C. Posicionamiento', texto: 'Si tuviera que resumir su campaña en una sola frase o promesa central (su slogan táctico), ¿cuál sería?' },
  { id: 'percepcion', bloque: 'C. Posicionamiento', texto: '¿Cómo cree que lo percibe actualmente el votante promedio? (Sea totalmente objetivo con su imagen actual).' },
  { id: 'equipo', bloque: 'D. Capacidad', texto: 'Hablemos de estructura: ¿Cuenta con un equipo político organizado y líderes territoriales consolidados, o está construyendo desde cero?' },
  { id: 'movilizacion', bloque: 'D. Capacidad', texto: 'En una escala realista, ¿qué tanta capacidad de movilización el día de elecciones (Día D) tiene garantizada hoy?' },
  { id: 'vulnerabilidad', bloque: 'E. Riesgos', texto: 'Entramos a la fase crítica: ¿Cuál considera que es su mayor debilidad o vulnerabilidad personal/política en esta contienda?' },
  { id: 'criticaAdversarios', bloque: 'E. Riesgos', texto: '¿Por dónde cree que lo van a atacar sus adversarios cuando la campaña se vuelva hostil?' },
  { id: 'cierre', bloque: 'E. Riesgos', texto: 'Finalmente, ¿existe alguna controversia pasada, legal o pública, que su equipo de estrategia deba conocer para preparar la contención?' }
];

export default function EntrevistaEstructuradaPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(0); 
  const [respuestaActual, setRespuestaActual] = useState("");
  const [historial, setHistorial] = useState<{rol: 'ia' | 'candidato', texto: string}[]>([]);
  
  // AQUI ESTÁ LA MAGIA: El objeto que guarda la data estructurada
  const [datosEstructurados, setDatosEstructurados] = useState<Record<string, string>>({});
  
  const [estaEscribiendo, setEstaEscribiendo] = useState(true);
  const [analizando, setAnalizando] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let montado = true;
    setTimeout(() => {
      if (montado) {
        setHistorial([{ rol: 'ia', texto: PREGUNTAS_ESTRATEGICAS[0].texto }]);
        setEstaEscribiendo(false);
      }
    }, 1500);
    return () => { montado = false; };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historial, estaEscribiendo]);

  const iniciarPregunta = (index: number) => {
    setEstaEscribiendo(true);
    setTimeout(() => {
      setHistorial(prev => [...prev, { rol: 'ia', texto: PREGUNTAS_ESTRATEGICAS[index].texto }]);
      setEstaEscribiendo(false);
    }, 1500);
  };

  const handleEnviar = () => {
    if (!respuestaActual.trim() || estaEscribiendo) return;

    const nuevaRespuesta = respuestaActual;
    const preguntaActual = PREGUNTAS_ESTRATEGICAS[paso];

    // 1. Actualizar el chat visual
    setHistorial(prev => [...prev, { rol: 'candidato', texto: nuevaRespuesta }]);
    setRespuestaActual("");

    // 2. Guardar en la estructura de datos real
    setDatosEstructurados(prev => ({
      ...prev,
      [preguntaActual.id]: nuevaRespuesta
    }));

    const siguientePaso = paso + 1;
    
    if (siguientePaso < PREGUNTAS_ESTRATEGICAS.length) {
      setPaso(siguientePaso);
      iniciarPregunta(siguientePaso);
    } else {
      // Hemos terminado todas las preguntas
      iniciarAnalisis({ ...datosEstructurados, [preguntaActual.id]: nuevaRespuesta });
    }
  };

  const iniciarAnalisis = (datosFinales: Record<string, string>) => {
    setEstaEscribiendo(true);
    setTimeout(() => {
      setHistorial(prev => [...prev, { 
        rol: 'ia', 
        texto: "Entrevista completada. Procesando variables territoriales, de posicionamiento y riesgo. Generando matriz estratégica..." 
      }]);
      setEstaEscribiendo(false);
      setAnalizando(true);

      // Guardamos los datos estructurados en localStorage para el MVP
      // En la Fase 2, aquí es donde haremos el POST al backend de IA
      localStorage.setItem('sinrodeos_data_estructurada', JSON.stringify(datosFinales));

      setTimeout(() => {
        router.push('/diagnostico/resultado');
      }, 3500);
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
              <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
                {PREGUNTAS_ESTRATEGICAS[paso]?.bloque || "Procesando"}
              </p>
              <p className="text-sm font-semibold flex items-center gap-2">
                Recopilación de Datos 
                {analizando && <span className="flex items-center gap-1 text-[#D4A53A] text-xs"><Activity className="w-3 h-3 animate-pulse"/> Analizando</span>}
              </p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-[#94A3B8] uppercase tracking-wider">Progreso</p>
            <p className="text-sm font-bold text-[#D4A53A]">{Math.min(paso + 1, PREGUNTAS_ESTRATEGICAS.length)} / {PREGUNTAS_ESTRATEGICAS.length}</p>
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

                <div className={`max-w-[85%] rounded-2xl p-4 text-sm md:text-base leading-relaxed ${
                  mensaje.rol === 'ia' 
                    ? 'bg-[#111827] border border-[#233044] text-[#F8FAFC]' 
                    : 'bg-[#D4A53A] text-[#0B1220] font-medium shadow-lg'
                }`}>
                  {mensaje.texto}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {estaEscribiendo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
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

      {/* Input */}
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
              placeholder={estaEscribiendo ? "Procesando táctica..." : "Redacte su respuesta detallada aquí... (Enter para enviar)"}
              disabled={estaEscribiendo}
              className="w-full bg-[#111827] border border-[#233044] rounded-xl pl-4 pr-14 py-4 text-sm text-white outline-none focus:border-[#D4A53A] transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
              rows={3}
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

      {/* Overlay de Carga */}
      <AnimatePresence>
        {analizando && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-[#0B1220]/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-24 h-24 relative mb-8">
              <div className="absolute inset-0 border-4 border-[#233044] rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#D4A53A] rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity className="w-8 h-8 text-[#D4A53A]" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold mb-3 tracking-tight">Estructurando Datos</h2>
            <p className="text-[#94A3B8] max-w-md text-lg">
              Compilando variables territoriales, perfiles de riesgo y posicionamiento en formato JSON para el motor estratégico...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}