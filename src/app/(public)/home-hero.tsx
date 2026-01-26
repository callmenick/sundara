import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Countdown } from '@/components/countdown.client'
import { HeroFoliage } from '@/components/hero-foliage.client'
import { FESTIVAL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function HomeHero() {
  return (
    <section className="relative -mt-(--header-height) flex flex-col overflow-hidden">
      <HeroFoliage />
      <div
        className={cn(
          'relative z-10 flex flex-1 flex-col items-center gap-4 text-center',
          'pt-[calc(var(--header-height)+--spacing(4))]',
          'pb-16'
        )}
      >
        <div className="relative h-72 w-72">
          <Image
            src="/logo/logo.svg"
            alt={`${FESTIVAL.name} - ${FESTIVAL.tagline}`}
            fill={true}
            priority
          />
        </div>

        <div>
          <p className="font-heading text-jungle text-lg sm:text-xl md:text-2xl">
            {FESTIVAL.location.country}
          </p>
          <p className="text-forest/60 mt-1 text-sm sm:text-base">{FESTIVAL.formatted.dateRange}</p>
        </div>

        <div>
          <Countdown targetDate={FESTIVAL.dates.start} variant="light" />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Button asChild size="lg" className="min-w-40 text-base">
            <Link href="/tickets">Get Tickets</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-forest/30 bg-forest/5 text-forest hover:bg-forest/10 hover:text-forest min-w-40 text-base"
          >
            <a href="#about">Learn More</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
