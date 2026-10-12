const asyncHandler = require('express-async-handler');
const Document = require('../models/Document');
const Chunk = require('../models/Chunk');
const { processDocument } = require('../services/ingestionPipeline');
const logAudit = require('../utils/audit').logAudit;
// POST /api/documents/upload
const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const doc = await Document.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
    fileType: req.file.mimetype,
    fileSizeBytes: req.file.size,
    filePath: req.file.path,
    category: req.body.category || 'other',
    status: 'processing',
  });
  await logAudit(req, 'document.upload', req.file.originalname, req.user);

  // Kick off ingestion in the background — don't make the user wait
  // for OCR/embedding to finish before getting a response.
  processDocument(doc._id).catch((err) =>
    console.error('Background processing error:', err)
  );

  res.status(202).json({
    message: 'Document uploaded. Processing started.',
    document: doc,
  });
});

// GET /api/documents
const getDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find().sort({ createdAt: -1 });
  res.json(documents);
});

// GET /api/documents/:id
const getDocumentById = asyncHandler(async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) {
    res.status(404);
    throw new Error('Document not found');
  }
  const chunks = await Chunk.find({ documentId: doc._id }).select('-embedding');
  res.json({ document: doc, chunks });
});

// DELETE /api/documents/:id
const deleteDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) {
    res.status(404);
    throw new Error('Document not found');
  }
  await logAudit(req, 'document.delete', doc.originalName);
  await Chunk.deleteMany({ documentId: doc._id });
  await doc.deleteOne();
  res.json({ message: 'Document and its chunks deleted' });
});

module.exports = { uploadDocument, getDocuments, getDocumentById, deleteDocument };
