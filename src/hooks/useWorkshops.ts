import { useCallback } from 'react'
import { useEventStore } from '../stores/eventStore'
import { usePolling } from './usePolling'
import type { Workshop } from '../types'

export function useWorkshops(enabled = true) {
  const setWorkshops = useEventStore((s) => s.setWorkshops)
  const onData = useCallback((items: Workshop[]) => setWorkshops(items), [setWorkshops])
  usePolling<Workshop>('workshops', onData, enabled)
  return useEventStore((s) => s.workshops)
}
