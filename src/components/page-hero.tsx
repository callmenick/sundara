import { cn } from '@/lib/utils'

interface PageHeroProps {
  children: React.ReactNode
  className?: string
}

export function PageHero({ children, className }: PageHeroProps) {
  return <div className={cn('py-8 sm:py-16', className)}>{children}</div>
}
