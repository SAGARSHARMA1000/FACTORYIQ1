const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');
const XLSX = require('xlsx');
const mammoth = require('mammoth');

/**
 * Extracts raw text from a document based on its file extension.
 * Returns { text, pageCount }
 */
async function extractText(filePath, originalName) {
  const ext = path.extname(originalName).toLowerCase();

  switch (ext) {
    case '.pdf':
      return extractFromPDF(filePath);

    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.tiff':
      return extractFromImage(filePath);

    case '.xlsx':
    case '.xls':
    case '.csv':
      return extractFromSpreadsheet(filePath);

    case '.docx':
      return extractFromDocx(filePath);

    case '.txt':
      return { text: fs.readFileSync(filePath, 'utf-8'), pageCount: 1 };

    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
}

async function extractFromPDF(filePath) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);

  // If pdf-parse returns almost no text, it's likely a scanned PDF —
  // in a full implementation you'd rasterize each page to an image and
  // run OCR on each. For the hackathon prototype, flag it clearly.
  if (data.text.trim().length < 50) {
    return {
      text: '[This PDF appears to be scanned/image-based. OCR fallback recommended — see extractionService.js extractFromImage()]',
      pageCount: data.numpages,
      needsOCR: true,
    };
  }

  return { text: data.text, pageCount: data.numpages };
}

async function extractFromImage(filePath) {
  const result = await Tesseract.recognize(filePath, 'eng', {
    logger: () => {}, // silence progress logs; wire to a callback if you want progress in the UI
  });
  return { text: result.data.text, pageCount: 1 };
}

function extractFromSpreadsheet(filePath) {
  const workbook = XLSX.readFile(filePath);
  let text = '';

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const csv = XLSX.utils.sheet_to_csv(sheet);
    text += `\n--- Sheet: ${sheetName} ---\n${csv}\n`;
  });

  return { text, pageCount: workbook.SheetNames.length };
}

async function extractFromDocx(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return { text: result.value, pageCount: 1 };
}

module.exports = { extractText };
