import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Philosophy } from './components/Philosophy'
import { ThemeToggle } from './components/ThemeToggle'

export default function App() {
  return (
    <>
      <ThemeToggle />
      <Hero />
      <main>
        <Experience />
        <Philosophy />
      </main>
      <Footer />
    </>
  )
}
