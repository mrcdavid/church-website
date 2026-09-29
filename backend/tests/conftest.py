import secrets
from dataclasses import replace

import pytest
from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app

ADMIN_TOKEN = secrets.token_urlsafe(48)
ALLOWED_ORIGIN = "https://hbccalamba.example"

BASE_SETTINGS = Settings(
    environment="test",
    database_url="sqlite://",
    admin_api_token=ADMIN_TOKEN,
    allowed_origins=(ALLOWED_ORIGIN,),
    allowed_hosts=("testserver", "api.hbccalamba.example"),
    enable_docs=False,
    max_body_bytes=16_384,
    rate_limit_per_minute=1_000,
    write_rate_limit_per_minute=1_000,
)


def make_client(**overrides) -> TestClient:
    app = create_app(replace(BASE_SETTINGS, **overrides))
    return TestClient(app, raise_server_exceptions=False)


@pytest.fixture
def client():
    with make_client() as c:
        yield c


@pytest.fixture
def admin():
    return {"Authorization": f"Bearer {ADMIN_TOKEN}"}


@pytest.fixture
def event_payload():
    return {
        "title": "Christmas Candlelight Service",
        "description": "Carols and scripture readings.",
        "location": "Main Sanctuary",
        "image_url": "https://images.example.com/candles.jpg",
        "starts_at": "2026-12-24T18:00:00+08:00",
    }


@pytest.fixture
def existing_event(client, admin, event_payload):
    response = client.post("/api/events", json=event_payload, headers=admin)
    assert response.status_code == 201
    return response.json()
