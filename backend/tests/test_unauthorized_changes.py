"""
Outsiders must not be able to create, change, or delete anything.
Each test attacks a write endpoint and then confirms the data is untouched.
"""
import pytest

from tests.conftest import ADMIN_TOKEN, make_client

WRONG_CREDENTIALS = [
    pytest.param({}, id="no-header"),
    pytest.param({"Authorization": "Bearer not-the-token"}, id="wrong-token"),
    pytest.param({"Authorization": f"Bearer {ADMIN_TOKEN[:-1]}"}, id="almost-right-token"),
    pytest.param({"Authorization": f"Bearer {ADMIN_TOKEN}x"}, id="token-with-extra-char"),
    pytest.param({"Authorization": f"Basic {ADMIN_TOKEN}"}, id="wrong-scheme"),
    pytest.param({"Authorization": "Bearer "}, id="empty-token"),
    pytest.param({"X-Admin-Token": ADMIN_TOKEN}, id="token-in-other-header"),
]


@pytest.mark.parametrize("headers", WRONG_CREDENTIALS)
def test_create_is_rejected_without_valid_token(client, event_payload, headers):
    response = client.post("/api/events", json=event_payload, headers=headers)
    assert response.status_code == 401
    assert response.headers["www-authenticate"] == "Bearer"
    assert client.get("/api/events").json() == []


@pytest.mark.parametrize("headers", WRONG_CREDENTIALS)
def test_update_is_rejected_without_valid_token(client, existing_event, headers):
    response = client.patch(f"/api/events/{existing_event['id']}", json={"title": "Hacked"}, headers=headers)
    assert response.status_code == 401
    assert client.get(f"/api/events/{existing_event['id']}").json()["title"] == existing_event["title"]


@pytest.mark.parametrize("headers", WRONG_CREDENTIALS)
def test_delete_is_rejected_without_valid_token(client, existing_event, headers):
    response = client.delete(f"/api/events/{existing_event['id']}", headers=headers)
    assert response.status_code == 401
    assert client.get(f"/api/events/{existing_event['id']}").status_code == 200


def test_token_in_query_string_is_ignored(client, event_payload):
    response = client.post(f"/api/events?token={ADMIN_TOKEN}&access_token={ADMIN_TOKEN}", json=event_payload)
    assert response.status_code == 401


def test_unauthenticated_request_learns_nothing_about_the_schema(client):
    # Auth is checked before the body is validated, so attackers get a bare 401,
    # not a 422 listing every expected field.
    response = client.post("/api/events", json={"junk": True})
    assert response.status_code == 401
    assert "title" not in response.text


def test_writes_are_disabled_when_no_token_is_configured(event_payload):
    with make_client(admin_api_token=None) as client:
        for headers in ({}, {"Authorization": "Bearer anything-at-all-that-is-long-enough-000"}):
            response = client.post("/api/events", json=event_payload, headers=headers)
            assert response.status_code == 403
        assert client.get("/api/events").json() == []


def test_admin_can_create_update_and_delete(client, admin, event_payload):
    created = client.post("/api/events", json=event_payload, headers=admin)
    assert created.status_code == 201
    event_id = created.json()["id"]

    updated = client.patch(f"/api/events/{event_id}", json={"title": "Updated title"}, headers=admin)
    assert updated.status_code == 200
    assert updated.json()["title"] == "Updated title"

    assert client.delete(f"/api/events/{event_id}", headers=admin).status_code == 204
    assert client.get(f"/api/events/{event_id}").status_code == 404


def test_reading_is_public(client, existing_event):
    assert client.get("/api/events").status_code == 200
    assert client.get(f"/api/events/{existing_event['id']}").status_code == 200


@pytest.mark.parametrize("method", ["PUT", "TRACE", "CONNECT"])
def test_unsupported_methods_are_refused(client, existing_event, admin, method):
    response = client.request(method, f"/api/events/{existing_event['id']}", headers=admin)
    assert response.status_code == 405
