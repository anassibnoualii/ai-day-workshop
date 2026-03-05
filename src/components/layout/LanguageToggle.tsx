import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  return (
    <button
      onClick={() => i18n.changeLanguage(current === 'fr' ? 'en' : 'fr')}
      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold tracking-wider text-white/80 hover:bg-white/10 hover:text-white transition-all"
    >
      {current === 'fr' ? 'EN' : 'FR'}
    </button>
  )
}
