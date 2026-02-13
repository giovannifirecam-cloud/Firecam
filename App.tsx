import React, { useEffect, useRef } from 'react';

// Effects
import { 
  FlashlightGrid,
  SparkleTrail
} from './components/effects';

// UI Components
import { 
  PrecisionCursor, 
  WhatsAppButton, 
  ScrollProgress 
} from './components/ui';

// Layout
import { 
  Navbar, 
  Footer 
} from './components/layout';

// Sections
import { 
  Hero, 
  LogoMarquee, 
  NarrativeTransition, 
  Institutional, 
  ImpactMetrics, 
  ValuePropositions, 
  Testimonial, 
  FooterCTA
} from './components/sections';

const App: React.FC = () => {
  // Performance Optimization: Use Refs for high-frequency mouse updates
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;

        if (blob1Ref.current) {
          blob1Ref.current.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
        }
        if (blob2Ref.current) {
          blob2Ref.current.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        }
        
        rafRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 selection:bg-fire-600 selection:text-white relative font-sans">
      <PrecisionCursor />
      <SparkleTrail />
      <ScrollProgress />
      
      {/* 1. ATMOSPHERE LAYER */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          ref={blob1Ref}
          className="absolute top-[-20%] left-[10%] w-[40%] h-[70%] bg-gradient-to-br from-indigo-50/50 via-zinc-100/30 to-transparent blur-[120px] opacity-30 animate-pulse-slow transition-transform duration-100 ease-out" 
        />
        <div 
          ref={blob2Ref}
          className="absolute top-[-10%] right-[5%] w-[50%] h-[80%] bg-gradient-to-bl from-orange-50/40 via-white to-transparent blur-[100px] opacity-25 transition-transform duration-100 ease-out" 
        />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-200/20 to-transparent transform -skew-x-12" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-zinc-200/20 to-transparent transform -skew-x-12" />
      </div>

      {/* 2. TEXTURE LAYER */}
      <FlashlightGrid />

      {/* 3. CONTENT LAYER */}
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <LogoMarquee />
        <NarrativeTransition />
        <Institutional />
        <ValuePropositions />
        <ImpactMetrics />
        <Testimonial />
        <FooterCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;