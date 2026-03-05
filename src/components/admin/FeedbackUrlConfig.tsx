import { useState, useEffect } from 'react'
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

  useEffect(() => {
    if (config) setUrl(config.feedback_url)
  }, [config])

  const save = async () => {
    if (!config) return
    await pb.collection('config').update(config.id, { feedback_url: url })
  }

  return (
    <Card>
      <h3 className="font-bold text-dark-slate mb-4">{t('admin.feedbackUrl')}</h3>
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
