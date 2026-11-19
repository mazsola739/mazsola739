import unicorn from '../assets/unicorn.webp'
import { isExternal, profile } from '../data/profile.ts'
import { button } from './button.ts'
import { LinkIcon } from './icons.tsx'

/**
 * On phones everything is centred, with the unicorn on top; from md up the text is on the left
 * and the unicorn on the right, looking towards the name.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="wrapper grid place-items-center gap-x-10 pt-6 text-center md:grid-cols-[1fr_auto] md:justify-items-stretch md:pt-[clamp(3rem,8vw,5rem)] md:text-left"
      aria-labelledby="hero-title"
    >
      <div className="pb-10 md:pb-[clamp(3rem,8vw,5rem)]">
        <p className="mx-auto w-fit rounded-full bg-surface px-3.5 py-1 text-xs font-bold tracking-widest text-accent uppercase md:mx-0">
          {profile.role}
        </p>
        <h1
          id="hero-title"
          className="mx-auto mt-4 mb-1 w-fit text-mane text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.1] font-bold tracking-tight md:mx-0"
        >
          {profile.name}
        </h1>
        <p className="mb-5 text-[clamp(1.1rem,2.4vw,1.4rem)] text-muted">
          but you can call me <strong className="font-bold text-ink">{profile.nickname}</strong>
        </p>
        <p className="mx-auto max-w-160 text-[clamp(1.05rem,2.2vw,1.25rem)] text-muted md:mx-0">
          {profile.intro}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
          {profile.cv ? (
            <a className={button.primary} href={profile.cv} target="_blank" rel="noreferrer">
              View CV
            </a>
          ) : (
            <span className={button.placeholder}>CV · coming soon</span>
          )}
          {profile.links.map((link) => (
            <a
              key={link.href}
              className={button.secondary}
              href={link.href}
              {...(isExternal(link.href) && { target: '_blank', rel: 'noreferrer' })}
            >
              <LinkIcon href={link.href} />
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* The unicorn in the style of the "You are sweet." card, looking towards the name. */}
      <img
        className="order-first mb-5 w-44 sm:w-52 md:order-none md:mb-0 md:w-[clamp(12rem,26vw,19rem)] md:self-end md:pb-6"
        src={unicorn}
        alt=""
        width={741}
        height={900}
      />
    </section>
  )
}
