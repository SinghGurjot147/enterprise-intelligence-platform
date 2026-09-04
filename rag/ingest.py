from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_chroma import Chroma

from rag.chunking.hierarchical import hierarchical_chunk_documents
from rag.embeddings.router import get_embeddings, save_provider
from rag.embeddings.local import get_local_embeddings

load_dotenv()

loader = PyPDFDirectoryLoader("documents")
documents = loader.load()

print(f"Loaded {len(documents)} pages")

chunks = hierarchical_chunk_documents(documents)

print(f"Created {len(chunks)} child chunks")

if chunks:
    print("\nSample chunk metadata:")
    print(chunks[0].metadata)

embeddings = get_embeddings()

print("\nCreating vector database...")

try:

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="chroma_db"
    )

    print("\nRAG knowledge base created successfully!")

except Exception as error:

    if "429" in str(error) or "RESOURCE_EXHAUSTED" in str(error):

        print("\nGemini embedding quota exceeded.")
        print("Switching to local BGE embeddings...")

        # Remove partially created database
        import shutil
        shutil.rmtree("chroma_db", ignore_errors=True)

        local_embeddings = get_local_embeddings()
        save_provider("local_bge")

        vectorstore = Chroma.from_documents(
            documents=chunks,
            embedding=local_embeddings,
            persist_directory="chroma_db"
        )

        print("\nRAG knowledge base created using fallback embeddings!")

    else:
        raise