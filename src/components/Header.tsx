import { useEffect, useState } from 'react'
import { useContent } from '../lib/store'
import { WaButton } from './WaButton'

const links = [['#inicio', 'Início'], ['#acomodacoes', 'Acomodações'], ['#experiencia', 'Experiência'], ['#localizacao', 'Localização']]

export function Header() {
  const { site } = useContent()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [open])
  const bg = solid || open ? 'bg-forest-dark/95 backdrop-blur shadow-md' : 'bg-transparent'
  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-offwhite transition-colors duration-300 ${bg}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#inicio" className="font-serif text-2xl tracking-wide">{site.name}</a>
        <nav aria-label="Principal" className="hidden items-center gap-9 text-sm md:flex">
          {links.map(([h, l]) => <a key={h} href={h} className="opacity-90 transition hover:opacity-100 hover:text-gold">{l}</a>)}
          <WaButton variant="light" className="!min-h-10 !px-5">Consultar disponibilidade</WaButton>
        </nav>
        <button className="flex h-12 w-12 items-center justify-center md:hidden" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(!open)}>
          <span className="relative block h-4 w-6">
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all ${open ? 'top-2 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all ${open ? 'top-2 -rotate-45' : 'top-4'}`} />
          </span>
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Menu móvel" className="flex flex-col gap-1 px-5 pb-6 md:hidden">
          {links.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-lg">{l}</a>)}
          <WaButton variant="light" className="mt-4">Consultar disponibilidade</WaButton>
        </nav>
      )}
    </header>
  )
}
