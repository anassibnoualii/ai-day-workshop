import { useState, useEffect } from 'react'
import { useEventStore } from '../stores/eventStore'
import { calculateRemaining, formatTime } from '../lib/timer'

export function useTimer() {
  const timerStartedAt = useEventStore((s) => s.eventState?.timer_started_at ?? null)
  const timerDurationSeconds = useEventStore((s) => s.eventState?.timer_duration_seconds ?? 0)
  const timerRunning = useEventStore((s) => s.eventState?.timer_running ?? false)
  const timerPausedRemaining = useEventStore((s) => s.eventState?.timer_paused_remaining ?? null)
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    const update = () => {
      setRemaining(
        calculateRemaining(timerStartedAt, timerDurationSeconds, timerRunning, timerPausedRemaining)
      )
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [timerStartedAt, timerDurationSeconds, timerRunning, timerPausedRemaining])

  return {
    remaining,
    formatted: formatTime(remaining),
    isRunning: timerRunning,
    isLow: remaining > 0 && remaining < 60,
  }
}
