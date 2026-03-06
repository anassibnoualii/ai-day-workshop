import { useCallback } from 'react'
import { useEventStore } from '../stores/eventStore'
import { useSingleRecordPolling } from './usePolling'
import type { Config } from '../types'

export function useConfig(enabled = true) {
  const setConfig = useEventStore((s) => s.setConfig)
  const onData = useCallback((item: Config) => setConfig(item), [setConfig])
  useSingleRecordPolling<Config>('config', onData, enabled)
  return useEventStore((s) => s.config)
}
