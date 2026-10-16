// ─────────────────────────────────────────────────────────────
// NEW FILE: embeddings.gemini.js  (drop-in for your OpenAI embeddings file)
//
// PLUG-IN:
//   1. Put this next to your existing embeddings file.
//   2. Wherever you do `require('./embeddings')`, change the path to
//      `require('./embeddings.gemini')`. Exports are identical:
//      { embedText, embedBatch }.
//   3. .env:  GEMINI_API_KEY=...   (from https://aistudio.google.com)
//      Optional: GEMINI_EMBEDDING_DIM=768
//   4. IMPORTANT: your vector index dimension must equal EMBEDDING_DIM
//      below (768 by default, not 1536). Re-embed any existing data.
// ─────────────────────────────────────────────────────────────

const EMBEDDING_MODEL = 'gemini-embedding-001';
const EMBEDDING_DIM = Number(process.env.GEMINI_EMBEDDING_DIM) || 768;
const BASE = 'https://generativelanguage.googleapis.com/v1beta';
const MAX_BATCH = 100; // Gemini batchEmbedContents limit per request

// Truncated (<3072) Gemini vectors are not unit-length, so normalize
// them to keep cosine similarity correct.
function normalize(vec) {
  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

async function post(path, body, attempt = 0) {
  const res = await fetch(`${BASE}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify(body),
  });

  // Free tier is rate limited: back off and retry a few times
  if (res.status === 429 && attempt < 4) {
    await new Promise((r) => setTimeout(r, 1500 * 2 ** attempt));
    return post(path, body, attempt + 1);
  }

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Embedding API error (${res.status}): ${errBody}`);
  }
  return res.json();
}

const reqFor = (text, taskType) => ({
  model: `models/${EMBEDDING_MODEL}`,
  content: { parts: [{ text }] },
  taskType,
  outputDimensionality: EMBEDDING_DIM,
});

/**
 * Embed one string.
 * Default taskType is RETRIEVAL_QUERY (use for user questions).
 * If you embed single document chunks with this, pass 'RETRIEVAL_DOCUMENT'.
 */
async function embedText(text, taskType = 'RETRIEVAL_QUERY') {
  const data = await post(
    `models/${EMBEDDING_MODEL}:embedContent`,
    reqFor(text, taskType)
  );
  return normalize(data.embedding.values); // array of EMBEDDING_DIM floats
}

/**
 * Embed many chunks (stored documents), up to 100 per API call.
 */
async function embedBatch(textArray, taskType = 'RETRIEVAL_DOCUMENT') {
  const out = [];
  for (let i = 0; i < textArray.length; i += MAX_BATCH) {
    const slice = textArray.slice(i, i + MAX_BATCH);
    const data = await post(`models/${EMBEDDING_MODEL}:batchEmbedContents`, {
      requests: slice.map((t) => reqFor(t, taskType)),
    });
    out.push(...data.embeddings.map((e) => normalize(e.values)));
  }
  return out;
}

module.exports = { embedText, embedBatch, EMBEDDING_DIM };
