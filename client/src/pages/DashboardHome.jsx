/**
 * /dashboard - shows the dashboard that matches the signed-in user's role.
 *
 * WHERE TO ADD: new file, drop it in client/src/pages/.
 * Wired up by routes/authRoutes.jsx (already behind ProtectedRoute).
 * To add a role: create its page in pages/dashboards/ and add it to the map below.
 */
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import TechnicianDashboard from './dashboards/TechnicianDashboard.jsx';
import EngineerDashboard from './dashboards/EngineerDashboard.jsx';
import SafetyOfficerDashboard from './dashboards/SafetyOfficerDashboard.jsx';
import PlantManagerDashboard from './dashboards/PlantManagerDashboard.jsx';
import AdminDashboard from './dashboards/AdminDashboard.jsx';

const DASHBOARD_BY_ROLE = {
  technician: TechnicianDashboard,
  engineer: EngineerDashboard,
  safety_officer: SafetyOfficerDashboard,
  plant_manager: PlantManagerDashboard,
  admin: AdminDashboard,
};

export default function DashboardHome() {
  const { user, logout } = useAuth();
  const Dashboard = DASHBOARD_BY_ROLE[user?.role];

  if (!Dashboard) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
        <p className="text-[15px] text-white">No dashboard is set up for the role "{user?.role}".</p>
        <Link to="/demo-login" onClick={logout} className="mt-4 text-[13px] text-teal hover:underline">
          Back to demo login
        </Link>
      </div>
    );
  }
  return <Dashboard />;
}
