import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'motion/react'
import { ArrowRight, History as HistoryIcon } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import StatCounter from '../components/StatCounter.jsx'
import Gallery from '../components/Gallery.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { aboutStory, church, gallery, heroImages, stats, yearsOfMinistry } from '../data/siteData.js'
import { anniversary, historyIntro, milestones, pastorFeature } from '../data/history.js'

export default function History() {
  usePageTitle('History')

  return (
    <>
      <PageHero
        eyebrow="Our History"
        icon={HistoryIcon}
        title={`${yearsOfMinistry} Years of ${anniversary.theme}`}
        description={historyIntro}
        image={heroImages.history}
      />

      {/* Intro + stats */}
      <section className="section">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={`Since ${church.foundedYear}`} title="God has been faithful at every step" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{aboutStory.paragraphs[0]}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <blockquote className="mt-8 rounded-3xl border-l-4 border-clay bg-surface-alt p-6">
                <p className="font-display text-xl italic leading-relaxed text-heading">“{anniversary.verse.text}”</p>
                <footer className="mt-3 text-sm font-semibold text-accent">— {anniversary.verse.reference}</footer>
              </blockquote>
            </Reveal>
          </div>
          <Reveal direction="left">
            <img
              src={anniversary.image}
              alt={`${yearsOfMinistry} years of ${anniversary.theme} — anniversary theme graphic`}
              className="w-full rounded-[2rem] shadow-lift"
            />
          </Reveal>
        </div>

        <div className="container-page mt-20">
          <Reveal className="card grid grid-cols-2 gap-x-6 gap-y-10 p-8 sm:p-10 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </Reveal>
        </div>
      </section>

      <Timeline />

      {/* Pastor feature */}
      <section className="section">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <figure>
              <img
                src={pastorFeature.image}
                alt={pastorFeature.caption}
                loading="lazy"
                className="aspect-square w-full rounded-[2rem] object-cover shadow-lift"
              />
              <figcaption className="mt-4 text-center text-sm text-muted">{pastorFeature.caption}</figcaption>
            </figure>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Our pastor" title={pastorFeature.title} />
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{pastorFeature.text}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link to="/about" className="link-arrow group mt-8">
                Meet our team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-surface-alt">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Moments along the way"
            title="Life at HBC today"
            description="A glimpse of our church family — tap any photo to see it larger."
          />
          <div className="mt-14">
            <Gallery images={gallery} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Be part of the next chapter"
        text="Our story is still being written. Come worship with us and grow forward together."
      />
    </>
  )
}

function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section className="section bg-surface-alt">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Milestones"
          title="How we’ve grown"
          description="Key moments in the life of our church family."
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-5xl">
          {/* Track + a line that draws itself as you scroll */}
          <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-0.5 -translate-x-1/2 bg-line md:left-1/2" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-5 top-0 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-clay via-clay to-sage md:left-1/2"
          />

          <ol className="space-y-12 md:space-y-20">
            {milestones.map((m, i) => {
              const flip = i % 2 === 1
              return (
                <li key={`${m.period}-${m.title}`} className="relative md:grid md:grid-cols-2 md:items-center md:gap-16">
                  <motion.span
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="absolute left-5 top-8 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-surface-alt bg-clay ring-4 ring-clay/25 md:left-1/2 md:top-1/2 md:-mt-2.5"
                  />
                  <Reveal
                    direction={flip ? 'left' : 'right'}
                    className={`pl-14 md:pl-0 ${flip ? 'md:col-start-2 md:row-start-1' : ''}`}
                  >
                    <div className="card p-6 sm:p-7">
                      <span className="inline-flex rounded-full bg-clay/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-accent">
                        {m.period}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-heading">{m.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{m.text}</p>
                    </div>
                  </Reveal>
                  {m.image && (
                    <Reveal
                      direction={flip ? 'right' : 'left'}
                      delay={0.1}
                      className={`mt-4 pl-14 md:mt-0 md:pl-0 ${flip ? 'md:col-start-1 md:row-start-1' : ''}`}
                    >
                      <img
                        src={m.image}
                        alt=""
                        loading="lazy"
                        className="aspect-[16/10] w-full rounded-3xl object-cover shadow-soft"
                      />
                    </Reveal>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
