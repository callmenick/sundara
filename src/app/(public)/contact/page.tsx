import Link from 'next/link'
import type { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'
import { FESTIVAL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with the ${FESTIVAL.name} team.`,
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="font-heading text-forest text-3xl sm:text-4xl">Contact Us</h1>
        <p className="text-forest/70 mt-4 text-lg">
          Have questions about {FESTIVAL.name}? We&apos;d love to hear from you.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="border-forest/20 rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="bg-jungle/10 flex h-10 w-10 items-center justify-center rounded-full">
              <Mail className="text-jungle h-5 w-5" />
            </div>
            <h2 className="font-heading text-jungle">Email</h2>
          </div>
          <p className="text-forest/70 mt-4 text-sm">
            For general inquiries, partnerships, or press requests.
          </p>
          <a
            href="mailto:hello@sundara.com"
            className="text-jungle mt-4 inline-block text-sm font-medium hover:underline"
          >
            hello@sundara.com
          </a>
        </div>

        <div className="border-forest/20 rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="bg-jungle/10 flex h-10 w-10 items-center justify-center rounded-full">
              <MapPin className="text-jungle h-5 w-5" />
            </div>
            <h2 className="font-heading text-jungle">Location</h2>
          </div>
          <p className="text-forest/70 mt-4 text-sm">
            {FESTIVAL.location.venue}
            <br />
            {FESTIVAL.location.area}, {FESTIVAL.location.country}
          </p>
          <a
            href={FESTIVAL.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-jungle mt-4 inline-block text-sm font-medium hover:underline"
          >
            View on Google Maps
          </a>
        </div>
      </div>

      <div className="border-jungle/20 bg-jungle/5 mt-12 rounded-lg border p-6">
        <h2 className="font-heading text-jungle">Quick Links</h2>
        <p className="text-forest/70 mt-2 text-sm">
          Looking for something specific? Check out these pages:
        </p>
        <ul className="text-forest/70 mt-4 space-y-2 text-sm">
          <li>
            <strong className="text-forest">Tickets:</strong> Visit our{' '}
            <Link href="/tickets" className="text-jungle hover:underline">
              tickets page
            </Link>{' '}
            for purchasing information.
          </li>
          <li>
            <strong className="text-forest">Vendors:</strong> Apply on our{' '}
            <Link href="/vendors" className="text-jungle hover:underline">
              vendors page
            </Link>
            .
          </li>
          <li>
            <strong className="text-forest">Volunteers:</strong> Join our team via the{' '}
            <Link href="/volunteer" className="text-jungle hover:underline">
              volunteer page
            </Link>
            .
          </li>
          <li>
            <strong className="text-forest">FAQ:</strong> Common questions answered on our{' '}
            <Link href="/faq" className="text-jungle hover:underline">
              FAQ page
            </Link>
            .
          </li>
        </ul>
      </div>
    </div>
  )
}
