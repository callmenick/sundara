import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Welcome back, {session.user.name || session.user.email}
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Session Info</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">Role</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-50">{session.user.role}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">MFA Enabled</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-50">
              {session.user.mfaEnabled ? 'Yes' : 'No'}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">MFA Verified</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-50">
              {session.user.mfaVerified ? 'Yes' : 'No'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
