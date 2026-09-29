import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { useScrollPast } from '../hooks/useScrollPast.js'

export default function BackToTop() {
  const show = useScrollPast(800)

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -3 }}
          className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-on-primary shadow-lift sm:bottom-8 sm:right-8"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
