import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = '', ...rest }: Props) {
  return (
    <input
      className={`border border-surface-dark rounded-xl px-3.5 py-2 text-sm bg-white text-dark-slate placeholder:text-slate-gray/50 focus:outline-none focus:ring-2 focus:ring-sushi/30 focus:border-sushi/50 transition-all ${className}`}
      {...rest}
    />
  )
}
