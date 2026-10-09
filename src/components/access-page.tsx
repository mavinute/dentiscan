'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import Image from 'next/image'

const SPECIALTIES = [
  'Clínica geral',
  'Dentística',
  'Endodontia',
  'Implantodontia',
  'Odontopediatria',
  'Ortodontia',
  'Periodontia',
  'Prótese dentária',
  'Radiologia odontológica',
  'Cirurgia e traumatologia bucomaxilofacial',
  'Reabilitação oral',
  'Outra especialidade',
]

type AddressData = {
  logradouro?: string
  bairro?: string
  localidade?: string
  uf?: string
  erro?: boolean
}

type RegistrationData = {
  doctorName: string
  clinicName: string
  email: string
  phone: string
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  specialties: string[]
  password: string
  confirmPassword: string
  acceptPrivacy: boolean
}

const initialRegistration: RegistrationData = {
  doctorName: '', clinicName: '', email: '', phone: '', cep: '', street: '',
  number: '', complement: '', neighborhood: '', city: '', state: '',
  specialties: [], password: '', confirmPassword: '', acceptPrivacy: false,
}

function digits(value: string) {
  return value.replace(/\D/g, '')
}

function formatCep(value: string) {
  const cleaned = digits(value).slice(0, 8)
  return cleaned.length > 5 ? `${cleaned.slice(0, 5)}-${cleaned.slice(5)}` : cleaned
}

function formatPhone(value: string) {
  const cleaned = digits(value).slice(0, 11)
  if (cleaned.length <= 2) return cleaned
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
  if (cleaned.length <= 10) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
}

export default function AccessPage() {
  const [mode, setMode] = useState<'login' | 'register'>('register')
  const [registration, setRegistration] = useState<RegistrationData>(initialRegistration)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [cepLoading, setCepLoading] = useState(false)
  const [cepMessage, setCepMessage] = useState('')
  const [notice, setNotice] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)

  function updateRegistration<K extends keyof RegistrationData>(key: K, value: RegistrationData[K]) {
    setRegistration((current) => ({ ...current, [key]: value }))
  }

  async function lookupCep(rawCep: string) {
    const cep = digits(rawCep)
    if (cep.length !== 8) {
      setCepMessage(cep.length ? 'Informe os 8 dígitos do CEP.' : '')
      return
    }
    setCepLoading(true)
    setCepMessage('Consultando CEP…')
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      if (!response.ok) throw new Error('Não foi possível consultar o CEP agora.')
      const data = (await response.json()) as AddressData
      if (data.erro) {
        setCepMessage('CEP não encontrado. Confira os números e tente novamente.')
        setRegistration((current) => ({ ...current, street: '', neighborhood: '', city: '', state: '' }))
        return
      }
      setRegistration((current) => ({
        ...current,
        cep: formatCep(cep),
        street: data.logradouro ?? '',
        neighborhood: data.bairro ?? '',
        city: data.localidade ?? '',
        state: data.uf ?? '',
      }))
      setCepMessage('Endereço localizado. Confira os dados antes de continuar.')
    } catch {
      setCepMessage('Falha na consulta. Verifique sua conexão ou preencha o endereço manualmente.')
    } finally {
      setCepLoading(false)
    }
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice({
      type: 'info',
      text: 'A tela de login está pronta, mas a autenticação ainda precisa ser conectada a um provedor seguro (por exemplo, Firebase Authentication). Nenhuma senha foi enviada ou armazenada.',
    })
  }

  function handleRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!registration.specialties.length) {
      setNotice({ type: 'error', text: 'Selecione ao menos uma especialidade ou área de atuação.' })
      return
    }
    if (registration.password.length < 8) {
      setNotice({ type: 'error', text: 'A senha deve ter pelo menos 8 caracteres.' })
      return
    }
    if (registration.password !== registration.confirmPassword) {
      setNotice({ type: 'error', text: 'As senhas não coincidem. Confira os dois campos.' })
      return
    }
    if (!registration.acceptPrivacy) {
      setNotice({ type: 'error', text: 'Leia e aceite o aviso de privacidade para continuar.' })
      return
    }
    setNotice({
      type: 'info',
      text: 'Formulário validado nesta interface. Para criar a conta de verdade, é necessário conectar o cadastro a um serviço de autenticação e persistência. Os dados não foram salvos.',
    })
  }

  function changeMode(nextMode: 'login' | 'register') {
    setMode(nextMode)
    setNotice(null)
  }

  return (
    <main className="access-page">
      <div className="access-topbar wrap">
        <a href="/" className="access-brand" aria-label="Dentiscan — página inicial">
          <Image src="/logo.png" alt="" width={34} height={34} priority />
          <span>Dentiscan</span>
          <span className="access-brand-tag">ÁREA PROFISSIONAL</span>
        </a>
        <a className="access-back" href="/">Voltar ao site <span aria-hidden="true">↗</span></a>
      </div>

      <div className={`access-layout wrap ${mode === 'register' ? 'is-register' : 'is-login'}`}>
        <aside className="access-intro">
          <p className="access-eyebrow"><span /> ESPAÇO PROFISSIONAL</p>
          <h1>Odontologia com cuidado, <em>conhecimento</em> e conexão.</h1>
          <p className="access-intro-copy">Organize sua presença profissional e mantenha as informações da sua clínica em um só lugar.</p>
          <div className="access-benefits">
            <div className="access-benefit-icon" aria-hidden="true">✳</div>
            <div><strong>Seu perfil profissional</strong><span>Dados da clínica e áreas de atuação reunidos em um único perfil.</span></div>
          </div>
          <div className="access-benefits">
            <div className="access-benefit-icon" aria-hidden="true">⌖</div>
            <div><strong>Cadastro de endereço facilitado</strong><span>Consulte o CEP para preencher automaticamente os dados disponíveis.</span></div>
          </div>
          <p className="access-note">O cadastro desta versão é uma interface demonstrativa. A criação de contas será ativada após a integração de autenticação.</p>
          <div className="access-decor access-decor-one" />
          <div className="access-decor access-decor-two" />
        </aside>

        <section className="access-panel" aria-labelledby="access-title">
          <div className="access-panel-heading">
            <p className="access-step">BEM-VINDO(A) AO DENTISCAN</p>
            <h2 id="access-title">{mode === 'register' ? 'Crie seu perfil' : 'Que bom ter você de volta'}</h2>
            <p>{mode === 'register' ? 'Preencha os dados profissionais para começar.' : 'Entre com seu e-mail e senha para acessar sua conta.'}</p>
          </div>

          <div className="access-tabs" role="tablist" aria-label="Acesso à área profissional">
            <button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'active' : ''} onClick={() => changeMode('login')}>Entrar</button>
            <button type="button" role="tab" aria-selected={mode === 'register'} className={mode === 'register' ? 'active' : ''} onClick={() => changeMode('register')}>Criar cadastro</button>
          </div>

          {notice && <div className={`access-notice ${notice.type}`} role="status">{notice.text}</div>}

          {mode === 'login' ? (
            <form className="access-form" onSubmit={handleLogin}>
              <div className="access-field">
                <label htmlFor="login-email">E-mail profissional</label>
                <input id="login-email" name="email" type="email" autoComplete="email" placeholder="voce@clinica.com.br" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} required />
              </div>
              <div className="access-field">
                <label htmlFor="login-password">Senha</label>
                <div className="access-password-wrap">
                  <input id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Digite sua senha" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} required />
                  <button type="button" className="access-show-password" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>{showPassword ? 'Ocultar' : 'Mostrar'}</button>
                </div>
              </div>
              <div className="access-login-options"><label className="access-check"><input type="checkbox" /> <span>Manter conectado neste dispositivo</span></label><button type="button" className="access-text-button" onClick={() => setNotice({ type: 'info', text: 'A recuperação de senha será disponibilizada quando a autenticação estiver conectada.' })}>Esqueci minha senha</button></div>
              <button className="access-submit" type="submit">Entrar na minha conta <span aria-hidden="true">→</span></button>
              <p className="access-switch-copy">Ainda não tem perfil? <button type="button" onClick={() => changeMode('register')}>Cadastre sua clínica</button></p>
            </form>
          ) : (
            <form className="access-form" onSubmit={handleRegistration}>
              <div className="access-form-section"><span className="access-section-number">01</span><div><h3>Dados profissionais</h3><p>Identificação do profissional e da clínica.</p></div></div>
              <div className="access-fields-grid">
                <div className="access-field access-span-2"><label htmlFor="doctor-name">Nome do(a) dentista <span>*</span></label><input id="doctor-name" name="doctorName" autoComplete="name" placeholder="Ex.: Dra. Ana Oliveira" value={registration.doctorName} onChange={(e) => updateRegistration('doctorName', e.target.value)} required /></div>
                <div className="access-field access-span-2"><label htmlFor="clinic-name">Nome da clínica <span>*</span></label><input id="clinic-name" name="clinicName" autoComplete="organization" placeholder="Ex.: Clínica Sorriso" value={registration.clinicName} onChange={(e) => updateRegistration('clinicName', e.target.value)} required /></div>
                <div className="access-field"><label htmlFor="register-email">E-mail profissional <span>*</span></label><input id="register-email" name="email" type="email" autoComplete="email" placeholder="voce@clinica.com.br" value={registration.email} onChange={(e) => updateRegistration('email', e.target.value)} required /></div>
                <div className="access-field"><label htmlFor="register-phone">Telefone / WhatsApp <span>*</span></label><input id="register-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(00) 00000-0000" value={registration.phone} onChange={(e) => updateRegistration('phone', formatPhone(e.target.value))} required /></div>
              </div>

              <div className="access-form-section"><span className="access-section-number">02</span><div><h3>Endereço da clínica</h3><p>Informe o CEP para buscar os dados postais.</p></div></div>
              <div className="access-fields-grid">
                <div className="access-field"><label htmlFor="cep">CEP <span>*</span></label><div className="access-cep-row"><input id="cep" name="cep" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" value={registration.cep} onChange={(e) => { const value = formatCep(e.target.value); updateRegistration('cep', value); setCepMessage('') }} onBlur={() => { if (digits(registration.cep).length === 8) void lookupCep(registration.cep) }} required /><button type="button" onClick={() => void lookupCep(registration.cep)} disabled={cepLoading}>{cepLoading ? 'Buscando…' : 'Buscar CEP'}</button></div>{cepMessage && <small className={`access-cep-message ${cepMessage.startsWith('Falha') || cepMessage.startsWith('CEP não') || cepMessage.startsWith('Informe') ? 'error' : 'success'}`} aria-live="polite">{cepMessage}</small>}</div>
                <div className="access-field"><label htmlFor="street">Rua / logradouro <span>*</span></label><input id="street" name="street" autoComplete="address-line1" placeholder="Nome da rua ou avenida" value={registration.street} onChange={(e) => updateRegistration('street', e.target.value)} required /></div>
                <div className="access-field"><label htmlFor="number">Número <span>*</span></label><input id="number" name="number" placeholder="Nº" value={registration.number} onChange={(e) => updateRegistration('number', e.target.value)} required /></div>
                <div className="access-field"><label htmlFor="complement">Complemento</label><input id="complement" name="complement" placeholder="Sala, conjunto (opcional)" value={registration.complement} onChange={(e) => updateRegistration('complement', e.target.value)} /></div>
                <div className="access-field"><label htmlFor="neighborhood">Bairro <span>*</span></label><input id="neighborhood" name="neighborhood" autoComplete="address-level3" placeholder="Bairro" value={registration.neighborhood} onChange={(e) => updateRegistration('neighborhood', e.target.value)} required /></div>
                <div className="access-field"><label htmlFor="city">Cidade <span>*</span></label><input id="city" name="city" autoComplete="address-level2" placeholder="Cidade" value={registration.city} onChange={(e) => updateRegistration('city', e.target.value)} required /></div>
                <div className="access-field"><label htmlFor="state">Estado (UF) <span>*</span></label><input id="state" name="state" autoComplete="address-level1" maxLength={2} placeholder="UF" value={registration.state} onChange={(e) => updateRegistration('state', e.target.value.toUpperCase())} required /></div>
              </div>

              <div className="access-form-section"><span className="access-section-number">03</span><div><h3>Especialidades e áreas de atuação</h3><p>Selecione todas as opções que se aplicam.</p></div></div>
              <div className="access-specialties">
                {SPECIALTIES.map((specialty) => <label key={specialty} className={`access-specialty ${registration.specialties.includes(specialty) ? 'selected' : ''}`}><input type="checkbox" checked={registration.specialties.includes(specialty)} onChange={(e) => updateRegistration('specialties', e.target.checked ? [...registration.specialties, specialty] : registration.specialties.filter((item) => item !== specialty))} /><span className="access-specialty-check" aria-hidden="true">✓</span><span>{specialty}</span></label>)}
              </div>

              <div className="access-form-section"><span className="access-section-number">04</span><div><h3>Segurança da conta</h3><p>Crie uma senha para seu acesso.</p></div></div>
              <div className="access-fields-grid">
                <div className="access-field"><label htmlFor="register-password">Senha <span>*</span></label><input id="register-password" name="password" type="password" autoComplete="new-password" minLength={8} placeholder="Mínimo de 8 caracteres" value={registration.password} onChange={(e) => updateRegistration('password', e.target.value)} required /><small>Use pelo menos 8 caracteres.</small></div>
                <div className="access-field"><label htmlFor="confirm-password">Confirmar senha <span>*</span></label><input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} placeholder="Digite a senha novamente" value={registration.confirmPassword} onChange={(e) => updateRegistration('confirmPassword', e.target.value)} required /></div>
              </div>
              <label className="access-privacy-check"><input type="checkbox" checked={registration.acceptPrivacy} onChange={(e) => updateRegistration('acceptPrivacy', e.target.checked)} required /><span>Li e concordo com o aviso de privacidade e autorizo o tratamento dos dados necessários para a gestão do meu perfil profissional.</span></label>
              <button className="access-submit" type="submit">Validar cadastro <span aria-hidden="true">→</span></button>
              <p className="access-switch-copy">Já tem cadastro? <button type="button" onClick={() => changeMode('login')}>Entrar na conta</button></p>
              <p className="access-form-footnote">Os dados deste formulário são mantidos apenas no estado temporário da página. Não são enviados a um servidor nem armazenados.</p>
            </form>
          )}
          <div className="access-panel-footer"><span className="access-footer-mark">D</span><span>Odontologia, ciência e tecnologia.</span><span className="access-footer-secure">◈ Ambiente demonstrativo</span></div>
        </section>
      </div>
    </main>
  )
}
