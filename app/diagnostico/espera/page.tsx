'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EsperaDiagnosticoPage() {
    return (
        <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-[#111827] border border-[#233044] rounded-2xl p-8 shadow-2xl text-center space-y-6"
            >
                <div className="w-16 h-16 bg-[#D4A53A]/10 border border-[#D4A53A]/30 rounded-2xl flex items-center justify-center mx-auto text-[#D4A53A]">
                    <Clock className="w-8 h-8 animate-pulse" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold tracking-tight">Solicitud en Proceso de Análisis</h1>
                    <p className="text-sm text-[#94A3B8]">
                        Tus respuestas han sido recibidas exitosamente por nuestro sistema de pre-evaluación. Un consultor senior está procesando tus indicadores tácticos.
                    </p>
                </div>

                <div className="bg-[#0B1220] border border-[#233044] rounded-xl p-4 text-left space-y-3">
                    <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                        <CheckCircle2 className="w-4 h-4 text-[#D4A53A] shrink-0" />
                        <span>Datos de contacto registrados correctamente.</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                        <ShieldCheck className="w-4 h-4 text-[#D4A53A] shrink-0" />
                        <span>Generando puntaje oficial IESR™ y plan de acción.</span>
                    </div>
                </div>

                <p className="text-xs text-[#64748B]">
                    Te notificaremos a través del correo y WhatsApp registrados tan pronto el diagnóstico experto esté listo para su entrega.
                </p>

                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 w-full bg-[#1F2937] hover:bg-[#374151] border border-[#374151] text-white font-bold py-3 rounded-xl transition-all text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Volver al Inicio</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}