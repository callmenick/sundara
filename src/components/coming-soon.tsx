import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ComingSoonProps {
  title: string
  description: string
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-display text-forest text-4xl sm:text-5xl md:text-6xl">{title}</h1>
      <p className="text-forest/70 mt-4 max-w-md text-lg">{description}</p>
      <div className="mt-8 flex gap-4">
        <Button
          asChild
          variant="outline"
          className="border-jungle text-jungle hover:bg-jungle hover:text-sand"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
