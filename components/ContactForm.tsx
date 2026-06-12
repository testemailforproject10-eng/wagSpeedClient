'use client'

import { useState, useRef, useCallback } from 'react'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

export default function ContactForm() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [phone, setPhone]     = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus]   = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [touched, setTouched] = useState(false)

  const nameRef    = useRef<HTMLInputElement>(null)
  const emailRef   = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const isValidEmail   = EMAIL_REGEX.test(email)
  const isValidPhone   = phone === '' || PHONE_REGEX.test(phone)
  const isValidMessage = message.trim().length >= 10

  const showNameError    = touched && !name.trim()
  const showEmailError   = touched && email.length > 0 && !isValidEmail
  const showPhoneError   = touched && phone.length > 0 && !isValidPhone
  const showMessageError = touched && message.length > 0 && !isValidMessage

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setTouched(true)

      if (!name.trim() || !isValidEmail || !isValidPhone || !isValidMessage) {
        if (!name.trim()) nameRef.current?.focus()
        else if (!isValidEmail) emailRef.current?.focus()
        else if (!isValidMessage) messageRef.current?.focus()
        return
      }

      setStatus('loading')
      setErrorMessage('')

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:    name.trim(),
            email,
            phone:   phone.trim() || null,
            message: message.trim(),
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          setStatus('error')
          setErrorMessage(data.error ?? 'Something went wrong. Please try again.')
          return
        }

        setStatus('success')
      } catch {
        setStatus('error')
        setErrorMessage('Network error. Check your connection and try again.')
      }
    },
    [name, email, phone, message, isValidEmail, isValidPhone, isValidMessage]
  )

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-5 py-2">
        <div className="flex items-center gap-3">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}
          >
            mark_email_read
          </span>
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
            Message Sent
          </span>
        </div>
        <h3
          className="font-headline-xl text-on-surface uppercase leading-tight"
          style={{ fontSize: '26px' }}
        >
          Got it. We&rsquo;ll be in touch.
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant border-l-2 border-outline-variant pl-4 leading-relaxed">
          We typically respond within one business day. Keep an eye on your inbox at {email}.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact WagSpeed"
      className="flex flex-col gap-5"
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="sr-only">Full Name</label>
        <input
          ref={nameRef}
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(true)}
          disabled={status === 'loading'}
          aria-invalid={showNameError}
          aria-describedby={showNameError ? 'contact-name-error' : undefined}
          className="industrial-input"
        />
        {showNameError && (
          <p id="contact-name-error" role="alert" className="font-label-caps text-label-caps text-error">
            Name is required.
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="sr-only">Email Address</label>
        <input
          ref={emailRef}
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          disabled={status === 'loading'}
          aria-invalid={showEmailError}
          aria-describedby={showEmailError ? 'contact-email-error' : undefined}
          className="industrial-input"
        />
        {showEmailError && (
          <p id="contact-email-error" role="alert" className="font-label-caps text-label-caps text-error">
            Enter a valid email address.
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="Phone Number (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setTouched(true)}
          disabled={status === 'loading'}
          aria-invalid={showPhoneError}
          aria-describedby={showPhoneError ? 'contact-phone-error' : undefined}
          className="industrial-input"
        />
        {showPhoneError && (
          <p id="contact-phone-error" role="alert" className="font-label-caps text-label-caps text-error">
            Enter a valid phone number.
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="sr-only">Message</label>
        <textarea
          ref={messageRef}
          id="contact-message"
          name="message"
          placeholder="Your message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => setTouched(true)}
          disabled={status === 'loading'}
          aria-invalid={showMessageError}
          aria-describedby={showMessageError ? 'contact-message-error' : undefined}
          className="industrial-input resize-none"
        />
        {showMessageError && (
          <p id="contact-message-error" role="alert" className="font-label-caps text-label-caps text-error">
            Message must be at least 10 characters.
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="group submit-btn bg-white text-[#0d0f12] font-label-caps text-label-caps uppercase tracking-widest py-4 px-6 mt-1 hover:bg-white/90 flex items-center justify-between disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl font-bold"
      >
        <span>{status === 'loading' ? 'Sending…' : 'Send Message'}</span>
        {status === 'loading' ? (
          <span className="material-symbols-outlined animate-spin" style={{ fontSize: '19px' }}>
            progress_activity
          </span>
        ) : (
          <span
            className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-300"
            style={{ fontVariationSettings: "'FILL' 1", fontSize: '19px' }}
          >
            send
          </span>
        )}
      </button>

      {status === 'error' && (
        <p role="alert" className="font-label-caps text-label-caps text-error text-center">
          {errorMessage}
        </p>
      )}
    </form>
  )
}
