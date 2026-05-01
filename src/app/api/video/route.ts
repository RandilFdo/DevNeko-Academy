import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

/**
 * Secure video streaming endpoint.
 * 
 * Usage: GET /api/video?path=module-1/lesson-1.mp4
 * 
 * Flow:
 * 1. Verify the user has an active session
 * 2. Check has_course_access on their profile
 * 3. Generate a short-lived signed URL (60s) via the service role client
 * 4. Return the signed URL
 * 
 * The frontend should fetch this URL dynamically and inject it into
 * a <video> tag. The URL expires in 60 seconds, making it useless
 * if shared.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const videoPath = searchParams.get('path')

  if (!videoPath) {
    return NextResponse.json(
      { error: 'Missing video path' },
      { status: 400 }
    )
  }

  // Verify session using the user's cookies
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Check course access
  const { data: profile } = await supabase
    .from('profiles')
    .select('has_course_access')
    .eq('id', user.id)
    .single()

  if (!profile?.has_course_access) {
    return NextResponse.json(
      { error: 'Access denied. Payment pending.' },
      { status: 403 }
    )
  }

  // Generate a signed URL that expires in 1 hour
  // Long enough for comfortable viewing (pause/seek/resume)
  // Short enough that sharing the URL is pointless
  const supabaseAdmin = getSupabaseAdmin()
  const { data: signedUrl, error: storageError } = await supabaseAdmin
    .storage
    .from('course-videos')
    .createSignedUrl(videoPath, 3600) // 1 hour expiry

  if (storageError || !signedUrl) {
    console.error('Storage signed URL error:', storageError)
    return NextResponse.json(
      { error: 'Failed to generate video URL' },
      { status: 500 }
    )
  }

  return NextResponse.json({
    url: signedUrl.signedUrl,
    expiresIn: 3600,
  })
}
