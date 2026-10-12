const STYLES = {
  processed: 'bg-teal/20 text-teal',
  processing: 'bg-yellow-500/20 text-yellow-400',
  failed: 'bg-red-500/20 text-red-400',
};

const LABELS = {
  processed: '✅ Processed',
  processing: '⏳ Processing',
  failed: '❌ Failed',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STYLES[status] || ''}`}>
      {LABELS[status] || status}
    </span>
  );
}
