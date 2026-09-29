import { useEffect, useRef } from 'react'
import { lockScroll, unlockScroll } from '../lib/scrollLock.js'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'

// Modal behavior for a panel that is mounted only while open: moves focus in,
// traps Tab, closes on Escape, locks page scroll, and restores focus on close.
export function useDialog(ref, onClose) {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const previouslyFocused = document.activeElement
    lockScroll()
    node.focus({ preventScroll: true })

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        onCloseRef.current?.()
        return
      }
      if (e.key !== 'Tab' || !node.contains(document.activeElement)) return
      const items = [...node.querySelectorAll(FOCUSABLE)]
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === node)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      unlockScroll()
      // Don't steal focus if another dialog has already taken it.
      const active = document.activeElement
      const focusIsFree = !active || active === document.body || node.contains(active)
      if (focusIsFree && previouslyFocused?.isConnected) {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [ref])
}
