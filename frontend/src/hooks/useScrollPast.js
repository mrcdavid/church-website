import { useEffect, useState } from 'react'

// true once the page has scrolled more than `threshold` pixels.
export function useScrollPast(threshold) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return past
}
