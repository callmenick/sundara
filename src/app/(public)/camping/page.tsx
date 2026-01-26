import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'
import { PageHero } from '@/components/page-hero'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Camping',
  description: 'Everything you need to know about camping at Sundara 2026.',
}

export default function CampingPage() {
  return (
    <>
      <PageHero>
        <ComingSoon
          title="Camping"
          description="Camping information, amenities, and setup guides will be available soon. Get ready to sleep under the stars."
        />
      </PageHero>
      <Separator className="bg-forest/10" />
      <NewsletterSignup />
    </>
  )
}
