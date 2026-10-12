/**
 * Append-only record of who did what. Shown on the admin dashboard.
 *
 * WHERE TO ADD: new file, drop it in server/models/.
 */
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, default: 'anonymous' },
    role: { type: String },
    action: { type: String, required: true, index: true }, // e.g. 'auth.login', 'document.upload'
    detail: { type: String, default: '' },
    ip: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

auditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
