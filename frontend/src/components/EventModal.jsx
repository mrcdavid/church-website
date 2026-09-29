import { Link } from 'react-router-dom'
import { CalendarDays, Clock, MapPin, MessageCircleHeart } from 'lucide-react'
import Modal from './Modal.jsx'
import { formatDate } from '../lib/dates.js'
import { useLatest } from '../hooks/useLatest.js'

export default function EventModal({ event: selected, onClose }) {
  const event = useLatest(selected)
  return (
    <Modal open={Boolean(selected)} onClose={onClose} title={event?.title ?? 'Event'} size="md">
      {event && (
        <>
          <div className="relative h-56 overflow-hidden sm:h-72">
            <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/30 to-transparent" />
            <h2 className="absolute inset-x-0 bottom-0 p-6 font-display text-3xl font-semibold text-linen sm:p-8 sm:text-4xl">
              {event.title}
            </h2>
          </div>
          <div className="p-6 sm:p-8">
            <dl className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: CalendarDays, label: 'Date', value: formatDate(event.date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) },
                { icon: Clock, label: 'Time', value: event.time },
                { icon: MapPin, label: 'Location', value: event.location },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl bg-surface-alt p-4">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-accent">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-heading">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 leading-relaxed text-muted">{event.description}</p>
            <Link
              to={`/contact?subject=${encodeURIComponent(`Question about ${event.title}`)}`}
              onClick={onClose}
              className="btn btn-primary mt-8"
            >
              <MessageCircleHeart className="h-4 w-4" aria-hidden="true" />
              Ask about this event
            </Link>
          </div>
        </>
      )}
    </Modal>
  )
}
