'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { onAuthStateChanged, type User } from 'firebase/auth'
import {
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

type SubscriptionStatus = 'pending_payment' | 'active' | 'past_due' | 'canceled' | 'expired'
type PaymentMethod = 'credit_card' | 'pix'
type SubscriptionProvider = 'pagbank_recurring_link' | 'pagbank_pix_link'

type SubscriptionRecord = {
  uid: string
  planId: 'monthly'
  provider: SubscriptionProvider
  paymentMethod?: PaymentMethod
  status: SubscriptionStatus
  amountCents: number
  createdAt?: Timestamp
  currentPeriodEnd?: Timestamp
  adminNote?: string
}

const RECURRING_CARD_URL = process.env.NEXT_PUBLIC_PAGBANK_RECURRING_URL ?? ''
const ONE_TIME_PIX_URL = process.env.NEXT_PUBLIC_PAGBANK_PIX_URL ?? ''
const PRICE_CENTS = Number(process.env.NEXT_PUBLIC_DENTISCAN_MONTHLY_PRICE_CENTS ?? '0')

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function statusLabel(status: SubscriptionStatus) {
  const labels: Record<SubscriptionStatus, string> = {
    pending_payment: 'Aguardando confirmação',
    active: 'Assinatura ativa',
    past_due: 'Pagamento pendente',
    canceled: 'Assinatura cancelada',
    expired: 'Assinatura expirada',
  }
  return labels[status]
}

export default function SubscriptionPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [subscription, setSubscription] = useState<SubscriptionRecord | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const selectedPaymentUrl = paymentMethod === 'pix' ? ONE_TIME_PIX_URL : RECURRING_CARD_URL
  const configurationReady = Number.isInteger(PRICE_CENTS) && PRICE_CENTS > 0
    && Boolean(selectedPaymentUrl)
  const canStart = configurationReady && (!subscription
    || ['pending_payment', 'canceled', 'expired', 'past_due'].includes(subscription.status))

  useEffect(() => {
    let unsubscribeSubscription: (() => void) | undefined
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      unsubscribeSubscription?.()
      setUser(currentUser)
      if (!currentUser) {
        setLoading(false)
        router.replace('/acesso')
        return
      }

      setLoading(true)
      unsubscribeSubscription = onSnapshot(
        doc(db, 'subscriptions', currentUser.uid),
        (snapshot) => {
          const record = snapshot.exists() ? snapshot.data() as SubscriptionRecord : null
          setSubscription(record)
          if (record?.paymentMethod) setPaymentMethod(record.paymentMethod)
          setLoading(false)
        },
        (snapshotError) => {
          console.error('Falha ao consultar assinatura:', snapshotError)
          setError('Não foi possível consultar sua assinatura. Verifique sua conexão e as regras do Firestore.')
          setLoading(false)
        },
      )
    })

    return () => {
      unsubscribeAuth()
      unsubscribeSubscription?.()
    }
  }, [router])

  const currentPeriodEnd = useMemo(() => {
    if (!subscription?.currentPeriodEnd) return null
    return subscription.currentPeriodEnd.toDate().toLocaleDateString('pt-BR')
  }, [subscription])

  async function startSubscription() {
    if (!user || !configurationReady || !canStart) return
    setSubmitting(true)
    setError('')

    const provider: SubscriptionProvider = paymentMethod === 'pix'
      ? 'pagbank_pix_link'
      : 'pagbank_recurring_link'

    try {
      const subscriptionRef = doc(db, 'subscriptions', user.uid)
      const payload = {
        uid: user.uid,
        email: user.email ?? '',
        planId: 'monthly' as const,
        provider,
        paymentMethod,
        status: 'pending_payment' as const,
        amountCents: PRICE_CENTS,
      }

      if (!subscription) {
        await setDoc(subscriptionRef, {
          ...payload,
          createdAt: serverTimestamp(),
        })
      } else {
        await updateDoc(subscriptionRef, {
          provider,
          paymentMethod,
          status: 'pending_payment',
          amountCents: PRICE_CENTS,
          updatedAt: serverTimestamp(),
        })
      }

      // A confirmação não é inferida pelo retorno do checkout. O administrador
      // confere a transação no PagBank antes de ativar o acesso no Firestore.
      window.location.assign(selectedPaymentUrl)
    } catch (startError) {
      console.error('Não foi possível registrar a solicitação de assinatura:', startError)
      setError('Não foi possível iniciar o pagamento. Confira as regras do Firestore e tente novamente.')
      setSubmitting(false)
    }
  }

  if (loading) return <main className="subscription-loading">Carregando informações da assinatura…</main>
  if (!user) return <main className="subscription-loading">Redirecionando para o acesso…</main>

  return (
    <main className="subscription-page">
      <div className="subscription-container">
        <Link href="/dashboard" className="subscription-back">← Voltar ao painel</Link>

        <header className="subscription-heading">
          <span className="subscription-eyebrow">DENTISCAN · ÁREA PROFISSIONAL</span>
          <h1>Assinatura</h1>
          <p>Escolha como deseja pagar seu plano mensal.</p>
        </header>

        <section className="subscription-plan-card">
          <div className="subscription-plan-topline">
            <span className="subscription-plan-tag">PLANO MENSAL</span>
            {subscription && <span className={`subscription-status status-${subscription.status}`}>{statusLabel(subscription.status)}</span>}
          </div>
          <h2>Dentiscan Profissional</h2>
          <p className="subscription-price">
            {PRICE_CENTS > 0 ? formatPrice(PRICE_CENTS) : 'Preço não configurado'}
            <span>/ mês</span>
          </p>
          <p className="subscription-description">Acesso às ferramentas profissionais do Dentiscan durante o período contratado.</p>

          {subscription?.status === 'active' && (
            <div className="subscription-feedback success">
              Sua assinatura está ativa. {currentPeriodEnd ? `Período atual até ${currentPeriodEnd}.` : 'Seu acesso está liberado.'}
            </div>
          )}
          {subscription?.status === 'pending_payment' && (
            <div className="subscription-feedback info">
              Sua solicitação está pendente. Você pode continuar com o método selecionado ou escolher outra forma de pagamento. O acesso será liberado após a conferência do pagamento.
            </div>
          )}
          {subscription?.status === 'past_due' && (
            <div className="subscription-feedback warning">Existe uma pendência na assinatura. Escolha uma forma de pagamento para regularizar o período.</div>
          )}
          {subscription?.status === 'canceled' && (
            <div className="subscription-feedback warning">Sua assinatura está cancelada. Você pode iniciar uma nova contratação.</div>
          )}
          {subscription?.status === 'expired' && (
            <div className="subscription-feedback warning">O período da sua assinatura terminou. Você pode contratar novamente.</div>
          )}

          {subscription?.status !== 'active' && (
            <div className="subscription-payment-options" aria-label="Forma de pagamento">
              <button
                type="button"
                className={`subscription-payment-option ${paymentMethod === 'credit_card' ? 'selected' : ''}`}
                aria-pressed={paymentMethod === 'credit_card'}
                onClick={() => setPaymentMethod('credit_card')}
              >
                <span className="subscription-payment-icon" aria-hidden="true">▰</span>
                <span><strong>Cartão de crédito</strong><small>Cobrança recorrente mensal</small></span>
                <span className="subscription-payment-radio" aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`subscription-payment-option ${paymentMethod === 'pix' ? 'selected' : ''}`}
                aria-pressed={paymentMethod === 'pix'}
                onClick={() => setPaymentMethod('pix')}
              >
                <span className="subscription-payment-icon pix-icon" aria-hidden="true">▦</span>
                <span><strong>Pix</strong><small>Pagamento mensal manual</small></span>
                <span className="subscription-payment-radio" aria-hidden="true" />
              </button>
            </div>
          )}

          {paymentMethod === 'pix' && subscription?.status !== 'active' && (
            <div className="subscription-feedback info">
              No Pix, cada mensalidade é paga individualmente. Após o pagamento, envie/aguarde a conferência do comprovante. A renovação não é automática.
            </div>
          )}
          {paymentMethod === 'credit_card' && subscription?.status !== 'active' && (
            <div className="subscription-feedback info">
              O cartão utiliza o link recorrente do PagBank. As cobranças futuras seguem a recorrência configurada no painel PagBank.
            </div>
          )}

          {!configurationReady && subscription?.status !== 'active' && (
            <div className="subscription-feedback warning">
              Esta forma de pagamento ainda não está configurada. O administrador precisa cadastrar o link correspondente e o preço mensal nas variáveis de ambiente.
            </div>
          )}

          {error && <div className="subscription-feedback error" role="alert">{error}</div>}

          {subscription?.status !== 'active' && (
            <button className="subscription-primary-button" type="button" onClick={() => void startSubscription()} disabled={!canStart || submitting}>
              {submitting ? 'Preparando pagamento…' : paymentMethod === 'pix' ? 'Pagar mensalidade com Pix' : 'Continuar com cartão'}
              {!submitting && <span aria-hidden="true">→</span>}
            </button>
          )}
          <p className="subscription-secure-note">O pagamento acontece no ambiente seguro do PagBank. O Dentiscan não armazena dados bancários ou de cartão.</p>
        </section>

        <section className="subscription-information">
          <h3>Como funciona o pagamento?</h3>
          <ol>
            <li><strong>Cartão:</strong> a contratação é feita pelo link recorrente do PagBank, com cobrança mensal automática conforme as condições do link.</li>
            <li><strong>Pix:</strong> a contratação usa um link de pagamento comum com Pix habilitado. Cada mensalidade exige um novo pagamento; não é uma cobrança recorrente automática.</li>
            <li>O Dentiscan registra a solicitação como pendente.</li>
            <li>A equipe confere o pagamento no painel PagBank e atualiza a assinatura para liberar ou renovar o acesso.</li>
          </ol>
          <p>Para conta Pessoa Física, o link recorrente do PagBank é limitado a cartão de crédito. O Pix é oferecido por um link de pagamento avulso, com renovação mensal manual.</p>
        </section>
      </div>
    </main>
  )
}
