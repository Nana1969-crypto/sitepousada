import { useContent } from '../lib/store'
export function Location() {
  const { location } = useContent()
  return (
    <section id="localizacao" className="bg-sand/60 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="text-4xl text-forest sm:text-5xl">{location.title}</h2>
        <p className="mt-6 text-lg leading-relaxed text-stone-700">{location.text}</p>
        {location.address && <p className="mt-6 font-medium text-forest">{location.address}</p>}
        {location.mapUrl && <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-full border border-forest px-7 text-sm font-medium text-forest transition hover:bg-forest hover:text-offwhite">Ver no mapa</a>}
      </div>
    </section>
  )
}
