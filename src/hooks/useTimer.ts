import { useState, useEffect } from 'react'
import { useEventStore } from '../stores/eventStore'
import { calculateRemaining, formatTime } from '../lib/timer'

export function useTimer() {
  const eventState = useEventStore((s) => s.eventState)
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    if (!eventState) return

    const update = () => {
      setRemaining(
        calculateRemaining(
          eventState.timer_started_at,
          eventState.timer_duration_seconds,
          eventState.timer_running,
          eventState.timer_paused_remaining
        )
      )
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [eventState])

  return {
    remaining,
    formatted: formatTime(remaining),
    isRunning: eventState?.timer_running ?? false,
    isLow: remaining > 0 && remaining < 60,
  }
}
