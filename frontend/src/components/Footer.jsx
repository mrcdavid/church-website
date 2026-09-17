import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.jsx'
import { church, serviceTimes, navLinks } from '../data/siteData.js'

export default function Footer() {
  return (
    <footer className="bg-deepblue text-cream">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9" variant="light" />
            <span className="font-serif text-lg font-semibold">{church.name}</span>
          </div>
          <p className="mt-4 text-sm text-cream/75 leading-relaxed">{church.tagline}</p>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-cream/80">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold mb-3">Service Times</h3>
          <ul className="space-y-2 text-sm text-cream/80">
            {serviceTimes.map((s) => (
              <li key={s.name} className="flex justify-between gap-4">
                <span>{s.day} · {s.name}</span>
                <span className="text-cream/60">{s.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold mb-3">Visit Us</h3>
          <address className="not-italic text-sm text-cream/80 space-y-2 leading-relaxed">
            <p>{church.address}</p>
            <p>{church.phone}</p>
            <p>{church.email}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <p className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs text-cream/60">
          © {new Date().getFullYear()} {church.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
