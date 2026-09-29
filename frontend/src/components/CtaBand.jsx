import { Link } from 'react-router-dom'
import { CalendarHeart, Mail, Wheat } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { usePlanVisit } from '../context/PlanVisitContext.jsx'

export default function CtaBand({
  title = 'New here? We’d love to meet you.',
  text = 'Send us a message and someone from our church family will reach out — no pressure, just a friendly hello.',
}) {
  const { openPlanVisit } = usePlanVisit()

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-clay-500 via-clay-600 to-clay-700 py-20 text-white sm:py-24">
      <Wheat aria-hidden="true" className="absolute -right-12 -top-10 -z-10 h-72 w-72 rotate-12 text-white/10" />
      <Wheat aria-hidden="true" className="absolute -bottom-16 -left-12 -z-10 h-64 w-64 -rotate-12 text-white/10" />
      <Reveal className="container-page text-center">
        <h2 className="mx-auto max-w-3xl text-balance font-display text-3xl font-semibold sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">{text}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openPlanVisit}
            className="btn bg-linen text-forest shadow-lift hover:-translate-y-0.5 hover:bg-white"
          >
            <CalendarHeart className="h-5 w-5" aria-hidden="true" />
            Plan your visit
          </button>
          <Link to="/contact" className="btn btn-glass">
            <Mail className="h-5 w-5" aria-hidden="true" />
            Send a message
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
