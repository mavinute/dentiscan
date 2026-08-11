import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contato">
      <svg
        className="foot-wave"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        width="100%"
        height="60"
      >
        <path
          fill="#10181d"
          d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,0 L0,0 Z"
        />
      </svg>
      <div className="foot-wrap">
        <div className="foot-top">
          <div>
            <div className="foot-brand">
              <Image src="/logo.png" alt="Dentiscan" width={28} height={28} />
              Dentiscan
            </div>
            <p style={{ maxWidth: 280, fontSize: 13.5, color: '#8b979c', marginTop: 14 }}>
              Portfólio acadêmico de radiologia odontológica e reabilitação oral.
            </p>
          </div>
          <div className="foot-links foot-col">
            <span>Navegação</span>
            <a href="#sobre">Sobre</a>
            <a href="#formacao">Formação</a>
            <a href="#casos">Casos</a>
          </div>
          <div className="foot-links foot-col">
            <span>Contato</span>
            <a href="mailto:matheus_vinute@hotmail.com">Email</a>
            <a href="https://www.instagram.com/dentiscan__">Instagram</a>
            <a href="#">Lattes</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {year} Dentiscan. Todos os direitos reservados.</span>
          <span>Feito por um estudante de Odontologia apaixonado por tecnologia.</span>
        </div>
      </div>
    </footer>
  )
}
