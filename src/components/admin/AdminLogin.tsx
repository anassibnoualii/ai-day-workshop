import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../shared/Button'
import Input from '../shared/Input'

interface Props {
  onLogin: (email: string, password: string) => Promise<void>
  error: string
}

export default function AdminLogin({ onLogin, error }: Props) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email, password)
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-lg shadow-prussian/10 border border-surface-dark/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-prussian/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-prussian" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
          </div>
          <h2 className="font-display text-xl font-bold text-prussian">{t('admin.login')}</h2>
        </div>
        {error && (
          <div className="bg-card-red/10 border border-card-red/20 text-card-red text-sm rounded-xl px-4 py-3 mb-5">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-gray uppercase tracking-wide mb-2">{t('admin.email')}</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-gray uppercase tracking-wide mb-2">{t('admin.password')}</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2.5"
            required
          />
        </div>
        <Button type="submit" variant="secondary" className="w-full py-3">
          {t('admin.signIn')}
        </Button>
      </form>
    </div>
  )
}
