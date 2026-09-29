import { Navigation } from 'lucide-react'
import { church } from '../data/siteData.js'
import { directionsUrl, mapEmbedUrl } from '../lib/links.js'

export default function MapEmbed({ className = 'h-80 sm:h-96' }) {
  return (
    <div className={`map-embed relative overflow-hidden rounded-3xl border border-line bg-surface-alt shadow-soft ${className}`}>
      <iframe
        title={`Map to ${church.name}`}
        src={mapEmbedUrl}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        // Sandboxed: the map can't navigate or redirect this page.
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        allowFullScreen
      />
      <a
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary absolute bottom-4 right-4 px-5 py-2.5 text-sm"
      >
        <Navigation className="h-4 w-4" aria-hidden="true" />
        Get directions
      </a>
    </div>
  )
}
