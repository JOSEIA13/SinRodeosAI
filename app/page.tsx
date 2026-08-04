'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Activity, Check, Target, ShieldAlert, Briefcase } from 'lucide-react';
import Link from 'next/link';

const THEME = {
  bg: '#0B1220',
  surface: '#111827',
  primary: '#D4A53A',
  text: '#F8FAFC',
  muted: '#94A3B8',
  border: '#233044'
};

export default function LandingPremium() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden" style={{ backgroundColor: THEME.bg, color: THEME.text }}>
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'backdrop-blur-md shadow-2xl' : 'border-transparent'}`} style={{ borderColor: isScrolled ? THEME.border : 'transparent' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-bold text-lg tracking-widest uppercase">Sin Rodeos</span>
          <Link href="/diagnostico" className="font-semibold px-6 py-2.5 rounded transition-all" style={{ backgroundColor: THEME.primary, color: THEME.bg }}>
            Solicitar acceso
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
            La inteligencia estratégica para <br/>
            <span style={{ color: THEME.primary }}>campañas que quieren ganar.</span>
          </h1>
          <p className="text-lg mb-10 text-[#94A3B8]">
            Sin Rodeos Intelligence es la primera plataforma diseñada para diagnosticar candidatos, evaluar campañas y construir estrategias basadas en IA.
          </p>
          <Link href="/diagnostico" className="inline-block font-semibold px-8 py-3.5 rounded transition-all" style={{ backgroundColor: THEME.primary, color: THEME.bg }}>
            Comenzar Diagnóstico
          </Link>
        </div>

        {/* Mockup del Dashboard (Lo que extrañabas) */}
        <div className="lg:w-1/2 w-full border rounded-xl p-8 backdrop-blur-md" style={{ backgroundColor: 'rgba(17, 24, 39, 0.7)', borderColor: THEME.border }}>
           <div className="flex justify-between border-b pb-4 mb-6" style={{ borderColor: THEME.border }}>
             <h3 className="text-lg font-bold">Diagnóstico Estratégico</h3>
             <span className="text-xs px-2 py-1 rounded border text-[#D4A53A] border-[#D4A53A]">ACTIVO</span>
           </div>
           <div className="space-y-4">
             <div className="w-full bg-[#0B1220] h-2 rounded-full overflow-hidden">
               <div className="bg-[#D4A53A] w-[84%] h-full"></div>
             </div>
             <p className="text-sm text-[#94A3B8]">Posicionamiento: 84%</p>
           </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t" style={{ borderColor: THEME.border }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl" style={{ backgroundColor: THEME.surface, border: `1px solid ${THEME.border}` }}>
            <Target className="w-8 h-8 mb-4" style={{ color: THEME.primary }} />
            <h3 className="text-xl font-bold mb-3">Diagnóstico Preciso</h3>
            <p className="text-[#94A3B8]">Evaluamos el terreno electoral con objetividad clínica.</p>
          </div>
          <div className="p-8 rounded-xl" style={{ backgroundColor: THEME.surface, border: `1px solid ${THEME.border}` }}>
            <ShieldAlert className="w-8 h-8 mb-4" style={{ color: THEME.primary }} />
            <h3 className="text-xl font-bold mb-3">Candidate DNA™</h3>
            <p className="text-[#94A3B8]">Mapeo algorítmico de fortalezas y debilidades.</p>
          </div>
          <div className="p-8 rounded-xl" style={{ backgroundColor: THEME.surface, border: `1px solid ${THEME.border}` }}>
            <Briefcase className="w-8 h-8 mb-4" style={{ color: THEME.primary }} />
            <h3 className="text-xl font-bold mb-3">Plan de Acción</h3>
            <p className="text-[#94A3B8]">De la estrategia a la táctica. Tareas diarias claras.</p>
          </div>
        </div>
      </section>
    </div>
  );
}