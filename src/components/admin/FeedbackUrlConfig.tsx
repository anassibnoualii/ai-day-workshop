import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Config } from '../../types'
import pb from '../../lib/pocketbase'
import Card from '../shared/Card'
import Button from '../shared/Button'
import Input from '../shared/Input'

interface Props {
  config: Config | null
}

export default function FeedbackUrlConfig({ config }: Props) {
  const { t } = useTranslation()
  const [url, setUrl] = useState('')
  const [enabled, setEnabled] = useState(false)
  const pendingToggle = useRef(false)

  useEffect(() => {
    if (!config) return
    setUrl(config.feedback_url || '')
    if (!pendingToggle.current) {
      setEnabled(config.feedback_enabled ?? false)
    }
  }, [config?.id, config?.feedback_url, config?.feedback_enabled])

  const save = async () => {
    if (!config) return
    await pb.collection('config').update(config.id, { feedback_url: url })
  }

  const toggleEnabled = async () => {
    if (!config) return
    const next = !enabled
    setEnabled(next)
    pendingToggle.current = true
    try {
      await pb.collection('config').update(config.id, { feedback_enabled: next })
    } catch (err) {
      console.error('Failed to toggle feedback:', err)
      setEnabled(!next)
    }
    setTimeout(() => { pendingToggle.current = false }, 4000)
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-prussian">{t('admin.feedbackUrl')}</h3>
        <button
          type="button"
          onClick={toggleEnabled}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
            enabled ? 'bg-sushi' : 'bg-slate-gray/30'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              enabled ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>
      {!enabled && (
        <p className="text-xs text-slate-gray mb-4">{t('feedback.disabledHint')}</p>
      )}
      <div className="flex gap-2">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
          placeholder="https://forms.office.com/..."
        />
        <Button variant="secondary" onClick={save}>{t('admin.save')}</Button>
      </div>
    </Card>
  )
}
