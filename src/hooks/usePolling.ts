import { useEffect, useCallback } from 'react'
import pb from '../lib/pocketbase'
import { fetchAll } from '../services/collectionService'

export function usePolling<T>(
  collection: string,
  onData: (items: T[]) => void,
  _interval?: number,
  enabled = true
) {
  const load = useCallback(async () => {
    try {
      const records = await fetchAll<T>(collection)
      onData(records)
    } catch {
      // silent
    }
  }, [collection, onData])

  useEffect(() => {
    if (!enabled) return

    load()

    let unsub: (() => void) | undefined
    pb.collection(collection).subscribe('*', () => {
      load()
    }).then((fn) => { unsub = fn })

    return () => { unsub?.() }
  }, [collection, enabled, load])
}

export function useSingleRecordPolling<T>(
  collection: string,
  onData: (item: T) => void,
  _interval?: number,
  enabled = true
) {
  const load = useCallback(async () => {
    try {
      const records = await fetchAll<T>(collection)
      if (records.length > 0) {
        onData(records[0])
      }
    } catch {
      // silent
    }
  }, [collection, onData])

  useEffect(() => {
    if (!enabled) return

    load()

    let unsub: (() => void) | undefined
    pb.collection(collection).subscribe('*', () => {
      load()
    }).then((fn) => { unsub = fn })

    return () => { unsub?.() }
  }, [collection, enabled, load])
}
