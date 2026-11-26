import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn, logout, forgetPassword } from '../../lib/auth'
import { PREVIEW, loadContent, resetContent, saveContent } from '../../lib/store'
import { defaultContent, type SiteContent } from '../../content/defaultContent'
import { whatsappLink, onlyDigits } from '../../lib/whatsapp'
import { Card, Field, ImageField, PhotoList } from './fields'
import Login from './Login'

const tabs = ['Visão geral', 'Página inicial', 'Acomodações', 'Contato e localização', 'Configurações'] as const
type Tab = (typeof tabs)[number]

export default function Admin() {
  const [auth, setAuth] = useState(isLoggedIn())
  useEffect(() => { document.title = 'Painel | Refúgio da Serra'; const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex'; document.head.appendChild(m); return () => m.remove() }, [])
  if (!auth) return <Login onDone={() => setAuth(true)} />
  return <Panel onLogout={() => { logout(); setAuth(false) }} />
}

function Panel({ onLogout }: { onLogout: () => void }) {
  const [saved, setSaved] = useState<SiteContent>(loadContent)
  const [d, setD] = useState<SiteContent>(saved)
  const [tab, setTab] = useState<Tab>('Visão geral')
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null)
  const [preview, setPreview] = useState(false)
  const dirty = useMemo(() => JSON.stringify(d) !== JSON.stringify(saved), [d, saved])
  useEffect(() => { if (!dirty) return; const h = (e: BeforeUnloadEvent) => e.preventDefault(); window.addEventListener('beforeunload', h); return () => window.removeEventListener('beforeunload', h) }, [dirty])
  const up = (fn: (c: SiteContent) => void) => setD((p) => { const c = structuredClone(p); fn(c); return c })
  const save = () => { const r = saveContent(d); if (r.ok) setSaved(d); setMsg({ ok: r.ok, t: r.ok ? 'Alterações salvas neste navegador.' : r.error! }) }
  const reset = () => { if (confirm('Restaurar todo o conteúdo padrão? As alterações salvas serão perdidas.')) { resetContent(); setSaved(defaultContent); setD(defaultContent); setMsg({ ok: true, t: 'Conteúdo padrão restaurado.' }) } }
  const openPreview = () => { try { sessionStorage.setItem(PREVIEW, JSON.stringify(d)) } catch { /* ignore */ } setPreview(true) }
  const waOk = !!whatsappLink(d.contact.whatsapp)

  return (
    <div className="min-h-screen bg-white text-stone-800 md:flex">
      <aside className="bg-forest-dark text-offwhite md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0">
        <div className="flex items-center justify-between px-5 py-4 md:block"><p className="font-serif text-2xl">{d.site.name}</p><p className="hidden text-xs text-offwhite/60 md:block">Painel de conteúdo</p></div>
        <nav aria-label="Painel" className="flex gap-1 overflow-x-auto px-3 pb-3 md:block md:space-y-1 md:px-3">
          {tabs.map((t) => <button key={t} onClick={() => setTab(t)} aria-current={tab === t} className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-left text-sm md:w-full ${tab === t ? 'bg-white/15 text-white' : 'text-offwhite/70 hover:bg-white/10'}`}>{t}</button>)}
        </nav>
        <div className="hidden px-3 pt-6 md:block"><Link to="/" className="block rounded-lg px-4 py-2.5 text-sm text-offwhite/70 hover:bg-white/10">← Ver site</Link><button onClick={onLogout} className="w-full rounded-lg px-4 py-2.5 text-left text-sm text-offwhite/70 hover:bg-white/10">Sair</button></div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-20 flex flex-wrap items-center gap-2 border-b border-stone-200 bg-white/95 px-5 py-3 backdrop-blur">
          <h1 className="mr-auto font-sans text-lg font-semibold text-forest">{tab}</h1>
          {dirty && <span className="text-xs text-amber-700">Alterações não salvas</span>}
          <button onClick={openPreview} className="min-h-10 rounded-full border border-forest px-4 text-sm text-forest hover:bg-forest hover:text-white">Prévia</button>
          <button onClick={save} disabled={!dirty} className="min-h-10 rounded-full bg-forest px-5 text-sm text-white hover:bg-forest-dark disabled:opacity-40">Salvar alterações</button>
        </div>
        {msg && <div role="status" className={`mx-5 mt-4 rounded-lg p-3 text-sm ${msg.ok ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'}`}>{msg.t}</div>}
        <main className="max-w-3xl p-5 sm:p-8">
          {tab === 'Visão geral' && <Card title="Bem-vindo">
            <p className="text-sm leading-relaxed text-stone-700">Edite os textos e as fotos do site nas seções ao lado, use <strong>Prévia</strong> para conferir e <strong>Salvar alterações</strong> para aplicar.</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{waOk ? '✅' : '⚠️'} WhatsApp: {waOk ? `configurado (${onlyDigits(d.contact.whatsapp)})` : 'ainda não configurado — os botões do site não abrem conversa até você preencher.'}</li>
              <li>{d.location.address ? '✅' : '⚠️'} Endereço: {d.location.address ? 'preenchido' : 'em branco'}</li>
              <li>{d.cabins.map((c) => `${c.name}: ${c.images.length} fotos`).join(' · ')}</li>
            </ul>
            <p className="mt-5 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-900"><strong>Importante:</strong> neste modo de demonstração as alterações ficam salvas apenas neste navegador. Visitantes do site não as veem. Para publicar de verdade é necessário backend, banco de dados e login no servidor (veja o README).</p>
            <button onClick={() => setTab('Contato e localização')} className="mt-4 text-sm text-forest underline">Configurar WhatsApp</button>
          </Card>}

          {tab === 'Página inicial' && <>
            <Card title="Principal (topo do site)">
              <Field label="Título" value={d.hero.title} onChange={(v) => up((c) => (c.hero.title = v))} />
              <Field label="Subtítulo" multiline value={d.hero.subtitle} onChange={(v) => up((c) => (c.hero.subtitle = v))} />
              <Field label="Botão principal" value={d.hero.primaryCta} onChange={(v) => up((c) => (c.hero.primaryCta = v))} />
              <Field label="Botão secundário" value={d.hero.secondaryCta} onChange={(v) => up((c) => (c.hero.secondaryCta = v))} />
              <ImageField label="Foto principal (use imagem horizontal e ampla)" src={d.hero.image} alt={d.hero.imageAlt} onSrc={(v) => up((c) => (c.hero.image = v))} onAlt={(v) => up((c) => (c.hero.imageAlt = v))} />
            </Card>
            <Card title="Apresentação da pousada">
              <Field label="Título" value={d.about.title} onChange={(v) => up((c) => (c.about.title = v))} />
              <Field label="Texto" multiline rows={5} value={d.about.text} onChange={(v) => up((c) => (c.about.text = v))} />
              <ImageField label="Foto" src={d.about.image} alt={d.about.imageAlt} onSrc={(v) => up((c) => (c.about.image = v))} onAlt={(v) => up((c) => (c.about.imageAlt = v))} />
            </Card>
            <Card title="A propriedade (carrossel da área externa)">
              <Field label="Título" value={d.property.title} onChange={(v) => up((c) => (c.property.title = v))} />
              <Field label="Texto" multiline value={d.property.text} onChange={(v) => up((c) => (c.property.text = v))} />
              <PhotoList photos={d.property.images} placeholder="/fotos/propriedade-cabanas-na-colina.jpg" update={(fn) => up((c) => fn(c.property.images))} />
            </Card>
            <Card title="Experiência">
              <Field label="Título da seção" value={d.experience.title} onChange={(v) => up((c) => (c.experience.title = v))} />
              {d.experience.items.map((it, i) => <fieldset key={i} className="mb-6 border-t border-stone-200 pt-4"><legend className="text-sm font-semibold text-stone-600">Benefício {i + 1}</legend>
                <Field label="Título" value={it.title} onChange={(v) => up((c) => (c.experience.items[i].title = v))} />
                <Field label="Texto" multiline value={it.text} onChange={(v) => up((c) => (c.experience.items[i].text = v))} />
                <ImageField label="Foto" src={it.image} alt={it.imageAlt} onSrc={(v) => up((c) => (c.experience.items[i].image = v))} onAlt={(v) => up((c) => (c.experience.items[i].imageAlt = v))} /></fieldset>)}
            </Card>
            <Card title="Chamada final">
              <Field label="Título" value={d.finalCta.title} onChange={(v) => up((c) => (c.finalCta.title = v))} />
              <Field label="Subtítulo" multiline value={d.finalCta.subtitle} onChange={(v) => up((c) => (c.finalCta.subtitle = v))} />
              <Field label="Texto do botão" value={d.finalCta.button} onChange={(v) => up((c) => (c.finalCta.button = v))} />
              <ImageField label="Foto" src={d.finalCta.image} alt={d.finalCta.imageAlt} onSrc={(v) => up((c) => (c.finalCta.image = v))} onAlt={(v) => up((c) => (c.finalCta.imageAlt = v))} />
            </Card>
          </>}

          {tab === 'Acomodações' && d.cabins.map((cb, i) => (
            <Card key={cb.id} title={`Cabana ${i + 1}`}>
              <Field label="Nome" value={cb.name} onChange={(v) => up((c) => (c.cabins[i].name = v))} />
              <Field label="Descrição" multiline value={cb.description} onChange={(v) => up((c) => (c.cabins[i].description = v))} />
              <Field label="Comodidades (uma por linha)" hint="Liste apenas o que realmente existe. Os itens iniciais são exemplos." multiline rows={6} value={cb.amenities.join('\n')} onChange={(v) => up((c) => (c.cabins[i].amenities = v.split('\n')))} />
              <h3 className="mb-3 font-sans text-sm font-semibold text-stone-700">Fotos do carrossel (a primeira é a capa)</h3>
              <PhotoList photos={cb.images} placeholder="/fotos/propriedade-cabanas-na-colina.jpg" update={(fn) => up((c) => fn(c.cabins[i].images))} />
            </Card>
          ))}

          {tab === 'Contato e localização' && <>
            <Card title="WhatsApp e redes">
              <Field label="Número do WhatsApp" hint={`Com país e DDD, ex.: 5554999999999. Só números serão usados (link: https://wa.me/${onlyDigits(d.contact.whatsapp) || 'NUMERO'}).`} inputMode="tel" value={d.contact.whatsapp} onChange={(v) => up((c) => (c.contact.whatsapp = v))} />
              <Field label="Telefone para exibição (opcional)" inputMode="tel" value={d.contact.phone} onChange={(v) => up((c) => (c.contact.phone = v))} />
              <Field label="Instagram" hint="@usuario ou link completo." value={d.contact.instagram} onChange={(v) => up((c) => (c.contact.instagram = v))} />
              <Field label="Mensagem padrão do WhatsApp" multiline value={d.contact.messageGeneral} onChange={(v) => up((c) => (c.contact.messageGeneral = v))} />
              <Field label="Mensagem por cabana" hint="Use {cabana} para inserir o nome da acomodação." multiline value={d.contact.messageCabin} onChange={(v) => up((c) => (c.contact.messageCabin = v))} />
            </Card>
            <Card title="Localização">
              <Field label="Título" value={d.location.title} onChange={(v) => up((c) => (c.location.title = v))} />
              <Field label="Texto" multiline value={d.location.text} onChange={(v) => up((c) => (c.location.text = v))} />
              <Field label="Endereço" hint="Em branco, não aparece no site." value={d.location.address} onChange={(v) => up((c) => (c.location.address = v))} />
              <Field label="Link do mapa" hint="Ex.: link de compartilhamento do Google Maps." inputMode="url" value={d.location.mapUrl} onChange={(v) => up((c) => (c.location.mapUrl = v))} />
            </Card>
            <Card title="Rodapé"><Field label="Texto do rodapé" multiline value={d.footer.text} onChange={(v) => up((c) => (c.footer.text = v))} /></Card>
          </>}

          {tab === 'Configurações' && <>
            <Card title="Nome e SEO">
              <Field label="Nome da pousada" value={d.site.name} onChange={(v) => up((c) => (c.site.name = v))} />
              <Field label="Título SEO (aba do navegador/Google)" value={d.site.seoTitle} onChange={(v) => up((c) => (c.site.seoTitle = v))} />
              <Field label="Descrição SEO" multiline value={d.site.seoDescription} onChange={(v) => up((c) => (c.site.seoDescription = v))} />
            </Card>
            <Card title="Dados">
              <button onClick={reset} className="min-h-11 rounded-full border border-red-300 px-5 text-sm text-red-700 hover:bg-red-50">Restaurar conteúdo padrão</button>
              <button onClick={() => { if (confirm('Apagar a senha deste painel neste navegador?')) { forgetPassword(); onLogout() } }} className="ml-3 min-h-11 rounded-full border px-5 text-sm">Redefinir senha</button>
              <p className="mt-3 text-xs text-stone-500">Redefinir a senha só funciona neste navegador (proteção de demonstração).</p>
            </Card>
          </>}
          <button onClick={onLogout} className="mt-4 text-sm text-stone-500 underline md:hidden">Sair</button>
        </main>
      </div>
      {preview && <div role="dialog" aria-modal="true" aria-label="Prévia do site" className="fixed inset-0 z-50 flex flex-col bg-black/70 p-3 sm:p-6">
        <div className="mb-2 flex items-center justify-between text-white"><span className="text-sm">Prévia (rascunho, ainda não salvo)</span><button autoFocus onClick={() => setPreview(false)} className="min-h-10 rounded-full bg-white px-5 text-sm text-stone-900">Fechar</button></div>
        <iframe title="Prévia do site" src="/?preview=1" className="w-full flex-1 rounded-lg bg-white" />
      </div>}
    </div>
  )
}
