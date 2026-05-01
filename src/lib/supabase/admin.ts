import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase admin client.
 * Uses the service_role key to bypass RLS.
 * 
 * NEVER import this file from client components or expose the key.
 * This should only be used in:
 *   - Server Actions
 *   - API Routes (app/api/*)
 *   - Server Components
 */

if (typeof window !== 'undefined') {
  throw new Error(
    'CRITICAL: supabase/admin.ts was imported on the client. ' +
    'This file contains the service_role key and must ONLY run on the server.'
  )
}

let _supabaseAdmin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (_supabaseAdmin) return _supabaseAdmin

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL. ' +
      'Add SUPABASE_SERVICE_ROLE_KEY to your .env.local file. ' +
      'Find it in Supabase Dashboard → Settings → API → service_role (secret).'
    )
  }

  _supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return _supabaseAdmin
}
