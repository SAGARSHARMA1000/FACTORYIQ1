const mongoose = require('mongoose');

const queryLogSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    sources: [
      {
        documentName: String,
        documentId: mongoose.Schema.Types.ObjectId,
        pageNumber: Number,
        snippet: String,
      },
    ],
    askedBy: { type: String, default: 'anonymous' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QueryLog', queryLogSchema);
