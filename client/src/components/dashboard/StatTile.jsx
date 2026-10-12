/**
 * One headline number. Used by RoleDashboard.
 * WHERE TO ADD: new file, drop it in client/src/components/dashboard/.
 */
import { ICONS, TONES } from './dashboardTheme.js';

export default function StatTile({ stat, accent }) {
  const Icon = ICONS[stat.icon];
  const hintColor = stat.tone ? TONES[stat.tone].text : 'text-inkdim';

  return (
    <div className="rounded-xl border border-steeldim/50 bg-card px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] text-inkdim">{stat.label}</span>
        {Icon && (
          <span className={`w-7 h-7 rounded-md flex items-center justify-center ${accent.soft} ${accent.text}`}>
            <Icon size={15} />
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-semibold text-white tabular-nums tracking-tight">{stat.value}</p>
      {stat.hint && <p className={`mt-1 text-[12px] ${hintColor}`}>{stat.hint}</p>}
    </div>
  );
}
