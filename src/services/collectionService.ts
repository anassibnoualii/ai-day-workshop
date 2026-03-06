import pb from '../lib/pocketbase'

export async function deleteAllRecords(collection: string) {
  const records = await pb.collection(collection).getFullList({
    requestKey: `deleteAll_${collection}`,
  })
  for (const r of records) {
    await pb.collection(collection).delete(r.id, { requestKey: null })
  }
}
