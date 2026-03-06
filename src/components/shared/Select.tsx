import type { SelectHTMLAttributes } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement>

export default function Select({ className = '', children, ...rest }: Props) {
  return (
    <select
      className={`border border-surface-dark rounded-xl px-3.5 py-2 text-sm bg-white text-dark-slate focus:outline-none focus:ring-2 focus:ring-sushi/30 focus:border-sushi/50 transition-all ${className}`}
      {...rest}
    >
      {children}
    </select>
  )
}
