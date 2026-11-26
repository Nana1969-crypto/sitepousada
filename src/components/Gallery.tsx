import { useCallback, useEffect, useRef, useState } from 'react'
import { useContent } from '../lib/store'

export function Gallery() {
  const { gallery } = useContent()
  const [idx, setIdx] = useState<number | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const n = gallery.length
  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + n) % n)), [n])
  const close = useCallback(() => { setIdx(null); opener.current?.focus() }, [])
  useEffect(() => {
    if (idx === null) return
    document.body.style.overflow = 'hidden'; closeBtn.current?.focus()
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [idx === null, go, close]) // eslint-disable-line react-hooks/exhaustive-deps
  const touch = useRef(0)
  if (!n) return null
  const cur = idx === null ? null : gallery[Math.min(idx, n - 1)]
  return (
    <section id="galeria" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-32">
      <span className="mb-5 block h-px w-14 bg-gold" aria-hidden="true" />
      <h2 className="mb-12 text-4xl text-forest sm:text-5xl">Galeria</h2>
      <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {gallery.map((g, i) => (
          <button key={g.id} type="button" aria-label={`Ampliar: ${g.alt}`} onClick={(e) => { opener.current = e.currentTarget; setIdx(i) }} className="group mb-3 block w-full overflow-hidden rounded-sm sm:mb-4">
            <img src={g.src} alt={g.alt} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>
      {cur && (
        <div role="dialog" aria-modal="true" aria-label="Galeria ampliada" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={close} onTouchStart={(e) => (touch.current = e.touches[0].clientX)} onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) go(d < 0 ? 1 : -1) }}>
          <img src={cur.src} alt={cur.alt} onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-full object-contain" />
          <p className="absolute bottom-5 left-0 right-0 px-16 text-center text-sm text-white/80">{cur.alt} · {(idx ?? 0) + 1}/{n}</p>
          <button ref={closeBtn} aria-label="Fechar" onClick={(e) => { e.stopPropagation(); close() }} className="absolute right-3 top-3 h-12 w-12 text-3xl text-white">×</button>
          {n > 1 && <>
            <button aria-label="Foto anterior" onClick={(e) => { e.stopPropagation(); go(-1) }} className="absolute left-2 top-1/2 h-12 w-12 -translate-y-1/2 text-4xl text-white">‹</button>
            <button aria-label="Próxima foto" onClick={(e) => { e.stopPropagation(); go(1) }} className="absolute right-2 top-1/2 h-12 w-12 -translate-y-1/2 text-4xl text-white">›</button>
          </>}
        </div>
      )}
    </section>
  )
}
