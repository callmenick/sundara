'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { FESTIVAL } from '@/lib/constants'

const navLinks = [
  { href: '/music', label: 'Music' },
  { href: '/camping', label: 'Camping' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/vendors', label: 'Vendors' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/faq', label: 'FAQ' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-sand/90 fixed top-0 z-50 w-full backdrop-blur-sm">
      <div className="mx-auto flex h-(--header-height) max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-display text-forest text-2xl uppercase">
          {FESTIVAL.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-forest/80 hover:text-forest text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/tickets">Get Tickets</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="text-forest hover:bg-forest/10 hover:text-forest"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-sand bg-sand w-72">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 pt-6">
                <Link
                  href="/"
                  className="text-display text-forest text-2xl uppercase"
                  onClick={() => setOpen(false)}
                >
                  Sundara
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-forest/80 hover:text-forest text-base font-medium transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-4">
                  <Link href="/tickets" onClick={() => setOpen(false)}>
                    Get Tickets
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
