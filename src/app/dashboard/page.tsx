'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [leaving, setLeaving] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace('/acesso')
        return
      }
      setUser(currentUser)
      void getDoc(doc(db, 'admins', currentUser.uid)).then((adminDoc) => {
        setIsAdmin(adminDoc.exists() && adminDoc.data().enabled === true)
      }).catch((error) => console.error('Não foi possível verificar perfil administrativo:', error))
      setCheckingSession(false)
    })
    return unsubscribe
  }, [router])

  async function handleSignOut() {
    setLeaving(true)
    try {
      await signOut(auth)
      router.replace('/acesso')
    } catch (error) {
      console.error('Não foi possível encerrar a sessão:', error)
      setLeaving(false)
    }
  }

  if (checkingSession || !user) {
    return <main className="dashboard-loading" aria-live="polite">Verificando sessão…</main>
  }

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link href="/dashboard" className="dashboard-brand" aria-label="Dentiscan — início do painel">
          <span className="dashboard-brand-mark">D</span>
          <span>Dentiscan</span>
        </Link>

        <div className="dashboard-sidebar-label">MENU PRINCIPAL</div>
        <nav className="dashboard-nav" aria-label="Navegação principal">
          <Link href="/dashboard" className="dashboard-nav-item active" aria-current="page">
            <span aria-hidden="true">⌂</span> Início
          </Link>
          <Link href="/dashboard/pacientes" className="dashboard-nav-item">
            <span aria-hidden="true">♧</span> Pacientes
          </Link>
          <Link href="/dashboard/assinatura" className="dashboard-nav-item">
            <span aria-hidden="true">◈</span> Assinatura
          </Link>
          {isAdmin && <Link href="/dashboard/admin/assinaturas" className="dashboard-nav-item">
            <span aria-hidden="true">⚙</span> Administração
          </Link>}
        </nav>

        <div className="dashboard-sidebar-bottom">
          <div className="dashboard-user">
            <span className="dashboard-avatar">{(user.displayName || user.email || 'D').charAt(0).toUpperCase()}</span>
            <span className="dashboard-user-info">
              <strong>{user.displayName || 'Profissional'}</strong>
              <small>{user.email}</small>
            </span>
          </div>
          <button className="dashboard-logout" type="button" onClick={handleSignOut} disabled={leaving}>
            <span aria-hidden="true">↪</span> {leaving ? 'Saindo…' : 'Sair'}
          </button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <div><p className="dashboard-eyebrow">ÁREA PROFISSIONAL</p><h1>Início</h1></div>
          <span className="dashboard-session"><i /> Sessão ativa</span>
        </header>
        <div className="dashboard-welcome">
          <p className="dashboard-welcome-kicker">PAINEL DENTISCAN</p>
          <h2>Bem-vindo{user.displayName ? `, ${user.displayName.split(' ')[0]}` : ''}.</h2>
          <p>Este é o espaço de acesso às ferramentas e informações da sua área profissional.</p>
          <div className="dashboard-subscription-callout">
            <div><strong>Plano e assinatura</strong><span>Consulte a situação da sua assinatura e gerencie sua contratação.</span></div>
            <Link href="/dashboard/assinatura">Ver assinatura <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
