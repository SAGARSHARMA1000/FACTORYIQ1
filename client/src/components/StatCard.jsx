export default function StatCard({ icon: Icon, label, value, accent = 'text-teal' }) {
  return (
    <div className="bg-card border border-tealDim/20 rounded-xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${accent}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}
