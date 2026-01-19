import Link from 'next/link'
import { auth } from '@/auth'
import { SignOutButton } from './sign-out-button.client'
import {
  LayoutDashboard,
  FileText,
  Music,
  Tent,
  Store,
  Users,
  Ticket,
  ShoppingCart,
  QrCode,
  UserCog,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Content', href: '/admin/content', icon: FileText },
  { name: 'Lineup', href: '/admin/lineup', icon: Music },
  { name: 'Workshops', href: '/admin/workshops', icon: Tent },
  { name: 'Vendors', href: '/admin/vendors', icon: Store },
  { name: 'Volunteers', href: '/admin/volunteers', icon: Users },
  { name: 'Tickets', href: '/admin/tickets', icon: Ticket },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Check-in', href: '/admin/checkin', icon: QrCode },
]

const adminNavigation = [{ name: 'Admin Users', href: '/admin/users', icon: UserCog }]

export async function AdminSidebar() {
  const session = await auth()

  if (!session?.user) return null

  const isSuperAdmin = session.user.role === 'super_admin'

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex h-16 items-center border-b border-zinc-200 px-6 dark:border-zinc-800">
        <Link href="/admin" className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Sundara Admin
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}

        {isSuperAdmin && (
          <>
            <div className="my-4 border-t border-zinc-200 dark:border-zinc-800" />
            <p className="px-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              Administration
            </p>
            {adminNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <div className="mb-3 text-sm">
          <p className="font-medium text-zinc-900 dark:text-zinc-50">
            {session.user.name || 'Admin'}
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">{session.user.email}</p>
        </div>
        <SignOutButton />
      </div>
    </aside>
  )
}
