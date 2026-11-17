import Link from 'next/link';
import { Crosshair, ExternalLink, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 font-sans relative overflow-hidden">

      {/* Fondo de cuadrícula táctica imitando la imagen original */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Barra de Navegación Exacta al diseño original */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0f1c]/90 backdrop-blur-md border-b border-slate-800/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-white tracking-[0.15em] leading-none">SIN RODEOS</span>
            <span className="text-[9px] md:text-[10px] text-amber-500 font-bold tracking-[0.3em] mt-1.5">INTELLIGENCE</span>
          </div>

          {/* Menú Central (Desktop) */}
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
            <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">La Solución</span>
            <a
              href="https://www.instagram.com/sinrodeospoliticayestrategia/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              Metodología <ExternalLink size={14} />
            </a>
            <Link href="/diagnostico/entrevista" className="text-amber-500 transition-colors">Diagnóstico</Link>
          </div>

          {/* Botón Superior Derecho */}
          <Link
            href="/diagnostico/entrevista"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-md text-sm transition-colors uppercase tracking-wider"
          >
            Solicitar acceso
          </Link>
        </div>
      </nav>

      {/* Contenedor Principal a dos columnas */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* Columna Izquierda: Copy y CTA */}
        <div>
          {/* Etiqueta Plataforma Activa */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/50 bg-slate-800/30 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
            <span className="text-[11px] font-bold text-slate-300 tracking-widest uppercase">Plataforma Activa</span>
          </div>

          {/* Titular Letal */}
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black text-white leading-[1.05] mb-6 tracking-tight">
            La inteligencia <br className="hidden md:block" /> estratégica para <br className="hidden md:block" />
            <span className="text-amber-500">campañas que <br className="hidden md:block" /> quieren ganar.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
            Somete tu perfil a nuestra Inteligencia Artificial. Un diagnóstico táctico, frío y sin rodeos que revelará tus puntos ciegos antes que tus adversarios.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/diagnostico/entrevista"
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl text-lg transition-all shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]"
            >
              <Crosshair size={20} /> Iniciar Auditoría
            </Link>

            {/* Botón secundario para móvil (en desktop ya está en el nav) */}
            <a
              href="https://www.instagram.com/sinrodeospoliticayestrategia/"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden flex items-center justify-center gap-2 bg-transparent border border-slate-700 hover:border-pink-500/50 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all"
            >
              Ver Metodología <ExternalLink size={18} className="text-pink-500" />
            </a>
          </div>
        </div>

        {/* Columna Derecha: Mockup del Diagnóstico Estratégico */}
        <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto mt-10 lg:mt-0">
          {/* Resplandor trasero */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/10 rounded-2xl blur-2xl"></div>

          <div className="relative bg-[#0d1424] border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl">

            <div className="flex justify-between items-center mb-8 border-b border-slate-800/80 pb-5">
              <h3 className="text-lg md:text-xl font-bold text-white">Diagnóstico Estratégico</h3>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500 border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 rounded-sm uppercase tracking-widest">
                <Activity size={12} /> Activo
              </span>
            </div>

            <div className="space-y-8">
              {/* Barra 1 */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-300 mb-3">
                  <span>Posicionamiento</span>
                  <span>84</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>

              {/* Barra 2 */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-300 mb-3">
                  <span>Liderazgo Operativo</span>
                  <span>91</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>

              {/* Barra 3 */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-300 mb-3">
                  <span>Estructura Comunicacional</span>
                  <span>77</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '77%' }}></div>
                </div>
              </div>
            </div>

            {/* Overlay sutil inferior imitando interfaz */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0d1424] to-transparent rounded-b-2xl pointer-events-none"></div>
          </div>
        </div>

      </div>
    </div>
  );
}