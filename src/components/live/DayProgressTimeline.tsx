import { useTranslation } from 'react-i18next'
import type { Workshop } from '../../types'
import SectionHeading from '../shared/SectionHeading'

interface Props {
  workshops: Workshop[]
}

const statusColors = {
  done: 'bg-sushi',
  active: 'bg-sushi animate-pulse',
  pending: 'bg-slate-gray/30',
}

const statusBarColors = {
  done: 'bg-sushi',
  active: 'bg-sushi/50',
  pending: 'bg-slate-gray/10',
}

export default function DayProgressTimeline({ workshops }: Props) {
  const { i18n } = useTranslation()
  const { t } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  const sorted = [...workshops].sort((a, b) => a.order - b.order)

  return (
    <div>
      <SectionHeading>{t('live.progress')}</SectionHeading>
      <div className="flex gap-1">
        {sorted.map((w) => {
          const title = lang === 'fr' ? w.title_fr : w.title_en
          return (
            <div key={w.id} className="flex-1 group relative">
              <div className={`h-2 rounded-full ${statusBarColors[w.status]}`} />
              <div className={`w-3 h-3 rounded-full mx-auto -mt-0.5 ${statusColors[w.status]}`} />
              <p className="text-[10px] text-center text-slate-gray mt-1 leading-tight hidden md:block">
                {title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
