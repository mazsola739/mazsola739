import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from './icons.tsx'

type Theme = 'light' | 'dark'

/** localStorage key of the visitor's choice; index.html reads the same key before the first paint. */
const STORAGE_KEY = 'theme'

const systemDark = () => matchMedia('(prefers-color-scheme: dark)')

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

const savedTheme = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/** Switches between the light and the dark theme and remembers the choice. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  // Until the visitor picks a theme, follow the system setting when it changes.
  useEffect(() => {
    const query = systemDark()
    const onChange = () => {
      if (savedTheme()) return
      const next: Theme = query.matches ? 'dark' : 'light'
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  const toggle = () => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
    setTheme(next)
  }

  return (
    <button
      type="button"
      className="grid size-9 place-items-center rounded-full border border-line bg-surface text-lg text-ink transition-colors hover:border-accent hover:text-accent"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
