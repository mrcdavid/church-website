import { BookOpen, Check } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { bible } from '../data/siteData.js'

// Feature card announcing the church's Bible version (Home and About pages).
export default function BibleHighlight({ className = '' }) {
  return (
    <section aria-labelledby="our-bible" className={className}>
      <div className="container-page">
        <Reveal
          direction="zoom"
          className="relative isolate overflow-hidden rounded-[2rem] border border-clay/30 bg-gradient-to-br from-surface via-surface to-clay/10 p-7 shadow-lift sm:p-12 lg:p-14"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-8 -z-10 select-none font-display text-[9rem] font-semibold leading-none text-clay/10 sm:-top-12 sm:text-[15rem]"
          >
            {bible.abbreviation}
          </span>

          <div className="grid items-center gap-8 lg:grid-cols-[auto,1fr] lg:gap-14">
            <div className="relative mx-auto lg:mx-0">
              <div aria-hidden="true" className="absolute -inset-3 rounded-[2.25rem] bg-clay/20 blur-xl" />
              <div className="relative grid h-28 w-28 place-items-center rounded-[2rem] bg-clay-500 text-white shadow-lift sm:h-36 sm:w-36">
                <BookOpen className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden="true" />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-forest-900 px-3 py-1 text-xs font-bold tracking-[0.2em] text-linen shadow-soft">
                {bible.abbreviation}
              </span>
            </div>

            <div className="text-center lg:text-left">
              <p className="eyebrow">
                <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
                Our Bible
              </p>
              <h2 id="our-bible" className="mt-3 text-balance font-display text-3xl font-semibold leading-tight text-heading sm:text-4xl lg:text-5xl">
                We use the <span className="italic text-accent">{bible.version}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">{bible.text}</p>

              <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                {bible.usedIn.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-sage/25 px-3.5 py-1.5 text-sm font-semibold text-primary"
                  >
                    <Check className="h-4 w-4" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <blockquote className="mx-auto mt-7 max-w-2xl border-l-2 border-clay pl-5 text-left lg:mx-0">
                <p className="font-display text-lg italic leading-relaxed text-heading sm:text-xl">“{bible.verse.text}”</p>
                <footer className="mt-1.5 text-sm font-semibold text-accent">
                  — {bible.verse.reference} ({bible.abbreviation})
                </footer>
              </blockquote>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
