import { ArrowRight } from 'lucide-react'

export default function MinistryCard({ ministry, onOpen }) {
  const { title, ages, category, description, image, icon: Icon } = ministry

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line/70 bg-surface shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-clay">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-fg backdrop-blur">
          {category}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <span className="absolute -top-7 right-6 grid h-14 w-14 place-items-center rounded-2xl bg-clay-500 text-white shadow-lift transition-transform duration-500 ease-smooth group-hover:-rotate-6">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="pr-16 text-xs font-bold uppercase tracking-[0.15em] text-accent">{ages}</p>
        <h3 className="mt-2 font-display text-xl font-semibold text-heading">
          <button type="button" onClick={onOpen} className="text-left after:absolute after:inset-0 focus-visible:ring-0">
            {title}
          </button>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{description}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}
