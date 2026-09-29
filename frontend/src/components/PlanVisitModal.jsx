import { Link } from 'react-router-dom'
import { BookOpen, HeartHandshake, MapPin, MessageCircleHeart, Navigation, Users } from 'lucide-react'
import Modal from './Modal.jsx'
import { bible, church, heroImages, serviceTimes } from '../data/siteData.js'
import { directionsUrl } from '../lib/links.js'

const expectations = [
  { icon: BookOpen, text: `Bible-centered preaching from the ${bible.version} (${bible.abbreviation}) — feel free to bring yours` },
  { icon: Users, text: 'A warm, family-friendly congregation — kids and youth included' },
  { icon: HeartHandshake, text: 'Friendly faces happy to help you find your way around' },
]

export default function PlanVisitModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Plan your visit" size="md">
      <div className="relative h-44 overflow-hidden sm:h-52">
        <img src={heroImages.home} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/60 to-forest-900/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="eyebrow text-clay-200">We’d love to meet you</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-linen sm:text-4xl">Plan your visit</h2>
        </div>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        <p className="text-muted">
          Everything you need to know before your first Sunday at {church.name}.
        </p>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-accent">When we meet</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {serviceTimes.map(({ day, name, time, icon: Icon }) => (
              <li key={name} className="rounded-2xl border border-line bg-bg/60 p-4">
                <Icon className="h-5 w-5 text-clay" aria-hidden="true" />
                <p className="mt-2 font-semibold text-heading">{name}</p>
                <p className="text-sm text-muted">
                  {day} · {time}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-accent">What to expect</h3>
          <ul className="mt-3 space-y-3">
            {expectations.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sage/25 text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-1.5 text-sm text-fg">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start gap-3 rounded-2xl bg-surface-alt p-4">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
          <p className="text-sm">
            <span className="block font-semibold text-heading">Where to find us</span>
            <span className="text-muted">{church.address}</span>
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={directionsUrl} target="_blank" rel="noreferrer" className="btn btn-primary flex-1">
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get directions
          </a>
          <Link to="/contact?subject=Planning a visit" onClick={onClose} className="btn btn-outline flex-1">
            <MessageCircleHeart className="h-4 w-4" aria-hidden="true" />
            Send us a message
          </Link>
        </div>
      </div>
    </Modal>
  )
}
