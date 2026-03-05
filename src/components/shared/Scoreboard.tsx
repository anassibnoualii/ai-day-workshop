import { useTranslation } from 'react-i18next'
import type { Team } from '../../types'
import ScoreboardRow from './ScoreboardRow'
import SectionHeading from './SectionHeading'

interface Props {
  teams: Team[]
}

export default function Scoreboard({ teams }: Props) {
  const { t } = useTranslation()
  const sorted = [...teams].sort((a, b) => b.score - a.score)

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm shadow-prussian/5 border border-surface-dark/50">
      <SectionHeading>{t('score.scoreboard')}</SectionHeading>
      <div className="flex flex-col gap-2">
        {sorted.map((team, i) => (
          <ScoreboardRow key={team.id} team={team} rank={i + 1} />
        ))}
      </div>
    </div>
  )
}
