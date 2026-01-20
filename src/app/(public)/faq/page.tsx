import Link from 'next/link'
import type { Metadata } from 'next'
import { FESTIVAL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Sundara music festival.',
}

const faqs = [
  {
    category: 'Tickets',
    questions: [
      {
        q: 'When do tickets go on sale?',
        a: 'Ticket sale dates will be announced on our website and social media channels. Sign up for our newsletter to be the first to know.',
      },
      {
        q: 'Are tickets refundable?',
        a: 'All ticket sales are final. Tickets are non-refundable unless the event is cancelled. Please review our Terms & Conditions for details.',
      },
      {
        q: 'Can I transfer my ticket to someone else?',
        a: 'Ticket transfers may be available through your account portal. Details will be provided closer to the event.',
      },
    ],
  },
  {
    category: 'Camping',
    questions: [
      {
        q: 'Is camping included with my ticket?',
        a: 'Camping access varies by ticket type. Check the ticket descriptions to see what is included with your purchase.',
      },
      {
        q: 'What should I bring for camping?',
        a: 'Bring a tent, sleeping bag, flashlight, sunscreen, and reusable water bottle. A full packing list will be provided closer to the event.',
      },
      {
        q: 'Are campfires allowed?',
        a: 'Open fires are not permitted. Designated cooking areas will be available on site.',
      },
    ],
  },
  {
    category: 'General',
    questions: [
      {
        q: 'What are the festival dates?',
        a: `${FESTIVAL.name} ${FESTIVAL.year} takes place ${FESTIVAL.formatted.dateRange}.`,
      },
      {
        q: 'Where is the festival located?',
        a: `${FESTIVAL.name} is held at ${FESTIVAL.location.venue} in ${FESTIVAL.location.area}, ${FESTIVAL.location.country}.`,
      },
      {
        q: 'Is there an age restriction?',
        a: `${FESTIVAL.name} is an all-ages event. Children under 12 must be accompanied by an adult at all times.`,
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="font-heading text-forest text-3xl sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="text-forest/70 mt-4 text-lg">
          Find answers to common questions about {FESTIVAL.name}.
        </p>
      </header>

      <div className="space-y-12">
        {faqs.map((section) => (
          <section key={section.category}>
            <h2 className="font-heading text-jungle text-xl">{section.category}</h2>
            <div className="mt-6 space-y-6">
              {section.questions.map((faq) => (
                <div key={faq.q} className="border-forest/20 border-b pb-6 last:border-0">
                  <h3 className="text-forest font-medium">{faq.q}</h3>
                  <p className="text-forest/70 mt-2 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="border-jungle/20 bg-jungle/5 mt-12 rounded-lg border p-6">
        <h2 className="font-heading text-jungle">Still have questions?</h2>
        <p className="text-forest/70 mt-2 text-sm">
          Can&apos;t find what you&apos;re looking for? Reach out to us on our{' '}
          <Link href="/contact" className="text-jungle hover:underline">
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
