import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Sundara 2026 | A Camping Music Festival in Trinidad & Tobago',
    template: '%s | Sundara',
  },
  description:
    'Join us for Sundara 2026 - a weekend camping music festival featuring LIVE indie & rock and RAVE electronic music stages, workshops, and community in Trinidad & Tobago.',
  keywords: [
    'Sundara',
    'music festival',
    'Trinidad and Tobago',
    'camping festival',
    'indie rock',
    'electronic music',
    'LIVE stage',
    'RAVE stage',
  ],
  authors: [{ name: 'Sundara' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Sundara',
    title: 'Sundara 2026 | A Camping Music Festival in Trinidad & Tobago',
    description:
      'Join us for Sundara 2026 - a weekend camping music festival featuring LIVE indie & rock and RAVE electronic music stages, workshops, and community.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sundara 2026 | A Camping Music Festival in Trinidad & Tobago',
    description:
      'Join us for Sundara 2026 - a weekend camping music festival featuring LIVE indie & rock and RAVE electronic music stages.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#18181b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
