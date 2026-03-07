import { Link } from 'react-router-dom'

interface NavLinkProps {
  to: string
  label: string
  active: boolean
  onClick?: () => void
  className?: string
}

export default function NavLink({ to, label, active, onClick, className = '' }: NavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
        active
          ? 'text-sushi bg-sushi/10'
          : 'text-white/70 hover:text-white hover:bg-white/5'
      } ${className}`}
    >
      {label}
    </Link>
  )
}
