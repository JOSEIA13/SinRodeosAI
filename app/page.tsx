import Link from 'next/link';
import { Crosshair, ShieldAlert, ExternalLink } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col justify-center items-center relative overflow-hidden">

      {/* Barra de Navegación / Branding de la Agencia */}
      <div className="fixed top-0 left-0 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-black text-white tracking-tighter">
            SIN<span className="text-rose-500">RODEOS</span>
          </h1>
          <span className="text-slate-500 text-xs tracking-widest uppercase font-semibold hidden sm:block">
            Política & Estrategia
          </span>
        </div>
        <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest">
          <ShieldAlert size={16} />
          <span className="hidden sm:block">IA Activa</span>
        </div>
      </div>

      {/* Luces de fondo tácticas */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 text-center z-10 relative mt-20">

        {/* Etiqueta superior */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-amber-500 text-sm font-bold tracking-widest uppercase mb-8 shadow-lg">
          <ShieldAlert size={16} /> Motor de Inteligencia Política
        </div>

        {/* Titular Letal */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
          Descubre tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">Puntos Ciegos</span> <br className="hidden md:block" /> antes que tus adversarios.
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Somete tu perfil a nuestra Inteligencia Artificial. Un diagnóstico táctico, frío y sin rodeos que evaluará tu capacidad operativa y narrativa.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">

          <Link
            href="/diagnostico/entrevista"
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-xl font-black text-lg uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]"
          >
            <Crosshair size={20} />
            Iniciar Auditoría
          </Link>

          {/* Botón de Metodología apuntando a Instagram */}
          <a
            href="https://www.instagram.com/sinrodeospoliticayestrategia/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-pink-500/50 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all group shadow-lg"
          >
            <ExternalLink size={20} className="text-pink-500 group-hover:scale-110 transition-transform" />
            Ver Metodología (Tips)
          </a>

        </div>

        {/* Generadores de Confianza */}
        <div className="mt-20 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Privacidad Garantizada
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div> Análisis Inmediato
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div> 100% Sin Rodeos
          </div>
        </div>

      </div>
    </div>
  );
}