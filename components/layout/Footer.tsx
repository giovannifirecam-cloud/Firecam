import React from 'react';
import { Linkedin, Instagram, Mail, Phone } from 'lucide-react';
import { BackgroundSparks } from '../effects';
import { SERVICES, CONTACT_INFO } from '../../data/constants';

const Footer = () => {
  const scrollToContact = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-10 relative z-10 overflow-hidden">
      {/* Contained Sparks Effect for Footer */}
      <BackgroundSparks density={25} />

      <div className="container max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20 border-b border-zinc-800 pb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <img 
                 src="https://drive.google.com/thumbnail?id=1Bq_ih0qQuyX3em5-k4y3vG_7xr48HjZU&sz=w1000" 
                 alt="Firecam" 
                 className="h-20 w-auto object-contain"
               />
            </div>
            <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-xs">
              Instalação e Manutenção de Sistemas Críticos. Execução própria e documentada em Joinville e Norte SC.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-fire-600 hover:text-white transition-all text-zinc-400">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-fire-600 hover:text-white transition-all text-zinc-400">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Soluções</h4>
            <ul className="space-y-3 text-zinc-400 text-sm font-light">
               {SERVICES.map((s) => (
                 <li key={s.id}>
                    <button onClick={scrollToContact} className="hover:text-fire-500 transition-colors text-left">
                      {s.title}
                    </button>
                 </li>
               ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Contato</h4>
            <ul className="space-y-4 text-zinc-400 text-sm font-light">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-fire-600" />
                <span>{CONTACT_INFO.phone.display}<br/>{CONTACT_INFO.workingHours}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-fire-600" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">{CONTACT_INFO.email}</a>
              </li>
              <li className="pt-4">
                <span className="block text-white font-bold mb-1">Base Operacional</span>
                {CONTACT_INFO.address.full}
              </li>
            </ul>
          </div>

          {/* Legal / Institutional */}
          <div>
             <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Institucional</h4>
             <ul className="space-y-3 text-zinc-400 text-sm font-light">
               <li><a href="#institutional" className="hover:text-fire-500 transition-colors">Sobre a Firecam</a></li>
               <li><a href="#cases" className="hover:text-fire-500 transition-colors">Cases de Sucesso</a></li>
               <li><a href="#" className="hover:text-fire-500 transition-colors">Política de Privacidade</a></li>
               <li><a href="#" className="hover:text-fire-500 transition-colors">Termos de Serviço</a></li>
               <li><a href="#" className="hover:text-fire-500 transition-colors">Trabalhe Conosco</a></li>
             </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-600 font-medium">
          <div>
            &copy; {new Date().getFullYear()} FIRECAM TECNOLOGIA E INFRAESTRUTURA LTDA. Todos os direitos reservados.
          </div>
          <div className="flex gap-8">
             <span>CNPJ: 00.000.000/0001-00</span>
             <span>Responsabilidade Técnica: CREA-SC 000000-0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;