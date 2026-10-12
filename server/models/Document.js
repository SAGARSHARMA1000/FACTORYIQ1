const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    fileType: { type: String, required: true }, // pdf, xlsx, docx, image
    fileSizeBytes: { type: Number },
    filePath: { type: String, required: true },

    status: {
      type: String,
      enum: ['processing', 'processed', 'failed'],
      default: 'processing',
    },
    errorMessage: { type: String },

    chunkCount: { type: Number, default: 0 },
    extractedTextPreview: { type: String }, // first ~500 chars, for quick preview

    // Simple entity extraction results (equipment tags, dates found, etc.)
    entities: {
      equipmentTags: [{ type: String }],
      dates: [{ type: String }],
    },

    category: {
      type: String,
      enum: [
        'maintenance_record',
        'safety_procedure',
        'engineering_drawing',
        'work_order',
        'inspection_report',
        'compliance_document',
        'other',
      ],
      default: 'other',
    },

    uploadedBy: { type: String, default: 'anonymous' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
