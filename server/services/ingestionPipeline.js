const Document = require('../models/Document');
const Chunk = require('../models/Chunk');
const { extractText } = require('./extractionService');
const { chunkText, extractEntities } = require('./chunkingService');
const { embedBatch } = require('./embeddingService');

/**
 * Runs the full ingestion pipeline for one uploaded document:
 * extract -> chunk -> embed -> store.
 *
 * Designed to be called asynchronously (fire-and-forget from the
 * upload route) so the user gets an immediate "upload received"
 * response while processing continues in the background.
 */
async function processDocument(documentId) {
  const doc = await Document.findById(documentId);
  if (!doc) throw new Error('Document not found');

  try {
    // 1. Extract raw text
    const { text, pageCount } = await extractText(doc.filePath, doc.originalName);

    if (!text || text.trim().length === 0) {
      throw new Error('No text could be extracted from this document');
    }

    // 2. Lightweight entity extraction (equipment tags, dates)
    const entities = extractEntities(text);

    // 3. Split into overlapping chunks
    const chunks = chunkText(text, 500, 50);

    // 4. Generate embeddings for all chunks in one batch call
    const embeddings = await embedBatch(chunks);

    // 5. Store each chunk with its embedding
    const chunkDocs = chunks.map((chunkContent, i) => ({
      documentId: doc._id,
      documentName: doc.originalName,
      chunkIndex: i,
      text: chunkContent,
      pageNumber: pageCount > 1 ? Math.floor((i / chunks.length) * pageCount) + 1 : 1,
      embedding: embeddings[i],
    }));

    await Chunk.insertMany(chunkDocs);

    // 6. Update the document record
    doc.status = 'processed';
    doc.chunkCount = chunks.length;
    doc.extractedTextPreview = text.slice(0, 500);
    doc.entities = entities;
    await doc.save();

    console.log(`✅ Processed "${doc.originalName}" — ${chunks.length} chunks indexed`);
  } catch (err) {
    doc.status = 'failed';
    doc.errorMessage = err.message;
    await doc.save();
    console.error(`❌ Failed to process "${doc.originalName}": ${err.message}`);
  }
}

module.exports = { processDocument };
