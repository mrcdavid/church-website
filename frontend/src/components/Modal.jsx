import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useDialog } from '../hooks/useDialog.js'
import { ease } from './Reveal.jsx'

const sizes = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-2xl',
  lg: 'sm:max-w-4xl',
  xl: 'sm:max-w-5xl',
}

/**
 * Accessible, animated modal. A bottom sheet on phones, centered on larger screens.
 * `title` labels the dialog for screen readers; render any visible heading in children.
 * `variant="media"` gives a dark panel for videos and photos.
 */
export default function Modal({ open, onClose, title, size = 'md', variant = 'default', children }) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <ModalPanel onClose={onClose} title={title} size={size} variant={variant}>
          {children}
        </ModalPanel>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function ModalPanel({ onClose, title, size, variant, children }) {
  const panelRef = useRef(null)
  useDialog(panelRef, onClose)
  const media = variant === 'media'

  return (
    <div className="fixed inset-0 z-[100]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-charcoal/75 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center sm:items-center sm:p-6">
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.45, ease }}
          className={`pointer-events-auto relative max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-3xl shadow-lift focus-visible:ring-0 sm:rounded-3xl ${sizes[size]} ${
            media ? 'bg-charcoal text-linen' : 'bg-surface text-fg'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-charcoal/60 text-linen backdrop-blur transition hover:rotate-90 hover:bg-charcoal/85"
          >
            <X className="h-5 w-5" />
          </button>
          {children}
        </motion.div>
      </div>
    </div>
  )
}
