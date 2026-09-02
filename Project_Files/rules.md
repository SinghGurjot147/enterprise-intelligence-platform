# Project Rules

## Enterprise Retrieval-Augmented Generation (RAG) Architecture for Cross-Border Compliance

---

## 1. Project Priority

The project must always prioritize the three official objectives:

1. Implement advanced hierarchical chunking across complex multi-page PDFs.
2. Implement hybrid retrieval using BM25 and vector embeddings.
3. Implement LLM guardrails to reduce hallucinations.

Optional features must never compromise these three objectives.

---

## 2. Technology Rules

### Frontend

- React.js
- Tailwind CSS

### Backend

- Python
- FastAPI
- Pydantic

### AI / RAG

- LangChain
- LLM API such as Google Gemini
- Embedding models
- BM25
- Vector search

### Vector Database

- Milvus or Pinecone

The final choice will be made during implementation based on practicality, performance, and deployment requirements.

### Database

- PostgreSQL

### Document Processing

- PyMuPDF
- Python NLP libraries where required

### Containerization

- Docker
- Docker Compose

### Version Control

- Git
- GitHub

---

## 3. Library Rules

Before adding a new library:

1. Check whether an existing library already provides the required functionality.
2. Confirm that the library is actually necessary.
3. Avoid libraries that add unnecessary complexity.
4. Prefer stable and well-maintained libraries.
5. Update the project documentation when a major dependency is introduced.

Do not install libraries simply because they are popular or used in tutorials.

---

## 4. RAG Rules

The main RAG pipeline should follow:

```text
PDF
 ↓
Text Extraction
 ↓
Hierarchical Chunking
 ↓
Embeddings
 ↓
Indexing
 ↓
BM25 + Vector Search
 ↓
Hybrid Retrieval
 ↓
Context Selection
 ↓
LLM
 ↓
Guardrails
 ↓
Grounded Response