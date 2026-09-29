import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, BookOpen, CalendarHeart, ChevronDown, Clock, MapPin, MonitorPlay, Navigation, Phone, Sparkles } from 'lucide-react'
import BibleHighlight from '../components/BibleHighlight.jsx'
import Reveal, { ease } from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceTimes from '../components/ServiceTimes.jsx'
import StatCounter from '../components/StatCounter.jsx'
import MinistryCard from '../components/MinistryCard.jsx'
import MinistryModal from '../components/MinistryModal.jsx'
import EventCard from '../components/EventCard.jsx'
import EventModal from '../components/EventModal.jsx'
import VideoCard from '../components/VideoCard.jsx'
import VideoModal from '../components/VideoModal.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { usePlanVisit } from '../context/PlanVisitContext.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { upcomingEvents } from '../lib/dates.js'
import { directionsUrl, telUrl } from '../lib/links.js'
import {
  aboutStory,
  bible,
  church,
  events,
  heroImages,
  ministries,
  mission,
  serviceTimes,
  stats,
  videos,
  yearsOfMinistry,
} from '../data/siteData.js'
import { anniversary, historyIntro, pastorFeature } from '../data/history.js'

export default function Home() {
  usePageTitle()
  const [ministry, setMinistry] = useState(null)
  const [event, setEvent] = useState(null)
  const [video, setVideo] = useState(null)
  const nextEvents = upcomingEvents(events).slice(0, 3)

  return (
    <>
      <Hero />

      {/* Service times overlap the bottom of the hero */}
      <section aria-label="Service times" className="relative z-10 -mt-20">
        <div className="container-page">
          <ServiceTimes />
        </div>
      </section>

      <Welcome />
      <BibleHighlight className="pb-20 sm:pb-24 lg:pb-28" />
      <GrowingForward />

      <section className="section bg-surface-alt">
        <div className="container-page">
          <HeaderRow
            eyebrow="Get involved"
            title="Something for every season of life"
            description="From kids to grandparents, there’s a place for you to belong and grow."
            to="/ministries"
            linkLabel="View all ministries"
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.slice(0, 3).map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1} className="h-full">
                <MinistryCard ministry={m} onOpen={() => setMinistry(m)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <HeaderRow
            eyebrow="From the pulpit"
            title="Latest preaching"
            description="Missed a Sunday? Catch up on recent messages from our worship services."
            to="/watch"
            linkLabel="Watch more"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.preaching.slice(0, 3).map((v, i) => (
              <Reveal key={v.id} delay={i * 0.1} className={`h-full ${i === 2 ? 'sm:hidden lg:block' : ''}`}>
                <VideoCard video={v} label="Preaching" onOpen={() => setVideo(v)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {nextEvents.length > 0 && (
        <section className="section bg-surface-alt">
          <div className="container-page">
            <HeaderRow
              eyebrow="What’s happening"
              title="Upcoming events"
              description="A few ways to connect with our church family this season."
              to="/events"
              linkLabel="See all events"
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nextEvents.map((e, i) => (
                <Reveal key={e.title} delay={i * 0.1} className={`h-full ${i === 2 ? 'sm:hidden lg:block' : ''}`}>
                  <EventCard event={e} onOpen={() => setEvent(e)} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <VisitUs />
      <CtaBand />

      <MinistryModal ministry={ministry} onClose={() => setMinistry(null)} />
      <EventModal event={event} onClose={() => setEvent(null)} />
      <VideoModal video={video} onClose={() => setVideo(null)} />
    </>
  )
}

function Hero() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { openPlanVisit } = usePlanVisit()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '22%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.12])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const words = church.tagline.split(' ')

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest-900 pb-36 pt-32">
      <motion.img
        src={heroImages.home}
        alt="The Harvesters Baptist Church Calamba congregation gathered together"
        style={{ y: imageY, scale: imageScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/90 via-forest-900/75 to-forest-900/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-900/90 via-transparent to-charcoal/40" />

      <motion.div style={{ opacity: contentOpacity }} className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <Link
            to="/history"
            className="group inline-flex items-center gap-2 rounded-full border border-linen/25 bg-linen/10 py-1.5 pl-3 pr-4 text-xs font-semibold text-linen backdrop-blur transition hover:bg-linen/20 sm:text-sm"
          >
            <Sparkles className="h-4 w-4 text-clay-300" aria-hidden="true" />
            Celebrating {yearsOfMinistry} years of {anniversary.theme}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </motion.div>

        <h1 className="mt-7 max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-linen sm:text-6xl lg:text-7xl xl:text-8xl">
          {words.map((word, i) => (
            <motion.span
              key={word}
              className="mr-[0.22em] inline-block"
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.14, ease }}
            >
              {i === words.length - 1 ? <span className="italic text-clay-300">{word}</span> : word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease }}
        >
          <p className="mt-6 max-w-xl text-base leading-relaxed text-linen/85 sm:text-lg">
            Join {church.name} this Sunday for worship, the preaching of God’s Word, and a church family that shows up
            for one another.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={openPlanVisit} className="btn btn-accent">
              <CalendarHeart className="h-5 w-5" aria-hidden="true" />
              Plan Your Visit
            </button>
            <Link to="/watch" className="btn btn-glass">
              <MonitorPlay className="h-5 w-5" aria-hidden="true" />
              Watch Preaching
            </Link>
          </div>
          <div className="mt-8 flex flex-col items-start gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-clay-300/40 bg-clay/25 px-3.5 py-1.5 font-semibold text-linen backdrop-blur">
              <BookOpen className="h-4 w-4 text-clay-200" aria-hidden="true" />
              {bible.version} ({bible.abbreviation}) Bible
            </p>
            <p className="flex items-center gap-2 text-linen/70">
              <MapPin className="h-4 w-4 text-clay-300" aria-hidden="true" />
              {church.address}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <a
        href="#welcome"
        aria-label="Scroll to content"
        className="absolute bottom-28 left-1/2 hidden -translate-x-1/2 text-linen/70 transition hover:text-linen sm:block"
      >
        <ChevronDown className="h-7 w-7 animate-scroll-hint" />
      </a>
    </section>
  )
}

function Welcome() {
  return (
    <section id="welcome" className="section scroll-mt-20">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="right" className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
            <img src={aboutStory.image} alt="Worship service at Harvesters Baptist Church Calamba" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-3 w-36 overflow-hidden rounded-3xl border-[6px] border-bg shadow-lift sm:-right-8 sm:w-52">
            <img src={pastorFeature.image} alt={pastorFeature.caption} loading="lazy" className="aspect-square h-full w-full object-cover" />
          </div>
          <div className="absolute -left-3 -top-5 rounded-2xl bg-clay-500 px-5 py-4 text-white shadow-lift sm:-left-6 sm:-top-6">
            <p className="font-display text-4xl font-semibold leading-none">{yearsOfMinistry}</p>
            <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.18em]">Years of ministry</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="Who we are" title={`A church family growing in grace since ${church.foundedYear}`} />
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{aboutStory.paragraphs[0]}</p>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {mission.map(({ title, icon: Icon }, i) => (
              <Reveal as="li" key={title} delay={0.15 + i * 0.07} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage/25 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-semibold text-heading">{title}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Link to="/about" className="btn btn-primary">
              Our story
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/history" className="btn btn-outline">
              Our history
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function GrowingForward() {
  return (
    <section className="section relative isolate overflow-hidden bg-forest-900 text-linen">
      <div aria-hidden="true" className="absolute -left-40 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-sage/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-clay/15 blur-3xl" />

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow={anniversary.theme}
              title={`${yearsOfMinistry} years of God’s faithfulness`}
              description={historyIntro}
            />
            <Reveal delay={0.1}>
              <blockquote className="mt-8 border-l-2 border-clay pl-5">
                <p className="font-display text-xl italic leading-relaxed text-linen/90">“{anniversary.verse.text}”</p>
                <footer className="mt-2 text-sm font-semibold text-clay-300">— {anniversary.verse.reference}</footer>
              </blockquote>
            </Reveal>
            <Reveal delay={0.15}>
              <Link to="/history" className="btn btn-accent mt-9">
                Walk through our history
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <Reveal direction="left" className="relative">
            <div aria-hidden="true" className="absolute -inset-4 rounded-[2.5rem] bg-clay/20 blur-2xl" />
            <img
              src={anniversary.image}
              alt={`${yearsOfMinistry} years of ${anniversary.theme} — anniversary theme graphic`}
              loading="lazy"
              className="relative w-full rounded-[2rem] shadow-lift ring-1 ring-linen/10"
            />
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-linen/10 pt-14 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <StatCounter {...s} tone="dark" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function VisitUs() {
  const sundays = serviceTimes.filter((s) => s.day === 'Sunday')

  return (
    <section className="section">
      <div className="container-page grid gap-12 lg:grid-cols-5 lg:items-center">
        <div className="lg:col-span-2">
          <SectionHeading
            eyebrow="Visit us"
            title="Find your way to HBC"
            description="We’re in South Spring Villas, Bucal — tap for turn-by-turn directions on your phone."
          />
          <Reveal delay={0.1} className="card mt-8 space-y-4 p-6">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
              <span className="text-sm text-fg">{church.address}</span>
            </p>
            <p className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
              <span className="text-sm text-fg">
                Sundays · {sundays.map((s) => `${s.name} ${s.time}`).join(' · ')}
              </span>
            </p>
            <a href={telUrl} className="flex items-start gap-3 text-sm text-fg transition-colors hover:text-accent">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
              {church.phone}
            </a>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <a href={directionsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get directions
            </a>
          </Reveal>
        </div>
        <Reveal direction="left" className="lg:col-span-3">
          <MapEmbed className="h-[22rem] sm:h-[28rem]" />
        </Reveal>
      </div>
    </section>
  )
}

function HeaderRow({ eyebrow, title, description, to, linkLabel }) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <Reveal className="shrink-0">
        <Link to={to} className="link-arrow group">
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  )
}
