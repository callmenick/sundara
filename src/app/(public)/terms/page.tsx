import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for Sundara music festival.',
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" lastUpdated="January 2026">
      <p>
        Please read these Terms & Conditions carefully before purchasing tickets or attending
        Sundara music festival.
      </p>

      <h2>Ticket Purchase</h2>
      <p>
        All ticket sales are final. Tickets are non-refundable and non-transferable unless otherwise
        stated. You must present valid identification matching the ticket holder name at the gate.
      </p>

      <h2>Event Rules</h2>
      <p>By attending Sundara, you agree to:</p>
      <ul>
        <li>Follow all instructions from event staff and security</li>
        <li>Not bring prohibited items onto the festival grounds</li>
        <li>Respect fellow attendees, artists, and the venue</li>
        <li>Comply with all applicable laws and regulations</li>
      </ul>

      <h2>Assumption of Risk</h2>
      <p>
        You acknowledge that attending an outdoor music festival involves inherent risks. You assume
        all risks associated with your attendance, including but not limited to injury, illness, or
        loss of property.
      </p>

      <h2>Photography and Recording</h2>
      <p>
        By attending Sundara, you consent to being photographed, filmed, and recorded. These images
        may be used for promotional purposes without compensation.
      </p>

      <h2>Event Changes</h2>
      <p>
        We reserve the right to modify the event lineup, schedule, or venue. In the event of
        cancellation, refund policies will be communicated to ticket holders.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Sundara and its organizers shall not be liable for
        any direct, indirect, incidental, or consequential damages arising from your attendance.
      </p>
    </LegalPage>
  )
}
