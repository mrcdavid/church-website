import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Compass, House, Lightbulb, MessageCircleWarning } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { useNoIndex } from '../hooks/useNoIndex.js'
import { heroImages, navLinks } from '../data/siteData.js'

const MAX_SHOWN = 80

// Any URL that isn't a real page: mistyped, outdated, or tampered with.
// On the live site the host also returns HTTP status 404 for these (see vite.config.js).
export default function NotFound() {
  usePageTitle('Page not found (404)')
  useNoIndex()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const canGoBack = (window.history.state?.idx ?? 0) > 0
  const suggestion = suggestPage(pathname)
  // React shows this as plain text, so even a crafted URL can't inject anything.
  const shownPath = pathname.length > MAX_SHOWN ? `${pathname.slice(0, MAX_SHOWN - 1)}…` : pathname
  const reportLink = `/contact?subject=${encodeURIComponent(`Broken link: ${shownPath}`)}`

  return (
    <>
      <PageHero
        eyebrow="Error 404 · Page not found"
        icon={Compass}
        title="This page wandered off"
        description="The link may be mistyped, outdated, or changed. Let’s get you back on the path."
        image={heroImages.home}
        watermark="404"
      >
        <p className="mt-6 flex max-w-full flex-wrap items-baseline gap-x-2 gap-y-1 rounded-2xl border border-linen/20 bg-charcoal/40 px-4 py-2.5 text-sm text-linen/85 backdrop-blur sm:inline-flex">
          <span className="font-semibold text-clay-300">You tried:</span>
          <code className="break-all font-mono">{shownPath}</code>
        </p>
        {suggestion && (
          <p className="mt-4 flex items-center gap-2 text-linen/90">
            <Lightbulb className="h-5 w-5 shrink-0 text-clay-300" aria-hidden="true" />
            <span>
              Did you mean{' '}
              <Link to={suggestion.to} className="font-semibold text-clay-200 underline underline-offset-4 hover:text-linen">
                {suggestion.label}
              </Link>
              ?
            </span>
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn btn-accent">
            <House className="h-5 w-5" aria-hidden="true" />
            Back to home
          </Link>
          {canGoBack && (
            <button type="button" onClick={() => navigate(-1)} className="btn btn-glass">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              Go back
            </button>
          )}
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page">
          <h2 className="text-center font-display text-2xl font-semibold text-heading">Where would you like to go?</h2>
          <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
            {navLinks.map(({ label, to, icon: Icon }, i) => (
              <Reveal as="li" key={to} delay={i * 0.05}>
                <Link
                  to={to}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 font-semibold text-fg shadow-soft transition hover:-translate-y-1 hover:border-primary hover:text-primary"
                >
                  <Icon className="h-5 w-5 text-clay" aria-hidden="true" />
                  {label}
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 rounded-3xl bg-surface-alt p-6 text-center sm:flex-row sm:text-left">
            <MessageCircleWarning className="h-8 w-8 shrink-0 text-clay" aria-hidden="true" />
            <p className="flex-1 text-sm text-muted">
              Followed a link from somewhere else? Let us know so we can fix it.
            </p>
            <Link to={reportLink} className="btn btn-outline shrink-0 px-5 py-2.5 text-sm">
              Report a broken link
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

// Suggests a page when the first part of the URL is a near-miss:
// /abuot → About, /About → About, /ministries/xyz → Ministries.
function suggestPage(pathname) {
  const first = safeDecode(pathname).toLowerCase().split('/').filter(Boolean)[0]?.slice(0, 40)
  if (!first) return null
  let best = null
  for (const link of navLinks) {
    if (link.to === '/') continue
    const distance = editDistance(first, link.to.slice(1))
    if (distance <= 2 && (!best || distance < best.distance)) best = { ...link, distance }
  }
  return best
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value // malformed %-encoding in a tampered link
  }
}

function editDistance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    let diagonal = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const above = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1))
      diagonal = above
    }
  }
  return row[b.length]
}
