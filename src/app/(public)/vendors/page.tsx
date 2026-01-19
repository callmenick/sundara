import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'

export const metadata: Metadata = {
  title: 'Vendors',
  description: 'Apply to be a vendor at Sundara 2026.',
}

export default function VendorsPage() {
  return (
    <ComingSoon
      title="Vendors"
      description="Vendor applications will open soon. Join us as a food or market vendor at Sundara 2026."
    />
  )
}
