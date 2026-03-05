import pb from '../lib/pocketbase'
import type { Workshop } from '../types'

export async function updateWorkshopStatuses(
  workshops: Workshop[],
  activeWorkshop: Workshop
) {
  for (const w of workshops) {
    const newStatus = w.id === activeWorkshop.id
      ? 'active'
      : w.order < activeWorkshop.order
        ? 'done'
        : 'pending'
    if (w.status !== newStatus) {
      await pb.collection('workshops').update(w.id, { status: newStatus })
    }
  }
}

export async function updateWorkshopDocUrl(workshopId: string, url: string) {
  await pb.collection('workshops').update(workshopId, { doc_url: url || null })
}
