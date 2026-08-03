'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, BarChart3, Globe } from 'lucide-react';
import { brand } from './theme';

const stats = [
  { label: 'Precisión de diagnóstico', value: '92%' },
  { label: 'Predicciones de impacto', value: '87%' },
  { label: 'Recomendaciones activas', value: '14' },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pt-28 pb-20 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(212,165,58,0.2),_transparent_55%)] opacity-70" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#D4A53A]" />
              Inteligencia política premium
            </span>

            <h1 className="mt-8 text-5xl font-semibold tracking-tight text-white sm:text-6xl xl:text-7xl">
              Sin Rodeos Intelligence.
              <span className="block text-[#D4A53A]">Estrategia clara. Decisiones más rápidas.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Una plataforma de inteligencia política para campañas modernas que necesitan análisis profundo, visibilidad accionable y una ejecución tácticamente impecable.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4A53A] px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:brightness-105"
              >
                Solicitar acceso <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 px-6 py-3.5 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
              >
                Ver vista previa
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-800/80 bg-slate-950/65 px-5 py-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.7)]">
                  <dt className="text-xs uppercase tracking-[0.35em] text-slate-500">{item.label}</dt>
                  <dd className="mt-4 text-3xl font-semibold text-white">{item.value}</dd>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#2563EB]/20 to-transparent" />
              <div className="relative flex flex-col gap-6">
                <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-800/90 bg-slate-950/95 px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Flow de campaña</p>
                    <p className="mt-2 text-lg font-semibold text-white">Visión 360° de la estrategia</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#D4A53A]">
                    Activo
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-800/90 bg-slate-900/95 p-5">
                    <div className="flex items-center gap-3 text-slate-300">
                      <ShieldCheck className="h-5 w-5 text-[#2563EB]" />
                      <span className="text-sm font-semibold">Evaluación de riesgos</span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      Identifica áreas de exposición del mensaje y amenazas de reputación con un solo panel.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-800/90 bg-slate-900/95 p-5">
                    <div className="flex items-center gap-3 text-slate-300">
                      <BarChart3 className="h-5 w-5 text-[#D4A53A]" />
                      <span className="text-sm font-semibold">Insights en tiempo real</span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      Métricas accionables que mantienen a tu equipo alineado con la evolución del electorado.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-950/90 px-5 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Alta confianza</p>
                      <p className="mt-2 text-xl font-semibold text-white">Modelo de inteligencia propio</p>
                    </div>
                    <Globe className="h-6 w-6 text-[#2563EB]" />
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-slate-400 text-sm">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#D4A53A]" />
                    Datos políticos, sociales y mediáticos combinados en un solo núcleo.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
