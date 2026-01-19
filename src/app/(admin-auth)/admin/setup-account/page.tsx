import { getAdminUserByInviteToken } from '@/domains/admin-users/queries'
import { SetupAccountForm } from './setup-account-form.client'

export default async function SetupAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  const token = params.token

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Invalid Invitation</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">No invitation token provided.</p>
        </div>
      </div>
    )
  }

  const user = await getAdminUserByInviteToken(token)

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Invalid or Expired Invitation
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            This invitation link is no longer valid.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Set Up Your Account
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Welcome! Complete your account setup for {user.email}
          </p>
        </div>

        <SetupAccountForm token={token} email={user.email} />
      </div>
    </div>
  )
}
