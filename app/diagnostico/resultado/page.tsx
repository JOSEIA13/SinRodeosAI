'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Check, BarChart3, AlertTriangle, Zap, Download, ShieldAlert, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function ResultadoPage() {
  // Estructura adaptada al nuevo JSON de auditoría de élite
  const [diagnostico, setDiagnostico] = useState({
    IESR_Global: 45,
    Veredicto_Viabilidad: "Baja viabilidad por dependencia de retórica tradicional y ausencia de infraestructura táctica.",
    Candidate_DNA: {
      "1_Claridad_Narrativa": 40,
      "2_Diferenciacion": 35,
      "3_Coherencia": 45,
      "4_Credibilidad": 40,
      "5_Conocimiento_Territorial": 50,
      "6_Organizacion": 30,
      "7_Movilizacion": 30,
      "8_Gestion_de_Riesgo": 35,
      "9_Resiliencia": 50,
      "10_Viabilidad": 40
    },
    Analisis_Cualitativo_Tactico: {
      Fortalezas_Reales_Y_Verificables: [
        "Disposición inicial para someterse a metodologías de diagnóstico político.",
        "Inercia operativa propia de un gestor habituado al dinamismo comercial.",
        "Resistencia base para soportar entornos de alta presión institucional."
      ],
      Vulnerabilidades_O_Riesgos_Graves: [
        "Inexistencia de un War Room estructurado para la toma de decisiones en tiempo real.",
        "Vulnerabilidad comunicacional ante discursos vacíos o clichés sin soporte métrico.",
        "Falta de segmentación territorial rigurosa para la captura del voto fragmentado."
      ],
      Inconsistencias_Logicas: [
        "Pretensión de movilización masiva sin contar con una red de líderes barriales o comisarías rurales afianzadas.",
        "Confusión entre volumen de contenido publicitario y estrategia de diferenciación emocional."
      ],
      Recomendaciones_Tacticas_Inmediatas: [
        "Instaurar un comité de celo estratégico que audite cada pieza discursiva bajo el principio de Cero Humo, eliminando promesas genéricas.",
        "Auditar y mapear la estructura de base territorial existente en los municipios clave antes de desplegar recursos financieros.",
        "Desarrollar un mensaje central único basado en la gestión de resultados económicos y emocionales tangibles, descartando el monólogo institucional."
      ]
    }
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Aquí puedes enlazar si guardaste resultados previos en localStorage
    const guardado = localStorage.getItem('sinrodeos_resultado_experto');
    if (guardado) {
      try {
        setDiagnostico(JSON.parse(guardado));
      } catch (e) {
        console.error("Error al parsear el diagnóstico guardado");
      }
    }
    setCargando(false);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  if (cargando) return <div className="min-h-screen bg-[#0B1220] flex items-center justify-center text-[#D4A53A]">Cargando auditoría estratégica...</div>;

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
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#D4A53A] font-medium">Auditoría Electoral OS</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => window.print()}
              className="bg-[#1F2937] hover:bg-[#374151] border border-[#374151] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#D4A53A]" />
              <span>Exportar Reporte (PDF)</span>
            </button>
            <Link href="/" className="text-xs font-semibold px-4 py-2 rounded border border-[#233044] hover:bg-[#233044] transition-colors">
              Salir
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-10">

        {/* Encabezado del Reporte */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-4">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4A53A]/10 border border-[#D4A53A]/30 text-[#D4A53A] text-xs font-bold tracking-widest uppercase">
            <Check className="w-3 h-3" /> Auditoría de Consultoría de Élite Finalizada
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Diagnóstico Estratégico de Campaña
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[#94A3B8] max-w-3xl text-lg">
            Evaluación integral de viabilidad, descomposición de vectores de poder y análisis cualitativo táctico bajo el principio de Cero Humo.
          </motion.p>
        </motion.div>

        {/* Sección Superior: IESR Global y Veredicto */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Tarjeta IESR Global */}
          <div className="bg-[#111827] border border-[#233044] p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#D4A53A] opacity-5 blur-3xl rounded-full"></div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-[#D4A53A]" /> Índice IESR™ Global
              </h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl font-extrabold text-white">{diagnostico.IESR_Global}</span>
                <span className="text-xl text-[#94A3B8] font-medium mb-1.5">/ 100</span>
              </div>
            </div>
            <div className="pt-6 border-t border-[#233044]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#D4A53A] mb-1">Veredicto de Viabilidad:</p>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {diagnostico.Veredicto_Viabilidad}
              </p>
            </div>
          </div>

          {/* Candidate DNA - 10 Métricas */}
          <div className="lg:col-span-2 bg-[#111827] border border-[#233044] p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#D4A53A]" /> Candidate DNA™ (10 Dimensiones)
              </h3>
              <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] border border-[#233044] px-2 py-1 rounded">Métricas Quirúrgicas</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(diagnostico.Candidate_DNA).map(([key, value], idx) => {
                const nombreLimpio = key.replace(/^[0-9]+_/, '').replace(/_/g, ' ');
                return (
                  <div key={idx} className="space-y-1.5 bg-[#0B1220] p-3 rounded-xl border border-[#233044]">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#94A3B8] capitalize">{nombreLimpio}</span>
                      <span className="text-white font-bold">{value}%</span>
                    </div>
                    <div className="w-full bg-[#111827] h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1.2, delay: idx * 0.05, ease: "easeOut" }}
                        className="h-full rounded-full bg-[#D4A53A]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sección Inferior: Análisis Cualitativo Táctico (4 Bloques) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Fortalezas Reales */}
          <div className="bg-[#111827] border border-[#233044] p-8 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4A53A] flex items-center gap-2">
              <Check className="w-4 h-4" /> Fortalezas Reales y Verificables
            </h3>
            <ul className="space-y-3">
              {diagnostico.Analisis_Cualitativo_Tactico.Fortalezas_Reales_Y_Verificables.map((item, i) => (
                <li key={i} className="text-xs text-[#94A3B8] flex items-start gap-3 bg-[#0B1220] p-3.5 rounded-xl border border-[#233044]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A53A] mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vulnerabilidades o Riesgos Graves */}
          <div className="bg-red-950/20 border border-red-900/40 p-8 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Vulnerabilidades o Riesgos Graves
            </h3>
            <ul className="space-y-3">
              {diagnostico.Analisis_Cualitativo_Tactico.Vulnerabilidades_O_Riesgos_Graves.map((item, i) => (
                <li key={i} className="text-xs text-red-200/80 flex items-start gap-3 bg-[#0B1220]/60 p-3.5 rounded-xl border border-red-900/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Inconsistencias Lógicas */}
          <div className="bg-[#111827] border border-[#233044] p-8 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Inconsistencias Lógicas
            </h3>
            <ul className="space-y-3">
              {diagnostico.Analisis_Cualitativo_Tactico.Inconsistencias_Logicas.map((item, i) => (
                <li key={i} className="text-xs text-[#94A3B8] flex items-start gap-3 bg-[#0B1220] p-3.5 rounded-xl border border-[#233044]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recomendaciones Tácticas Inmediatas */}
          <div className="bg-[#111827] border border-[#233044] p-8 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Recomendaciones Tácticas Inmediatas
            </h3>
            <ul className="space-y-3">
              {diagnostico.Analisis_Cualitativo_Tactico.Recomendaciones_Tacticas_Inmediatas.map((item, i) => (
                <li key={i} className="text-xs text-[#94A3B8] flex items-start gap-3 bg-[#0B1220] p-3.5 rounded-xl border border-[#233044]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </main>
    </div>
  );
}