import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { EventState } from '../../types'
import { startTimer, pauseTimer, resumeTimer, resetTimer, setTimerDuration } from '../../services/eventStateService'
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

  const handleStart = () => startTimer(eventState.id)
  const handlePause = () => pauseTimer(eventState)
  const handleResume = () => resumeTimer(eventState)
  const handleReset = () => resetTimer(eventState.id)

  const handleSetDuration = async () => {
    const mins = parseInt(durationMin)
    if (isNaN(mins) || mins <= 0) return
    await setTimerDuration(eventState.id, mins * 60)
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
          <Button onClick={handleStart} className="px-6">{t('timer.start')}</Button>
        )}
        {!isRunning && !!eventState.timer_paused_remaining && (
          <Button onClick={handleResume} className="px-6">{t('timer.start')}</Button>
        )}
        {isRunning && (
          <Button variant="danger" onClick={handlePause} className="px-6">{t('timer.pause')}</Button>
        )}
        <Button variant="ghost" onClick={handleReset} className="px-6">{t('timer.reset')}</Button>
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
        <Button variant="secondary" size="sm" onClick={handleSetDuration} className="px-4">OK</Button>
      </div>
    </Card>
  )
}
