import { useTranslation } from 'react-i18next'
import type { Team } from '../../types'

const medals = ['', '', '']

interface Props {
  team: Team
  rank: number
}

export default function ScoreboardRow({ team, rank }: Props) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white transition-all duration-300">
      <span className="w-8 text-center font-bold text-prussian">
        {rank <= 3 ? medals[rank - 1] : `#${rank}`}
      </span>
      <span className="text-xl">{team.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-dark-slate truncate">{team.name}</div>
        <div className="text-xs text-slate-gray truncate">{team.slogan}</div>
      </div>
      <div className="relative font-bold text-prussian text-lg tabular-nums">
        {team.score} <span className="text-xs text-slate-gray">{t('score.points')}</span>
      </div>
    </div>
  )
}
