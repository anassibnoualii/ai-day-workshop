import { useTranslation } from 'react-i18next'
import { CARD_CATALOG } from '../../lib/cards'
import ChallengeCard from '../shared/ChallengeCard'

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
      <h3 className="font-bold text-dark-slate mb-6">{t('rules.cardsRef')}</h3>
      {groups.map((g) => {
        const cards = CARD_CATALOG.filter((c) => c.color === g.color)
        return (
          <div key={g.color} className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-gray mb-3">{g.label}</h4>
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
