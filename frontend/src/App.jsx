import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { ease } from './components/Reveal.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { PlanVisitProvider } from './context/PlanVisitContext.jsx'
import { pagePaths, redirects } from './routes.js'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import History from './pages/History.jsx'
import Ministries from './pages/Ministries.jsx'
import Events from './pages/Events.jsx'
import Watch from './pages/Watch.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

// One component per path in routes.js (which also tells the host which URLs are real pages).
const pages = {
  '/': Home,
  '/about': About,
  '/history': History,
  '/ministries': Ministries,
  '/events': Events,
  '/watch': Watch,
  '/contact': Contact,
}
for (const path of pagePaths) {
  if (!pages[path]) throw new Error(`routes.js lists ${path}, but App.jsx has no page for it.`)
}

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
                  {/* A crashing page shows ErrorPage; navigating away (new key above) resets it. */}
                  <ErrorBoundary fallback={(error) => <ErrorPage error={error} />}>
                    <Routes location={location}>
                      {pagePaths.map((path) => {
                        const Page = pages[path]
                        return <Route key={path} path={path} element={<Page />} caseSensitive />
                      })}
                      {Object.entries(redirects).map(([from, to]) => (
                        <Route key={from} path={from} element={<Navigate to={to} replace />} caseSensitive />
                      ))}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ErrorBoundary>
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
