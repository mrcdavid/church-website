import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BookOpen, ExternalLink, MonitorPlay, Music } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Reveal, { ease } from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import VideoCard from '../components/VideoCard.jsx'
import VideoModal from '../components/VideoModal.jsx'
import { YoutubeIcon } from '../components/icons.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { latestUploadsEmbed } from '../lib/links.js'
import { bible, church, heroImages, videos } from '../data/siteData.js'

const tabs = [
  { id: 'preaching', label: 'Preaching', icon: BookOpen },
  { id: 'specialNumbers', label: 'Special Numbers', icon: Music },
]

export default function Watch() {
  usePageTitle('Watch')
  const [tab, setTab] = useState(tabs[0].id)
  const [selected, setSelected] = useState(null)
  const label = tabs.find((t) => t.id === tab).label

  return (
    <>
      <PageHero
        eyebrow="Watch & Listen"
        icon={MonitorPlay}
        title="Preaching & Special Numbers"
        description="Missed a Sunday, or want to revisit a message or song? Catch up on our worship services here."
        image={heroImages.watch}
      >
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a href={church.youtubeUrl} target="_blank" rel="noreferrer" className="btn btn-accent">
            <YoutubeIcon className="h-5 w-5" />
            Visit our YouTube channel
          </a>
          <p className="inline-flex items-center gap-2 rounded-full border border-clay-300/40 bg-clay/25 px-3.5 py-1.5 text-sm font-semibold text-linen backdrop-blur">
            <BookOpen className="h-4 w-4 text-clay-200" aria-hidden="true" />
            All preaching from the {bible.version} ({bible.abbreviation})
          </p>
        </div>
      </PageHero>

      {/* Latest uploads — the playlist embed updates itself */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Newest uploads"
            title="Latest from our channel"
            description="This player always shows our most recent uploads — press play, or use the playlist icon to pick a video."
          />
          <Reveal direction="zoom" className="mt-12 overflow-hidden rounded-[2rem] border border-line bg-charcoal shadow-lift">
            <div className="aspect-video">
              <iframe
                src={latestUploadsEmbed}
                title={`Latest videos from ${church.shortName} on YouTube`}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Curated lists */}
      <section className="section bg-surface-alt">
        <div className="container-page">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Browse" title="Recent messages & songs" />
            <Reveal role="tablist" aria-label="Video type" className="inline-flex self-start rounded-full border border-line bg-surface p-1.5 md:self-auto">
              {tabs.map(({ id, label: tabLabel, icon: Icon }) => {
                const active = tab === id
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    id={`tab-${id}`}
                    aria-selected={active}
                    aria-controls="video-panel"
                    onClick={() => setTab(id)}
                    className={`relative isolate inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5 ${
                      active ? 'text-on-primary' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="video-tab"
                        className="absolute inset-0 -z-10 rounded-full bg-primary"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {tabLabel}
                  </button>
                )
              })}
            </Reveal>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              id="video-panel"
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease }}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {videos[tab].map((v, i) => (
                <Reveal key={v.id} delay={(i % 3) * 0.08} className="h-full">
                  <VideoCard video={v} label={label} onOpen={() => setSelected(v)} />
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal className="card mt-14 flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-clay/15 text-clay">
              <YoutubeIcon className="h-9 w-9" />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-2xl font-semibold text-heading">
                {church.youtubeVideoCount}+ videos and counting
              </h3>
              <p className="mt-1 text-muted">
                Every preaching and special number lives on our YouTube channel — subscribe to catch new uploads each week.
              </p>
            </div>
            <a href={church.youtubeUrl} target="_blank" rel="noreferrer" className="btn btn-primary shrink-0">
              Open YouTube
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </>
  )
}
