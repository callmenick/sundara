import { createClient } from '@/lib/supabase/server'
import type { Edition, EditionRow } from './types'

function mapRowToEdition(row: EditionRow): Edition {
  return {
    id: row.id,
    year: row.year,
    name: row.name,
    startDate: row.start_date ? new Date(row.start_date) : null,
    endDate: row.end_date ? new Date(row.end_date) : null,
    location: row.location,
    status: row.status,
    isCurrent: row.is_current,
    createdAt: new Date(row.created_at),
  }
}

export async function getCurrentEdition(): Promise<Edition | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('editions')
    .select('*')
    .eq('is_current', true)
    .single()

  if (error || !data) return null
  return mapRowToEdition(data as EditionRow)
}

export async function getEditionByYear(year: number): Promise<Edition | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('editions').select('*').eq('year', year).single()

  if (error || !data) return null
  return mapRowToEdition(data as EditionRow)
}

export async function getEditionById(id: string): Promise<Edition | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('editions').select('*').eq('id', id).single()

  if (error || !data) return null
  return mapRowToEdition(data as EditionRow)
}

export async function getAllEditions(): Promise<Edition[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('editions')
    .select('*')
    .order('year', { ascending: false })

  if (error) throw error
  return (data as EditionRow[]).map(mapRowToEdition)
}
