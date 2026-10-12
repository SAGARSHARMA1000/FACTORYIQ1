/**
 * Authentication + authorisation middleware.
 *
 * WHERE TO ADD: new file, drop it in server/middleware/.
 *
 * WHERE TO USE IT: put it in front of your existing routes, e.g.
 *   server/routes/documentRoutes.js
 *     router.post('/upload', requireAuth, requirePermission('documents:upload'), upload.single('file'), uploadDocument);
 *     router.get('/',        requireAuth, requirePermission('documents:read'), getDocuments);
 *     router.delete('/:id',  requireAuth, requirePermission('documents:delete:own'), deleteDocument);
 *   server/routes/queryRoutes.js
 *     router.post('/ask', requireAuth, requirePermission('query:ask'), askQuestion);
 *   server/routes/dashboardRoutes.js
 *     router.get('/gaps', requireAuth, requirePermission('dashboard:gaps'), getKnowledgeGaps);
 * (see INTEGRATION.md for the full list)
 */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { can } = require('../config/roles');

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Not signed in' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Account not found or deactivated' });
    }

    req.user = user; // available in every controller after this
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Session expired or invalid. Please sign in again.' });
  }
}

// Allow only the listed roles:  requireRole('admin', 'engineer')
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Your role does not have access to this action' });
  }
  return next();
};

// Allow by permission name from config/roles.js:  requirePermission('documents:upload')
const requirePermission = (permission) => (req, res, next) => {
  if (!req.user || !can(req.user.role, permission)) {
    return res.status(403).json({ message: 'Your role does not have access to this action' });
  }
  return next();
};

module.exports = { requireAuth, requireRole, requirePermission };
