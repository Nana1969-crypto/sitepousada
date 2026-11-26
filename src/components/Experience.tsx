import { useContent } from '../lib/store'
export function Experience() {
  const { experience } = useContent()
  return (
    <section id="experiencia" className="bg-forest py-20 text-offwhite lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-4xl leading-tight sm:text-5xl">{experience.title}</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {experience.items.map((it, i) => (
            <div key={i}>
              <img src={it.image} alt={it.imageAlt} loading="lazy" className="aspect-[3/4] w-full rounded-sm object-cover" />
              <h3 className="mt-6 text-2xl text-gold">{it.title}</h3>
              <p className="mt-2 leading-relaxed text-offwhite/80">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
