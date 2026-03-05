import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageToggle from './LanguageToggle'
import pb from '../../lib/pocketbase'

export default function Navbar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isAdmin = pb.authStore.isValid

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/live', label: t('nav.live') },
    { to: '/rules', label: t('nav.rules') },
  ]

  return (
    <nav className="bg-prussian text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg tracking-tight">
          AI Agent Day
        </Link>
        <div className="flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition hover:text-sushi ${
                pathname === l.to ? 'text-sushi' : 'text-white/80'
              }`}
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={`text-sm font-medium transition hover:text-sushi ${
                pathname === '/admin' ? 'text-sushi' : 'text-white/80'
              }`}
            >
              {t('nav.admin')}
            </Link>
          )}
          <LanguageToggle />
        </div>
      </div>
    </nav>
  )
}
