import pb from '../lib/pocketbase'

export function isAuthenticated() {
  return pb.authStore.isValid
}

export async function login(email: string, password: string) {
  await pb.collection('_superusers').authWithPassword(email, password)
}

export function logout() {
  pb.authStore.clear()
}
