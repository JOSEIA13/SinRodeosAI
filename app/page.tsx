'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DiagnosticoOnboarding() {
  const sections = [
    { title: "Información General", desc: "Datos demográficos y de campaña" },
    { title: "Liderazgo", desc: "ADN del candidato" },
    { title: "Comunicación y Estrategia", desc: "Análisis de narrativa" }
  ];

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] flex flex-col items-center justify-center p-6 selection:bg-[#D4A53A] selection:text-[#0B1220]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-[#111827] border border-[#233044] p-10 rounded-2xl shadow-2xl"
      >
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-2">
            <span>Paso 0 de 5</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> 8 minutos
            </span>
          </div>
          <div className="w-full h-1 bg-[#0B1220] rounded-full overflow-hidden">
            <div className="w-0 h-full bg-[#D4A53A]"></div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Diagnóstico Estratégico</h1>
        <p className="text-[#94A3B8] mb-8 leading-relaxed">
          Bienvenido a Sin Rodeos Intelligence. Durante los próximos minutos realizaremos una entrevista estratégica para comprender su perfil como candidato y generar un diagnóstico personalizado.
        </p>

        {/* Cards */}
        <div className="space-y-3 mb-10">
          {sections.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-[#0B1220] border border-[#233044]">
              <CheckCircle2 className="w-5 h-5 text-[#D4A53A]" />
              <div>
                <p className="text-sm font-bold">{item.title}</p>
                <p className="text-xs text-[#94A3B8]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Link 
          href="/diagnostico/entrevista" 
          className="w-full bg-[#D4A53A] hover:bg-[#b88f2f] text-[#0B1220] font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-[#D4A53A]/20"
        >
          Comenzar Entrevista <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  );
}
```eof

### Paso 3: Conectar la Landing (`app/page.tsx`)

Asegúrate de ir a tu archivo `app/page.tsx` y buscar los botones del `Hero` (y cualquier otro) para envolverlos en el componente `Link` de Next.js:

```tsx
import Link from 'next/link';

// ... dentro de tu componente Hero:
<Link href="/diagnostico" className="font-semibold px-8 py-3.5 rounded ...">
  Solicitar acceso 
  <ArrowRight className="..." />
</Link>