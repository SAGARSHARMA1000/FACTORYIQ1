const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument,
} = require('../controllers/documentController');
const {plantScope} = require('../middleware/plantScope');
const { requireAuth, requirePermission } = require('../middleware/authMiddleware');

router.post('/upload',requireAuth, requirePermission('documents:upload'), upload.single('file'), uploadDocument);
router.get('/', requireAuth, requirePermission('documents:read'), getDocuments);
router.get('/:id', requireAuth,requirePermission('documents:read'), getDocumentById);
router.delete('/:id', requireAuth, requirePermission('documents:delete:own'), deleteDocument);

module.exports = router;
