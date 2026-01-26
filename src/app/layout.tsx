import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { SEO } from '@/lib/seo'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const tanMaple = localFont({
  src: '../../public/fonts/tan-maple.otf',
  variable: '--font-tan-maple',
  display: 'swap',
})

const girlishWaves = localFont({
  src: '../../public/fonts/girlish-waves.otf',
  variable: '--font-girlish-waves',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: SEO.home.title,
    template: SEO.titleTemplate,
  },
  description: SEO.home.description,
  keywords: SEO.keywords,
  authors: [{ name: SEO.siteName }],
  openGraph: {
    type: SEO.openGraph.type,
    locale: SEO.openGraph.locale,
    siteName: SEO.siteName,
    title: SEO.home.title,
    description: SEO.home.description,
  },
  twitter: {
    card: SEO.twitter.card,
    title: SEO.home.title,
    description: SEO.home.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#005d41',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${tanMaple.variable} ${girlishWaves.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
