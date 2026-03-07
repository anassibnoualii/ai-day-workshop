import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageToggle from './LanguageToggle'
import NavLink from './NavLink'
import pb from '../../lib/pocketbase'

export default function Navbar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [isAdmin, setIsAdmin] = useState(pb.authStore.isValid)
  const [sessionActive, setSessionActive] = useState(() => !!localStorage.getItem('sessionConnected'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  useEffect(() => {
    return pb.authStore.onChange(() => {
      setIsAdmin(pb.authStore.isValid)
    })
  }, [])

  useEffect(() => {
    const sync = () => setSessionActive(!!localStorage.getItem('sessionConnected'))
    window.addEventListener('storage', sync)
    window.addEventListener('sessionChanged', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('sessionChanged', sync)
    }
  }, [])

  const showLinks = sessionActive || isAdmin

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/live', label: t('nav.live') },
    { to: '/rules', label: t('nav.rules') },
    { to: '/scoreboard', label: t('score.scoreboard') },
  ]

  if (isAdmin) {
    links.push({ to: '/admin', label: t('nav.admin') })
  }

  const handleLeave = () => {
    localStorage.removeItem('sessionConnected')
    window.dispatchEvent(new Event('sessionChanged'))
    window.location.reload()
  }

  const renderLinks = (onClick?: () => void) => (
    <>
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} label={l.label} active={pathname === l.to} onClick={onClick} />
      ))}
      {sessionActive && !isAdmin && (
        <button
          type="button"
          onClick={() => { onClick?.(); handleLeave() }}
          className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-card-red hover:bg-card-red/10 transition-all"
        >
          {t('nav.leave')}
        </button>
      )}
    </>
  )

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

        <div className="hidden md:flex items-center gap-1">
          {showLinks && renderLinks()}
          <div className="ml-2 pl-2 border-l border-white/10">
            <LanguageToggle />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          {showLinks && (
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {mobileOpen && showLinks && (
        <div className="md:hidden border-t border-white/5 bg-prussian-dark/98 backdrop-blur-md">
          <div className="flex flex-col px-4 py-3 gap-1">
            {renderLinks(closeMobile)}
          </div>
        </div>
      )}
    </nav>
  )
}
