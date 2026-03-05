import { useTranslation } from 'react-i18next'
import type { Workshop } from '../../types'
import Timer from '../shared/Timer'

interface Props {
  workshop: Workshop | undefined
}

export default function ActiveWorkshopHero({ workshop }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  if (!workshop) return null

  const title = lang === 'fr' ? workshop.title_fr : workshop.title_en

  return (
    <section className="bg-prussian-dark text-white rounded-2xl px-8 py-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-sushi/10 blur-[100px] rounded-full" />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-sushi/15 border border-sushi/25 rounded-full px-4 py-1.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-sushi animate-pulse" />
          <span className="text-sushi text-xs font-bold uppercase tracking-[0.15em]">
            {t('workshop.active')}
          </span>
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-bold mb-8 tracking-tight">{title}</h2>
        <Timer />
        <p className="text-white/40 text-xs mt-3 uppercase tracking-widest">{t('timer.remaining')}</p>
      </div>
    </section>
  )
}
