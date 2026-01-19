import type { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Sundara team.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Have questions about Sundara? We&apos;d love to hear from you.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="border-border rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <Mail className="text-primary h-5 w-5" />
            </div>
            <h2 className="font-semibold">Email</h2>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            For general inquiries, partnerships, or press requests.
          </p>
          <a
            href="mailto:hello@sundara.com"
            className="text-primary mt-4 inline-block text-sm font-medium hover:underline"
          >
            hello@sundara.com
          </a>
        </div>

        <div className="border-border rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <MapPin className="text-primary h-5 w-5" />
            </div>
            <h2 className="font-semibold">Location</h2>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            Trinidad & Tobago
            <br />
            Exact venue announced closer to the event.
          </p>
        </div>
      </div>

      <div className="border-border bg-muted/30 mt-12 rounded-lg border p-6">
        <h2 className="font-semibold">Quick Links</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Looking for something specific? Check out these pages:
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <strong>Tickets:</strong> Visit our{' '}
            <a href="/tickets" className="text-primary hover:underline">
              tickets page
            </a>{' '}
            for purchasing information.
          </li>
          <li>
            <strong>Vendors:</strong> Apply on our{' '}
            <a href="/vendors" className="text-primary hover:underline">
              vendors page
            </a>
            .
          </li>
          <li>
            <strong>Volunteers:</strong> Join our team via the{' '}
            <a href="/volunteer" className="text-primary hover:underline">
              volunteer page
            </a>
            .
          </li>
          <li>
            <strong>FAQ:</strong> Common questions answered on our{' '}
            <a href="/faq" className="text-primary hover:underline">
              FAQ page
            </a>
            .
          </li>
        </ul>
      </div>
    </div>
  )
}
