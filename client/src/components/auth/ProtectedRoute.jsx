/**
 * Route guard: sends visitors who are not signed in to /demo-login.
 *
 * WHERE TO ADD: new file, drop it in client/src/components/auth/.
 *
 * USE IT in client/src/App.jsx to protect your existing app:
 *   <Route path="/app/*" element={<ProtectedRoute><AppShell /></ProtectedRoute>} />
 * Restrict to certain roles:
 *   <ProtectedRoute roles={['admin', 'engineer']}> ... </ProtectedRoute>
 */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/demo-login" replace state={{ from: location }} />;
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
