"""
Security layer for the API:

  require_admin              — bearer-token check for every endpoint that changes data
  SecurityHeadersMiddleware  — hardening headers on every response
  RateLimitMiddleware        — per-client request limits (stricter for writes)
  BodySizeLimitMiddleware    — rejects oversized request bodies before they are read

The middlewares are plain ASGI classes so they also cover error responses
produced by other middleware (400 bad host, 413, 429, …).
"""
import hashlib
import json
import secrets
import time
from collections import defaultdict, deque

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

SAFE_METHODS = frozenset({"GET", "HEAD", "OPTIONS"})
DOCS_PATHS = frozenset({"/docs", "/docs/oauth2-redirect", "/redoc"})

# ── Authentication ────────────────────────────────────────────────────────────
_bearer = HTTPBearer(auto_error=False)


def require_admin(
    request: Request,
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer),
) -> None:
    """Allow the request only with `Authorization: Bearer <ADMIN_API_TOKEN>`."""
    expected = request.app.state.settings.admin_api_token
    if expected is None:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Write access is disabled on this server.")

    supplied = credentials.credentials if credentials else ""
    # Hash both sides so they are equal length, then compare in constant time:
    # response timing reveals nothing about how close a guess was.
    if not secrets.compare_digest(_digest(supplied), _digest(expected)):
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            "Invalid or missing credentials.",
            headers={"WWW-Authenticate": "Bearer"},
        )


def _digest(value: str) -> bytes:
    return hashlib.sha256(value.encode()).digest()


# ── Helpers ───────────────────────────────────────────────────────────────────
def security_headers(path: str, production: bool) -> list[tuple[bytes, bytes]]:
    headers = [
        (b"x-content-type-options", b"nosniff"),
        (b"x-frame-options", b"DENY"),
        (b"referrer-policy", b"no-referrer"),
        (b"permissions-policy", b"camera=(), microphone=(), geolocation=(), payment=()"),
        (b"cross-origin-opener-policy", b"same-origin"),
        (b"cache-control", b"no-store"),
    ]
    # The API only returns JSON, so nothing may load or execute. The interactive
    # docs (development only) need their own scripts, so they are left alone.
    if path not in DOCS_PATHS:
        headers.append((b"content-security-policy", b"default-src 'none'; frame-ancestors 'none'"))
    if production:
        headers.append((b"strict-transport-security", b"max-age=63072000; includeSubDomains"))
    return headers


async def send_json(send, status_code: int, detail: str, extra_headers: dict[str, str] | None = None) -> None:
    body = json.dumps({"detail": detail}).encode()
    headers = [(b"content-type", b"application/json"), (b"content-length", str(len(body)).encode())]
    headers += [(k.lower().encode(), v.encode()) for k, v in (extra_headers or {}).items()]
    await send({"type": "http.response.start", "status": status_code, "headers": headers})
    await send({"type": "http.response.body", "body": body})


# ── Middlewares ───────────────────────────────────────────────────────────────
class SecurityHeadersMiddleware:
    def __init__(self, app, production: bool = False):
        self.app = app
        self.production = production

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            return await self.app(scope, receive, send)
        extra = security_headers(scope["path"], self.production)

        async def send_with_headers(message):
            if message["type"] == "http.response.start":
                names = {name for name, _ in extra}
                kept = [(k, v) for k, v in message.get("headers", []) if k.lower() not in names]
                message = {**message, "headers": kept + extra}
            await send(message)

        await self.app(scope, receive, send_with_headers)


class RateLimitMiddleware:
    """
    Sliding-window limit per client IP, kept in memory. Methods that change data
    get a much lower limit, which also slows down token-guessing attempts.

    Behind a reverse proxy, run uvicorn with --proxy-headers so the client IP is
    the visitor's, not the proxy's. (X-Forwarded-For is never trusted here directly.)
    """

    WINDOW_SECONDS = 60.0
    MAX_TRACKED_CLIENTS = 10_000

    def __init__(self, app, per_minute: int, write_per_minute: int, clock=time.monotonic):
        self.app = app
        self.limits = {False: per_minute, True: write_per_minute}
        self.clock = clock
        self.hits: dict[tuple[str, bool], deque[float]] = defaultdict(deque)

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http" or scope["method"] == "OPTIONS":
            return await self.app(scope, receive, send)

        client = scope.get("client")
        ip = client[0] if client else "unknown"
        is_write = scope["method"] not in SAFE_METHODS
        now = self.clock()

        if len(self.hits) > self.MAX_TRACKED_CLIENTS:
            self._prune(now)

        window = self.hits[(ip, is_write)]
        while window and window[0] <= now - self.WINDOW_SECONDS:
            window.popleft()

        if len(window) >= self.limits[is_write]:
            retry_after = int(self.WINDOW_SECONDS - (now - window[0])) + 1
            return await send_json(
                send, 429, "Too many requests. Please try again later.", {"Retry-After": str(retry_after)}
            )

        window.append(now)
        await self.app(scope, receive, send)

    def _prune(self, now: float) -> None:
        cutoff = now - self.WINDOW_SECONDS
        for key in [k for k, q in self.hits.items() if not q or q[-1] <= cutoff]:
            del self.hits[key]


class BodyTooLarge(HTTPException):
    def __init__(self):
        super().__init__(status.HTTP_413_CONTENT_TOO_LARGE, "Request body too large.")


class BodySizeLimitMiddleware:
    """Rejects bodies over `max_bytes`, whether sized by Content-Length or streamed (chunked)."""

    def __init__(self, app, max_bytes: int):
        self.app = app
        self.max_bytes = max_bytes

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            return await self.app(scope, receive, send)

        declared = dict(scope["headers"]).get(b"content-length")
        if declared is not None:
            if not declared.isdigit():
                return await send_json(send, 400, "Invalid Content-Length header.")
            if int(declared) > self.max_bytes:
                return await send_json(send, 413, "Request body too large.")

        received = 0
        response_started = False

        async def limited_receive():
            nonlocal received
            message = await receive()
            if message["type"] == "http.request":
                received += len(message.get("body", b""))
                if received > self.max_bytes:
                    raise BodyTooLarge()
            return message

        async def tracking_send(message):
            nonlocal response_started
            if message["type"] == "http.response.start":
                response_started = True
            await send(message)

        try:
            await self.app(scope, limited_receive, tracking_send)
        except BodyTooLarge:
            if not response_started:
                await send_json(send, 413, "Request body too large.")
