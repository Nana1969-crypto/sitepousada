import { useContent } from '../lib/store'
import { WaButton } from './WaButton'

export function Hero() {
  const { hero } = useContent()
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden text-offwhite">
      <img src={hero.image} alt={hero.imageAlt} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[42%_center]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-forest-dark/60 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/35 to-forest-dark/20" aria-hidden="true" />
      <div className="reveal relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pb-24">
        <h1 className="max-w-3xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">{hero.title}</h1>
        <p className="mt-6 max-w-xl text-lg text-offwhite/90 sm:text-xl">{hero.subtitle}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <WaButton variant="light">{hero.primaryCta}</WaButton>
          <a href="#acomodacoes" className="inline-flex min-h-12 items-center justify-center rounded-full border border-offwhite/70 px-7 py-3 text-sm font-medium tracking-wide transition hover:bg-offwhite/15">{hero.secondaryCta}</a>
        </div>
      </div>
    </section>
  )
}
