import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/Header'

import { Home } from './pages/Home'
import { About } from './pages/About'
import { Projects } from './pages/Projects'
import { Experience } from './pages/Experience'
import { Certificates } from './pages/Certificates'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'

// Hidden pages - not linked from the menu
import { TerminalPage } from './pages/Terminal'
import { LabPage } from './pages/Lab'
import { EasterPage } from './pages/EasterEggs'
import { UsesPage } from './pages/Uses'

function App() {
  const { dark, setDark } = useTheme()

  return (
    // reducedMotion="user": visitors who prefer less motion get no sliding animations.
    <MotionConfig reducedMotion="user">
      {/* Soft blue light behind everything - this is what the glass panels blur */}
      <div className="backdrop" aria-hidden>
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
      </div>

      <Header dark={dark} setDark={setDark} />

      <AnimatePresence mode="wait">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />

          {/* Hidden pages */}
          <Route path="/terminal" element={<TerminalPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/easter-eggs" element={<EasterPage />} />
          <Route path="/uses" element={<UsesPage />} />

          {/* Anything else */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  )
}

export default App
