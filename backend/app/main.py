"""
Minimal FastAPI entrypoint — scaffold only.
Database + routers are intentionally NOT wired in yet (see database.py,
routers/events.py). This just confirms the skeleton runs.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Grace Community Church API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"status": "ok", "message": "Church API scaffold — endpoints coming soon"}


# Future:
# from app.routers import events
# app.include_router(events.router)
