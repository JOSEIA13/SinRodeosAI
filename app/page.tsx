import Link from 'next/link';
import { Crosshair, ShieldAlert, ExternalLink, Activity, MessageSquare, AlertTriangle } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 bg-slate-950 text-slate-200 font-sans relative overflow-hidden">

      {/* Luces de fondo tácticas */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Banner Superior (Estilo del diseño original) */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-12">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-slate-800 bg-slate-950/50 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4 text-amber-500 font-bold uppercase tracking-widest shadow-lg">
          <ShieldAlert size={18} className="mr-2" /> Motor de Inteligencia Política
        </p>
      </div>

      {/* Hero Section (El gancho agresivo central) */}
      <div className="relative flex flex-col place-items-center z-10 text-center max-w-4xl mx-auto my-8">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          Descubre tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">Puntos Ciegos</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Somete tu perfil a nuestra Inteligencia Artificial. Un diagnóstico táctico, frío y sin rodeos que evaluará tu viabilidad electoral.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
          <Link
            href="/diagnostico/entrevista"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-xl font-black text-lg uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]"
          >
            <Crosshair size={20} />
            Iniciar Auditoría
          </Link>

          <a
            href="https://www.instagram.com/sinrodeospoliticayestrategia/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-pink-500/50 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all group shadow-lg"
          >
            <ExternalLink size={20} className="text-pink-500 group-hover:scale-110 transition-transform" />
            Ver Tips en Instagram
          </a>
        </div>
      </div>

      {/* Cuadrícula Inferior (Recuperando el layout de las 4 tarjetas originales) */}
      <div className="z-10 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left mt-16 gap-4">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-slate-800 hover:bg-slate-900/80">
          <h2 className="mb-3 text-2xl font-semibold text-amber-500 flex items-center justify-center lg:justify-start gap-2">
            <Activity size={22} className="group-hover:scale-110 transition-transform" /> Operativa
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-slate-400 leading-relaxed">
            Medimos tu capacidad real de armar equipo, delegar y sostener una campaña en terreno.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-slate-800 hover:bg-slate-900/80">
          <h2 className="mb-3 text-2xl font-semibold text-blue-500 flex items-center justify-center lg:justify-start gap-2">
            <MessageSquare size={22} className="group-hover:scale-110 transition-transform" /> Discurso
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-slate-400 leading-relaxed">
            Mapeo comunicacional para detectar tu mayor fortaleza y la falla que te hará perder votos.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-slate-800 hover:bg-slate-900/80">
          <h2 className="mb-3 text-2xl font-semibold text-emerald-500 flex items-center justify-center lg:justify-start gap-2">
            <ShieldAlert size={22} className="group-hover:scale-110 transition-transform" /> Perfil
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-slate-400 leading-relaxed">
            Clasificamos tu arquetipo político exacto basado en tus respuestas bajo simulación de estrés.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-slate-800 hover:bg-slate-900/80">
          <h2 className="mb-3 text-2xl font-semibold text-rose-500 flex items-center justify-center lg:justify-start gap-2">
            <AlertTriangle size={22} className="group-hover:scale-110 transition-transform" /> Alerta
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-slate-400 leading-relaxed">
            Descubrimos el gancho de dolor y los puntos ciegos críticos que tu competencia usará en tu contra.
          </p>
        </div>
      </div>
    </main>
  );
}