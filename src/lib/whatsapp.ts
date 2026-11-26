export const onlyDigits = (v: string) => v.replace(/\D/g, '')
/** https://wa.me/NUMERO?text=... — número só com dígitos (com DDI, ex.: 5554...). Retorna null se não configurado. */
export function whatsappLink(number: string, message?: string): string | null {
  const n = onlyDigits(number)
  if (!n) return null
  return `https://wa.me/${n}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}
