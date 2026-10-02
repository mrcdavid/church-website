import { useEffect } from 'react'

// Asks search engines not to index the current page. Used on error pages,
// which share the site's HTML and would otherwise look like real content.
export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.append(meta)
    return () => meta.remove()
  }, [])
}
