'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, type User } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

type Status = 'pending_payment' | 'active' | 'past_due' | 'canceled' | 'expired'
type PaymentMethod = 'credit_card' | 'pix'
type Subscription = {
  uid: string
  email?: string
  planId: 'monthly'
  provider: 'pagbank_recurring_link' | 'pagbank_pix_link'
  paymentMethod?: PaymentMethod
  status: Status
  amountCents: number
  createdAt?: Timestamp
  currentPeriodEnd?: Timestamp
  adminNote?: string
}

type SubscriptionRow = Subscription & { id: string }

const statusLabels: Record<Status, string> = {
  pending_payment: 'Aguardando pagamento',
  active: 'Ativa',
  past_due: 'Pagamento pendente',
  canceled: 'Cancelada',
  expired: 'Expirada',
}

function money(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function dateInputValue(value?: Timestamp) {
  const date = value?.toDate() ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

export default function AdminSubscriptionsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)
  const [rows, setRows] = useState<SubscriptionRow[]>([])
  const [filter, setFilter] = useState<'all' | Status>('all')
  const [dates, setDates] = useState<Record<string, string>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    let stopRows: (() => void) | undefined
    const stopAuth = onAuthStateChanged(auth, async (current) => {
      stopRows?.()
      setUser(current)
      if (!current) {
        router.replace('/acesso')
        return
      }
      try {
        const adminDoc = await getDoc(doc(db, 'admins', current.uid))
        if (!adminDoc.exists() || adminDoc.data().enabled !== true) {
          setAuthorized(false)
          setChecking(false)
          return
        }
        setAuthorized(true)
        stopRows = onSnapshot(
          query(collection(db, 'subscriptions'), orderBy('createdAt', 'desc')),
          (snapshot) => {
            setRows(snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Subscription) })))
            setChecking(false)
          },
          (error) => {
            console.error('Falha ao carregar assinaturas:', error)
            setFeedback('Não foi possível carregar as assinaturas. Verifique as regras do Firestore.')
            setChecking(false)
          },
        )
      } catch (error) {
        console.error('Falha ao verificar administrador:', error)
        setAuthorized(false)
        setChecking(false)
      }
    })
    return () => {
      stopAuth()
      stopRows?.()
    }
  }, [router])

  const visibleRows = useMemo(
    () => filter === 'all' ? rows : rows.filter((row) => row.status === filter),
    [filter, rows],
  )

  async function saveStatus(row: SubscriptionRow, status: Status) {
    if (!user) return
    if (status === 'active' && !dates[row.id]) {
      setFeedback('Informe a data final do período contratado antes de ativar.')
      return
    }
    setSaving(row.id)
    setFeedback('')
    try {
      const update = {
        status,
        adminNote: notes[row.id]?.trim() ?? row.adminNote ?? '',
        updatedAt: serverTimestamp(),
        updatedBy: user.uid,
        ...(status === 'active'
          ? { currentPeriodEnd: Timestamp.fromDate(new Date(`${dates[row.id]}T23:59:59`)) }
          : {}),
      }
      await updateDoc(doc(db, 'subscriptions', row.id), update)
      setFeedback(`Assinatura de ${row.email || row.uid} atualizada para “${statusLabels[status]}”.`)
    } catch (error) {
      console.error('Falha ao atualizar assinatura:', error)
      setFeedback('Não foi possível atualizar. Confirme se seu usuário está cadastrado como administrador e se as regras foram publicadas.')
    } finally {
      setSaving(null)
    }
  }

  if (checking) return <main className="subscription-loading">Verificando acesso administrativo…</main>
  if (!user) return <main className="subscription-loading">Redirecionando…</main>
  if (!authorized) return (
    <main className="subscription-page">
      <div className="subscription-container">
        <Link href="/dashboard" className="subscription-back">← Voltar ao painel</Link>
        <section className="subscription-plan-card">
          <h1>Acesso restrito</h1>
          <p>Esta área é exclusiva para administradores autorizados do Dentiscan.</p>
        </section>
      </div>
    </main>
  )

  return (
    <main className="subscription-page admin-subscriptions-page">
      <div className="subscription-container">
        <Link href="/dashboard" className="subscription-back">← Voltar ao painel</Link>
        <header className="subscription-heading">
          <span className="subscription-eyebrow">DENTISCAN · ADMINISTRAÇÃO</span>
          <h1>Assinaturas</h1>
          <p>Confira os pagamentos no painel PagBank antes de alterar qualquer situação nesta tela. Pix exige conferência a cada mensalidade.</p>
        </header>

        <section className="admin-summary-grid">
          <div><strong>{rows.length}</strong><span>Solicitações</span></div>
          <div><strong>{rows.filter((r) => r.status === 'active').length}</strong><span>Ativas</span></div>
          <div><strong>{rows.filter((r) => r.status === 'pending_payment').length}</strong><span>Pendentes</span></div>
          <div><strong>{rows.filter((r) => r.status === 'past_due').length}</strong><span>Com pendência</span></div>
        </section>

        <div className="admin-filter-row">
          <label htmlFor="subscription-filter">Filtrar situação</label>
          <select id="subscription-filter" value={filter} onChange={(event) => setFilter(event.target.value as 'all' | Status)}>
            <option value="all">Todas</option>
            {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <a href="https://assinaturas.pagbank.com.br/login" target="_blank" rel="noreferrer">Abrir painel PagBank ↗</a>
        </div>

        {feedback && <p className="subscription-feedback info" role="status">{feedback}</p>}
        <section className="admin-subscription-list">
          {visibleRows.length === 0 ? <p className="admin-empty">Nenhuma assinatura encontrada para este filtro.</p> : visibleRows.map((row) => (
            <article className="admin-subscription-card" key={row.id}>
              <div className="admin-subscription-header">
                <div><strong>{row.email || 'E-mail não informado'}</strong><small>UID: {row.uid}</small></div>
                <span className={`subscription-status status-${row.status}`}>{statusLabels[row.status]}</span>
              </div>
              <div className="admin-subscription-meta">
                <span>Plano mensal</span><strong>{money(row.amountCents)}</strong>
                <span>Forma de pagamento</span><strong>{row.paymentMethod === 'pix' ? 'Pix (avulso / renovação manual)' : 'Cartão de crédito (recorrente)'}</strong>
                <span>Solicitação</span><strong>{row.createdAt?.toDate().toLocaleString('pt-BR') ?? 'Data não disponível'}</strong>
                {row.currentPeriodEnd && <><span>Válida até</span><strong>{row.currentPeriodEnd.toDate().toLocaleDateString('pt-BR')}</strong></>}
              </div>
              <div className="admin-subscription-controls">
                <label>Validade do acesso
                  <input type="date" value={dates[row.id] ?? dateInputValue(row.currentPeriodEnd)} onChange={(event) => setDates((old) => ({ ...old, [row.id]: event.target.value }))} />
                </label>
                <label>Observação administrativa
                  <input type="text" maxLength={240} placeholder="Ex.: pagamento conferido no PagBank" value={notes[row.id] ?? row.adminNote ?? ''} onChange={(event) => setNotes((old) => ({ ...old, [row.id]: event.target.value }))} />
                </label>
                <div className="admin-status-actions">
                  <button type="button" disabled={saving === row.id} onClick={() => void saveStatus(row, 'active')}>Ativar</button>
                  <button type="button" className="secondary" disabled={saving === row.id} onClick={() => void saveStatus(row, 'past_due')}>Pendente</button>
                  <button type="button" className="secondary" disabled={saving === row.id} onClick={() => void saveStatus(row, 'canceled')}>Cancelar</button>
                  <button type="button" className="secondary" disabled={saving === row.id} onClick={() => void saveStatus(row, 'expired')}>Expirar</button>
                </div>
              </div>
            </article>
          ))}
        </section>
        <p className="admin-warning">A alteração nesta tela atualiza somente o acesso no Dentiscan. Ela não confirma transações nem cancela cobranças no PagBank. Para Pix, confira cada pagamento antes de renovar a validade; para cartão, gerencie a recorrência no painel PagBank.</p>
      </div>
    </main>
  )
}
