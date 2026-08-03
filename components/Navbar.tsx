import { ArrowRight } from 'lucide-react';
import { brand } from './theme';

const navItems = [
  { label: 'Solución', href: '#solucion' },
  { label: 'Metodología', href: '#como-funciona' },
  { label: 'Vista', href: '#dashboard' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 backdrop-blur-xl bg-slate-950/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/70 shadow-sm" style={{ borderColor: brand.gold }}>
            <span className="h-2.5 w-2.5 rounded-full bg-[#D4A53A]" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">Sin Rodeos</span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-slate-400">Intelligence</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="#contact" className="text-sm font-medium text-slate-400 transition hover:text-white">
            Iniciar sesión
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full bg-[#D4A53A] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105"
          >
            Acceso prioritario <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button className="md:hidden rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white">
          Navegar
        </button>
      </nav>
    </header>
  );
}
