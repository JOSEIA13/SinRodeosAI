'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, CheckCircle2, TrendingUp, Award, ArrowRight, Download, Printer } from 'lucide-react';

export default function DiagnosticoResultadoPage() {
    const router = useRouter();
    const [resultado, setResultado] = useState<any>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const datosGuardados = localStorage.getItem('sinrodeos_resultado_diagnostico');
        if (datosGuardados) {
            try {
                setResultado(JSON.parse(datosGuardados));
            } catch (e) {
                console.error("Error al leer el diagnóstico", e);
            }
        }
        setCargando(false);
    }, []);

    const imprimirInforme = () => {
        window.print();
    };

    if (cargando) {
        pasa: return (
            <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center">
                <p className="text-[#D4A53A] animate-pulse font-bold">Cargando análisis estratégico...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1220] text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Cabecera del Informe */}
                <div className="bg-[#111827] border border-[#233044] p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-[#D4A53A] font-bold">Auditoría Electoral Oficial</span>
                        <h1 className="text-2xl md:text-3xl font-black mt-1">Dictamen de Viabilidad Estratégica</h1>
                        <p className="text-sm text-[#94A3B8] mt-2">Análisis ponderado de capacidades, terreno y riesgo operativo.</p>
                    </div>
                    <div className="bg-[#0B1220] border border-[#233044] px-6 py-4 rounded-xl text-center">
                        <span className="text-xs text-gray-400 block uppercase">Puntaje Global</span>
                        <span className="text-4xl font-black text-[#D4A53A]">
                            {resultado?.total || resultado?.puntajeFinal || '82/100'}
                        </span>
                    </div>
                </div>

                {/* Bloques de Evaluación por Fases */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#111827] border border-[#233044] p-6 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-[#D4A53A]">
                            <Award className="w-5 h-5" />
                            <h3 className="font-bold text-sm">Fase 1: Propósito</h3>
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                            Consistencia entre la narrativa personal, el arquetipo de liderazgo y las expectativas reales del electorado.
                        </p>
                        <div className="text-lg font-bold text-white pt-2 border-t border-[#233044]">
                            {resultado?.fase1 || 'Alto Alineamiento'}
                        </div>
                    </div>

                    <div className="bg-[#111827] border border-[#233044] p-6 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-[#D4A53A]">
                            <TrendingUp className="w-5 h-5" />
                            <h3 className="font-bold text-sm">Fase 2: Territorio</h3>
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                            Capacidad de lectura de los dolores ciudadanos frente a las propuestas disruptivas y posicionamiento de oponentes.
                        </p>
                        <div className="text-lg font-bold text-white pt-2 border-t border-[#233044]">
                            {resultado?.fase2 || 'Zona de Oportunidad'}
                        </div>
                    </div>

                    <div className="bg-[#111827] border border-[#233044] p-6 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-[#D4A53A]">
                            <ShieldAlert className="w-5 h-5" />
                            <h3 className="font-bold text-sm">Fase 3: Operativa</h3>
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                            Solidez estructural, protocolos de crisis y efectividad del sistema de movilización y control de votos (Día D).
                        </p>
                        <div className="text-lg font-bold text-white pt-2 border-t border-[#233044]">
                            {resultado?.fase3 || 'Requiere Refuerzo'}
                        </div>
                    </div>
                </div>

                {/* Acciones y Botones de Salida */}
                <div className="bg-[#111827] border border-[#233044] p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-[#94A3B8]">
                        ¿Deseas conservar este dictamen en físico o compartirlo con tu equipo directivo?
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <button
                            onClick={imprimirInforme}
                            className="flex-1 sm:flex-none border border-[#D4A53A] text-[#D4A53A] px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#D4A53A]/10 transition"
                        >
                            <Printer className="w-4 h-4" /> Imprimir Dictamen
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="flex-1 sm:flex-none bg-[#D4A53A] text-black px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition"
                        >
                            Finalizar y Salir <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}