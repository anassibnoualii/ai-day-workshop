interface Props {
  children: React.ReactNode
  className?: string
}

export default function SectionHeading({ children, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${className}`}>
      <div className="w-1 h-5 rounded-full bg-sushi" />
      <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-prussian">
        {children}
      </h3>
    </div>
  )
}
