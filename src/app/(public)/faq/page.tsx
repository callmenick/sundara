import type { Metadata } from 'next'

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
        a: 'Sundara 2026 takes place in May. Exact dates will be announced soon.',
      },
      {
        q: 'Where is the festival located?',
        a: 'Sundara is held in Trinidad & Tobago. The exact venue will be announced closer to the event.',
      },
      {
        q: 'Is there an age restriction?',
        a: 'Sundara is an all-ages event. Children under 12 must be accompanied by an adult at all times.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Find answers to common questions about Sundara.
        </p>
      </header>

      <div className="space-y-12">
        {faqs.map((section) => (
          <section key={section.category}>
            <h2 className="text-xl font-semibold">{section.category}</h2>
            <div className="mt-6 space-y-6">
              {section.questions.map((faq) => (
                <div key={faq.q} className="border-border border-b pb-6 last:border-0">
                  <h3 className="font-medium">{faq.q}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="border-border bg-muted/30 mt-12 rounded-lg border p-6">
        <h2 className="font-semibold">Still have questions?</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Can&apos;t find what you&apos;re looking for? Reach out to us on our{' '}
          <a href="/contact" className="text-primary hover:underline">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  )
}
