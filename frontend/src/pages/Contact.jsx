import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import { church, serviceTimes } from '../data/siteData.js'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  // NOTE: this is a static frontend-only form. When the FastAPI backend
  // (see /backend) is wired up, replace handleSubmit with a POST to
  // e.g. POST /api/contact and swap this stub for a real network call.
  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <section className="bg-softblue/60 py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="We'd Love to Hear From You"
            title="Contact Us"
            description="Have a question, prayer request, or just want to say hi? Reach out below."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="rounded-2xl bg-softgreen/60 border border-green/30 p-8 text-center">
                <h3 className="font-serif text-xl font-semibold text-deepblue">Message sent!</h3>
                <p className="mt-2 text-sm text-ink/70">
                  Thanks for reaching out — our team will get back to you within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-softblue bg-white px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="Juan Dela Cruz"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-softblue bg-white px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-ink mb-1.5">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="w-full rounded-lg border border-softblue bg-white px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder="I'd like to plan a visit"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-lg border border-softblue bg-white px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-full bg-primary px-8 py-3 font-semibold text-white hover:bg-deepblue transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="rounded-2xl bg-softblue/50 p-6">
              <h3 className="font-serif text-lg font-semibold text-deepblue">Visit In Person</h3>
              <p className="mt-2 text-sm text-ink/70">{church.address}</p>
              <p className="mt-1 text-sm text-ink/70">{church.phone}</p>
              <p className="mt-1 text-sm text-ink/70">{church.email}</p>
            </div>

            <div className="rounded-2xl bg-softgreen/50 p-6">
              <h3 className="font-serif text-lg font-semibold text-deepblue">Service Times</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink/70">
                {serviceTimes.map((s) => (
                  <li key={s.name} className="flex justify-between">
                    <span>{s.day} · {s.name}</span>
                    <span className="text-ink/50">{s.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-softblue/70 h-56 bg-softblue/40 flex items-center justify-center text-ink/40 text-sm">
              Map placeholder — embed Google Maps iframe here
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
