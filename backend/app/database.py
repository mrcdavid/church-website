"""
SQLAlchemy engine/session setup. The database URL comes from settings
(the DATABASE_URL environment variable). No credentials live in code.
"""
from fastapi import Request
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy.pool import StaticPool


class Base(DeclarativeBase):
    pass


def create_session_factory(database_url: str):
    options = {"pool_pre_ping": True}
    if database_url.startswith("sqlite"):
        options = {"connect_args": {"check_same_thread": False}}
        if database_url in ("sqlite://", "sqlite:///:memory:"):
            options["poolclass"] = StaticPool  # one shared in-memory DB (tests)
    engine = create_engine(database_url, **options)
    return engine, sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


def get_db(request: Request):
    db = request.app.state.session_factory()
    try:
        yield db
    finally:
        db.close()
