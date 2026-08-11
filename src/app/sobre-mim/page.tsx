import type { Metadata } from 'next'
import AboutMe from '@/components/about-me'

export const metadata: Metadata = {
  title: 'Sobre mim — Dentiscan',
  description:
    'Conheça a trajetória, os estudos, os projetos e o propósito de Matheus na Odontologia, unindo cuidado, conhecimento e tecnologia.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function AboutMePage() {
  return <AboutMe />
}
