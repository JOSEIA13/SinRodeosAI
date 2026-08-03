'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, ShieldAlert, BarChart3, ChevronRight, 
  Menu, X, Check, ArrowRight, Activity, 
  Lightbulb, Briefcase, FileText, Lock
} from 'lucide-react';

const THEME = {
  bg: '#0B1220',
  surface: '#111827',
  primary: '#D4A53A',
  secondary: '#2563EB',
  text: '#F8FAFC',
  muted: '#94A3B8',
  border: '#233044'
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    if (typeof document !== 'undefined' && !document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div 
      className="min-h-screen font-sans antialiased overflow-x-hidden selection:bg-[#D4A53A] selection:text-[#0B1220]"
      style={{ backgroundColor: THEME.bg, color: THEME.text }}
    >
      
      {}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'backdrop-blur-md shadow-2xl' : 'border-transparent'}`}
           style={{ 
             backgroundColor: isScrolled ? 'rgba(11, 18, 32, 0.85)' : 'transparent',
             borderColor: isScrolled ? THEME.border : 'transparent'
           }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 rounded border flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                 style={{ borderColor: THEME.primary, backgroundColor: 'rgba(212, 165, 58, 0.1)' }}>
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: THEME.primary }}></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-widest leading-none uppercase" style={{ color: THEME.text }}>
                Sin Rodeos
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase mt-1 font-medium" style={{ color: THEME.primary }}>
                Intelligence
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: THEME.muted }}>
            <a href="#solucion" className="hover:text-white transition-colors">La Solución</a>
            <a href="#como-funciona" className="hover:text-white transition-colors">Metodología</a>
            <a href="#diagnostico" className="hover:text-white transition-colors">Diagnóstico</a>
          </div>

          <div className="hidden md:flex items-center gap-5">
            <a href="#cta" className="text-sm font-medium transition-colors hover:text-white" style={{ color: THEME.muted }}>
              Client Login
            </a>
            <a href="#cta" className="text-sm font-semibold px-6 py-2.5 rounded transition-all flex items-center gap-2 group"
               style={{ backgroundColor: THEME.primary, color: THEME.bg }}>
              Solicitar acceso <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: THEME.text }}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {}
      <section className="relative pt-40 pb-24 lg:pt-52 lg:pb-32 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-12" style={{ minHeight: '95vh' }}>
        
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
             style={{
               backgroundImage: `linear-gradient(to right, ${THEME.border} 1px, transparent 1px), linear-gradient(to bottom, ${THEME.border} 1px, transparent 1px)`,
               backgroundSize: '40px 40px',
               maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 40%, transparent 100%)',
               WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 40%, transparent 100%)'
             }}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-20 z-0"
             style={{ background: `radial-gradient(circle, ${THEME.secondary} 0%, transparent 70%)` }}></div>

        <motion.div 
          className="lg:w-1/2 flex flex-col items-start text-left z-10 relative"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8 backdrop-blur-sm"
                      style={{ borderColor: THEME.border, backgroundColor: 'rgba(17, 24, 39, 0.6)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: THEME.primary }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: THEME.primary }}></span>
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: THEME.muted }}>
              Política <span style={{ color: THEME.border }}>&</span> Estrategia
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            La inteligencia estratégica para campañas <br/>
            <span style={{ color: THEME.primary }}>que quieren ganar.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg lg:text-xl mb-10 max-w-xl leading-relaxed font-light" style={{ color: THEME.muted }}>
            Sin Rodeos Intelligence es la primera plataforma diseñada para diagnosticar candidatos, evaluar campañas y construir estrategias políticas basadas en inteligencia artificial.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#cta" className="font-semibold px-8 py-3.5 rounded transition-all duration-300 flex items-center justify-center gap-2 group hover:opacity-90"
               style={{ backgroundColor: THEME.primary, color: THEME.bg }}>
              Solicitar acceso 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="font-medium px-8 py-3.5 rounded border transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm hover:bg-white/5"
                    style={{ borderColor: THEME.border, color: THEME.text, backgroundColor: 'rgba(17, 24, 39, 0.4)' }}>
              Ver demostración
            </button>
          </motion.div>
        </motion.div>

        {}
        <motion.div 
          className="lg:w-1/2 w-full relative z-10"
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {/* Decorative subtle glow behind mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-[80px] -z-10 opacity-30" 
               style={{ background: `radial-gradient(circle, ${THEME.primary} 0%, transparent 70%)` }}></div>
          
          <div className="rounded-xl border shadow-2xl overflow-hidden flex flex-col backdrop-blur-md transition-all duration-500 hover:shadow-2xl"
               style={{ backgroundColor: 'rgba(17, 24, 39, 0.7)', borderColor: THEME.border, boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px ${THEME.border}` }}>
            
            {/* Header Mockup */}
            <div className="h-12 border-b flex items-center px-5 justify-between" style={{ borderColor: THEME.border, backgroundColor: 'rgba(11, 18, 32, 0.5)' }}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: THEME.border }}></div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: THEME.border }}></div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: THEME.border }}></div>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest" style={{ color: THEME.muted }}>
                Dashboard Ejecutivo
              </div>
              <Lock className="w-3.5 h-3.5" style={{ color: THEME.border }} />
            </div>

            {/* Content Mockup */}
            <div className="p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: THEME.border }}>
                <h3 className="text-lg font-bold tracking-wide">Diagnóstico Estratégico</h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded border flex items-center gap-1.5"
                      style={{ backgroundColor: 'rgba(212, 165, 58, 0.1)', borderColor: 'rgba(212, 165, 58, 0.2)', color: THEME.primary }}>
                  <Activity className="w-3 h-3" /> ACTIVO
                </span>
              </div>

              <div className="space-y-5">
                {[
                  { label: "Posicionamiento", value: "84%", percent: 84 },
                  { label: "Liderazgo", value: "91%", percent: 91 },
                  { label: "Comunicación", value: "77%", percent: 77 }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span style={{ color: THEME.muted }}>{stat.label}</span>
                      <span style={{ color: THEME.text }}>{stat.value}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: THEME.border }}>
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${stat.percent}%` }} transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                        className="h-full rounded-full" style={{ backgroundColor: THEME.primary }}
                      />
                    </div>
                  </div>
                ))}

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span style={{ color: THEME.muted }}>Riesgo Electoral</span>
                    <span className="text-amber-400 font-semibold">Medio</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden flex gap-1" style={{ backgroundColor: 'transparent' }}>
                    <div className="h-full w-1/3 rounded-full bg-green-500"></div>
                    <div className="h-full w-1/3 rounded-full bg-amber-400"></div>
                    <div className="h-full w-1/3 rounded-full" style={{ backgroundColor: THEME.border }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-5 rounded-lg border bg-opacity-50" style={{ borderColor: THEME.border, backgroundColor: THEME.bg }}>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: THEME.primary }}>Recomendaciones</h4>
                <div className="space-y-3">
                  {[
                    "Fortalecer narrativa",
                    "Mejorar agenda",
                    "Definir segmentos"
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 165, 58, 0.15)' }}>
                        <Check className="w-2.5 h-2.5" style={{ color: THEME.primary }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: THEME.text }}>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {}
      <section id="solucion" className="py-24 relative border-t" style={{ borderColor: THEME.border, backgroundColor: THEME.bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">El instinto ya no es suficiente.</h2>
            <p className="text-lg leading-relaxed font-light" style={{ color: THEME.muted }}>
              Las campañas tradicionales pierden por basarse en suposiciones. Sin Rodeos Intelligence transforma datos complejos en una hoja de ruta militarmente precisa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Diagnóstico Preciso", icon: Target, desc: "Evaluamos el terreno electoral con objetividad clínica. Sin sesgos, solo datos." },
              { title: "Candidate DNA™", icon: ShieldAlert, desc: "Mapeo algorítmico de fortalezas y debilidades. Conoce tus vulnerabilidades antes que tu oponente." },
              { title: "Plan de Acción", icon: Briefcase, desc: "De la estrategia a la táctica. Tareas diarias claras para movilizar tu campaña hacia la victoria." }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1 group"
                  style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}
                >
                  <div className="w-12 h-12 rounded flex items-center justify-center mb-6 transition-colors"
                       style={{ backgroundColor: 'rgba(212, 165, 58, 0.05)', border: `1px solid ${THEME.border}` }}>
                    <Icon className="w-5 h-5 transition-colors" style={{ color: THEME.primary }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-sm leading-relaxed font-light" style={{ color: THEME.muted }}>{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section id="como-funciona" className="py-32 relative border-t" style={{ borderColor: THEME.border, backgroundColor: THEME.surface }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: THEME.primary }}>Metodología</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Cómo funciona el OS.</h2>
            </div>
            <p className="text-sm font-light max-w-sm" style={{ color: THEME.muted }}>
              Un proceso sistematizado para extraer inteligencia procesable en tiempo récord.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="hidden md:block absolute top-8 left-10 right-10 h-px z-0" style={{ backgroundColor: THEME.border }}></div>
            
            {[
              { num: "01", title: "Entrevista", icon: FileText },
              { num: "02", title: "Análisis", icon: Activity },
              { num: "03", title: "IESR™", icon: BarChart3 },
              { num: "04", title: "Candidate DNA", icon: ShieldAlert },
              { num: "05", title: "Plan 30 Días", icon: Lightbulb }
            ].map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center relative z-10 w-full mb-10 md:mb-0 group"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl border flex items-center justify-center mb-5 transition-all duration-300"
                         style={{ backgroundColor: THEME.bg, borderColor: THEME.border }}>
                      <IconComponent className="w-6 h-6" style={{ color: THEME.text }} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 font-bold rounded-full flex items-center justify-center text-[10px] shadow-lg border"
                         style={{ backgroundColor: THEME.primary, color: THEME.bg, borderColor: THEME.bg }}>
                      {step.num}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold px-2">{step.title}</h4>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section id="cta" className="py-32 relative border-t" style={{ borderColor: THEME.border, backgroundColor: THEME.bg }}>
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-10"
             style={{ background: `radial-gradient(circle, ${THEME.primary} 0%, transparent 70%)` }}></div>
             
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="border rounded-2xl p-8 lg:p-14 shadow-2xl backdrop-blur-sm"
               style={{ backgroundColor: 'rgba(17, 24, 39, 0.6)', borderColor: THEME.border }}>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-4 tracking-tight">Asegura tu ventaja estratégica.</h2>
              <p className="font-light text-lg" style={{ color: THEME.muted }}>
                Plazas estrictamente limitadas para el programa Alpha.
              </p>
            </div>

            {formStatus === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border"
                     style={{ backgroundColor: 'rgba(212, 165, 58, 0.1)', borderColor: 'rgba(212, 165, 58, 0.2)' }}>
                  <Check className="w-10 h-10" style={{ color: THEME.primary }} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Acceso Solicitado</h3>
                <p className="font-light" style={{ color: THEME.muted }}>Hemos recibido tus credenciales de campaña de forma segura.</p>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold uppercase tracking-wider text-[10px]" style={{ color: THEME.muted }}>Nombre Completo</label>
                    <input required type="text" className="w-full px-4 py-3 text-sm rounded border outline-none transition-all placeholder-opacity-50" 
                           placeholder="Ej. Juan Pérez"
                           style={{ backgroundColor: THEME.bg, borderColor: THEME.border, color: THEME.text }} />
                  </div>
                  <div className="space-y-2">
                    <label className="font-bold uppercase tracking-wider text-[10px]" style={{ color: THEME.muted }}>Correo Corporativo</label>
                    <input required type="email" className="w-full px-4 py-3 text-sm rounded border outline-none transition-all placeholder-opacity-50" 
                           placeholder="contacto@campana.com"
                           style={{ backgroundColor: THEME.bg, borderColor: THEME.border, color: THEME.text }} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold uppercase tracking-wider text-[10px]" style={{ color: THEME.muted }}>Ciudad Base</label>
                    <input required type="text" className="w-full px-4 py-3 text-sm rounded border outline-none transition-all placeholder-opacity-50" 
                           placeholder="Ciudad, País"
                           style={{ backgroundColor: THEME.bg, borderColor: THEME.border, color: THEME.text }} />
                  </div>
                  <div className="space-y-2">
                    <label className="font-bold uppercase tracking-wider text-[10px]" style={{ color: THEME.muted }}>Cargo Ejecutivo</label>
                    <select required defaultValue="" className="w-full px-4 py-3 text-sm rounded border outline-none transition-all appearance-none"
                            style={{ backgroundColor: THEME.bg, borderColor: THEME.border, color: THEME.text }}>
                      <option value="" disabled style={{ color: THEME.muted }}>Selecciona un rol...</option>
                      <option value="candidato">Candidato</option>
                      <option value="gerente">Gerente de Campaña</option>
                      <option value="consultor">Consultor Político</option>
                      <option value="partido">Estratega de Partido</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t mt-4" style={{ borderColor: THEME.border }}>
                  <button 
                    disabled={formStatus === 'submitting'}
                    type="submit" 
                    className="w-full font-bold py-4 rounded transition-all flex items-center justify-center gap-2 group hover:opacity-90 disabled:opacity-50 text-sm uppercase tracking-wide"
                    style={{ backgroundColor: THEME.primary, color: THEME.bg }}
                  >
                    {formStatus === 'submitting' ? 'Asegurando Protocolo...' : 'Solicitar Acceso Priority'} 
                    {formStatus !== 'submitting' && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                  <p className="text-center mt-4 flex items-center justify-center gap-2 font-medium text-[11px]" style={{ color: THEME.muted }}>
                    <Lock className="w-3 h-3" /> Infraestructura cifrada y confidencialidad absoluta.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {}
      <footer className="border-t pt-16 pb-8" style={{ borderColor: THEME.border, backgroundColor: THEME.surface }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-widest leading-none uppercase" style={{ color: THEME.text }}>
                  Sin Rodeos
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase mt-1 font-medium" style={{ color: THEME.primary }}>
                  Intelligence
                </span>
              </div>
              <p className="text-xs font-light max-w-xs mt-2" style={{ color: THEME.muted }}>
                Arquitectura estratégica para la política moderna.
              </p>
            </div>

            <div className="flex gap-16">
              <div className="flex flex-col gap-3">
                <span className="font-bold uppercase tracking-wider mb-2 text-[10px]" style={{ color: THEME.text }}>Plataforma</span>
                <a href="#solucion" className="text-xs transition-colors hover:text-white" style={{ color: THEME.muted }}>Diagnóstico</a>
                <a href="#como-funciona" className="text-xs transition-colors hover:text-white" style={{ color: THEME.muted }}>Metodología</a>
                <a href="#cta" className="text-xs transition-colors hover:text-white" style={{ color: THEME.muted }}>Client Login</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-bold uppercase tracking-wider mb-2 text-[10px]" style={{ color: THEME.text }}>Legal</span>
                <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: THEME.muted }}>Privacidad</a>
                <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: THEME.muted }}>Términos</a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t" style={{ borderColor: THEME.border }}>
            <div className="text-[11px]" style={{ color: THEME.muted }}>
              © {new Date().getFullYear()} Sin Rodeos Intelligence. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}