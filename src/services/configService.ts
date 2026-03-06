import pb from '../lib/pocketbase'
import type { Config, GlobalDoc } from '../types'

export async function updateFeedbackUrl(configId: string, url: string) {
  await pb.collection('config').update(configId, { feedback_url: url })
}

export async function toggleFeedbackEnabled(configId: string, enabled: boolean) {
  await pb.collection('config').update(configId, { feedback_enabled: enabled })
}

export async function addGlobalDoc(configId: string, label: string, url: string) {
  const config = await pb.collection('config').getOne<Config>(configId)
  const docs: GlobalDoc[] = [...config.global_docs, { label, url }]
  await pb.collection('config').update(configId, { global_docs: docs })
}

export async function removeGlobalDoc(configId: string, index: number) {
  const config = await pb.collection('config').getOne<Config>(configId)
  const docs = config.global_docs.filter((_, i) => i !== index)
  await pb.collection('config').update(configId, { global_docs: docs })
}
