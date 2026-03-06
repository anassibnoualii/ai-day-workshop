import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { Config, Workshop } from '../../types'
import { addGlobalDoc, removeGlobalDoc } from '../../services/configService'
import { updateWorkshopDocUrl } from '../../services/workshopService'
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
  const [urlOverrides, setUrlOverrides] = useState<Record<string, string>>({})

  const workshopUrls = useMemo(() => {
    const urls: Record<string, string> = {}
    for (const w of workshops) {
      urls[w.id] = urlOverrides[w.id] ?? w.doc_url ?? ''
    }
    return urls
  }, [workshops, urlOverrides])

  const setWorkshopUrls = (updated: Record<string, string>) => {
    setUrlOverrides((prev) => ({ ...prev, ...updated }))
  }

  const handleAddGlobalDoc = async () => {
    if (!config || !newLabel.trim() || !newUrl.trim()) return
    await addGlobalDoc(config, newLabel.trim(), newUrl.trim())
    setNewLabel('')
    setNewUrl('')
  }

  const handleRemoveGlobalDoc = async (index: number) => {
    if (!config) return
    await removeGlobalDoc(config, index)
  }

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-display font-bold text-prussian mb-5">{t('admin.globalDocs')}</h3>
        <div className="space-y-2 mb-4">
          {config?.global_docs?.map((doc, i) => (
            <div key={i} className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3 text-sm border border-surface-dark/30">
              <span className="flex-1 truncate font-medium text-dark-slate">{doc.label}</span>
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sushi text-xs hover:underline truncate max-w-48">{doc.url}</a>
              <Button variant="ghost" size="sm" onClick={() => handleRemoveGlobalDoc(i)} className="text-card-red !bg-transparent hover:!bg-card-red/10 !w-6 !h-6 !px-0">&times;</Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder={t('admin.label')} className="flex-1" />
          <Input type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder={t('admin.url')} className="flex-1" />
          <Button onClick={handleAddGlobalDoc}>+</Button>
        </div>
      </Card>

      <Card>
        <h3 className="font-display font-bold text-prussian mb-5">{t('admin.workshopDoc')}</h3>
        <div className="space-y-3">
          {sorted.map((w) => {
            const title = lang === 'fr' ? w.title_fr : w.title_en
            return (
              <div key={w.id} className="flex items-center gap-3">
                <span className="text-sm text-dark-slate w-52 truncate font-medium">{title}</span>
                <Input
                  type="url"
                  value={workshopUrls[w.id] ?? ''}
                  onChange={(e) => setWorkshopUrls({ ...workshopUrls, [w.id]: e.target.value })}
                  onBlur={() => updateWorkshopDocUrl(w.id, workshopUrls[w.id] ?? '')}
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
