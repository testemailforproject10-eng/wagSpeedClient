import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import type { ContactMessageInsert } from '@/lib/supabase'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

export async function POST(req: NextRequest) {
  let body: {
    name?: string
    email?: string
    phone?: string
    message?: string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name    = body.name?.trim()
  const email   = body.email?.toLowerCase().trim()
  const phone   = body.phone?.trim() ?? null
  const message = body.message?.trim()

  if (!name) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  if (phone && !PHONE_REGEX.test(phone)) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 })
  }

  if (!message || message.length < 10) {
    return NextResponse.json({ error: 'Please include a message (at least 10 characters).' }, { status: 400 })
  }

  let supabase
  try {
    supabase = createClient()
  } catch (err) {
    console.error('[contact] client init:', err)
    return NextResponse.json(
      { error: 'Server configuration error. Please try again later.' },
      { status: 500 }
    )
  }

  const record: ContactMessageInsert = { name, email, phone, message }

  const { error: insertError } = await supabase
    .from('contact_messages')
    .insert(record)

  if (insertError) {
    console.error('[contact] insert error:', insertError)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
