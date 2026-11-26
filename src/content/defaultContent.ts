// Conteúdo padrão do site. Tudo aqui é editável em /admin.
// Os textos de amenidades são EXEMPLOS: confirme o que realmente existe antes de publicar.
export interface Cabin { id: string; name: string; description: string; amenities: string[]; image: string; imageAlt: string }
export interface GalleryItem { id: string; src: string; alt: string }
export interface SiteContent {
  site: { name: string; seoTitle: string; seoDescription: string }
  hero: { title: string; subtitle: string; primaryCta: string; secondaryCta: string; image: string; imageAlt: string }
  about: { title: string; text: string; image: string; imageAlt: string }
  cabins: Cabin[]
  experience: { title: string; items: { title: string; text: string; image: string; imageAlt: string }[] }
  gallery: GalleryItem[]
  location: { title: string; text: string; address: string; mapUrl: string }
  contact: { whatsapp: string; phone: string; instagram: string; messageCabin: string; messageGeneral: string }
  finalCta: { title: string; subtitle: string; button: string; image: string; imageAlt: string }
  footer: { text: string }
}
export const defaultContent: SiteContent = {
  site: {
    name: 'Refúgio da Serra',
    seoTitle: 'Refúgio da Serra | Cabanas na natureza da Serra Gaúcha',
    seoDescription: 'Cabanas em meio à natureza da Serra Gaúcha para descansar, desacelerar e viver momentos especiais. Consulte a disponibilidade pelo WhatsApp.',
  },
  hero: {
    title: 'Seu refúgio particular em meio à natureza.',
    subtitle: 'Desacelere, respire o ar da serra e viva momentos especiais em nossas cabanas.',
    primaryCta: 'Consultar disponibilidade', secondaryCta: 'Conheça nossas cabanas',
    image: '/images/hero.svg', imageAlt: 'Cabana de madeira entre árvores, com montanhas ao fundo',
  },
  about: {
    title: 'Um lugar para se reconectar.',
    text: 'Em meio à natureza da Serra Gaúcha, nossas cabanas foram pensadas para proporcionar descanso, privacidade e momentos inesquecíveis. Um refúgio para quem deseja desacelerar, apreciar a paisagem e aproveitar o melhor da vida ao ar livre.',
    image: '/images/sobre.svg', imageAlt: 'Árvores e montanhas da serra ao amanhecer',
  },
  cabins: [
    { id: 'bosque', name: 'Cabana Bosque', description: 'Um refúgio acolhedor entre as árvores, com arquitetura contemporânea, privacidade e uma vista encantadora da natureza.',
      amenities: ['Grandes janelas de vidro', 'Varanda com vista para o bosque', 'Ambiente aconchegante em madeira', 'Exemplo editável: roupa de cama de qualidade'],
      image: '/images/cabana-bosque.svg', imageAlt: 'Cabana Bosque, de madeira e vidro, cercada por árvores altas' },
    { id: 'mirante', name: 'Cabana Mirante', description: 'Uma cabana cercada pela paisagem da serra, ideal para contemplar as montanhas, descansar e aproveitar momentos especiais.',
      amenities: ['Vista para as montanhas', 'Deck para contemplação', 'Isolamento e tranquilidade', 'Exemplo editável: lareira ou aquecimento'],
      image: '/images/cabana-mirante.svg', imageAlt: 'Cabana Mirante com vista para as montanhas da Serra Gaúcha' },
  ],
  experience: {
    title: 'Mais do que uma hospedagem, uma experiência.',
    items: [
      { title: 'Privacidade e tranquilidade', text: 'Silêncio, espaço e a sensação de ter a serra só para você.', image: '/images/exp-privacidade.svg', imageAlt: 'Mata nativa tranquila' },
      { title: 'Contato com a natureza', text: 'Acorde com o canto dos pássaros e o cheiro de mata fresca.', image: '/images/exp-natureza.svg', imageAlt: 'Vegetação e montanhas ao entardecer' },
      { title: 'Momentos especiais em meio à serra', text: 'Cenário perfeito para celebrar, descansar e criar boas memórias.', image: '/images/exp-momentos.svg', imageAlt: 'Cabana acesa ao entardecer' },
    ],
  },
  gallery: [
    ['galeria-1', 'Cabana ao pôr do sol'], ['galeria-2', 'Névoa sobre as montanhas'], ['galeria-3', 'Vista da serra ao entardecer'],
    ['galeria-4', 'Cabana entre as árvores'], ['galeria-5', 'Bosque de pinheiros'], ['galeria-6', 'Paisagem da propriedade'],
  ].map(([f, alt], i) => ({ id: `g${i + 1}`, src: `/images/${f}.svg`, alt })),
  location: {
    title: 'Seu próximo refúgio está na serra.',
    text: 'Um lugar especial para desacelerar, respirar fundo e aproveitar a tranquilidade da natureza.',
    address: '', mapUrl: '',
  },
  contact: {
    whatsapp: '', phone: '', instagram: '',
    messageCabin: 'Olá! Gostaria de consultar a disponibilidade da {cabana}.',
    messageGeneral: 'Olá! Gostaria de consultar a disponibilidade para uma estadia.',
  },
  finalCta: {
    title: 'Permita-se viver essa experiência.',
    subtitle: 'Entre em contato e descubra sua próxima oportunidade de descanso na serra.',
    button: 'Fale conosco pelo WhatsApp',
    image: '/images/cta.svg', imageAlt: 'Cabana entre as árvores com montanhas ao fundo',
  },
  footer: { text: 'Hospedagem em meio à natureza da Serra Gaúcha.' },
}
