import { useEffect, useState } from 'react'
import unicorn from '../assets/unicorn.webp'
import { profile } from '../data/profile.ts'
import { ArrowUpIcon } from './icons.tsx'

/**
 * The sticky footer, the header's mirror image: the same height and glassy background, the rainbow
 * mane on top instead of below, the unicorn and two short lines on the left and, right under the theme button, a
 * round button back to the top. The button shows up once the page is scrolled, since at the top it
 * would have nowhere to go.
 */
export function Footer() {
  const year = new Date().getFullYear()
  const scrolled = useScrolled()

  return (
    <footer className="sticky bottom-0 z-10 bg-page/85 text-muted backdrop-blur-md">
      <div aria-hidden="true" className="h-1 bg-mane" />
      <div className="wrapper flex min-h-16 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <img className="h-12 w-auto shrink-0" src={unicorn} alt="" width={40} height={48} />
          <div className="grid min-w-0 leading-tight">
            <p className="truncate text-sm">Coding since {profile.codingSince}</p>
            <p className="truncate text-xs">
              <span className="hidden sm:inline">
                © {year} · Made with React and Vite, runs on GitHub Pages
              </span>
              <span className="sm:hidden">React + Vite on GitHub Pages</span>
            </p>
          </div>
        </div>
        <a
          className={`grid size-9 shrink-0 place-items-center rounded-full border border-line bg-button text-lg text-ink transition hover:border-accent hover:text-accent ${scrolled ? '' : 'invisible opacity-0'}`}
          href="#top"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUpIcon />
        </a>
      </div>
    </footer>
  )
}

/** Whether the page has been scrolled down past its first part. */
function useScrolled() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 300)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return scrolled
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
