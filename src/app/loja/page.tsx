'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/products'

const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '')

function money(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function ProductGallery({ name, images }: { name: string; images: string[] }) {
  const [active, setActive] = useState(0)
  const safeImages = useMemo(() => images.filter(Boolean), [images])
  const currentImage = safeImages[active]

  return (
    <div className="store-gallery">
      <div className="store-gallery-main">
        {currentImage ? (
          <Image src={currentImage} alt={`${name} — foto ${active + 1}`} fill sizes="(max-width: 760px) 100vw, 33vw" />
        ) : (
          <div className="store-photo-placeholder">
            <span className="store-photo-icon">＋</span>
            <strong>Fotos do produto</strong>
            <small>Adicione imagens em public/produtos</small>
          </div>
        )}
        <span className="store-photo-count">{safeImages.length ? `${active + 1} / ${safeImages.length}` : 'Até 5 fotos'}</span>
      </div>
      <div className="store-thumbnails" aria-label={`Fotos de ${name}`}>
        {Array.from({ length: Math.max(3, safeImages.length) }).slice(0, 5).map((_, index) => (
          <button
            type="button"
            key={index}
            className={`store-thumb ${active === index ? 'active' : ''}`}
            onClick={() => safeImages.length && setActive(index % safeImages.length)}
            aria-label={`Ver foto ${index + 1} de ${name}`}
            disabled={!safeImages.length}
          >
            {safeImages[index] ? (
              <Image src={safeImages[index]} alt="" fill sizes="80px" />
            ) : <span>{String(index + 1).padStart(2, '0')}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function LojaPage() {
  function buy(productName: string) {
    const message = `Olá! Tenho interesse em comprar: ${productName}. Poderia me passar mais informações para concluir a compra?`
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="store-page">
      <header className="store-header">
        <nav className="store-nav wrap">
          <Link href="/" className="brand">
            <Image src="/logo.png" alt="Dentiscan" width={32} height={32} />
            Dentiscan
          </Link>
          <div className="store-nav-links">
            <Link href="/">Início</Link>
            <a href="#produtos">Produtos</a>
            <a href="#entrega">Entrega</a>
          </div>
          <a className="store-nav-cta" href="#produtos">Ver produtos <span>↗</span></a>
        </nav>
      </header>

      <section className="store-hero">
        <div className="wrap store-hero-grid">
          <div>
            <span className="eyebrow"><span className="dot" /> LOJA DENTISCAN</span>
            <h1>Produtos selecionados para <span>você.</span></h1>
            <p>Conheça nossa seleção, confira os detalhes e fale diretamente pelo WhatsApp para concluir seu pedido.</p>
            <a href="#produtos" className="store-primary-button">Explorar produtos <span>↓</span></a>
            <div className="store-trust-row"><span>✓ Atendimento direto</span><span>✓ Compra assistida</span></div>
          </div>
          <div className="store-hero-art" aria-label="Destaque da loja">
            <div className="store-art-circle" />
            <div className="store-art-card store-art-card-back"><span>DS</span></div>
            <div className="store-art-card store-art-card-front"><span className="store-art-mark">D</span><strong>Escolhas<br />com cuidado.</strong><small>DENTISCAN STORE</small></div>
            <span className="store-art-caption">QUALIDADE • ATENÇÃO • CONFIANÇA</span>
          </div>
        </div>
      </section>

      <section className="store-benefits" id="entrega">
        <div className="wrap store-benefits-grid">
          <div><span className="store-benefit-icon">⌖</span><div><strong>Frete grátis em Teresina-PI</strong><small>Entrega sem custo dentro de Teresina.</small></div></div>
          <div><span className="store-benefit-icon">☏</span><div><strong>Compra pelo WhatsApp</strong><small>Tire dúvidas e combine seu pedido.</small></div></div>
          <div><span className="store-benefit-icon">♡</span><div><strong>Atendimento próximo</strong><small>Converse diretamente com a loja.</small></div></div>
        </div>
      </section>

      <section className="store-products-section" id="produtos">
        <div className="wrap">
          <div className="store-section-heading">
            <div><span className="store-kicker">NOSSA SELEÇÃO</span><h2>Produtos em destaque</h2><p>Escolha um produto para ver as fotos e solicitar sua compra.</p></div>
            <span className="store-count">{products.length.toString().padStart(2, '0')} PRODUTOS</span>
          </div>
          <div className="store-products-grid">
            {products.map((product, index) => (
              <article className="store-product-card" key={product.id}>
                <ProductGallery name={product.name} images={product.images} />
                <div className="store-product-content">
                  <div className="store-product-topline"><span>0{index + 1} / DENTISCAN</span>{product.tag && <em>{product.tag}</em>}</div>
                  <h3>{product.name}</h3>
                  <p className="store-product-subtitle">{product.subtitle}</p>
                  <p className="store-product-description">{product.description}</p>
                  <div className="store-product-buy-row">
                    <div><small>VALOR</small><strong>{product.price === null ? 'Consulte' : money(product.price)}</strong></div>
                    <button type="button" onClick={() => buy(product.name)}>Comprar <span>↗</span></button>
                  </div>
                  <div className="store-product-shipping">✦ Frete grátis em Teresina-PI</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="store-bottom-cta">
        <div className="wrap store-bottom-inner"><div><span className="store-kicker">FICOU COM DÚVIDA?</span><h2>Vamos conversar sobre seu pedido.</h2><p>Entre em contato pelo WhatsApp para consultar disponibilidade, entrega e formas de pagamento.</p></div><button type="button" onClick={() => buy('os produtos da loja')}>Falar pelo WhatsApp <span>↗</span></button></div>
      </section>
      <footer className="store-footer"><div className="wrap"><span>© {new Date().getFullYear()} Dentiscan. Todos os direitos reservados.</span><Link href="/">Voltar ao site principal ↑</Link></div></footer>
    </main>
  )
}
