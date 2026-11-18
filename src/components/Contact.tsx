import { isExternal, profile } from '../data/profile.ts'
import { Section } from './Section.tsx'

export function Contact() {
  return (
    <Section id="contact" title="Contact" subtitle="Where to find me.">
      <ul className="flex flex-wrap gap-6">
        {profile.links.map((link) => (
          <li key={link.href}>
            <a
              className="text-xl font-semibold transition-colors hover:text-accent"
              href={link.href}
              {...(isExternal(link.href) && { target: '_blank', rel: 'noreferrer' })}
            >
              {link.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
