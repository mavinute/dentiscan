import type { Metadata } from 'next'
import AccessPage from '@/components/access-page'

export const metadata: Metadata = {
  title: 'Área profissional | Dentiscan',
  description: 'Acesse sua conta ou cadastre o perfil profissional da sua clínica no Dentiscan.',
}

export default function AcessoPage() {
  return <AccessPage />
}
