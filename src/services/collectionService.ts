import pb from '../lib/pocketbase'

export async function fetchAll<T>(collection: string): Promise<T[]> {
  return pb.collection(collection).getFullList<T>()
}
