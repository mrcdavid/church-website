# CLAUDE.md — Harvesters Baptist Church Calamba website

Guidance for Claude (and any developer) working in this repository.

## Purpose

A **static, content-first website** for Harvesters Baptist Church Calamba
(South Spring Villas, Bucal, Calamba, Laguna). Its goals:

1. **Present the church as it is today:** who we are, service times, ministries, team, upcoming events.
2. **Show how it has grown:** the History page timeline, "years of ministry" counters, photo gallery.
3. **Say clearly that the church uses the Old King James Version (KJV) Bible.** This is highlighted on Home and About and mentioned in the hero, footer, Plan a Visit modal, and Watch page.
4. **Help people visit and connect:** "Plan a Visit" modal, Google Maps location and directions, contact form.
5. **Point people to preaching and special numbers** on YouTube: <https://www.youtube.com/@HBCalamba1152/videos>.

The audience is church members, first-time visitors, and family and friends, many of them **on phones**.
Mobile layout, fast loading, and simple language matter more than clever features.

## System requirements

| Requirement | Version |
|---|---|
| Node.js | 20.19+ or 22.12+ (required by Vite 7; developed on Node 22) |
| npm | 10 or newer |
| Python (backend only) | 3.10 or newer (tested on 3.14) |
| Browsers | Current Chrome, Edge, Safari, Firefox (desktop and mobile) |
| Hosting | Any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, shared hosting) |

The website needs no database, server, or API keys. The site needs internet access at runtime only for
Google Fonts, the YouTube embeds and thumbnails, and the Google Maps embed.

## Commands

All commands run from `frontend/`:

```bash
npm install        # first time only
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → frontend/dist/
npm run preview    # serve the production build locally
```

The frontend has no unit tests or linter. **Always run `npm run build`** after changes to catch errors, and
`npm audit` after changing dependencies. Backend tests live in `backend/tests/` (`pytest`, see `backend/README.md`).

## Tech stack

- **React 18** + **Vite 7**: single-page app
- **React Router 7** (`react-router-dom`, `BrowserRouter`): client-side routing
- **Tailwind CSS 3.4**: styling, with a CSS-variable theme for light and dark mode
- **motion** (`motion/react`, formerly Framer Motion): page transitions, scroll reveals, modals, counters
- **lucide-react**: icons (brand logos such as YouTube are hand-drawn in `components/icons.jsx`)
- Fonts: **Fraunces** (headings, `font-display`) + **Plus Jakarta Sans** (body), from Google Fonts

## Architecture

```
church-website/
├── CLAUDE.md                  ← this file
├── README.md                  ← short human quick-start
├── frontend/                  ← THE WEBSITE (everything live is here)
│   ├── index.html             ← <head>: fonts, meta tags, no-flash theme script
│   ├── vite.config.js         ← build config + Content-Security-Policy plugin
│   ├── tailwind.config.js     ← brand palette + semantic color tokens
│   ├── public/_headers        ← security headers for the host (see "Security")
│   ├── public/images/         ← favicon.png (tab icon) + apple-touch-icon.png, made from the church logo
│   └── src/
│       ├── main.jsx           ← mounts <App> inside <BrowserRouter>
│       ├── App.jsx            ← providers, layout, routes, page-transition wrapper, error boundary
│       ├── routes.js          ← the list of real page URLs (also drives the host's 404 rules)
│       ├── index.css          ← theme CSS variables (light/dark), base + component classes
│       ├── data/
│       │   ├── siteData.js    ← ✏️ ALL site content (church info, Bible version, services, ministries, events, videos, stats, gallery)
│       │   └── history.js     ← ✏️ History page content (milestones, anniversary theme, pastor feature)
│       ├── pages/             ← one file per route + NotFound (404) and ErrorPage (crash)
│       ├── components/        ← reusable UI (see below)
│       ├── context/           ← ThemeContext (light/dark), PlanVisitContext (global "Plan a Visit" modal)
│       ├── hooks/             ← useDialog, useLatest, useNoIndex, usePageTitle, useScrollPast
│       ├── lib/               ← dates.js (event dates), links.js (Maps/YouTube/tel/mailto URLs), sanitize.js (untrusted input), scrollLock.js
│       └── assets/            ← photos (hbc_*.jpg) + church-logo.png (the church logo)
└── backend/                   ← secured FastAPI events API + tests, NOT used by the site yet (see "Backend")
```

### Routes

| Path | Page | Notes |
|---|---|---|
| `/` | `Home.jsx` | Hero, service times, welcome, Old KJV highlight, growth stats, ministries, latest preaching, events, map, CTA |
| `/about` | `About.jsx` | Story, Old KJV highlight, mission, beliefs, team |
| `/history` | `History.jsx` | Anniversary intro, stats, scroll-drawn timeline, pastor feature, photo gallery |
| `/ministries` | `Ministries.jsx` | Category filter + ministry cards → detail modal |
| `/events` | `Events.jsx` | Weekly gatherings + upcoming events → detail modal (past events hide automatically) |
| `/watch` | `Watch.jsx` | Auto-updating "latest uploads" YouTube player + curated Preaching / Special Numbers tabs → video modal |
| `/contact` | `Contact.jsx` | Contact cards, form (opens the visitor's email app), service times, map. `?subject=` pre-fills the subject |
| `/sermons` | → `/watch` | Redirect for old links (`redirects` in `routes.js`) |
| `*` | `NotFound.jsx` | Any other URL: mistyped, outdated, or tampered. HTTP 404 on the live site (see "Error pages") |

Page URLs are listed once, in `src/routes.js`. App.jsx builds its routes from it, and the build turns it into the
host's rules. **To add a page:** add the path to `pagePaths`, add the component to `pages` in `App.jsx`, and add a
`navLinks` entry if it belongs in the menu. Routes are case-sensitive (`/About` is a 404).

### Key components

| Component | Role |
|---|---|
| `Logo` | The church logo (`assets/church-logo.png`, a white leaf with a cross) used as a CSS mask, so it takes the text color: cream over photos, forest/sage on the solid navbar. Size it with a height class (`h-10`) |
| `ErrorBoundary` | Shows a fallback instead of a blank screen when rendering crashes (`ErrorPage` per page, `FatalError` for the whole app) |
| `Navbar` | Fixed header. Transparent over the dark page banner, turns solid on scroll. Animated active pill, theme toggle, slide-in mobile drawer |
| `Footer` | Brand, links, service times, contact, directions |
| `PageHero` | Dark photo banner used at the top of every inner page (the navbar relies on this) |
| `Reveal` | Scroll-triggered entrance animation wrapper (`direction`: up/down/left/right/zoom/fade, `delay`) |
| `SectionHeading` | Eyebrow + title + description, with its own reveal (`align="center"`, `tone="dark"`) |
| `Modal` | Accessible animated dialog (portal, focus trap, Escape, scroll lock, bottom sheet on phones). `variant="media"` for video and photos |
| `PlanVisitModal` | Opened from anywhere via `usePlanVisit().openPlanVisit()` |
| `MinistryCard`/`MinistryModal`, `EventCard`/`EventModal`, `VideoCard`/`VideoModal` | Card → detail modal pairs |
| `Gallery` | Masonry grid + lightbox (arrow keys, swipe) |
| `StatCounter` | Count-up number when scrolled into view |
| `BibleHighlight` | "We use the Old King James Version" feature card (Home, About) |
| `ServiceTimes`, `MapEmbed`, `CtaBand`, `BackToTop`, `ThemeToggle` | As named |

## Editing content (the most common task)

**Content lives in `src/data/`, not in components.** To update the site, edit data rather than JSX.

- **Church info** (name, address, phone, email, founding year, YouTube, map search): `church` in `siteData.js`.
  "Years of ministry" everywhere is calculated from `church.foundedYear`.
- **Bible version:** `bible` in `siteData.js` (name, abbreviation, text, where it's used, featured verse).
  Every mention on the site reads from here. Quote Scripture in the KJV wording.
- **Service times:** `serviceTimes`. Each entry has a lucide `icon`.
- **Ministries:** `ministries`. `category` must be one of `ministryCategories` (it drives the filter chips).
- **Events:** `events`. `date` is `YYYY-MM-DD`. Past events disappear automatically and upcoming ones sort by date.
- **Videos:** `videos.preaching` / `videos.specialNumbers`. `id` is the `v=` value of a YouTube link. Newest first.
  The "Latest from our channel" player on `/watch` updates itself and needs no edits.
- **Stats** (the counters): `stats`. `church.youtubeVideoCount` should be bumped occasionally.
- **Gallery:** `gallery` (`src` + `caption`).
- **History timeline:** `milestones` in `history.js`. `period` is a year or a phrase, and `image` is optional.
- **Photos:** add to `src/assets/` with a descriptive `hbc_*.jpg` name, `import` in the data file, and reference it.
  Keep photos ≤ ~2000 px wide and ideally < 400 KB (they are served as-is, with no image optimizer).

### Content still to confirm with the church

- `events` in `siteData.js` are **sample events** (inherited from the original template). Replace them with real ones.
- `milestones` in `history.js` are a **starting outline** based on the About story. Real dates and details are needed.
- `church.foundedYear = 2012` is inferred from the "14 years" anniversary in 2026.
- Ministry descriptions for Children Ministry, Soul Winning, Choir, and Bible Study were written from their titles and should be reviewed.

## Design system

### Palette (brand)

| Name | Hex | Tailwind |
|---|---|---|
| Forest | `#3E4A3D` | `forest` (`forest-50…900`) |
| Sage | `#A3B18A` | `sage` |
| Linen | `#F2EDE4` | `linen` |
| Clay (terracotta) | `#C07A4F` | `clay` (`clay-500` = button shade) |
| Charcoal | `#1E1E1E` | `charcoal` |

### Semantic tokens (use these for anything that should follow the theme)

Defined as RGB channels in `src/index.css` (`:root` = light, `.dark` = dark) and mapped in `tailwind.config.js`:

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | linen | charcoal | page background |
| `surface` / `surface-alt` | near-white / sage tint | dark greens | cards / alternating sections |
| `fg` / `muted` | charcoal / grey-green | linen / warm grey | text |
| `heading` | forest | linen | headings |
| `primary` / `on-primary` | forest / linen | sage / charcoal | primary buttons, icons |
| `accent` | clay-600 | clay-300 | small accent text (AA contrast in both themes) |
| `line` | warm beige | dark green-grey | borders |

Rules:
- Use `bg-surface`, `text-muted`, `text-heading`, etc. Use raw brand shades (`bg-forest-900`, `text-linen`) only on
  surfaces that are dark in both themes (hero banners, footer, dark bands, media modals).
- White text on terracotta needs `clay-500` or darker (`#C07A4F` itself is 3.4:1 with white, which fails AA).
  Use `#C07A4F` for icons and decoration.
- Component classes in `index.css`: `container-page`, `section`, `eyebrow`, `card`, `btn` + `btn-primary | btn-accent | btn-outline | btn-glass`, `link-arrow`, `field`.

### Dark mode

`darkMode: 'class'`. The inline script in `index.html` sets `.dark` on `<html>` before first paint (saved choice in
`localStorage['hbc-theme']`, else the OS setting). `ThemeContext` keeps it in sync and the toggle cross-fades via
the View Transitions API when available. The Google Maps iframe gets a CSS filter in dark mode.

### Motion

- **Page transitions:** `AnimatePresence mode="wait"` in `App.jsx`. The old page fades out, the window jumps to
  the top (`onExitComplete`), and the new page fades in. The motion wrapper is keyed by `location.pathname`.
- **Scroll reveals:** wrap content in `<Reveal>` (or use `SectionHeading`, which reveals itself). Stagger grids with
  `delay={(i % cols) * 0.08}`. Animations run once.
- **Reduced motion:** `<MotionConfig reducedMotion="user">` plus a CSS `prefers-reduced-motion` block. Parallax
  and counters also check `useReducedMotion()`.
- The root layout uses `overflow-x-clip` so elements sliding in from the side never cause horizontal scrolling.

### Modals and overlays

- Build new modals on `components/Modal.jsx`. Pass `title` (the accessible name) and render the visible heading in children.
- For "select an item → show details" modals, pass the selected item and use `useLatest(item)` so the content stays
  visible during the close animation (see `EventModal`).
- `useDialog(ref, onClose)` handles focus trap, Escape, scroll lock, and focus restore for any overlay mounted only while open.
- Page scroll locking is reference-counted in `lib/scrollLock.js`. Never set `overflow` on `<html>`/`<body>` directly.

## External integrations

| Service | Where | Notes |
|---|---|---|
| YouTube | `lib/links.js`, `Watch.jsx`, `VideoModal.jsx` | Uses `youtube-nocookie.com` embeds. The uploads playlist is `UU` + channel id without its `UC` prefix |
| Google Maps | `lib/links.js`, `MapEmbed.jsx` | Keyless `output=embed` iframe + `maps/dir` directions link. Search text is `church.mapQuery` |
| Email | `Contact.jsx`, `lib/sanitize.js` | No backend. The form builds a `mailto:` link (`buildMailto`) to `church.email` with subject and body pre-filled |
| Google Fonts | `index.html` | Fraunces + Plus Jakarta Sans |

## Code conventions

- Function components, hooks, no class components. Default export per component file. (The only exception is
  `ErrorBoundary`, because React can only catch render errors in a class.)
- Import local files **with extensions** (`'./Modal.jsx'`, `'../lib/links.js'`).
- No semicolons, single quotes, 2-space indent, and trailing commas in multi-line literals (match the existing files).
- Style with Tailwind utilities. Put truly shared patterns in the `@layer components` block of `index.css`.
- Icons come from `lucide-react`. Decorative icons get `aria-hidden="true"`, and icon-only buttons need `aria-label`.
- Clickable cards use a real `<button>` in the title with `after:absolute after:inset-0` (stretched link), not a
  `div` with `onClick`.
- Every page calls `usePageTitle('Page name')` and starts with `<PageHero>` (or the Home hero).
- Keep copy in `data/`. Don't hard-code church facts inside components.

## Error pages

| Situation | What the visitor sees | HTTP status (live site) |
|---|---|---|
| Wrong, mistyped, outdated, or tampered URL | `NotFound.jsx`: "Error 404 · Page not found", the URL they tried (as plain text, shortened), a "Did you mean …?" suggestion for near-misses, Home / Go back buttons, quick links, "Report a broken link" | **404** |
| A page crashes while rendering | `ErrorPage.jsx`: "Unexpected error · Something went wrong" with Try again / Back to home. Navbar and footer keep working, and navigating away recovers | 200 (the page itself loaded) |
| The whole app crashes (e.g. the navbar) | `FatalError` in `ErrorBoundary.jsx`: plain fallback screen with Try again / Back to home | 200 |
| `/sermons` | Redirect to `/watch` | **301** |

Both error pages set a clear title ("Page not found (404)", "Something went wrong") and add
`<meta name="robots" content="noindex">` (`useNoIndex`) so search engines don't index them. Technical error
details are shown only in `npm run dev`, never on the live site.

How the real 404 status works: the build (`notFoundPages()` in `vite.config.js`) writes `dist/404.html` (a copy of
the app) and `dist/_redirects` (generated from `routes.js`: each real page → `/index.html` with 200). The host
serves `404.html` with status 404 for anything not listed. `npm run preview` follows the same rules, so check
status codes with `npm run build && npm run preview` and `curl -I http://localhost:4173/some-bad-link`.

## Security

The site is static, so the main risks are someone injecting content, framing the site (clickjacking), or
abusing links, embeds, and dependencies. Protections, all tested against the production build:

| Layer | What it does | Where |
|---|---|---|
| Content-Security-Policy | Only this site's scripts run (plus the inline theme script, allowed by its SHA-256 hash, computed at build). Only YouTube (`youtube-nocookie.com`), Google Maps, Google Fonts, and YouTube thumbnails may load. Blocks injected scripts, inline event handlers, and foreign iframes | `contentSecurityPolicy()` plugin in `vite.config.js` (a `<meta>` tag in production builds only) |
| Host headers | `frame-ancestors 'none'` + `X-Frame-Options: DENY` (no clickjacking), `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, HSTS | `public/_headers` (Netlify / Cloudflare Pages format; `npm run preview` serves them too) |
| Sandboxed embeds | YouTube and Maps iframes use `sandbox` without `allow-top-navigation`, so they can never redirect the page | `VideoModal.jsx`, `Watch.jsx`, `MapEmbed.jsx` |
| Untrusted input | `?subject=` and form fields are cleaned to one line, length-limited, and URL-encoded into the `mailto:` link (no extra recipients or headers) | `lib/sanitize.js`, `Contact.jsx` |
| New-tab links | Every `target="_blank"` has `rel="noreferrer"` (no reverse tabnabbing) | all external links |
| Dependencies | `npm audit` must report 0 vulnerabilities. No source maps are published | `package.json` |

Rules when changing things:
- **Adding a new embed or third-party resource** (another video host, analytics, a widget) means adding its
  origin to the CSP in `vite.config.js`. Test with `npm run build && npm run preview` and check the browser console
  for "Refused to…" errors. The CSP isn't applied in `npm run dev`.
- Never use `dangerouslySetInnerHTML`, `eval`, or inline `on…=` handlers. Treat URL parameters as untrusted.
- Keep `sandbox` on iframes. Never add `allow-top-navigation`.
- Nothing secret belongs in the frontend. Anything in `src/` or a `VITE_*` variable is public.
- **Other hosts:** Vercel needs these headers in `vercel.json` (`headers`), and Apache in `.htaccess` (`Header set`).
  GitHub Pages can't set headers, so clickjacking protection is unavailable there.

## Deployment

`npm run build` outputs static files to `frontend/dist/`, including `_headers`, `_redirects`, and `404.html`.
Routing is client-side, so the host must load the app for **real page URLs only** and return `404.html` with a
404 status for everything else. Don't use a catch-all "serve index.html for every path" rule: that turns every
bad link into a 200 ("soft 404").

- **Netlify / Cloudflare Pages:** works as-is (they read `_redirects`, `_headers`, and `404.html` automatically).
- **Vercel:** in `vercel.json`, add a rewrite to `/index.html` for each path in `routes.js` (not `/(.*)`), plus the
  headers from `_headers`. Vercel serves `404.html` for the rest.
- **Apache:** `.htaccess` with a `RewriteRule` per page path to `/index.html`, `ErrorDocument 404 /404.html`, and
  `Header set` lines from `_headers`.
- **GitHub Pages:** serves `404.html` for missing paths, but with status 404 even for real pages like `/history`
  (they still display correctly). It also can't set security headers, so prefer another host.

## Backend (secured, not yet connected)

`backend/` is a FastAPI + SQLAlchemy events API (PostgreSQL in production, SQLite in development). The website
does **not** call it yet. Leave it alone unless the task is about the backend. See `backend/README.md` for its
full security model. The essentials:

- **Reads are public. Writes (POST/PATCH/DELETE) require `Authorization: Bearer <ADMIN_API_TOKEN>`.** With no token
  configured, writes are disabled.
- Settings come only from environment variables (`app/config.py`, see `.env.example`), with secure defaults.
  Production refuses to start without `DATABASE_URL` and `ALLOWED_HOSTS`. No credentials in code.
- Strict schemas (`extra="forbid"`, plain-text only, safe URLs), rate limits, body-size limit, trusted hosts,
  locked-down CORS, security headers, docs off in production, generic error messages.
- Run `pytest` (97 attacker-style tests) and `pip-audit -r requirements.txt` after any backend change. Any new
  write endpoint must use `dependencies=[Depends(require_admin)]` and get tests in
  `tests/test_unauthorized_changes.py`.

## Don'ts

- Don't add a backend dependency to the frontend. The site must stay deployable as plain static files.
- Don't use raw hex colors in components. Use brand or semantic Tailwind tokens.
- Don't invent church facts (dates, names, numbers) in copy. Mark unknowns clearly for the church to confirm.
- Don't commit `node_modules/`, `dist/`, `.env` files, or `backend/*.db`.
- Don't add a catch-all `/* /index.html 200` rewrite; it hides real 404s. List pages in `routes.js` instead.
- Don't weaken the CSP, `_headers`, iframe sandboxes, or backend auth to "make something work". Add the specific allowance instead.
