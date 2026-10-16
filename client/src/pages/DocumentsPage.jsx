import { useEffect, useState, useCallback } from 'react';
import { Trash2, RefreshCw, FileText } from 'lucide-react';
import UploadDropzone from '../components/UploadDropzone.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { getDocuments, deleteDocument, uploadDocument } from '../api/client.js';

function formatBytes(bytes) {
  if (!bytes) return '—';
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error('Failed to load documents:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
    // Poll every 5s so "processing" -> "processed" updates automatically
    const interval = setInterval(fetchDocuments, 5000);
    return () => clearInterval(interval);
  }, [fetchDocuments]);

  const handleUpload = async (file) => {
    return await uploadDocument(file);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this document and all its indexed chunks?')) return;
    await deleteDocument(id);
    fetchDocuments();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Documents</h1>
          <p className="text-sm text-gray-400">
            Upload PDFs, drawings, work orders, and safety procedures for FactoryIQ to index.
          </p>
        </div>
        <button
          onClick={fetchDocuments}
          className="flex items-center gap-1.5 text-sm text-teal hover:text-teal/80"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </header>

      <UploadDropzone onUpload={handleUpload} onUploaded={fetchDocuments} />

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          {documents.length} document{documents.length !== 1 ? 's' : ''}
        </h2>

        {loading && documents.length === 0 ? (
          <p className="text-gray-500 text-sm">Loading…</p>
        ) : documents.length === 0 ? (
          <p className="text-gray-500 text-sm">No documents uploaded yet.</p>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="flex items-center justify-between bg-card border border-tealDim/20 rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={18} className="text-teal shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{doc.originalName}</p>
                    <p className="text-xs text-gray-500">
                      {formatBytes(doc.fileSizeBytes)}
                      {doc.chunkCount ? ` • ${doc.chunkCount} chunks indexed` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={doc.status} />
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="text-gray-500 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
