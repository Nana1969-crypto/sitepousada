import { useId, useState, type ReactNode } from 'react'
import { fileToDataUrl } from '../../lib/image'

const input = 'w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-800 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20'
export function Field({ label, hint, value, onChange, multiline, rows = 3, placeholder, inputMode }: { label: string; hint?: string; value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number; placeholder?: string; inputMode?: 'tel' | 'url' | 'text' }) {
  const id = useId()
  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-stone-700">{label}</label>
      {multiline
        ? <textarea id={id} rows={rows} className={input} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        : <input id={id} className={input} value={value} inputMode={inputMode} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />}
      {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
    </div>
  )
}
export function ImageField({ label, src, alt, onSrc, onAlt }: { label: string; src: string; alt: string; onSrc: (v: string) => void; onAlt: (v: string) => void }) {
  const id = useId()
  const [err, setErr] = useState('')
  return (
    <div className="mb-6 grid gap-4 rounded-xl border border-stone-200 bg-white p-4 sm:grid-cols-[160px_1fr]">
      <img src={src} alt={alt} className="aspect-[4/3] w-full rounded-lg bg-stone-100 object-cover" />
      <div>
        <p className="mb-2 text-sm font-medium text-stone-700">{label}</p>
        <label htmlFor={id} className="inline-flex min-h-10 cursor-pointer items-center rounded-lg bg-forest px-4 text-sm text-white hover:bg-forest-dark">Enviar foto</label>
        <input id={id} type="file" accept="image/*" className="sr-only" onChange={async (e) => {
          const f = e.target.files?.[0]; if (!f) return
          try { setErr(''); onSrc(await fileToDataUrl(f)) } catch (x) { setErr((x as Error).message) }
          e.target.value = ''
        }} />
        <div className="mt-3"><Field label="ou endereço (URL) da imagem" value={src.startsWith('data:') ? '' : src} placeholder={src.startsWith('data:') ? '(foto enviada do computador)' : ''} onChange={onSrc} inputMode="url" /></div>
        <Field label="Texto alternativo (acessibilidade e SEO)" value={alt} onChange={onAlt} />
        {err && <p role="alert" className="text-sm text-red-700">{err}</p>}
      </div>
    </div>
  )
}
export const Card = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mb-8 rounded-2xl border border-stone-200 bg-stone-50/60 p-5 sm:p-6">
    <h2 className="mb-5 font-sans text-lg font-semibold text-forest">{title}</h2>{children}
  </section>
)
