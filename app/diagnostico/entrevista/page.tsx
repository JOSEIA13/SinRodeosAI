'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerPreguntasAleatorias, Pregunta } from './preguntas';
import { Loader2, ShieldAlert, ChevronRight, Briefcase, History, Mail, Phone } from 'lucide-react';

export default function EntrevistaPage() {
  const router = useRouter();
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});

  const [paso, setPaso] = useState(0);
  const [datosUsuario, setDatosUsuario] = useState({
    cargo: '',
    historial: '',
    correo: '',
    telefono: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iniciarSimulacion = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!datosUsuario.cargo || !datosUsuario.historial || !datosUsuario.correo || !datosUsuario.telefono) {
      setError("Todos los campos son obligatorios para perfilar la auditoría.");
      return;
    }

    setPreguntas(obtenerPreguntasAleatorias(datosUsuario.cargo));
    setPaso(1);
  };

  const avanzarPaso = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const preguntaActual = preguntas[paso - 1];
    const respuestaActual = respuestas[preguntaActual.id] || '';

    if (respuestaActual.trim().length < 20) {
      setError("El motor táctico exige respuestas desarrolladas. No se admiten evasivas cortas.");
      return;
    }

    if (paso < 3) {
      setPaso(paso + 1);
    } else {
      enviarAuditoria();
    }
  };

  const enviarAuditoria = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/evaluar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cargo: datosUsuario.cargo,
          historial: datosUsuario.historial,
          correo: datosUsuario.correo,
          telefono: datosUsuario.telefono,
          respuestas: respuestas
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error en el servidor');

      sessionStorage.setItem('dictamen_ia', JSON.stringify(data));
      sessionStorage.setItem('lead_datos', JSON.stringify(datosUsuario));
      router.push('/diagnostico/resultado');

    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  if (paso > 0 && preguntas.length === 0) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-2xl">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Simulador Táctico</h1>
          <p className="text-slate-400">
            {paso === 0 ? 'Configura tu perfil para iniciar la auditoría.' : `Fase de Estrés: ${paso} de 3`}
          </p>

          {paso > 0 && (
            <div className="w-full bg-slate-900 h-2 mt-6 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-amber-500 h-full transition-all duration-500"
                style={{ width: `${(paso / 3) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        {paso === 0 && (
          <form onSubmit={iniciarSimulacion} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 flex items-center gap-2"><Briefcase size={16} /> Cargo a aspirar</label>
                <select
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                  value={datosUsuario.cargo}
                  onChange={e => setDatosUsuario({ ...datosUsuario, cargo: e.target.value })}
                >
                  <option value="">Selecciona un cargo...</option>
                  <option value="Alcaldía">Alcaldía</option>
                  <option value="Gobernación">Gobernación</option>
                  <option value="Concejo">Concejo Municipal</option>
                  <option value="Asamblea">Asamblea Departamental</option>
                  <option value="Congreso">Congreso de la República</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 flex items-center gap-2"><History size={16} /> Historial Político</label>
                <select
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                  value={datosUsuario.historial}
                  onChange={e => setDatosUsuario({ ...datosUsuario, historial: e.target.value })}
                >
                  <option value="">Selecciona tu historial...</option>
                  <option value="Aspirante Nuevo">Es mi primera vez aspirando</option>
                  <option value="Excandidato">Ya he sido candidato antes</option>
                  <option value="Funcionario Actual">Soy funcionario actual buscando reelección/ascenso</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 flex items-center gap-2"><Mail size={16} /> Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                  value={datosUsuario.correo}
                  onChange={e => setDatosUsuario({ ...datosUsuario, correo: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 flex items-center gap-2"><Phone size={16} /> WhatsApp de Campaña</label>
                <input
                  type="tel"
                  placeholder="+57 300 000 0000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                  value={datosUsuario.telefono}
                  onChange={e => setDatosUsuario({ ...datosUsuario, telefono: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-950/50 border border-rose-500/50 text-rose-400 p-3 rounded-lg flex items-center gap-3 text-sm">
                <ShieldAlert size={18} /> {error}
              </div>
            )}

            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-lg py-4 rounded-xl uppercase tracking-widest transition-all mt-4">
              Iniciar Simulación Táctica
            </button>
          </form>
        )}

        {paso > 0 && (
          <form onSubmit={avanzarPaso} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-rose-500/10 text-rose-500 font-mono px-3 py-1 rounded text-sm border border-rose-500/20">
                CRISIS {paso}/3
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                {preguntas[paso - 1].categoria}
              </span>
            </div>

            <p className="text-xl text-white mb-6 leading-relaxed">
              {preguntas[paso - 1].texto}
            </p>

            <textarea
              required
              rows={5}
              placeholder="¿Cuál es tu maniobra estratégica? Escribe tu respuesta detallada aquí..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all resize-none mb-6 text-lg"
              value={respuestas[preguntas[paso - 1].id] || ''}
              onChange={(e) => setRespuestas(prev => ({ ...prev, [preguntas[paso - 1].id]: e.target.value }))}
            />

            {error && (
              <div className="bg-rose-950/50 border border-rose-500/50 text-rose-400 p-3 rounded-lg flex items-center gap-3 mb-6 text-sm">
                <ShieldAlert size={18} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-lg py-4 rounded-xl uppercase tracking-widest transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin" size={20} /> Auditando Respuestas...</>
              ) : (
                paso < 3 ? <><ChevronRight size={20} /> Siguiente Maniobra</> : 'Enviar al Consultor IA'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}