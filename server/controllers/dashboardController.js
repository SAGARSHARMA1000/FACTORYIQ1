const asyncHandler = require('express-async-handler');
const Document = require('../models/Document');
const QueryLog = require('../models/QueryLog');
const { detectKnowledgeGaps } = require('../services/gapDetectionService');

// GET /api/dashboard/stats
const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalDocs, processedDocs, processingDocs, failedDocs, totalQueries] =
    await Promise.all([
      Document.countDocuments(),
      Document.countDocuments({ status: 'processed' }),
      Document.countDocuments({ status: 'processing' }),
      Document.countDocuments({ status: 'failed' }),
      QueryLog.countDocuments(),
    ]);

  res.json({
    totalDocuments: totalDocs,
    processedDocuments: processedDocs,
    processingDocuments: processingDocs,
    failedDocuments: failedDocs,
    totalQueries,
  });
});

// GET /api/dashboard/gaps
const getKnowledgeGaps = asyncHandler(async (req, res) => {
  const gaps = await detectKnowledgeGaps();
  res.json(gaps);
});

module.exports = { getDashboardStats, getKnowledgeGaps };
