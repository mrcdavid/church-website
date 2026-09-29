import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Content-Security-Policy for production builds. It is added as a <meta> tag so
// it works on any static host: only this site's own scripts (plus the hashed
// inline theme script) may run, and only the listed services may be embedded.
function contentSecurityPolicy() {
  const policy = (scriptHashes) =>
    [
      "default-src 'self'",
      `script-src 'self' ${scriptHashes.map((h) => `'${h}'`).join(' ')}`,
      "style-src 'self' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://i.ytimg.com",
      'frame-src https://www.youtube-nocookie.com https://www.google.com https://maps.google.com',
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; ')

  return {
    name: 'content-security-policy',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
        const hashes = inlineScripts.map(
          ([, code]) => `sha256-${createHash('sha256').update(code).digest('base64')}`,
        )
        return [
          {
            tag: 'meta',
            attrs: { 'http-equiv': 'Content-Security-Policy', content: policy(hashes) },
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}

// Serve the same headers as production (public/_headers) from `npm run preview`.
function hostHeaders() {
  const lines = readFileSync(new URL('./public/_headers', import.meta.url), 'utf8').split(/\r?\n/)
  return Object.fromEntries(
    lines
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && !line.startsWith('/'))
      .map((line) => [line.slice(0, line.indexOf(':')).trim(), line.slice(line.indexOf(':') + 1).trim()]),
  )
}

export default defineConfig({
  plugins: [react(), contentSecurityPolicy()],
  server: {
    port: 5173,
  },
  preview: {
    headers: hostHeaders(),
  },
})
