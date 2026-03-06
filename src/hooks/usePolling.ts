import { useEffect, useRef } from 'react'
import pb from '../lib/pocketbase'
import { fetchAll } from '../services/collectionService'

export function usePolling<T>(
  collection: string,
  onData: (items: T[]) => void,
  _interval = 3000,
  enabled = true
) {
  const onDataRef = useRef(onData)
  onDataRef.current = onData

  useEffect(() => {
    if (!enabled) return

    let active = true

    const load = async () => {
      try {
        const records = await fetchAll<T>(collection)
        if (active) onDataRef.current(records)
      } catch {
        // silent
      }
    }

    load()

    const unsubscribePromise = pb.collection(collection).subscribe('*', () => {
      load()
    })

    return () => {
      active = false
      unsubscribePromise.then((unsub) => unsub())
    }
  }, [collection, enabled])
}

export function useSingleRecordPolling<T>(
  collection: string,
  onData: (item: T) => void,
  _interval = 3000,
  enabled = true
) {
  const onDataRef = useRef(onData)
  onDataRef.current = onData

  useEffect(() => {
    if (!enabled) return

    let active = true

    const load = async () => {
      try {
        const records = await fetchAll<T>(collection)
        if (records.length > 0 && active) {
          onDataRef.current(records[0])
        }
      } catch {
        // silent
      }
    }

    load()

    const unsubscribePromise = pb.collection(collection).subscribe('*', () => {
      load()
    })

    return () => {
      active = false
      unsubscribePromise.then((unsub) => unsub())
    }
  }, [collection, enabled])
}
