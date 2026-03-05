import { useTranslation } from 'react-i18next'
import Card from '../shared/Card'

export default function FlagSystem() {
  const { t } = useTranslation()

  return (
    <Card>
      <h3 className="font-display font-bold text-prussian mb-5 text-lg">{t('rules.flagSystem')}</h3>
      <ul className="space-y-4">
        <li className="flex items-start gap-4">
          <span className="w-6 h-6 rounded-full bg-card-green shadow-sm shadow-card-green/30 shrink-0 mt-0.5" />
          <span className="text-sm text-dark-slate/80 leading-relaxed">{t('rules.flagGreen')}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="w-6 h-6 rounded-full bg-card-orange shadow-sm shadow-card-orange/30 shrink-0 mt-0.5" />
          <span className="text-sm text-dark-slate/80 leading-relaxed">{t('rules.flagOrange')}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="w-6 h-6 rounded-full bg-card-red shadow-sm shadow-card-red/30 shrink-0 mt-0.5" />
          <span className="text-sm text-dark-slate/80 leading-relaxed">{t('rules.flagRed')}</span>
        </li>
      </ul>
    </Card>
  )
}
