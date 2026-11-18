import { isExternal, profile } from '../data/profile.ts'
import { LinkIcon } from './icons.tsx'
import { Section } from './Section.tsx'

export function Contact() {
  return (
    <Section id="contact" title="Contact" subtitle="Where to find me.">
      <ul className="flex flex-wrap gap-6">
        {profile.links.map((link) => (
          <li key={link.href}>
            <a
              className="inline-flex items-center gap-2 text-xl font-semibold decoration-accent decoration-2 underline-offset-4 hover:underline"
              href={link.href}
              {...(isExternal(link.href) && { target: '_blank', rel: 'noreferrer' })}
            >
              <LinkIcon href={link.href} />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
