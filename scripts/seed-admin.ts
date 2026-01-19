import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY!

const ADMIN_EMAIL = process.argv[2] || 'nsallo12345@gmail.com'

async function seedAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY')
    process.exit(1)
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY)

  const inviteToken = crypto.randomBytes(32).toString('hex')
  const inviteExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  console.log(`Creating super_admin invite for: ${ADMIN_EMAIL}`)

  const { data, error } = await supabase
    .from('admin_users')
    .upsert(
      {
        email: ADMIN_EMAIL.toLowerCase(),
        role: 'super_admin',
        invite_token: inviteToken,
        invite_expires_at: inviteExpiresAt.toISOString(),
      },
      { onConflict: 'email' }
    )
    .select()
    .single()

  if (error) {
    console.error('Error creating admin:', error.message)
    process.exit(1)
  }

  console.log('\nAdmin invite created successfully!')
  console.log('User ID:', data.id)
  console.log('\nSetup your account at:')
  console.log(`  http://localhost:3000/admin/setup-account?token=${inviteToken}`)
  console.log('\nThis link expires in 7 days.')
}

seedAdmin()
