import type { Workshop } from '../types'
import pb from './pocketbase'

export function getGuideFileUrl(workshop: Workshop, lang: string): string | null {
  const filename = lang === 'fr' ? workshop.guide_fr : workshop.guide_en
  if (!filename) return null
  return pb.files.getURL(workshop, filename)
}
