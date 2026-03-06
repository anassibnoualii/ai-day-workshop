import { useTranslation } from 'react-i18next'
import type { Workshop } from '../../types'
import { useTimer } from '../../hooks/useTimer'
import { useEventStore } from '../../stores/eventStore'
import { useLang } from '../../lib/lang'
import SectionHeading from '../shared/SectionHeading'

interface Props {
  workshops: Workshop[]
}

export default function DayProgressTimeline({ workshops }: Props) {
  const { t } = useTranslation()
  const lang = useLang()
  const sorted = [...workshops].sort((a, b) => a.order - b.order)
  const { remaining } = useTimer()
  const eventState = useEventStore((s) => s.eventState)
  const duration = eventState?.timer_duration_seconds ?? 0

  const activeProgress = duration > 0 ? Math.min(1, Math.max(0, (duration - remaining) / duration)) : 0

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm shadow-prussian/5 border border-surface-dark/50">
      <SectionHeading>{t('live.progress')}</SectionHeading>
      <div className="flex gap-1">
        {sorted.map((w) => {
          const title = lang === 'fr' ? w.title_fr : w.title_en
          const isActive = w.status === 'active'
          const pct = w.status === 'done' ? 100 : isActive ? Math.round(activeProgress * 100) : 0
          return (
            <div key={w.id} className="flex-1 flex flex-col items-center">
              <div className="w-full h-2 rounded-full bg-surface-dark overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-linear ${isActive ? 'bg-sushi/70' : 'bg-sushi'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {isActive && (
                <div className="relative w-full h-0">
                  <div
                    className="absolute -top-[11px] z-10 w-3.5 h-3.5 rounded-full bg-white border-[3px] border-sushi ring-4 ring-sushi/20 transition-all duration-1000 ease-linear"
                    style={{ left: `calc(${pct}% - 7px)` }}
                  />
                </div>
              )}
              <p className={`text-[10px] text-center mt-1.5 leading-tight hidden md:block transition-colors ${isActive ? 'text-prussian font-bold' : w.status === 'done' ? 'text-dark-slate/70' : 'text-slate-gray/60'}`}>
                {title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
