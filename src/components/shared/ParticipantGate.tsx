import { useState, useEffect, useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { findParticipantByUsername, registerParticipant } from '../../services/participantService'
import pb from '../../lib/pocketbase'
import Button from './Button'
import Input from './Input'

interface Props {
  children: ReactNode
}

type GateState =
  | { status: 'loading' }
  | { status: 'form' }
  | { status: 'pending'; username: string }
  | { status: 'approved' }

export default function ParticipantGate({ children }: Props) {
  const { t } = useTranslation()
  const [state, setState] = useState<GateState>(() => {
    if (pb.authStore.isValid) return { status: 'approved' }
    const saved = localStorage.getItem('participantUsername')
    return saved ? { status: 'loading' } : { status: 'form' }
  })
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const initialCheckDone = useRef(false)
  const pendingUsername = state.status === 'pending' ? state.username : null

  useEffect(() => {
    return pb.authStore.onChange(() => {
      if (pb.authStore.isValid) setState({ status: 'approved' })
    })
  }, [])

  useEffect(() => {
    if (initialCheckDone.current) return
    initialCheckDone.current = true

    if (pb.authStore.isValid) return

    const saved = localStorage.getItem('participantUsername')
    if (!saved) return

    findParticipantByUsername(saved).then((participant) => {
      if (!participant) {
        localStorage.removeItem('participantUsername')
        setState({ status: 'form' })
      } else if (participant.validated) {
        setState({ status: 'approved' })
      } else {
        setState({ status: 'pending', username: saved })
      }
    })
  }, [])

  useEffect(() => {
    if (!pendingUsername) return

    let unsub: (() => void) | undefined
    let unmounted = false

    pb.collection('participants').subscribe('*', () => {
      findParticipantByUsername(pendingUsername).then((p) => {
        if (p?.validated) setState({ status: 'approved' })
      })
    }).then((fn) => {
      if (unmounted) fn()
      else unsub = fn
    })

    return () => {
      unmounted = true
      unsub?.()
    }
  }, [pendingUsername])

  const handleLogout = () => {
    localStorage.removeItem('participantUsername')
    setInput('')
    setError('')
    initialCheckDone.current = false
    setState({ status: 'form' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const username = input.trim()
    if (!username) return

    setError('')

    const existing = await findParticipantByUsername(username)
    if (existing) {
      localStorage.setItem('participantUsername', username)
      if (existing.validated) {
        setState({ status: 'approved' })
      } else {
        setState({ status: 'pending', username })
        setError(t('gate.alreadyPending'))
      }
      return
    }

    await registerParticipant(username)
    localStorage.setItem('participantUsername', username)
    setState({ status: 'pending', username })
  }

  if (state.status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-gray text-sm">
        {t('live.loading')}
      </div>
    )
  }

  if (state.status === 'approved') {
    return <>{children}</>
  }

  if (state.status === 'pending') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-lg shadow-prussian/10 border border-surface-dark/50 text-center">
          <div className="w-12 h-12 rounded-xl bg-card-orange/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-6 h-6 text-card-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="font-display text-xl font-bold text-prussian mb-3">{t('gate.pendingTitle')}</h2>
          <p className="text-sm text-slate-gray mb-2">{t('gate.pendingMessage')}</p>
          <p className="text-xs text-slate-gray/60 font-mono bg-surface rounded-lg px-3 py-2 mb-5">{state.username}</p>
          <button type="button" onClick={handleLogout} className="text-xs text-slate-gray/50 hover:text-card-red transition-colors underline underline-offset-2">
            {t('gate.switchUser')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-lg shadow-prussian/10 border border-surface-dark/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-sushi/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-sushi" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
          </div>
          <h2 className="font-display text-xl font-bold text-prussian">{t('gate.title')}</h2>
        </div>
        {error && (
          <div className="bg-card-orange/10 border border-card-orange/20 text-card-orange text-sm rounded-xl px-4 py-3 mb-5">
            {error}
          </div>
        )}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-gray uppercase tracking-wide mb-2">{t('gate.inputLabel')}</label>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('gate.inputPlaceholder')}
            className="w-full py-2.5"
            required
          />
        </div>
        <Button type="submit" className="w-full py-3">
          {t('gate.submit')}
        </Button>
      </form>
    </div>
  )
}
