const Chunk = require('../models/Chunk');

/**
 * Finds the top-K most relevant chunks for a query embedding.
 *
 * PREFERRED PATH: MongoDB Atlas Vector Search (requires a vector
 * index named "vector_index" created on the Chunk collection's
 * `embedding` field via the Atlas UI — see server/README.md).
 *
 * FALLBACK PATH: if Atlas Vector Search isn't set up yet (e.g. you're
 * on a plain MongoDB instance for local dev), we fall back to brute
 * force cosine similarity in Node. This works fine for a hackathon
 * demo with a few hundred/thousand chunks — it just won't scale to
 * millions of chunks the way Atlas Vector Search does.
 */

const USE_ATLAS_VECTOR_SEARCH = process.env.USE_ATLAS_VECTOR_SEARCH === 'true';

async function searchSimilarChunks(queryEmbedding, topK = 5) {
  if (USE_ATLAS_VECTOR_SEARCH) {
    return searchWithAtlasVectorSearch(queryEmbedding, topK);
  }
  return searchWithBruteForce(queryEmbedding, topK);
}

async function searchWithAtlasVectorSearch(queryEmbedding, topK) {
  const results = await Chunk.aggregate([
    {
      $vectorSearch: {
        index: 'vector_index',
        path: 'embedding',
        queryVector: queryEmbedding,
        numCandidates: topK * 20,
        limit: topK,
      },
    },
    {
      $project: {
        text: 1,
        documentName: 1,
        documentId: 1,
        pageNumber: 1,
        score: { $meta: 'vectorSearchScore' },
      },
    },
  ]);
  return results;
}

async function searchWithBruteForce(queryEmbedding, topK) {
  // NOTE: for a hackathon-scale document set (a few hundred chunks)
  // this is fast enough. Loads all chunks into memory — don't use
  // this path in production with a large corpus.
  const chunks = await Chunk.find({}).lean();

  const scored = chunks.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

module.exports = { searchSimilarChunks };
