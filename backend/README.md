# Backend API (not yet used by the website)

FastAPI + SQLAlchemy API for admin-managed church events. The React site does
not call it yet. It is ready for when events should be edited without redeploying.

```
backend/
├── app/
│   ├── main.py            # create_app(): middleware, error handling, routes
│   ├── config.py          # settings from environment variables (secure defaults)
│   ├── security.py        # admin-token auth, security headers, rate limit, body size limit
│   ├── database.py        # engine/session factory (URL from settings)
│   ├── models/event.py    # Event table
│   ├── schemas/event.py   # strict input validation
│   └── routers/events.py  # /api/events endpoints
├── tests/                 # attacker-style security tests (pytest)
├── requirements.txt       # runtime dependencies (pinned)
├── requirements-dev.txt   # + pytest, httpx2, pip-audit
└── .env.example
```

## Requirements

Python 3.10+ (tested on 3.14). PostgreSQL in production; SQLite is used automatically in development.

## Run locally

```bash
cd backend
python -m venv venv
venv\Scripts\activate            # macOS/Linux: source venv/bin/activate
pip install -r requirements-dev.txt
copy .env.example .env           # macOS/Linux: cp .env.example .env
uvicorn app.main:app --reload --no-server-header
```

## Endpoints

| Method | Path | Access |
|---|---|---|
| GET | `/api/health` | public |
| GET | `/api/events?limit=50&offset=0` | public |
| GET | `/api/events/{id}` | public |
| POST | `/api/events` | admin token |
| PATCH | `/api/events/{id}` | admin token |
| DELETE | `/api/events/{id}` | admin token |

Admin requests send `Authorization: Bearer <ADMIN_API_TOKEN>`.

## Security model

| Threat | Protection |
|---|---|
| Outsiders creating, editing or deleting data | Every write endpoint requires the admin token (constant-time comparison). With no token configured, writes are disabled entirely (403). |
| Guessing the token | Token must be 32+ characters, and write requests are rate-limited (10/min per IP by default). |
| Injected columns / mass assignment | Unknown fields (e.g. `id`) are rejected with 422. |
| Stored XSS, unsafe links | Text must be plain (no HTML or control characters) and length-limited. Image URLs must be `https://` or a site path. |
| SQL injection | SQLAlchemy parameterized queries. Path/query parameters are typed and range-checked. |
| Denial of service | Request bodies over 16 KB rejected (413), even when streamed. Per-IP rate limits (429). List size capped at 100. |
| Host header attacks | `ALLOWED_HOSTS` allow-list (400 for anything else). |
| Cross-site browser calls | CORS limited to `ALLOWED_ORIGINS`, specific methods/headers, and no credentials. Wildcards are refused. |
| Clickjacking, MIME sniffing, etc. | CSP `default-src 'none'; frame-ancestors 'none'`, `X-Frame-Options`, `nosniff`, `no-referrer`, `no-store`, HSTS in production. |
| Information leaks | `/docs` and `/openapi.json` off in production. Errors return a generic message (details only in server logs). Run uvicorn with `--no-server-header`. No credentials in code. |
| Vulnerable dependencies | Pinned, patched versions. Check with `pip-audit -r requirements.txt`. |

## Production checklist

1. `ENVIRONMENT=production`, `DATABASE_URL`, `ALLOWED_HOSTS`, `ALLOWED_ORIGINS` (the website's https origin).
2. `ADMIN_API_TOKEN` only if editing is needed. Store it in the host's secret settings, never in git.
3. Serve over HTTPS only (behind a reverse proxy / platform TLS).
4. Behind a proxy: `uvicorn app.main:app --no-server-header --proxy-headers --forwarded-allow-ips=<proxy-ip>`
   so rate limits apply per visitor. The in-memory rate limiter is per process. With several workers
   or servers, add a shared limiter (e.g. Redis) or limit at the proxy.
5. Use database migrations (e.g. Alembic) instead of automatic table creation once the schema changes.

## Tests

```bash
pytest               # 97 security tests
pip-audit -r requirements.txt
```
