import { useContent } from '../lib/store'
import { whatsappLink } from '../lib/whatsapp'
export function Footer() {
  const { site, contact, location, footer } = useContent()
  const wa = whatsappLink(contact.whatsapp)
  const ig = contact.instagram && (contact.instagram.startsWith('http') ? contact.instagram : `https://instagram.com/${contact.instagram.replace('@', '')}`)
  return (
    <footer className="bg-forest-dark pb-10 pt-16 text-sm text-offwhite/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 lg:px-8">
        <div><p className="font-serif text-2xl text-offwhite">{site.name}</p><p className="mt-3 max-w-xs">{footer.text}</p></div>
        <nav aria-label="Rodapé"><ul className="space-y-2">
          {[['#inicio', 'Início'], ['#acomodacoes', 'Acomodações'], ['#propriedade', 'Propriedade'], ['#experiencia', 'Experiência'], ['#localizacao', 'Localização']].map(([h, l]) => <li key={h}><a href={h} className="hover:text-gold">{l}</a></li>)}
        </ul></nav>
        <ul className="space-y-2">
          <li>WhatsApp: {wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{contact.phone || contact.whatsapp}</a> : <span className="opacity-60">a configurar</span>}</li>
          <li>Instagram: {ig ? <a href={ig} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{contact.instagram}</a> : <span className="opacity-60">a configurar</span>}</li>
          <li>Endereço: {location.address || <span className="opacity-60">a configurar</span>}</li>
        </ul>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-5 pt-6 lg:px-8">© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
    </footer>
  )
}
