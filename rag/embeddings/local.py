from langchain_huggingface import HuggingFaceEmbeddings


def get_local_embeddings():
    """
    Create the local BGE embedding model.
    The model is downloaded automatically on first use.
    """

    return HuggingFaceEmbeddings(
        model_name="BAAI/bge-small-en-v1.5",
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True}
    )