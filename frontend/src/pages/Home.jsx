import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import EventCard from '../components/EventCard.jsx'
import {
  church, 
  serviceTimes,
  beliefs,
  ministries,
  events,
} from '../data/siteData.js'
import hbcHeroImage from '../assets/HBC 14 YEARS.jpg';



export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={hbcHeroImage} alt="Congregation gathered in worship" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-deepblue/90 via-deepblue/60 to-deepblue/30" />
        </div>
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 lg:py-44 flex flex-col items-start">
          <p className="text-sm sm:text-base font-semibold tracking-wide text-softgreen mb-4">
            You're welcome here
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white max-w-2xl leading-tight">
            {church.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-cream/90 leading-relaxed">
            Join {church.name} this Sunday for worship, honest conversation, and a community
            that shows up for one another.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              to="/contact"
              className="rounded-full bg-primary px-7 py-3 text-center text-base font-semibold text-white hover:bg-green transition-colors"
            >
              Plan Your Visit
            </Link>
            <Link
              to="/sermons"
              className="rounded-full border border-cream/60 px-7 py-3 text-center text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Watch a Sermon
            </Link>
          </div>
        </div>
      </section>

      {/* Service times strip */}
      <section className="bg-primary">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-cream">
          {serviceTimes.map((s) => (
            <div key={s.name} className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-wide text-cream/70">{s.day}</p>
              <p className="font-serif text-lg font-semibold">{s.time}</p>
              <p className="text-sm text-cream/80">{s.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beliefs */}
      <section className="py-20 sm:py-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Believe"
            title="Faith that's honest, and community that's real"
            description="A few of the convictions that shape everything we do."
            align="center"
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beliefs.map((b) => (
              <div key={b.title} className="rounded-2xl bg-softblue/60 p-6">
                <h3 className="font-serif text-lg font-semibold text-deepblue">{b.title}</h3>
                <p className="mt-2 text-sm text-ink/70 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries preview */}
      <section className="bg-softgreen/50 py-20 sm:py-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              eyebrow="Get Involved"
              title="Something for every season of life"
              description="From kids to seniors, there's a place for you to belong and grow."
            />
            <Link to="/ministries" className="text-primary font-semibold hover:text-deepblue whitespace-nowrap">
              View all ministries →
            </Link>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.slice(0, 3).map((m) => (
              <div key={m.title} className="rounded-2xl overflow-hidden bg-white border border-softblue/70">
                <img src={m.image} alt={m.title} className="h-44 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-deepblue">{m.title}</h3>
                  <p className="text-xs text-green font-semibold mt-0.5">{m.ages}</p>
                  <p className="mt-2 text-sm text-ink/70 leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-20 sm:py-24">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              eyebrow="What's Happening"
              title="Upcoming events"
              description="A few ways to connect with our church family this season."
            />
            <Link to="/events" className="text-primary font-semibold hover:text-deepblue whitespace-nowrap">
              See all events →
            </Link>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.slice(0, 4).map((e) => (
              <EventCard key={e.title} event={e} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-deepblue">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
            New here? We'd love to meet you.
          </h2>
          <p className="mt-3 text-cream/80 max-w-xl mx-auto">
            Fill out a short form and someone from our welcome team will reach out —
            no pressure, just a friendly hello.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-full bg-green px-8 py-3 font-semibold text-white hover:bg-primary transition-colors"
          >
            Plan Your Visit
          </Link>
        </div>
      </section>
    </div>
  )
}
