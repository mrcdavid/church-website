"""Event ORM model. Column lengths match the limits enforced in schemas/event.py."""
from datetime import datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

TITLE_MAX = 200
DESCRIPTION_MAX = 2000
LOCATION_MAX = 200
URL_MAX = 500


class Event(Base):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(TITLE_MAX))
    description: Mapped[str | None] = mapped_column(String(DESCRIPTION_MAX))
    location: Mapped[str | None] = mapped_column(String(LOCATION_MAX))
    image_url: Mapped[str | None] = mapped_column(String(URL_MAX))
    starts_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
