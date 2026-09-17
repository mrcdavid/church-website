import SectionHeading from '../components/SectionHeading.jsx'
import { ministries } from '../data/siteData.js'

export default function Ministries() {
  return (
    <div>
      <section className="bg-softblue/60 py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get Involved"
            title="Ministries & Groups"
            description="Wherever you are in life, there's a group here for you. Reach out if you'd like to visit one."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((m) => (
            <article key={m.title} className="rounded-2xl overflow-hidden bg-white border border-softblue/70 hover:shadow-lg transition-shadow">
              <img src={m.image} alt={m.title} className="h-48 w-full object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-deepblue">{m.title}</h3>
                <p className="text-xs text-green font-semibold mt-1 uppercase tracking-wide">{m.ages}</p>
                <p className="mt-3 text-sm text-ink/70 leading-relaxed">{m.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
