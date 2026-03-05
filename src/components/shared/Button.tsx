import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-sushi text-white hover:bg-sushi-dark',
  secondary: 'bg-prussian text-white hover:bg-prussian-light',
  danger: 'bg-card-red text-white hover:opacity-80',
  ghost: 'bg-surface text-dark-slate hover:bg-slate-gray/20',
}

const sizeStyles: Record<Size, string> = {
  sm: 'text-xs px-2.5 py-1 rounded',
  md: 'text-sm font-semibold px-4 py-2 rounded-lg',
}

export default function Button({ variant = 'primary', size = 'md', className = '', disabled, children, ...rest }: Props) {
  return (
    <button
      className={`transition disabled:opacity-40 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
