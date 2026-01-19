import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Sundara music festival.',
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="January 2026">
      <p>
        Your privacy is important to us. This Privacy Policy explains how Sundara collects, uses,
        and protects your personal information when you use our website and services.
      </p>

      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you:</p>
      <ul>
        <li>Purchase tickets or merchandise</li>
        <li>Create an account</li>
        <li>Subscribe to our newsletter</li>
        <li>Apply as a vendor or volunteer</li>
        <li>Contact us with questions or feedback</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Process your ticket purchases and send confirmations</li>
        <li>Communicate with you about the festival</li>
        <li>Send promotional emails (with your consent)</li>
        <li>Improve our services and website</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>Information Sharing</h2>
      <p>
        We do not sell your personal information. We may share your information with service
        providers who assist us in operating our website and conducting our business.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement appropriate security measures to protect your personal information. However, no
        method of transmission over the Internet is 100% secure.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us through our contact page.
      </p>
    </LegalPage>
  )
}
