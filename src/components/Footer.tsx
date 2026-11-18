import { profile } from '../data/profile.ts'

export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <div className="wrapper">
        © {new Date().getFullYear()} {profile.name} · Vite + React · GitHub Pages
      </div>
    </footer>
  )
}
