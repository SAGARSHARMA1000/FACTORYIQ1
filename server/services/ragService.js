const Anthropic = require('@anthropic-ai/sdk');
const { embedText } = require('./embeddingService');
const { searchSimilarChunks } = require('./vectorSearchService');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are FactoryIQ, an industrial knowledge assistant for factory workers,
maintenance technicians, and safety officers.

Rules:
1. Answer ONLY using the provided context chunks below. Do not use outside knowledge.
2. If the context doesn't contain enough information to answer, say so clearly —
   do not guess or make up equipment history, dates, or figures.
3. Always mention which document(s) your answer comes from.
4. Keep answers concise and practical — the person asking may be on a factory floor
   reading this on a phone, not at a desk.
5. If the context reveals something time-sensitive or overdue (e.g. a maintenance
   date that has clearly passed), flag it explicitly as a warning.`;

/**
 * Full RAG pipeline: embed question -> vector search -> build prompt -> ask Claude
 */
async function answerQuestion(question) {
  // 1. Embed the user's question
  const queryEmbedding = await embedText(question);

  // 2. Retrieve the most relevant chunks
  const relevantChunks = await searchSimilarChunks(queryEmbedding, 5);

  if (relevantChunks.length === 0) {
    return {
      answer:
        "I don't have any documents to search yet. Upload some documents first, then ask me again.",
      sources: [],
    };
  }

  // 3. Build the context block with clear source labels
  const contextBlock = relevantChunks
    .map(
      (chunk, i) =>
        `[Source ${i + 1}: ${chunk.documentName}${
          chunk.pageNumber ? `, page ${chunk.pageNumber}` : ''
        }]\n${chunk.text}`
    )
    .join('\n\n---\n\n');

  const userPrompt = `Context from company documents:\n\n${contextBlock}\n\n---\n\nQuestion: ${question}`;

  // 4. Ask Claude to answer using only the retrieved context
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const answerText = response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n');

  // 5. Format sources for the UI to render as citations
  const sources = relevantChunks.map((chunk) => ({
    documentName: chunk.documentName,
    documentId: chunk.documentId,
    pageNumber: chunk.pageNumber,
    snippet: chunk.text.slice(0, 200) + (chunk.text.length > 200 ? '...' : ''),
    relevanceScore: chunk.score,
  }));

  return { answer: answerText, sources };
}

module.exports = { answerQuestion };
