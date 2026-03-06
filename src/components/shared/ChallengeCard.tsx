import type { CardDefinition } from '../../types'
import { useLang } from '../../lib/lang'

const colorMap: Record<CardDefinition['color'], { bg: string; border: string; selectedBorder: string }> = {
  red: {
    bg: 'bg-card-red/5',
    border: 'border-card-red/20',
    selectedBorder: 'border-card-red',
  },
  orange: {
    bg: 'bg-card-orange/5',
    border: 'border-card-orange/20',
    selectedBorder: 'border-card-orange',
  },
  green: {
    bg: 'bg-card-green/5',
    border: 'border-card-green/20',
    selectedBorder: 'border-card-green',
  },
  purple: {
    bg: 'bg-card-purple/5',
    border: 'border-card-purple/20',
    selectedBorder: 'border-card-purple',
  },
}

const badgeMap: Record<CardDefinition['color'], string> = {
  red: 'bg-card-red',
  orange: 'bg-card-orange',
  green: 'bg-card-green',
  purple: 'bg-card-purple',
}

interface Props {
  card: CardDefinition
  animated?: boolean
  selected?: boolean
  compact?: boolean
}

export default function ChallengeCard({ card, animated, selected, compact }: Props) {
  const lang = useLang()
  const title = lang === 'fr' ? card.title_fr : card.title_en
  const mission = lang === 'fr' ? card.mission_fr : card.mission_en
  const colors = colorMap[card.color]

  return (
    <div
      className={`rounded-xl p-4 h-full flex flex-col border-2 transition-all duration-200 ${colors.bg} ${
        selected ? `${colors.selectedBorder} shadow-md` : `${colors.border} hover:shadow-sm`
      } ${animated ? 'animate-card-pop' : ''}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`${badgeMap[card.color]} text-white text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0`}>
          +{card.points} pt{card.points > 1 ? 's' : ''}
        </span>
        <h4 className="font-semibold text-dark-slate text-sm leading-tight">{title}</h4>
      </div>
      <p className={`text-xs text-slate-gray leading-relaxed ${compact ? 'line-clamp-3' : ''}`}>{mission}</p>
    </div>
  )
}
