const asyncHandler = require('express-async-handler');
const { answerQuestion } = require('../services/ragService');
const QueryLog = require('../models/QueryLog');
const logAudit = require('../utils/audit').logAudit;
// POST /api/query/ask
const askQuestion = asyncHandler(async (req, res) => {
  const { question } = req.body;

  if (!question || question.trim().length === 0) {
    res.status(400);
    throw new Error('Question is required');
  }

  const { answer, sources } = await answerQuestion(question);
  await logAudit(req, 'query.ask', question);
  await QueryLog.create({ question, answer, sources });

  res.json({ question, answer, sources });
});

// GET /api/query/history
const getQueryHistory = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const history = await QueryLog.find().sort({ createdAt: -1 }).limit(limit);
  res.json(history);
});

module.exports = { askQuestion, getQueryHistory };
