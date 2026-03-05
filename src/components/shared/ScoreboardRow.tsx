import { useTranslation } from 'react-i18next'
import type { Team } from '../../types'

const medals = ['', '', '']
const rankBg = ['bg-card-orange/10 border-card-orange/20', 'bg-surface border-surface-dark', 'bg-surface border-surface-dark']

interface Props {
  team: Team
  rank: number
}

export default function ScoreboardRow({ team, rank }: Props) {
  const { t } = useTranslation()

  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 border ${rank <= 3 ? rankBg[rank - 1] : 'bg-surface/50 border-transparent'}`}>
      <span className="w-8 text-center font-bold text-prussian text-sm">
        {rank <= 3 ? medals[rank - 1] : `#${rank}`}
      </span>
      <span className="text-xl">{team.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-dark-slate truncate text-sm">{team.name}</div>
        {team.slogan && <div className="text-[11px] text-slate-gray truncate">{team.slogan}</div>}
      </div>
      <div className="relative font-mono font-bold text-prussian text-lg tabular-nums">
        {team.score}
        <span className="text-[10px] text-slate-gray font-sans ml-1">{t('score.points')}</span>
      </div>
    </div>
  )
}
