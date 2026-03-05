import { useTranslation } from 'react-i18next'
import Card from '../shared/Card'

const awards = [
  { key: 'award1', icon: '\u{1F947}' },
  { key: 'award2', icon: '\u{1F3E2}' },
  { key: 'award3', icon: '\u{1F4A1}' },
  { key: 'award4', icon: '\u{1F91D}' },
]

export default function AwardsSection() {
  const { t } = useTranslation()

  return (
    <Card>
      <h3 className="font-bold text-dark-slate mb-4">{t('rules.awardsSection')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {awards.map((a) => (
          <div key={a.key} className="flex items-start gap-3 bg-surface rounded-lg p-4">
            <span className="text-2xl">{a.icon}</span>
            <div>
              <p className="font-semibold text-dark-slate">{t(`rules.${a.key}_title`)}</p>
              <p className="text-sm text-slate-gray">{t(`rules.${a.key}_desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
