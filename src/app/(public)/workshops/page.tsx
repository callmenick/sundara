import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Workshops and activities at Sundara 2026.',
}

export default function WorkshopsPage() {
  return (
    <ComingSoon
      title="Workshops"
      description="Our workshop schedule is being curated. Expect yoga, art, wellness, and community experiences."
    />
  )
}
