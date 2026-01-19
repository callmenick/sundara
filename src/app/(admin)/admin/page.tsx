import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Welcome back, {session.user.name || session.user.email}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Tickets Sold" value="0" description="No sales yet" />
        <DashboardCard title="Revenue" value="$0" description="TTD total" />
        <DashboardCard title="Pending Applications" value="0" description="Vendors & Volunteers" />
      </div>

      <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Session Info</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">Role</dt>
            <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
              {session.user.role}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">MFA Enabled</dt>
            <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
              {session.user.mfaEnabled ? 'Yes' : 'No'}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">MFA Verified</dt>
            <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
              {session.user.mfaVerified ? 'Yes' : 'No'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  value,
  description,
}: {
  title: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">{value}</p>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  )
}
