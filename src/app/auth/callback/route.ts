import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const { user } = data
      const { full_name, avatar_url } = user.user_metadata

      // Upsert the profile (won't overwrite has_course_access due to ON CONFLICT)
      await supabase.from('profiles').upsert({
        id: user.id,
        display_name: full_name || user.email?.split('@')[0],
        avatar_url: avatar_url,
        email: user.email,
      }, {
        onConflict: 'id',
        // Only update these fields if the row already exists
        // has_course_access is NOT included, so it stays untouched
      })

      // Check if user has course access
      const { data: profile } = await supabase
        .from('profiles')
        .select('has_course_access')
        .eq('id', user.id)
        .single()

      if (profile?.has_course_access) {
        return NextResponse.redirect(`${origin}/dashboard`)
      } else {
        return NextResponse.redirect(`${origin}/payment-pending`)
      }
    }
  }

  // Authentication failed
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate with Google`)
}
