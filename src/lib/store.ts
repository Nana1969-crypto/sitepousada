import { useSyncExternalStore } from 'react'
import { defaultContent, type SiteContent } from '../content/defaultContent'

// PERSISTÊNCIA DE DEMONSTRAÇÃO: grava no localStorage do navegador de quem edita.
// Outros visitantes NÃO veem as alterações. Para produção é preciso backend + banco + upload de imagens
// (ver README). Funciona como "camada de dados" trocável: basta reimplementar load/save.
const KEY = 'refugio.content.v1'
export const PREVIEW = 'refugio.preview'
const listeners = new Set<() => void>()
let cache: SiteContent | null = null

function merge<T>(base: T, over: unknown): T {
  if (Array.isArray(base)) return (Array.isArray(over) ? over : base) as T
  if (base && typeof base === 'object') {
    const o = (over && typeof over === 'object' ? over : {}) as Record<string, unknown>
    return Object.fromEntries(Object.entries(base).map(([k, v]) => [k, merge(v, o[k])])) as T
  }
  return (typeof over === typeof base ? over : base) as T
}
export function loadContent(): SiteContent {
  if (cache) return cache
  try {
    // Prévia do painel: o iframe /?preview=1 lê o rascunho (não salvo) do sessionStorage.
    const draft = new URLSearchParams(location.search).get('preview') ? sessionStorage.getItem(PREVIEW) : null
    const raw = draft ?? localStorage.getItem(KEY); cache = raw ? merge(defaultContent, JSON.parse(raw)) : defaultContent
  }
  catch { cache = defaultContent }
  return cache!
}
export function saveContent(c: SiteContent): { ok: boolean; error?: string } {
  try { localStorage.setItem(KEY, JSON.stringify(c)) } catch { return { ok: false, error: 'Não foi possível salvar: o armazenamento do navegador está cheio (imagens muito grandes) ou bloqueado.' } }
  cache = c; listeners.forEach((l) => l()); return { ok: true }
}
export function resetContent() { try { localStorage.removeItem(KEY) } catch { /* ignore */ } cache = defaultContent; listeners.forEach((l) => l()) }
const subscribe = (cb: () => void) => { listeners.add(cb); window.addEventListener('storage', onStorage); return () => { listeners.delete(cb); window.removeEventListener('storage', onStorage) } }
function onStorage(e: StorageEvent) { if (e.key === KEY) { cache = null; listeners.forEach((l) => l()) } }
export const useContent = () => useSyncExternalStore(subscribe, loadContent, () => defaultContent)
