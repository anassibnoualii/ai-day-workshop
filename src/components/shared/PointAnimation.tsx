import { useEffect, useState } from 'react'

interface Props {
  points: number
  trigger: number
}

export default function PointAnimation({ points, trigger }: Props) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (trigger === 0) return
    setShow(true)
    const id = setTimeout(() => setShow(false), 1200)
    return () => clearTimeout(id)
  }, [trigger])

  if (!show) return null

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
