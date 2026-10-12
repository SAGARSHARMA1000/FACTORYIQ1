/**
 * Auth endpoints: login, demo login, current user, user management, audit log.
 *
 * WHERE TO ADD: new file, drop it in server/controllers/.
 * Uses express-async-handler (already in your dependencies).
 *
 * NOTE: these handlers send their own status codes with res.status(..).json(..)
 * instead of throwing, so they do not depend on your global error handler.
 */
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const generateToken = require('../utils/generateToken');
const { logAudit } = require('../utils/audit');
const { ALL_ROLES } = require('../config/roles');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// SECURITY: demo login lets anyone enter as any role, including admin, with no
// password. Keep ENABLE_DEMO_LOGIN unset/false on any server with real data.
const demoLoginEnabled = () => process.env.ENABLE_DEMO_LOGIN === 'true';

// POST /api/auth/login   { email, password }
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
  const valid = user && user.isActive && (await user.comparePassword(password));
  if (!valid) {
    // Same message for "no such user" and "wrong password" on purpose
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  await User.updateOne({ _id: user._id }, { lastLoginAt: new Date() });
  await logAudit(req, 'auth.login', user.email, user);

  return res.json({ token: generateToken(user), user: user.toSafeJSON() });
});

// POST /api/auth/demo-login   { role }
const demoLogin = asyncHandler(async (req, res) => {
  if (!demoLoginEnabled()) {
    return res
      .status(403)
      .json({ message: 'Demo login is disabled on this server (set ENABLE_DEMO_LOGIN=true in server/.env)' });
  }

  const { role } = req.body || {};
  if (typeof role !== 'string' || !ALL_ROLES.includes(role)) {
    return res.status(400).json({ message: 'Unknown demo role' });
  }

  const user = await User.findOne({ role, isDemo: true, isActive: true });
  if (!user) {
    return res
      .status(404)
      .json({ message: 'Demo account not found. Run "npm run seed:demo" in the server folder first.' });
  }

  await User.updateOne({ _id: user._id }, { lastLoginAt: new Date() });
  await logAudit(req, 'auth.demo_login', role, user);

  return res.json({ token: generateToken(user), user: user.toSafeJSON() });
});

// GET /api/auth/demo-accounts   (public, only when demo login is enabled)
const listDemoAccounts = asyncHandler(async (req, res) => {
  if (!demoLoginEnabled()) return res.json([]);
  const users = await User.find({ isDemo: true, isActive: true }).sort({ createdAt: 1 });
  return res.json(users.map((u) => u.toSafeJSON()));
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
});

// GET /api/auth/users   (admin)
const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: 1 });
  res.json(users.map((u) => u.toSafeJSON()));
});

// POST /api/auth/users   (admin)  { name, email, password, role, title?, plantId?, plantName? }
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, title, plantId, plantName } = req.body || {};

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ message: 'A valid email is required' });
  }
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }
  if (!ALL_ROLES.includes(role)) {
    return res.status(400).json({ message: `Role must be one of: ${ALL_ROLES.join(', ')}` });
  }

  const exists = await User.findOne({ email: email.toLowerCase().trim() });
  if (exists) return res.status(409).json({ message: 'A user with this email already exists' });

  const user = await User.create({
    name,
    email,
    password,
    role,
    title,
    plantId: plantId || req.user.plantId,
    plantName: plantName || req.user.plantName,
  });

  await logAudit(req, 'user.create', `${user.email} (${user.role})`);
  return res.status(201).json(user.toSafeJSON());
});

// PATCH /api/auth/users/:id/status   (admin)  { isActive: boolean }
const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body || {};

  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid user id' });
  if (typeof isActive !== 'boolean') return res.status(400).json({ message: 'isActive must be true or false' });
  if (String(req.user._id) === id) {
    return res.status(400).json({ message: 'You cannot change your own status' });
  }

  const user = await User.findByIdAndUpdate(id, { isActive }, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });

  await logAudit(req, isActive ? 'user.activate' : 'user.deactivate', user.email);
  return res.json(user.toSafeJSON());
});

// GET /api/auth/audit?limit=50   (admin)
const getAuditLog = asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);
  const entries = await AuditLog.find().sort({ createdAt: -1 }).limit(limit);
  res.json(entries);
});

module.exports = {
  login,
  demoLogin,
  listDemoAccounts,
  getMe,
  listUsers,
  createUser,
  updateUserStatus,
  getAuditLog,
};
