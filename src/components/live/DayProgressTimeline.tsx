import { useTranslation } from 'react-i18next'
import type { Workshop } from '../../types'
import SectionHeading from '../shared/SectionHeading'

interface Props {
  workshops: Workshop[]
}

const statusColors = {
  done: 'bg-sushi',
  active: 'bg-sushi shadow-sm shadow-sushi/50',
  pending: 'bg-slate-gray/20',
}

const statusBarColors = {
  done: 'bg-sushi',
  active: 'bg-sushi/60',
  pending: 'bg-slate-gray/10',
}

export default function DayProgressTimeline({ workshops }: Props) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  const sorted = [...workshops].sort((a, b) => a.order - b.order)

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm shadow-prussian/5 border border-surface-dark/50">
      <SectionHeading>{t('live.progress')}</SectionHeading>
      <div className="flex gap-1.5">
        {sorted.map((w) => {
          const title = lang === 'fr' ? w.title_fr : w.title_en
          const isActive = w.status === 'active'
          return (
            <div key={w.id} className="flex-1 group">
              <div className={`h-2.5 rounded-full transition-all ${statusBarColors[w.status]} ${isActive ? 'animate-shimmer' : ''}`} />
              <div className={`w-3.5 h-3.5 rounded-full mx-auto -mt-1 transition-all ${statusColors[w.status]} ${isActive ? 'ring-4 ring-sushi/20' : ''}`} />
              <p className={`text-[10px] text-center mt-1.5 leading-tight hidden md:block transition-colors ${isActive ? 'text-prussian font-semibold' : 'text-slate-gray'}`}>
                {title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
