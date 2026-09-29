// Dates in siteData are 'YYYY-MM-DD' strings. Parse them as *local* dates —
// `new Date('2026-10-04')` would be UTC midnight and can show the wrong day.
export function parseDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatDate(iso, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
  return new Intl.DateTimeFormat('en-US', options).format(parseDate(iso))
}

export function upcomingEvents(events, today = new Date()) {
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return events
    .filter((e) => parseDate(e.date) >= startOfToday)
    .sort((a, b) => parseDate(a.date) - parseDate(b.date))
}
