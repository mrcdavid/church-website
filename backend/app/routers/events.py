"""
Example future router — NOT included in app.main yet.
Once ready: from app.routers import events; app.include_router(events.router)
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter(prefix="/api/events", tags=["events"])


@router.get("/")
def list_events(db: Session = Depends(get_db)):
    # Placeholder — will query the Event model once the DB is connected.
    return {"message": "Events endpoint placeholder — not yet implemented"}
