import type { Metadata } from 'next'
import PostAttendanceForm from '@/components/post-attendance-form'

export const metadata: Metadata = {
  title: 'Pós-atendimento — Dentiscan',
  description: 'Pesquisa de satisfação e experiência do paciente Dentiscan.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PostAttendancePage() {
  return <PostAttendanceForm />
}
