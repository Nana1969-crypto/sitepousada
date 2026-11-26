// AUTENTICAÇÃO DE DEMONSTRAÇÃO — NÃO É SEGURANÇA REAL.
// Sem backend, tudo roda no navegador: a senha (hash PBKDF2 com salt) fica no localStorage do dispositivo
// e qualquer pessoa com acesso ao navegador/DevTools pode contornar. Nenhuma senha fixa existe no código:
// no primeiro acesso o proprietário CRIA a senha. Em produção, use autenticação no servidor (ver README).
const KEY = 'refugio.auth.v1', SESSION = 'refugio.session'
const b64 = (b: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(b)))
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))
async function hash(pw: string, salt: Uint8Array) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits'])
  return b64(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: salt as BufferSource, iterations: 200000, hash: 'SHA-256' }, k, 256))
}
export const hasPassword = () => { try { return !!localStorage.getItem(KEY) } catch { return false } }
export const isLoggedIn = () => { try { return sessionStorage.getItem(SESSION) === '1' } catch { return false } }
export const logout = () => { try { sessionStorage.removeItem(SESSION) } catch { /* ignore */ } }
export async function setPassword(pw: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  localStorage.setItem(KEY, JSON.stringify({ salt: b64(salt.buffer), h: await hash(pw, salt) }))
  sessionStorage.setItem(SESSION, '1')
}
export async function login(pw: string) {
  try {
    const { salt, h } = JSON.parse(localStorage.getItem(KEY) || '')
    if ((await hash(pw, unb64(salt))) === h) { sessionStorage.setItem(SESSION, '1'); return true }
  } catch { /* ignore */ }
  return false
}
export const forgetPassword = () => { try { localStorage.removeItem(KEY) } catch { /* ignore */ } logout() }
