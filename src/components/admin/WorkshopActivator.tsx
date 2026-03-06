import { useTranslation } from 'react-i18next'
import type { Workshop, EventState } from '../../types'
import { updateWorkshopStatuses } from '../../services/workshopService'
import { activateWorkshop } from '../../services/eventStateService'
import { useLang } from '../../lib/lang'
import Card from '../shared/Card'
import Button from '../shared/Button'

interface Props {
  workshops: Workshop[]
  eventState: EventState | null
}

export default function WorkshopActivator({ workshops, eventState }: Props) {
  const { t } = useTranslation()
  const lang = useLang()
  const sorted = [...workshops].sort((a, b) => a.order - b.order)

  const activate = async (workshop: Workshop) => {
    if (!eventState) return
    await updateWorkshopStatuses(workshops, workshop)
    await activateWorkshop(eventState.id, workshop.id, workshop.duration)
  }

  return (
    <Card>
      <h3 className="font-display font-bold text-prussian mb-5">{t('admin.workshops')}</h3>
      <div className="space-y-2">
        {sorted.map((w) => {
          const title = lang === 'fr' ? w.title_fr : w.title_en
          const isActive = eventState?.active_workshop_id === w.id
          return (
            <div key={w.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-sushi/10 border border-sushi/30 shadow-sm shadow-sushi/10' : 'bg-surface hover:bg-surface-dark/50 border border-transparent'}`}>
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all ${isActive ? 'bg-sushi shadow-sm shadow-sushi/50' : w.status === 'done' ? 'bg-slate-gray' : 'bg-slate-gray/30'}`} />
              <span className={`flex-1 text-sm font-medium ${isActive ? 'text-prussian' : 'text-dark-slate'}`}>{title}</span>
              <span className="text-xs text-slate-gray tabular-nums font-mono">{Math.floor(w.duration / 60)} min</span>
              {!isActive && (
                <Button variant="secondary" size="sm" onClick={() => activate(w)}>
                  {t('admin.activate')}
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
