import React, { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { VALUE_PROPS } from '../../data/constants';

interface ValueCardProps {
  prop: typeof VALUE_PROPS[0];
}

const ValueCard: React.FC<ValueCardProps> = ({ prop }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !glowRef.current) return;
    
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glowRef.current.style.opacity = '1';
    glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(234, 88, 12, 0.05), transparent 40%)`;
  };

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-6 md:p-8 rounded-2xl bg-white border border-zinc-100 overflow-hidden card-interactive shadow-sm hover:shadow-angled transition-all duration-300"
    >
      {/* Subtle Proximity Gradient - Controlled via Ref */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 blur-3xl"
      />
      
      <div className="relative z-10">
        <h4 className="text-[9px] font-black text-fire-600 tracking-[0.3em] uppercase mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
          {prop.title}
        </h4>
        <h3 className="text-xl md:text-2xl font-black text-zinc-950 mb-4 group-hover:text-fire-600 transition-colors tracking-tighter leading-[0.95]">
          {prop.headline}
        </h3>
        <p className="text-zinc-500 text-base font-light mb-6 leading-relaxed">
          {prop.description.join(" ")}
        </p>
        <div className="pl-4 border-l-2 border-zinc-100 group-hover:border-fire-600 transition-all duration-500">
          <p className="text-zinc-400 text-xs font-bold italic leading-relaxed group-hover:text-zinc-500">
            "{prop.highlight}"
          </p>
        </div>
      </div>
    </div>
  );
};

const ValuePropositions = () => {
  const [sectionRef, active] = useScrollReveal();

  return (
    <section ref={sectionRef} className="py-10 lg:py-16 bg-zinc-50/30 relative z-10 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`grid md:grid-cols-2 gap-6 reveal-stagger ${active ? 'active' : ''}`}>
          {VALUE_PROPS.map((prop, idx) => (
            <ValueCard key={idx} prop={prop} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;