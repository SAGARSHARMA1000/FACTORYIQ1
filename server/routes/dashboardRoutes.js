const express = require('express');
const router = express.Router();
const { getDashboardStats, getKnowledgeGaps } = require('../controllers/dashboardController');
const { requireAuth, requirePermission } = require('../middleware/authMiddleware');
router.get('/stats', requireAuth, requirePermission('dashboard:stats'), getDashboardStats);
router.get('/gaps', requireAuth, requirePermission('dashboard:gaps'), getKnowledgeGaps);

module.exports = router;
