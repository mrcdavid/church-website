"""
FastAPI entrypoint for the Harvesters Baptist Church Calamba API.

Run locally:   uvicorn app.main:app --reload --no-server-header
Production:    see backend/README.md (ENVIRONMENT=production + required settings)

The React website does not call this API yet. It is ready for admin-managed
events once the frontend is wired to it.
"""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.trustedhost import TrustedHostMiddleware

import app.models.event  # noqa: F401 — registers the table before create_all
from app.config import Settings, load_settings
from app.database import Base, create_session_factory
from app.routers import events
from app.security import (
    BodySizeLimitMiddleware,
    RateLimitMiddleware,
    SecurityHeadersMiddleware,
    security_headers,
)

logger = logging.getLogger("hbc.api")


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or load_settings()
    engine, session_factory = create_session_factory(settings.database_url)

    @asynccontextmanager
    async def lifespan(_: FastAPI):
        Base.metadata.create_all(engine)
        yield
        engine.dispose()

    docs = settings.enable_docs
    app = FastAPI(
        title="Harvesters Baptist Church Calamba API",
        version="0.2.0",
        lifespan=lifespan,
        docs_url="/docs" if docs else None,
        redoc_url="/redoc" if docs else None,
        openapi_url="/openapi.json" if docs else None,
    )
    app.state.settings = settings
    app.state.session_factory = session_factory

    # Middleware added last runs first. Request order:
    # security headers → trusted host → CORS → rate limit → body size → routes
    app.add_middleware(BodySizeLimitMiddleware, max_bytes=settings.max_body_bytes)
    app.add_middleware(
        RateLimitMiddleware,
        per_minute=settings.rate_limit_per_minute,
        write_per_minute=settings.write_rate_limit_per_minute,
    )
    # CORS only controls which *browser* pages may call the API. It is not
    # access control. The admin token on write endpoints is what stops outsiders.
    app.add_middleware(
        CORSMiddleware,
        allow_origins=list(settings.allowed_origins),
        allow_methods=["GET", "POST", "PATCH", "DELETE"],
        allow_headers=["Authorization", "Content-Type"],
        allow_credentials=False,
        max_age=600,
    )
    if settings.allowed_hosts:
        app.add_middleware(TrustedHostMiddleware, allowed_hosts=list(settings.allowed_hosts))
    app.add_middleware(SecurityHeadersMiddleware, production=settings.is_production)

    @app.exception_handler(Exception)
    async def unhandled_error(request: Request, exc: Exception):
        # Log the details for the server owner; never send stack traces to clients.
        logger.exception("Unhandled error on %s %s", request.method, request.url.path)
        headers = {k.decode(): v.decode() for k, v in security_headers(request.url.path, settings.is_production)}
        return JSONResponse({"detail": "Internal server error."}, status_code=500, headers=headers)

    @app.get("/", include_in_schema=False)
    def read_root():
        return {"status": "ok", "message": "Harvesters Baptist Church Calamba API"}

    @app.get("/api/health", tags=["health"])
    def health():
        return {"status": "ok"}

    app.include_router(events.router)
    return app


app = create_app()
