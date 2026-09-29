"""
Events API.

  GET    /api/events          public, read-only
  GET    /api/events/{id}     public, read-only
  POST   /api/events          admin token required
  PATCH  /api/events/{id}     admin token required
  DELETE /api/events/{id}     admin token required
"""
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Path, Query, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.event import Event
from app.schemas.event import EventCreate, EventOut, EventUpdate
from app.security import require_admin

router = APIRouter(prefix="/api/events", tags=["events"])

DB = Annotated[Session, Depends(get_db)]
EventId = Annotated[int, Path(ge=1, le=2_147_483_647)]
admin_only = [Depends(require_admin)]


def _get_or_404(db: Session, event_id: int) -> Event:
    event = db.get(Event, event_id)
    if event is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Event not found.")
    return event


@router.get("", response_model=list[EventOut])
def list_events(
    db: DB,
    limit: Annotated[int, Query(ge=1, le=100)] = 50,
    offset: Annotated[int, Query(ge=0, le=10_000)] = 0,
):
    return db.scalars(select(Event).order_by(Event.starts_at).limit(limit).offset(offset)).all()


@router.get("/{event_id}", response_model=EventOut)
def get_event(event_id: EventId, db: DB):
    return _get_or_404(db, event_id)


@router.post("", response_model=EventOut, status_code=status.HTTP_201_CREATED, dependencies=admin_only)
def create_event(payload: EventCreate, db: DB):
    event = Event(**payload.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@router.patch("/{event_id}", response_model=EventOut, dependencies=admin_only)
def update_event(event_id: EventId, payload: EventUpdate, db: DB):
    event = _get_or_404(db, event_id)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(event, field, value)
    db.commit()
    db.refresh(event)
    return event


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=admin_only)
def delete_event(event_id: EventId, db: DB):
    db.delete(_get_or_404(db, event_id))
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
