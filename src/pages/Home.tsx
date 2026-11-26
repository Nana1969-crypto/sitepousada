import { useEffect } from 'react'
import { useContent } from '../lib/store'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Cabins } from '../components/Cabins'
import { Experience } from '../components/Experience'
import { Location } from '../components/Location'
import { FinalCta } from '../components/FinalCta'
import { Footer } from '../components/Footer'
import { WhatsAppFab } from '../components/WhatsAppFab'

export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
export default function Home() {
  const { site } = useContent()
  useSeo(site.seoTitle, site.seoDescription)
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded focus:bg-white focus:px-4 focus:py-2">Ir para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero /><About /><Cabins /><Experience /><Location /><FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
