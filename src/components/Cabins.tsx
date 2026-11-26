import { useContent } from '../lib/store'
import { WaButton } from './WaButton'

export function Cabins() {
  const { cabins, contact } = useContent()
  return (
    <section id="acomodacoes" className="bg-sand/60 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <span className="mb-5 block h-px w-14 bg-gold" aria-hidden="true" />
          <h2 className="text-4xl text-forest sm:text-5xl">Acomodações</h2>
        </div>
        <div className="space-y-20 lg:space-y-28">
          {cabins.map((c, i) => (
            <article key={c.id} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <img src={c.image} alt={c.imageAlt} loading="lazy" className={`h-auto w-full rounded-sm shadow-xl lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`} />
              <div className="lg:col-span-5">
                <h3 className="text-3xl text-forest sm:text-4xl">{c.name}</h3>
                <p className="mt-4 leading-relaxed text-stone-700">{c.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-stone-700">
                  {c.amenities.map((a, k) => <li key={k} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />{a}</li>)}
                </ul>
                <WaButton className="mt-8" message={contact.messageCabin.replaceAll('{cabana}', c.name)}>Consultar disponibilidade</WaButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
