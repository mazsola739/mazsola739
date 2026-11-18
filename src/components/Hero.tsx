import { isExternal, profile } from '../data/profile.ts'
import { button } from './button.ts'

export function Hero() {
  return (
    <section
      id="top"
      className="wrapper pt-[clamp(4rem,12vw,8rem)] pb-[clamp(3rem,8vw,5rem)]"
      aria-labelledby="hero-title"
    >
      <p className="text-sm font-semibold tracking-widest text-accent uppercase">{profile.role}</p>
      <h1
        id="hero-title"
        className="mt-2 mb-5 text-[clamp(2.5rem,8vw,4.75rem)] leading-[1.1] font-bold tracking-tight"
      >
        {profile.name}
      </h1>
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
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
