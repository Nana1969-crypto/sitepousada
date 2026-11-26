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
const MIN_SLOTS = 10
function EmptySlot({ n, onFile, disabled }: { n: number; onFile: (f: File) => void; disabled: boolean }) {
  const id = useId()
  return (
    <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-dashed border-stone-300 bg-white/60 p-3">
      <span className="text-sm text-stone-500">Espaço livre: foto {n}</span>
      <label htmlFor={id} className={`inline-flex min-h-10 items-center rounded-lg px-4 text-sm ${disabled ? 'cursor-not-allowed bg-stone-200 text-stone-400' : 'cursor-pointer bg-forest text-white hover:bg-forest-dark'}`}>Enviar foto</label>
      <input id={id} type="file" accept="image/*" disabled={disabled} className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) onFile(f) }} />
    </div>
  )
}
export function PhotoList({ photos, update }: { photos: { src: string; alt: string }[]; update: (fn: (l: { src: string; alt: string }[]) => void) => void; placeholder?: string }) {
  const b = 'min-h-10 rounded border px-3 text-sm disabled:opacity-30'
  return (
    <>
      {photos.map((im, k) => (
        <div key={k}>
          <ImageField label={`Foto ${k + 1}`} src={im.src} alt={im.alt} onSrc={(v) => update((l) => (l[k].src = v))} onAlt={(v) => update((l) => (l[k].alt = v))} />
          <div className="-mt-3 mb-6 flex flex-wrap gap-2">
            <button disabled={k === 0} onClick={() => update((l) => { [l[k - 1], l[k]] = [l[k], l[k - 1]] })} className={b}>↑ Subir</button>
            <button disabled={k === photos.length - 1} onClick={() => update((l) => { [l[k + 1], l[k]] = [l[k], l[k + 1]] })} className={b}>↓ Descer</button>
            <button onClick={() => update((l) => { l.splice(k, 1) })} className={`${b} border-red-300 text-red-700`}>Remover</button>
          </div>
        </div>
      ))}
      {Array.from({ length: Math.max(0, MIN_SLOTS - photos.length) }, (_, j) => <EmptySlot key={j} n={photos.length + j + 1} onFile={async (file) => {
        try { const src = await fileToDataUrl(file); update((l) => { l.push({ src, alt: file.name.replace(/\.[^.]+$/, '') }) }) } catch { /* ignora arquivo inválido */ }
      }} disabled={false} />)}
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-forest px-5 text-sm text-white hover:bg-forest-dark">
          + Enviar várias fotos
          <input type="file" accept="image/*" multiple className="sr-only" onChange={async (e) => {
            const files = Array.from(e.target.files ?? []); e.target.value = ''
            const imgs: { src: string; alt: string }[] = []
            for (const f of files) { try { imgs.push({ src: await fileToDataUrl(f), alt: f.name.replace(/\.[^.]+$/, '') }) } catch { /* ignora arquivo inválido */ } }
            if (imgs.length) update((l) => { l.push(...imgs) })
          }} />
        </label>
      </div>
      <p className="mt-2 text-xs text-stone-500">{photos.length} de {Math.max(MIN_SLOTS, photos.length)} espaços preenchidos. Os espaços livres não aparecem no site. Não há limite de fotos; nesta demonstração, muitas fotos enviadas podem encher o armazenamento do navegador (as imagens são reduzidas automaticamente). Lembre de preencher o texto alternativo.</p>
    </>
  )
}
export const Card = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mb-8 rounded-2xl border border-stone-200 bg-stone-50/60 p-5 sm:p-6">
    <h2 className="mb-5 font-sans text-lg font-semibold text-forest">{title}</h2>{children}
  </section>
)
