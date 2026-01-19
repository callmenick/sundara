import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'

export const metadata: Metadata = {
  title: 'Music',
  description: 'Explore the LIVE and RAVE stages at Sundara 2026.',
}

export default function MusicPage() {
  return (
    <ComingSoon
      title="Music"
      description="The lineup for Sundara 2026 will be announced soon. Two stages, one unforgettable weekend."
    />
  )
}
