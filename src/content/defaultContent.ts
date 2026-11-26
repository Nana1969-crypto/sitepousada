// Conteúdo padrão do site. Tudo aqui é editável em /admin.
// As fotos em public/fotos são ILUSTRAÇÕES geradas por IA, não fotos de uma pousada real: não afirme que os itens retratados existem sem confirmar.
// Os textos de amenidades são EXEMPLOS: confirme o que realmente existe antes de publicar.
export interface Photo { src: string; alt: string }
export interface Cabin { id: string; name: string; description: string; amenities: string[]; images: Photo[] }
export interface SiteContent {
  site: { name: string; seoTitle: string; seoDescription: string }
  hero: { title: string; subtitle: string; primaryCta: string; secondaryCta: string; image: string; imageAlt: string }
  about: { title: string; text: string; image: string; imageAlt: string }
  cabins: Cabin[]
  property: { title: string; text: string; images: Photo[] }
  experience: { title: string; items: { title: string; text: string; image: string; imageAlt: string }[] }
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
    image: '/fotos/hero-panorama-propriedade.jpg', imageAlt: 'Cabanas de madeira iluminadas entre árvores, com lago e montanhas da serra ao entardecer (imagem ilustrativa)',
  },
  about: {
    title: 'Um lugar para se reconectar.',
    text: 'Em meio à natureza da Serra Gaúcha, nossas cabanas foram pensadas para proporcionar descanso, privacidade e momentos inesquecíveis. Um refúgio para quem deseja desacelerar, apreciar a paisagem e aproveitar o melhor da vida ao ar livre.',
    image: '/fotos/sobre-varanda-mirante.jpg', imageAlt: 'Varanda da Cabana Mirante com vista para as montanhas ao pôr do sol (imagem ilustrativa)',
  },
  cabins: [
    { id: 'bosque', name: 'Cabana Bosque', description: 'Um refúgio acolhedor entre as árvores, com arquitetura contemporânea, privacidade e uma vista encantadora da natureza.',
      amenities: ['Grandes janelas de vidro', 'Varanda com vista para o bosque', 'Ambiente aconchegante em madeira', 'Exemplo editável: roupa de cama de qualidade'],
      images: [
        { src: '/fotos/bosque-externa.jpg', alt: 'Cabana Bosque — exterior de madeira, pedra e vidro, com varanda, árvores e montanhas ao entardecer (imagem ilustrativa)' },
        { src: '/fotos/bosque-sala-lareira.jpg', alt: 'Cabana Bosque — sala de estar com lareira e cozinha integrada (imagem ilustrativa)' },
        { src: '/fotos/bosque-suite.jpg', alt: 'Cabana Bosque — quarto com cama de casal e janela para a mata (imagem ilustrativa)' },
        { src: '/fotos/bosque-mezanino.jpg', alt: 'Cabana Bosque — mezanino com teto de madeira e vista pela janela triangular (imagem ilustrativa)' },
        { src: '/fotos/bosque-cozinha-jantar.jpg', alt: 'Cabana Bosque — cozinha e mesa de jantar (imagem ilustrativa)' },
        { src: '/fotos/bosque-banheiro.jpg', alt: 'Cabana Bosque — banheiro com ducha e bancada (imagem ilustrativa)' },
        { src: '/fotos/bosque-varanda.jpg', alt: 'Cabana Bosque — varanda com vista para as montanhas ao entardecer (imagem ilustrativa)' },
      ] },
    { id: 'mirante', name: 'Cabana Mirante', description: 'Uma cabana cercada pela paisagem da serra, ideal para contemplar as montanhas, descansar e aproveitar momentos especiais.',
      amenities: ['Vista para as montanhas', 'Deck para contemplação', 'Isolamento e tranquilidade', 'Exemplo editável: lareira ou aquecimento'],
      images: [
        { src: '/fotos/mirante-externa.jpg', alt: 'Cabana Mirante — exterior de madeira e pedra com varanda, jardim e vista para as montanhas ao entardecer (imagem ilustrativa)' },
      ] },
  ],
  property: {
    title: 'A propriedade.',
    text: 'Caminhos, jardins e recantos pensados para desacelerar ao ar livre, com a paisagem da serra ao redor.',
    images: [
      { src: '/fotos/propriedade-cabanas-na-colina.jpg', alt: 'As cabanas na colina, entre árvores e jardins (imagem ilustrativa)' },
      { src: '/fotos/propriedade-quiosque-pergola.jpg', alt: 'Quiosque com pérgola, sofás e luzes aconchegantes (imagem ilustrativa)' },
      { src: '/fotos/propriedade-deck-lago.jpg', alt: 'Deck de madeira à beira do lago (imagem ilustrativa)' },
      { src: '/fotos/propriedade-lago-reflexos.jpg', alt: 'Lago com reflexos do entardecer (imagem ilustrativa)' },
      { src: '/fotos/propriedade-jardim-hortensias.jpg', alt: 'Jardim com hortênsias e pedras (imagem ilustrativa)' },
      { src: '/fotos/propriedade-montanhas.jpg', alt: 'Montanhas da serra ao entardecer (imagem ilustrativa)' },
    ],
  },
  experience: {
    title: 'Mais do que uma hospedagem, uma experiência.',
    items: [
      { title: 'Privacidade e tranquilidade', text: 'Silêncio, espaço e a sensação de ter a serra só para você.', image: '/fotos/bosque-varanda.jpg', imageAlt: 'Varanda da Cabana Bosque com vista para as montanhas ao entardecer (imagem ilustrativa)' },
      { title: 'Contato com a natureza', text: 'Acorde com o canto dos pássaros e o cheiro de mata fresca.', image: '/fotos/exp-recanto-fogueira.jpg', imageAlt: 'Recanto ao ar livre com fogueira, jardim e hortênsias (imagem ilustrativa)' },
      { title: 'Momentos especiais em meio à serra', text: 'Cenário perfeito para celebrar, descansar e criar boas memórias.', image: '/fotos/bosque-sala-lareira.jpg', imageAlt: 'Sala de estar da Cabana Bosque, com lareira acesa e cozinha integrada (imagem ilustrativa)' },
    ],
  },
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
    image: '/fotos/cta-vista-propriedade.jpg', imageAlt: 'Vista da propriedade, com árvores, campo e montanhas da serra (imagem ilustrativa)',
  },
  footer: { text: 'Hospedagem em meio à natureza da Serra Gaúcha.' },
}
