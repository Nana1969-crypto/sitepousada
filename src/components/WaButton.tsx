import type { ReactNode } from 'react'
import { useContent } from '../lib/store'
import { whatsappLink } from '../lib/whatsapp'

export const WaIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.300 1.700 2.100 1.200 1 2.200 1.400 2.500 1.500.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.900.9c.3.1.5.2.5.3.1.2.1.7-.1 1.300Z"/></svg>
)

/** Botão/link de WhatsApp. Sem número configurado, avisa em vez de abrir um link quebrado. */
export function WaButton({ message, variant = 'solid', children, className = '' }: { message?: string; variant?: 'solid' | 'light' | 'outline'; children: ReactNode; className?: string }) {
  const { contact } = useContent()
  const href = whatsappLink(contact.whatsapp, message ?? contact.messageGeneral)
  const styles = {
    solid: 'bg-forest text-offwhite hover:bg-forest-dark',
    light: 'bg-offwhite text-forest hover:bg-white',
    outline: 'border border-forest text-forest hover:bg-forest hover:text-offwhite',
  }[variant]
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors ${styles} ${className}`
  if (!href) return (
    <button type="button" className={cls} onClick={() => window.dispatchEvent(new CustomEvent('wa-missing'))}>{children}</button>
  )
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
}
