import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function FeedbackBanner() {
  const { t } = useTranslation()

  return (
    <div className="bg-prussian rounded-xl p-6 text-center">
      <p className="text-white font-semibold mb-3">{t('feedback.cta')}</p>
      <Link
        to="/feedback"
        className="inline-block bg-sushi text-prussian font-bold px-6 py-2 rounded-full hover:bg-sushi-dark transition text-sm"
      >
        {t('feedback.open')} &rarr;
      </Link>
    </div>
  )
}
