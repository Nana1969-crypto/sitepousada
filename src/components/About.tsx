import { useContent } from '../lib/store'
import { Carousel } from './Carousel'
export function About() {
  const { about } = useContent()
  return (
    <section id="sobre" className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-32">
      <div>
        <span className="mb-5 block h-px w-14 bg-gold" aria-hidden="true" />
        <h2 className="text-4xl leading-tight text-forest sm:text-5xl">{about.title}</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-700">{about.text}</p>
      </div>
      <Carousel photos={about.images} label="Fotos para se reconectar" />
    </section>
  )
}
