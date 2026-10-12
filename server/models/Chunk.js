const mongoose = require('mongoose');

// Each chunk is a small piece of a document (~500 words) plus its
// embedding vector. We store the vector directly in MongoDB and use
// MongoDB Atlas Vector Search — this avoids needing a separate
// ChromaDB service for the hackathon build.
const chunkSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
      index: true,
    },
    documentName: { type: String, required: true }, // denormalized for fast citation display
    chunkIndex: { type: Number, required: true },
    text: { type: String, required: true },
    pageNumber: { type: Number },

    // 1536-dimension vector from the embeddings model.
    // Requires a Vector Search index named "vector_index" on this field
    // created via the MongoDB Atlas UI (see server/README.md).
    embedding: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chunk', chunkSchema);
