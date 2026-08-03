export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 px-6 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="font-semibold text-white">Sin Rodeos Intelligence</div>
            <p className="max-w-md text-sm leading-6 text-slate-400">
              Estrategia de campaña sustentada en datos, análisis político y decisiones accionables.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <a href="#solucion" className="transition hover:text-white">
              Diagnóstico
            </a>
            <a href="#como-funciona" className="transition hover:text-white">
              Metodología
            </a>
            <a href="#dashboard" className="transition hover:text-white">
              Vista previa
            </a>
            <a href="#cta" className="transition hover:text-white">
              Acceso
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800/80 pt-8 text-sm text-slate-500">
          © {new Date().getFullYear()} Sin Rodeos Intelligence. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
