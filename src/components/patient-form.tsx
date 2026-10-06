'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'

const TREATMENTS = [
  'Avaliação odontológica',
  'Restauração dentária',
  'Tratamento de canal',
  'Extração dentária',
  'Radiologia odontológica',
]

const YES_NO_UNKNOWN = ['Sim', 'Não', 'Não sabe']

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

function calculateAge(birthDate: string): number | null {
  if (!birthDate) return null
  const birth = new Date(birthDate + 'T00:00:00')
  if (Number.isNaN(birth.getTime())) return null

  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())
  if (!hasHadBirthdayThisYear) age -= 1

  return age >= 0 ? age : null
}

function formatDate(iso: string): string {
  if (!iso) return 'Não informado'
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return 'Não informado'
  return d.toLocaleDateString('pt-BR')
}

export default function PatientForm() {
  const [treatment, setTreatment] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [lastTreatmentCompleted, setLastTreatmentCompleted] = useState('')
  const [medicalTreatment, setMedicalTreatment] = useState('')
  const [medication, setMedication] = useState('')
  const [diabetic, setDiabetic] = useState('')
  const [cardiopath, setCardiopath] = useState('')
  const [hypertensive, setHypertensive] = useState('')
  const [hemorrhageHistory, setHemorrhageHistory] = useState('')
  const [infectiousDisease, setInfectiousDisease] = useState('')
  const [medicationAllergy, setMedicationAllergy] = useState('')
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
      `Data de nascimento: ${formatDate(String(data.birthDate || ''))}`,
      `Idade: ${calculateAge(String(data.birthDate || '')) ?? 'Não informado'}`,
      '',
      'HISTÓRICO CLÍNICO',
      `Queixa principal: ${data.chiefComplaint || 'Não informado'}`,
      `Último atendimento: ${data.lastTreatment || 'Não informado'}`,
      `Último atendimento concluído: ${data.lastTreatmentCompleted || 'Não informado'}`,
      `Está em tratamento médico? ${data.medicalTreatment || 'Não informado'}`,
      `Toma algum medicamento? ${data.medication || 'Não informado'}`,
      ...(data.medication === 'Sim'
        ? [`Medicamento utilizado: ${data.medicationUsed || 'Não informado'}`]
        : []),
      `É diabético? ${data.diabetic || 'Não informado'}`,
      `É cardiopata? ${data.cardiopath || 'Não informado'}`,
      `É hipertenso? ${data.hypertensive || 'Não informado'}`,
      `Histórico de hemorragia? ${data.hemorrhageHistory || 'Não informado'}`,
      `Portador de doença infecto contagiosa? ${data.infectiousDisease || 'Não informado'}`,
      ...(data.infectiousDisease === 'Sim'
        ? [`Doença infecto contagiosa: ${data.infectiousDiseaseDetails || 'Não informado'}`]
        : []),
      `Possui alergia a algum medicamento? ${data.medicationAllergy || 'Não informado'}`,
      ...(data.medicationAllergy === 'Sim'
        ? [`Reação a medicamentos alérgicos: ${data.medicationAllergyReaction || 'Não informado'}`]
        : []),
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
                  <span>Data de nascimento *</span>
                  <input
                    name="birthDate"
                    type="date"
                    autoComplete="bday"
                    max={new Date().toISOString().split('T')[0]}
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                    required
                  />
                  {birthDate && calculateAge(birthDate) !== null && (
                    <span className="field-hint">{calculateAge(birthDate)} anos</span>
                  )}
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
                  <span className="kicker">02 — HISTÓRICO CLÍNICO</span>
                  <h2>Informações clínicas</h2>
                </div>
              </div>

              <div className="form-grid">
                <label className="field field-full">
                  <span>Queixa principal *</span>
                  <textarea
                    name="chiefComplaint"
                    rows={3}
                    placeholder="Descreva o motivo principal da consulta / o que está sentindo."
                    required
                  />
                </label>

                <label className="field field-full">
                  <span>Último atendimento odontológico *</span>
                  <input
                    name="lastTreatment"
                    type="text"
                    placeholder="Ex.: Limpeza em março/2025, extração em 2023, etc."
                    required
                  />
                </label>

                <label className="field">
                  <span>Último atendimento foi concluído? *</span>
                  <select
                    name="lastTreatmentCompleted"
                    value={lastTreatmentCompleted}
                    onChange={(event) => setLastTreatmentCompleted(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </label>

                <label className="field">
                  <span>Está em tratamento médico? *</span>
                  <select
                    name="medicalTreatment"
                    value={medicalTreatment}
                    onChange={(event) => setMedicalTreatment(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    {YES_NO_UNKNOWN.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Toma algum medicamento? *</span>
                  <select
                    name="medication"
                    value={medication}
                    onChange={(event) => setMedication(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    {YES_NO_UNKNOWN.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                {medication === 'Sim' && (
                  <label className="field field-full">
                    <span>Medicamento utilizado *</span>
                    <input
                      name="medicationUsed"
                      type="text"
                      placeholder="Informe o(s) medicamento(s) e a dosagem, se souber."
                      required
                    />
                  </label>
                )}

                <label className="field">
                  <span>É diabético? *</span>
                  <select
                    name="diabetic"
                    value={diabetic}
                    onChange={(event) => setDiabetic(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    {YES_NO_UNKNOWN.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>É cardiopata? *</span>
                  <select
                    name="cardiopath"
                    value={cardiopath}
                    onChange={(event) => setCardiopath(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    {YES_NO_UNKNOWN.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>É hipertenso? *</span>
                  <select
                    name="hypertensive"
                    value={hypertensive}
                    onChange={(event) => setHypertensive(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    {YES_NO_UNKNOWN.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Histórico de hemorragia? *</span>
                  <select
                    name="hemorrhageHistory"
                    value={hemorrhageHistory}
                    onChange={(event) => setHemorrhageHistory(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    {YES_NO_UNKNOWN.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Portador de doença infecto contagiosa? *</span>
                  <select
                    name="infectiousDisease"
                    value={infectiousDisease}
                    onChange={(event) => setInfectiousDisease(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    {YES_NO_UNKNOWN.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                {infectiousDisease === 'Sim' && (
                  <label className="field field-full">
                    <span>Qual doença infecto contagiosa? *</span>
                    <input
                      name="infectiousDiseaseDetails"
                      type="text"
                      placeholder="Informe a(s) doença(s)."
                      required
                    />
                  </label>
                )}

                <label className="field">
                  <span>Possui alergia a algum medicamento? *</span>
                  <select
                    name="medicationAllergy"
                    value={medicationAllergy}
                    onChange={(event) => setMedicationAllergy(event.target.value)}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    {YES_NO_UNKNOWN.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                {medicationAllergy === 'Sim' && (
                  <label className="field field-full">
                    <span>Qual reação apresentou ao(s) medicamento(s)? *</span>
                    <input
                      name="medicationAllergyReaction"
                      type="text"
                      placeholder="Ex.: coceira, inchaço, falta de ar, etc."
                      required
                    />
                  </label>
                )}
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