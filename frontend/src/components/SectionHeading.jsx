export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignClasses}`}>
      {eyebrow && (
        <p className="text-sm font-semibold text-green tracking-wide mb-2">{eyebrow}</p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deepblue">{title}</h2>
      {description && (
        <p className="mt-3 text-base sm:text-lg text-ink/70 leading-relaxed">{description}</p>
      )}
    </div>
  )
}
