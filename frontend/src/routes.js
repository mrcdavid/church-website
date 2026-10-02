// Every page URL the site serves. App.jsx builds its routes from this list, and
// vite.config.js uses it to tell the host which URLs are real pages, so that
// everything else returns a genuine HTTP 404. Add new pages here.
// (No imports: Node reads this file at build time.)
export const pagePaths = ['/', '/about', '/history', '/ministries', '/events', '/watch', '/contact']

// Old or alternate URLs → where they live now (served as 301 redirects).
export const redirects = {
  '/sermons': '/watch',
  '/index.html': '/',
}
