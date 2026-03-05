import { useTimer } from '../../hooks/useTimer'

export default function Timer() {
  const { formatted, isRunning, isLow } = useTimer()

  return (
    <div
      className={`font-mono text-6xl font-bold tracking-wider transition-all ${
        isRunning ? 'animate-pulse-green text-sushi' : 'text-white/60'
      } ${isLow ? 'text-card-red animate-pulse' : ''}`}
    >
      {formatted}
    </div>
  )
}
