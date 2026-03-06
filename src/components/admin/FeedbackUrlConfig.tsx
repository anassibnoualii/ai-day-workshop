import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Config } from '../../types'
import { updateFeedbackUrl, toggleFeedbackEnabled } from '../../services/configService'
import Card from '../shared/Card'
import Button from '../shared/Button'
import Input from '../shared/Input'

interface Props {
  config: Config | null
}

export default function FeedbackUrlConfig({ config }: Props) {
  const { t } = useTranslation()
  const [localUrl, setLocalUrl] = useState<string | null>(null)
  const [localEnabled, setLocalEnabled] = useState<boolean | null>(null)
  const [pendingToggle, setPendingToggle] = useState(false)

  const url = localUrl ?? config?.feedback_url ?? ''
  const enabled = pendingToggle && localEnabled !== null ? localEnabled : (config?.feedback_enabled ?? false)

  const setUrl = (v: string) => setLocalUrl(v)
  const setEnabled = (v: boolean) => setLocalEnabled(v)

  const save = async () => {
    if (!config) return
    await updateFeedbackUrl(config.id, url)
  }

  const handleToggle = async () => {
    if (!config) return
    const next = !enabled
    setEnabled(next)
    setPendingToggle(true)
    try {
      await toggleFeedbackEnabled(config.id, next)
    } catch (err) {
      console.error('Failed to toggle feedback:', err)
      setEnabled(!next)
    }
    setTimeout(() => { setPendingToggle(false) }, 4000)
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-prussian">{t('admin.feedbackUrl')}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className={`!relative !w-12 !h-6 !rounded-full !p-0 transition-colors duration-200 ${
            enabled ? '!bg-sushi' : '!bg-slate-gray/30'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              enabled ? 'translate-x-6' : ''
            }`}
          />
        </Button>
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
