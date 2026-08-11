import PatientForm from '@/components/patient-form'

export const metadata = {
  title: 'Pré-atendimento | Dentiscan',
  description:
    'Formulário de pré-atendimento para coleta inicial de informações do paciente.',
}

export default function AtendimentoPage() {
  return <PatientForm />
}
