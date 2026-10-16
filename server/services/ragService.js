const OpenAI = require('openai');
const { embedText } = require('./embeddingService');
const { searchSimilarChunks } = require('./vectorSearchService');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
 * Full RAG pipeline: embed question -> vector search -> build prompt -> ask OpenAI
 */
async function answerQuestion(question) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured in server/.env');
  }

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

  // 4. Ask OpenAI to answer using only the retrieved context
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-6-luna',
    temperature: 1,
    max_completion_tokens: 1024,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  });

  const answerText = response.choices?.[0]?.message?.content || '';

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
