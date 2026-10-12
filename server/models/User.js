/**
 * User account.
 *
 * WHERE TO ADD: new file, drop it in server/models/.
 * Requires bcryptjs (already in your server dependencies).
 *
 * LATER (plant isolation): Document, Chunk and QueryLog should also get a
 * `plantId` field - see INTEGRATION.md, section "Plant isolation".
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ALL_ROLES, ROLES } = require('../config/roles');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // select:false so the hash never leaves the DB unless explicitly requested
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ALL_ROLES, default: ROLES.TECHNICIAN, index: true },
    title: { type: String, trim: true },

    plantId: { type: String, default: 'plant-unit-3', index: true },
    plantName: { type: String, default: 'Unit 3' },

    isActive: { type: Boolean, default: true },
    isDemo: { type: Boolean, default: false, index: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

// Hash the password whenever it is set or changed
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidate) {
  // Only works if the document was loaded with .select('+password')
  return bcrypt.compare(candidate, this.password);
};

// The only shape of a user that should ever be sent to the browser
userSchema.methods.toSafeJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    title: this.title,
    plantId: this.plantId,
    plantName: this.plantName,
    isActive: this.isActive,
    isDemo: this.isDemo,
    lastLoginAt: this.lastLoginAt,
  };
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
