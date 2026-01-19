import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for Sundara music festival website.',
}

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="January 2026">
      <p>
        This Cookie Policy explains how Sundara uses cookies and similar technologies on our
        website.
      </p>

      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help
        websites remember your preferences and improve your browsing experience.
      </p>

      <h2>Types of Cookies We Use</h2>

      <h3>Essential Cookies</h3>
      <p>
        These cookies are necessary for the website to function properly. They enable core features
        like security, account access, and shopping cart functionality.
      </p>

      <h3>Analytics Cookies</h3>
      <p>
        We use analytics cookies to understand how visitors interact with our website. This helps us
        improve our content and user experience.
      </p>

      <h3>Marketing Cookies</h3>
      <p>
        These cookies may be used to deliver relevant advertisements and track the effectiveness of
        our marketing campaigns.
      </p>

      <h2>Managing Cookies</h2>
      <p>
        You can control and delete cookies through your browser settings. Please note that disabling
        certain cookies may affect your ability to use some features of our website.
      </p>

      <h2>Updates to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. Any changes will be posted on this page.
      </p>
    </LegalPage>
  )
}
