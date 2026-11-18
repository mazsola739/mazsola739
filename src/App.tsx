import { About } from './components/About.tsx'
import { Contact } from './components/Contact.tsx'
import { Footer } from './components/Footer.tsx'
import { FlowerField } from './components/garden/FlowerField.tsx'
import { Header } from './components/Header.tsx'
import { Hero } from './components/Hero.tsx'
import { Projects } from './components/Projects.tsx'

export default function App() {
  return (
    // isolate: the garden's layers stack only within the page; overflow-x-clip: flowers on the
    // card borders and the page edges never make it scroll sideways (and the header still sticks).
    <div className="relative isolate overflow-x-clip">
      <a
        className="absolute -top-16 left-4 z-30 rounded-lg bg-ink px-4 py-2 text-surface focus:top-4"
        href="#main"
      >
        Skip to content
      </a>
      <FlowerField />
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
