import { Activity, BarChart3, FileText, Moon, ShieldCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';

const steps = [
  {
    title: 'Recolección de datos',
    description: 'Procesamos señales políticas, comunicación de medios y feedback de audiencias con capas de contexto geográfico.',
    icon: FileText,
  },
  {
    title: 'Análisis estratégico',
    description: 'Traducimos comportamientos en métricas de impacto para definir dónde ganar debates y movilizar apoyos.',
    icon: BarChart3,
  },
  {
    title: 'Validación del riesgo',
    description: 'Observamos vulnerabilidades de reputación y calibramos mensajes para evitar fricciones en tiempo real.',
    icon: ShieldCheck,
  },
  {
    title: 'Ejecución táctica',
    description: 'Convertimos cada hallazgo en un plan con tareas claras, plazos y responsables específicos.',
    icon: Activity,
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="Un proceso escalable para decisiones políticas de alto impacto."
          description="Cinco pasos prácticos que llevan los datos desde la observación hasta la ejecución con seguridad estratégica."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="group overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/75 p-8 transition duration-300 hover:-translate-y-1">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 text-[#D4A53A] shadow-inner shadow-slate-950/30">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-7">{step.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col gap-4 rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Interfaz central</p>
            <p className="mt-3 text-2xl font-semibold text-white">Control total de tu agenda política</p>
          </div>
          <div className="rounded-3xl bg-[#14263F] px-5 py-4 text-sm text-slate-300">
            Planifique, mida y actúe con la misma confianza con la que decide una votación clave.
          </div>
        </div>
      </div>
    </section>
  );
}
