import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useConfig } from '../hooks/useConfig'

export default function FeedbackRedirect() {
  const config = useConfig()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (!config) return
    if (config.feedback_url) {
      window.location.replace(config.feedback_url)
    } else {
      navigate('/', { replace: true })
    }
  }, [config, navigate])

  return (
    <div className="flex items-center justify-center min-h-[60vh] text-slate-gray">
      {t('live.loading')}
    </div>
  )
}
