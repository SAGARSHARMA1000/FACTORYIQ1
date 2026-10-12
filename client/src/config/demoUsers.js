/**
 * Demo accounts shown on /demo-login, one per role.
 *
 * WHERE TO ADD: new file, drop it in client/src/config/.
 * Keep roles/emails in sync with server/seed/seedDemoUsers.js.
 * `can` / `cannot` are display-only (they feed the cards and the "Your access"
 * panel). The real permission checks live in server/config/roles.js.
 */
export const ROLE_LABELS = {
  technician: 'Technician',
  engineer: 'Engineer',
  safety_officer: 'Safety officer',
  plant_manager: 'Plant manager',
  admin: 'Admin',
};

export const DEMO_USERS = [
  {
    role: 'technician',
    name: 'Ravi Sharma',
    title: 'Field technician, Unit 3',
    email: 'technician@factoryiq.demo',
    accent: 'teal',
    icon: 'Wrench',
    blurb: 'On the plant floor with a phone. Needs a cited answer in seconds, not a search.',
    can: ['Ask questions in plain language', 'Open the cited source pages', 'Look up equipment history'],
    cannot: ['Upload or delete documents', 'See compliance and admin views'],
  },
  {
    role: 'engineer',
    name: 'Anita Verma',
    title: 'Maintenance and reliability engineer',
    email: 'engineer@factoryiq.demo',
    accent: 'sky',
    icon: 'ClipboardList',
    blurb: 'Plans maintenance and investigates failures. Keeps the equipment records current.',
    can: ['Upload and categorise documents', 'Review knowledge gaps and conflicts', 'Investigate repeat failures'],
    cannot: ['Manage users', 'Delete other people\'s documents'],
  },
  {
    role: 'safety_officer',
    name: 'Imran Qureshi',
    title: 'HSE and compliance officer',
    email: 'safety@factoryiq.demo',
    accent: 'amber',
    icon: 'ShieldCheck',
    blurb: 'Owns permits, inspections and incident follow-up. Prepares for audits.',
    can: ['Track overdue inspections and reviews', 'Follow near-miss corrective actions', 'See compliance coverage'],
    cannot: ['Manage users', 'Delete other people\'s documents'],
  },
  {
    role: 'plant_manager',
    name: 'Meera Nair',
    title: 'Plant manager (read-only)',
    email: 'manager@factoryiq.demo',
    accent: 'violet',
    icon: 'Gauge',
    blurb: 'Wants the plant\'s knowledge health and risks at a glance, without the detail.',
    can: ['See usage, risks and coverage at a glance', 'Ask questions'],
    cannot: ['Upload or delete documents', 'Manage users'],
  },
  {
    role: 'admin',
    name: 'Karan Mehta',
    title: 'System administrator',
    email: 'admin@factoryiq.demo',
    accent: 'rose',
    icon: 'Users',
    blurb: 'Runs the system. Controls who gets in and what they can do.',
    can: ['Invite users and assign roles', 'Delete any document', 'Review the audit log'],
    cannot: [],
  },
];

export const getDemoUser = (role) => DEMO_USERS.find((u) => u.role === role);
export const getRoleLabel = (role) => ROLE_LABELS[role] || role;
