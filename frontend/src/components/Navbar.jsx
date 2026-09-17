import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/Logo.jsx'
import { navLinks, church } from '../data/siteData.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-primary' : 'text-ink/80 hover:text-primary'
    }`

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-softblue">
      <nav className="max-w-content mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        <NavLink to="/" className="flex items-center gap-2 sm:gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-8 w-8 sm:h-10 sm:w-10" />
          <span className="font-serif text-base sm:text-lg font-semibold text-deepblue leading-tight">
            {church.name}
          </span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="ml-3 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-deepblue transition-colors"
          >
            Plan a Visit
          </NavLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-deepblue"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-softblue bg-cream px-4 pb-4 pt-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-base font-medium ${
                    isActive ? 'bg-softblue text-primary' : 'text-ink/80 hover:bg-softblue/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-base font-semibold text-white"
            >
              Plan a Visit
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
