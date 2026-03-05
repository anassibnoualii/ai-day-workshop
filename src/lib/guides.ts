const GUIDE_MAP: Record<number, { fr: string; en: string }> = {
  2: {
    fr: '/guides/fr/atelier-1-agent-declaratif.md',
    en: '/guides/en/workshop-1-declarative-agent.md',
  },
  4: {
    fr: '/guides/fr/atelier-2-agent-conversationnel.md',
    en: '/guides/en/workshop-2-conversational-agent.md',
  },
  7: {
    fr: '/guides/fr/atelier-3-agent-autonome.md',
    en: '/guides/en/workshop-3-autonomous-agent.md',
  },
}

export function getGuideUrl(workshopOrder: number, lang: string): string | null {
  const guide = GUIDE_MAP[workshopOrder]
  if (!guide) return null
  return lang === 'fr' ? guide.fr : guide.en
}
