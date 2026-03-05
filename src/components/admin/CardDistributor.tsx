import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Team } from '../../types'
import { CARD_CATALOG } from '../../lib/cards'
import pb from '../../lib/pocketbase'
import ChallengeCard from '../shared/ChallengeCard'
import Card from '../shared/Card'
import Button from '../shared/Button'
import Select from '../shared/Select'

interface Props {
  teams: Team[]
}

export default function CardDistributor({ teams }: Props) {
  const { t } = useTranslation()
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedCard, setSelectedCard] = useState('')

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

    setSelectedCard('')
  }

  return (
    <Card>
      <h3 className="font-bold text-dark-slate mb-4">{t('admin.cards')}</h3>
      <div className="flex gap-3 mb-6 bg-surface rounded-lg p-3">
        <Select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="flex-1 py-2"
        >
          <option value="">-- {t('live.selectTeam')} --</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>
          ))}
        </Select>
        <Button onClick={reveal} disabled={!selectedTeam || !selectedCard} className="px-6">
          {t('card.reveal')}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[32rem] overflow-y-auto pr-1">
        {CARD_CATALOG.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card.id)}
            className={`cursor-pointer transition rounded-xl ${selectedCard === card.id ? 'ring-2 ring-prussian scale-[1.02]' : 'hover:scale-[1.01]'}`}
          >
            <ChallengeCard card={card} />
          </div>
        ))}
      </div>
    </Card>
  )
}
