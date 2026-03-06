import { useCallback } from 'react'
import { useEventStore } from '../stores/eventStore'
import { usePolling } from './usePolling'
import type { ScoreHistory } from '../types'

export function useScoreHistory(enabled = true) {
  const setScoreHistory = useEventStore((s) => s.setScoreHistory)
  const onData = useCallback((items: ScoreHistory[]) => setScoreHistory(items), [setScoreHistory])
  usePolling<ScoreHistory>('score_history', onData, 3000, enabled)
  return useEventStore((s) => s.scoreHistory)
}
