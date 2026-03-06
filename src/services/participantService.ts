import pb from '../lib/pocketbase'
import type { Participant } from '../types'

export async function registerParticipant(username: string): Promise<Participant> {
  return pb.collection('participants').create<Participant>({
    username,
    validated: false,
  })
}

export async function findParticipantByUsername(username: string): Promise<Participant | null> {
  try {
    const result = await pb.collection('participants').getFirstListItem<Participant>(
      pb.filter('username = {:username}', { username })
    )
    return result
  } catch {
    return null
  }
}

export async function validateParticipant(id: string, validated: boolean) {
  await pb.collection('participants').update(id, { validated })
}

export async function deleteParticipant(id: string) {
  await pb.collection('participants').delete(id)
}
