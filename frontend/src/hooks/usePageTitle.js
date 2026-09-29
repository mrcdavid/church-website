import { useEffect } from 'react'
import { church } from '../data/siteData.js'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${church.name}` : church.name
  }, [title])
}
