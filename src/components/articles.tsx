import Link from 'next/link'
import Image from 'next/image'
import Reveal from './reveal'
import { articles } from '@/data/articles'
//import { articles } from '@/data/articles'

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function Articles() {
  return (
    <section id="artigos">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="kicker">ARTIGOS</span>
          <h2>Leituras sobre odontologia e tecnologia.</h2>
          <p>
            Textos e reflexões sobre radiologia odontológica, reabilitação oral e o
            uso de tecnologia na clínica.
          </p>
        </Reveal>
        <div className="case-grid">
          {articles.map((article) => (
            <Reveal key={article.slug} className="case-card">
              {article.image && (
                <div className="article-card-image">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className="case-top">
                <span className="case-code mono">
                  {formatDate(article.date)} · {article.readTime}
                </span>
                <span className="tag radio">{article.category}</span>
              </div>
              <h4>{article.title}</h4>
              <p>{article.excerpt}</p>
              <Link href={`/artigos/${article.slug}`} className="article-link">
                Ler artigo →
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
