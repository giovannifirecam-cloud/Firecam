import React from 'react';
import { CLIENT_LOGOS } from '../../data/constants';

const LogoItem = ({ logo }: { logo: typeof CLIENT_LOGOS[0] }) => (
  <div 
    className={`${logo.className || 'h-8 md:h-12'} w-auto min-w-[90px] md:min-w-[120px] opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 flex items-center justify-center transform perspective-500`}
  >
    <img 
      src={logo.url} 
      alt={logo.name} 
      className="h-full w-auto object-contain pointer-events-none"
      draggable={false}
      loading="lazy"
      onError={(e) => {
        const target = e.currentTarget;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent && !parent.querySelector('span')) {
           const span = document.createElement('span');
           span.textContent = logo.name;
           span.className = "text-lg font-black text-zinc-300 uppercase tracking-tighter whitespace-nowrap";
           parent.appendChild(span);
        }
      }}
    />
  </div>
);

const LogoMarquee = () => {
  // Triple the base list to ensure ample width for 4k screens
  const LOGO_SET = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div className="py-6 md:py-10 bg-white/80 backdrop-blur-md border-y border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative z-20 group select-none">
       
       {/* Fade Masks for smooth edges */}
       <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
       <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

       {/* 
         Moving Container 
       */}
       <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
          
          {/* Part 1 */}
          <div className="flex items-center space-x-12 md:space-x-24 px-6 md:px-12">
             {LOGO_SET.map((logo, i) => <LogoItem key={`s1-${i}`} logo={logo} />)}
          </div>

          {/* Part 2 (Duplicate for Loop) */}
          <div className="flex items-center space-x-12 md:space-x-24 px-6 md:px-12">
             {LOGO_SET.map((logo, i) => <LogoItem key={`s2-${i}`} logo={logo} />)}
          </div>

       </div>
    </div>
  );
};

export default LogoMarquee;