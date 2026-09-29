import { Play } from 'lucide-react'
import { formatDate } from '../lib/dates.js'
import { youtubeThumb } from '../lib/links.js'

export default function VideoCard({ video, label, onOpen }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line/70 bg-surface shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-clay">
      <div className="relative aspect-video overflow-hidden bg-charcoal">
        <img
          src={youtubeThumb(video.id)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-charcoal/25 transition-colors duration-500 group-hover:bg-charcoal/45" />
        <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-linen/95 text-clay-500 shadow-lift transition-transform duration-500 ease-smooth group-hover:scale-110">
          <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
        </span>
        {label && (
          <span className="absolute left-4 top-4 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-semibold text-linen backdrop-blur">
            {label}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{formatDate(video.date)}</p>
        <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-heading">
          <button type="button" onClick={onOpen} className="text-left after:absolute after:inset-0 focus-visible:ring-0">
            <span className="sr-only">Play: </span>
            {video.title}
          </button>
        </h3>
      </div>
    </article>
  )
}
