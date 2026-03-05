import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-sushi text-white hover:bg-sushi-dark shadow-sm shadow-sushi/20 hover:shadow-md hover:shadow-sushi/30',
  secondary: 'bg-prussian text-white hover:bg-prussian-light shadow-sm shadow-prussian/20',
  danger: 'bg-card-red text-white hover:bg-card-red/90 shadow-sm shadow-card-red/20',
  ghost: 'bg-surface text-dark-slate hover:bg-surface-dark',
}

const sizeStyles: Record<Size, string> = {
  sm: 'text-xs font-semibold px-3 py-1.5 rounded-lg',
  md: 'text-sm font-semibold px-5 py-2.5 rounded-xl',
}

export default function Button({ variant = 'primary', size = 'md', className = '', disabled, children, ...rest }: Props) {
  return (
    <button
      className={`transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
