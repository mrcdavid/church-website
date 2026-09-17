import SectionHeading from '../components/SectionHeading.jsx'
import EventCard from '../components/EventCard.jsx'
import { events } from '../data/siteData.js'

export default function Events() {
  return (
    <div>
      <section className="bg-softblue/60 py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What's Happening"
            title="Upcoming Events"
            description="Join us — everyone is welcome, no registration required unless noted."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((e) => (
            <EventCard key={e.title} event={e} />
          ))}
        </div>
      </section>
    </div>
  )
}
