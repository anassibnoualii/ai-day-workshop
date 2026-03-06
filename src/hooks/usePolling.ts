import { useEffect, useRef, useCallback } from 'react'
import pb from '../lib/pocketbase'

export function usePolling<T>(
  collection: string,
  onData: (items: T[]) => void,
  enabled = true
) {
  const onDataRef = useRef(onData)
  useEffect(() => { onDataRef.current = onData })

  const load = useCallback(async () => {
    try {
      const records = await pb.collection(collection).getFullList<T>()
      onDataRef.current(records)
    } catch {
      // silent
    }
  }, [collection])

  useEffect(() => {
    if (!enabled) return

    load()

    let unsub: (() => void) | undefined
    let unmounted = false
    pb.collection(collection).subscribe('*', () => {
      load()
    }).then((fn) => {
      if (unmounted) fn()
      else unsub = fn
    })

    return () => {
      unmounted = true
      unsub?.()
    }
  }, [collection, enabled, load])
}

export function useSingleRecordPolling<T>(
  collection: string,
  onData: (item: T) => void,
  enabled = true
) {
  const onDataRef = useRef(onData)
  useEffect(() => { onDataRef.current = onData })

  const wrapped = useCallback((items: T[]) => {
    if (items.length > 0) onDataRef.current(items[0])
  }, [])

  usePolling(collection, wrapped, enabled)
}
