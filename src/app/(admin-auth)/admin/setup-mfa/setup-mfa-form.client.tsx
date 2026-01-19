'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import QRCode from 'qrcode'
import { verifyMfaSetup } from '@/domains/admin-users/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SetupMfaFormProps {
  userId: string
  secret: string
  qrCodeUri: string
}

export function SetupMfaForm({ userId, secret, qrCodeUri }: SetupMfaFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')
  const [showManual, setShowManual] = useState(false)

  useEffect(() => {
    QRCode.toDataURL(qrCodeUri, { width: 200, margin: 2 })
      .then(setQrCodeDataUrl)
      .catch(console.error)
  }, [qrCodeUri])

  function handleCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('secret', secret)
    formData.append('token', code)

    startTransition(async () => {
      const result = await verifyMfaSetup(formData)

      if (result.error) {
        setError(result.error)
        return
      }

      router.push('/admin/login')
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="flex flex-col items-center space-y-4">
        {qrCodeDataUrl ? (
          <img
            src={qrCodeDataUrl}
            alt="QR Code for authenticator app"
            className="rounded-lg border border-zinc-200 dark:border-zinc-700"
          />
        ) : (
          <div className="flex h-[200px] w-[200px] items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700">
            <span className="text-sm text-zinc-500">Loading QR code...</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowManual(!showManual)}
          className="text-sm text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          {showManual ? 'Hide manual entry key' : "Can't scan? Enter manually"}
        </button>

        {showManual && (
          <div className="w-full rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Manual entry key:</p>
            <code className="mt-1 block font-mono text-sm break-all text-zinc-900 dark:text-zinc-50">
              {secret}
            </code>
          </div>
        )}
      </div>

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
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Enter the 6-digit code from your authenticator app to verify setup
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isPending || code.length !== 6}>
        {isPending ? 'Verifying...' : 'Complete Setup'}
      </Button>
    </form>
  )
}
