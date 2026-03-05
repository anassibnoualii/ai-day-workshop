import { useCallback } from 'react'
import { useEventStore } from '../stores/eventStore'
import { usePolling } from './usePolling'
import type { Team } from '../types'

export function useTeams(enabled = true) {
  const setTeams = useEventStore((s) => s.setTeams)
  const onData = useCallback((items: Team[]) => setTeams(items), [setTeams])
  usePolling<Team>('teams', onData, 3000, enabled)
  return useEventStore((s) => s.teams)
}
