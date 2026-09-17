# Backend (scaffold — not yet wired to the frontend)

This is a placeholder FastAPI + PostgreSQL structure for future work:
dynamic events/sermons management, a real contact form, admin login, etc.

```
backend/
├── app/
│   ├── main.py            # FastAPI app entrypoint
│   ├── database.py        # SQLAlchemy engine/session setup
│   ├── models/             # SQLAlchemy ORM models
│   │   └── __init__.py
│   ├── schemas/             # Pydantic request/response schemas
│   │   └── __init__.py
│   └── routers/             # API route modules
│       └── __init__.py
├── requirements.txt
└── .env.example
```

## Getting started later

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # then fill in your Postgres credentials
uvicorn app.main:app --reload
```

Nothing here is connected to the React frontend yet — this is intentionally
just a skeleton so the two projects can grow together without a restructure.
