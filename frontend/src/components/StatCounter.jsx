import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

// Counts up from 0 the first time it scrolls into view.
export default function StatCounter({ value, suffix = '', label, icon: Icon, tone = 'default' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)
  const onDark = tone === 'dark'

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduceMotion])

  return (
    <div ref={ref} className="text-center sm:text-left">
      {Icon && (
        <span
          className={`mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl sm:mx-0 ${
            onDark ? 'bg-linen/10 text-clay-300' : 'bg-sage/25 text-primary'
          }`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      )}
      <p className={`font-display text-5xl font-semibold tabular-nums sm:text-6xl ${onDark ? 'text-linen' : 'text-heading'}`}>
        {display}
        <span className="text-clay">{suffix}</span>
      </p>
      <p className={`mt-2 text-sm font-medium ${onDark ? 'text-linen/70' : 'text-muted'}`}>{label}</p>
    </div>
  )
}
