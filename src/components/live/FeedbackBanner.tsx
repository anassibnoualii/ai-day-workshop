import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Config } from '../../types'

interface Props {
  config: Config | null
}

export default function FeedbackBanner({ config }: Props) {
  const { t } = useTranslation()

  if (!config?.feedback_enabled) return null

  return (
    <div className="bg-prussian-dark rounded-2xl p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15" />
      <div className="relative z-10">
        <p className="text-white font-semibold mb-4 text-lg">{t('feedback.cta')}</p>
        <Link
          to="/feedback"
          className="inline-flex items-center gap-2 bg-sushi text-prussian-dark font-bold px-7 py-3 rounded-xl hover:bg-sushi-dark hover:shadow-lg hover:shadow-sushi/20 transition-all duration-300 text-sm"
        >
          {t('feedback.open')}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </Link>
      </div>
    </div>
  )
}
