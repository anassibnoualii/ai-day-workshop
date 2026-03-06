import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageToggle from './LanguageToggle'
import pb from '../../lib/pocketbase'

export default function Navbar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [isAdmin, setIsAdmin] = useState(pb.authStore.isValid)

  useEffect(() => {
    return pb.authStore.onChange(() => {
      setIsAdmin(pb.authStore.isValid)
    })
  }, [])

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/live', label: t('nav.live') },
    { to: '/rules', label: t('nav.rules') },
    { to: '/scoreboard', label: t('score.scoreboard') },
  ]

  return (
    <nav className="bg-prussian-dark/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-sushi/20 flex items-center justify-center group-hover:bg-sushi/30 transition">
            <span className="text-sushi font-bold font-mono text-sm">AI</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Agent Day
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === l.to
                  ? 'text-sushi bg-sushi/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/admin'
                  ? 'text-sushi bg-sushi/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('nav.admin')}
            </Link>
          )}
          <div className="ml-2 pl-2 border-l border-white/10">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
