const Document = require('../models/Document');

/**
 * Scans all processed documents for simple, explainable knowledge gaps.
 * This is intentionally rule-based (not an LLM call) so it's fast,
 * free, and deterministic — good for a live demo. Swap in an
 * LLM-based reasoner later for deeper cross-document gap detection.
 */
async function detectKnowledgeGaps() {
  const documents = await Document.find({ status: 'processed' }).lean();
  const gaps = [];

  // Gap 1: documents stuck in "processing" or "failed" for a while
  const failedDocs = await Document.find({ status: 'failed' }).lean();
  failedDocs.forEach((doc) => {
    gaps.push({
      type: 'processing_failure',
      severity: 'medium',
      message: `"${doc.originalName}" failed to process: ${doc.errorMessage || 'unknown error'}`,
      documentId: doc._id,
    });
  });

  // Gap 2: maintenance records mentioning equipment with no recent update
  // Simple heuristic: flag any maintenance_record older than 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const staleRecords = documents.filter(
    (doc) =>
      doc.category === 'maintenance_record' && new Date(doc.createdAt) < sixMonthsAgo
  );
  staleRecords.forEach((doc) => {
    gaps.push({
      type: 'stale_maintenance_record',
      severity: 'high',
      message: `"${doc.originalName}" is the most recent maintenance record on file and is over 6 months old — equipment mentioned may be overdue for service.`,
      documentId: doc._id,
      equipmentTags: doc.entities?.equipmentTags || [],
    });
  });

  // Gap 3: equipment tags mentioned in one document but never appearing
  // in a safety_procedure or compliance_document — i.e. equipment with
  // no linked safety coverage
  const allEquipmentTags = new Set();
  const safetyEquipmentTags = new Set();

  documents.forEach((doc) => {
    (doc.entities?.equipmentTags || []).forEach((tag) => {
      allEquipmentTags.add(tag);
      if (doc.category === 'safety_procedure' || doc.category === 'compliance_document') {
        safetyEquipmentTags.add(tag);
      }
    });
  });

  const uncoveredEquipment = [...allEquipmentTags].filter(
    (tag) => !safetyEquipmentTags.has(tag)
  );
  if (uncoveredEquipment.length > 0) {
    gaps.push({
      type: 'missing_safety_coverage',
      severity: 'high',
      message: `${uncoveredEquipment.length} equipment tag(s) referenced in documents have no linked safety procedure or compliance document: ${uncoveredEquipment
        .slice(0, 10)
        .join(', ')}`,
      equipmentTags: uncoveredEquipment.slice(0, 10),
    });
  }

  return gaps;
}

module.exports = { detectKnowledgeGaps };
