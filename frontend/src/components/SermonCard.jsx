export default function SermonCard({ sermon }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white border border-softblue/70 hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={sermon.image}
          alt={sermon.title}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 rounded-full bg-deepblue/90 px-3 py-1 text-xs font-semibold text-cream">
          {sermon.series}
        </span>
        <button
          type="button"
          aria-label={`Play sermon: ${sermon.title}`}
          className="absolute inset-0 flex items-center justify-center bg-deepblue/0 group-hover:bg-deepblue/30 transition-colors"
        >
          <span className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="h-5 w-5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4l12 6-12 6V4z" />
            </svg>
          </span>
        </button>
      </div>
      <div className="p-5">
        <p className="text-xs text-ink/50">{sermon.date}</p>
        <h3 className="mt-1 font-serif text-lg font-semibold text-deepblue">{sermon.title}</h3>
        <p className="mt-1 text-sm text-ink/70">{sermon.speaker}</p>
      </div>
    </article>
  )
}
