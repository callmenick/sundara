'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface VerifyMfaFormProps {
  userId: string
}

export function VerifyMfaForm({ userId }: VerifyMfaFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [code, setCode] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await signIn('mfa', {
      userId,
      token: code,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid verification code')
      setIsLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  function handleCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="code">Verification Code</Label>
        <Input
          id="code"
          name="code"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          required
          placeholder="000000"
          value={code}
          onChange={handleCodeChange}
          className="text-center text-2xl tracking-widest"
          maxLength={6}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
        {isLoading ? 'Verifying...' : 'Verify'}
      </Button>
    </form>
  )
}
