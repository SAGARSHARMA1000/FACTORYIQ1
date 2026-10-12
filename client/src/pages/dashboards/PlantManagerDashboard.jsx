/**
 * WHERE TO ADD: new file, drop it in client/src/pages/dashboards/.
 * Thin wrapper around the shared template. Customise here (extra panels,
 * live data) without touching the other roles.
 */
import RoleDashboard from '../../components/dashboard/RoleDashboard.jsx';
import { plantManagerConfig } from '../../config/roleDashboards.js';

export default function PlantManagerDashboard() {
  return <RoleDashboard config={plantManagerConfig} />;
}
