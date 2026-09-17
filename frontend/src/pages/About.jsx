import SectionHeading from '../components/SectionHeading.jsx'
import { aboutStory, beliefs, staff } from '../data/siteData.js'

export default function About() {
  return (
    <div>
      <section className="bg-softblue/60 py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Story"
            title="About Harvesters Baptist Church Calamba"
            description="14 years of showing up for our neighbors, one Sunday at a time."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <img
            src={aboutStory.image}
            alt="Church community gathered together"
            className="rounded-2xl w-full h-72 sm:h-96 object-cover"
          />
          <div className="space-y-4">
            {aboutStory.paragraphs.map((p, i) => (
              <p key={i} className="text-base sm:text-lg text-ink/75 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-softgreen/50 py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What We Believe" align="center" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beliefs.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white p-6 border border-softblue/70">
                <h3 className="font-serif text-lg font-semibold text-deepblue">{b.title}</h3>
                <p className="mt-2 text-sm text-ink/70 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Meet the Team" title="Our pastors & staff" align="center" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {staff.map((person) => (
              <div key={person.name} className="text-center">
                <img
                  src={person.image}
                  alt={person.name}
                  className="mx-auto h-32 w-32 sm:h-36 sm:w-36 rounded-full object-cover border-4 border-softblue"
                />
                <h3 className="mt-4 font-serif text-lg font-semibold text-deepblue">{person.name}</h3>
                <p className="text-sm text-green font-medium">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
