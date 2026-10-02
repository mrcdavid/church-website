import { Component, useEffect } from 'react'
import { church } from '../data/siteData.js'

/**
 * Catches errors thrown while rendering its children and shows `fallback`
 * instead of a blank screen. React only supports this with a class component,
 * so this is the one exception to the "function components only" convention.
 * `fallback` can be an element or a function receiving the error.
 */
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Page failed to render:', error, info.componentStack)
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children
    const { fallback } = this.props
    return typeof fallback === 'function' ? fallback(error) : fallback
  }
}

// Last-resort screen if the whole app (navbar included) fails. Plain markup
// only, with no router or animation, so it works even when those are broken.
export function FatalError() {
  useEffect(() => {
    document.title = `Something went wrong · ${church.name}`
  }, [])

  return (
    <main className="grid min-h-screen place-items-center bg-bg px-6 text-center text-fg">
      <div className="max-w-md">
        <p className="eyebrow justify-center">Unexpected error</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-heading">Something went wrong</h1>
        <p className="mt-3 text-muted">
          The site couldn’t load properly. It’s not something you did. Please try again in a moment.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => window.location.reload()} className="btn btn-primary">
            Try again
          </button>
          <a href="/" className="btn btn-outline">
            Back to home
          </a>
        </div>
      </div>
    </main>
  )
}
