import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { LoginForm } from './login-form.client'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>
}) {
  const session = await auth()
  const params = await searchParams

  if (session?.user) {
    if (session.user.mfaEnabled && !session.user.mfaVerified) {
      redirect('/admin/verify-mfa')
    }
    redirect(params.callbackUrl || '/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Sundara Admin
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to access the admin panel
          </p>
        </div>

        {params.error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            Invalid email or password
          </div>
        )}

        <LoginForm callbackUrl={params.callbackUrl} />
      </div>
    </div>
  )
}
