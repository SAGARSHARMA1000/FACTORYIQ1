import { useEffect, useState } from 'react';
import { FileText, CheckCircle, Clock, MessageSquare, AlertTriangle } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import { getDashboardStats, getKnowledgeGaps } from '../api/client.js';

const SEVERITY_STYLES = {
  high: 'border-red-500/40 bg-red-500/5 text-red-400',
  medium: 'border-yellow-500/40 bg-yellow-500/5 text-yellow-400',
  low: 'border-tealDim/40 bg-white/5 text-gray-300',
};

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [gaps, setGaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [statsRes, gapsRes] = await Promise.all([getDashboardStats(), getKnowledgeGaps()]);
      setStats(statsRes.data);
      setGaps(gapsRes.data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500 text-sm">Loading dashboard…</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="mb-6">
        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-gray-400">
          Document status and automatically detected knowledge gaps.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        <StatCard icon={FileText} label="Total documents" value={stats.totalDocuments} />
        <StatCard
          icon={CheckCircle}
          label="Processed"
          value={stats.processedDocuments}
          accent="text-teal"
        />
        <StatCard
          icon={Clock}
          label="Processing"
          value={stats.processingDocuments}
          accent="text-yellow-400"
        />
        <StatCard
          icon={AlertTriangle}
          label="Failed"
          value={stats.failedDocuments}
          accent="text-red-400"
        />
        <StatCard icon={MessageSquare} label="Questions asked" value={stats.totalQueries} />
      </div>

      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
        Knowledge Gaps {gaps.length > 0 && `(${gaps.length})`}
      </h2>

      {gaps.length === 0 ? (
        <div className="bg-card border border-tealDim/20 rounded-xl p-6 text-center text-gray-500 text-sm">
          No knowledge gaps detected yet — upload more documents to enable gap analysis.
        </div>
      ) : (
        <div className="space-y-2">
          {gaps.map((gap, i) => (
            <div
              key={i}
              className={`border rounded-lg px-4 py-3 text-sm ${SEVERITY_STYLES[gap.severity] || SEVERITY_STYLES.low}`}
            >
              <div className="flex items-center gap-2 font-medium mb-1">
                <AlertTriangle size={14} />
                {gap.type.replace(/_/g, ' ').toUpperCase()}
                <span className="ml-auto text-xs opacity-70">{gap.severity}</span>
              </div>
              <p className="text-gray-300">{gap.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
