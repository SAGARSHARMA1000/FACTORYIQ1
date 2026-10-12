/**
 * Signs a JWT for a user.
 *
 * WHERE TO ADD: new file, drop it in server/utils/.
 * Needs JWT_SECRET in server/.env (already in your .env.example).
 * Optional: JWT_EXPIRES_IN (default 12h).
 */
const jwt = require('jsonwebtoken');

module.exports = function generateToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in server/.env');
  }
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '12h',
  });
};
