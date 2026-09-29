import { church } from '../data/siteData.js'

const place = encodeURIComponent(church.mapQuery)

// Google Maps — keyless embed + a directions link that opens the Maps app on phones.
export const mapEmbedUrl = `https://maps.google.com/maps?q=${place}&z=16&output=embed`
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place}`

export const telUrl = `tel:${church.phone.replace(/\s+/g, '')}`
export const mailUrl = `mailto:${church.email}`

// YouTube
export const youtubeThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
export const youtubeEmbed = (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
export const youtubeWatch = (id) => `https://www.youtube.com/watch?v=${id}`
// A channel's "uploads" playlist id is its channel id with UC → UU, so this
// player always shows the newest videos without any code changes.
export const latestUploadsEmbed = `https://www.youtube-nocookie.com/embed/videoseries?list=UU${church.youtubeChannelId.slice(2)}&rel=0`
