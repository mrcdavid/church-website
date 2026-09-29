import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import { ease } from './components/Reveal.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { PlanVisitProvider } from './context/PlanVisitContext.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import History from './pages/History.jsx'
import Ministries from './pages/Ministries.jsx'
import Events from './pages/Events.jsx'
import Watch from './pages/Watch.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const location = useLocation()

  return (
    // reducedMotion="user": honors the OS "reduce motion" setting site-wide.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <PlanVisitProvider>
          {/* overflow-x-clip: content sliding in from the side must not cause sideways scrolling */}
          <div className="flex min-h-screen flex-col overflow-x-clip">
            <Navbar />
            <main id="main" className="flex-1">
              {/* The old page fades out, we jump to the top, then the new page fades in. */}
              <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/ministries" element={<Ministries />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/watch" element={<Watch />} />
                    <Route path="/sermons" element={<Navigate to="/watch" replace />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </PlanVisitProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}
