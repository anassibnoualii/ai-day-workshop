import { useTranslation } from 'react-i18next'
import type { Workshop, EventState } from '../../types'
import pb from '../../lib/pocketbase'
import Card from '../shared/Card'
import Button from '../shared/Button'

interface Props {
  workshops: Workshop[]
  eventState: EventState | null
}

export default function WorkshopActivator({ workshops, eventState }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  const sorted = [...workshops].sort((a, b) => a.order - b.order)

  const activate = async (workshop: Workshop) => {
    if (!eventState) return
    for (const w of workshops) {
      const newStatus = w.id === workshop.id ? 'active' : w.order < workshop.order ? 'done' : 'pending'
      if (w.status !== newStatus) {
        await pb.collection('workshops').update(w.id, { status: newStatus })
      }
    }
    await pb.collection('event_state').update(eventState.id, {
      active_workshop_id: workshop.id,
      timer_duration_seconds: workshop.duration,
      timer_started_at: Math.floor(Date.now() / 1000),
      timer_running: true,
      timer_paused_remaining: null,
    })
  }

  return (
    <Card>
      <h3 className="font-bold text-dark-slate mb-4">{t('admin.workshops')}</h3>
      <div className="space-y-2">
        {sorted.map((w) => {
          const title = lang === 'fr' ? w.title_fr : w.title_en
          const isActive = eventState?.active_workshop_id === w.id
          return (
            <div key={w.id} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${isActive ? 'bg-sushi/10 border border-sushi' : 'bg-surface hover:bg-surface/80'}`}>
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isActive ? 'bg-sushi' : w.status === 'done' ? 'bg-slate-gray' : 'bg-slate-gray/30'}`} />
              <span className="flex-1 text-sm text-dark-slate font-medium">{title}</span>
              <span className="text-xs text-slate-gray tabular-nums">{Math.floor(w.duration / 60)} min</span>
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
