interface Props {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: Props) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm shadow-prussian/5 border border-surface-dark/50 ${className}`}>
      {children}
    </div>
  )
}
