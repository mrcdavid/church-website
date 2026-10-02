import { Link } from 'react-router-dom'
import { House, RotateCw, TriangleAlert } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { useNoIndex } from '../hooks/useNoIndex.js'
import { heroImages } from '../data/siteData.js'

// Shown in place of a page that crashed while rendering (see ErrorBoundary in App.jsx).
// The navbar and footer keep working, so visitors can carry on browsing.
export default function ErrorPage({ error }) {
  usePageTitle('Something went wrong')
  useNoIndex()

  return (
    <PageHero
      eyebrow="Unexpected error"
      icon={TriangleAlert}
      title="Something went wrong"
      description="This page ran into a problem while loading. It’s not something you did. Please try again, or head back home."
      image={heroImages.home}
      watermark="!"
    >
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => window.location.reload()} className="btn btn-accent">
          <RotateCw className="h-5 w-5" aria-hidden="true" />
          Try again
        </button>
        <Link to="/" className="btn btn-glass">
          <House className="h-5 w-5" aria-hidden="true" />
          Back to home
        </Link>
      </div>
      {/* Technical details for developers only; never shown on the live site. */}
      {import.meta.env.DEV && error && (
        <pre className="mt-8 max-h-40 overflow-auto rounded-2xl bg-charcoal/60 p-4 text-xs text-linen/80">{String(error.stack || error)}</pre>
      )}
    </PageHero>
  )
}
