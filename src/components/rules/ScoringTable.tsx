import { useTranslation } from 'react-i18next'
import Card from '../shared/Card'

const rows = [
  { key: 'teamName', pts: '+2' },
  { key: 'flagGreenScore', pts: '+5' },
  { key: 'flagOrangeScore', pts: '+3' },
  { key: 'flagRedScore', pts: '+1' },
  { key: 'challengeCard', pts: '+3' },
  { key: 'finalMission', pts: '+5' },
  { key: 'publicVote', pts: '+5' },
  { key: 'bestDemo', pts: '+3' },
]

export default function ScoringTable() {
  const { t } = useTranslation()

  return (
    <Card>
      <h3 className="font-display font-bold text-prussian mb-5 text-lg">{t('rules.scoring')}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-dark">
            <th className="text-left py-2.5 text-slate-gray font-medium text-xs uppercase tracking-wide">{t('rules.action')}</th>
            <th className="text-right py-2.5 text-slate-gray font-medium text-xs uppercase tracking-wide">{t('rules.pts')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-b border-surface/80 hover:bg-surface/50 transition-colors">
              <td className="py-2.5 text-dark-slate">{t(`rules.${r.key}`)}</td>
              <td className="py-2.5 text-right font-mono font-bold text-sushi">{r.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
