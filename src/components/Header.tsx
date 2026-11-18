import { profile } from '../data/profile.ts'

const nav = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-page/85 backdrop-blur-md">
      <div className="wrapper flex min-h-16 items-center justify-between gap-4">
        <a className="font-bold whitespace-nowrap" href="#top">
          {profile.name}
        </a>
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
      </div>
    </header>
  )
}
