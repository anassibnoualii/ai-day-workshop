interface Props {
  children: React.ReactNode
  className?: string
}

export default function SectionHeading({ children, className = '' }: Props) {
  return (
    <h3 className={`text-sm font-bold uppercase tracking-widest text-sushi mb-3 ${className}`}>
      {children}
    </h3>
  )
}
