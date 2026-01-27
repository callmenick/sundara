'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { subscribe } from '@/domains/subscribers/actions'

export function NewsletterSignup() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setStatus('loading')
    const result = await subscribe(formData)

    if ('error' in result) {
      toast.error(result.error)
      setStatus('idle')
      return
    }

    setStatus('success')
    form.reset()
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-forest text-2xl sm:text-3xl">Stay in the Loop</h2>
        <p className="text-forest/70 mt-4">
          Be the first to know when tickets drop, lineup announcements, and festival updates.
        </p>

        {status === 'success' ? (
          <div className="mt-8 flex items-center justify-center gap-2">
            <CheckCircle className="text-jungle h-5 w-5" />
            <p className="text-jungle font-medium">You&apos;re on the list!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
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
