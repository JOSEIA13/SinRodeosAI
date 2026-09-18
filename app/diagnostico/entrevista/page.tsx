'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerPreguntasAleatorias, Pregunta } from '../../lib/preguntas';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function EntrevistaPage() {
  const router = useRouter();
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar preguntas aleatorias al iniciar
  useEffect(() => {
    setPreguntas(obtenerPreguntasAleatorias());
  }, []);

  const handleChange = (id: string, valor: string) => {
    setRespuestas(prev => ({ ...prev, [id]: valor }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validar que todas las preguntas tengan respuesta de buen tamaño
    const todasRespondidas = preguntas.every(p => respuestas[p.id]?.trim().length > 20);
    if (!todasRespondidas) {
      setError("El motor táctico exige respuestas desarrolladas. No se admiten evasivas.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/evaluar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cargo: 'Candidato (Auditoría General)',
          respuestas: respuestas
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error en el servidor');

      // Guardar dictamen en sesión y saltar al resultado
      sessionStorage.setItem('dictamen_ia', JSON.stringify(data));
      router.push('/diagnostico/resultado');

    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  if (preguntas.length === 0) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      <div className="max-w-3xl mx-auto space-y-8 mt-10">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider">Simulador de Estrés Político</h1>
          <p className="text-slate-400 mt-2">Responde a estas 3 crisis tácticas. Sé directo y estratégico.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {preguntas.map((pregunta, index) => (
            <div key={pregunta.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-amber-500/10 text-amber-500 font-mono px-3 py-1 rounded text-sm border border-amber-500/20">
                  Fase 0{index + 1}
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  {pregunta.categoria}
                </span>
              </div>
              <p className="text-lg text-white mb-4 leading-relaxed">{pregunta.texto}</p>
              <textarea
                required
                rows={4}
                placeholder="Tu maniobra estratégica aquí..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all resize-none"
                onChange={(e) => handleChange(pregunta.id, e.target.value)}
              />
            </div>
          ))}

          {error && (
            <div className="bg-rose-950/50 border border-rose-500/50 text-rose-400 p-4 rounded-lg flex items-center gap-3">
              <ShieldAlert size={20} />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-lg py-5 rounded-xl uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 shadow-xl shadow-amber-500/10"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={24} /> Procesando Auditoría...</>
            ) : (
              'Enviar al Consultor IA'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}