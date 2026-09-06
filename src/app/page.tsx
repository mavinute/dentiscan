import Header from '@/components/header'
import Hero from '@/components/hero'
import About from '@/components/about'
import Formation from '@/components/formation'
import Cases from '@/components/cases'
import Articles from '@/components/articles'
import Skills from '@/components/skills'
import CtaBand from '@/components/cta-band'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Formation />
        <Cases />
        <Articles />
        <Skills />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}
