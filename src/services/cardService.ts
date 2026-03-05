import pb from '../lib/pocketbase'
import type { CardDefinition } from '../types'

export async function revealCard(teamId: string, card: CardDefinition) {
  const existing = await pb.collection('challenge_cards').getFullList({
    filter: `team_id="${teamId}" && status="active"`,
  })
  for (const rec of existing) {
    await pb.collection('challenge_cards').update(rec.id, { status: 'completed' })
  }

  await pb.collection('challenge_cards').create({
    team_id: teamId,
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
}
