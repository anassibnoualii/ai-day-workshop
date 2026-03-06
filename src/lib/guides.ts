import type { Workshop } from '../types'

export function getGuideUrls(workshop: Workshop, lang: string): string[] {
  if (!workshop.guides || !Array.isArray(workshop.guides)) return []
  return workshop.guides
    .map((g) => (lang === 'fr' ? g.fr : g.en))
    .filter(Boolean)
}
