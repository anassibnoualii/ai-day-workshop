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
      <h3 className="font-display font-bold text-prussian mb-5 text-lg">{t('rules.awardsSection')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {awards.map((a) => (
          <div key={a.key} className="flex items-start gap-4 bg-surface rounded-xl p-4 hover:bg-surface-dark/50 transition-colors">
            <span className="text-3xl">{a.icon}</span>
            <div>
              <p className="font-semibold text-dark-slate">{t(`rules.${a.key}_title`)}</p>
              <p className="text-sm text-slate-gray mt-0.5">{t(`rules.${a.key}_desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
