import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'
import { PageHero } from '@/components/page-hero'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Volunteer',
  description: 'Join the Work 2 Play volunteer program at Sundara 2026.',
}

export default function VolunteerPage() {
  return (
    <>
      <PageHero>
        <ComingSoon
          title="Work 2 Play"
          description="Volunteer applications will open soon. Work a few shifts and enjoy the rest of the festival."
        />
      </PageHero>
      <Separator className="bg-forest/10" />
      <NewsletterSignup />
    </>
  )
}
