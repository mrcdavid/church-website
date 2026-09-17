import SectionHeading from '../components/SectionHeading.jsx'
import SermonCard from '../components/SermonCard.jsx'
import { sermons } from '../data/siteData.js'

export default function Sermons() {
  return (
    <div>
      <section className="bg-softblue/60 py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Watch & Listen"
            title="Sermon Archive"
            description="Missed a Sunday, or want to revisit a message? Catch up here."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((s) => (
            <SermonCard key={s.title} sermon={s} />
          ))}
        </div>
      </section>
    </div>
  )
}
