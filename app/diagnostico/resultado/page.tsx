'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, CheckCircle2, Crosshair } from 'lucide-react';

export default function ResultadoPage() {
  const router = useRouter();
  const [reporte, setReporte] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('dictamen_ia');
    if (data) {
      setReporte(JSON.parse(data));
    } else {
      router.push('/diagnostico/entrevista');
    }
  }, [router]);

  if (!reporte) return null;

  // EXTRA SEGURIDAD: Prevenimos que la app colapse si la IA omite un dato o hay caché viejo
  const arquetipo = reporte.arquetipo_politico || "Perfil Estratégico en Análisis";
  const puntaje = reporte.puntaje_global || 0;
  const fortalezas = reporte.resumen_fortalezas || reporte.fortalezas?.[0] || "Se detectaron habilidades de comunicación básicas.";
  const gancho = reporte.gancho_de_dolor || reporte.veredicto || "Existen fallas tácticas que un oponente podría capitalizar.";
  const puntosCiegos = reporte.puntos_ciegos_criticos || reporte.vulnerabilidades_graves || ["Falla táctica detectada", "Falla de contingencia"];

  // Número de WhatsApp de la agencia (Recuerda cambiarlo)
  const WHATSAPP_NUMERO = "TU_NUMERO_AQUI";
  const mensajeWa = `Hola equipo Sin Rodeos. Acabo de hacer la auditoría táctica. Mi arquetipo es '${arquetipo}' y obtuve ${puntaje}/100. Necesito desbloquear y analizar mis puntos ciegos críticos.`;
  const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensajeWa)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-8 mt-10">

        {/* Cabecera */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-rose-500"></div>
          <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-2">Perfil Detectado</h2>
          <h1 className="text-4xl font-black text-white mb-6">"{arquetipo}"</h1>

          <div className="inline-block bg-slate-950 border border-slate-800 rounded-full px-8 py-4">
            <span className={`text-5xl font-black ${puntaje >= 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {puntaje}
            </span>
            <span className="text-xl text-slate-600 font-bold"> / 100</span>
          </div>
        </div>

        {/* Fortalezas */}
        <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-6">
          <h3 className="text-emerald-500 font-bold flex items-center gap-2 mb-3 uppercase tracking-wider text-sm">
            <CheckCircle2 size={18} /> Validación Táctica
          </h3>
          <p className="text-emerald-100/90 text-lg">{fortalezas}</p>
        </div>

        {/* Gancho de Dolor */}
        <div className="bg-rose-950/30 border-l-4 border-rose-500 rounded-r-xl p-6 shadow-lg">
          <h3 className="text-rose-500 font-black flex items-center gap-2 mb-3 uppercase tracking-wider text-sm">
            <Crosshair size={18} /> Alerta Estratégica
          </h3>
          <p className="text-rose-100 text-xl font-medium leading-relaxed">
            "{gancho}"
          </p>
        </div>

        {/* Muro de Pago Psicológico */}
        <div className="relative mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-hidden">
          <h3 className="text-white font-bold text-xl flex items-center gap-2 mb-6">
            <ShieldAlert className="text-amber-500" /> Vulnerabilidades Críticas Detectadas ({puntosCiegos.length})
          </h3>

          <div className="space-y-4 filter blur-[6px] opacity-40 select-none pointer-events-none">
            {puntosCiegos.map((punto: string, idx: number) => (
              <div key={idx} className="bg-slate-800 p-4 rounded-lg text-slate-300">
                [Contenido clasificado bloqueado por el sistema. Error táctico detectado en la maniobra número {idx + 1}]
              </div>
            ))}
          </div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm p-6 text-center">
            <Lock size={48} className="text-amber-500 mb-4" />
            <h4 className="text-2xl font-bold text-white mb-2">Reporte Táctico Bloqueado</h4>
            <p className="text-slate-300 max-w-md mb-8">
              Tu perfil presenta puntos ciegos que tus adversarios podrían explotar. Contáctanos para desbloquear el análisis completo y estructurar tu hoja de ruta.
            </p>

            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]"
            >
              Agendar Sesión Táctica
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}