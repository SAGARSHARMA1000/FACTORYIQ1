const express = require('express');
const router = express.Router();
const { askQuestion, getQueryHistory } = require('../controllers/queryController');
const { requireAuth, requirePermission } = require('../middleware/authMiddleware');

router.post('/ask', requireAuth, requirePermission('query:ask'), askQuestion);
router.get('/history',requireAuth, requirePermission('query:read'), getQueryHistory);

module.exports = router;
