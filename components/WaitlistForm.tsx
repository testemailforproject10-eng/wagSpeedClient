'use client'

import { useState, useRef, useCallback } from 'react'

type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'duplicate'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

export default function WaitlistForm() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [phone, setPhone]       = useState('')
  const [dogCount, setDogCount] = useState('')
  const [city, setCity]         = useState('')
  const [status, setStatus]     = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [count, setCount]       = useState(0)
  const [touched, setTouched]   = useState(false)

  const nameRef  = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const isValidEmail = EMAIL_REGEX.test(email)
  const isValidPhone = phone === '' || PHONE_REGEX.test(phone)

  const showNameError  = touched && !name.trim()
  const showEmailError = touched && email.length > 0 && !isValidEmail
  const showPhoneError = touched && phone.length > 0 && !isValidPhone
  const showDogError   = touched && !dogCount
  const showCityError  = touched && !city

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setTouched(true)

      if (!name.trim() || !isValidEmail || !isValidPhone || !dogCount || !city) {
        if (!name.trim()) nameRef.current?.focus()
        else if (!isValidEmail) emailRef.current?.focus()
        return
      }

      setStatus('loading')
      setErrorMessage('')

      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:      name.trim(),
            email,
            phone:     phone.trim() || null,
            dog_count: dogCount,
            city,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          if (res.status === 409) {
            setStatus('duplicate')
          } else {
            setStatus('error')
            setErrorMessage(data.error ?? 'Something went wrong. Please try again.')
          }
          return
        }

        if (typeof data.count === 'number') setCount(data.count)
        setStatus('success')
      } catch {
        setStatus('error')
        setErrorMessage('Network error. Check your connection and try again.')
      }
    },
    [name, email, phone, dogCount, city, isValidEmail, isValidPhone]
  )

  return (
    <div className="glass-card-wrapper">
    <div className="glass-card">

      {/* Card header */}
      <div className="flex flex-col items-center text-center px-7 pt-9 pb-7 gap-2 border-b border-white/[0.08]">
        <h2
          className="font-headline-xl text-on-surface uppercase"
          style={{ fontSize: '30px', letterSpacing: '-0.01em', lineHeight: 1.05, fontWeight: 700 }}
        >
          Join the Waitlist
        </h2>
        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
          Tri-Cities, WA &mdash; First in line trains first
        </p>
      </div>

      {/* ── Success ──────────────────────────────────────── */}
      {status === 'success' && (
        <div className="flex flex-col px-7 py-8 gap-4">
          <div className="flex items-center gap-3">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}
            >
              verified
            </span>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
              Confirmed
            </span>
          </div>
          <h3
            className="font-headline-xl text-on-surface uppercase leading-tight"
            style={{ fontSize: '26px' }}
          >
            Spot #{count.toLocaleString()} locked in.
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant border-l-2 border-outline-variant pl-4 leading-relaxed">
            {city} is on our radar. You&rsquo;re #{count.toLocaleString()} in line — we schedule in signup order.
          </p>
          <p className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
            Launch updates will go to your email.
          </p>
        </div>
      )}

      {/* ── Duplicate ────────────────────────────────────── */}
      {status === 'duplicate' && (
        <div className="flex flex-col px-7 py-8 gap-3">
          <span
            className="material-symbols-outlined text-on-surface-variant"
            style={{ fontVariationSettings: "'FILL' 0", fontSize: '28px' }}
          >
            info
          </span>
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase">
            Already on the list
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Your spot is saved. We&rsquo;ll see you at launch.
          </p>
        </div>
      )}

      {/* ── Form ─────────────────────────────────────────── */}
      {status !== 'success' && status !== 'duplicate' && (
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Join the WagSpeed waitlist"
          className="flex flex-col gap-5 px-7 py-7"
        >

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="sr-only">Full Name</label>
            <input
              ref={nameRef}
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              disabled={status === 'loading'}
              aria-invalid={showNameError}
              aria-describedby={showNameError ? 'name-error' : undefined}
              className="industrial-input"
            />
            {showNameError && (
              <p id="name-error" role="alert" className="font-label-caps text-label-caps text-error">
                Name is required.
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              disabled={status === 'loading'}
              aria-invalid={showEmailError}
              aria-describedby={showEmailError ? 'email-error' : undefined}
              className="industrial-input"
            />
            {showEmailError && (
              <p id="email-error" role="alert" className="font-label-caps text-label-caps text-error">
                Enter a valid email address.
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Phone Number (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setTouched(true)}
              disabled={status === 'loading'}
              aria-invalid={showPhoneError}
              aria-describedby={showPhoneError ? 'phone-error' : undefined}
              className="industrial-input"
            />
            {showPhoneError && (
              <p id="phone-error" role="alert" className="font-label-caps text-label-caps text-error">
                Enter a valid phone number.
              </p>
            )}
          </div>

          {/* Dogs */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="dogs" className="sr-only">Dogs</label>
            <select
              id="dogs"
              value={dogCount}
              onChange={(e) => setDogCount(e.target.value)}
              disabled={status === 'loading'}
              aria-invalid={showDogError}
              className="industrial-input text-on-surface"
            >
              <option value="" disabled>Dogs (Select)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4+</option>
            </select>
            {showDogError && (
              <p role="alert" className="font-label-caps text-label-caps text-error">Required.</p>
            )}
          </div>

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="city" className="sr-only">City</label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={status === 'loading'}
              aria-invalid={showCityError}
              className="industrial-input text-on-surface"
            >
              <option value="" disabled>City (Select)</option>
              <option value="Kennewick">Kennewick</option>
              <option value="Richland">Richland</option>
              <option value="Pasco">Pasco</option>
              <option value="Other">Other nearby</option>
            </select>
            {showCityError && (
              <p role="alert" className="font-label-caps text-label-caps text-error">Required.</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="group submit-btn bg-white text-[#0d0f12] font-label-caps text-label-caps uppercase tracking-widest py-4 px-6 mt-1 hover:bg-white/90 flex items-center justify-between disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl font-bold"
          >
            <span>{status === 'loading' ? 'Securing your spot…' : 'Secure Your Priority Spot'}</span>
            {status === 'loading' ? (
              <span className="material-symbols-outlined animate-spin" style={{ fontSize: '19px' }}>
                progress_activity
              </span>
            ) : (
              <span
                className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-300"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: '19px' }}
              >
                arrow_forward
              </span>
            )}
          </button>

          {status === 'error' && (
            <p role="alert" className="font-label-caps text-label-caps text-error text-center">
              {errorMessage}
            </p>
          )}

          <p className="font-label-caps text-label-caps text-outline text-center">
            Launch updates only. Unsubscribe anytime.
          </p>

        </form>
      )}

    </div>
    </div>
  )
}
