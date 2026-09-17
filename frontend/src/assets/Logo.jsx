// Simple mark: a rounded arch with a cross cut-out, built entirely in code
// (no binary asset needed) so it always matches the theme colors.
export default function Logo({ className = 'h-10 w-10', variant = 'color' }) {
  const fill = variant === 'light' ? '#FAF9F4' : '#4F7CAC'
  const accent = variant === 'light' ? '#FAF9F4' : '#6FA58A'

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Grace Community Church logo"
    >
      <path
        d="M24 2C13 2 8 12 8 22v22h32V22C40 12 35 2 24 2Z"
        fill={fill}
      />
      <rect x="21" y="12" width="6" height="24" rx="1.5" fill={accent} opacity="0.9" />
      <rect x="12" y="19" width="24" height="6" rx="1.5" fill={accent} opacity="0.9" />
    </svg>
  )
}
