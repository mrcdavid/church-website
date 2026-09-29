// Church mark: an arch with a cross, drawn in code so it follows the theme.
// The arch uses `currentColor` — set it with a text color class.
export default function Logo({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M24 2C13 2 8 12 8 22v22h32V22C40 12 35 2 24 2Z" fill="currentColor" />
      <rect x="21" y="12" width="6" height="24" rx="1.5" fill="#C07A4F" />
      <rect x="12" y="19" width="24" height="6" rx="1.5" fill="#C07A4F" />
    </svg>
  )
}
