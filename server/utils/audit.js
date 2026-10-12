/**
 * Writes one audit entry. Never throws - a failed audit write must not
 * break the request it is describing.
 *
 * WHERE TO ADD: new file, drop it in server/utils/.
 *
 * WHERE TO CALL IT in your existing controllers (add one line each):
 *   documentController.uploadDocument  -> await logAudit(req, 'document.upload', req.file.originalname);
 *   documentController.deleteDocument  -> await logAudit(req, 'document.delete', doc.originalName);
 *   queryController.askQuestion        -> await logAudit(req, 'query.ask', question);
 */
const AuditLog = require('../models/AuditLog');

async function logAudit(req, action, detail = '', actor) {
  try {
    const user = actor || req.user;
    await AuditLog.create({
      userId: user ? user._id : undefined,
      userName: user ? user.name : 'anonymous',
      role: user ? user.role : undefined,
      action,
      detail: String(detail).slice(0, 300),
      ip: req.ip,
    });
  } catch (err) {
    console.error('Audit log write failed:', err.message);
  }
}

module.exports = { logAudit };
