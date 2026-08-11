import Reveal from './reveal'

export default function CtaBand() {
  return (
    <section>
      <div className="wrap">
        <Reveal className="cta-band">
          <h2>Vamos falar sobre odontologia?</h2>
          <p>
            Entre em contato para conversar sobre tratamento odontologico, diagnóstico por imagem ou tecnologia aplicada à odontologia. Estou à disposição para trocar ideias, esclarecer dúvidas e explorar oportunidades de colaboração.
          </p>
          <a href="https://api.whatsapp.com/message/BEOKJ7FBUSYEL1" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Entrar em contato
          </a>
        </Reveal>
      </div>
    </section>
  )
}
