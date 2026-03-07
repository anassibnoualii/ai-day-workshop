import { useEffect, useRef, useCallback } from 'react'
import pb from '../lib/pocketbase'

type Subscription = {
  refCount: number
  unsub?: () => void
  listeners: Set<(items: unknown[]) => void>
  lastData?: unknown[]
  load: () => Promise<void>
}

const activeSubscriptions = new Map<string, Subscription>()

function subscribe(collection: string, listener: (items: unknown[]) => void) {
  let sub = activeSubscriptions.get(collection)

  if (!sub) {
    const load = async () => {
      try {
        const records = await pb.collection(collection).getFullList()
        const current = activeSubscriptions.get(collection)
        if (current) current.lastData = records
        current?.listeners.forEach((fn) => fn(records))
      } catch {
        // silent
      }
    }

    sub = { refCount: 0, listeners: new Set(), load }
    activeSubscriptions.set(collection, sub)

    load()
    pb.collection(collection).subscribe('*', () => { load() }).then((fn) => {
      const current = activeSubscriptions.get(collection)
      if (current) current.unsub = fn
      else fn()
    })
  }

  sub.refCount++
  sub.listeners.add(listener)
  if (sub.lastData) listener(sub.lastData)

  return () => {
    const current = activeSubscriptions.get(collection)
    if (!current) return
    current.listeners.delete(listener)
    current.refCount--
    if (current.refCount <= 0) {
      current.unsub?.()
      activeSubscriptions.delete(collection)
    }
  }
}

export function usePolling<T>(
  collection: string,
  onData: (items: T[]) => void,
  enabled = true
) {
  const onDataRef = useRef(onData)
  useEffect(() => { onDataRef.current = onData })

  const listener = useCallback((items: unknown[]) => {
    onDataRef.current(items as T[])
  }, [])

  useEffect(() => {
    if (!enabled) return
    return subscribe(collection, listener)
  }, [collection, enabled, listener])
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
