const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  res.json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      plan: user.plan,
      stats: user.stats,
      settings: user.settings,
    },
  });
}));

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, [
  body('name').optional().trim().notEmpty(),
  body('email').optional().isEmail().normalizeEmail(),
], asyncHandler(async (req, res) => {
  const { name, email, avatar } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, avatar },
    { new: true, runValidators: true }
  );
  
  res.json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
}));

// @desc    Update user settings
// @route   PUT /api/users/settings
// @access  Private
router.put('/settings', protect, asyncHandler(async (req, res) => {
  const { notifications, privacy } = req.body;
  
  const user = await User.findById(req.user.id);
  
  if (notifications) {
    user.settings.notifications = { ...user.settings.notifications, ...notifications };
  }
  if (privacy) {
    user.settings.privacy = { ...user.settings.privacy, ...privacy };
  }
  
  await user.save();
  
  res.json({
    success: true,
    data: user.settings,
  });
}));

// @desc    Update user stats
// @route   PUT /api/users/stats
// @access  Private
router.put('/stats', protect, asyncHandler(async (req, res) => {
  const { adsBlocked, trackersBlocked, dataSaved, timeSaved } = req.body;
  
  const user = await User.findById(req.user.id);
  
  if (adsBlocked) user.stats.adsBlocked += adsBlocked;
  if (trackersBlocked) user.stats.trackersBlocked += trackersBlocked;
  if (dataSaved) user.stats.dataSaved = dataSaved;
  if (timeSaved) user.stats.timeSaved = timeSaved;
  
  await user.save();
  
  res.json({
    success: true,
    data: user.stats,
  });
}));

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
router.delete('/account', protect, asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  
  res.json({
    success: true,
    message: 'Account deleted successfully',
  });
}));

module.exports = router;
