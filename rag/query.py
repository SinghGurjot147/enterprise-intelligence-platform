from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_chroma import Chroma

load_dotenv()

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001"
)

db = Chroma(
    persist_directory="chroma_db",
    embedding_function=embeddings
)

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0
)

question = input("Ask a question: ")

results = db.similarity_search(question, k=5)

unique_results = []
seen = set()

for result in results:
    text = result.page_content.strip()

    if text not in seen:
        seen.add(text)
        unique_results.append(result)

print("\n--- Retrieved Chunks ---\n")

for i, result in enumerate(unique_results[:3], 1):
    print(f"CHUNK {i}")
    print(result.page_content)
    print("-" * 80)

context = "\n\n".join(
    result.page_content for result in results
)

prompt = f"""
Answer the question using ONLY the context below.

Context:
{context}

Question:
{question}

If the answer is not present in the context, say:
"I don't know based on the provided document."
"""

response = llm.invoke(prompt)

print("\n--- Answer ---\n")
print(response.content)