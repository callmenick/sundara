import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Countdown } from '@/components/countdown.client'

const FESTIVAL_DATE = new Date('2026-05-15T12:00:00')

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="mb-4 text-sm font-medium tracking-widest text-white/60 uppercase">
            A Camping Music Festival
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            SUNDARA
          </h1>

          <p className="mt-4 text-lg text-white/80 sm:text-xl md:text-2xl">
            Trinidad & Tobago &middot; May 2026
          </p>

          <div className="mt-12">
            <Countdown targetDate={FESTIVAL_DATE} />
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-40">
              <Link href="/tickets">Get Tickets</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-w-40 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>

        <a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/40 transition-colors hover:text-white/80"
          aria-label="Scroll to learn more"
        >
          <ArrowDown className="h-6 w-6" />
        </a>
      </section>

      <section id="about" className="bg-background py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Two Stages. One Weekend.
          </h2>
          <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
            Sundara brings together two distinct musical experiences under the Caribbean sky. The{' '}
            <strong className="text-foreground">LIVE</strong> stage features indie and rock acts,
            while the <strong className="text-foreground">RAVE</strong> stage delivers electronic
            and house music deep into the night.
          </p>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Beyond the music, discover workshops, local food vendors, art installations, and a
            community that celebrates creativity and connection.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="border-border bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold">Music</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Two stages featuring local and international artists across indie, rock, and
                electronic genres.
              </p>
            </div>
            <div className="border-border bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold">Camping</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Pitch your tent under the stars and wake up to the sounds of nature and community.
              </p>
            </div>
            <div className="border-border bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold">Workshops</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Yoga, art, wellness, and skill-sharing sessions throughout the weekend.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/music">Explore the Lineup</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
