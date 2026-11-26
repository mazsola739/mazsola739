import portrait from '../assets/portrait.webp'
import unicorn from '../assets/unicorn.webp'
import { profile } from '../data/profile.ts'

/**
 * On phones everything is centred, with my photo on top; from md up the text is on the left
 * and the photo on the right. The CV, my links and the contact button are in the header.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="wrapper grid place-items-center gap-x-10 pt-6 text-center md:grid-cols-[1fr_auto] md:justify-items-stretch md:pt-[clamp(1.5rem,4vw,2.5rem)] md:text-left"
      aria-labelledby="hero-title"
    >
      <div className="pb-6 md:pb-[clamp(1.5rem,4vw,2.5rem)]">
        {/* The role in an outlined pill, the size of the header buttons, with the unicorn. */}
        <p className="mx-auto flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-label py-1 pr-3 pl-1.5 text-[0.7rem] font-bold tracking-wider whitespace-nowrap text-accent uppercase min-[400px]:pr-4 min-[400px]:text-xs sm:text-sm sm:tracking-widest md:mx-0">
          <img className="size-7 object-contain" src={unicorn} alt="" width={28} height={28} />
          <span>
            {profile.role}
            {profile.roleNote && (
              <span className="font-semibold opacity-75"> · {profile.roleNote}</span>
            )}
          </span>
        </p>
        <h1
          id="hero-title"
          className="mx-auto mt-4 mb-1 w-fit text-mane text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.1] font-bold tracking-tight md:mx-0"
        >
          {profile.name}
        </h1>
        {/* The intro as a dictionary entry: the nickname, how it sounds and what kind of word it
            is, then the numbered meanings and a cross-reference. */}
        <p className="mb-3 text-[clamp(1.1rem,2.4vw,1.4rem)] text-muted">
          <span className="sr-only">Also called </span>
          <strong className="font-bold text-ink">{profile.nickname}</strong> {profile.pronunciation}{' '}
          <em className="font-serif">noun</em>
        </p>
        <ol className="mx-auto max-w-150 list-decimal space-y-1 pl-6 text-left text-[clamp(1rem,2vw,1.15rem)] leading-snug text-pretty text-muted marker:font-bold marker:text-accent md:mx-0">
          {profile.definitions.map((definition) => (
            <li key={definition}>{definition}</li>
          ))}
        </ol>
        <p className="mt-2.5 text-[0.95rem] text-muted">
          <em className="font-serif">See also:</em>{' '}
          <strong className="text-ink">{profile.seeAlso}</strong>
        </p>
      </div>

      {/* My photo in a round frame of the rainbow mane. The bottom margin from md matches the
          text column's bottom padding, so the photo is centred on the text. */}
      <div className="order-first mb-6 rounded-full bg-mane p-1 shadow-xl shadow-ink/15 md:order-none md:mb-[clamp(1.5rem,4vw,2.5rem)]">
        <img
          className="block aspect-square w-34 rounded-full object-cover sm:w-40 md:w-[clamp(10rem,19vw,14rem)]"
          src={portrait}
          alt="Erika Rostás"
          width={640}
          height={640}
        />
      </div>
    </section>
  )
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
