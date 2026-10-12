/**
 * Auth state for the whole app (current user, token, login/logout).
 *
 * WHERE TO ADD: new file, drop it in client/src/context/.
 *
 * WRAP YOUR APP with the provider - in client/src/main.jsx:
 *   import { AuthProvider } from './context/AuthContext.jsx';
 *   <BrowserRouter>
 *     <AuthProvider>
 *       <App />
 *     </AuthProvider>
 *   </BrowserRouter>
 *
 * OFFLINE FALLBACK: if the backend is not reachable, demo login still works
 * with a local fake session so you can show the dashboards without a server.
 * Set OFFLINE_FALLBACK to false to turn this off. Offline sessions cannot call
 * the real API (the existing app pages will fail until the backend is up).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEMO_USERS } from '../config/demoUsers.js';

const API_BASE = import.meta.env.VITE_API_URL || '/api';
const STORAGE_KEY = 'factoryiq.auth'; // api/authInterceptor.js reads this same key
const OFFLINE_FALLBACK = true;

const AuthContext = createContext(null);

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(session) {
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage blocked (private mode): the session simply lives in memory
  }
}

async function request(path, { method = 'GET', body, token } = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    const err = new Error('Cannot reach the server');
    err.network = true;
    throw err;
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // Non-JSON body, e.g. a proxy error page when the backend is down
  }

  if (!res.ok) {
    const err = new Error(data?.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

function buildOfflineSession(role) {
  const demo = DEMO_USERS.find((u) => u.role === role);
  if (!demo) return null;
  return {
    token: 'offline-demo-token',
    offline: true,
    user: {
      id: `offline-${role}`,
      name: demo.name,
      email: demo.email,
      role: demo.role,
      title: demo.title,
      plantName: 'Unit 3',
      isDemo: true,
    },
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const persist = useCallback((next) => {
    setSession(next);
    writeSession(next);
  }, []);

  // Email + password login (for real accounts created by an admin)
  const login = useCallback(
    async (email, password) => {
      const data = await request('/auth/login', { method: 'POST', body: { email, password } });
      persist({ token: data.token, user: data.user, offline: false });
      return data.user;
    },
    [persist]
  );

  // One-click demo login by role
  const demoLogin = useCallback(
    async (role) => {
      try {
        const data = await request('/auth/demo-login', { method: 'POST', body: { role } });
        persist({ token: data.token, user: data.user, offline: false });
        return data.user;
      } catch (err) {
        const backendDown = err.network || err.status >= 500;
        if (OFFLINE_FALLBACK && backendDown) {
          const offline = buildOfflineSession(role);
          if (offline) {
            persist(offline);
            return offline.user;
          }
        }
        throw err;
      }
    },
    [persist]
  );

  const logout = useCallback(() => persist(null), [persist]);

  // On first load, confirm a stored token is still valid (skipped for offline sessions)
  useEffect(() => {
    if (!session || session.offline) return undefined;
    let cancelled = false;
    request('/auth/me', { token: session.token })
      .then((data) => {
        if (!cancelled) persist({ ...session, user: data.user });
      })
      .catch((err) => {
        if (!cancelled && err.status === 401) persist(null);
      });
    return () => {
      cancelled = true;
    };
    // Runs once on mount on purpose
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      offline: Boolean(session?.offline),
      isAuthenticated: Boolean(session),
      login,
      demoLogin,
      logout,
      hasRole: (...roles) => roles.includes(session?.user?.role),
      // Handy for your own calls: authFetch('/auth/users') sends the token for you
      authFetch: (path, options = {}) => request(path, { ...options, token: session?.token }),
    }),
    [session, login, demoLogin, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider> - wrap <App /> in main.jsx');
  }
  return ctx;
}
