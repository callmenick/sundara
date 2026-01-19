import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'

export const metadata: Metadata = {
  title: 'Tickets',
  description: 'Get your tickets for Sundara 2026.',
}

export default function TicketsPage() {
  return (
    <ComingSoon
      title="Tickets"
      description="Ticket sales for Sundara 2026 will be announced soon. Sign up for our newsletter to be the first to know."
    />
  )
}
