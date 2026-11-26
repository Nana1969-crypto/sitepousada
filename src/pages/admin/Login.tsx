import { useState } from 'react'
import { hasPassword, login, setPassword } from '../../lib/auth'

export default function Login({ onDone }: { onDone: () => void }) {
  const first = !hasPassword()
  const [pw, setPw] = useState(''), [pw2, setPw2] = useState(''), [err, setErr] = useState(''), [busy, setBusy] = useState(false)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr('')
    if (first) {
      if (pw.length < 8) return setErr('Use ao menos 8 caracteres.')
      if (pw !== pw2) return setErr('As senhas não coincidem.')
    }
    setBusy(true)
    try { if (first) { await setPassword(pw); onDone() } else if (await login(pw)) onDone(); else setErr('Senha incorreta.') }
    catch { setErr('Este navegador não permite criar o acesso (armazenamento ou criptografia bloqueados).') }
    setBusy(false)
  }
  const cls = 'w-full rounded-lg border border-stone-300 px-3 py-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20'
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand/50 p-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="font-serif text-3xl text-forest">Painel administrativo</h1>
        <p className="mt-2 text-sm text-stone-600">{first ? 'Primeiro acesso: crie uma senha para este painel.' : 'Entre com a sua senha.'}</p>
        <label className="mt-6 block text-sm font-medium" htmlFor="pw">Senha</label>
        <input id="pw" type="password" autoComplete={first ? 'new-password' : 'current-password'} className={cls} value={pw} onChange={(e) => setPw(e.target.value)} required />
        {first && <><label className="mt-4 block text-sm font-medium" htmlFor="pw2">Repita a senha</label>
          <input id="pw2" type="password" autoComplete="new-password" className={cls} value={pw2} onChange={(e) => setPw2(e.target.value)} required /></>}
        {err && <p role="alert" className="mt-3 text-sm text-red-700">{err}</p>}
        <button disabled={busy} className="mt-6 min-h-12 w-full rounded-full bg-forest text-sm font-medium text-white hover:bg-forest-dark disabled:opacity-60">{first ? 'Criar senha e entrar' : 'Entrar'}</button>
        <p className="mt-6 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-900"><strong>Aviso:</strong> esta é uma proteção de demonstração, executada apenas no navegador. Não é segurança real — para publicar, o login precisa ser feito em um servidor (veja o README).</p>
      </form>
    </div>
  )
}
