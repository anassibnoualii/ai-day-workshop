import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Team } from '../../types'
import type { CardDefinition } from '../../types'
import { CARD_CATALOG } from '../../lib/cards'
import pb from '../../lib/pocketbase'
import ChallengeCard from '../shared/ChallengeCard'
import Card from '../shared/Card'
import Button from '../shared/Button'
import Select from '../shared/Select'

const COLOR_FILTERS = ['all', 'red', 'orange', 'green', 'purple'] as const
type ColorFilter = (typeof COLOR_FILTERS)[number]

const filterStyles: Record<ColorFilter, string> = {
  all: 'bg-prussian text-white',
  red: 'bg-card-red text-white',
  orange: 'bg-card-orange text-white',
  green: 'bg-card-green text-white',
  purple: 'bg-card-purple text-white',
}

const filterInactiveStyles: Record<ColorFilter, string> = {
  all: 'text-prussian hover:bg-prussian/10',
  red: 'text-card-red hover:bg-card-red/10',
  orange: 'text-card-orange hover:bg-card-orange/10',
  green: 'text-card-green hover:bg-card-green/10',
  purple: 'text-card-purple hover:bg-card-purple/10',
}

interface Props {
  teams: Team[]
}

export default function CardDistributor({ teams }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedCard, setSelectedCard] = useState('')
  const [colorFilter, setColorFilter] = useState<ColorFilter>('all')
  const [revealed, setRevealed] = useState(false)

  const filteredCards = colorFilter === 'all'
    ? CARD_CATALOG
    : CARD_CATALOG.filter((c) => c.color === colorFilter)

  const selectedCardDef = CARD_CATALOG.find((c) => c.id === selectedCard)
  const selectedTeamObj = teams.find((t) => t.id === selectedTeam)

  const reveal = async () => {
    if (!selectedTeam || !selectedCard) return
    const card = CARD_CATALOG.find((c) => c.id === selectedCard)
    if (!card) return

    const existing = await pb.collection('challenge_cards').getFullList({
      filter: `team_id="${selectedTeam}" && status="active"`,
    })
    for (const rec of existing) {
      await pb.collection('challenge_cards').update(rec.id, { status: 'completed' })
    }

    await pb.collection('challenge_cards').create({
      team_id: selectedTeam,
      card_id: card.id,
      color: card.color,
      points: card.points,
      title_fr: card.title_fr,
      title_en: card.title_en,
      mission_fr: card.mission_fr,
      mission_en: card.mission_en,
      status: 'active',
      revealed_at: new Date().toISOString(),
    })

    setRevealed(true)
    setTimeout(() => setRevealed(false), 2500)
    setSelectedCard('')
  }

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-display font-bold text-prussian mb-5">{t('admin.cards')}</h3>

        <div className="flex flex-col sm:flex-row gap-3 mb-5 bg-surface rounded-xl p-4 border border-surface-dark/30">
          <Select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="flex-1 py-2.5"
          >
            <option value="">-- {t('live.selectTeam')} --</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>{team.emoji} {team.name}</option>
            ))}
          </Select>
          <Button onClick={reveal} disabled={!selectedTeam || !selectedCard} className="px-8">
            {t('card.reveal')}
          </Button>
        </div>

        {revealed && (
          <div className="bg-sushi/10 border border-sushi/30 rounded-xl px-4 py-3 mb-5 text-sm text-prussian font-medium animate-slide-up">
            {t('card.revealed')}
          </div>
        )}

        {selectedCardDef && selectedTeamObj && (
          <div className="bg-prussian/5 border border-prussian/10 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
            <span className="text-sm text-prussian font-medium">
              {selectedTeamObj.emoji} {selectedTeamObj.name}
            </span>
            <span className="text-slate-gray">&rarr;</span>
            <span className="text-sm font-semibold text-prussian">
              {lang === 'fr' ? selectedCardDef.title_fr : selectedCardDef.title_en}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-lg text-white ml-auto bg-card-${selectedCardDef.color}`}>
              +{selectedCardDef.points} pts
            </span>
          </div>
        )}

        <div className="flex gap-1.5 mb-4 flex-wrap">
          {COLOR_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setColorFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                colorFilter === filter ? filterStyles[filter] : filterInactiveStyles[filter]
              }`}
            >
              {filter === 'all' ? t('card.allCards') : filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[36rem] overflow-y-auto pr-1">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              className="cursor-pointer"
            >
              <ChallengeCard card={card} selected={selectedCard === card.id} compact />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
