import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { BackgroundSparks } from '../effects';
import { NARRATIVE_CONTENT } from '../../data/constants';
import { BadgeCheck, Scale } from 'lucide-react';

const NarrativeTransition = () => {
  const [sectionRef, active] = useScrollReveal();

  return (
    <section 
      ref={sectionRef} 
      className={`py-10 md:py-16 relative z-10 bg-transparent overflow-hidden reveal ${active ? 'active' : ''}`}
    >
      <div className="container max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col gap-8 md:gap-12">
          
          {/* 1. QUOTE SECTION */}
          <div className="relative flex justify-center">
            <h2 className="text-lg md:text-2xl font-medium text-zinc-500 leading-relaxed text-center px-4 max-w-3xl">
              {NARRATIVE_CONTENT.quote}
            </h2>
          </div>

          {/* 2. THE AUTHORITY BOX */}
          <div className="bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 relative group transition-transform duration-700 hover:scale-[1.005]">
            
            {/* Contained Sparks Effect */}
            <BackgroundSparks density={20} />
            
            <div className="relative z-10 p-8 md:p-10 grid md:grid-cols-12 gap-8 md:gap-10 items-center">
               
               {/* Left: The Insight */}
               <div className="md:col-span-5 relative">
                   {/* Authority Badge */}
                   <div className="mb-4 flex items-center gap-2 text-zinc-400">
                     <BadgeCheck className="text-fire-600" size={20} />
                     <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Fornecedor Homologado</span>
                   </div>

                   <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[0.9] tracking-tight">
                     {NARRATIVE_CONTENT.highlight.prefix} <br />
                     <span className="text-fire-600">{NARRATIVE_CONTENT.highlight.accent}</span>
                   </p>
               </div>

               {/* Vertical Separator (Desktop) */}
               <div className="hidden md:block md:col-span-1 h-16 border-l border-zinc-800 mx-auto opacity-50" />

               {/* Right: The Explanation */}
               <div className="md:col-span-6">
                  {NARRATIVE_CONTENT.description.map((paragraph, i) => (
                    <div key={i} className={`flex gap-4 ${i > 0 ? 'mt-4' : ''}`}>
                       <div className="shrink-0 mt-1">
                          {i === 0 ? (
                            <Scale size={18} className="text-zinc-600" />
                          ) : (
                            <div className="w-1.5 h-1.5 mt-2 rounded-full bg-fire-600" />
                          )}
                       </div>
                       <p className={`text-sm md:text-base leading-relaxed ${i === 0 ? 'text-zinc-400 font-light' : 'text-white font-medium'}`}>
                         {paragraph}
                       </p>
                    </div>
                  ))}
               </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NarrativeTransition;