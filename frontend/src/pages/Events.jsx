import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, CalendarX2, HeartHandshake } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceTimes from '../components/ServiceTimes.jsx'
import EventCard from '../components/EventCard.jsx'
import EventModal from '../components/EventModal.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { upcomingEvents } from '../lib/dates.js'
import { events, heroImages } from '../data/siteData.js'

export default function Events() {
  usePageTitle('Events')
  const [selected, setSelected] = useState(null)
  const upcoming = upcomingEvents(events)

  return (
    <>
      <PageHero
        eyebrow="What’s Happening"
        icon={CalendarDays}
        title="Events & Gatherings"
        description="Join us — everyone is welcome, no registration required unless noted."
        image={heroImages.events}
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Every week"
            title="Weekly gatherings"
            description="Our regular rhythm of learning, worship, and prayer."
          />
          <ServiceTimes className="mt-12" />
          <Reveal className="mt-6 flex flex-col gap-3 rounded-3xl bg-surface-alt p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="flex items-center gap-3 text-sm text-muted">
              <HeartHandshake className="h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
              Our fellowships, Bible studies, and outreach teams also meet throughout the week and month.
            </p>
            <Link to="/ministries" className="link-arrow group shrink-0 text-sm">
              See ministries
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Mark your calendar" title="Upcoming events" />
          {upcoming.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e, i) => (
                <Reveal key={`${e.date}-${e.title}`} delay={(i % 3) * 0.1} className="h-full">
                  <EventCard event={e} onOpen={() => setSelected(e)} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="card mt-12 flex flex-col items-center p-12 text-center">
              <CalendarX2 className="h-12 w-12 text-clay" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-heading">No special events right now</h3>
              <p className="mt-2 max-w-md text-muted">
                New events are posted here as they’re planned. In the meantime, we’d love to see you at a weekly gathering.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <EventModal event={selected} onClose={() => setSelected(null)} />
    </>
  )
}
