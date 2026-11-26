import { useRef, useState, type KeyboardEvent } from 'react'
import type { Photo } from '../content/defaultContent'

/** Carrossel por rolagem com snap: funciona com deslizar no celular, setas, pontos e teclado (← →). */
export function Carousel({ photos, label, priority }: { photos: Photo[]; label: string; priority?: boolean }) {
  const track = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const n = photos.length
  const go = (k: number) => {
    const el = track.current; if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: ((k + n) % n) * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
  }
  const onScroll = () => { const el = track.current; if (el) setI(Math.round(el.scrollLeft / el.clientWidth)) }
  const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1) } if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1) } }
  if (!n) return null
  const btn = 'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-2xl text-white backdrop-blur transition hover:bg-black/65'
  return (
    <div role="region" aria-roledescription="carrossel" aria-label={label} className="relative overflow-hidden rounded-sm bg-forest-dark shadow-xl" onKeyDown={onKey}>
      <div className="relative">
      <div ref={track} tabIndex={0} onScroll={onScroll} aria-live="polite" className="flex aspect-[16/9] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {photos.map((p, k) => (
          <img key={k} src={p.src} alt={p.alt} loading={k === 0 && priority ? 'eager' : 'lazy'} draggable={false}
            role="group" aria-roledescription="slide" aria-label={`${k + 1} de ${n}`} className="h-full w-full shrink-0 snap-center object-contain" />
        ))}
      </div>
      {n > 1 && <>
        <button type="button" aria-label="Foto anterior" onClick={() => go(i - 1)} className={`${btn} left-3`}>‹</button>
        <button type="button" aria-label="Próxima foto" onClick={() => go(i + 1)} className={`${btn} right-3`}>›</button>
      </>}
      </div>
      {n > 1 && (
        <div className="flex justify-center">
          {photos.map((_, k) => (
            <button key={k} type="button" aria-label={`Ir para a foto ${k + 1}`} aria-current={k === i} onClick={() => go(k)} className="flex h-8 w-6 items-center justify-center">
              <span className={`h-2 rounded-full transition-all ${k === i ? 'w-5 bg-white' : 'w-2 bg-white/55'}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
