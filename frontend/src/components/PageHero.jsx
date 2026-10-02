import { motion } from 'motion/react'
import { ease } from './Reveal.jsx'

// Photo banner at the top of every inner page. Always dark, so the
// transparent navbar reads well over it in both themes.
export default function PageHero({ eyebrow, icon: Icon, title, description, image, watermark, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-900 pb-24 pt-36 sm:pb-32 sm:pt-44">
      {image && (
        <motion.img
          src={image}
          alt=""
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease }}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal/85 via-forest-900/75 to-forest-800/60" />
      {watermark && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 right-3 select-none font-display text-[8rem] font-semibold leading-none text-linen/10 sm:right-8 sm:text-[13rem] lg:text-[17rem]"
        >
          {watermark}
        </span>
      )}

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <p className="eyebrow text-clay-300">
              {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] text-linen sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-linen/80 sm:text-lg">{description}</p>
          )}
          {children}
        </motion.div>
      </div>

      <HeroCurve />
    </section>
  )
}

// Gentle arch into the page background — echoes the arch in the logo.
export function HeroCurve() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      className="absolute inset-x-0 -bottom-px h-10 w-full text-bg sm:h-16"
    >
      <path fill="currentColor" d="M0 64V40C360 8 1080 8 1440 40V64Z" />
    </svg>
  )
}
