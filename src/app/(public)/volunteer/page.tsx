import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'

export const metadata: Metadata = {
  title: 'Volunteer',
  description: 'Join the Work 2 Play volunteer program at Sundara 2026.',
}

export default function VolunteerPage() {
  return (
    <ComingSoon
      title="Work 2 Play"
      description="Volunteer applications will open soon. Work a few shifts and enjoy the rest of the festival."
    />
  )
}
