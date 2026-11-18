import { profile } from '../data/profile.ts'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} {profile.name} · Vite + React · GitHub Pages
      </div>
    </footer>
  )
}
