import { useCallback } from 'react'
import { useEventStore } from '../stores/eventStore'
import { useSingleRecordPolling } from './usePolling'
import type { EventState } from '../types'

export function useEventState(enabled = true) {
  const setEventState = useEventStore((s) => s.setEventState)
  const onData = useCallback((item: EventState) => setEventState(item), [setEventState])
  useSingleRecordPolling<EventState>('event_state', onData, 3000, enabled)
  return useEventStore((s) => s.eventState)
}
