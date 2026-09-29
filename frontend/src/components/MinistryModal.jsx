import { Link } from 'react-router-dom'
import { MessageCircleHeart, Tag, Users } from 'lucide-react'
import Modal from './Modal.jsx'
import { useLatest } from '../hooks/useLatest.js'

export default function MinistryModal({ ministry: selected, onClose }) {
  const ministry = useLatest(selected)
  const Icon = ministry?.icon

  return (
    <Modal open={Boolean(selected)} onClose={onClose} title={ministry?.title ?? 'Ministry'} size="lg">
      {ministry && (
        <div className="grid md:grid-cols-2">
          <div className="relative h-60 md:h-auto md:min-h-[26rem]">
            <img src={ministry.image} alt={ministry.title} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-clay-500 text-white">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold text-heading">{ministry.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/25 px-3 py-1 text-primary">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                {ministry.ages}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-clay/15 px-3 py-1 text-accent">
                <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                {ministry.category}
              </span>
            </div>
            <p className="mt-5 flex-1 leading-relaxed text-muted">{ministry.description}</p>
            <Link
              to={`/contact?subject=${encodeURIComponent(`Joining ${ministry.title}`)}`}
              onClick={onClose}
              className="btn btn-primary mt-8 self-start"
            >
              <MessageCircleHeart className="h-4 w-4" aria-hidden="true" />
              Ask about joining
            </Link>
          </div>
        </div>
      )}
    </Modal>
  )
}
