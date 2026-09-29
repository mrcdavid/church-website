# Harvesters Baptist Church Calamba — Website

Static website for Harvesters Baptist Church Calamba — *Faith, Family, Friends*.
An Old King James Version (KJV) Bible church. Built with React, Vite, Tailwind CSS, and Motion.
Supports light and dark mode.

## Run it locally

Requires **Node.js 20.19+ or 22.12+**.

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

## Build for hosting

```bash
cd frontend
npm run build
```

Upload the contents of `frontend/dist/` to any static host. Configure the host to serve `index.html` for
all paths (see *Deployment* in [CLAUDE.md](CLAUDE.md)).

## Updating content

Almost everything on the site is edited in two files, with no component changes needed:

- `frontend/src/data/siteData.js`: church info, service times, ministries, events, YouTube videos, stats, gallery
- `frontend/src/data/history.js`: the History page timeline

Photos live in `frontend/src/assets/`.

## More

See [CLAUDE.md](CLAUDE.md) for the full architecture, design system (colors, dark mode, animations), and
conventions, including the **Security** section. The `backend/` folder is a secured events API that the
website doesn't use yet (see [backend/README.md](backend/README.md)).
