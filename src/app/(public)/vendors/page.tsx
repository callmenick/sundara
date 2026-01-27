import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'
import { PageHero } from '@/components/page-hero'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Vendors',
  description: 'Apply to be a vendor at Sundara 2026.',
}

export default function VendorsPage() {
  return (
    <>
      <PageHero>
        <ComingSoon
          title="Vendors"
          description="Vendor applications will open soon. Join us as a food or market vendor at Sundara 2026."
        />
      </PageHero>
      <Separator className="bg-forest/10" />
      <NewsletterSignup />
    </>
  )
}
