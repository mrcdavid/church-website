import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { formatDate } from '../lib/dates.js'

export default function EventCard({ event, onOpen }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line/70 bg-surface shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-clay">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-col items-center rounded-2xl bg-surface/95 px-3.5 py-2 text-center shadow-soft backdrop-blur">
          <span className="text-[0.7rem] font-bold uppercase tracking-widest text-accent">
            {formatDate(event.date, { month: 'short' })}
          </span>
          <span className="font-display text-2xl font-semibold leading-none text-heading">
            {formatDate(event.date, { day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-heading">
          <button type="button" onClick={onOpen} className="text-left after:absolute after:inset-0 focus-visible:ring-0">
            {event.title}
          </button>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{event.description}</p>
        <div className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm text-muted">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-clay" aria-hidden="true" />
            {event.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-clay" aria-hidden="true" />
            {event.location}
          </p>
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          View details
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}
