import React, { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { TrendingUp, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { HighlightWord } from '../ui';
import { BackgroundSparks } from '../effects';
import { METRICS } from '../../data/constants';

const ICON_MAP = {
  check: CheckCircle,
  alert: AlertTriangle,
  eye: Eye,
  trend: TrendingUp
};

interface MetricCounterProps {
  end: number;
  label: string;
  suffix?: string;
  iconKey: keyof typeof ICON_MAP;
  trigger: number;
}

const MetricCounter: React.FC<MetricCounterProps> = ({ end, label, suffix = "", iconKey, trigger }) => {
  const [count, setCount] = useState(0);
  const [ref, active] = useScrollReveal();
  const frameRef = useRef<number>(0);
  
  const Icon = ICON_MAP[iconKey];

  useEffect(() => {
    if (active) {
      const duration = 2000; // ms
      const startTime = performance.now();
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentCount = Math.floor(easeOutQuart(progress) * end);
        setCount(currentCount);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
      return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
    }
  }, [active, end, trigger]);

  return (
    <div ref={ref} className="relative group p-6 md:p-8 border-l border-zinc-800 bg-transparent hover:bg-[#000000] transition-colors duration-300">
      {/* Top Border Highlight on Hover */}
      <div className="absolute top-0 left-0 w-0 h-0.5 bg-fire-600 group-hover:w-full transition-all duration-700 ease-out" />
      
      <div className="flex items-center justify-between mb-4">
        <Icon className="text-zinc-600 group-hover:text-fire-600 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3" size={24} strokeWidth={1.5} />
        <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full group-hover:bg-fire-600 transition-colors" />
      </div>

      <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 tabular-nums tracking-tight">
        {Math.floor(count).toLocaleString()}{suffix}
      </div>
      <p className="text-zinc-500 text-[10px] md:text-[11px] font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
};

const ImpactMetrics = () => {
  const [loopTrigger, setLoopTrigger] = useState(0);
  const [sectionRef, active] = useScrollReveal();
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => setLoopTrigger(prev => prev + 1), 8000);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section 
      ref={sectionRef} 
      className={`bg-zinc-950 py-10 md:py-16 relative z-10 border-y border-zinc-900 overflow-hidden reveal ${active ? 'active' : ''}`}
    >
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      <BackgroundSparks density={50} />
      
      <div className="container max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-12 gap-6">
           <div>
             <h3 className="text-2xl md:text-3xl text-white font-bold max-w-xl leading-tight">
               Não entregamos apenas implantação. <br />
               <span className="mt-1 inline-block">
                 <HighlightWord 
                    text="Garantimos continuidade." 
                    revealDelay={0.2} 
                    sequence={1} 
                    finalColor="#ea580c" 
                    initialColor="#ffffff" 
                 />
               </span>
             </h3>
           </div>
           
           <div className="text-right hidden md:block">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                  Monitoramento Ativo
                </span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-r border-zinc-800">
           {METRICS.map((metric, i) => (
             <MetricCounter 
               key={i}
               end={metric.end} 
               suffix={metric.suffix} 
               label={metric.label} 
               iconKey={metric.iconKey as keyof typeof ICON_MAP}
               trigger={loopTrigger}
             />
           ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;