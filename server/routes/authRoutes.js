/**
 * WHERE TO ADD: new file, drop it in server/routes/.
 *
 * ADD THESE TWO LINES TO server/server.js (next to your other route lines):
 *   const authRoutes = require('./routes/authRoutes');
 *   app.use('/api/auth', authRoutes);
 *
 * Before going live, put a rate limiter on /login (npm i express-rate-limit).
 */
const express = require('express');
const router = express.Router();
const { requireAuth, requirePermission } = require('../middleware/authMiddleware');
const {
  login,
  demoLogin,
  listDemoAccounts,
  getMe,
  listUsers,
  createUser,
  updateUserStatus,
  getAuditLog,
} = require('../controllers/authController');

// Public
router.post('/login', login);
router.post('/demo-login', demoLogin);
router.get('/demo-accounts', listDemoAccounts);

// Any signed-in user
router.get('/me', requireAuth, getMe);

// Admin only
router.get('/users', requireAuth, requirePermission('users:manage'), listUsers);
router.post('/users', requireAuth, requirePermission('users:manage'), createUser);
router.patch('/users/:id/status', requireAuth, requirePermission('users:manage'), updateUserStatus);
router.get('/audit', requireAuth, requirePermission('audit:view'), getAuditLog);

module.exports = router;
