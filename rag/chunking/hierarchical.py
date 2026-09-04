from langchain_text_splitters import RecursiveCharacterTextSplitter


def hierarchical_chunk_documents(documents):
    """
    Create hierarchical parent and child chunks.

    Parent chunks preserve larger sections of the document.
    Child chunks are smaller units used for precise retrieval.
    """

    # Parent-level chunks
    parent_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=300
    )

    # Child-level chunks
    child_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    parent_chunks = parent_splitter.split_documents(documents)

    hierarchical_chunks = []

    for parent_id, parent in enumerate(parent_chunks):

        # Split each parent into smaller child chunks
        child_chunks = child_splitter.split_documents([parent])

        for child_id, child in enumerate(child_chunks):

            child.metadata["parent_id"] = parent_id
            child.metadata["child_id"] = child_id
            child.metadata["chunk_level"] = "child"

            hierarchical_chunks.append(child)

    return hierarchical_chunks