import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Philosophy } from './components/Philosophy'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Experience />
        <Philosophy />
      </main>
      <Footer />
    </>
  )
}
