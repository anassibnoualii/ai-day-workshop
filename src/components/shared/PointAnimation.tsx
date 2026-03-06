import { useEffect, useState } from 'react'

interface Props {
  points: number
  trigger: number
}

export default function PointAnimation({ points, trigger }: Props) {
  const [hiddenAt, setHiddenAt] = useState(0)

  useEffect(() => {
    if (trigger === 0) return
    const id = setTimeout(() => setHiddenAt(trigger), 1200)
    return () => clearTimeout(id)
  }, [trigger])

  if (trigger === 0 || hiddenAt === trigger) return null

  return (
    <span
      className={`absolute -top-2 right-0 text-lg font-bold animate-float-up ${
        points > 0 ? 'text-sushi' : 'text-card-red'
      }`}
    >
      {points > 0 ? `+${points}` : points}
    </span>
  )
}
