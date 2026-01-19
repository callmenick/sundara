import Link from 'next/link'
import { Instagram, Facebook, Youtube } from 'lucide-react'

const festivalLinks = [
  { href: '/music', label: 'Music' },
  { href: '/camping', label: 'Camping' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/faq', label: 'FAQ' },
]

const involvedLinks = [
  { href: '/vendors', label: 'Vendors' },
  { href: '/volunteer', label: 'Volunteer' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/cookies', label: 'Cookie Policy' },
]

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
  { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
  { href: 'https://youtube.com', label: 'YouTube', icon: Youtube },
]

export function Footer() {
  return (
    <footer className="border-border bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight">
              SUNDARA
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs text-sm">
              A weekend camping music festival in Trinidad & Tobago featuring LIVE and RAVE stages,
              workshops, and community.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Festival</h3>
            <ul className="mt-4 space-y-3">
              {festivalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Get Involved</h3>
            <ul className="mt-4 space-y-3">
              {involvedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border mt-12 border-t pt-8">
          <p className="text-muted-foreground text-center text-sm">
            &copy; {new Date().getFullYear()} Sundara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
