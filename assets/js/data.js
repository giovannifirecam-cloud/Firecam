/*
  FIRECAM DATA CONSTANTS
  Centralized content for Hero, Clients, Services, Metrics, and Testimonials.
*/

export const HERO_SLIDES = [
    {
        id: 1,
        badge: "Infraestrutura para Segurança Patrimonial",
        headline: { p1: "Segurança", p1Suffix: "Eletrônica", connector: "e", p2: "Conectividade." },
        subheadline: "A Firecam é especializada em transformar ideias em realidade,\nintegrando tecnologias de forma estratégica e escalável.",
        topics: ["Detecção e Alarme de Incêndio", "Controle de Acesso", "Cabos e Redes Estruturadas", "Circuito de Câmeras de Segurança"],
        topicIcons: ['flame', 'shield-check', 'network', 'camera'],
        videoUrl: null,
        imageUrl: "assets/img/optimized/_MG_6845.webp",
        imageAlt: "Técnico Firecam instalando sistema de segurança eletrônica"
    },
    {
        id: 2,
        badge: "Segurança Contra Incêndio",
        headline: { p1: "Sistemas", p1Suffix: "Contra", connector: "", p2: "Incêndio Normatizados." },
        subheadline: "Entrega técnica conforme a NBR 17240. Superamos as exigências\nde auditoria e garantimos a aprovação do corpo de bombeiros.",
        topics: ["Execução de Projetos", "Laudos e ARTs para AVCB", "Comissionamento", "Inspeção e Manutenção Preventiva"],
        topicIcons: ['file-text', 'shield', 'check-circle', 'clipboard-list'],
        videoUrl: null,
        imageUrl: "assets/img/optimized/_MG_6806.webp",
        imageAlt: "Central de alarme de incêndio instalada conforme NBR 17240"
    },
    {
        id: 3,
        badge: "Gestão de Acesso",
        headline: { p1: "Controle", connector: "de", p2: "Acesso." },
        subheadline: "No mundo dos negócios, não é só sobre proteger ativos, é garantir que só as pessoas certas tenham acesso onde é preciso!",
        topics: ["Catracas e Torniquetes", "Biometria Facial", "Fechaduras Eletroímã", "Gestão de Visitantes"],
        topicIcons: ['door-open', 'scan-face', 'lock', 'users'],
        videoUrl: null,
        imageUrl: "assets/img/optimized/_MG_6834.webp",
        imageAlt: "Sistema de controle de acesso biométrico instalado pela Firecam",
        flipped: true
    },
    {
        id: 4,
        badge: "Conectividade",
        headline: { p1: "Cabeamento", p1Suffix: "Estruturado", connector: "e", p2: "Wi-Fi Corporativo." },
        subheadline: "Solução para promover a padronização da infraestrutura de rede, o Cabeamento Estruturado trará conectividade de alta performance à sua rede.",
        topics: ["Passagem de Cabos e Fibra", "Organização de Racks", "Infraestrutura Limpa", "Instalação Normatizada"],
        topicIcons: ['cable', 'server', 'tag', 'clipboard-check'],
        videoUrl: null,
        imageUrl: "assets/img/optimized/_MG_6820.webp",
        imageAlt: "Rack de cabeamento estruturado organizado pela Firecam"
    },
    {
        id: 5,
        badge: "Videomonitoramento",
        headline: { p1: "Videomonitoramento", connector: "e", p2: "Controle de Processos." },
        subheadline: "Soluções completas que elevam o monitoramento a um papel ativo na segurança e na gestão, não apenas no registro de imagens.",
        topics: ["Câmeras IP", "Analíticos de Vídeo", "Câmeras Térmicas", "Inspeção Preventiva"],
        topicIcons: ['camera', 'brain', 'thermometer', 'eye'],
        videoUrl: null,
        imageUrl: "assets/img/optimized/_MG_6862_1.webp",
        imageAlt: "Câmera de videomonitoramento IP instalada pela Firecam"
    }
];

export const CLIENT_LOGOS = [
    { name: 'Ciser', url: 'logos/ciser.svg', className: 'h-10 md:h-16 w-auto object-contain' },
    { name: 'BYD', url: 'logos/byd.png', className: 'h-10 md:h-16 w-auto object-contain' },
    { name: 'Copobras', url: 'logos/copobras.png', className: 'h-10 md:h-16 w-auto object-contain' },
    { name: 'Petrobras', url: 'logos/Petrobras_horizontal_logo.svg', className: 'h-10 md:h-16 w-auto object-contain' },
    { name: 'Capital Realty', url: 'logos/capital_realty.png', className: 'h-10 md:h-16 w-auto object-contain' },
    { name: 'ArcelorMittal', url: 'logos/arcelormittal.png', className: 'h-10 md:h-16 w-auto object-contain' },
    { name: 'Ailos', url: 'logos/ailos.png', className: 'h-10 md:h-16 w-auto object-contain' },
    { name: 'DVA', url: 'logos/dva.png', className: 'h-10 md:h-16 w-auto object-contain' },
    { name: 'Britânia', url: 'logos/britania.png', className: 'h-10 md:h-16 w-auto object-contain' }
];

export const INSTITUTIONAL_CONTENT = [
    { code: "Hud-01", title: "Varredura Técnica", desc: "Testamos o sistema real: fumaça no detector, carga na bateria e decibéis na sirene. Ignoramos o que o painel diz e validamos o que o equipamento faz." },
    { code: "Hud-02", title: "Relatório de Risco", desc: "Não entregamos um papel dizendo 'OK'. Entregamos um dossiê com fotos, vídeos e gráficos de performance para auditoria técnica e seguradora." },
    { code: "Hud-03", title: "Recuperação", desc: "Eliminamos gambiarras e equipamentos obsoletos. O sistema volta a operar sob rigor da norma NBR 17240 e lógica de proteção original." },
    { code: "Hud-04", title: "Prevenção Ativa", desc: "Cronograma de visitas periódicas. A inatividade corrói a eletrônica; mantemos o sistema em prontidão com testes de estresse constantes." }
];

export const VALUE_PROPS = [
    { title: "Autoridade Técnica", headline: "Nascemos na execução.", desc: "Não somos consultores de palco. Somos engenharia de campo. Entendemos a realidade de ambientes hostis e indústrias pesadas.", highlight: "Chão de Fábrica." },
    { title: "Rigor Normativo", headline: "Zero compromisso com a gambiarra.", desc: "Em infraestrutura crítica, o improviso é um risco inaceitável. Recusamos atalhos normativos. Entregamos obras limpas e auditáveis.", highlight: "Padrão de Elite." },
    { title: "Autonomia", headline: "Logística sem gargalos.", desc: "SLA de contrato não resolve emergência. Mantemos estoque regulador em Joinville e frota própria para resposta imediata.", highlight: "Prontidão Total." },
    { title: "Integridade", headline: "Investigação da causa raiz.", desc: "Não condenamos sistemas por incompetência. Investigamos o erro. Se o equipamento tem reparo, nós garantimos a vida útil.", highlight: "Respeito ao Budget." }
];

export const TESTIMONIALS = [
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

export const METRICS = [
    { end: 500, suffix: "k+", label: "Pontos Instalados", icon: "check-circle" },
    { end: 100, suffix: "%", label: "Aprovação Técnica", icon: "trending-up" },
    { end: 4, suffix: "h", label: "SLA de Atendimento", icon: "eye" },
    { end: 10, suffix: "+", label: "Anos de Experiência", icon: "badge-check" }
];
