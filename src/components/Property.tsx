import { useContent } from '../lib/store'
import { Carousel } from './Carousel'

export function Property() {
  const { property } = useContent()
  return (
    <section id="propriedade" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-32">
      <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
        <div>
          <span className="mb-5 block h-px w-14 bg-gold" aria-hidden="true" />
          <h2 className="text-4xl text-forest sm:text-5xl">{property.title}</h2>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-stone-700">{property.text}</p>
      </div>
      <Carousel photos={property.images} label="Fotos da área externa da propriedade" />
    </section>
  )
}
