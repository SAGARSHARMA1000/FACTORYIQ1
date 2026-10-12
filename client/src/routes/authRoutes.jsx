/**
 * The two new routes: /demo-login and /dashboard.
 *
 * WHERE TO ADD: new file, drop it in client/src/routes/.
 *
 * WHERE TO USE IT - in your existing client/src/App.jsx:
 *   import { authRoutes } from './routes/authRoutes.jsx';
 *   <Routes>
 *     <Route path="/" element={<LandingPage />} />
 *     <Route path="/app/*" element={<AppShell />} />
 *     {authRoutes}                      // <-- add this line inside <Routes>
 *   </Routes>
 */
import { Route } from 'react-router-dom';
import DemoLoginPage from '../pages/DemoLoginPage.jsx';
import DashboardHome from '../pages/DashboardHome.jsx';
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx';

export const authRoutes = [
  <Route key="demo-login" path="/demo-login" element={<DemoLoginPage />} />,
  <Route
    key="dashboard"
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardHome />
      </ProtectedRoute>
    }
  />,
];
