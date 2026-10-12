import { NavLink } from 'react-router-dom';
import { MessageSquare, FileText, LayoutDashboard, Brain } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Ask FactoryIQ', icon: MessageSquare },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-navyMid border-r border-tealDim/20 flex flex-col">
      <div className="p-5 flex items-center gap-2 border-b border-tealDim/20">
        <Brain className="text-teal" size={26} />
        <span className="text-xl font-bold text-white">FactoryIQ</span>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-teal/20 text-teal font-semibold'
                  : 'text-gray-300 hover:bg-white/5'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 text-xs text-gray-500 border-t border-tealDim/20">
        AI-Powered Industrial Knowledge Intelligence
      </div>
    </aside>
  );
}
