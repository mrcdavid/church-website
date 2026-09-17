"""
Example future Pydantic schema — not wired into main.py yet.
"""
from datetime import datetime
from pydantic import BaseModel


class EventBase(BaseModel):
    title: str
    description: str | None = None
    location: str | None = None
    image_url: str | None = None
    starts_at: datetime


class EventCreate(EventBase):
    pass


class EventOut(EventBase):
    id: int

    class Config:
        from_attributes = True
