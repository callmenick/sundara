'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { setupAccount } from '@/domains/admin-users/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SetupAccountFormProps {
  token: string
  email: string
}

export function SetupAccountForm({ token, email }: SetupAccountFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPasswordErrors([])

    const formData = new FormData(event.currentTarget)
    formData.append('token', token)

    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    startTransition(async () => {
      const result = await setupAccount(formData)

      if (result.error) {
        if (result.details && Array.isArray(result.details)) {
          setPasswordErrors(result.details)
        } else {
          setError(result.error)
        }
        return
      }

      if (result.needsMfa) {
        router.push(`/admin/setup-mfa?userId=${result.userId}`)
      } else {
        router.push('/admin/login')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {passwordErrors.length > 0 && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          <ul className="list-inside list-disc space-y-1">
            {passwordErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Min 12 characters"
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Must be at least 12 characters with uppercase, lowercase, and numbers
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Setting up...' : 'Continue'}
      </Button>
    </form>
  )
}
