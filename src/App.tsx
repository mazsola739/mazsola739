import { About } from './components/About.tsx'
import { Contact } from './components/Contact.tsx'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import { Hero } from './components/Hero.tsx'
import { Projects } from './components/Projects.tsx'

export default function App() {
  return (
    <>
      <a
        className="absolute -top-16 left-4 z-20 rounded-lg bg-ink px-4 py-2 text-page focus:top-4"
        href="#main"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
