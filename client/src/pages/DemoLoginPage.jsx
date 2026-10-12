/**
 * /demo-login - one card per role; clicking a card signs in as that demo user
 * and opens their dashboard.
 *
 * WHERE TO ADD: new file, drop it in client/src/pages/.
 * Route is registered in routes/authRoutes.jsx.
 * Needs the demo accounts seeded on the server (npm run seed:demo) and
 * ENABLE_DEMO_LOGIN=true in server/.env. Without a server it falls back to
 * an offline demo session (see context/AuthContext.jsx).
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Loader2, X } from 'lucide-react';
import { DEMO_USERS, getRoleLabel } from '../config/demoUsers.js';
import { ACCENTS, ICONS } from '../components/dashboard/dashboardTheme.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function DemoLoginPage() {
  const { user, demoLogin, logout } = useAuth();
  const navigate = useNavigate();
  const [pendingRole, setPendingRole] = useState(null);
  const [error, setError] = useState('');

  const handleEnter = async (role) => {
    setError('');
    setPendingRole(role);
    try {
      await demoLogin(role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Could not sign in. Please try again.');
      setPendingRole(null);
    }
  };

  return (
    <div className="min-h-screen bg-navy text-ink">
      <header className="border-b border-steeldim/40">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal" />
            <span className="text-[15px] font-semibold tracking-tight text-white">FactoryIQ</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-[13px] text-inkdim transition-colors hover:text-white">
            <ArrowLeft size={14} />
            Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-2xl">
          <h1 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight text-white">
            Explore FactoryIQ as someone on the plant
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-inkdim">
            Pick a role. Each one sees a different workspace with different permissions. No password needed.
          </p>
        </div>

        {user && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-steeldim/50 bg-white/[0.03] px-4 py-3">
            <p className="text-[13px] text-inkdim">
              You are signed in as <span className="text-white">{user.name}</span> ({getRoleLabel(user.role)}).
            </p>
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-[13px] font-medium text-teal hover:underline">
                Continue to dashboard
              </Link>
              <button type="button" onClick={logout} className="text-[13px] text-inkdim hover:text-white">
                Sign out
              </button>
            </div>
          </div>
        )}

        {error && (
          <div role="alert" className="mt-6 rounded-lg border border-red-500/40 bg-red-500/5 px-4 py-3 text-[13px] text-red-400">
            {error}
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DEMO_USERS.map((demo) => {
            const accent = ACCENTS[demo.accent] || ACCENTS.teal;
            const Icon = ICONS[demo.icon];
            const pending = pendingRole === demo.role;

            return (
              <article
                key={demo.role}
                className={`flex flex-col rounded-xl border border-steeldim/50 bg-card px-6 py-6 transition-colors ${accent.hover}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent.soft} ${accent.text}`}>
                    {Icon && <Icon size={18} />}
                  </span>
                  <h2 className="text-[16px] font-medium text-white">{getRoleLabel(demo.role)}</h2>
                </div>

                <p className="mt-4 text-[13px] text-white">{demo.name}</p>
                <p className="text-[12px] text-inkdim">{demo.title}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-inkdim">{demo.blurb}</p>

                <ul className="mt-5 space-y-2">
                  {demo.can.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12.5px] text-ink">
                      <Check size={13} className="mt-0.5 shrink-0 text-teal" />
                      {item}
                    </li>
                  ))}
                  {demo.cannot.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12.5px] text-inkdim">
                      <X size={13} className="mt-0.5 shrink-0 text-inkdim/70" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleEnter(demo.role)}
                  disabled={pendingRole !== null}
                  aria-busy={pending}
                  className="mt-6 flex items-center justify-center gap-2 rounded-md border border-steeldim py-2.5 text-[13px] font-medium text-white transition-colors hover:border-teal/60 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {pending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Signing in
                    </>
                  ) : (
                    <>
                      Enter as {getRoleLabel(demo.role).toLowerCase()}
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-[12px] text-inkdim/80">
          Demo accounts share one sample plant. Use a real account for your own data.
        </p>
      </main>
    </div>
  );
}
