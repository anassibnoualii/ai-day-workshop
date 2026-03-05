import { useEffect, useRef } from 'react'
import { fetchAll } from '../services/collectionService'

export function usePolling<T>(
  collection: string,
  onData: (items: T[]) => void,
  interval = 3000,
  enabled = true
) {
  const prev = useRef<string>('')

  useEffect(() => {
    if (!enabled) return
    let active = true

    const poll = async () => {
      try {
        const records = await fetchAll<T>(collection)
        const json = JSON.stringify(records)
        if (json !== prev.current) {
          prev.current = json
          if (active) onData(records)
        }
      } catch {
        // silent
      }
    }

    poll()
    const id = setInterval(poll, interval)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [collection, interval, enabled, onData])
}

export function useSingleRecordPolling<T>(
  collection: string,
  onData: (item: T) => void,
  interval = 3000,
  enabled = true
) {
  const prev = useRef<string>('')

  useEffect(() => {
    if (!enabled) return
    let active = true

    const poll = async () => {
      try {
        const records = await fetchAll<T>(collection)
        if (records.length > 0) {
          const json = JSON.stringify(records[0])
          if (json !== prev.current) {
            prev.current = json
            if (active) onData(records[0])
          }
        }
      } catch {
        // silent
      }
    }

    poll()
    const id = setInterval(poll, interval)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [collection, interval, enabled, onData])
}
