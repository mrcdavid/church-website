import { Link } from 'react-router-dom'
import { ArrowRight, Church } from 'lucide-react'
import BibleHighlight from '../components/BibleHighlight.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { aboutStory, beliefs, church, heroImages, mission, staff, yearsOfMinistry } from '../data/siteData.js'

export default function About() {
  usePageTitle('About')

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        icon={Church}
        title={`About ${church.name}`}
        description={`${yearsOfMinistry} years of showing up for our neighbors, one Sunday at a time.`}
        image={heroImages.about}
      />

      {/* Story */}
      <section className="section">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right" className="relative">
            <div aria-hidden="true" className="absolute -bottom-5 -left-5 h-2/3 w-2/3 rounded-[2rem] bg-sage/30" />
            <img
              src={aboutStory.image}
              alt="Church community gathered together"
              className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
            />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Who we are" title="Serving God faithfully, reaching more souls" />
            {aboutStory.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <Link to="/history" className="link-arrow group mt-8">
                See how we’ve grown
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <BibleHighlight className="pb-20 sm:pb-24 lg:pb-28" />

      {/* Mission */}
      <section className="section bg-surface-alt">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Our mission"
            title="Four callings that shape everything we do"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mission.map(({ title, text, icon: Icon }, i) => (
              <Reveal
                key={title}
                delay={i * 0.1}
                className="group card p-7 transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-on-primary transition-transform duration-500 ease-smooth group-hover:-rotate-6 group-hover:scale-105">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-heading">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="What we believe"
            title="Faith that’s honest, and community that’s real"
            description="A few of the convictions that shape everything we do."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {beliefs.map(({ title, text, icon: Icon }, i) => (
              <Reveal
                key={title}
                delay={(i % 2) * 0.1}
                direction={i % 2 ? 'left' : 'right'}
                className="group relative flex gap-5 overflow-hidden rounded-3xl border border-line/70 bg-surface p-7 shadow-soft transition-all duration-500 ease-smooth hover:shadow-lift"
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-3 -top-6 font-display text-8xl font-semibold text-sage/20 transition-colors duration-500 group-hover:text-clay/20"
                >
                  0{i + 1}
                </span>
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-clay/15 text-accent">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="relative">
                  <h3 className="font-display text-xl font-semibold text-heading">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-surface-alt">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Meet the team" title="Our pastors & staff" />
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4">
            {staff.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.1}>
                <figure className="group relative overflow-hidden rounded-3xl shadow-soft">
                  <img
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover object-[center_20%] transition-transform duration-700 ease-smooth group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent p-4 pt-16 sm:p-5 sm:pt-20">
                    <p className="font-display text-base font-semibold leading-tight text-linen sm:text-lg">{person.name}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-clay-200">{person.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
