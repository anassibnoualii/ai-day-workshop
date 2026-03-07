import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useConfig } from '../../hooks/useConfig'
import pb from '../../lib/pocketbase'
import Button from './Button'
import Input from './Input'

interface Props {
  children: ReactNode
}

type GateState = 'form' | 'approved'

export default function ParticipantGate({ children }: Props) {
  const { t } = useTranslation()
  const config = useConfig()
  const [state, setState] = useState<GateState>(() => {
    if (pb.authStore.isValid) return 'approved'
    return localStorage.getItem('sessionConnected') ? 'approved' : 'form'
  })
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  if (state === 'approved') {
    return <>{children}</>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const code = input.trim()
    if (!code) return

    if (config && code === config.session_id) {
      localStorage.setItem('sessionConnected', 'true')
      window.dispatchEvent(new Event('sessionChanged'))
      setState('approved')
      setError('')
    } else {
      setError(t('gate.invalidCode'))
    }
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
          <div className="bg-card-red/10 border border-card-red/20 text-card-red text-sm rounded-xl px-4 py-3 mb-5">
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
