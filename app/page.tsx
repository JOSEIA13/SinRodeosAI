'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Target, ShieldAlert, Briefcase } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] font-sans antialiased">
      {/* Navegación */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-[#0B1220]/80 backdrop-blur-md border-[#233044]' : 'border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-lg tracking-widest uppercase">Sin Rodeos</div>
          <Link href="/diagnostico" className="font-semibold px-6 py-2.5 rounded transition-all bg-[#D4A53A] text-[#0B1220] hover:opacity-90">
            Comenzar Diagnóstico
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
          La inteligencia estratégica para <br/>
          <span style={{ color: '#D4A53A' }}>campañas que quieren ganar.</span>
        </h1>
        <p className="text-lg text-[#94A3B8] mb-10 max-w-xl mx-auto">
          Sin Rodeos Intelligence transforma datos complejos en una hoja de ruta militarmente precisa para tu campaña.
        </p>
        <Link href="/diagnostico" className="inline-block font-semibold px-8 py-3.5 rounded transition-all bg-[#D4A53A] text-[#0B1220] hover:opacity-90">
          Comenzar Diagnóstico
        </Link>
      </section>

      {/* Secciones de valor */}
      <section className="py-24 border-t border-[#233044]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-8 rounded-xl bg-[#111827]">
            <Target className="w-10 h-10 text-[#D4A53A] mb-4" />
            <h3 className="text-xl font-bold mb-3">Diagnóstico Preciso</h3>
            <p className="text-[#94A3B8]">Evaluamos el terreno electoral con objetividad clínica. Sin sesgos, solo datos.</p>
          </div>
          <div className="p-8 rounded-xl bg-[#111827]">
            <ShieldAlert className="w-10 h-10 text-[#D4A53A] mb-4" />
            <h3 className="text-xl font-bold mb-3">Candidate DNA™</h3>
            <p className="text-[#94A3B8]">Mapeo algorítmico de fortalezas y debilidades. Conoce tus vulnerabilidades.</p>
          </div>
          <div className="p-8 rounded-xl bg-[#111827]">
            <Briefcase className="w-10 h-10 text-[#D4A53A] mb-4" />
            <h3 className="text-xl font-bold mb-3">Plan de Acción</h3>
            <p className="text-[#94A3B8]">De la estrategia a la táctica. Tareas diarias para movilizar tu campaña.</p>
          </div>
        </div>
      </section>
    </div>
  );
}