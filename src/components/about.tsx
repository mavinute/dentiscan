import Reveal from './reveal'

import Image from 'next/image'

export default function About() {
  return (
    <section id="sobre">
      <div className="wrap">
        <div className="about-grid">
          <Reveal className="photo-frame">
            <div className="ph-label mono">
              <Image
                src="/foto2.png"
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
              Sou apaixonado por entender como a tecnologia pode tornar o diagnóstico
              odontológico mais preciso e a reabilitação mais previsível. Ao longo da
              graduação, essa curiosidade me levou a duas frentes que se
              complementam: a leitura fina da imagem e a reconstrução funcional do
              sorriso. O Dentiscan nasce como o espaço onde essas duas experiências
              se encontram.
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
          </Reveal>
        </div>
      </div>
    </section>
  )
}
