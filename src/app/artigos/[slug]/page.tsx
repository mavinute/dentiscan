import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import SupportDentiscan from '@/components/support-dentiscan'
import { articles } from '@/data/articles'

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} — Dentiscan`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <>
      <Header />
      <main>
        <section className="article-page">
          <div className="wrap" style={{ maxWidth: 720 }}>
            <Link href="/#artigos" className="article-back">
              ← Voltar aos artigos
            </Link>
            <span className="kicker" style={{ marginTop: 24 }}>
              {article.category}
            </span>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta mono">
              Por {article.author} · {formatDate(article.date)} · {article.readTime} de leitura
            </div>
            {article.image && (
              <div className="article-cover">
                <Image
                  src={article.image}
                  alt={article.title}
                  placeholder="blur"
                  sizes="(max-width: 760px) 100vw, 720px"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            )}
            <div className="article-body">
              {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="article-cta">
              <Link href="/sobre-mim" className="btn btn-ghost">
                Conheça mais sobre mim
              </Link>
              <Link href="/atendimento" className="btn btn-primary">
                Agendar atendimento odontológico
              </Link>
            </div>
          </div>
        </section>

        <SupportDentiscan />
      </main>
      <Footer />
    </>
  )
}
