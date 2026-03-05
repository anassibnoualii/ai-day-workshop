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
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-bold text-prussian mb-6">{t('admin.login')}</h2>
        {error && <p className="text-card-red text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-dark-slate mb-1">{t('admin.email')}</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark-slate mb-1">{t('admin.password')}</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2"
            required
          />
        </div>
        <Button type="submit" variant="secondary" className="w-full py-2">
          {t('admin.signIn')}
        </Button>
      </form>
    </div>
  )
}
