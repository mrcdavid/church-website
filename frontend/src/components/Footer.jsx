import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import Logo from '../assets/Logo.jsx'
import { YoutubeIcon } from './icons.jsx'
import { bible, church, navLinks, serviceTimes } from '../data/siteData.js'
import { directionsUrl, mailUrl, telUrl } from '../lib/links.js'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-900 text-linen">
      {/* soft sage glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-sage/10 blur-3xl" />

      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Link to="/" className="inline-flex items-center gap-3">
            <Logo className="h-11 w-11 text-linen" />
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold">{church.logoTitle}</span>
              <span className="block text-[0.7rem] font-bold uppercase tracking-[0.22em] text-clay-200">
                {church.logoSubtitle}
              </span>
            </span>
          </Link>
          <p className="mt-5 font-display text-2xl italic text-sage-300">{church.tagline}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-clay/20 px-3.5 py-1.5 text-sm font-semibold text-clay-200">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {bible.version} ({bible.abbreviation})
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-linen/70">
            Growing forward in faith since {church.foundedYear} — serving God, reaching souls, and making Christ known.
          </p>
          <a
            href={church.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-linen/20 px-4 py-2 text-sm font-semibold transition hover:border-clay hover:bg-clay/15"
          >
            <YoutubeIcon className="h-5 w-5 text-clay-300" />
            Watch on YouTube
          </a>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h3 className="font-display text-lg font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-linen/75">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="group inline-flex items-center gap-1 transition-colors hover:text-clay-200">
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="font-display text-lg font-semibold">Service Times</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {serviceTimes.map(({ day, name, time, icon: Icon }) => (
              <li key={name} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-linen/10 text-clay-300">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold">{name}</span>
                  <span className="text-linen/65">
                    {day} · {time}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-display text-lg font-semibold">Visit Us</h3>
          <address className="mt-4 space-y-3 text-sm not-italic text-linen/75">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" aria-hidden="true" />
              {church.address}
            </p>
            <a href={telUrl} className="flex items-center gap-3 transition-colors hover:text-clay-200">
              <Phone className="h-4 w-4 shrink-0 text-clay-300" aria-hidden="true" />
              {church.phone}
            </a>
            <a href={mailUrl} className="flex items-center gap-3 break-all transition-colors hover:text-clay-200">
              <Mail className="h-4 w-4 shrink-0 text-clay-300" aria-hidden="true" />
              {church.email}
            </a>
          </address>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sage-300 transition-colors hover:text-clay-200"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get directions
          </a>
        </div>
      </div>

      <div className="border-t border-linen/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-linen/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {church.name}. All rights reserved.
          </p>
          <p className="italic">“For in due season we shall reap, if we faint not.” — Galatians 6:9</p>
        </div>
      </div>
    </footer>
  )
}
