'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Sobre', href: '/sobre-mim' },
  { label: 'Formação', href: '#formacao' },
  { label: 'Casos', href: '#casos' },
  { label: 'Habilidades', href: '#habilidades' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav>
        <a href="#top" className="brand">
          <Image src="/logo.png" alt="Dentiscan" width={30} height={30} />
          Dentiscan
        </a>
        <div className="navlinks">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="/atendimento" className="nav-cta">
            Pré-atendimento
          </a>
        </div>
        <button
          className="burger"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="/atendimento" onClick={() => setMenuOpen(false)}>
          Pré-atendimento
        </a>
      </div>
    </header>
  )
}
