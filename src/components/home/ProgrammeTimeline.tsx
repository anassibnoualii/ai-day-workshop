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

const typeStyles = {
  plenary: { bar: 'bg-prussian', dot: 'bg-prussian border-2 border-prussian/30', card: 'bg-prussian/5 border-l-prussian' },
  workshop: { bar: 'bg-sushi', dot: 'bg-sushi border-2 border-sushi/30', card: 'bg-sushi/5 border-l-sushi' },
  break: { bar: 'bg-slate-gray/30', dot: 'bg-slate-gray/40 border-2 border-slate-gray/20', card: 'bg-surface border-l-slate-gray/30' },
  closing: { bar: 'bg-card-orange', dot: 'bg-card-orange border-2 border-card-orange/30', card: 'bg-card-orange/5 border-l-card-orange' },
}

export default function ProgrammeTimeline() {
  const { t } = useTranslation()

  return (
    <section className="py-20 gradient-section">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1.5 h-8 rounded-full bg-sushi" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-prussian">{t('programme.title')}</h2>
        </div>
        <div className="relative">
          <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-prussian/20 via-sushi/20 to-card-orange/20" />
          <div className="flex flex-col gap-3">
            {blocks.map((b) => {
              const style = typeStyles[b.type]
              return (
                <div key={b.key} className="flex items-start gap-4 relative group">
                  <div className={`w-[10px] h-[10px] rounded-full mt-4 shrink-0 z-10 ${style.dot} ring-4 ring-white`} />
                  <div className={`flex-1 border-l-4 rounded-xl px-5 py-3.5 transition-all group-hover:shadow-sm ${style.card}`}>
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono font-bold text-slate-gray bg-white/80 px-2 py-0.5 rounded">{b.time}</span>
                      <span className="font-semibold text-dark-slate">{t(`programme.${b.key}`)}</span>
                      <span className="text-xs text-slate-gray ml-auto font-medium">{b.dur}</span>
                    </div>
                    {b.descKey && (
                      <p className="text-xs text-slate-gray mt-1.5 ml-[52px]">{t(`programme.${b.descKey}`)}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
