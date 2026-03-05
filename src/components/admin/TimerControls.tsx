import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { EventState } from '../../types'
import pb from '../../lib/pocketbase'
import { useTimer } from '../../hooks/useTimer'
import Card from '../shared/Card'
import Button from '../shared/Button'
import Input from '../shared/Input'

interface Props {
  eventState: EventState | null
}

export default function TimerControls({ eventState }: Props) {
  const { t } = useTranslation()
  const [durationMin, setDurationMin] = useState('')
  const { formatted, isRunning, isLow } = useTimer()

  if (!eventState) return null

  const start = async () => {
    await pb.collection('event_state').update(eventState.id, {
      timer_started_at: Math.floor(Date.now() / 1000),
      timer_running: true,
      timer_paused_remaining: null,
    })
  }

  const pause = async () => {
    const now = Math.floor(Date.now() / 1000)
    const elapsed = eventState.timer_started_at ? now - eventState.timer_started_at : 0
    const remaining = Math.max(0, eventState.timer_duration_seconds - elapsed)
    await pb.collection('event_state').update(eventState.id, {
      timer_running: false,
      timer_paused_remaining: remaining,
    })
  }

  const resume = async () => {
    const remaining = eventState.timer_paused_remaining || eventState.timer_duration_seconds
    const now = Math.floor(Date.now() / 1000)
    const fakeStartedAt = now - (eventState.timer_duration_seconds - remaining)
    await pb.collection('event_state').update(eventState.id, {
      timer_started_at: fakeStartedAt,
      timer_running: true,
      timer_paused_remaining: null,
    })
  }

  const reset = async () => {
    await pb.collection('event_state').update(eventState.id, {
      timer_started_at: null,
      timer_running: false,
      timer_paused_remaining: null,
    })
  }

  const setDuration = async () => {
    const mins = parseInt(durationMin)
    if (isNaN(mins) || mins <= 0) return
    await pb.collection('event_state').update(eventState.id, {
      timer_duration_seconds: mins * 60,
      timer_started_at: null,
      timer_running: false,
      timer_paused_remaining: null,
    })
    setDurationMin('')
  }

  return (
    <Card className="flex flex-col items-center">
      <h3 className="font-display font-bold text-prussian mb-6 self-start">Timer</h3>
      <div className={`font-mono text-6xl font-bold tabular-nums mb-6 transition-all duration-500 ${isLow ? 'text-card-red' : isRunning ? 'text-sushi animate-glow' : 'text-prussian/30'}`}>
        {formatted}
      </div>
      <div className="flex gap-2 mb-5">
        {!isRunning && !eventState.timer_paused_remaining && (
          <Button onClick={start} className="px-6">{t('timer.start')}</Button>
        )}
        {!isRunning && !!eventState.timer_paused_remaining && (
          <Button onClick={resume} className="px-6">{t('timer.start')}</Button>
        )}
        {isRunning && (
          <Button variant="danger" onClick={pause} className="px-6">{t('timer.pause')}</Button>
        )}
        <Button variant="ghost" onClick={reset} className="px-6">{t('timer.reset')}</Button>
      </div>
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          placeholder={t('timer.duration')}
          value={durationMin}
          onChange={(e) => setDurationMin(e.target.value)}
          className="w-32"
          min="1"
        />
        <Button variant="secondary" size="sm" onClick={setDuration} className="px-4">OK</Button>
      </div>
    </Card>
  )
}
