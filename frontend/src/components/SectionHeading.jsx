import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, description, align = 'left', tone = 'default', className = '' }) {
  const centered = align === 'center'
  const onDark = tone === 'dark'

  return (
    <Reveal className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${onDark ? 'text-clay-300' : ''}`}>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
          {eyebrow}
          {centered && <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />}
        </p>
      )}
      <h2
        className={`mt-4 text-balance font-display text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${
          onDark ? 'text-linen' : 'text-heading'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${onDark ? 'text-linen/75' : 'text-muted'}`}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
