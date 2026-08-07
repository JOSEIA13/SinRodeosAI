'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Check, Lock, BarChart3, AlertTriangle, Zap } from 'lucide-react';
import Link from 'next/link';

// Tipado explícito para asegurar que TS lo reconozca como un módulo de React
export default function ResultadoPage(): React.JSX.Element {
// Animaciones base
const fadeUp = {
hidden: { opacity: 0, y: 20 },
visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
visible: { transition: { staggerChildren: 0.15 } }
};

return (
    <>
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
      <Link href="/" className="text-xs font-semibold px-4 py-2 rounded border border-[#233044] hover:bg-[#233044] transition-colors">
        Cerrar Sesión
      </Link>
    </div>
  </div>

  <main className="max-w-7xl mx-auto px-6 pt-12">
    
    {/* Encabezado del Reporte */}
    <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-10">
      <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4A53A]/10 border border-[#D4A53A]/30 text-[#D4A53A] text-xs font-bold tracking-widest uppercase mb-4">
        <Check className="w-3 h-3" /> Reporte Generado
      </motion.div>
      <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
        Diagnóstico Estratégico de Campaña
      </motion.h1>
      <motion.p variants={fadeUp} className="text-[#94A3B8] max-w-2xl text-lg">
        Basado en las variables extraídas de la entrevista, hemos estructurado su Candidate DNA™ y su Índice de Eficiencia Estratégica.
      </motion.p>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Columna Izquierda: IESR y Riesgo */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
        
        {/* KPI Principal */}
        <div className="bg-[#111827] border border-[#233044] p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#D4A53A] opacity-5 blur-3xl rounded-full"></div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 mb-6">
            <Activity className="w-4 h-4 text-[#D4A53A]" /> Puntaje IESR™
          </h3>
          
          <div className="flex items-end gap-2 mb-2">
            <span className="text-6xl font-extrabold text-white">78</span>
            <span className="text-xl text-[#94A3B8] font-medium mb-1.5">/ 100</span>
          </div>
          <p className="text-sm text-[#D4A53A] font-medium">Viabilidad Electoral Moderada-Alta</p>
          
          <div className="mt-6 pt-6 border-t border-[#233044]">
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              El Índice de Eficiencia Estratégica y Riesgo (IESR) indica que la campaña tiene fundamentos sólidos, pero presenta áreas críticas de optimización táctica.
            </p>
          </div>
        </div>

        {/* Alerta de Riesgo */}
        <div className="bg-red-950/20 border border-red-900/50 p-6 rounded-2xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-red-400 flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4" /> Alerta de Riesgo
          </h3>
          <p className="text-sm text-red-200/70">
            Se ha detectado una vulnerabilidad potencial en la articulación de la promesa central. Requiere alineación narrativa inmediata.
          </p>
        </div>
      </motion.div>

      {/* Columna Central y Derecha: DNA y Plan de Acción */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Candidate DNA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#111827] border border-[#233044] p-8 rounded-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#D4A53A]" /> Candidate DNA™
            </h3>
            <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] border border-[#233044] px-2 py-1 rounded">Análisis Predictivo</span>
          </div>

          <div className="space-y-6">
            {[
              { label: "Posicionamiento de Marca", score: 85, color: "#D4A53A" },
              { label: "Resiliencia de Crisis", score: 62, color: "#94A3B8" },
              { label: "Claridad Narrativa", score: 74, color: "#F8FAFC" },
              { label: "Capacidad de Movilización", score: 90, color: "#D4A53A" }
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-[#94A3B8]">{item.label}</span>
                  <span>{item.score}%</span>
                </div>
                <div className="w-full bg-[#0B1220] h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${item.score}%` }} 
                    transition={{ duration: 1.5, delay: 0.5 + (idx * 0.2), ease: "easeOut" }}
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
              <Target className="w-4 h-4 text-[#D4A53A]" /> Plan de Acción: Primeros 30 Días
            </h3>
            
            <div className="space-y-4">
              {[
                "Consolidar la frase de contraste para el segmento indeciso.",
                "Activar protocolo de contención en áreas de vulnerabilidad.",
                "Reestructurar calendario de medios priorizando el 'dolor' detectado."
              ].map((task, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[#233044] bg-[#0B1220]">
                  <div className="mt-0.5 w-5 h-5 rounded-full border border-[#D4A53A] flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#D4A53A]"></div>
                  </div>
                  <p className="text-sm text-[#94A3B8]">{task}</p>
                </div>
              ))}
              
              {/* Tareas bloqueadas */}
              {[1, 2].map((_, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[#233044] bg-[#0B1220] opacity-40 blur-[2px]">
                  <div className="mt-0.5 w-5 h-5 rounded-full border border-[#94A3B8] shrink-0"></div>
                  <p className="text-sm text-[#94A3B8]">Estrategia táctica confidencial reservada para usuarios Pro...</p>
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
  </>
);
}