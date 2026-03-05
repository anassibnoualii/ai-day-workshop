import { useEffect } from 'react'
import { useConfig } from '../hooks/useConfig'

export default function FeedbackRedirect() {
  const config = useConfig()

  useEffect(() => {
    if (config?.feedback_url) {
      window.location.replace(config.feedback_url)
    }
  }, [config])

  return (
    <div className="flex items-center justify-center min-h-[60vh] text-slate-gray">
      Redirecting...
    </div>
  )
}
