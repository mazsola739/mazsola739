import { profile } from '../data/profile.ts'
import { ThemeToggle } from './ThemeToggle.tsx'

const nav = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-page/85 backdrop-blur-md">
      <div className="wrapper flex min-h-16 items-center justify-between gap-4">
        <a className="font-bold whitespace-nowrap" href="#top">
          {profile.name}
        </a>
        <div className="flex items-center gap-3.5 sm:gap-5">
          <nav aria-label="Main navigation">
            <ul className="flex gap-3.5 sm:gap-5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    className="text-sm text-muted transition-colors hover:text-ink sm:text-[0.95rem]"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
      {/* The rainbow mane of the unicorn card, as the header's bottom edge. */}
      <div aria-hidden="true" className="h-1 bg-mane" />
    </header>
  )
}
