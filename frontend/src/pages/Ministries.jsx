import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HeartHandshake } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Reveal, { ease } from '../components/Reveal.jsx'
import MinistryCard from '../components/MinistryCard.jsx'
import MinistryModal from '../components/MinistryModal.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { heroImages, ministries, ministryCategories } from '../data/siteData.js'

const ALL = 'All'

export default function Ministries() {
  usePageTitle('Ministries')
  const [filter, setFilter] = useState(ALL)
  const [selected, setSelected] = useState(null)
  const shown = filter === ALL ? ministries : ministries.filter((m) => m.category === filter)

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        icon={HeartHandshake}
        title="Ministries & Groups"
        description="Wherever you are in life, there’s a group here for you. Reach out if you’d like to visit one."
        image={heroImages.ministries}
      />

      <section className="section pt-12 sm:pt-16">
        <div className="container-page">
          <Reveal role="group" aria-label="Filter ministries" className="flex flex-wrap justify-center gap-2">
            {[ALL, ...ministryCategories].map((category) => {
              const active = filter === category
              const count = category === ALL ? ministries.length : ministries.filter((m) => m.category === category).length
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(category)}
                  className={`relative isolate inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                    active ? 'border-primary text-on-primary' : 'border-line bg-surface text-fg hover:border-primary hover:text-primary'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="ministry-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {category}
                  <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-on-primary/20' : 'bg-surface-alt text-muted'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </Reveal>

          <motion.div layout className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((m, i) => (
                <motion.div
                  key={m.title}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
                  className="h-full"
                >
                  <MinistryCard ministry={m} onOpen={() => setSelected(m)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <MinistryModal ministry={selected} onClose={() => setSelected(null)} />
      <CtaBand title="Find your place to serve" />
    </>
  )
}
