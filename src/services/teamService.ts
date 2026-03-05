import pb from '../lib/pocketbase'
import type { Team } from '../types'

export async function updateTeamScore(team: Team, delta: number) {
  await pb.collection('teams').update(team.id, { score: team.score + delta })
}

export async function createTeam(name: string, emoji: string) {
  await pb.collection('teams').create({
    name,
    emoji: emoji || '\u{2B50}',
    slogan: '',
    score: 0,
  })
}

export async function deleteTeam(id: string) {
  await pb.collection('teams').delete(id)
}
