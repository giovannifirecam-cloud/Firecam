import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { TESTIMONIALS } from '../../data/constants';
import { GoogleLogo } from '../ui';

const Testimonial = () => {
  const [sectionRef, active] = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, isInView]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = 0; 
  };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) nextSlide(); else prevSlide(); 
    }
    touchStartX.current = 0; touchEndX.current = 0;
  };

  return (
    <section 
      id="cases"
      ref={sectionRef} 
      className={`py-10 lg:py-16 bg-transparent relative z-10 overflow-hidden reveal ${active ? 'active' : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-live="polite"
    >
      <div ref={containerRef} className="container max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-zinc-100 shadow-sm rounded-full px-4 py-1.5 mb-6 animate-fade-in cursor-default hover:shadow-md transition-shadow">
             <GoogleLogo />
             <div className="flex items-baseline gap-2 leading-none">
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Excelência</span>
                <span className="text-[11px] font-black text-zinc-800">4.9/5</span>
             </div>
             <div className="flex gap-0.5 ml-1">
               {[1,2,3,4,5].map(i => <Star key={i} size={8} className="fill-[#FBBC05] text-[#FBBC05]" />)}
             </div>
          </div>
          
          <div className="relative w-full max-w-5xl grid grid-cols-1 min-h-[120px] md:min-h-[150px]">
            {TESTIMONIALS.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={index}
                  className={`col-start-1 row-start-1 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                    isActive 
                      ? 'opacity-100 translate-y-0 scale-100 z-10' 
                      : 'opacity-0 translate-y-8 scale-95 z-0 pointer-events-none'
                  }`}
                  aria-hidden={!isActive}
                >
                  <h3 className={`text-xl md:text-3xl font-black text-zinc-950 mb-6 leading-tight tracking-tight max-w-4xl transition-transform duration-700 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    "{item.quote}"
                  </h3>
                  
                  <div className={`flex items-center gap-4 transition-all duration-700 delay-200 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <div className="text-left">
                      <div className="flex items-center gap-3">
                        <p className="text-zinc-950 font-bold text-sm md:text-base">{item.author}</p>
                        <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">Verificado</span>
                      </div>
                      <p className="text-zinc-500 text-xs font-medium mt-0.5">{item.role} • <span className="text-zinc-400">{item.location}</span></p>
                    </div>
                    <div className="w-px h-8 bg-zinc-300 mx-2" />
                    <div className="flex flex-col items-start justify-center">
                       <span className="text-[9px] text-zinc-400 font-medium">Google Review</span>
                       <span className="text-[9px] text-zinc-400 font-medium">{item.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-8 relative z-20">
            <button onClick={prevSlide} className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-all active:scale-90 group" aria-label="Previous">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1 transition-all duration-500 rounded-full cursor-pointer hover:scale-110 ${i === currentIndex ? 'w-8 bg-fire-600' : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={nextSlide} className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-all active:scale-90 group" aria-label="Next">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;