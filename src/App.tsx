import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Intro } from './components/Intro'
import { Projects } from './components/Projects'
import { Section } from './components/Section'
import { Terminal } from './components/Terminal'
import { Scenery } from './components/Scenery'
import { ThemeToggle } from './components/ThemeToggle'

export default function App() {
  return (
    <>
      <ThemeToggle />
      {/* Content column sits left on large screens; the scenery fills the remaining width. */}
      <Scenery style={{ width: 'calc(100vw - 42rem - max(1.25rem, 6vw) - 2rem)' }} />
      <main className="mx-auto max-w-2xl px-5 py-20 sm:py-28 lg:ml-[max(1.25rem,6vw)] lg:mr-0">
        <Intro />
        <Experience />
        <Projects />
        <Section id="agent" title="Talk to my agent">
          <Terminal />
        </Section>
        <Footer />
      </main>
    </>
  )
}
