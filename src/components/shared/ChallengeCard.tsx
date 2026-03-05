import { useTranslation } from 'react-i18next'
import type { CardDefinition } from '../../types'

const colorMap = {
  red: 'border-card-red bg-card-red/10',
  orange: 'border-card-orange bg-card-orange/10',
  green: 'border-card-green bg-card-green/10',
  purple: 'border-card-purple bg-card-purple/10',
}

const badgeMap = {
  red: 'bg-card-red',
  orange: 'bg-card-orange',
  green: 'bg-card-green',
  purple: 'bg-card-purple',
}

interface Props {
  card: CardDefinition
  animated?: boolean
}

export default function ChallengeCard({ card, animated }: Props) {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  const title = lang === 'fr' ? card.title_fr : card.title_en
  const mission = lang === 'fr' ? card.mission_fr : card.mission_en

  return (
    <div
      className={`border-2 rounded-xl p-5 ${colorMap[card.color]} ${
        animated ? 'animate-card-pop' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`${badgeMap[card.color]} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
          +{card.points} pt{card.points > 1 ? 's' : ''}
        </span>
        <h4 className="font-bold text-dark-slate">{title}</h4>
      </div>
      <p className="text-sm text-slate-gray leading-relaxed">{mission}</p>
    </div>
  )
}
