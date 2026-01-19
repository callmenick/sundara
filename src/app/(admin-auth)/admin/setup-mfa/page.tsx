import { generateMfaSetup } from '@/domains/admin-users/actions'
import { SetupMfaForm } from './setup-mfa-form.client'

export default async function SetupMfaPage({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string }>
}) {
  const params = await searchParams
  const userId = params.userId

  if (!userId) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Invalid Request</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">No user ID provided.</p>
        </div>
      </div>
    )
  }

  const result = await generateMfaSetup(userId)

  if (result.error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Error</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{result.error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Set Up Two-Factor Authentication
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Scan the QR code with your authenticator app
          </p>
        </div>

        <SetupMfaForm userId={userId} secret={result.secret!} qrCodeUri={result.qrCodeUri!} />
      </div>
    </div>
  )
}
