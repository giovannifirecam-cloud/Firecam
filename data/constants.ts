import { ServiceData, ValueProp, TestimonialData, HeroSlideData } from '../types/index';

export const CONTACT_INFO = {
  phone: {
    display: "+55 (47) 3086-3186",
    link: "tel:+554730863186"
  },
  whatsapp: {
    number: "5547996660234",
    link: "https://wa.me/5547996660234"
  },
  email: "comercial@firecam.com.br",
  address: {
    city: "Joinville",
    state: "Santa Catarina",
    full: "Rua XV de Novembro, 5008 - Vila Nova.",
    region: "Atendimento: Norte Catarinense."
  },
  workingHours: "Seg-Sex, 08h-18h"
};

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 1,
    badge: "Infraestrutura para Segurança Patrimonial",
    title: "Geral",
    headline: {
      p1: "Segurança",
      p1Suffix: "Eletrônica",
      connector: "e",
      p2: "Conectividade.",
      suffix: ""
    },
    subheadline: "A Firecam é especializada em transformar ideias em realidade,\nintegrando tecnologias de forma estratégica e escalável.",
    topics: [
      "Detecção e Alarme de Incêndio",
      "Controle de Acesso",
      "Cabos e Redes Estruturadas",
      "Circuito de Câmeras de Segurança"
    ],
    cta: "Quero Saber Mais",
    imageUrl: "https://drive.google.com/thumbnail?id=110tspJUA7z28d5I5ulacNHJgWfi8pyXK&sz=w1920",
    // New reliable abstract network video (Digital Connection)
    videoUrl: "https://videos.pexels.com/video-files/853870/853870-hd_1920_1080_25fps.mp4"
  },
  {
    id: 2,
    badge: "Segurança Contra Incêndio",
    title: "Incêndio (NBR)",
    headline: {
      p1: "Sistemas",
      p1Suffix: "Contra",
      connector: "",
      p2: "Incêndio Normatizados.",
      suffix: ""
    },
    subheadline: "Entrega técnica conforme a NBR 17240. Superamos as exigências\nde auditoria e garantimos a aprovação do corpo de bombeiros.",
    topics: [
      "Execução de Projetos",
      "Laudos e ARTs para AVCB",
      "Comissionamento",
      "Inspeção e Manutenção Preventiva"
    ],
    cta: "Quero Saber Mais",
    // Switched to authentic company photo (Maintenance asset) instead of generic stock
    imageUrl: "https://drive.google.com/thumbnail?id=1tsevCIf-G2tdh2CG52nfnU-imedssByy&sz=w1920",
    videoUrl: "https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4"
  },
  {
    id: 3,
    badge: "Gestão de Acesso",
    title: "Controle de Acesso",
    headline: {
      p1: "Controle",
      connector: "de",
      p2: "Acesso.",
      suffix: ""
    },
    subheadline: "No mundo dos negócios, não é só sobre proteger ativos, é garantir que só as *pessoas certas* tenham acesso onde é preciso!",
    topics: [
      "Catracas e Torniquetes",
      "Biometria Facial",
      "Fechaduras Eletroímã",
      "Gestão de Visitantes"
    ],
    // Explicit icons to prevent generic fallback (which would put a Fire icon on Turnstiles)
    topicIcons: ['door-open', 'scan-face', 'lock', 'users'],
    cta: "Quero Saber Mais",
    imageUrl: "https://drive.google.com/thumbnail?id=1MKE-wSQ4ofrJJkuLDM_1rPHFGJ7_IdTQ&sz=w1920",
    videoUrl: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4"
  },
  {
    id: 4,
    badge: "Conectividade",
    title: "Redes e Dados",
    headline: {
      p1: "Cabeamento",
      p1Suffix: "Estruturado",
      connector: "e",
      p2: "Wi-Fi Corporativo.",
      suffix: ""
    },
    subheadline: "Solução para promover a padronização da infraestrutura de rede, o Cabeamento Estruturado trará *conectividade de alta performance* à sua rede.",
    topics: [
      "Passagem de Cabos e Fibra",
      "Organização de Racks",
      "Infraestrutura Limpa e Identificada",
      "Instalação Normatizada"
    ],
    // Matched icons for the specific topics
    topicIcons: ['cable', 'server', 'tag', 'clipboard-check'],
    cta: "Quero Saber Mais",
    imageUrl: "https://drive.google.com/thumbnail?id=1d8FmDP8KZJRGTgl2VLkyML45iLewFg-e&sz=w1920",
    videoUrl: "https://videos.pexels.com/video-files/2516159/2516159-hd_1280_720_24fps.mp4"
  },
  {
    id: 5,
    badge: "Videomonitoramento",
    title: "CFTV IP",
    headline: {
      p1: "Videomonitoramento",
      connector: "e",
      p2: "Controle de Processos.",
      suffix: ""
    },
    subheadline: "Soluções completas que *elevam o monitoramento a um papel ativo* na segurança e na gestão, não apenas no registro de imagens.",
    topics: [
      "Instalação, configuração e parametrização",
      "Analíticos de Vídeo",
      "Câmeras IP e Sistemas Híbridos",
      "Inspeção e Manutenção Preventiva"
    ],
    topicIcons: ['server', 'scan-face', 'eye', 'clipboard-check'],
    cta: "Quero Saber Mais",
    imageUrl: "https://drive.google.com/thumbnail?id=1P19CAANDyTzllutCIWne2W7W7hIAlR0_&sz=w1920",
    videoUrl: "https://videos.pexels.com/video-files/3209211/3209211-hd_1920_1080_25fps.mp4"
  }
];

export const SERVICES: ServiceData[] = [
  {
    id: 'fire',
    title: 'Detecção e Alarme de Incêndio',
    hook: 'Sistemas eletrônicos conforme NBR 17240.',
    description: [
      "Especialistas na parte eletrônica e lógica do sistema. Instalamos centrais, detectores de fumaça, acionadores e sirenes com infraestrutura de eletrodutos galvanizados.",
      "Garantimos que o sinal de alerta chegue à central com precisão. Entregamos o sistema comissionado, integrado e com a documentação técnica (ART) para vistoria."
    ],
    features: ["Infraestrutura de Eletrodutos", "Endereçamento de Laços", "Comissionamento Técnico"],
    cta: "Orçamento Incêndio",
    imageUrl: "https://drive.google.com/thumbnail?id=110tspJUA7z28d5I5ulacNHJgWfi8pyXK&sz=w1920",
    videoUrl: "https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4"
  },
  {
    id: 'access',
    title: 'Controle de Acesso e Integração',
    hook: 'Hardware robusto para gestão de fluxo.',
    description: [
      "Instalamos e conectamos as barreiras físicas: catracas, torniquetes e fechaduras eletromagnéticas. Cuidamos de toda a montagem mecânica e cabeamento.",
      "Realizamos a integração física com leitores faciais e biométricos, garantindo que o hardware responda instantaneamente ao seu software de controle."
    ],
    features: ["Montagem de Catracas", "Fechaduras Eletroímã", "Integração de Hardware"],
    cta: "Orçamento Acesso",
    imageUrl: "https://drive.google.com/thumbnail?id=1MKE-wSQ4ofrJJkuLDM_1rPHFGJ7_IdTQ&sz=w1920",
    videoUrl: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4"
  },
  {
    id: 'cftv',
    title: 'Videomonitoramento Inteligente',
    hook: 'Visão total e controle da operação.',
    description: [
      "Projeto focado na captura de imagem. Definimos o posicionamento estratégico de câmeras para eliminar pontos cegos e garantir a identificação correta de pessoas e processos.",
      "Configuração avançada de gravadores (NVR) e integração com softwares de gestão (VMS/Analíticos). Entregamos o sistema pronto para auditorias e segurança patrimonial."
    ],
    features: ["Posicionamento Estratégico", "Câmeras IP e Analógicas", "Integração VMS"],
    cta: "Orçamento CFTV",
    imageUrl: "https://drive.google.com/thumbnail?id=1P19CAANDyTzllutCIWne2W7W7hIAlR0_&sz=w1920",
    videoUrl: "https://videos.pexels.com/video-files/3209211/3209211-hd_1920_1080_25fps.mp4"
  },
  {
    id: 'network',
    title: 'Redes e Cabeamento',
    hook: 'A estrada física para seus dados.',
    description: [
      "Construímos o caminho físico por onde suas informações trafegam. Lançamento de cabos UTP, fibra óptica e montagem de Patch Panels.",
      "Uma rede física organizada reduz a latência e facilita o trabalho da equipe de TI. Entregamos tudo identificado e testado ponto a ponto."
    ],
    features: ["Certificação de Pontos", "Fusão de Fibra", "Identificação Técnica"],
    cta: "Orçamento Redes",
    imageUrl: "https://drive.google.com/thumbnail?id=1d8FmDP8KZJRGTgl2VLkyML45iLewFg-e&sz=w1920",
    videoUrl: "https://videos.pexels.com/video-files/2516159/2516159-hd_1280_720_24fps.mp4"
  },
  {
    id: 'maintenance',
    title: 'Manutenção de Sistemas',
    hook: 'Continuidade para sua operação.',
    description: [
      "Sistemas eletrônicos precisam de revisão. Testamos sensores, ajustamos tensões de fontes e limpamos componentes ópticos periodicamente.",
      "Nosso contrato garante que tanto o hardware quanto a integração com o software continuem operando conforme o projeto original."
    ],
    features: ["Testes de Sensores", "Limpeza de Ópticos", "Relatório Técnico"],
    cta: "Plano Manutenção",
    imageUrl: "https://drive.google.com/thumbnail?id=1tsevCIf-G2tdh2CG52nfnU-imedssByy&sz=w1920",
    videoUrl: "https://videos.pexels.com/video-files/3840442/3840442-hd_1920_1080_30fps.mp4"
  }
];

export const VALUE_PROPS: ValueProp[] = [
  {
    title: "CULTURA TÉCNICA",
    headline: "Nascemos na execução.",
    description: [
      "Não somos uma consultoria de palco. Somos técnicos de campo. Entendemos a realidade de ambientes hostis, indústria e obra. Projetamos apenas o que conseguimos entregar e manter."
    ],
    highlight: "Chão de Fábrica."
  },
  {
    title: "RIGOR",
    headline: "Não assinamos gambiarra.",
    description: [
      "Em infraestrutura crítica, o improviso é um risco inaceitável. Recusamos atalhos normativos para reduzir custos. Entregamos obras limpas, identificadas e prontas para passar em qualquer auditoria."
    ],
    highlight: "Padrão de Elite."
  },
  {
    title: "LOGÍSTICA",
    headline: "Quem não tem peça, não tem prazo.",
    description: [
      "SLA de contrato não resolve emergência. Mantemos estoque regulador em Joinville e frota própria. Garantimos que o reparo aconteça no tempo da sua necessidade, não no tempo da transportadora."
    ],
    highlight: "Autonomia Total."
  },
  {
    title: "INTEGRIDADE",
    headline: "Não inventamos defeito.",
    description: [
      "Muitas empresas condenam sistemas inteiros por incompetência técnica ou para bater meta de vendas. Nós investigamos a causa raiz. Se o equipamento tem reparo, nós consertamos."
    ],
    highlight: "Respeito ao Budget."
  },
];

export const TESTIMONIALS: TestimonialData[] = [
  {
    quote: "A Firecam modernizou nosso sistema de alarme. Substituíram a central antiga e refizeram o cabeamento, integrando tudo perfeitamente.",
    author: "Ricardo M.",
    role: "Gerente de Planta",
    location: "Zona Industrial",
    stars: 5,
    date: "Adequação Sistema"
  },
  {
    quote: "A instalação física das catracas ficou excelente. O acabamento é ótimo e o hardware responde rápido ao nosso sistema de RH.",
    author: "Carla S.",
    role: "Facilities",
    location: "Perini Park",
    stars: 5,
    date: "Controle de Acesso"
  },
  {
    quote: "Refizeram o cabeamento estruturado do escritório. Agora a rede é estável e os racks estão visualmente organizados.",
    author: "Fernando A.",
    role: "Gestor de TI",
    location: "Centro",
    stars: 5,
    date: "Cabeamento"
  },
  {
    quote: "Contratamos a manutenção preventiva dos sistemas de segurança. A equipe é técnica e sempre entrega relatórios detalhados.",
    author: "Roberto G.",
    role: "Síndico Profissional",
    location: "Condomínio Logístico",
    stars: 5,
    date: "Manutenção"
  }
];

export const CLIENT_LOGOS = [
  { 
    name: 'Ciser', 
    url: 'https://www.ciser.com.br/application/modules/comum/assets/img/logo-ciser.svg?v=3',
    className: 'h-8 md:h-12 translate-y-1'
  },
  { 
    name: 'BYD', 
    url: 'https://drive.google.com/thumbnail?id=1Lw_QStoG0okDgXdr3Bclu0jlMV1x0eTD&sz=w1000',
    className: 'h-5 md:h-8 translate-y-1' 
  },
  {
    name: 'Copobras', 
    url: 'https://drive.google.com/thumbnail?id=1JRnVhJFCvZmVSV8bIEYZLcejk-JZwaDA&sz=w1000',
    className: 'h-8 md:h-12'
  },
  {
    name: 'Petrobras', 
    url: 'https://drive.google.com/thumbnail?id=1tLT4AV26rsBnrnKIOobQ4dbZsxb0x638&sz=w1000',
    // Standardized height to h-14 on mobile (56px) based on feedback, md:h-28 (112px) on desktop
    className: 'h-14 md:h-28 -translate-y-1' 
  },
  {
    name: 'Capital Realty', 
    url: 'https://drive.google.com/thumbnail?id=1CjFli9EFBR2Zs9xpb35_J311kiItFwgP&sz=w1000',
    className: 'h-6 md:h-9 translate-y-1'
  },
  {
    name: 'ArcelorMittal', 
    url: 'https://drive.google.com/thumbnail?id=1Mr_31Ab89W8rsORbVqAXuKbPYo6OfXGM&sz=w1000',
    className: 'h-8 md:h-12 -translate-y-1'
  },
  {
    name: 'Ailos',
    url: 'https://drive.google.com/thumbnail?id=1NVtjXJoLqTthX0G3Y_XfKGtXrxmgv9jC&sz=w1000',
    className: 'h-12 md:h-16'
  },
  {
    name: 'DVA', 
    url: 'https://drive.google.com/thumbnail?id=1gKZ3u0WM2WUHIjdJATinC9PdZHZx6ktf&sz=w1000',
    className: 'h-8 md:h-12'
  },
  {
    name: 'Britânia',
    url: 'https://drive.google.com/thumbnail?id=1vKKrus3ofbkZ07oCE8o1dLLgHJmZQpwb&sz=w1000',
    className: 'h-7 md:h-10'
  },
];

export const INSTITUTIONAL_CONTENT = [
  {
    code: "1. DIAGNÓSTICO",
    title: "Varredura Técnica",
    desc: "Testamos o sistema real: fumaça no detector, carga na bateria e decibéis na sirene. Ignoramos o que o painel diz e testamos o que o equipamento faz."
  },
  {
    code: "2. AUDITORIA",
    title: "Relatório de Risco",
    desc: "Não entregamos um papel dizendo 'OK'. Entregamos um dossiê com fotos, vídeos e gráficos de performance para sua seguradora."
  },
  {
    code: "3. CORREÇÃO",
    title: "Recuperação",
    desc: "Eliminamos gambiarras e equipamentos obsoletos. O sistema volta a operar conforme a norma NBR 17240 e a lógica de proteção original."
  },
  {
    code: "4. ROTINA",
    title: "Prevenção Ativa",
    desc: "Cronograma de visitas periódicas. A inatividade corrói a eletrônica; nós mantemos o sistema 'vivo' com testes de estresse constantes."
  }
];

export const METRICS = [
  { end: 500, suffix: "k+", label: "Pontos Instalados", iconKey: 'check' },
  { end: 100, suffix: "%", label: "Aprovação Técnica", iconKey: 'trend' },
  { end: 4, suffix: "h", label: "SLA de Atendimento", iconKey: 'eye' },
  { end: 10, suffix: "+", label: "Anos de Experiência", iconKey: 'alert' }
];

export const NARRATIVE_CONTENT = {
  quote: "A régua dos nossos clientes define a nossa qualidade.",
  highlight: {
    prefix: "Homologados pela",
    accent: "Indústria."
  },
  description: [
    "As marcas que você viu acima não contratam amadores. Para atuar dentro dessas plantas, a exigência é máxima: segurança do trabalho, documentação e capacidade técnica comprovada.",
    "Nós somos a força operacional validada por esses gigantes. Trazemos esse 'Padrão Industrial' de execução e acabamento para o seu projeto, independente do porte."
  ]
};

export const CTA_FORM_STEPS = [
    {
      key: 'name',
      label: "Seu Nome",
      placeholder: "Digite seu nome",
      type: "text",
      errorMessage: "Nome obrigatório."
    },
    {
      key: 'company',
      label: "Sua Empresa",
      placeholder: "Nome da organização",
      type: "text",
      errorMessage: "Empresa obrigatória."
    },
    {
      key: 'phone',
      label: "WhatsApp",
      placeholder: "(47) 9XXXX-XXXX",
      type: "tel",
      errorMessage: "Número inválido."
    },
    {
      key: 'problem',
      label: "Como podemos ajudar?",
      placeholder: "Ex: Adequar Alarme, Instalar Catracas...",
      type: "text",
      errorMessage: "Descreva brevemente."
    }
];