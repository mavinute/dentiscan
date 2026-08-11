import Reveal from './reveal'
import { cases } from '@/data/cases'

const TAG_LABEL: Record<string, string> = {
  radiologia: 'Radiologia',
  reabilitacao: 'Reabilitação',
  IA: 'Inteligência Artificial',
  SUS: 'SUS',
}

export default function Cases() {
  return (
    <section id="casos">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="kicker">CASOS E PRODUÇÕES</span>
          <h2>Trabalhos concluidos.</h2>
          <p>
            Espaço reservado para os casos clínicos, resumos, pôsteres e artigos que
            já foram concluidos.
          </p>
        </Reveal>
        {/* <Reveal className="case-note">
          Esta seção está com conteúdo de exemplo (editável em{' '}
          <code>src/data/cases.ts</code>). Troque os títulos, tags e descrições
          pelos seus casos, certificados e produções reais.
        </Reveal> */}
        <div className="case-grid">
          {cases.map((item) => (
            <Reveal key={item.code} className="case-card">
              <div className="case-top">
                <span className="case-code mono">{item.code}</span>
                <span className={`tag ${item.category === 'radiologia' ? 'radio' : 'reab'}`}>
                  {TAG_LABEL[item.category]}
                </span>
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
