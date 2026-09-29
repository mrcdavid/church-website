"""
Request/response schemas for events. Every incoming field is validated:
  - unknown fields are rejected (no sneaking in `id` or other columns)
  - text is plain text: bounded length, no HTML tags, no control characters
  - image URLs must be https:// or a path on this site (no javascript:, data:, http:)
"""
import re
from datetime import datetime
from typing import Annotated
from urllib.parse import urlparse

from pydantic import AfterValidator, BaseModel, ConfigDict, StringConstraints, model_validator

from app.models.event import DESCRIPTION_MAX, LOCATION_MAX, TITLE_MAX, URL_MAX

_CONTROL_CHARS = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")
_HTML_TAG = re.compile(r"<\s*/?\s*[a-zA-Z!?]")


def _plain_text(value: str) -> str:
    if _CONTROL_CHARS.search(value):
        raise ValueError("must not contain control characters")
    if _HTML_TAG.search(value):
        raise ValueError("must be plain text (no HTML)")
    return value


def _safe_image_url(value: str) -> str:
    if value.startswith("/") and not value.startswith("//") and "\\" not in value:
        return value  # a path on this website, e.g. /images/picnic.jpg
    parsed = urlparse(value)
    if parsed.scheme != "https" or not parsed.netloc or _CONTROL_CHARS.search(value) or " " in value:
        raise ValueError("must be an https:// URL or a path starting with /")
    return value


def _text(max_length: int):
    return Annotated[
        str,
        StringConstraints(strip_whitespace=True, min_length=1, max_length=max_length),
        AfterValidator(_plain_text),
    ]


Title = _text(TITLE_MAX)
Description = _text(DESCRIPTION_MAX)
Location = _text(LOCATION_MAX)
ImageUrl = Annotated[
    str, StringConstraints(strip_whitespace=True, min_length=1, max_length=URL_MAX), AfterValidator(_safe_image_url)
]


class EventCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: Title
    description: Description | None = None
    location: Location | None = None
    image_url: ImageUrl | None = None
    starts_at: datetime


class EventUpdate(BaseModel):
    """Partial update — send only the fields to change."""

    model_config = ConfigDict(extra="forbid")

    title: Title | None = None
    description: Description | None = None
    location: Location | None = None
    image_url: ImageUrl | None = None
    starts_at: datetime | None = None

    @model_validator(mode="after")
    def _check(self):
        if not self.model_fields_set:
            raise ValueError("send at least one field to update")
        for required in ("title", "starts_at"):
            if required in self.model_fields_set and getattr(self, required) is None:
                raise ValueError(f"{required} cannot be null")
        return self


class EventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str | None
    location: str | None
    image_url: str | None
    starts_at: datetime
