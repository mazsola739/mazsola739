import { isExternal, profile } from '../data/profile.ts'

export function Contact() {
  return (
    <section id="contact" className="section container" aria-labelledby="contact-title">
      <header className="section__header">
        <h2 id="contact-title">Contact</h2>
        <p>Where to find me.</p>
      </header>
      <ul className="contact-links">
        {profile.links.map((link) => (
          <li key={link.href}>
            <a href={link.href} {...(isExternal(link.href) && { target: '_blank', rel: 'noreferrer' })}>
              {link.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
