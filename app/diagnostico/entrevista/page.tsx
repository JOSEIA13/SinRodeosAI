'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Bot, User, Download, Printer, ChevronRight, Briefcase, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PREGUNTAS_EJECUTIVAS = [
  { id: 'e1_dolor', texto: '¿Cuál es el dolor estructural de la región que sus oponentes no se atreven a mencionar por miedo a perder votos?' },
  { id: 'e2_crisis', texto: 'Ante una crisis de seguridad o escándalo de corrupción en su gabinete, ¿cuál es su protocolo de contención en las primeras 24 horas?' },
  { id: 'e3_bloqueo', texto: 'Si el concejo/asamblea le bloquea su principal proyecto de infraestructura en el primer mes, ¿qué mecanismo de presión activa?' },
  { id: 'e4_metrica', texto: '¿Qué indicador numérico exacto usará el electorado para medir su éxito al final de su primer año de mandato?' }
];

const PREGUNTAS_LEGISLATIVAS = [
  { id: 'l1_nicho', texto: '¿A qué nicho poblacional o gremio específico representa usted y por qué ese grupo está huérfano de representación hoy?' },
  { id: 'l2_control', texto: '¿Qué tema intocable del gobierno actual piensa auditar y denunciar sin importar el costo político?' },
  { id: 'l3_minoria', texto: 'Siendo minoría en la corporación, ¿cómo lograría negociar y aprobar un proyecto clave para su base electoral?' },
  { id: 'l4_ruido', texto: 'En una corporación llena de políticos, ¿cómo garantizará que la prensa y la gente recuerden su nombre y no sea uno más del montón?' }
];

export default function EntrevistaEstructuradaPage() {
  const router = useRouter();

  const [cargoSeleccionado, setCargoSeleccionado] = useState<'EJECUTIVO' | 'LEGISLATIVO' | null>(null);
  const [preguntasActivas, setPreguntasActivas] = useState<any[]>([]);

  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestaActual, setRespuestaActual] = useState('');
  const [datosAcumulados, setDatosAcumulados] = useState<Record<string, string>>({});
  const [historial, setHistorial] = useState<Array<{ rol: 'ia' | 'usuario'; texto: string }>>([]);
  const [estaEscribiendo, setEstaEscribiendo] = useState(false);
  const [analizando, setAnalizando] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState('');

  const [mostrarModalContacto, setMostrarModalContacto] = useState(false);
  const [contactoUsuario, setContactoUsuario] = useState({ email: '', whatsapp: '' });
  const [resultadoFinal, setResultadoFinal] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const iniciarEntrevista = (tipoCargo: 'EJECUTIVO' | 'LEGISLATIVO') => {
    setCargoSeleccionado(tipoCargo);
    const setPreguntas = tipoCargo === 'EJECUTIVO' ? PREGUNTAS_EJECUTIVAS : PREGUNTAS_LEGISLATIVAS;
    setPreguntasActivas(setPreguntas);

    const textoInicial = tipoCargo === 'EJECUTIVO'
      ? `Ha seleccionado el perfil Ejecutivo. Procederemos con la auditoría de gerencia territorial y manejo de crisis.\n\n${setPreguntas[0].texto}`
      : `Ha seleccionado el perfil Legislativo. Procederemos con la auditoría de control político, nichos y debate.\n\n${setPreguntas[0].texto}`;

    setHistorial([{ rol: 'ia', texto: textoInicial }]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historial, estaEscribiendo]);

  // CONEXIÓN CON EL JUEZ DE IA
  const finalizarEntrevista = async (datosFinales: Record<string, string>) => {
    setAnalizando(true);
    setMensajeEstado('El motor de IA está evaluando la coherencia y profundidad estratégica de sus respuestas...');

    try {
      const res = await fetch('/api/evaluar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuestas: datosFinales, cargo: cargoSeleccionado })
      });

      const data = await res.json();

      if (data.error) {
        setResultadoFinal({ coherente: false, veredicto: "Error interno del servidor. No se pudo procesar." });
      } else {
        setResultadoFinal(data);
        // Solo guardamos si la IA dice que es coherente
        if (data.coherente) {
          localStorage.setItem('sinrodeos_resultado_diagnostico', JSON.stringify(data));
        }
      }
    } catch (error) {
      setResultadoFinal({ coherente: false, veredicto: "Error de conexión al procesar la auditoría." });
    } finally {
      setAnalizando(false);
      setMostrarModalContacto(true);
    }
  };

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!respuestaActual.trim() || analizando) return;

    const preguntaObj = preguntasActivas[indiceActual];
    const respuestaTrim = respuestaActual.trim();
    const nuevasRespuestas = { ...datosAcumulados, [preguntaObj.id]: respuestaTrim };

    setHistorial((prev) => [...prev, { rol: 'usuario', texto: respuestaTrim }]);
    setRespuestaActual('');
    setDatosAcumulados(nuevasRespuestas);

    const siguienteIndice = indiceActual + 1;

    if (siguienteIndice < preguntasActivas.length) {
      setEstaEscribiendo(true);
      setTimeout(() => {
        const siguientePregunta = preguntasActivas[siguienteIndice];
        setHistorial((prev) => [...prev, { rol: 'ia', texto: siguientePregunta.texto }]);
        setIndiceActual(siguienteIndice);
        setEstaEscribiendo(false);
      }, 800);
    } else {
      finalizarEntrevista(nuevasRespuestas);
    }
  };

  const enviarSolicitudFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalizando(true);
    setMensajeEstado('Preparando su dictamen final...');
    try {
      await fetch('/api/enviar-solicitud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuestas: datosAcumulados, contacto: contactoUsuario, resultado: resultadoFinal, cargo: cargoSeleccionado })
      });
      router.push('/diagnostico/espera');
    } catch (err) {
      setAnalizando(false);
    }
  };

  const descargarReporte = () => { window.print(); };
  const progreso = preguntasActivas.length > 0 ? Math.round(((indiceActual + 1) / preguntasActivas.length) * 100) : 0;

  if (!cargoSeleccionado) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-6 text-white">
        <div className="max-w-xl w-full bg-[#111827] border border-[#233044] p-8 rounded-3xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-[#D4A53A] uppercase tracking-widest">Defina su Escenario</h1>
            <p className="text-[#94A3B8] text-sm">El motor de auditoría ajustará sus vectores de presión según la naturaleza del cargo al que aspira.</p>
          </div>

          <div className="space-y-4">
            <button onClick={() => iniciarEntrevista('EJECUTIVO')} className="w-full bg-[#0B1220] border border-[#233044] hover:border-[#D4A53A] p-6 rounded-2xl flex items-center justify-between group transition-all">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-[#D4A53A]/10 text-[#D4A53A] flex items-center justify-center shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Perfil Ejecutivo</h3>
                  <p className="text-xs text-[#94A3B8]">Alcaldías y Gobernaciones (Gerencia y Crisis)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#D4A53A]" />
            </button>

            <button onClick={() => iniciarEntrevista('LEGISLATIVO')} className="w-full bg-[#0B1220] border border-[#233044] hover:border-[#D4A53A] p-6 rounded-2xl flex items-center justify-between group transition-all">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-[#D4A53A]/10 text-[#D4A53A] flex items-center justify-center shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Perfil Legislativo</h3>
                  <p className="text-xs text-[#94A3B8]">Concejo, Asamblea, Congreso (Control Político)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#D4A53A]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      <header className="bg-[#111827] border-b border-[#233044] p-4 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-sm font-bold uppercase tracking-widest text-[#D4A53A]">
            Auditoría: {cargoSeleccionado}
          </h1>
          <div className="w-40 bg-[#0B1220] h-2 rounded-full border border-[#233044] overflow-hidden">
            <div className="bg-[#D4A53A] h-full transition-all" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </header>

      <main className="max-w-3xl w-full mx-auto p-4 flex-1 space-y-6">
        {historial.map((msg, idx) => (
          <div key={idx} className={`flex items-start gap-3 ${msg.rol === 'usuario' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.rol === 'usuario' ? 'bg-[#D4A53A]' : 'bg-[#111827] border border-[#233044]'}`}>
              {msg.rol === 'usuario' ? <User className="w-4 h-4 text-black" /> : <Bot className="w-4 h-4 text-[#D4A53A]" />}
            </div>
            <div className={`p-4 rounded-2xl text-sm ${msg.rol === 'usuario' ? 'bg-[#D4A53A] text-black rounded-tr-none' : 'bg-[#111827] border border-[#233044] rounded-tl-none leading-relaxed'}`}>
              {msg.texto}
            </div>
          </div>
        ))}
        {analizando && (
          <div className="flex items-center gap-3 text-[#D4A53A] p-4">
            <Bot className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-bold animate-pulse">{mensajeEstado}</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      <footer className="p-4 bg-[#111827]">
        <form onSubmit={manejarEnvio} className="max-w-3xl mx-auto flex gap-2">
          <input
            className="flex-1 bg-[#0B1220] border border-[#233044] rounded-xl px-4 py-3 text-sm focus:border-[#D4A53A] outline-none disabled:opacity-50"
            value={respuestaActual}
            onChange={(e) => setRespuestaActual(e.target.value)}
            placeholder="Respuesta táctica obligatoria..."
            disabled={analizando}
            required
          />
          <button type="submit" disabled={!respuestaActual.trim() || analizando} className="bg-[#D4A53A] px-6 py-2 rounded-xl text-black font-bold disabled:opacity-40 hover:brightness-110">
            Enviar
          </button>
        </form>
      </footer>

      {mostrarModalContacto && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111827] border border-[#233044] p-8 rounded-2xl max-w-md w-full space-y-6">

            {/* LÓGICA DEL JUEZ: SI DETECTA HUMO O INCOHERENCIAS */}
            {resultadoFinal?.coherente === false ? (
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-red-500/10 text-red-500 flex items-center justify-center rounded-full mx-auto mb-4">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-red-500 uppercase tracking-widest">Auditoría Rechazada</h2>
                <p className="text-sm text-gray-300 bg-red-900/20 p-4 rounded-xl border border-red-500/30 font-mono">
                  {resultadoFinal.veredicto}
                </p>
                <p className="text-xs text-gray-500">El motor de inteligencia estratégica exige respuestas argumentadas, no evasivas.</p>
                <button onClick={() => window.location.reload()} className="w-full bg-transparent border border-red-500 text-red-500 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition">
                  Reiniciar Evaluación
                </button>
              </div>
            ) : (
              /* LÓGICA DEL JUEZ: SI ES COHERENTE Y ESTRATÉGICO */
              <>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-[#D4A53A]/10 text-[#D4A53A] flex items-center justify-center rounded-full mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-black text-[#D4A53A] uppercase tracking-widest">Análisis Exitoso</h2>
                  <p className="text-xs text-[#94A3B8]">Las respuestas han sido validadas por el motor táctico.</p>
                </div>

                <div className="bg-[#0B1220] p-4 rounded-xl border border-[#233044] text-center">
                  <span className="text-xs text-gray-400 uppercase tracking-wider block">Puntaje Global</span>
                  <span className="text-4xl font-black text-[#D4A53A]">
                    {resultadoFinal?.puntaje_global}/100
                  </span>
                </div>

                <form onSubmit={enviarSolicitudFinal} className="space-y-3 border-t border-[#233044] pt-4">
                  <p className="text-xs text-[#94A3B8]">Ingresa tus datos para desbloquear el dictamen con tus vulnerabilidades y fortalezas:</p>
                  <input type="email" placeholder="Correo de campaña" className="w-full bg-black border border-[#233044] p-3 rounded-xl text-sm outline-none focus:border-[#D4A53A]" value={contactoUsuario.email} onChange={(e) => setContactoUsuario({ ...contactoUsuario, email: e.target.value })} required />
                  <input type="tel" placeholder="WhatsApp directo" className="w-full bg-black border border-[#233044] p-3 rounded-xl text-sm outline-none focus:border-[#D4A53A]" value={contactoUsuario.whatsapp} onChange={(e) => setContactoUsuario({ ...contactoUsuario, whatsapp: e.target.value })} required />
                  <button disabled={analizando} className="w-full bg-[#D4A53A] text-black py-3 rounded-xl font-bold text-sm hover:brightness-110 disabled:opacity-50">
                    {analizando ? 'Generando Dictamen...' : 'Ver Dictamen Completo'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}