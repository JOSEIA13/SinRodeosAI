'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, Activity, MessageSquare, ExternalLink, Crosshair, Download, Loader2 } from 'lucide-react';

export default function ResultadoPage() {
  const router = useRouter();
  const [reporte, setReporte] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('dictamen_ia');
    if (data) {
      setReporte(JSON.parse(data));
    } else {
      router.push('/diagnostico/entrevista');
    }
  }, [router]);

  const generarPDF = async () => {
    setIsDownloading(true);
    try {
      // Importación dinámica para evitar errores de compilación en Vercel (SSR)
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const input = document.getElementById('reporte-pdf');
      if (input) {
        const canvas = await html2canvas(input, { scale: 2, backgroundColor: '#020617' });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Diagnostico_SinRodeos_${reporte.arquetipo_politico.replace(/\s+/g, '_')}.pdf`);
      }
    } catch (error) {
      console.error("Error al generar PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!reporte) return null;

  const arquetipo = reporte.arquetipo_politico || "Perfil en Análisis";
  const puntaje = reporte.puntaje_global || 0;
  const gancho = reporte.gancho_de_dolor || "Existen fallas tácticas que un oponente podría capitalizar.";
  const puntosCiegos = reporte.puntos_ciegos_criticos || ["Falla operativa 1", "Falla narrativa 2"];
  const capacidadOperativa = reporte.capacidad_operativa || "No se detectó un modelo operativo claro.";
  const mapeoFortaleza = reporte.mapeo_comunicacional?.fortaleza_principal || "Comunicación estándar.";
  const mapeoFalla = reporte.mapeo_comunicacional?.falla_estructural || "Falta de contundencia en el cierre.";

  const WHATSAPP_NUMERO = "573000000000"; // Reemplaza por tu número
  const mensajeWa = `Hola equipo Sin Rodeos. Acabo de hacer la auditoría táctica. Mi arquetipo es '${arquetipo}' y obtuve ${puntaje}/100. Necesito desbloquear mis puntos ciegos.`;
  const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensajeWa)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 font-sans">

      {/* Botón de Descarga fuera de la zona de captura para que no estorbe visualmente */}
      <div className="max-w-3xl mx-auto flex justify-end mb-4">
        <button
          onClick={generarPDF}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
        >
          {isDownloading ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
          {isDownloading ? 'Generando Documento...' : 'Descargar Análisis en PDF'}
        </button>
      </div>

      {/* ZONA DE CAPTURA PDF */}
      <div id="reporte-pdf" className="max-w-3xl mx-auto space-y-8 pb-10 bg-slate-950">

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

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-amber-500 font-bold flex items-center gap-2 mb-4 uppercase tracking-wider text-sm">
              <Activity size={18} /> Capacidad Operativa
            </h3>
            <p className="text-slate-300">{capacidadOperativa}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-blue-500 font-bold flex items-center gap-2 mb-4 uppercase tracking-wider text-sm">
              <MessageSquare size={18} /> Mapeo Comunicacional
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-emerald-500 font-bold text-xs uppercase block mb-1">Fortaleza Detectada:</span>
                <p className="text-slate-300 text-sm">{mapeoFortaleza}</p>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-rose-500 font-bold text-xs uppercase block mb-1">Falla Estructural:</span>
                <p className="text-slate-300 text-sm">{mapeoFalla}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-rose-950/30 border-l-4 border-rose-500 rounded-r-xl p-6 shadow-lg">
          <h3 className="text-rose-500 font-black flex items-center gap-2 mb-3 uppercase tracking-wider text-sm">
            <Crosshair size={18} /> Alerta Estratégica
          </h3>
          <p className="text-rose-100 text-xl font-medium leading-relaxed">
            "{gancho}"
          </p>
        </div>

        <div className="relative mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-hidden">
          <h3 className="text-white font-bold text-xl flex items-center gap-2 mb-6">
            <ShieldAlert className="text-amber-500" /> Puntos Ciegos Críticos Bloqueados ({puntosCiegos.length})
          </h3>

          <div className="space-y-4 filter blur-[6px] opacity-40 select-none pointer-events-none">
            {puntosCiegos.map((punto: string, idx: number) => (
              <div key={idx} className="bg-slate-800 p-4 rounded-lg text-slate-300">
                [Contenido clasificado bloqueado por el sistema. Vulnerabilidad en evaluación {idx + 1}]
              </div>
            ))}
          </div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm p-6 text-center">
            <Lock size={48} className="text-amber-500 mb-4" />
            <h4 className="text-2xl font-bold text-white mb-2">Desbloquea tu Hoja de Ruta</h4>
            <p className="text-slate-300 max-w-md mb-8">
              Tu perfil presenta puntos ciegos tácticos que tus adversarios podrían capitalizar. Contáctanos para acceder al análisis profundo.
            </p>

            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)] mb-8"
            >
              Agendar Sesión Táctica
            </a>

            <div className="pt-6 border-t border-slate-800/50 w-full max-w-xs flex flex-col items-center">
              <span className="text-slate-400 text-xs uppercase tracking-widest mb-3">Inteligencia Gratuita</span>
              <a
                href="https://www.instagram.com/sinrodeospoliticayestrategia/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-500 hover:text-pink-400 font-bold text-sm transition-colors"
              >
                <ExternalLink size={18} /> Ver Tips en Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* FIN ZONA DE CAPTURA */}

    </div>
  );
}