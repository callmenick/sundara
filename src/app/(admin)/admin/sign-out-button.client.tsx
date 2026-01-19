'use client'

import { LogOut } from 'lucide-react'
import { signOutAction } from '@/domains/admin-users/actions/sign-out'

export function SignOutButton() {
  return (
    <button
      onClick={() => signOutAction()}
      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  )
}
