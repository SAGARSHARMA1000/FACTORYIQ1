/**
 * THE DASHBOARD TEMPLATE - every role dashboard is this one component.
 * Give it a `config` object (see config/roleDashboards.js) and it renders the
 * header, greeting, stat tiles, quick actions and panels.
 *
 *   <RoleDashboard config={technicianConfig} />
 *
 * WHERE TO ADD: new file, drop it in client/src/components/dashboard/.
 *
 * CONNECTING REAL DATA: the configs hold sample numbers. To go live, load the
 * data in the role's page (pages/dashboards/*.jsx), build the config from the
 * API response, and pass it in. Backend endpoints to build/use:
 *   GET /api/dashboard/stats, GET /api/dashboard/gaps   (already exist)
 *   GET /api/auth/users, GET /api/auth/audit            (added in this zip, admin)
 */
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ArrowUpRight, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { getRoleLabel } from '../../config/demoUsers.js';
import { ACCENTS, ICONS } from './dashboardTheme.js';
import StatTile from './StatTile.jsx';
import PanelRenderer from './PanelRenderer.jsx';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function ActionTile({ action, accent }) {
  const Icon = ICONS[action.icon];
  const disabled = action.comingSoon || !action.to;

  const content = (
    <>
      <div className="flex items-center justify-between">
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent.soft} ${accent.text}`}>
          {Icon && <Icon size={16} />}
        </span>
        {disabled ? (
          <span className="rounded-full border border-steeldim/50 px-2 py-0.5 text-[10.5px] text-inkdim">Soon</span>
        ) : (
          <ArrowUpRight size={15} className="text-inkdim" />
        )}
      </div>
      <p className="mt-4 text-[14px] font-medium text-white">{action.label}</p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-inkdim">{action.description}</p>
    </>
  );

  if (disabled) {
    return (
      <div aria-disabled="true" className="rounded-xl border border-steeldim/40 bg-card/60 px-5 py-4 opacity-70">
        {content}
      </div>
    );
  }
  return (
    <Link
      to={action.to}
      className={`rounded-xl border border-steeldim/50 bg-card px-5 py-4 transition-colors ${accent.hover}`}
    >
      {content}
    </Link>
  );
}

export default function RoleDashboard({ config }) {
  const { user, offline, logout } = useAuth();
  const navigate = useNavigate();
  const accent = ACCENTS[config.accent] || ACCENTS.teal;
  const firstName = (user?.name || '').split(' ')[0] || 'there';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-navy text-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-steeldim/40 bg-navy/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal" />
              <span className="text-[15px] font-semibold tracking-tight text-white">FactoryIQ</span>
            </Link>
            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${accent.border} ${accent.soft} ${accent.text}`}>
              {getRoleLabel(config.role)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[13px] leading-tight text-white">{user?.name}</p>
              <p className="text-[11px] leading-tight text-inkdim">{user?.title}</p>
            </div>
            <Link
              to="/app"
              className="rounded-md bg-teal px-3.5 py-2 text-[13px] font-medium text-navy transition-colors hover:bg-teal/90"
            >
              Open FactoryIQ
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Sign out"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-steeldim/60 text-inkdim transition-colors hover:text-white"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Greeting */}
        <div className="max-w-2xl">
          <h1 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-tight text-white">
            {greeting()}, {firstName}
          </h1>
          <p className="mt-2 text-[14.5px] leading-relaxed text-inkdim">{config.subheading}</p>
        </div>

        {/* Sample data / offline notice */}
        {(config.sampleData !== false || offline) && (
          <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-steeldim/50 bg-white/[0.03] px-4 py-3 text-[12.5px] text-inkdim">
            <Info size={14} className="mt-0.5 shrink-0 text-sky-400" />
            <p>
              {config.sampleData !== false && 'The numbers on this dashboard are sample data. '}
              {offline && 'You are in offline demo mode because the server could not be reached.'}
            </p>
          </div>
        )}

        {/* Stats */}
        {config.stats?.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {config.stats.map((stat) => (
              <StatTile key={stat.label} stat={stat} accent={accent} />
            ))}
          </div>
        )}

        {/* Quick actions */}
        {config.actions?.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 text-[12px] font-medium text-inkdim">Quick actions</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {config.actions.map((action) => (
                <ActionTile key={action.label} action={action} accent={accent} />
              ))}
            </div>
          </div>
        )}

        {/* Panels */}
        {config.panels?.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {config.panels.map((panel) => (
              <PanelRenderer key={panel.id} panel={panel} role={config.role} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
