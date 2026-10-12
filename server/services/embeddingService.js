/**
 * Generates embeddings via OpenAI's embeddings endpoint.
 * We use OpenAI here specifically for embeddings (cheap, fast,
 * 1536-dim) even though the Q&A generation itself uses Claude —
 * this is a common and cost-effective pairing.
 *
 * If you'd rather use a single provider end-to-end, swap this for
 * Voyage AI embeddings (voyageai.com) — Anthropic's recommended
 * embeddings partner.
 */

const OPENAI_EMBEDDINGS_URL = 'https://api.openai.com/v1/embeddings';
const EMBEDDING_MODEL = 'text-embedding-3-small'; // 1536 dimensions, cheap, fast

async function embedText(text) {
  const response = await fetch(OPENAI_EMBEDDINGS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: text,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Embedding API error (${response.status}): ${errBody}`);
  }

  const data = await response.json();
  return data.data[0].embedding; // array of 1536 floats
}

/**
 * Embeds multiple chunks. OpenAI's endpoint accepts an array of
 * strings in one call, which is much faster than one call per chunk.
 */
async function embedBatch(textArray) {
  const response = await fetch(OPENAI_EMBEDDINGS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: textArray,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Embedding API error (${response.status}): ${errBody}`);
  }

  const data = await response.json();
  return data.data.map((d) => d.embedding);
}

module.exports = { embedText, embedBatch };
