import { useTranslation } from 'react-i18next'
import Card from '../shared/Card'

const rows = [
  { key: 'teamName', pts: '+2' },
  { key: 'greenCard', pts: '+1' },
  { key: 'orangeCard', pts: '+3' },
  { key: 'redCard', pts: '+5' },
  { key: 'jokerAction', pts: '+2 / -2' },
  { key: 'speedRunAction', pts: '+2' },
  { key: 'pitchAction', pts: '+3' },
  { key: 'bestDemo', pts: '+3' },
]

export default function ScoringTable() {
  const { t } = useTranslation()

  return (
    <Card>
      <h3 className="font-bold text-dark-slate mb-4">{t('rules.scoring')}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-slate-gray font-medium">{t('rules.action')}</th>
            <th className="text-right py-2 text-slate-gray font-medium">{t('rules.pts')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-b border-surface">
              <td className="py-2 text-dark-slate">{t(`rules.${r.key}`)}</td>
              <td className="py-2 text-right font-mono font-bold text-sushi">{r.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
