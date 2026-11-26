import { useEffect, useState } from 'react'
import { useContent } from '../lib/store'
import { whatsappLink } from '../lib/whatsapp'
import { WaIcon } from './WaButton'

export function WhatsAppFab() {
  const { contact } = useContent()
  const [toast, setToast] = useState(false)
  useEffect(() => {
    let t: number
    const h = () => { setToast(true); clearTimeout(t); t = window.setTimeout(() => setToast(false), 5000) }
    window.addEventListener('wa-missing', h)
    return () => { window.removeEventListener('wa-missing', h); clearTimeout(t) }
  }, [])
  const href = whatsappLink(contact.whatsapp, contact.messageGeneral)
  const cls = 'fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f7a4a] text-white shadow-lg shadow-black/25 transition hover:scale-105'
  return (
    <>
      {href
        ? <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Falar pelo WhatsApp" className={cls}><WaIcon className="h-7 w-7" /></a>
        : <button type="button" aria-label="Falar pelo WhatsApp" className={cls} onClick={() => window.dispatchEvent(new CustomEvent('wa-missing'))}><WaIcon className="h-7 w-7" /></button>}
      {toast && <div role="status" className="fixed bottom-24 right-5 z-40 max-w-xs rounded-lg bg-forest-dark px-4 py-3 text-sm text-offwhite shadow-xl">WhatsApp ainda não configurado. Defina o número em <strong>/admin → Contato e localização</strong>.</div>}
    </>
  )
}
