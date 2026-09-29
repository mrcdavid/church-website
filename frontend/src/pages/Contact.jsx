import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CalendarHeart, CircleCheck, Mail, MapPin, MessageCircleHeart, Phone, Send } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import Modal from '../components/Modal.jsx'
import { YoutubeIcon } from '../components/icons.jsx'
import { usePlanVisit } from '../context/PlanVisitContext.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { directionsUrl, mailUrl, telUrl } from '../lib/links.js'
import { LIMITS, buildMailto, cleanLine } from '../lib/sanitize.js'
import { church, heroImages, serviceTimes } from '../data/siteData.js'

const methods = [
  { icon: MapPin, title: 'Visit us', value: church.address, action: 'Get directions', href: directionsUrl, external: true },
  { icon: Phone, title: 'Call or text', value: church.phone, action: 'Call now', href: telUrl },
  { icon: Mail, title: 'Email us', value: church.email, action: 'Send an email', href: mailUrl },
  { icon: YoutubeIcon, title: 'Watch online', value: '@HBCalamba1152', action: 'Open channel', href: church.youtubeUrl, external: true },
]

const emptyForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  usePageTitle('Contact')
  const [params] = useSearchParams()
  const [form, setForm] = useState(() => ({ ...emptyForm, subject: cleanLine(params.get('subject'), LIMITS.subject) }))
  const [sent, setSent] = useState(false)
  const { openPlanVisit } = usePlanVisit()

  // Links like /contact?subject=Joining%20Youth prefill the subject line.
  // Anyone can craft such a link, so the value is cleaned to one short line.
  useEffect(() => {
    const subject = cleanLine(params.get('subject'), LIMITS.subject)
    if (subject) setForm((f) => ({ ...f, subject }))
  }, [params])

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  // This is a static site with no server, so the form opens the visitor's
  // email app with the message ready to send to the church.
  function handleSubmit(e) {
    e.preventDefault()
    const subject = cleanLine(form.subject, LIMITS.subject) || 'Message from the church website'
    const name = cleanLine(form.name, LIMITS.name)
    const email = cleanLine(form.email, LIMITS.email)
    const body = `${form.message.trim().slice(0, LIMITS.message)}\n\n— ${name}${email ? ` (${email})` : ''}`
    window.location.href = buildMailto(church.email, subject, body)
    setSent(true)
  }

  function closeSent() {
    setSent(false)
    setForm(emptyForm)
  }

  return (
    <>
      <PageHero
        eyebrow="We’d Love to Hear From You"
        icon={MessageCircleHeart}
        title="Contact Us"
        description="Have a question, prayer request, or just want to say hi? Reach out below."
        image={heroImages.contact}
      />

      {/* Ways to reach us */}
      <section className="pt-12 sm:pt-16">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map(({ icon: Icon, title, value, action, href, external }, i) => (
            <Reveal key={title} delay={i * 0.08} className="h-full">
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex h-full flex-col rounded-3xl border border-line/70 bg-surface p-6 shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-on-primary transition-transform duration-500 ease-smooth group-hover:-rotate-6">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-lg font-semibold text-heading">{title}</h2>
                <p className="mt-1 flex-1 break-words text-sm text-muted">{value}</p>
                <span className="mt-4 text-sm font-semibold text-accent">{action} →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + schedule */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeading eyebrow="Send a message" title="How can we help?" />
            <Reveal delay={0.1}>
              <form onSubmit={handleSubmit} className="card mt-8 space-y-5 p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" value={form.name} onChange={update} placeholder="Juan Dela Cruz" maxLength={LIMITS.name} required />
                  <Field label="Email address" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" maxLength={LIMITS.email} />
                </div>
                <Field label="Subject" name="subject" value={form.subject} onChange={update} placeholder="I’d like to plan a visit" maxLength={LIMITS.subject} />
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-fg">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={LIMITS.message}
                    value={form.message}
                    onChange={update}
                    placeholder="How can we help?"
                    className="field resize-none"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted">Opens your email app with your message ready to send.</p>
                  <button type="submit" className="btn btn-primary">
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send Message
                  </button>
                </div>
              </form>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:col-span-2 lg:pt-24">
            <Reveal direction="left" className="card p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold text-heading">Service Times</h2>
              <ul className="mt-5 space-y-4">
                {serviceTimes.map(({ day, name, time, icon: Icon }) => (
                  <li key={name} className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sage/25 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-fg">{name}</span>
                      <span className="text-sm text-muted">{day}</span>
                    </span>
                    <span className="font-display text-lg font-semibold text-heading">{time}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal direction="left" delay={0.1} className="rounded-3xl bg-forest-900 p-6 text-linen shadow-lift sm:p-7">
              <h2 className="font-display text-xl font-semibold">First time visiting?</h2>
              <p className="mt-2 text-sm text-linen/75">See what to expect and when to come before your first Sunday.</p>
              <button type="button" onClick={openPlanVisit} className="btn btn-accent mt-5">
                <CalendarHeart className="h-4 w-4" aria-hidden="true" />
                Plan your visit
              </button>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20 sm:pb-24 lg:pb-28">
        <div className="container-page">
          <SectionHeading eyebrow="Find us" title="Our location" description={church.address} />
          <Reveal className="mt-10">
            <MapEmbed className="h-[24rem] sm:h-[30rem]" />
          </Reveal>
        </div>
      </section>

      <Modal open={sent} onClose={closeSent} title="Message ready to send" size="sm">
        <div className="p-8 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage/30 text-primary">
            <CircleCheck className="h-8 w-8" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-semibold text-heading">Almost there!</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Your email app should have opened with your message ready — just press <strong>Send</strong>. If nothing
            opened, email us directly at{' '}
            <a href={mailUrl} className="break-all font-semibold text-accent underline underline-offset-2">
              {church.email}
            </a>
            .
          </p>
          <button type="button" onClick={closeSent} className="btn btn-primary mt-7 w-full">
            Done
          </button>
        </div>
      </Modal>
    </>
  )
}

function Field({ label, name, type = 'text', ...props }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-fg">
        {label}
      </label>
      <input id={name} name={name} type={type} className="field" {...props} />
    </div>
  )
}
