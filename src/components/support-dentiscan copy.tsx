'use client'

import { useState } from 'react'

const PIX_KEY = process.env.NEXT_PUBLIC_PIX_KEY ?? ''

export default function SupportDentiscan() {
  const [copied, setCopied] = useState(false)

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
              odontológica moderna, confortável, humana e acessível. Se este artigo
              te ajudou de alguma forma e, de coração, você quiser contribuir para
              esse sonho, existe a possibilidade de apoiar o Dentiscan via Pix.
            </p>
            <p className="support-note">
              Sua contribuição é totalmente voluntária e não interfere em
              atendimento, valores, tratamento ou qualquer benefício recebido pelo
              paciente.
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
                Configure <code>NEXT_PUBLIC_PIX_KEY</code> no ambiente do projeto
                para exibir a chave Pix aqui.
              </p>
            )}
            <span className="pix-small">Se quiser contribuir, escolha livremente o valor.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
