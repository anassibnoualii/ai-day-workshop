import { useTranslation } from 'react-i18next'
import { CARD_CATALOG } from '../../lib/cards'
import ChallengeCard from '../shared/ChallengeCard'

const groupColors: Record<string, string> = {
  red: 'text-card-red',
  orange: 'text-card-orange',
  green: 'text-card-green',
  purple: 'text-card-purple',
}

const groupBarBg: Record<string, string> = {
  red: 'bg-card-red',
  orange: 'bg-card-orange',
  green: 'bg-card-green',
  purple: 'bg-card-purple',
}

export default function CardGrid() {
  const { t } = useTranslation()

  const groups = [
    { color: 'red' as const, label: t('rules.redCards') },
    { color: 'orange' as const, label: t('rules.orangeCards') },
    { color: 'green' as const, label: t('rules.greenCards') },
    { color: 'purple' as const, label: t('rules.specialCards') },
  ]

  return (
    <div>
      <h3 className="font-display font-bold text-prussian mb-8 text-lg">{t('rules.cardsRef')}</h3>
      {groups.map((g) => {
        const cards = CARD_CATALOG.filter((c) => c.color === g.color)
        return (
          <div key={g.color} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-1 h-5 rounded-full ${groupBarBg[g.color]}`} />
              <h4 className={`text-xs font-bold uppercase tracking-[0.15em] ${groupColors[g.color]}`}>{g.label}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.map((card) => (
                <ChallengeCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
