import Reveal from './Reveal.jsx'
import { serviceTimes } from '../data/siteData.js'

export default function ServiceTimes({ className = '' }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-3 ${className}`}>
      {serviceTimes.map(({ day, name, time, icon: Icon }, i) => (
        <Reveal
          as="li"
          key={name}
          delay={i * 0.1}
          className="group flex items-center gap-4 rounded-3xl border border-line/70 bg-surface p-5 shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-lift sm:p-6"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-on-primary transition-transform duration-500 ease-smooth group-hover:-rotate-6 group-hover:scale-105">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-xs font-bold uppercase tracking-[0.15em] text-accent">{day}</span>
            <span className="mt-0.5 block font-display text-xl font-semibold text-heading">{time}</span>
            <span className="block text-sm text-muted">{name}</span>
          </span>
        </Reveal>
      ))}
    </ul>
  )
}
