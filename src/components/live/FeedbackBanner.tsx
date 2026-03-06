import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { QRCodeSVG } from 'qrcode.react'
import type { Config } from '../../types'

interface Props {
  config: Config | null
}

export default function FeedbackBanner({ config }: Props) {
  const { t } = useTranslation()

  if (!config?.feedback_enabled) return null

  return (
    <div className="bg-prussian-dark rounded-2xl p-8 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15" />
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <p className="text-white font-semibold text-lg mb-2">{t('feedback.cta')}</p>
          <p className="text-white/60 text-sm mb-5">{t('feedback.subtitle')}</p>
          <Link
            to="/feedback"
            className="inline-flex items-center gap-2 bg-sushi text-prussian-dark font-bold px-7 py-3 rounded-xl hover:bg-sushi-dark hover:shadow-lg hover:shadow-sushi/20 transition-all duration-300 text-sm"
          >
            {t('feedback.open')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
        {config.feedback_url && (
          <div className="shrink-0 bg-white rounded-xl p-3">
            <QRCodeSVG value={config.feedback_url} size={140} />
          </div>
        )}
      </div>
    </div>
  )
}
