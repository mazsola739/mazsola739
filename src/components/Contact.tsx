import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { profile } from '../data/profile.ts'
import { headerButton } from './button.ts'
import { ContactForm } from './ContactForm.tsx'
import { CloseIcon, MailIcon } from './icons.tsx'

/**
 * The header's Contact me button and the window it opens, with the message form. The window is a
 * modal <dialog>: the page behind it is dimmed and out of reach, Esc or the x closes it, and so
 * does a click on the dimmed page around it. It is rendered at the end of <body>, not inside the
 * header, whose blurred background would otherwise trap it. No access key, no button.
 */
export function ContactButton() {
  const dialog = useRef<HTMLDialogElement>(null)
  if (!profile.contactFormKey) return null

  return (
    <>
      <button
        type="button"
        className={`${headerButton.primary} cursor-pointer`}
        onClick={() => {
          dialog.current?.showModal()
          // Start in the Name field rather than on the x.
          dialog.current?.querySelector('input')?.focus()
        }}
        aria-haspopup="dialog"
        title="Contact me"
      >
        <MailIcon />
        <span className="sr-only md:not-sr-only">Contact me</span>
      </button>
      {createPortal(
        // biome-ignore lint/a11y/useKeyWithClickEvents: the click is only for the dimmed page around the window; Esc already closes it from the keyboard.
        <dialog
          ref={dialog}
          className="m-auto max-h-[calc(100dvh-2rem)] w-[min(100%-2rem,30rem)] overflow-y-auto rounded-2xl border border-line bg-card text-ink opacity-100 shadow-2xl transition-[opacity,scale] duration-200 backdrop:bg-black/45 backdrop:backdrop-blur-sm motion-reduce:transition-none starting:open:scale-95 starting:open:opacity-0"
          aria-labelledby="contact-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close()
          }}
        >
          <div className="p-6 sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="contact-title" className="text-xl font-bold">
                  Get in touch
                </h2>
                <p className="mt-1 text-muted">Write me a message and I'll write back.</p>
              </div>
              <button
                type="button"
                className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-button text-lg transition-colors hover:border-accent hover:text-accent"
                onClick={() => dialog.current?.close()}
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>
            <ContactForm />
          </div>
        </dialog>,
        document.body,
      )}
    </>
  )
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
