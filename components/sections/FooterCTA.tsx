import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, AlertCircle, HardHat } from 'lucide-react';
import { Button } from '../ui';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { BackgroundSparks } from '../effects';
import { CTA_FORM_STEPS } from '../../data/constants';

const FooterCTA = () => {
  const [method, setMethod] = useState<'none' | 'active'>('none');
  const [sectionRef, active] = useScrollReveal();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '', company: '', problem: '' });
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (method === 'active' && inputRef.current) setTimeout(() => inputRef.current?.focus(), 300);
  }, [currentStep, method]);

  const formatPhone = (val: string) => {
    val = val.replace(/\D/g, '').substring(0, 11);
    if (val.length > 2) val = val.replace(/^(\d{2})(\d)/g, '($1) $2');
    if (val.length > 7) val = val.replace(/(\d)(\d{4})$/, '$1-$2');
    return val;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null); 
    setFormData(prev => ({ ...prev, [name]: name === 'phone' ? formatPhone(value) : value }));
  };

  const steps = CTA_FORM_STEPS.map(step => ({
    ...step,
    validate: (val: string) => {
        if (step.key === 'phone') return val.replace(/\D/g, '').length >= 10 || step.errorMessage;
        return val.trim().length >= (step.key === 'company' ? 2 : 3) || step.errorMessage;
    }
  }));

  const handleNext = () => {
    const config = steps[currentStep];
    const val = formData[config.key as keyof typeof formData];
    const validation = config.validate(val);
    if (validation === true) {
      if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
      else { console.log("Form Submitted:", formData); setCurrentStep(prev => prev + 1); }
    } else setError(validation as string);
  };

  const handlePrev = () => { if (currentStep > 0) { setCurrentStep(prev => prev - 1); setError(null); } };
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); handleNext(); } };

  const isCompleted = currentStep === steps.length;
  const currentStepData = !isCompleted ? steps[currentStep] : null;

  return (
    <section id="contato" ref={sectionRef} className={`py-10 lg:py-16 relative z-10 reveal ${active ? 'active' : ''}`}>
      <div className="container max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="w-full max-w-5xl mx-auto bg-zinc-950 rounded-[2rem] shadow-2xl border border-zinc-800 overflow-hidden relative">
          <BackgroundSparks density={30} />

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            {method === 'none' ? (
              <div className="flex flex-col items-center text-center animate-fade-in">
                 <div className="mb-8 p-4 bg-zinc-900 rounded-2xl text-zinc-500 ring-1 ring-zinc-800/50 shadow-inner">
                    <HardHat size={36} strokeWidth={1.5} />
                 </div>

                 <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-[1.05] max-w-3xl">
                    Precisa de um orçamento ou visita técnica?
                 </h2>
                 
                 <p className="text-zinc-400 text-base md:text-lg font-normal mb-10 max-w-2xl mx-auto leading-relaxed">
                    Conversa técnica, sem compromisso. Avaliamos sua estrutura e entregamos um diagnóstico do que precisa ser feito.
                 </p>

                 <div className="mb-10 w-full flex justify-center">
                    <Button 
                        onClick={() => setMethod('active')} 
                        variant="brand"
                        className="w-full md:w-auto px-8 py-3.5 text-base font-bold shadow-lg shadow-fire-900/20 uppercase tracking-wide"
                    >
                        Quero Saber Mais
                        <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                 </div>

                 <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Sem Custo</span>
                    <span className="hidden md:block w-px h-4 bg-zinc-800"></span>
                    <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Retorno em 24h</span>
                 </div>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-fade-in w-full">
                  {!isCompleted ? (
                    <div className="w-full max-w-xl mx-auto">
                        <div className="flex justify-between items-center mb-8 pb-6 border-b border-zinc-800">
                          {currentStep > 0 ? (
                            <button onClick={handlePrev} className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
                              <ChevronLeft size={14} /> Voltar
                            </button>
                          ) : (
                            <div className="flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-fire-600 animate-pulse shadow-[0_0_8px_#ea580c]" />
                               <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Contato Técnico</span>
                            </div>
                          )}
                          <span className="text-xs font-mono font-bold text-zinc-700">0{currentStep + 1}/0{steps.length}</span>
                        </div>

                        <div className="min-h-[180px] flex flex-col justify-center">
                            <label className="block text-2xl md:text-3xl font-black text-white mb-8 animate-slide-up leading-tight tracking-tight">
                              {currentStepData?.label}
                            </label>

                            <div className="relative group">
                              <input 
                                ref={inputRef}
                                name={currentStepData?.key}
                                type={currentStepData?.type} 
                                value={formData[currentStepData?.key as keyof typeof formData]}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                placeholder={currentStepData?.placeholder}
                                autoComplete="off"
                                className="w-full bg-transparent border-b border-zinc-700 py-3 text-xl md:text-2xl font-medium text-white focus:border-fire-600 focus:outline-none transition-all placeholder:text-zinc-700 focus:placeholder:text-zinc-600" 
                              />
                              <div className="absolute right-0 bottom-5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 hidden md:flex items-center gap-3 pointer-events-none">
                                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Enter</span>
                                  <div className="w-6 h-6 border border-zinc-600 rounded text-[9px] flex items-center justify-center text-zinc-400 bg-zinc-800">↵</div>
                              </div>
                            </div>
                            <div className="h-6 mt-4">{error && <span className="flex items-center gap-2 text-red-500 text-xs font-bold animate-fade-in"><AlertCircle size={12} /> {error}</span>}</div>
                        </div>

                        <div className="mt-8 flex justify-between items-center pt-6">
                            <button onClick={() => setMethod('none')} className="text-xs font-bold text-zinc-600 hover:text-red-500 uppercase tracking-widest transition-colors">Cancelar</button>
                            <Button onClick={handleNext} className="px-6 py-3 bg-white text-zinc-950 hover:bg-zinc-200 rounded-lg shadow-lg text-xs font-bold">
                              {currentStep === steps.length - 1 ? 'Enviar' : 'Continuar'} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-lg mx-auto text-center animate-slide-up py-10">
                      <div className="w-20 h-20 bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(34,197,94,0.2)] ring-1 ring-green-500/30">
                        <CheckCircle2 size={40} strokeWidth={2} />
                      </div>
                      <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Recebemos sua solicitação.</h3>
                      <p className="text-zinc-400 text-base font-normal mb-10 leading-relaxed">
                        Obrigado, <strong className="text-white font-medium">{formData.name.split(' ')[0]}</strong>. Nossa equipe técnica entrará em contato em breve para agendar o diagnóstico.
                      </p>
                      <Button onClick={() => setMethod('none')} variant="outline" className="px-8 py-3 text-xs border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-800">
                        Voltar ao Início
                      </Button>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;