import { isExternal, profile } from '../data/profile.ts'

export function Hero() {
  return (
    <section id="top" className="hero container" aria-labelledby="hero-title">
      <p className="eyebrow">{profile.role}</p>
      <h1 id="hero-title">{profile.name}</h1>
      <p className="lead">{profile.intro}</p>

      <div className="actions">
        {profile.cv ? (
          <a className="button button--primary" href={profile.cv} target="_blank" rel="noreferrer">
            View CV
          </a>
        ) : (
          <span className="button button--placeholder">CV · coming soon</span>
        )}
        {profile.links.map((link) => (
          <a
            key={link.href}
            className="button"
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
