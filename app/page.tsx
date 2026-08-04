'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] font-sans antialiased">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-[#0B1220]/80 backdrop-blur-md' : 'bg-transparent'}`} style={{ borderColor: '#233044' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-lg tracking-widest uppercase">Sin Rodeos</div>
          <Link href="/diagnostico" className="font-semibold px-6 py-2.5 rounded transition-all bg-[#D4A53A] text-[#0B1220] hover:opacity-90">
            Comenzar Diagnóstico
          </Link>
        </div>
      </nav>

      <section className="relative pt-40 pb-24 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
          La inteligencia estratégica para <br/>
          <span style={{ color: '#D4A53A' }}>campañas que quieren ganar.</span>
        </h1>
        <p className="text-lg text-[#94A3B8] mb-10 max-w-xl mx-auto">
          Sin Rodeos Intelligence es la primera plataforma diseñada para diagnosticar candidatos y construir estrategias basadas en datos.
        </p>
        <Link href="/diagnostico" className="inline-block font-semibold px-8 py-3.5 rounded transition-all bg-[#D4A53A] text-[#0B1220] hover:opacity-90">
          Comenzar Diagnóstico
        </Link>
      </section>
    </div>
  );
}