import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Countdown } from '@/components/countdown.client'
import { FESTIVAL } from '@/lib/constants'

export default function HomePage() {
  return (
    <>
      <section className="from-forest via-forest to-jungle relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b px-4">
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="font-heading text-sand/80 text-lg tracking-wide sm:text-xl md:text-2xl">
            A Camping Music Festival
          </p>

          <h1 className="text-display text-sand text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
            SUNDARA
          </h1>

          <p className="font-heading text-lime mt-2 text-xl sm:text-2xl md:text-3xl">
            {FESTIVAL.location.country}
          </p>
          <p className="text-sand/70 mt-1 text-base sm:text-lg">{FESTIVAL.formatted.dateRange}</p>

          <div className="mt-12">
            <Countdown targetDate={FESTIVAL.dates.start} />
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-44 text-base">
              <Link href="/tickets">Get Tickets</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-sand/30 bg-sand/10 text-sand hover:bg-sand/20 hover:text-sand min-w-44 text-base"
            >
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>

        <a
          href="#about"
          className="text-sand/50 hover:text-sand absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-colors"
          aria-label="Scroll to learn more"
        >
          <ArrowDown className="size-6" />
        </a>
      </section>

      <section id="about" className="bg-sand py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-forest text-3xl sm:text-4xl md:text-5xl">
            Two Stages. One Weekend.
          </h2>
          <p className="text-forest/80 mt-6 text-lg leading-relaxed">
            Sundara brings together two distinct musical experiences under the Caribbean sky. The{' '}
            <strong className="text-forest">LIVE</strong> stage features indie and rock acts, while
            the <strong className="text-forest">RAVE</strong> stage delivers electronic and house
            music deep into the night.
          </p>
          <p className="text-forest/80 mt-4 text-lg leading-relaxed">
            Beyond the music, discover workshops, local food vendors, art installations, and a
            community that celebrates creativity and connection.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white/60 p-6 shadow-sm">
              <h3 className="font-heading text-jungle text-xl">Music</h3>
              <p className="text-forest/70 mt-2 text-sm">
                Two stages featuring local and international artists across indie, rock, and
                electronic genres.
              </p>
            </div>
            <div className="rounded-xl bg-white/60 p-6 shadow-sm">
              <h3 className="font-heading text-jungle text-xl">Camping</h3>
              <p className="text-forest/70 mt-2 text-sm">
                Pitch your tent under the stars and wake up to the sounds of nature and community.
              </p>
            </div>
            <div className="rounded-xl bg-white/60 p-6 shadow-sm">
              <h3 className="font-heading text-jungle text-xl">Workshops</h3>
              <p className="text-forest/70 mt-2 text-sm">
                Yoga, art, wellness, and skill-sharing sessions throughout the weekend.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-jungle text-jungle hover:bg-jungle hover:text-sand"
            >
              <Link href="/music">Explore the Lineup</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
