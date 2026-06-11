import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  let body: { email?: string; dog_count?: string; city?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    )
  }

  const email     = body.email?.toLowerCase().trim()
  const dog_count = body.dog_count?.trim() ?? null
  const city      = body.city?.trim() ?? null

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }

  let supabase
  try {
    supabase = createClient()
  } catch {
    return NextResponse.json(
      { error: 'Server configuration error. Please try again later.' },
      { status: 500 }
    )
  }

  const { error: insertError } = await supabase
    .from('waitlist')
    .insert({ email, dog_count, city })

  if (insertError) {
    // PostgreSQL unique violation
    if (insertError.code === '23505') {
      return NextResponse.json(
        { error: "You're already on the list — we'll see you at launch!" },
        { status: 409 }
      )
    }

    console.error('[waitlist] insert error:', insertError)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  const { count, error: countError } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  if (countError) {
    console.error('[waitlist] count error:', countError)
  }

  return NextResponse.json({ success: true, count: count ?? 0 })
}

export async function GET() {
  let supabase
  try {
    supabase = createClient()
  } catch {
    return NextResponse.json({ count: 0 })
  }

  const { count } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({ count: count ?? 0 })
}
