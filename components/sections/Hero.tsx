import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, HardHat, ChevronRight, ChevronLeft, 
  Flame, ShieldCheck, Eye, Network, CheckCircle2,
  Cable, Server, Tag, ClipboardCheck,
  DoorOpen, ScanFace, Lock, Users
} from 'lucide-react';
import { Button, HighlightWord } from '../ui';
import { HERO_SLIDES } from '../../data/constants';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Controller } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Icon Lookup for Dynamic Slide Data
const ICON_LOOKUP: Record<string, React.ElementType> = {
  flame: Flame,
  shield: ShieldCheck,
  network: Network,
  eye: Eye,
  check: CheckCircle2,
  cable: Cable,
  server: Server,
  tag: Tag,
  'clipboard-check': ClipboardCheck,
  'door-open': DoorOpen,
  'scan-face': ScanFace,
  lock: Lock,
  users: Users
};

// Default Fallback Icons
const TOPIC_ICONS = [Flame, ShieldCheck, Network, Eye, CheckCircle2];

const Hero = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, []);

  const scrollToContact = () => {
    const target = document.getElementById('contato');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  // Custom Navigation Handlers
  const handlePrev = () => {
    if (!swiperInstance) return;
    swiperInstance.slidePrev();
    resetAutoplay();
  };

  const handleNext = () => {
    if (!swiperInstance) return;
    swiperInstance.slideNext();
    resetAutoplay();
  };

  const resetAutoplay = () => {
    if (!swiperInstance) return;
    swiperInstance.autoplay.stop();
    
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }

    autoplayTimeoutRef.current = setTimeout(() => {
      if (swiperInstance && !swiperInstance.destroyed) {
        swiperInstance.autoplay.start();
      }
    }, 10000); // Resume after 10s interaction
  };

  return (
    <section className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-zinc-950 text-white group/hero">
      
      {/* --- LAYER 0: CINEMATIC SLIDER (Background + Content) --- */}
      <div className="absolute inset-0 z-0">
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          effect={'fade'}
          fadeEffect={{ crossFade: true }}
          speed={1200} 
          loop={true}
          allowTouchMove={true}
          touchStartPreventDefault={false}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          modules={[EffectFade, Autoplay, Controller]}
          className="w-full h-full select-none cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {HERO_SLIDES.map((s) => (
            <SwiperSlide key={s.id} className="w-full h-full">
              {({ isActive }) => {
                const isVideo = !!s.videoUrl;
                const scaleClass = isActive ? 'scale-110' : 'scale-100';
                
                return (
                  <div 
                    className="relative w-full h-full overflow-hidden bg-zinc-950"
                    onMouseDown={(e) => e.preventDefault()} 
                  >
                    
                    {/* 1. BACKGROUND MEDIA */}
                    {isVideo ? (
                      <video
                        src={s.videoUrl}
                        poster={s.imageUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[15000ms] ease-linear ${scaleClass}`}
                        style={{ pointerEvents: 'none' }}
                      />
                    ) : (
                      <div 
                        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[15000ms] ease-linear ${scaleClass}`}
                        style={{ backgroundImage: `url(${s.imageUrl})` }}
                      />
                    )}

                    {/* 2. OVERLAYS */}
                    {isVideo ? (
                       <>
                         <div className="absolute inset-0 bg-black/40 md:bg-black/60" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent" />
                       </>
                    ) : (
                       <>
                         <div className="absolute inset-0 bg-zinc-950/30 md:bg-zinc-950/40" />
                         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/60 to-transparent md:bg-gradient-to-r md:from-zinc-950/90 md:via-zinc-950/50 md:to-transparent" />
                       </>
                    )}

                    {/* 3. CONTENT */}
                    <div className="absolute inset-0 z-20 container max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-36 md:justify-center md:pb-12 md:pt-20">
                        {isActive && (
                          <div 
                            className="w-full max-w-6xl flex flex-col items-start"
                          >
                            
                            {/* Badge */}
                            <div 
                              className="inline-flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6 hover:bg-white/10 transition-colors cursor-default shadow-lg opacity-0 animate-fade-in"
                              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
                            >
                              <HardHat size={14} className="text-fire-500" />
                              <span className="text-zinc-200 text-xs font-bold tracking-wide uppercase">
                                {s.badge}
                              </span>
                            </div>

                            {/* Headline - RESTORED TO HARMONIOUS STYLE */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-2xl">
                              
                              {/* Line 1 */}
                              <div className="block mb-1">
                                  <HighlightWord 
                                    text={s.headline.p1} 
                                    revealDelay={0.6} 
                                    sequence={1} 
                                    initialColor="#ffffff" 
                                    finalColor="#ea580c"
                                    className="align-baseline" 
                                  />
                                  
                                  {s.headline.p1Suffix && (
                                    <>
                                      {' '}
                                      <span className="inline-block align-baseline opacity-0 animate-word-reveal text-white" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                                        {s.headline.p1Suffix}
                                      </span>
                                    </>
                                  )}
                              </div>
                              
                              {/* Line 2 */}
                              <div className="block">
                                  {s.headline.connector && (
                                    <>
                                      <span className="inline-block align-baseline opacity-0 animate-word-reveal text-white" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                                        {s.headline.connector}
                                      </span>
                                      {' '}
                                    </>
                                  )}
                                  <HighlightWord 
                                    text={s.headline.p2} 
                                    revealDelay={0.9} 
                                    sequence={2} 
                                    initialColor="#ffffff" 
                                    finalColor="#ea580c" 
                                    className="align-baseline"
                                  />
                              </div>

                              {/* Line 3 (Optional) */}
                              {s.headline.suffix && (
                                <div className="block mt-1">
                                    <span className="inline-block align-baseline opacity-0 animate-word-reveal text-white" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
                                      {s.headline.suffix}
                                    </span>
                                </div>
                              )}
                            </h1>

                            {/* Subheadline & Topics */}
                            <div className="flex flex-col gap-8 animate-slide-up opacity-0 w-full" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
                              
                              <p className="text-zinc-200 text-sm md:text-lg font-normal leading-relaxed max-w-2xl md:pl-1 whitespace-pre-line drop-shadow-md pr-4 md:pr-0">
                                  {s.subheadline.split('*').map((part, index) => (
                                    index % 2 === 1 ? <span key={index} className="text-white font-bold">{part}</span> : part
                                  ))}
                              </p>

                              <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-xl">
                                  {s.topics.map((topic, i) => {
                                    const iconKey = s.topicIcons?.[i];
                                    const Icon = (iconKey && ICON_LOOKUP[iconKey]) 
                                      ? ICON_LOOKUP[iconKey] 
                                      : TOPIC_ICONS[i % TOPIC_ICONS.length];

                                    return (
                                      <div 
                                        key={i} 
                                        className="group flex items-center gap-2 px-3 py-2 md:px-4 backdrop-blur-sm border rounded-lg transition-all duration-500 cursor-default bg-zinc-900/40 border-white/5 hover:bg-zinc-900/60 hover:border-fire-500/30"
                                      >
                                        <Icon 
                                          size={16} 
                                          className="shrink-0 transition-colors duration-500 text-zinc-400 group-hover:text-fire-500" 
                                        />
                                        <span className="text-xs md:text-sm font-medium tracking-tight transition-colors duration-500 text-zinc-300 group-hover:text-white leading-tight">
                                          {topic}
                                        </span>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>

                            {/* CTA Group */}
                            <div className="mt-8 md:mt-10 flex flex-row items-center gap-4 md:gap-8 animate-slide-up opacity-0" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
                              <Button 
                                  variant="brand" 
                                  onClick={scrollToContact} 
                                  className="w-auto px-6 py-3 text-sm font-bold tracking-wide shadow-lg shadow-fire-900/20 justify-center shrink-0"
                              >
                                {s.cta}
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>

                              <div className="h-8 w-px bg-zinc-700/50 shrink-0" />

                              <div className="flex flex-col gap-1 shrink-0">
                                  <span className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                                      <div className="w-1.5 h-1.5 bg-fire-500 rounded-full shadow-[0_0_8px_#f97316]" />
                                      Implantação
                                  </span>
                                  <span className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                                      <div className="w-1.5 h-1.5 bg-fire-500 rounded-full shadow-[0_0_8px_#f97316]" />
                                      Equipe Própria
                                  </span>
                              </div>
                            </div>

                          </div>
                        )}
                    </div>

                  </div>
                );
              }}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- LAYER 3: CONTROLS (Outside Swiper to stay static) --- */}
      <div className="absolute bottom-6 left-0 w-full z-30 pointer-events-none md:bottom-10">
         <div className="container max-w-7xl mx-auto px-6 lg:px-12 flex justify-start">
            <div className="pointer-events-auto flex items-center gap-4 md:gap-5 px-4 py-2 bg-zinc-950/60 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
               
               <div className="flex flex-col items-end">
                   <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-fire-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest tabular-nums">
                        0{activeIndex + 1} / 0{HERO_SLIDES.length}
                      </span>
                   </div>
               </div>

               <div className="hidden md:block w-px h-4 bg-white/10" />

               <div className="hidden md:flex items-center gap-2">
                  <button 
                    onClick={handlePrev}
                    aria-label="Anterior"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:bg-white hover:text-zinc-950 hover:border-white transition-all duration-300 active:scale-95"
                  >
                     <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={handleNext}
                    aria-label="Próximo"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:bg-fire-600 hover:text-white hover:border-fire-600 transition-all duration-300 active:scale-95"
                  >
                     <ChevronRight size={16} />
                  </button>
               </div>
               
               <span className="md:hidden text-[9px] text-zinc-500 uppercase font-bold tracking-widest ml-2">
                 Deslize
               </span>
            </div>
         </div>
      </div>

    </section>
  );
};

export default Hero;