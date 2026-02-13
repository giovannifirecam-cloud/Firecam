import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { SERVICES } from '../../data/constants';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40); 
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const scrollToContact = () => {
    setMobileMenuOpen(false);
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Dynamic Colors based on State
  const textColor = 'text-zinc-200 hover:text-white';
  const logoFilter = 'none';

  // Shared glass classes for consistency
  const dropdownClasses = "bg-zinc-950/60 backdrop-blur-3xl rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5 p-2 min-w-[260px] flex flex-col gap-1 overflow-hidden";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6 lg:py-8'}`}>
        
        {/* Background Layer - Hidden when mobile menu is open to avoid visual conflict */}
        <div className={`absolute inset-0 w-full h-full -z-10 transition-all duration-500 ${
          scrolled && !mobileMenuOpen
            ? 'bg-zinc-950/70 backdrop-blur-2xl border-b border-white/5 shadow-lg opacity-100' 
            : 'opacity-0 bg-transparent'
        }`} />

        <div className="container max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center relative z-20">
          {/* Logo Section - Image Only */}
          <div className="flex items-center gap-3 group cursor-pointer relative z-50" onClick={scrollToTop}>
            <img 
               src="https://drive.google.com/thumbnail?id=1Bq_ih0qQuyX3em5-k4y3vG_7xr48HjZU&sz=w1000" 
               alt="Firecam - Instalação e Manutenção em Joinville" 
               className="h-16 md:h-20 w-auto object-contain transition-all duration-500 group-hover:scale-105"
               style={{ filter: logoFilter }}
            />
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
             <button onClick={scrollToTop} className={`text-sm font-bold transition-colors ${textColor}`}>
               Início
             </button>
             
             <button onClick={() => scrollToSection('institutional')} className={`text-sm font-bold transition-colors ${textColor}`}>
               A Firecam
             </button>

             {/* Dropdown: Solutions */}
             <div className="relative group/solutions">
               <button onClick={scrollToContact} className={`flex items-center gap-1 text-sm font-bold transition-colors py-2 ${textColor}`}>
                 Soluções
                 <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/solutions:rotate-180" />
               </button>
               
               {/* Dropdown Menu */}
               <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover/solutions:opacity-100 group-hover/solutions:visible transition-all duration-300 transform group-hover/solutions:translate-y-0 translate-y-2">
                 <div className={dropdownClasses}>
                    {SERVICES.map((service) => (
                      <button 
                        key={service.id}
                        onClick={scrollToContact} 
                        className="w-full px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-left whitespace-nowrap"
                      >
                        {service.title}
                      </button>
                    ))}
                 </div>
               </div>
             </div>

             {/* Dropdown: Cases */}
             <div className="relative group/cases">
               <button onClick={() => scrollToSection('cases')} className={`flex items-center gap-1 text-sm font-bold transition-colors py-2 ${textColor}`}>
                 Casos de Sucesso
                 <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/cases:rotate-180" />
               </button>
               
               {/* Dropdown Menu - Deep Glass Aesthetic */}
               <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover/cases:opacity-100 group-hover/cases:visible transition-all duration-300 transform group-hover/cases:translate-y-0 translate-y-2">
                 <div className={dropdownClasses}>
                    <button onClick={() => scrollToSection('cases')} className="w-full px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-left">
                      Indústrias & Metalúrgicas
                    </button>
                    <button onClick={() => scrollToSection('cases')} className="w-full px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-left">
                      Condomínios Logísticos
                    </button>
                    <button onClick={() => scrollToSection('cases')} className="w-full px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-left">
                      Redes Corporativas
                    </button>
                 </div>
               </div>
             </div>
          </div>

          <div className="hidden lg:block">
            {/* Using the new 'brand' variant */}
            <Button 
                variant="brand" 
                className="py-2 px-5 text-xs tracking-wide" 
                onClick={scrollToContact}
            >
              Quero Saber Mais
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 relative z-50 text-white transition-transform active:scale-95" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} className="text-zinc-200" /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Deep Glass Theme */}
      <div 
        className={`fixed inset-0 bg-zinc-950/95 backdrop-blur-3xl z-40 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          mobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
        }`}
      >
         {/* Scrollable Container with Top Padding to avoid overlap with fixed Header */}
         <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full flex flex-col items-center justify-start pt-32 pb-12 px-6 gap-8">
                
                <button onClick={scrollToTop} className="text-3xl font-black text-white hover:text-fire-600 transition-colors">Início</button>
                <button onClick={() => scrollToSection('institutional')} className="text-3xl font-black text-white hover:text-fire-600 transition-colors">A Firecam</button>
                <button onClick={scrollToContact} className="text-3xl font-black text-white hover:text-fire-600 transition-colors">Soluções</button>
                
                <div className="w-16 h-px bg-zinc-800" />

                <button onClick={() => scrollToSection('cases')} className="text-3xl font-black text-white hover:text-fire-600 transition-colors text-center">Casos de Sucesso</button>
                
                <div className="mt-6 w-full max-w-xs">
                    <Button variant="brand" className="w-full py-4 text-base shadow-2xl shadow-fire-900/20" onClick={scrollToContact}>
                       Quero Saber Mais
                    </Button>
                </div>

                <div className="mt-auto pt-8 text-center text-zinc-600">
                    <p className="text-xs font-medium">Joinville e Região Norte SC</p>
                </div>
            </div>
         </div>
      </div>
    </>
  );
};

export default Navbar;