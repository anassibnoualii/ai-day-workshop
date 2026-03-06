import type { Workshop } from '../types'
import { PB_URL } from './pocketbase'

export function getGuideFileUrl(workshop: Workshop, lang: string): string | null {
  const filename = lang === 'fr' ? workshop.guide_fr : workshop.guide_en
  if (!filename) return null
  return `${PB_URL}/api/files/workshops/${workshop.id}/${filename}`
}
