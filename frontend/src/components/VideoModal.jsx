import { ExternalLink } from 'lucide-react'
import Modal from './Modal.jsx'
import { formatDate } from '../lib/dates.js'
import { youtubeEmbed, youtubeWatch } from '../lib/links.js'
import { useLatest } from '../hooks/useLatest.js'

export default function VideoModal({ video: selected, onClose }) {
  const video = useLatest(selected)
  return (
    <Modal open={Boolean(selected)} onClose={onClose} title={video?.title ?? 'Video'} size="xl" variant="media">
      {video && (
        <>
          <div className="aspect-video w-full bg-black">
            <iframe
              src={youtubeEmbed(video.id)}
              title={video.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              // Sandboxed: the player can't navigate or redirect this page.
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="font-display text-xl font-semibold sm:text-2xl">{video.title}</h2>
              <p className="text-sm text-linen/60">{formatDate(video.date, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <a href={youtubeWatch(video.id)} target="_blank" rel="noreferrer" className="btn btn-glass shrink-0 px-5 py-2.5 text-sm">
              Open on YouTube
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </>
      )}
    </Modal>
  )
}
