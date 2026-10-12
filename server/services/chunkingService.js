/**
 * Splits a long text into overlapping word-based chunks.
 * Overlap preserves context across chunk boundaries so an answer
 * spanning two chunks doesn't lose meaning.
 *
 * @param {string} text
 * @param {number} chunkSize   - words per chunk (default 500)
 * @param {number} overlap     - words repeated between chunks (default 50)
 * @returns {string[]} array of chunk strings
 */
function chunkText(text, chunkSize = 500, overlap = 50) {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks = [];

  if (words.length === 0) return chunks;

  let start = 0;
  while (start < words.length) {
    const end = Math.min(start + chunkSize, words.length);
    const chunk = words.slice(start, end).join(' ');
    chunks.push(chunk);

    if (end === words.length) break;
    start = end - overlap; // step forward but re-include the overlap
  }

  return chunks;
}

/**
 * Very lightweight entity extraction — regex-based, no ML needed.
 * Good enough for a hackathon demo; swap for an LLM-based extractor
 * or a NER model for production accuracy.
 */
function extractEntities(text) {
  // Matches things like "Pump-7", "P-07", "VLV-104", "CMP12"
  const equipmentTagPattern = /\b[A-Z]{1,5}-?\d{1,4}\b/g;
  const datePattern =
    /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4})\b/gi;

  const equipmentTags = [...new Set(text.match(equipmentTagPattern) || [])].slice(0, 20);
  const dates = [...new Set(text.match(datePattern) || [])].slice(0, 20);

  return { equipmentTags, dates };
}

module.exports = { chunkText, extractEntities };
