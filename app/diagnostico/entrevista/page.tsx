'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Bot, User, Download, Printer, ChevronRight, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
// Mantendremos la importación del engine por ahora, en el Paso 2 lo conectaremos a la IA
import { calcularDiagnosticoBase } from '@/lib/diagnostic/engine';

// BANCO DE PREGUNTAS: EJECUTIVOS (Alcaldías y Gobernaciones)
const PREGUNTAS_EJECUTIVAS = [
  { id: 'e1_dolor', texto: '¿Cuál es el dolor estructural de la región que sus oponentes no se atreven a mencionar por miedo a perder votos?' },
  { id: 'e2_crisis', texto: 'Ante una crisis de seguridad o escándalo de corrupción en su gabinete, ¿cuál es su protocolo de contención en las primeras 24 horas?' },
  { id: 'e3_bloqueo', texto: 'Si el concejo/asamblea le bloquea su principal proyecto de infraestructura en el primer mes, ¿qué mecanismo de presión activa?' },
  { id: 'e4_metrica', texto: '¿Qué indicador numérico exacto usará el electorado para medir su éxito al final de su primer año de mandato?' }
];

// BANCO DE PREGUNTAS: LEGISLATIVOS (Concejo, Asamblea, Congreso)
const PREGUNTAS_LEGISLATIVAS = [
  { id: 'l1_nicho', texto: '¿A qué nicho poblacional o gremio específico representa usted y por qué ese grupo está huérfano de representación hoy?' },
  { id: 'l2_control', texto: '¿Qué tema intocable del gobierno actual piensa auditar y denunciar sin importar el costo político?' },
  { id: 'l3_minoria', texto: 'Siendo minoría en la corporación, ¿cómo lograría negociar y aprobar un proyecto clave para su base electoral?' },
  { id: 'l4_ruido', texto: 'En una corporación llena de políticos, ¿cómo garantizará que la prensa y la gente recuerden su nombre y no sea uno más del montón?' }
];

export default function EntrevistaEstructuradaPage() {
  const router = useRouter();

  // Nuevo Estado: Cargo y Selección
  const [cargoSeleccionado, setCargoSeleccionado] = useState<'EJECUTIVO' | 'LEGISLATIVO' | null>(null);
  const [preguntasActivas, setPreguntasActivas] = useState<any[]>([]);

  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestaActual, setRespuestaActual] = useState('');
  const [datosAcumulados, setDatosAcumulados] = useState<Record<string, string>>({});
  const [historial, setHistorial] = useState<Array<{ rol: 'ia' | 'usuario'; texto: string }>>([]);
  const [estaEscribiendo, setEstaEscribiendo] = useState(false);
  const [analizando, setAnalizando] = useState(false);

  // Estados Finales
  const [mostrarModalContacto, setMostrarModalContacto] = useState(false);
  const [contactoUsuario, setContactoUsuario] = useState({ email: '', whatsapp: '' });
  const [resultadoFinal, setResultadoFinal] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Iniciar la entrevista UNA VEZ que seleccionan el cargo
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

  const finalizarEntrevista = (datosFinales: Record<string, string>) => {
    // Aquí añadiremos la conexión con IA en el Paso 2
    const puntaje = calcularDiagnosticoBase(datosFinales);
    setResultadoFinal(puntaje);
    localStorage.setItem('sinrodeos_resultado_diagnostico', JSON.stringify(puntaje));
    setAnalizando(false);
    setMostrarModalContacto(true);
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
      setAnalizando(true);
      finalizarEntrevista(nuevasRespuestas);
    }
  };

  const enviarSolicitudFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalizando(true);
    try {
      await fetch('/api/enviar-solicitud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuestas: datosAcumulados, contacto: contactoUsuario, resultado: resultadoFinal, cargo: cargoSeleccionado })
      });
      router.push('/diagnostico/espera');
    } catch (err) {
      console.error(err);
      setAnalizando(false);
    }
  };

  const descargarReporte = () => { window.print(); };
  const progreso = preguntasActivas.length > 0 ? Math.round(((indiceActual + 1) / preguntasActivas.length) * 100) : 0;

  // PANTALLA 0: SELECCIÓN DE CARGO
  if (!cargoSeleccionado) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-6 text-white">
        <div className="max-w-xl w-full bg-[#111827] border border-[#233044] p-8 rounded-3xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-[#D4A53A] uppercase tracking-widest">Defina su Escenario</h1>
            <p className="text-[#94A3B8] text-sm">El motor de auditoría ajustará sus vectores de presión según la naturaleza del cargo al que aspira.</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => iniciarEntrevista('EJECUTIVO')}
              className="w-full bg-[#0B1220] border border-[#233044] hover:border-[#D4A53A] p-6 rounded-2xl flex items-center justify-between group transition-all"
            >
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

            <button
              onClick={() => iniciarEntrevista('LEGISLATIVO')}
              className="w-full bg-[#0B1220] border border-[#233044] hover:border-[#D4A53A] p-6 rounded-2xl flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-[#D4A53A]/10 text-[#D4A53A] flex items-center justify-center shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Perfil Legislativo</h3>
                  <p className="text-xs text-[#94A3B8]">Concejo, Asamblea, Congreso (Control Político y Nichos)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#D4A53A]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PANTALLA 1: ENTREVISTA DINÁMICA (El resto del código se mantiene igual, renderizando el chat)
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
            <div>
              <h2 className="text-lg font-bold text-[#D4A53A]">Diagnóstico Base Completado</h2>
              <p className="text-xs text-[#94A3B8]">Validando coherencia de respuestas en progreso...</p>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={descargarReporte} className="flex-1 border border-[#D4A53A] text-[#D4A53A] py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#D4A53A]/10">
                <Download className="w-4 h-4" /> Imprimir Dictamen Local
              </button>
            </div>
            <form onSubmit={enviarSolicitudFinal} className="space-y-3 border-t border-[#233044] pt-4">
              <input type="email" placeholder="Tu correo electrónico" className="w-full bg-black border border-[#233044] p-3 rounded-xl text-sm outline-none focus:border-[#D4A53A]" value={contactoUsuario.email} onChange={(e) => setContactoUsuario({ ...contactoUsuario, email: e.target.value })} required />
              <input type="tel" placeholder="Tu WhatsApp" className="w-full bg-black border border-[#233044] p-3 rounded-xl text-sm outline-none focus:border-[#D4A53A]" value={contactoUsuario.whatsapp} onChange={(e) => setContactoUsuario({ ...contactoUsuario, whatsapp: e.target.value })} required />
              <button className="w-full bg-[#D4A53A] text-black py-3 rounded-xl font-bold text-sm hover:brightness-110">
                Solicitar Verificación Estricta IA
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}