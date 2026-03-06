import pb from '../lib/pocketbase'
import { deleteAllRecords } from './collectionService'

export async function addScoreEntry(teamId: string, delta: number, label: string) {
  await pb.collection('score_history').create({
    team_id: teamId,
    delta,
    label,
  })
}

export async function deleteAllScoreHistory() {
  await deleteAllRecords('score_history')
}
