import pb from '../lib/pocketbase'
import type { Workshop } from '../types'

export async function updateWorkshopStatuses(
  workshops: Workshop[],
  activeWorkshop: Workshop
) {
  await Promise.all(
    workshops
      .filter((w) => {
        const newStatus = w.id === activeWorkshop.id
          ? 'active'
          : w.order < activeWorkshop.order
            ? 'done'
            : 'pending'
        return w.status !== newStatus
      })
      .map((w) => {
        const newStatus = w.id === activeWorkshop.id
          ? 'active'
          : w.order < activeWorkshop.order
            ? 'done'
            : 'pending'
        return pb.collection('workshops').update(w.id, { status: newStatus })
      })
  )
}

export async function updateWorkshopDocUrl(workshopId: string, url: string) {
  await pb.collection('workshops').update(workshopId, { doc_url: url || null })
}
