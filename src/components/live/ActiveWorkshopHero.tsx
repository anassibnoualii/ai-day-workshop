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
    <section className="bg-prussian text-white rounded-2xl px-8 py-10 text-center">
      <p className="text-sushi text-xs font-bold uppercase tracking-widest mb-2">
        {t('workshop.active')}
      </p>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
      <Timer />
      <p className="text-white/50 text-sm mt-2">{t('timer.remaining')}</p>
    </section>
  )
}
