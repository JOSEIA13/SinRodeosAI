import { motion } from 'framer-motion';
import { brand } from './theme';

const metrics = [
  { label: 'Total de insights', value: '472', delta: '+18%', color: 'from-emerald-500/80 to-emerald-400/80' },
  { label: 'Interacciones políticas', value: '1.2M', delta: '+9.4%', color: 'from-sky-500/80 to-blue-500/80' },
  { label: 'Alertas críticas', value: '8', delta: '-12%', color: 'from-amber-500/80 to-yellow-400/80' },
];

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="px-6 pb-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 rounded-[2.25rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-[0_40px_100px_-60px_rgba(0,0,0,0.8)] sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Panel de inteligencia</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Donde el contexto político se vuelve acción.</h2>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-800/90 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#D4A53A]" />
              Actualizado al último movimiento.
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr]">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Campaña Alpha</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Pulse de opinión en vivo</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#D4A53A]">
                  Inteligencia dinámica
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                    <p className={`mt-2 text-sm font-medium text-emerald-300 bg-clip-text bg-gradient-to-r ${metric.color}`}>{metric.delta}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-slate-800/90 bg-slate-950/95 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-200">Engagement político</p>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Últimas 24 horas</p>
                  </div>
                  <span className="inline-flex rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-semibold text-sky-200">+23%</span>
                </div>
                <div className="mt-6 h-36 rounded-[1.5rem] bg-gradient-to-r from-[#171E2D] via-[#101520] to-[#0B1118] p-4">
                  <div className="relative h-full w-full rounded-[1.3rem] bg-slate-950/80">
                    <div className="absolute inset-x-0 bottom-4 h-1 rounded-full bg-slate-800/90" />
                    <div className="absolute bottom-4 left-6 h-1 rounded-full w-24 bg-[#D4A53A]" />
                    <div className="absolute bottom-4 left-44 h-1 rounded-full w-28 bg-[#2563EB]" />
                    <div className="absolute bottom-4 left-84 h-1 rounded-full w-32 bg-white/10" />
                    <div className="absolute right-10 top-8 h-20 w-1 rounded-full bg-[#D4A53A]/40 blur-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-[2rem] border border-slate-800/90 bg-slate-950/75 p-6"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Recomendación prioritaria</p>
                <h3 className="mt-4 text-xl font-semibold text-white">Ajusta el siguiente bloque de mensaje</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  Refuerza el tono de seguridad económica y conecta con votantes urbanos a través de propuestas medibles.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-[2rem] border border-slate-800/90 bg-slate-950/75 p-6"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Mapas de audiencia</p>
                <div className="mt-5 grid gap-4">
                  {['Ciudadanos indecisos', 'Segmentos clave', 'Nudos de influencia'].map((item) => (
                    <div key={item} className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-4 text-sm text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
