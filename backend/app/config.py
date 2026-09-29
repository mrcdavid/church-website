"""
Runtime settings, read from environment variables (and backend/.env in development).

Secure by default: anything that is not configured stays locked down.
  - No ADMIN_API_TOKEN      → every write endpoint refuses requests (read-only API).
  - ENVIRONMENT=production  → DATABASE_URL and ALLOWED_HOSTS are required, docs are off.
"""
import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()

MIN_TOKEN_LENGTH = 32


@dataclass(frozen=True)
class Settings:
    environment: str
    database_url: str
    admin_api_token: str | None
    allowed_origins: tuple[str, ...]
    allowed_hosts: tuple[str, ...]
    enable_docs: bool
    max_body_bytes: int
    rate_limit_per_minute: int
    write_rate_limit_per_minute: int

    @property
    def is_production(self) -> bool:
        return self.environment == "production"

    def __post_init__(self):
        if self.admin_api_token is not None and len(self.admin_api_token) < MIN_TOKEN_LENGTH:
            raise RuntimeError(
                f"ADMIN_API_TOKEN must be at least {MIN_TOKEN_LENGTH} characters. "
                'Generate one with: python -c "import secrets; print(secrets.token_urlsafe(48))"'
            )
        if "*" in self.allowed_origins:
            raise RuntimeError("ALLOWED_ORIGINS must list exact origins, not '*'.")
        if self.is_production and (not self.allowed_hosts or "*" in self.allowed_hosts):
            raise RuntimeError("ALLOWED_HOSTS must list the API's domain name(s) in production.")
        if self.max_body_bytes <= 0 or self.rate_limit_per_minute <= 0 or self.write_rate_limit_per_minute <= 0:
            raise RuntimeError("Body size and rate limits must be positive numbers.")


def _csv(name: str, default: str) -> tuple[str, ...]:
    return tuple(item.strip() for item in os.getenv(name, default).split(",") if item.strip())


def load_settings() -> Settings:
    environment = os.getenv("ENVIRONMENT", "development").strip().lower()
    production = environment == "production"

    database_url = os.getenv("DATABASE_URL", "").strip()
    if not database_url:
        if production:
            raise RuntimeError("DATABASE_URL must be set in production.")
        # Local development only: a file database with no credentials to leak.
        database_url = "sqlite:///./dev.db"

    return Settings(
        environment=environment,
        database_url=database_url,
        admin_api_token=os.getenv("ADMIN_API_TOKEN", "").strip() or None,
        allowed_origins=_csv("ALLOWED_ORIGINS", "" if production else "http://localhost:5173,http://127.0.0.1:5173"),
        allowed_hosts=_csv("ALLOWED_HOSTS", "" if production else "localhost,127.0.0.1"),
        enable_docs=os.getenv("ENABLE_DOCS", "false" if production else "true").strip().lower() == "true",
        max_body_bytes=int(os.getenv("MAX_BODY_BYTES", "16384")),
        rate_limit_per_minute=int(os.getenv("RATE_LIMIT_PER_MINUTE", "120")),
        write_rate_limit_per_minute=int(os.getenv("WRITE_RATE_LIMIT_PER_MINUTE", "10")),
    )
