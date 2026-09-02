# Project Memory

## Project

**Title:** Enterprise Retrieval-Augmented Generation (RAG) Architecture for Cross-Border Compliance

**Outcome:** Product

**Supervisor:** Shobit Mahajan (E19447)

**Co-Supervisor:** None

---

# 1. Project Objectives

The project has three primary objectives:

1. Implement an advanced hierarchical chunking strategy across complex multi-page PDFs.
2. Optimize vector database retrieval using hybrid search combining BM25 and vector embeddings.
3. Implement LLM guardrails against hallucinations.

---

# 2. Required Technology Skills

The project should demonstrate:

- LLMOps
- LangChain
- Vector Databases
- NLP
- Docker
- Cloud Security

Planned technologies include:

- Python
- FastAPI
- React
- Tailwind CSS
- LangChain
- BM25
- Vector Database (Milvus / Pinecone)
- PostgreSQL
- PyMuPDF
- Docker
- LLM API
- Embedding Models

---

# 3. Documentation Status

| File | Status |
|---|---|
| PRD.md | Completed |
| Architecture.md | Completed |
| Rules.md | Completed |
| phases.md | Completed |
| design.md | Skipped for now |
| memory.md | Current |

---

# 4. Current Development Status

## Overall Status

**Project development has not started yet.**

The project documentation and architecture planning have been established before implementation.

---

# 5. Current Phase

**Phase:** Pre-Development / Documentation

**Current Task:** Complete project planning files before starting implementation.

---

# 6. Completed Work

### Documentation

- Created PRD.md.
- Created Architecture.md.
- Created Rules.md.
- Created phases.md.
- Skipped design.md temporarily.
- Created memory.md.

### Architecture Decisions

The planned architecture includes:

```text
React Frontend
       ↓
FastAPI Backend
       ↓
Document Processing
       ↓
Hierarchical Chunking
       ↓
Embeddings
       ↓
BM25 + Vector Search
       ↓
Hybrid Retrieval
       ↓
RAG / LLM
       ↓
LLM Guardrails
       ↓
Grounded Response + Sources