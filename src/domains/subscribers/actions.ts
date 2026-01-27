'use server'

import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentEdition } from '@/domains/editions/queries'

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function subscribe(
  formData: FormData
): Promise<{ success: true } | { error: string }> {
  const parsed = subscribeSchema.safeParse({
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid email' }
  }

  const email = parsed.data.email.toLowerCase().trim()

  const supabase = createAdminClient()
  const edition = await getCurrentEdition()

  const { error } = await supabase.from('subscribers').upsert(
    {
      email,
      edition_id: edition?.id ?? null,
      source: 'website',
      subscribed_at: new Date().toISOString(),
      unsubscribed_at: null,
    },
    {
      onConflict: 'email',
    }
  )

  if (error) {
    console.error('Failed to subscribe:', error)
    return { error: 'Something went wrong. Please try again.' }
  }

  return { success: true }
}
