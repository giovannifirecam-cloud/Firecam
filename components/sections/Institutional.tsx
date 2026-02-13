import React, { useState } from 'react';
import { ShieldCheck, Search, FileCheck, AlertTriangle, CalendarCheck, ScanLine } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { HighlightWord } from '../ui';
import { INSTITUTIONAL_CONTENT } from '../../data/constants';

const STEP_ICONS = [Search, FileCheck, AlertTriangle, CalendarCheck];

const Institutional = () => {
  const [sectionRef, active] = useScrollReveal();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section id="institutional" ref={sectionRef} className={`py-10 lg:py-16 bg-transparent relative z-10 overflow-hidden reveal ${active ? 'active' : ''}`}>
      
      <div className="container max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* --- LEFT COLUMN: Diagnosis Hook --- */}
          <div className="lg:col-span-5 flex flex-col h-full lg:sticky lg:top-24 self-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-1 bg-fire-600" />
                <h2 className="text-[10px] font-black text-zinc-400 tracking-[0.3em] uppercase">DIAGNÓSTICO DE RISCO</h2>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-4xl font-black text-zinc-950 mb-6 leading-[0.95] tracking-tight">
                <div className="block mb-1">
                  <span className="text-zinc-950">Seu sistema</span>
                  <span className="text-zinc-400 font-light"> está</span>
                </div>
                <div className="block">
                  <HighlightWord text="Mudo?" revealDelay={0.5} sequence={2} finalColor="#ea580c" />
                </div>
              </h3>

              <div className="w-full h-px bg-zinc-200/60 my-6" />

              <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed mb-8">
                Equipamentos eletrônicos falham em silêncio. A luz verde no painel muitas vezes é uma mentira. Nosso diagnóstico revela a realidade oculta antes da emergência.
              </p>

              {/* Warning/Insurance Card with Scanner Effect */}
              <div className="bg-zinc-950 border border-zinc-800 p-6 md:p-8 rounded-xl relative overflow-hidden group hover:border-fire-600 transition-colors duration-500 shadow-2xl">
                 
                 {/* Scanner Line Animation */}
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-fire-500 shadow-[0_0_15px_#f97316] opacity-0 group-hover:opacity-100 group-hover:animate-scan-vertical z-20"></div>
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                 
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fire-600 to-red-600 z-10"></div>
                 
                 <div className="flex items-start gap-5 relative z-10">
                    <div className="relative">
                        <ShieldCheck className="text-fire-600 shrink-0 mt-1 transition-transform duration-500 group-hover:scale-110" size={28} strokeWidth={1.5} />
                        <ScanLine className="absolute inset-0 text-white opacity-0 group-hover:opacity-50 group-hover:scale-150 transition-all duration-700 animate-pulse" size={28} />
                    </div>
                    <div>
                       <h4 className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest mb-3 transition-colors duration-300">Auditoria p/ Seguradoras</h4>
                       <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed group-hover:text-zinc-300 transition-colors">
                         "A falta de comprovação de manutenção preventiva pode acarretar na perda do direito à indenização do seguro."
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Inspection Steps --- */}
          <div className="lg:col-span-7 relative pt-6 lg:pt-0">
            <div className="flex flex-col gap-0">
               {INSTITUTIONAL_CONTENT.map((step, i) => {
                 const Icon = STEP_ICONS[i % STEP_ICONS.length];
                 const isLast = i === INSTITUTIONAL_CONTENT.length - 1;
                 
                 return (
                 <div 
                   key={i}
                   onMouseEnter={() => setHoveredStep(i)}
                   onMouseLeave={() => setHoveredStep(null)}
                   className={`relative flex gap-5 md:gap-6 transition-all duration-500 ${
                     hoveredStep !== null && hoveredStep !== i ? 'opacity-50 blur-[0.5px]' : 'opacity-100'
                   }`}
                 >
                    {/* TIMELINE COLUMN */}
                    <div className="flex flex-col items-center shrink-0 w-6 relative">
                        {/* Line */}
                        <div className={`w-px h-full bg-zinc-200 absolute top-0 left-1/2 -translate-x-1/2 ${isLast ? 'h-6' : ''}`} />
                        
                        {/* Dot */}
                        <div className={`w-2.5 h-2.5 rounded-full border-2 border-white relative z-10 mt-2.5 transition-all duration-300 ${
                           hoveredStep === i 
                             ? 'bg-fire-600 scale-125 shadow-[0_0_0_3px_rgba(234,88,12,0.15)]' 
                             : 'bg-zinc-300'
                        }`} />
                    </div>

                    {/* CONTENT COLUMN */}
                    <div className="flex-1 pb-8">
                        {/* Header: Title + Badge (Outside Card) */}
                        <div className={`flex flex-wrap items-center gap-3 mb-3 transition-transform duration-300 ${
                            hoveredStep === i ? 'translate-x-1' : ''
                        }`}>
                           <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border transition-colors ${
                              hoveredStep === i 
                                ? 'bg-fire-100 text-fire-600 border-fire-200' 
                                : 'bg-zinc-100 text-zinc-400 border-zinc-200'
                           }`}>
                              {step.code.split('.')[0]}
                           </span>
                           <h4 className={`text-lg md:text-xl font-black transition-colors ${
                              hoveredStep === i ? 'text-fire-600' : 'text-zinc-950'
                           }`}>
                              {step.title}
                           </h4>
                        </div>

                        {/* Body: Description Card */}
                        <div className={`group bg-white border p-5 md:p-6 rounded-xl transition-all duration-300 relative overflow-hidden ${
                           hoveredStep === i 
                             ? 'border-fire-600 shadow-lg translate-x-1' 
                             : 'border-zinc-100 hover:border-zinc-300 shadow-sm'
                        }`}>
                           <div className="flex gap-4 items-start">
                              <div className={`shrink-0 mt-0.5 transition-colors duration-300 ${
                                 hoveredStep === i ? 'text-fire-600' : 'text-zinc-300'
                              }`}>
                                 <Icon size={20} />
                              </div>
                              <p className="text-zinc-500 text-sm leading-relaxed font-light">
                                 {step.desc}
                              </p>
                           </div>
                        </div>
                    </div>
                 </div>
               );
             })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Institutional;