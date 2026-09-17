export default function EventCard({ event }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white border border-softblue/70 hover:shadow-lg transition-shadow">
      <img
        src={event.image}
        alt={event.title}
        className="h-44 sm:h-48 w-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-green">{event.date}</p>
        <h3 className="mt-1 font-serif text-lg font-semibold text-deepblue">{event.title}</h3>
        <p className="mt-2 text-sm text-ink/70 leading-relaxed flex-1">{event.description}</p>
        <div className="mt-4 flex flex-col gap-1 text-sm text-ink/60 border-t border-softblue pt-3">
          <span>🕒 {event.time}</span>
          <span>📍 {event.location}</span>
        </div>
      </div>
    </article>
  )
}
