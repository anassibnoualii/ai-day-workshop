import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  return (
    <button
      onClick={() => i18n.changeLanguage(current === 'fr' ? 'en' : 'fr')}
      className="px-3 py-1 rounded border border-white/30 text-sm font-semibold text-white hover:bg-white/10 transition"
    >
      {current === 'fr' ? 'EN' : 'FR'}
    </button>
  )
}
