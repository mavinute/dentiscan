import Reveal from './reveal'
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  return (
    <section id="sobre">
      <div className="wrap">
        <div className="about-grid">
          <Reveal className="photo-frame">
            <div className="ph-label mono">
              <Image
                src="/foto4.png"
                alt="Foto de perfil"
                width={750}
                height={545}
              />
            </div>
          </Reveal>
          <Reveal>
            <span className="kicker">SOBRE</span>
            <h2>Odontologia e tecnologia, na mesma direção.</h2>
            <p style={{ color: 'var(--ink-soft)', marginTop: 16, fontSize: 16 }}>
              Este é o espaço onde compartilho minha trajetória acadêmica e profissional, além de insights sobre odontologia, radiologia e tecnologia aplicada à saúde bucal. Aqui você encontrará informações sobre minha formação, áreas de interesse e projetos em andamento.
            </p>
            <ul className="fact-list">
              <li>
                <b>Formação</b> Graduando em Odontologia — 6º período
              </li>
              <li>
                <b>Área de interesse</b> Radiologia odontológica e reabilitação oral
              </li>
              <li>
                <b>Ligas acadêmicas</b> LAIO (UFPI) e LAERO Focus (Focus Educacional)
              </li>
              <li>
                <b>Foco atual</b> Diagnóstico por imagem aplicado ao planejamento
                reabilitador
              </li>
            </ul>
            <Link href="/sobre-mim" className="btn btn-primary" style={{ marginTop: 28 }}>
              Conheça mais da minha trajetória →
            </Link>
            <a
                href="https://www.instagram.com/dentiscan__"
                className="btn btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 20, marginLeft: 10 }}
              >
                Acesse nosso Instagram
              </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
