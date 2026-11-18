import { profile } from '../data/profile.ts'

export function Footer() {
  const year = new Date().getFullYear()
  const years = year - profile.codingSince

  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <div className="wrapper grid gap-1">
        <p>
          Coding since {profile.codingSince}: {years} years in the sun, slowly drying into a raisin.
        </p>
        <p>
          © {year} {profile.name} · Vite + React · GitHub Pages
        </p>
      </div>
    </footer>
  )
}
