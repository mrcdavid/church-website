"""
Example future ORM model — not wired into main.py yet.
Shows the intended shape once /events becomes dynamic.
"""
from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    location = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    starts_at = Column(DateTime, nullable=False)
