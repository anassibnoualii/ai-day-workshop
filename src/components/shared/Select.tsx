import type { SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({ className = '', children, ...rest }: Props) {
  return (
    <select
      className={`border rounded-lg px-3 py-1.5 text-sm bg-white text-dark-slate ${className}`}
      {...rest}
    >
      {children}
    </select>
  )
}
