import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'
import { PageHero } from '@/components/page-hero'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Workshops and activities at Sundara 2026.',
}

export default function WorkshopsPage() {
  return (
    <>
      <PageHero>
        <ComingSoon
          title="Workshops"
          description="Our workshop schedule is being curated. Expect yoga, art, wellness, and community experiences."
        />
      </PageHero>
      <Separator className="bg-forest/10" />
      <NewsletterSignup />
    </>
  )
}
