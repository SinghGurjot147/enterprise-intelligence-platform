import os
import json
import time
from pathlib import Path

from dotenv import load_dotenv

from rag.embeddings.gemini import get_gemini_embeddings
from rag.embeddings.local import get_local_embeddings

load_dotenv()

STATE_FILE = Path("chroma_db") / "embedding_provider.json"
RECOVERY_INTERVAL = 300  # 5 minutes


def save_provider(provider):
    STATE_FILE.parent.mkdir(exist_ok=True)

    with open(STATE_FILE, "w") as file:
        json.dump(
            {
                "provider": provider,
                "updated_at": time.time()
            },
            file,
            indent=4
        )


def get_saved_provider():
    if not STATE_FILE.exists():
        return None

    try:
        with open(STATE_FILE, "r") as file:
            return json.load(file).get("provider")
    except Exception:
        return None


def recovery_check_due():
    if not STATE_FILE.exists():
        return True

    try:
        with open(STATE_FILE, "r") as file:
            data = json.load(file)

        last_check = data.get("updated_at", 0)

        return time.time() - last_check >= RECOVERY_INTERVAL

    except Exception:
        return True


def try_gemini():
    keys = [
        os.getenv("GOOGLE_API_KEY_1"),
        os.getenv("GOOGLE_API_KEY_2")
    ]

    for index, key in enumerate(keys, start=1):

        if not key:
            continue

        try:
            print(f"Trying Gemini embedding project {index}...")

            embeddings = get_gemini_embeddings(key)

            # Test Gemini availability
            embeddings.embed_query("provider test")

            print(f"Gemini project {index} available.")

            return embeddings, "gemini"

        except Exception as error:

            error_message = str(error)

            if "429" in error_message or "RESOURCE_EXHAUSTED" in error_message:
                print(f"Gemini project {index} quota exceeded.")
            else:
                print(f"Gemini project {index} unavailable.")

    return None, None


def get_embeddings():

    saved_provider = get_saved_provider()

    # If BGE was previously selected, don't constantly test Gemini.
    # Check again only after the recovery interval.
    if saved_provider == "local_bge" and not recovery_check_due():

        print("Using saved provider: Local BGE")

        return get_local_embeddings()

    # Try Gemini
    embeddings, provider = try_gemini()

    if embeddings:

        save_provider(provider)

        return embeddings

    # Gemini unavailable → BGE
    print("Gemini providers unavailable.")
    print("Switching to local BGE embeddings...")

    embeddings = get_local_embeddings()

    save_provider("local_bge")

    print("Local BGE embeddings activated.")

    return embeddings