import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = '', ...rest }: Props) {
  return (
    <input
      className={`border rounded-lg px-3 py-1.5 text-sm ${className}`}
      {...rest}
    />
  )
}
