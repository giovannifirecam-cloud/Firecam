/*
  FIRECAM VANILLA JS
  Core logic for slider, mouse effects, scroll reveal, and forms
*/

// --- 1. DATA CONSTANTS (Imported from data.js) ---
import { HERO_SLIDES, CLIENT_LOGOS, INSTITUTIONAL_CONTENT, VALUE_PROPS, TESTIMONIALS, METRICS } from './data.js';

// --- 2. INITIALIZATION ---

const PARTICLE_CONFIG = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 1800
      }
    },
    "color": {
      "value": ["#fd7907", "#ff4500", "#e25200", "#ffa500"]
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.9,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 3,
        "opacity_min": 0.05,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 6,
        "size_min": 0.2,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "top",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": false },
      "onclick": { "enable": false },
      "resize": true
    }
  },
  "retina_detect": true
};

function safeInitAll() {
  const components = [
    { fn: () => { if (typeof lucide !== 'undefined') lucide.createIcons(); }, name: 'Lucide Icons' },
    { fn: initNavbar, name: 'Navbar' },
    { fn: initHero, name: 'Hero' },
    { fn: initLogos, name: 'Logos' },
    { fn: initNarrative, name: 'Narrative' },
    { fn: initInstitutional, name: 'Institutional' },
    { fn: initValueProps, name: 'ValueProps' },
    { fn: initMetrics, name: 'Metrics' },
    { fn: initTestimonials, name: 'Testimonials' },
    { fn: initCTA, name: 'CTA' },
    { fn: initCustomCursor, name: 'CustomCursor' },
    { fn: initParticles, name: 'Particles' },
    { fn: initScrollAnimations, name: 'ScrollAnimations' },
    { fn: initSparkCursor, name: 'SparkCursor' },
    { fn: initScrollSpy, name: 'ScrollSpy' }
  ];

  components.forEach(comp => {
    try {
      if (typeof comp.fn === 'function') {
        comp.fn();
      }
    } catch (e) {
      console.warn(`[Firecam] Init failed for ${comp.name}:`, e.message);
    }
  });

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', safeInitAll);
} else {
  safeInitAll();
}

// --- 3. COMPONENTS ---

function initNavbar() {
  const nav = document.getElementById('navbar');
  const navBg = document.getElementById('navbar-bg');
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const trigger = document.getElementById('navbar-trigger');

  if (!nav || !navBg || !toggle || !menu || !trigger) return;

  let lastScrollY = window.scrollY;
  let isHidden = false;

  const updateNavbarState = () => {
    const isScrolled = window.scrollY > 100; // Trigger visual change after hero

    // Auto-hide logic with threshold to prevent jitter
    if (isScrolled && window.scrollY > lastScrollY + 5 && !menu.classList.contains('opacity-100')) {
      // Scrolling down & menu closed -> Hide
      if (!isHidden) {
        nav.classList.add('nav-hidden');
        trigger.classList.remove('hidden');
        // Small delay to allow nav to slide up before showing trigger animation
        setTimeout(() => trigger.classList.add('nav-trigger-active'), 100);
        isHidden = true;
      }
    } else if (window.scrollY < lastScrollY - 5 || window.scrollY < 10) {
      // Show on scroll-up or at the very top
      if (isHidden) {
        nav.classList.remove('nav-hidden');
        trigger.classList.remove('nav-trigger-active');
        setTimeout(() => trigger.classList.add('hidden'), 300);
        isHidden = false;
      }
    }

    lastScrollY = window.scrollY;

    // Visual style (background)
    nav.classList.toggle('py-4', isScrolled);
    nav.classList.toggle('py-5', !isScrolled);

    if (isScrolled) {
      navBg.style.opacity = '1';
      navBg.classList.add('bg-zinc-950/90', 'backdrop-blur-md', 'border-b', 'border-white/5');
      navBg.classList.remove('bg-transparent');
    } else {
      navBg.style.opacity = '0';
      navBg.classList.remove('bg-zinc-950/90', 'backdrop-blur-md', 'border-b', 'border-white/5');
      navBg.classList.add('bg-transparent');
    }
  };

  window.addEventListener('scroll', updateNavbarState);

  // Close dropdowns on scroll
  window.addEventListener('scroll', () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const openDropdowns = document.querySelectorAll('.group\\/solutions, .group\\/cases');
    openDropdowns.forEach(dropdown => {
      dropdown.style.pointerEvents = 'none';
      clearTimeout(dropdown.scrollTimeout);
      dropdown.scrollTimeout = setTimeout(() => {
        dropdown.style.pointerEvents = '';
      }, 150);
    });
  });

  // Hover Reveal Logic (Kept for trigger hover)
  const revealNavbar = () => {
    if (isHidden) {
      nav.classList.remove('nav-hidden');
      trigger.classList.remove('nav-trigger-active');
      isHidden = false;
    }
  };

  trigger.addEventListener('mouseenter', revealNavbar);
  // REMOVED AUTO-HIDE ON MOUSELEAVE TO IMPROVE STABILITY OF "SCROLL TO SHOW" BEHAVIOR


  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('opacity-100');
    menu.classList.toggle('opacity-100', !isOpen);
    menu.classList.toggle('visible', !isOpen);
    menu.classList.toggle('translate-y-0', !isOpen);
    menu.classList.toggle('opacity-0', isOpen);
    menu.classList.toggle('invisible', isOpen);
    menu.classList.toggle('-translate-y-4', isOpen);
    menu.classList.toggle('pointer-events-none', isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', !isOpen ? 'Fechar menu' : 'Abrir menu');
    toggle.innerHTML = !isOpen ? '<i data-lucide="x" size="28"></i>' : '<i data-lucide="menu" size="28"></i>';
    lucide.createIcons();
  });

  // Escape key closes mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('opacity-100')) {
      menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
      menu.classList.add('opacity-0', 'invisible', '-translate-y-4', 'pointer-events-none');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      toggle.innerHTML = '<i data-lucide="menu" size="28"></i>';
      lucide.createIcons();
      toggle.focus();
    }
  });

  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      // Close mobile menu
      menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
      menu.classList.add('opacity-0', 'invisible', '-translate-y-4');
      menu.classList.add('pointer-events-none');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      toggle.innerHTML = '<i data-lucide="menu" size="28"></i>';
      lucide.createIcons();

      // Smooth scroll to target section
      const targetId = link.getAttribute('data-target');
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }, 300); // Wait for menu close animation
        }
      }
    });
  });
}

function initHero() {
  const wrapper = document.querySelector('.hero-swiper .swiper-wrapper');
  if (!wrapper || typeof HERO_SLIDES === 'undefined') return;

  wrapper.innerHTML = HERO_SLIDES.map(s => `
    <div class="swiper-slide relative w-full h-full overflow-hidden bg-zinc-950">
      ${s.videoUrl ? `<video src="${s.videoUrl}" poster="${s.imageUrl}" autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover ken-burns" ${s.flipped ? 'style="transform: scaleX(-1);"' : ''}></video>` : `<img src="${s.imageUrl}" alt="${s.imageAlt || ''}" class="absolute inset-0 w-full h-full object-cover ken-burns" ${s.flipped ? 'style="transform: scaleX(-1);"' : ''} />`}
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      <!-- Film-grain noise texture — matches .noise-overlay used site-wide -->
      <div class="absolute inset-0 pointer-events-none hero-noise"></div>
      <div class="absolute inset-0 z-20 container max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center">
        <div class="hero-content opacity-0 translate-y-8 transition-all duration-1000">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/10">
            <i data-lucide="hard-hat" class="w-3.5 h-3.5 text-fire-500"></i>
            <span class="text-zinc-200 text-xs font-bold uppercase tracking-wide">${s.badge}</span>
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight mb-3 leading-tight">
            ${s.headline.p1}${s.headline.p1Suffix ? ' ' + s.headline.p1Suffix : ''} <br/>
            ${s.headline.connector ? s.headline.connector + ' ' : ''}<span class="text-fire-600">${s.headline.p2}</span>
          </h1>
          <p class="text-zinc-200 text-sm md:text-lg max-w-2xl mb-6 leading-relaxed">${s.subheadline.replace(/\n/g, '<br/>')}</p>
          
          <!-- Topics Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8 max-w-xl">
            ${s.topics.map((t, i) => `
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-fire-600/20 border border-fire-500/30 flex items-center justify-center shrink-0 card-hover-border">
                  <i data-lucide="${s.topicIcons[i]}" class="w-4 h-4 text-fire-500"></i>
                </div>
                <span class="text-zinc-300 text-sm font-medium">${t}</span>
              </div>
            `).join('')}
          </div>

          <div class="link-cta lg" onclick="document.getElementById('contato').scrollIntoView({behavior: 'smooth'})">
          <div class="premium-cta">
            <span class="premium-cta-text">Quero Saber Mais</span>
          </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();

  const swiperElement = document.querySelector('.hero-swiper');
  if (swiperElement) {
    const swiper = new Swiper('.hero-swiper', {
      effect: 'fade',
      loop: true,
      navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' },
      threshold: 5, // Small movement required to start (intentionality)
      touchRatio: 1.5, // Faster responsiveness
      longSwipesRatio: 0.1, // Drastically reducing "deadzone" - 10% movement triggers slide change
      on: {
        slideChange: function () {
          const indexEl = document.getElementById('hero-index');
          if (indexEl) indexEl.textContent = `0${this.realIndex + 1} / 0${HERO_SLIDES.length}`;
          document.querySelectorAll('.hero-content').forEach((c, i) => {
            const isActive = i === this.activeIndex;
            c.classList.toggle('opacity-100', isActive);
            c.classList.toggle('translate-y-0', isActive);
            c.classList.toggle('opacity-0', !isActive);
            c.classList.toggle('translate-y-8', !isActive);
          });
        }
      }
    });

    setTimeout(() => {
      const firstContent = document.querySelector('.swiper-slide-active .hero-content');
      if (firstContent) {
        firstContent.classList.remove('opacity-0', 'translate-y-8');
        firstContent.classList.add('opacity-100', 'translate-y-0');
      }
    }, 100);
  }
}

function initLogos() {
  const track = document.getElementById('marquee-track');
  if (!track || typeof CLIENT_LOGOS === 'undefined') return;

  // Emulate infinite width safely by duplicating the logo array
  const extendedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  const html = extendedLogos.map(l => `
    <div class="swiper-slide !w-auto flex items-center justify-center px-4 group/logo cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300">
      <img src="${l.url}" alt="${l.name}" 
           class="${l.className} max-w-[100px] md:max-w-[140px] grayscale brightness-200 contrast-0 transition-all duration-500 pointer-events-none" 
           onerror="this.style.display='none';" />
    </div>
  `).join('');

  track.innerHTML = html;

  if (typeof Swiper !== 'undefined') {
    new Swiper('.marquee-slider', {
      spaceBetween: 60,
      breakpoints: {
        768: {
          spaceBetween: 100
        }
      },
      speed: 8000,
      loop: true,
      slidesPerView: 'auto',
      allowTouchMove: true,
      grabCursor: true,
      freeMode: {
        enabled: true,
        momentum: false,
      },
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }
    });
  }
}

function initNarrative() {
  const quoteEl = document.getElementById('narrative-quote');
  const highlightEl = document.getElementById('narrative-highlight');
  const descEl = document.getElementById('narrative-desc');
  if (!quoteEl || !highlightEl || !descEl) return;

  const data = {
    quote: "A régua dos nossos clientes define a nossa qualidade.",
    highlight: "Homologados pela <span class=\"text-fire-600\">Indústria.</span>",
    desc: [
      "As marcas que você viu acima não contratam amadores. Para atuar dentro dessas plantas, a exigência é máxima: segurança do trabalho, documentação e capacidade técnica comprovada.",
      "Nós somos a força operacional validada por esses gigantes. Trazemos esse 'Padrão Industrial' de execução e acabamento para o seu projeto, independente do porte."
    ]
  };

  quoteEl.textContent = data.quote;
  highlightEl.innerHTML = data.highlight;
  descEl.innerHTML = data.desc.map(d => `<p class="text-sm md:text-base text-zinc-400 font-light leading-relaxed">${d}</p>`).join('');
}

function initInstitutional() {
  const stepsContainer = document.getElementById('institutional-steps');
  if (!stepsContainer || typeof INSTITUTIONAL_CONTENT === 'undefined') return;
  stepsContainer.innerHTML = INSTITUTIONAL_CONTENT.map((s, i) => `
    <div class="flex gap-4 group/step">
      <div class="flex flex-col items-center shrink-0 w-6">
        <div class="w-3 h-3 rounded-full border-2 border-zinc-800 bg-zinc-950 relative z-10 mt-3 group-hover/step:bg-fire-600 group-hover/step:border-fire-500 transition-colors shadow-[0_0_10px_rgba(234,88,12,0)] group-hover/step:shadow-[0_0_15px_rgba(234,88,12,0.4)]"></div>
      </div>
      <div class="flex-1 pb-10">
        <div class="glass-panel-dark p-6 md:p-8 rounded-[2rem] relative overflow-hidden noise-overlay transition-all premium-shadow">
          <div id="particles-inst-${i}" class="absolute inset-0 z-0 pointer-events-none opacity-40"></div>
          <div class="relative z-10 flex items-center gap-3 mb-4">
             <span class="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border border-white/5 bg-white/5 text-zinc-400 transition-colors">${s.code}</span>
             <h4 class="text-xl md:text-2xl font-bold text-white transition-colors tracking-tight">${s.title}</h4>
          </div>
          <p class="relative z-10 text-zinc-400 text-base font-light leading-relaxed">${s.desc}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function initValueProps() {
  const container = document.getElementById('value-props-container');
  if (!container || typeof VALUE_PROPS === 'undefined') return;
  container.innerHTML = VALUE_PROPS.map((p) => `
    <div class="group px-4 py-6 md:px-8 md:py-8 flex flex-col gap-2.5 cursor-default transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10 reveal border-b border-white/5 last:border-b-0 md:border-b-0">
      <p class="text-[9px] font-bold text-zinc-600 tracking-[0.35em] uppercase">${p.title}</p>
      <h3 class="text-xl font-bold text-white tracking-tighter leading-snug">${p.headline}</h3>
      <p class="text-zinc-400 text-sm font-light leading-relaxed">${p.desc}</p>
      <p class="text-zinc-400 text-xs mt-1 group-hover:text-zinc-200 transition-colors duration-500">"${p.highlight}"</p>
    </div>
  `).join('');
}

function initMetrics() {
  const container = document.getElementById('metrics-container');
  if (!container || typeof METRICS === 'undefined') return;
  container.innerHTML = METRICS.map((m) => `
    <div class="group px-4 py-6 md:px-8 md:py-8 cursor-default flex flex-col gap-1.5 reveal">
      <div class="flex items-baseline gap-1 leading-none">
        <span class="text-6xl md:text-8xl font-black text-white tracking-tighter counter"
          data-end="${m.end}" data-suffix="${m.suffix}">0</span>
        <span class="text-2xl md:text-4xl font-black text-zinc-600">${m.suffix}</span>
      </div>
      <p class="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-0.5">${m.label}</p>
    </div>
  `).join('');
  lucide.createIcons();
}

function initTestimonials() {
  const slider = document.getElementById('testimonial-slider');
  if (!slider || typeof TESTIMONIALS === 'undefined') return;

  const starsHtml = (count) => Array.from({ length: 5 }, (_, i) =>
    `<i data-lucide="star" class="w-3.5 h-3.5" style="color:${i < count ? '#FBBC05' : '#3f3f46'};fill:${i < count ? '#FBBC05' : '#3f3f46'};"></i>`
  ).join('');

  slider.innerHTML = TESTIMONIALS.map((t) => `
    <div class="swiper-slide py-4 px-2">
      <div class="relative mx-auto border border-white/8 rounded-2xl overflow-hidden bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10 cursor-default">
        <div class="relative z-10 p-8 md:p-12">

          <!-- Top row: stars + source -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-1.5">
              <div class="flex items-center gap-0.5">${starsHtml(t.stars || 5)}</div>
              <span class="text-zinc-500 text-xs font-medium ml-1">4.9</span>
            </div>
            <div class="flex items-center gap-1.5">
              <img src="https://www.google.com/favicon.ico" class="w-3 h-3 opacity-50" alt="" />
              <span class="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">Google Review</span>
            </div>
          </div>

          <!-- Quote -->
          <blockquote class="text-lg md:text-xl font-medium text-white leading-relaxed tracking-tight mb-8">
            "${t.quote}"
          </blockquote>

          <!-- Author row -->
          <div class="flex items-center justify-between pt-6 border-t border-white/5">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs text-zinc-400 bg-white/5 border border-white/8">
                ${t.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p class="text-white text-sm font-semibold">${t.author}</p>
                <p class="text-zinc-500 text-xs">${t.role} · ${t.location}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-1">Serviço</p>
              <span class="text-xs text-zinc-400 border border-white/8 px-3 py-1 rounded-full">
                ${t.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();

  new Swiper('.testimonial-swiper', {
    loop: true,
    speed: 700,
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    grabCursor: true,
    threshold: 5,
    touchRatio: 1.5,
    longSwipesRatio: 0.1,
    pagination: {
      el: '#testimonial-dots',
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}" style="display:inline-block;width:6px;height:6px;border-radius:9999px;background:#3f3f46;opacity:1;margin:0 2px;cursor:pointer;transition:all 0.3s;"></span>`;
      },
    },
    navigation: {
      nextEl: '#testimonial-next',
      prevEl: '#testimonial-prev',
    },
  });
}


function initCTA() {

  const btnStart = document.getElementById('btn-start-cta');
  if (!btnStart) return;

  const ctaCard = document.getElementById('cta-card');
  const ctaForm = document.getElementById('cta-form');
  const ctaSuccess = document.getElementById('cta-success');

  const steps = [
    { key: 'name', label: "Seu Nome", placeholder: "Digite seu nome", type: 'text' },
    { key: 'company', label: "Sua Empresa", placeholder: "Nome da organização", type: 'text' },
    { key: 'phone', label: "WhatsApp", placeholder: "(47) 9XXXX-XXXX", type: 'tel' },
    { key: 'problem', label: "Como podemos ajudar?", placeholder: "Ex: Adequar Alarme, Instalar Catracas...", type: 'text' }
  ];
  let currentStep = 0; let data = {};
  const btnNext = document.getElementById('cta-next');
  const btnBack = document.getElementById('cta-back');
  const lblQ = document.getElementById('cta-q-label');
  const inputQ = document.getElementById('cta-q-input');
  const stepCount = document.getElementById('cta-step-count');
  const progressBar = document.getElementById('cta-progress-bar');
  const err = document.getElementById('cta-error');

  const showError = (msg) => {
    err.textContent = msg;
    err.classList.remove('opacity-0');
    err.classList.add('opacity-100');
    inputQ.setAttribute('aria-invalid', 'true');
  };

  const clearError = () => {
    err.textContent = '';
    err.classList.remove('opacity-100');
    err.classList.add('opacity-0');
    inputQ.removeAttribute('aria-invalid');
  };

  const validateStep = () => {
    const val = inputQ.value.trim();
    const s = steps[currentStep];

    if (val.length < 2) {
      showError('Por favor, preencha este campo.');
      return false;
    }

    // Phone validation: must have at least 10 digits
    if (s.key === 'phone') {
      const digits = val.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) {
        showError('Informe um número válido com DDD.');
        return false;
      }
    }

    return true;
  };

  const showView = (view) => {
    // view: 'card' | 'form' | 'success'
    ctaCard.classList.toggle('hidden', view !== 'card');
    ctaForm.classList.toggle('hidden', view !== 'form');
    ctaSuccess.classList.toggle('hidden', view !== 'success');
  };

  const updateForm = () => {
    const s = steps[currentStep];
    lblQ.textContent = s.label;
    inputQ.placeholder = s.placeholder;
    inputQ.value = data[s.key] || '';
    inputQ.type = s.type || 'text';
    stepCount.textContent = `0${currentStep + 1}/0${steps.length}`;

    // Update Progress Bar
    const progress = ((currentStep + 1) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Update button text + re-render icon
    const isLast = currentStep === steps.length - 1;
    btnNext.innerHTML = isLast
      ? 'Enviar <i data-lucide="send" class="ml-2 w-4 h-4"></i>'
      : 'Continuar <i data-lucide="arrow-right" class="ml-2 w-4 h-4"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();

    clearError();
    inputQ.focus();

    // Phone mask
    if (s.key === 'phone') {
      inputQ.oninput = (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      };
    } else {
      inputQ.oninput = null;
    }
  };

  // Keyboard support: Enter to advance, Escape to cancel
  inputQ.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btnNext.click();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      showView('card');
      currentStep = 0; data = {};
      btnStart.focus();
    }
  });

  btnStart.onclick = () => {
    showView('form');
    updateForm();
  };

  btnNext.onclick = () => {
    if (!validateStep()) return;
    data[steps[currentStep].key] = inputQ.value.trim();

    if (currentStep < steps.length - 1) {
      currentStep++;
      updateForm();
    } else {
      showView('success');
    }
  };

  btnBack.onclick = () => {
    if (currentStep > 0) {
      currentStep--;
      updateForm();
    } else {
      showView('card');
      currentStep = 0;
    }
  };

  const cancelBtn = document.getElementById('cta-cancel');
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      showView('card');
      currentStep = 0; data = {};
    };
  }

  const successBackBtn = document.getElementById('cta-success-back');
  if (successBackBtn) {
    successBackBtn.onclick = () => {
      showView('card');
      currentStep = 0; data = {};
    };
  }
}

function initCustomCursor() {
  const cursor = document.getElementById('precision-cursor');
  const blob1 = document.getElementById('blob1');
  const blob2 = document.getElementById('blob2');
  const dotFlashlight = document.getElementById('dot-grid-flashlight');

  if (!cursor) return;

  const isTouch = 'ontouchstart' in window;
  if (!isTouch) {
    cursor.classList.remove('opacity-0');
    document.body.classList.add('hide-system-cursor');
  }

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener('mousemove', (e) => {
    if (dotFlashlight) {
      // Snap to 24px grid dots
      const snapX = Math.floor(e.clientX / 24) * 24 + 12;
      const snapY = Math.floor(e.clientY / 24) * 24 + 12;
      // Set globally so dotFlashlight accesses them
      document.documentElement.style.setProperty('--dot-x', `${snapX}px`);
      document.documentElement.style.setProperty('--dot-y', `${snapY}px`);
      dotFlashlight.classList.add('active');
    }

    // Calculate normalized mouse position (-1 to 1) for background effects
    targetX = (e.clientX / window.innerWidth) * 2 - 1;
    targetY = (e.clientY / window.innerHeight) * 2 - 1;

    // Instantly update cursor position
    requestAnimationFrame(() => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  });

  // Render loop for smooth lerping
  function render() {
    // Lerp background variables (slower = more fluid/premium)
    currentX += (targetX - currentX) * 0.03;
    currentY += (targetY - currentY) * 0.03;

    document.documentElement.style.setProperty('--mouse-x', currentX.toFixed(4));
    document.documentElement.style.setProperty('--mouse-y', currentY.toFixed(4));

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}


function initParticles() {
  if (typeof particlesJS !== 'undefined' && window.innerWidth >= 768) {
    const ids = ["particles-narrative", "particles-cta", "particles-footer", "particles-marquee"];

    if (typeof INSTITUTIONAL_CONTENT !== 'undefined') {
      INSTITUTIONAL_CONTENT.forEach((_, i) => ids.push(`particles-inst-${i}`));
    }
    if (typeof VALUE_PROPS !== 'undefined') {
      VALUE_PROPS.forEach((_, i) => ids.push(`particles-vp-${i}`));
    }

    ids.forEach(id => {
      if (document.getElementById(id)) {
        particlesJS(id, PARTICLE_CONFIG);
      }
    });

    // Fix for distorted canvases: particlesJS sometimes captures the wrong
    // container dimensions if the grid layout hasn't fully painted.
    // Triggering a resize forces the canvases to read correct width/height.
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }
}

function initScrollAnimations() {
  const progress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    if (progress) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progress.style.width = scrolled + "%";
      progress.setAttribute('aria-valuenow', Math.round(scrolled));
    }
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Snappier reveal
        entry.target.classList.add('active');
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(c => {
          const end = parseInt(c.dataset.end);
          const suffix = c.dataset.suffix || '';
          animateValue(c, 0, end, 1500, suffix);
        });

        // Trigger SVG circle animation
        const circles = entry.target.querySelectorAll('.metric-circle-progress');
        circles.forEach(c => {
          setTimeout(() => {
            c.style.strokeDashoffset = '0';
          }, 150);
        });
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration, suffix) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    obj.textContent = value;
    if (progress < 1) { window.requestAnimationFrame(step); }
  };
  window.requestAnimationFrame(step);
}

// --- 11. REFINED SPARK CURSOR (CANVAS ENGINE) ---
function initSparkCursor() {
  const canvas = document.getElementById('spark-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const MAX_PARTICLES = 150;
  let particles = [];
  let lastMouse = { x: 0, y: 0 };

  function resize() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx * 1.5; // Higher velocity
      this.vy = vy * 1.5;
      this.life = 1.0;
      this.decay = 0.04 + Math.random() * 0.04; // Shorter life
      this.size = 0.5 + Math.random() * 2.0;
      this.color = Math.random() > 0.5 ? '#ea580c' : '#f97316';
      this.jitter = 0.5;
    }

    update() {
      this.x += this.vx + (Math.random() - 0.5) * this.jitter;
      this.y += this.vy + (Math.random() - 0.5) * this.jitter;
      this.vy -= 0.03; // Slower float
      this.vx *= 0.97; // Slightly more friction
      this.life -= this.decay;
    }

    draw() {
      const alpha = this.life;
      const size = this.size * this.life;

      // Fire gradient: bright orange core fading out
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, size * 1.5);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(0.4, 'rgba(234, 88, 12, 0.3)');
      gradient.addColorStop(1, 'rgba(234, 88, 12, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, size * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function spawn(x, y) {
    const dx = x - lastMouse.x;
    const dy = y - lastMouse.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    const count = Math.min(Math.floor(speed / 4), 3);

    for (let i = 0; i < count; i++) {
      if (particles.length < MAX_PARTICLES) {
        const vx = (Math.random() - 0.5) * 2 + dx * 0.1;
        const vy = (Math.random() - 0.5) * 2 + dy * 0.1;
        particles.push(new Particle(x, y, vx, vy));
      }
    }
    lastMouse.x = x;
    lastMouse.y = y;
  }

  window.addEventListener('mousemove', (e) => {
    // Snap sparks to grid intersections for technical feel
    const snapX = Math.floor(e.clientX / 24) * 24 + 12;
    const snapY = Math.floor(e.clientY / 24) * 24 + 12;
    spawn(snapX, snapY);
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'screen'; // Real fire blending

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      if (p.life <= 0) {
        particles.splice(i, 1);
      } else {
        p.draw();
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}


// --- 14. PREMIUM SCROLL SPY FOR DEVICES SECTION ---
function initScrollSpy() {
  const section = document.getElementById('native-scroll-section');
  if (!section) return;

  const items = section.querySelectorAll('.scroll-item');
  const totalItems = items.length;
  const mediaImages = [
    document.getElementById('media-img-0'),
    document.getElementById('media-img-1'),
    document.getElementById('media-img-2'),
    document.getElementById('media-img-3'),
    document.getElementById('media-img-4')
  ];

  // Caption bar elements
  const captionName = document.getElementById('device-caption-name');
  const captionNum = document.getElementById('device-caption-num');
  const captionCategory = document.getElementById('device-caption-category');
  const captionSpecs = document.getElementById('device-caption-specs');

  // Progress rail elements
  const railFill = document.getElementById('rail-fill');
  const railNodes = document.querySelectorAll('.rail-node');

  // Spec data per device (matches HTML spec badges)
  const deviceSpecs = [
    ['Sensor Fotoelétrico', 'Área: até 60m²', 'EN 54-7'],
    ['Temp. Fixa: 57°C', 'Taxa: 10°C/min', 'EN 54-5'],
    ['Quebra-vidro', 'Altura: 1,20m', 'IP 44'],
    ['Potência: >90dB', 'Flash Estroboscópico', '24 VDC'],
    ['Microprocessada', 'Bateria 24h', 'Supervisão de Laço']
  ];

  const deviceCategories = ['Detecção', 'Detecção', 'Comando', 'Alerta', 'Controle'];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-index'));
        const deviceName = entry.target.getAttribute('data-name') || '';

        // Update caption bar
        if (captionName && deviceName) captionName.textContent = deviceName;
        if (captionNum) captionNum.textContent = String(index + 1).padStart(2, '0');
        if (captionCategory) captionCategory.textContent = deviceCategories[index] || '';
        if (captionSpecs && deviceSpecs[index]) {
          captionSpecs.innerHTML = deviceSpecs[index]
            .map((s, i) => i > 0 ? `<span class="text-zinc-800">|</span><span>${s}</span>` : `<span>${s}</span>`)
            .join('');
        }

        // Update progress rail
        if (railFill) {
          const fillPercent = totalItems > 1 ? (index / (totalItems - 1)) * 100 : 0;
          railFill.style.height = fillPercent + '%';
        }
        railNodes.forEach((node, i) => {
          node.classList.toggle('active', i === index);
          node.classList.toggle('passed', i < index);
        });

        // Update text + icon + mobile image + staggered elements
        items.forEach((item, i) => {
          const title = item.querySelector('.item-title');
          const desc = item.querySelector('.item-desc');
          const mobileImg = item.querySelector('.item-mobile-img');
          const icon = item.querySelector('.item-icon');

          if (i === index) {
            item.classList.add('is-active');
            if (title) { title.classList.remove('opacity-40'); title.classList.add('opacity-100'); }
            if (desc) { desc.classList.remove('opacity-40'); desc.classList.add('opacity-80'); }
            if (mobileImg) { mobileImg.classList.remove('opacity-40', 'scale-95'); mobileImg.classList.add('opacity-100', 'scale-100'); }
            if (icon) {
              icon.classList.remove('bg-zinc-900/60', 'text-fire-600');
              icon.classList.add('bg-fire-600', 'text-white');
            }
          } else {
            item.classList.remove('is-active');
            if (title) { title.classList.remove('opacity-100'); title.classList.add('opacity-40'); }
            if (desc) { desc.classList.remove('opacity-80'); desc.classList.add('opacity-40'); }
            if (mobileImg) { mobileImg.classList.remove('opacity-100', 'scale-100'); mobileImg.classList.add('opacity-40', 'scale-95'); }
            if (icon) {
              icon.classList.add('bg-zinc-900/60', 'text-fire-600');
              icon.classList.remove('bg-fire-600', 'text-white');
            }
          }
        });

        // Update sticky images — crossfade + scale settle
        mediaImages.forEach((img, i) => {
          if (!img) return;
          if (i === index) {
            img.classList.remove('opacity-0', 'scale-[1.02]');
            img.classList.add('opacity-100', 'scale-100');
          } else {
            img.classList.remove('opacity-100', 'scale-100');
            img.classList.add('opacity-0', 'scale-[1.02]');
          }
        });
      }
    });
  }, {
    rootMargin: '-35% 0px -35% 0px',
    threshold: 0.1
  });

  items.forEach(item => observer.observe(item));
}

