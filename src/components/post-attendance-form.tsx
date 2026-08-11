'use client'

import { FormEvent, useState } from 'react'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
const PIX_KEY = process.env.NEXT_PUBLIC_PIX_KEY ?? ''

const ratings = [1, 2, 3, 4, 5]

export default function PostAttendanceForm() {
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

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
      'PÓS-ATENDIMENTO — DENTISCAN',
      '',
      `Nome: ${data.name || 'Não informado'}`,
      `Data do atendimento: ${data.date || 'Não informado'}`,
      '',
      `Avaliação geral: ${data.overall || 'Não informado'}/5`,
      `Avaliação do dentista: ${data.dentist || 'Não informado'}/5`,
      `Avaliação da clínica: ${data.clinic || 'Não informado'}/5`,
      `Agilidade do atendimento: ${data.speed || 'Não informado'}`,
      `Percepção sobre o valor: ${data.price || 'Não informado'}`,
      `Voltaria a ser atendido: ${data.returning || 'Não informado'}`,
      '',
      'O QUE PODEMOS MELHORAR?',
      String(data.improvement || 'Não informado'),
      '',
      'O QUE VOCÊ MAIS GOSTOU?',
      String(data.positive || 'Não informado'),
      '',
      'COMENTÁRIO FINAL',
      String(data.comment || 'Não informado'),
    ].join('\n')

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

    setSubmitted(true)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  async function copyPixKey() {
    if (!PIX_KEY) return

    try {
      await navigator.clipboard.writeText(PIX_KEY)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="post-page">
      <header className="patient-header">
        <div className="patient-nav">
          <a href="/" className="brand" aria-label="Voltar para a página inicial">
            <span className="brand-mark" aria-hidden="true">D</span>
            Dentiscan
          </a>
          <span className="mono patient-private-label">PÓS-ATENDIMENTO</span>
        </div>
      </header>

      <section className="patient-hero post-hero">
        <div className="wrap patient-wrap">
          <div className="patient-intro">
            <span className="eyebrow">
              <span className="dot" />
              SUA EXPERIÊNCIA IMPORTA
            </span>
            <h1>
              Como foi seu <span>atendimento?</span>
            </h1>
            <p>
              Este formulário foi criado para ouvir você. Suas respostas ajudam a
              identificar o que está funcionando e, principalmente, o que podemos
              melhorar para oferecer uma experiência cada vez mais acolhedora.
            </p>
          </div>

          <div className="patient-signal" aria-hidden="true">
            <span className="signal-line" />
            <span className="signal-dot" />
            <span className="mono">DENTISCAN / FEEDBACK</span>
          </div>
        </div>
      </section>

      <section className="patient-section">
        <div className="wrap">
          <div className="patient-card">
            {submitted ? (
              <div className="feedback-success">
                <span className="success-mark" aria-hidden="true">✓</span>
                <span className="kicker">OBRIGADO PELO SEU TEMPO</span>
                <h2>Seu feedback já foi preparado.</h2>
                <p>
                  O WhatsApp foi aberto para você enviar suas respostas. Se ele não
                  abriu automaticamente, verifique se o navegador bloqueou uma nova aba.
                </p>
              </div>
            ) : (
              <>
                <div className="form-heading">
                  <div>
                    <span className="kicker">01 — SUA EXPERIÊNCIA</span>
                    <h2>Avalie o atendimento</h2>
                  </div>
                  <span className="required-note">* campos obrigatórios</span>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <label className="field">
                      <span>Seu nome *</span>
                      <input name="name" type="text" autoComplete="name" placeholder="Seu nome" required />
                    </label>

                    <label className="field">
                      <span>Data do atendimento</span>
                      <input name="date" type="date" />
                    </label>
                  </div>

                  <div className="rating-grid">
                    <RatingField name="overall" label="Como você avalia o atendimento como um todo?" />
                    <RatingField name="dentist" label="Como você avalia o atendimento do dentista?" />
                    <RatingField name="clinic" label="Como você avalia a clínica e o ambiente?" />
                  </div>

                  <div className="form-divider" />

                  <div className="form-heading form-heading-small">
                    <div>
                      <span className="kicker">02 — DETALHES</span>
                      <h2>O que você percebeu?</h2>
                    </div>
                  </div>

                  <div className="question-stack">
                    <ChoiceField
                      name="speed"
                      label="O atendimento foi rápido o suficiente para você? *"
                      options={['Sim, foi rápido', 'Foi adequado', 'Poderia ter sido mais rápido']}
                    />
                    <ChoiceField
                      name="price"
                      label="Como você percebeu o valor cobrado? *"
                      options={['Muito justo', 'Justo', 'Um pouco acima do esperado', 'Acima do que eu esperava']}
                    />
                    <ChoiceField
                      name="returning"
                      label="Você voltaria a se atender conosco? *"
                      options={['Com certeza', 'Provavelmente', 'Ainda não sei', 'Provavelmente não']}
                    />
                  </div>

                  <div className="form-grid post-text-grid">
                    <label className="field field-full">
                      <span>O que você mais gostou?</span>
                      <textarea
                        name="positive"
                        rows={4}
                        placeholder="Pode ser algo sobre o atendimento, acolhimento, ambiente, explicações, pontualidade..."
                      />
                    </label>

                    <label className="field field-full">
                      <span>O que podemos melhorar?</span>
                      <textarea
                        name="improvement"
                        rows={4}
                        placeholder="Sua crítica será recebida como uma oportunidade de melhorar."
                      />
                    </label>

                    <label className="field field-full">
                      <span>Gostaria de deixar algum comentário?</span>
                      <textarea
                        name="comment"
                        rows={4}
                        placeholder="Conte algo que considere importante sobre sua experiência."
                      />
                    </label>
                  </div>

                  <div className="privacy-box">
                    <span className="privacy-icon" aria-hidden="true">i</span>
                    <p>
                      <strong>Seu feedback será usado para melhoria.</strong> As respostas
                      serão organizadas em uma mensagem e enviadas pelo WhatsApp. Não é
                      necessário informar dados clínicos neste formulário.
                    </p>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      Enviar minha avaliação
                      <span aria-hidden="true">→</span>
                    </button>
                    <p>Leva aproximadamente 2 minutos.</p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="support-section" aria-labelledby="support-title">
        <div className="wrap">
          <div className="support-card">
            <div className="support-copy">
              <span className="eyebrow">
                <span className="dot" />
                UM CONVITE, NÃO UMA OBRIGAÇÃO
              </span>
              <h2 id="support-title">Quer fazer parte de um sonho?</h2>
              <p>
                Existe um projeto maior por trás deste trabalho: construir uma clínica
                odontológica moderna, confortável, humana e acessível. Se você teve uma
                boa experiência e, de coração, quiser contribuir para esse sonho, existe
                a possibilidade de apoiar esse projeto via Pix.
              </p>
              <p className="support-note">
                Sua contribuição é totalmente voluntária e não interfere em atendimento,
                valores, tratamento ou qualquer benefício recebido pelo paciente.
              </p>
            </div>

            <div className="pix-box">
              <span className="kicker">APOIO VOLUNTÁRIO</span>
              <h3>Contribuição via Pix</h3>
              {PIX_KEY ? (
                <>
                  <div className="pix-key" title="Chave Pix configurada">
                    <span>{PIX_KEY}</span>
                  </div>
                  <button type="button" className="btn btn-secondary" onClick={copyPixKey}>
                    {copied ? 'Chave copiada ✓' : 'Copiar chave Pix'}
                  </button>
                </>
              ) : (
                <p className="pix-missing">
                  Configure <code>NEXT_PUBLIC_PIX_KEY</code> no ambiente do projeto para
                  exibir a chave Pix aqui.
                </p>
              )}
              <span className="pix-small">Se quiser contribuir, escolha livremente o valor.</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="patient-footer">
        <div className="wrap patient-footer-wrap">
          <span className="mono">DENTISCAN / PÓS-ATENDIMENTO</span>
          <a href="/">Voltar ao site principal</a>
        </div>
      </footer>
    </main>
  )
}

function RatingField({ name, label }: { name: string; label: string }) {
  return (
    <fieldset className="rating-field">
      <legend>{label} *</legend>
      <div className="rating-options">
        {ratings.map((rating) => (
          <label key={rating} className="rating-option">
            <input type="radio" name={name} value={rating} required />
            <span>{rating}</span>
          </label>
        ))}
      </div>
      <div className="rating-scale" aria-hidden="true">
        <span>Muito ruim</span>
        <span>Excelente</span>
      </div>
    </fieldset>
  )
}

function ChoiceField({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <fieldset className="choice-field">
      <legend>{label}</legend>
      <div className="choice-options">
        {options.map((option) => (
          <label key={option} className="choice-option">
            <input type="radio" name={name} value={option} required />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
