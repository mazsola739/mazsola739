import unicorn from '../assets/unicorn.webp'
import { isExternal, profile } from '../data/profile.ts'
import { button } from './button.ts'
import { LinkIcon } from './icons.tsx'

export function Hero() {
  return (
    <section
      id="top"
      className="wrapper grid items-center gap-x-10 pt-[clamp(3rem,8vw,5rem)] md:grid-cols-[1fr_auto]"
      aria-labelledby="hero-title"
    >
      <div className="pb-8 md:pb-[clamp(3rem,8vw,5rem)]">
        <p className="w-fit rounded-full bg-surface px-3.5 py-1 text-xs font-bold tracking-widest text-accent uppercase">
          {profile.role}
        </p>
        <h1
          id="hero-title"
          className="mt-4 mb-1 w-fit text-mane text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.1] font-bold tracking-tight"
        >
          {profile.name}
        </h1>
        <p className="mb-5 text-[clamp(1.1rem,2.4vw,1.4rem)] text-muted">
          but you can call me <strong className="font-bold text-ink">{profile.nickname}</strong>
        </p>
        <p className="max-w-160 text-[clamp(1.05rem,2.2vw,1.25rem)] text-muted">{profile.intro}</p>

        <div className="mt-8 flex flex-wrap gap-3">
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
        className="mx-auto w-[clamp(12rem,26vw,19rem)] self-end pb-6 md:mx-0"
        src={unicorn}
        alt=""
        width={741}
        height={900}
      />
    </section>
  )
}
