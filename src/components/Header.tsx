import portrait from '../assets/portrait.webp'
import { isExternal, profile } from '../data/profile.ts'
import { headerButton } from './button.ts'
import { ContactButton } from './Contact.tsx'
import { FileIcon, LinkIcon } from './icons.tsx'
import { ThemeToggle } from './ThemeToggle.tsx'

/**
 * The sticky header: my photo and name on the left, so visitors still see who I am while they
 * scroll; on the right the CV, my links, the contact window and the theme button. On phones the
 * buttons are icons only (their names are still read out).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-page/85 backdrop-blur-md">
      <div className="wrapper flex min-h-16 items-center justify-between gap-3">
        <a className="flex min-w-0 items-center gap-2.5" href="#top">
          <span className="shrink-0 rounded-full bg-mane p-0.5">
            <img
              className="block size-8 rounded-full object-cover sm:size-9"
              src={portrait}
              alt=""
              width={72}
              height={72}
            />
          </span>
          <span className="grid min-w-0 leading-tight">
            <span className="truncate font-bold">{profile.name}</span>
            <span className="hidden truncate text-xs text-muted sm:block">{profile.role}</span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {profile.cv && (
            <a
              className={headerButton.secondary}
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              title="My CV"
            >
              <FileIcon />
              <span className="sr-only md:not-sr-only">CV</span>
            </a>
          )}
          {profile.links.map((link) => (
            <a
              key={link.href}
              className={headerButton.secondary}
              href={link.href}
              title={link.label}
              {...(isExternal(link.href) && { target: '_blank', rel: 'noreferrer' })}
            >
              <LinkIcon href={link.href} />
              <span className="sr-only md:not-sr-only">{link.label}</span>
            </a>
          ))}
          <ContactButton />
          <ThemeToggle />
        </div>
      </div>
      {/* The rainbow mane of the unicorn card, as the header's bottom edge. */}
      <div aria-hidden="true" className="h-1 bg-mane" />
    </header>
  )
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
