import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'
import { PageHero } from '@/components/page-hero'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Music',
  description: 'Explore the LIVE and RAVE stages at Sundara 2026.',
}

export default function MusicPage() {
  return (
    <>
      <PageHero>
        <ComingSoon
          title="Music"
          description="The lineup for Sundara 2026 will be announced soon. Two stages, one unforgettable weekend."
        />
      </PageHero>
      <Separator className="bg-forest/10" />
      <NewsletterSignup />
    </>
  )
}
