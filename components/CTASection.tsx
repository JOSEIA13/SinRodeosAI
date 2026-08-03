import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="cta" className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-slate-800/80 bg-slate-950/80 p-10 shadow-[0_50px_120px_-70px_rgba(0,0,0,0.8)]">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Convocatoria exclusiva</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Obtén acceso al programa Alpha y construye la campaña del futuro.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              Espacios limitados para líderes políticos y equipos estratégicos que buscan tomar decisiones más rápidas, seguras y efectivos con inteligencia real.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Paso siguiente</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm font-semibold text-white">1. Evalúa tu caso en 10 minutos</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Comparte la visión de tu campaña y nuestros expertos te entregan la primera ruta táctica.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm font-semibold text-white">2. Recibe un plan de impacto inmediato</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Prioriza acciones que se traducen en percepción de voto y control de la narrativa.</p>
              </div>
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4A53A] px-6 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-105"
            >
              Solicitar acceso prioritario <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
