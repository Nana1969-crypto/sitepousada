import { useContent } from '../lib/store'
import { WaButton, WaIcon } from './WaButton'
export function FinalCta() {
  const { finalCta } = useContent()
  return (
    <section id="contato" className="relative flex min-h-[70svh] items-center overflow-hidden text-center text-offwhite">
      <img src={finalCta.image} alt={finalCta.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-forest-dark/60" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-5 py-24">
        <h2 className="text-4xl leading-tight sm:text-6xl">{finalCta.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-offwhite/90">{finalCta.subtitle}</p>
        <WaButton variant="light" className="mt-9"><WaIcon />{finalCta.button}</WaButton>
      </div>
    </section>
  )
}
