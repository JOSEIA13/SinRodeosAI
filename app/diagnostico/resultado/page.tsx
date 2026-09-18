'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Target, Download, ChevronRight } from 'lucide-react';

export default function ResultadoPage() {
  const router = useRouter();
  const [reporte, setReporte] = useState<any>(null);

  useEffect(() => {
    // Recuperar el dictamen de la IA guardado en la sesión
    const data = sessionStorage.getItem('dictamen_ia');
    if (data) {
      setReporte(JSON.parse(data));
    } else {
      router.push('/diagnostico');
    }
  }, [router]);

  if (!reporte) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 mt-10">

        {/* Cabecera y Puntaje */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-2xl"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dictamen Estratégico</h1>
            <p className="text-slate-400">Auditoría de viabilidad política completada.</p>
          </div>
          <div className="mt-6 md:mt-0 text-center">
            <div className={`text-6xl font-black ${reporte.puntaje_global >= 70 ? 'text-emerald-500' : reporte.puntaje_global >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
              {reporte.puntaje_global}
              <span className="text-2xl text-slate-500">/100</span>
            </div>
            <div className="text-sm font-semibold tracking-widest text-slate-500 uppercase mt-2">Puntaje Global</div>
          </div>
        </motion.div>

        {/* Veredicto */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Target className="text-amber-500" /> Veredicto del Consultor
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-lg leading-relaxed border-l-4 border-l-amber-500">
            {reporte.veredicto}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Fortalezas */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900 border border-emerald-900/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle size={20} /> Ejes de Fortaleza
            </h3>
            <ul className="space-y-3">
              {reporte.fortalezas.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <ChevronRight size={16} className="text-emerald-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Vulnerabilidades */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900 border border-rose-900/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-rose-400 mb-4 flex items-center gap-2">
              <AlertTriangle size={20} /> Vulnerabilidades Críticas
            </h3>
            <ul className="space-y-3">
              {reporte.vulnerabilidades_graves.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <ChevronRight size={16} className="text-rose-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Recomendación Táctica */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
          <h2 className="text-lg font-bold text-amber-500 mb-2">Hoja de Ruta Inmediata</h2>
          <p className="text-amber-100/80">{reporte.recomendacion_tactica}</p>
        </motion.div>

        {/* CTA (Call to Action) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center pt-8">
          <button onClick={() => window.print()} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-8 rounded-lg flex items-center gap-2 mx-auto transition-colors">
            <Download size={20} />
            Descargar Reporte Completo
          </button>
        </motion.div>

      </div>
    </div>
  );
}