import pb from '../lib/pocketbase'
import type { Team } from '../types'
import { deleteAllRecords } from './collectionService'

export async function updateTeamScore(teamId: string, delta: number) {
  const team = await pb.collection('teams').getOne<Team>(teamId)
  await pb.collection('teams').update(teamId, { score: team.score + delta })
}

export async function createTeam(name: string, emoji: string) {
  await pb.collection('teams').create({
    name,
    emoji: emoji || '\u{2B50}',
    slogan: '',
    score: 0,
    members: [],
  })
}

export async function deleteTeam(id: string) {
  await pb.collection('teams').delete(id)
}

export async function deleteAllTeams() {
  await deleteAllRecords('teams')
}

export async function updateTeamInfo(teamId: string, data: { name?: string; emoji?: string }) {
  await pb.collection('teams').update(teamId, data)
}

export async function updateTeamMembers(teamId: string, members: string[]) {
  await pb.collection('teams').update(teamId, { members })
}

export async function resetAllScores(teams: Team[]) {
  await Promise.all(
    teams.filter((t) => t.score !== 0).map((t) =>
      pb.collection('teams').update(t.id, { score: 0 })
    )
  )
}
