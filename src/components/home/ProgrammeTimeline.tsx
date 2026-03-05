import { useTranslation } from 'react-i18next'

const blocks = [
  { time: '09:30', key: 'icebreaker', dur: '30 min', type: 'plenary' as const },
  { time: '10:15', key: 'atelier1', dur: '45 min', type: 'workshop' as const, descKey: 'atelier1_desc' },
  { time: '11:00', key: 'pause', dur: '15 min', type: 'break' as const },
  { time: '11:15', key: 'atelier2', dur: '45 min', type: 'workshop' as const, descKey: 'atelier2_desc' },
  { time: '12:00', key: 'keynote', dur: '60 min', type: 'plenary' as const },
  { time: '13:00', key: 'lunch', dur: '60 min', type: 'break' as const },
  { time: '14:00', key: 'atelier3', dur: '75 min', type: 'workshop' as const, descKey: 'atelier3_desc' },
  { time: '15:15', key: 'awards', dur: '30 min', type: 'closing' as const },
]

const typeColors = {
  plenary: 'border-prussian bg-prussian/5',
  workshop: 'border-sushi bg-sushi/10',
  break: 'border-slate-gray/30 bg-surface',
  closing: 'border-card-orange bg-card-orange/10',
}

const dotColors = {
  plenary: 'bg-prussian',
  workshop: 'bg-sushi',
  break: 'bg-slate-gray',
  closing: 'bg-card-orange',
}

export default function ProgrammeTimeline() {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-prussian mb-8">{t('programme.title')}</h2>
        <div className="relative">
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-prussian/10" />
          <div className="flex flex-col gap-4">
            {blocks.map((b) => (
              <div key={b.key} className="flex items-start gap-4 relative">
                <div className={`w-3.5 h-3.5 rounded-full mt-2 shrink-0 z-10 ${dotColors[b.type]}`} />
                <div className={`flex-1 border-l-4 rounded-lg px-4 py-3 ${typeColors[b.type]}`}>
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-mono text-slate-gray">{b.time}</span>
                    <span className="font-semibold text-dark-slate">{t(`programme.${b.key}`)}</span>
                    <span className="text-xs text-slate-gray ml-auto">{b.dur}</span>
                  </div>
                  {b.descKey && (
                    <p className="text-xs text-slate-gray mt-1">{t(`programme.${b.descKey}`)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
