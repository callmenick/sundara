import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { VerifyMfaForm } from './verify-mfa-form.client'

export default async function VerifyMfaPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/admin/login')
  }

  if (session.user.mfaVerified) {
    redirect('/admin')
  }

  if (!session.user.mfaEnabled) {
    redirect('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Two-Factor Authentication
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <VerifyMfaForm userId={session.user.id} />
      </div>
    </div>
  )
}
