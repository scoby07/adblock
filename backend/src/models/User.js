const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'teams'],
    default: 'free',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    select: false,
  },
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordExpire: {
    type: Date,
    select: false,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  stats: {
    adsBlocked: { type: Number, default: 0 },
    trackersBlocked: { type: Number, default: 0 },
    dataSaved: { type: String, default: '0 MB' },
    timeSaved: { type: String, default: '0 hours' },
  },
  settings: {
    notifications: {
      email: { type: Boolean, default: true },
      browser: { type: Boolean, default: true },
      weeklyReport: { type: Boolean, default: true },
    },
    privacy: {
      blockTrackers: { type: Boolean, default: true },
      hideReferrers: { type: Boolean, default: true },
      blockWebRTC: { type: Boolean, default: false },
      fingerprintDefense: { type: Boolean, default: true },
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
}, {
  timestamps: true,
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ plan: 1 });
userSchema.index({ createdAt: -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update last login
userSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  await this.save({ validateBeforeSave: false });
};

module.exports = mongoose.model('User', userSchema);
