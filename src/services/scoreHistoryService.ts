import pb from '../lib/pocketbase'
import type { ScoreHistory } from '../types'

export async function addScoreEntry(teamId: string, delta: number, label: string) {
  await pb.collection('score_history').create({
    team_id: teamId,
    delta,
    label,
  })
}

export async function deleteAllScoreHistory() {
  const records = await pb.collection('score_history').getFullList<ScoreHistory>({
    requestKey: 'deleteAllHistory',
  })
  for (const r of records) {
    await pb.collection('score_history').delete(r.id, { requestKey: null })
  }
}
