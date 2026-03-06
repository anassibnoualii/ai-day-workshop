import { useCallback } from 'react'
import { useEventStore } from '../stores/eventStore'
import { usePolling } from './usePolling'
import type { ChallengeCard } from '../types'

export function useChallengeCards(enabled = true) {
  const setChallengeCards = useEventStore((s) => s.setChallengeCards)
  const onData = useCallback((items: ChallengeCard[]) => setChallengeCards(items), [setChallengeCards])
  usePolling<ChallengeCard>('challenge_cards', onData, enabled)
  return useEventStore((s) => s.challengeCards)
}
