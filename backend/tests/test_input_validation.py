"""
Even an authorized request must not be able to smuggle in dangerous data:
extra columns, HTML/script, unsafe URLs, SQL, or oversized values.
"""
import pytest


@pytest.mark.parametrize(
    "extra",
    [
        pytest.param({"id": 999}, id="set-primary-key"),
        pytest.param({"is_admin": True}, id="unknown-field"),
        pytest.param({"__class__": "x"}, id="dunder-field"),
    ],
)
def test_mass_assignment_is_rejected(client, admin, event_payload, extra):
    response = client.post("/api/events", json={**event_payload, **extra}, headers=admin)
    assert response.status_code == 422
    assert client.get("/api/events").json() == []


@pytest.mark.parametrize(
    "field,value",
    [
        ("title", "<script>alert('xss')</script>"),
        ("title", "<img src=x onerror=alert(1)>"),
        ("description", "Hello </textarea><svg onload=alert(1)>"),
        ("location", "<iframe src=https://evil.example>"),
        ("title", "Bad\x00byte"),
        ("title", "Escape\x1b[31mcodes"),
        ("title", ""),
        ("title", "   "),
        ("title", "x" * 201),
        ("description", "x" * 2001),
        ("location", "x" * 201),
    ],
)
def test_unsafe_or_oversized_text_is_rejected(client, admin, event_payload, field, value):
    response = client.post("/api/events", json={**event_payload, field: value}, headers=admin)
    assert response.status_code == 422


@pytest.mark.parametrize(
    "url",
    [
        "javascript:alert(1)",
        "JaVaScRiPt:alert(1)",
        "data:image/svg+xml;base64,PHN2Zz4=",
        "http://insecure.example.com/a.jpg",
        "//evil.example/a.jpg",
        "/\\evil.example/a.jpg",
        "https://",
        "ftp://files.example.com/a.jpg",
        "https://example.com/a b.jpg",
        "https://example.com/" + "a" * 500,
    ],
)
def test_unsafe_image_urls_are_rejected(client, admin, event_payload, url):
    response = client.post("/api/events", json={**event_payload, "image_url": url}, headers=admin)
    assert response.status_code == 422


@pytest.mark.parametrize("url", ["https://images.example.com/a.jpg", "/images/picnic.jpg"])
def test_safe_image_urls_are_accepted(client, admin, event_payload, url):
    response = client.post("/api/events", json={**event_payload, "image_url": url}, headers=admin)
    assert response.status_code == 201


def test_multiline_descriptions_are_allowed(client, admin, event_payload):
    response = client.post("/api/events", json={**event_payload, "description": "Line one\nLine two\ttabbed"}, headers=admin)
    assert response.status_code == 201


def test_sql_in_text_is_stored_as_plain_text(client, admin, event_payload):
    sneaky = "Robert'); DROP TABLE events;--"
    response = client.post("/api/events", json={**event_payload, "title": sneaky}, headers=admin)
    assert response.status_code == 201
    assert response.json()["title"] == sneaky
    assert len(client.get("/api/events").json()) == 1  # table still exists


@pytest.mark.parametrize(
    "path",
    [
        "/api/events/1%20OR%201=1",
        "/api/events/1;DROP%20TABLE%20events",
        "/api/events/0",
        "/api/events/-1",
        "/api/events/99999999999999999999",
        "/api/events?limit=1;DROP%20TABLE%20events",
        "/api/events?limit=1000000",
        "/api/events?offset=-5",
    ],
)
def test_injection_and_out_of_range_parameters_are_rejected(client, existing_event, path):
    assert client.get(path).status_code == 422
    assert client.get(f"/api/events/{existing_event['id']}").status_code == 200


def test_partial_update_cannot_null_required_fields(client, admin, existing_event):
    for field in ("title", "starts_at"):
        response = client.patch(f"/api/events/{existing_event['id']}", json={field: None}, headers=admin)
        assert response.status_code == 422


def test_empty_update_is_rejected(client, admin, existing_event):
    assert client.patch(f"/api/events/{existing_event['id']}", json={}, headers=admin).status_code == 422


def test_malformed_json_is_rejected(client, admin):
    response = client.post(
        "/api/events", content=b'{"title": "unterminated', headers={**admin, "Content-Type": "application/json"}
    )
    assert response.status_code == 422
