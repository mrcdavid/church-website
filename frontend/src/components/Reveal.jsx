import { motion } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1]

const offsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 56 },
  right: { x: -56 },
  zoom: { scale: 0.92 },
  fade: {},
}

/**
 * Animates its children in the first time they scroll into view.
 * `direction` is where the content comes *from* (left = slides in from the right edge).
 */
export default function Reveal({
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  amount = 0.2,
  className,
  children,
  ...rest
}) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
