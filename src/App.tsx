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
      <Scenery />
      <main className="mx-auto max-w-2xl px-5 pb-20 pt-10 sm:pb-28 sm:pt-16">
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
