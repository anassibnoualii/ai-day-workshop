import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Config, Workshop } from '../../types'
import pb from '../../lib/pocketbase'
import Card from '../shared/Card'
import Button from '../shared/Button'
import Input from '../shared/Input'

interface Props {
  config: Config | null
  workshops: Workshop[]
}

export default function LinkManager({ config, workshops }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  const [newLabel, setNewLabel] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const sorted = [...workshops].sort((a, b) => a.order - b.order)
  const [workshopUrls, setWorkshopUrls] = useState<Record<string, string>>({})

  useEffect(() => {
    const urls: Record<string, string> = {}
    for (const w of workshops) {
      urls[w.id] = w.doc_url || ''
    }
    setWorkshopUrls(urls)
  }, [workshops])

  const addGlobalDoc = async () => {
    if (!config || !newLabel.trim() || !newUrl.trim()) return
    const docs = [...config.global_docs, { label: newLabel.trim(), url: newUrl.trim() }]
    await pb.collection('config').update(config.id, { global_docs: docs })
    setNewLabel('')
    setNewUrl('')
  }

  const removeGlobalDoc = async (index: number) => {
    if (!config) return
    const docs = config.global_docs.filter((_, i) => i !== index)
    await pb.collection('config').update(config.id, { global_docs: docs })
  }

  const updateWorkshopDoc = async (workshopId: string) => {
    const url = workshopUrls[workshopId] ?? ''
    await pb.collection('workshops').update(workshopId, { doc_url: url || null })
  }

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-bold text-dark-slate mb-4">{t('admin.globalDocs')}</h3>
        <div className="space-y-2 mb-4">
          {config?.global_docs?.map((doc, i) => (
            <div key={i} className="flex items-center gap-2 bg-surface rounded-lg px-4 py-2.5 text-sm">
              <span className="flex-1 truncate font-medium text-dark-slate">{doc.label}</span>
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sushi text-xs hover:underline truncate max-w-48">{doc.url}</a>
              <button onClick={() => removeGlobalDoc(i)} className="text-card-red text-sm hover:opacity-70 shrink-0 transition">&times;</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder={t('admin.label')} className="flex-1" />
          <Input type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder={t('admin.url')} className="flex-1" />
          <Button onClick={addGlobalDoc}>+</Button>
        </div>
      </Card>

      <Card>
        <h3 className="font-bold text-dark-slate mb-4">{t('admin.workshopDoc')}</h3>
        <div className="space-y-2">
          {sorted.map((w) => {
            const title = lang === 'fr' ? w.title_fr : w.title_en
            return (
              <div key={w.id} className="flex items-center gap-3">
                <span className="text-sm text-dark-slate w-52 truncate font-medium">{title}</span>
                <Input
                  type="url"
                  value={workshopUrls[w.id] ?? ''}
                  onChange={(e) => setWorkshopUrls({ ...workshopUrls, [w.id]: e.target.value })}
                  onBlur={() => updateWorkshopDoc(w.id)}
                  className="flex-1"
                  placeholder={t('admin.url')}
                />
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
