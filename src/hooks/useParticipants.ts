import { useCallback } from 'react'
import { useEventStore } from '../stores/eventStore'
import { usePolling } from './usePolling'
import type { Participant } from '../types'

export function useParticipants(enabled = true) {
  const setParticipants = useEventStore((s) => s.setParticipants)
  const onData = useCallback((items: Participant[]) => setParticipants(items), [setParticipants])
  usePolling<Participant>('participants', onData, enabled)
  return useEventStore((s) => s.participants)
}
