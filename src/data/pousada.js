// Todo o conteúdo do site num lugar só.
// Regra: só entra aqui o que a pousada realmente oferece.

export const contact = {
  name: "Pousada da Coruja",
  whatsapp: "5541996877984",
  phoneDisplay: "(41) 99687-7984",
  phoneTel: "+5541996877984",
  street: "R. Tarumã, 51",
  city: "Matinhos – PR",
  cep: "83260-000",
  nearby: "Perto do Parque Municipal do Sertãozinho",
  instagram: "tocadacorujamatinhos",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Pousada+da+Coruja+R.+Tarum%C3%A3+51+Matinhos+PR",
  routeUrl:
    "https://www.google.com/maps/dir/?api=1&destination=R.+Tarum%C3%A3,+51,+Matinhos+-+PR,+83260-000",
};

export const rating = {
  score: "5,0",
  count: 22,
  source: "Google",
  url: contact.mapsUrl,
};

// Micro-copys que respondem às dúvidas antes da pergunta.
export const objections = [
  { icon: "coffee", label: "Café da manhã", note: "servido na pousada" },
  { icon: "car", label: "Estacionamento", note: "no local" },
  { icon: "wifi", label: "Wi‑Fi", note: "para hóspedes" },
  { icon: "beer", label: "Pub bar", note: "dentro da pousada" },
  { icon: "chat", label: "Reserva direta", note: "fale com a pousada" },
];

// Criador de Estadia Ideal
export const reasons = [
  { id: "casal", label: "Casal", icon: "heart", title: "Escapada a dois", line: "Praia de dia, pub à noite e café da manhã sem pressa." },
  { id: "familia", label: "Família", icon: "home", title: "Férias em família", line: "Dia de praia com as crianças e espaço para todo mundo descansar." },
  { id: "solo", label: "Sozinho(a)", icon: "user", title: "Pausa só sua", line: "Mar, sossego e tempo só para você." },
  { id: "amigos", label: "Amigos", icon: "users", title: "Encontro da turma", line: "Praia o dia todo e um pub para a noite render." },
];

// Stories: cada círculo abre uma sequência em tela cheia.
export const stories = [
  {
    id: "jardim",
    title: "Pousada",
    cover: "/video/story-jardim.jpg",
    slides: [
      { type: "video", src: "/video/story-jardim.mp4", poster: "/video/story-jardim.jpg", caption: "Chegou da praia? O descanso começa aqui." },
      { type: "image", src: "/img/jardim-serra-800.jpg", caption: "Mesas ao ar livre para o fim de tarde." },
      { type: "image", src: "/img/jardim-mesa-800.jpg", caption: "Cantinhos para ler, conversar ou não fazer nada." },
    ],
  },
  {
    id: "quartos",
    title: "Quartos",
    cover: "/img/quartos-800.jpg",
    slides: [
      { type: "image", src: "/img/quartos-800.jpg", caption: "8 quartos, no térreo e no andar de cima." },
      { type: "image", src: "/img/corredor-800.jpg", caption: "Sai do quarto e já está ao ar livre." },
    ],
  },
  {
    id: "pub",
    title: "Pub",
    cover: "/video/story-pub.jpg",
    slides: [
      { type: "video", src: "/video/story-pub.mp4", poster: "/video/story-pub.jpg", caption: "Toca da Coruja Pub Bar, dentro da pousada." },
      { type: "image", src: "/img/pub-salao-800.jpg", caption: "Tijolo à vista, lampiões e cadeira de balanço." },
      { type: "image", src: "/img/pub-balcao-800.jpg", caption: "Banqueta amarela no balcão e bebida gelada." },
    ],
  },
  {
    id: "fim-de-tarde",
    title: "Fim de tarde",
    cover: "/img/por-do-sol-800.jpg",
    slides: [
      { type: "image", src: "/img/por-do-sol-800.jpg", caption: "O pôr do sol depois de um dia de praia, na frente dos quartos." },
    ],
  },
  {
    id: "noite",
    title: "À noite",
    cover: "/img/noite-800.jpg",
    slides: [
      { type: "image", src: "/img/noite-800.jpg", caption: "A pousada iluminada depois do jantar." },
      { type: "image", src: "/img/janela-bar-800.jpg", caption: "A vista do balcão do pub." },
    ],
  },
  {
    id: "jabuticaba",
    title: "Jabuticaba",
    cover: "/video/story-jabuticaba.jpg",
    slides: [
      { type: "video", src: "/video/story-jabuticaba.mp4", poster: "/video/story-jabuticaba.jpg", caption: "Na época certa, é só colher do pé." },
    ],
  },
];

// Avaliações reais do Google. Copie do Google Maps e cole aqui.
// Formato: { name: "Ana", text: "…", when: "out/2026", stars: 5, url: "link da avaliação" }
// Use foto do hóspede só com autorização dele: photo: "/img/hospedes/ana.jpg"
export const reviews = [];

// Reserva direta: linhas da tabela comparativa.
export const directRows = [
  { label: "Conversa direta com quem cuida da pousada", direct: "Pelo WhatsApp", other: "Chat da plataforma" },
  { label: "Estadia montada do seu jeito antes de fechar", direct: true, other: false },
  { label: "Combinar horário de chegada e pedidos especiais", direct: true, other: "Por mensagem" },
  { label: "Sem criar conta em aplicativo", direct: true, other: false },
];

// Benefícios exclusivos: ative (enabled: true) só o que o dono confirmar.
export const directPerks = [
  { label: "Welcome drink no pub", enabled: false },
  { label: "Late check-out", enabled: false },
  { label: "Cancelamento grátis", enabled: false },
];

export const faq = [
  { q: "Como faço a reserva?", a: "Pelo WhatsApp (41) 99687-7984. Mande as datas e quantas pessoas, ou monte sua estadia aqui no site, e a pousada responde com os quartos livres e o valor." },
  { q: "Tem estacionamento?", a: "Sim. O estacionamento fica dentro da pousada." },
  { q: "O café da manhã está incluso?", a: "A pousada serve café da manhã. Confirme as condições da sua tarifa na hora da reserva." },
  { q: "Tem Wi‑Fi?", a: "Sim, Wi‑Fi para todos os hóspedes." },
  { q: "Vocês recebem grupos?", a: "Sim. São 8 quartos lado a lado e um pub dentro da pousada. Fale pelo WhatsApp para combinar." },
];
