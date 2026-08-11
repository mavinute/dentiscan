import Reveal from './reveal'
import { formation } from '@/data/formation'

export default function Formation() {
  return (
    <section id="formacao">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="kicker">FORMAÇÃO E LIGAS ACADÊMICAS</span>
          <h2>Duas camadas, um mesmo objetivo.</h2>
          <p>
            A formação acadêmica em odontologia, com ênfase em diagnóstico por imagem e reabilitação oral, proporciona uma base sólida para a prática clínica e pesquisa científica. Além disso, a participação em ligas acadêmicas permite o aprofundamento em áreas específicas, conectando o diagnóstico obtido por imagem às soluções clínicas de reabilitação.
          </p>
        </Reveal>
        <div className="path-grid">
          {formation.map((item) => (
            <Reveal key={item.title} className={`path-card ${item.theme}`}>
              <div className="bar" />
              <span className="code mono">{item.code}</span>
              <h3>{item.title}</h3>
              <span className="org">{item.org}</span>
              <p>{item.description}</p>
              <ul>
                {item.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
