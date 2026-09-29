import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Modal from './Modal.jsx'
import Reveal from './Reveal.jsx'
import { useLatest } from '../hooks/useLatest.js'

// Masonry photo grid + lightbox (arrow keys and swipe to browse).
export default function Gallery({ images }) {
  const [[index, direction], setState] = useState([null, 0])
  const open = index !== null
  const count = images.length

  const show = (i, dir = 0) => setState([(i + count) % count, dir])
  const close = () => setState([null, 0])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') show(index + 1, 1)
      if (e.key === 'ArrowLeft') show(index - 1, -1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, index]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the last photo on screen while the lightbox animates closed.
  const shownIndex = useLatest(index)
  const current = shownIndex != null ? images[shownIndex] : null

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 lg:gap-5">
        {images.map((img, i) => (
          <Reveal key={img.caption} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid lg:mb-5">
            <button
              type="button"
              onClick={() => show(i)}
              className="group relative block w-full overflow-hidden rounded-3xl shadow-soft"
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 via-charcoal/0 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-linen">
                  {img.caption}
                  <ZoomIn className="h-5 w-5 shrink-0" aria-hidden="true" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Modal open={open} onClose={close} title={current?.caption ?? 'Photo'} size="xl" variant="media">
        {current && (
          <div>
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-black sm:aspect-[16/10]">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.img
                  key={shownIndex}
                  src={current.src}
                  alt={current.caption}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -80 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) show(index + 1, 1)
                    else if (info.offset.x > 60) show(index - 1, -1)
                  }}
                  className="max-h-full max-w-full cursor-grab object-contain active:cursor-grabbing"
                />
              </AnimatePresence>
              <GalleryArrow side="left" onClick={() => show(index - 1, -1)} />
              <GalleryArrow side="right" onClick={() => show(index + 1, 1)} />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
              <p className="font-display text-lg">{current.caption}</p>
              <p className="shrink-0 text-sm tabular-nums text-linen/60">
                {shownIndex + 1} / {count}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

function GalleryArrow({ side, onClick }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous photo' : 'Next photo'}
      className={`absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-charcoal/60 text-linen backdrop-blur transition hover:scale-110 hover:bg-charcoal/85 ${
        side === 'left' ? 'left-3' : 'right-3'
      }`}
    >
      <Icon className="h-6 w-6" />
    </button>
  )
}
