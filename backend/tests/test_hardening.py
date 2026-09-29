"""
Server hardening: headers, host checks, CORS, docs exposure, body size,
rate limits, error handling, and configuration safety.
"""
from pathlib import Path

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.config import Settings, load_settings
from app.security import RateLimitMiddleware
from tests.conftest import ALLOWED_ORIGIN, BASE_SETTINGS, make_client

REQUIRED_HEADERS = {
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "no-referrer",
    "content-security-policy": "default-src 'none'; frame-ancestors 'none'",
    "cache-control": "no-store",
}


def assert_hardened(response):
    for name, value in REQUIRED_HEADERS.items():
        assert response.headers.get(name) == value, f"{name} missing on {response.status_code}"
    assert "server" not in response.headers or "uvicorn" not in response.headers["server"].lower()


# ── Security headers ─────────────────────────────────────────────────────────
def test_security_headers_on_success_and_error_responses(client):
    assert_hardened(client.get("/api/health"))
    assert_hardened(client.get("/api/events"))
    assert_hardened(client.get("/api/events/12345"))  # 404
    assert_hardened(client.post("/api/events", json={}))  # 401
    assert_hardened(client.get("/", headers={"Host": "evil.example"}))  # 400


def test_hsts_only_in_production():
    assert "strict-transport-security" not in make_client().get("/api/health").headers
    with make_client(environment="production") as prod:
        assert prod.get("/api/health").headers["strict-transport-security"].startswith("max-age=")


# ── Host header ──────────────────────────────────────────────────────────────
@pytest.mark.parametrize("host", ["evil.example", "api.hbccalamba.example.evil.example", "localhost:1234@evil.example"])
def test_spoofed_host_header_is_rejected(client, host):
    assert client.get("/api/health", headers={"Host": host}).status_code == 400


def test_configured_host_is_accepted(client):
    assert client.get("/api/health", headers={"Host": "api.hbccalamba.example"}).status_code == 200


# ── CORS ─────────────────────────────────────────────────────────────────────
def preflight(client, origin, method="POST", headers="authorization,content-type"):
    return client.options(
        "/api/events",
        headers={"Origin": origin, "Access-Control-Request-Method": method, "Access-Control-Request-Headers": headers},
    )


def test_cors_allows_the_church_site(client):
    response = preflight(client, ALLOWED_ORIGIN)
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == ALLOWED_ORIGIN
    assert "access-control-allow-credentials" not in response.headers


@pytest.mark.parametrize("origin", ["https://evil.example", "null", "https://hbccalamba.example.evil.example"])
def test_cors_refuses_other_sites(client, origin):
    response = preflight(client, origin)
    assert response.status_code == 400
    assert "access-control-allow-origin" not in response.headers
    simple = client.get("/api/events", headers={"Origin": origin})
    assert "access-control-allow-origin" not in simple.headers


def test_cors_refuses_unexpected_methods_and_headers(client):
    assert preflight(client, ALLOWED_ORIGIN, method="PUT").status_code == 400
    assert preflight(client, ALLOWED_ORIGIN, headers="x-evil").status_code == 400


# ── API docs exposure ────────────────────────────────────────────────────────
@pytest.mark.parametrize("path", ["/docs", "/redoc", "/openapi.json"])
def test_docs_are_hidden_when_disabled(client, path):
    assert client.get(path).status_code == 404


def test_docs_are_off_by_default_in_production(monkeypatch):
    monkeypatch.setenv("ENVIRONMENT", "production")
    monkeypatch.setenv("DATABASE_URL", "sqlite://")
    monkeypatch.setenv("ALLOWED_HOSTS", "api.hbccalamba.example")
    monkeypatch.delenv("ENABLE_DOCS", raising=False)
    assert load_settings().enable_docs is False


# ── Request size ─────────────────────────────────────────────────────────────
def test_oversized_body_is_rejected_before_auth(client):
    response = client.post("/api/events", content=b"x" * 20_000, headers={"Content-Type": "application/json"})
    assert response.status_code == 413
    assert_hardened(response)


def test_oversized_streamed_body_is_rejected(client, admin):
    def chunks():
        for _ in range(40):
            yield b"x" * 1024

    response = client.post("/api/events", content=chunks(), headers={**admin, "Content-Type": "application/json"})
    assert response.status_code == 413


def test_invalid_content_length_is_rejected(client):
    response = client.post("/api/events", content=b"{}", headers={"Content-Length": "abc", "Content-Type": "application/json"})
    assert response.status_code == 400


# ── Rate limiting ────────────────────────────────────────────────────────────
def test_read_rate_limit():
    with make_client(rate_limit_per_minute=5) as client:
        codes = [client.get("/api/events").status_code for _ in range(6)]
        assert codes == [200] * 5 + [429]
        blocked = client.get("/api/events")
        assert int(blocked.headers["retry-after"]) > 0
        assert_hardened(blocked)


def test_token_guessing_is_throttled():
    with make_client(write_rate_limit_per_minute=3) as client:
        codes = [
            client.post("/api/events", json={}, headers={"Authorization": f"Bearer guess-{i}"}).status_code
            for i in range(6)
        ]
        assert codes == [401, 401, 401, 429, 429, 429]
        # Reads use a separate, larger budget, so the public site keeps working.
        assert client.get("/api/events").status_code == 200


def test_rate_limit_window_resets():
    now = [1000.0]
    app = FastAPI()
    app.get("/")(lambda: {"ok": True})
    app.add_middleware(RateLimitMiddleware, per_minute=2, write_per_minute=1, clock=lambda: now[0])
    client = TestClient(app)
    assert [client.get("/").status_code for _ in range(3)] == [200, 200, 429]
    now[0] += 61
    assert client.get("/").status_code == 200


# ── Error handling ───────────────────────────────────────────────────────────
def test_unexpected_errors_do_not_leak_details(client):
    def boom():
        raise RuntimeError("database password is hunter2")

    client.app.get("/api/boom")(boom)
    response = client.get("/api/boom")
    assert response.status_code == 500
    assert response.json() == {"detail": "Internal server error."}
    assert "hunter2" not in response.text and "Traceback" not in response.text
    assert_hardened(response)


# ── Configuration safety ─────────────────────────────────────────────────────
def settings_with(**overrides):
    from dataclasses import replace

    return replace(BASE_SETTINGS, **overrides)


def test_weak_admin_token_is_refused():
    with pytest.raises(RuntimeError, match="at least 32"):
        settings_with(admin_api_token="password123")


def test_wildcard_cors_is_refused():
    with pytest.raises(RuntimeError, match="ALLOWED_ORIGINS"):
        settings_with(allowed_origins=("*",))


@pytest.mark.parametrize("hosts", [(), ("*",)])
def test_production_requires_explicit_hosts(hosts):
    with pytest.raises(RuntimeError, match="ALLOWED_HOSTS"):
        settings_with(environment="production", allowed_hosts=hosts)


def test_production_requires_database_url(monkeypatch):
    monkeypatch.setenv("ENVIRONMENT", "production")
    monkeypatch.setenv("DATABASE_URL", "")
    with pytest.raises(RuntimeError, match="DATABASE_URL"):
        load_settings()


def test_no_credentials_in_source_code():
    app_dir = Path(__file__).resolve().parents[1] / "app"
    source = "\n".join(p.read_text(encoding="utf-8") for p in app_dir.rglob("*.py"))
    for secret_like in ("church_password", "postgresql://", "password="):
        assert secret_like not in source


def test_settings_type_is_immutable():
    with pytest.raises(Exception):
        BASE_SETTINGS.admin_api_token = "changed-at-runtime-000000000000000000"
    assert isinstance(BASE_SETTINGS, Settings)
