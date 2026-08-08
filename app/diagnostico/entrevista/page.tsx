'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Activity, CheckCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { calcularDiagnosticoBase } from '@/lib/diagnostic/engine';

// Estructura de preguntas organizada por Fases Estratégicas
const FASES_ENTREVISTA = [
  {
    fase: 1,
    nombre: "Fase 1: Perfil y Propósito",
    descripcion: "Definición del objetivo electoral y motivación central.",
    preguntas: [
      { id: 'cargo', texto: 'Comencemos con el objetivo: ¿A qué cargo aspira actualmente?' },
      { id: 'motivacion', texto: 'Más allá del discurso oficial, ¿cuál es la verdadera motivación personal y política detrás de esta candidatura?' },
      { id: 'arquetipo', texto: '¿Cómo definiría su estilo de liderazgo principal frente a los electores?' }
    ]
  },
  {
    fase: 2,
    nombre: "Fase 2: Territorio y Oponente",
    descripcion: "Lectura del terreno, dolores ciudadanos y competencia.",
    preguntas: [
      { id: 'dolorTerritorio', texto: 'Desde su lectura del terreno, ¿cuál es el problema más urgente y doloroso que la ciudadanía reclama en las calles?' },
      { id: 'oponentePrincipal', texto: '¿Quién considera que es su oponente más fuerte a vencer y cuál es su mayor debilidad?' },
      { id: 'segmentoClave', texto: '¿Cuál es el segmento poblacional o nicho geográfico que definirá esta elección y por qué?' },
      { id: 'propuestaDiferencial', texto: '¿Cuál es su propuesta más disruptiva o diferencial frente a los candidatos tradicionales?' }
    ]
  },
  {
    fase: 3,
    nombre: "Fase 3: Capacidad Operativa y Día D",
    descripcion: "Estructura, resiliencia de crisis y movilización.",
    preguntas: [
      { id: 'estructuraBase', texto: '¿Cómo evalúa la solidez actual de su estructura territorial y equipos base?' },
      { id: 'crisisControl', texto: 'Ante un ataque mediático o escándalo repentino en campaña, ¿cuál es su protocolo de respuesta inmediata?' },
      { id: 'presupuestoRiesgo', texto: '¿Cómo calificaría la suficiencia de sus recursos financieros y logísticos actuales?' },
      { id: 'movilizacionDiaD', texto: 'Finalmente, ¿cuenta con un sistema probado para garantizar la movilización y el control de votos el Día D?' }
    ]
  }
];

// Aplanamos las preguntas para el flujo del chat interactivo manteniendo el índice de fase
const PREGUNTAS_PLANAS = FASES_ENTREVISTA.flatMap((faseObj) => 
  faseObj.preguntas.map(p => ({ ...p, fase: faseObj.fase, nombreFase: faseObj.nombre }))
);

export default function EntrevistaEstructuradaPage() {
  const router = useRouter();
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestaActual, setRespuestaActual] = useState('');
  const [datosAcumulados, setDatosAcumulados] = useState<Record<string, string>>({});
  const [historial, setHistorial] = useState<Array<{ rol: 'ia' | 'usuario'; texto: string }>>([]);
  const [estaEscribiendo, setEstaEscribiendo] = useState(false);
  const [analizando, setAnalizando] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Iniciar la entrevista con la primera pregunta
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

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respuestaActual.trim() || analizando) return;

    const preguntaObj = PREGUNTAS_PLANAS[indiceActual];
    const nuevasRespuestas = { ...datosAcumulados, [preguntaObj.id]: respuestaActual.trim() };
    setDatosAcumulados(nuevasRespuestas);

    // Agregar respuesta del usuario al historial
    setHistorial(prev => [...prev, { rol: 'usuario', texto: respuestaActual.trim() }]);
    setRespuestaActual('');

    const siguienteIndice = indiceActual + 1;

    if (siguienteIndice < PREGUNTAS_PLANAS.length) {
      const siguientePregunta = PREGUNTAS_PLANAS[siguienteIndice];
      
      setEstaEscribiendo(true);
      setTimeout(() => {
        // Verificar si cambió de fase para notificar en el chat
        let textoMensaje = siguientePregunta.texto;
        if (siguientePregunta.fase !== preguntaObj.fase) {
          textoMensaje = `Avanzamos a la **${siguientePregunta.nombreFase}**.\n\n${siguientePregunta.texto}`;
        }

        setHistorial(prev => [...prev, { rol: 'ia', texto: textoMensaje }]);
        setEstaEscribiendo(false);
        setIndiceActual(siguienteIndice);
      }, 1000);
    } else {
      // Fin de la entrevista: Ejecutar motor
      iniciarAnalisis(nuevasRespuestas);
    }
  };

  const iniciarAnalisis = (datosFinales: Record<string, string>) => {
    setAnalizando(true);
    setEstaEscribiendo(true);
    
    setTimeout(() => {
      setHistorial(prev => [...prev, { 
        rol: 'ia', 
        texto: "Entrevista completada por fases. Procesando variables territoriales, de posicionamiento y riesgo. Generando matriz estratégica..." 
      }]);
      setEstaEscribiendo(false);

      // 1. Ejecutar el motor de cálculo real con las respuestas recolectadas
      const resultadoCalculado = calcularDiagnosticoBase(datosFinales);

      // 2. Guardar en localStorage
      localStorage.setItem('sinrodeos_data_estructurada', JSON.stringify(datosFinales));
      localStorage.setItem('sinrodeos_resultado_diagnostico', JSON.stringify(resultadoCalculado));

      setTimeout(() => {
        router.push('/diagnostico/resultado');
      }, 3000);
    }, 1500);
  };

  const faseActualObj = PREGUNTAS_PLANAS[indiceActual] ? FASES_ENTREVISTA.find(f => f.fase === PREGUNTAS_PLANAS[indiceActual].fase) : null;
  const progresoPorcentaje = Math.round(((indiceActual) / PREGUNTAS_PLANAS.length) * 100);

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] flex flex-col justify-between">
      
      {/* Barra superior con Progreso por Fases */}
      <header className="bg-[#111827] border-b border-[#233044] px-6 py-4 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#D4A53A] flex items-center justify-center font-bold text-[#0B1220]">
              SR
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wider uppercase">Entrevista Estratégica por Fases</h1>
              <p className="text-xs text-[#D4A53A] font-medium">{faseActualObj ? faseActualObj.nombre : "Finalizando..."}</p>
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <div className="flex justify-between text-xs text-[#94A3B8] mb-1">
              <span>Progreso General</span>
              <span>{progresoPorcentaje}%</span>
            </div>
            <div className="w-full bg-[#0B1220] h-2 rounded-full overflow-hidden border border-[#233044]">
              <div 
                className="bg-[#D4A53A] h-full transition-all duration-500" 
                style={{ width: `${progresoPorcentaje}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenedor del Chat */}
      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex-1 flex flex-col space-y-6 overflow-y-auto">
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
            
            <div className={`p-4 rounded-2xl max-w-xl text-sm leading-relaxed whitespace-pre-line ${
              msg.rol === 'usuario' 
                ? 'bg-[#D4A53A] text-[#0B1220] font-medium rounded-tr-none' 
                : 'bg-[#111827] border border-[#233044] text-[#F8FAFC] rounded-tl-none shadow-lg'
            }`}>
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
              <div className="w-2 h-2 bg-[#D4A53A] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#D4A53A] rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-[#D4A53A] rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Barra de Entrada / Respuesta */}
      <footer className="bg-[#111827] border-t border-[#233044] p-4 sticky bottom-0 z-20">
        <form onSubmit={manejarEnvio} className="max-w-3xl mx-auto flex gap-3">
          <input 
            type="text"
            value={respuestaActual}
            onChange={(e) => setRespuestaActual(e.target.value)}
            placeholder={analizando ? "Generando diagnóstico con el motor..." : "Escriba su respuesta estratégica aquí..."}
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

    </div>
  );
}