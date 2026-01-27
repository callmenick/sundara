'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    // TODO: Implement newsletter signup API
    // For now, simulate success
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('success')
    setEmail('')
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-forest text-2xl sm:text-3xl">Stay in the Loop</h2>
        <p className="text-forest/70 mt-4">
          Be the first to know when tickets drop, lineup announcements, and festival updates.
        </p>

        {status === 'success' ? (
          <div className="mt-8">
            <p className="text-jungle font-medium">You&apos;re on the list!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-forest/30 bg-forest/10 text-forest placeholder:text-forest/50 focus-visible:ring-forest/50 flex-1"
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              className="bg-forest text-sand hover:bg-forest/90"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
