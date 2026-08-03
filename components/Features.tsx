import { BarChart3, ShieldAlert, Target, Lightbulb, FileText } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { brand } from './theme';

const features = [
  {
    title: 'Diagnóstico context-aware',
    description: 'Compra la panorámica de tu proceso electoral con insights estructurados y prioridades tácticas.',
    icon: Target,
  },
  {
    title: 'Modelos de alcance predictivo',
    description: 'Simula escenarios de comunicación, apoyo y movilización con precisión avanzada.',
    icon: BarChart3,
  },
  {
    title: 'Protección de reputación',
    description: 'Detecta riesgos de narrativa antes de que se conviertan en crisis públicas.',
    icon: ShieldAlert,
  },
  {
    title: 'Flujo de decisiones',
    description: 'Coordina equipos con un tablero claro que prioriza acciones y resultados.',
    icon: FileText,
  },
  {
    title: 'Ejecución acelerada',
    description: 'Transforma recomendaciones en tareas con seguimiento de impacto continuo.',
    icon: Lightbulb,
  },
];

export default function Features() {
  return (
    <section id="solucion" className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Solución"
          title="Transforma inteligencia en ventaja política."
          description="Un sistema diseñado para generar claridad estratégica, anticipar la competencia y ejecutar campañas con el ritmo del mercado político actual."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/75 p-8 shadow-[0_40px_120px_-70px_rgba(0,0,0,0.8)] transition duration-300 hover:-translate-y-1 hover:border-slate-700"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#D4A53A]/10 text-[#D4A53A] shadow-inner shadow-slate-950/30">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-7">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
