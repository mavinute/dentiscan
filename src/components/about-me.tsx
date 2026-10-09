'use client'

import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/reveal'

const leagues = [
  {
    title: 'LAIO — Liga Acadêmica de Radiologia Odontológica',
    text: 'UFPI · Estudo de exames radiográficos e tomográficos, discussão de casos clínicos e participação em atividades científicas.',
    icon: '⌁',
  },
  {
    title: 'LAERO Focus — Liga Acadêmica de Reabilitação Oral',
    text: 'Focus Educacional · Planejamento reabilitador, discussão de protocolos clínicos e atividades formativas.',
    icon: '◯',
  },
  {
    title: 'Tecnologia aplicada à Odontologia',
    text: 'Interesse em inteligência artificial, diagnóstico por imagem e ferramentas digitais que possam apoiar decisões e aprendizagem.',
    icon: '＋',
  },
  {
    title: 'Ciência compartilhada',
    text: 'Um compromisso pessoal de transformar conteúdos técnicos em materiais mais claros, responsáveis e acessíveis.',
    icon: '✦',
  },
]

const equipment = [
  {
    icon: '📷',
    title: 'Scanner intraoral',
    text: 'Substitui as moldagens tradicionais por um mapeamento digital preciso da boca do paciente. Mais conforto na consulta, menos margem de erro no planejamento e restaurações com muito mais exatidão.',
  },
  {
    icon: '🖨️',
    title: 'Impressora 3D',
    text: 'Transforma o escaneamento em modelos físicos, guias cirúrgicos e peças protéticas dentro da própria clínica — com mais agilidade, menos custo e menos tempo de espera para quem está sendo tratado.',
  },
  {
    icon: '☢️',
    title: 'Raio-X portátil',
    text: 'Permite um diagnóstico de imagem rápido, seguro e acessível, sem depender de deslocamentos entre consultório e clínica de radiologia. Segurança e precisão no momento exato em que são necessárias.',
  },
  {
    icon: '💻',
    title: 'Notebook avançado',
    text: 'A ferramenta que sustenta tudo isso: planejamento digital, leitura de escaneamentos, softwares de diagnóstico e desenho das peças a serem impressas.',
  },
]

export default function AboutMe() {
  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY ?? ''

  return (
    <main className="about-page">
      <div className="about-topbar wrap">
        <Link href="/" className="about-back">← Voltar ao início</Link>
      </div>

      <section className="about-hero">
        <div className="wrap about-hero-grid">
          <Reveal>
            <div>
              <p className="eyebrow">SOBRE MIM — PROPÓSITO &amp; TRAJETÓRIA</p>
              <h1>Uma história construída entre <span>tecnologia, ciência e cuidado.</span></h1>
              <p className="about-lead">
                Eu acredito que a Odontologia pode ser mais do que procedimentos. Pode ser conhecimento que acolhe,
                tecnologia que aproxima e cuidado que devolve às pessoas confiança para sorrir.
              </p>
              <div className="signature">Matheus Vinute</div>
              <p className="about-role">Odontologia · Radiologia · Reabilitação · Tecnologia</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="about-portrait">
              <Image src="/foto7.jpg" alt="Retrato de Matheus" width={773} height={773} priority />
              <div className="portrait-note">
                <strong>Conhecimento com propósito.</strong>
                <span>Cuidado humano, ciência e inovação caminhando juntos.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="story-section">
        <div className="wrap story-grid">
          <Reveal>
            <div className="story-photo-stack">
              <div className="story-photo main-photo">
                <Image src="/foto4.png" alt="Matheus em contexto profissional" width={773} height={773} />
              </div>
              <div className="story-photo scan-photo">
                <Image src="/foto5.png" alt="Tecnologia aplicada à radiologia odontológica" width={900} height={700} />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <article className="story-copy">
              <p className="eyebrow">MINHA HISTÓRIA</p>
              <h2>Não quero apenas aprender Odontologia. Quero entender, compartilhar e transformar.</h2>

              <div className="story-timeline">
                <div className="story-item">
                  <span className="timeline-dot" />
                  <div>
                    <h3>Curiosidade antes de tudo</h3>
                    <p>
                      Minha trajetória começou na Tecnologia da Informação, onde aprendi a pensar em problemas, sistemas e soluções. Na Odontologia, encontrei uma nova dimensão para essa curiosidade: por trás de cada diagnóstico existe uma pessoa, uma história e uma necessidade de cuidado.
                    </p>
                  </div>
                </div>
                <div className="story-item">
                  <span className="timeline-dot" />
                  <div>
                    <h3>Uma nova forma de olhar a saúde</h3>
                    <p>
                      Ao entrar na Odontologia, encontrei uma combinação que me representa: ciência, precisão, criatividade, tecnologia e, acima de tudo, contato humano. A radiologia e a reabilitação oral se tornaram áreas que despertam especialmente minha curiosidade.
                    </p>
                  </div>
                </div>
                <div className="story-item">
                  <span className="timeline-dot" />
                  <div>
                    <h3>Academia como espaço de crescimento</h3>
                    <p>
                      As ligas acadêmicas, estudos, pesquisas e experiências práticas passaram a fazer parte dessa construção.
                      São oportunidades para perguntar, testar, ouvir diferentes perspectivas e transformar conhecimento em ação.
                    </p>
                  </div>
                </div>
                <div className="story-item">
                  <span className="timeline-dot" />
                  <div>
                    <h3>O futuro que estou construindo</h3>
                    <p>
                      Meu sonho é criar uma clínica odontológica moderna, confortável e profundamente humanizada — um lugar em
                      que tecnologia e excelência não substituam o cuidado, mas existam para tornar a experiência mais digna.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="leagues-section">
        <div className="wrap">
          <Reveal>
            <div className="section-heading centered">
              <p className="eyebrow">ALÉM DA SALA DE AULA</p>
              <h2>Participações e experiências acadêmicas</h2>
              <p>
                As ligas e atividades acadêmicas representam uma parte importante da minha formação: aprender com outras pessoas,
                discutir casos, estudar evidências e transformar curiosidade em conhecimento.
              </p>
            </div>
          </Reveal>

          <div className="league-grid">
            {leagues.map((league) => (
              <Reveal key={league.title}>
                <article className="league-card">
                  <div className="league-icon" aria-hidden="true">{league.icon}</div>
                  <h3>{league.title}</h3>
                  <p>{league.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="data-note">
            Essas experiências fazem parte da minha formação acadêmica e refletem duas áreas que quero continuar aprofundando: diagnóstico por imagem e reabilitação oral.
          </p>
        </div>
      </section>

      <section className="knowledge-section">
        <div className="wrap knowledge-grid">
          <Reveal>
            <div className="knowledge-copy">
              <p className="eyebrow">UM COMPROMISSO PESSOAL</p>
              <h2>Conhecimento só transforma de verdade quando consegue chegar às pessoas.</h2>
              <p>
                Uma das coisas que mais me motivam é tornar o conhecimento em saúde mais compreensível e acessível. Nem todo mundo
                tem tempo, formação ou acesso a materiais técnicos — e isso não deveria ser uma barreira para entender o próprio cuidado.
              </p>
              <p>
                Por isso, quero produzir conteúdos claros, responsáveis e baseados em evidências, aproximando a ciência da vida real.
                Explicar sem diminuir. Ensinar sem complicar. Compartilhar sem transformar conhecimento em privilégio.
              </p>
              <div className="values-row">
                <span>Educar</span>
                <span>Acolher</span>
                <span>Inovar</span>
                <span>Transformar</span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="knowledge-card">
              <Image src="/foto6.jpg" alt="Imagem relacionada à tecnologia em odontologia" width={900} height={700} />
              <div className="knowledge-overlay">
                <span>TECNOLOGIA + ODONTOLOGIA</span>
                <strong>Ferramentas devem servir às pessoas — nunca o contrário.</strong>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="dream-section">
        <div className="wrap">
          <Reveal>
            <div className="dream-card">
              <div className="dream-content">
                <p className="eyebrow">UM SONHO QUE ESTOU CONSTRUINDO</p>
                <h2>Uma clínica onde tecnologia e humanidade tenham o mesmo endereço.</h2>
                <p>
                  Existem sonhos que nascem de uma vontade. E existem sonhos que nascem de uma inquietação. O meu nasceu da
                  inquietação de imaginar que a odontologia pode ser mais do que procedimentos, equipamentos e consultas.
                  Pode ser ciência, tecnologia, educação, acolhimento e, acima de tudo, cuidado com pessoas.
                </p>
                <p>
                  Hoje ainda sou estudante de Odontologia. Mas é justamente aqui, na faculdade, que esse sonho começou a
                  ganhar forma — e é com quem está caminhando comigo nessa fase, como paciente e como parceiro de formação,
                  que eu quero compartilhá-lo.
                </p>
                <p>
                  Quero investir em tecnologia, diagnóstico, organização e qualidade clínica sem perder aquilo que considero
                  essencial: olhar nos olhos, explicar com calma, ouvir a história de cada pessoa e tratar cada paciente como
                  alguém que merece cuidado.
                </p>
                <p className="dream-quote">
                  Antes de qualquer diagnóstico, existe uma pessoa.<br />
                  Antes de qualquer tratamento, existe uma história.<br />
                  E antes de qualquer resultado clínico, precisa existir confiança.
                </p>
              </div>
              <div className="dream-pillars">
                <div>
                  <span>01</span>
                  <strong>Clínica moderna</strong>
                  <small>
                    Tecnologia a serviço de decisões melhores — nunca como substituta do olhar clínico e do julgamento humano.
                  </small>
                </div>
                <div>
                  <span>02</span>
                  <strong>Ambiente humanizado</strong>
                  <small>
                    Um espaço onde o paciente possa perguntar, dizer que está com medo e entender o que está acontecendo com a própria saúde.
                  </small>
                </div>
                <div>
                  <span>03</span>
                  <strong>Ciência e educação</strong>
                  <small>
                    Conhecimento transformado em informação clara e responsável. Explicar sem simplificar demais. Ensinar sem complicar.
                  </small>
                </div>
                <div>
                  <span>04</span>
                  <strong>Acesso e impacto</strong>
                  <small>
                    Espaço para projetos sociais e prevenção voltados a quem mais tem dificuldade de acesso ao cuidado odontológico.
                  </small>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* <section className="equipment-section">
        <div className="wrap">
          <Reveal>
            <div className="section-heading centered">
              <p className="eyebrow">O PRIMEIRO PASSO</p>
              <h2>Quatro equipamentos, uma base técnica</h2>
              <p>
                Um sonho grande fica mais real quando é dividido em partes possíveis. Hoje meu objetivo está concentrado
                em quatro equipamentos que são a base para começar a oferecer uma odontologia moderna, precisa e
                restauradora desde o início. Nenhum deles é luxo — são o que torna possível transformar teoria de sala
                de aula em cuidado real para cada paciente.
              </p>
            </div>
          </Reveal>

          <div className="equipment-grid">
            {equipment.map((item) => (
              <Reveal key={item.title}>
                <article className="equipment-card">
                  <div className="equipment-icon" aria-hidden="true">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      <section className="donation-section">
        <div className="wrap">
          <Reveal>
            <div className="donation-card">
              <div className="donation-copy">
                <p className="eyebrow">SE VOCÊ QUISER FAZER PARTE</p>
                <h2>Talvez esse sonho também possa ser construído por muitas mãos.</h2>
                <p>
                  Ainda existe um longo caminho entre sonhar e realizar. Será preciso estudar, trabalhar, investir, errar,
                  aprender, adquirir equipamentos e permanecer fiel aos princípios que deram origem a esse sonho.
                </p>
                <p>
                  Se essa história fizer sentido para você e você quiser apoiar esse projeto, existe a possibilidade de
                  contribuir voluntariamente por Pix. Não é obrigação, não muda o atendimento e não compra qualquer
                  benefício: é apenas uma forma de dizer "eu acredito que esse sonho pode fazer diferença."
                </p>
                <p className="donation-emotion">
                  Cada valor, por menor que seja, é uma peça real desse caminho — uma fração do scanner, da impressora,
                  do raio-X ou do notebook que vão sustentar um atendimento mais moderno e mais humano para você e para
                  quem vier depois. É um sonho que coloco nas mãos de Deus e que espero construir com trabalho,
                  responsabilidade e pessoas que acreditam que cuidar melhor é possível.
                </p>
              </div>

              <div className="pix-box">
                <div className="pix-mark">PIX</div>
                <p>Contribuição voluntária</p>
                <strong className="pix-placeholder">{pixKey || 'CHAVE PIX — CONFIGURE AQUI'}</strong>
                <button
                  type="button"
                  className="pix-copy"
                  onClick={() => pixKey && navigator.clipboard?.writeText(pixKey)}
                  disabled={!pixKey}
                >
                  Copiar chave Pix
                </button>
                <small>
                  A chave é configurada é o número de Telefone. Caso tenha dúvida, entre em contato.
                </small>
                <a href="https://api.whatsapp.com/message/BEOKJ7FBUSYEL1" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Entrar em contato
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="final-message">
              <span className="final-heart">♡</span>
              <p>
                <strong>Obrigado por acreditar.</strong><br />
                Se um dia esse sonho se tornar uma clínica, quero olhar para trás e lembrar que ele começou com estudo,
                trabalho, fé e pessoas que acreditaram que cuidar melhor é possível.
              </p>
              <span className="signature small">Matheus</span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}


// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import Reveal from '@/components/reveal'

// const leagues = [
//   {
//     title: 'LAIO — Liga Acadêmica de Radiologia Odontológica',
//     text: 'UFPI · Estudo de exames radiográficos e tomográficos, discussão de casos clínicos e participação em atividades científicas.',
//     icon: '⌁',
//   },
//   {
//     title: 'LAERO Focus — Liga Acadêmica de Reabilitação Oral',
//     text: 'Focus Educacional · Planejamento reabilitador, discussão de protocolos clínicos e atividades formativas.',
//     icon: '◯',
//   },
//   {
//     title: 'Tecnologia aplicada à Odontologia',
//     text: 'Interesse em inteligência artificial, diagnóstico por imagem e ferramentas digitais que possam apoiar decisões e aprendizagem.',
//     icon: '＋',
//   },
//   {
//     title: 'Ciência compartilhada',
//     text: 'Um compromisso pessoal de transformar conteúdos técnicos em materiais mais claros, responsáveis e acessíveis.',
//     icon: '✦',
//   },
// ]

// export default function AboutMe() {
//   const pixKey = process.env.NEXT_PUBLIC_PIX_KEY ?? ''

//   return (
//     <main className="about-page">
//       <div className="about-topbar wrap">
//         <Link href="/" className="about-back">← Voltar ao início</Link>
//       </div>

//       <section className="about-hero">
//         <div className="wrap about-hero-grid">
//           <Reveal>
//             <div>
//               <p className="eyebrow">SOBRE MIM — PROPÓSITO &amp; TRAJETÓRIA</p>
//               <h1>Uma história construída entre <span>tecnologia, ciência e cuidado.</span></h1>
//               <p className="about-lead">
//                 Eu acredito que a Odontologia pode ser mais do que procedimentos. Pode ser conhecimento que acolhe,
//                 tecnologia que aproxima e cuidado que devolve às pessoas confiança para sorrir.
//               </p>
//               <div className="signature">Matheus Vinute</div>
//               <p className="about-role">Odontologia · Radiologia · Reabilitação · Tecnologia</p>
//             </div>
//           </Reveal>

//           <Reveal>
//             <div className="about-portrait">
//               <Image src="/foto7.jpg" alt="Retrato de Matheus" width={773} height={773} priority />
//               <div className="portrait-note">
//                 <strong>Conhecimento com propósito.</strong>
//                 <span>Cuidado humano, ciência e inovação caminhando juntos.</span>
//               </div>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       <section className="story-section">
//         <div className="wrap story-grid">
//           <Reveal>
//             <div className="story-photo-stack">
//               <div className="story-photo main-photo">
//                 <Image src="/foto4.png" alt="Matheus em contexto profissional" width={773} height={773} />
//               </div>
//               <div className="story-photo scan-photo">
//                 <Image src="/foto5.png" alt="Tecnologia aplicada à radiologia odontológica" width={900} height={700} />
//               </div>
//               {/* <span className="photo-caption">Do estudo à prática: cada etapa faz parte da construção.</span> */}
//             </div>
//           </Reveal>

//           <Reveal>
//             <article className="story-copy">
//               <p className="eyebrow">MINHA HISTÓRIA</p>
//               <h2>Não quero apenas aprender Odontologia. Quero entender, compartilhar e transformar.</h2>

//               <div className="story-timeline">
//                 <div className="story-item">
//                   <span className="timeline-dot" />
//                   <div>
//                     <h3>Curiosidade antes de tudo</h3>
//                     <p>
//                       Minha trajetória começou na Tecnologia da Informação, onde aprendi a pensar em problemas, sistemas e soluções. Na Odontologia, encontrei uma nova dimensão para essa curiosidade: por trás de cada diagnóstico existe uma pessoa, uma história e uma necessidade de cuidado.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="story-item">
//                   <span className="timeline-dot" />
//                   <div>
//                     <h3>Uma nova forma de olhar a saúde</h3>
//                     <p>
//                       Ao entrar na Odontologia, encontrei uma combinação que me representa: ciência, precisão, criatividade, tecnologia e, acima de tudo, contato humano. A radiologia e a reabilitação oral se tornaram áreas que despertam especialmente minha curiosidade.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="story-item">
//                   <span className="timeline-dot" />
//                   <div>
//                     <h3>Academia como espaço de crescimento</h3>
//                     <p>
//                       As ligas acadêmicas, estudos, pesquisas e experiências práticas passaram a fazer parte dessa construção.
//                       São oportunidades para perguntar, testar, ouvir diferentes perspectivas e transformar conhecimento em ação.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="story-item">
//                   <span className="timeline-dot" />
//                   <div>
//                     <h3>O futuro que estou construindo</h3>
//                     <p>
//                       Meu sonho é criar uma clínica odontológica moderna, confortável e profundamente humanizada — um lugar em
//                       que tecnologia e excelência não substituam o cuidado, mas existam para tornar a experiência mais digna.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </article>
//           </Reveal>
//         </div>
//       </section>

//       <section className="leagues-section">
//         <div className="wrap">
//           <Reveal>
//             <div className="section-heading centered">
//               <p className="eyebrow">ALÉM DA SALA DE AULA</p>
//               <h2>Participações e experiências acadêmicas</h2>
//               <p>
//                 As ligas e atividades acadêmicas representam uma parte importante da minha formação: aprender com outras pessoas,
//                 discutir casos, estudar evidências e transformar curiosidade em conhecimento.
//               </p>
//             </div>
//           </Reveal>

//           <div className="league-grid">
//             {leagues.map((league) => (
//               <Reveal key={league.title}>
//                 <article className="league-card">
//                   <div className="league-icon" aria-hidden="true">{league.icon}</div>
//                   <h3>{league.title}</h3>
//                   <p>{league.text}</p>
//                 </article>
//               </Reveal>
//             ))}
//           </div>

//           <p className="data-note">
//             Essas experiências fazem parte da minha formação acadêmica e refletem duas áreas que quero continuar aprofundando: diagnóstico por imagem e reabilitação oral.
//           </p>
//         </div>
//       </section>

//       <section className="knowledge-section">
//         <div className="wrap knowledge-grid">
//           <Reveal>
//             <div className="knowledge-copy">
//               <p className="eyebrow">UM COMPROMISSO PESSOAL</p>
//               <h2>Conhecimento só transforma de verdade quando consegue chegar às pessoas.</h2>
//               <p>
//                 Uma das coisas que mais me motivam é tornar o conhecimento em saúde mais compreensível e acessível. Nem todo mundo
//                 tem tempo, formação ou acesso a materiais técnicos — e isso não deveria ser uma barreira para entender o próprio cuidado.
//               </p>
//               <p>
//                 Por isso, quero produzir conteúdos claros, responsáveis e baseados em evidências, aproximando a ciência da vida real.
//                 Explicar sem diminuir. Ensinar sem complicar. Compartilhar sem transformar conhecimento em privilégio.
//               </p>
//               <div className="values-row">
//                 <span>Educar</span>
//                 <span>Acolher</span>
//                 <span>Inovar</span>
//                 <span>Transformar</span>
//               </div>
//             </div>
//           </Reveal>
//           <Reveal>
//             <div className="knowledge-card">
//               <Image src="/foto6.jpg" alt="Imagem relacionada à tecnologia em odontologia" width={900} height={700} />
//               <div className="knowledge-overlay">
//                 <span>TECNOLOGIA + ODONTOLOGIA</span>
//                 <strong>Ferramentas devem servir às pessoas — nunca o contrário.</strong>
//               </div>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       <section className="dream-section">
//         <div className="wrap">
//           <Reveal>
//             <div className="dream-card">
//               <div className="dream-content">
//                 <p className="eyebrow">UM SONHO QUE ESTOU CONSTRUINDO</p>
//                 <h2>Uma clínica onde tecnologia e humanidade tenham o mesmo endereço.</h2>
//                 <p>
//                   Eu sonho em construir uma clínica odontológica moderna, confortável e acolhedora. Um espaço pensado para que o
//                   paciente se sinta respeitado, ouvido e seguro — desde a primeira conversa até o último sorriso.
//                 </p>
//                 <p>
//                   Quero investir em tecnologia, diagnóstico, organização e qualidade clínica sem perder aquilo que considero essencial:
//                   olhar nos olhos, explicar com calma, ouvir a história de cada pessoa e tratar cada paciente como alguém que merece cuidado.
//                 </p>
//               </div>
//               <div className="dream-pillars">
//                 <div><span>01</span><strong>Clínica moderna</strong><small>Tecnologia a serviço de decisões melhores.</small></div>
//                 <div><span>02</span><strong>Ambiente humanizado</strong><small>Conforto, respeito e acolhimento.</small></div>
//                 <div><span>03</span><strong>Acesso e impacto</strong><small>Excelência que também olha para quem mais precisa.</small></div>
//               </div>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       <section className="donation-section">
//         <div className="wrap">
//           <Reveal>
//             <div className="donation-card">
//               <div className="donation-copy">
//                 <p className="eyebrow">SE VOCÊ QUISER FAZER PARTE</p>
//                 <h2>Talvez esse sonho também possa ser construído por muitas mãos.</h2>
//                 <p>
//                   Se essa história fizer sentido para você e você quiser apoiar esse projeto, existe a possibilidade de contribuir
//                   voluntariamente por Pix. Não é obrigação, não muda o atendimento e não compra qualquer benefício: é apenas uma forma
//                   de ajudar a transformar uma ideia em realidade.
//                 </p>
//                 <p className="donation-emotion">
//                   Cada contribuição representa um pequeno passo em direção a um lugar onde mais pessoas possam encontrar cuidado,
//                   tecnologia, dignidade e esperança. É um sonho que coloco nas mãos de Deus e que espero construir com trabalho,
//                   responsabilidade e pessoas que acreditam que cuidar melhor é possível.
//                 </p>
//               </div>

//               <div className="pix-box">
//                 <div className="pix-mark">PIX</div>
//                 <p>Contribuição voluntária</p>
//                 <strong className="pix-placeholder">{pixKey || 'CHAVE PIX — CONFIGURE AQUI'}</strong>
//                 <button
//                   type="button"
//                   className="pix-copy"
//                   onClick={() => pixKey && navigator.clipboard?.writeText(pixKey)}
//                   disabled={!pixKey}
//                 >
//                   Copiar chave Pix
//                 </button>
//                 <small>
//                   A chave é configurada é o número de Telefone. Caso tenha dúvida, entre em contato.
//                 </small>
//                 <a href="https://api.whatsapp.com/message/BEOKJ7FBUSYEL1" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
//                   Entrar em contato
//                 </a>
//               </div>
//             </div>
//           </Reveal>

//           <Reveal>
//             <div className="final-message">
//               <span className="final-heart">♡</span>
//               <p>
//                 <strong>Obrigado por acreditar.</strong><br />
//                 Se um dia esse sonho se tornar uma clínica, quero olhar para trás e lembrar que ele começou com estudo,
//                 trabalho, fé e pessoas que acreditaram que cuidar melhor é possível.
//               </p>
//               <span className="signature small">Matheus</span>
//             </div>
//           </Reveal>
//         </div>
//       </section>
//     </main>
//   )
// }
