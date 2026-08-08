'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Check, Lock, BarChart3, AlertTriangle, Zap, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { ResultadoDiagnostico } from '@/lib/diagnostic/types';

export default function ResultadoPage() {
  const [resultado, setResultado] = useState<ResultadoDiagnostico | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Leemos el resultado calculado del motor almacenado en el localStorage
    const datosGuardados = localStorage.getItem('sinrodeos_resultado_diagnostico');
    if (datosGuardados) {
      try {
        const parsed: ResultadoDiagnostico = JSON.parse(datosGuardados);
        setResultado(parsed);
      } catch (e) {
        console.error("Error al parsear el diagnóstico", e);
      }
    }
    setCargando(false);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#D4A53A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-[#94A3B8] uppercase tracking-widest font-semibold">Cargando Matriz Estratégica...</p>
        </div>
      </div>
    );
  }

  // Fallback si ingresan directo sin hacer la entrevista
  if (!resultado) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-[#111827] border border-[#233044] p-8 rounded-2xl max-w-md w-full">
          <AlertTriangle className="w-12 h-12 text-[#D4A53A] mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Sin datos de diagnóstico</h2>
          <p className="text-sm text-[#94A3B8] mb-6">No se encontraron registros de una entrevista previa en este navegador.</p>
          <Link href="/diagnostico" className="inline-flex items-center justify-center gap-2 w-full bg-[#D4A53A] text-[#0B1220] font-bold py-3 rounded-lg hover:bg-[#b88f2f] transition-all">
            <RefreshCw className="w-4 h-4" /> Iniciar Entrevista Estratégica
          </Link>
        </div>
      </div>
    );
  }

  // Mapeo dinámico de las dimensiones del Candidate DNA
  const dnaList = [
    { label: "Claridad Narrativa", score: resultado.dna.claridadNarrativa, color: "#D4A53A" },
    { label: "Diferenciación", score: resultado.dna.diferenciacion, color: "#F8FAFC" },
    { label: "Credibilidad", score: resultado.dna.credibilidad, color: "#94A3B8" },
    { label: "Conocimiento Territorial", score: resultado.dna.conocimientoTerritorial, color: "#D4A53A" },
    { label: "Organización", score: resultado.dna.organizacion, color: "#94A3B8" },
    { label: "Movilización (Día D)", score: resultado.dna.movilizacion, color: "#D4A53A" },
    { label: "Gestión de Riesgo", score: resultado.dna.gestionRiesgo, color: "#F8FAFC" }
  ];

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] pb-24">
      {/* Header Ejecutivo */}
      <div className="bg-[#111827] border-b border-[#233044] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#D4A53A] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#0B1220]" />
            </div>
            <div>
              <span className="font-bold tracking-widest uppercase text-sm block leading-none">Sin Rodeos</span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#D4A53A] font-medium">OS Dashboard</span>
            </div>
          </div>
          <Link href="/diagnostico" className="text-xs font-semibold px-4 py-2 rounded border border-[#233044] hover:bg-[#233044] transition-colors">
            Nueva Entrevista
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* Encabezado del Reporte */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4A53A]/10 border border-[#D4A53A]/30 text-[#D4A53A] text-xs font-bold tracking-widest uppercase mb-4">
            <Check className="w-3 h-3" /> Reporte Generado por Motor Algorítmico
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Diagnóstico Estratégico de Campaña
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[#94A3B8] max-w-2xl text-lg">
            Perfil Dominante detectado: <span className="text-[#D4A53A] font-semibold">{resultado.perfilDominante}</span>
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: IESR y Riesgo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
            
            {/* KPI Principal IESR */}
            <div className="bg-[#111827] border border-[#233044] p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#D4A53A] opacity-5 blur-3xl rounded-full"></div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-[#D4A53A]" /> Puntaje IESR™
              </h3>
              
              <div className="flex items-end gap-2 mb-2">
                <span className="text-6xl font-extrabold text-white">{resultado.iesr}</span>
                <span className="text-xl text-[#94A3B8] font-medium mb-1.5">/ 100</span>
              </div>
              <p className="text-sm text-[#D4A53A] font-medium">{resultado.veredictoViabilidad}</p>
              
              <div className="mt-6 pt-6 border-t border-[#233044]">
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Calculado ponderando la solidez de las respuestas frente a variables críticas de competencia, territorio y organización operativa.
                </p>
              </div>
            </div>

            {/* Alerta de Riesgo Dinámica */}
            <div className="bg-red-950/20 border border-red-900/50 p-6 rounded-2xl">
              <h3 className="text-xs font-bold uppercase tracking-widest text-red-400 flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4" /> Alertas Críticas Detectadas ({resultado.riesgos.length})
              </h3>
              {resultado.riesgos.map((riesgo, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <p className="text-xs font-bold text-red-300">{riesgo.titulo} ({riesgo.nivel})</p>
                  <p className="text-xs text-red-200/70 mt-1">{riesgo.descripcion}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Columna Central y Derecha: DNA y Plan de Acción */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Candidate DNA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#111827] border border-[#233044] p-8 rounded-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#D4A53A]" /> Candidate DNA™ (Métricas Calculadas)
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] border border-[#233044] px-2 py-1 rounded">Análisis Predictivo</span>
              </div>

              <div className="space-y-6">
                {dnaList.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-[#94A3B8]">{item.label}</span>
                      <span>{item.score}%</span>
                    </div>
                    <div className="w-full bg-[#0B1220] h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${item.score}%` }} 
                        transition={{ duration: 1.5, delay: 0.5 + (idx * 0.1), ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Plan de Acción y Paywall */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="relative">
              
              <div className="bg-[#111827] border border-[#233044] p-8 rounded-2xl">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-6">
                  <Target className="w-4 h-4 text-[#D4A53A]" /> Plan de Acción Táctico Inmediato
                </h3>
                
                <div className="space-y-4">
                  {resultado.recomendaciones.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[#233044] bg-[#0B1220]">
                      <div className="mt-0.5 w-5 h-5 rounded-full border border-[#D4A53A] flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[#D4A53A]"></div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#D4A53A] uppercase tracking-wide">Horizonte: {rec.horizonteDias} días ({rec.prioridad})</p>
                        <p className="text-sm text-[#F8FAFC] mt-1">{rec.accion}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Tareas bloqueadas (Modelo comercial) */}
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[#233044] bg-[#0B1220] opacity-40 blur-[2px]">
                      <div className="mt-0.5 w-5 h-5 rounded-full border border-[#94A3B8] shrink-0"></div>
                      <p className="text-sm text-[#94A3B8]">Estrategia táctica confidencial avanzada reservada para usuarios Pro...</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paywall Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/90 to-transparent flex flex-col items-center justify-end pb-8 rounded-b-2xl">
                <div className="bg-[#D4A53A] text-[#0B1220] px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-2xl cursor-pointer hover:bg-[#b88f2f] transition-all">
                  <Lock className="w-4 h-4" /> Desbloquear Análisis Completo
                </div>
                <p className="text-xs text-[#94A3B8] mt-3">Contacte a un asesor para acceder al reporte completo.</p>
              </div>

            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}