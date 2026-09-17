# Grace Community Church — Website

A full project scaffold for a church website.

```
church-website/
├── frontend/     ← React + Tailwind (built now, fully working)
└── backend/      ← FastAPI + PostgreSQL (scaffolded for later, not wired up yet)
```

## Frontend (ready to run)

```bash
cd frontend
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
```

This is a **static** site: all content (service times, staff, events, sermons)
lives in plain JS data files under `src/data/`, so you can edit copy without
touching component code. Every photo is a placeholder from picsum.photos —
swap the URLs in `src/data/*.js` for real photos whenever you have them.

## Backend (scaffold only — for later)

The `backend/` folder is a skeleton FastAPI + PostgreSQL project so the same
structure can grow into a real API (dynamic events, sermon uploads, a contact
form that emails the office, etc.) without a rewrite. It is **not connected
to the frontend yet** — see `backend/README.md`.

## Color theme

| Name        | Hex       | Tailwind key      |
|-------------|-----------|--------------------|
| Primary Blue| `#4F7CAC` | `primary`          |
| Soft Blue   | `#DCEAF5` | `softblue`         |
| Deep Blue   | `#315A7D` | `deepblue`         |
| Primary Green| `#6FA58A`| `green`            |
| Soft Green  | `#DDEDE5` | `softgreen`        |
| Cream       | `#FAF9F4` | `cream`            |
| Text        | `#263238` | `ink`              |

All defined in `frontend/tailwind.config.js`.
