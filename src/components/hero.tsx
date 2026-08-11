import Reveal from './reveal'

import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">
            <span className="dot" /> PORTFÓLIO CLÍNICO-ACADÊMICO
          </span>
          <h1 className="hero-title">
            Da imagem ao
            <br />
            <span className="grad">sorriso reabilitado.</span>
          </h1>
          <p className="lead">
            Sou estudante de Odontologia, hoje no 6º período, com foco em radiologia
            odontológica e reabilitação oral. O Dentiscan reúne minha trajetória
            acadêmica, casos e produções em um só lugar — a ponte entre diagnóstico
            por imagem e tecnologia aplicada à clínica.
          </p>
          <div className="hero-actions">
            {/* <a href="#casos" className="btn btn-primary">
              Ver casos e produções
            </a> */}
            <a href="https://api.whatsapp.com/message/BEOKJ7FBUSYEL1" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Entrar em contato
            </a>
          </div>
          <div className="hero-facts">
            <div>
              <strong>6º</strong>
              <span>Período de Odontologia</span>
            </div>
            <div>
              <strong>LAIO</strong>
              <span>Liga de Radiologia · UFPI</span>
            </div>
            <div>
              <strong>LAERO</strong>
              <span>Reabilitação Oral · Focus</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="scan-stage">
          {/* <div className="tooth-clip" /> */}
          <Image
            src="/logo-transparent.png"
            alt="Varredura de imagem odontológica"
            width={210}
            height={332}
            priority
          />
          <div className="scan-readout mono">
            <span className="rec" /> DENTISCAN ONLINE
          </div>
        </Reveal>
      </div>
    </section>
  )
}
