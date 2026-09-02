Architecture.md
│
├── 1. Project Information
│
├── 2. Architecture Overview
│
├── 3. High-Level System Architecture
│
├── 4. Complete Application Flow
│
├── 5. Document Ingestion
│      └── PDF → Extraction → Hierarchical Chunking
│
├── 6. Embedding Pipeline
│
├── 7. BM25 Retrieval
│
├── 8. Vector Retrieval
│
├── 9. Hybrid Search
│
├── 10. RAG Pipeline
│
├── 11. LLM Layer
│
├── 12. LLM Guardrails
│
├── 13. Cross-Border Compliance Layer
│
├── 14. Enterprise/Product Modules
│
├── 15. Frontend Architecture
│
├── 16. Backend Architecture
│
├── 17. Database Architecture
│
├── 18. Authentication & Security
│
├── 19. LLMOps
│
├── 20. Docker / Deployment
│
├── 21. Complete Tech Stack
│
├── 22. Technology → Objective Mapping
│
├── 23. Folder Structure
│
└── 24. Architecture Principles

                    ┌─────────────────────┐
                    │        USER         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    FastAPI Backend  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
     ┌──────────────────┐             ┌──────────────────┐
     │ Document Ingestion│             │   User Query     │
     └────────┬─────────┘             └────────┬─────────┘
              │                                │
              ▼                                ▼
     ┌──────────────────┐             ┌──────────────────┐
     │ PDF Text         │             │ Query Processing │
     │ Extraction       │             └────────┬─────────┘
     └────────┬─────────┘                      │
              ▼                         ┌──────┴──────┐
     ┌──────────────────┐               │             │
     │ Hierarchical     │               ▼             ▼
     │ Chunking         │            BM25 Search  Vector Search
     └────────┬─────────┘               │             │
              │                         └──────┬──────┘
              ▼                                │
     ┌──────────────────┐                      ▼
     │ Embedding        │              ┌──────────────────┐
     │ Generation       │              │ Hybrid Retrieval │
     └────────┬─────────┘              └────────┬─────────┘
              │                                 │
              ▼                                 ▼
     ┌──────────────────┐              ┌──────────────────┐
     │ Vector Database  │─────────────►│ Relevant Context │
     │ Milvus/Pinecone  │              └────────┬─────────┘
     └──────────────────┘                       │
                                                ▼
                                      ┌──────────────────┐
                                      │   RAG / LLM      │
                                      │ LangChain + LLM  │
                                      └────────┬─────────┘
                                               │
                                               ▼
                                      ┌──────────────────┐
                                      │ LLM Guardrails   │
                                      └────────┬─────────┘
                                               │
                              ┌────────────────┴──────────────┐
                              │                               │
                              ▼                               ▼
                    Grounded Response                 Safe / Refusal
                              │
                              ▼
                       Sources / Citations
                              │
                              ▼
                            USER



Frontend
    React + Tailwind

Backend
    Python + FastAPI

AI / RAG
    LangChain + LLM

NLP
    PDF processing + embeddings + text processing

Search
    BM25 + Vector Search

Vector DB
    Milvus / Pinecone

Database
    PostgreSQL

Containerization
    Docker + Docker Compose

Security
    Authentication + Authorization + Cloud Security

LLMOps
    LangChain + evaluation + monitoring + guardrails