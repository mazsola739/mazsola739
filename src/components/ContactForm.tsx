import { type FormEvent, useId, useState } from 'react'
import { profile } from '../data/profile.ts'
import { button } from './button.ts'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const field =
  'w-full rounded-xl border border-line bg-field px-4 py-2.5 text-ink transition-colors hover:border-ink'

/**
 * A message form. The site is static, so it posts straight to Web3Forms (https://web3forms.com),
 * which e-mails the message to me; the visitor's address becomes the reply-to. The hidden
 * "botcheck" box is a honeypot: people never see it, spam bots tick it, and Web3Forms drops those.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const id = useId()

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const message = Object.fromEntries(new FormData(form))
    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...message,
          access_key: profile.contactFormKey,
          subject: `Portfolio: a message from ${message.name}`,
          from_name: 'Portfolio contact form',
        }),
      })
      const result: { success?: boolean } = await response.json()
      if (!result.success) throw new Error('Web3Forms did not accept the message')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="grid gap-4" onSubmit={send}>
      <label className="grid gap-1.5 text-sm font-semibold" htmlFor={`${id}-name`}>
        Name
        <input
          id={`${id}-name`}
          className={field}
          name="name"
          autoComplete="name"
          required
          maxLength={100}
        />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold" htmlFor={`${id}-email`}>
        E-mail
        <input
          id={`${id}-email`}
          className={field}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
        />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold" htmlFor={`${id}-message`}>
        Message
        <textarea
          id={`${id}-message`}
          className={`${field} min-h-40 resize-y`}
          name="message"
          required
          maxLength={5000}
        />
      </label>
      <input
        className="hidden"
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          className={`${button.primary} cursor-pointer disabled:cursor-wait disabled:opacity-60`}
          type="submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p className="font-semibold" role="status">
          {status === 'sent' && "Thank you! Your message is on its way, I'll write back soon."}
          {status === 'error' && (
            <span className="text-accent">
              Sorry, the message couldn't be sent. Please try again a bit later.
            </span>
          )}
        </p>
      </div>
      <p className="text-sm text-muted">
        Your message reaches my inbox through Web3Forms. I only use your name and e-mail address to
        write back to you.
      </p>
    </form>
  )
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
