/**
 * Roles and permissions - the single source of truth for "who can do what".
 *
 * WHERE TO ADD: new file, just drop it in server/config/.
 * Used by: models/User.js, middleware/authMiddleware.js, controllers/authController.js
 *
 * To add a role: add it to ROLES, then list it under the permissions it should get.
 */
const ROLES = {
  TECHNICIAN: 'technician',
  ENGINEER: 'engineer',
  SAFETY_OFFICER: 'safety_officer',
  PLANT_MANAGER: 'plant_manager',
  ADMIN: 'admin',
};

const ALL_ROLES = Object.values(ROLES);

const PERMISSIONS = {
  // Everyone signed in can read documents and ask questions
  'documents:read': ALL_ROLES,
  'query:ask': ALL_ROLES,

  // Content management
  'documents:upload': [ROLES.ENGINEER, ROLES.SAFETY_OFFICER, ROLES.ADMIN],
  'documents:delete:own': [ROLES.ENGINEER, ROLES.SAFETY_OFFICER, ROLES.ADMIN],
  'documents:delete:any': [ROLES.ADMIN],

  // Insight views
  'dashboard:gaps': [ROLES.ENGINEER, ROLES.SAFETY_OFFICER, ROLES.PLANT_MANAGER, ROLES.ADMIN],
  'compliance:view': [ROLES.SAFETY_OFFICER, ROLES.PLANT_MANAGER, ROLES.ADMIN],

  // Administration
  'users:manage': [ROLES.ADMIN],
  'audit:view': [ROLES.ADMIN],
};

const can = (role, permission) => (PERMISSIONS[permission] || []).includes(role);

module.exports = { ROLES, ALL_ROLES, PERMISSIONS, can };
