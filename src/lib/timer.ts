export function nowSeconds(): number {
  return Math.floor(Date.now() / 1000)
}

export function calculateRemaining(
  timerStartedAt: number | null,
  durationSeconds: number,
  running: boolean,
  pausedRemaining: number | null
): number {
  if (!running && pausedRemaining != null) return pausedRemaining
  if (!running || !timerStartedAt) return durationSeconds
  const elapsed = nowSeconds() - timerStartedAt
  return Math.max(0, durationSeconds - elapsed)
}

export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
