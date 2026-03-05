import { useTranslation } from 'react-i18next'
import Card from '../shared/Card'

export default function FlagSystem() {
  const { t } = useTranslation()

  return (
    <Card>
      <h3 className="font-bold text-dark-slate mb-4">{t('rules.flagSystem')}</h3>
      <ul className="space-y-3">
        <li className="flex items-start gap-3">
          <span className="w-5 h-5 rounded-full bg-card-green shrink-0 mt-0.5" />
          <span className="text-sm text-slate-gray">{t('rules.flagGreen')}</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-5 h-5 rounded-full bg-card-orange shrink-0 mt-0.5" />
          <span className="text-sm text-slate-gray">{t('rules.flagOrange')}</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-5 h-5 rounded-full bg-card-red shrink-0 mt-0.5" />
          <span className="text-sm text-slate-gray">{t('rules.flagRed')}</span>
        </li>
      </ul>
    </Card>
  )
}
