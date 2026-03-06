import type { Workshop } from '../types'

const PB_URL = import.meta.env.VITE_PB_URL || 'http://127.0.0.1:8090'

export function getGuideFileUrl(workshop: Workshop, lang: string): string | null {
  const filename = lang === 'fr' ? workshop.guide_fr : workshop.guide_en
  if (!filename) return null
  return `${PB_URL}/api/files/workshops/${workshop.id}/${filename}`
}
