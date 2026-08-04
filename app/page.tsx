'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, Zap, ShieldAlert, Target, Briefcase, Activity, BarChart3, Lightbulb, Check, Lock } from 'lucide-react';
import Link from 'next/link';

const THEME = {
  bg: '#0B1220',
  surface: '#111827',
  primary: '#D4A53A',
  text: '#F8FAFC',
  muted: '#94A3B8',
  border: '#233044'
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: THEME.bg, color: THEME.text }}>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'backdrop-blur-md' : 'border-transparent'}`} style={{ borderColor: THEME.border }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg tracking-widest uppercase">Sin Rodeos</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/diagnostico" className="font-semibold px-6 py-2.5 rounded transition-all" style={{ backgroundColor: THEME.primary, color: THEME.bg }}>
              Comenzar Diagnóstico
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-40 pb-24 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
          La inteligencia estratégica para <br/>
          <span style={{ color: THEME.primary }}>campañas que quieren ganar.</span>
        </h1>
        <p className="text-lg text-[#94A3B8] mb-10 max-w-xl mx-auto">
          Sin Rodeos Intelligence es la primera plataforma diseñada para diagnosticar candidatos y construir estrategias basadas en datos.
        </p>
        <Link href="/diagnostico" className="inline-block font-semibold px-8 py-3.5 rounded transition-all" style={{ backgroundColor: THEME.primary, color: THEME.bg }}>
          Comenzar Diagnóstico
        </Link>
      </section>
    </div>
  );
}
```eof

4. **Súbelo a GitHub:**
```bash
git add .
git commit -m "fix: limpieza total de app/page.tsx para corregir error de compilacion"
git push