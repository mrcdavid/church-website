import { useState } from 'react'

// Returns `value`, or the last non-null value it had. Lets a modal keep showing
// its content while it animates closed after the selection is cleared.
export function useLatest(value) {
  const [last, setLast] = useState(value)
  if (value != null && value !== last) setLast(value)
  return value ?? last
}
