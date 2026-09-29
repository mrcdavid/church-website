import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarHeart, MapPin, Menu, X } from 'lucide-react'
import Logo from '../assets/Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { church, navLinks } from '../data/siteData.js'
import { usePlanVisit } from '../context/PlanVisitContext.jsx'
import { useScrollPast } from '../hooks/useScrollPast.js'
import { useDialog } from '../hooks/useDialog.js'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrollPast(24)
  const { pathname } = useLocation()
  const { openPlanVisit } = usePlanVisit()

  useEffect(() => setMenuOpen(false), [pathname])

  // Every page starts with a dark photo banner, so the bar is transparent with
  // light text at the top and turns solid once the visitor scrolls.
  const solid = scrolled

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-on-primary"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-smooth ${
          solid ? 'border-line/60 bg-bg/80 shadow-soft backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Main"
          className={`container-page flex items-center justify-between gap-4 transition-all duration-500 ease-smooth ${
            solid ? 'h-16 sm:h-[4.5rem]' : 'h-20 sm:h-24'
          }`}
        >
          <BrandLink solid={solid} />

          <div className="hidden items-center gap-1 lg:flex">
            <ul className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `relative isolate block rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                        solid
                          ? isActive
                            ? 'text-primary'
                            : 'text-fg/75 hover:text-primary'
                          : isActive
                            ? 'text-linen'
                            : 'text-linen/80 hover:text-linen'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className={`absolute inset-0 -z-10 rounded-full ${solid ? 'bg-primary/10' : 'bg-linen/15'}`}
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          />
                        )}
                        {link.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ThemeToggle
              className={`ml-1 ${solid ? 'text-fg hover:bg-primary/10' : 'text-linen hover:bg-linen/15'}`}
            />
            <button type="button" onClick={openPlanVisit} className="btn btn-accent ml-2 hidden px-5 py-2.5 text-sm xl:inline-flex">
              <CalendarHeart className="h-4 w-4" aria-hidden="true" />
              Plan a Visit
            </button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle className={solid ? 'text-fg hover:bg-primary/10' : 'text-linen hover:bg-linen/15'} />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
                solid ? 'text-fg hover:bg-primary/10' : 'text-linen hover:bg-linen/15'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would trap a fixed-position child. */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            onClose={() => setMenuOpen(false)}
            onPlanVisit={() => {
              setMenuOpen(false)
              openPlanVisit()
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function BrandLink({ solid, onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-3">
      <Logo
        className={`h-9 w-9 shrink-0 transition-all duration-500 ease-smooth group-hover:-rotate-6 sm:h-10 sm:w-10 ${
          solid ? 'text-primary' : 'text-linen'
        }`}
      />
      <span className="leading-tight">
        <span
          className={`block font-display text-[0.95rem] font-semibold transition-colors sm:text-lg ${
            solid ? 'text-heading' : 'text-linen'
          }`}
        >
          {church.logoTitle}
        </span>
        <span
          className={`block text-[0.65rem] font-bold uppercase tracking-[0.22em] transition-colors sm:text-[0.7rem] ${
            solid ? 'text-accent' : 'text-clay-200'
          }`}
        >
          {church.logoSubtitle}
        </span>
      </span>
    </Link>
  )
}

const listVariants = {
  open: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
  closed: {},
}
const itemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 24 },
}

function MobileMenu({ onClose, onPlanVisit }) {
  const panelRef = useRef(null)
  useDialog(panelRef, onClose)

  return (
    <motion.div className="fixed inset-0 z-[60] lg:hidden" initial="closed" animate="open" exit="closed">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
        variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
        onClick={onClose}
      />
      <motion.aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        variants={{ open: { x: 0 }, closed: { x: '100%' } }}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
        className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-bg shadow-lift focus-visible:ring-0"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <BrandLink solid onClick={onClose} />
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-fg transition hover:rotate-90 hover:bg-primary/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <motion.ul variants={listVariants} className="flex flex-col gap-1 p-4">
          {navLinks.map(({ label, to, icon: Icon }) => (
            <motion.li key={to} variants={itemVariants}>
              <NavLink
                to={to}
                end={to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors ${
                    isActive ? 'bg-primary text-on-primary' : 'text-fg hover:bg-surface-alt'
                  }`
                }
              >
                <Icon className="h-5 w-5 opacity-80" aria-hidden="true" />
                {label}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div variants={itemVariants} className="mt-auto space-y-4 border-t border-line p-5">
          <button type="button" onClick={onPlanVisit} className="btn btn-accent w-full">
            <CalendarHeart className="h-5 w-5" aria-hidden="true" />
            Plan a Visit
          </button>
          <p className="flex items-start gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {church.address}
          </p>
        </motion.div>
      </motion.aside>
    </motion.div>
  )
}
