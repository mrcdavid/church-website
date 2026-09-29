import { Link } from 'react-router-dom'
import { Compass, House } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { heroImages, navLinks } from '../data/siteData.js'

export default function NotFound() {
  usePageTitle('Page not found')

  return (
    <>
      <PageHero
        eyebrow="404"
        icon={Compass}
        title="This page wandered off"
        description="The page you’re looking for doesn’t exist or has moved. Let’s get you back on the path."
        image={heroImages.home}
      >
        <Link to="/" className="btn btn-accent mt-8">
          <House className="h-5 w-5" aria-hidden="true" />
          Back to home
        </Link>
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
        </div>
      </section>
    </>
  )
}
