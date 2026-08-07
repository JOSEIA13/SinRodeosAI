'use client';

import React, { useState, useEffect } from 'react';
import { Target, ShieldAlert, Briefcase, Activity } from 'lucide-react';
import Link from 'next/link';

const THEME = {
  bg: '#0B1220',
  surface: '#111827',
  primary: '#D4A53A',
  text: '#F8FAFC',
  muted: '#94A3B8',
  border: '#233044'
};

export default function LandingPremium() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden" style={{ backgroundColor: THEME.bg, color: THEME.text }}>
      
      {/* Navbar con el menú */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'backdrop-blur-md shadow-2xl' : 'border-transparent'}`} style={{ backgroundColor: isScrolled ? 'rgba(11, 18, 32, 0.85)' : 'transparent', borderColor: isScrolled ? THEME.border : 'transparent' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-widest uppercase">Sin Rodeos</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4A53A]">Intelligence</span>
          </div>
          
          {/* Menú Central */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: THEME.muted }}>
            <a href="#solucion" className="hover:text-white transition-colors">La Solución</a>
            <a href="#como-funciona" className="hover:text-white transition-colors">Metodología</a>
            <Link href="/diagnostico/entrevista" className="hover:text-white transition-colors text-[#D4A53A]">Diagnóstico</Link>
          </div>

          <Link href="/diagnostico/entrevista" className="font-semibold px-6 py-2.5 rounded transition-all flex items-center gap-2 hover:scale-105" style={{ backgroundColor: THEME.primary, color: THEME.bg }}>
            Solicitar acceso
          </Link>
        </div>
      </nav>

      {/* Hero con Rejilla de Fondo */}
      <section className="relative pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 min-h-[90vh]">
        
        {/* Rejilla decorativa de fondo */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
             style={{
               backgroundImage: `linear-gradient(to right, ${THEME.border} 1px, transparent 1px), linear-gradient(to bottom, ${THEME.border} 1px, transparent 1px)`,
               backgroundSize: '40px 40px',
               maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 40%, transparent 100%)',
               WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 40%, transparent 100%)'
             }}></div>

        <div className="lg:w-1/2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8 backdrop-blur-sm" style={{ borderColor: THEME.border, backgroundColor: 'rgba(17, 24, 39, 0.6)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: THEME.primary }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: THEME.primary }}></span>
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: THEME.muted }}>
              Plataforma Activa
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            La inteligencia estratégica para <br/>
            <span style={{ color: THEME.primary }}>campañas que quieren ganar.</span>
          </h1>
          <p className="text-lg mb-10 text-[#94A3B8] max-w-xl">
            Sin Rodeos Intelligence es la primera plataforma diseñada para diagnosticar candidatos, evaluar campañas y construir estrategias políticas basadas en inteligencia artificial.
          </p>
          <div className="flex gap-4">
            <Link href="/diagnostico/entrevista" className="inline-block font-semibold px-8 py-3.5 rounded transition-all hover:scale-105" style={{ backgroundColor: THEME.primary, color: THEME.bg }}>
              Comenzar Diagnóstico
            </Link>
          </div>
        </div>

        {/* Dashboard Mockup (Vista Premium) */}
        <div className="lg:w-1/2 w-full z-10">
          <div className="border rounded-xl p-8 backdrop-blur-md shadow-2xl transition-all hover:shadow-lg hover:shadow-[#D4A53A]/10" style={{ backgroundColor: 'rgba(17, 24, 39, 0.7)', borderColor: THEME.border }}>
             
             {/* Header del Mockup */}
             <div className="flex justify-between items-center border-b pb-4 mb-6" style={{ borderColor: THEME.border }}>
               <h3 className="text-lg font-bold">Diagnóstico Estratégico</h3>
               <span className="text-xs px-2.5 py-1 rounded border font-semibold flex items-center gap-1.5" style={{ color: THEME.primary, borderColor: 'rgba(212, 165, 58, 0.3)', backgroundColor: 'rgba(212, 165, 58, 0.1)' }}>
                 <Activity className="w-3 h-3"/> ACTIVO
               </span>
             </div>

             {/* Barras de progreso */}
             <div className="space-y-6">
               {[
                 { label: "Posicionamiento", value: "84%" },
                 { label: "Liderazgo", value: "91%" },
                 { label: "Comunicación", value: "77%" }
               ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span style={{ color: THEME.muted }}>{stat.label}</span>
                      <span>{stat.value}</span>
                    </div>
                    <div className="w-full bg-[#0B1220] h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ backgroundColor: THEME.primary, width: stat.value }}></div>
                    </div>
                  </div>
               ))}
             </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
```eof

### Paso 2 y 3: El código de la Entrevista actual

Confirmo que el archivo de resultados (`app/diagnostico/resultado/page.tsx`) está en la carpeta correcta gracias a las correcciones que hicimos antes.

Ahora, sobre la entrevista: **este es el código actual que tenemos en `app/diagnostico/entrevista/page.tsx`**. Actualmente funciona como un chat visual que te hace 4 preguntas, espera tus respuestas, muestra un "Procesando..." y te manda a resultados, **pero aún no guarda ni calcula nada real**.

Aquí te lo pego para que podamos analizarlo e inyectarle la lógica real (guardar las respuestas, calcular el diagnóstico y mandarlo a la página de resultados):

```tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Send, CheckCircle2, AlertCircle, Bot, User, Activity } from 'lucide-react';
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

  useEffect(() => {
    iniciarPregunta(0);
  }, []);

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
    setHistorial(prev => [...prev, { rol: 'candidato', texto: nuevaRespuesta }]);
    setRespuestaActual("");

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

      setTimeout(() => {
        router.push('/diagnostico/resultado');
      }, 4000);
    }, 1000);
  };
}
