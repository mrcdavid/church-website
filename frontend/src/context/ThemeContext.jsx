import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// The initial theme is applied by the inline script in index.html (before
// React loads) — this context just reads it and keeps it in sync.
const STORAGE_KEY = 'hbc-theme'
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

function readSaved() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  // Follow the OS setting until the visitor picks a theme themselves.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      if (readSaved()) return
      const next = e.matches ? 'dark' : 'light'
      applyTheme(next)
      setTheme(next)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private mode — theme still switches for this visit */
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(() => applyTheme(next))
    } else {
      applyTheme(next)
    }
    setTheme(next)
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
