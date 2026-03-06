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
    members: [],
  })
}

export async function deleteTeam(id: string) {
  await pb.collection('teams').delete(id)
}

export async function deleteAllTeams() {
  const records = await pb.collection('teams').getFullList<Team>({
    requestKey: 'deleteAllTeams',
  })
  for (const r of records) {
    await pb.collection('teams').delete(r.id, { requestKey: null })
  }
}

export async function updateTeamInfo(teamId: string, data: { name?: string; emoji?: string }) {
  await pb.collection('teams').update(teamId, data)
}

export async function updateTeamMembers(teamId: string, members: string[]) {
  await pb.collection('teams').update(teamId, { members })
}

export async function resetAllScores(teams: Team[]) {
  for (const t of teams) {
    if (t.score !== 0) {
      await pb.collection('teams').update(t.id, { score: 0 })
    }
  }
}
