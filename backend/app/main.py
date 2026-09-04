from pathlib import Path
import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

ROOT_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT_DIR))

from rag.query import run_rag


app = FastAPI(
    title="Enterprise Intelligence Platform API",
    version="1.0.0"
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Request Models
# --------------------------------------------------

class QueryRequest(BaseModel):
    question: str


# --------------------------------------------------
# Basic Routes
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "Enterprise Intelligence Platform API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# RAG Query
# --------------------------------------------------

@app.post("/query")
def query_rag(request: QueryRequest):
    result = run_rag(request.question)

    return {
        "answer": result["answer"],
        "sources": result["sources"]
    }