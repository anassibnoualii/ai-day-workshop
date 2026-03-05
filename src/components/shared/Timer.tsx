import { useTimer } from '../../hooks/useTimer'

export default function Timer() {
  const { formatted, isRunning, isLow } = useTimer()

  return (
    <div
      className={`font-mono text-6xl md:text-7xl font-bold tracking-wider transition-all duration-500 ${
        isLow
          ? 'text-card-red animate-pulse'
          : isRunning
            ? 'text-sushi animate-glow'
            : 'text-white/30'
      }`}
    >
      {formatted}
    </div>
  )
}
