import Link from 'next/link'

export default function AdminNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">404</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Page not found</p>
      <Link
        href="/admin"
        className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
