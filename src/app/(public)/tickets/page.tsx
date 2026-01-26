import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'
import { PageHero } from '@/components/page-hero'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Tickets',
  description: 'Get your tickets for Sundara 2026.',
}

export default function TicketsPage() {
  return (
    <>
      <PageHero>
        <ComingSoon
          title="Tickets"
          description="Ticket sales for Sundara 2026 will be announced soon. Sign up for our newsletter to be the first to know."
        />
      </PageHero>
      <Separator className="bg-forest/10" />
      <NewsletterSignup />
    </>
  )
}
