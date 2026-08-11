'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'

const TREATMENTS = [
  'Avaliação odontológica',
  'Radiologia odontológica',
  'Reabilitação oral',
  'Implantodontia',
  'Prótese dentária',
  'Estética odontológica',
  'Outro',
]

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

export default function PatientForm() {
  const [treatment, setTreatment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!WHATSAPP_NUMBER) {
      alert(
        'O número de WhatsApp ainda não foi configurado. Defina NEXT_PUBLIC_WHATSAPP_NUMBER no arquivo .env.local.'
      )
      return
    }

    const form = new FormData(event.currentTarget)
    const data = Object.fromEntries(form.entries())

    const message = [
      'NOVO PRÉ-ATENDIMENTO — DENTISCAN',
      '',
      `Tipo de tratamento: ${data.treatment || 'Não informado'}`,
      `Nome: ${data.name || 'Não informado'}`,
      `E-mail: ${data.email || 'Não informado'}`,
      `Telefone: ${data.phone || 'Não informado'}`,
      `Endereço: ${data.address || 'Não informado'}`,
      `Idade: ${data.age || 'Não informado'}`,
      '',
      'HISTÓRICO ODONTOLÓGICO',
      String(data.dentalHistory || 'Não informado'),
      '',
      'HISTÓRICO MÉDICO',
      String(data.medicalHistory || 'Não informado'),
      '',
      'O paciente declarou ciência de que as informações serão utilizadas para o contato e pré-atendimento odontológico.',
    ].join('\n')

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

    setSubmitted(true)
    window.location.href = whatsappUrl
  }

  return (
    <main className="patient-page">
      <header className="patient-header">
        <div className="patient-nav">
          <a href="/" className="brand" aria-label="Voltar para a página inicial">
            <Image src="/logo.png" alt="Dentiscan" width={30} height={30} />
            Dentiscan
          </a>
          <a href="/" className="patient-back">
            Voltar ao início
          </a>
        </div>
      </header>

      <section className="patient-hero">
        <div className="wrap patient-wrap">
          <div className="patient-intro">
            <span className="eyebrow">
              <span className="dot" />
              PRÉ-ATENDIMENTO
            </span>
            <h1>
              Vamos conhecer melhor <span>você.</span>
            </h1>
            <p>
              Preencha os dados abaixo para anteciparmos algumas informações
              importantes antes do atendimento. Ao finalizar, os dados serão
              organizados em uma mensagem para envio pelo WhatsApp.
            </p>
          </div>

          <div className="patient-signal" aria-hidden="true">
            <span className="signal-line" />
            <span className="signal-dot" />
            <span className="mono">DENTISCAN / INTAKE</span>
          </div>
        </div>
      </section>

      <section className="patient-section">
        <div className="wrap">
          <div className="patient-card">
            <div className="form-heading">
              <div>
                <span className="kicker">01 — DADOS INICIAIS</span>
                <h2>Informações do paciente</h2>
              </div>
              <span className="required-note">* campos obrigatórios</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label className="field field-full">
                  <span>Tipo de tratamento *</span>
                  <select
                    name="treatment"
                    value={treatment}
                    onChange={(event) => setTreatment(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    {TREATMENTS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Nome completo *</span>
                  <input name="name" type="text" autoComplete="name" placeholder="Seu nome completo" required />
                </label>

                <label className="field">
                  <span>Idade *</span>
                  <input name="age" type="number" min="0" max="120" inputMode="numeric" placeholder="Ex.: 29" required />
                </label>

                <label className="field">
                  <span>E-mail *</span>
                  <input name="email" type="email" autoComplete="email" placeholder="voce@email.com" required />
                </label>

                <label className="field">
                  <span>Número de telefone *</span>
                  <input name="phone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" required />
                </label>

                <label className="field field-full">
                  <span>Endereço *</span>
                  <input
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    placeholder="Rua, número, bairro, cidade e estado"
                    required
                  />
                </label>
              </div>

              <div className="form-divider" />

              <div className="form-heading form-heading-small">
                <div>
                  <span className="kicker">02 — HISTÓRICO</span>
                  <h2>Informações clínicas</h2>
                </div>
              </div>

              <div className="form-grid">
                <label className="field field-full">
                  <span>Histórico odontológico *</span>
                  <textarea
                    name="dentalHistory"
                    rows={6}
                    placeholder="Ex.: tratamentos anteriores, uso de aparelho, próteses, implantes, cirurgias, dores ou queixas atuais."
                    required
                  />
                </label>

                <label className="field field-full">
                  <span>Histórico médico *</span>
                  <textarea
                    name="medicalHistory"
                    rows={6}
                    placeholder="Informe condições de saúde relevantes, medicamentos em uso, alergias, cirurgias anteriores e outras informações que considere importantes."
                    required
                  />
                </label>
              </div>

              <div className="privacy-box">
                <span className="privacy-icon" aria-hidden="true">i</span>
                <p>
                  <strong>Privacidade:</strong> as informações clínicas são dados
                  pessoais sensíveis. Este formulário não armazena os dados em
                  banco; ao enviar, eles serão colocados em uma mensagem do
                  WhatsApp para continuidade do contato. Use somente informações
                  necessárias para o pré-atendimento.
                </p>
              </div>

              <label className="consent">
                <input name="consent" type="checkbox" required />
                <span>
                  Confirmo que li o aviso de privacidade e autorizo o uso dessas
                  informações para contato e organização do pré-atendimento. *
                </span>
              </label>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={submitted}>
                  {submitted ? 'Abrindo WhatsApp…' : 'Enviar pelo WhatsApp'}
                  <span aria-hidden="true">→</span>
                </button>
                <p>
                  Você poderá revisar a mensagem no WhatsApp antes de concluir o envio.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="patient-footer">
        <div className="wrap patient-footer-wrap">
          <span className="mono">DENTISCAN / PRÉ-ATENDIMENTO</span>
          <a href="/">Voltar ao site principal</a>
        </div>
      </footer>
    </main>
  )
}
